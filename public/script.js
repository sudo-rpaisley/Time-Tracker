const dateDisplay = document.getElementById('dateDisplay');
const timeDisplay = document.getElementById('timeDisplay');
const dateInput = document.getElementById('dateInput');
const timeInput = document.getElementById('timeInput');
const setTimeButton = document.getElementById('setTimeButton');
const nextTurnButton = document.getElementById('nextTurnButton');
const shortRestButton = document.getElementById('shortRestButton');
const longRestButton = document.getElementById('longRestButton');
const combatantNameInput = document.getElementById('combatantName');
const combatantTypeSelect = document.getElementById('combatantType');
const addCombatantButton = document.getElementById('addCombatantButton');
const initiativeTrack = document.getElementById('initiativeTrack');

let currentTime = new Date();
let tickingInterval = null;
let combatants = [];
let currentCombatantIndex = 0;
let draggedCombatantId = null;

const pad = (value) => String(value).padStart(2, '0');

const formatDate = (date) =>
  date.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

const formatTime = (date) =>
  date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

const syncInputs = () => {
  dateInput.value = `${currentTime.getFullYear()}-${pad(
    currentTime.getMonth() + 1
  )}-${pad(currentTime.getDate())}`;
  timeInput.value = `${pad(currentTime.getHours())}:${pad(
    currentTime.getMinutes()
  )}:${pad(currentTime.getSeconds())}`;
};

const render = () => {
  dateDisplay.textContent = formatDate(currentTime);
  timeDisplay.textContent = formatTime(currentTime);
};

const tick = () => {
  currentTime = new Date(currentTime.getTime() + 1000);
  render();
};

const startClock = () => {
  if (tickingInterval) {
    clearInterval(tickingInterval);
  }
  tickingInterval = setInterval(tick, 1000);
};

const updateTimeFromInputs = () => {
  if (!dateInput.value || !timeInput.value) {
    return;
  }
  const [year, month, day] = dateInput.value.split('-').map(Number);
  const [hours, minutes, seconds = 0] = timeInput.value.split(':').map(Number);
  currentTime = new Date(year, month - 1, day, hours, minutes, seconds);
  render();
  startClock();
};

const adjustTime = (milliseconds) => {
  currentTime = new Date(currentTime.getTime() + milliseconds);
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
    avatar.textContent = getInitials(combatant.name);

    const name = document.createElement('div');
    name.className = 'combatant-name';
    name.textContent = combatant.name;

    container.append(avatar, name);
    container.addEventListener('click', () => {
      currentCombatantIndex = index;
      renderInitiative();
    });
    container.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        currentCombatantIndex = index;
        renderInitiative();
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
    });
    initiativeTrack.appendChild(container);
  });
};

const addCombatant = () => {
  const name = combatantNameInput.value.trim();
  if (!name) {
    combatantNameInput.focus();
    return;
  }

  combatants = [
    ...combatants,
    {
      id: crypto.randomUUID(),
      name,
      type: combatantTypeSelect.value
    }
  ];
  if (combatants.length === 1) {
    currentCombatantIndex = 0;
  }
  combatantNameInput.value = '';
  combatantNameInput.focus();
  renderInitiative();
};

const advanceCombatant = () => {
  if (combatants.length === 0) {
    return;
  }
  currentCombatantIndex =
    (currentCombatantIndex + 1) % combatants.length;
  renderInitiative();
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

syncInputs();
render();
startClock();
renderInitiative();
