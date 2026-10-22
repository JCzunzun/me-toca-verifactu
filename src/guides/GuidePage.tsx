import { REVIEWED_ON } from "../config";
import { GUIDES, type Guide } from "./content";

// Página estática: se genera en el build y se sirve sin JavaScript.
export function GuidePage({ guide }: { guide: Guide }) {
  const related = GUIDES.filter((g) => g.slug !== guide.slug);

  return (
    <>
      <header className="guide-bar">
        <div className="wrap guide-bar-row">
          <a className="guide-brand" href="/">
            ¿Me toca Verifactu?
          </a>
          <a className="btn primary small" href="/#test">
            Hacer el test
          </a>
        </div>
      </header>

      <main className="guide">
        <article className="wrap guide-article">
          <nav className="crumbs" aria-label="Ruta">
            <a href="/">Inicio</a> <span aria-hidden="true">›</span> <span>{guide.title}</span>
          </nav>
          <h1>{guide.title}</h1>
          <p className="guide-intro">{guide.intro}</p>
          <p className="stamp">Revisado el {REVIEWED_ON}</p>

          {guide.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {section.list && (
                <ul>
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <aside className="guide-cta">
            <h2>¿Te afecta a ti?</h2>
            <p>Responde unas pocas preguntas y sabrás tu fecha límite exacta y qué tienes que hacer.</p>
            <a className="btn primary big" href="/#test">
              Hacer el test gratis
            </a>
          </aside>

          <section>
            <h2>Preguntas rápidas</h2>
            {guide.faqs.map((f) => (
              <div key={f.q} className="guide-faq">
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </section>

          <section className="guide-related">
            <h2>Otras guías</h2>
            <ul>
              {related.map((g) => (
                <li key={g.slug}>
                  <a href={`/${g.slug}`}>{g.title}</a>
                  <span>{g.description}</span>
                </li>
              ))}
            </ul>
          </section>

          <aside className="guide-help">
            <p>
              ¿Tu programa de facturación está hecho a medida o se ha quedado antiguo? Te ayudo a adaptarlo:{" "}
              <a href="https://camilab.es/contacto">escríbeme desde camilab.es</a>.
            </p>
          </aside>
        </article>
      </main>

      <footer className="footer">
        <div className="wrap">
          <p>
            Guía orientativa. No sustituye el consejo de tu asesor fiscal. No es una web oficial de la Agencia
            Tributaria.
          </p>
          <p>
            Basada en el Real Decreto 1007/2023, el Real Decreto-ley 15/2025 y el artículo 201 bis de la Ley General
            Tributaria.
          </p>
          <p>
            Hecho por Juan Camilo Zúñiga · <a href="https://camilab.es">camilab.es</a>
          </p>
        </div>
      </footer>
    </>
  );
}
