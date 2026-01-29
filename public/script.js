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
const openSettingsButton = document.getElementById('openSettingsButton');
const settingsModal = document.getElementById('settingsModal');
const settingsBackdrop = document.getElementById('settingsBackdrop');
const closeSettingsButton = document.getElementById('closeSettingsButton');
const monthsInYearInput = document.getElementById('monthsInYearInput');
const hoursPerDayInput = document.getElementById('hoursPerDayInput');
const daysPerMonthInput = document.getElementById('daysPerMonthInput');
const monthNamesInput = document.getElementById('monthNamesInput');
const dayNamesInput = document.getElementById('dayNamesInput');
const applySettingsButton = document.getElementById('applySettingsButton');
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
const profileAvatar = document.getElementById('profileAvatar');
const profileNotes = document.getElementById('profileNotes');

let totalSeconds = 0;
let tickingInterval = null;
let combatants = [];
let currentCombatantIndex = 0;
let draggedCombatantId = null;
let selectedCombatantId = null;

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
  const dateParts = fromTotalSeconds(totalSeconds, calendarSettings);
  yearInput.value = dateParts.year;
  monthInput.value = dateParts.month;
  dayInput.value = dateParts.day;
  hourInput.value = dateParts.hour;
  minuteInput.value = dateParts.minute;
  secondInput.value = dateParts.second;
};

const render = () => {
  const dateParts = fromTotalSeconds(totalSeconds, calendarSettings);
  dateDisplay.textContent = formatDate(dateParts, calendarSettings);
  timeDisplay.textContent = formatTime(dateParts);
};

const tick = () => {
  totalSeconds += 1;
  render();
};

const startClock = () => {
  if (tickingInterval) {
    clearInterval(tickingInterval);
  }
  tickingInterval = setInterval(tick, 1000);
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
  startClock();
};

const adjustTime = (milliseconds) => {
  totalSeconds += Math.floor(milliseconds / 1000);
  render();
  syncInputs();
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

    container.append(avatar, name);
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
  profileNotes.value = selected.notes ?? '';
  profileAvatar.value = '';
};

const openSettingsModal = () => {
  settingsModal.classList.add('is-open');
  settingsModal.setAttribute('aria-hidden', 'false');
};

const closeSettingsModal = () => {
  settingsModal.classList.remove('is-open');
  settingsModal.setAttribute('aria-hidden', 'true');
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
  const newCombatant = {
    id: crypto.randomUUID(),
    name,
    type: combatantTypeSelect.value || preset?.type || 'npc',
    maxHp,
    currentHp: maxHp,
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
  combatantPresetSelect.value = '';
  combatantNameInput.focus();
  renderInitiative();
  renderProfile();
};

const advanceCombatant = () => {
  if (combatants.length === 0) {
    return;
  }
  currentCombatantIndex =
    (currentCombatantIndex + 1) % combatants.length;
  renderInitiative();
  if (!selectedCombatantId) {
    selectedCombatantId = combatants[currentCombatantIndex]?.id ?? null;
    renderProfile();
  }
};

setTimeButton.addEventListener('click', updateTimeFromInputs);
nextTurnButton.addEventListener('click', () => {
  adjustTime(6000);
  advanceCombatant();
});
shortRestButton.addEventListener('click', () => adjustTime(60 * 60 * 1000));
longRestButton.addEventListener('click', () => adjustTime(8 * 60 * 60 * 1000));
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
closeProfileButton.addEventListener('click', closeProfileModal);
profileBackdrop.addEventListener('click', closeProfileModal);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeProfileModal();
    closeSettingsModal();
  }
});
openSettingsButton.addEventListener('click', openSettingsModal);
closeSettingsButton.addEventListener('click', closeSettingsModal);
settingsBackdrop.addEventListener('click', closeSettingsModal);
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
  closeSettingsModal();
});

monsterPresets.forEach((preset) => {
  const option = document.createElement('option');
  option.value = preset.id;
  option.textContent = preset.name;
  combatantPresetSelect.appendChild(option);
});

const initializeDefaults = () => {
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
  monthsInYearInput.value = calendarSettings.monthsInYear;
  hoursPerDayInput.value = calendarSettings.hoursPerDay;
  daysPerMonthInput.value = calendarSettings.daysPerMonth.join(', ');
  monthNamesInput.value = calendarSettings.monthNames.join(', ');
  dayNamesInput.value = calendarSettings.dayNames.join(', ');
  syncInputs();
  render();
};

initializeDefaults();
startClock();
renderInitiative();
renderProfile();
