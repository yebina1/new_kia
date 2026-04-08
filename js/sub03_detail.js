const trimTabs = document.querySelectorAll('.trim_selector .trim_tab');
const trimTabBox = document.querySelector('.trim_selector .trim_tab_box');
const trimVisual = document.querySelector('.trim_selector .trim_visual');
const trimName = document.querySelector('.trim_selector .trim_name');
const trimPrice = document.querySelector('.trim_selector .trim_price');
const trimChipList = document.querySelector('.trim_selector .trim_chip_list');
const trimInfo = document.querySelector('.trim_selector .trim_info');

let trimTabActiveBg = null;
let hasInitializedTrimTabActiveBg = false;
const trimTabMotionStyleId = 'trim-tab-motion-style';

const ensureTrimTabMotionStyles = () => {
  if (!trimTabBox || document.getElementById(trimTabMotionStyleId)) return;

  const style = document.createElement('style');
  style.id = trimTabMotionStyleId;
  style.textContent = `
    .trim_selector .trim_tab_box {
      position: relative;
      isolation: isolate;
      overflow: hidden;
    }

    .trim_selector .trim_tab {
      position: relative;
      z-index: 1;
    }

    .trim_selector .trim_tab_active_bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      border-radius: 999px;
      pointer-events: none;
      opacity: 0;
      transform: translate(0, 0);
      background: rgba(251, 246, 239, 0.05);
      border: 1px solid rgba(178, 221, 222, 0.55);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
      transition:
        transform 420ms cubic-bezier(0.2, 0.9, 0.22, 1.2),
        width 360ms cubic-bezier(0.18, 0.88, 0.22, 1.15),
        height 360ms cubic-bezier(0.18, 0.88, 0.22, 1.15),
        opacity 180ms ease;
      will-change: transform, width, height, opacity;
      z-index: 0;
    }

    .trim_selector .trim_tab_active_bg.is-instant {
      transition: none;
    }

    .trim_selector .trim_tab.on,
    .trim_selector .trim_tab.is_active {
      background: transparent;
      border-color: transparent;
      box-shadow: none;
    }
  `;

  document.head.append(style);
};

const ensureTrimTabActiveBg = () => {
  if (!trimTabBox) return null;

  ensureTrimTabMotionStyles();

  if (!trimTabActiveBg) {
    trimTabActiveBg = document.createElement('span');
    trimTabActiveBg.className = 'trim_tab_active_bg';
    trimTabBox.prepend(trimTabActiveBg);
  }

  return trimTabActiveBg;
};

const getActiveTrimTab = () =>
  Array.from(trimTabs).find((tab) => tab.classList.contains('is_active') || tab.classList.contains('on')) || null;

const syncTrimTabActiveBg = ({ animate = true } = {}) => {
  const activeTab = getActiveTrimTab();
  const activeBg = ensureTrimTabActiveBg();
  if (!activeTab || !activeBg || !trimTabBox) return;

  const boxRect = trimTabBox.getBoundingClientRect();
  const tabRect = activeTab.getBoundingClientRect();
  const x = Math.round(tabRect.left - boxRect.left);
  const y = Math.round(tabRect.top - boxRect.top);
  const width = Math.round(tabRect.width);
  const height = Math.round(tabRect.height);
  const maxX = Math.max(boxRect.width - width, 0);
  const clampedX = Math.min(Math.max(x, 0), Math.round(maxX));
  const clampedWidth = Math.min(width, Math.round(boxRect.width));

  activeBg.classList.toggle('is-instant', !animate);
  activeBg.style.width = `${clampedWidth}px`;
  activeBg.style.height = `${height}px`;
  activeBg.style.transform = `translate(${clampedX}px, ${y}px)`;
  activeBg.style.opacity = '1';

  if (!animate) {
    requestAnimationFrame(() => {
      activeBg.classList.remove('is-instant');
    });
  }
};

const trimData = {
  'light-rwd': {
    image: './img/sub03_detail/trim_light_rwd_visual.png',
    name: 'Light RWD',
    price: '$54,900',
    chips: ['230 Miles w', '800V Charging', '76.1 kWh Battery', '7-Passenger Seating'],
    cards: [
      {
        title: 'Charging & Battery',
        items: ['230 mi EPA-est. range', '76.1 kWh battery', 'NACS charge port', '800V charging architecture']
      },
      {
        title: 'Cabin Tech',
        items: ['Dual 12.3-in displays', 'Wireless Apple CarPlay & Android Auto', 'Digital Key 2.0 + Fingerprint Module', 'Wireless charger + 6 USB-C ports']
      },
      {
        title: 'Safety',
        items: ['Forward Collision-Avoidance Assist', 'Rear-view camera', 'Tire-Pressure Monitoring System', 'Over-the-Air updates']
      },
      {
        title: 'Comfort & Utility',
        items: ['7-passenger seating', '19-in alloy wheels', 'Heated & ventilated front seats', 'Smart Power liftgate']
      }
    ]
  },
  'light-long-range-rwd': {
    image: './img/sub03_detail/trim_light_long_range_rwd_visual.png',
    name: 'Light Long Range RWD',
    price: '$59,900',
    chips: ['304 miles w', 'Rear-Wheel Drive', '99.8 kWh Battery', 'Heat pump'],
    cards: [
      {
        title: 'Charging & Battery',
        items: ['304 mi EPA-est. range', '99.8 kWh battery', 'NACS charge port', '800V charging architecture']
      },
      {
        title: 'Cabin Tech',
        items: ['Dual 12.3-in displays', 'Wireless Apple CarPlay & Android Auto', 'Digital Key 2.0 + Fingerprint Module', 'Wireless charger + 6 USB-C ports']
      },
      {
        title: 'Safety',
        items: ['Highway Driving Assist 2', 'Blind-Spot View Monitor', 'Parking Distance Warning', 'Navigation-based Smart Cruise']
      },
      {
        title: 'Comfort & Utility',
        items: ['2nd-row bench seating', '20-in alloy wheels', 'Power liftgate', 'Roof rails + extra cargo utility']
      }
    ]
  },
  'wind-awd': {
    image: './img/sub03_detail/trim_wind_awd_visual.png',
    name: 'Wind AWD',
    price: '$63,900',
    chips: ['280 miles w', 'Dual Motor AWD', '99.8 kWh Battery', 'Towing prep'],
    cards: [
      {
        title: 'Charging & Battery',
        items: ['280 mi EPA-est. range', '99.8 kWh battery', 'Dual-motor AWD', 'NACS + 800V architecture']
      },
      {
        title: 'Cabin Tech',
        items: ['Dual 12.3-in displays', 'Wireless Apple CarPlay & Android Auto', 'Digital Key 2.0 + Fingerprint Module', 'Wireless charger + USB-C ports']
      },
      {
        title: 'Safety',
        items: ['Highway Driving Assist 2', 'Surround View Monitor', 'Blind-Spot View Monitor', 'Parking Collision-Avoidance Assist']
      },
      {
        title: 'Comfort & Utility',
        items: ['2nd-row captain\'s chairs', '20-in alloy wheels', 'Heated + ventilated front seats', 'Smart power liftgate']
      }
    ]
  },
  'land-awd': {
    image: './img/sub03_detail/trim_land_awd_visual.png',
    name: 'Land AWD',
    price: '$69,900',
    chips: ['280 miles w', 'Dual Motor AWD', '19-in+ features', 'Boosted comfort'],
    cards: [
      {
        title: 'Charging & Battery',
        items: ['280 mi EPA-est. range', '99.8 kWh battery', 'NACS charge port', '800V fast charging']
      },
      {
        title: 'Cabin Tech',
        items: ['Dual sunroofs', 'Premium connected services', 'Digital rearview mirror', 'Advanced parking cameras']
      },
      {
        title: 'Safety',
        items: ['Highway Driving Assist 2', 'Forward / side parking assist', 'Surround View Monitor', 'Remote Smart Parking Assist']
      },
      {
        title: 'Comfort & Utility',
        items: ['Premium relaxation seats', '2nd-row captain\'s chairs', 'Ambient lighting', 'Power outlet + extra storage']
      }
    ]
  },
  'gt-line-awd': {
    image: './img/sub03_detail/trim_gt_line_awd_visual.png',
    name: 'GT-Line AWD',
    price: '$71,900',
    chips: ['270 miles w', 'Dual Motor AWD', '21-in wheels', 'Turbo comfort'],
    cards: [
      {
        title: 'Charging & Battery',
        items: ['270 mi EPA-est. range', '99.8 kWh battery', 'Boost AWD performance', '800V charging architecture']
      },
      {
        title: 'Cabin Tech',
        items: ['Meridian premium audio', 'Augmented navigation display', 'Digital Key 2.0 + Fingerprint Module', 'Wireless charger + USB-C ports']
      },
      {
        title: 'Safety',
        items: ['Highway Driving Assist 2', 'Remote Smart Parking Assist 2', 'Forward / blind-spot safety tech', 'Parking collision assist']
      },
      {
        title: 'Comfort & Utility',
        items: ['21-in alloy wheels', 'Relaxation front seats', 'Suede + premium interior details', 'Hands-free smart liftgate']
      }
    ]
  }
};

const renderTrimCards = (cards) => {
  trimInfo.innerHTML = cards.map((card) => `
    <article class="trim_card glass_bg2">
      <h3 class="trim_card_title">${card.title}</h3>
      <span class="trim_card_line"></span>
      <ul class="trim_card_list">
        ${card.items.map((item) => `<li class="trim_card_item">${item}</li>`).join('')}
      </ul>
    </article>
  `).join('');
};

const renderTrimChips = (chips) => {
  if (!chips.length) {
    trimChipList.innerHTML = '';
    trimChipList.classList.add('is_empty');
    return;
  }

  trimChipList.classList.remove('is_empty');
  trimChipList.innerHTML = chips.map((chip) => `<li class="trim_chip_item">${chip}</li>`).join('');
};

const setTrim = (trimKey) => {
  const currentTrim = trimData[trimKey];
  if (!currentTrim) return;

  trimTabs.forEach((tab) => {
    const isActive = tab.dataset.trim === trimKey;
    tab.classList.toggle('on', isActive);
    tab.classList.toggle('is_active', isActive);
    tab.setAttribute('aria-selected', isActive);
  });

  trimVisual.style.backgroundImage = `url('${currentTrim.image}')`;
  trimName.textContent = currentTrim.name;

  if (currentTrim.price) {
    trimPrice.textContent = currentTrim.price;
    trimPrice.classList.remove('is_empty');
  } else {
    trimPrice.textContent = '';
    trimPrice.classList.add('is_empty');
  }

  renderTrimChips(currentTrim.chips);
  renderTrimCards(currentTrim.cards);
  syncTrimTabActiveBg({ animate: hasInitializedTrimTabActiveBg });
  hasInitializedTrimTabActiveBg = true;
};

trimTabs.forEach((tab) => {
  tab.addEventListener('click', function () {
    setTrim(this.dataset.trim);
  });
});

setTrim('light-rwd');

window.addEventListener('resize', () => {
  syncTrimTabActiveBg({ animate: false });
});

const interiorButtons = document.querySelectorAll('.interior .interior_hotspot');
const interiorPanel = document.querySelector('.interior .interior_panel');
const interiorPanelImg = document.querySelector('.interior .interior_panel_img');
const interiorPanelDesc = document.querySelector('.interior .interior_panel_desc');
const interiorPanelClose = document.querySelector('.interior .interior_panel_close');

const interiorData = {
  'spacious-3-row': {
    image: './img/sub03_detail/interior_spacious_3_row_panel.png',
    alt: 'Spacious 3-Row Room for everyone panel',
    desc: 'A spacious 3-row interior gives every passenger more room to stretch out and enjoy the ride.'
  },
  'meridian-audio': {
    image: './img/sub03_detail/interior_meridian_audio_panel.png',
    alt: 'Meridian Audio Premium sound panel',
    desc: 'Experience rich, immersive sound with premium audio throughout the cabin.'
  },
  'panoramic-display-rear': {
    image: './img/sub03_detail/interior_panoramic_display_rear_panel.png',
    alt: 'Panoramic Display Dual 12.3-in screens panel',
    desc: 'Dual 12.3-inch screens provide a sleek, connected digital experience.'
  },
  'power-front-seats': {
    image: './img/sub03_detail/interior_power_front_seats_panel.png',
    alt: 'Power Front Seats Easy seat adjustment panel',
    desc: 'Find your ideal driving position with smooth, intuitive seat controls.'
  },
  'panoramic-display-front': {
    image: './img/sub03_detail/interior_panoramic_display_front_panel.png',
    alt: 'Panoramic Display Wide intuitive view panel',
    desc: 'A wide digital display keeps key information clear and within view.'
  }
};

const closeInteriorPanel = () => {
  if (!interiorPanel) return;

  interiorPanel.classList.remove('is_open');
  interiorButtons.forEach((button) => {
    button.classList.remove('is-active');
    button.classList.remove('on');
  });

  window.setTimeout(() => {
    if (!interiorPanel.classList.contains('is_open')) {
      interiorPanel.hidden = true;
      interiorPanelImg.removeAttribute('src');
      interiorPanelImg.setAttribute('alt', '');
      if (interiorPanelDesc) {
        interiorPanelDesc.textContent = '';
        interiorPanelDesc.parentElement?.classList.remove('is_visible');
      }
    }
  }, 280);
};

const openInteriorPanel = (panelKey) => {
  const currentPanel = interiorData[panelKey];
  if (!currentPanel || !interiorPanel) return;

  interiorButtons.forEach((button) => {
    const isCurrentButton = button.dataset.panel === panelKey;
    button.classList.toggle('is-active', isCurrentButton);
    button.classList.toggle('on', isCurrentButton);
  });

  interiorPanelImg.src = currentPanel.image;
  interiorPanelImg.alt = currentPanel.alt;

  if (interiorPanelDesc) {
    interiorPanelDesc.textContent = currentPanel.desc || '';
    interiorPanelDesc.parentElement?.classList.toggle('is_visible', Boolean(currentPanel.desc));
  }

  interiorPanel.hidden = false;

  requestAnimationFrame(() => {
    interiorPanel.classList.add('is_open');
  });
};

interiorButtons.forEach((button) => {
  button.addEventListener('click', function () {
    if (this.classList.contains('is-active') && interiorPanel && !interiorPanel.hidden) {
      closeInteriorPanel();
      return;
    }

    openInteriorPanel(this.dataset.panel);
  });
});

if (interiorPanelClose) {
  interiorPanelClose.addEventListener('click', closeInteriorPanel);
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeInteriorPanel();
  }
});


const driverAssistVideo = document.querySelector('.driver_assist .driver_assist_video');

if (driverAssistVideo) {
  const playDriverAssistVideo = () => {
    const playPromise = driverAssistVideo.play();

    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        driverAssistVideo.controls = true;
      });
    }
  };

  driverAssistVideo.muted = true;
  driverAssistVideo.defaultMuted = true;
  driverAssistVideo.playsInline = true;

  if (document.readyState === 'complete') {
    playDriverAssistVideo();
  } else {
    window.addEventListener('load', playDriverAssistVideo, { once: true });
  }
}

(() => {
  const section = document.querySelector('.wheels_story');
  if (!section) return;

  const canvas = section.querySelector('.wheels_story_canvas');
  const wheelsTitle = section.querySelector('.wheels_story_heading');
  const copyBlocks = Array.from(section.querySelectorAll('.wheel_story_block'));
  if (!canvas || !copyBlocks.length) return;

  if (!window.gsap || !window.ScrollTrigger) {
    console.warn('[wheels_story] GSAP/ScrollTrigger is not available.');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  const WHEEL_TYPES = ['19in', '20in', '21in'];
  const FRAME_COUNT = 13;

  /*
    ASSET PATH CONFIG
    - Current project: flat PNG files in img/sub03_detail/wheels/
      ex) wheel_19_inch_frame_01.png ... wheel_19_inch_frame_13.png
  */
  const ASSET_CONFIG = {
    basePath: 'img/sub03_detail/wheels',
  };

  /*
    WHEEL X POSITIONS (adjust here)
    - values are viewport-width ratios from canvas center
  */
  const WHEEL_X_RATIO = {
    center: 0,
    left: -0.28,
    right: 0.31,
  };

  /*
    FRAME MAPPING (adjust here)
    - each move phase maps local 0~1 to frame 0~12 (one full rotation)
  */
  const FRAME_RANGE = {
    start: 0,
    end: FRAME_COUNT - 1,
  };

  /*
    TEXT TRIGGER TIMING (adjust here)
    - text appears only after wheel reaches each target position
  */
  const PHASE = {
    move1: [0.0, 0.24],
    hold1: [0.24, 0.32],
    move2: [0.32, 0.56],
    hold2: [0.56, 0.64],
    move3: [0.64, 0.88],
    hold3: [0.88, 1.0],
  };

  const TEXT_TRIGGER = {
    block1: PHASE.hold1[0],
    block2: PHASE.hold2[0],
    block3: PHASE.hold3[0],
  };

  /*
    TEXT TRANSITION AROUND MID-MOVE (adjust here)
    - previous block fully disappears by midpoint
    - next block starts fading in from midpoint
  */
  const TEXT_TRANSITION = {
    firstInSpan: 0.06,
    fadeOutSpan: 0.06,
    fadeInSpan: 0.08,
  };

  /*
    WHEEL SWITCH TIMING (adjust here)
    - wheel set changes around neutral frame for natural transition
  */
  const SWITCH_CONFIG = {
    neutralFrame: 6,
    blendFrameRange: 1.2,
  };

  const STORY_SCROLL_DISTANCE = '+=420%';
  /*
    WHEEL Y PATH (adjust here)
    - wheel enters from title+240px, then settles into text-side slot.
    - text stays fixed; only wheel follows this Y path.
  */
  const TITLE_TO_WHEEL_START_PX = 240;
  const WHEEL_Y_RATIO = {
    entryStartFallback: 0.22,
    slot: 0.58,
  };
  const MAX_WHEEL_SIZE = 360;
  const WHEEL_SIZE_VW = 0.2;
  const WHEEL_SIZE_VH = 0.34;

  const viewport = {
    width: 0,
    height: 0,
    dpr: 1,
  };

  const animationState = {
    progress: 0,
  };

  let frameSets = {};
  let isReady = false;
  let rafToken = 0;
  let lastRenderSignature = '';
  let wheelEntryStartRatio = WHEEL_Y_RATIO.entryStartFallback;

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const lerp = (start, end, t) => start + (end - start) * t;
  const normalize = (value, start, end) => (value - start) / Math.max(end - start, 0.00001);
  const getWheelSize = () =>
    Math.min(MAX_WHEEL_SIZE, viewport.width * WHEEL_SIZE_VW, viewport.height * WHEEL_SIZE_VH);

  const updateWheelEntryStartRatio = () => {
    if (!wheelsTitle) {
      wheelEntryStartRatio = WHEEL_Y_RATIO.entryStartFallback;
      return;
    }

    const sectionRect = section.getBoundingClientRect();
    const titleRect = wheelsTitle.getBoundingClientRect();
    const wheelSize = getWheelSize();

    // "title + 240px below" means wheel top starts at title top + 240.
    const wheelTopFromSection = titleRect.top - sectionRect.top + TITLE_TO_WHEEL_START_PX;
    const wheelCenterFromSection = wheelTopFromSection + wheelSize * 0.5;
    wheelEntryStartRatio = clamp(wheelCenterFromSection / Math.max(viewport.height, 1), 0, 1);
  };

  const buildFramePath = (wheelType, frameIndex) => {
    const wheelSize = wheelType.replace('in', '_inch');
    return `${ASSET_CONFIG.basePath}/wheel_${wheelSize}_frame_${String(frameIndex + 1).padStart(2, '0')}.png`;
  };

  const preloadFrames = () => {
    const tasks = [];

    WHEEL_TYPES.forEach((wheelType) => {
      frameSets[wheelType] = new Array(FRAME_COUNT);

      for (let frame = 0; frame < FRAME_COUNT; frame += 1) {
        const src = buildFramePath(wheelType, frame);

        tasks.push(
          new Promise((resolve, reject) => {
            const image = new Image();
            image.decoding = 'async';
            image.onload = () => {
              frameSets[wheelType][frame] = image;
              resolve();
            };
            image.onerror = () => reject(new Error(`Failed to load wheel frame: ${src}`));
            image.src = src;
          })
        );
      }
    });

    return Promise.all(tasks);
  };

  const getPhaseState = (progress) => {
    const p = clamp(progress, 0, 1);

    if (p <= PHASE.move1[1]) return { phase: 'move1', local: clamp(normalize(p, ...PHASE.move1), 0, 1) };
    if (p <= PHASE.hold1[1]) return { phase: 'hold1', local: 1 };
    if (p <= PHASE.move2[1]) return { phase: 'move2', local: clamp(normalize(p, ...PHASE.move2), 0, 1) };
    if (p <= PHASE.hold2[1]) return { phase: 'hold2', local: 1 };
    if (p <= PHASE.move3[1]) return { phase: 'move3', local: clamp(normalize(p, ...PHASE.move3), 0, 1) };
    return { phase: 'hold3', local: 1 };
  };

  const getWheelXRatio = (progress) => {
    const p = clamp(progress, 0, 1);

    if (p <= PHASE.move1[1]) return lerp(WHEEL_X_RATIO.center, WHEEL_X_RATIO.left, normalize(p, ...PHASE.move1));
    if (p <= PHASE.hold1[1]) return WHEEL_X_RATIO.left;
    if (p <= PHASE.move2[1]) return lerp(WHEEL_X_RATIO.left, WHEEL_X_RATIO.right, normalize(p, ...PHASE.move2));
    if (p <= PHASE.hold2[1]) return WHEEL_X_RATIO.right;
    if (p <= PHASE.move3[1]) return lerp(WHEEL_X_RATIO.right, WHEEL_X_RATIO.left, normalize(p, ...PHASE.move3));
    return WHEEL_X_RATIO.left;
  };

  const getWheelYRatio = (progress) => {
    const p = clamp(progress, 0, 1);

    if (p <= PHASE.move1[1]) {
      return lerp(wheelEntryStartRatio, WHEEL_Y_RATIO.slot, normalize(p, ...PHASE.move1));
    }

    return WHEEL_Y_RATIO.slot;
  };

  const getFrameFloat = (phaseState) => {
    if (!phaseState.phase.startsWith('move')) return FRAME_RANGE.end;
    return lerp(FRAME_RANGE.start, FRAME_RANGE.end, phaseState.local);
  };

  const getSwitchBlend = (frameFloat) => {
    const halfRange = SWITCH_CONFIG.blendFrameRange * 0.5;
    const start = SWITCH_CONFIG.neutralFrame - halfRange;
    const end = SWITCH_CONFIG.neutralFrame + halfRange;

    if (frameFloat <= start) return 0;
    if (frameFloat >= end) return 1;
    return (frameFloat - start) / (end - start);
  };

  const getRenderPayload = (progress) => {
    const phaseState = getPhaseState(progress);
    const frameFloat = getFrameFloat(phaseState);
    const frameIndex = clamp(Math.round(frameFloat), FRAME_RANGE.start, FRAME_RANGE.end);

    let fromType = '19in';
    let toType = null;
    let blend = 0;

    if (phaseState.phase === 'move1' || phaseState.phase === 'hold1') {
      fromType = '19in';
    } else if (phaseState.phase === 'move2') {
      const transition = getSwitchBlend(frameFloat);
      if (transition <= 0) {
        fromType = '19in';
      } else if (transition >= 1) {
        fromType = '20in';
      } else {
        fromType = '19in';
        toType = '20in';
        blend = transition;
      }
    } else if (phaseState.phase === 'hold2') {
      fromType = '20in';
    } else if (phaseState.phase === 'move3') {
      const transition = getSwitchBlend(frameFloat);
      if (transition <= 0) {
        fromType = '20in';
      } else if (transition >= 1) {
        fromType = '21in';
      } else {
        fromType = '20in';
        toType = '21in';
        blend = transition;
      }
    } else {
      fromType = '21in';
    }

    return {
      xRatio: getWheelXRatio(progress),
      yRatio: getWheelYRatio(progress),
      frameIndex,
      fromType,
      toType,
      blend,
    };
  };

  const drawFrame = (wheelType, frameIndex, centerX, centerY, size, alpha) => {
    const image = frameSets[wheelType]?.[frameIndex];
    if (!image) return;

    ctx.save();
    ctx.globalAlpha = clamp(alpha, 0, 1);
    ctx.drawImage(image, centerX - size / 2, centerY - size / 2, size, size);
    ctx.restore();
  };

  const textOpacityState = copyBlocks.map(() => -1);

  const ramp = (value, start, end) => {
    if (value <= start) return 0;
    if (value >= end) return 1;
    return (value - start) / Math.max(end - start, 0.00001);
  };

  const inverseRamp = (value, start, end) => 1 - ramp(value, start, end);

  const setTextOpacity = (index, opacity) => {
    const block = copyBlocks[index];
    if (!block) return;

    const clamped = clamp(opacity, 0, 1);
    if (Math.abs(textOpacityState[index] - clamped) < 0.001) return;

    textOpacityState[index] = clamped;
    block.style.opacity = clamped.toFixed(3);
  };

  const updateCopyVisibility = (progress) => {
    const p = clamp(progress, 0, 1);
    const mid12 = (PHASE.move2[0] + PHASE.move2[1]) * 0.5;
    const mid23 = (PHASE.move3[0] + PHASE.move3[1]) * 0.5;

    // Block 1: appears at first hold, then fades out and is gone by move2 midpoint.
    const block1In = ramp(p, TEXT_TRIGGER.block1, TEXT_TRIGGER.block1 + TEXT_TRANSITION.firstInSpan);
    const block1Out = inverseRamp(p, mid12 - TEXT_TRANSITION.fadeOutSpan, mid12);
    const opacity1 = Math.min(block1In, block1Out);

    // Block 2: starts fading in from move2 midpoint, then fades out by move3 midpoint.
    const block2In = ramp(p, mid12, mid12 + TEXT_TRANSITION.fadeInSpan);
    const block2Out = inverseRamp(p, mid23 - TEXT_TRANSITION.fadeOutSpan, mid23);
    const opacity2 = Math.min(block2In, block2Out);

    // Block 3: starts fading in from move3 midpoint.
    const opacity3 = ramp(p, mid23, mid23 + TEXT_TRANSITION.fadeInSpan);

    setTextOpacity(0, opacity1);
    setTextOpacity(1, opacity2);
    setTextOpacity(2, opacity3);
  };

  const render = () => {
    if (!isReady) return;

    const payload = getRenderPayload(animationState.progress);
    const wheelX = viewport.width * 0.5 + payload.xRatio * viewport.width;
    const wheelY = viewport.height * payload.yRatio;
    const wheelSize = getWheelSize();

    const renderSignature = [
      Math.round(wheelX),
      Math.round(wheelY),
      Math.round(wheelSize),
      payload.frameIndex,
      payload.fromType,
      payload.toType || '-',
      payload.blend.toFixed(3),
      viewport.width,
      viewport.height,
    ].join('|');

    if (renderSignature === lastRenderSignature) return;
    lastRenderSignature = renderSignature;

    ctx.setTransform(viewport.dpr, 0, 0, viewport.dpr, 0, 0);
    ctx.clearRect(0, 0, viewport.width, viewport.height);

    if (payload.toType) {
      drawFrame(payload.fromType, payload.frameIndex, wheelX, wheelY, wheelSize, 1 - payload.blend);
      drawFrame(payload.toType, payload.frameIndex, wheelX, wheelY, wheelSize, payload.blend);
    } else {
      drawFrame(payload.fromType, payload.frameIndex, wheelX, wheelY, wheelSize, 1);
    }
  };

  const scheduleRender = () => {
    if (rafToken) return;
    rafToken = requestAnimationFrame(() => {
      rafToken = 0;
      render();
    });
  };

  const resizeCanvas = () => {
    const rect = canvas.getBoundingClientRect();
    viewport.width = Math.max(1, Math.round(rect.width));
    viewport.height = Math.max(1, Math.round(rect.height));
    viewport.dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(viewport.width * viewport.dpr);
    canvas.height = Math.round(viewport.height * viewport.dpr);

    updateWheelEntryStartRatio();

    lastRenderSignature = '';
    scheduleRender();
  };

  let wheelsTrigger = null;

  const initScroll = () => {
    // Keep text slot fixed while wheel animates into it.
    section.style.setProperty('--wheel-text-y', `${(WHEEL_Y_RATIO.slot * 100).toFixed(3)}%`);

    wheelsTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: STORY_SCROLL_DISTANCE,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        animationState.progress = self.progress;
        updateCopyVisibility(self.progress);
        scheduleRender();
      },
    });

    animationState.progress = 0;
    updateCopyVisibility(0);
    scheduleRender();
  };

  let resizeRaf = 0;
  const onResize = () => {
    cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(() => {
      resizeCanvas();
      if (wheelsTrigger) ScrollTrigger.refresh();
    });
  };

  preloadFrames()
    .then(() => {
      isReady = true;
      resizeCanvas();
      initScroll();
      window.addEventListener('resize', onResize);
    })
    .catch((error) => {
      console.error('[wheels_story] preload failed:', error);
    });
})();
