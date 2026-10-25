const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const outDir = '/tmp/screenshots';
fs.mkdirSync(outDir, { recursive: true });

const viewports = [
  { name: 'desktop', width: 1440, height: 900, isMobile: false },
  { name: 'tablet', width: 768, height: 1024, isMobile: true },
  { name: 'mobile', width: 390, height: 844, isMobile: true }
];

async function capture(url, isRef = false) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  for (const vp of viewports) {
    const page = await browser.newPage();
    await page.setViewport({
      width: vp.width,
      height: vp.height,
      isMobile: vp.isMobile,
      hasTouch: vp.isMobile,
      deviceScaleFactor: 1
    });

    console.log(`Navigating to ${url} at ${vp.name} (${vp.width}x${vp.height})...`);
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    } catch (e) {
      console.log(`Goto note: ${e.message}`);
    }

    await new Promise(r => setTimeout(r, 2000));

    // Dismiss age modal if present
    try {
      const btn = await page.waitForSelector('button#age-gate-confirm-btn, div[role="alertdialog"] button', { timeout: 6000 });
      if (btn) {
        console.log(`Clicking age gate on ${vp.name}...`);
        await btn.click();
        await new Promise(r => setTimeout(r, 2000));
      }
    } catch (e) {
      console.log(`Age gate check passed on ${vp.name}: ${e.message}`);
    }

    await new Promise(r => setTimeout(r, 1500));

    // Viewport screenshot
    const prefix = isRef ? 'ref' : 'replica';
    const vpPath = path.join(outDir, `${prefix}_${vp.name}_top.png`);
    await page.screenshot({ path: vpPath });
    console.log(`Saved ${vpPath}`);

    // Scroll down to show cards and filter sidebar
    await page.evaluate(() => window.scrollBy(0, 480));
    await new Promise(r => setTimeout(r, 1000));
    const scrollPath = path.join(outDir, `${prefix}_${vp.name}_cards.png`);
    await page.screenshot({ path: scrollPath });
    console.log(`Saved ${scrollPath}`);

    await page.close();
  }

  await browser.close();
}

async function run() {
  console.log('--- Capturing Replica Screenshots ---');
  await capture('http://localhost:5190/', false);

  console.log('--- Capturing Reference Screenshots ---');
  try {
    await capture('https://nectar.ai/es', true);
  } catch (err) {
    console.error('Reference capture error:', err.message);
  }

  console.log('All screenshots captured!');
}

run().catch(console.error);
