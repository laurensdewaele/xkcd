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
    currentComic: 'http://xkcd.com/info.0.json',
    specificComic: (no: number): string => `http://xkcd.com/{no}/info.0.json`,
}

const getCurrentComic = async(): Promise<ComicDTO> => {
    const { data: comic } = await axios.get<ComicDTO>(URLS.currentComic);
    return comic;
}

const getSpecificComic = async(no: number): Promise<ComicDTO> => {
    const { data: comic } = await axios.get<ComicDTO>(URLS.specificComic(no));
    return comic;
}

export const api = {
    getCurrentComic,
    getSpecificComic
}
