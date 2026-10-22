import { GUIDES } from "../guides/content";

export function GuideLinks() {
  return (
    <section className="section" aria-labelledby="guides-title">
      <div className="wrap">
        <h2 id="guides-title" className="section-title">
          Guías rápidas
        </h2>
        <p className="section-lede">Las dudas más buscadas sobre Verifactu, explicadas en cinco minutos.</p>
        <ul className="guide-cards">
          {GUIDES.map((g) => (
            <li key={g.slug}>
              <a href={`/${g.slug}`}>
                <h3>{g.title}</h3>
                <p>{g.description}</p>
                <span className="guide-more">
                  Leer la guía <span aria-hidden="true">›</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
