// Stats Page Bootstrap
import '../script.js';
import * as Party from '../modules/party.js';
import * as Profile from '../modules/profile.js';
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
  safeInit(Party.initParty);
  safeInit(Profile.initProfile);
  safeInit(Events.initEventListeners);
  safeInit(Api.initApi);
  safeInit(Utilities.initUtilities);
  
  // Initialize state from localStorage - MUST AWAIT
  if (typeof initializeDefaults === 'function') {
    await initializeDefaults();
  }
  
  // Render stats
  safeInit(() => {
    if (typeof renderStats === 'function') {
      renderStats();
    }
  });
  
  window.App = window.App || {};
  window.App.Party = Party;
  window.App.Profile = Profile;
  window.App.ready = true;
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    bootstrap().catch(err => console.error('[stats/main.js] Bootstrap error:', err));
  });
} else {
  bootstrap().catch(err => console.error('[stats/main.js] Bootstrap error:', err));
}
