/**
 * Profile Modal Module
 * Handles rendering and opening/closing profile modals for combatants and party members
 */

export const initProfile = () => {
  // Module initialization can go here if needed
};

export const renderProfile = () => {
  const profileDetails = document.getElementById('profileDetails');
  const emptyProfile = document.getElementById('emptyProfile');
  const profileName = document.getElementById('profileName');
  const profileType = document.getElementById('profileType');
  const profileCurrentHp = document.getElementById('profileCurrentHp');
  const profileMaxHp = document.getElementById('profileMaxHp');
  const profileInitiative = document.getElementById('profileInitiative');
  const profileConditions = document.getElementById('profileConditions');
  const profileNotes = document.getElementById('profileNotes');
  const profileAvatar = document.getElementById('profileAvatar');

  if (!profileDetails) {
    return;
  }

  const combatants = window.combatants || [];
  const selectedCombatantId = window.selectedCombatantId;
  const selected = combatants.find((combatant) => combatant.id === selectedCombatantId);

  if (!selected) {
    if (emptyProfile) {
      emptyProfile.hidden = false;
    }
    if (profileDetails) {
      profileDetails.hidden = true;
    }
    return;
  }

  if (emptyProfile) {
    emptyProfile.hidden = true;
  }
  if (profileDetails) {
    profileDetails.hidden = false;
  }

  if (profileName) {profileName.value = selected.name;}
  if (profileType) {profileType.value = selected.type;}
  if (profileCurrentHp) {profileCurrentHp.value = selected.currentHp ?? '';}
  if (profileMaxHp) {profileMaxHp.value = selected.maxHp ?? '';}
  if (profileInitiative) {profileInitiative.value = selected.initiative ?? '';}
  if (profileConditions) {profileConditions.value = selected.conditions ?? '';}
  if (profileNotes) {profileNotes.value = selected.notes ?? '';}
  if (profileAvatar) {profileAvatar.value = '';}
};

export const renderPartyProfile = () => {
  const partyProfileDetails = document.getElementById('partyProfileDetails');
  const emptyPartyProfile = document.getElementById('emptyPartyProfile');
  const partyProfileName = document.getElementById('partyProfileName');
  const partyProfileCurrentHp = document.getElementById('partyProfileCurrentHp');
  const partyProfileMaxHp = document.getElementById('partyProfileMaxHp');
  const partyProfileXp = document.getElementById('partyProfileXp');
  const partyProfileLevel = document.getElementById('partyProfileLevel');
  const partyProfileConditionTags = document.getElementById('partyProfileConditionTags');
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

  if (!partyProfileDetails) {
    return;
  }

  const partyMembers = window.partyMembers || [];
  const selectedPartyMemberId = window.selectedPartyMemberId;
  const selected = partyMembers.find((member) => member.id === selectedPartyMemberId);

  if (!selected) {
    if (emptyPartyProfile) {
      emptyPartyProfile.hidden = false;
    }
    if (partyProfileDetails) {
      partyProfileDetails.hidden = true;
    }
    return;
  }

  if (emptyPartyProfile) {
    emptyPartyProfile.hidden = true;
  }
  if (partyProfileDetails) {
    partyProfileDetails.hidden = false;
  }

  if (partyProfileName) {partyProfileName.value = selected.name;}
  if (partyProfileCurrentHp) {
    partyProfileCurrentHp.value = Number.isFinite(selected.currentHp) ? selected.currentHp : '';
  }
  if (partyProfileMaxHp) {
    partyProfileMaxHp.value = Number.isFinite(selected.maxHp) ? selected.maxHp : '';
  }
  if (partyProfileXp) {
    partyProfileXp.value = Number.isFinite(selected.xp) ? selected.xp : '';
  }
  if (partyProfileLevel) {
    partyProfileLevel.value = Number.isFinite(selected.level) ? selected.level : 1;
  }
  if (partyProfileNotes) {
    partyProfileNotes.value = selected.notes || '';
  }
  if (partyProfileCopper) {
    partyProfileCopper.value = Number.isFinite(selected.coins?.copper) ? selected.coins.copper : 0;
  }
  if (partyProfileSilver) {
    partyProfileSilver.value = Number.isFinite(selected.coins?.silver) ? selected.coins.silver : 0;
  }
  if (partyProfileGold) {
    partyProfileGold.value = Number.isFinite(selected.coins?.gold) ? selected.coins.gold : 0;
  }
  if (partyProfilePlatinum) {
    partyProfilePlatinum.value = Number.isFinite(selected.coins?.platinum) ? selected.coins.platinum : 0;
  }

  const successCount = Math.min(3, Math.max(0, Number(selected.deathSaves?.success) || 0));
  const failCount = Math.min(3, Math.max(0, Number(selected.deathSaves?.fail) || 0));

  if (partyDeathSaveSuccess1) {partyDeathSaveSuccess1.checked = successCount >= 1;}
  if (partyDeathSaveSuccess2) {partyDeathSaveSuccess2.checked = successCount >= 2;}
  if (partyDeathSaveSuccess3) {partyDeathSaveSuccess3.checked = successCount >= 3;}
  if (partyDeathSaveFail1) {partyDeathSaveFail1.checked = failCount >= 1;}
  if (partyDeathSaveFail2) {partyDeathSaveFail2.checked = failCount >= 2;}
  if (partyDeathSaveFail3) {partyDeathSaveFail3.checked = failCount >= 3;}

  if (partyProfileConditionTags) {
    partyProfileConditionTags.innerHTML = '';
    const formatConditionLabel = window.__legacyFormatConditionLabel;
    const normalizeConditions = window.__legacyNormalizeConditions;
    const removeConditionFromMember = window.__legacyRemoveConditionFromMember;

    if (typeof normalizeConditions === 'function') {
      const conditions = normalizeConditions(selected.conditions);
      conditions.forEach((condition) => {
        const tag = document.createElement('span');
        tag.className = 'condition-tag';
        tag.textContent = typeof formatConditionLabel === 'function'
          ? formatConditionLabel(condition)
          : condition.name;
        const key = `${condition.name}|${condition.duration || ''}|${condition.unit || ''}|${condition.rule || ''}`;
        const remove = document.createElement('button');
        remove.type = 'button';
        remove.className = 'condition-remove';
        remove.setAttribute('aria-label', `Remove ${condition.name}`);
        remove.textContent = '✕';
        remove.addEventListener('click', () => {
          if (typeof removeConditionFromMember === 'function') {
            removeConditionFromMember(selectedPartyMemberId, key);
          }
        });
        tag.appendChild(remove);
        partyProfileConditionTags.appendChild(tag);
      });
    }
  }
};

export const openProfileModal = () => {
  const profileModal = document.getElementById('profileModal');
  if (profileModal) {
    profileModal.classList.add('is-open');
    profileModal.setAttribute('aria-hidden', 'false');
  }
};

export const closeProfileModal = () => {
  const profileModal = document.getElementById('profileModal');
  if (profileModal) {
    profileModal.classList.remove('is-open');
    profileModal.setAttribute('aria-hidden', 'true');
  }
};

export const openPartyProfileModal = () => {
  const partyProfileModal = document.getElementById('partyProfileModal');
  if (partyProfileModal) {
    partyProfileModal.classList.add('is-open');
    partyProfileModal.setAttribute('aria-hidden', 'false');
  }
};

export const closePartyProfileModal = () => {
  const partyProfileModal = document.getElementById('partyProfileModal');
  if (partyProfileModal) {
    partyProfileModal.classList.remove('is-open');
    partyProfileModal.setAttribute('aria-hidden', 'true');
  }
};
