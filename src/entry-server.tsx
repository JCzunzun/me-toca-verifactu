/* eslint-disable react-refresh/only-export-components -- este módulo solo se usa al construir, no en el servidor de desarrollo */
import { StrictMode } from "react";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import App from "./App";
import { GUIDES, GUIDES_UPDATED } from "./guides/content";
import { GuidePage } from "./guides/GuidePage";

// Se usa solo al construir: genera el HTML inicial para que buscadores y vistas
// previas de enlaces vean el contenido sin ejecutar JavaScript.
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

// Las guías son páginas estáticas: no llevan JavaScript, solo HTML y CSS.
export function renderGuide(slug: string) {
  const guide = GUIDES.find((g) => g.slug === slug);
  if (!guide) throw new Error(`Guía desconocida: ${slug}`);
  return renderToStaticMarkup(<GuidePage guide={guide} />);
}

export { GUIDES, GUIDES_UPDATED };
