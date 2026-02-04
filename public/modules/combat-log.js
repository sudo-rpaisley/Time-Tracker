// Combat Log Management Module
// Handles combat log rendering, round history, encounter drafts, and encounter management
/* global roundDisplay, roundNumber, startCombatButton, combatActive, roundHistoryEntries, totalSeconds,
   saveState, calendarSettings, roundHistoryList, combatLogEntries, combatLog, encounterDifficulty,
   encounterDifficultyLabel, encounterDraftList, encounterDraft, encounterPresets, encounterPresetList, combatants */

const difficultyLabels = ['Easy', 'Easy', 'Medium', 'Hard', 'Deadly'];

const updateRoundDisplay = () => {
  if (!roundDisplay) {
    return;
  }
  roundDisplay.textContent = `Round ${roundNumber}`;
};

const updateStartCombatButton = () => {
  if (!startCombatButton) {
    return;
  }
  startCombatButton.textContent = combatActive ? 'End Combat' : 'Start Combat';
};

const recordRoundHistory = (round) => {
  if (!Number.isFinite(round)) {
    return;
  }
  const last = roundHistoryEntries[roundHistoryEntries.length - 1];
  if (last && last.round === round) {
    return;
  }
  // eslint-disable-next-line no-global-assign
  roundHistoryEntries = [
    ...roundHistoryEntries,
    {
      id: crypto.randomUUID(),
      round,
      timestamp: totalSeconds
    }
  ];
  renderRoundHistory();
  saveState();
};

const formatRoundHistoryEntry = (entry) => {
  const dateParts = window.__legacy.fromTotalSeconds(entry.timestamp, calendarSettings);
  return `Round ${entry.round} • ${window.__legacy.formatDate(dateParts, calendarSettings)} @ ${window.__legacy.formatTime(
    dateParts
  )}`;
};

const renderRoundHistory = () => {
  if (!roundHistoryList) {
    return;
  }
  roundHistoryList.innerHTML = '';
  if (roundHistoryEntries.length === 0) {
    const item = document.createElement('li');
    item.textContent = 'No rounds recorded yet.';
    item.className = 'helper-text';
    roundHistoryList.appendChild(item);
    return;
  }
  roundHistoryEntries.forEach((entry) => {
    const item = document.createElement('li');
    item.textContent = formatRoundHistoryEntry(entry);
    roundHistoryList.appendChild(item);
  });
};

const logEvent = (message) => {
  const entry = `${new Date().toLocaleTimeString()} • ${message}`;
  // eslint-disable-next-line no-global-assign
  combatLogEntries = [entry, ...combatLogEntries].slice(0, 25);
  renderCombatLog();
  saveState();
};

const renderCombatLog = () => {
  if (!combatLog) {
    return;
  }
  combatLog.innerHTML = '';
  if (combatLogEntries.length === 0) {
    const item = document.createElement('li');
    item.textContent = 'No combat activity yet.';
    item.className = 'helper-text';
    combatLog.appendChild(item);
    return;
  }
  combatLogEntries.forEach((entry) => {
    const item = document.createElement('li');
    item.textContent = entry;
    combatLog.appendChild(item);
  });
};

const updateDifficultyLabel = () => {
  if (!encounterDifficulty || !encounterDifficultyLabel) {
    return;
  }
  const value = Number(encounterDifficulty.value);
  encounterDifficultyLabel.textContent =
    difficultyLabels[value - 1] || 'Medium';
};

const renderEncounterDraft = () => {
  if (!encounterDraftList) {
    return;
  }
  encounterDraftList.innerHTML = '';
  if (encounterDraft.length === 0) {
    const item = document.createElement('li');
    item.className = 'helper-text';
    item.textContent = 'No suggested encounter yet.';
    encounterDraftList.appendChild(item);
    return;
  }
  encounterDraft.forEach((entry) => {
    const item = document.createElement('li');
    item.textContent = `${entry.name} • ${entry.count}`;
    encounterDraftList.appendChild(item);
  });
};

const generateEncounterDraft = () => {
  const difficulty = Number(encounterDifficulty.value);
  const monsterCount = Math.max(1, Math.ceil(difficulty + Math.random() * 2));
  const activeBook = window.__legacy.getActiveMonsterBook();
  if (!activeBook || activeBook.monsters.length === 0) {
    window.alert('Add monsters to the active book before generating encounters.');
    return;
  }
  // eslint-disable-next-line no-global-assign
  encounterDraft = [];
  for (let i = 0; i < monsterCount; i += 1) {
    const preset =
      activeBook.monsters[Math.floor(Math.random() * activeBook.monsters.length)];
    const maxHp = window.__legacy.getMonsterMaxHp(preset);
    const existing = encounterDraft.find((entry) => entry.id === preset.id);
    if (existing) {
      existing.count += 1;
    } else {
      encounterDraft.push({
        id: preset.id,
        name: preset.name,
        type: preset.type,
        maxHp,
        notes: preset.notes,
        count: 1
      });
    }
  }
  renderEncounterDraft();
  logEvent(`Generated a ${difficultyLabels[difficulty - 1] || 'Medium'} encounter.`);
  saveState();
};

const addEncounterToInitiative = () => {
  if (encounterDraft.length === 0) {
    return;
  }
  const escapeRegExp = (value) =>
    value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const getMaxCombatantIndex = (baseName) => {
    const pattern = new RegExp(`^${escapeRegExp(baseName)} (\\d+)$`, 'i');
    return combatants.reduce((max, combatant) => {
      if (!combatant?.name) {
        return max;
      }
      if (combatant.name === baseName) {
        return Math.max(max, 1);
      }
      const match = combatant.name.match(pattern);
      if (match) {
        return Math.max(max, Number(match[1]));
      }
      return max;
    }, 0);
  };
  const nextIndexByName = new Map();
  const getNextIndexedName = (baseName) => {
    const current = nextIndexByName.has(baseName)
      ? nextIndexByName.get(baseName)
      : getMaxCombatantIndex(baseName);
    const nextIndex = current + 1;
    nextIndexByName.set(baseName, nextIndex);
    return `${baseName} ${nextIndex}`;
  };
  const newCombatants = [];
  encounterDraft.forEach((entry) => {
    const needsNumbering =
      entry.count > 1 || getMaxCombatantIndex(entry.name) > 0;
    for (let i = 0; i < entry.count; i += 1) {
      newCombatants.push({
        id: crypto.randomUUID(),
        name: needsNumbering ? getNextIndexedName(entry.name) : entry.name,
        type: entry.type,
        maxHp: entry.maxHp,
        currentHp: entry.maxHp,
        initiative: null,
        conditions: '',
        notes: entry.notes,
        avatar: null
      });
    }
  });
  // eslint-disable-next-line no-global-assign
  combatants = [...combatants, ...newCombatants];
  window.__legacy.renderInitiative();
  window.__legacy.renderProfile();
  logEvent('Quick encounter added to initiative.');
  saveState();
};

const clearEncounterDraft = () => {
  // eslint-disable-next-line no-global-assign
  encounterDraft = [];
  renderEncounterDraft();
  saveState();
};

const renderEncounterPresets = () => {
  if (!encounterPresetList) {
    return;
  }
  encounterPresetList.innerHTML = '';
  if (encounterPresets.length === 0) {
    const item = document.createElement('li');
    item.className = 'helper-text';
    item.textContent = 'No presets saved yet.';
    encounterPresetList.appendChild(item);
    return;
  }
  encounterPresets.forEach((preset) => {
    const item = document.createElement('li');
    const label = document.createElement('span');
    label.textContent = preset.name;
    const actions = document.createElement('div');
    actions.className = 'button-row';

    const loadButton = document.createElement('button');
    loadButton.type = 'button';
    loadButton.className = 'ghost';
    loadButton.textContent = 'Load';
    loadButton.addEventListener('click', () => {
      // eslint-disable-next-line no-global-assign
      encounterDraft = preset.encounterDraft.map((entry) => ({ ...entry }));
      renderEncounterDraft();
      saveState();
    });

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'ghost';
    removeButton.textContent = 'Delete';
    removeButton.addEventListener('click', () => {
      // eslint-disable-next-line no-global-assign
      encounterPresets = encounterPresets.filter((entry) => entry.id !== preset.id);
      renderEncounterPresets();
      saveState();
    });

    actions.append(loadButton, removeButton);
    item.append(label, actions);
    encounterPresetList.appendChild(item);
  });
};

// Initialize combat log module
const initCombatLog = () => {
  // Module initialization - can be extended later if needed
};

// Export public functions
export {
  updateRoundDisplay,
  updateStartCombatButton,
  recordRoundHistory,
  formatRoundHistoryEntry,
  renderRoundHistory,
  logEvent,
  renderCombatLog,
  updateDifficultyLabel,
  renderEncounterDraft,
  generateEncounterDraft,
  addEncounterToInitiative,
  clearEncounterDraft,
  renderEncounterPresets,
  initCombatLog
};
