const fs = require('fs');
const html = fs.readFileSync('/tmp/firecrawl_nectar_es.html', 'utf8');

const openDivs = (html.match(/<div[\s>]/g) || []).length;
const closeDivs = (html.match(/<\/div>/g) || []).length;
console.log('Open divs:', openDivs, 'Close divs:', closeDivs, 'Diff:', openDivs - closeDivs);

const openSpans = (html.match(/<span[\s>]/g) || []).length;
const closeSpans = (html.match(/<\/span>/g) || []).length;
console.log('Open spans:', openSpans, 'Close spans:', closeSpans, 'Diff:', openSpans - closeSpans);
