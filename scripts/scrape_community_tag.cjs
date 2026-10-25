const https = require('https');
const fs = require('fs');
const apiKey = 'fc-b9b57ab780d54664865211ebfb4d0764';

async function scrape(url, outputPath) {
  console.log(`Scraping ${url}...`);
  const postData = JSON.stringify({
    url: url,
    formats: ['html'],
    waitFor: 4000,
    headers: { 'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8' }
  });

  const options = {
    hostname: 'api.firecrawl.dev',
    port: 443,
    path: '/v1/scrape',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.success && json.data && json.data.html) {
            fs.writeFileSync(outputPath, json.data.html);
            console.log(`Success ${url} (${json.data.html.length} bytes)`);
            resolve(json.data.html);
          } else {
            console.error('Failed:', json);
            reject(new Error(json.error || 'Failed'));
          }
        } catch (err) { reject(err); }
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function main() {
  await scrape('https://nectar.ai/community', '/tmp/firecrawl_nectar_community.html');
  await scrape('https://nectar.ai/tag', '/tmp/firecrawl_nectar_tag.html');
}
main().catch(console.error);

