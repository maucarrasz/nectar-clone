const fs = require('fs');
const html = fs.readFileSync('/tmp/firecrawl_nectar_es.html', 'utf8');

const matches = [];
const terms = ['sidebar', 'Abrir menú lateral', 'sidebar-menu-button', 'heart_logo'];
terms.forEach(t => {
  let count = (html.match(new RegExp(t, 'g')) || []).length;
  console.log(`Term "${t}": count = ${count}`);
});
