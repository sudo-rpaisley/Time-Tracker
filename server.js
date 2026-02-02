const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public');
const booksDir = path.join(__dirname, 'books');
const dataDir = path.join(__dirname, 'data');
const stateFile = path.join(dataDir, 'state.json');
const worldsDir = path.join(dataDir, 'worlds');
const booksIndexFile = path.join(dataDir, 'books-index.json');

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

ensureDir(dataDir);
ensureDir(worldsDir);

const readJsonFile = async (filePath, fallback = null) => {
  try {
    const content = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    return fallback;
  }
};

const writeJsonFile = async (filePath, payload) => {
  await fs.promises.writeFile(filePath, JSON.stringify(payload, null, 2));
};

const sanitizeFolderName = (name) =>
  name.replace(/[<>:"/\\|?*\x00-\x1F]/g, '').trim() || 'book';

const slugify = (value) =>
  value.replace(/[^\w.-]+/g, '-').replace(/^-+|-+$/g, '') || 'book';

const normalizeBookSource = (source) => (source === 'core' ? 'core' : 'user');

const loadBooksIndex = async () => {
  const existingIndex = await readJsonFile(booksIndexFile, null);
  const result = existingIndex && typeof existingIndex === 'object' ? existingIndex : {};
  const sources = ['core', 'user'];
  for (const source of sources) {
    const sourceDir = path.join(booksDir, source);
    try {
      const entries = await fs.promises.readdir(sourceDir, { withFileTypes: true });
      for (const entry of entries) {
        if (!entry.isDirectory()) {
          continue;
        }
        const bookFolder = entry.name;
        const folderPath = path.join(sourceDir, bookFolder);
        const files = await fs.promises.readdir(folderPath);
        const jsonFile = files.find((file) => file.endsWith('.json'));
        if (!jsonFile) {
          continue;
        }
        const bookData = await readJsonFile(path.join(folderPath, jsonFile), null);
        if (!bookData) {
          continue;
        }
        const bookId = bookData.id ? String(bookData.id) : crypto.randomUUID();
        if (!bookData.id) {
          bookData.id = bookId;
          await writeJsonFile(path.join(folderPath, jsonFile), bookData);
        }
        if (!result[bookId]) {
          result[bookId] = {
            source,
            folderName: bookFolder,
            fileName: jsonFile
          };
        }
      }
    } catch (error) {
      // ignore missing directories
    }
  }
  await writeJsonFile(booksIndexFile, result);
  return result;
};

const loadBookById = async (bookId) => {
  if (!bookId) {
    return null;
  }
  const index = await loadBooksIndex();
  const entry = index[bookId];
  if (!entry) {
    return null;
  }
  const bookPath = path.join(booksDir, entry.source, entry.folderName, entry.fileName);
  return readJsonFile(bookPath, null);
};

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
      const state = await readJsonFile(stateFile, null);
      if (!state || typeof state !== 'object') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({}));
        return;
      }
      const worldIds = Array.isArray(state.worldIds) ? state.worldIds : [];
      const booksIndex = await loadBooksIndex();
      const allBookIds = Object.keys(booksIndex);
      const worlds = {};
      for (const worldId of worldIds) {
        const worldPath = path.join(worldsDir, `${worldId}.json`);
        const world = await readJsonFile(worldPath, null);
        if (!world) {
          continue;
        }
        const storedBookIds = Array.isArray(world.monsterBookIds)
          ? world.monsterBookIds
          : [];
        const bookIds =
          storedBookIds.length > 0
            ? Array.from(new Set([...storedBookIds, ...allBookIds]))
            : allBookIds;
        const monsterBooks = [];
        for (const bookId of bookIds) {
          const book = await loadBookById(bookId);
          if (book) {
            monsterBooks.push(book);
          }
        }
        worlds[worldId] = {
          ...world,
          monsterBooks,
          activeMonsterBookId: world.activeMonsterBookId || monsterBooks[0]?.id || null,
          selectedMonsterBookIds: Array.isArray(world.selectedMonsterBookIds)
            ? world.selectedMonsterBookIds
            : monsterBooks.map((book) => book.id)
        };
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ worlds, activeWorldId: state.activeWorldId || null }));
      return;
    }

    if (req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', async () => {
        try {
          const parsed = JSON.parse(body);
          const incomingWorlds = parsed?.worlds && typeof parsed.worlds === 'object'
            ? parsed.worlds
            : {};
          const worldIds = Object.keys(incomingWorlds);
          for (const worldId of worldIds) {
            const world = incomingWorlds[worldId];
            if (!world) {
              continue;
            }
            const { monsterBooks, ...rest } = world;
            const bookIds = Array.isArray(world.monsterBookIds)
              ? world.monsterBookIds
              : Array.isArray(monsterBooks)
                ? monsterBooks.map((book) => book.id).filter(Boolean)
                : [];
            const payload = {
              ...rest,
              monsterBookIds: bookIds,
              selectedMonsterBookIds: Array.isArray(world.selectedMonsterBookIds)
                ? world.selectedMonsterBookIds
                : []
            };
            await writeJsonFile(path.join(worldsDir, `${worldId}.json`), payload);
          }
          await writeJsonFile(stateFile, {
            activeWorldId: parsed?.activeWorldId || null,
            worldIds
          });
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: true }));
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
        const bookId = book.id ? String(book.id) : crypto.randomUUID();
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
          id: bookId,
          name: book.name,
          edition: book.edition || '',
          coverImage,
          source,
          monsters: updatedMonsters
        };
        const fileName = `${fileBase}.json`;
        const filePath = path.join(bookDir, fileName);
        await writeJsonFile(filePath, payload);
        const index = await loadBooksIndex();
        index[bookId] = {
          source,
          folderName,
          fileName
        };
        await writeJsonFile(booksIndexFile, index);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            ok: true,
            message: 'Book saved to library.',
            book: payload
          })
        );
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
