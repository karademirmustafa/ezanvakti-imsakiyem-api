import fs from "fs";
import marked from "marked";

export const renderMarkdown = (filePath): string => {
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");

    const htmlContent = marked.parse(fileContent);

    return `
      <!DOCTYPE html>
      <html lang="tr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>README.md</title>
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
    return "<h1>Sayfaya ulaşılamıyor</h1>";
  }
};
