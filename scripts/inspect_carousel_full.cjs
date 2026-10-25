const fs = require('fs');
const html = fs.readFileSync('/tmp/firecrawl_nectar_es.html', 'utf8');

const start = html.indexOf('role="region" aria-roledescription="carousel"');
console.log('Carousel starts at:', start);
if (start !== -1) {
  // Let us inspect 1500 chars
  console.log(html.slice(start - 100, start + 1200));
}
