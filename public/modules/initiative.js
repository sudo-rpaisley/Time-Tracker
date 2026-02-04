/**
 * Initiative & Combat Module
 * Handles initiative tracking, combat management, and combatant operations
 */

import * as Api from './api.js';
import * as Interaction from './interaction.js';
import * as Profile from './profile.js';
import * as Render from './render.js';

export const initInitiative = () => {
  // Module initialization can go here if needed
};

export const updateSelectedCombatant = (updates) => {
  const selectedCombatantId = window.selectedCombatantId;
  if (!selectedCombatantId) {
    return;
  }

  window.combatants = (window.combatants || []).map((combatant) =>
    combatant.id === selectedCombatantId ? { ...combatant, ...updates } : combatant
  );

  if (Render && typeof Render.renderInitiative === 'function') {
    Render.renderInitiative();
  }
  if (Profile && typeof Profile.renderProfile === 'function') {
    Profile.renderProfile();
  }
  if (Api && typeof Api.saveState === 'function') {
    Api.saveState();
  }
};

export const addCombatant = () => {
  const combatantNameInput = document.getElementById('combatantNameInput');
  const combatantMaxHpInput = document.getElementById('combatantMaxHpInput');
  const combatantInitiativeInput = document.getElementById('combatantInitiativeInput');
  const combatantPresetSelect = document.getElementById('combatantPresetSelect');
  const combatantTypeSelect = document.getElementById('combatantTypeSelect');

  if (!combatantNameInput) {
    return;
  }

  const name = combatantNameInput.value.trim();
  if (!name) {
    combatantNameInput.focus();
    return;
  }

  const getMonsterById = window.__legacyGetMonsterById;
  const getMonsterMaxHp = window.__legacyGetMonsterMaxHp;
  const preset = typeof getMonsterById === 'function' ? getMonsterById(combatantPresetSelect?.value) : null;

  const maxHpValue = Number(combatantMaxHpInput?.value);
  const maxHp = Number.isNaN(maxHpValue)
    ? (typeof getMonsterMaxHp === 'function' ? getMonsterMaxHp(preset) : null)
    : maxHpValue;

  const initiativeValue = Number(combatantInitiativeInput?.value);
  const initiative = Number.isNaN(initiativeValue) ? null : initiativeValue;

  const newCombatant = {
    id: crypto.randomUUID(),
    name,
    type: combatantTypeSelect?.value || preset?.type || 'npc',
    maxHp,
    currentHp: maxHp,
    initiative,
    conditions: '',
    notes: preset?.notes ?? '',
    avatar: null
  };

  window.combatants = [...(window.combatants || []), newCombatant];

  if (window.combatants.length === 1) {
    window.currentCombatantIndex = 0;
    window.selectedCombatantId = newCombatant.id;
  }

  if (combatantNameInput) {combatantNameInput.value = '';}
  if (combatantMaxHpInput) {combatantMaxHpInput.value = '';}
  if (combatantInitiativeInput) {combatantInitiativeInput.value = '';}
  if (combatantPresetSelect) {combatantPresetSelect.value = '';}
  if (combatantNameInput) {combatantNameInput.focus();}

  if (Render && typeof Render.renderInitiative === 'function') {
    Render.renderInitiative();
  }
  if (Profile && typeof Profile.renderProfile === 'function') {
    Profile.renderProfile();
  }
  if (Api && typeof Api.saveState === 'function') {
    Api.saveState();
  }
};

export const advanceCombatant = () => {
  const combatActive = window.combatActive;
  const combatants = window.combatants || [];

  if (!combatActive || combatants.length === 0) {
    return;
  }

  window.currentCombatantIndex = (window.currentCombatantIndex + 1) % combatants.length;

  if (window.currentCombatantIndex === 0) {
    window.roundNumber = (window.roundNumber || 1) + 1;
    const updateRoundDisplay = window.__legacyUpdateRoundDisplay;
    if (typeof updateRoundDisplay === 'function') {
      updateRoundDisplay();
    }
    const logEvent = window.__legacyLogEvent;
    if (typeof logEvent === 'function') {
      logEvent(`Round ${window.roundNumber} begins.`);
    }
    const recordRoundHistory = window.__legacyRecordRoundHistory;
    if (typeof recordRoundHistory === 'function') {
      recordRoundHistory(window.roundNumber);
    }
  }

  if (Render && typeof Render.renderInitiative === 'function') {
    Render.renderInitiative();
  }

  if (!window.selectedCombatantId) {
    window.selectedCombatantId = combatants[window.currentCombatantIndex]?.id ?? null;
    if (Profile && typeof Profile.renderProfile === 'function') {
      Profile.renderProfile();
    }
  }

  if (Api && typeof Api.saveState === 'function') {
    Api.saveState();
  }
};

export const startCombat = () => {
  if (window.combatActive || !window.combatants || window.combatants.length === 0) {
    return;
  }

  const stopAutoClock = window.__legacyStopAutoClock;
  if (typeof stopAutoClock === 'function') {
    stopAutoClock();
  }

  window.combatActive = true;
  window.currentCombatantIndex = 0;
  window.selectedCombatantId = window.combatants[0]?.id ?? null;

  if ((window.roundNumber || 0) < 1) {
    window.roundNumber = 1;
  }

  const updateRoundDisplay = window.__legacyUpdateRoundDisplay;
  if (typeof updateRoundDisplay === 'function') {
    updateRoundDisplay();
  }

  const updateStartCombatButton = window.__legacyUpdateStartCombatButton;
  if (typeof updateStartCombatButton === 'function') {
    updateStartCombatButton();
  }

  const recordRoundHistory = window.__legacyRecordRoundHistory;
  if (typeof recordRoundHistory === 'function') {
    recordRoundHistory(window.roundNumber);
  }

  if (Render && typeof Render.renderInitiative === 'function') {
    Render.renderInitiative();
  }
  if (Profile && typeof Profile.renderProfile === 'function') {
    Profile.renderProfile();
  }

  const logEvent = window.__legacyLogEvent;
  if (typeof logEvent === 'function') {
    logEvent('Combat started.');
  }

  if (Api && typeof Api.saveState === 'function') {
    Api.saveState();
  }
};

export const endCombat = () => {
  if (!window.combatActive) {
    return;
  }

  window.combatActive = false;

  const roundHistoryEntries = window.roundHistoryEntries || [];
  const roundCount = roundHistoryEntries.length > 0
    ? roundHistoryEntries[roundHistoryEntries.length - 1].round
    : window.roundNumber;

  const totalSeconds = window.totalSeconds || 0;
  const calendarSettings = window.calendarSettings || {};
  const fromTotalSeconds = window.__legacyFromTotalSeconds;

  let combatDate = { day: 1, month: 1, year: 1 };
  if (typeof fromTotalSeconds === 'function') {
    combatDate = fromTotalSeconds(totalSeconds, calendarSettings);
  }

  const calendarEvents = window.calendarEvents || [];
  window.calendarEvents = [
    ...calendarEvents,
    {
      id: crypto.randomUUID(),
      title: 'Combat concluded',
      description: `Encounter ended after ${roundCount} round${roundCount === 1 ? '' : 's'}.`,
      day: combatDate.day,
      month: combatDate.month,
      year: combatDate.year,
      type: 'combat'
    }
  ];

  const worldStats = window.worldStats || { encountersCompleted: 0 };
  window.worldStats = {
    ...worldStats,
    encountersCompleted: worldStats.encountersCompleted + 1
  };

  const updateStartCombatButton = window.__legacyUpdateStartCombatButton;
  if (typeof updateStartCombatButton === 'function') {
    updateStartCombatButton();
  }

  const logEvent = window.__legacyLogEvent;
  if (typeof logEvent === 'function') {
    logEvent('Combat ended.');
  }

  if (Render && typeof Render.renderInitiative === 'function') {
    Render.renderInitiative();
  }

  if (Api && typeof Api.saveState === 'function') {
    Api.saveState();
  }
};

export const rollInitiative = (filter) => {
  const combatants = window.combatants || [];
  const targetCombatants = filter
    ? combatants.filter((c) => c.type === filter)
    : combatants;

  targetCombatants.forEach((_combatant) => {
    const roll = Math.floor(Math.random() * 20) + 1;
    updateSelectedCombatant({ initiative: roll });
  });

  if (Render && typeof Render.renderInitiative === 'function') {
    Render.renderInitiative();
  }

  if (Api && typeof Api.saveState === 'function') {
    Api.saveState();
  }
};

export const clearEncounterDraft = () => {
  window.encounterDraft = [];
  const renderEncounterDraft = window.__legacyRenderEncounterDraft;
  if (typeof renderEncounterDraft === 'function') {
    renderEncounterDraft();
  }
};

export const removeSelectedCombatant = () => {
  const selectedCombatantId = window.selectedCombatantId;
  if (!selectedCombatantId) {
    return;
  }

  window.combatants = (window.combatants || []).filter(
    (entry) => entry.id !== selectedCombatantId
  );

  if (window.currentCombatantIndex >= window.combatants.length) {
    window.currentCombatantIndex = 0;
  }

  window.selectedCombatantId = null;

  if (Render && typeof Render.renderInitiative === 'function') {
    Render.renderInitiative();
  }
  if (Profile && typeof Profile.renderProfile === 'function') {
    Profile.renderProfile();
  }
  if (Api && typeof Api.saveState === 'function') {
    Api.saveState();
  }
};

export const renderInitiative = () => {
  const initiativeTrack = document.getElementById('initiativeTrack');
  if (!initiativeTrack) {
    return;
  }

  const combatants = window.combatants || [];
  initiativeTrack.innerHTML = '';

  if (combatants.length === 0) {
    const emptyState = document.createElement('div');
    emptyState.className = 'helper-text';
    emptyState.textContent = 'No combatants yet. Add players or NPCs to begin.';
    initiativeTrack.appendChild(emptyState);
    return;
  }

  const handleDropAtIndex = (targetIndex) => {
    const draggedCombatantId = window.draggedCombatantId;
    if (!draggedCombatantId) {
      return;
    }
    const fromIndex = combatants.findIndex((item) => item.id === draggedCombatantId);
    if (fromIndex === -1 || targetIndex === fromIndex) {
      return;
    }
    const [moved] = window.combatants.splice(fromIndex, 1);
    const adjustedIndex = fromIndex < targetIndex ? targetIndex - 1 : targetIndex;
    window.combatants.splice(adjustedIndex, 0, moved);

    if (window.currentCombatantIndex === fromIndex) {
      window.currentCombatantIndex = adjustedIndex;
    } else if (
      window.currentCombatantIndex >= Math.min(fromIndex, adjustedIndex) &&
      window.currentCombatantIndex <= Math.max(fromIndex, adjustedIndex)
    ) {
      if (fromIndex < adjustedIndex) {
        window.currentCombatantIndex -= 1;
      } else {
        window.currentCombatantIndex += 1;
      }
    }

    renderInitiative();
    if (Profile && typeof Profile.renderProfile === 'function') {
      Profile.renderProfile();
    }
    if (Api && typeof Api.saveState === 'function') {
      Api.saveState();
    }
  };

  const createDropZone = (targetIndex) => {
    const dropZone = document.createElement('div');
    dropZone.className = 'initiative-drop-zone';
    dropZone.setAttribute('aria-hidden', 'true');
    dropZone.addEventListener('dragover', (event) => {
      event.preventDefault();
      dropZone.classList.add('is-active');
    });
    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('is-active');
    });
    dropZone.addEventListener('drop', (event) => {
      event.preventDefault();
      dropZone.classList.remove('is-active');
      handleDropAtIndex(targetIndex);
    });
    return dropZone;
  };

  const getInitials = window.__legacyGetInitials;
  const setBackgroundImage = window.__legacySetBackgroundImage;
  const combatActive = window.combatActive;
  const currentCombatantIndex = window.currentCombatantIndex || 0;

  combatants.forEach((combatant, index) => {
    initiativeTrack.appendChild(createDropZone(index));

    const container = document.createElement('div');
    container.className = `combatant ${combatant.type}${
      combatActive && index === currentCombatantIndex ? ' current' : ''
    }`;
    container.setAttribute('role', 'button');
    container.setAttribute('tabindex', '0');
    container.setAttribute('draggable', 'true');
    container.dataset.combatantId = combatant.id;
    container.setAttribute('aria-label', `${combatant.name} (${combatant.type})`);

    const avatar = document.createElement('div');
    avatar.className = 'combatant-avatar';
    if (combatant.avatar) {
      avatar.classList.add('has-image');
      if (typeof setBackgroundImage === 'function') {
        setBackgroundImage(avatar, combatant.avatar);
      }
      avatar.textContent = '';
    } else {
      avatar.classList.remove('has-image');
      avatar.style.backgroundImage = '';
      const initials = typeof getInitials === 'function' ? getInitials(combatant.name) : '?';
      avatar.textContent = initials;
    }

    const name = document.createElement('div');
    name.className = 'combatant-name';
    name.textContent = combatant.name;

    const initiative = document.createElement('div');
    initiative.className = 'combatant-initiative';
    initiative.textContent = Number.isFinite(combatant.initiative) ? `Init ${combatant.initiative}` : 'Init —';

    const hpBadge = document.createElement('div');
    hpBadge.className = 'combatant-hp';
    const hpValue = Number.isFinite(combatant.currentHp) ? combatant.currentHp : '—';
    hpBadge.textContent = hpValue;
    hpBadge.setAttribute('aria-label', `Current HP: ${hpValue}`);
    hpBadge.title = `Current HP: ${hpValue}`;

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'combatant-remove';
    removeButton.setAttribute('aria-label', `Remove ${combatant.name}`);
    removeButton.textContent = '✕';
    removeButton.addEventListener('click', (event) => {
      event.stopPropagation();
      window.combatants = window.combatants.filter((entry) => entry.id !== combatant.id);
      if (window.currentCombatantIndex >= window.combatants.length) {
        window.currentCombatantIndex = 0;
      }
      if (window.selectedCombatantId === combatant.id) {
        window.selectedCombatantId = window.combatants[window.currentCombatantIndex]?.id ?? null;
      }
      renderInitiative();
      if (Profile && typeof Profile.renderProfile === 'function') {
        Profile.renderProfile();
      }
      if (Api && typeof Api.saveState === 'function') {
        Api.saveState();
      }
    });

    container.append(hpBadge, avatar, name, initiative, removeButton);

    container.addEventListener('click', () => {
      window.selectedCombatantId = combatant.id;
      if (!combatActive) {
        window.currentCombatantIndex = index;
      }
      renderInitiative();
      if (Profile && typeof Profile.renderProfile === 'function') {
        Profile.renderProfile();
      }
      if (Profile && typeof Profile.openProfileModal === 'function') {
        Profile.openProfileModal();
      }
    });

    container.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        window.selectedCombatantId = combatant.id;
        if (!combatActive) {
          window.currentCombatantIndex = index;
        }
        renderInitiative();
        if (Profile && typeof Profile.renderProfile === 'function') {
          Profile.renderProfile();
        }
        if (Profile && typeof Profile.openProfileModal === 'function') {
          Profile.openProfileModal();
        }
      }
    });

    container.addEventListener('dragstart', () => {
      window.draggedCombatantId = combatant.id;
      container.classList.add('dragging');
    });

    container.addEventListener('dragend', () => {
      window.draggedCombatantId = null;
      container.classList.remove('dragging');
      initiativeTrack.querySelectorAll('.combatant.drag-over').forEach((element) => {
        element.classList.remove('drag-over');
      });
      initiativeTrack.querySelectorAll('.initiative-drop-zone.is-active').forEach((element) => {
        element.classList.remove('is-active');
      });
    });

    container.addEventListener('dragover', (event) => {
      event.preventDefault();
      container.classList.add('drag-over');
    });

    container.addEventListener('dragleave', () => {
      container.classList.remove('drag-over');
    });

    container.addEventListener('drop', (event) => {
      event.preventDefault();
      container.classList.remove('drag-over');
      if (!window.draggedCombatantId || window.draggedCombatantId === combatant?.id) {
        return;
      }
      if (Interaction && typeof Interaction.openInteractionModal === 'function') {
        Interaction.openInteractionModal(window.draggedCombatantId, combatant.id);
      }
    });

    initiativeTrack.appendChild(container);
  });

  initiativeTrack.appendChild(createDropZone(combatants.length));
};
