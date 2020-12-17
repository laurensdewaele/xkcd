import { ComicDTO } from "../scraper/src/dto";

export interface Comics {
    [num: number]: Comic;
}

export class Comic {
  day: number;
  month: number;
  year: number;
  no: number;
  title: string;
  img: string;
  imgWidth: number;
  imgHeight: number;

  constructor(
    day: number,
    month: number,
    year: number,
    no: number,
    title: string,
    img: string,
    imgWidth: number,
    imgHeight: number
  ) {
    this.day = day;
    this.month = month;
    this.year = year;
    this.no = no;
    this.title = title;
    this.img = img;
    this.imgWidth = imgWidth;
    this.imgHeight = imgHeight;
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
      img,
      imgWidth,
      imgHeight
    );
  }
}
