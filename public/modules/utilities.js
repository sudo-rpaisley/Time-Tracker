/* global */

// ============================================================================
// STRING AND TEXT UTILITIES
// ============================================================================

const stripHtml = (value) => String(value || '').replace(/<[^>]*>/g, '').trim();

const truncateText = (value, maxLength = 140) => {
  const text = String(value || '').trim();
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength).trim()}…`;
};

const normalizeInlineText = (value) =>
  String(value || '')
    .replace(/\s+/g, ' ')
    .trim();

// ============================================================================
// URL SECURITY UTILITIES
// ============================================================================

// SECURITY: Validate and sanitize URLs
const isSafeUrl = (url) => {
  if (!url) {return false;}
  const trimmed = String(url).trim().toLowerCase();
  // Allow relative paths, data URIs for SVG, and https
  return (
    trimmed.startsWith('/') ||
    trimmed.startsWith('data:image/') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('blob:')
  );
};

// SECURITY: Safe window.open with URL validation
const safeOpenUrl = (url) => {
  if (!isSafeUrl(url)) {
    console.warn('Attempt to open invalid URL:', url);
    return;
  }
  try {
    new URL(url, window.location.origin);
    window.open(url, '_blank', 'noopener');
  } catch {
    console.warn('Invalid URL:', url);
  }
};

// SECURITY: Set background-image safely
const setBackgroundImage = (element, url) => {
  if (!element) {return;}
  if (!url || !isSafeUrl(url)) {
    element.style.backgroundImage = 'none';
    return;
  }
  // Use URL constructor to validate, then set via CSS
  try {
    new URL(url, window.location.origin);
    element.style.backgroundImage = `url("${url.replace(/"/g, '\\"')}")`;
  } catch {
    element.style.backgroundImage = 'none';
  }
};

// ============================================================================
// PARSING AND NUMERIC UTILITIES
// ============================================================================

const parseInteger = (value) => {
  const parsed = Number.parseInt(String(value || '').trim(), 10);
  return Number.isNaN(parsed) ? 0 : parsed;
};

const parseFirstNumber = (value) => {
  const match = String(value || '').match(/-?\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : null;
};

// ============================================================================
// D&D ABILITY AND MONSTER FORMATTING
// ============================================================================

const formatAbilityModifier = (score) => {
  const numeric = Number.parseInt(String(score || '').trim(), 10);
  if (Number.isNaN(numeric)) {
    return '';
  }
  const modifier = Math.floor((numeric - 10) / 2);
  const sign = modifier >= 0 ? '+' : '';
  return `(${sign}${modifier})`;
};

const formatMonsterSize = (value) => {
  const raw = String(value || '').trim();
  if (!raw) {
    return '';
  }
  const map = {
    T: 'Tiny',
    S: 'Small',
    M: 'Medium',
    L: 'Large',
    H: 'Huge',
    G: 'Gargantuan'
  };
  if (raw.length === 1) {
    return map[raw.toUpperCase()] || raw;
  }
  return raw
    .split(/\s+/)
    .map((part) => map[part.toUpperCase()] || part)
    .join(' ');
};

const getMonsterMaxHp = (monster) => {
  if (!monster) {
    return null;
  }
  if (Number.isFinite(monster.maxHp)) {
    return monster.maxHp;
  }
  const parsed = parseFirstNumber(monster.hitPoints);
  return Number.isFinite(parsed) ? parsed : null;
};

// ============================================================================
// IMAGE URL UTILITIES
// ============================================================================

const normalizeImageUrls = (value) => {
  if (!value) {
    return [];
  }
  if (Array.isArray(value)) {
    return value
      .map((entry) => String(entry || '').trim())
      .filter(Boolean);
  }
  return String(value)
    .split('\n')
    .map((entry) => entry.trim())
    .filter(Boolean);
};

const getMonsterPreviewImage = (monster) => {
  if (!monster) {
    return '';
  }
  if (monster.imageUrls?.length) {
    return monster.imageUrls[0];
  }
  if (monster.imageUrl) {
    return monster.imageUrl;
  }
  return '';
};

const createMonsterPlaceholder = (name = '') => {
  const label = (name || 'Monster')
    .trim()
    .slice(0, 16)
    .replace(/[^\w\s.-]/g, '');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><rect width="96" height="96" rx="16" fill="#1f2433"/><path d="M30 40c0-9 7-16 18-16s18 7 18 16c0 6-3 11-8 14l6 14H32l6-14c-5-3-8-8-8-14z" fill="#7a52ff" opacity="0.9"/><text x="48" y="84" font-size="10" font-family="Inter, system-ui, sans-serif" text-anchor="middle" fill="#cfd3e3">${label}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

// ============================================================================
// XML PARSING UTILITIES
// ============================================================================

const getXmlText = (root, selector) =>
  root?.querySelector(selector)?.textContent?.trim() || '';

const parseXmlEntries = (root, selector) =>
  Array.from(root?.querySelectorAll(selector) || []);

const parseXmlTextList = (node, selector) =>
  parseXmlEntries(node, selector)
    .map((textNode) => textNode.textContent?.trim())
    .filter(Boolean);

const formatXmlTraitList = (nodes) =>
  nodes
    .map((node) => {
      const name = getXmlText(node, 'name');
      const texts = parseXmlEntries(node, 'text')
        .map((textNode) => textNode.textContent?.trim())
        .filter(Boolean);
      const detail = texts.join('\n');
      if (!name && !detail) {
        return '';
      }
      if (!name) {
        return detail;
      }
      if (!detail) {
        return name;
      }
      return `${name}: ${detail}`;
    })
    .filter(Boolean)
    .join('\n');

const parseXmlActionBlocks = (nodes, { includeAttacks = false } = {}) =>
  nodes.map((node) => ({
    name: getXmlText(node, 'name'),
    text: parseXmlTextList(node, 'text'),
    attacks: includeAttacks
      ? parseXmlEntries(node, 'attack')
          .map((attackNode) => attackNode.textContent?.trim())
          .filter(Boolean)
      : []
  }));

const formatLegacyActionText = (blocks) =>
  blocks
    .map((block) => {
      const text = block.text.join('\n');
      if (!block.name && !text) {
        return '';
      }
      if (!block.name) {
        return text;
      }
      if (!text) {
        return block.name;
      }
      return `${block.name}. ${text}`;
    })
    .filter(Boolean)
    .join('\n\n');

const splitCreatureType = (value) => {
  const raw = String(value || '').trim();
  if (!raw) {
    return { creatureType: '', source: '' };
  }
  const [left, ...rest] = raw.split(',');
  return {
    creatureType: left.trim(),
    source: rest.join(',').trim()
  };
};

// ============================================================================
// MONSTER XML PARSING
// ============================================================================

const parseMonsterXml = (raw) => {
  if (typeof DOMParser === 'undefined') {
    throw new Error('XML parsing is not supported in this environment.');
  }
  const parser = new DOMParser();
  const document = parser.parseFromString(raw, 'application/xml');
  if (document.querySelector('parsererror')) {
    throw new Error('Invalid XML.');
  }
  const monsters = Array.from(document.querySelectorAll('monster'));
  return monsters.map((monster) => {
    const name = getXmlText(monster, 'name');
    const size = formatMonsterSize(getXmlText(monster, 'size'));
    const typeValue = getXmlText(monster, 'type');
    const { creatureType, source } = splitCreatureType(typeValue);
    const alignment = getXmlText(monster, 'alignment');
    const armorClass = normalizeInlineText(getXmlText(monster, 'ac'));
    const hitPoints = getXmlText(monster, 'hp');
    const speed = normalizeInlineText(getXmlText(monster, 'speed'));
    const savingThrows = normalizeInlineText(getXmlText(monster, 'save'));
    const skills = normalizeInlineText(getXmlText(monster, 'skill'));
    const damageVulnerabilities = getXmlText(monster, 'vulnerable');
    const damageResistances = getXmlText(monster, 'resist');
    const damageImmunities = getXmlText(monster, 'immune');
    const conditionImmunities = getXmlText(monster, 'conditionImmune');
    const senses = normalizeInlineText(getXmlText(monster, 'senses'));
    const passive = getXmlText(monster, 'passive');
    const languages = normalizeInlineText(getXmlText(monster, 'languages'));
    const cr = getXmlText(monster, 'cr');
    const xp = parseInteger(getXmlText(monster, 'xp'));
    const traitList = parseXmlActionBlocks(parseXmlEntries(monster, 'trait'));
    const actionList = parseXmlActionBlocks(parseXmlEntries(monster, 'action'), {
      includeAttacks: true
    });
    const bonusActionList = parseXmlActionBlocks(parseXmlEntries(monster, 'bonus'));
    const reactionList = parseXmlActionBlocks(parseXmlEntries(monster, 'reaction'));
    const legendaryActionIntro = parseXmlTextList(monster, 'lemma > text');
    const legendaryActionList = parseXmlEntries(monster, 'lemmaction').map((node) => ({
      name: getXmlText(node, 'name'),
      text: parseXmlTextList(node, 'text'),
      cost: Math.max(1, parseInteger(getXmlText(node, 'cost')))
    }));
    const mythicActionList = parseXmlActionBlocks(parseXmlEntries(monster, 'mythic'));
    const traits = formatLegacyActionText(traitList);
    const actions = formatLegacyActionText(actionList);
    const bonusActions = formatLegacyActionText(bonusActionList);
    const reactions = formatLegacyActionText(reactionList);
    const legendaryActions = [
      ...legendaryActionIntro,
      formatLegacyActionText(legendaryActionList)
    ]
      .filter(Boolean)
      .join('\n\n');
    const mythicActions = formatLegacyActionText(mythicActionList);
    const passivePerception = parseInteger(passive);
    const meta = `${size} ${creatureType}${alignment ? `, ${alignment}` : ''}`.trim();
    const challenge = xp ? `${cr} (${xp.toLocaleString()} XP)` : cr;
    return {
      id: crypto.randomUUID(),
      name,
      size,
      creatureType,
      source,
      alignment,
      type: 'npc',
      meta,
      hitPoints,
      maxHp: parseFirstNumber(hitPoints),
      armorClass,
      speed,
      stats: {
        str: getXmlText(monster, 'str'),
        dex: getXmlText(monster, 'dex'),
        con: getXmlText(monster, 'con'),
        int: getXmlText(monster, 'int'),
        wis: getXmlText(monster, 'wis'),
        cha: getXmlText(monster, 'cha'),
        strMod: formatAbilityModifier(getXmlText(monster, 'str')),
        dexMod: formatAbilityModifier(getXmlText(monster, 'dex')),
        conMod: formatAbilityModifier(getXmlText(monster, 'con')),
        intMod: formatAbilityModifier(getXmlText(monster, 'int')),
        wisMod: formatAbilityModifier(getXmlText(monster, 'wis')),
        chaMod: formatAbilityModifier(getXmlText(monster, 'cha'))
      },
      savingThrows,
      skills,
      damageVulnerabilities,
      damageResistances,
      damageImmunities,
      conditionImmunities,
      senses,
      passivePerception,
      languages,
      challenge,
      cr,
      xp,
      traits,
      actions,
      bonusActions,
      reactions,
      legendaryActions,
      mythicActions,
      traitList,
      actionList,
      bonusActionList,
      reactionList,
      legendaryActionIntro,
      legendaryActionList,
      mythicActionList,
      spellcasting: {
        spells: getXmlText(monster, 'spells')
          .split(',')
          .map((value) => value.trim())
          .filter(Boolean),
        slots: getXmlText(monster, 'slots')
          .split(',')
          .map((value) => parseInteger(value))
          .concat(Array(9).fill(0))
          .slice(0, 9)
      },
      environment: getXmlText(monster, 'environment'),
      description: getXmlText(monster, 'description'),
      token: getXmlText(monster, 'token'),
      art: getXmlText(monster, 'art'),
      url: getXmlText(monster, 'url'),
      imageUrl: '',
      imageUrls: [],
      notes: ''
    };
  });
};

// ============================================================================
// MONSTER DATA NORMALIZATION
// ============================================================================

const normalizeMonsterEntry = (entry) => {
  if (!entry || typeof entry !== 'object') {
    return null;
  }
  const name = String(entry.name || entry.Name || '').trim();
  if (!name) {
    return null;
  }
  const rawType = entry.type || entry.Type || '';
  const type = String(rawType).trim() || 'npc';
  const parsedMaxHp =
    Number(entry.maxHp ?? entry.maxHP ?? entry['Max HP'] ?? entry['Hit Points']);
  const maxHpFromText =
    parseFirstNumber(entry['Hit Points'] ?? entry.hitPoints ?? entry.HitPoints);
  const maxHp = Number.isNaN(parsedMaxHp)
    ? maxHpFromText
    : Math.max(0, parsedMaxHp);
  const meta = String(entry.meta || entry.Meta || entry.type || entry.Type || '').trim();
  const armorClass = String(
    entry.armorClass ||
      entry['Armor Class'] ||
      entry['Armor class'] ||
      entry['ArmorClass'] ||
      ''
  ).trim();
  const hitPoints = String(entry.hitPoints || entry['Hit Points'] || '').trim();
  const speed = String(entry.speed || entry.Speed || '').trim();
  const savingThrows = String(entry.savingThrows || entry['Saving Throws'] || '').trim();
  const skills = String(entry.skills || entry.Skills || '').trim();
  const senses = String(entry.senses || entry.Senses || '').trim();
  const languages = String(entry.languages || entry.Languages || '').trim();
  const challenge = String(entry.challenge || entry.Challenge || '').trim();
  const traits = stripHtml(entry.traits || entry.Traits || '');
  const actions = stripHtml(entry.actions || entry.Actions || '');
  const legendaryActions = stripHtml(entry.legendaryActions || entry['Legendary Actions'] || '');
  const imageUrls = normalizeImageUrls(
    entry.imageUrls ||
      entry.images ||
      entry.imageUrl ||
      entry.img_url ||
      entry.image ||
      entry['Image URL'] ||
      ''
  );
  const imageUrl = imageUrls[0] || '';
  const stats = {
    str: entry.STR || entry.str || '',
    dex: entry.DEX || entry.dex || '',
    con: entry.CON || entry.con || '',
    int: entry.INT || entry.int || '',
    wis: entry.WIS || entry.wis || '',
    cha: entry.CHA || entry.cha || '',
    strMod: entry.STR_mod || entry.strMod || '',
    dexMod: entry.DEX_mod || entry.dexMod || '',
    conMod: entry.CON_mod || entry.conMod || '',
    intMod: entry.INT_mod || entry.intMod || '',
    wisMod: entry.WIS_mod || entry.wisMod || '',
    chaMod: entry.CHA_mod || entry.chaMod || ''
  };
  const notes = String(entry.notes || entry.Notes || entry.description || '').trim();
  return {
    id: entry.id ? String(entry.id) : crypto.randomUUID(),
    name,
    type,
    meta,
    maxHp,
    armorClass,
    hitPoints,
    speed,
    savingThrows,
    skills,
    senses,
    languages,
    challenge,
    traits,
    actions,
    legendaryActions,
    imageUrl,
    imageUrls,
    stats,
    notes
  };
};

const normalizeMonsterManual = (entries) => {
  const list = Array.isArray(entries) ? entries : [];
  const seen = new Set();
  return list.reduce((acc, entry) => {
    const monster = normalizeMonsterEntry(entry);
    if (!monster) {
      return acc;
    }
    const key = monster.name.toLowerCase();
    if (seen.has(key)) {
      return acc;
    }
    seen.add(key);
    acc.push(monster);
    return acc;
  }, []);
};

const normalizeBookSource = (source) => {
  const value = String(source || '').trim().toLowerCase();
  if (value === 'core') {
    return 'core';
  }
  return 'user';
};

const createMonsterBook = (name, monsters = [], metadata = {}) => ({
  id: crypto.randomUUID(),
  name,
  edition: String(metadata.edition || '').trim(),
  coverImage: String(metadata.coverImage || '').trim(),
  source: normalizeBookSource(metadata.source),
  monsters: normalizeMonsterManual(monsters)
});

const normalizeMonsterBooks = (books) => {
  const list = Array.isArray(books) ? books : [];
  const seen = new Set();
  return list.reduce((acc, entry) => {
    const name = String(entry?.name || '').trim();
    if (!name) {
      return acc;
    }
    const edition = String(entry?.edition || '').trim();
    const id = entry?.id ? String(entry.id) : '';
    const key = id ? `id:${id}` : `${name.toLowerCase()}|${edition.toLowerCase()}`;
    if (seen.has(key)) {
      return acc;
    }
    seen.add(key);
    acc.push({
      id: id || crypto.randomUUID(),
      name,
      edition,
      coverImage: String(entry?.coverImage || '').trim(),
      source: normalizeBookSource(entry?.source),
      monsters: normalizeMonsterManual(entry.monsters || entry.entries || [])
    });
    return acc;
  }, []);
};

// ============================================================================
// MODULE INITIALIZATION AND EXPORTS
// ============================================================================

const initUtilities = () => {
  // Utility module initialization
};

export {
  initUtilities,
  stripHtml,
  truncateText,
  normalizeInlineText,
  isSafeUrl,
  safeOpenUrl,
  setBackgroundImage,
  parseInteger,
  parseFirstNumber,
  formatAbilityModifier,
  formatMonsterSize,
  getMonsterMaxHp,
  normalizeImageUrls,
  getMonsterPreviewImage,
  createMonsterPlaceholder,
  getXmlText,
  parseXmlEntries,
  parseXmlTextList,
  formatXmlTraitList,
  parseXmlActionBlocks,
  formatLegacyActionText,
  splitCreatureType,
  parseMonsterXml,
  normalizeMonsterEntry,
  normalizeMonsterManual,
  normalizeBookSource,
  createMonsterBook,
  normalizeMonsterBooks
};
