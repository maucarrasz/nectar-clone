const fs = require('fs');
const html = fs.readFileSync('/tmp/firecrawl_nectar_es.html', 'utf8');

const filterIdx = html.indexOf('Filtros');
console.log(html.slice(filterIdx - 200, filterIdx + 1000));

