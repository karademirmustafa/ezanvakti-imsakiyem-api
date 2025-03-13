import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ezan Vakti API - İmsakiyem",
      version: "0.0.1",
      description: "T.C. Diyanet İşleri Başkanlığı tarafından yayınlanan, dünya genelindeki ülkelerin ezan vakitlerini haftalık, aylık ve yıllık olarak sunan API hizmetidir.Kaynak kodlarına GitHub üzerinden ulaşabilirsiniz: [GitHub Repository](https://github.com/karademirmustafa/ezanvakti-imsakiyem-api)",
    },
    servers: [
      {
        url: "https://ezanvakti.imsakiye.com",
        description: "Production server",
      },
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/docs/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec };
