import { STEPS, type Answers, type Step, type StepId } from "./steps";

// Plazos del RDL 15/2025. Mes en base 0: 0 = enero, 6 = julio.
export const DEADLINES = {
  sociedad: { date: new Date(2027, 0, 1), label: "1 de enero de 2027" },
  persona: { date: new Date(2027, 6, 1), label: "1 de julio de 2027" },
} as const;

export type Deadline = (typeof DEADLINES)[keyof typeof DEADLINES];
export type SoftwareKind = "nube" | "antiguo" | "medida" | "macros" | "nose";

export type Verdict =
  | { kind: "clear"; title: string; text: string; notes: string[] }
  | {
      kind: "affected";
      title: string;
      text: string;
      deadline: Deadline;
      software: SoftwareKind;
      todo: string[];
      notes: string[];
    };

export type ChainItem = { type: "done"; step: Step; value: string; hash: string } | { type: "open"; step: Step };

export function activeSteps(answers: Answers): Step[] {
  return STEPS.filter((s) => !s.when || s.when(answers));
}

// Al volver atrás y cambiar algo, pueden quedar respuestas de preguntas que ya no se muestran.
export function prune(answers: Answers): Answers {
  const visible = new Set(activeSteps(answers).map((s) => s.id));
  return Object.fromEntries(Object.entries(answers).filter(([id]) => visible.has(id as StepId))) as Answers;
}

export function answer(answers: Answers, id: StepId, value: string): Answers {
  const index = STEPS.findIndex((s) => s.id === id);
  const next: Answers = { ...answers, [id]: value };
  for (const later of STEPS.slice(index + 1)) delete next[later.id];
  return prune(next);
}

export function fnv1a(text: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash.toString(16).padStart(8, "0");
}

/**
 * Preguntas respondidas seguidas de la primera abierta. La huella de cada paso
 * se calcula sobre todas las respuestas anteriores, así que cambiar una
 * respuesta cambia la huella de las siguientes, como en Verifactu.
 */
export function buildChain(answers: Answers, editing: StepId | null): ChainItem[] {
  const chain: ChainItem[] = [];
  let trail = "";
  for (const step of activeSteps(answers)) {
    const value = answers[step.id];
    if (value === undefined || step.id === editing) {
      chain.push({ type: "open", step });
      break;
    }
    trail += `${step.id}=${value};`;
    chain.push({ type: "done", step, value, hash: fnv1a(trail) });
  }
  return chain;
}

// El número de preguntas depende de las respuestas, así que la barra avanza
// rápido al principio y nunca llega al final hasta tener resultado.
export function progressPercent(answered: number, finished: boolean): number {
  if (finished) return 100;
  return Math.min(85, (answered / (answered + 2)) * 100);
}

export function daysUntil(date: Date, now: Date = new Date()): number {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((date.getTime() - today.getTime()) / 86_400_000);
}

const AFFECTED_NOTES = [
  "Usar un programa que no cumple puede acarrear multas de hasta 50.000 € por ejercicio.",
  "Estar en módulos o en estimación directa no cambia nada: lo que cuenta es facturar con un programa.",
];

const FIRST_TASKS: Record<SoftwareKind, string[]> = {
  nube: ["Pregunta a tu proveedor si el programa ya cumple Verifactu y si ha firmado la declaración responsable."],
  antiguo: ["Pregunta al fabricante si habrá una versión adaptada. Si no la hay, planifica ya el cambio de programa."],
  medida: [
    "Tu programa necesita adaptarse: registro de cada factura con huella encadenada, código QR y, si lo eliges, envío a Hacienda.",
    "Quien lo mantenga debe firmar la declaración responsable del programa.",
  ],
  macros: [
    "Un Excel que calcula datos fiscales cuenta como sistema de facturación. Pasa a un programa adaptado o deja la hoja solo para escribir e imprimir.",
  ],
  nose: ["Averigua qué programa emite tus facturas y pregunta a su proveedor si ya cumple Verifactu."],
};

const COMMON_TASKS = [
  "Decide el modo: con envío automático de cada factura a Hacienda (VERI*FACTU) o sin envío, guardando los registros.",
  "Haz pruebas antes de tu fecha: hasta entonces el uso es voluntario.",
  "Comprueba que tus facturas salen con el código QR.",
];

// Exclusiones según el art. 3 del RD 1007/2023, en el orden en que se preguntan.
function exclusion(a: Answers): Verdict | null {
  if (a.emite === "no") {
    return {
      kind: "clear",
      title: "Ahora mismo no te afecta",
      text: "Verifactu regula los programas con los que se emiten facturas. Si no facturas, no tienes nada que adaptar.",
      notes: [
        "Si empiezas a emitir facturas con un programa, volverías a estar dentro.",
        "Estar en régimen simplificado o en recargo de equivalencia no te deja fuera por sí solo: si facturas con un programa, te afecta.",
      ],
    };
  }
  if (a.foral === "pv") {
    return {
      kind: "clear",
      title: "Verifactu no se te aplica",
      text: "Con domicilio fiscal en el País Vasco sigues el sistema foral TicketBAI, que tiene sus propios plazos y requisitos.",
      notes: ["Revisa con tu asesor el calendario de TicketBAI de tu diputación foral."],
    };
  }
  if (a.foral === "na") {
    return {
      kind: "clear",
      title: "Verifactu no se te aplica",
      text: "Con domicilio fiscal en Navarra te rige la normativa foral navarra, no el reglamento estatal.",
      notes: ["Hacienda Foral de Navarra tiene su propio sistema de control de facturación; consulta su calendario."],
    };
  }
  if (a.sii === "si") {
    return {
      kind: "clear",
      title: "Estás fuera por el SII",
      text: "Quien lleva los libros de IVA por el Suministro Inmediato de Información queda excluido de Verifactu.",
      notes: ["Si dejas el SII, pasarías a estar obligado con los plazos generales."],
    };
  }
  if (a.como === "mano" || a.como === "plantilla") {
    return {
      kind: "clear",
      title: "Mientras factures así, no te afecta",
      text:
        a.como === "mano"
          ? "Si haces las facturas a mano no usas un sistema informático de facturación, que es lo que regula Verifactu."
          : "Usar Word o Excel solo para escribir, imprimir y guardar facturas no cuenta como sistema de facturación.",
      notes: [
        "Si tu hoja calcula el IVA, genera libros registro u otros datos fiscales, sí cuenta como sistema y te afectaría.",
        "En cuanto pases a un programa de facturación, ese programa tendrá que cumplir Verifactu.",
      ],
    };
  }
  return null;
}

/** Devuelve null mientras falte alguna respuesta necesaria. */
export function decide(a: Answers): Verdict | null {
  const excluded = exclusion(a);
  if (excluded) return excluded;

  const usesSoftware = a.como === "programa" || a.como === "macros";
  if (!usesSoftware || !a.forma) return null;
  if (a.como === "programa" && !a.soft) return null;

  const deadline = a.forma === "sociedad" ? DEADLINES.sociedad : DEADLINES.persona;
  const software = (a.como === "macros" ? "macros" : a.soft) as SoftwareKind;
  const who = { sociedad: "sociedad", autonomo: "autónomo", cb: "entidad en atribución de rentas" }[a.forma];

  return {
    kind: "affected",
    title: `Te toca el ${deadline.label}`,
    text: `Como ${who}, tu sistema de facturación debe estar adaptado antes del ${deadline.label}.`,
    deadline,
    software,
    todo: [...FIRST_TASKS[software], ...COMMON_TASKS],
    notes: AFFECTED_NOTES,
  };
}

export function optionLabel(step: Step, value: string): string {
  return step.options.find((o) => o.value === value)?.label ?? value;
}

export function summaryText(answers: Answers, verdict: Verdict): string {
  const lines = ["¿Me toca Verifactu? Resumen", ""];
  for (const step of activeSteps(answers)) {
    const value = answers[step.id];
    if (value) lines.push(`- ${step.question} ${optionLabel(step, value)}`);
  }
  lines.push("", `Resultado: ${verdict.title}`);
  if (verdict.kind === "affected") {
    lines.push("", "Qué hacer:", ...verdict.todo.map((t) => `- ${t}`));
  }
  return lines.join("\n");
}
