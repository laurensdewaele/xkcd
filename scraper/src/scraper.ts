import * as fs from "fs";
import * as sharp from "sharp";

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

const createThumbnail = async (
  imageBuffer: Buffer,
  comicNo: number
): Promise<void> => {
  await sharp(imageBuffer)
    .resize(280)
    .webp({ quality: 80 })
    .toFile(__dirname + `/../data/images/${comicNo}_thumb.webp`);
};

export const scrape = async (): Promise<void> => {
  try {
    const comics = readJSON();
    const latestComic = await api.getLatestComic();
    comics[latestComic.num] = latestComic;
    for (let num = 1; num < latestComic.num; num++) {
      if (!(num in comics || num == 404)) {
        console.log(`fetching and optimizing for comic no: ${num}`);
        const comic = await api.getSpecificComic(num);
        comics[num] = comic;
        const imageBuffer = await api.getImageBuffer(comic.img);
        await createThumbnail(imageBuffer, num);
        writeJSON(comics);
      }
    }
  } catch (e) {
    console.log(e);
  }
};
