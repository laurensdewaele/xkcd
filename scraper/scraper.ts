import * as fs from "fs";

import { api } from "./api";
import { Comic } from "../data/comic.model";
import { ComicDTO } from "./dto";
import { COMICS_JSON_PATH, UNAVAILABLE_COMIC_NOS } from "./constants";
import { mapComicDTOtoModel } from "./mapper";

const fetchMissingComicDTOs = async (
  savedComicNos: Array<number>,
  latestComicNo: number
): Promise<Array<ComicDTO>> => {
  const comicsToFetch =
    latestComicNo - savedComicNos.length - UNAVAILABLE_COMIC_NOS.length;
  const missingComicDTOs = [];
  const failedComicFetchNos = [];
  const promises = [];

  console.log(`fetching ${comicsToFetch} comics...`);

  for (
    let comicNoToFetch = 1;
    comicNoToFetch < latestComicNo;
    comicNoToFetch++
  ) {
    if (
      !savedComicNos.includes(comicNoToFetch) &&
      !UNAVAILABLE_COMIC_NOS.includes(comicNoToFetch)
    ) {
      // In case a single http call fails, we still want to save that data.
      // Therefore we're not using Promise.all
      const promise = new Promise<void>((resolve) => {
        api
          .getSpecificComicDTO(comicNoToFetch)
          .then((comicDTO) => {
            missingComicDTOs.push(comicDTO);
            resolve();
          })
          .catch((e) => {
            failedComicFetchNos.push(comicNoToFetch);
            console.log(
              `Could not fetch comic no ${comicNoToFetch}`,
              e.message
            );
            resolve();
          });
      });
      promises.push(promise);
    }
  }

  await Promise.all(promises);
  if (failedComicFetchNos.length > 0) {
    console.log("Failed comics to fetch:", failedComicFetchNos.toString());
    console.log(
      `Failed percentage: ${
        (failedComicFetchNos.length / comicsToFetch) * 100
      }%`
    );
    // TODO: Implement retry
  }
  return missingComicDTOs;
};

const readComicsJSON = (): Array<Comic> => {
  let comics: Array<Comic> = [];
  try {
    comics = JSON.parse(
      fs.readFileSync(COMICS_JSON_PATH, {
        encoding: "utf8",
      })
    );
  } catch (e) {
    console.log("Error in parsing comics.json, fetching all comics...");
  }
  return comics;
};

const saveComicsToJSON = (comics: Array<Comic>): void => {
  try {
    fs.writeFileSync(COMICS_JSON_PATH, JSON.stringify(comics), {
      encoding: "utf8",
    });
  } catch (e) {
    console.log(
      "There was an error in writing the new comics to the JSON file",
      e
    );
  }
};

const scrape = async (): Promise<void> => {
  const comics = readComicsJSON();

  let latestComicDTO;
  try {
    latestComicDTO = await api.getLatestComicDTO();
  } catch (e) {
    // TODO: Implement retry
    console.log("Error in fetching the latest comic, exiting...");
    process.exit(1);
  }

  const savedComicNos: Array<number> = comics.map((comic) => comic.no);
  const missingComicDTOs = await fetchMissingComicDTOs(
    savedComicNos,
    latestComicDTO.num
  );
  const missingComics = missingComicDTOs.map((comicDTO) =>
    mapComicDTOtoModel(comicDTO)
  );
  const latestComic = mapComicDTOtoModel(latestComicDTO);
  comics.push(...missingComics, latestComic);
  comics.sort((a, b) => a.no - b.no);
  saveComicsToJSON(comics);
};

scrape();
