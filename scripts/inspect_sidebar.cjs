const fs = require('fs');
const html = fs.readFileSync('/tmp/firecrawl_nectar_es.html', 'utf8');

// Look for sidebar navigation
const sidebarMatches = html.match(/<aside[^>]*>[\s\S]*?<\/aside>/g) || [];
console.log('Aside tags found:', sidebarMatches.length);
if (sidebarMatches.length) {
  console.log('Sidebar snippet:', sidebarMatches[0].slice(0, 500));
} else {
  // Look for md:fixed or sidebar classes
  const navMatches = html.match(/class="[^"]*sidebar[^"]*"/g) || [];
  console.log('Sidebar classes found:', navMatches.slice(0, 5));
}
