# ¿Me toca Verifactu?

**Pruébalo en [verifactu.camilab.es](https://verifactu.camilab.es)**

Herramienta web que responde en un minuto si el sistema Verifactu de la Agencia Tributaria afecta a un autónomo o una empresa, cuál es su fecha límite y qué tiene que hacer.

## Qué hace

- Cuestionario adaptativo de 2 a 6 preguntas: solo pregunta lo que cambia el resultado.
- Veredicto con fecha límite (1 de enero de 2027 para sociedades, 1 de julio de 2027 para autónomos y resto) y cuenta atrás en días.
- Lista de tareas según el tipo de programa de facturación (comercial, antiguo, a medida o Excel con cálculos), marcable y guardada en el navegador.
- Exclusiones contempladas: sin facturación, País Vasco (TicketBAI), Navarra, SII, facturas a mano y plantillas Word/Excel sin cálculos fiscales.
- Calendario con la posición de hoy y preguntas frecuentes.
- Botón para copiar un resumen del caso y bloque opcional de contacto (`src/config.ts`).

## Stack

React 19 · TypeScript · Vite · Vitest. CSS propio con tokens de diseño y sin librerías de UI. Prettier y ESLint para el formato.

## Scripts

```bash
npm install
npm run dev           # desarrollo
npm test              # tests de la lógica
npm run format        # formato con Prettier
npm run build         # build estática en dist/, con el HTML pre-renderizado para SEO
npm run build:single  # un único index.html autocontenido en dist-single/
```

## Estructura

```
src/
  lib/steps.ts        preguntas y cuándo se muestra cada una
  lib/verifactu.ts    veredicto, plazos, cadena de respuestas y progreso
  lib/timeline.ts     hitos del calendario
  lib/faq.ts          preguntas frecuentes
  lib/clipboard.ts    copiar al portapapeles con alternativa para navegadores antiguos
  components/         Hero, Quiz, QuestionStep, AnsweredStep, Verdict, Checklist, Countdown, Timeline, FaqList
  hooks/              useStoredState (localStorage) y useCountUp (contador animado)
  config.ts           contacto y fecha de revisión normativa
```

La lógica de negocio vive en funciones puras sin React, de modo que se testea sola y se puede reutilizar en otro frontend o en una API.

## Fuentes normativas

- Real Decreto 1007/2023 (Reglamento de sistemas informáticos de facturación).
- Real Decreto-ley 15/2025 (aplaza la obligatoriedad a 2027).

Herramienta orientativa; no sustituye el asesoramiento fiscal. Normativa revisada el 23/10/2026.
