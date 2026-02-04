// Combat Page Bootstrap
// Loads modules needed for the combat page, plus script.js for state initialization
import '../script.js';
import * as Combat from '../modules/combat.js';
import * as Party from '../modules/party.js';
import * as Initiative from '../modules/initiative.js';
import * as Interaction from '../modules/interaction.js';
import * as Profile from '../modules/profile.js';
import * as Clock from '../modules/clock.js';
import * as Calendar from '../modules/calendar.js';
import * as CombatLog from '../modules/combat-log.js';
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
  // Initialize combat-specific modules
  safeInit(Combat.initCombat);
  safeInit(Party.initParty);
  safeInit(Initiative.initInitiative);
  safeInit(Interaction.initInteraction);
  safeInit(Profile.initProfile);
  safeInit(Clock.initClock);
  safeInit(CombatLog.initCombatLog);
  safeInit(Events.initEventListeners);
  safeInit(Api.initApi);
  safeInit(Utilities.initUtilities);
  
  // Initialize state from localStorage - MUST AWAIT
  if (typeof initializeDefaults === 'function') {
    await initializeDefaults();
  }
  
  // Render combat presets
  safeInit(() => {
    if (typeof renderCombatantPresets === 'function') {
      renderCombatantPresets();
    }
  });
  
  // Expose to window for any remaining legacy code
  window.App = window.App || {};
  window.App.Combat = Combat;
  window.App.Party = Party;
  window.App.Initiative = Initiative;
  window.App.Interaction = Interaction;
  window.App.Profile = Profile;
  window.App.CombatLog = CombatLog;
  window.App.Clock = Clock;
  window.App.Calendar = Calendar;
  window.App.ready = true;
};

// Run bootstrap when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    bootstrap().catch(err => console.error('[combat/main.js] Bootstrap error:', err));
  });
} else {
  bootstrap().catch(err => console.error('[combat/main.js] Bootstrap error:', err));
}

export { bootstrap };
