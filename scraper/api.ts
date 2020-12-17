import axios from "axios";

import { ComicDTO } from "./dto";

const URLS = {
  latestComic: "http://xkcd.com/info.0.json",
  specificComic: (no: number): string => `http://xkcd.com/${no}/info.0.json`,
};

const getLatestComic = async (): Promise<ComicDTO> => {
  const { data: comic } = await axios.get<ComicDTO>(URLS.latestComic);
  return comic;
};

const getSpecificComic = async (no: number): Promise<ComicDTO> => {
  const { data: comic } = await axios.get<ComicDTO>(URLS.specificComic(no));
  return comic;
};

const getImageBuffer = async (url: string): Promise<Buffer> => {
  const { data } = await axios.get<string>(url, {
    responseType: "arraybuffer",
  });
  return Buffer.from(data, "base64");
};

export const api = {
  getLatestComic,
  getSpecificComic,
  getImageBuffer,
};
