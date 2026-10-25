const fs = require('fs');
const html = fs.readFileSync('/tmp/firecrawl_nectar_es.html', 'utf8');

const idx = html.indexOf('Solo adultos');
if (idx !== -1) {
  // Let us inspect the containing div for Solo adultos
  const start = html.lastIndexOf('<div', idx - 200);
  const end = html.indexOf('</div></div>', idx);
  console.log('Dialog snippet:\n', html.slice(start, end + 12));
}

