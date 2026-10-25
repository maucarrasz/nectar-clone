const fs = require('fs');
const mapping = JSON.parse(fs.readFileSync('/home/mauriciocm/code/open-lovable/clones/nectar/public/firecrawl_assets_mapping.json', 'utf8'));
let html = fs.readFileSync('/tmp/firecrawl_nectar_es.html', 'utf8');

let replacements = 0;
// Sort keys by length descending to avoid partial prefix collisions
const keys = Object.keys(mapping).sort((a, b) => b.length - a.length);

for (const key of keys) {
  const local = mapping[key];
  if (html.includes(key)) {
    replacements++;
    html = html.split(key).join(local);
  }
}

console.log('Total unique URL keys replaced:', replacements);

// Check if any imagedelivery.net or s3.us-west-2 remains
const remainingExternal = html.match(/https?:\/\/[^"'\s\)]*(?:imagedelivery\.net|amazonaws\.com|media\.nectar\.ai)[^"'\s\)]*/g) || [];
console.log('Remaining external media URLs:', remainingExternal.length);
if (remainingExternal.length) {
  console.log('Sample remaining:', remainingExternal.slice(0, 5));
}
