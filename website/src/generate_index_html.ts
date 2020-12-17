import * as fs from "fs";

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
        <link href="./assets/styles.css" rel="stylesheet">
        <title>xkcd reader</title>
    </head>
    <body>
        <main>
            ${images}
        </main>
    </body>
    </html>
    `;
};

const generateImages = (): string => {
    const COMICS_JSON_PATH = __dirname + "/../../scraper/data/comics.json";
    const comics = JSON.parse(
        fs.readFileSync(COMICS_JSON_PATH, {
            encoding: "utf8",
        })
    );
    let str;
        for (const [comicNo, comic] of Object.entries(comics)) {
            str += `<img src="./assets/images/${comicNo}_thumb.webp">`
        }

    return str;
}

export const generateHTML = ():string => injectImagesIntoHTML(generateImages());

