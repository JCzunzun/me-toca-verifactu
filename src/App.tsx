import { useRef, useState } from "react";
import { FaqList } from "./components/FaqList";
import { Hero } from "./components/Hero";
import { Quiz } from "./components/Quiz";
import { Timeline } from "./components/Timeline";

export default function App() {
  const [interacted, setInteracted] = useState(false);
  const quiz = useRef<HTMLElement>(null);

  const goToQuiz = () => {
    setInteracted(true);
    quiz.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    quiz.current?.querySelector<HTMLInputElement>("fieldset input")?.focus({ preventScroll: true });
  };

  return (
    <>
      <Hero onStart={goToQuiz} />
      <main>
        <Quiz ref={quiz} interacted={interacted} onInteract={() => setInteracted(true)} onRestart={goToQuiz} />
        <Timeline />
        <FaqList />
      </main>
      <footer className="footer">
        <div className="wrap">
          <p>
            Herramienta orientativa. No sustituye el consejo de tu asesor fiscal; ante dudas sobre tu caso concreto,
            consúltalo con él. No es una web oficial de la Agencia Tributaria.
          </p>
          <p>
            Plazos según el Real Decreto-ley 15/2025. Exclusiones según el Real Decreto 1007/2023 (Reglamento de
            sistemas informáticos de facturación).
          </p>
          <p>
            Cada respuesta del test muestra una huella que encadena con la anterior, igual que Verifactu encadena cada
            factura con la previa. Aquí es solo ilustrativa.
          </p>
          <p>
            Hecho por Juan Camilo Zúñiga · <a href="https://camilab.es">camilab.es</a>
          </p>
        </div>
      </footer>
    </>
  );
}
