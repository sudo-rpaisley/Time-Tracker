// Milestones module — concrete implementations operating on global state
import * as Render from './render.js';
import * as Api from './api.js';
import * as Utils from './utils.js';

export const initMilestones = () => {
  window.campaignMilestones = window.campaignMilestones || [];
};

export const renderCampaignMilestones = () => {
  if (typeof Render.renderCampaignMilestones === 'function') {return Render.renderCampaignMilestones();}
  return undefined;
};

export const addMilestone = (payload) => {
  const titleInput = document.getElementById('milestoneTitleInput');
  const statusInput = document.getElementById('milestoneStatusInput');
  const dayInput = document.getElementById('milestoneDayInput');
  const monthInput = document.getElementById('milestoneMonthInput');
  const yearInput = document.getElementById('milestoneYearInput');
  const notesInput = document.getElementById('milestoneNotesInput');

  const title = payload?.title ?? titleInput?.value.trim();
  if (!title) { if (titleInput) {titleInput.focus();} return null; }
  const dayValue = payload?.targetDate?.day ?? Number(dayInput?.value);
  const monthValue = payload?.targetDate?.month ?? Number(monthInput?.value);
  const yearValue = payload?.targetDate?.year ?? Number(yearInput?.value);
  const hasDate = Number.isFinite(dayValue) && Number.isFinite(monthValue) && Number.isFinite(yearValue);
  const targetDate = hasDate ? { day: Math.max(1, dayValue), month: Math.max(1, monthValue), year: Math.max(1, yearValue) } : null;

  const milestone = {
    id: (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : Utils.generateUuid(),
    title,
    status: payload?.status ?? (statusInput?.value || 'planned'),
    targetDate,
    notes: (payload?.notes ?? notesInput?.value.trim()) || ''
  };
  window.campaignMilestones = [...(window.campaignMilestones || []), milestone];

  if (!payload) {
    if (titleInput) {titleInput.value = '';}
    if (statusInput) {statusInput.value = 'planned';}
    if (notesInput) {notesInput.value = '';}
    if (dayInput) {dayInput.value = '';}
    if (monthInput) {monthInput.value = '';}
    if (yearInput) {yearInput.value = '';}
  }

  renderCampaignMilestones();
  if (Api && typeof Api.saveState === 'function') {Api.saveState();}
  return milestone;
};

export default { initMilestones, addMilestone, renderCampaignMilestones };
