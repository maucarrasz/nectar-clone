const fs = require('fs');
const html = fs.readFileSync('/tmp/firecrawl_nectar_es.html', 'utf8');

const m = html.match(/<button[^>]*>Tengo más de 18<\/button>/);
if (m) {
  console.log('Button found:', m[0]);
}

const m2 = html.match(/<button[^>]*>Salir del sitio<\/button>/);
if (m2) {
  console.log('Exit button found:', m2[0]);
}

