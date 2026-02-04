/**
 * Monster book and creature management
 */

/**
 * Normalize a single monster entry from various formats
 */
const normalizeMonsterEntry = (entry) => {
  if (!entry || typeof entry !== 'object') {
    return null;
  }
  const name = String(entry.name || entry.Name || '').trim();
  if (!name) {
    return null;
  }
  const type = String(entry.type || entry.Type || '').trim() || 'npc';
  const maxHp = Number(entry.maxHp ?? entry.maxHP ?? entry['Max HP']);
  const meta = String(entry.meta || entry.Meta || entry.type || '').trim();
  const armorClass = String(entry.armorClass || entry['Armor Class'] || '').trim();
  const hitPoints = String(entry.hitPoints || entry['Hit Points'] || '').trim();
  const notes = String(entry.notes || entry.Notes || entry.description || '').trim();
  
  // Generate unique ID
  const generateId = () => {
    // eslint-disable-next-line no-undef
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      // eslint-disable-next-line no-undef
      return crypto.randomUUID();
    }
    return `monster-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  };
  
  return {
    id: entry.id ? String(entry.id) : generateId(),
    name,
    type,
    meta,
    maxHp: Number.isNaN(maxHp) ? null : maxHp,
    armorClass,
    hitPoints,
    notes
  };
};

/**
 * Normalize array of monsters (dedup by name)
 */
const normalizeMonsterManual = (entries) => {
  const list = Array.isArray(entries) ? entries : [];
  const seen = new Set();
  return list.reduce((acc, entry) => {
    const monster = normalizeMonsterEntry(entry);
    if (!monster) {return acc;}
    const key = monster.name.toLowerCase();
    if (seen.has(key)) {return acc;}
    seen.add(key);
    acc.push(monster);
    return acc;
  }, []);
};

/**
 * Normalize book source (core or user)
 */
const normalizeBookSource = (source) => {
  const value = String(source || '').trim().toLowerCase();
  return value === 'core' ? 'core' : 'user';
};

/**
 * Create a new monster book
 */
const createMonsterBook = (name, monsters = [], metadata = {}) => ({
  id: typeof crypto !== 'undefined' && crypto.randomUUID 
    ? crypto.randomUUID() 
    : `book-${Date.now()}`,
  name,
  edition: String(metadata.edition || '').trim(),
  coverImage: String(metadata.coverImage || '').trim(),
  source: normalizeBookSource(metadata.source),
  monsters: normalizeMonsterManual(monsters)
});

/**
 * Normalize array of monster books (dedup by name/edition)
 */
const normalizeMonsterBooks = (books) => {
  const list = Array.isArray(books) ? books : [];
  const seen = new Set();
  return list.reduce((acc, entry) => {
    const name = String(entry?.name || '').trim();
    if (!name) {return acc;}
    const edition = String(entry?.edition || '').trim();
    const id = entry?.id ? String(entry.id) : '';
    const key = id ? `id:${id}` : `${name.toLowerCase()}|${edition.toLowerCase()}`;
    if (seen.has(key)) {return acc;}
    seen.add(key);
    acc.push({
      id: id || (typeof crypto !== 'undefined' && crypto.randomUUID 
        ? crypto.randomUUID() 
        : `book-${Date.now()}`),
      name,
      edition,
      coverImage: String(entry?.coverImage || '').trim(),
      source: normalizeBookSource(entry?.source),
      monsters: normalizeMonsterManual(entry.monsters || entry.entries || [])
    });
    return acc;
  }, []);
};

/**
 * Get monster book by name
 */
const getMonsterBookByName = (name, books) => {
  const key = String(name || '').trim().toLowerCase();
  if (!key) {return null;}
  return books.find((book) => book.name.toLowerCase() === key) || null;
};

/**
 * Find monster by ID across all books
 */
const findMonsterById = (monsterId, books) => {
  if (!monsterId) {return null;}
  for (const book of books) {
    const match = book.monsters.find((monster) => monster.id === monsterId);
    if (match) {
      return { book, monster: match };
    }
  }
  return null;
};

/**
 * Find world containing a monster by ID
 */
const findWorldForMonsterId = (monsterId, worlds) => {
  if (!monsterId) {return null;}
  return (
    Object.entries(worlds).find(([, world]) =>
      Array.isArray(world?.monsterBooks)
        ? world.monsterBooks.some((book) =>
          Array.isArray(book?.monsters)
            ? book.monsters.some((monster) => monster.id === monsterId)
            : false
        )
        : false
    )?.[0] || null
  );
};

// Export monster functions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    normalizeMonsterEntry,
    normalizeMonsterManual,
    normalizeBookSource,
    createMonsterBook,
    normalizeMonsterBooks,
    getMonsterBookByName,
    findMonsterById,
    findWorldForMonsterId
  };
}

// Named ES module exports for modern importers
export {
  normalizeMonsterEntry,
  normalizeMonsterManual,
  normalizeBookSource,
  createMonsterBook,
  normalizeMonsterBooks,
  getMonsterBookByName,
  findMonsterById,
  findWorldForMonsterId
};
