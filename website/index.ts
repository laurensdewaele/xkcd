import {generateHTML} from "./src/generate_index_html";
import * as fs from "fs";

fs.writeFileSync(__dirname + "/static/index.html", generateHTML());