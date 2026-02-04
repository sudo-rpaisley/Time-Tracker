/**
 * Global application state management
 */

// All state variables below are intentionally exported for use by public/script.js
// ESLint may report them as unused within this module, but they're referenced externally
/* eslint-disable no-unused-vars */
const worlds = {};
const activeWorldId = null;
const worldEditTargetId = null;
const worldEditCoverImage = '';
const worldCoverImage = '';

// Time and calendar state
const totalSeconds = 0;
const calendarSettings = {
  monthsInYear: 12,
  daysPerMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  hoursPerDay: 24,
  monthNames: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ],
  dayNames: [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ]
};

const timeConfig = {
  turnSeconds: 6,
  shortRestHours: 1,
  longRestHours: 8,
  clockSpeed: 1
};

// Combat state
const combatants = [];
const currentCombatantIndex = 0;
const selectedCombatantId = null;
const combatLogEntries = [];
const roundNumber = 1;
const combatActive = false;
const autoClockTimer = null;

// Party and character state
const partyMembers = [];
const selectedPartyMemberId = null;

// Monster books and creatures
const monsterBooks = [];
const activeMonsterBookId = null;
const selectedMonsterBookIds = [];
const activeMonsterId = null;
const editingMonsterId = null;

// World features
const questBoard = [];
const downtimeEntries = [];
const npcDirectory = [];
const factionRoster = [];
const rumorBoard = [];
const sessionNotes = [];
const campaignMilestones = [];
const encounterPlans = [];
const encounterDraft = [];
const encounterPresets = [];
const roundHistoryEntries = [];
const calendarEvents = [];
const calendarView = null;

// World notes and map
let worldNotes = '';
const worldStats = {
  distanceTravelled: 0,
  encountersCompleted: 0
};
const worldMap = {
  image: '',
  zoom: 1,
  offsetX: 0,
  offsetY: 0,
  markers: [],
  scale: { distancePer100Pixels: 1, unit: 'mi' },
  players: []
};
const mapActivePlayerId = null;
/* eslint-enable no-unused-vars */

/**
 * Get currently active world
 */
const getCurrentWorld = () => worlds[activeWorldId];

/**
 * Get active monster book
 */
const getActiveMonsterBook = () =>
  monsterBooks.find((book) => book.id === activeMonsterBookId) || null;

/**
 * Get monster book by ID
 */
const getMonsterBookById = (id) =>
  monsterBooks.find((book) => book.id === id) || null;

/**
 * Get active auto-clock status
 */
const isAutoClockEnabled = () =>
  typeof localStorage !== 'undefined' && 
  localStorage.getItem('autoClockEnabled') === 'true';

/**
 * Update world notes
 */
const updateWorldNotes = (value) => {
  worldNotes = value;
};

// Export state and accessors
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    // State objects
    worlds,
    activeWorldId,
    totalSeconds,
    calendarSettings,
    timeConfig,
    combatants,
    partyMembers,
    monsterBooks,
    worldNotes,
    worldMap,
    worldStats,
    questBoard,
    npcDirectory,
    factionRoster,
    // Accessors
    getCurrentWorld,
    getActiveMonsterBook,
    getMonsterBookById,
    isAutoClockEnabled,
    updateWorldNotes
  };
}
