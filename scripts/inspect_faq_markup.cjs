const fs = require('fs');
const html = fs.readFileSync('/tmp/firecrawl_nectar_es.html', 'utf8');

const qIdx = html.indexOf('¿Qué es Nectar?');
console.log('Snippet of FAQ 1:\n', html.slice(qIdx - 200, qIdx + 600));
