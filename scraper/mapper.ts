import { Comic } from "../data/comic.model";
import { ComicDTO } from "./dto";

export const mapComicDTOtoModel = ({
  month,
  num,
  alt,
  day,
  img,
  link,
  news,
  safe_title,
  title,
  transcript,
  year,
}: ComicDTO): Comic => {
  return {
    month,
    no: num,
    link,
    year,
    news,
    safe_title,
    transcript,
    alt,
    title,
    day,
    originalImgURL: img,
    thumbnailImgPath: null,
    optimizedImgPath: null,
  };
};
