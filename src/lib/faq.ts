export interface Faq {
  id: string;
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  {
    id: "que-es",
    q: "¿Qué es Verifactu?",
    a: "Es el sistema que obliga a los programas de facturación a registrar cada factura de forma que no se pueda alterar después. Cada registro lleva una huella que lo encadena con el anterior, y la factura incluye un código QR que tu cliente puede comprobar en la web de Hacienda.",
  },
  {
    id: "cuando",
    q: "¿Cuándo es obligatorio Verifactu?",
    a: "Para las sociedades, es decir, las que pagan Impuesto sobre Sociedades, el 1 de enero de 2027. Para los autónomos y el resto de obligados, el 1 de julio de 2027. Durante 2026 su uso es voluntario.",
  },
  {
    id: "autonomos",
    q: "¿Verifactu afecta a los autónomos?",
    a: "Sí, si emiten sus facturas con un programa informático. Tributar en módulos o en estimación directa no cambia nada: lo que cuenta es cómo facturas.",
  },
  {
    id: "envio",
    q: "¿Tengo que enviar mis facturas a Hacienda?",
    a: "No necesariamente. Puedes elegir el modo VERI*FACTU, en el que tu programa envía cada registro a Hacienda en el momento, o el modo sin envío, en el que el programa guarda los registros firmados y los entrega si Hacienda los pide.",
  },
  {
    id: "declaracion",
    q: "¿Qué es la declaración responsable?",
    a: "Un documento en el que el fabricante del programa afirma que cumple el reglamento. No es un certificado de Hacienda. Pídeselo a tu proveedor: si no lo tiene, su programa no te sirve a partir de tu fecha límite.",
  },
  {
    id: "excel",
    q: "¿Puedo seguir facturando con Excel o Word?",
    a: "Sí, si solo los usas para escribir, imprimir y guardar las facturas. Si tu hoja calcula el IVA, lleva los libros registro o saca otros datos fiscales, cuenta como sistema de facturación y tendría que cumplir.",
  },
  {
    id: "foral",
    q: "¿Afecta Verifactu en el País Vasco y Navarra?",
    a: "No. Con domicilio fiscal en el País Vasco se aplica TicketBAI, y en Navarra, la normativa foral navarra. Cada territorio tiene su propio calendario.",
  },
  {
    id: "sii",
    q: "¿Y si llevo los libros de IVA por el SII?",
    a: "Quien está en el Suministro Inmediato de Información queda fuera de Verifactu. Si dejas el SII, pasarías a estar obligado con los plazos generales.",
  },
  {
    id: "multas",
    q: "¿Qué pasa si no me adapto?",
    a: "Usar un programa que no cumple puede suponer multas de hasta 50.000 € por cada ejercicio. Para quien fabrica o vende programas que no cumplen, la multa puede llegar a 150.000 €.",
  },
  {
    id: "factura-electronica",
    q: "¿Es lo mismo que la factura electrónica obligatoria?",
    a: "No. La factura electrónica entre empresas es otra obligación distinta, con su propio calendario. Verifactu trata de cómo registra tu programa las facturas; la factura electrónica, del formato en que se las envías a tus clientes.",
  },
];
