const fs = require('fs');
const { execSync } = require('child_process');
const crypto = require('crypto');

const html = fs.readFileSync('/tmp/firecrawl_nectar_unlocked.html', 'utf8');
const mappingPath = '/home/mauriciocm/code/open-lovable/clones/nectar/public/firecrawl_assets_mapping.json';
const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

const assetsDir = '/home/mauriciocm/code/open-lovable/clones/nectar/public/assets';

const regex = /https?:\/\/[^"'\s\)]+/g;
let m;
const unmapped = new Set();
let mappedCount = 0;

while ((m = regex.exec(html)) !== null) {
  let url = m[0].replace(/["'\)]+$/, '').replace(/&amp;/g, '&');
  if (url.includes('imagedelivery.net') || url.includes('amazonaws.com') || url.includes('media.nectar.ai') || url.includes('/assets/')) {
    if (mapping[url]) {
      mappedCount++;
    } else {
      unmapped.add(url);
    }
  }
}

console.log('Already mapped:', mappedCount);
console.log('Unmapped to download:', unmapped.size);

const unmappedList = Array.from(unmapped);
console.log('Sample 5:', unmappedList.slice(0, 5));

let downloaded = 0;
let errors = 0;

unmappedList.forEach((url, i) => {
  // Determine file extension
  let ext = 'webp';
  if (url.includes('.png')) ext = 'png';
  else if (url.includes('.jpg') || url.includes('.jpeg')) ext = 'jpg';
  else if (url.includes('.mp4')) ext = 'mp4';
  else if (url.includes('.avif')) ext = 'avif';

  // Create hash filename
  const hash = crypto.createHash('md5').update(url).digest('hex').slice(0, 16);
  const filename = `nectar_asset_${hash}.${ext}`;
  const localRel = `/assets/${filename}`;
  const localFull = `${assetsDir}/${filename}`;

  if (!fs.existsSync(localFull)) {
    try {
      execSync(`curl -s -L -o "${localFull}" "${url}"`, { timeout: 15000 });
      downloaded++;
    } catch (err) {
      errors++;
      console.error(`Failed to download ${url}:`, err.message);
    }
  }
  mapping[url] = localRel;
});

fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2));
console.log(`Download complete! New downloaded: ${downloaded}, Errors: ${errors}, Total mapped: ${Object.keys(mapping).length}`);
