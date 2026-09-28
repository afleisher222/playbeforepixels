// Tiny static server for site/dist that behaves like Cloudflare Pages for the QA suite:
// honours _redirects (301), adds the trailing slash to directory URLs, serves /404.html with a
// 404 status. Node standard library only.  Usage: node site/qa/serve.js [port]
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const DIST = path.resolve(__dirname, '..', 'dist');
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.xml': 'application/xml', '.txt': 'text/plain', '.webmanifest': 'application/manifest+json' };

function redirects() {
  const f = path.join(DIST, '_redirects');
  if (!fs.existsSync(f)) return new Map();
  return new Map(fs.readFileSync(f, 'utf8').split('\n').filter(l => l && !l.startsWith('#')).map(l => l.split(/\s+/)).map(([a, b, c]) => [a, { to: b, code: +c || 301 }]));
}

function start(port = 0) {
  const R = redirects();
  const server = http.createServer((req, res) => {
    const u = new URL(req.url, 'http://x');
    let p = decodeURIComponent(u.pathname);
    if (R.has(p)) { res.writeHead(R.get(p).code, { Location: R.get(p).to }); return res.end(); }
    let f = path.join(DIST, p);
    if (!f.startsWith(DIST)) { res.writeHead(403); return res.end(); }
    if (fs.existsSync(f) && fs.statSync(f).isDirectory()) {
      if (!p.endsWith('/')) { res.writeHead(301, { Location: p + '/' + u.search }); return res.end(); }
      f = path.join(f, 'index.html');
    }
    if (!fs.existsSync(f) && fs.existsSync(f + '.html')) f += '.html';
    if (!fs.existsSync(f)) {
      res.writeHead(404, { 'Content-Type': TYPES['.html'] });
      return res.end(fs.readFileSync(path.join(DIST, '404.html')));
    }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    fs.createReadStream(f).pipe(res);
  });
  return new Promise(r => server.listen(port, '127.0.0.1', () => r(server)));
}

if (require.main === module) start(+process.argv[2] || 8080).then(s => console.log('serving site/dist on http://127.0.0.1:' + s.address().port));
module.exports = { start };
