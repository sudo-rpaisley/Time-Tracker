// Worlds Page Bootstrap
import '../script.js';
import * as WorldManagement from '../modules/world-management.js';
import * as MapRendering from '../modules/map-rendering.js';
import * as MonsterManagement from '../modules/monster-management.js';
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
  console.log('[worlds/main.js] Bootstrap starting');
  
  safeInit(WorldManagement.initWorldManagement);
  safeInit(MapRendering.initMapRendering);
  safeInit(MonsterManagement.initMonsterManagement);
  safeInit(Events.initEventListeners);
  safeInit(Api.initApi);
  safeInit(Utilities.initUtilities);
  
  console.log('[worlds/main.js] Modules initialized, calling initializeDefaults');
  
  // Initialize state from localStorage - MUST AWAIT
  if (typeof initializeDefaults === 'function') {
    try {
      await initializeDefaults();
      console.log('[worlds/main.js] initializeDefaults completed');
    } catch (err) {
      console.error('[worlds/main.js] initializeDefaults failed:', err);
    }
  } else {
    console.error('[worlds/main.js] initializeDefaults not available');
  }
  
  // Render worlds list
  safeInit(() => {
    console.log('[worlds/main.js] Rendering world tiles');
    if (typeof renderWorldTiles === 'function') {
      renderWorldTiles();
      console.log('[worlds/main.js] World tiles rendered');
    } else {
      console.error('[worlds/main.js] renderWorldTiles not available');
    }
  });
  
  window.App = window.App || {};
  window.App.WorldManagement = WorldManagement;
  window.App.MapRendering = MapRendering;
  window.App.ready = true;
  console.log('[worlds/main.js] Bootstrap complete');
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    bootstrap().catch(err => console.error('[worlds/main.js] Bootstrap error:', err));
  });
} else {
  bootstrap().catch(err => console.error('[worlds/main.js] Bootstrap error:', err));
}
