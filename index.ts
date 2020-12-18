import { scrape } from "./scraper/scraper";
import { generateSite } from "./site/generator";

const run = async (): Promise<void> => {
  await scrape();
  generateSite();
};

run();
