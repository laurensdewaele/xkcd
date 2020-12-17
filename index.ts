import { scrape } from "./scraper/scraper";
import { generate } from "./site/generator";

const run = async (): Promise<void> => {
  // await scrape();
  generate();
};

run();
