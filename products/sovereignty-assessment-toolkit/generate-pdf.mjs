import puppeteer from 'puppeteer-core';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const htmlPath = resolve(__dirname, 'sovereignty-assessment-toolkit.html');

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
});

const page = await browser.newPage();
await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

await page.pdf({
  path: resolve(__dirname, 'Sovereignty-Assessment-Toolkit-v1.0.pdf'),
  format: 'Letter',
  margin: { top: '0.75in', bottom: '0.75in', left: '0.85in', right: '0.85in' },
  printBackground: true,
  displayHeaderFooter: true,
  headerTemplate: '<div></div>',
  footerTemplate: '<div style="font-size: 9px; color: #888; text-align: center; width: 100%; font-family: Georgia, serif;">evoked.dev &mdash; Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
});

await browser.close();
console.log('PDF generated: Sovereignty-Assessment-Toolkit-v1.0.pdf');
