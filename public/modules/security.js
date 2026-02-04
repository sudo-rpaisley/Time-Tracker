/**
 * Security utilities: URL validation, safe DOM manipulation, XSS prevention
 */

/**
 * Check if URL is safe (relative, data URI, or https/http)
 */
const isSafeUrl = (url) => {
  if (!url) {return false;}
  const trimmed = String(url).trim().toLowerCase();
  return (
    trimmed.startsWith('/') ||
    trimmed.startsWith('data:image/') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('blob:')
  );
};

/**
 * Set background-image safely with URL validation
 */
const setBackgroundImage = (element, url) => {
  if (!element) {return;}
  if (!url || !isSafeUrl(url)) {
    element.style.backgroundImage = 'none';
    return;
  }
  try {
    new URL(url, window.location.origin);
    element.style.backgroundImage = `url("${url.replace(/"/g, '\\"')}")`;
  } catch {
    element.style.backgroundImage = 'none';
  }
};

/**
 * Open URL safely with validation
 */
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

/**
 * Sanitize HTML attribute values (prevent quote/script injection)
 */
const sanitizeAttribute = (value) => {
  if (!value) {return '';}
  return String(value)
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

/**
 * Create safe element text (uses textContent, not innerHTML)
 */
const createSafeElement = (tag, className = '', textContent = '') => {
  const el = document.createElement(tag);
  if (className) {
    el.className = className;
  }
  if (textContent) {
    el.textContent = textContent;
  }
  return el;
};

// Export security utilities
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    isSafeUrl,
    setBackgroundImage,
    safeOpenUrl,
    sanitizeAttribute,
    createSafeElement
  };
}
