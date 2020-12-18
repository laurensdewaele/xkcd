import * as fs from "fs";
import * as sharp from "sharp";

import { api } from "./api";
import { Comic, Comics } from "../shared/models";
import { COMICS_JSON_PATH, readJSON } from "../shared/functions";

const writeJSON = (comics: Comics): void => {
  fs.writeFileSync(COMICS_JSON_PATH, JSON.stringify(comics), {
    encoding: "utf8",
  });
};

export const scrape = async (): Promise<void> => {
  try {
    const comics = readJSON();
    const latestComic = await api.getLatestComic();
    for (let num = 1; num <= latestComic.num; num++) {
      // No 1608 and 1663 are interactive comics, add manually.
      if (!(num in comics || (num == 404 || 1608 || 1663))) {
        console.log(`fetching comic no: ${num}`);
        const comic = await api.getSpecificComic(num);
        const imageBuffer = await api.getImageBuffer(comic.img);
        const imgData = await sharp(imageBuffer)
          .resize(280)
          .webp({ quality: 80 })
          .toFile(__dirname + `/../site/static/assets/images/${num}.webp`);
        comics[num] = Comic.fromDTO(comic, `${num}.webp`, 280, imgData.height);
        writeJSON(comics);
      }
    }
  } catch (e) {
    console.log(e);
  }
};
