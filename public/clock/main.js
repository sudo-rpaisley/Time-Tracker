// Clock Page Bootstrap
// Loads modules needed for the clock page, plus script.js for state initialization
import '../script.js';
import * as Clock from '../modules/clock.js';
import * as Calendar from '../modules/calendar.js';
import * as CalendarRendering from '../modules/calendar-rendering.js';
import * as Events from '../modules/events.js';
import * as Api from '../modules/api.js';
import * as Utilities from '../modules/utilities.js';

const safeInit = (fn) => {
  try {
    if (typeof fn === 'function') fn();
  } catch (err) {
    console.warn('Module init failed', err);
  }
};

const bootstrap = async () => {
  // Initialize clock-specific modules
  safeInit(Clock.initClock);
  safeInit(CalendarRendering.initCalendarRendering);
  safeInit(Events.initEventListeners);
  safeInit(Api.initApi);
  safeInit(Utilities.initUtilities);
  
  // Initialize state from localStorage - MUST AWAIT
  if (typeof initializeDefaults === 'function') {
    await initializeDefaults();
  }
  
  // Render clock display
  safeInit(() => {
    if (typeof renderRoundHistory === 'function') {
      renderRoundHistory();
    }
  });
  
  // Expose to window for any remaining legacy code
  window.App = window.App || {};
  window.App.Clock = Clock;
  window.App.Calendar = Calendar;
  window.App.CalendarRendering = CalendarRendering;
  window.App.Events = Events;
  window.App.ready = true;
};

// Run bootstrap when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    bootstrap().catch(err => console.error('[clock/main.js] Bootstrap error:', err));
  });
} else {
  bootstrap().catch(err => console.error('[clock/main.js] Bootstrap error:', err));
}

export { bootstrap };
