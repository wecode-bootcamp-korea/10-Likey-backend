const puppeteer = require("puppeteer");

const getColors = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  });

  let colors;

  try {
    const page = await browser.newPage();
    await page.goto("https://www.nike.com/kr/ko_kr/w/xg/xb/xc/new-releases");

    colors = await page.$$eval(
      ".f-style-square.f-color-type li input",
      (inputs) => inputs.map((input) => input.value),
    );
  } catch (err) {
    console.log(err);
    return null;
  } finally {
    await browser.close();
    return colors;
  }
};

module.exports = getColors;
