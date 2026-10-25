const fs = require('fs');
const html = fs.readFileSync('/tmp/firecrawl_nectar_es.html', 'utf8');

const headings = html.match(/<h[1-4][^>]*>[\s\S]*?<\/h[1-4]>/g) || [];
console.log('Headings count:', headings.length);
headings.forEach((h, i) => {
  const text = h.replace(/<[^>]+>/g, '').trim();
  console.log(`H ${i+1}:`, text);
});
