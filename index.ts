import { scrape } from "./scraper/scraper";
import { generateStaticSite } from "./site/generator";

const run = async (): Promise<void> => {
  // await scrape();
  generateStaticSite();
};

run();
