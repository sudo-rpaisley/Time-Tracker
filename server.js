const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const zlib = require('zlib');

const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public');
const booksDir = path.join(__dirname, 'books');
const dataDir = path.join(__dirname, 'data');
const stateFile = path.join(dataDir, 'state.json');
const worldsDir = path.join(dataDir, 'worlds');
const booksIndexFile = path.join(dataDir, 'books-index.json');

// Logger utility
/* eslint-disable no-console */
const logger = {
  error: (message, error) => {
    console.error(`[ERROR] ${message}`, error?.message || error || '');
  },
  warn: (message) => {
    console.warn(`[WARN] ${message}`);
  },
  info: (message) => {
    console.log(`[INFO] ${message}`);
  }
};
/* eslint-enable no-console */

// Path safety check: ensure resolved path is within allowed directories
const isPathSafe = (filePath, baseDir) => {
  try {
    const resolvedFile = path.resolve(filePath);
    const resolvedBase = path.resolve(baseDir);
    return resolvedFile.startsWith(resolvedBase + path.sep) || resolvedFile === resolvedBase;
  } catch (error) {
    return false;
  }
};

// Atomic write: write to temp file, then rename
const atomicWriteJsonFile = async (filePath, payload) => {
  try {
    const dir = path.dirname(filePath);
    ensureDir(dir);
    const tempFile = path.join(dir, `.${crypto.randomUUID()}.tmp`);
    await fs.promises.writeFile(tempFile, JSON.stringify(payload, null, 2));
    try {
      await fs.promises.rename(tempFile, filePath);
    } catch (renameError) {
      // On Windows, sometimes rename fails due to file locks. Try direct write instead.
      if (renameError.code === 'EPERM') {
        await fs.promises.writeFile(filePath, JSON.stringify(payload, null, 2));
        await fs.promises.unlink(tempFile).catch(() => {}); // Clean up temp file if it exists
      } else {
        throw renameError;
      }
    }
  } catch (error) {
    logger.error(`Failed to write ${filePath}:`, error);
    throw error;
  }
};

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
    if (error.code !== 'ENOENT') {
      logger.warn(`Could not read ${filePath}: ${error.message}`);
    }
    return fallback;
  }
};

const writeJsonFile = async (filePath, payload) => {
  await atomicWriteJsonFile(filePath, payload);
};

const sanitizeFolderName = (name) => {
  // eslint-disable-next-line no-control-regex
  return name.replace(/[<>:"/\\|?*\x00-\x1F]/g, '').trim() || 'book';
};

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

const decodeBookPath = (value) => {
  let decoded = value;
  try {
    decoded = decodeURIComponent(value);
  } catch (error) {
    return value;
  }
  if (/%[0-9A-Fa-f]{2}/.test(decoded)) {
    try {
      decoded = decodeURIComponent(decoded);
    } catch (error) {
      return decoded;
    }
  }
  return decoded;
};

// Body reader with size limit
const readBody = (req, maxBytes = 1048576) => {
  return new Promise((resolve, reject) => {
    let body = '';
    let bytes = 0;
    const timeout = setTimeout(() => {
      reject(new Error('Request timeout'));
    }, 30000);

    req.on('data', (chunk) => {
      bytes += chunk.length;
      if (bytes > maxBytes) {
        clearTimeout(timeout);
        reject(new Error(`Payload exceeds limit of ${maxBytes} bytes`));
        return;
      }
      body += chunk;
    });

    req.on('end', () => {
      clearTimeout(timeout);
      resolve(body);
    });

    req.on('error', (error) => {
      clearTimeout(timeout);
      reject(error);
    });
  });
};

const server = http.createServer(async (req, res) => {
  if (req.url === '/api/state') {
    if (req.method === 'GET') {
      const state = await readJsonFile(stateFile, null);
      if (!state || typeof state !== 'object') {
        res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store, no-cache, must-revalidate' });
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
      res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store, no-cache, must-revalidate' });
      res.end(JSON.stringify({ worlds, activeWorldId: state.activeWorldId || null }));
      return;
    }

    if (req.method === 'POST') {
      try {
        const body = await readBody(req, 1048576);
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
          res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store, no-cache, must-revalidate' });
          res.end(JSON.stringify({ ok: true }));
        } catch (parseError) {
          logger.warn(`Invalid JSON in /api/state POST: ${parseError.message}`);
          res.writeHead(400, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store, no-cache, must-revalidate' });
          res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
        }
      } catch (error) {
        logger.error('Error handling /api/state POST:', error);
        res.writeHead(413, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store, no-cache, must-revalidate' });
        res.end(JSON.stringify({ error: error.message || 'Request failed' }));
      }
      return;
    }
  }

  if (req.url === '/api/books' && req.method === 'POST') {
    (async () => {
      try {
        const body = await readBody(req, 5242880); // 5MB for large book uploads
        try {
          const parsed = JSON.parse(body);
          const book = parsed?.book;
          if (!book || !book.name) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Missing book data.' }));
            return;
          }
          const bookId = book.id ? String(book.id) : crypto.randomUUID();
          const index = await loadBooksIndex();
          const existingEntry = index[bookId];
          const source = normalizeBookSource(existingEntry?.source || book.source);
          const folderName =
            existingEntry?.folderName ||
            sanitizeFolderName(`${book.name}${book.edition ? ` ${book.edition}` : ''}`);
          const fileBase = slugify(folderName);
          const bookDir = path.join(booksDir, source, folderName);
          const imagesDir = path.join(bookDir, 'images');
          ensureDir(imagesDir);

          const urlBase = `/books/${source}/${folderName}`;
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
                logger.warn(`Failed to download image from ${url}:`, error);
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
              logger.warn(`Failed to download cover image from ${coverImage}:`, error);
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
          await atomicWriteJsonFile(filePath, payload);
          index[bookId] = {
            source,
            folderName,
            fileName
          };
          await atomicWriteJsonFile(booksIndexFile, index);
          res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store, no-cache, must-revalidate' });
          res.end(
            JSON.stringify({
              ok: true,
              message: 'Book saved to library.',
              book: payload
            })
          );
        } catch (parseError) {
          logger.warn(`Invalid JSON in /api/books POST: ${parseError.message}`);
          res.writeHead(400, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store, no-cache, must-revalidate' });
          res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
        }
      } catch (error) {
        logger.error('Error handling /api/books POST:', error);
        res.writeHead(413, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store, no-cache, must-revalidate' });
        res.end(JSON.stringify({ error: error.message || 'Failed to save book.' }));
      }
    })();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const requestedPath = url.pathname === '/' ? '/index.html' : url.pathname;

  // URL paths should always be POSIX-style (forward slashes), even on Windows
  const safePath = path.posix
    .normalize(requestedPath)
    .replace(/^(\.\.(\/|\\|$))+/, '');

  const isBookAsset = safePath.startsWith('/books/');

  // Turn "/foo/bar" into "foo/bar" so path.join doesn't ignore the base dir
  const relPath = safePath.replace(/^\/+/, '');

  let filePath;
  if (isBookAsset) {
    const bookRel = decodeBookPath(relPath.slice('books/'.length));
    filePath = path.join(booksDir, ...bookRel.split('/'));
  } else {
    filePath = path.join(publicDir, ...relPath.split('/'));
  }

  // SECURITY: Verify resolved path is within allowed directories
  const baseDir = isBookAsset ? booksDir : publicDir;
  if (!isPathSafe(filePath, baseDir)) {
    logger.warn(`Path traversal attempt blocked: ${requestedPath}`);
    res.writeHead(403, { 'Content-Type': 'text/plain', 'Cache-Control': 'no-store, no-cache, must-revalidate' });
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code !== 'ENOENT') {
        logger.warn(`Error reading ${filePath}: ${err.message}`);
      }
      res.writeHead(404, { 'Content-Type': 'text/plain', 'Cache-Control': 'no-store, no-cache, must-revalidate' });
      res.end('Not found');
      return;
    }

    const ext = path.extname(filePath);
    const headers = {};
    const mime = mimeTypes[ext] || 'application/octet-stream';

    // Cache policy: HTML should not be cached aggressively; static assets can be cached
    if (ext === '.html') {
      headers['Content-Type'] = 'text/html';
      headers['Cache-Control'] = 'no-cache';
      const rendered = renderIncludes(data.toString(), publicDir);
      // Support gzip for text/html
      if (/gzip/.test(req.headers['accept-encoding'] || '')) {
        zlib.gzip(rendered, (gzipErr, gzipped) => {
          if (gzipErr) {
            res.writeHead(200, headers);
            res.end(rendered);
            return;
          }
          headers['Content-Encoding'] = 'gzip';
          headers['Vary'] = 'Accept-Encoding';
          res.writeHead(200, headers);
          res.end(gzipped);
        });
        return;
      }
      res.writeHead(200, headers);
      res.end(rendered);
      return;
    }

    headers['Content-Type'] = mime;
    // Cache static assets for a day
    headers['Cache-Control'] = 'public, max-age=86400';

    const isText = ['.css', '.js', '.svg', '.json', '.txt'].includes(ext.toLowerCase());
    if (isText && /gzip/.test(req.headers['accept-encoding'] || '')) {
      zlib.gzip(data, (gzipErr, gzipped) => {
        if (gzipErr) {
          res.writeHead(200, headers);
          res.end(data);
          return;
        }
        headers['Content-Encoding'] = 'gzip';
        headers['Vary'] = 'Accept-Encoding';
        res.writeHead(200, headers);
        res.end(gzipped);
      });
      return;
    }

    res.writeHead(200, headers);
    res.end(data);
  });
});

const renderIncludes = (content, baseDir) => {
  const includeRegex = /@@include\(['"](.+?)['"]\)/g;
  let result = content;
  let match;
  const maxDepth = 10;
  let depth = 0;

  try {
    while ((match = includeRegex.exec(content)) && depth < maxDepth) {
      const includePath = path.join(baseDir, match[1]);
      
      // Safety: ensure included file is within baseDir
      if (!isPathSafe(includePath, baseDir)) {
        logger.warn(`Attempted to include file outside base directory: ${match[1]}`);
        result = result.replace(match[0], '');
        continue;
      }

      try {
        const includeContent = fs.readFileSync(includePath, 'utf8');
        const renderedInclude = renderIncludes(includeContent, baseDir);
        result = result.replace(match[0], renderedInclude);
        depth += 1;
      } catch (error) {
        logger.warn(`Include file not found or unreadable: ${includePath}`);
        result = result.replace(match[0], '');
      }
    }
    
    if (depth >= maxDepth) {
      logger.warn(`Include nesting exceeded max depth (${maxDepth})`);
    }
  } catch (error) {
    logger.error('Error rendering includes:', error);
  }

  return result;
};

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at http://localhost:${port}`);
});
