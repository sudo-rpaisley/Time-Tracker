// Downtime module — concrete implementation operating on global state
import * as Render from './render.js';
import * as Api from './api.js';
import * as Utils from './utils.js';

export const initDowntime = () => {
  window.downtimeEntries = window.downtimeEntries || [];
};

export const renderDowntimeTracker = () => {
  if (typeof Render.renderDowntimeTracker === 'function') {
    return Render.renderDowntimeTracker();
  }
  return undefined;
};

export const addDowntime = (payload) => {
  const characterInput = document.getElementById('downtimeCharacterInput');
  const activityInput = document.getElementById('downtimeActivityInput');
  const startDayInput = document.getElementById('downtimeStartDayInput');
  const startMonthInput = document.getElementById('downtimeStartMonthInput');
  const startYearInput = document.getElementById('downtimeStartYearInput');
  const endDayInput = document.getElementById('downtimeEndDayInput');
  const endMonthInput = document.getElementById('downtimeEndMonthInput');
  const endYearInput = document.getElementById('downtimeEndYearInput');
  const notesInput = document.getElementById('downtimeNotesInput');

  const character = payload?.character ?? characterInput?.value.trim();
  const activity = payload?.activity ?? activityInput?.value.trim();
  if (!character || !activity) {
    if (characterInput) {characterInput.focus();}
    return null;
  }
  const startDay = payload?.start?.day ?? Number(startDayInput?.value);
  const startMonth = payload?.start?.month ?? Number(startMonthInput?.value);
  const startYear = payload?.start?.year ?? Number(startYearInput?.value);
  const endDay = payload?.end?.day ?? Number(endDayInput?.value);
  const endMonth = payload?.end?.month ?? Number(endMonthInput?.value);
  const endYear = payload?.end?.year ?? Number(endYearInput?.value);

  if (
    !Number.isFinite(startDay) ||
    !Number.isFinite(startMonth) ||
    !Number.isFinite(startYear) ||
    !Number.isFinite(endDay) ||
    !Number.isFinite(endMonth) ||
    !Number.isFinite(endYear)
  ) {
    return null;
  }

  const downtimeEntry = {
    id: (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : Utils.generateUuid(),
    character,
    activity,
    start: { day: Math.max(1, startDay), month: Math.max(1, startMonth), year: Math.max(1, startYear) },
    end: { day: Math.max(1, endDay), month: Math.max(1, endMonth), year: Math.max(1, endYear) },
    notes: (payload?.notes ?? notesInput?.value.trim()) || ''
  };

  window.downtimeEntries = [...(window.downtimeEntries || []), downtimeEntry];

  if (!payload) {
    if (characterInput) {characterInput.value = '';}
    if (activityInput) {activityInput.value = '';}
    if (notesInput) {notesInput.value = '';}
    if (startDayInput) {startDayInput.value = '';}
    if (startMonthInput) {startMonthInput.value = '';}
    if (startYearInput) {startYearInput.value = '';}
    if (endDayInput) {endDayInput.value = '';}
    if (endMonthInput) {endMonthInput.value = '';}
    if (endYearInput) {endYearInput.value = '';}
  }

  renderDowntimeTracker();
  if (Api && typeof Api.saveState === 'function') {Api.saveState();}
  return downtimeEntry;
};

export default { initDowntime, addDowntime, renderDowntimeTracker };
