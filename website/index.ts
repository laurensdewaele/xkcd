import {generateHTML} from "./src/generate_index_html";
import * as fs from "fs";

fs.writeFileSync(__dirname + "/st" +
    "atic/index.html", generateHTML());