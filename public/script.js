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
const homePage = document.getElementById('homePage');
const worldsPage = document.getElementById('worldsPage');
const settingsPage = document.getElementById('settingsPage');
const combatPage = document.getElementById('combatPage');
const logPage = document.getElementById('logPage');
const clockPage = document.getElementById('clockPage');
const navTimeDisplay = document.getElementById('navTimeDisplay');
const navParty = document.getElementById('navParty');
const closeSettingsButton = document.getElementById('closeSettingsButton');
const createWorldButton = document.getElementById('createWorldButton');
const worldGrid = document.getElementById('worldGrid');
const worldScaleInput = document.getElementById('worldScaleInput');
const leaveWorldButton = document.getElementById('leaveWorldButton');
const partyMemberName = document.getElementById('partyMemberName');
const partyMemberMaxHp = document.getElementById('partyMemberMaxHp');
const partyMemberXp = document.getElementById('partyMemberXp');
const partyMemberLevel = document.getElementById('partyMemberLevel');
const addPartyMemberButton = document.getElementById('addPartyMemberButton');
const partyList = document.getElementById('partyList');
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
const startCombatButton = document.getElementById('startCombatButton');
const combatNextTurnButton = document.getElementById('combatNextTurnButton');
const combatantInitiativeInput = document.getElementById('combatantInitiative');
const rollAllButton = document.getElementById('rollAllButton');
const rollNpcsButton = document.getElementById('rollNpcsButton');
const sortInitiativeButton = document.getElementById('sortInitiativeButton');
const clearCombatButton = document.getElementById('clearCombatButton');
const addPartyToEncounterButton = document.getElementById(
  'addPartyToEncounterButton'
);
const combatLog = document.getElementById('combatLog');
const profileModal = document.getElementById('profileModal');
const profileBackdrop = document.getElementById('profileBackdrop');
const closeProfileButton = document.getElementById('closeProfileButton');
const worldModal = document.getElementById('worldModal');
const worldModalBackdrop = document.getElementById('worldModalBackdrop');
const closeWorldModalButton = document.getElementById('closeWorldModalButton');
const worldNameInput = document.getElementById('worldNameInput');
const worldModalError = document.getElementById('worldModalError');
const confirmWorldButton = document.getElementById('confirmWorldButton');
const cancelWorldButton = document.getElementById('cancelWorldButton');
const worldEditModal = document.getElementById('worldEditModal');
const worldEditBackdrop = document.getElementById('worldEditBackdrop');
const closeWorldEditButton = document.getElementById('closeWorldEditButton');
const worldEditNameInput = document.getElementById('worldEditNameInput');
const worldCoverInput = document.getElementById('worldCoverInput');
const worldCoverPreview = document.getElementById('worldCoverPreview');
const worldEditError = document.getElementById('worldEditError');
const confirmWorldEditButton = document.getElementById('confirmWorldEditButton');
const cancelWorldEditButton = document.getElementById('cancelWorldEditButton');
const deleteWorldButton = document.getElementById('deleteWorldButton');
const interactionModal = document.getElementById('interactionModal');
const interactionBackdrop = document.getElementById('interactionBackdrop');
const closeInteractionButton = document.getElementById('closeInteractionButton');
const interactionSummary = document.getElementById('interactionSummary');
const interactionTypeInput = document.getElementById('interactionTypeInput');
const interactionAmountLabel = document.getElementById('interactionAmountLabel');
const interactionDamageInput = document.getElementById('interactionDamageInput');
const interactionNotesInput = document.getElementById('interactionNotesInput');
const cancelInteractionButton = document.getElementById('cancelInteractionButton');
const confirmInteractionButton = document.getElementById('confirmInteractionButton');
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
const partyProfileModal = document.getElementById('partyProfileModal');
const partyProfileBackdrop = document.getElementById('partyProfileBackdrop');
const closePartyProfileButton = document.getElementById('closePartyProfileButton');
const emptyPartyProfile = document.getElementById('emptyPartyProfile');
const partyProfileDetails = document.getElementById('partyProfileDetails');
const partyProfileName = document.getElementById('partyProfileName');
const partyProfileCurrentHp = document.getElementById('partyProfileCurrentHp');
const partyProfileMaxHp = document.getElementById('partyProfileMaxHp');
const partyProfileXp = document.getElementById('partyProfileXp');
const partyProfileLevel = document.getElementById('partyProfileLevel');
const partyProfileConditionAdd = document.getElementById('partyProfileConditionAdd');
const partyProfileConditionTags = document.getElementById('partyProfileConditionTags');
const partyProfileConditionPopover = document.getElementById(
  'partyProfileConditionPopover'
);
const partyProfileConditionSelect = document.getElementById(
  'partyProfileConditionSelect'
);
const partyProfileConditionInput = document.getElementById(
  'partyProfileConditionInput'
);
const partyProfileConditionConfirm = document.getElementById(
  'partyProfileConditionConfirm'
);
const partyProfileConditionDuration = document.getElementById(
  'partyProfileConditionDuration'
);
const partyProfileConditionUnit = document.getElementById('partyProfileConditionUnit');
const partyProfileConditionRule = document.getElementById('partyProfileConditionRule');
const partyProfileNotes = document.getElementById('partyProfileNotes');
const partyProfileCopper = document.getElementById('partyProfileCopper');
const partyProfileSilver = document.getElementById('partyProfileSilver');
const partyProfileGold = document.getElementById('partyProfileGold');
const partyProfilePlatinum = document.getElementById('partyProfilePlatinum');
const partyDeathSaveSuccess1 = document.getElementById('partyDeathSaveSuccess1');
const partyDeathSaveSuccess2 = document.getElementById('partyDeathSaveSuccess2');
const partyDeathSaveSuccess3 = document.getElementById('partyDeathSaveSuccess3');
const partyDeathSaveFail1 = document.getElementById('partyDeathSaveFail1');
const partyDeathSaveFail2 = document.getElementById('partyDeathSaveFail2');
const partyDeathSaveFail3 = document.getElementById('partyDeathSaveFail3');
const resetPartyDeathSavesButton = document.getElementById(
  'resetPartyDeathSavesButton'
);
const removePartyMemberButton = document.getElementById('removePartyMemberButton');
const exportWorldButton = document.getElementById('exportWorldButton');
const importWorldInput = document.getElementById('importWorldInput');
const worldNotesInput = document.getElementById('worldNotesInput');
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
const roundHistoryList = document.getElementById('roundHistoryList');
const calendarGrid = document.getElementById('calendarGrid');
const calendarMonthLabel = document.getElementById('calendarMonthLabel');
const calendarPrevButton = document.getElementById('calendarPrevButton');
const calendarNextButton = document.getElementById('calendarNextButton');
const calendarFilterSelect = document.getElementById('calendarFilterSelect');
const calendarActorFilterSelect = document.getElementById('calendarActorFilterSelect');
const eventTitleInput = document.getElementById('eventTitleInput');
const eventTypeInput = document.getElementById('eventTypeInput');
const eventActorInput = document.getElementById('eventActorInput');
const eventDayInput = document.getElementById('eventDayInput');
const eventMonthInput = document.getElementById('eventMonthInput');
const eventYearInput = document.getElementById('eventYearInput');
const eventDescriptionInput = document.getElementById('eventDescriptionInput');
const addEventButton = document.getElementById('addEventButton');
const calendarEventList = document.getElementById('calendarEventList');
const timelineList = document.getElementById('timelineList');
const timelineFilterSelect = document.getElementById('timelineFilterSelect');
const timelineActorFilterSelect = document.getElementById('timelineActorFilterSelect');
const distanceTravelledInput = document.getElementById('distanceTravelledInput');
const encountersCompletedInput = document.getElementById('encountersCompletedInput');
const saveWorldStatsButton = document.getElementById('saveWorldStatsButton');
const partyDamageList = document.getElementById('partyDamageList');
const mapImageInput = document.getElementById('mapImageInput');
const mapZoomInput = document.getElementById('mapZoomInput');
const mapResetButton = document.getElementById('mapResetButton');
const mapViewport = document.getElementById('mapViewport');
const mapImage = document.getElementById('mapImage');
const mapMarkers = document.getElementById('mapMarkers');
const mapTagList = document.getElementById('mapTagList');
const encounterPresetName = document.getElementById('encounterPresetName');
const saveEncounterPresetButton = document.getElementById('saveEncounterPresetButton');
const encounterPresetList = document.getElementById('encounterPresetList');
const questTitleInput = document.getElementById('questTitleInput');
const questStatusInput = document.getElementById('questStatusInput');
const questDeadlineDayInput = document.getElementById('questDeadlineDayInput');
const questDeadlineMonthInput = document.getElementById('questDeadlineMonthInput');
const questDeadlineYearInput = document.getElementById('questDeadlineYearInput');
const questNotesInput = document.getElementById('questNotesInput');
const addQuestButton = document.getElementById('addQuestButton');
const questList = document.getElementById('questList');
const downtimeCharacterInput = document.getElementById('downtimeCharacterInput');
const downtimeActivityInput = document.getElementById('downtimeActivityInput');
const downtimeStartDayInput = document.getElementById('downtimeStartDayInput');
const downtimeStartMonthInput = document.getElementById('downtimeStartMonthInput');
const downtimeStartYearInput = document.getElementById('downtimeStartYearInput');
const downtimeEndDayInput = document.getElementById('downtimeEndDayInput');
const downtimeEndMonthInput = document.getElementById('downtimeEndMonthInput');
const downtimeEndYearInput = document.getElementById('downtimeEndYearInput');
const downtimeNotesInput = document.getElementById('downtimeNotesInput');
const addDowntimeButton = document.getElementById('addDowntimeButton');
const downtimeList = document.getElementById('downtimeList');
const npcNameInput = document.getElementById('npcNameInput');
const npcRoleInput = document.getElementById('npcRoleInput');
const npcStatusInput = document.getElementById('npcStatusInput');
const npcFactionInput = document.getElementById('npcFactionInput');
const npcNotesInput = document.getElementById('npcNotesInput');
const addNpcButton = document.getElementById('addNpcButton');
const npcList = document.getElementById('npcList');
const monsterSearchInput = document.getElementById('monsterSearchInput');
const monsterNameInput = document.getElementById('monsterNameInput');
const monsterTypeInput = document.getElementById('monsterTypeInput');
const monsterMaxHpInput = document.getElementById('monsterMaxHpInput');
const monsterNotesInput = document.getElementById('monsterNotesInput');
const monsterImageInput = document.getElementById('monsterImageInput');
const addMonsterButton = document.getElementById('addMonsterButton');
const cancelMonsterEditButton = document.getElementById('cancelMonsterEditButton');
const monsterList = document.getElementById('monsterList');
const monsterImportInput = document.getElementById('monsterImportInput');
const monsterImportError = document.getElementById('monsterImportError');
const importMonstersButton = document.getElementById('importMonstersButton');
const monsterBookSelect = document.getElementById('monsterBookSelect');
const monsterBookNameInput = document.getElementById('monsterBookNameInput');
const addMonsterBookButton = document.getElementById('addMonsterBookButton');
const exportMonsterBookButton = document.getElementById('exportMonsterBookButton');
const monsterBookError = document.getElementById('monsterBookError');
const monsterListPanel = document.getElementById('monsterListPanel');
const monsterDetailPanel = document.getElementById('monsterDetailPanel');
const monsterDetailContent = document.getElementById('monsterDetailContent');
const monsterDetailRelated = document.getElementById('monsterDetailRelated');
const closeMonsterDetailButton = document.getElementById('closeMonsterDetailButton');
const editMonsterButton = document.getElementById('editMonsterButton');
const deleteMonsterButton = document.getElementById('deleteMonsterButton');
const factionNameInput = document.getElementById('factionNameInput');
const factionInfluenceInput = document.getElementById('factionInfluenceInput');
const factionAlignmentInput = document.getElementById('factionAlignmentInput');
const factionNotesInput = document.getElementById('factionNotesInput');
const addFactionButton = document.getElementById('addFactionButton');
const factionList = document.getElementById('factionList');
const factionOptions = document.getElementById('factionOptions');
const rumorTitleInput = document.getElementById('rumorTitleInput');
const rumorSourceInput = document.getElementById('rumorSourceInput');
const rumorUrgencyInput = document.getElementById('rumorUrgencyInput');
const rumorTagsInput = document.getElementById('rumorTagsInput');
const rumorNotesInput = document.getElementById('rumorNotesInput');
const rumorRevealedInput = document.getElementById('rumorRevealedInput');
const addRumorButton = document.getElementById('addRumorButton');
const generateRumorButton = document.getElementById('generateRumorButton');
const rumorList = document.getElementById('rumorList');
const sessionNoteTitleInput = document.getElementById('sessionNoteTitleInput');
const sessionNoteEventSelect = document.getElementById('sessionNoteEventSelect');
const sessionNoteNotesInput = document.getElementById('sessionNoteNotesInput');
const addSessionNoteButton = document.getElementById('addSessionNoteButton');
const sessionNoteList = document.getElementById('sessionNoteList');
const milestoneTitleInput = document.getElementById('milestoneTitleInput');
const milestoneStatusInput = document.getElementById('milestoneStatusInput');
const milestoneDayInput = document.getElementById('milestoneDayInput');
const milestoneMonthInput = document.getElementById('milestoneMonthInput');
const milestoneYearInput = document.getElementById('milestoneYearInput');
const milestoneNotesInput = document.getElementById('milestoneNotesInput');
const addMilestoneButton = document.getElementById('addMilestoneButton');
const milestoneList = document.getElementById('milestoneList');
const encounterPlanTitleInput = document.getElementById('encounterPlanTitleInput');
const encounterPlanThreatInput = document.getElementById('encounterPlanThreatInput');
const encounterPlanRosterInput = document.getElementById('encounterPlanRosterInput');
const encounterPlanNotesInput = document.getElementById('encounterPlanNotesInput');
const addEncounterPlanButton = document.getElementById('addEncounterPlanButton');
const encounterPlanList = document.getElementById('encounterPlanList');

const timeInputs = [
  yearInput,
  monthInput,
  dayInput,
  hourInput,
  minuteInput,
  secondInput
].filter(Boolean);
let isEditingTimeInputs = false;

let totalSeconds = 0;
let combatants = [];
let currentCombatantIndex = 0;
let draggedCombatantId = null;
let selectedCombatantId = null;
let selectedPartyMemberId = null;
let combatLogEntries = [];
let roundNumber = 1;
let autoClockTimer = null;
let encounterDraft = [];
let partyMembers = [];
let roundHistoryEntries = [];
let calendarEvents = [];
let calendarView = null;
let combatActive = false;
let encounterPresets = [];
let worldStats = {
  distanceTravelled: 0,
  encountersCompleted: 0
};
let worldMap = {
  image: '',
  zoom: 1,
  offsetX: 0,
  offsetY: 0,
  markers: []
};
let worldNotes = '';
let questBoard = [];
let downtimeEntries = [];
let npcDirectory = [];
let factionRoster = [];
let rumorBoard = [];
let sessionNotes = [];
let campaignMilestones = [];
let encounterPlans = [];
let monsterBooks = [];
let activeMonsterBookId = null;
let activeMonsterId = null;
let editingMonsterId = null;
const updateWorldNotes = (value) => {
  worldNotes = value;
  saveState();
};

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

let worlds = {};
let activeWorldId = null;
let worldEditTargetId = null;
let worldCoverImage = '';
let worldEditCoverImage = '';
let interactionSourceId = null;
let interactionTargetId = null;
const isAutoClockEnabled = () => localStorage.getItem('autoClockEnabled') === 'true';

const EVENT_TYPES = [
  { value: 'all', label: 'All Events' },
  { value: 'general', label: 'General' },
  { value: 'lore', label: 'World Lore' },
  { value: 'player', label: 'Player Created' },
  { value: 'deadline', label: 'Upcoming Deadline' },
  { value: 'festival', label: 'Festival' },
  { value: 'milestone', label: 'Milestone' },
  { value: 'quest', label: 'Quest' },
  { value: 'travel', label: 'Travel' },
  { value: 'downtime', label: 'Downtime' },
  { value: 'combat', label: 'Combat' }
];

const EVENT_ACTORS = [
  { value: 'all', label: 'All Actors' },
  { value: 'player', label: 'Player' },
  { value: 'npc', label: 'NPC' }
];

const baseMonsterPresets = [
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

const stripHtml = (value) => String(value || '').replace(/<[^>]*>/g, '').trim();

const parseFirstNumber = (value) => {
  const match = String(value || '').match(/-?\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : null;
};

const truncateText = (value, maxLength = 140) => {
  const text = String(value || '').trim();
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength).trim()}…`;
};

const getMonsterMaxHp = (monster) => {
  if (!monster) {
    return null;
  }
  if (Number.isFinite(monster.maxHp)) {
    return monster.maxHp;
  }
  const parsed = parseFirstNumber(monster.hitPoints);
  return Number.isFinite(parsed) ? parsed : null;
};

const normalizeImageUrls = (value) => {
  if (!value) {
    return [];
  }
  if (Array.isArray(value)) {
    return value
      .map((entry) => String(entry || '').trim())
      .filter(Boolean);
  }
  return String(value)
    .split('\n')
    .map((entry) => entry.trim())
    .filter(Boolean);
};

const normalizeMonsterEntry = (entry) => {
  if (!entry || typeof entry !== 'object') {
    return null;
  }
  const name = String(entry.name || entry.Name || '').trim();
  if (!name) {
    return null;
  }
  const rawType = entry.type || entry.Type || '';
  const type = String(rawType).trim() || 'npc';
  const parsedMaxHp =
    Number(entry.maxHp ?? entry.maxHP ?? entry['Max HP'] ?? entry['Hit Points']);
  const maxHpFromText =
    parseFirstNumber(entry['Hit Points'] ?? entry.hitPoints ?? entry.HitPoints);
  const maxHp = Number.isNaN(parsedMaxHp)
    ? maxHpFromText
    : Math.max(0, parsedMaxHp);
  const meta = String(entry.meta || entry.Meta || entry.type || entry.Type || '').trim();
  const armorClass = String(
    entry.armorClass ||
      entry['Armor Class'] ||
      entry['Armor class'] ||
      entry['ArmorClass'] ||
      ''
  ).trim();
  const hitPoints = String(entry.hitPoints || entry['Hit Points'] || '').trim();
  const speed = String(entry.speed || entry.Speed || '').trim();
  const savingThrows = String(entry.savingThrows || entry['Saving Throws'] || '').trim();
  const skills = String(entry.skills || entry.Skills || '').trim();
  const senses = String(entry.senses || entry.Senses || '').trim();
  const languages = String(entry.languages || entry.Languages || '').trim();
  const challenge = String(entry.challenge || entry.Challenge || '').trim();
  const traits = stripHtml(entry.traits || entry.Traits || '');
  const actions = stripHtml(entry.actions || entry.Actions || '');
  const legendaryActions = stripHtml(entry.legendaryActions || entry['Legendary Actions'] || '');
  const imageUrls = normalizeImageUrls(
    entry.imageUrls ||
      entry.images ||
      entry.imageUrl ||
      entry.img_url ||
      entry.image ||
      entry['Image URL'] ||
      ''
  );
  const imageUrl = imageUrls[0] || '';
  const stats = {
    str: entry.STR || entry.str || '',
    dex: entry.DEX || entry.dex || '',
    con: entry.CON || entry.con || '',
    int: entry.INT || entry.int || '',
    wis: entry.WIS || entry.wis || '',
    cha: entry.CHA || entry.cha || '',
    strMod: entry.STR_mod || entry.strMod || '',
    dexMod: entry.DEX_mod || entry.dexMod || '',
    conMod: entry.CON_mod || entry.conMod || '',
    intMod: entry.INT_mod || entry.intMod || '',
    wisMod: entry.WIS_mod || entry.wisMod || '',
    chaMod: entry.CHA_mod || entry.chaMod || ''
  };
  const notes = String(entry.notes || entry.Notes || entry.description || '').trim();
  return {
    id: entry.id ? String(entry.id) : crypto.randomUUID(),
    name,
    type,
    meta,
    maxHp,
    armorClass,
    hitPoints,
    speed,
    savingThrows,
    skills,
    senses,
    languages,
    challenge,
    traits,
    actions,
    legendaryActions,
    imageUrl,
    imageUrls,
    stats,
    notes
  };
};

const normalizeMonsterManual = (entries) => {
  const list = Array.isArray(entries) ? entries : [];
  const seen = new Set();
  return list.reduce((acc, entry) => {
    const monster = normalizeMonsterEntry(entry);
    if (!monster) {
      return acc;
    }
    const key = monster.name.toLowerCase();
    if (seen.has(key)) {
      return acc;
    }
    seen.add(key);
    acc.push(monster);
    return acc;
  }, []);
};

const createMonsterBook = (name, monsters = []) => ({
  id: crypto.randomUUID(),
  name,
  monsters: normalizeMonsterManual(monsters)
});

const normalizeMonsterBooks = (books) => {
  const list = Array.isArray(books) ? books : [];
  const seen = new Set();
  return list.reduce((acc, entry) => {
    const name = String(entry?.name || '').trim();
    if (!name) {
      return acc;
    }
    const key = name.toLowerCase();
    if (seen.has(key)) {
      return acc;
    }
    seen.add(key);
    acc.push({
      id: entry.id ? String(entry.id) : crypto.randomUUID(),
      name,
      monsters: normalizeMonsterManual(entry.monsters || entry.entries || [])
    });
    return acc;
  }, []);
};

const getMonsterBookById = (id) =>
  monsterBooks.find((book) => book.id === id) || null;

const getActiveMonsterBook = () => getMonsterBookById(activeMonsterBookId);

const findMonsterById = (monsterId) => {
  if (!monsterId) {
    return null;
  }
  for (const book of monsterBooks) {
    const match = book.monsters.find((monster) => monster.id === monsterId);
    if (match) {
      return { book, monster: match };
    }
  }
  return null;
};

const setActiveMonster = (monsterId, { syncHash = true } = {}) => {
  const match = findMonsterById(monsterId);
  if (match) {
    activeMonsterBookId = match.book.id;
    activeMonsterId = match.monster.id;
  } else {
    activeMonsterId = monsterId || null;
  }
  cancelMonsterEdit();
  if (syncHash) {
    if (activeMonsterId) {
      window.location.hash = `monster=${activeMonsterId}`;
    } else if (window.location.hash.startsWith('#monster=')) {
      window.location.hash = '';
    }
  }
  renderMonsterManual();
  renderCombatantPresets();
  renderMonsterDetail();
};

const getMonsterIdFromHash = () => {
  if (!window.location.hash.startsWith('#monster=')) {
    return null;
  }
  const id = window.location.hash.replace('#monster=', '').trim();
  return id || null;
};

const getMonsterIdFromQuery = () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  return id ? id.trim() : null;
};

const isMonsterDetailPage = () => window.location.pathname.endsWith('monster.html');

const getMonsterIdFromLocation = () => {
  const hashId = getMonsterIdFromHash();
  if (hashId) {
    return hashId;
  }
  if (isMonsterDetailPage()) {
    return getMonsterIdFromQuery();
  }
  return null;
};

const getMonsterBookByName = (name) => {
  const key = String(name || '').trim().toLowerCase();
  if (!key) {
    return null;
  }
  return monsterBooks.find((book) => book.name.toLowerCase() === key) || null;
};

const ensureMonsterBook = (name) => {
  const trimmed = String(name || '').trim();
  if (!trimmed) {
    return null;
  }
  const existing = getMonsterBookByName(trimmed);
  if (existing) {
    return existing;
  }
  const book = createMonsterBook(trimmed, []);
  monsterBooks = [...monsterBooks, book];
  return book;
};

const getMonsterManualByName = (name) => {
  const key = name.trim().toLowerCase();
  if (!key) {
    return null;
  }
  const book = getActiveMonsterBook();
  if (!book) {
    return null;
  }
  return book.monsters.find((monster) => monster.name.toLowerCase() === key) || null;
};

const getMonsterById = (id) => {
  const book = getActiveMonsterBook();
  if (!book) {
    return null;
  }
  return book.monsters.find((monster) => monster.id === id) || null;
};

const pad = (value) => String(value).padStart(2, '0');

const generateWorldId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    const buffer = new Uint8Array(16);
    crypto.getRandomValues(buffer);
    buffer[6] = (buffer[6] & 0x0f) | 0x40;
    buffer[8] = (buffer[8] & 0x3f) | 0x80;
    const hex = Array.from(buffer, (byte) => byte.toString(16).padStart(2, '0'));
    return `${hex[0]}${hex[1]}${hex[2]}${hex[3]}-${hex[4]}${hex[5]}-${hex[6]}${hex[7]}-${hex[8]}${hex[9]}-${hex[10]}${hex[11]}${hex[12]}${hex[13]}${hex[14]}${hex[15]}`;
  }
  return `world-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
};

const createWorld = (name) => {
  const defaultBook = createMonsterBook('Monster Manual', baseMonsterPresets);
  return {
    id: generateWorldId(),
    name,
    coverImage: '',
    totalSeconds: 0,
    combatants: [],
    currentCombatantIndex: 0,
    selectedCombatantId: null,
    calendarSettings: { ...calendarSettings },
    timeConfig: { ...timeConfig },
    roundNumber: 1,
    combatLogEntries: [],
    encounterDraft: [],
    partyMembers: [],
    roundHistoryEntries: [],
    calendarEvents: [],
    combatActive: false,
    encounterPresets: [],
    worldStats: { ...worldStats },
    worldMap: { ...worldMap },
    worldNotes: '',
    questBoard: [],
    downtimeEntries: [],
    npcDirectory: [],
    factionRoster: [],
    rumorBoard: [],
    sessionNotes: [],
    campaignMilestones: [],
    encounterPlans: [],
    monsterBooks: [defaultBook],
    activeMonsterBookId: defaultBook.id
  };
};

const openWorldModal = () => {
  if (!worldModal || !worldNameInput) {
    return false;
  }
  worldModal.classList.add('is-open');
  worldModal.setAttribute('aria-hidden', 'false');
  if (worldModalError) {
    worldModalError.textContent = '';
  }
  worldNameInput.value = '';
  setTimeout(() => {
    worldNameInput.focus();
  }, 0);
  return true;
};

const closeWorldModal = () => {
  if (!worldModal) {
    return;
  }
  worldModal.classList.remove('is-open');
  worldModal.setAttribute('aria-hidden', 'true');
  if (worldModalError) {
    worldModalError.textContent = '';
  }
};

const openWorldEditModal = (worldId) => {
  const world = worlds[worldId];
  if (!worldEditModal || !worldEditNameInput || !world) {
    return false;
  }
  worldEditTargetId = worldId;
  worldEditCoverImage = world.coverImage || '';
  worldEditModal.classList.add('is-open');
  worldEditModal.setAttribute('aria-hidden', 'false');
  if (worldEditError) {
    worldEditError.textContent = '';
  }
  worldEditNameInput.value = world.name || '';
  if (worldCoverInput) {
    worldCoverInput.value = '';
  }
  if (worldCoverPreview) {
    worldCoverPreview.style.backgroundImage = worldEditCoverImage
      ? `url("${worldEditCoverImage}")`
      : 'none';
  }
  setTimeout(() => {
    worldEditNameInput.focus();
    worldEditNameInput.select();
  }, 0);
  return true;
};

const closeWorldEditModal = () => {
  if (!worldEditModal) {
    return;
  }
  worldEditModal.classList.remove('is-open');
  worldEditModal.setAttribute('aria-hidden', 'true');
  if (worldEditError) {
    worldEditError.textContent = '';
  }
  worldEditTargetId = null;
  worldEditCoverImage = '';
};

const saveWorldEdit = () => {
  if (!worldEditTargetId || !worldEditNameInput) {
    return false;
  }
  const trimmed = worldEditNameInput.value.trim();
  if (!trimmed) {
    if (worldEditError) {
      worldEditError.textContent = 'Please enter a world name.';
    }
    worldEditNameInput.focus();
    return false;
  }
  const currentWorld = worlds[worldEditTargetId];
  if (!currentWorld) {
    return false;
  }
  worlds[worldEditTargetId] = {
    ...currentWorld,
    name: trimmed,
    coverImage: worldEditCoverImage || ''
  };
  if (activeWorldId === worldEditTargetId) {
    worldCoverImage = worldEditCoverImage || '';
  }
  saveState();
  renderWorldTiles();
  return true;
};

const deleteWorld = () => {
  if (!worldEditTargetId) {
    return false;
  }
  const targetWorld = worlds[worldEditTargetId];
  if (!targetWorld) {
    return false;
  }
  const confirmed = window.confirm(
    `Are you sure you want to delete "${targetWorld.name}"?`
  );
  if (!confirmed) {
    return false;
  }
  if (Object.keys(worlds).length <= 1) {
    if (worldEditError) {
      worldEditError.textContent = 'Create another world before deleting this one.';
    }
    return false;
  }
  delete worlds[worldEditTargetId];
  if (activeWorldId === worldEditTargetId) {
    activeWorldId = Object.keys(worlds)[0] || null;
  }
  worldCoverImage = activeWorldId ? worlds[activeWorldId]?.coverImage || '' : '';
  saveState();
  renderWorldTiles();
  if (activeWorldId) {
    setActiveWorld(activeWorldId);
  } else {
    setWorldSelectedState(false);
    monsterBooks = [];
    activeMonsterBookId = null;
    activeMonsterId = null;
    editingMonsterId = null;
    renderMonsterManual();
    renderCombatantPresets();
    renderMonsterDetail();
  }
  return true;
};

const createWorldFromName = (name) => {
  const trimmed = name.trim();
  if (!trimmed) {
    if (worldModalError) {
      worldModalError.textContent = 'Please enter a world name.';
    }
    if (worldNameInput) {
      worldNameInput.focus();
    }
    return false;
  }
  const world = createWorld(trimmed);
  worlds[world.id] = world;
  renderWorldTiles();
  saveState();
  return true;
};

const requestWorldCreation = () => {
  if (openWorldModal()) {
    return;
  }
  const name = window.prompt('Name the new world');
  if (!name) {
    return;
  }
  createWorldFromName(name);
};

const getCurrentWorld = () => worlds[activeWorldId];

const setWorldSelectedState = (isSelected) => {
  document.body.classList.toggle('world-selected', Boolean(isSelected));
};

const applyWorldScale = (scaleValue) => {
  if (!worldGrid) {
    return;
  }
  const parsed = Number(scaleValue);
  const clamped = Number.isNaN(parsed) ? 1 : Math.min(1.4, Math.max(0.8, parsed));
  worldGrid.style.setProperty('--world-tile-scale', clamped);
  if (worldScaleInput) {
    worldScaleInput.value = clamped.toFixed(1);
  }
  localStorage.setItem('worldTileScale', String(clamped));
};

const saveState = () => {
  if (activeWorldId && worlds[activeWorldId]) {
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
      encounterDraft,
      partyMembers,
      roundHistoryEntries,
      calendarEvents,
      combatActive,
      encounterPresets,
      worldStats,
      worldMap,
      coverImage: worldCoverImage,
      worldNotes,
      questBoard,
      downtimeEntries,
      npcDirectory,
      factionRoster,
      rumorBoard,
      sessionNotes,
      campaignMilestones,
      encounterPlans,
      monsterBooks,
      activeMonsterBookId
    };
  }
  fetch('/api/state', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ worlds, activeWorldId })
  }).catch((error) => {
    console.error('Failed to save state', error);
  });
};

const loadState = async () => {
  try {
    const response = await fetch('/api/state');
    if (!response.ok) {
      return false;
    }
    const parsed = await response.json();
    if (
      parsed &&
      parsed.worlds &&
      Object.prototype.hasOwnProperty.call(parsed, 'activeWorldId')
    ) {
      worlds = parsed.worlds;
      activeWorldId = parsed.activeWorldId;
      return true;
    }
  } catch (error) {
    console.error('Failed to load stored data', error);
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
  setWorldSelectedState(true);
  calendarView = null;
  totalSeconds = nextWorld.totalSeconds ?? 0;
  combatants = Array.isArray(nextWorld.combatants) ? nextWorld.combatants : [];
  currentCombatantIndex = nextWorld.currentCombatantIndex ?? 0;
  selectedCombatantId = nextWorld.selectedCombatantId ?? null;
  selectedPartyMemberId = null;
  calendarSettings = normalizeCalendarSettings(
    nextWorld.calendarSettings || calendarSettings
  );
  timeConfig = normalizeTimeConfig(nextWorld.timeConfig || timeConfig);
  timeConfig = {
    ...timeConfig,
    turnSeconds: 6,
    shortRestHours: 1,
    longRestHours: 8
  };
  roundNumber = nextWorld.roundNumber ?? 1;
  combatLogEntries = Array.isArray(nextWorld.combatLogEntries)
    ? nextWorld.combatLogEntries
    : [];
  encounterDraft = Array.isArray(nextWorld.encounterDraft)
    ? nextWorld.encounterDraft
    : [];
  roundHistoryEntries = Array.isArray(nextWorld.roundHistoryEntries)
    ? nextWorld.roundHistoryEntries
    : [];
  calendarEvents = Array.isArray(nextWorld.calendarEvents)
    ? nextWorld.calendarEvents.map((event) => ({
      ...event,
      type: event.type || 'general',
      actorType: event.actorType || 'player'
    }))
    : [];
  encounterPresets = Array.isArray(nextWorld.encounterPresets)
    ? nextWorld.encounterPresets
    : [];
  worldStats = {
    distanceTravelled: Number(nextWorld.worldStats?.distanceTravelled) || 0,
    encountersCompleted: Number(nextWorld.worldStats?.encountersCompleted) || 0
  };
  worldMap = {
    image: nextWorld.worldMap?.image || '',
    zoom: Number(nextWorld.worldMap?.zoom) || 1,
    offsetX: Number(nextWorld.worldMap?.offsetX) || 0,
    offsetY: Number(nextWorld.worldMap?.offsetY) || 0,
    markers: Array.isArray(nextWorld.worldMap?.markers)
      ? nextWorld.worldMap.markers.map((marker) => ({
        ...marker,
        url: marker.url || ''
      }))
      : []
  };
  worldNotes = nextWorld.worldNotes || '';
  worldCoverImage = nextWorld.coverImage || '';
  questBoard = Array.isArray(nextWorld.questBoard) ? nextWorld.questBoard : [];
  downtimeEntries = Array.isArray(nextWorld.downtimeEntries)
    ? nextWorld.downtimeEntries
    : [];
  npcDirectory = Array.isArray(nextWorld.npcDirectory) ? nextWorld.npcDirectory : [];
  factionRoster = Array.isArray(nextWorld.factionRoster)
    ? nextWorld.factionRoster
    : [];
  rumorBoard = Array.isArray(nextWorld.rumorBoard) ? nextWorld.rumorBoard : [];
  sessionNotes = Array.isArray(nextWorld.sessionNotes) ? nextWorld.sessionNotes : [];
  campaignMilestones = Array.isArray(nextWorld.campaignMilestones)
    ? nextWorld.campaignMilestones
    : [];
  encounterPlans = Array.isArray(nextWorld.encounterPlans)
    ? nextWorld.encounterPlans
    : [];
  if (Array.isArray(nextWorld.monsterBooks)) {
    monsterBooks = normalizeMonsterBooks(nextWorld.monsterBooks);
  } else if (Array.isArray(nextWorld.monsterManual)) {
    const legacyBook = createMonsterBook('Monster Manual', nextWorld.monsterManual);
    monsterBooks = [legacyBook];
  } else {
    monsterBooks = [createMonsterBook('Monster Manual', baseMonsterPresets)];
  }
  activeMonsterBookId = nextWorld.activeMonsterBookId || monsterBooks[0]?.id || null;
  if (!getMonsterBookById(activeMonsterBookId) && monsterBooks.length > 0) {
    activeMonsterBookId = monsterBooks[0].id;
  }
  activeMonsterId = null;
  editingMonsterId = null;
  partyMembers = Array.isArray(nextWorld.partyMembers)
    ? nextWorld.partyMembers.map((member) => ({
      ...member,
      conditions: normalizeConditions(member.conditions),
      coins: {
        copper: Number(member.coins?.copper) || 0,
        silver: Number(member.coins?.silver) || 0,
        gold: Number(member.coins?.gold) || 0,
        platinum: Number(member.coins?.platinum) || 0
      },
      notes: member.notes || '',
      totalDamageTaken: Number(member.totalDamageTaken) || 0,
      deathSaves: {
        success: Number(member.deathSaves?.success) || 0,
        fail: Number(member.deathSaves?.fail) || 0
      }
    }))
    : [];
  combatActive = Boolean(nextWorld.combatActive);
  if (monthsInYearInput) {
    monthsInYearInput.value = calendarSettings.monthsInYear;
    hoursPerDayInput.value = calendarSettings.hoursPerDay;
    daysPerMonthInput.value = calendarSettings.daysPerMonth.join(', ');
    monthNamesInput.value = calendarSettings.monthNames.join(', ');
    dayNamesInput.value = calendarSettings.dayNames.join(', ');
  }
  if (worldNotesInput) {
    worldNotesInput.value = worldNotes;
  }
  syncInputs();
  syncTimeConfigInputs();
  render();
  renderInitiative();
  renderProfile();
  renderCombatLog();
  renderRoundHistory();
  renderEncounterDraft();
  renderPartyList();
  renderPartyProfile();
  renderWorldTiles();
  updateAdvanceLabels();
  updateRoundDisplay();
  updateStartCombatButton();
  renderCalendar();
  renderTimeline();
  renderStats();
  renderWorldMap();
  renderEncounterPresets();
  renderQuestBoard();
  renderDowntimeTracker();
  renderNpcDirectory();
  renderFactionRoster();
  renderRumorBoard();
  renderSessionNotes();
  renderCampaignMilestones();
  renderEncounterPlans();
  renderMonsterManual();
  renderCombatantPresets();
  renderMonsterDetail();
  saveState();
};

const renderWorldTiles = () => {
  if (!worldGrid) {
    return;
  }
  worldGrid.innerHTML = '';
  const worldList = Object.values(worlds);
  if (worldList.length === 0) {
    const emptyTile = document.createElement('div');
    emptyTile.className = 'world-tile world-tile--empty';
    emptyTile.setAttribute('role', 'button');
    emptyTile.setAttribute('tabindex', '0');
    emptyTile.setAttribute('aria-label', 'Create your first world');

    const title = document.createElement('div');
    title.className = 'world-name';
    title.textContent = 'Create your first world';

    const helper = document.createElement('div');
    helper.className = 'world-helper';
    helper.textContent = 'Start a new campaign and jump right in.';

    emptyTile.append(title, helper);
    emptyTile.addEventListener('click', () => {
      requestWorldCreation();
    });
    emptyTile.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        requestWorldCreation();
      }
    });
    worldGrid.appendChild(emptyTile);
    return;
  }

  worldList.forEach((world) => {
    const tile = document.createElement('div');
    tile.className = `world-tile${world.id === activeWorldId ? ' active' : ''}`;
    tile.dataset.worldId = world.id;

    const cover = document.createElement('div');
    cover.className = 'world-cover';
    if (world.coverImage) {
      cover.style.backgroundImage = `url("${world.coverImage}")`;
    }

    const name = document.createElement('div');
    name.className = 'world-name';
    name.textContent = world.name;

    const editButton = document.createElement('button');
    editButton.className = 'icon-button world-edit-button';
    editButton.type = 'button';
    editButton.setAttribute('aria-label', `Edit ${world.name}`);
    editButton.textContent = '✎';
    editButton.addEventListener('click', (event) => {
      event.stopPropagation();
      openWorldEditModal(world.id);
    });

    tile.append(cover, name, editButton);
    tile.addEventListener('click', () => {
      setActiveWorld(world.id);
      window.location.href = 'party.html';
    });
    worldGrid.appendChild(tile);
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
  if (isEditingTimeInputs || !yearInput) {
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
  if (!turnSecondsInput) {
    return;
  }
  turnSecondsInput.value = timeConfig.turnSeconds;
  shortRestHoursInput.value = timeConfig.shortRestHours;
  longRestHoursInput.value = timeConfig.longRestHours;
  clockSpeedInput.value = timeConfig.clockSpeed;
};

const updateAdvanceLabels = () => {
  if (!nextTurnButton) {
    return;
  }
  nextTurnButton.textContent = `Next Turn (+${timeConfig.turnSeconds}s)`;
  shortRestButton.textContent = `Short Rest (+${timeConfig.shortRestHours}h)`;
  longRestButton.textContent = `Long Rest (+${timeConfig.longRestHours}h)`;
};

const updateRoundDisplay = () => {
  if (!roundDisplay) {
    return;
  }
  roundDisplay.textContent = `Round ${roundNumber}`;
};

const getEventTypeLabel = (value) =>
  EVENT_TYPES.find((type) => type.value === value)?.label || 'Event';

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
  const dateParts = fromTotalSeconds(entry.timestamp, calendarSettings);
  return `Round ${entry.round} • ${formatDate(dateParts, calendarSettings)} @ ${formatTime(
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

const getEventFilterValue = (selectElement) =>
  selectElement?.value && selectElement.value !== 'all'
    ? selectElement.value
    : null;

const ensureActorOptions = (selectElement, includeAll) => {
  if (!selectElement || selectElement.options.length > 0) {
    return;
  }
  EVENT_ACTORS.filter((actor) => includeAll || actor.value !== 'all').forEach(
    (actor) => {
      const option = document.createElement('option');
      option.value = actor.value;
      option.textContent = actor.label;
      selectElement.appendChild(option);
    }
  );
  if (!includeAll) {
    selectElement.value = 'player';
  }
};

const getEventActorLabel = (actorType) =>
  EVENT_ACTORS.find((entry) => entry.value === actorType)?.label || 'Unknown';

const ensureEventTypeOptions = (selectElement, includeAll) => {
  if (!selectElement || selectElement.options.length > 0) {
    return;
  }
  EVENT_TYPES.filter((type) => includeAll || type.value !== 'all').forEach(
    (type) => {
      const option = document.createElement('option');
      option.value = type.value;
      option.textContent = type.label;
      selectElement.appendChild(option);
    }
  );
  if (!includeAll) {
    selectElement.value = 'general';
  }
};

const getDaysInMonth = (month, settings) =>
  settings.daysPerMonth[month - 1] || 30;

const getDayOfYearIndex = (month, day, settings) => {
  const daysBeforeMonth = settings.daysPerMonth
    .slice(0, month - 1)
    .reduce((sum, value) => sum + value, 0);
  return daysBeforeMonth + (day - 1);
};

const setCalendarViewToCurrent = () => {
  const dateParts = fromTotalSeconds(totalSeconds, calendarSettings);
  calendarView = { month: dateParts.month, year: dateParts.year };
};

const syncCalendarEventInputs = () => {
  if (!eventMonthInput || !eventYearInput || !eventDayInput) {
    return;
  }
  if (!calendarView) {
    setCalendarViewToCurrent();
  }
  eventMonthInput.value = calendarView.month;
  eventYearInput.value = calendarView.year;
  if (!eventDayInput.value) {
    eventDayInput.value = 1;
  }
};

const renderCalendar = () => {
  if (!calendarGrid) {
    return;
  }
  if (!calendarView) {
    setCalendarViewToCurrent();
  }
  ensureEventTypeOptions(eventTypeInput, false);
  ensureActorOptions(eventActorInput, false);
  ensureEventTypeOptions(calendarFilterSelect, true);
  ensureActorOptions(calendarActorFilterSelect, true);
  const { month, year } = calendarView;
  const monthName = calendarSettings.monthNames[month - 1] || `Month ${month}`;
  if (calendarMonthLabel) {
    calendarMonthLabel.textContent = `${monthName} • Year ${year}`;
  }

  calendarGrid.innerHTML = '';
  const columnCount = calendarSettings.dayNames.length || 7;
  calendarGrid.style.setProperty('--calendar-columns', columnCount);

  if (calendarSettings.dayNames.length > 0) {
    calendarSettings.dayNames.forEach((dayName) => {
      const header = document.createElement('div');
      header.className = 'calendar-cell calendar-header';
      header.textContent = dayName;
      calendarGrid.appendChild(header);
    });
  }

  const daysInMonth = getDaysInMonth(month, calendarSettings);
  const dayOfWeekIndex =
    calendarSettings.dayNames.length > 0
      ? getDayOfYearIndex(month, 1, calendarSettings) %
        calendarSettings.dayNames.length
      : 0;
  for (let i = 0; i < dayOfWeekIndex; i += 1) {
    const spacer = document.createElement('div');
    spacer.className = 'calendar-cell calendar-empty';
    calendarGrid.appendChild(spacer);
  }

  const today = fromTotalSeconds(totalSeconds, calendarSettings);
  for (let day = 1; day <= daysInMonth; day += 1) {
    const dayCell = document.createElement('button');
    dayCell.type = 'button';
    dayCell.className = 'calendar-cell calendar-day';
    if (
      today.year === year &&
      today.month === month &&
      today.day === day
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
      if (eventDayInput) {
        eventDayInput.value = day;
      }
      if (eventMonthInput) {
        eventMonthInput.value = month;
      }
      if (eventYearInput) {
        eventYearInput.value = year;
      }
    });
    calendarGrid.appendChild(dayCell);
  }

  renderCalendarEventsList();
  syncCalendarEventInputs();
};

const renderCalendarEventsList = () => {
  if (!calendarEventList || !calendarView) {
    return;
  }
  calendarEventList.innerHTML = '';
  const activeFilter = getEventFilterValue(calendarFilterSelect);
  const activeActor = getEventFilterValue(calendarActorFilterSelect);
  const { month, year } = calendarView;
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
  dateText.textContent = formatDate(
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
      calendarEvents = calendarEvents.filter((entry) => entry.id !== event.id);
      renderCalendar();
      renderTimeline();
      renderSessionNotes();
      saveState();
    });

    item.append(content, remove);
    calendarEventList.appendChild(item);
  });
};

const getEventDateKey = (event) =>
  `${event.year.toString().padStart(4, '0')}-${event.month
    .toString()
    .padStart(2, '0')}-${event.day.toString().padStart(2, '0')}`;

const buildTimelineEvents = () =>
  calendarEvents
    .map((event) => ({
      ...event,
      dateKey: getEventDateKey(event)
    }))
    .sort((a, b) => a.dateKey.localeCompare(b.dateKey));

const renderTimeline = () => {
  if (!timelineList) {
    return;
  }
  ensureEventTypeOptions(timelineFilterSelect, true);
  ensureActorOptions(timelineActorFilterSelect, true);
  const activeFilter = getEventFilterValue(timelineFilterSelect);
  const activeActor = getEventFilterValue(timelineActorFilterSelect);
  timelineList.innerHTML = '';
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
    dateText.textContent = formatDate(
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
      calendarEvents = calendarEvents.filter((entry) => entry.id !== event.id);
      renderCalendar();
      renderTimeline();
      renderSessionNotes();
      saveState();
    });
    actions.append(toggle, remove);

    item.append(meta, title, actions, details);
    timelineList.appendChild(item);
  });
  renderPartyNav();
};

const renderStats = () => {
  if (!partyDamageList) {
    return;
  }
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
      encounterDraft = preset.encounterDraft.map((entry) => ({ ...entry }));
      renderEncounterDraft();
      saveState();
    });

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'ghost';
    removeButton.textContent = 'Delete';
    removeButton.addEventListener('click', () => {
      encounterPresets = encounterPresets.filter((entry) => entry.id !== preset.id);
      renderEncounterPresets();
      saveState();
    });

    actions.append(loadButton, removeButton);
    item.append(label, actions);
    encounterPresetList.appendChild(item);
  });
};

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
      questBoard = questBoard.map((entry) =>
        entry.id === quest.id
          ? {
            ...entry,
            status: entry.status === 'completed' ? 'open' : 'completed'
          }
          : entry
      );
      renderQuestBoard();
      saveState();
    });
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'ghost';
    remove.textContent = 'Delete';
    remove.addEventListener('click', () => {
      questBoard = questBoard.filter((entry) => entry.id !== quest.id);
      renderQuestBoard();
      saveState();
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
      downtimeEntries = downtimeEntries.filter((itemEntry) => itemEntry.id !== entry.id);
      renderDowntimeTracker();
      saveState();
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

const getCurrentDateParts = () => fromTotalSeconds(totalSeconds, calendarSettings);

const formatOptionalDate = (date) => {
  if (!date || !date.day || !date.month || !date.year) {
    return 'No date set.';
  }
  return formatDate(date, calendarSettings);
};

const getCalendarEventById = (eventId) =>
  calendarEvents.find((event) => event.id === eventId);

const updateFactionOptions = () => {
  if (!factionOptions) {
    return;
  }
  factionOptions.innerHTML = '';
  factionRoster
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((faction) => {
      const option = document.createElement('option');
      option.value = faction.name;
      factionOptions.appendChild(option);
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
  npcDirectory
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
        npcDirectory = npcDirectory.map((entry) =>
          entry.id === npc.id ? { ...entry, status: nextStatus } : entry
        );
        renderNpcDirectory();
        saveState();
      });
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'ghost';
      remove.textContent = 'Remove';
      remove.addEventListener('click', () => {
        npcDirectory = npcDirectory.filter((entry) => entry.id !== npc.id);
        renderNpcDirectory();
        saveState();
      });
      actions.append(toggleStatus, remove);

      item.append(header, meta, notes, actions);
      npcList.appendChild(item);
    });
};

const updateMonsterBookError = (message = '') => {
  if (monsterBookError) {
    monsterBookError.textContent = message;
  }
};

const renderMonsterBookSelect = () => {
  if (!monsterBookSelect) {
    return;
  }
  monsterBookSelect.innerHTML = '';
  if (!activeWorldId || monsterBooks.length === 0) {
    const option = document.createElement('option');
    option.value = '';
    option.textContent = 'No books available';
    monsterBookSelect.appendChild(option);
    monsterBookSelect.disabled = true;
    return;
  }
  monsterBookSelect.disabled = false;
  monsterBooks
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((book) => {
      const option = document.createElement('option');
      option.value = book.id;
      option.textContent = book.name;
      monsterBookSelect.appendChild(option);
    });
  if (!getMonsterBookById(activeMonsterBookId)) {
    activeMonsterBookId = monsterBooks[0]?.id || null;
  }
  monsterBookSelect.value = activeMonsterBookId || '';
};

const renderMonsterManual = () => {
  if (!monsterList) {
    return;
  }
  monsterList.innerHTML = '';
  renderMonsterBookSelect();
  if (!activeWorldId) {
    const item = document.createElement('li');
    item.className = 'helper-text';
    item.textContent = 'Select a world to manage its monster manual.';
    monsterList.appendChild(item);
    return;
  }
  const activeBook = getActiveMonsterBook();
  if (!activeBook) {
    const item = document.createElement('li');
    item.className = 'helper-text';
    item.textContent = 'Select or create a monster book to get started.';
    monsterList.appendChild(item);
    return;
  }
  if (activeBook.monsters.length === 0) {
    const item = document.createElement('li');
    item.className = 'helper-text';
    item.textContent = 'No monsters saved in this book yet.';
    monsterList.appendChild(item);
    return;
  }
  const query = monsterSearchInput?.value.trim().toLowerCase() || '';
  const filtered = activeBook.monsters.filter((monster) => {
    if (!query) {
      return true;
    }
    const haystack = `${monster.name} ${monster.type} ${monster.meta || ''} ${monster.notes || ''} ${monster.challenge || ''}`.toLowerCase();
    return haystack.includes(query);
  });
  if (filtered.length === 0) {
    const item = document.createElement('li');
    item.className = 'helper-text';
    item.textContent = 'No monsters match that search.';
    monsterList.appendChild(item);
    return;
  }
  filtered
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((monster) => {
      const item = document.createElement('li');
      item.className = 'quest-item';

      const header = document.createElement('div');
      header.className = 'quest-header';
      const title = document.createElement('span');
      title.textContent = monster.name;
      const typeTag = document.createElement('span');
      typeTag.className = 'timeline-tag';
      typeTag.textContent = monster.meta || monster.type || 'npc';
      header.append(title, typeTag);

      const meta = document.createElement('div');
      meta.className = 'monster-meta';
      const metaParts = [];
      if (monster.armorClass) {
        metaParts.push(`AC ${monster.armorClass}`);
      }
      if (monster.hitPoints) {
        metaParts.push(`HP ${monster.hitPoints}`);
      } else if (Number.isFinite(monster.maxHp)) {
        metaParts.push(`HP ${monster.maxHp}`);
      }
      if (monster.challenge) {
        metaParts.push(`CR ${monster.challenge}`);
      }
      meta.textContent = metaParts.length ? metaParts.join(' • ') : 'Details unavailable.';

      const content = document.createElement('div');
      content.className = 'monster-content';
      const previewImage = monster.imageUrls?.[0] || monster.imageUrl;
      if (previewImage) {
        const image = document.createElement('img');
        image.className = 'monster-image';
        image.alt = monster.name;
        image.loading = 'lazy';
        image.src = previewImage;
        content.appendChild(image);
      }

      const details = document.createElement('div');
      details.className = 'monster-details';
      const statLine = document.createElement('div');
      statLine.className = 'monster-meta';
      const statParts = [
        monster.stats?.str ? `STR ${monster.stats.str}${monster.stats.strMod || ''}` : '',
        monster.stats?.dex ? `DEX ${monster.stats.dex}${monster.stats.dexMod || ''}` : '',
        monster.stats?.con ? `CON ${monster.stats.con}${monster.stats.conMod || ''}` : '',
        monster.stats?.int ? `INT ${monster.stats.int}${monster.stats.intMod || ''}` : '',
        monster.stats?.wis ? `WIS ${monster.stats.wis}${monster.stats.wisMod || ''}` : '',
        monster.stats?.cha ? `CHA ${monster.stats.cha}${monster.stats.chaMod || ''}` : ''
      ].filter(Boolean);
      statLine.textContent = statParts.join(' • ');

      const extra = document.createElement('div');
      extra.className = 'monster-meta';
      const extraParts = [
        monster.savingThrows ? `Saves: ${monster.savingThrows}` : '',
        monster.skills ? `Skills: ${monster.skills}` : '',
        monster.senses ? `Senses: ${monster.senses}` : '',
        monster.languages ? `Languages: ${monster.languages}` : '',
        monster.speed ? `Speed: ${monster.speed}` : ''
      ].filter(Boolean);
      extra.textContent = extraParts.join(' • ');

      const preview = document.createElement('div');
      preview.className = 'event-description';
      const previewSource = [
        monster.notes,
        monster.traits,
        monster.actions,
        monster.legendaryActions
      ]
        .filter(Boolean)
        .join(' ');
      preview.textContent = truncateText(previewSource || 'No notes recorded.', 160);

      details.append(statLine, extra, preview);
      content.appendChild(details);

      const actions = document.createElement('div');
      actions.className = 'button-row';
      const view = document.createElement('button');
      view.type = 'button';
      view.className = 'ghost';
      view.textContent = 'View';
      view.addEventListener('click', () => {
        window.location.href = `monster.html?id=${monster.id}`;
      });
      actions.append(view);

      item.append(header, meta, content, actions);
      monsterList.appendChild(item);
    });
};

const renderCombatantPresets = () => {
  if (!combatantPresetSelect) {
    return;
  }
  combatantPresetSelect.innerHTML = '';
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'Custom';
  combatantPresetSelect.appendChild(defaultOption);
  const activeBook = getActiveMonsterBook();
  if (!activeBook) {
    return;
  }
  activeBook.monsters
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((preset) => {
      const option = document.createElement('option');
      option.value = preset.id;
      option.textContent = preset.name;
      combatantPresetSelect.appendChild(option);
    });
};

const createMonsterImageCarousel = (images, name) => {
  const urls = normalizeImageUrls(images);
  const wrapper = document.createElement('div');
  wrapper.className = 'stat-block-carousel';
  if (urls.length === 0) {
    return wrapper;
  }
  const image = document.createElement('img');
  image.className = 'stat-block-image';
  image.alt = name;
  image.loading = 'lazy';
  const controls = document.createElement('div');
  controls.className = 'carousel-controls';
  const prev = document.createElement('button');
  prev.type = 'button';
  prev.className = 'ghost';
  prev.textContent = 'Prev';
  const next = document.createElement('button');
  next.type = 'button';
  next.className = 'ghost';
  next.textContent = 'Next';
  const indicator = document.createElement('span');
  indicator.className = 'carousel-indicator';
  let index = 0;
  const update = () => {
    image.src = urls[index];
    indicator.textContent = `${index + 1} / ${urls.length}`;
    prev.disabled = urls.length <= 1;
    next.disabled = urls.length <= 1;
  };
  prev.addEventListener('click', () => {
    index = (index - 1 + urls.length) % urls.length;
    update();
  });
  next.addEventListener('click', () => {
    index = (index + 1) % urls.length;
    update();
  });
  update();
  controls.append(prev, indicator, next);
  wrapper.append(image);
  if (urls.length > 1) {
    wrapper.appendChild(controls);
  }
  return wrapper;
};

const renderMonsterDetail = () => {
  if (!monsterDetailPanel || !monsterDetailContent) {
    return;
  }
  const activeBook = getActiveMonsterBook();
  const selectedMonster = activeBook?.monsters.find(
    (monster) => monster.id === activeMonsterId
  );
  if (!selectedMonster) {
    monsterDetailPanel.hidden = true;
    if (monsterListPanel) {
      monsterListPanel.hidden = false;
    }
    if (deleteMonsterButton) {
      deleteMonsterButton.hidden = true;
    }
    return;
  }
  monsterDetailPanel.hidden = false;
  if (monsterListPanel) {
    monsterListPanel.hidden = true;
  }
  if (deleteMonsterButton) {
    deleteMonsterButton.hidden = !editingMonsterId;
  }
  monsterDetailContent.innerHTML = '';
  if (monsterDetailRelated) {
    monsterDetailRelated.innerHTML = '';
  }

  const block = document.createElement('div');
  block.className = 'stat-block';

  const header = document.createElement('div');
  header.className = 'stat-block-header';
  const title = document.createElement('h2');
  title.textContent = selectedMonster.name;
  const meta = document.createElement('div');
  meta.className = 'stat-block-meta';
  meta.textContent = selectedMonster.meta || selectedMonster.type || '';
  header.append(title, meta);

  const top = document.createElement('div');
  top.className = 'stat-block-top';
  const detailImages =
    selectedMonster.imageUrls?.length > 0
      ? selectedMonster.imageUrls
      : selectedMonster.imageUrl
        ? [selectedMonster.imageUrl]
        : [];
  if (detailImages.length > 0) {
    top.appendChild(createMonsterImageCarousel(detailImages, selectedMonster.name));
  }

  const core = document.createElement('div');
  core.className = 'stat-block-core';
  const coreFields = [
    ['Armor Class', selectedMonster.armorClass],
    [
      'Hit Points',
      selectedMonster.hitPoints ||
        (Number.isFinite(selectedMonster.maxHp) ? selectedMonster.maxHp : '')
    ],
    ['Speed', selectedMonster.speed]
  ];
  coreFields.forEach(([label, value]) => {
    if (!value) {
      return;
    }
    const row = document.createElement('div');
    row.className = 'stat-block-row';
    const labelEl = document.createElement('span');
    labelEl.textContent = `${label} `;
    const valueEl = document.createElement('span');
    valueEl.textContent = value;
    row.append(labelEl, valueEl);
    core.appendChild(row);
  });

  const abilities = document.createElement('div');
  abilities.className = 'stat-block-abilities';
  const abilityData = [
    ['STR', selectedMonster.stats?.str, selectedMonster.stats?.strMod],
    ['DEX', selectedMonster.stats?.dex, selectedMonster.stats?.dexMod],
    ['CON', selectedMonster.stats?.con, selectedMonster.stats?.conMod],
    ['INT', selectedMonster.stats?.int, selectedMonster.stats?.intMod],
    ['WIS', selectedMonster.stats?.wis, selectedMonster.stats?.wisMod],
    ['CHA', selectedMonster.stats?.cha, selectedMonster.stats?.chaMod]
  ];
  abilityData.forEach(([label, score, mod]) => {
    if (!score) {
      return;
    }
    const cell = document.createElement('div');
    cell.className = 'stat-block-ability';
    const labelEl = document.createElement('span');
    labelEl.textContent = label;
    const valueEl = document.createElement('strong');
    valueEl.textContent = mod ? `${score} ${mod}` : score;
    cell.append(labelEl, valueEl);
    abilities.appendChild(cell);
  });

  const sections = [];
  const addSection = (titleText, contentText) => {
    if (!contentText) {
      return;
    }
    const section = document.createElement('div');
    section.className = 'stat-block-section';
    const titleEl = document.createElement('h3');
    titleEl.textContent = titleText;
    const bodyEl = document.createElement('p');
    bodyEl.textContent = contentText;
    section.append(titleEl, bodyEl);
    sections.push(section);
  };

  addSection('Saving Throws', selectedMonster.savingThrows);
  addSection('Skills', selectedMonster.skills);
  addSection('Senses', selectedMonster.senses);
  addSection('Languages', selectedMonster.languages);
  addSection('Challenge', selectedMonster.challenge);
  addSection('Traits', selectedMonster.traits);
  addSection('Actions', selectedMonster.actions);
  addSection('Legendary Actions', selectedMonster.legendaryActions);
  addSection('Notes', selectedMonster.notes);

  top.appendChild(core);
  block.append(header, top, abilities, ...sections);
  monsterDetailContent.appendChild(block);

  if (monsterDetailRelated) {
    const related = monsterBooks
      .filter((book) => book.id !== activeBook?.id)
      .flatMap((book) =>
        book.monsters
          .filter(
            (monster) => monster.name.toLowerCase() === selectedMonster.name.toLowerCase()
          )
          .map((monster) => ({ ...monster, bookName: book.name, bookId: book.id }))
      );
    if (related.length > 0) {
      const heading = document.createElement('h3');
      heading.textContent = 'Other versions';
      monsterDetailRelated.appendChild(heading);
      const list = document.createElement('div');
      list.className = 'monster-related-list';
      related.forEach((monster) => {
        const card = document.createElement('div');
        card.className = 'monster-related-card';
        const title = document.createElement('strong');
        title.textContent = `${monster.name} (${monster.bookName})`;
        const meta = document.createElement('div');
        meta.className = 'monster-meta';
        meta.textContent = monster.meta || monster.type || '';
        const view = document.createElement('button');
        view.type = 'button';
        view.className = 'ghost';
        view.textContent = 'View';
        view.addEventListener('click', () => {
          activeMonsterBookId = monster.bookId;
          setActiveMonster(monster.id);
          saveState();
        });
        card.append(title, meta, view);
        list.appendChild(card);
      });
      monsterDetailRelated.appendChild(list);
    }
  }
};

const resetMonsterForm = () => {
  if (monsterNameInput) {
    monsterNameInput.value = '';
  }
  if (monsterTypeInput) {
    monsterTypeInput.value = '';
  }
  if (monsterMaxHpInput) {
    monsterMaxHpInput.value = '';
  }
  if (monsterImageInput) {
    monsterImageInput.value = '';
  }
  if (monsterNotesInput) {
    monsterNotesInput.value = '';
  }
};

const setMonsterEditState = (isEditing) => {
  if (!isEditing) {
    editingMonsterId = null;
  }
  if (addMonsterButton) {
    addMonsterButton.textContent = isEditing ? 'Save Monster' : 'Add Monster';
  }
  if (cancelMonsterEditButton) {
    cancelMonsterEditButton.hidden = !isEditing;
  }
  if (deleteMonsterButton) {
    deleteMonsterButton.hidden = !isEditing;
  }
};

const startMonsterEdit = (monster) => {
  if (!monster) {
    return;
  }
  editingMonsterId = monster.id;
  if (monsterNameInput) {
    monsterNameInput.value = monster.name || '';
  }
  if (monsterTypeInput) {
    monsterTypeInput.value = monster.type || '';
  }
  if (monsterMaxHpInput) {
    monsterMaxHpInput.value = Number.isFinite(monster.maxHp) ? monster.maxHp : '';
  }
  if (monsterImageInput) {
    const urls =
      monster.imageUrls?.length > 0
        ? monster.imageUrls
        : monster.imageUrl
          ? [monster.imageUrl]
          : [];
    monsterImageInput.value = urls.join('\n');
  }
  if (monsterNotesInput) {
    monsterNotesInput.value = monster.notes || '';
  }
  setMonsterEditState(true);
};

const cancelMonsterEdit = () => {
  editingMonsterId = null;
  resetMonsterForm();
  setMonsterEditState(false);
  renderMonsterDetail();
};

const deleteActiveMonster = () => {
  const activeBook = getActiveMonsterBook();
  if (!activeBook || !activeMonsterId) {
    return;
  }
  const target = activeBook.monsters.find((monster) => monster.id === activeMonsterId);
  if (!target) {
    return;
  }
  const confirmed = window.confirm(`Delete ${target.name}? This cannot be undone.`);
  if (!confirmed) {
    return;
  }
  activeBook.monsters = activeBook.monsters.filter((monster) => monster.id !== target.id);
  activeMonsterId = null;
  cancelMonsterEdit();
  renderMonsterManual();
  renderCombatantPresets();
  renderMonsterDetail();
  saveState();
};

const updateMonsterImportError = (message = '') => {
  if (monsterImportError) {
    monsterImportError.textContent = message;
  }
};

const addMonsterToManual = (monster) => {
  if (!activeWorldId) {
    window.alert('Select a world before adding monsters.');
    return false;
  }
  const activeBook = getActiveMonsterBook();
  if (!activeBook) {
    updateMonsterBookError('Create a monster book first.');
    return false;
  }
  if (getMonsterManualByName(monster.name)) {
    updateMonsterImportError(`"${monster.name}" is already in this manual.`);
    return false;
  }
  activeBook.monsters = [...activeBook.monsters, monster];
  renderMonsterManual();
  renderCombatantPresets();
  saveState();
  return true;
};

const handleAddMonsterBook = () => {
  if (!monsterBookNameInput) {
    return;
  }
  const name = monsterBookNameInput.value.trim();
  if (!name) {
    monsterBookNameInput.focus();
    return;
  }
  if (getMonsterBookByName(name)) {
    updateMonsterBookError('That book already exists.');
    return;
  }
  const book = createMonsterBook(name, []);
  monsterBooks = [...monsterBooks, book];
  activeMonsterBookId = book.id;
  updateMonsterBookError('');
  renderMonsterManual();
  renderCombatantPresets();
  saveState();
  monsterBookNameInput.value = '';
};

const handleExportMonsterBook = () => {
  const activeBook = getActiveMonsterBook();
  if (!activeBook) {
    updateMonsterBookError('Select a book to export.');
    return;
  }
  const payload = {
    name: activeBook.name,
    monsters: activeBook.monsters
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: 'application/json'
  });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  const safeName = activeBook.name.replace(/[^\w.-]+/g, '-');
  link.download = `${safeName || 'monster-book'}.json`;
  link.click();
  URL.revokeObjectURL(link.href);
};

const handleAddMonster = () => {
  if (!monsterNameInput) {
    return;
  }
  const name = monsterNameInput.value.trim();
  if (!name) {
    monsterNameInput.focus();
    return;
  }
  const type = monsterTypeInput?.value.trim() || 'npc';
  const maxHpValue = Number(monsterMaxHpInput?.value);
  const maxHp = Number.isNaN(maxHpValue) ? null : Math.max(0, maxHpValue);
  const imageUrls = normalizeImageUrls(monsterImageInput?.value);
  const imageUrl = imageUrls[0] || '';
  const notes = monsterNotesInput?.value.trim() || '';
  const activeBook = getActiveMonsterBook();
  if (!activeBook) {
    updateMonsterBookError('Create a monster book first.');
    return;
  }
  if (editingMonsterId) {
    const existing = activeBook.monsters.find((monster) => monster.id === editingMonsterId);
    if (!existing) {
      updateMonsterImportError('Select a monster to edit.');
      return;
    }
    const duplicate = activeBook.monsters.find(
      (monster) =>
        monster.id !== existing.id &&
        monster.name.toLowerCase() === name.toLowerCase()
    );
    if (duplicate) {
      updateMonsterImportError('Another monster with that name already exists.');
      return;
    }
    const meta =
      existing.meta && existing.meta !== existing.type ? existing.meta : type;
    const updated = {
      ...existing,
      name,
      type,
      meta,
      maxHp,
      imageUrl,
      imageUrls,
      notes
    };
    activeBook.monsters = activeBook.monsters.map((monster) =>
      monster.id === existing.id ? updated : monster
    );
    updateMonsterImportError('');
    setMonsterEditState(false);
    resetMonsterForm();
    renderMonsterManual();
    renderMonsterDetail();
    renderCombatantPresets();
    saveState();
    return;
  }
  const entry = normalizeMonsterEntry({
    name,
    type,
    maxHp,
    imageUrl,
    imageUrls,
    notes
  });
  if (!entry) {
    return;
  }
  updateMonsterImportError('');
  if (addMonsterToManual(entry)) {
    resetMonsterForm();
    if (monsterNameInput) {
      monsterNameInput.focus();
    }
  }
};

const handleImportMonsters = () => {
  if (!monsterImportInput) {
    return;
  }
  const raw = monsterImportInput.value.trim();
  if (!raw) {
    updateMonsterImportError('Paste some JSON to import.');
    return;
  }
  try {
    const parsed = JSON.parse(raw);
    const entries = Array.isArray(parsed)
      ? parsed
      : Array.isArray(parsed?.monsters)
        ? parsed.monsters
        : null;
    if (!entries) {
      throw new Error('JSON must be an array or an object with a monsters array.');
    }
    const bookName =
      String(parsed?.name || monsterBookNameInput?.value || '').trim() ||
      getActiveMonsterBook()?.name ||
      '';
    if (!bookName) {
      updateMonsterImportError('Provide a book name before importing.');
      return;
    }
    const targetBook = ensureMonsterBook(bookName);
    if (!targetBook) {
      updateMonsterImportError('Provide a valid book name.');
      return;
    }
    const normalized = normalizeMonsterManual(entries);
    if (normalized.length === 0) {
      updateMonsterImportError('No valid monsters found in the JSON.');
      return;
    }
    const additions = normalized.filter((monster) =>
      targetBook.monsters.every(
        (existing) => existing.name.toLowerCase() !== monster.name.toLowerCase()
      )
    );
    if (additions.length === 0) {
      updateMonsterImportError('All imported monsters already exist.');
      return;
    }
    updateMonsterImportError('');
    targetBook.monsters = [...targetBook.monsters, ...additions];
    activeMonsterBookId = targetBook.id;
    renderMonsterManual();
    renderCombatantPresets();
    saveState();
    monsterImportInput.value = '';
    if (monsterBookNameInput) {
      monsterBookNameInput.value = '';
    }
  } catch (error) {
    updateMonsterImportError('Invalid JSON. Please check the format.');
  }
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
        factionRoster = factionRoster.filter((entry) => entry.id !== faction.id);
        renderFactionRoster();
        renderNpcDirectory();
        saveState();
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
      rumorBoard = rumorBoard.map((entry) =>
        entry.id === rumor.id ? { ...entry, revealed: !entry.revealed } : entry
      );
      renderRumorBoard();
      saveState();
    });
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'ghost';
    remove.textContent = 'Remove';
    remove.addEventListener('click', () => {
      rumorBoard = rumorBoard.filter((entry) => entry.id !== rumor.id);
      renderRumorBoard();
      saveState();
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
      option.textContent = `${formatDate(
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
        sessionNotes = sessionNotes.filter((entry) => entry.id !== note.id);
        renderSessionNotes();
        saveState();
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
      campaignMilestones = campaignMilestones.map((entry) =>
        entry.id === milestone.id ? { ...entry, status: nextStatus } : entry
      );
      renderCampaignMilestones();
      saveState();
    });
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'ghost';
    remove.textContent = 'Remove';
    remove.addEventListener('click', () => {
      campaignMilestones = campaignMilestones.filter(
        (entry) => entry.id !== milestone.id
      );
      renderCampaignMilestones();
      saveState();
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
      encounterPlans = encounterPlans.filter((entry) => entry.id !== plan.id);
      renderEncounterPlans();
      saveState();
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

const handleMapDragStart = (event) => {
  if (!mapViewport) {
    return;
  }
  mapViewport.dataset.dragging = 'true';
  mapViewport.classList.add('is-dragging');
  mapViewport.dataset.dragStartX = event.clientX;
  mapViewport.dataset.dragStartY = event.clientY;
  mapViewport.dataset.dragOriginX = worldMap.offsetX;
  mapViewport.dataset.dragOriginY = worldMap.offsetY;
};

const handleMapDragMove = (event) => {
  if (!mapViewport || mapViewport.dataset.dragging !== 'true') {
    return;
  }
  const startX = Number(mapViewport.dataset.dragStartX) || 0;
  const startY = Number(mapViewport.dataset.dragStartY) || 0;
  const originX = Number(mapViewport.dataset.dragOriginX) || 0;
  const originY = Number(mapViewport.dataset.dragOriginY) || 0;
  worldMap.offsetX = originX + (event.clientX - startX);
  worldMap.offsetY = originY + (event.clientY - startY);
  renderWorldMap();
};

const handleMapDragEnd = () => {
  if (!mapViewport) {
    return;
  }
  mapViewport.dataset.dragging = 'false';
  mapViewport.classList.remove('is-dragging');
  saveState();
};

const addMapMarker = (event) => {
  if (!mapImage || !mapViewport || !worldMap.image) {
    return;
  }
  const rect = mapImage.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) {
    return;
  }
  const label = window.prompt('Label this location');
  if (!label) {
    return;
  }
  const url = window
    .prompt('Optional wiki URL for this location', '')
    ?.trim() || '';
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;
  worldMap.markers = [
    ...worldMap.markers,
    { id: crypto.randomUUID(), label: label.trim(), url, x, y }
  ];
  renderWorldMap();
  saveState();
};

const renderWorldMap = () => {
  if (!mapImage || !mapViewport || !mapMarkers) {
    return;
  }
  mapImage.src = worldMap.image || '';
  if (mapZoomInput) {
    mapZoomInput.value = worldMap.zoom;
  }
  const transform = `translate(${worldMap.offsetX}px, ${worldMap.offsetY}px) scale(${worldMap.zoom})`;
  mapImage.style.transform = transform;
  mapMarkers.style.transform = transform;
  mapMarkers.innerHTML = '';
  worldMap.markers.forEach((marker) => {
    const pin = document.createElement('button');
    pin.className = 'map-marker';
    pin.textContent = marker.label;
    pin.style.left = `${marker.x}%`;
    pin.style.top = `${marker.y}%`;
    if (marker.url) {
      pin.addEventListener('click', () => {
        window.open(marker.url, '_blank', 'noopener');
      });
    }
    mapMarkers.appendChild(pin);
  });
  if (mapTagList) {
    mapTagList.innerHTML = '';
    if (worldMap.markers.length === 0) {
      const item = document.createElement('li');
      item.className = 'helper-text';
      item.textContent = 'No map tags added yet.';
      mapTagList.appendChild(item);
    } else {
      worldMap.markers.forEach((marker) => {
        const item = document.createElement('li');
        const name = document.createElement('span');
        name.textContent = marker.label;

        const actions = document.createElement('div');
        actions.className = 'button-row';

        const link = document.createElement('a');
        link.className = 'ghost nav-link';
        link.textContent = marker.url ? 'Wiki' : 'No Wiki';
        link.href = marker.url || '#';
        link.target = '_blank';
        link.rel = 'noopener';
        link.addEventListener('click', (event) => {
          if (!marker.url) {
            event.preventDefault();
          }
        });

        const edit = document.createElement('button');
        edit.type = 'button';
        edit.className = 'ghost';
        edit.textContent = 'Edit';
        edit.addEventListener('click', () => {
          const nextLabel = window.prompt('Edit label', marker.label) || marker.label;
          const nextUrl =
            window.prompt('Edit wiki URL', marker.url || '')?.trim() || '';
          worldMap.markers = worldMap.markers.map((entry) =>
            entry.id === marker.id
              ? { ...entry, label: nextLabel.trim(), url: nextUrl }
              : entry
          );
          renderWorldMap();
          saveState();
        });

        const remove = document.createElement('button');
        remove.type = 'button';
        remove.className = 'ghost';
        remove.textContent = 'Remove';
        remove.addEventListener('click', () => {
          worldMap.markers = worldMap.markers.filter((entry) => entry.id !== marker.id);
          renderWorldMap();
          saveState();
        });

        actions.append(link, edit, remove);
        item.append(name, actions);
        mapTagList.appendChild(item);
      });
    }
  }
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

const getInitials = (name) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || '?';

const closeXpMenus = () => {
  document.querySelectorAll('.xp-menu.is-open').forEach((menu) => {
    menu.classList.remove('is-open');
  });
};

const closeConditionPopovers = () => {
  document.querySelectorAll('.condition-popover.is-open').forEach((popover) => {
    popover.classList.remove('is-open');
  });
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

const normalizeConditions = (conditions) => {
  if (Array.isArray(conditions)) {
    return conditions
      .map((condition) => {
        if (!condition) {
          return null;
        }
        if (typeof condition === 'string') {
          return { name: condition.trim(), duration: null, unit: null, rule: null };
        }
        if (typeof condition === 'object') {
          return {
            name: String(condition.name || '').trim(),
            duration: Number.isFinite(condition.duration) ? condition.duration : null,
            unit: condition.unit || null,
            rule: condition.rule ? String(condition.rule).trim() : null
          };
        }
        return null;
      })
      .filter((condition) => condition && condition.name.length > 0);
  }
  if (typeof conditions === 'string') {
    return conditions
      .split(',')
      .map((condition) => condition.trim())
      .filter(Boolean)
      .map((name) => ({ name, duration: null, unit: null, rule: null }));
  }
  return [];
};

const formatConditionLabel = (condition) => {
  if (!condition) {
    return '';
  }
  const name = condition.name;
  const timeLabel =
    condition.duration && condition.unit
      ? `${condition.duration} ${condition.unit}`
      : null;
  const ruleLabel = condition.rule || null;
  const extras = [timeLabel, ruleLabel].filter(Boolean);
  if (extras.length > 0) {
    return `${name} • ${extras.join(' • ')}`;
  }
  return name;
};

const addConditionToMember = (memberId, value, duration, unit, rule) => {
  const condition = String(value || '').trim();
  if (!condition) {
    return;
  }
  const member = partyMembers.find((entry) => entry.id === memberId);
  if (!member) {
    return;
  }
  const conditions = normalizeConditions(member.conditions);
  const normalized = String(condition || '').trim();
  const durationValue = Number.isFinite(duration) ? duration : null;
  const unitValue = durationValue ? unit : null;
  const ruleValue = rule ? String(rule).trim() : null;
  if (conditions.some((entry) => entry.name === normalized)) {
    return;
  }
  updatePartyMember(memberId, {
    conditions: [
      ...conditions,
      { name: normalized, duration: durationValue, unit: unitValue, rule: ruleValue }
    ]
  });
};

const removeConditionFromMember = (memberId, conditionKey) => {
  const member = partyMembers.find((entry) => entry.id === memberId);
  if (!member) {
    return;
  }
  const conditions = normalizeConditions(member.conditions).filter((entry) => {
    const key = `${entry.name}|${entry.duration || ''}|${entry.unit || ''}|${
      entry.rule || ''
    }`;
    return key !== conditionKey;
  });
  updatePartyMember(memberId, { conditions });
};

const renderPartyList = () => {
  if (!partyList) {
    renderPartyNav();
    return;
  }
  partyList.innerHTML = '';
  if (partyMembers.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'helper-text';
    empty.textContent = 'No party members yet.';
    partyList.appendChild(empty);
    renderPartyNav();
    return;
  }
  partyMembers.forEach((member) => {
    const row = document.createElement('div');
    row.className = 'party-row';
    row.setAttribute('draggable', 'true');
    row.dataset.partyMemberId = member.id;

    const nameGroup = document.createElement('div');
    nameGroup.className = 'party-name';
    const name = document.createElement('span');
    name.textContent = member.name;
    nameGroup.appendChild(name);

    const conditionRow = document.createElement('div');
    conditionRow.className = 'condition-row';
    const conditionTags = document.createElement('div');
    conditionTags.className = 'condition-tags';
    const conditionAdd = document.createElement('button');
    conditionAdd.type = 'button';
    conditionAdd.className = 'ghost condition-add';
    conditionAdd.setAttribute('aria-label', `Add condition for ${member.name}`);
    conditionAdd.textContent = '+';

    const conditionPopover = document.createElement('div');
    conditionPopover.className = 'condition-popover';
    const conditionSelectLabel = document.createElement('label');
    conditionSelectLabel.textContent = 'Choose a condition';
    const conditionSelect = document.createElement('select');
    [
      '',
      'Blinded',
      'Charmed',
      'Deafened',
      'Exhaustion',
      'Frightened',
      'Grappled',
      'Incapacitated',
      'Invisible',
      'Paralyzed',
      'Petrified',
      'Poisoned',
      'Prone',
      'Restrained',
      'Stunned',
      'Unconscious'
    ].forEach((optionValue) => {
      const option = document.createElement('option');
      option.value = optionValue;
      option.textContent = optionValue || 'Select';
      conditionSelect.appendChild(option);
    });
    conditionSelectLabel.appendChild(conditionSelect);
    const conditionInputLabel = document.createElement('label');
    conditionInputLabel.textContent = 'Or type custom';
    const conditionInput = document.createElement('input');
    conditionInput.type = 'text';
    conditionInput.placeholder = 'e.g. Burning';
    conditionInputLabel.appendChild(conditionInput);
    const durationRow = document.createElement('div');
    durationRow.className = 'input-row';
    const durationLabel = document.createElement('label');
    durationLabel.textContent = 'Duration';
    const durationInput = document.createElement('input');
    durationInput.type = 'number';
    durationInput.min = '1';
    durationLabel.appendChild(durationInput);
    const unitLabel = document.createElement('label');
    unitLabel.textContent = 'Unit';
    const unitSelect = document.createElement('select');
    [
      { value: '', label: 'None' },
      { value: 'rounds', label: 'Rounds' },
      { value: 'hours', label: 'Hours' },
      { value: 'days', label: 'Days' }
    ].forEach((optionData) => {
      const option = document.createElement('option');
      option.value = optionData.value;
      option.textContent = optionData.label;
      unitSelect.appendChild(option);
    });
    unitLabel.appendChild(unitSelect);
    const ruleLabel = document.createElement('label');
    ruleLabel.textContent = 'Ruleset Tag';
    const ruleSelect = document.createElement('select');
    [
      { value: '', label: 'None' },
      { value: 'Save ends', label: 'Save ends' },
      { value: 'End of turn', label: 'End of turn' },
      { value: 'Start of turn', label: 'Start of turn' },
      { value: 'Short rest', label: 'Short rest' },
      { value: 'Long rest', label: 'Long rest' },
      { value: 'Until cured', label: 'Until cured' },
      { value: 'Ongoing', label: 'Ongoing' }
    ].forEach((optionData) => {
      const option = document.createElement('option');
      option.value = optionData.value;
      option.textContent = optionData.label;
      ruleSelect.appendChild(option);
    });
    ruleLabel.appendChild(ruleSelect);
    durationRow.append(durationLabel, unitLabel, ruleLabel);

    const conditionConfirm = document.createElement('button');
    conditionConfirm.type = 'button';
    conditionConfirm.className = 'primary';
    conditionConfirm.textContent = 'Add Condition';
    conditionConfirm.addEventListener('click', (event) => {
      event.stopPropagation();
      const value = conditionInput.value.trim() || conditionSelect.value;
      const durationValue = Number(durationInput.value);
      const duration = Number.isNaN(durationValue) ? null : durationValue;
      const unit = unitSelect.value || null;
      const rule = ruleSelect.value || null;
      addConditionToMember(member.id, value, duration, unit, rule);
      conditionInput.value = '';
      conditionSelect.value = '';
      durationInput.value = '';
      unitSelect.value = '';
      ruleSelect.value = '';
      conditionPopover.classList.remove('is-open');
    });
    conditionPopover.append(
      conditionSelectLabel,
      conditionInputLabel,
      durationRow,
      conditionConfirm
    );

    const memberConditions = normalizeConditions(member.conditions);
    memberConditions.forEach((condition) => {
      const tag = document.createElement('span');
      tag.className = 'condition-tag';
      tag.textContent = formatConditionLabel(condition);
      const key = `${condition.name}|${condition.duration || ''}|${condition.unit || ''}|${
        condition.rule || ''
      }`;
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'condition-remove';
      remove.setAttribute('aria-label', `Remove ${condition.name}`);
      remove.textContent = '✕';
      remove.addEventListener('click', (event) => {
        event.stopPropagation();
        removeConditionFromMember(member.id, key);
      });
      tag.appendChild(remove);
      conditionTags.appendChild(tag);
    });

    conditionAdd.addEventListener('click', (event) => {
      event.stopPropagation();
      conditionPopover.classList.toggle('is-open');
    });

    conditionRow.append(conditionTags, conditionAdd, conditionPopover);
    nameGroup.appendChild(conditionRow);

    const hpGroup = document.createElement('div');
    hpGroup.className = 'stat-group';
    const hpLabel = document.createElement('span');
    hpLabel.className = 'stat-label';
    hpLabel.textContent = 'HP';
    const hpControls = document.createElement('div');
    hpControls.className = 'stat-controls';
    const hpValue = Number.isFinite(member.currentHp)
      ? member.currentHp
      : member.maxHp ?? 0;
    const hpMax = Number.isFinite(member.maxHp) ? member.maxHp : 0;
    const hpMinus = document.createElement('button');
    hpMinus.type = 'button';
    hpMinus.textContent = '−';
    hpMinus.setAttribute('aria-label', `Decrease ${member.name} HP`);
    hpMinus.addEventListener('click', (event) => {
      event.stopPropagation();
      updatePartyMember(member.id, {
        currentHp: Math.max(0, (member.currentHp ?? hpMax ?? 0) - 1)
      });
    });
    const hpValueText = document.createElement('span');
    hpValueText.className = 'stat-value';
    hpValueText.textContent = `${hpValue}/${hpMax}`;
    const hpPlus = document.createElement('button');
    hpPlus.type = 'button';
    hpPlus.textContent = '+';
    hpPlus.setAttribute('aria-label', `Increase ${member.name} HP`);
    hpPlus.addEventListener('click', (event) => {
      event.stopPropagation();
      const next = (member.currentHp ?? hpMax ?? 0) + 1;
      updatePartyMember(member.id, {
        currentHp: hpMax ? Math.min(next, hpMax) : next
      });
    });
    hpControls.append(hpMinus, hpValueText, hpPlus);
    hpGroup.append(hpLabel, hpControls);

    const xpGroup = document.createElement('div');
    xpGroup.className = 'stat-group';
    const xpLabel = document.createElement('span');
    xpLabel.className = 'stat-label';
    xpLabel.textContent = 'XP';
    const xpControls = document.createElement('div');
    xpControls.className = 'stat-controls';
    const xpValue = Number.isFinite(member.xp) ? member.xp : 0;
    const xpMinus = document.createElement('button');
    xpMinus.type = 'button';
    xpMinus.textContent = '−';
    xpMinus.setAttribute('aria-label', `Decrease ${member.name} XP`);
    xpMinus.addEventListener('click', (event) => {
      event.stopPropagation();
      updatePartyMember(member.id, { xp: Math.max(0, xpValue - 1) });
    });
    const xpValueText = document.createElement('span');
    xpValueText.className = 'stat-value';
    xpValueText.textContent = String(xpValue);
    const xpPlus = document.createElement('button');
    xpPlus.type = 'button';
    xpPlus.className = 'xp-plus';
    xpPlus.textContent = '+';
    xpPlus.setAttribute('aria-label', `Increase ${member.name} XP`);
    let longPressTimer = null;
    let longPressTriggered = false;
    xpPlus.addEventListener('pointerdown', () => {
      longPressTriggered = false;
      longPressTimer = window.setTimeout(() => {
        longPressTriggered = true;
        closeXpMenus();
        xpMenu.classList.add('is-open');
      }, 600);
    });
    const clearLongPress = () => {
      if (longPressTimer) {
        window.clearTimeout(longPressTimer);
        longPressTimer = null;
      }
    };
    xpPlus.addEventListener('pointerup', clearLongPress);
    xpPlus.addEventListener('pointerleave', clearLongPress);
    xpPlus.addEventListener('click', (event) => {
      if (longPressTriggered) {
        longPressTriggered = false;
        event.preventDefault();
        return;
      }
      event.stopPropagation();
      updatePartyMember(member.id, { xp: xpValue + 1 });
    });
    xpControls.append(xpMinus, xpValueText, xpPlus);
    xpGroup.append(xpLabel, xpControls);

    const xpMenu = document.createElement('div');
    xpMenu.className = 'xp-menu';
    [10, 50, 100, 250, 500, 1000].forEach((amount) => {
      const option = document.createElement('button');
      option.type = 'button';
      option.textContent = `+${amount}`;
      option.addEventListener('click', (event) => {
        event.stopPropagation();
        updatePartyMember(member.id, { xp: xpValue + amount });
        xpMenu.classList.remove('is-open');
      });
      xpMenu.appendChild(option);
    });
    xpGroup.appendChild(xpMenu);

    const levelGroup = document.createElement('div');
    levelGroup.className = 'stat-group';
    const levelLabel = document.createElement('span');
    levelLabel.className = 'stat-label';
    levelLabel.textContent = 'Level';
    const levelControls = document.createElement('div');
    levelControls.className = 'stat-controls';
    const levelValue = Number.isFinite(member.level) ? member.level : 1;
    const levelValueText = document.createElement('span');
    levelValueText.className = 'stat-value';
    levelValueText.textContent = String(levelValue);
    const levelPlus = document.createElement('button');
    levelPlus.type = 'button';
    levelPlus.textContent = 'Level Up';
    levelPlus.className = 'level-up';
    levelPlus.setAttribute('aria-label', `Level up ${member.name}`);
    levelPlus.addEventListener('click', (event) => {
      event.stopPropagation();
      updatePartyMember(member.id, { level: levelValue + 1 });
    });
    levelControls.append(levelValueText, levelPlus);
    levelGroup.append(levelLabel, levelControls);

    const removeButton = document.createElement('button');
    removeButton.className = 'icon-button';
    removeButton.type = 'button';
    removeButton.textContent = '✕';
    removeButton.setAttribute('aria-label', `Remove ${member.name}`);
    removeButton.addEventListener('click', (event) => {
      event.stopPropagation();
      partyMembers = partyMembers.filter((entry) => entry.id !== member.id);
      if (selectedPartyMemberId === member.id) {
        selectedPartyMemberId = null;
      }
      renderPartyList();
      saveState();
    });

    row.append(nameGroup, hpGroup, xpGroup, levelGroup, removeButton);
    row.addEventListener('click', () => {
      selectedPartyMemberId = member.id;
      renderPartyProfile();
      openPartyProfileModal();
    });
    row.addEventListener('dragstart', () => {
      row.classList.add('dragging');
      row.dataset.dragging = 'true';
    });
    row.addEventListener('dragend', () => {
      row.classList.remove('dragging');
      row.removeAttribute('data-dragging');
      partyList
        .querySelectorAll('.party-row.drag-over')
        .forEach((element) => element.classList.remove('drag-over'));
    });
    row.addEventListener('dragover', (event) => {
      event.preventDefault();
      row.classList.add('drag-over');
    });
    row.addEventListener('dragleave', () => {
      row.classList.remove('drag-over');
    });
    row.addEventListener('drop', (event) => {
      event.preventDefault();
      row.classList.remove('drag-over');
      const dragging = partyList.querySelector('.party-row.dragging');
      if (!dragging || dragging === row) {
        return;
      }
      const fromId = dragging.dataset.partyMemberId;
      const toId = row.dataset.partyMemberId;
      if (!fromId || !toId) {
        return;
      }
      const fromIndex = partyMembers.findIndex((entry) => entry.id === fromId);
      const toIndex = partyMembers.findIndex((entry) => entry.id === toId);
      if (fromIndex === -1 || toIndex === -1) {
        return;
      }
      const updated = [...partyMembers];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      partyMembers = updated;
      renderPartyList();
      saveState();
    });
    partyList.appendChild(row);
  });
  renderPartyNav();
};

const renderPartyNav = () => {
  if (!navParty) {
    return;
  }
  navParty.innerHTML = '';
  if (partyMembers.length === 0) {
    return;
  }
  partyMembers.forEach((member) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'party-avatar-button';
    button.setAttribute('aria-label', `Open ${member.name} profile`);

    const avatar = document.createElement('div');
    avatar.className = 'combatant-avatar';
    avatar.textContent = getInitials(member.name);

    button.appendChild(avatar);
    button.addEventListener('click', () => {
      selectedPartyMemberId = member.id;
      renderPartyProfile();
      openPartyProfileModal();
    });
    navParty.appendChild(button);
  });
};

const updatePartyMember = (memberId, updates) => {
  if (!memberId) {
    return;
  }
  const { __skipDamageTracking, ...safeUpdates } = updates;
  partyMembers = partyMembers.map((member) =>
    member.id === memberId
      ? (() => {
        const next = { ...member, ...safeUpdates };
        if (safeUpdates.hasOwnProperty('coins')) {
          next.coins = {
            copper: Number(safeUpdates.coins?.copper) || 0,
            silver: Number(safeUpdates.coins?.silver) || 0,
            gold: Number(safeUpdates.coins?.gold) || 0,
            platinum: Number(safeUpdates.coins?.platinum) || 0
          };
        }
        if (
          safeUpdates.hasOwnProperty('currentHp') &&
          !__skipDamageTracking &&
          Number.isFinite(member.currentHp) &&
          Number.isFinite(next.currentHp)
        ) {
          const damage = Math.max(0, member.currentHp - next.currentHp);
          if (damage > 0) {
            next.totalDamageTaken = (member.totalDamageTaken || 0) + damage;
          }
        }
        return next;
      })()
      : member
  );
  renderPartyList();
  renderPartyProfile();
  renderStats();
  saveState();
};

const addPartyMember = () => {
  if (!partyMemberName) {
    return;
  }
  const name = partyMemberName.value.trim();
  if (!name) {
    partyMemberName.focus();
    return;
  }
  const maxHpValue = Number(partyMemberMaxHp.value);
  const xpValue = Number(partyMemberXp.value);
  const levelValue = Number(partyMemberLevel?.value);
  const maxHp = Number.isNaN(maxHpValue) ? null : maxHpValue;
  const newMember = {
    id: crypto.randomUUID(),
    name,
    maxHp,
    currentHp: maxHp,
    xp: Number.isNaN(xpValue) ? 0 : xpValue,
    level: Number.isNaN(levelValue) ? 1 : Math.max(1, levelValue),
    conditions: [],
    totalDamageTaken: 0,
    notes: '',
    coins: {
      copper: 0,
      silver: 0,
      gold: 0,
      platinum: 0
    },
    deathSaves: {
      success: 0,
      fail: 0
    }
  };
  partyMembers = [...partyMembers, newMember];
  partyMemberName.value = '';
  partyMemberMaxHp.value = '';
  partyMemberXp.value = '';
  if (partyMemberLevel) {
    partyMemberLevel.value = '';
  }
  partyMemberName.focus();
  renderPartyList();
  renderStats();
  saveState();
};

const addPartyToEncounter = () => {
  if (partyMembers.length === 0) {
    return;
  }
  const existingPartyNames = new Set(
    combatants
      .filter((combatant) => combatant.type === 'player')
      .map((combatant) => combatant.name)
  );
  const remainingParty = partyMembers.filter(
    (member) => !existingPartyNames.has(member.name)
  );
  if (remainingParty.length === 0) {
    const confirmed = window.confirm(
      'Party are already present. Do you want to add them again?'
    );
    if (!confirmed) {
      return;
    }
  } else if (remainingParty.length < partyMembers.length) {
    const confirmed = window.confirm(
      'Some party members are already present. Add the remaining party members?'
    );
    if (!confirmed) {
      return;
    }
  }
  const membersToAdd =
    remainingParty.length === 0 ? partyMembers : remainingParty;
  const newCombatants = membersToAdd.map((member) => ({
    id: crypto.randomUUID(),
    name: member.name,
    type: 'player',
    maxHp: member.maxHp,
    currentHp: member.currentHp ?? member.maxHp,
    initiative: null,
    conditions: normalizeConditions(member.conditions)
      .map((condition) => condition.name)
      .join(', '),
    notes: '',
    avatar: null
  }));
  combatants = [...combatants, ...newCombatants];
  renderInitiative();
  renderProfile();
  logEvent('Party added to initiative.');
  saveState();
};

const difficultyLabels = ['Easy', 'Easy', 'Medium', 'Hard', 'Deadly'];

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
  const activeBook = getActiveMonsterBook();
  if (!activeBook || activeBook.monsters.length === 0) {
    window.alert('Add monsters to the active book before generating encounters.');
    return;
  }
  encounterDraft = [];
  for (let i = 0; i < monsterCount; i += 1) {
    const preset =
      activeBook.monsters[Math.floor(Math.random() * activeBook.monsters.length)];
    const maxHp = getMonsterMaxHp(preset);
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
  combatants = [...combatants, ...newCombatants];
  renderInitiative();
  renderProfile();
  logEvent('Quick encounter added to initiative.');
  saveState();
};

const addCalendarEvent = () => {
  if (!eventTitleInput || !eventDayInput || !eventMonthInput || !eventYearInput) {
    return;
  }
  const title = eventTitleInput.value.trim() || 'Untitled Event';
  const month = Math.max(
    1,
    Math.min(calendarSettings.monthsInYear, Number(eventMonthInput.value) || 1)
  );
  const year = Math.max(1, Number(eventYearInput.value) || 1);
  const daysInMonth = getDaysInMonth(month, calendarSettings);
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
  calendarEvents = [...calendarEvents, newEvent];
  eventTitleInput.value = '';
  eventDescriptionInput.value = '';
  renderCalendar();
  renderTimeline();
  renderSessionNotes();
  saveState();
};

const changeCalendarMonth = (delta) => {
  if (!calendarView) {
    setCalendarViewToCurrent();
  }
  let nextMonth = calendarView.month + delta;
  let nextYear = calendarView.year;
  const monthsInYear = calendarSettings.monthsInYear;
  while (nextMonth < 1) {
    nextMonth += monthsInYear;
    nextYear -= 1;
  }
  while (nextMonth > monthsInYear) {
    nextMonth -= monthsInYear;
    nextYear += 1;
  }
  calendarView = { month: nextMonth, year: Math.max(1, nextYear) };
  renderCalendar();
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
  roundHistoryEntries = [];
  combatActive = false;
  updateRoundDisplay();
  updateStartCombatButton();
  renderRoundHistory();
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
  if (toggleClockButton) {
    toggleClockButton.textContent = 'Pause Clock';
  }
  localStorage.setItem('autoClockEnabled', 'true');
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
  if (toggleClockButton) {
    toggleClockButton.textContent = 'Start Clock';
  }
  localStorage.setItem('autoClockEnabled', 'false');
};

const render = () => {
  const dateParts = fromTotalSeconds(totalSeconds, calendarSettings);
  if (dateDisplay) {
    dateDisplay.textContent = formatDate(dateParts, calendarSettings);
  }
  const formattedTime = formatTime(dateParts);
  if (timeDisplay) {
    timeDisplay.textContent = formattedTime;
  }
  if (navTimeDisplay) {
    navTimeDisplay.textContent = formattedTime;
  }
};

const updateTimeFromInputs = () => {
  if (!yearInput) {
    return;
  }
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

const getInteractionAmountLabel = (action) => {
  switch (action) {
    case 'heal':
      return 'Healing';
    case 'buff':
      return 'Buff amount';
    case 'assist':
      return 'Assist amount';
    case 'attack':
    default:
      return 'Damage';
  }
};

const updateInteractionAmountLabel = (action) => {
  if (interactionAmountLabel) {
    interactionAmountLabel.textContent = getInteractionAmountLabel(action);
  }
};

const openInteractionModal = (sourceId, targetId) => {
  if (!interactionModal || !interactionSummary || !interactionTypeInput) {
    return false;
  }
  const source = combatants.find((entry) => entry.id === sourceId);
  const target = combatants.find((entry) => entry.id === targetId);
  if (!source || !target) {
    return false;
  }
  interactionSourceId = sourceId;
  interactionTargetId = targetId;
  interactionSummary.textContent = `${source.name} → ${target.name}`;
  interactionTypeInput.value = 'attack';
  updateInteractionAmountLabel('attack');
  if (interactionDamageInput) {
    interactionDamageInput.value = '';
  }
  if (interactionNotesInput) {
    interactionNotesInput.value = '';
  }
  interactionModal.classList.add('is-open');
  interactionModal.setAttribute('aria-hidden', 'false');
  return true;
};

const closeInteractionModal = () => {
  if (!interactionModal) {
    return;
  }
  interactionModal.classList.remove('is-open');
  interactionModal.setAttribute('aria-hidden', 'true');
  interactionSourceId = null;
  interactionTargetId = null;
};

const logInteraction = () => {
  if (!interactionSourceId || !interactionTargetId) {
    return false;
  }
  const source = combatants.find((entry) => entry.id === interactionSourceId);
  const target = combatants.find((entry) => entry.id === interactionTargetId);
  if (!source || !target) {
    return false;
  }
  const action = interactionTypeInput?.value || 'attack';
  const amountValue = Number(interactionDamageInput?.value);
  const amount = Number.isNaN(amountValue) ? 0 : Math.max(0, amountValue);
  const notes = interactionNotesInput?.value.trim();
  const appliedDamage = action === 'attack' && amount > 0;
  const appliedHealing = action === 'heal' && amount > 0;
  if (appliedDamage) {
    const nextHp = Math.max(0, (target.currentHp ?? 0) - amount);
    combatants = combatants.map((entry) =>
      entry.id === target.id ? { ...entry, currentHp: nextHp } : entry
    );
    renderInitiative();
    if (selectedCombatantId === target.id) {
      renderProfile();
    }
  }
  if (appliedHealing) {
    const maxHp = Number.isFinite(target.maxHp) ? target.maxHp : null;
    const nextHp = maxHp
      ? Math.min(maxHp, (target.currentHp ?? 0) + amount)
      : (target.currentHp ?? 0) + amount;
    combatants = combatants.map((entry) =>
      entry.id === target.id ? { ...entry, currentHp: nextHp } : entry
    );
    renderInitiative();
    if (selectedCombatantId === target.id) {
      renderProfile();
    }
  }
  const noteParts = [];
  if (appliedDamage) {
    noteParts.push(`-${amount} HP`);
  } else if (appliedHealing) {
    noteParts.push(`+${amount} HP`);
  } else if (amount > 0) {
    noteParts.push(`+${amount}`);
  }
  if (notes) {
    noteParts.push(notes);
  }
  const noteText = noteParts.length ? ` (${noteParts.join(' • ')})` : '';
  logEvent(`${source.name} ${action}s ${target.name}${noteText}.`);
  saveState();
  return true;
};

const toggleLiveClock = () => {
  if (autoClockTimer) {
    stopAutoClock();
  } else {
    startAutoClock();
  }
};

const renderInitiative = () => {
  if (!initiativeTrack) {
    return;
  }
  initiativeTrack.innerHTML = '';

  if (combatants.length === 0) {
    const emptyState = document.createElement('div');
    emptyState.className = 'helper-text';
    emptyState.textContent = 'No combatants yet. Add players or NPCs to begin.';
    initiativeTrack.appendChild(emptyState);
    return;
  }

  const handleDropAtIndex = (targetIndex) => {
    if (!draggedCombatantId) {
      return;
    }
    const fromIndex = combatants.findIndex(
      (item) => item.id === draggedCombatantId
    );
    if (fromIndex === -1 || targetIndex === fromIndex) {
      return;
    }
    const [moved] = combatants.splice(fromIndex, 1);
    const adjustedIndex = fromIndex < targetIndex ? targetIndex - 1 : targetIndex;
    combatants.splice(adjustedIndex, 0, moved);
    if (currentCombatantIndex === fromIndex) {
      currentCombatantIndex = adjustedIndex;
    } else if (
      currentCombatantIndex >= Math.min(fromIndex, adjustedIndex) &&
      currentCombatantIndex <= Math.max(fromIndex, adjustedIndex)
    ) {
      if (fromIndex < adjustedIndex) {
        currentCombatantIndex -= 1;
      } else {
        currentCombatantIndex += 1;
      }
    }
    renderInitiative();
    renderProfile();
    saveState();
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
      combatants = combatants.filter((entry) => entry.id !== combatant.id);
      if (currentCombatantIndex >= combatants.length) {
        currentCombatantIndex = 0;
      }
      if (selectedCombatantId === combatant.id) {
        selectedCombatantId = combatants[currentCombatantIndex]?.id ?? null;
      }
      renderInitiative();
      renderProfile();
      saveState();
    });

    container.append(hpBadge, avatar, name, initiative, removeButton);
    container.addEventListener('click', () => {
      selectedCombatantId = combatant.id;
      if (!combatActive) {
        currentCombatantIndex = index;
      }
      renderInitiative();
      renderProfile();
      openProfileModal();
    });
    container.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        selectedCombatantId = combatant.id;
        if (!combatActive) {
          currentCombatantIndex = index;
        }
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
      initiativeTrack
        .querySelectorAll('.initiative-drop-zone.is-active')
        .forEach((element) => element.classList.remove('is-active'));
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
      openInteractionModal(draggedCombatantId, combatant.id);
    });
    initiativeTrack.appendChild(container);
  });
  initiativeTrack.appendChild(createDropZone(combatants.length));
};

const renderProfile = () => {
  if (!profileDetails) {
    return;
  }
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

const renderPartyProfile = () => {
  if (!partyProfileDetails) {
    return;
  }
  const selected = partyMembers.find(
    (member) => member.id === selectedPartyMemberId
  );
  if (!selected) {
    emptyPartyProfile.hidden = false;
    partyProfileDetails.hidden = true;
    return;
  }
  emptyPartyProfile.hidden = true;
  partyProfileDetails.hidden = false;
  partyProfileName.value = selected.name;
  partyProfileCurrentHp.value =
    Number.isFinite(selected.currentHp) ? selected.currentHp : '';
  partyProfileMaxHp.value = Number.isFinite(selected.maxHp) ? selected.maxHp : '';
  partyProfileXp.value = Number.isFinite(selected.xp) ? selected.xp : '';
  if (partyProfileLevel) {
    partyProfileLevel.value = Number.isFinite(selected.level) ? selected.level : 1;
  }
  if (partyProfileNotes) {
    partyProfileNotes.value = selected.notes || '';
  }
  if (partyProfileCopper) {
    partyProfileCopper.value = Number.isFinite(selected.coins?.copper)
      ? selected.coins.copper
      : 0;
  }
  if (partyProfileSilver) {
    partyProfileSilver.value = Number.isFinite(selected.coins?.silver)
      ? selected.coins.silver
      : 0;
  }
  if (partyProfileGold) {
    partyProfileGold.value = Number.isFinite(selected.coins?.gold)
      ? selected.coins.gold
      : 0;
  }
  if (partyProfilePlatinum) {
    partyProfilePlatinum.value = Number.isFinite(selected.coins?.platinum)
      ? selected.coins.platinum
      : 0;
  }
  const successCount = Math.min(
    3,
    Math.max(0, Number(selected.deathSaves?.success) || 0)
  );
  const failCount = Math.min(
    3,
    Math.max(0, Number(selected.deathSaves?.fail) || 0)
  );
  if (partyDeathSaveSuccess1) {
    partyDeathSaveSuccess1.checked = successCount >= 1;
  }
  if (partyDeathSaveSuccess2) {
    partyDeathSaveSuccess2.checked = successCount >= 2;
  }
  if (partyDeathSaveSuccess3) {
    partyDeathSaveSuccess3.checked = successCount >= 3;
  }
  if (partyDeathSaveFail1) {
    partyDeathSaveFail1.checked = failCount >= 1;
  }
  if (partyDeathSaveFail2) {
    partyDeathSaveFail2.checked = failCount >= 2;
  }
  if (partyDeathSaveFail3) {
    partyDeathSaveFail3.checked = failCount >= 3;
  }
  if (partyProfileConditionTags) {
    partyProfileConditionTags.innerHTML = '';
    const conditions = normalizeConditions(selected.conditions);
    conditions.forEach((condition) => {
      const tag = document.createElement('span');
      tag.className = 'condition-tag';
      tag.textContent = formatConditionLabel(condition);
      const key = `${condition.name}|${condition.duration || ''}|${condition.unit || ''}|${
        condition.rule || ''
      }`;
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'condition-remove';
      remove.setAttribute('aria-label', `Remove ${condition.name}`);
      remove.textContent = '✕';
      remove.addEventListener('click', () => {
        removeConditionFromMember(selectedPartyMemberId, key);
      });
      tag.appendChild(remove);
      partyProfileConditionTags.appendChild(tag);
    });
  }
};

const openProfileModal = () => {
  profileModal.classList.add('is-open');
  profileModal.setAttribute('aria-hidden', 'false');
};

const closeProfileModal = () => {
  profileModal.classList.remove('is-open');
  profileModal.setAttribute('aria-hidden', 'true');
};

const openPartyProfileModal = () => {
  partyProfileModal.classList.add('is-open');
  partyProfileModal.setAttribute('aria-hidden', 'false');
};

const closePartyProfileModal = () => {
  partyProfileModal.classList.remove('is-open');
  partyProfileModal.setAttribute('aria-hidden', 'true');
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
  if (!combatantNameInput) {
    return;
  }
  const name = combatantNameInput.value.trim();
  if (!name) {
    combatantNameInput.focus();
    return;
  }

  const preset = getMonsterById(combatantPresetSelect.value);
  const maxHpValue = Number(combatantMaxHpInput.value);
  const maxHp = Number.isNaN(maxHpValue)
    ? getMonsterMaxHp(preset)
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
  if (!combatActive) {
    return;
  }
  if (combatants.length === 0) {
    return;
  }
  currentCombatantIndex =
    (currentCombatantIndex + 1) % combatants.length;
  if (currentCombatantIndex === 0) {
    roundNumber += 1;
    updateRoundDisplay();
    logEvent(`Round ${roundNumber} begins.`);
    recordRoundHistory(roundNumber);
  }
  renderInitiative();
  if (!selectedCombatantId) {
    selectedCombatantId = combatants[currentCombatantIndex]?.id ?? null;
    renderProfile();
  }
  saveState();
};

const startCombat = () => {
  if (combatActive) {
    return;
  }
  if (combatants.length === 0) {
    return;
  }
  stopAutoClock();
  combatActive = true;
  currentCombatantIndex = 0;
  selectedCombatantId = combatants[0]?.id ?? null;
  if (roundNumber < 1) {
    roundNumber = 1;
  }
  updateRoundDisplay();
  updateStartCombatButton();
  recordRoundHistory(roundNumber);
  renderInitiative();
  renderProfile();
  logEvent('Combat started.');
  saveState();
};

const endCombat = () => {
  if (!combatActive) {
    return;
  }
  combatActive = false;
  const roundCount =
    roundHistoryEntries.length > 0
      ? roundHistoryEntries[roundHistoryEntries.length - 1].round
      : roundNumber;
  const combatDate = fromTotalSeconds(totalSeconds, calendarSettings);
  calendarEvents = [
    ...calendarEvents,
    {
      id: crypto.randomUUID(),
      title: 'Combat concluded',
      description: `Encounter ended after ${roundCount} round${
        roundCount === 1 ? '' : 's'
      }.`,
      day: combatDate.day,
      month: combatDate.month,
      year: combatDate.year,
      type: 'combat'
    }
  ];
  worldStats = {
    ...worldStats,
    encountersCompleted: worldStats.encountersCompleted + 1
  };
  if (roundHistoryEntries.length > 0) {
    const historyEntries = roundHistoryEntries
      .map((entry) => `Combat history • ${formatRoundHistoryEntry(entry)}`);
    combatLogEntries = [...historyEntries, ...combatLogEntries].slice(0, 25);
  }
  roundHistoryEntries = [];
  roundNumber = 1;
  updateStartCombatButton();
  updateRoundDisplay();
  renderRoundHistory();
  renderCalendar();
  renderTimeline();
  renderStats();
  logEvent('Combat ended.');
  saveState();
};

if (setTimeButton) {
  setTimeButton.addEventListener('click', updateTimeFromInputs);
}
if (timeInputs.length > 0) {
  timeInputs.forEach((input) => {
    input.addEventListener('focus', updateTimeEditingState);
    input.addEventListener('blur', () => {
      window.setTimeout(updateTimeEditingState, 0);
    });
  });
}
if (nextTurnButton) {
  nextTurnButton.addEventListener('click', () => {
    adjustTime(timeConfig.turnSeconds * 1000);
    advanceCombatant();
    logEvent('Next turn.');
  });
}
if (shortRestButton) {
  shortRestButton.addEventListener('click', () => {
    adjustTime(timeConfig.shortRestHours * 60 * 60 * 1000);
    logEvent('Short rest taken.');
  });
}
if (longRestButton) {
  longRestButton.addEventListener('click', () => {
    adjustTime(timeConfig.longRestHours * 60 * 60 * 1000);
    logEvent('Long rest taken.');
  });
}
if (toggleClockButton) {
  toggleClockButton.addEventListener('click', () => {
    toggleLiveClock();
  });
}
if (navTimeDisplay) {
  navTimeDisplay.addEventListener('click', toggleLiveClock);
}
if (addCombatantButton) {
  addCombatantButton.addEventListener('click', addCombatant);
}
if (combatantNameInput) {
  combatantNameInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      addCombatant();
    }
  });
}
if (combatantPresetSelect) {
  combatantPresetSelect.addEventListener('change', () => {
    const preset = getMonsterById(combatantPresetSelect.value);
    if (!preset) {
      return;
    }
    if (combatantNameInput) {
      combatantNameInput.value = preset.name;
    }
    if (combatantTypeSelect) {
      combatantTypeSelect.value = preset.type;
    }
    if (combatantMaxHpInput) {
      const maxHp = getMonsterMaxHp(preset);
      combatantMaxHpInput.value = Number.isFinite(maxHp) ? maxHp : '';
    }
  });
}
if (rollAllButton) {
  rollAllButton.addEventListener('click', () => rollInitiative());
}
if (rollNpcsButton) {
  rollNpcsButton.addEventListener('click', () =>
    rollInitiative((combatant) => combatant.type === 'npc')
  );
}
if (sortInitiativeButton) {
  sortInitiativeButton.addEventListener('click', sortCombatantsByInitiative);
}
if (clearCombatButton) {
  clearCombatButton.addEventListener('click', clearEncounter);
}
if (addPartyToEncounterButton) {
  addPartyToEncounterButton.addEventListener('click', addPartyToEncounter);
}
if (addPartyMemberButton) {
  addPartyMemberButton.addEventListener('click', addPartyMember);
}
if (startCombatButton) {
  startCombatButton.addEventListener('click', () => {
    if (combatActive) {
      endCombat();
      return;
    }
    startCombat();
  });
}
if (combatNextTurnButton) {
  combatNextTurnButton.addEventListener('click', () => {
    adjustTime(6000);
    advanceCombatant();
    logEvent('Next turn.');
  });
}
if (calendarPrevButton) {
  calendarPrevButton.addEventListener('click', () => changeCalendarMonth(-1));
}
if (calendarNextButton) {
  calendarNextButton.addEventListener('click', () => changeCalendarMonth(1));
}
if (addEventButton) {
  addEventButton.addEventListener('click', addCalendarEvent);
}
if (calendarFilterSelect) {
  calendarFilterSelect.addEventListener('change', renderCalendarEventsList);
}
if (calendarActorFilterSelect) {
  calendarActorFilterSelect.addEventListener('change', renderCalendarEventsList);
}
if (timelineFilterSelect) {
  timelineFilterSelect.addEventListener('change', renderTimeline);
}
if (timelineActorFilterSelect) {
  timelineActorFilterSelect.addEventListener('change', renderTimeline);
}
if (saveWorldStatsButton) {
  saveWorldStatsButton.addEventListener('click', () => {
    worldStats = {
      distanceTravelled: Number(distanceTravelledInput?.value) || 0,
      encountersCompleted: Number(encountersCompletedInput?.value) || 0
    };
    renderStats();
    saveState();
  });
}
if (mapImageInput) {
  mapImageInput.addEventListener('change', () => {
    const file = mapImageInput.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      worldMap = {
        ...worldMap,
        image: reader.result,
        offsetX: 0,
        offsetY: 0,
        zoom: 1
      };
      renderWorldMap();
      saveState();
    };
    reader.readAsDataURL(file);
  });
}
if (mapZoomInput) {
  mapZoomInput.addEventListener('input', () => {
    worldMap = { ...worldMap, zoom: Number(mapZoomInput.value) || 1 };
    renderWorldMap();
    saveState();
  });
}
if (mapResetButton) {
  mapResetButton.addEventListener('click', () => {
    worldMap = { ...worldMap, offsetX: 0, offsetY: 0, zoom: 1 };
    renderWorldMap();
    saveState();
  });
}
if (mapViewport) {
  mapViewport.addEventListener('mousedown', handleMapDragStart);
  mapViewport.addEventListener('mousemove', handleMapDragMove);
  mapViewport.addEventListener('mouseup', handleMapDragEnd);
  mapViewport.addEventListener('mouseleave', handleMapDragEnd);
  mapViewport.addEventListener('dblclick', addMapMarker);
}
if (partyMemberName) {
  partyMemberName.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addPartyMember();
    }
  });
}
if (partyMemberMaxHp) {
  partyMemberMaxHp.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addPartyMember();
    }
  });
}
if (partyMemberXp) {
  partyMemberXp.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addPartyMember();
    }
  });
}
if (partyMemberLevel) {
  partyMemberLevel.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addPartyMember();
    }
  });
}
if (profileName) {
  profileName.addEventListener('input', () => {
    updateSelectedCombatant({ name: profileName.value.trim() || 'Unnamed' });
  });
}
if (profileType) {
  profileType.addEventListener('change', () => {
    updateSelectedCombatant({ type: profileType.value });
  });
}
if (profileCurrentHp) {
  profileCurrentHp.addEventListener('input', () => {
    const value = profileCurrentHp.value.trim();
    const parsed = Number(value);
    updateSelectedCombatant({
      currentHp: value === '' || Number.isNaN(parsed) ? null : parsed
    });
  });
}
if (profileMaxHp) {
  profileMaxHp.addEventListener('input', () => {
    const value = profileMaxHp.value.trim();
    const parsed = Number(value);
    updateSelectedCombatant({
      maxHp: value === '' || Number.isNaN(parsed) ? null : parsed
    });
  });
}
if (profileInitiative) {
  profileInitiative.addEventListener('input', () => {
    const value = profileInitiative.value.trim();
    const parsed = Number(value);
    updateSelectedCombatant({
      initiative: value === '' || Number.isNaN(parsed) ? null : parsed
    });
  });
}
if (profileConditions) {
  profileConditions.addEventListener('input', () => {
    updateSelectedCombatant({ conditions: profileConditions.value });
  });
}
if (profileNotes) {
  profileNotes.addEventListener('input', () => {
    updateSelectedCombatant({ notes: profileNotes.value });
  });
}
if (profileAvatar) {
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
}
if (partyProfileName) {
  partyProfileName.addEventListener('input', () => {
    if (!selectedPartyMemberId) {
      return;
    }
    updatePartyMember(selectedPartyMemberId, {
      name: partyProfileName.value.trim() || 'Unnamed'
    });
  });
}
if (partyProfileNotes) {
  partyProfileNotes.addEventListener('input', () => {
    if (!selectedPartyMemberId) {
      return;
    }
    updatePartyMember(selectedPartyMemberId, {
      notes: partyProfileNotes.value
    });
  });
}
const updatePartyCoins = (updates) => {
  if (!selectedPartyMemberId) {
    return;
  }
  const member = partyMembers.find((entry) => entry.id === selectedPartyMemberId);
  if (!member) {
    return;
  }
  updatePartyMember(selectedPartyMemberId, {
    coins: {
      copper: Math.max(0, updates.copper ?? member.coins?.copper ?? 0),
      silver: Math.max(0, updates.silver ?? member.coins?.silver ?? 0),
      gold: Math.max(0, updates.gold ?? member.coins?.gold ?? 0),
      platinum: Math.max(0, updates.platinum ?? member.coins?.platinum ?? 0)
    }
  });
};
const updatePartyDeathSaves = (successCount, failCount) => {
  if (!selectedPartyMemberId) {
    return;
  }
  updatePartyMember(selectedPartyMemberId, {
    deathSaves: {
      success: Math.min(3, Math.max(0, successCount)),
      fail: Math.min(3, Math.max(0, failCount))
    }
  });
};
const syncPartyDeathSavesFromInputs = () => {
  const successCount = [
    partyDeathSaveSuccess1,
    partyDeathSaveSuccess2,
    partyDeathSaveSuccess3
  ].filter((input) => input?.checked).length;
  const failCount = [
    partyDeathSaveFail1,
    partyDeathSaveFail2,
    partyDeathSaveFail3
  ].filter((input) => input?.checked).length;
  updatePartyDeathSaves(successCount, failCount);
};
if (partyProfileCopper) {
  partyProfileCopper.addEventListener('input', () => {
    updatePartyCoins({ copper: Number(partyProfileCopper.value) || 0 });
  });
}
if (partyProfileSilver) {
  partyProfileSilver.addEventListener('input', () => {
    updatePartyCoins({ silver: Number(partyProfileSilver.value) || 0 });
  });
}
if (partyProfileGold) {
  partyProfileGold.addEventListener('input', () => {
    updatePartyCoins({ gold: Number(partyProfileGold.value) || 0 });
  });
}
if (partyProfilePlatinum) {
  partyProfilePlatinum.addEventListener('input', () => {
    updatePartyCoins({ platinum: Number(partyProfilePlatinum.value) || 0 });
  });
}
if (partyDeathSaveSuccess1) {
  partyDeathSaveSuccess1.addEventListener('change', syncPartyDeathSavesFromInputs);
}
if (partyDeathSaveSuccess2) {
  partyDeathSaveSuccess2.addEventListener('change', syncPartyDeathSavesFromInputs);
}
if (partyDeathSaveSuccess3) {
  partyDeathSaveSuccess3.addEventListener('change', syncPartyDeathSavesFromInputs);
}
if (partyDeathSaveFail1) {
  partyDeathSaveFail1.addEventListener('change', syncPartyDeathSavesFromInputs);
}
if (partyDeathSaveFail2) {
  partyDeathSaveFail2.addEventListener('change', syncPartyDeathSavesFromInputs);
}
if (partyDeathSaveFail3) {
  partyDeathSaveFail3.addEventListener('change', syncPartyDeathSavesFromInputs);
}
if (resetPartyDeathSavesButton) {
  resetPartyDeathSavesButton.addEventListener('click', () => {
    updatePartyDeathSaves(0, 0);
  });
}
if (addQuestButton) {
  addQuestButton.addEventListener('click', () => {
    if (!questTitleInput) {
      return;
    }
    const title = questTitleInput.value.trim();
    if (!title) {
      questTitleInput.focus();
      return;
    }
    const deadlineDay = Number(questDeadlineDayInput?.value);
    const deadlineMonth = Number(questDeadlineMonthInput?.value);
    const deadlineYear = Number(questDeadlineYearInput?.value);
    const hasDeadline =
      Number.isFinite(deadlineDay) &&
      Number.isFinite(deadlineMonth) &&
      Number.isFinite(deadlineYear);
    const deadline = hasDeadline
      ? {
        day: Math.max(1, deadlineDay),
        month: Math.max(1, deadlineMonth),
        year: Math.max(1, deadlineYear)
      }
      : null;
    const quest = {
      id: crypto.randomUUID(),
      title,
      status: questStatusInput?.value || 'open',
      deadline,
      notes: questNotesInput?.value.trim() || ''
    };
    questBoard = [...questBoard, quest];
    questTitleInput.value = '';
    if (questNotesInput) {
      questNotesInput.value = '';
    }
    if (questDeadlineDayInput) {
      questDeadlineDayInput.value = '';
    }
    if (questDeadlineMonthInput) {
      questDeadlineMonthInput.value = '';
    }
    if (questDeadlineYearInput) {
      questDeadlineYearInput.value = '';
    }
    renderQuestBoard();
    saveState();
  });
}
if (addDowntimeButton) {
  addDowntimeButton.addEventListener('click', () => {
    if (!downtimeCharacterInput || !downtimeActivityInput) {
      return;
    }
    const character = downtimeCharacterInput.value.trim();
    const activity = downtimeActivityInput.value.trim();
    if (!character || !activity) {
      downtimeCharacterInput.focus();
      return;
    }
    const startDay = Number(downtimeStartDayInput?.value);
    const startMonth = Number(downtimeStartMonthInput?.value);
    const startYear = Number(downtimeStartYearInput?.value);
    const endDay = Number(downtimeEndDayInput?.value);
    const endMonth = Number(downtimeEndMonthInput?.value);
    const endYear = Number(downtimeEndYearInput?.value);
    if (
      !Number.isFinite(startDay) ||
      !Number.isFinite(startMonth) ||
      !Number.isFinite(startYear) ||
      !Number.isFinite(endDay) ||
      !Number.isFinite(endMonth) ||
      !Number.isFinite(endYear)
    ) {
      return;
    }
    const downtimeEntry = {
      id: crypto.randomUUID(),
      character,
      activity,
      start: {
        day: Math.max(1, startDay),
        month: Math.max(1, startMonth),
        year: Math.max(1, startYear)
      },
      end: {
        day: Math.max(1, endDay),
        month: Math.max(1, endMonth),
        year: Math.max(1, endYear)
      },
      notes: downtimeNotesInput?.value.trim() || ''
    };
    downtimeEntries = [...downtimeEntries, downtimeEntry];
    downtimeCharacterInput.value = '';
    downtimeActivityInput.value = '';
    if (downtimeNotesInput) {
      downtimeNotesInput.value = '';
    }
    if (downtimeStartDayInput) {
      downtimeStartDayInput.value = '';
    }
    if (downtimeStartMonthInput) {
      downtimeStartMonthInput.value = '';
    }
    if (downtimeStartYearInput) {
      downtimeStartYearInput.value = '';
    }
    if (downtimeEndDayInput) {
      downtimeEndDayInput.value = '';
    }
    if (downtimeEndMonthInput) {
      downtimeEndMonthInput.value = '';
    }
    if (downtimeEndYearInput) {
      downtimeEndYearInput.value = '';
    }
    renderDowntimeTracker();
    saveState();
  });
}
if (addNpcButton) {
  addNpcButton.addEventListener('click', () => {
    if (!npcNameInput) {
      return;
    }
    const name = npcNameInput.value.trim();
    if (!name) {
      npcNameInput.focus();
      return;
    }
    const npc = {
      id: crypto.randomUUID(),
      name,
      role: npcRoleInput?.value.trim() || '',
      status: npcStatusInput?.value || 'active',
      faction: npcFactionInput?.value.trim() || '',
      notes: npcNotesInput?.value.trim() || ''
    };
    npcDirectory = [...npcDirectory, npc];
    npcNameInput.value = '';
    if (npcRoleInput) {
      npcRoleInput.value = '';
    }
    if (npcStatusInput) {
      npcStatusInput.value = 'active';
    }
    if (npcFactionInput) {
      npcFactionInput.value = '';
    }
    if (npcNotesInput) {
      npcNotesInput.value = '';
    }
    renderNpcDirectory();
    saveState();
  });
}
if (addMonsterButton) {
  addMonsterButton.addEventListener('click', handleAddMonster);
}
if (monsterNameInput) {
  monsterNameInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddMonster();
    }
  });
}
if (monsterSearchInput) {
  monsterSearchInput.addEventListener('input', renderMonsterManual);
}
if (monsterImportInput) {
  monsterImportInput.addEventListener('input', () => updateMonsterImportError(''));
}
if (importMonstersButton) {
  importMonstersButton.addEventListener('click', handleImportMonsters);
}
if (monsterBookSelect) {
  monsterBookSelect.addEventListener('change', () => {
    activeMonsterBookId = monsterBookSelect.value || null;
    activeMonsterId = null;
    cancelMonsterEdit();
    updateMonsterBookError('');
    renderMonsterManual();
    renderCombatantPresets();
    renderMonsterDetail();
    saveState();
  });
}
if (monsterBookNameInput) {
  monsterBookNameInput.addEventListener('input', () => updateMonsterBookError(''));
  monsterBookNameInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddMonsterBook();
    }
  });
}
if (addMonsterBookButton) {
  addMonsterBookButton.addEventListener('click', handleAddMonsterBook);
}
if (exportMonsterBookButton) {
  exportMonsterBookButton.addEventListener('click', handleExportMonsterBook);
}
if (cancelMonsterEditButton) {
  cancelMonsterEditButton.addEventListener('click', cancelMonsterEdit);
}
if (closeMonsterDetailButton) {
  closeMonsterDetailButton.addEventListener('click', () => {
    if (isMonsterDetailPage()) {
      window.location.href = 'monsters.html';
      return;
    }
    setActiveMonster(null);
  });
}
if (editMonsterButton) {
  editMonsterButton.addEventListener('click', () => {
    const activeBook = getActiveMonsterBook();
    const selected = activeBook?.monsters.find(
      (monster) => monster.id === activeMonsterId
    );
    if (selected) {
      startMonsterEdit(selected);
    }
  });
}
if (deleteMonsterButton) {
  deleteMonsterButton.addEventListener('click', deleteActiveMonster);
}
if (addFactionButton) {
  addFactionButton.addEventListener('click', () => {
    if (!factionNameInput) {
      return;
    }
    const name = factionNameInput.value.trim();
    if (!name) {
      factionNameInput.focus();
      return;
    }
    const faction = {
      id: crypto.randomUUID(),
      name,
      influence: factionInfluenceInput?.value || 'medium',
      alignment: factionAlignmentInput?.value.trim() || '',
      notes: factionNotesInput?.value.trim() || ''
    };
    factionRoster = [...factionRoster, faction];
    factionNameInput.value = '';
    if (factionInfluenceInput) {
      factionInfluenceInput.value = 'medium';
    }
    if (factionAlignmentInput) {
      factionAlignmentInput.value = '';
    }
    if (factionNotesInput) {
      factionNotesInput.value = '';
    }
    renderFactionRoster();
    saveState();
  });
}
if (generateRumorButton) {
  generateRumorButton.addEventListener('click', () => {
    if (!rumorTitleInput || !rumorNotesInput || !rumorSourceInput || !rumorTagsInput) {
      return;
    }
    const hook = generateRumorHook();
    rumorTitleInput.value = hook.title;
    rumorNotesInput.value = hook.notes;
    rumorSourceInput.value = hook.source;
    rumorTagsInput.value = hook.tags.join(', ');
    if (rumorUrgencyInput && !rumorUrgencyInput.value) {
      rumorUrgencyInput.value = 'medium';
    }
  });
}
if (addRumorButton) {
  addRumorButton.addEventListener('click', () => {
    if (!rumorTitleInput) {
      return;
    }
    const title = rumorTitleInput.value.trim();
    if (!title) {
      rumorTitleInput.focus();
      return;
    }
    const rumor = {
      id: crypto.randomUUID(),
      title,
      source: rumorSourceInput?.value.trim() || '',
      urgency: rumorUrgencyInput?.value || 'medium',
      tags: parseTags(rumorTagsInput?.value),
      notes: rumorNotesInput?.value.trim() || '',
      revealed: Boolean(rumorRevealedInput?.checked)
    };
    rumorBoard = [...rumorBoard, rumor];
    rumorTitleInput.value = '';
    if (rumorSourceInput) {
      rumorSourceInput.value = '';
    }
    if (rumorUrgencyInput) {
      rumorUrgencyInput.value = 'medium';
    }
    if (rumorTagsInput) {
      rumorTagsInput.value = '';
    }
    if (rumorNotesInput) {
      rumorNotesInput.value = '';
    }
    if (rumorRevealedInput) {
      rumorRevealedInput.checked = false;
    }
    renderRumorBoard();
    saveState();
  });
}
if (addSessionNoteButton) {
  addSessionNoteButton.addEventListener('click', () => {
    if (!sessionNoteTitleInput) {
      return;
    }
    const title = sessionNoteTitleInput.value.trim();
    if (!title) {
      sessionNoteTitleInput.focus();
      return;
    }
    const createdAt = getCurrentDateParts();
    const note = {
      id: crypto.randomUUID(),
      title,
      eventId: sessionNoteEventSelect?.value || null,
      notes: sessionNoteNotesInput?.value.trim() || '',
      createdAt,
      createdAtKey: `${createdAt.year}-${createdAt.month
        .toString()
        .padStart(2, '0')}-${createdAt.day.toString().padStart(2, '0')}`
    };
    sessionNotes = [...sessionNotes, note];
    sessionNoteTitleInput.value = '';
    if (sessionNoteEventSelect) {
      sessionNoteEventSelect.value = '';
    }
    if (sessionNoteNotesInput) {
      sessionNoteNotesInput.value = '';
    }
    renderSessionNotes();
    saveState();
  });
}
if (addMilestoneButton) {
  addMilestoneButton.addEventListener('click', () => {
    if (!milestoneTitleInput) {
      return;
    }
    const title = milestoneTitleInput.value.trim();
    if (!title) {
      milestoneTitleInput.focus();
      return;
    }
    const dayValue = Number(milestoneDayInput?.value);
    const monthValue = Number(milestoneMonthInput?.value);
    const yearValue = Number(milestoneYearInput?.value);
    const hasDate =
      Number.isFinite(dayValue) && Number.isFinite(monthValue) && Number.isFinite(yearValue);
    const targetDate = hasDate
      ? {
        day: Math.max(1, dayValue),
        month: Math.max(1, monthValue),
        year: Math.max(1, yearValue)
      }
      : null;
    const milestone = {
      id: crypto.randomUUID(),
      title,
      status: milestoneStatusInput?.value || 'planned',
      targetDate,
      notes: milestoneNotesInput?.value.trim() || ''
    };
    campaignMilestones = [...campaignMilestones, milestone];
    milestoneTitleInput.value = '';
    if (milestoneStatusInput) {
      milestoneStatusInput.value = 'planned';
    }
    if (milestoneNotesInput) {
      milestoneNotesInput.value = '';
    }
    if (milestoneDayInput) {
      milestoneDayInput.value = '';
    }
    if (milestoneMonthInput) {
      milestoneMonthInput.value = '';
    }
    if (milestoneYearInput) {
      milestoneYearInput.value = '';
    }
    renderCampaignMilestones();
    saveState();
  });
}
if (addEncounterPlanButton) {
  addEncounterPlanButton.addEventListener('click', () => {
    if (!encounterPlanTitleInput) {
      return;
    }
    const title = encounterPlanTitleInput.value.trim();
    if (!title) {
      encounterPlanTitleInput.focus();
      return;
    }
    const roster = String(encounterPlanRosterInput?.value || '')
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
    const plan = {
      id: crypto.randomUUID(),
      title,
      threat: encounterPlanThreatInput?.value || 'medium',
      roster,
      notes: encounterPlanNotesInput?.value.trim() || ''
    };
    encounterPlans = [...encounterPlans, plan];
    encounterPlanTitleInput.value = '';
    if (encounterPlanThreatInput) {
      encounterPlanThreatInput.value = 'medium';
    }
    if (encounterPlanRosterInput) {
      encounterPlanRosterInput.value = '';
    }
    if (encounterPlanNotesInput) {
      encounterPlanNotesInput.value = '';
    }
    renderEncounterPlans();
    saveState();
  });
}
if (partyProfileCurrentHp) {
  partyProfileCurrentHp.addEventListener('input', () => {
    if (!selectedPartyMemberId) {
      return;
    }
    const value = partyProfileCurrentHp.value.trim();
    const parsed = Number(value);
    updatePartyMember(selectedPartyMemberId, {
      currentHp: value === '' || Number.isNaN(parsed) ? null : parsed
    });
  });
}
if (partyProfileMaxHp) {
  partyProfileMaxHp.addEventListener('input', () => {
    if (!selectedPartyMemberId) {
      return;
    }
    const value = partyProfileMaxHp.value.trim();
    const parsed = Number(value);
    const nextMax = value === '' || Number.isNaN(parsed) ? null : parsed;
    const current = partyMembers.find(
      (member) => member.id === selectedPartyMemberId
    );
    const nextCurrent =
      current && nextMax !== null && Number.isFinite(current.currentHp)
        ? Math.min(current.currentHp, nextMax)
        : current?.currentHp ?? null;
    updatePartyMember(selectedPartyMemberId, {
      maxHp: nextMax,
      currentHp: nextCurrent,
      __skipDamageTracking: true
    });
  });
}
if (partyProfileXp) {
  partyProfileXp.addEventListener('input', () => {
    if (!selectedPartyMemberId) {
      return;
    }
    const value = partyProfileXp.value.trim();
    const parsed = Number(value);
    updatePartyMember(selectedPartyMemberId, {
      xp: value === '' || Number.isNaN(parsed) ? 0 : Math.max(0, parsed)
    });
  });
}
if (partyProfileLevel) {
  partyProfileLevel.addEventListener('input', () => {
    if (!selectedPartyMemberId) {
      return;
    }
    const value = partyProfileLevel.value.trim();
    const parsed = Number(value);
    updatePartyMember(selectedPartyMemberId, {
      level: value === '' || Number.isNaN(parsed) ? 1 : Math.max(1, parsed)
    });
  });
}
if (partyProfileConditionAdd) {
  partyProfileConditionAdd.addEventListener('click', (event) => {
    event.stopPropagation();
    partyProfileConditionPopover?.classList.toggle('is-open');
  });
}
if (partyProfileConditionConfirm) {
  partyProfileConditionConfirm.addEventListener('click', (event) => {
    event.preventDefault();
    if (!selectedPartyMemberId) {
      return;
    }
    const value =
      partyProfileConditionInput?.value.trim() ||
      partyProfileConditionSelect?.value;
    const durationValue = Number(partyProfileConditionDuration?.value);
    const duration = Number.isNaN(durationValue) ? null : durationValue;
    const unit = partyProfileConditionUnit?.value || null;
    const rule = partyProfileConditionRule?.value || null;
    addConditionToMember(selectedPartyMemberId, value, duration, unit, rule);
    if (partyProfileConditionInput) {
      partyProfileConditionInput.value = '';
    }
    if (partyProfileConditionSelect) {
      partyProfileConditionSelect.value = '';
    }
    if (partyProfileConditionDuration) {
      partyProfileConditionDuration.value = '';
    }
    if (partyProfileConditionUnit) {
      partyProfileConditionUnit.value = '';
    }
    if (partyProfileConditionRule) {
      partyProfileConditionRule.value = '';
    }
    partyProfileConditionPopover?.classList.remove('is-open');
  });
}
if (profileCard) {
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
}
if (removeCombatantButton) {
  removeCombatantButton.addEventListener('click', removeSelectedCombatant);
}
if (closeProfileButton) {
  closeProfileButton.addEventListener('click', closeProfileModal);
}
if (profileBackdrop) {
  profileBackdrop.addEventListener('click', closeProfileModal);
}
if (closePartyProfileButton) {
  closePartyProfileButton.addEventListener('click', closePartyProfileModal);
}
if (partyProfileBackdrop) {
  partyProfileBackdrop.addEventListener('click', closePartyProfileModal);
}
if (closeWorldModalButton) {
  closeWorldModalButton.addEventListener('click', closeWorldModal);
}
if (worldModalBackdrop) {
  worldModalBackdrop.addEventListener('click', closeWorldModal);
}
if (cancelWorldButton) {
  cancelWorldButton.addEventListener('click', closeWorldModal);
}
if (closeWorldEditButton) {
  closeWorldEditButton.addEventListener('click', closeWorldEditModal);
}
if (worldEditBackdrop) {
  worldEditBackdrop.addEventListener('click', closeWorldEditModal);
}
if (cancelWorldEditButton) {
  cancelWorldEditButton.addEventListener('click', closeWorldEditModal);
}
if (confirmWorldEditButton) {
  confirmWorldEditButton.addEventListener('click', () => {
    if (saveWorldEdit()) {
      closeWorldEditModal();
    }
  });
}
if (worldEditNameInput) {
  worldEditNameInput.addEventListener('input', () => {
    if (worldEditError) {
      worldEditError.textContent = '';
    }
  });
  worldEditNameInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (saveWorldEdit()) {
        closeWorldEditModal();
      }
    }
  });
}
if (worldCoverInput) {
  worldCoverInput.addEventListener('change', () => {
    const file = worldCoverInput.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      worldEditCoverImage = reader.result;
      if (worldCoverPreview) {
        worldCoverPreview.style.backgroundImage = `url("${worldEditCoverImage}")`;
      }
    };
    reader.readAsDataURL(file);
  });
}
if (deleteWorldButton) {
  deleteWorldButton.addEventListener('click', () => {
    if (deleteWorld()) {
      closeWorldEditModal();
    }
  });
}
if (confirmInteractionButton) {
  confirmInteractionButton.addEventListener('click', () => {
    if (logInteraction()) {
      closeInteractionModal();
    }
  });
}
if (interactionTypeInput) {
  interactionTypeInput.addEventListener('change', () => {
    updateInteractionAmountLabel(interactionTypeInput.value);
  });
}
if (cancelInteractionButton) {
  cancelInteractionButton.addEventListener('click', closeInteractionModal);
}
if (closeInteractionButton) {
  closeInteractionButton.addEventListener('click', closeInteractionModal);
}
if (interactionBackdrop) {
  interactionBackdrop.addEventListener('click', closeInteractionModal);
}
if (confirmWorldButton) {
  confirmWorldButton.addEventListener('click', () => {
    if (!worldNameInput) {
      return;
    }
    const created = createWorldFromName(worldNameInput.value);
    if (created) {
      closeWorldModal();
    }
  });
}
if (worldNameInput) {
  worldNameInput.addEventListener('input', () => {
    if (worldModalError) {
      worldModalError.textContent = '';
    }
  });
  worldNameInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const created = createWorldFromName(worldNameInput.value);
      if (created) {
        closeWorldModal();
      }
    }
  });
}
if (removePartyMemberButton) {
  removePartyMemberButton.addEventListener('click', () => {
    removeSelectedPartyMember();
    closePartyProfileModal();
  });
}
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeProfileModal();
    closePartyProfileModal();
    closeWorldModal();
    closeWorldEditModal();
    closeInteractionModal();
  }
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.xp-menu') && !event.target.closest('.xp-plus')) {
    closeXpMenus();
  }
  if (
    !event.target.closest('.condition-popover') &&
    !event.target.closest('.condition-add')
  ) {
    closeConditionPopovers();
  }
});
window.addEventListener('hashchange', () => {
  const monsterId = getMonsterIdFromLocation();
  setActiveMonster(monsterId, { syncHash: false });
});
if (leaveWorldButton) {
  leaveWorldButton.addEventListener('click', () => {
    activeWorldId = null;
    monsterBooks = [];
    activeMonsterBookId = null;
    activeMonsterId = null;
    editingMonsterId = null;
    setWorldSelectedState(false);
    renderMonsterManual();
    renderCombatantPresets();
    renderMonsterDetail();
    saveState();
    window.location.href = 'index.html';
  });
}
if (createWorldButton) {
  createWorldButton.addEventListener('click', () => {
    requestWorldCreation();
  });
}
if (worldScaleInput) {
  worldScaleInput.addEventListener('input', () => {
    applyWorldScale(worldScaleInput.value);
  });
}
if (worldNotesInput) {
  worldNotesInput.addEventListener('input', () => {
    updateWorldNotes(worldNotesInput.value);
  });
}
if (applySettingsButton) {
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
    saveState();
    window.location.href = 'party.html';
  });
}
if (turnSecondsInput) {
  turnSecondsInput.addEventListener('input', () => {
    timeConfig = normalizeTimeConfig({
      ...timeConfig,
      turnSeconds: Number(turnSecondsInput.value)
    });
    syncTimeConfigInputs();
    updateAdvanceLabels();
    saveState();
  });
}
if (shortRestHoursInput) {
  shortRestHoursInput.addEventListener('input', () => {
    timeConfig = normalizeTimeConfig({
      ...timeConfig,
      shortRestHours: Number(shortRestHoursInput.value)
    });
    syncTimeConfigInputs();
    updateAdvanceLabels();
    saveState();
  });
}
if (longRestHoursInput) {
  longRestHoursInput.addEventListener('input', () => {
    timeConfig = normalizeTimeConfig({
      ...timeConfig,
      longRestHours: Number(longRestHoursInput.value)
    });
    syncTimeConfigInputs();
    updateAdvanceLabels();
    saveState();
  });
}
if (clockSpeedInput) {
  clockSpeedInput.addEventListener('input', () => {
    timeConfig = normalizeTimeConfig({
      ...timeConfig,
      clockSpeed: Number(clockSpeedInput.value)
    });
    syncTimeConfigInputs();
    saveState();
  });
}
if (encounterDifficulty) {
  encounterDifficulty.addEventListener('input', updateDifficultyLabel);
}
if (generateEncounterButton) {
  generateEncounterButton.addEventListener('click', generateEncounterDraft);
}
if (addEncounterButton) {
  addEncounterButton.addEventListener('click', addEncounterToInitiative);
}
if (clearEncounterDraftButton) {
  clearEncounterDraftButton.addEventListener('click', clearEncounterDraft);
}
if (saveEncounterPresetButton) {
  saveEncounterPresetButton.addEventListener('click', () => {
    if (encounterDraft.length === 0) {
      return;
    }
    const name = encounterPresetName?.value.trim() || 'Untitled Preset';
    encounterPresets = [
      ...encounterPresets,
      {
        id: crypto.randomUUID(),
        name,
        encounterDraft: encounterDraft.map((entry) => ({ ...entry }))
      }
    ];
    if (encounterPresetName) {
      encounterPresetName.value = '';
    }
    renderEncounterPresets();
    saveState();
  });
}
if (exportWorldButton) {
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
      encounterDraft,
      partyMembers,
      roundHistoryEntries,
      calendarEvents,
      combatActive,
      encounterPresets,
      worldStats,
      worldMap,
      worldNotes,
      questBoard,
      downtimeEntries,
      npcDirectory,
      factionRoster,
      rumorBoard,
      sessionNotes,
      campaignMilestones,
      encounterPlans,
      monsterBooks,
      activeMonsterBookId
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
}
if (importWorldInput) {
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
            : [],
          partyMembers: Array.isArray(parsed.partyMembers)
            ? parsed.partyMembers
            : [],
          roundHistoryEntries: Array.isArray(parsed.roundHistoryEntries)
            ? parsed.roundHistoryEntries
            : [],
          calendarEvents: Array.isArray(parsed.calendarEvents)
            ? parsed.calendarEvents.map((event) => ({
              ...event,
              type: event.type || 'general',
              actorType: event.actorType || 'player'
            }))
            : [],
          combatActive: Boolean(parsed.combatActive),
          encounterPresets: Array.isArray(parsed.encounterPresets)
            ? parsed.encounterPresets
            : [],
          coverImage: parsed.coverImage || '',
          worldStats: {
            distanceTravelled: Number(parsed.worldStats?.distanceTravelled) || 0,
            encountersCompleted: Number(parsed.worldStats?.encountersCompleted) || 0
          },
          worldMap: {
            image: parsed.worldMap?.image || '',
            zoom: Number(parsed.worldMap?.zoom) || 1,
            offsetX: Number(parsed.worldMap?.offsetX) || 0,
            offsetY: Number(parsed.worldMap?.offsetY) || 0,
            markers: Array.isArray(parsed.worldMap?.markers)
              ? parsed.worldMap.markers
              : []
          },
          worldNotes: parsed.worldNotes || '',
          questBoard: Array.isArray(parsed.questBoard) ? parsed.questBoard : [],
          downtimeEntries: Array.isArray(parsed.downtimeEntries)
            ? parsed.downtimeEntries
            : [],
          npcDirectory: Array.isArray(parsed.npcDirectory) ? parsed.npcDirectory : [],
          factionRoster: Array.isArray(parsed.factionRoster)
            ? parsed.factionRoster
            : [],
          rumorBoard: Array.isArray(parsed.rumorBoard) ? parsed.rumorBoard : [],
          sessionNotes: Array.isArray(parsed.sessionNotes) ? parsed.sessionNotes : [],
          campaignMilestones: Array.isArray(parsed.campaignMilestones)
            ? parsed.campaignMilestones
            : [],
          encounterPlans: Array.isArray(parsed.encounterPlans) ? parsed.encounterPlans : [],
          monsterBooks: Array.isArray(parsed.monsterBooks)
            ? normalizeMonsterBooks(parsed.monsterBooks)
            : parsed.monsterManual || parsed.monsters
              ? [createMonsterBook('Monster Manual', parsed.monsterManual || parsed.monsters)]
              : [createMonsterBook('Monster Manual', baseMonsterPresets)],
          activeMonsterBookId: parsed.activeMonsterBookId || null
        };
        worlds[world.id] = world;
        activeWorldId = world.id;
        renderWorldTiles();
        setActiveWorld(world.id);
      } catch (error) {
        window.alert('Invalid world file.');
      }
    };
    reader.readAsText(file);
    importWorldInput.value = '';
  });
}

const initializeDefaults = async () => {
  const loaded = await loadState();
  if (!loaded) {
    worlds = {};
    activeWorldId = null;
    setWorldSelectedState(false);
  }

  renderWorldTiles();
  if (activeWorldId) {
    setActiveWorld(activeWorldId);
  } else {
    setWorldSelectedState(false);
  }
  if (activeWorldId && isAutoClockEnabled()) {
    startAutoClock();
  }
  renderMonsterManual();
  renderCombatantPresets();

  if (monthsInYearInput) {
    monthsInYearInput.value = calendarSettings.monthsInYear;
    hoursPerDayInput.value = calendarSettings.hoursPerDay;
    daysPerMonthInput.value = calendarSettings.daysPerMonth.join(', ');
    monthNamesInput.value = calendarSettings.monthNames.join(', ');
    dayNamesInput.value = calendarSettings.dayNames.join(', ');
  }
  syncInputs();
  syncTimeConfigInputs();
  updateAdvanceLabels();
  updateRoundDisplay();
  updateStartCombatButton();
  renderCombatLog();
  renderRoundHistory();
  updateDifficultyLabel();
  renderEncounterDraft();
  renderPartyList();
  renderCalendar();
  renderTimeline();
  renderStats();
  renderWorldMap();
  renderEncounterPresets();
  renderQuestBoard();
  renderDowntimeTracker();
  if (worldGrid) {
    const savedScale = localStorage.getItem('worldTileScale');
    if (savedScale) {
      applyWorldScale(savedScale);
    }
  }
};

initializeDefaults().then(() => {
  renderInitiative();
  renderProfile();
  const monsterId = getMonsterIdFromLocation();
  setActiveMonster(monsterId, { syncHash: false });
});
