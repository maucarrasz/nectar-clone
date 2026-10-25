const fs = require('fs');
const html = fs.readFileSync('/tmp/firecrawl_nectar_pricing.html', 'utf8');

console.log('Has md:ml-sidebar:', html.includes('sidebar'));
const sidebarMatch = html.match(/class="[^"]*sidebar[^"]*"/g) || [];
console.log('Sidebar classes in pricing:', sidebarMatch);

const openDivs = (html.match(/<div[\s>]/g) || []).length;
const closeDivs = (html.match(/<\/div>/g) || []).length;
console.log('Open divs:', openDivs, 'Close divs:', closeDivs, 'Diff:', openDivs - closeDivs);

// Check headings in pricing
const headings = html.match(/<h[1-4][^>]*>[\s\S]*?<\/h[1-4]>/g) || [];
headings.forEach(h => console.log('Heading:', h.replace(/<[^>]+>/g, '').trim()));
