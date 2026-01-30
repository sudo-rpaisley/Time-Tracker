const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public');
const dataFile = path.join(__dirname, 'data.json');

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  if (req.url === '/api/state') {
    if (req.method === 'GET') {
      fs.readFile(dataFile, 'utf8', (err, data) => {
        if (err) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({}));
          return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      });
      return;
    }

    if (req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', () => {
        try {
          JSON.parse(body);
          fs.writeFile(dataFile, body, 'utf8', (err) => {
            if (err) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Failed to save state' }));
              return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ ok: true }));
          });
        } catch (error) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
        }
      });
      return;
    }
  }

  const requestedPath = req.url === '/' ? '/index.html' : req.url;
  const safePath = path.normalize(requestedPath).replace(/^\.\.(\/|\\)/, '');
  const filePath = path.join(publicDir, safePath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }

    const ext = path.extname(filePath);
    if (ext === '.html') {
      const rendered = renderIncludes(data.toString(), publicDir);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(rendered);
      return;
    }
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

const renderIncludes = (content, baseDir) => {
  const includeRegex = /@@include\(['"](.+?)['"]\)/g;
  let result = content;
  let match = includeRegex.exec(content);
  while (match) {
    const includePath = path.join(baseDir, match[1]);
    const includeContent = fs.readFileSync(includePath, 'utf8');
    const renderedInclude = renderIncludes(includeContent, baseDir);
    result = result.replace(match[0], renderedInclude);
    match = includeRegex.exec(content);
  }
  return result;
};

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
