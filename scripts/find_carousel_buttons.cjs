const fs = require('fs');
const html = fs.readFileSync('/tmp/firecrawl_nectar_es.html', 'utf8');

const start = html.indexOf('role="region" aria-roledescription="carousel"');
// Let us search for button inside or right after this region
const carouselSection = html.slice(start, start + 25000);
const buttons = carouselSection.match(/<button[^>]*>[\s\S]*?<\/button>/g) || [];
console.log('Buttons inside hero carousel section:', buttons.length);
buttons.forEach((b, i) => console.log(`Button ${i+1}:`, b.slice(0, 150)));

