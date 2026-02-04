// Quests module — concrete implementations that operate on global state
import * as Render from './render.js';
import * as Api from './api.js';
import * as Utils from './utils.js';

export const initQuests = () => {
  window.questBoard = window.questBoard || [];
};

export const renderQuestBoard = () => {
  // delegate to render module (which may call legacy renderer)
  if (typeof Render.renderQuestBoard === 'function') {
    return Render.renderQuestBoard();
  }
  return undefined;
};

export const addQuest = (payload) => {
  const titleInput = document.getElementById('questTitleInput');
  const notesInput = document.getElementById('questNotesInput');
  const dayInput = document.getElementById('questDeadlineDayInput');
  const monthInput = document.getElementById('questDeadlineMonthInput');
  const yearInput = document.getElementById('questDeadlineYearInput');
  const statusInput = document.getElementById('questStatusInput');

  const title = payload?.title ?? titleInput?.value.trim();
  if (!title) {
    if (titleInput) {titleInput.focus();}
    return null;
  }
  const deadline = payload?.deadline ?? (() => {
    const d = Number(dayInput?.value);
    const m = Number(monthInput?.value);
    const y = Number(yearInput?.value);
    if (Number.isFinite(d) && Number.isFinite(m) && Number.isFinite(y)) {
      return { day: Math.max(1, d), month: Math.max(1, m), year: Math.max(1, y) };
    }
    return null;
  })();

  const quest = {
    id: (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : Utils.generateUuid(),
    title,
    status: payload?.status ?? (statusInput?.value ?? 'open'),
    deadline,
    notes: (payload?.notes ?? notesInput?.value.trim()) || ''
  };

  window.questBoard = [...(window.questBoard || []), quest];

  if (!payload) {
    if (titleInput) {titleInput.value = '';}
    if (notesInput) {notesInput.value = '';}
    if (dayInput) {dayInput.value = '';}
    if (monthInput) {monthInput.value = '';}
    if (yearInput) {yearInput.value = '';}
  }

  renderQuestBoard();
  if (Api && typeof Api.saveState === 'function') {Api.saveState();}
  return quest;
};

export default { initQuests, addQuest, renderQuestBoard };
