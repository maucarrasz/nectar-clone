const fs = require('fs');
const html = fs.readFileSync('/tmp/firecrawl_nectar_es.html', 'utf8');

const navIdx = html.indexOf('Mensajes');
console.log('Mensajes at:', navIdx);
if (navIdx !== -1) {
  console.log(html.slice(Math.max(0, navIdx - 300), navIdx + 300));
}

const explIdx = html.indexOf('Explorar');
console.log('Explorar at:', explIdx);
if (explIdx !== -1) {
  console.log(html.slice(Math.max(0, explIdx - 300), explIdx + 300));
}

