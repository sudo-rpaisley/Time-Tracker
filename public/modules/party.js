// Party module — expose party/profile helpers delegating to legacy code
const callLegacy = (name, ...args) => {
  if (typeof window === 'undefined') {return undefined;}
  const fn = window[name] || (window.party && window.party[name]);
  if (typeof fn === 'function') {return fn(...args);}
  return undefined;
};

export const initParty = () => {
  if (typeof window !== 'undefined' && typeof window.initLegacyParty === 'function') {
    return;
  }
  window.party = window.party || {};
  window.party.members = window.party.members || [];
  window.party.add = (p) => window.party.members.push(p);
};

export const addPartyMember = (...args) => callLegacy('addPartyMember', ...args);
export const updatePartyMember = (...args) => callLegacy('updatePartyMember', ...args);
export const removePartyMember = (...args) => callLegacy('removePartyMember', ...args);
export const renderPartyList = (...args) => callLegacy('renderPartyList', ...args);
export const renderPartyProfile = (...args) => callLegacy('renderPartyProfile', ...args);
export const updatePartyCoins = (...args) => callLegacy('updatePartyCoins', ...args);
export const updatePartyDeathSaves = (...args) => callLegacy('updatePartyDeathSaves', ...args);
export const syncPartyDeathSavesFromInputs = (...args) => callLegacy('syncPartyDeathSavesFromInputs', ...args);

export default { initParty };
