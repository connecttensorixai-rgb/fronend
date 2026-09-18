import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
import os from 'os';

async function run() {
  const possiblePaths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    path.join(os.homedir(), 'AppData\\Local\\Google\\Chrome\\Application\\chrome.exe')
  ];

  let executablePath = '';
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      executablePath = p;
      break;
    }
  }

  if (!executablePath) {
    console.error('Could not find Google Chrome installation path.');
    process.exit(1);
  }

  console.log(`Using Chrome Executable: ${executablePath}`);

  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  page.on('console', msg => {
    console.log(`PAGE CONSOLE [${msg.type()}]:`, msg.text());
  });

  page.on('pageerror', err => {
    console.error('PAGE ERROR:', err.message, err.stack);
  });

  console.log('Navigating to http://localhost:5173/#/energy-construction...');
  try {
    await page.goto('http://localhost:5173/#/energy-construction', { waitUntil: 'networkidle2', timeout: 5000 });
  } catch (err) {
    console.log('Failed to connect to 5173, trying http://localhost:5174/#/energy-construction...');
    try {
      await page.goto('http://localhost:5174/#/energy-construction', { waitUntil: 'networkidle2', timeout: 5000 });
    } catch (err2) {
      console.log('Could not connect to localhost:5173 or 5174. Make sure npm run dev is running!');
    }
  }

  await new Promise(resolve => setTimeout(resolve, 2000));
  await browser.close();
}

run().catch(err => {
  console.error('Crash during check:', err);
  process.exit(1);
});
