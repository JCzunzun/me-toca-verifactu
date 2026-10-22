import { useEffect, useRef, useState } from "react";
import { CONTACT } from "../config";
import { copyText } from "../lib/clipboard";
import { daysUntil, type Verdict as VerdictData } from "../lib/verifactu";
import { Checklist } from "./Checklist";
import { Countdown } from "./Countdown";

interface Props {
  verdict: VerdictData;
  summary: string;
  autoFocus: boolean;
  onRestart: () => void;
}

const NEEDS_DEVELOPER = new Set(["medida", "antiguo", "macros"]);

export function Verdict({ verdict, summary, autoFocus, onRestart }: Props) {
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const affected = verdict.kind === "affected";

  useEffect(() => {
    if (!autoFocus) return;
    heading.current?.focus({ preventScroll: true });
    heading.current?.closest("section")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [autoFocus, verdict.title]);

  useEffect(() => {
    if (!copyStatus) return;
    const timeout = setTimeout(() => setCopyStatus(null), 2600);
    return () => clearTimeout(timeout);
  }, [copyStatus]);

  const handleCopy = async () => {
    const ok = await copyText(summary);
    setCopyStatus(ok ? "Resumen copiado" : "No se pudo copiar; selecciona el texto a mano");
  };

  return (
    <section className={`verdict ${verdict.kind}`} aria-labelledby="verdict-title">
      <div className="verdict-head">
        <span className="tag">{affected ? "Te afecta" : "No te afecta"}</span>
        <h2 id="verdict-title" ref={heading} tabIndex={-1}>
          {affected ? (
            <>
              Te toca el <mark className="hl">{verdict.deadline.label}</mark>
            </>
          ) : (
            verdict.title
          )}
        </h2>
        <p>{verdict.text}</p>
        {affected && <Countdown days={daysUntil(verdict.deadline.date)} />}
      </div>

      <div className="verdict-body">
        {affected && <Checklist tasks={verdict.todo} />}

        <div>
          <h3>Ten en cuenta</h3>
          <ul className="notes-list">
            {verdict.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>

        <div className="actions">
          <button id="copy-summary" type="button" className="btn primary" onClick={handleCopy}>
            Copiar resumen
          </button>
          <button id="restart" type="button" className="btn ghost" onClick={onRestart}>
            Empezar de nuevo
          </button>
          <span className="copied" role="status">
            {copyStatus}
          </span>
        </div>

        {affected && CONTACT.email && (
          <div className="pitch">
            <p className="who">
              {CONTACT.name} · {CONTACT.role}
            </p>
            <p>
              {NEEDS_DEVELOPER.has(verdict.software)
                ? "Adapto programas a medida, ERPs antiguos y hojas de cálculo a Verifactu, o te ayudo a migrar sin perder tu histórico. Copia el resumen y envíamelo."
                : "Si tu proveedor no te da una respuesta clara o quieres conectar la facturación con el resto de tu negocio, copia el resumen y envíamelo."}
            </p>
            <p className="mail">{CONTACT.email}</p>
          </div>
        )}
      </div>
    </section>
  );
}
