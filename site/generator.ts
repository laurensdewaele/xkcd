import * as fs from "fs";

import { Comics } from "../shared/models";
import { readJSON } from "../shared/functions";

const generateHTML = (comics: string, latestComicNo: number): string => {
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
        <link href="./assets/main.css" rel="stylesheet" />
        <script src="./assets/main.js" rel="script"></script>
        <title>xkcd reader</title>
    </head>
    <body>
        <main>
            ${comics}  
        </main>
        <nav>
            <label for="slider">scroll slider</label>
            <input id="slider" type="range" step="1" min="1" max="${latestComicNo}" orient="vertical" />
            <div class="slider-values-container">
                <p>${latestComicNo}</p>
                <p>1</p>
            </div>
            <a class="caret-container" href="javascript:void(0)" onclick="toggleNav()">
                <p id="caret"><</p>
            </a>
        </nav>
    </body>
    </html>
    `;
};

const generateComicHTML = (
  day: number,
  month: number,
  year: number,
  no: number,
  title: string,
  imgWidth: number,
  imgHeight: number
) => {
  return `
  <article>
    <h2>${no}   -   ${title}</h2>
    <a href="./detail.html?${no}">
        <div 
          id="${no}" 
          class="placeholder" 
          style="width: ${imgWidth}px; height: ${imgHeight}px">
        </div>
    </a>
    <h3>${day}/${month}/${year}</h3>
  </article>
  `;
};

export const generateSite = (): void => {
  const comics: Comics = readJSON();
  const descendingComics = Object.values(comics).sort((a, b) => b.no - a.no);

  let comicsHTML = "";
  descendingComics.forEach(
    ({ day, month, year, no, title, imgWidth, imgHeight }) => {
      comicsHTML += generateComicHTML(
        day,
        month,
        year,
        no,
        title,
        imgWidth,
        imgHeight
      );
    }
  );

  const html = generateHTML(comicsHTML, descendingComics[0].no);
  fs.writeFileSync(__dirname + "/static/index.html", html);
};
