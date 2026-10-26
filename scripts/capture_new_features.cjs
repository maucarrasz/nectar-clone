const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const outDir = '/home/mauriciocm/.gemini/antigravity/brain/3534720f-efb5-446a-9382-a19d4e3e8265/screenshots';
fs.mkdirSync(outDir, { recursive: true });

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  const errors = [];
  page.on('pageerror', err => errors.push(err.toString()));
  page.on('error', err => errors.push(err.toString()));

  console.log('Testing Home...');
  await page.goto('http://localhost:5190/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, 'new_home_unique_cards.png') });

  // Open right filter drawer
  console.log('Clicking filter drawer trigger...');
  try {
    const trigger = await page.$('#filter-drawer-trigger');
    if (trigger) {
      await trigger.click();
      await new Promise(r => setTimeout(r, 800));
      await page.screenshot({ path: path.join(outDir, 'new_home_filter_drawer.png') });
    }
  } catch (e) {
    console.error('Drawer error:', e.message);
  }

  // Test /messages
  console.log('Testing /messages...');
  await page.goto('http://localhost:5190/messages', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, 'new_messages_chat.png') });

  // Test /girls/create
  console.log('Testing /girls/create...');
  await page.goto('http://localhost:5190/girls/create', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, 'new_girls_create_wizard.png') });

  // Test /create
  console.log('Testing /create...');
  await page.goto('http://localhost:5190/create', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, 'new_create_studio.png') });

  await browser.close();
  console.log('Finished capturing all new feature screenshots! Total errors:', errors.length);
})();
