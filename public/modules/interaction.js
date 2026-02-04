/**
 * Interaction Module
 * Handles combat interactions (attacks, healing, buffs, etc.)
 */

import * as Api from './api.js';

export const initInteraction = () => {
  // Module initialization can go here if needed
};

export const getInteractionAmountLabel = (action) => {
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

export const updateInteractionAmountLabel = (action) => {
  const interactionAmountLabel = document.getElementById('interactionAmountLabel');
  if (interactionAmountLabel) {
    interactionAmountLabel.textContent = getInteractionAmountLabel(action);
  }
};

export const openInteractionModal = (sourceId, targetId) => {
  const interactionModal = document.getElementById('interactionModal');
  const interactionSummary = document.getElementById('interactionSummary');
  const interactionTypeInput = document.getElementById('interactionTypeInput');

  if (!interactionModal || !interactionSummary || !interactionTypeInput) {
    return false;
  }

  const combatants = window.combatants || [];
  const source = combatants.find((entry) => entry.id === sourceId);
  const target = combatants.find((entry) => entry.id === targetId);
  if (!source || !target) {
    return false;
  }

  window.interactionSourceId = sourceId;
  window.interactionTargetId = targetId;
  interactionSummary.textContent = `${source.name} → ${target.name}`;
  interactionTypeInput.value = 'attack';
  updateInteractionAmountLabel('attack');

  const interactionDamageInput = document.getElementById('interactionDamageInput');
  const interactionNotesInput = document.getElementById('interactionNotesInput');
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

export const closeInteractionModal = () => {
  const interactionModal = document.getElementById('interactionModal');
  if (!interactionModal) {
    return;
  }
  interactionModal.classList.remove('is-open');
  interactionModal.setAttribute('aria-hidden', 'true');
  window.interactionSourceId = null;
  window.interactionTargetId = null;
};

export const logInteraction = () => {
  const interactionSourceId = window.interactionSourceId;
  const interactionTargetId = window.interactionTargetId;

  if (!interactionSourceId || !interactionTargetId) {
    return false;
  }

  const combatants = window.combatants || [];
  const source = combatants.find((entry) => entry.id === interactionSourceId);
  const target = combatants.find((entry) => entry.id === interactionTargetId);

  if (!source || !target) {
    return false;
  }

  const interactionTypeInput = document.getElementById('interactionTypeInput');
  const interactionDamageInput = document.getElementById('interactionDamageInput');
  const interactionNotesInput = document.getElementById('interactionNotesInput');

  const action = interactionTypeInput?.value || 'attack';
  const amountValue = Number(interactionDamageInput?.value);
  const amount = Number.isNaN(amountValue) ? 0 : Math.max(0, amountValue);
  const notes = interactionNotesInput?.value.trim();

  const appliedDamage = action === 'attack' && amount > 0;
  const appliedHealing = action === 'heal' && amount > 0;

  const Render = window.__legacyRender;

  if (appliedDamage) {
    const nextHp = Math.max(0, (target.currentHp ?? 0) - amount);
    window.combatants = window.combatants.map((entry) =>
      entry.id === target.id ? { ...entry, currentHp: nextHp } : entry
    );
    if (Render && typeof Render.renderInitiative === 'function') {
      Render.renderInitiative();
    }
    if (window.selectedCombatantId === target.id && Render && typeof Render.renderProfile === 'function') {
      Render.renderProfile();
    }
  }

  if (appliedHealing) {
    const maxHp = Number.isFinite(target.maxHp) ? target.maxHp : null;
    const nextHp = maxHp
      ? Math.min(maxHp, (target.currentHp ?? 0) + amount)
      : (target.currentHp ?? 0) + amount;
    window.combatants = window.combatants.map((entry) =>
      entry.id === target.id ? { ...entry, currentHp: nextHp } : entry
    );
    if (Render && typeof Render.renderInitiative === 'function') {
      Render.renderInitiative();
    }
    if (window.selectedCombatantId === target.id && Render && typeof Render.renderProfile === 'function') {
      Render.renderProfile();
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

  const logEvent = window.__legacyLogEvent;
  if (typeof logEvent === 'function') {
    logEvent(`${source.name} ${action}s ${target.name}${noteText}.`);
  }

  if (Api && typeof Api.saveState === 'function') {
    Api.saveState();
  }

  return true;
};
