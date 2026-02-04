// Map module — wrappers delegating to legacy `public/script.js` implementations
const callLegacy = (name, ...args) => {
  if (typeof window === 'undefined') {return undefined;}
  const fn = window[name] || (window.map && window.map[name]);
  if (typeof fn === 'function') {return fn(...args);}
  return undefined;
};

export const initMap = () => {
  if (typeof window !== 'undefined' && window.initLegacyMap) {return;}
  window.map = window.map || {};
};

export const renderWorldMap = (...args) => callLegacy('renderWorldMap', ...args);
export const handleMapDragStart = (...args) => callLegacy('handleMapDragStart', ...args);
export const handleMapDragMove = (...args) => callLegacy('handleMapDragMove', ...args);
export const handleMapDragEnd = (...args) => callLegacy('handleMapDragEnd', ...args);
export const handleMapPlayerPlacement = (...args) => callLegacy('handleMapPlayerPlacement', ...args);
export const addMapMarker = (...args) => callLegacy('addMapMarker', ...args);
export const updateMapPlayerHelp = (...args) => callLegacy('updateMapPlayerHelp', ...args);

export default { initMap };
