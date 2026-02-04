// Combat module — expose combat-related helpers that delegate to legacy code
const callLegacy = (name, ...args) => {
  if (typeof window === 'undefined') {return undefined;}
  const fn = window[name] || (window.combat && window.combat[name]);
  if (typeof fn === 'function') {return fn(...args);}
  return undefined;
};

export const initCombat = () => {
  if (typeof window !== 'undefined' && (typeof window.initLegacyCombat === 'function' || window.combat)) {
    return;
  }
  window.combat = window.combat || {};
  window.combat.list = window.combat.list || [];
  window.combat.add = (c) => window.combat.list.push(c);
};

export const addCombatant = (...args) => callLegacy('addCombatant', ...args);
export const updateSelectedCombatant = (...args) => callLegacy('updateSelectedCombatant', ...args);
export const advanceCombatant = (...args) => callLegacy('advanceCombatant', ...args);
export const startCombat = (...args) => callLegacy('startCombat', ...args);
export const endCombat = (...args) => callLegacy('endCombat', ...args);
export const rollInitiative = (...args) => callLegacy('rollInitiative', ...args);
export const sortCombatantsByInitiative = (...args) => callLegacy('sortCombatantsByInitiative', ...args);
export const clearEncounter = (...args) => callLegacy('clearEncounter', ...args);
export const addPartyToEncounter = (...args) => callLegacy('addPartyToEncounter', ...args);

export default { initCombat };
