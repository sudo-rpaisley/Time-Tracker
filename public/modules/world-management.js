/**
 * World Management Module
 * Handles world creation, selection, editing, and deletion
 */

import * as Api from './api.js';

export const initWorldManagement = () => {
  // Module initialization if needed
};

export const createWorld = (name) => {
  if (!name || !name.trim()) {
    window.alert('World name is required');
    return null;
  }

  const world = {
    id: window.__legacyGenerateWorldId?.() || generateWorldId(),
    name: name.trim(),
    description: '',
    notes: '',
    campaignDayOffset: 0,
    campaignDate: new Date().toISOString(),
    roundHistory: [],
    partyMembers: [],
    stats: {},
    encounterPresets: [],
    calendarEvents: [],
    questLog: [],
    downtimeEntries: [],
    npcDirectory: [],
    factionRoster: [],
    rumorBoard: [],
    sessionNotes: [],
    campaignMilestones: [],
    encounterPlans: [],
    monsterBooks: [],
    activeMonsterBookId: null,
    selectedMonsterBookIds: []
  };

  window.worlds = window.worlds || {};
  window.worlds[world.id] = world;
  window.activeWorldId = world.id;
  
  Api.saveState();
  renderWorldTiles();
  setActiveWorld(world.id);
  
  return world;
};

export const getCurrentWorld = () => {
  const worlds = window.worlds || {};
  return worlds[window.activeWorldId] || null;
};

export const setActiveWorld = (worldId) => {
  window.activeWorldId = worldId;
  const world = getCurrentWorld();
  
  if (world) {
    // Sync global state to current world
    window.totalSeconds = world.campaignDayOffset || 0;
    window.partyMembers = Array.isArray(world.partyMembers) ? world.partyMembers : [];
    window.roundHistory = Array.isArray(world.roundHistory) ? world.roundHistory : [];
    window.calendarEvents = Array.isArray(world.calendarEvents) ? world.calendarEvents : [];
    window.questLog = Array.isArray(world.questLog) ? world.questLog : [];
    window.downtimeEntries = Array.isArray(world.downtimeEntries) ? world.downtimeEntries : [];
    window.npcDirectory = Array.isArray(world.npcDirectory) ? world.npcDirectory : [];
    window.factionRoster = Array.isArray(world.factionRoster) ? world.factionRoster : [];
    window.rumorBoard = Array.isArray(world.rumorBoard) ? world.rumorBoard : [];
    window.sessionNotes = Array.isArray(world.sessionNotes) ? world.sessionNotes : [];
    window.campaignMilestones = Array.isArray(world.campaignMilestones) ? world.campaignMilestones : [];
    window.encounterPlans = Array.isArray(world.encounterPlans) ? world.encounterPlans : [];
    window.monsterBooks = Array.isArray(world.monsterBooks) ? world.monsterBooks : [];
    window.activeMonsterBookId = world.activeMonsterBookId || null;
    window.selectedMonsterBookIds = Array.isArray(world.selectedMonsterBookIds) ? world.selectedMonsterBookIds : [];

    setWorldSelectedState(true);
    Api.saveState();
    
    // Trigger re-renders
    const renderFromLegacy = (fn) => {
      if (typeof window[fn] === 'function') {
        window[fn]();
      }
    };

    renderFromLegacy('renderPartyList');
    renderFromLegacy('renderInitiative');
    renderFromLegacy('renderCalendar');
    renderFromLegacy('renderTimeline');
    renderFromLegacy('renderStats');
  }
};

export const setWorldSelectedState = (isSelected) => {
  window.worldSelected = isSelected;
  const worldSelectInput = document.getElementById('worldSelectInput');
  const worldManagementUI = document.getElementById('worldManagementUI');
  
  if (worldSelectInput) {
    worldSelectInput.style.display = isSelected ? 'none' : 'block';
  }
  if (worldManagementUI) {
    worldManagementUI.style.display = isSelected ? 'block' : 'none';
  }
};

export const requestWorldCreation = () => {
  const worldName = window.prompt('Enter world name:', '');
  if (worldName) {
    createWorld(worldName);
  }
};

export const renderWorldTiles = () => {
  const worldTilesContainer = document.getElementById('worldTiles');
  if (!worldTilesContainer) {return;}

  const worlds = window.worlds || {};
  const activeId = window.activeWorldId;
  const tileHtml = Object.values(worlds)
    .map((world) => `
      <div class="world-tile ${world.id === activeId ? 'active' : ''}" onclick="window.App.WorldManagement.setActiveWorld('${world.id}')">
        <h3>${window.__legacyStripHtml?.(world.name) || world.name}</h3>
        <p class="world-description">${world.description || 'No description'}</p>
        <div class="world-tile-actions">
          <button onclick="window.App.WorldManagement.requestWorldEdit('${world.id}')" class="btn-edit">Edit</button>
          <button onclick="window.App.WorldManagement.requestWorldDelete('${world.id}')" class="btn-delete">Delete</button>
        </div>
      </div>
    `)
    .join('');

  worldTilesContainer.innerHTML = tileHtml || '<p>No worlds created yet.</p>';
};

export const openWorldModal = () => {
  const worldModal = document.getElementById('worldModal');
  if (worldModal) {
    worldModal.style.display = 'flex';
  }
};

export const closeWorldModal = () => {
  const worldModal = document.getElementById('worldModal');
  if (worldModal) {
    worldModal.style.display = 'none';
  }
};

export const openWorldEditModal = (worldId) => {
  const world = (window.worlds || {})[worldId];
  if (!world) {return;}

  window.editingWorldId = worldId;
  const worldNameInput = document.getElementById('worldNameInput');
  const worldDescriptionInput = document.getElementById('worldDescriptionInput');

  if (worldNameInput) {worldNameInput.value = world.name || '';}
  if (worldDescriptionInput) {worldDescriptionInput.value = world.description || '';}

  const worldEditModal = document.getElementById('worldEditModal');
  if (worldEditModal) {
    worldEditModal.style.display = 'flex';
  }
};

export const closeWorldEditModal = () => {
  const worldEditModal = document.getElementById('worldEditModal');
  if (worldEditModal) {
    worldEditModal.style.display = 'none';
  }
  window.editingWorldId = null;
};

export const saveWorldEdit = () => {
  const worldId = window.editingWorldId;
  if (!worldId) {return;}

  const world = (window.worlds || {})[worldId];
  if (!world) {return;}

  const worldNameInput = document.getElementById('worldNameInput');
  const worldDescriptionInput = document.getElementById('worldDescriptionInput');

  world.name = (worldNameInput?.value || '').trim();
  world.description = (worldDescriptionInput?.value || '').trim();

  Api.saveState();
  renderWorldTiles();
  closeWorldEditModal();
};

export const requestWorldEdit = (worldId) => {
  openWorldEditModal(worldId);
};

export const deleteWorld = () => {
  const worldId = window.editingWorldId;
  if (!worldId) {return;}

  if (!window.confirm('Are you sure you want to delete this world?')) {
    return;
  }

  const worlds = window.worlds || {};
  delete worlds[worldId];

  if (window.activeWorldId === worldId) {
    const remainingIds = Object.keys(worlds);
    window.activeWorldId = remainingIds[0] || null;
  }

  if (window.activeWorldId) {
    setActiveWorld(window.activeWorldId);
  } else {
    setWorldSelectedState(false);
    renderWorldTiles();
  }

  Api.saveState();
  closeWorldEditModal();
};

export const requestWorldDelete = (worldId) => {
  window.editingWorldId = worldId;
  deleteWorld();
};

// Utility helpers
const generateWorldId = () => {
  return 'world_' + Math.random().toString(36).substr(2, 9);
};

// Export for backward compatibility
export const createWorldFromName = (name) => createWorld(name);
