/**
 * Map & Viewport Rendering Module
 * Handles world map display, player markers, and map interactions
 */

export const initMapRendering = () => {
  // Module initialization if needed
};

export const renderWorldMap = () => {
  const mapImage = document.getElementById('mapImage');
  const mapViewport = document.getElementById('mapViewport');
  const mapMarkers = document.getElementById('mapMarkers');
  const mapPlayerMarkers = document.getElementById('mapPlayerMarkers');
  const mapZoomInput = document.getElementById('mapZoomInput');
  const mapTagList = document.getElementById('mapTagList');

  if (!mapImage || !mapViewport || !mapMarkers) {
    return;
  }

  const worldMap = window.worldMap || { offsetX: 0, offsetY: 0, zoom: 1, image: '', markers: [], players: [] };

  mapImage.src = worldMap.image || '';
  if (mapZoomInput) {
    mapZoomInput.value = worldMap.zoom;
  }

  updateMapScaleDisplay();

  const transform = `translate(${worldMap.offsetX}px, ${worldMap.offsetY}px) scale(${worldMap.zoom})`;
  mapImage.style.transform = transform;
  mapMarkers.style.transform = transform;

  if (mapPlayerMarkers) {
    mapPlayerMarkers.style.transform = transform;
  }

  mapMarkers.innerHTML = '';
  (worldMap.markers || []).forEach((marker) => {
    const pin = document.createElement('button');
    pin.className = 'map-marker';
    pin.textContent = marker.label;
    pin.style.left = `${marker.x}%`;
    pin.style.top = `${marker.y}%`;
    if (marker.url) {
      pin.addEventListener('click', () => {
        window.__legacySafeOpenUrl?.(marker.url);
      });
    }
    mapMarkers.appendChild(pin);
  });

  renderMapPlayers();

  if (mapTagList) {
    mapTagList.innerHTML = '';
    if ((worldMap.markers || []).length === 0) {
      const item = document.createElement('li');
      item.className = 'helper-text';
      item.textContent = 'No map tags added yet.';
      mapTagList.appendChild(item);
    } else {
      (worldMap.markers || []).forEach((marker) => {
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
          window.worldMap = window.worldMap || {};
          window.worldMap.markers = (window.worldMap.markers || []).map((entry) =>
            entry.id === marker.id
              ? { ...entry, label: nextLabel.trim(), url: nextUrl }
              : entry
          );
          renderWorldMap();
          window.__legacySaveState?.();
        });

        const remove = document.createElement('button');
        remove.type = 'button';
        remove.className = 'ghost';
        remove.textContent = 'Remove';
        remove.addEventListener('click', () => {
          window.worldMap = window.worldMap || {};
          window.worldMap.markers = (window.worldMap.markers || []).filter((entry) => entry.id !== marker.id);
          renderWorldMap();
          window.__legacySaveState?.();
        });

        actions.append(link, edit, remove);
        item.append(name, actions);
        mapTagList.appendChild(item);
      });
    }
  }
};

export const renderMapPlayers = () => {
  const mapPlayerMarkers = document.getElementById('mapPlayerMarkers');
  const mapPlayerList = document.getElementById('mapPlayerList');
  const mapCancelMoveButton = document.getElementById('mapCancelMoveButton');

  if (mapPlayerMarkers) {
    mapPlayerMarkers.innerHTML = '';
  }
  if (mapPlayerList) {
    mapPlayerList.innerHTML = '';
  }

  const worldMap = window.worldMap || { players: [] };

  if (!(worldMap.players || []).length) {
    if (mapPlayerList) {
      const item = document.createElement('li');
      item.className = 'helper-text';
      item.textContent = 'No player markers yet.';
      mapPlayerList.appendChild(item);
    }
    return;
  }

  (worldMap.players || []).forEach((player) => {
    const safeX = Number.isFinite(player.x) ? player.x : 50;
    const safeY = Number.isFinite(player.y) ? player.y : 50;

    if (mapPlayerMarkers) {
      const marker = document.createElement('button');
      marker.type = 'button';
      marker.className = 'map-player-marker';
      marker.textContent = window.__legacyGetPlayerMarkerInitials?.(player.name) || '?';
      marker.style.left = `${safeX}%`;
      marker.style.top = `${safeY}%`;
      marker.title = player.name;
      marker.addEventListener('click', (event) => {
        event.stopPropagation();
        window.mapActivePlayerId = player.id;
        updateMapPlayerHelp(`Click the map to move ${player.name}.`);
        if (mapCancelMoveButton) {
          mapCancelMoveButton.hidden = false;
        }
      });
      mapPlayerMarkers.appendChild(marker);
    }

    if (mapPlayerList) {
      const item = document.createElement('li');
      item.className = 'quest-item';

      const header = document.createElement('div');
      header.className = 'quest-header';
      const name = document.createElement('span');
      name.textContent = player.name;
      const distance = document.createElement('span');
      distance.className = 'timeline-tag';
      distance.textContent = formatTravelDistance(player.distanceTravelled || 0);
      header.append(name, distance);

      const meta = document.createElement('div');
      meta.className = 'timeline-meta';
      const coords = document.createElement('span');
      coords.textContent = `Position: ${safeX.toFixed(1)}%, ${safeY.toFixed(1)}%`;
      meta.appendChild(coords);

      const actions = document.createElement('div');
      actions.className = 'button-row';
      const move = document.createElement('button');
      move.type = 'button';
      move.className = 'ghost';
      move.textContent = 'Set Position';
      move.addEventListener('click', () => {
        window.mapActivePlayerId = player.id;
        updateMapPlayerHelp(`Click the map to move ${player.name}.`);
        if (mapCancelMoveButton) {
          mapCancelMoveButton.hidden = false;
        }
      });

      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'ghost';
      remove.textContent = 'Remove';
      remove.addEventListener('click', () => {
        window.worldMap = window.worldMap || {};
        window.worldMap.players = (window.worldMap.players || []).filter((entry) => entry.id !== player.id);
        if (window.mapActivePlayerId === player.id) {
          window.mapActivePlayerId = null;
          updateMapPlayerHelp();
          if (mapCancelMoveButton) {
            mapCancelMoveButton.hidden = true;
          }
        }
        renderWorldMap();
        window.__legacySaveState?.();
      });

      actions.append(move, remove);
      item.append(header, meta, actions);
      mapPlayerList.appendChild(item);
    }
  });
};

export const handleMapDragStart = (event) => {
  const mapViewport = document.getElementById('mapViewport');
  if (!mapViewport) {
    return;
  }

  mapViewport.dataset.dragging = 'true';
  mapViewport.dataset.wasDragged = 'false';
  mapViewport.classList.add('is-dragging');
  mapViewport.dataset.dragStartX = event.clientX;
  mapViewport.dataset.dragStartY = event.clientY;

  window.worldMap = window.worldMap || {};
  mapViewport.dataset.dragOriginX = window.worldMap.offsetX || 0;
  mapViewport.dataset.dragOriginY = window.worldMap.offsetY || 0;
};

export const handleMapDragMove = (event) => {
  const mapViewport = document.getElementById('mapViewport');
  if (!mapViewport || mapViewport.dataset.dragging !== 'true') {
    return;
  }

  const startX = Number(mapViewport.dataset.dragStartX) || 0;
  const startY = Number(mapViewport.dataset.dragStartY) || 0;
  const originX = Number(mapViewport.dataset.dragOriginX) || 0;
  const originY = Number(mapViewport.dataset.dragOriginY) || 0;

  window.worldMap = window.worldMap || {};
  window.worldMap.offsetX = originX + (event.clientX - startX);
  window.worldMap.offsetY = originY + (event.clientY - startY);
  mapViewport.dataset.wasDragged = 'true';

  renderWorldMap();
};

export const handleMapDragEnd = () => {
  const mapViewport = document.getElementById('mapViewport');
  if (!mapViewport) {
    return;
  }

  mapViewport.dataset.dragging = 'false';
  mapViewport.classList.remove('is-dragging');
  window.__legacySaveState?.();
};

export const addMapMarker = (event) => {
  const mapImage = document.getElementById('mapImage');
  const mapViewport = document.getElementById('mapViewport');

  window.worldMap = window.worldMap || {};

  if (!mapImage || !mapViewport || !window.worldMap.image || window.mapActivePlayerId) {
    return;
  }

  const dimensions = getMapBaseDimensions();
  if (!dimensions) {
    return;
  }

  const label = window.prompt('Label this location');
  if (!label) {
    return;
  }

  const url = window
    .prompt('Optional wiki URL for this location', '')
    ?.trim() || '';

  const x = ((event.clientX - dimensions.rect.left) / dimensions.rect.width) * 100;
  const y = ((event.clientY - dimensions.rect.top) / dimensions.rect.height) * 100;

  window.worldMap.markers = [
    ...(window.worldMap.markers || []),
    { id: crypto.randomUUID(), label: label.trim(), url, x, y }
  ];

  renderWorldMap();
  window.__legacySaveState?.();
};

export const handleMapPlayerPlacement = (event) => {
  const mapViewport = document.getElementById('mapViewport');
  const mapCancelMoveButton = document.getElementById('mapCancelMoveButton');

  if (!window.mapActivePlayerId || !mapViewport) {
    return;
  }

  if (mapViewport.dataset.wasDragged === 'true') {
    mapViewport.dataset.wasDragged = 'false';
    return;
  }

  const dimensions = getMapBaseDimensions();
  if (!dimensions) {
    return;
  }

  const x = ((event.clientX - dimensions.rect.left) / dimensions.rect.width) * 100;
  const y = ((event.clientY - dimensions.rect.top) / dimensions.rect.height) * 100;

  setMapPlayerPosition(window.mapActivePlayerId, x, y);
  window.mapActivePlayerId = null;
  updateMapPlayerHelp();

  if (mapCancelMoveButton) {
    mapCancelMoveButton.hidden = true;
  }
};

// ===== Utility Helpers =====

const getMapBaseDimensions = () => {
  const mapImage = document.getElementById('mapImage');
  if (!mapImage) {return null;}

  const rect = mapImage.getBoundingClientRect();
  return {
    rect,
    width: rect.width,
    height: rect.height
  };
};

const setMapPlayerPosition = (playerId, x, y) => {
  window.worldMap = window.worldMap || {};
  window.worldMap.players = (window.worldMap.players || []).map((player) =>
    player.id === playerId ? { ...player, x, y } : player
  );
};

const formatTravelDistance = (distance) => {
  if (distance < 1) {return '< 1 mile';}
  if (distance < 1000) {return `${Math.round(distance)} miles`;}
  return `${(distance / 1000).toFixed(1)}k miles`;
};

const updateMapPlayerHelp = (text) => {
  const mapHelpText = document.getElementById('mapHelpText');
  if (mapHelpText) {
    mapHelpText.textContent = text || 'Click the shift+click on the map to add markers, or select a player and click to move them.';
  }
};

const updateMapScaleDisplay = () => {
  const mapScaleDisplay = document.getElementById('mapScaleDisplay');
  if (mapScaleDisplay && window.worldMap?.zoom) {
    mapScaleDisplay.textContent = `${Math.round(window.worldMap.zoom * 100)}%`;
  }
};
