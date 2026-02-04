/**
 * Calendar & Timeline Rendering Module
 * Handles calendar display, event tracking, timeline view, and statistics
 */

import * as Api from './api.js';
import * as Calendar from './calendar.js';

export const initCalendarRendering = () => {
  // Module initialization if needed
};

export const renderCalendar = () => {
  const calendarGrid = document.getElementById('calendarGrid');
  const calendarMonthLabel = document.getElementById('calendarMonthLabel');
  const eventTypeInput = document.getElementById('eventTypeInput');
  const eventActorInput = document.getElementById('eventActorInput');
  const calendarFilterSelect = document.getElementById('calendarFilterSelect');
  const calendarActorFilterSelect = document.getElementById('calendarActorFilterSelect');

  if (!calendarGrid) {
    return;
  }

  if (!window.calendarView) {
    window.__legacySetCalendarViewToCurrent?.();
  }

  ensureEventTypeOptions(eventTypeInput, false);
  ensureActorOptions(eventActorInput, false);
  ensureEventTypeOptions(calendarFilterSelect, true);
  ensureActorOptions(calendarActorFilterSelect, true);

  const { month, year } = window.calendarView;
  const calendarSettings = window.calendarSettings || {};
  const monthName = calendarSettings.monthNames?.[month - 1] || `Month ${month}`;

  if (calendarMonthLabel) {
    calendarMonthLabel.textContent = `${monthName} • Year ${year}`;
  }

  calendarGrid.innerHTML = '';
  const columnCount = calendarSettings.dayNames?.length || 7;
  calendarGrid.style.setProperty('--calendar-columns', columnCount);

  if (calendarSettings.dayNames?.length > 0) {
    calendarSettings.dayNames.forEach((dayName) => {
      const header = document.createElement('div');
      header.className = 'calendar-cell calendar-header';
      header.textContent = dayName;
      calendarGrid.appendChild(header);
    });
  }

  const daysInMonth = Calendar.getDaysInMonth(month, calendarSettings);
  const dayOfWeekIndex =
    calendarSettings.dayNames?.length > 0
      ? Calendar.getDayOfYearIndex(month, 1, calendarSettings) %
        calendarSettings.dayNames.length
      : 0;

  for (let i = 0; i < dayOfWeekIndex; i += 1) {
    const spacer = document.createElement('div');
    spacer.className = 'calendar-cell calendar-empty';
    calendarGrid.appendChild(spacer);
  }

  const today = window.__legacyFromTotalSeconds?.(window.totalSeconds, calendarSettings);
  const calendarEvents = window.calendarEvents || [];

  for (let day = 1; day <= daysInMonth; day += 1) {
    const dayCell = document.createElement('button');
    dayCell.type = 'button';
    dayCell.className = 'calendar-cell calendar-day';

    if (
      today?.year === year &&
      today?.month === month &&
      today?.day === day
    ) {
      dayCell.classList.add('is-today');
    }

    const dayLabel = document.createElement('span');
    dayLabel.className = 'calendar-day-number';
    dayLabel.textContent = day;

    const matchingEvents = calendarEvents.filter(
      (event) => event.year === year && event.month === month && event.day === day
    );

    if (matchingEvents.length > 0) {
      const badge = document.createElement('span');
      badge.className = 'calendar-event-count';
      badge.textContent = `${matchingEvents.length} event${
        matchingEvents.length === 1 ? '' : 's'
      }`;
      dayCell.append(dayLabel, badge);
    } else {
      dayCell.appendChild(dayLabel);
    }

    dayCell.addEventListener('click', () => {
      const eventDayInput = document.getElementById('eventDayInput');
      const eventMonthInput = document.getElementById('eventMonthInput');
      const eventYearInput = document.getElementById('eventYearInput');

      if (eventDayInput) {eventDayInput.value = day;}
      if (eventMonthInput) {eventMonthInput.value = month;}
      if (eventYearInput) {eventYearInput.value = year;}
    });

    calendarGrid.appendChild(dayCell);
  }

  renderCalendarEventsList();
  syncCalendarEventInputs();
};

export const renderCalendarEventsList = () => {
  const calendarEventList = document.getElementById('calendarEventList');
  const calendarFilterSelect = document.getElementById('calendarFilterSelect');
  const calendarActorFilterSelect = document.getElementById('calendarActorFilterSelect');

  if (!calendarEventList || !window.calendarView) {
    return;
  }

  calendarEventList.innerHTML = '';
  const activeFilter = getEventFilterValue(calendarFilterSelect);
  const activeActor = getEventFilterValue(calendarActorFilterSelect);
  const { month, year } = window.calendarView;
  const calendarEvents = window.calendarEvents || [];
  const calendarSettings = window.calendarSettings || {};

  const events = calendarEvents
    .filter((event) => event.month === month && event.year === year)
    .filter((event) => !activeFilter || event.type === activeFilter)
    .filter((event) => !activeActor || event.actorType === activeActor)
    .sort((a, b) => a.day - b.day);

  if (events.length === 0) {
    const item = document.createElement('li');
    item.textContent = 'No events scheduled for this month.';
    item.className = 'helper-text';
    calendarEventList.appendChild(item);
    return;
  }

  events.forEach((event) => {
    const item = document.createElement('li');
    item.className = 'event-item';

    const content = document.createElement('div');
    content.className = 'event-details';

    const title = document.createElement('div');
    title.className = 'event-title';
    title.textContent = `${event.title} (Day ${event.day})`;

    const description = document.createElement('div');
    description.className = 'event-description';
    description.textContent = event.description || 'No description provided.';

    const meta = document.createElement('div');
    meta.className = 'timeline-meta';

    const dateText = document.createElement('span');
    dateText.textContent = Calendar.formatDate(
      { year: event.year, month: event.month, day: event.day, dayOfWeekIndex: null },
      calendarSettings
    );

    const tag = document.createElement('span');
    tag.className = 'timeline-tag';
    tag.textContent = getEventTypeLabel(event.type || 'general');

    const actorTag = document.createElement('span');
    actorTag.className = 'timeline-tag';
    actorTag.textContent = getEventActorLabel(event.actorType || 'player');

    meta.append(dateText, tag, actorTag);
    content.append(title, description, meta);

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'ghost';
    remove.textContent = 'Remove';
    remove.addEventListener('click', () => {
      window.calendarEvents = (window.calendarEvents || []).filter((entry) => entry.id !== event.id);
      renderCalendar();
      renderTimeline();
      window.__legacyRenderSessionNotes?.();
      Api.saveState();
    });

    item.append(content, remove);
    calendarEventList.appendChild(item);
  });
};

export const renderTimeline = () => {
  const timelineList = document.getElementById('timelineList');
  const timelineFilterSelect = document.getElementById('timelineFilterSelect');
  const timelineActorFilterSelect = document.getElementById('timelineActorFilterSelect');

  if (!timelineList) {
    return;
  }

  ensureEventTypeOptions(timelineFilterSelect, true);
  ensureActorOptions(timelineActorFilterSelect, true);

  const activeFilter = getEventFilterValue(timelineFilterSelect);
  const activeActor = getEventFilterValue(timelineActorFilterSelect);
  timelineList.innerHTML = '';

  const calendarSettings = window.calendarSettings || {};
  const events = buildTimelineEvents()
    .filter((event) => !activeFilter || event.type === activeFilter)
    .filter((event) => !activeActor || event.actorType === activeActor);

  if (events.length === 0) {
    const item = document.createElement('li');
    item.className = 'helper-text';
    item.textContent = 'No events recorded yet.';
    timelineList.appendChild(item);
    return;
  }

  events.forEach((event) => {
    const item = document.createElement('li');
    item.className = 'timeline-item';

    const meta = document.createElement('div');
    meta.className = 'timeline-meta';

    const dateText = document.createElement('span');
    dateText.textContent = Calendar.formatDate(
      { year: event.year, month: event.month, day: event.day, dayOfWeekIndex: null },
      calendarSettings
    );

    const tag = document.createElement('span');
    tag.className = 'timeline-tag';
    tag.textContent = getEventTypeLabel(event.type || 'general');

    const actorTag = document.createElement('span');
    actorTag.className = 'timeline-tag';
    actorTag.textContent = getEventActorLabel(event.actorType || 'player');

    meta.append(dateText, tag, actorTag);

    const title = document.createElement('div');
    title.className = 'timeline-title';
    title.textContent = event.title;

    const details = document.createElement('div');
    details.className = 'timeline-details';
    details.textContent = event.description || 'No description provided.';

    const actions = document.createElement('div');
    actions.className = 'button-row';

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'ghost';
    toggle.textContent = 'View Details';
    toggle.addEventListener('click', () => {
      const isOpen = item.classList.toggle('is-open');
      toggle.textContent = isOpen ? 'Hide Details' : 'View Details';
    });

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'ghost';
    remove.textContent = 'Delete';
    remove.addEventListener('click', () => {
      window.calendarEvents = (window.calendarEvents || []).filter((entry) => entry.id !== event.id);
      renderCalendar();
      renderTimeline();
      window.__legacyRenderSessionNotes?.();
      Api.saveState();
    });

    actions.append(toggle, remove);
    item.append(meta, title, actions, details);
    timelineList.appendChild(item);
  });

  window.__legacyRenderPartyNav?.();
};

export const renderStats = () => {
  const partyDamageList = document.getElementById('partyDamageList');
  const distanceTravelledInput = document.getElementById('distanceTravelledInput');
  const encountersCompletedInput = document.getElementById('encountersCompletedInput');

  if (!partyDamageList) {
    return;
  }

  const worldStats = window.worldStats || { distanceTravelled: 0, encountersCompleted: 0 };
  const partyMembers = window.partyMembers || [];

  if (distanceTravelledInput) {
    distanceTravelledInput.value = worldStats.distanceTravelled;
  }
  if (encountersCompletedInput) {
    encountersCompletedInput.value = worldStats.encountersCompleted;
  }

  partyDamageList.innerHTML = '';

  if (partyMembers.length === 0) {
    const item = document.createElement('li');
    item.className = 'helper-text';
    item.textContent = 'No party members added yet.';
    partyDamageList.appendChild(item);
    return;
  }

  partyMembers.forEach((member) => {
    const item = document.createElement('li');
    const name = document.createElement('span');
    name.textContent = member.name;
    const total = document.createElement('span');
    total.textContent = `${member.totalDamageTaken || 0} dmg`;
    item.append(name, total);
    partyDamageList.appendChild(item);
  });
};

export const changeCalendarMonth = (delta) => {
  const calendarSettings = window.calendarSettings || {};

  if (!window.calendarView) {
    window.__legacySetCalendarViewToCurrent?.();
  }

  let nextMonth = window.calendarView.month + delta;
  let nextYear = window.calendarView.year;
  const monthsInYear = calendarSettings.monthsInYear || 12;

  while (nextMonth < 1) {
    nextMonth += monthsInYear;
    nextYear -= 1;
  }

  while (nextMonth > monthsInYear) {
    nextMonth -= monthsInYear;
    nextYear += 1;
  }

  window.calendarView = { month: nextMonth, year: Math.max(1, nextYear) };
  renderCalendar();
};

export const addCalendarEvent = () => {
  const eventTitleInput = document.getElementById('eventTitleInput');
  const eventDayInput = document.getElementById('eventDayInput');
  const eventMonthInput = document.getElementById('eventMonthInput');
  const eventYearInput = document.getElementById('eventYearInput');
  const eventTypeInput = document.getElementById('eventTypeInput');
  const eventActorInput = document.getElementById('eventActorInput');
  const eventDescriptionInput = document.getElementById('eventDescriptionInput');

  if (!eventTitleInput || !eventDayInput || !eventMonthInput || !eventYearInput) {
    return;
  }

  const calendarSettings = window.calendarSettings || {};
  const title = eventTitleInput.value.trim() || 'Untitled Event';
  const month = Math.max(
    1,
    Math.min(calendarSettings.monthsInYear || 12, Number(eventMonthInput.value) || 1)
  );
  const year = Math.max(1, Number(eventYearInput.value) || 1);
  const daysInMonth = Calendar.getDaysInMonth(month, calendarSettings);
  const day = Math.max(1, Math.min(daysInMonth, Number(eventDayInput.value) || 1));
  const type = eventTypeInput?.value || 'general';
  const actorType = eventActorInput?.value || 'player';
  const description = eventDescriptionInput ? eventDescriptionInput.value.trim() : '';

  const newEvent = {
    id: crypto.randomUUID(),
    title,
    description,
    day,
    month,
    year,
    type,
    actorType
  };

  window.calendarEvents = [...(window.calendarEvents || []), newEvent];
  eventTitleInput.value = '';
  eventDescriptionInput.value = '';
  renderCalendar();
  renderTimeline();
  window.__legacyRenderSessionNotes?.();
  Api.saveState();
};

// ===== Utility Helpers =====

const getEventDateKey = (event) =>
  `${event.year.toString().padStart(4, '0')}-${event.month
    .toString()
    .padStart(2, '0')}-${event.day.toString().padStart(2, '0')}`;

const buildTimelineEvents = () => {
  const calendarEvents = window.calendarEvents || [];
  return calendarEvents
    .map((event) => ({
      ...event,
      dateKey: getEventDateKey(event)
    }))
    .sort((a, b) => a.dateKey.localeCompare(b.dateKey));
};

const getEventFilterValue = (select) => {
  if (!select) {return null;}
  const value = select.value;
  return value === 'all' ? null : value;
};

const getEventTypeLabel = (type) => {
  const labels = {
    general: 'General',
    combat: 'Combat',
    npc: 'NPC Interaction',
    discovery: 'Discovery',
    quest: 'Quest',
    other: 'Other'
  };
  return labels[type] || 'Unknown';
};

const getEventActorLabel = (actorType) => {
  const labels = {
    player: 'Party',
    npc: 'NPC',
    monster: 'Monster',
    world: 'World',
    other: 'Other'
  };
  return labels[actorType] || 'Unknown';
};

const ensureEventTypeOptions = (select, includeAll) => {
  if (!select) {return;}

  const existingValues = Array.from(select.options).map((o) => o.value);
  const types = ['general', 'combat', 'npc', 'discovery', 'quest', 'other'];

  if (includeAll && !existingValues.includes('all')) {
    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = 'All Types';
    select.appendChild(allOption);
  }

  types.forEach((type) => {
    if (!existingValues.includes(type)) {
      const option = document.createElement('option');
      option.value = type;
      option.textContent = getEventTypeLabel(type);
      select.appendChild(option);
    }
  });
};

const ensureActorOptions = (select, includeAll) => {
  if (!select) {return;}

  const existingValues = Array.from(select.options).map((o) => o.value);
  const actors = ['player', 'npc', 'monster', 'world', 'other'];

  if (includeAll && !existingValues.includes('all')) {
    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = 'All Actors';
    select.appendChild(allOption);
  }

  actors.forEach((actor) => {
    if (!existingValues.includes(actor)) {
      const option = document.createElement('option');
      option.value = actor;
      option.textContent = getEventActorLabel(actor);
      select.appendChild(option);
    }
  });
};

const syncCalendarEventInputs = () => {
  const eventYearInput = document.getElementById('eventYearInput');
  const eventMonthInput = document.getElementById('eventMonthInput');
  const eventDayInput = document.getElementById('eventDayInput');

  if (!window.calendarView) {
    window.__legacySetCalendarViewToCurrent?.();
  }

  if (eventYearInput && !eventYearInput.value) {
    eventYearInput.value = window.calendarView.year;
  }
  if (eventMonthInput && !eventMonthInput.value) {
    eventMonthInput.value = window.calendarView.month;
  }
  if (eventDayInput && !eventDayInput.value) {
    eventDayInput.value = 1;
  }
};
