const puppeteer = require("puppeteer");
const colors = require("./colors.json");
const fs = require("fs").promises;

const getProductsUrls = async (color) => {
  const browser = await puppeteer.launch();
  let detailLinks;

  try {
    const page = await browser.newPage();

    await page.goto(
      `https://www.nike.com/kr/ko_kr/w/xg/xb/xc/new-releases?productColor=${color}`,
    );

    detailLinks = await page.$$eval(
      ".a-product-image.item-imgwrap > a",
      (aTags) => aTags.map((a) => a.href),
    );
  } catch (err) {
    console.log(err);
  } finally {
    await browser.close();
    return detailLinks && detailLinks.map((link) => {
      return {
        link,
        color,
      };
    });
  }
};

const arrayToChunks = (array, CHUNKSIZE) => {
  const results = [];
  let start = 0;

  while (start < array.length) {
    results.push(array.slice(start, start + CHUNKSIZE));
    start += CHUNKSIZE;
  }

  return results;
};

const main = async () => {
  const links = [];
  const CHUNKSIZE = 4;

  const chunkedColors = arrayToChunks(colors, CHUNKSIZE);

  for (chunk of chunkedColors) {
    const colorsPromises = chunk.map((color) => getProductsUrls(color));
    const resolvedLinks = await Promise.all(colorsPromises);

    console.log(resolvedLinks);
    resolvedLinks.forEach((detailLinks) => {
      detailLinks && links.push(
        ...detailLinks.slice(0, 20).filter((detail) =>
          !detail.link.includes("javascript:discountinued();")
        ),
      );
    });
  }

  fs.writeFile(
    "./links.json",
    JSON.stringify(links, null, 2),
  )
    .then((resolved) => console.log("succeed"))
    .catch((rejected) => console.log(rejected));

  return;
};

main();
