const fs = require('fs');
const html = fs.readFileSync('/tmp/firecrawl_nectar_es.html', 'utf8');

const faqIdx = html.indexOf('Preguntas frecuentes');
console.log('Preguntas frecuentes at:', faqIdx);
if (faqIdx !== -1) {
  console.log(html.slice(faqIdx - 100, faqIdx + 1200));
}

