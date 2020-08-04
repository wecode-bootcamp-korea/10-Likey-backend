const puppeteer = require("puppeteer");
const urls = require("./links.json");
const fs = require("fs").promises;

const getProductObject = async ({ link, color }) => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  });

  let product;
  try {
    const page = await browser.newPage();

    await page.goto(link);

    product = await page.evaluate(() => {
      if (document.querySelector(".launch-logo")) return null;

      const categories = document.querySelector(".text-color-secondary")
        .innerText;
      const price = document.querySelector(".price").children[0].dataset.price;
      const title = document.querySelector(".title-wrap > span").dataset.name;
      const images = [
        ...document.querySelectorAll("#product-gallery li > div > a > img"),
      ].map((img) => img.currentSrc);

      const isForMember = !!document.querySelector(".member-access-msg");

      const options = [
        ...document.querySelectorAll("#product-option_color a.input-radio"),
      ].map((aTag) => {
        return {
          productId: aTag.href.split("/")[9],
          imageUrl: aTag.children[0].children[0].currentSrc,
        };
      });

      const sizes = [...document.querySelectorAll(".opt-list .input-radio")]
        .map(
          (size) => {
            return {
              size: size.innerText.trim(),
              counts: size.outerHTML.includes("disabled") ? 0 : 10,
            };
          },
        );

      const [gender, sorts, sports] = categories.split(" ");

      const productObject = {
        price,
        title,
        images,
        isForMember,
        options,
        sizes,
        categories,
        imageUrl: images[0],
        gender,
        sorts,
        sports,
      };

      return productObject;
    });
  } catch (err) {
    console.log(err);
  } finally {
    await browser.close();
    return product && {
      ...product,
      productId: link.split("/")[9],
      color,
    };
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
  const results = [];
  const CHUNKSIZE = 4;

  const chunkedLinks = arrayToChunks(urls, CHUNKSIZE);

  for (chunk of chunkedLinks) {
    const productObjectPromises = chunk.map((link) => getProductObject(link));
    const resolvedProducts = await Promise.all(productObjectPromises);

    console.log(resolvedProducts);
    resolvedProducts.forEach((product) => {
      product && results.push(product);
    });
  }

  fs.writeFile(
    "./proudcts.json",
    JSON.stringify(results, null, 2),
  )
    .then((resolved) => console.log("succeed"))
    .catch((rejected) => console.log(rejected));

  return;
};

main();
