// Session notes module — concrete implementations operating on global state
import * as Render from './render.js';
import * as Api from './api.js';
import * as Utils from './utils.js';

export const initSessions = () => {
  window.sessionNotes = window.sessionNotes || [];
};

const getCurrentDateParts = () => {
  if (typeof window !== 'undefined' && typeof window.getCurrentDateParts === 'function') {
    return window.getCurrentDateParts();
  }
  const d = new Date();
  return { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate(), hour: d.getHours(), minute: d.getMinutes(), second: d.getSeconds() };
};

export const renderSessionNotes = () => {
  if (typeof Render.renderSessionNotes === 'function') {return Render.renderSessionNotes();}
  return undefined;
};

export const addSessionNote = (payload) => {
  const titleInput = document.getElementById('sessionNoteTitleInput');
  const eventSelect = document.getElementById('sessionNoteEventSelect');
  const notesInput = document.getElementById('sessionNoteNotesInput');

  const title = payload?.title ?? titleInput?.value.trim();
  if (!title) { if (titleInput) {titleInput.focus();} return null; }
  const createdAt = payload?.createdAt ?? getCurrentDateParts();
  const note = {
    id: (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : Utils.generateUuid(),
    title,
    eventId: payload?.eventId ?? (eventSelect?.value || null),
    notes: (payload?.notes ?? notesInput?.value.trim()) || '',
    createdAt,
    createdAtKey: `${createdAt.year}-${String(createdAt.month).padStart(2,'0')}-${String(createdAt.day).padStart(2,'0')}`
  };
  window.sessionNotes = [...(window.sessionNotes || []), note];

  if (!payload) {
    if (titleInput) {titleInput.value = '';}
    if (eventSelect) {eventSelect.value = '';}
    if (notesInput) {notesInput.value = '';}
  }

  renderSessionNotes();
  if (Api && typeof Api.saveState === 'function') {Api.saveState();}
  return note;
};

export default { initSessions, addSessionNote, renderSessionNotes };
