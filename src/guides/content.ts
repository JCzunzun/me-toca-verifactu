export interface GuideSection {
  heading: string;
  paragraphs: string[];
  list?: string[];
}

export interface Guide {
  slug: string;
  // Título de la pestaña y de Google: la búsqueda principal va al principio.
  metaTitle: string;
  description: string;
  title: string;
  intro: string;
  sections: GuideSection[];
  faqs: { q: string; a: string }[];
}

export const GUIDES_UPDATED = "2026-10-23";

export const GUIDES: Guide[] = [
  {
    slug: "verifactu-autonomos",
    metaTitle: "Verifactu para autónomos: fecha límite y qué tienes que hacer",
    description:
      "Si eres autónomo y facturas con un programa, Verifactu te afecta desde el 1 de julio de 2027. Quién queda fuera, qué cambia y los pasos para adaptarte.",
    title: "Verifactu para autónomos",
    intro:
      "Si eres autónomo y emites tus facturas con un programa, Verifactu te afecta. Tienes hasta el 1 de julio de 2027 para que ese programa cumpla. Aquí tienes lo que cambia, quién se libra y qué hacer.",
    sections: [
      {
        heading: "¿Me afecta si soy autónomo?",
        paragraphs: [
          "Sí, si facturas con un programa informático: una aplicación de facturación, un ERP, un TPV o una hoja de cálculo que funcione como programa de facturación.",
          "Tributar en módulos o en estimación directa no cambia nada. Lo que decide si te afecta es la herramienta con la que emites las facturas, no cómo pagas el IRPF.",
        ],
      },
      {
        heading: "¿Cuándo es obligatorio?",
        paragraphs: [
          "Para los autónomos y el resto de obligados, el 1 de julio de 2027. Las sociedades tienen como fecha el 1 de enero de 2027. Hasta entonces el uso es voluntario, así que puedes ir probando sin riesgo.",
          "Las comunidades de bienes y las sociedades civiles siguen la fecha de los autónomos.",
        ],
      },
      {
        heading: "Quién queda fuera",
        paragraphs: ["Verifactu no se te aplica en estos casos:"],
        list: [
          "No emites facturas en tu actividad.",
          "Haces las facturas a mano, en talonario.",
          "Usas Word o Excel solo para escribirlas, imprimirlas y guardarlas.",
          "Tienes tu domicilio fiscal en el País Vasco (TicketBAI) o en Navarra (normativa foral).",
          "Llevas los libros de IVA por el SII.",
        ],
      },
      {
        heading: "Qué tienes que hacer",
        paragraphs: ["Si te afecta, estos son los pasos, en orden:"],
        list: [
          "Pregunta a tu proveedor si su programa ya cumple Verifactu y si ha firmado la declaración responsable.",
          "Si usas un programa antiguo o hecho a medida, planifica ya su adaptación o el cambio a otro.",
          "Elige el modo: con envío automático de cada factura a Hacienda o sin envío, guardando los registros.",
          "Haz pruebas antes de tu fecha y comprueba que tus facturas salen con el código QR.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Cuándo tienen que cumplir Verifactu los autónomos?",
        a: "El 1 de julio de 2027. Hasta esa fecha su uso es voluntario.",
      },
      {
        q: "¿Estar en módulos me libra de Verifactu?",
        a: "No. Si emites facturas con un programa informático, Verifactu te afecta igual que en estimación directa.",
      },
    ],
  },
  {
    slug: "verifactu-excel",
    metaTitle: "Verifactu y Excel: ¿puedo seguir facturando con una hoja de cálculo?",
    description:
      "Cuándo facturar con Excel o Word no te obliga a cumplir Verifactu y cuándo sí. Ejemplos claros y qué hacer si tu hoja cuenta como programa de facturación.",
    title: "Verifactu y Excel",
    intro:
      "Muchos autónomos y pequeños negocios facturan con una plantilla de Excel o de Word. La buena noticia: en muchos casos pueden seguir haciéndolo. Depende de lo que haga la hoja.",
    sections: [
      {
        heading: "Cuándo puedes seguir con Excel o Word",
        paragraphs: [
          "Si usas la hoja de cálculo o el procesador de textos solo para escribir la factura, imprimirla o guardarla en PDF, no cuenta como sistema de facturación y Verifactu no se te aplica.",
          "Es el caso típico de una plantilla en la que rellenas a mano los datos del cliente, los conceptos y los importes.",
        ],
      },
      {
        heading: "Cuándo tu Excel cuenta como programa de facturación",
        paragraphs: ["La cosa cambia si la hoja hace el trabajo de un programa de facturación. Por ejemplo:"],
        list: [
          "Macros que numeran las facturas y llevan el registro de todas las emitidas.",
          "Fórmulas que generan los libros registro de IVA o los totales para tus declaraciones.",
          "Un libro que guarda el histórico de facturas y saca datos fiscales a partir de él.",
        ],
      },
      {
        heading: "Qué hacer si tu hoja cuenta como programa",
        paragraphs: ["Tienes tres caminos:"],
        list: [
          "Pasarte a un programa de facturación que ya cumpla Verifactu.",
          "Simplificar la hoja para usarla solo como plantilla de escritura e impresión.",
          "Si dependes de ella, convertirla en una herramienta a medida que cumpla el reglamento.",
        ],
      },
      {
        heading: "La fecha es la misma",
        paragraphs: [
          "Si tu Excel cuenta como programa, te aplican los plazos generales: 1 de enero de 2027 para sociedades y 1 de julio de 2027 para autónomos.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Puedo facturar con Excel con Verifactu?",
        a: "Sí, si solo usas Excel para escribir, imprimir y guardar las facturas. Si la hoja numera, registra o calcula datos fiscales como un programa de facturación, tendría que cumplir Verifactu.",
      },
      {
        q: "¿Y si facturo con Word?",
        a: "Usar Word como plantilla para redactar e imprimir facturas no te obliga a cumplir Verifactu.",
      },
    ],
  },
  {
    slug: "multas-verifactu",
    metaTitle: "Multas de Verifactu: cuánto son y cómo evitarlas",
    description:
      "Usar un programa de facturación que no cumple Verifactu puede costar hasta 50.000 € por ejercicio. Quién puede ser multado, desde cuándo y cómo evitarlo.",
    title: "Multas de Verifactu",
    intro:
      "Verifactu tiene un régimen de sanciones propio, recogido en el artículo 201 bis de la Ley General Tributaria. Las cantidades son altas, así que conviene saber qué se castiga y cómo evitarlo.",
    sections: [
      {
        heading: "Cuánto pueden ser",
        paragraphs: ["Las multas son de importe fijo y distinguen entre quien usa el programa y quien lo fabrica:"],
        list: [
          "Usuarios: hasta 50.000 € por cada ejercicio, por usar un programa que no cumple o que se ha alterado.",
          "Fabricantes y comercializadores: hasta 150.000 € por ejercicio y por cada tipo de programa que no cumpla.",
        ],
      },
      {
        heading: "Desde cuándo",
        paragraphs: [
          "Se aplican a partir de tu fecha de obligatoriedad: el 1 de enero de 2027 si eres una sociedad y el 1 de julio de 2027 si eres autónomo. Hasta entonces Verifactu es voluntario.",
        ],
      },
      {
        heading: "Cómo evitarlas",
        paragraphs: ["La clave está en el programa con el que facturas:"],
        list: [
          "Usa un programa cuyo fabricante haya firmado la declaración responsable de cumplimiento.",
          "No modifiques ni borres registros de facturación a mano.",
          "Si tu programa es antiguo o está hecho a medida, adáptalo antes de tu fecha.",
          "Comprueba que tus facturas incluyen el código QR.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Cuánto es la multa por no cumplir Verifactu?",
        a: "Para quien usa un programa que no cumple, hasta 50.000 € por ejercicio. Para fabricantes y comercializadores, hasta 150.000 € por ejercicio y tipo de programa.",
      },
      {
        q: "¿Me pueden multar en 2026?",
        a: "No por Verifactu: durante 2026 su uso es voluntario. Las sanciones se aplican desde tu fecha de obligatoriedad.",
      },
    ],
  },
];
