// Log Page Bootstrap
import '../script.js';
import * as CombatLog from '../modules/combat-log.js';
import * as Calendar from '../modules/calendar.js';
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
  safeInit(CombatLog.initCombatLog);
  safeInit(Events.initEventListeners);
  safeInit(Api.initApi);
  safeInit(Utilities.initUtilities);
  
  // Initialize state from localStorage - MUST AWAIT
  if (typeof initializeDefaults === 'function') {
    await initializeDefaults();
  }
  
  window.App = window.App || {};
  window.App.CombatLog = CombatLog;
  window.App.ready = true;
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    bootstrap().catch(err => console.error('[log/main.js] Bootstrap error:', err));
  });
} else {
  bootstrap().catch(err => console.error('[log/main.js] Bootstrap error:', err));
}
