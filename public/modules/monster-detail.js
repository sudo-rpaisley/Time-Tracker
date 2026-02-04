/* global monsterDetailPanel */

// ============================================================================
// MONSTER IMAGE MODAL AND CAROUSEL
// ============================================================================

const getMonsterImageModal = () => {
  if (!monsterDetailPanel) {
    return null;
  }
  let modal = monsterDetailPanel.querySelector('.monster-image-modal');
  if (modal) {
    return modal;
  }
  modal = document.createElement('div');
  modal.className = 'monster-image-modal';
  modal.hidden = true;
  modal.style.display = 'none';

  const content = document.createElement('div');
  content.className = 'monster-image-modal-content';

  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'ghost monster-image-modal-close';
  close.setAttribute('aria-label', 'Close image preview');
  close.textContent = '✕';

  const body = document.createElement('div');
  body.className = 'monster-image-modal-body';

  const closeModal = () => {
    modal.hidden = true;
    modal.style.display = 'none';
    body.innerHTML = '';
  };

  close.addEventListener('click', () => {
    closeModal();
  });
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
  content.addEventListener('click', (event) => {
    event.stopPropagation();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) {
      closeModal();
    }
  });

  content.append(close, body);
  modal.appendChild(content);
  monsterDetailPanel.appendChild(modal);
  return modal;
};

const createMonsterImageCarousel = (images, name) => {
  const normalizeImageUrls = window.__legacy.normalizeImageUrls;
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

const openMonsterImageModal = (images, name) => {
  const modal = getMonsterImageModal();
  if (!modal) {
    return;
  }
  const body = modal.querySelector('.monster-image-modal-body');
  if (!body) {
    return;
  }
  body.innerHTML = '';
  body.appendChild(createMonsterImageCarousel(images, name));
  modal.style.display = 'grid';
  modal.hidden = false;
};

// ============================================================================
// MONSTER FORM UTILITIES
// ============================================================================

const getDetailInputValue = (id) => {
  const input = document.getElementById(id);
  return input ? input.value.trim() : '';
};

const resetMonsterForm = () => {
  const monsterNameInput = document.getElementById('monsterNameInput');
  const monsterTypeInput = document.getElementById('monsterTypeInput');
  const monsterMaxHpInput = document.getElementById('monsterMaxHpInput');
  const monsterImageInput = document.getElementById('monsterImageInput');
  const monsterNotesInput = document.getElementById('monsterNotesInput');

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
  const monsterModalTitle = document.getElementById('monsterModalTitle');
  const addMonsterButton = document.getElementById('addMonsterButton');
  const cancelMonsterEditButton = document.getElementById('cancelMonsterEditButton');

  if (monsterModalTitle) {
    monsterModalTitle.textContent = isEditing ? 'Edit Monster' : 'Add Monster';
  }
  if (addMonsterButton) {
    addMonsterButton.textContent = isEditing ? 'Save Monster' : 'Add Monster';
  }
  if (cancelMonsterEditButton) {
    cancelMonsterEditButton.hidden = !isEditing;
  }
};

const startMonsterEdit = (monster) => {
  const monsterNameInput = document.getElementById('monsterNameInput');
  const monsterTypeInput = document.getElementById('monsterTypeInput');
  const monsterMaxHpInput = document.getElementById('monsterMaxHpInput');
  const monsterImageInput = document.getElementById('monsterImageInput');
  const monsterNotesInput = document.getElementById('monsterNotesInput');

  if (!monster) {
    return;
  }
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
  const closeMonsterModal = window.__legacy.closeMonsterModal;
  if (closeMonsterModal) {
    closeMonsterModal();
  }
};

// ============================================================================
// MONSTER DETAIL EDITING
// ============================================================================

const saveMonsterDetailEdits = () => {
  const getActiveMonsterBook = window.__legacy.getActiveMonsterBook;
  const normalizeImageUrls = window.__legacy.normalizeImageUrls;
  const saveState = window.__legacy.saveState;
  const renderMonsterManual = window.__legacy.renderMonsterManual;
  const renderCombatantPresets = window.__legacy.renderCombatantPresets;
  const renderMonsterDetail = window.__legacy.renderMonsterDetail;
  const saveMonsterBookToLibrary = window.__legacy.saveMonsterBookToLibrary;
  const updateMonsterImportError = window.__legacy.updateMonsterImportError;

  const monsterDetailPanel = document.getElementById('monsterDetailPanel');
  if (!monsterDetailPanel) {
    return;
  }

  // These globals are accessed through window context
  const { activeMonsterId } = window;
  const activeBook = getActiveMonsterBook?.();
  const selected = activeBook?.monsters.find((m) => m.id === activeMonsterId);
  if (!activeBook || !selected) {
    return;
  }

  const name = getDetailInputValue('detailMonsterNameInput');
  if (!name) {
    return;
  }

  const type = getDetailInputValue('detailMonsterTypeInput') || selected.type || 'npc';
  const metaValue = getDetailInputValue('detailMonsterMetaInput');
  const meta = metaValue || type;
  const armorClass = getDetailInputValue('detailMonsterArmorClassInput');
  const hitPoints = getDetailInputValue('detailMonsterHitPointsInput');
  const speed = getDetailInputValue('detailMonsterSpeedInput');
  const imageUrls = normalizeImageUrls(getDetailInputValue('detailMonsterImageInput'));
  const imageUrl = imageUrls[0] || '';
  const maxHpValue = Number(getDetailInputValue('detailMonsterMaxHpInput'));
  const maxHp = Number.isNaN(maxHpValue) ? selected.maxHp : Math.max(0, maxHpValue);
  const stats = {
    str: getDetailInputValue('detailMonsterStrInput'),
    dex: getDetailInputValue('detailMonsterDexInput'),
    con: getDetailInputValue('detailMonsterConInput'),
    int: getDetailInputValue('detailMonsterIntInput'),
    wis: getDetailInputValue('detailMonsterWisInput'),
    cha: getDetailInputValue('detailMonsterChaInput'),
    strMod: getDetailInputValue('detailMonsterStrModInput'),
    dexMod: getDetailInputValue('detailMonsterDexModInput'),
    conMod: getDetailInputValue('detailMonsterConModInput'),
    intMod: getDetailInputValue('detailMonsterIntModInput'),
    wisMod: getDetailInputValue('detailMonsterWisModInput'),
    chaMod: getDetailInputValue('detailMonsterChaModInput')
  };
  const updated = {
    ...selected,
    name,
    type,
    meta,
    armorClass,
    hitPoints,
    maxHp,
    speed,
    savingThrows: getDetailInputValue('detailMonsterSavingThrowsInput'),
    skills: getDetailInputValue('detailMonsterSkillsInput'),
    senses: getDetailInputValue('detailMonsterSensesInput'),
    languages: getDetailInputValue('detailMonsterLanguagesInput'),
    challenge: getDetailInputValue('detailMonsterChallengeInput'),
    traits: getDetailInputValue('detailMonsterTraitsInput'),
    actions: getDetailInputValue('detailMonsterActionsInput'),
    legendaryActions: getDetailInputValue('detailMonsterLegendaryActionsInput'),
    notes: getDetailInputValue('detailMonsterNotesInput'),
    imageUrl,
    imageUrls,
    stats
  };
  activeBook.monsters = activeBook.monsters.map((monster) =>
    monster.id === selected.id ? updated : monster
  );
  updateMonsterImportError?.('');
  setMonsterEditState(false);
  renderMonsterManual?.();
  renderCombatantPresets?.();
  renderMonsterDetail?.();
  saveState?.();
  saveMonsterBookToLibrary?.(activeBook, { silent: true });
};

const deleteActiveMonster = () => {
  const renderMonsterManual = window.__legacy.renderMonsterManual;
  const renderCombatantPresets = window.__legacy.renderCombatantPresets;
  const renderMonsterDetail = window.__legacy.renderMonsterDetail;
  const saveState = window.__legacy.saveState;
  const saveMonsterBookToLibrary = window.__legacy.saveMonsterBookToLibrary;
  const getActiveMonsterBook = window.__legacy.getActiveMonsterBook;

  const { activeMonsterId } = window;
  const activeBook = getActiveMonsterBook?.();
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
  cancelMonsterEdit();
  renderMonsterManual?.();
  renderCombatantPresets?.();
  renderMonsterDetail?.();
  saveState?.();
  saveMonsterBookToLibrary?.(activeBook, { silent: true });
};

// ============================================================================
// MODULE INITIALIZATION AND EXPORTS
// ============================================================================

const initMonsterDetail = () => {
  // Monster detail module initialization
};

export {
  initMonsterDetail,
  getMonsterImageModal,
  createMonsterImageCarousel,
  openMonsterImageModal,
  getDetailInputValue,
  resetMonsterForm,
  setMonsterEditState,
  startMonsterEdit,
  cancelMonsterEdit,
  saveMonsterDetailEdits,
  deleteActiveMonster
};

