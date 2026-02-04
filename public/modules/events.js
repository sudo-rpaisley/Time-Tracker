/**
 * Event Listeners Module
 * Wires up all DOM event listeners that haven't been extracted to feature modules
 */

import * as Clock from './clock.js';
import * as Interaction from './interaction.js';
import * as Profile from './profile.js';
import * as Initiative from './initiative.js';

export const initEventListeners = () => {
  setupTimeInputListeners();
  setupCombatantListeners();
  setupCalendarListeners();
  setupMapListeners();
  setupGlobalListeners();
};

const setupTimeInputListeners = () => {
  const setTimeButton = document.getElementById('setTimeButton');
  const toggleClockButton = document.getElementById('toggleClockButton');
  const nextTurnButton = document.getElementById('nextTurnButton');
  const shortRestButton = document.getElementById('shortRestButton');
  const longRestButton = document.getElementById('longRestButton');
  const yearInput = document.getElementById('yearInput');
  const monthInput = document.getElementById('monthInput');
  const dayInput = document.getElementById('dayInput');
  const hourInput = document.getElementById('hourInput');
  const minuteInput = document.getElementById('minuteInput');
  const secondInput = document.getElementById('secondInput');

  [yearInput, monthInput, dayInput, hourInput, minuteInput, secondInput].forEach((input) => {
    if (input) {
      input.addEventListener('focus', () => {
        window.__legacyUpdateTimeEditingState?.({ isEditing: true });
      });
      input.addEventListener('blur', () => {
        window.__legacyUpdateTimeEditingState?.({ isEditing: false });
      });
    }
  });

  if (setTimeButton) {
    setTimeButton.addEventListener('click', () => Clock.updateTimeFromInputs());
  }

  if (toggleClockButton) {
    toggleClockButton.addEventListener('click', () => Clock.toggleLiveClock());
  }

  if (nextTurnButton) {
    nextTurnButton.addEventListener('click', () => {
      const timeConfig = window.timeConfig || { turnSeconds: 6 };
      Clock.adjustTime(timeConfig.turnSeconds * 1000);
    });
  }

  if (shortRestButton) {
    shortRestButton.addEventListener('click', () => {
      const timeConfig = window.timeConfig || { shortRestHours: 1 };
      Clock.adjustTime(timeConfig.shortRestHours * 3600 * 1000);
    });
  }

  if (longRestButton) {
    longRestButton.addEventListener('click', () => {
      const timeConfig = window.timeConfig || { longRestHours: 8 };
      Clock.adjustTime(timeConfig.longRestHours * 3600 * 1000);
    });
  }
};

const setupCombatantListeners = () => {
  const combatantNameInput = document.getElementById('combatantNameInput');
  const combatantPresetSelect = document.getElementById('combatantPresetSelect');
  const combatantMaxHpInput = document.getElementById('combatantMaxHpInput');
  const rollAllButton = document.getElementById('rollAllButton');
  const rollNpcsButton = document.getElementById('rollNpcsButton');
  const sortInitiativeButton = document.getElementById('sortInitiativeButton');
  const startCombatButton = document.getElementById('startCombatButton');
  const combatNextTurnButton = document.getElementById('combatNextTurnButton');
  const clearCombatButton = document.getElementById('clearCombatButton');

  if (combatantNameInput) {
    combatantNameInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        Initiative.addCombatant();
      }
    });
  }

  if (combatantPresetSelect) {
    combatantPresetSelect.addEventListener('change', () => {
      const preset = window.__legacyGetMonsterById?.(combatantPresetSelect.value);
      if (preset && combatantMaxHpInput) {
        combatantMaxHpInput.value = window.__legacyGetMonsterMaxHp?.(preset) || '';
      }
    });
  }

  if (rollAllButton) {
    rollAllButton.addEventListener('click', () => Initiative.rollInitiative(null));
  }

  if (rollNpcsButton) {
    rollNpcsButton.addEventListener('click', () => Initiative.rollInitiative('npc'));
  }

  if (sortInitiativeButton) {
    sortInitiativeButton.addEventListener('click', () => {
      window.combatants?.sort(
        (a, b) => (Number.isFinite(b.initiative) ? b.initiative : -Infinity) -
          (Number.isFinite(a.initiative) ? a.initiative : -Infinity)
      );
      Initiative.renderInitiative();
    });
  }

  if (startCombatButton) {
    startCombatButton.addEventListener('click', () => {
      if (window.combatActive) {
        Initiative.endCombat();
      } else {
        Initiative.startCombat();
      }
    });
  }

  if (combatNextTurnButton) {
    combatNextTurnButton.addEventListener('click', () => Initiative.advanceCombatant());
  }

  if (clearCombatButton) {
    clearCombatButton.addEventListener('click', () => Initiative.clearEncounterDraft());
  }
};

const setupCalendarListeners = () => {
  const calendarPrevButton = document.getElementById('calendarPrevButton');
  const calendarNextButton = document.getElementById('calendarNextButton');
  const calendarFilterSelect = document.getElementById('calendarFilterSelect');
  const calendarActorFilterSelect = document.getElementById('calendarActorFilterSelect');
  const timelineFilterSelect = document.getElementById('timelineFilterSelect');
  const timelineActorFilterSelect = document.getElementById('timelineActorFilterSelect');

  const changeCalendarMonth = window.__legacyChangeCalendarMonth;
  const renderCalendarEventsList = window.__legacyRenderCalendarEventsList;
  const renderTimeline = window.__legacyRenderTimeline;

  if (calendarPrevButton && typeof changeCalendarMonth === 'function') {
    calendarPrevButton.addEventListener('click', () => changeCalendarMonth(-1));
  }

  if (calendarNextButton && typeof changeCalendarMonth === 'function') {
    calendarNextButton.addEventListener('click', () => changeCalendarMonth(1));
  }

  if (calendarFilterSelect && typeof renderCalendarEventsList === 'function') {
    calendarFilterSelect.addEventListener('change', renderCalendarEventsList);
  }

  if (calendarActorFilterSelect && typeof renderCalendarEventsList === 'function') {
    calendarActorFilterSelect.addEventListener('change', renderCalendarEventsList);
  }

  if (timelineFilterSelect && typeof renderTimeline === 'function') {
    timelineFilterSelect.addEventListener('change', renderTimeline);
  }

  if (timelineActorFilterSelect && typeof renderTimeline === 'function') {
    timelineActorFilterSelect.addEventListener('change', renderTimeline);
  }
};

const setupMapListeners = () => {
  const mapImageInput = document.getElementById('mapImageInput');
  const mapZoomInput = document.getElementById('mapZoomInput');
  const mapResetButton = document.getElementById('mapResetButton');
  const mapViewport = document.getElementById('mapViewport');

  if (mapImageInput) {
    mapImageInput.addEventListener('change', () => {
      const file = mapImageInput.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          window.worldMap = window.worldMap || {};
          window.worldMap.image = reader.result;
          const renderWorldMap = window.__legacyRenderWorldMap;
          if (typeof renderWorldMap === 'function') {
            renderWorldMap();
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (mapZoomInput) {
    mapZoomInput.addEventListener('input', () => {
      window.worldMap = window.worldMap || {};
      window.worldMap.zoom = Number(mapZoomInput.value) || 1;
      const renderWorldMap = window.__legacyRenderWorldMap;
      if (typeof renderWorldMap === 'function') {
        renderWorldMap();
      }
    });
  }

  if (mapResetButton) {
    mapResetButton.addEventListener('click', () => {
      window.worldMap = window.worldMap || {};
      window.worldMap.offsetX = 0;
      window.worldMap.offsetY = 0;
      window.worldMap.zoom = 1;
      const renderWorldMap = window.__legacyRenderWorldMap;
      if (typeof renderWorldMap === 'function') {
        renderWorldMap();
      }
    });
  }

  if (mapViewport) {
    const handleMapDragStart = window.__legacyHandleMapDragStart;
    const handleMapDragMove = window.__legacyHandleMapDragMove;
    const handleMapDragEnd = window.__legacyHandleMapDragEnd;
    const addMapMarker = window.__legacyAddMapMarker;
    const handleMapPlayerPlacement = window.__legacyHandleMapPlayerPlacement;

    if (typeof handleMapDragStart === 'function') {
      mapViewport.addEventListener('mousedown', handleMapDragStart);
    }
    if (typeof handleMapDragMove === 'function') {
      mapViewport.addEventListener('mousemove', handleMapDragMove);
    }
    if (typeof handleMapDragEnd === 'function') {
      mapViewport.addEventListener('mouseup', handleMapDragEnd);
      mapViewport.addEventListener('mouseleave', handleMapDragEnd);
    }
    if (typeof addMapMarker === 'function') {
      mapViewport.addEventListener('click', (event) => {
        if (event.shiftKey) {
          addMapMarker(event);
        }
      });
    }
    if (typeof handleMapPlayerPlacement === 'function') {
      mapViewport.addEventListener('click', handleMapPlayerPlacement);
    }
  }
};

const setupGlobalListeners = () => {
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      Profile.closeProfileModal();
      Profile.closePartyProfileModal();
      const closeWorldModal = window.__legacyCloseWorldModal;
      const closeWorldEditModal = window.__legacyCloseWorldEditModal;

      const closeMonsterBookModal = window.__legacyCloseMonsterBookModal;
      const closeMonsterModal = window.__legacyCloseMonsterModal;
      
      if (typeof closeWorldModal === 'function') {closeWorldModal();}
      if (typeof closeWorldEditModal === 'function') {closeWorldEditModal();}
      Interaction.closeInteractionModal();
      if (typeof closeMonsterBookModal === 'function') {closeMonsterBookModal();}
      if (typeof closeMonsterModal === 'function') {closeMonsterModal();}
    }
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.xp-menu') && !event.target.closest('.xp-plus')) {
      const closeXpMenus = window.__legacyCloseXpMenus;
      if (typeof closeXpMenus === 'function') {
        closeXpMenus();
      }
    }
    if (!event.target.closest('.condition-popover') && !event.target.closest('.condition-add')) {
      const closeConditionPopovers = window.__legacyCloseConditionPopovers;
      if (typeof closeConditionPopovers === 'function') {
        closeConditionPopovers();
      }
    }
  });

  window.addEventListener('hashchange', () => {
    const getMonsterIdFromLocation = window.__legacyGetMonsterIdFromLocation;
    const setActiveMonster = window.__legacySetActiveMonster;
    if (typeof getMonsterIdFromLocation === 'function' && typeof setActiveMonster === 'function') {
      const monsterId = getMonsterIdFromLocation();
      setActiveMonster(monsterId, { syncHash: false });
    }
  });
};
