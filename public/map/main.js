// Map Page Bootstrap
import '../script.js';
import * as MapRendering from '../modules/map-rendering.js';
import * as WorldManagement from '../modules/world-management.js';
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
  safeInit(MapRendering.initMapRendering);
  safeInit(WorldManagement.initWorldManagement);
  safeInit(Events.initEventListeners);
  safeInit(Api.initApi);
  safeInit(Utilities.initUtilities);
  
  // Initialize state from localStorage - MUST AWAIT
  if (typeof initializeDefaults === 'function') {
    await initializeDefaults();
  }
  
  // Render map players
  safeInit(() => {
    if (typeof renderMapPlayers === 'function') {
      renderMapPlayers();
    }
  });
  
  window.App = window.App || {};
  window.App.MapRendering = MapRendering;
  window.App.ready = true;
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    bootstrap().catch(err => console.error('[map/main.js] Bootstrap error:', err));
  });
} else {
  bootstrap().catch(err => console.error('[map/main.js] Bootstrap error:', err));
}
