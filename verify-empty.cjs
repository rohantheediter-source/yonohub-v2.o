const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function verify() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

  const text = await page.evaluate(() => document.body.innerText);
  console.log('Includes "No Games Added Yet":', text.includes('No Games Added Yet'));
  console.log('Hero counter text:', await page.$eval('div.inline-flex span:nth-child(4)', (el) => el.innerText));

  await page.screenshot({ path: path.join(__dirname, 'test-results', 'empty-state.png') });
  console.log('Screenshot saved to test-results/empty-state.png');

  await browser.close();
}

verify();
