import * as fs from "fs";

import { Comics } from "./comic";

export const COMICS_JSON_PATH = __dirname + "/../shared/comics.json";

export const readJSON = (): Comics => {
  return JSON.parse(
    fs.readFileSync(COMICS_JSON_PATH, {
      encoding: "utf8",
    })
  );
};
