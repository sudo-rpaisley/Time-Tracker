// Feature Renderers Module
// Handles rendering of quest boards, downtime, NPCs, factions, rumors, sessions, milestones, and encounter plans
/* global questList, questBoard, downtimeList, downtimeEntries, npcList, npcDirectory, npcSearchInput,
   npcStatusFilterInput, npcFactionFilterInput, factionList, factionRoster, factionOptions,
   factionFilterOptions, rumorList, rumorBoard, sessionNoteList, sessionNotes, sessionNoteEventSelect,
   milestoneList, campaignMilestones, encounterPlanList, encounterPlans, totalSeconds,
   calendarSettings, calendarEvents */

const formatQuestDeadline = (deadline) => {
  if (!deadline) {
    return 'No deadline';
  }
  return `Day ${deadline.day}, Month ${deadline.month}, Year ${deadline.year}`;
};

const renderQuestBoard = () => {
  if (!questList) {
    return;
  }
  questList.innerHTML = '';
  if (questBoard.length === 0) {
    const item = document.createElement('li');
    item.className = 'helper-text';
    item.textContent = 'No quests recorded yet.';
    questList.appendChild(item);
    return;
  }
  questBoard.forEach((quest) => {
    const item = document.createElement('li');
    item.className = 'quest-item';

    const header = document.createElement('div');
    header.className = 'quest-header';
    const title = document.createElement('span');
    title.textContent = quest.title;
    const status = document.createElement('span');
    status.className = 'timeline-tag';
    status.textContent = quest.status || 'open';
    header.append(title, status);

    const meta = document.createElement('div');
    meta.className = 'timeline-meta';
    meta.textContent = formatQuestDeadline(quest.deadline);

    const notes = document.createElement('div');
    notes.className = 'event-description';
    notes.textContent = quest.notes || 'No notes provided.';

    const actions = document.createElement('div');
    actions.className = 'button-row';
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'ghost';
    toggle.textContent =
      quest.status === 'completed' ? 'Reopen' : 'Mark Complete';
    toggle.addEventListener('click', () => {
      // eslint-disable-next-line no-global-assign
      questBoard = questBoard.map((entry) =>
        entry.id === quest.id
          ? {
              ...entry,
              status: entry.status === 'completed' ? 'open' : 'completed'
            }
          : entry
      );
      renderQuestBoard();
      window.__legacy.saveState();
    });
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'ghost';
    remove.textContent = 'Delete';
    remove.addEventListener('click', () => {
      // eslint-disable-next-line no-global-assign
      questBoard = questBoard.filter((entry) => entry.id !== quest.id);
      renderQuestBoard();
      window.__legacy.saveState();
    });
    actions.append(toggle, remove);

    item.append(header, meta, notes, actions);
    questList.appendChild(item);
  });
};

const renderDowntimeTracker = () => {
  if (!downtimeList) {
    return;
  }
  downtimeList.innerHTML = '';
  if (downtimeEntries.length === 0) {
    const item = document.createElement('li');
    item.className = 'helper-text';
    item.textContent = 'No downtime logged yet.';
    downtimeList.appendChild(item);
    return;
  }
  downtimeEntries.forEach((entry) => {
    const item = document.createElement('li');
    item.className = 'quest-item';

    const header = document.createElement('div');
    header.className = 'quest-header';
    const title = document.createElement('span');
    title.textContent = `${entry.character}: ${entry.activity}`;
    const status = document.createElement('span');
    status.className = 'timeline-tag';
    status.textContent = 'downtime';
    header.append(title, status);

    const meta = document.createElement('div');
    meta.className = 'timeline-meta';
    meta.textContent = `Start Day ${entry.start.day}, Month ${entry.start.month}, Year ${entry.start.year} → End Day ${entry.end.day}, Month ${entry.end.month}, Year ${entry.end.year}`;

    const notes = document.createElement('div');
    notes.className = 'event-description';
    notes.textContent = entry.notes || 'No notes provided.';

    const actions = document.createElement('div');
    actions.className = 'button-row';
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'ghost';
    remove.textContent = 'Delete';
    remove.addEventListener('click', () => {
      // eslint-disable-next-line no-global-assign
      downtimeEntries = downtimeEntries.filter((itemEntry) => itemEntry.id !== entry.id);
      renderDowntimeTracker();
      window.__legacy.saveState();
    });
    actions.append(remove);

    item.append(header, meta, notes, actions);
    downtimeList.appendChild(item);
  });
};

const parseTags = (value) =>
  String(value || '')
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);

const getCurrentDateParts = () =>
  window.__legacy.fromTotalSeconds(totalSeconds, calendarSettings);

const formatOptionalDate = (date) => {
  if (!date || !date.day || !date.month || !date.year) {
    return 'No date set.';
  }
  return window.__legacy.formatDate(date, calendarSettings);
};

const getCalendarEventById = (eventId) =>
  calendarEvents.find((event) => event.id === eventId);

const updateFactionOptions = () => {
  if (factionOptions) {
    factionOptions.innerHTML = '';
  }
  if (factionFilterOptions) {
    factionFilterOptions.innerHTML = '';
  }
  factionRoster
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((faction) => {
      if (factionOptions) {
        const option = document.createElement('option');
        option.value = faction.name;
        factionOptions.appendChild(option);
      }
      if (factionFilterOptions) {
        const option = document.createElement('option');
        option.value = faction.name;
        factionFilterOptions.appendChild(option);
      }
    });
};

const renderNpcDirectory = () => {
  if (!npcList) {
    return;
  }
  npcList.innerHTML = '';
  updateFactionOptions();
  if (npcDirectory.length === 0) {
    const item = document.createElement('li');
    item.className = 'helper-text';
    item.textContent = 'No NPCs tracked yet.';
    npcList.appendChild(item);
    return;
  }
  const query = npcSearchInput?.value.trim().toLowerCase() || '';
  const statusFilter = npcStatusFilterInput?.value || '';
  const factionFilter = npcFactionFilterInput?.value.trim().toLowerCase() || '';
  const filtered = npcDirectory
    .filter((npc) => {
      if (statusFilter && npc.status !== statusFilter) {
        return false;
      }
      if (factionFilter) {
        const factionValue = (npc.faction || '').toLowerCase();
        if (!factionValue.includes(factionFilter)) {
          return false;
        }
      }
      if (!query) {
        return true;
      }
      const haystack = `${npc.name} ${npc.role || ''} ${npc.faction || ''} ${
        npc.notes || ''
      }`.toLowerCase();
      return haystack.includes(query);
    });
  if (filtered.length === 0) {
    const item = document.createElement('li');
    item.className = 'helper-text';
    item.textContent = 'No NPCs match those filters.';
    npcList.appendChild(item);
    return;
  }
  filtered
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((npc) => {
      const item = document.createElement('li');
      item.className = 'quest-item';

      const header = document.createElement('div');
      header.className = 'quest-header';
      const title = document.createElement('span');
      title.textContent = npc.name;
      const status = document.createElement('span');
      status.className = 'timeline-tag';
      status.textContent = npc.status || 'active';
      header.append(title, status);

      const meta = document.createElement('div');
      meta.className = 'timeline-meta';
      const role = document.createElement('span');
      role.textContent = npc.role ? `Role: ${npc.role}` : 'Role: —';
      const faction = document.createElement('span');
      faction.textContent = npc.faction ? `Faction: ${npc.faction}` : 'Faction: —';
      meta.append(role, faction);

      const notes = document.createElement('div');
      notes.textContent = npc.notes || 'No notes recorded.';

      const actions = document.createElement('div');
      actions.className = 'button-row';
      const toggleStatus = document.createElement('button');
      toggleStatus.type = 'button';
      toggleStatus.className = 'ghost';
      toggleStatus.textContent = 'Cycle Status';
      toggleStatus.addEventListener('click', () => {
        const statuses = ['active', 'missing', 'deceased'];
        const currentIndex = statuses.indexOf(npc.status || 'active');
        const nextStatus = statuses[(currentIndex + 1) % statuses.length];
        // eslint-disable-next-line no-global-assign
        npcDirectory = npcDirectory.map((entry) =>
          entry.id === npc.id ? { ...entry, status: nextStatus } : entry
        );
        renderNpcDirectory();
        window.__legacy.saveState();
      });
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'ghost';
      remove.textContent = 'Remove';
      remove.addEventListener('click', () => {
        // eslint-disable-next-line no-global-assign
        npcDirectory = npcDirectory.filter((entry) => entry.id !== npc.id);
        renderNpcDirectory();
        window.__legacy.saveState();
      });
      actions.append(toggleStatus, remove);

      item.append(header, meta, notes, actions);
      npcList.appendChild(item);
    });
};

const renderFactionRoster = () => {
  if (!factionList) {
    return;
  }
  factionList.innerHTML = '';
  if (factionRoster.length === 0) {
    const item = document.createElement('li');
    item.className = 'helper-text';
    item.textContent = 'No factions recorded yet.';
    factionList.appendChild(item);
    updateFactionOptions();
    return;
  }
  factionRoster
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((faction) => {
      const item = document.createElement('li');
      item.className = 'quest-item';

      const header = document.createElement('div');
      header.className = 'quest-header';
      const title = document.createElement('span');
      title.textContent = faction.name;
      const influence = document.createElement('span');
      influence.className = 'timeline-tag';
      influence.textContent = faction.influence || 'medium';
      header.append(title, influence);

      const meta = document.createElement('div');
      meta.className = 'timeline-meta';
      const alignment = document.createElement('span');
      alignment.textContent = faction.alignment
        ? `Alignment: ${faction.alignment}`
        : 'Alignment: —';
      meta.append(alignment);

      const notes = document.createElement('div');
      notes.textContent = faction.notes || 'No notes recorded.';

      const actions = document.createElement('div');
      actions.className = 'button-row';
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'ghost';
      remove.textContent = 'Remove';
      remove.addEventListener('click', () => {
        // eslint-disable-next-line no-global-assign
        factionRoster = factionRoster.filter((entry) => entry.id !== faction.id);
        renderFactionRoster();
        renderNpcDirectory();
        window.__legacy.saveState();
      });
      actions.append(remove);

      item.append(header, meta, notes, actions);
      factionList.appendChild(item);
    });
  updateFactionOptions();
};

const generateRumorHook = () => {
  const leads = [
    'A courier whispers about',
    'A tavern keeper warns of',
    'A scout reports',
    'A priest confesses',
    'A veteran recalls'
  ];
  const subjects = [
    'a hidden vault',
    'a missing heir',
    'a cursed relic',
    'a secret alliance',
    'a rogue mage'
  ];
  const twists = [
    'in the marshlands',
    'beneath the old keep',
    'on the borderlands',
    'within the merchant guild',
    'near the fallen lighthouse'
  ];
  const lead = leads[Math.floor(Math.random() * leads.length)];
  const subject = subjects[Math.floor(Math.random() * subjects.length)];
  const twist = twists[Math.floor(Math.random() * twists.length)];
  return {
    title: `${subject.charAt(0).toUpperCase()}${subject.slice(1)}`,
    source: lead.replace('A ', ''),
    notes: `${lead} ${subject} ${twist}.`,
    tags: [subject.split(' ')[1] || 'hook', twist.split(' ').pop() || 'mystery']
  };
};

const renderRumorBoard = () => {
  if (!rumorList) {
    return;
  }
  rumorList.innerHTML = '';
  if (rumorBoard.length === 0) {
    const item = document.createElement('li');
    item.className = 'helper-text';
    item.textContent = 'No rumors recorded yet.';
    rumorList.appendChild(item);
    return;
  }
  rumorBoard.forEach((rumor) => {
    const item = document.createElement('li');
    item.className = 'quest-item';

    const header = document.createElement('div');
    header.className = 'quest-header';
    const title = document.createElement('span');
    title.textContent = rumor.title;
    const urgency = document.createElement('span');
    urgency.className = 'timeline-tag';
    urgency.textContent = rumor.urgency || 'medium';
    header.append(title, urgency);

    const meta = document.createElement('div');
    meta.className = 'timeline-meta';
    const source = document.createElement('span');
    source.textContent = rumor.source ? `Source: ${rumor.source}` : 'Source: —';
    const status = document.createElement('span');
    status.textContent = rumor.revealed ? 'Revealed' : 'Hidden';
    meta.append(source, status);

    const tags = document.createElement('div');
    tags.className = 'tag-row';
    (rumor.tags || []).forEach((tagValue) => {
      const tag = document.createElement('span');
      tag.className = 'timeline-tag';
      tag.textContent = tagValue;
      tags.appendChild(tag);
    });

    const notes = document.createElement('div');
    notes.textContent = rumor.notes || 'No notes recorded.';

    const actions = document.createElement('div');
    actions.className = 'button-row';
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'ghost';
    toggle.textContent = rumor.revealed ? 'Hide' : 'Reveal';
    toggle.addEventListener('click', () => {
      // eslint-disable-next-line no-global-assign
      rumorBoard = rumorBoard.map((entry) =>
        entry.id === rumor.id ? { ...entry, revealed: !entry.revealed } : entry
      );
      renderRumorBoard();
      window.__legacy.saveState();
    });
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'ghost';
    remove.textContent = 'Remove';
    remove.addEventListener('click', () => {
      // eslint-disable-next-line no-global-assign
      rumorBoard = rumorBoard.filter((entry) => entry.id !== rumor.id);
      renderRumorBoard();
      window.__legacy.saveState();
    });
    actions.append(toggle, remove);

    item.append(header, meta);
    if (tags.childElementCount > 0) {
      item.append(tags);
    }
    item.append(notes, actions);
    rumorList.appendChild(item);
  });
};

const buildTimelineEvents = () =>
  calendarEvents
    .map((event) => ({
      ...event,
      dateKey: `${event.year.toString().padStart(4, '0')}-${event.month
        .toString()
        .padStart(2, '0')}-${event.day.toString().padStart(2, '0')}`
    }))
    .sort((a, b) => a.dateKey.localeCompare(b.dateKey));

const renderSessionNotes = () => {
  if (!sessionNoteList) {
    return;
  }
  if (sessionNoteEventSelect) {
    sessionNoteEventSelect.innerHTML = '';
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'No linked event';
    sessionNoteEventSelect.appendChild(defaultOption);
    buildTimelineEvents().forEach((event) => {
      const option = document.createElement('option');
      option.value = event.id;
      option.textContent = `${window.__legacy.formatDate(
        { year: event.year, month: event.month, day: event.day, dayOfWeekIndex: null },
        calendarSettings
      )} — ${event.title}`;
      sessionNoteEventSelect.appendChild(option);
    });
  }

  sessionNoteList.innerHTML = '';
  if (sessionNotes.length === 0) {
    const item = document.createElement('li');
    item.className = 'helper-text';
    item.textContent = 'No session notes recorded yet.';
    sessionNoteList.appendChild(item);
    return;
  }
  sessionNotes
    .slice()
    .sort((a, b) => (b.createdAtKey || '').localeCompare(a.createdAtKey || ''))
    .forEach((note) => {
      const item = document.createElement('li');
      item.className = 'quest-item';

      const header = document.createElement('div');
      header.className = 'quest-header';
      const title = document.createElement('span');
      title.textContent = note.title;
      const tag = document.createElement('span');
      tag.className = 'timeline-tag';
      tag.textContent = note.eventId ? 'Linked' : 'Standalone';
      header.append(title, tag);

      const meta = document.createElement('div');
      meta.className = 'timeline-meta';
      const created = document.createElement('span');
      created.textContent = note.createdAt
        ? `Logged: ${formatOptionalDate(note.createdAt)}`
        : 'Logged: —';
      meta.append(created);

      const linkedEvent = note.eventId ? getCalendarEventById(note.eventId) : null;
      if (linkedEvent) {
        const link = document.createElement('span');
        link.textContent = `Linked to: ${linkedEvent.title}`;
        meta.appendChild(link);
      }

      const notes = document.createElement('div');
      notes.textContent = note.notes || 'No notes recorded.';

      const actions = document.createElement('div');
      actions.className = 'button-row';
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'ghost';
      remove.textContent = 'Remove';
      remove.addEventListener('click', () => {
        // eslint-disable-next-line no-global-assign
        sessionNotes = sessionNotes.filter((entry) => entry.id !== note.id);
        renderSessionNotes();
        window.__legacy.saveState();
      });
      actions.append(remove);

      item.append(header, meta, notes, actions);
      sessionNoteList.appendChild(item);
    });
};

const renderCampaignMilestones = () => {
  if (!milestoneList) {
    return;
  }
  milestoneList.innerHTML = '';
  if (campaignMilestones.length === 0) {
    const item = document.createElement('li');
    item.className = 'helper-text';
    item.textContent = 'No milestones recorded yet.';
    milestoneList.appendChild(item);
    return;
  }
  campaignMilestones.forEach((milestone) => {
    const item = document.createElement('li');
    item.className = 'quest-item';

    const header = document.createElement('div');
    header.className = 'quest-header';
    const title = document.createElement('span');
    title.textContent = milestone.title;
    const status = document.createElement('span');
    status.className = 'timeline-tag';
    status.textContent = milestone.status || 'planned';
    header.append(title, status);

    const meta = document.createElement('div');
    meta.className = 'timeline-meta';
    const target = document.createElement('span');
    target.textContent = formatOptionalDate(milestone.targetDate);
    meta.append(target);

    const notes = document.createElement('div');
    notes.textContent = milestone.notes || 'No notes recorded.';

    const actions = document.createElement('div');
    actions.className = 'button-row';
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'ghost';
    toggle.textContent =
      milestone.status === 'completed' ? 'Reopen' : 'Mark Complete';
    toggle.addEventListener('click', () => {
      const nextStatus =
        milestone.status === 'completed' ? 'planned' : 'completed';
      // eslint-disable-next-line no-global-assign
      campaignMilestones = campaignMilestones.map((entry) =>
        entry.id === milestone.id ? { ...entry, status: nextStatus } : entry
      );
      renderCampaignMilestones();
      window.__legacy.saveState();
    });
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'ghost';
    remove.textContent = 'Remove';
    remove.addEventListener('click', () => {
      // eslint-disable-next-line no-global-assign
      campaignMilestones = campaignMilestones.filter(
        (entry) => entry.id !== milestone.id
      );
      renderCampaignMilestones();
      window.__legacy.saveState();
    });
    actions.append(toggle, remove);

    item.append(header, meta, notes, actions);
    milestoneList.appendChild(item);
  });
};

const renderEncounterPlans = () => {
  if (!encounterPlanList) {
    return;
  }
  encounterPlanList.innerHTML = '';
  if (encounterPlans.length === 0) {
    const item = document.createElement('li');
    item.className = 'helper-text';
    item.textContent = 'No encounter plans created yet.';
    encounterPlanList.appendChild(item);
    return;
  }
  encounterPlans.forEach((plan) => {
    const item = document.createElement('li');
    item.className = 'quest-item';

    const header = document.createElement('div');
    header.className = 'quest-header';
    const title = document.createElement('span');
    title.textContent = plan.title;
    const threat = document.createElement('span');
    threat.className = 'timeline-tag';
    threat.textContent = plan.threat || 'medium';
    header.append(title, threat);

    const notes = document.createElement('div');
    notes.textContent = plan.notes || 'No notes recorded.';

    const roster = document.createElement('ul');
    roster.className = 'note-list';
    (plan.roster || []).forEach((entry) => {
      const row = document.createElement('li');
      row.textContent = entry;
      roster.appendChild(row);
    });

    const actions = document.createElement('div');
    actions.className = 'button-row';
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'ghost';
    remove.textContent = 'Remove';
    remove.addEventListener('click', () => {
      // eslint-disable-next-line no-global-assign
      encounterPlans = encounterPlans.filter((entry) => entry.id !== plan.id);
      renderEncounterPlans();
      window.__legacy.saveState();
    });
    actions.append(remove);

    item.append(header, notes);
    if (roster.childElementCount > 0) {
      item.appendChild(roster);
    }
    item.append(actions);
    encounterPlanList.appendChild(item);
  });
};

// Initialize feature renderers module
const initFeatureRenderers = () => {
  // Module initialization - can be extended later if needed
};

// Export public functions
export {
  formatQuestDeadline,
  renderQuestBoard,
  renderDowntimeTracker,
  parseTags,
  getCurrentDateParts,
  formatOptionalDate,
  getCalendarEventById,
  updateFactionOptions,
  renderNpcDirectory,
  renderFactionRoster,
  generateRumorHook,
  renderRumorBoard,
  buildTimelineEvents,
  renderSessionNotes,
  renderCampaignMilestones,
  renderEncounterPlans,
  initFeatureRenderers
};
