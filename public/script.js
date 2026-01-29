const dateDisplay = document.getElementById('dateDisplay');
const timeDisplay = document.getElementById('timeDisplay');
const dateInput = document.getElementById('dateInput');
const timeInput = document.getElementById('timeInput');
const setTimeButton = document.getElementById('setTimeButton');
const nextTurnButton = document.getElementById('nextTurnButton');
const shortRestButton = document.getElementById('shortRestButton');
const longRestButton = document.getElementById('longRestButton');

let currentTime = new Date();
let tickingInterval = null;

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

setTimeButton.addEventListener('click', updateTimeFromInputs);
nextTurnButton.addEventListener('click', () => adjustTime(6000));
shortRestButton.addEventListener('click', () => adjustTime(60 * 60 * 1000));
longRestButton.addEventListener('click', () => adjustTime(8 * 60 * 60 * 1000));

syncInputs();
render();
startClock();
