import * as fs from "fs";

import { api, ComicDTO } from "./api";
import { Comic } from "../data/comic.model";

const fetchMissingComicDTOs = async (
  latestSavedComicNo: number,
  latestComicNo: number
): Promise<Array<ComicDTO>> => {
  const missingComicPromises: Array<Promise<ComicDTO>> = [];

  let comicNoToFetch = latestComicNo;

  // TODO: Re-instate, for now just work with one call.
  missingComicPromises.push(api.getSpecificComicDTO(comicNoToFetch));
  // do {
  //   missingComicsPromises.push(api.getSpecificComicDTO(comicNoToFetch));
  //   comicNoToFetch--;
  // } while (comicNoToFetch != latestSavedComicNo);

  const comicDTOs: Array<ComicDTO> = await Promise.all(missingComicPromises);
  return comicDTOs;
};

const scrape = async (): Promise<void> => {
  let comics: Array<Comic> = [];
  try {
    comics = JSON.parse(
      fs.readFileSync("../data/comics.json", {
        encoding: "utf8",
      })
    );
  } catch (e) {
    console.log(
      "Error in parsing the comics.json file, fetching all comics..."
    );
  }

  let latestComicDTO: ComicDTO;
  try {
    latestComicDTO = await api.getLatestComicDTO();
    console.log(latestComicDTO);
  } catch (e) {
    console.log("Error in catching the latest comic");
  }
  if (!latestComicDTO) return;

  const latestSavedComicNo = comics[comics.length - 1]?.no || 0;
  const latestComicNo = latestComicDTO.num;

  if (latestSavedComicNo < latestComicNo) {
    console.log("Fetching missing comics...");
    const missingComicDTOs = await fetchMissingComicDTOs(
      latestSavedComicNo,
      latestComicNo
    );
    console.log(missingComicDTOs);
  } else {
    console.log("There's no new comic available.");
  }
};

scrape();
