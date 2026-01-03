import fs from "fs";
import path from "path";
import marked from "marked";

export const renderMarkdown = (filePath: string, lang: string = "tr"): string => {
  try {
    if (!fs.existsSync(filePath)) {
      return `
        <!DOCTYPE html>
        <html lang="${lang}">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>File Not Found</title>
        </head>
        <body>
          <h1>${lang === "tr" ? "Dosya bulunamadı" : "File not found"}</h1>
          <p>${lang === "tr" ? "İstenen dosya bulunamadı." : "The requested file could not be found."}</p>
        </body>
        </html>
      `;
    }

    const fileContent = fs.readFileSync(filePath, "utf8");
    const htmlContent = marked.parse(fileContent);

    return `
      <!DOCTYPE html>
      <html lang="${lang}">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${path.basename(filePath)}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
            padding: 0;
          }
          h1, h2, h3 {
            color: #333;
          }
          a {
            color: #007BFF;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          pre {
            background-color: #f4f4f4;
            padding: 10px;
            border-radius: 5px;
            overflow-x: auto;
          }
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
    </html>
    `;
  } catch (error) {
    return `
      <!DOCTYPE html>
      <html lang="${lang}">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Error</title>
      </head>
      <body>
        <h1>${lang === "tr" ? "Sayfaya ulaşılamıyor" : "Page unavailable"}</h1>
        <p>${lang === "tr" ? "Bir hata oluştu." : "An error occurred."}</p>
      </body>
      </html>
    `;
  }
};
