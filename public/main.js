// Application bootstrap — initialize modules on DOM ready
import * as Render from './modules/render.js';
import * as Combat from './modules/combat.js';
import * as Party from './modules/party.js';
import * as Api from './modules/api.js';
import * as Utils from './modules/utils.js';
import * as AppModule from './modules/app.js';
import * as MapModule from './modules/map.js';
import * as Monsters from './modules/monsters.js';
import * as Calendar from './modules/calendar.js';
import * as Quests from './modules/quests.js';
import * as Downtime from './modules/downtime.js';
import * as Npcs from './modules/npcs.js';
import * as Factions from './modules/factions.js';
import * as Rumors from './modules/rumors.js';
import * as Sessions from './modules/sessions.js';
import * as Milestones from './modules/milestones.js';
import * as Encounters from './modules/encounters.js';
import * as Clock from './modules/clock.js';
import * as Interaction from './modules/interaction.js';
import * as Profile from './modules/profile.js';
import * as Initiative from './modules/initiative.js';
import * as Events from './modules/events.js';
import * as WorldManagement from './modules/world-management.js';
import * as CalendarRendering from './modules/calendar-rendering.js';
import * as MonsterManagement from './modules/monster-management.js';
import * as MapRendering from './modules/map-rendering.js';
import * as CombatLog from './modules/combat-log.js';
import * as FeatureRenderers from './modules/feature-renderers.js';
import * as Utilities from './modules/utilities.js';
import * as MonsterDetail from './modules/monster-detail.js';

const safeInit = (fn) => {
  try {
    if (typeof fn === 'function') fn();
  } catch (err) {
    // keep boot resilient; log for debugging
    // eslint-disable-next-line no-console
    console.warn('Module init failed', err);
  }
};

const bootstrap = () => {
  safeInit(Render.initRenderer);
  safeInit(Combat.initCombat);
  safeInit(Party.initParty);
  safeInit(MapModule.initMap);
  safeInit(Monsters && (() => {}));
  safeInit(Calendar && Calendar.normalizeCalendarSettings);
  safeInit(Quests.initQuests);
  safeInit(Downtime.initDowntime);
  safeInit(Npcs.initNpcs);
  safeInit(Factions.initFactions);
  safeInit(Rumors.initRumors);
  safeInit(Sessions.initSessions);
  safeInit(Milestones.initMilestones);
  safeInit(Encounters.initEncounters);
  safeInit(Clock.initClock);
  safeInit(Interaction.initInteraction);
  safeInit(Profile.initProfile);
  safeInit(Initiative.initInitiative);
  safeInit(Events.initEventListeners);
  safeInit(WorldManagement.initWorldManagement);
  safeInit(CalendarRendering.initCalendarRendering);
  safeInit(MonsterManagement.initMonsterManagement);
  safeInit(MapRendering.initMapRendering);
  safeInit(CombatLog.initCombatLog);
  safeInit(FeatureRenderers.initFeatureRenderers);
  safeInit(Utilities.initUtilities);
  safeInit(MonsterDetail.initMonsterDetail);
  // Load legacy monolith (executes the existing public/script.js)
  safeInit(() => {
    // dynamic import not necessary since wrapper already statically imported,
    // but keep this hook for future dynamic loading if needed.
    if (AppModule && AppModule.legacyLoaded) {
      // legacy script loaded
    }
  });
  // ensure api utilities are available
  safeInit(Api.initApi);
  // expose small helper for other modules/tests
  window.App = window.App || {};
  window.App.utils = Utils;
  window.App.Clock = Clock;
  window.App.Interaction = Interaction;
  window.App.Profile = Profile;
  window.App.Initiative = Initiative;
  window.App.Events = Events;
  window.App.WorldManagement = WorldManagement;
  window.App.CalendarRendering = CalendarRendering;
  window.App.MonsterManagement = MonsterManagement;
  window.App.MapRendering = MapRendering;
  window.App.CombatLog = CombatLog;
  window.App.FeatureRenderers = FeatureRenderers;
  window.App.Utilities = Utilities;
  window.App.MonsterDetail = MonsterDetail;
  // Signal readiness
  window.App.ready = true;
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}

export default { bootstrap };
