const fs = require('fs');
const html = fs.readFileSync('/tmp/firecrawl_nectar_es.html', 'utf8');
const mapping = JSON.parse(fs.readFileSync('/home/mauriciocm/code/open-lovable/clones/nectar/public/firecrawl_assets_mapping.json', 'utf8'));

const regex = /https?:\/\/[^"'\s\)]+/g;
let m;
const unmapped = new Set();
while ((m = regex.exec(html)) !== null) {
  let url = m[0].replace(/["'\)]+$/, '');
  if (!mapping[url]) {
    unmapped.add(url);
  }
}

console.log('Unmapped count:', unmapped.size);
for (const u of Array.from(unmapped).slice(0, 30)) {
  console.log(' - ', u);
}
