// Monsters Page Bootstrap
import '../script.js';
import * as Monsters from '../modules/monsters.js';
import * as MonsterManagement from '../modules/monster-management.js';
import * as MonsterDetail from '../modules/monster-detail.js';
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
  safeInit(MonsterManagement.initMonsterManagement);
  safeInit(MonsterDetail.initMonsterDetail);
  safeInit(Events.initEventListeners);
  safeInit(Api.initApi);
  safeInit(Utilities.initUtilities);
  
  // Initialize state from localStorage - MUST AWAIT
  if (typeof initializeDefaults === 'function') {
    await initializeDefaults();
  }
  
  // Render monsters page
  safeInit(() => {
    if (typeof renderMonsterBookTiles === 'function') {
      renderMonsterBookTiles();
    }
    if (typeof renderMonsterManual === 'function') {
      renderMonsterManual();
    }
  });
  
  window.App = window.App || {};
  window.App.Monsters = Monsters;
  window.App.MonsterManagement = MonsterManagement;
  window.App.MonsterDetail = MonsterDetail;
  window.App.ready = true;
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    bootstrap().catch(err => console.error('[monsters/main.js] Bootstrap error:', err));
  });
} else {
  bootstrap().catch(err => console.error('[monsters/main.js] Bootstrap error:', err));
}
