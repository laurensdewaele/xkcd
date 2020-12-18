import * as fs from "fs";

import { Comics } from "./models";

export const COMICS_JSON_PATH =
  __dirname + "/../site/static/assets/comics.json";

export const readJSON = (): Comics => {
  return JSON.parse(
    fs.readFileSync(COMICS_JSON_PATH, {
      encoding: "utf8",
    })
  );
};
