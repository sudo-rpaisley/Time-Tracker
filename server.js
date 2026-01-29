const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public');

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
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
