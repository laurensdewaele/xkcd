import * as fs from "fs";

import { api } from "./api";
import { Comic } from "./dto";

const COMICS_JSON_PATH = __dirname + "/../data/comics.json";

interface Comics {
  [num: number]: Comic;
}

const readJSON = (): Comics => {
  return JSON.parse(
    fs.readFileSync(COMICS_JSON_PATH, {
      encoding: "utf8",
    })
  );
};

const writeJSON = (comics: Comics): void => {
  fs.writeFileSync(COMICS_JSON_PATH, JSON.stringify(comics), {
    encoding: "utf8",
  });
};

const writeImage = (imageBuffer: Buffer, imgUrl: string, comicNum: number): void => {
  const extension = imgUrl.match(/\.[0-9a-z]+$/i)[0];
  fs.writeFileSync(__dirname + `/../data/images/${comicNum}${extension}`, imageBuffer, {
    encoding: "base64",
  });
}

export const scrape = async (): Promise<void> => {
  try {
    const comics = readJSON();
    const latestComic = await api.getLatestComic();
    comics[latestComic.num] = latestComic;
    for (let num = 1; num < latestComic.num; num++) {
      if (!(num in comics || num == 404)) {
        console.log(`fetching comic no: ${num}`);
        const comic = await api.getSpecificComic(num);
        comics[num] = comic;
        const imageBuffer = await api.getImageBuffer(comic.img);
        writeImage(imageBuffer, comic.img, num);
        writeJSON(comics);
      }
    }
  } catch (e) {
    console.log(e);
  }
};
