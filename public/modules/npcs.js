// NPC module — concrete implementations operating on global state
import * as Render from './render.js';
import * as Api from './api.js';
import * as Utils from './utils.js';

export const initNpcs = () => {
  window.npcDirectory = window.npcDirectory || [];
};

export const renderNpcDirectory = () => {
  if (typeof Render.renderNpcDirectory === 'function') {return Render.renderNpcDirectory();}
  return undefined;
};

export const addNpc = (payload) => {
  const nameInput = document.getElementById('npcNameInput');
  const roleInput = document.getElementById('npcRoleInput');
  const statusInput = document.getElementById('npcStatusInput');
  const factionInput = document.getElementById('npcFactionInput');
  const notesInput = document.getElementById('npcNotesInput');

  const name = payload?.name ?? nameInput?.value.trim();
  if (!name) { if (nameInput) {nameInput.focus();} return null; }
  const npc = {
    id: (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : Utils.generateUuid(),
    name,
    role: (payload?.role ?? roleInput?.value.trim()) || '',
    status: payload?.status ?? (statusInput?.value || 'active'),
    faction: (payload?.faction ?? factionInput?.value.trim()) || '',
    notes: (payload?.notes ?? notesInput?.value.trim()) || ''
  };
  window.npcDirectory = [...(window.npcDirectory || []), npc];

  if (!payload) {
    if (nameInput) {nameInput.value = '';}
    if (roleInput) {roleInput.value = '';}
    if (statusInput) {statusInput.value = 'active';}
    if (factionInput) {factionInput.value = '';}
    if (notesInput) {notesInput.value = '';}
  }

  renderNpcDirectory();
  if (Api && typeof Api.saveState === 'function') {Api.saveState();}
  return npc;
};

export default { initNpcs, addNpc, renderNpcDirectory };
