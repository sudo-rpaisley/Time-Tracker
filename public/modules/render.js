// Render module — provide exported render functions that
// delegate to legacy `public/script.js` implementations when available.
const callLegacy = (name, ...args) => {
  if (typeof window === 'undefined') {return undefined;}
  const fn = window[name] || (window.render && window.render[name]);
  if (typeof fn === 'function') {return fn(...args);}
  return undefined;
};

export const initRenderer = () => {
  // If legacy renderer exists, do nothing; otherwise provide minimal helpers
  if (typeof window !== 'undefined' && (window.renderApp || window.render)) {
    return;
  }
  window.render = window.render || {};
  window.render.text = (el, text) => {
    if (!el) {return;}
    el.textContent = text;
  };
};

// Exported render wrappers (progressive)
export const renderInitiative = (...args) => callLegacy('renderInitiative', ...args);
export const renderProfile = (...args) => callLegacy('renderProfile', ...args);
export const renderPartyProfile = (...args) => callLegacy('renderPartyProfile', ...args);
export const renderWorldMap = (...args) => callLegacy('renderWorldMap', ...args);
export const renderCombatLog = (...args) => callLegacy('renderCombatLog', ...args);
export const renderRoundHistory = (...args) => callLegacy('renderRoundHistory', ...args);
export const renderCalendar = (...args) => callLegacy('renderCalendar', ...args);
export const renderTimeline = (...args) => callLegacy('renderTimeline', ...args);
export const renderStats = (...args) => callLegacy('renderStats', ...args);
export const renderMonsterManual = (...args) => callLegacy('renderMonsterManual', ...args);
export const renderCombatantPresets = (...args) => callLegacy('renderCombatantPresets', ...args);
export const renderMonsterDetail = (...args) => callLegacy('renderMonsterDetail', ...args);
export const renderWorldTiles = (...args) => callLegacy('renderWorldTiles', ...args);
export const renderEncounterPresets = (...args) => callLegacy('renderEncounterPresets', ...args);
export const renderQuestBoard = (...args) => callLegacy('renderQuestBoard', ...args);
export const renderDowntimeTracker = (...args) => callLegacy('renderDowntimeTracker', ...args);
export const renderNpcDirectory = (...args) => callLegacy('renderNpcDirectory', ...args);
export const renderFactionRoster = (...args) => callLegacy('renderFactionRoster', ...args);
export const renderRumorBoard = (...args) => callLegacy('renderRumorBoard', ...args);
export const renderSessionNotes = (...args) => callLegacy('renderSessionNotes', ...args);
export const renderCampaignMilestones = (...args) => callLegacy('renderCampaignMilestones', ...args);
export const renderEncounterPlans = (...args) => callLegacy('renderEncounterPlans', ...args);
export const renderEncounterDraft = (...args) => callLegacy('renderEncounterDraft', ...args);
export const renderPartyList = (...args) => callLegacy('renderPartyList', ...args);

export default { initRenderer };
