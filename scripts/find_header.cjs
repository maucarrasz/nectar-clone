const fs = require('fs');
const html = fs.readFileSync('/tmp/firecrawl_nectar_es.html', 'utf8');

// Header navbar
const headerIdx = html.indexOf('sticky top-0 z-30');
if (headerIdx !== -1) {
  console.log('Navbar snippet:', html.slice(headerIdx - 50, headerIdx + 1200));
}

// Also check for desktop navbar or header
const navs = html.match(/<header[^>]*>[\s\S]*?<\/header>/g) || [];
console.log('Header tags count:', navs.length);
if (navs.length) {
  console.log('Header tag snippet:', navs[0].slice(0, 500));
} else {
  // Look for other nav tags
  const navTags = html.match(/<nav[^>]*>[\s\S]*?<\/nav>/g) || [];
  console.log('Nav tags count:', navTags.length);
}
