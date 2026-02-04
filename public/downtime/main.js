// Downtime Page Bootstrap
import '../script.js';
import * as Events from '../modules/events.js';
import * as Api from '../modules/api.js';
import * as Utilities from '../modules/utilities.js';

const safeInit = (fn) => {
  try {
    if (typeof fn === 'function') fn();
  } catch (err) {
    console.warn('Module init failed', err);
  }
};

const bootstrap = async () => {
  safeInit(Events.initEventListeners);
  safeInit(Api.initApi);
  safeInit(Utilities.initUtilities);
  
  // Initialize state from localStorage - MUST AWAIT
  if (typeof initializeDefaults === 'function') {
    await initializeDefaults();
  }
  
  window.App = window.App || {};
  window.App.ready = true;
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    bootstrap().catch(err => console.error('[downtime/main.js] Bootstrap error:', err));
  });
} else {
  bootstrap().catch(err => console.error('[downtime/main.js] Bootstrap error:', err));
}
