export type StepId = "emite" | "foral" | "sii" | "como" | "forma" | "soft";
export type Answers = Partial<Record<StepId, string>>;

export interface Option {
  value: string;
  label: string;
  detail?: string;
}

export interface Step {
  id: StepId;
  question: string;
  hint?: string;
  when?: (answers: Answers) => boolean;
  options: Option[];
}

// El orden importa: cada pregunta solo aparece si la anterior no ha dado ya el resultado.
export const STEPS: Step[] = [
  {
    id: "emite",
    question: "¿Emites facturas en tu actividad?",
    options: [
      { value: "si", label: "Sí", detail: "A clientes, empresas o particulares" },
      { value: "no", label: "No", detail: "Por ejemplo, solo vendo con tique sin factura o no tengo actividad" },
    ],
  },
  {
    id: "foral",
    question: "¿Dónde tienes tu domicilio fiscal?",
    hint: "Cuenta dónde tributas, no dónde están tus clientes.",
    when: (a) => a.emite === "si",
    options: [
      { value: "comun", label: "Resto de España", detail: "Incluye Canarias, Ceuta y Melilla" },
      { value: "pv", label: "País Vasco", detail: "Álava, Bizkaia o Gipuzkoa" },
      { value: "na", label: "Navarra" },
    ],
  },
  {
    id: "sii",
    question: "¿Llevas tus libros de IVA por el SII?",
    hint: "El Suministro Inmediato de Información es obligatorio si facturas más de 6 millones al año, estás inscrito en la devolución mensual del IVA (REDEME) o te apuntaste voluntariamente.",
    when: (a) => a.foral === "comun",
    options: [
      { value: "si", label: "Sí, estoy en el SII" },
      { value: "no", label: "No" },
      { value: "nose", label: "No lo sé", detail: "Si nadie te lo ha mencionado, lo normal es que no" },
    ],
  },
  {
    id: "como",
    question: "¿Cómo haces tus facturas hoy?",
    when: (a) => a.sii === "no" || a.sii === "nose",
    options: [
      { value: "programa", label: "Con un programa, app, ERP o TPV" },
      {
        value: "macros",
        label: "Con un Excel que calcula IVA o lleva los libros",
        detail: "Fórmulas o macros que sacan totales fiscales",
      },
      { value: "plantilla", label: "En Word o Excel, solo para escribirlas e imprimirlas" },
      { value: "mano", label: "A mano, en talonario" },
    ],
  },
  {
    id: "forma",
    question: "¿Cómo tributas?",
    when: (a) => a.como === "programa" || a.como === "macros",
    options: [
      { value: "sociedad", label: "Como sociedad", detail: "SL, SA, cooperativa… pagas Impuesto sobre Sociedades" },
      { value: "autonomo", label: "Como autónomo", detail: "Persona física que paga IRPF" },
      { value: "cb", label: "Comunidad de bienes o sociedad civil", detail: "Entidades en atribución de rentas" },
    ],
  },
  {
    id: "soft",
    question: "¿Qué tipo de programa usas?",
    when: (a) => a.como === "programa",
    options: [
      {
        value: "nube",
        label: "Uno comercial que se actualiza solo",
        detail: "Aplicaciones en la nube o con suscripción",
      },
      {
        value: "antiguo",
        label: "Uno instalado hace años o un ERP",
        detail: "Licencia antigua, sin actualizaciones claras",
      },
      { value: "medida", label: "Uno hecho a medida para mi negocio" },
      { value: "nose", label: "No lo sé" },
    ],
  },
];
