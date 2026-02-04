/**
 * API communication layer for state, books, and world data
 */

/**
 * Load application state from server
 */
const loadState = async () => {
  try {
    const response = await fetch('/api/state');
    if (!response.ok) {
      console.error('Failed to load state:', response.statusText);
      return false;
    }
    const parsed = await response.json();
    if (
      parsed &&
      parsed.worlds &&
      Object.prototype.hasOwnProperty.call(parsed, 'activeWorldId')
    ) {
      return parsed;
    }
  } catch (error) {
    console.error('Failed to load stored data', error);
  }
  return false;
};

/**
 * Save application state and worlds to server
 */
const saveState = async (payload) => {
  try {
    const response = await fetch('/api/state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      console.error('Failed to save state:', response.statusText);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Failed to save state', error);
    return false;
  }
};

// Small debounce helper to reduce frequent save calls
const debounce = (fn, wait = 1500) => {
  let timer = null;
  return (...args) => {
    if (timer) {clearTimeout(timer);}
    timer = setTimeout(() => {
      timer = null;
      try {
        fn(...args);
      } catch (e) {
        // swallow; original saveState logs errors
      }
    }, wait);
  };
};

// Debounced version of saveState for frequent UI calls
const saveStateDebounced = debounce(saveState, 1500);

// Expose a sensible global alias if running in browser so existing code can call `saveState()`
if (typeof window !== 'undefined') {
  // keep original available as `apiSaveState` and override global `saveState` with debounced
  // eslint-disable-next-line no-undef
  window.apiSaveState = saveState;
  // eslint-disable-next-line no-undef
  window.saveState = saveStateDebounced;
}

/**
 * Save monster book to library
 */
const saveMonsterBookToLibrary = async (book, { silent = false } = {}) => {
  if (!book) {
    if (!silent) {
      console.error('No book to save');
    }
    return null;
  }
  try {
    const response = await fetch('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ book })
    });
    if (!response.ok) {
      throw new Error('Save failed');
    }
    const payload = await response.json();
    if (!silent && payload?.message) {
      // eslint-disable-next-line no-console
      console.log(payload.message);
    }
    return payload?.book || null;
  } catch (error) {
    if (!silent) {
      // eslint-disable-next-line no-console
      console.error('Unable to save book to the library.', error);
    }
    return null;
  }
};

/**
 * Download file from URL to destination (Node.js only)
 * Note: This function cannot be used in browser environment
 */
const downloadToFile = async (url, destination) => {
  // eslint-disable-next-line no-undef
  if (typeof fs === 'undefined') {
    throw new Error('downloadToFile requires Node.js (server-side only)');
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  // eslint-disable-next-line no-undef
  await fs.promises.writeFile(destination, buffer);
};

// Export API functions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    loadState,
    saveState,
    saveStateDebounced,
    saveMonsterBookToLibrary,
    downloadToFile
  };
}
