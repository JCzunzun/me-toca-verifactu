import { REVIEWED_ON } from "../config";

export function Hero({ onStart }: { onStart: () => void }) {
  return (
    <header className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1>¿Me toca Verifactu?</h1>
          <p className="lede">
            Hacienda cambia cómo deben registrar sus facturas los autónomos y las empresas. Responde unas pocas
            preguntas y te digo si te afecta, desde cuándo y qué tienes que hacer.
          </p>
          <div className="hero-actions">
            <button type="button" className="btn primary big" onClick={onStart}>
              Hacer el test
            </button>
            <span className="facts">2 minutos · gratis · sin registrarte</span>
          </div>
          <p className="stamp">Normativa revisada el {REVIEWED_ON}</p>
        </div>

        <div className="notes" aria-label="Fechas límite">
          <div className="note note-yellow">
            <span className="note-who">Sociedades</span>
            <span className="note-date">1 ene 2027</span>
            <span className="note-sub">SL, SA, cooperativas…</span>
          </div>
          <div className="note note-pink">
            <span className="note-who">Autónomos</span>
            <span className="note-date">1 jul 2027</span>
            <span className="note-sub">y el resto de obligados</span>
          </div>
        </div>
      </div>
    </header>
  );
}
