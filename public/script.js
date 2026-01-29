const dateDisplay = document.getElementById('dateDisplay');
const timeDisplay = document.getElementById('timeDisplay');
const yearInput = document.getElementById('yearInput');
const monthInput = document.getElementById('monthInput');
const dayInput = document.getElementById('dayInput');
const hourInput = document.getElementById('hourInput');
const minuteInput = document.getElementById('minuteInput');
const secondInput = document.getElementById('secondInput');
const setTimeButton = document.getElementById('setTimeButton');
const nextTurnButton = document.getElementById('nextTurnButton');
const shortRestButton = document.getElementById('shortRestButton');
const longRestButton = document.getElementById('longRestButton');
const combatantNameInput = document.getElementById('combatantName');
const combatantTypeSelect = document.getElementById('combatantType');
const combatantMaxHpInput = document.getElementById('combatantMaxHp');
const combatantPresetSelect = document.getElementById('combatantPreset');
const addCombatantButton = document.getElementById('addCombatantButton');
const initiativeTrack = document.getElementById('initiativeTrack');
const appPage = document.getElementById('appPage');
const openSettingsButton = document.getElementById('openSettingsButton');
const settingsPage = document.getElementById('settingsPage');
const closeSettingsButton = document.getElementById('closeSettingsButton');
const worldSelect = document.getElementById('worldSelect');
const createWorldButton = document.getElementById('createWorldButton');
const deleteWorldButton = document.getElementById('deleteWorldButton');
const monthsInYearInput = document.getElementById('monthsInYearInput');
const hoursPerDayInput = document.getElementById('hoursPerDayInput');
const daysPerMonthInput = document.getElementById('daysPerMonthInput');
const monthNamesInput = document.getElementById('monthNamesInput');
const dayNamesInput = document.getElementById('dayNamesInput');
const applySettingsButton = document.getElementById('applySettingsButton');
const turnSecondsInput = document.getElementById('turnSecondsInput');
const shortRestHoursInput = document.getElementById('shortRestHoursInput');
const longRestHoursInput = document.getElementById('longRestHoursInput');
const toggleClockButton = document.getElementById('toggleClockButton');
const clockSpeedInput = document.getElementById('clockSpeedInput');
const roundDisplay = document.getElementById('roundDisplay');
const combatantInitiativeInput = document.getElementById('combatantInitiative');
const rollAllButton = document.getElementById('rollAllButton');
const rollNpcsButton = document.getElementById('rollNpcsButton');
const sortInitiativeButton = document.getElementById('sortInitiativeButton');
const clearCombatButton = document.getElementById('clearCombatButton');
const combatLog = document.getElementById('combatLog');
const profileModal = document.getElementById('profileModal');
const profileBackdrop = document.getElementById('profileBackdrop');
const closeProfileButton = document.getElementById('closeProfileButton');
const profileCard = document.getElementById('profileCard');
const emptyProfile = document.getElementById('emptyProfile');
const profileDetails = document.getElementById('profileDetails');
const profileName = document.getElementById('profileName');
const profileType = document.getElementById('profileType');
const profileCurrentHp = document.getElementById('profileCurrentHp');
const profileMaxHp = document.getElementById('profileMaxHp');
const profileInitiative = document.getElementById('profileInitiative');
const profileAvatar = document.getElementById('profileAvatar');
const profileConditions = document.getElementById('profileConditions');
const profileNotes = document.getElementById('profileNotes');
const removeCombatantButton = document.getElementById('removeCombatantButton');
const exportWorldButton = document.getElementById('exportWorldButton');
const importWorldInput = document.getElementById('importWorldInput');
const encounterDifficulty = document.getElementById('encounterDifficulty');
const encounterDifficultyLabel = document.getElementById(
  'encounterDifficultyLabel'
);
const generateEncounterButton = document.getElementById(
  'generateEncounterButton'
);
const addEncounterButton = document.getElementById('addEncounterButton');
const clearEncounterDraftButton = document.getElementById(
  'clearEncounterDraftButton'
);
const encounterDraftList = document.getElementById('encounterDraftList');

const timeInputs = [
  yearInput,
  monthInput,
  dayInput,
  hourInput,
  minuteInput,
  secondInput
];
let isEditingTimeInputs = false;

let totalSeconds = 0;
let combatants = [];
let currentCombatantIndex = 0;
let draggedCombatantId = null;
let selectedCombatantId = null;
let combatLogEntries = [];
let roundNumber = 1;
let autoClockTimer = null;
let encounterDraft = [];

let calendarSettings = {
  monthsInYear: 12,
  daysPerMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  hoursPerDay: 24,
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  dayNames: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ]
};

let timeConfig = {
  turnSeconds: 6,
  shortRestHours: 1,
  longRestHours: 8,
  clockSpeed: 1
};

const STORAGE_KEY = 'time-tracker-state';
let worlds = {};
let activeWorldId = null;

const monsterPresets = [
  {
    id: 'goblin',
    name: 'Goblin',
    type: 'npc',
    maxHp: 7,
    notes: 'AC 15, Nimble Escape'
  },
  {
    id: 'orc',
    name: 'Orc',
    type: 'npc',
    maxHp: 15,
    notes: 'AC 13, Aggressive'
  },
  {
    id: 'skeleton',
    name: 'Skeleton',
    type: 'npc',
    maxHp: 13,
    notes: 'AC 13, Vulnerable to bludgeoning'
  },
  {
    id: 'bandit',
    name: 'Bandit',
    type: 'npc',
    maxHp: 11,
    notes: 'AC 12, Scimitar +3 to hit'
  }
];

const pad = (value) => String(value).padStart(2, '0');

const createWorld = (name) => ({
  id: crypto.randomUUID(),
  name,
  totalSeconds: 0,
  combatants: [],
  currentCombatantIndex: 0,
  selectedCombatantId: null,
  calendarSettings: { ...calendarSettings },
  timeConfig: { ...timeConfig },
  roundNumber: 1,
  combatLogEntries: [],
  encounterDraft: []
});

const getCurrentWorld = () => worlds[activeWorldId];

const saveState = () => {
  if (!activeWorldId) {
    return;
  }
  worlds[activeWorldId] = {
    ...worlds[activeWorldId],
    totalSeconds,
    combatants,
    currentCombatantIndex,
    selectedCombatantId,
    calendarSettings,
    timeConfig,
    roundNumber,
    combatLogEntries,
    encounterDraft
  };
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ worlds, activeWorldId })
  );
};

const loadState = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return false;
  }
  try {
    const parsed = JSON.parse(stored);
    if (parsed && parsed.worlds && parsed.activeWorldId) {
      worlds = parsed.worlds;
      activeWorldId = parsed.activeWorldId;
      return true;
    }
  } catch (error) {
    console.error('Failed to parse stored data', error);
  }
  return false;
};

const normalizeCalendarSettings = (settings) => {
  const monthsInYear = Math.max(1, Math.floor(settings.monthsInYear || 12));
  const hoursPerDay = Math.max(1, Math.floor(settings.hoursPerDay || 24));
  const parsedDays = Array.isArray(settings.daysPerMonth)
    ? settings.daysPerMonth
    : [];
  const daysPerMonth = [];
  for (let i = 0; i < monthsInYear; i += 1) {
    const value = Number(parsedDays[i]);
    daysPerMonth.push(Number.isNaN(value) || value < 1 ? 30 : value);
  }
  const parsedMonthNames = Array.isArray(settings.monthNames)
    ? settings.monthNames
    : [];
  const monthNames = [];
  for (let i = 0; i < monthsInYear; i += 1) {
    const name = String(parsedMonthNames[i] || '').trim();
    monthNames.push(name || `Month ${i + 1}`);
  }
  const parsedDayNames = Array.isArray(settings.dayNames)
    ? settings.dayNames
    : [];
  const dayNames = parsedDayNames
    .map((value) => String(value).trim())
    .filter((value) => value.length > 0);
  return {
    monthsInYear,
    daysPerMonth,
    hoursPerDay,
    monthNames,
    dayNames
  };
};

const normalizeTimeConfig = (config) => ({
  turnSeconds: Math.max(1, Math.floor(config.turnSeconds || 6)),
  shortRestHours: Math.max(1, Math.floor(config.shortRestHours || 1)),
  longRestHours: Math.max(1, Math.floor(config.longRestHours || 8)),
  clockSpeed: Math.max(1, Math.floor(config.clockSpeed || 1))
});

const setActiveWorld = (worldId) => {
  const nextWorld = worlds[worldId];
  if (!nextWorld) {
    return;
  }
  stopAutoClock();
  activeWorldId = worldId;
  totalSeconds = nextWorld.totalSeconds ?? 0;
  combatants = Array.isArray(nextWorld.combatants) ? nextWorld.combatants : [];
  currentCombatantIndex = nextWorld.currentCombatantIndex ?? 0;
  selectedCombatantId = nextWorld.selectedCombatantId ?? null;
  calendarSettings = normalizeCalendarSettings(
    nextWorld.calendarSettings || calendarSettings
  );
  timeConfig = normalizeTimeConfig(nextWorld.timeConfig || timeConfig);
  roundNumber = nextWorld.roundNumber ?? 1;
  combatLogEntries = Array.isArray(nextWorld.combatLogEntries)
    ? nextWorld.combatLogEntries
    : [];
  encounterDraft = Array.isArray(nextWorld.encounterDraft)
    ? nextWorld.encounterDraft
    : [];
  monthsInYearInput.value = calendarSettings.monthsInYear;
  hoursPerDayInput.value = calendarSettings.hoursPerDay;
  daysPerMonthInput.value = calendarSettings.daysPerMonth.join(', ');
  monthNamesInput.value = calendarSettings.monthNames.join(', ');
  dayNamesInput.value = calendarSettings.dayNames.join(', ');
  syncInputs();
  syncTimeConfigInputs();
  render();
  renderInitiative();
  renderProfile();
  renderCombatLog();
  renderEncounterDraft();
  updateAdvanceLabels();
  updateRoundDisplay();
  saveState();
};

const renderWorldSelect = () => {
  worldSelect.innerHTML = '';
  Object.values(worlds).forEach((world) => {
    const option = document.createElement('option');
    option.value = world.id;
    option.textContent = world.name;
    if (world.id === activeWorldId) {
      option.selected = true;
    }
    worldSelect.appendChild(option);
  });
};

const getDaysInYear = (settings) =>
  settings.daysPerMonth.reduce((sum, days) => sum + days, 0);

const toTotalSeconds = (dateParts, settings) => {
  const daysInYear = getDaysInYear(settings);
  const year = Math.max(1, Math.floor(dateParts.year || 1));
  const month = Math.max(1, Math.floor(dateParts.month || 1));
  const safeMonth = Math.min(month, settings.monthsInYear);
  const daysInMonth = settings.daysPerMonth[safeMonth - 1] || 30;
  const day = Math.min(
    Math.max(1, Math.floor(dateParts.day || 1)),
    daysInMonth
  );
  const hour = Math.min(
    Math.max(0, Math.floor(dateParts.hour || 0)),
    settings.hoursPerDay - 1
  );
  const minute = Math.min(Math.max(0, Math.floor(dateParts.minute || 0)), 59);
  const second = Math.min(Math.max(0, Math.floor(dateParts.second || 0)), 59);

  const daysBeforeYear = (year - 1) * daysInYear;
  const daysBeforeMonth = settings.daysPerMonth
    .slice(0, safeMonth - 1)
    .reduce((sum, value) => sum + value, 0);
  const totalDays = daysBeforeYear + daysBeforeMonth + (day - 1);
  return (
    ((totalDays * settings.hoursPerDay + hour) * 60 + minute) * 60 + second
  );
};

const fromTotalSeconds = (seconds, settings) => {
  const totalSecondsSafe = Math.max(0, Math.floor(seconds));
  const secondsPerHour = 60 * 60;
  const secondsPerDay = settings.hoursPerDay * secondsPerHour;
  const daysInYear = getDaysInYear(settings);
  const secondsPerYear = daysInYear * secondsPerDay;

  let remainingSeconds = totalSecondsSafe;
  const year = Math.floor(remainingSeconds / secondsPerYear) + 1;
  remainingSeconds %= secondsPerYear;

  const dayOfYear = Math.floor(remainingSeconds / secondsPerDay);
  remainingSeconds %= secondsPerDay;

  let monthIndex = 0;
  let dayIndex = dayOfYear;
  while (monthIndex < settings.monthsInYear) {
    const daysInMonth = settings.daysPerMonth[monthIndex] || 30;
    if (dayIndex < daysInMonth) {
      break;
    }
    dayIndex -= daysInMonth;
    monthIndex += 1;
  }

  const hour = Math.floor(remainingSeconds / secondsPerHour);
  remainingSeconds %= secondsPerHour;
  const minute = Math.floor(remainingSeconds / 60);
  const second = remainingSeconds % 60;

  const dayOfWeekIndex =
    settings.dayNames.length > 0 ? dayOfYear % settings.dayNames.length : null;

  return {
    year,
    month: monthIndex + 1,
    day: dayIndex + 1,
    hour,
    minute,
    second,
    dayOfWeekIndex
  };
};

const formatDate = (dateParts, settings) => {
  const name =
    settings.monthNames[dateParts.month - 1] || `Month ${dateParts.month}`;
  const dayName =
    dateParts.dayOfWeekIndex !== null && settings.dayNames.length > 0
      ? settings.dayNames[dateParts.dayOfWeekIndex]
      : '';
  const dayPrefix = dayName ? `${dayName}, ` : '';
  return `${dayPrefix}${name} ${dateParts.day}, Year ${dateParts.year}`;
};

const formatTime = (dateParts) =>
  `${pad(dateParts.hour)}:${pad(dateParts.minute)}:${pad(dateParts.second)}`;

const syncInputs = () => {
  if (isEditingTimeInputs) {
    return;
  }
  const dateParts = fromTotalSeconds(totalSeconds, calendarSettings);
  yearInput.value = dateParts.year;
  monthInput.value = dateParts.month;
  dayInput.value = dateParts.day;
  hourInput.value = dateParts.hour;
  minuteInput.value = dateParts.minute;
  secondInput.value = dateParts.second;
};

const syncTimeConfigInputs = () => {
  turnSecondsInput.value = timeConfig.turnSeconds;
  shortRestHoursInput.value = timeConfig.shortRestHours;
  longRestHoursInput.value = timeConfig.longRestHours;
  clockSpeedInput.value = timeConfig.clockSpeed;
};

const updateAdvanceLabels = () => {
  nextTurnButton.textContent = `Next Turn (+${timeConfig.turnSeconds}s)`;
  shortRestButton.textContent = `Short Rest (+${timeConfig.shortRestHours}h)`;
  longRestButton.textContent = `Long Rest (+${timeConfig.longRestHours}h)`;
};

const updateRoundDisplay = () => {
  roundDisplay.textContent = `Round ${roundNumber}`;
};

const updateTimeEditingState = () => {
  isEditingTimeInputs = timeInputs.includes(document.activeElement);
};

const logEvent = (message) => {
  const entry = `${new Date().toLocaleTimeString()} • ${message}`;
  combatLogEntries = [entry, ...combatLogEntries].slice(0, 25);
  renderCombatLog();
  saveState();
};

const renderCombatLog = () => {
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

const difficultyLabels = ['Easy', 'Easy', 'Medium', 'Hard', 'Deadly'];

const updateDifficultyLabel = () => {
  const value = Number(encounterDifficulty.value);
  encounterDifficultyLabel.textContent =
    difficultyLabels[value - 1] || 'Medium';
};

const renderEncounterDraft = () => {
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
  encounterDraft = [];
  for (let i = 0; i < monsterCount; i += 1) {
    const preset =
      monsterPresets[Math.floor(Math.random() * monsterPresets.length)];
    const existing = encounterDraft.find((entry) => entry.id === preset.id);
    if (existing) {
      existing.count += 1;
    } else {
      encounterDraft.push({
        id: preset.id,
        name: preset.name,
        type: preset.type,
        maxHp: preset.maxHp,
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
  const newCombatants = [];
  encounterDraft.forEach((entry) => {
    for (let i = 0; i < entry.count; i += 1) {
      newCombatants.push({
        id: crypto.randomUUID(),
        name: entry.count > 1 ? `${entry.name} ${i + 1}` : entry.name,
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
  combatants = [...combatants, ...newCombatants];
  renderInitiative();
  renderProfile();
  logEvent('Quick encounter added to initiative.');
  saveState();
};

const clearEncounterDraft = () => {
  encounterDraft = [];
  renderEncounterDraft();
  saveState();
};

const sortCombatantsByInitiative = () => {
  combatants = [...combatants].sort((a, b) => {
    const aInit = Number.isFinite(a.initiative) ? a.initiative : -1;
    const bInit = Number.isFinite(b.initiative) ? b.initiative : -1;
    return bInit - aInit;
  });
  currentCombatantIndex = 0;
  selectedCombatantId = combatants[0]?.id ?? null;
  renderInitiative();
  renderProfile();
  saveState();
};

const rollInitiative = (filter) => {
  combatants = combatants.map((combatant) => {
    if (filter && !filter(combatant)) {
      return combatant;
    }
    return { ...combatant, initiative: Math.ceil(Math.random() * 20) };
  });
  sortCombatantsByInitiative();
  logEvent('Initiative rolled.');
};

const clearEncounter = () => {
  combatants = [];
  currentCombatantIndex = 0;
  selectedCombatantId = null;
  roundNumber = 1;
  combatLogEntries = [];
  encounterDraft = [];
  updateRoundDisplay();
  renderInitiative();
  renderProfile();
  renderCombatLog();
  renderEncounterDraft();
  logEvent('Encounter cleared.');
  saveState();
};

const removeSelectedCombatant = () => {
  if (!selectedCombatantId) {
    return;
  }
  const index = combatants.findIndex(
    (combatant) => combatant.id === selectedCombatantId
  );
  if (index === -1) {
    return;
  }
  const removed = combatants[index];
  combatants = combatants.filter((combatant) => combatant.id !== selectedCombatantId);
  if (currentCombatantIndex >= combatants.length) {
    currentCombatantIndex = 0;
  }
  selectedCombatantId = combatants[currentCombatantIndex]?.id ?? null;
  renderInitiative();
  renderProfile();
  logEvent(`Removed ${removed.name}.`);
  saveState();
};

const startAutoClock = () => {
  if (autoClockTimer) {
    return;
  }
  toggleClockButton.textContent = 'Pause Clock';
  autoClockTimer = window.setInterval(() => {
    adjustTime(1000 * timeConfig.clockSpeed);
  }, 1000);
};

const stopAutoClock = () => {
  if (!autoClockTimer) {
    return;
  }
  window.clearInterval(autoClockTimer);
  autoClockTimer = null;
  toggleClockButton.textContent = 'Start Clock';
};

const render = () => {
  const dateParts = fromTotalSeconds(totalSeconds, calendarSettings);
  dateDisplay.textContent = formatDate(dateParts, calendarSettings);
  timeDisplay.textContent = formatTime(dateParts);
};

const updateTimeFromInputs = () => {
  totalSeconds = toTotalSeconds(
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
  saveState();
};

const adjustTime = (milliseconds) => {
  totalSeconds += Math.floor(milliseconds / 1000);
  render();
  syncInputs();
  saveState();
};

const getInitials = (name) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || '?';

const renderInitiative = () => {
  initiativeTrack.innerHTML = '';

  if (combatants.length === 0) {
    const emptyState = document.createElement('div');
    emptyState.className = 'helper-text';
    emptyState.textContent = 'No combatants yet. Add players or NPCs to begin.';
    initiativeTrack.appendChild(emptyState);
    return;
  }

  combatants.forEach((combatant, index) => {
    const container = document.createElement('div');
    container.className = `combatant ${combatant.type}${
      index === currentCombatantIndex ? ' current' : ''
    }`;
    container.setAttribute('role', 'button');
    container.setAttribute('tabindex', '0');
    container.setAttribute('draggable', 'true');
    container.dataset.combatantId = combatant.id;
    container.setAttribute(
      'aria-label',
      `${combatant.name} (${combatant.type})`
    );

    const avatar = document.createElement('div');
    avatar.className = 'combatant-avatar';
    if (combatant.avatar) {
      avatar.classList.add('has-image');
      avatar.style.backgroundImage = `url(${combatant.avatar})`;
      avatar.textContent = '';
    } else {
      avatar.classList.remove('has-image');
      avatar.style.backgroundImage = '';
      avatar.textContent = getInitials(combatant.name);
    }

    const name = document.createElement('div');
    name.className = 'combatant-name';
    name.textContent = combatant.name;

    const initiative = document.createElement('div');
    initiative.className = 'combatant-initiative';
    initiative.textContent =
      Number.isFinite(combatant.initiative) ? `Init ${combatant.initiative}` : 'Init —';

    container.append(avatar, name, initiative);
    container.addEventListener('click', () => {
      currentCombatantIndex = index;
      selectedCombatantId = combatant.id;
      renderInitiative();
      renderProfile();
      openProfileModal();
    });
    container.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        currentCombatantIndex = index;
        selectedCombatantId = combatant.id;
        renderInitiative();
        renderProfile();
        openProfileModal();
      }
    });
    container.addEventListener('dragstart', () => {
      draggedCombatantId = combatant.id;
      container.classList.add('dragging');
    });
    container.addEventListener('dragend', () => {
      draggedCombatantId = null;
      container.classList.remove('dragging');
      initiativeTrack
        .querySelectorAll('.combatant.drag-over')
        .forEach((element) => element.classList.remove('drag-over'));
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
      if (!draggedCombatantId || draggedCombatantId === combatant.id) {
        return;
      }
      const fromIndex = combatants.findIndex(
        (item) => item.id === draggedCombatantId
      );
      const toIndex = combatants.findIndex(
        (item) => item.id === combatant.id
      );
      if (fromIndex === -1 || toIndex === -1) {
        return;
      }
      const [moved] = combatants.splice(fromIndex, 1);
      combatants.splice(toIndex, 0, moved);
      if (currentCombatantIndex === fromIndex) {
        currentCombatantIndex = toIndex;
      } else if (
        currentCombatantIndex >= Math.min(fromIndex, toIndex) &&
        currentCombatantIndex <= Math.max(fromIndex, toIndex)
      ) {
        if (fromIndex < toIndex) {
          currentCombatantIndex -= 1;
        } else {
          currentCombatantIndex += 1;
        }
      }
      renderInitiative();
      renderProfile();
    });
    initiativeTrack.appendChild(container);
  });
};

const renderProfile = () => {
  const selected = combatants.find(
    (combatant) => combatant.id === selectedCombatantId
  );
  if (!selected) {
    emptyProfile.hidden = false;
    profileDetails.hidden = true;
    return;
  }

  emptyProfile.hidden = true;
  profileDetails.hidden = false;
  profileName.value = selected.name;
  profileType.value = selected.type;
  profileCurrentHp.value = selected.currentHp ?? '';
  profileMaxHp.value = selected.maxHp ?? '';
  profileInitiative.value = selected.initiative ?? '';
  profileConditions.value = selected.conditions ?? '';
  profileNotes.value = selected.notes ?? '';
  profileAvatar.value = '';
};

const openSettingsPage = () => {
  appPage.hidden = true;
  settingsPage.hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const closeSettingsPage = () => {
  settingsPage.hidden = true;
  appPage.hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const openProfileModal = () => {
  profileModal.classList.add('is-open');
  profileModal.setAttribute('aria-hidden', 'false');
};

const closeProfileModal = () => {
  profileModal.classList.remove('is-open');
  profileModal.setAttribute('aria-hidden', 'true');
};

const updateSelectedCombatant = (updates) => {
  if (!selectedCombatantId) {
    return;
  }
  combatants = combatants.map((combatant) =>
    combatant.id === selectedCombatantId
      ? { ...combatant, ...updates }
      : combatant
  );
  renderInitiative();
  renderProfile();
  saveState();
};

const addCombatant = () => {
  const name = combatantNameInput.value.trim();
  if (!name) {
    combatantNameInput.focus();
    return;
  }

  const preset = monsterPresets.find(
    (entry) => entry.id === combatantPresetSelect.value
  );
  const maxHpValue = Number(combatantMaxHpInput.value);
  const maxHp = Number.isNaN(maxHpValue)
    ? preset?.maxHp ?? null
    : maxHpValue;
  const initiativeValue = Number(combatantInitiativeInput.value);
  const initiative = Number.isNaN(initiativeValue) ? null : initiativeValue;
  const newCombatant = {
    id: crypto.randomUUID(),
    name,
    type: combatantTypeSelect.value || preset?.type || 'npc',
    maxHp,
    currentHp: maxHp,
    initiative,
    conditions: '',
    notes: preset?.notes ?? '',
    avatar: null
  };
  combatants = [...combatants, newCombatant];
  if (combatants.length === 1) {
    currentCombatantIndex = 0;
    selectedCombatantId = newCombatant.id;
  }
  combatantNameInput.value = '';
  combatantMaxHpInput.value = '';
  combatantInitiativeInput.value = '';
  combatantPresetSelect.value = '';
  combatantNameInput.focus();
  renderInitiative();
  renderProfile();
  saveState();
};

const advanceCombatant = () => {
  if (combatants.length === 0) {
    return;
  }
  currentCombatantIndex =
    (currentCombatantIndex + 1) % combatants.length;
  if (currentCombatantIndex === 0) {
    roundNumber += 1;
    updateRoundDisplay();
    logEvent(`Round ${roundNumber} begins.`);
  }
  renderInitiative();
  if (!selectedCombatantId) {
    selectedCombatantId = combatants[currentCombatantIndex]?.id ?? null;
    renderProfile();
  }
  saveState();
};

setTimeButton.addEventListener('click', updateTimeFromInputs);
timeInputs.forEach((input) => {
  input.addEventListener('focus', updateTimeEditingState);
  input.addEventListener('blur', () => {
    window.setTimeout(updateTimeEditingState, 0);
  });
});
nextTurnButton.addEventListener('click', () => {
  adjustTime(timeConfig.turnSeconds * 1000);
  advanceCombatant();
  logEvent('Next turn.');
});
shortRestButton.addEventListener('click', () => {
  adjustTime(timeConfig.shortRestHours * 60 * 60 * 1000);
  logEvent('Short rest taken.');
});
longRestButton.addEventListener('click', () => {
  adjustTime(timeConfig.longRestHours * 60 * 60 * 1000);
  logEvent('Long rest taken.');
});
toggleClockButton.addEventListener('click', () => {
  if (autoClockTimer) {
    stopAutoClock();
  } else {
    startAutoClock();
  }
});
addCombatantButton.addEventListener('click', addCombatant);
combatantNameInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addCombatant();
  }
});
combatantPresetSelect.addEventListener('change', () => {
  const preset = monsterPresets.find(
    (entry) => entry.id === combatantPresetSelect.value
  );
  if (!preset) {
    return;
  }
  combatantNameInput.value = preset.name;
  combatantTypeSelect.value = preset.type;
  combatantMaxHpInput.value = preset.maxHp ?? '';
});
rollAllButton.addEventListener('click', () => rollInitiative());
rollNpcsButton.addEventListener('click', () =>
  rollInitiative((combatant) => combatant.type === 'npc')
);
sortInitiativeButton.addEventListener('click', sortCombatantsByInitiative);
clearCombatButton.addEventListener('click', clearEncounter);
profileName.addEventListener('input', () => {
  updateSelectedCombatant({ name: profileName.value.trim() || 'Unnamed' });
});
profileType.addEventListener('change', () => {
  updateSelectedCombatant({ type: profileType.value });
});
profileCurrentHp.addEventListener('input', () => {
  const value = profileCurrentHp.value.trim();
  const parsed = Number(value);
  updateSelectedCombatant({
    currentHp: value === '' || Number.isNaN(parsed) ? null : parsed
  });
});
profileMaxHp.addEventListener('input', () => {
  const value = profileMaxHp.value.trim();
  const parsed = Number(value);
  updateSelectedCombatant({
    maxHp: value === '' || Number.isNaN(parsed) ? null : parsed
  });
});
profileInitiative.addEventListener('input', () => {
  const value = profileInitiative.value.trim();
  const parsed = Number(value);
  updateSelectedCombatant({
    initiative: value === '' || Number.isNaN(parsed) ? null : parsed
  });
});
profileConditions.addEventListener('input', () => {
  updateSelectedCombatant({ conditions: profileConditions.value });
});
profileNotes.addEventListener('input', () => {
  updateSelectedCombatant({ notes: profileNotes.value });
});
profileAvatar.addEventListener('change', () => {
  const file = profileAvatar.files?.[0];
  if (!file) {
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    updateSelectedCombatant({ avatar: reader.result });
  };
  reader.readAsDataURL(file);
});
profileCard.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-hp-change]');
  if (!button) {
    return;
  }
  const delta = Number(button.dataset.hpChange);
  const selected = combatants.find(
    (combatant) => combatant.id === selectedCombatantId
  );
  if (!selected) {
    return;
  }
  const nextValue = Math.max(0, (selected.currentHp ?? 0) + delta);
  updateSelectedCombatant({ currentHp: nextValue });
});
removeCombatantButton.addEventListener('click', removeSelectedCombatant);
closeProfileButton.addEventListener('click', closeProfileModal);
profileBackdrop.addEventListener('click', closeProfileModal);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeProfileModal();
    closeSettingsPage();
  }
});
worldSelect.addEventListener('change', () => {
  stopAutoClock();
  setActiveWorld(worldSelect.value);
});
createWorldButton.addEventListener('click', () => {
  const name = window.prompt('Name the new world');
  if (!name) {
    return;
  }
  const world = createWorld(name.trim());
  worlds[world.id] = world;
  activeWorldId = world.id;
  renderWorldSelect();
  setActiveWorld(world.id);
});
deleteWorldButton.addEventListener('click', () => {
  if (Object.keys(worlds).length <= 1) {
    window.alert('Create another world before deleting this one.');
    return;
  }
  const current = getCurrentWorld();
  if (!current) {
    return;
  }
  const confirmed = window.confirm(`Delete world "${current.name}"?`);
  if (!confirmed) {
    return;
  }
  delete worlds[current.id];
  activeWorldId = Object.keys(worlds)[0] || null;
  renderWorldSelect();
  if (activeWorldId) {
    setActiveWorld(activeWorldId);
  }
});
openSettingsButton.addEventListener('click', openSettingsPage);
closeSettingsButton.addEventListener('click', closeSettingsPage);
applySettingsButton.addEventListener('click', () => {
  const monthsInYear = Number(monthsInYearInput.value);
  const hoursPerDay = Number(hoursPerDayInput.value);
  const daysPerMonth = daysPerMonthInput.value
    .split(',')
    .map((value) => Number(value.trim()))
    .filter((value) => !Number.isNaN(value));
  const monthNames = monthNamesInput.value
    .split(',')
    .map((value) => value.trim())
    .filter((value) => value.length > 0);
  const dayNames = dayNamesInput.value
    .split(',')
    .map((value) => value.trim())
    .filter((value) => value.length > 0);
  calendarSettings = normalizeCalendarSettings({
    monthsInYear,
    hoursPerDay,
    daysPerMonth,
    monthNames,
    dayNames
  });
  syncInputs();
  render();
  closeSettingsPage();
  saveState();
});
turnSecondsInput.addEventListener('input', () => {
  timeConfig = normalizeTimeConfig({
    ...timeConfig,
    turnSeconds: Number(turnSecondsInput.value)
  });
  syncTimeConfigInputs();
  updateAdvanceLabels();
  saveState();
});
shortRestHoursInput.addEventListener('input', () => {
  timeConfig = normalizeTimeConfig({
    ...timeConfig,
    shortRestHours: Number(shortRestHoursInput.value)
  });
  syncTimeConfigInputs();
  updateAdvanceLabels();
  saveState();
});
longRestHoursInput.addEventListener('input', () => {
  timeConfig = normalizeTimeConfig({
    ...timeConfig,
    longRestHours: Number(longRestHoursInput.value)
  });
  syncTimeConfigInputs();
  updateAdvanceLabels();
  saveState();
});
clockSpeedInput.addEventListener('input', () => {
  timeConfig = normalizeTimeConfig({
    ...timeConfig,
    clockSpeed: Number(clockSpeedInput.value)
  });
  syncTimeConfigInputs();
  saveState();
});
encounterDifficulty.addEventListener('input', updateDifficultyLabel);
generateEncounterButton.addEventListener('click', generateEncounterDraft);
addEncounterButton.addEventListener('click', addEncounterToInitiative);
clearEncounterDraftButton.addEventListener('click', clearEncounterDraft);
exportWorldButton.addEventListener('click', () => {
  const world = getCurrentWorld();
  if (!world) {
    return;
  }
  const payload = {
    ...world,
    totalSeconds,
    combatants,
    currentCombatantIndex,
    selectedCombatantId,
    calendarSettings,
    timeConfig,
      roundNumber,
      combatLogEntries,
      encounterDraft
    };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: 'application/json'
  });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${world.name.replace(/\s+/g, '-')}-world.json`;
  link.click();
  URL.revokeObjectURL(link.href);
});
importWorldInput.addEventListener('change', () => {
  const file = importWorldInput.files?.[0];
  if (!file) {
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      if (!parsed || typeof parsed !== 'object') {
        throw new Error('Invalid world data');
      }
      const world = {
        ...parsed,
        id: crypto.randomUUID(),
        name: parsed.name ? `${parsed.name} (Imported)` : 'Imported World',
        totalSeconds: parsed.totalSeconds ?? 0,
        currentCombatantIndex: parsed.currentCombatantIndex ?? 0,
        selectedCombatantId: parsed.selectedCombatantId ?? null,
        roundNumber: parsed.roundNumber ?? 1,
        calendarSettings: normalizeCalendarSettings(parsed.calendarSettings || calendarSettings),
        timeConfig: normalizeTimeConfig(parsed.timeConfig || timeConfig),
        combatants: Array.isArray(parsed.combatants) ? parsed.combatants : [],
        combatLogEntries: Array.isArray(parsed.combatLogEntries)
          ? parsed.combatLogEntries
          : [],
        encounterDraft: Array.isArray(parsed.encounterDraft)
          ? parsed.encounterDraft
          : []
      };
      worlds[world.id] = world;
      activeWorldId = world.id;
      renderWorldSelect();
      setActiveWorld(world.id);
    } catch (error) {
      window.alert('Invalid world file.');
    }
  };
  reader.readAsText(file);
  importWorldInput.value = '';
});

monsterPresets.forEach((preset) => {
  const option = document.createElement('option');
  option.value = preset.id;
  option.textContent = preset.name;
  combatantPresetSelect.appendChild(option);
});

const initializeDefaults = () => {
  const loaded = loadState();
  if (!loaded) {
    const defaultWorld = createWorld('Default World');
    worlds[defaultWorld.id] = defaultWorld;
    activeWorldId = defaultWorld.id;
    const now = new Date();
    totalSeconds = toTotalSeconds(
      {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate(),
        hour: now.getHours(),
        minute: now.getMinutes(),
        second: now.getSeconds()
      },
      calendarSettings
    );
    saveState();
  }

  renderWorldSelect();
  if (activeWorldId) {
    setActiveWorld(activeWorldId);
  }

  monthsInYearInput.value = calendarSettings.monthsInYear;
  hoursPerDayInput.value = calendarSettings.hoursPerDay;
  daysPerMonthInput.value = calendarSettings.daysPerMonth.join(', ');
  monthNamesInput.value = calendarSettings.monthNames.join(', ');
  dayNamesInput.value = calendarSettings.dayNames.join(', ');
  syncInputs();
  syncTimeConfigInputs();
  updateAdvanceLabels();
  updateRoundDisplay();
  renderCombatLog();
  updateDifficultyLabel();
  renderEncounterDraft();
};

initializeDefaults();
renderInitiative();
renderProfile();
