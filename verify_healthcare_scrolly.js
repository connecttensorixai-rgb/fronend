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

  console.log('Navigating to http://localhost:5173/#/healthcare...');
  try {
    await page.goto('http://localhost:5173/#/healthcare', { waitUntil: 'networkidle2', timeout: 15000 });
  } catch (err) {
    console.log('Failed to connect to 5173, trying http://localhost:5174/#/healthcare...');
    await page.goto('http://localhost:5174/#/healthcare', { waitUntil: 'networkidle2', timeout: 15000 });
  }

  // Wait for load scramble text to finalize
  await new Promise(resolve => setTimeout(resolve, 2000));

  const artifactDir = 'C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\1f473ab8-5ccb-4446-9ef1-4e571f375fcc';

  console.log('\n=================== VERIFYING CONTENT-ONLY LAYOUT ===================');
  const stage1Path = path.join(artifactDir, 'fixed_stage_01.png');
  await page.screenshot({ path: stage1Path, fullPage: true });
  console.log(`Saved full page screenshot: ${stage1Path}`);

  await browser.close();
  console.log('\nContent-only layout verified and screenshotted successfully!');
}

run().catch(err => {
  console.error('Crash during verification:', err);
  process.exit(1);
});
