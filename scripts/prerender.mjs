// Completa el build estático:
// 1. Inserta en dist/index.html el HTML del test, para que no llegue vacío.
// 2. Genera una página HTML por cada guía, con sus propios metadatos y sin JavaScript.
// 3. Escribe el sitemap con todas las URLs.
import { readFile, rm, writeFile } from "node:fs/promises";

const SITE = "https://verifactu.camilab.es";
const { render, renderGuide, GUIDES, GUIDES_UPDATED } = await import("../dist-ssr/entry-server.js");
const dist = (path) => new URL(`../dist/${path}`, import.meta.url);

const template = await readFile(dist("index.html"), "utf8");
const marker = '<div id="root"></div>';
if (!template.includes(marker)) throw new Error("No se encontró el contenedor #root en dist/index.html");

await writeFile(dist("index.html"), template.replace(marker, `<div id="root">${render()}</div>`));

const escape = (text) => text.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");

function setMeta(html, pattern, value) {
  if (!pattern.test(html)) throw new Error(`No se encontró la etiqueta ${pattern}`);
  return html.replace(pattern, (tag) => tag.replace(/(content|href)="[^"]*"/, `$1="${escape(value)}"`));
}

for (const guide of GUIDES) {
  const url = `${SITE}/${guide.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: guide.metaTitle,
        description: guide.description,
        inLanguage: "es-ES",
        dateModified: GUIDES_UPDATED,
        mainEntityOfPage: url,
        image: `${SITE}/og.png`,
        author: { "@type": "Person", name: "Juan Camilo Zúñiga", url: "https://camilab.es/" },
        publisher: { "@type": "Person", name: "Juan Camilo Zúñiga", url: "https://camilab.es/" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "¿Me toca Verifactu?", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: guide.title, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: guide.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  let html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${escape(guide.metaTitle)}</title>`)
    .replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      () => `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`,
    )
    .replace(/<script type="module"[^>]*><\/script>/g, "")
    .replace(/<link rel="modulepreload"[^>]*>/g, "")
    .replace(marker, `<div id="root">${renderGuide(guide.slug)}</div>`);
  html = setMeta(html, /<meta\s+name="description"[^>]*>/, guide.description);
  html = setMeta(html, /<link rel="canonical"[^>]*>/, url);
  html = setMeta(html, /<meta property="og:url"[^>]*>/, url);
  html = setMeta(html, /<meta property="og:title"[^>]*>/, guide.metaTitle);
  html = setMeta(html, /<meta\s+property="og:description"[^>]*>/, guide.description);
  html = setMeta(html, /<meta property="og:type"[^>]*>/, "article");

  await writeFile(dist(`${guide.slug}.html`), html);
}

const urls = [`${SITE}/`, ...GUIDES.map((g) => `${SITE}/${g.slug}`)];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>\n    <loc>${u}</loc>\n    <lastmod>${GUIDES_UPDATED}</lastmod>\n  </url>`).join("\n")}
</urlset>
`;
await writeFile(dist("sitemap.xml"), sitemap);

await rm(new URL("../dist-ssr", import.meta.url), { recursive: true, force: true });
console.log(`Prerender listo: portada y ${GUIDES.length} guías`);
