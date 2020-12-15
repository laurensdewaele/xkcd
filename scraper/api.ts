import axios from "axios";

export interface ComicDTO {
  month: string;
  num: number;
  link: string;
  year: string;
  news: string;
  safe_title: string;
  transcript: string;
  alt: string;
  img: string;
  title: string;
  day: string;
}

const URLS = {
  latestComic: "http://xkcd.com/info.0.json",
  specificComic: (no: number): string => `http://xkcd.com/${no}/info.0.json`,
};

const throwFetchError = () => {
  throw new Error("Could not fetch the latest comic.");
};

const getLatestComicDTO = async (): Promise<ComicDTO> => {
  const { data: comicDTO } = await axios.get<ComicDTO>(URLS.latestComic);
  if (!comicDTO) throwFetchError();
  return comicDTO;
};

const getSpecificComicDTO = async (no: number): Promise<ComicDTO> => {
  const { data: comicDTO } = await axios.get<ComicDTO>(URLS.specificComic(no));
  if (!comicDTO) throwFetchError();
  return comicDTO;
};

export const api = {
  getLatestComicDTO,
  getSpecificComicDTO,
};
