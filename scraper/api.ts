import { ComicDTO } from "./dto";
import { httpService } from "./http.service";

const BASE_URL = "http://xkcd.com";
const URLS = {
  latestComic: BASE_URL + "/info.0.json",
  specificComic: (no: number): string => `${BASE_URL}/${no}/info.0.json`,
};

const throwFetchError = (): void => {
  throw new Error("Could not fetch");
};

const getLatestComicDTO = async (): Promise<ComicDTO> => {
  const { data: comicDTO } = await httpService.get<ComicDTO>(URLS.latestComic);
  if (!comicDTO) throwFetchError();
  return comicDTO;
};

const getSpecificComicDTO = async (no: number): Promise<ComicDTO> => {
  const { data: comicDTO } = await httpService.get<ComicDTO>(
    URLS.specificComic(no)
  );
  if (!comicDTO) throwFetchError();
  return comicDTO;
};

export const api = {
  getLatestComicDTO,
  getSpecificComicDTO,
};
