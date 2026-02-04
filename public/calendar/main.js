// Calendar Page Bootstrap
import '../script.js';
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
  safeInit(CalendarRendering.initCalendarRendering);
  safeInit(Events.initEventListeners);
  safeInit(Api.initApi);
  safeInit(Utilities.initUtilities);
  
  // Initialize state from localStorage - MUST AWAIT
  if (typeof initializeDefaults === 'function') {
    await initializeDefaults();
  }
  
  // Render calendar views
  safeInit(() => {
    if (typeof renderCalendar === 'function') {
      renderCalendar();
    }
    if (typeof renderCalendarEventsList === 'function') {
      renderCalendarEventsList();
    }
  });
  
  window.App = window.App || {};
  window.App.Calendar = Calendar;
  window.App.CalendarRendering = CalendarRendering;
  window.App.ready = true;
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    bootstrap().catch(err => console.error('[calendar/main.js] Bootstrap error:', err));
  });
} else {
  bootstrap().catch(err => console.error('[calendar/main.js] Bootstrap error:', err));
}
