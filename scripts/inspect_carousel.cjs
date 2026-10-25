const fs = require('fs');
const html = fs.readFileSync('/tmp/firecrawl_nectar_es.html', 'utf8');

const carouselIdx = html.indexOf('aria-roledescription="slide"');
console.log('Carousel slide index:', carouselIdx);

// Find parent container of slides
const slideMatches = html.match(/<div role="group" aria-roledescription="slide"[^>]*>/g) || [];
console.log('Slide count:', slideMatches.length);
slideMatches.forEach((s, i) => console.log(`Slide ${i+1}:`, s));

// Let us inspect the container surrounding the slides
const containerStart = html.lastIndexOf('<div class="relative overflow-hidden', carouselIdx);
console.log('Container snippet:', html.slice(containerStart, containerStart + 600));

