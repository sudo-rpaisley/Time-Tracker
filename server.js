const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public');
const dataFile = path.join(__dirname, 'data.json');
const booksDir = path.join(__dirname, 'books');

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp'
};

const ensureDir = (dir) => {
  fs.mkdirSync(dir, { recursive: true });
};

const sanitizeFolderName = (name) =>
  name.replace(/[<>:"/\\|?*\x00-\x1F]/g, '').trim() || 'book';

const slugify = (value) =>
  value.replace(/[^\w.-]+/g, '-').replace(/^-+|-+$/g, '') || 'book';

const normalizeBookSource = (source) => (source === 'core' ? 'core' : 'user');

const downloadToFile = async (url, destination) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  await fs.promises.writeFile(destination, buffer);
};

const server = http.createServer(async (req, res) => {
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

  if (req.url === '/api/books' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', async () => {
      try {
        const parsed = JSON.parse(body);
        const book = parsed?.book;
        if (!book || !book.name) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Missing book data.' }));
          return;
        }
        const source = normalizeBookSource(book.source);
        const folderName = sanitizeFolderName(
          `${book.name}${book.edition ? ` ${book.edition}` : ''}`
        );
        const fileBase = slugify(folderName);
        const bookDir = path.join(booksDir, source, folderName);
        const imagesDir = path.join(bookDir, 'images');
        ensureDir(imagesDir);

        const urlBase = `/books/${encodeURIComponent(source)}/${encodeURIComponent(
          folderName
        )}`;
        const monsters = Array.isArray(book.monsters) ? book.monsters : [];
        const updatedMonsters = [];

        for (const monster of monsters) {
          const imageUrls = Array.isArray(monster.imageUrls)
            ? monster.imageUrls
            : monster.imageUrl
              ? [monster.imageUrl]
              : [];
          const localUrls = [];
          for (let index = 0; index < imageUrls.length; index += 1) {
            const url = imageUrls[index];
            if (typeof url !== 'string' || !/^https?:\/\//i.test(url)) {
              if (url) {
                localUrls.push(url);
              }
              continue;
            }
            const ext = path.extname(new URL(url).pathname) || '.jpg';
            const fileName = slugify(
              `${monster.name || monster.id || 'monster'}-${index + 1}`
            );
            const imageName = `${fileName}${ext}`;
            const destPath = path.join(imagesDir, imageName);
            try {
              await downloadToFile(url, destPath);
              localUrls.push(`${urlBase}/images/${encodeURIComponent(imageName)}`);
            } catch (error) {
              localUrls.push(url);
            }
          }
          updatedMonsters.push({
            ...monster,
            imageUrls: localUrls,
            imageUrl: localUrls[0] || monster.imageUrl || ''
          });
        }

        let coverImage = book.coverImage || '';
        if (coverImage && /^https?:\/\//i.test(coverImage)) {
          const ext = path.extname(new URL(coverImage).pathname) || '.jpg';
          const coverName = `cover${ext}`;
          try {
            await downloadToFile(coverImage, path.join(bookDir, coverName));
            coverImage = `${urlBase}/${encodeURIComponent(coverName)}`;
          } catch (error) {
            // keep original URL if download fails
          }
        }

        const payload = {
          name: book.name,
          edition: book.edition || '',
          coverImage,
          source,
          monsters: updatedMonsters
        };
        const filePath = path.join(bookDir, `${fileBase}.json`);
        await fs.promises.writeFile(filePath, JSON.stringify(payload, null, 2));
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, message: 'Book saved to library.' }));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to save book.' }));
      }
    });
    return;
  }

  const requestedPath = req.url === '/' ? '/index.html' : req.url;
  const safePath = path.normalize(requestedPath).replace(/^\.\.(\/|\\)/, '');
  const isBookAsset = safePath.startsWith('/books/');
  let bookRelativePath = safePath.replace('/books/', '');
  if (isBookAsset) {
    try {
      bookRelativePath = decodeURIComponent(bookRelativePath);
    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Bad request');
      return;
    }
  }
  const filePath = isBookAsset
    ? path.join(booksDir, bookRelativePath)
    : path.join(publicDir, safePath);

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
