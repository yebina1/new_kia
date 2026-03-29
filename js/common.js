const $gnbItems = Array.from(document.querySelectorAll('header nav ul.gnb > li'));
const $gnbList = document.querySelector('header nav ul.gnb');
const $headerNav = document.querySelector('header nav.glass_bg2');
const $headerInner = document.querySelector('header .inner');
const $headerBottom = document.querySelector('header .header_bottom');
const $subNav = document.querySelector('header .header_bottom .sub_nav');
const SUB_MENU_GAP = 8;
const GNB_PILL_PADDING_X = 16;
const GNB_PILL_PADDING_Y = 8;
const PILL_BOUNCE_MS = 420;
let getPrimaryActiveItem = () => null;
let isHoveringSubMenu = false;
let hoverLeaveTimer = null;
let $gnbActiveBg = null;
let $gnbHoverBg = null;
let hoveredGnbItem = null;

const resolveMenuKey = (item) => {
  const link = item?.querySelector('a');
  if (!link) return '';

  const href = (link.getAttribute('href') || '').toLowerCase();
  const label = link.textContent.replace(/\s+/g, ' ').trim().toLowerCase();

  if (href.includes('whykia.html')) return 'company';
  if (href.includes('list.html')) return 'vehicles';
  if (href.includes('recommended.html')) return 'shopping-assistant';
  if (href.includes('detail.html')) return 'inventory';
  if (href.includes('#map')) return 'center';
  if (label.includes('owners')) return 'owners';

  return '';
};

const subMenuMap = {
  company: [
    { label: 'why kia', href: 'whykia.html' },
    { label: 'safety', href: '#' },
    { label: 'kia media', href: '#' },
    { label: 'event', href: '#' },
  ],
  vehicles: [
    { label: 'EV', href: 'list.html#ev' },
    { label: 'Hybrid', href: 'list.html#hybrid' },
    { label: 'SUV / CUV / MPV', href: 'list.html#suv' },
    { label: 'sedan', href: 'list.html#sedan' },
  ],
  'shopping-assistant': [
    { label: 'build my kia', href: 'build.html' },
    { label: 'kia recommended', href: 'recommended.html' },
    { label: 'payment calculator', href: '#' },
    { label: 'trade in', href: '#' },
    { label: 'easy buy', href: '#' },
    { label: 'certified pre-owned', href: '#' },
    { label: 'sub shop', href: '#' },
  ],
  center: [
    { label: 'kia map', href: 'index.html#map' },
    { label: 'kia connect', href: '#' },
    { label: 'consultation', href: '#' },
    { label: 'FAQ', href: '#' },
    { label: 'test drive', href: '#' },
  ],
};

const setSubMenuAnchor = (menuItem) => {
  if (!$headerInner || !$headerBottom || !menuItem) return;

  const innerRect = $headerInner.getBoundingClientRect();
  const itemRect = menuItem.getBoundingClientRect();
  const navRect = $headerNav?.getBoundingClientRect();
  const navBottom = navRect ? navRect.bottom : itemRect.bottom;
  const centerX = itemRect.left + itemRect.width / 2 - innerRect.left;
  const topY = navBottom - innerRect.top + SUB_MENU_GAP;

  $headerBottom.style.left = `${centerX}px`;
  $headerBottom.style.top = `${topY}px`;
};

const renderSubMenu = (menuKey, menuItem) => {
  if (!$headerBottom || !$subNav) return;

  const subMenus = subMenuMap[menuKey];

  if (!subMenus || subMenus.length === 0) {
    $headerBottom.classList.add('is-hidden');
    $subNav.innerHTML = '';
    return;
  }

  $headerBottom.classList.remove('is-hidden');
  setSubMenuAnchor(menuItem);

  $subNav.innerHTML = subMenus
    .map(({ label, href }) => {
      return `<li><a href="${href}" data-text="${label}">${label}</a></li>`;
    })
    .join('');
};

const ensureGnbPillLayers = () => {
  if (!$gnbList) return;

  if (!$gnbActiveBg) {
    $gnbActiveBg = document.createElement('span');
    $gnbActiveBg.className = 'gnb_active_bg';
    $gnbList.prepend($gnbActiveBg);
  }

  if (!$gnbHoverBg) {
    $gnbHoverBg = document.createElement('span');
    $gnbHoverBg.className = 'gnb_hover_bg';
    $gnbList.prepend($gnbHoverBg);
  }
};

const triggerPillBounce = (pill) => {
  if (!pill) return;

  pill.classList.remove('is-bounce');
  void pill.offsetWidth;
  pill.classList.add('is-bounce');

  window.setTimeout(() => {
    pill.classList.remove('is-bounce');
  }, PILL_BOUNCE_MS);
};

const setGnbPillPosition = (item, pill, options = {}) => {
  if (!$gnbList || !pill || !item) return;
  const { bounce = true } = options;

  const $anchor = item.querySelector('a');
  const targetRect = ($anchor || item).getBoundingClientRect();
  const listRect = $gnbList.getBoundingClientRect();
  const x = Math.round(targetRect.left - listRect.left - GNB_PILL_PADDING_X);
  const y = Math.round(targetRect.top - listRect.top - GNB_PILL_PADDING_Y);
  const width = Math.round(targetRect.width + GNB_PILL_PADDING_X * 2);
  const height = Math.round(targetRect.height + GNB_PILL_PADDING_Y * 2);

  const prevX = Number(pill.dataset.x ?? NaN);
  const prevY = Number(pill.dataset.y ?? NaN);
  const prevW = Number(pill.dataset.w ?? NaN);
  const prevH = Number(pill.dataset.h ?? NaN);
  const moved = prevX !== x || prevY !== y || prevW !== width || prevH !== height;

  pill.style.width = `${width}px`;
  pill.style.height = `${height}px`;
  pill.style.transform = `translate(${x}px, ${y}px)`;
  pill.style.opacity = '1';

  pill.dataset.x = String(x);
  pill.dataset.y = String(y);
  pill.dataset.w = String(width);
  pill.dataset.h = String(height);

  if (bounce && moved) {
    triggerPillBounce(pill);
  }
};

const setGnbActiveBg = (item, options = {}) => {
  if (!$gnbActiveBg || !item) return;
  setGnbPillPosition(item, $gnbActiveBg, options);
};

const hideGnbActiveBg = () => {
  if (!$gnbActiveBg) return;
  $gnbActiveBg.classList.remove('is-bounce');
  $gnbActiveBg.style.opacity = '0';
};

const setGnbHoverBg = (item, options = {}) => {
  if (!$gnbHoverBg || !item) return;
  if (item.classList.contains('on')) {
    hideGnbHoverBg();
    return;
  }

  setGnbPillPosition(item, $gnbHoverBg, options);
};

const hideGnbHoverBg = () => {
  if (!$gnbHoverBg) return;
  $gnbHoverBg.classList.remove('is-bounce');
  $gnbHoverBg.style.opacity = '0';
};

if ($gnbItems.length > 0) {
  ensureGnbPillLayers();

  const clearPrimaryActive = () => {
    $gnbItems.forEach((li) => {
      li.classList.remove('on');
    });
    hideGnbActiveBg();
  };

  const setPrimaryActive = (target) => {
    clearPrimaryActive();
    target.classList.add('on');
    setGnbActiveBg(target);
  };

  const getPrimaryActive = () => $gnbItems.find((item) => item.classList.contains('on')) || null;
  getPrimaryActiveItem = getPrimaryActive;

  $gnbItems.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      hoveredGnbItem = item;
      setGnbHoverBg(item);
      renderSubMenu(resolveMenuKey(item), item);
    });

    item.addEventListener('focusin', () => {
      hoveredGnbItem = item;
      setGnbHoverBg(item);
      renderSubMenu(resolveMenuKey(item), item);
    });

    item.addEventListener('click', () => {
      setPrimaryActive(item);
      hoveredGnbItem = item;
      setGnbHoverBg(item);
      renderSubMenu(resolveMenuKey(item), item);
    });
  });

  const resetSubMenuToActive = () => {
    const activeItem = getPrimaryActive();
    if (!activeItem) {
      renderSubMenu('', null);
      return;
    }
    renderSubMenu(resolveMenuKey(activeItem), activeItem);
  };

  const clearHoverLeaveTimer = () => {
    if (!hoverLeaveTimer) return;
    clearTimeout(hoverLeaveTimer);
    hoverLeaveTimer = null;
  };

  $gnbList?.addEventListener('mouseenter', () => {
    clearHoverLeaveTimer();
  });

  $gnbList?.addEventListener('mouseleave', () => {
    hoveredGnbItem = null;
    hideGnbHoverBg();
    clearHoverLeaveTimer();
    hoverLeaveTimer = window.setTimeout(() => {
      if (isHoveringSubMenu) return;
      resetSubMenuToActive();
    }, 120);
  });

  clearPrimaryActive();
  renderSubMenu('', null);

  $headerBottom?.addEventListener('mouseenter', () => {
    isHoveringSubMenu = true;
    clearHoverLeaveTimer();
  });

  $headerBottom?.addEventListener('mouseleave', () => {
    isHoveringSubMenu = false;
    resetSubMenuToActive();
  });
}

window.addEventListener('resize', () => {
  const activeItem = getPrimaryActiveItem();
  if (activeItem) {
    setGnbActiveBg(activeItem, { bounce: false });
  } else {
    hideGnbActiveBg();
  }

  if (hoveredGnbItem) {
    setGnbHoverBg(hoveredGnbItem, { bounce: false });
  }

  if (!activeItem || !$headerBottom || $headerBottom.classList.contains('is-hidden')) return;
  setSubMenuAnchor(activeItem);
});

$subNav?.addEventListener('click', (event) => {
  const $anchor = event.target.closest('a');
  if (!$anchor) return;

  const $targetLi = $anchor.parentElement;
  if (!$targetLi) return;

  $subNav.querySelectorAll('li').forEach((li) => {
    li.classList.remove('on');
  });
  $targetLi.classList.add('on');
});

const $header = document.querySelector('header');
let $lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const $currentScrollY = window.scrollY;

  if ($currentScrollY > 100 && $currentScrollY > $lastScrollY) {
    $header.classList.add('hide');
  } else {
    $header.classList.remove('hide');
  }

  $lastScrollY = $currentScrollY;
});

const $familySite = document.querySelector('footer .f_fam');
const $familyToggle = document.querySelector('footer .f_fam strong');

if ($familySite && $familyToggle) {
  $familyToggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    $familySite.classList.toggle('on');
  });

  document.addEventListener('click', (e) => {
    if (!$familySite.contains(e.target)) {
      $familySite.classList.remove('on');
    }
  });
}
