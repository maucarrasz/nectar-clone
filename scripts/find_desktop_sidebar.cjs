const fs = require('fs');
const html = fs.readFileSync('/tmp/firecrawl_nectar_es.html', 'utf8');

const idx = html.indexOf('md:ml-sidebar-space-collapsed');
console.log('Snippet before md:ml-sidebar-space-collapsed:', html.slice(Math.max(0, idx - 500), idx + 200));
