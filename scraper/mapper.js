"use strict";
exports.__esModule = true;
exports.mapComicDTOtoModel = void 0;
var mapComicDTOtoModel = function (_a) {
  var month = _a.month,
    num = _a.num,
    alt = _a.alt,
    day = _a.day,
    img = _a.img,
    link = _a.link,
    news = _a.news,
    safe_title = _a.safe_title,
    title = _a.title,
    transcript = _a.transcript,
    year = _a.year;
  return {
    month: month,
    no: num,
    link: link,
    year: year,
    news: news,
    safe_title: safe_title,
    transcript: transcript,
    alt: alt,
    title: title,
    day: day,
    originalImgURL: img,
    thumbnailImgPath: null,
    optimizedImgPath: null,
  };
};
exports.mapComicDTOtoModel = mapComicDTOtoModel;
