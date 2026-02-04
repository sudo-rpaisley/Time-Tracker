/**
 * Clock & Time Management Module
 * Handles in-game time progression, auto-clock, and time adjustments
 */

import * as Calendar from './calendar.js';
import * as Api from './api.js';

export const initClock = () => {
  // Module initialization can go here if needed
};

export const render = () => {
  const dateDisplay = document.getElementById('dateDisplay');
  const timeDisplay = document.getElementById('timeDisplay');
  const navTimeDisplay = document.getElementById('navTimeDisplay');

  const totalSeconds = window.totalSeconds || 0;
  const calendarSettings = window.calendarSettings || {};

  const dateParts = Calendar.fromTotalSeconds(totalSeconds, calendarSettings);
  if (dateDisplay) {
    dateDisplay.textContent = Calendar.formatDate(dateParts, calendarSettings);
  }
  const formattedTime = Calendar.formatTime(dateParts);
  if (timeDisplay) {
    timeDisplay.textContent = formattedTime;
  }
  if (navTimeDisplay) {
    navTimeDisplay.textContent = formattedTime;
  }
};

export const updateTimeFromInputs = () => {
  const yearInput = document.getElementById('yearInput');
  if (!yearInput) {
    return;
  }
  const monthInput = document.getElementById('monthInput');
  const dayInput = document.getElementById('dayInput');
  const hourInput = document.getElementById('hourInput');
  const minuteInput = document.getElementById('minuteInput');
  const secondInput = document.getElementById('secondInput');

  const calendarSettings = window.calendarSettings || {};

  window.totalSeconds = Calendar.toTotalSeconds(
    {
      year: Number(yearInput.value),
      month: Number(monthInput.value),
      day: Number(dayInput.value),
      hour: Number(hourInput.value),
      minute: Number(minuteInput.value),
      second: Number(secondInput.value)
    },
    calendarSettings
  );
  render();
  if (Api && typeof Api.saveState === 'function') {
    Api.saveState();
  }
};

export const adjustTime = (milliseconds) => {
  window.totalSeconds = (window.totalSeconds || 0) + Math.floor(milliseconds / 1000);
  render();
  const syncInputs = window.__legacySyncInputs;
  if (typeof syncInputs === 'function') {
    syncInputs();
  }
  if (Api && typeof Api.saveState === 'function') {
    Api.saveState();
  }
};

export const startAutoClock = () => {
  const toggleClockButton = document.getElementById('toggleClockButton');
  const timeConfig = window.timeConfig || { clockSpeed: 1 };

  if (window.autoClockTimer) {
    return;
  }
  if (toggleClockButton) {
    toggleClockButton.textContent = 'Pause Clock';
  }
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('autoClockEnabled', 'true');
  }
  window.autoClockTimer = window.setInterval(() => {
    adjustTime(1000 * timeConfig.clockSpeed);
  }, 1000);
};

export const stopAutoClock = () => {
  const toggleClockButton = document.getElementById('toggleClockButton');

  if (!window.autoClockTimer) {
    return;
  }
  window.clearInterval(window.autoClockTimer);
  window.autoClockTimer = null;
  if (toggleClockButton) {
    toggleClockButton.textContent = 'Start Clock';
  }
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('autoClockEnabled', 'false');
  }
};

export const toggleLiveClock = () => {
  if (window.autoClockTimer) {
    stopAutoClock();
  } else {
    startAutoClock();
  }
};
