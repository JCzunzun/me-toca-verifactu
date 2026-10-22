/// <reference types="vitest/config" />
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";
import { FAQS } from "./src/lib/faq";

const SITE = "https://verifactu.camilab.es/";

// Los datos estructurados se generan a partir de las mismas preguntas frecuentes que
// muestra la página, así Google y la web nunca dicen cosas distintas.
function structuredData(): Plugin {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "¿Me toca Verifactu?",
        url: SITE,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        inLanguage: "es-ES",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
        author: { "@type": "Person", name: "Juan Camilo Zúñiga", url: "https://camilab.es/" },
      },
      {
        "@type": "WebPage",
        "@id": SITE,
        url: SITE,
        name: "¿Me toca Verifactu? Comprueba si te afecta y tu fecha límite",
        inLanguage: "es-ES",
        dateModified: "2026-10-23",
        primaryImageOfPage: SITE + "og.png",
        isPartOf: { "@type": "WebSite", name: "Camilab", url: "https://camilab.es/" },
        about: { "@type": "Thing", name: "Verifactu" },
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
  return {
    name: "structured-data",
    transformIndexHtml: () => [
      { tag: "script", attrs: { type: "application/ld+json" }, children: JSON.stringify(graph), injectTo: "head" },
    ],
  };
}

// `npm run build:single` genera un único index.html autocontenido (útil para demos).
export default defineConfig(({ mode }) => ({
  plugins: [react(), structuredData(), ...(mode === "single" ? [viteSingleFile()] : [])],
  build: mode === "single" ? { outDir: "dist-single" } : undefined,
  test: { environment: "node" },
}));
