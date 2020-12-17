import * as fs from "fs";
import { Comics } from "../../shared/comic";

const injectImagesIntoHTML = (images: string): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="author" content="Laurens Dewaele" />
        <meta name="description" content="xkcd reader" />
        <meta name="keywords" content="xkcd" />
        <meta name="color-scheme" content="normal" />
        <meta name="robots" content="index,follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="./assets/styles.css" rel="stylesheet" />
        <script src="./assets/js.js" rel="script" />
        <title>xkcd reader</title>
    </head>
    <body>
      ${images}
    </body>
    </html>
    `;
};

const generateImages = (): string => {
  const COMICS_JSON_PATH = __dirname + "/../../shared/comics.json";
  const comics: Comics = JSON.parse(
    fs.readFileSync(COMICS_JSON_PATH, {
      encoding: "utf8",
    })
  );
  let str = "";
  for (const [comicNo, comic] of Object.entries(comics)) {
    str += `<div id="${comicNo}" class="placeholder" style="width: 280px; height: ${comic.imgHeight}px"></div>`;
  }

  return str;
};

export const generateHTML = (): string =>
  injectImagesIntoHTML(generateImages());
