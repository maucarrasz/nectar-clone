const fs = require('fs');
const html = fs.readFileSync('/tmp/firecrawl_nectar_es.html', 'utf8');

const start = html.indexOf('role="region" aria-roledescription="carousel"');
// Let us inspect the end of the carousel region
const end = html.indexOf('</section>', start) !== -1 ? html.indexOf('</section>', start) : html.indexOf('</div></div></div>', start);
console.log('Snippet after slide 5:');
const s5 = html.indexOf('aria-label="Diapositiva 5 de 5"');
if (s5 !== -1) {
  console.log(html.slice(s5, s5 + 3000));
}
