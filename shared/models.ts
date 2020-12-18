import { ComicDTO } from "../scraper/dto";

export interface Comics {
  [num: number]: Comic;
}

export class Comic {
  day: number;
  month: number;
  year: number;
  no: number;
  title: string;
  safeTitle: string;
  originalImg: string;
  img: string;
  imgWidth: number;
  imgHeight: number;
  link: string;
  news: string;
  transcript: string;
  alt: string;

  constructor(
    day: number,
    month: number,
    year: number,
    no: number,
    title: string,
    safeTitle: string,
    originalImg: string,
    img: string,
    imgWidth: number,
    imgHeight: number,
    link: string,
    news: string,
    transcript: string,
    alt: string
  ) {
    this.day = day;
    this.month = month;
    this.year = year;
    this.no = no;
    this.title = title;
    this.safeTitle = safeTitle;
    this.originalImg = originalImg;
    this.img = img;
    this.imgWidth = imgWidth;
    this.imgHeight = imgHeight;
    this.link = link;
    this.news = news;
    this.transcript = transcript;
    this.alt = alt;
  }

  static fromDTO(
    DTO: ComicDTO,
    img: string,
    imgWidth: number,
    imgHeight: number
  ): Comic {
    const day = parseInt(DTO.day);
    const month = parseInt(DTO.month);
    const year = parseInt(DTO.year);
    return new Comic(
      day,
      month,
      year,
      DTO.num,
      DTO.title,
      DTO.safe_title,
      DTO.img,
      img,
      imgWidth,
      imgHeight,
      DTO.link,
      DTO.news,
      DTO.transcript,
      DTO.alt
    );
  }
}
