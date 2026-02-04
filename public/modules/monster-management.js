/**
 * Monster & Book Management Module
 * Handles monster books, creature entries, and monster manual rendering
 */

export const initMonsterManagement = () => {
  // Module initialization if needed
};

export const renderMonsterBookTiles = () => {
  const monsterBookTiles = document.getElementById('monsterBookTiles');
  if (!monsterBookTiles) {
    return;
  }

  monsterBookTiles.innerHTML = '';

  const activeWorldId = window.activeWorldId;
  const monsterBooks = window.monsterBooks || [];

  if (!activeWorldId) {
    const helper = document.createElement('p');
    helper.className = 'helper-text';
    helper.textContent = 'Select a world to view its monster books.';
    monsterBookTiles.appendChild(helper);
    return;
  }

  if (monsterBooks.length === 0) {
    const helper = document.createElement('p');
    helper.className = 'helper-text';
    helper.textContent = 'Add a monster book to start filtering.';
    monsterBookTiles.appendChild(helper);
    return;
  }

  const selectedIds = new Set(window.__legacyGetSelectedMonsterBookIds?.() || []);

  monsterBooks
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((book) => {
      const tile = document.createElement('button');
      tile.type = 'button';
      tile.className = 'monster-book-tile';
      if (selectedIds.has(book.id)) {
        tile.classList.add('active');
      }

      const cover = document.createElement('div');
      cover.className = 'monster-book-cover';
      if (book.coverImage) {
        window.__legacySetBackgroundImage?.(cover, book.coverImage);
      }

      const info = document.createElement('div');
      info.className = 'monster-book-info';
      const name = document.createElement('div');
      name.className = 'monster-book-name';
      name.textContent = book.name;
      const meta = document.createElement('div');
      meta.className = 'monster-book-meta';

      if (book.edition) {
        const edition = document.createElement('span');
        edition.textContent = book.edition;
        meta.appendChild(edition);
      }

      const source = document.createElement('span');
      source.textContent = book.source === 'core' ? 'Core book' : 'User book';
      meta.appendChild(source);

      info.append(name, meta);
      tile.append(cover, info);

      tile.addEventListener('click', () => {
        const updated = new Set(window.__legacyGetSelectedMonsterBookIds?.() || []);
        if (updated.has(book.id)) {
          updated.delete(book.id);
        } else {
          updated.add(book.id);
        }
        window.__legacySetSelectedMonsterBookIds?.(Array.from(updated));
        renderMonsterManual();
        renderMonsterBookTiles();
      });

      monsterBookTiles.appendChild(tile);
    });
};

export const renderMonsterBookSelect = () => {
  const monsterBookSelect = document.getElementById('monsterBookSelect');
  if (!monsterBookSelect) {
    return;
  }

  monsterBookSelect.innerHTML = '';

  const activeWorldId = window.activeWorldId;
  const monsterBooks = window.monsterBooks || [];
  const activeMonsterBookId = window.activeMonsterBookId;

  if (!activeWorldId || monsterBooks.length === 0) {
    const option = document.createElement('option');
    option.value = '';
    option.textContent = 'No books available';
    monsterBookSelect.appendChild(option);
    monsterBookSelect.disabled = true;
    return;
  }

  monsterBookSelect.disabled = false;
  monsterBooks
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((book) => {
      const option = document.createElement('option');
      option.value = book.id;
      option.textContent = book.edition ? `${book.name} (${book.edition})` : book.name;
      monsterBookSelect.appendChild(option);
    });

  if (!window.__legacyGetMonsterBookById?.(activeMonsterBookId)) {
    window.activeMonsterBookId = monsterBooks[0]?.id || null;
  }

  monsterBookSelect.value = window.activeMonsterBookId || '';
};

export const renderMonsterManual = () => {
  const monsterList = document.getElementById('monsterList');
  const monsterSearchInput = document.getElementById('monsterSearchInput');
  const monsterTypeFilterInput = document.getElementById('monsterTypeFilterInput');
  const monsterSourceFilterInput = document.getElementById('monsterSourceFilterInput');
  const monsterCrMinInput = document.getElementById('monsterCrMinInput');
  const monsterCrMaxInput = document.getElementById('monsterCrMaxInput');

  if (!monsterList) {
    return;
  }

  monsterList.innerHTML = '';
  renderMonsterBookSelect();
  renderMonsterBookTiles();

  const activeWorldId = window.activeWorldId;
  const monsterBooks = window.monsterBooks || [];

  if (!activeWorldId) {
    const item = document.createElement('li');
    item.className = 'helper-text';
    item.textContent = 'Select a world to manage its monster manual.';
    monsterList.appendChild(item);
    return;
  }

  const selectedBookIds = window.__legacyGetSelectedMonsterBookIds?.() || [];
  if (selectedBookIds.length === 0) {
    const item = document.createElement('li');
    item.className = 'helper-text';
    item.textContent = 'Select one or more monster books to show their creatures.';
    monsterList.appendChild(item);
    return;
  }

  const selectedBooks = monsterBooks.filter((book) =>
    selectedBookIds.includes(book.id)
  );

  const hasAnyMonsters = selectedBooks.some((book) => book.monsters?.length > 0);
  if (!hasAnyMonsters) {
    const item = document.createElement('li');
    item.className = 'helper-text';
    item.textContent = 'No monsters saved in the selected books yet.';
    monsterList.appendChild(item);
    return;
  }

  const query = monsterSearchInput?.value.trim().toLowerCase() || '';
  const typeFilter = monsterTypeFilterInput?.value.trim().toLowerCase() || '';
  const sourceFilter = monsterSourceFilterInput?.value || '';
  const crMin = parseChallengeRating(monsterCrMinInput?.value);
  const crMax = parseChallengeRating(monsterCrMaxInput?.value);

  const filtered = selectedBooks
    .flatMap((book) =>
      (book.monsters || []).map((monster) => ({
        monster,
        book
      }))
    )
    .filter(({ monster, book }) => {
      if (sourceFilter && book.source !== sourceFilter) {
        return false;
      }
      if (typeFilter) {
        const typeValue = `${monster.type || ''} ${monster.meta || ''}`.toLowerCase();
        if (!typeValue.includes(typeFilter)) {
          return false;
        }
      }
      if (crMin !== null || crMax !== null) {
        const challengeValue = parseChallengeRating(monster.challenge);
        if (challengeValue === null) {
          return false;
        }
        if (crMin !== null && challengeValue < crMin) {
          return false;
        }
        if (crMax !== null && challengeValue > crMax) {
          return false;
        }
      }
      if (!query) {
        return true;
      }
      const haystack = `${monster.name} ${monster.type} ${monster.meta || ''} ${monster.notes || ''} ${monster.challenge || ''} ${book.name} ${book.edition || ''}`.toLowerCase();
      return haystack.includes(query);
    });

  if (filtered.length === 0) {
    const item = document.createElement('li');
    item.className = 'helper-text';
    item.textContent = 'No monsters match that search.';
    monsterList.appendChild(item);
    return;
  }

  filtered
    .slice()
    .sort((a, b) => {
      const nameCompare = a.monster.name.localeCompare(b.monster.name);
      if (nameCompare !== 0) {
        return nameCompare;
      }
      return a.book.name.localeCompare(b.book.name);
    })
    .forEach(({ monster, book }) => {
      const item = document.createElement('li');
      item.className = 'quest-item';

      const header = document.createElement('div');
      header.className = 'quest-header';
      const title = document.createElement('span');
      title.textContent = monster.name;
      const typeTag = document.createElement('span');
      typeTag.className = 'timeline-tag';
      typeTag.textContent = monster.meta || monster.type || 'npc';
      const bookTag = document.createElement('span');
      bookTag.className = 'timeline-tag';
      bookTag.textContent = book.edition ? `${book.name} (${book.edition})` : book.name;
      header.append(title, typeTag);
      header.appendChild(bookTag);

      const meta = document.createElement('div');
      meta.className = 'monster-meta';
      const metaParts = [];
      if (monster.armorClass) {
        metaParts.push(`AC ${monster.armorClass}`);
      }
      if (monster.hitPoints) {
        metaParts.push(`HP ${monster.hitPoints}`);
      } else if (Number.isFinite(monster.maxHp)) {
        metaParts.push(`HP ${monster.maxHp}`);
      }
      if (monster.challenge) {
        metaParts.push(`CR ${monster.challenge}`);
      }
      meta.textContent = metaParts.length ? metaParts.join(' • ') : 'Details unavailable.';

      const content = document.createElement('div');
      content.className = 'monster-content';
      const previewImage = window.__legacyGetMonsterPreviewImage?.(monster) || createMonsterPlaceholder(monster.name);
      if (previewImage) {
        const image = document.createElement('img');
        image.className = 'monster-image';
        image.alt = monster.name;
        image.loading = 'lazy';
        image.src = previewImage;
        content.appendChild(image);
      }

      const details = document.createElement('div');
      details.className = 'monster-details';
      const statLine = document.createElement('div');
      statLine.className = 'monster-meta';
      const statParts = [
        monster.stats?.str ? `STR ${monster.stats.str}${monster.stats.strMod || ''}` : '',
        monster.stats?.dex ? `DEX ${monster.stats.dex}${monster.stats.dexMod || ''}` : '',
        monster.stats?.con ? `CON ${monster.stats.con}${monster.stats.conMod || ''}` : '',
        monster.stats?.int ? `INT ${monster.stats.int}${monster.stats.intMod || ''}` : '',
        monster.stats?.wis ? `WIS ${monster.stats.wis}${monster.stats.wisMod || ''}` : '',
        monster.stats?.cha ? `CHA ${monster.stats.cha}${monster.stats.chaMod || ''}` : ''
      ].filter(Boolean);
      statLine.textContent = statParts.join(' • ');

      const extra = document.createElement('div');
      extra.className = 'monster-meta';
      const extraParts = [
        monster.savingThrows ? `Saves: ${monster.savingThrows}` : '',
        monster.skills ? `Skills: ${monster.skills}` : '',
        monster.senses ? `Senses: ${monster.senses}` : '',
        monster.languages ? `Languages: ${monster.languages}` : '',
        monster.speed ? `Speed: ${monster.speed}` : ''
      ].filter(Boolean);
      extra.textContent = extraParts.join(' • ');

      const preview = document.createElement('div');
      preview.className = 'event-description';
      const previewSource = [
        monster.notes,
        monster.traits,
        monster.actions,
        monster.legendaryActions
      ]
        .filter(Boolean)
        .join(' ');
      preview.textContent = truncateText(previewSource || 'No notes recorded.', 160);

      details.append(statLine, extra, preview);
      content.appendChild(details);

      const openDetail = () => {
        window.activeMonsterBookId = book.id;
        window.__legacyStoreMonsterDetailSnapshot?.({ monster, book, worldId: window.activeWorldId });
        window.location.href = buildMonsterDetailUrl({
          id: monster.id,
          bookId: book.id,
          worldId: window.activeWorldId
        });
      };

      item.tabIndex = 0;
      item.setAttribute('role', 'button');
      item.addEventListener('click', openDetail);
      item.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openDetail();
        }
      });

      item.append(header, meta, content);
      monsterList.appendChild(item);
    });
};

export const renderCombatantPresets = () => {
  const combatantPresetSelect = document.getElementById('combatantPresetSelect');
  if (!combatantPresetSelect) {
    return;
  }

  combatantPresetSelect.innerHTML = '';
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'Custom';
  combatantPresetSelect.appendChild(defaultOption);

  const activeBook = window.__legacyGetActiveMonsterBook?.();
  if (!activeBook) {
    return;
  }

  (activeBook.monsters || [])
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((preset) => {
      const option = document.createElement('option');
      option.value = preset.id;
      option.textContent = preset.name;
      combatantPresetSelect.appendChild(option);
    });
};

// ===== Utility Helpers =====

const parseChallengeRating = (value) => {
  const str = String(value || '').trim();
  if (!str) {
    return null;
  }
  if (str.includes('/')) {
    const [num, denom] = str.split('/').map((s) => parseFloat(s.trim()));
    if (!Number.isNaN(num) && !Number.isNaN(denom) && denom !== 0) {
      return num / denom;
    }
  }
  const parsed = parseFloat(str);
  return Number.isNaN(parsed) ? null : parsed;
};

const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
};

const createMonsterPlaceholder = (name) => {
  const size = 200;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) {return '';}
  ctx.fillStyle = '#2a2a2a';
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = '#888';
  ctx.font = 'bold 20px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const text = (name || 'Monster').substring(0, 2).toUpperCase();
  ctx.fillText(text, size / 2, size / 2);
  return canvas.toDataURL();
};

const buildMonsterDetailUrl = (params) => {
  const url = new URL('/monster.html', window.location.origin);
  if (params.id) {url.searchParams.set('id', params.id);}
  if (params.bookId) {url.searchParams.set('bookId', params.bookId);}
  if (params.worldId) {url.searchParams.set('worldId', params.worldId);}
  return url.toString();
};
