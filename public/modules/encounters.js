// Encounters module — concrete implementations operating on global state
import * as Render from './render.js';
import * as Api from './api.js';
import * as Utils from './utils.js';

export const initEncounters = () => {
  window.encounterPlans = window.encounterPlans || [];
  window.encounterDraft = window.encounterDraft || [];
  window.encounterPresets = window.encounterPresets || [];
};

export const renderEncounterPresets = () => {
  if (typeof Render.renderEncounterPresets === 'function') {return Render.renderEncounterPresets();}
  return undefined;
};

export const addEncounterPlan = (payload) => {
  const titleInput = document.getElementById('encounterPlanTitleInput');
  const threatInput = document.getElementById('encounterPlanThreatInput');
  const rosterInput = document.getElementById('encounterPlanRosterInput');
  const notesInput = document.getElementById('encounterPlanNotesInput');

  const title = payload?.title ?? titleInput?.value.trim();
  if (!title) { if (titleInput) {titleInput.focus();} return null; }
  const roster = payload?.roster ?? (String(rosterInput?.value || '').split('\n').map((l) => l.trim()).filter(Boolean));
  const plan = {
    id: (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : Utils.generateUuid(),
    title,
    threat: payload?.threat ?? (threatInput?.value || 'medium'),
    roster,
    notes: (payload?.notes ?? notesInput?.value.trim()) || ''
  };
  window.encounterPlans = [...(window.encounterPlans || []), plan];

  if (!payload) {
    if (titleInput) {titleInput.value = '';}
    if (threatInput) {threatInput.value = 'medium';}
    if (rosterInput) {rosterInput.value = '';}
    if (notesInput) {notesInput.value = '';}
  }

  renderEncounterPresets();
  if (Api && typeof Api.saveState === 'function') {Api.saveState();}
  return plan;
};

export const addEncounterToInitiative = (payload) => {
  // If payload provided, add prebuilt entries to encounter draft
  if (payload && Array.isArray(payload.roster)) {
    window.encounterDraft = [...(window.encounterDraft || []), ...payload.roster];
  }
  if (typeof Render.renderEncounterDraft === 'function') {
    Render.renderEncounterDraft();
  }
  if (Api && typeof Api.saveState === 'function') {Api.saveState();}
};

export const clearEncounterDraft = () => {
  window.encounterDraft = [];
  if (typeof Render.renderEncounterDraft === 'function') {Render.renderEncounterDraft();}
  if (Api && typeof Api.saveState === 'function') {Api.saveState();}
};

export default { initEncounters, addEncounterPlan, addEncounterToInitiative, renderEncounterPresets, clearEncounterDraft };
