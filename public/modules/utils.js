/**
 * Utility functions for formatting, parsing, and text manipulation
 */

/**
 * Pad number with leading zero (00-59)
 */
const pad = (value) => String(value).padStart(2, '0');

/**
 * Strip HTML tags from string
 */
const stripHtml = (value) => String(value || '').replace(/<[^>]*>/g, '').trim();

/**
 * Parse first number from string (handles decimals and negatives)
 */
const parseFirstNumber = (value) => {
  const match = String(value || '').match(/-?\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : null;
};

/**
 * Parse integer, return 0 if invalid
 */
const parseInteger = (value) => {
  const parsed = Number.parseInt(String(value || '').trim(), 10);
  return Number.isNaN(parsed) ? 0 : parsed;
};

/**
 * Get XML element text content
 */
const getXmlText = (root, selector) =>
  root?.querySelector(selector)?.textContent?.trim() || '';

/**
 * Get array of XML elements matching selector
 */
const parseXmlEntries = (root, selector) =>
  Array.from(root?.querySelectorAll(selector) || []);

/**
 * Parse XML text list (array of elements with text content)
 */
const parseXmlTextList = (node, selector) =>
  parseXmlEntries(node, selector)
    .map((textNode) => textNode.textContent?.trim())
    .filter(Boolean);

/**
 * Normalize inline whitespace to single spaces
 */
const normalizeInlineText = (value) =>
  String(value || '')
    .replace(/\s+/g, ' ')
    .trim();

/**
 * Format ability modifier (e.g., "10" -> "(+0)")
 */
const formatAbilityModifier = (score) => {
  const numeric = Number.parseInt(String(score || '').trim(), 10);
  if (Number.isNaN(numeric)) {
    return '';
  }
  const modifier = Math.floor((numeric - 10) / 2);
  const sign = modifier >= 0 ? '+' : '';
  return `(${sign}${modifier})`;
};

/**
 * Format creature size (T->Tiny, S->Small, etc.)
 */
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

/**
 * Split creature type and source
 */
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

/**
 * Parse XML action blocks (name + text array)
 */
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

/**
 * Format legacy action text from blocks
 */
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

/**
 * Truncate text with ellipsis
 */
const truncateText = (value, maxLength = 140) => {
  const text = String(value || '').trim();
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength).trim()}…`;
};

/**
 * Get monster max HP from object
 */
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

/**
 * Normalize image URLs (string or array) to array
 */
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

/**
 * Get first image URL from monster
 */
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

/**
 * Create SVG placeholder for monster
 */
const createMonsterPlaceholder = (name = '') => {
  const label = (name || 'Monster')
    .trim()
    .slice(0, 16)
    .replace(/[^\w\s.-]/g, '');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><rect width="96" height="96" rx="16" fill="#1f2433"/><path d="M30 40c0-9 7-16 18-16s18 7 18 16c0 6-3 11-8 14l6 14H32l6-14c-5-3-8-8-8-14z" fill="#7a52ff" opacity="0.9"/><text x="48" y="84" font-size="10" font-family="Inter, system-ui, sans-serif" text-anchor="middle" fill="#cfd3e3">${label}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

/**
 * Parse challenge rating (handles fractions)
 */
const parseChallengeRating = (value) => {
  const raw = String(value || '').trim();
  if (!raw) {
    return null;
  }
  if (raw.includes('/')) {
    const [numerator, denominator] = raw.split('/');
    const num = Number(numerator);
    const den = Number(denominator);
    if (Number.isFinite(num) && Number.isFinite(den) && den !== 0) {
      return num / den;
    }
  }
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : null;
};

/**
 * Parse tags from comma or newline-separated string
 */
const parseTags = (value) =>
  String(value || '')
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);

/**
 * Generate UUID v4 (fallback if crypto.randomUUID unavailable)
 */
const generateUuid = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    const buffer = new Uint8Array(16);
    crypto.getRandomValues(buffer);
    buffer[6] = (buffer[6] & 0x0f) | 0x40;
    buffer[8] = (buffer[8] & 0x3f) | 0x80;
    const hex = Array.from(buffer, (byte) => byte.toString(16).padStart(2, '0'));
    return `${hex[0]}${hex[1]}${hex[2]}${hex[3]}-${hex[4]}${hex[5]}-${hex[6]}${hex[7]}-${hex[8]}${hex[9]}-${hex[10]}${hex[11]}${hex[12]}${hex[13]}${hex[14]}${hex[15]}`;
  }
  return `uuid-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

// Export all utilities
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    pad,
    stripHtml,
    parseFirstNumber,
    parseInteger,
    getXmlText,
    parseXmlEntries,
    parseXmlTextList,
    normalizeInlineText,
    formatAbilityModifier,
    formatMonsterSize,
    splitCreatureType,
    parseXmlActionBlocks,
    formatLegacyActionText,
    truncateText,
    getMonsterMaxHp,
    normalizeImageUrls,
    getMonsterPreviewImage,
    createMonsterPlaceholder,
    parseChallengeRating,
    parseTags,
    generateUuid
  };
}
