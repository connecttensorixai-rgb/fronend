import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://codepen.io/jh3y/pen/OJobGqR', { waitUntil: 'networkidle2' });
  const html = await page.content();
  fs.writeFileSync('pen.html', html);
  await browser.close();
})();
