// Rumors module — concrete implementations operating on global state
import * as Render from './render.js';
import * as Api from './api.js';
import * as Utils from './utils.js';

export const initRumors = () => {
  window.rumorBoard = window.rumorBoard || [];
};

export const renderRumorBoard = () => {
  if (typeof Render.renderRumorBoard === 'function') {return Render.renderRumorBoard();}
  return undefined;
};

export const generateRumorHook = () => {
  // Attempt to use legacy generator if available
  if (typeof window !== 'undefined' && typeof window.generateRumorHook === 'function') {
    return window.generateRumorHook();
  }
  // Fallback simple generator
  const titles = ['A whisper on the wind', 'A stolen map', 'A king in hiding'];
  return {
    title: titles[Math.floor(Math.random() * titles.length)],
    notes: 'A rumor has been whispered in the tavern.',
    source: 'unknown',
    tags: ['rumor']
  };
};

export const addRumor = (payload) => {
  const titleInput = document.getElementById('rumorTitleInput');
  const notesInput = document.getElementById('rumorNotesInput');
  const sourceInput = document.getElementById('rumorSourceInput');
  const urgencyInput = document.getElementById('rumorUrgencyInput');
  const tagsInput = document.getElementById('rumorTagsInput');
  const revealedInput = document.getElementById('rumorRevealedInput');

  const title = payload?.title ?? titleInput?.value.trim();
  if (!title) { if (titleInput) {titleInput.focus();} return null; }
  const rumor = {
    id: (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : Utils.generateUuid(),
    title,
    source: (payload?.source ?? sourceInput?.value.trim()) || '',
    urgency: payload?.urgency ?? (urgencyInput?.value || 'medium'),
    tags: payload?.tags ?? Utils.parseTags(tagsInput?.value),
    notes: (payload?.notes ?? notesInput?.value.trim()) || '',
    revealed: payload?.revealed ?? Boolean(revealedInput?.checked)
  };
  window.rumorBoard = [...(window.rumorBoard || []), rumor];

  if (!payload) {
    if (titleInput) {titleInput.value = '';}
    if (sourceInput) {sourceInput.value = '';}
    if (urgencyInput) {urgencyInput.value = 'medium';}
    if (tagsInput) {tagsInput.value = '';}
    if (notesInput) {notesInput.value = '';}
    if (revealedInput) {revealedInput.checked = false;}
  }

  renderRumorBoard();
  if (Api && typeof Api.saveState === 'function') {Api.saveState();}
  return rumor;
};

export default { initRumors, generateRumorHook, addRumor, renderRumorBoard };
