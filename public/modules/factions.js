// Factions module — concrete implementations operating on global state
import * as Render from './render.js';
import * as Api from './api.js';
import * as Utils from './utils.js';

export const initFactions = () => {
  window.factionRoster = window.factionRoster || [];
};

export const renderFactionRoster = () => {
  if (typeof Render.renderFactionRoster === 'function') {return Render.renderFactionRoster();}
  return undefined;
};

export const addFaction = (payload) => {
  const nameInput = document.getElementById('factionNameInput');
  const influenceInput = document.getElementById('factionInfluenceInput');
  const alignmentInput = document.getElementById('factionAlignmentInput');
  const notesInput = document.getElementById('factionNotesInput');

  const name = payload?.name ?? nameInput?.value.trim();
  if (!name) { if (nameInput) {nameInput.focus();} return null; }
  const faction = {
    id: (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : Utils.generateUuid(),
    name,
    influence: payload?.influence ?? (influenceInput?.value || 'medium'),
    alignment: (payload?.alignment ?? alignmentInput?.value.trim()) || '',
    notes: (payload?.notes ?? notesInput?.value.trim()) || ''
  };
  window.factionRoster = [...(window.factionRoster || []), faction];

  if (!payload) {
    if (nameInput) {nameInput.value = '';}
    if (influenceInput) {influenceInput.value = 'medium';}
    if (alignmentInput) {alignmentInput.value = '';}
    if (notesInput) {notesInput.value = '';}
  }

  renderFactionRoster();
  if (Api && typeof Api.saveState === 'function') {Api.saveState();}
  return faction;
};

export default { initFactions, addFaction, renderFactionRoster };
