import * as fs from "fs";
import { readJSON } from "../shared/functions";

const generateHTML = (images: string): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="author" content="Laurens Dewaele" />
        <meta name="description" content="xkcd reader" />
        <meta name="keywords" content="xkcd, embark studios" />
        <meta name="color-scheme" content="normal" />
        <meta name="robots" content="index,follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="./assets/styles.css" rel="stylesheet" />
        <script src="./assets/js.js" rel="script"></script>
        <title>xkcd reader</title>
    </head>
    <body>
      ${images}
    </body>
    </html>
    `;
};

const generateImages = (): string => {
  const comics = readJSON();
  let str = "";
  Object.values(comics).sort((a, b) => b.no - a.no).forEach((comic) => {
    str += `<div 
                id="${comic.no}" 
                class="placeholder" 
                style="width: 280px; height: ${comic.imgHeight}px">
            </div>`;
  })
  return str;
};

export const generate = (): void => {
  const html = generateHTML(generateImages());
  fs.writeFileSync(__dirname + "/static/index.html", html);
};
