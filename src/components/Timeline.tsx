import type { CSSProperties } from "react";
import { MILESTONES, milestoneStatus, todayPercent } from "../lib/timeline";

const STATUS_LABEL = { past: "Ya en vigor", current: "En curso", next: "Próximo" } as const;

export function Timeline() {
  const now = new Date();
  const percent = todayPercent(now);
  const today = now.toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" });

  return (
    <section className="section" aria-labelledby="timeline-title">
      <div className="wrap">
        <h2 id="timeline-title" className="section-title">
          El calendario
        </h2>
        <p className="section-lede">Dónde estamos hoy y qué viene después.</p>

        <div
          className="track"
          role="img"
          aria-label={`Hoy, ${today}, el calendario va por el ${Math.round(percent)} %`}
        >
          <div className="track-bar">
            <div className="track-fill" style={{ width: `${percent}%` }} />
          </div>
          <div className="track-today" style={{ left: `${percent}%` }}>
            <span>Hoy · {today}</span>
          </div>
        </div>

        <ol className="milestones">
          {MILESTONES.map((milestone, i) => {
            const status = milestoneStatus(milestone, now);
            return (
              <li key={milestone.id} className={`milestone ${status}`} style={{ "--i": i } as CSSProperties}>
                <div className="ms-top">
                  <span className="ms-date">{milestone.label}</span>
                  <span className={`chip ${status}`}>{STATUS_LABEL[status]}</span>
                </div>
                <h3>{milestone.title}</h3>
                <p>{milestone.text}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
