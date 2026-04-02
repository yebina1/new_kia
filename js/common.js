// Naming rule: const/let variables use $camelCase, function names and parameters use camelCase.
const $gnbItems = Array.from(document.querySelectorAll('header nav ul.gnb > li'));
const $gnbList = document.querySelector('header nav ul.gnb');
const $headerNav = document.querySelector('header nav.glass_bg2');
const $headerInner = document.querySelector('header .inner');
const $headerBottom = document.querySelector('header .header_bottom');
const $subNav = document.querySelector('header .header_bottom .sub_nav');
const $subMenuGap = 8;
const $gnbPillPaddingX = 16;
const $gnbPillPaddingY = 8;
const $pillBounceMs = 420;
let $getPrimaryActiveItem = () => null;
let $isHoveringSubMenu = false;
let $hoverLeaveTimer = null;
let $gnbActiveBg = null;
let $gnbHoverBg = null;
let $hoveredGnbItem = null;

const $isPlaceholderHref = (href) => {
  if (typeof href !== 'string') return true;

  const normalizedHref = href.trim();
  return normalizedHref === '' || normalizedHref === '#';
};

const $isDisabledHeaderFooterLink = (anchor) => {
  if (!(anchor instanceof HTMLAnchorElement)) return false;
  if (!anchor.closest('header, footer')) return false;
  if (anchor.classList.contains('icon_menu')) return false;

  return $isPlaceholderHref(anchor.getAttribute('href'));
};

const $syncDisabledHeaderFooterLinks = (root = document) => {
  const $anchors = root instanceof Document
    ? root.querySelectorAll('header a, footer a')
    : root.querySelectorAll('a');

  $anchors.forEach((anchor) => {
    if (!$isDisabledHeaderFooterLink(anchor)) return;

    anchor.setAttribute('aria-disabled', 'true');
    anchor.setAttribute('tabindex', '-1');
  });
};

const $isDisabledPrimaryMenuItem = (item) => {
  const link = item?.querySelector(':scope > a');
  return $isDisabledHeaderFooterLink(link);
};

document.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const anchor = target.closest('a');
  if (!$isDisabledHeaderFooterLink(anchor)) return;

  event.preventDefault();
  event.stopPropagation();
}, true);

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter' && event.key !== ' ') return;
  if (!$isDisabledHeaderFooterLink(document.activeElement)) return;

  event.preventDefault();
  event.stopPropagation();
}, true);

$syncDisabledHeaderFooterLinks();

const $resolveMenuKey = (item) => {
  const link = item?.querySelector('a');
  if (!link) return '';

  const href = (link.getAttribute('href') || '').toLowerCase();
  const label = link.textContent.replace(/\s+/g, ' ').trim().toLowerCase();

  if (href.includes('whykia.html')) return 'company';
  if (href.includes('list.html')) return 'vehicles';
  if (href.includes('recommended.html')) return 'shopping-assistant';
  if (href.includes('detail.html')) return 'inventory';
  if (href.includes('#map') || label.includes('center')) return 'center';
  if (label.includes('owners')) return 'owners';

  return '';
};

const $subMenuMap = {
  company: [
    { label: 'why kia', href: 'whykia.html' },
    { label: 'safety', href: '' },
    { label: 'kia media', href: '' },
    { label: 'event', href: '' },
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
    { label: 'payment calculator', href: '' },
    { label: 'trade in', href: '' },
    { label: 'easy buy', href: '' },
    { label: 'certified pre-owned', href: '' },
    { label: 'sub shop', href: '' },
  ],
  center: [
    { label: 'kia map', href: '' },
    { label: 'kia connect', href: '' },
    { label: 'consultation', href: '' },
    { label: 'FAQ', href: '' },
    { label: 'test drive', href: '' },
  ],
};

const $setSubMenuAnchor = (menuItem) => {
  if (!$headerInner || !$headerBottom || !menuItem) return;

  const innerRect = $headerInner.getBoundingClientRect();
  const itemRect = menuItem.getBoundingClientRect();
  const navRect = $headerNav?.getBoundingClientRect();
  const navBottom = navRect ? navRect.bottom : itemRect.bottom;
  const centerX = itemRect.left + itemRect.width / 2 - innerRect.left;
  const topY = navBottom - innerRect.top + $subMenuGap;

  $headerBottom.style.left = `${centerX}px`;
  $headerBottom.style.top = `${topY}px`;
};

const $renderSubMenu = (menuKey, menuItem) => {
  if (!$headerBottom || !$subNav) return;

  const subMenus = $subMenuMap[menuKey];

  if (!subMenus || subMenus.length === 0) {
    $headerBottom.classList.add('is-hidden');
    $subNav.innerHTML = '';
    return;
  }

  $headerBottom.classList.remove('is-hidden');
  $setSubMenuAnchor(menuItem);

  $subNav.innerHTML = subMenus
    .map(({ label, href }) => {
      const disabledAttrs = $isPlaceholderHref(href) ? ' aria-disabled="true" tabindex="-1"' : '';
      return `<li><a href="${href}" data-text="${label}"${disabledAttrs}>${label}</a></li>`;
    })
    .join('');

  $syncDisabledHeaderFooterLinks($headerBottom);
};

const $ensureGnbPillLayers = () => {
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

const $triggerPillBounce = (pill) => {
  if (!pill) return;

  pill.classList.remove('is-bounce');
  void pill.offsetWidth;
  pill.classList.add('is-bounce');

  window.setTimeout(() => {
    pill.classList.remove('is-bounce');
  }, $pillBounceMs);
};

const $setGnbPillPosition = (item, pill, options = {}) => {
  if (!$gnbList || !pill || !item) return;
  const { bounce = true } = options;

  const $anchor = item.querySelector('a');
  const targetRect = ($anchor || item).getBoundingClientRect();
  const listRect = $gnbList.getBoundingClientRect();
  const x = Math.round(targetRect.left - listRect.left - $gnbPillPaddingX);
  const y = Math.round(targetRect.top - listRect.top - $gnbPillPaddingY);
  const width = Math.round(targetRect.width + $gnbPillPaddingX * 2);
  const height = Math.round(targetRect.height + $gnbPillPaddingY * 2);

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
    $triggerPillBounce(pill);
  }
};

const $setGnbActiveBg = (item, options = {}) => {
  if (!$gnbActiveBg || !item) return;
  $setGnbPillPosition(item, $gnbActiveBg, options);
};

const $hideGnbActiveBg = () => {
  if (!$gnbActiveBg) return;
  $gnbActiveBg.classList.remove('is-bounce');
  $gnbActiveBg.style.opacity = '0';
};

const $setGnbHoverBg = (item, options = {}) => {
  if (!$gnbHoverBg || !item) return;
  if (item.classList.contains('on')) {
    $hideGnbHoverBg();
    return;
  }

  $setGnbPillPosition(item, $gnbHoverBg, options);
};

const $hideGnbHoverBg = () => {
  if (!$gnbHoverBg) return;
  $gnbHoverBg.classList.remove('is-bounce');
  $gnbHoverBg.style.opacity = '0';
};

if ($gnbItems.length > 0) {
  $ensureGnbPillLayers();

  const clearPrimaryActive = () => {
    $gnbItems.forEach((li) => {
      li.classList.remove('on');
    });
    $hideGnbActiveBg();
  };

  const setPrimaryActive = (target) => {
    clearPrimaryActive();
    target.classList.add('on');
    $setGnbActiveBg(target);
  };

  const getPrimaryActive = () => $gnbItems.find((item) => item.classList.contains('on')) || null;
  $getPrimaryActiveItem = getPrimaryActive;

  const resetDisabledPrimaryHoverState = () => {
    $hoveredGnbItem = null;
    $hideGnbHoverBg();
    resetSubMenuToActive();
  };

  $gnbItems.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      if ($isDisabledPrimaryMenuItem(item)) {
        resetDisabledPrimaryHoverState();
        return;
      }

      $hoveredGnbItem = item;
      $setGnbHoverBg(item);
      $renderSubMenu($resolveMenuKey(item), item);
    });

    item.addEventListener('focusin', () => {
      if ($isDisabledPrimaryMenuItem(item)) {
        resetDisabledPrimaryHoverState();
        return;
      }

      $hoveredGnbItem = item;
      $setGnbHoverBg(item);
      $renderSubMenu($resolveMenuKey(item), item);
    });

    item.addEventListener('click', () => {
      if ($isDisabledPrimaryMenuItem(item)) return;

      setPrimaryActive(item);
      $hoveredGnbItem = item;
      $setGnbHoverBg(item);
      $renderSubMenu($resolveMenuKey(item), item);
    });
  });

  const resetSubMenuToActive = () => {
    const activeItem = getPrimaryActive();
    if (!activeItem) {
      $renderSubMenu('', null);
      return;
    }
    $renderSubMenu($resolveMenuKey(activeItem), activeItem);
  };

  const clearHoverLeaveTimer = () => {
    if (!$hoverLeaveTimer) return;
    clearTimeout($hoverLeaveTimer);
    $hoverLeaveTimer = null;
  };

  $gnbList?.addEventListener('mouseenter', () => {
    clearHoverLeaveTimer();
  });

  $gnbList?.addEventListener('mouseleave', () => {
    $hoveredGnbItem = null;
    $hideGnbHoverBg();
    clearHoverLeaveTimer();
    $hoverLeaveTimer = window.setTimeout(() => {
      if ($isHoveringSubMenu) return;
      resetSubMenuToActive();
    }, 120);
  });

  clearPrimaryActive();
  $renderSubMenu('', null);

  $headerBottom?.addEventListener('mouseenter', () => {
    $isHoveringSubMenu = true;
    clearHoverLeaveTimer();
  });

  $headerBottom?.addEventListener('mouseleave', () => {
    $isHoveringSubMenu = false;
    resetSubMenuToActive();
  });
}

window.addEventListener('resize', () => {
  const activeItem = $getPrimaryActiveItem();
  if (activeItem) {
    $setGnbActiveBg(activeItem, { bounce: false });
  } else {
    $hideGnbActiveBg();
  }

  if ($hoveredGnbItem) {
    $setGnbHoverBg($hoveredGnbItem, { bounce: false });
  }

  if (!activeItem || !$headerBottom || $headerBottom.classList.contains('is-hidden')) return;
  $setSubMenuAnchor(activeItem);
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
const $mobileHam = document.querySelector('header .m_panel');
const $mobileHamOpen = document.querySelector('header .icon_menu');
const $mobileHamClose = document.querySelector('header .close');
const $mobileHamItems = Array.from(document.querySelectorAll('header .m_gnb > li'));
const $mobileHamBreakpoint = 1500;
const $topButtonPages = new Set(['index.html', 'list.html', 'whykia.html', 'detail.html', '']);
const $currentPageName = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
let $pageTopBtn = null;

function syncPageTopButtonVisibility() {
  if (!$pageTopBtn) return;

  const shouldShow = window.scrollY > Math.max(window.innerHeight * 0.6, 240);
  $pageTopBtn.classList.toggle('is-visible', shouldShow);
}

function initPageTopButton() {
  if (!$topButtonPages.has($currentPageName)) return;

  $pageTopBtn = document.createElement('button');
  $pageTopBtn.type = 'button';
  $pageTopBtn.className = 'page_top_btn';
  $pageTopBtn.setAttribute('aria-label', 'Back to top');
  $pageTopBtn.innerHTML = `
    <svg class="page_top_btn_icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 18V7"></path>
      <path d="M7.5 11.5L12 7l4.5 4.5"></path>
    </svg>
  `;

  $pageTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  document.body.appendChild($pageTopBtn);
  syncPageTopButtonVisibility();
}

function closeMobileHam() {
  if (!$mobileHam) return;
  document.body.classList.remove('mobile_ham_open');
  $mobileHam.setAttribute('aria-hidden', 'true');
  $mobileHamOpen?.setAttribute('aria-expanded', 'false');
}

function openMobileHam() {
  if (!$mobileHam || window.innerWidth > $mobileHamBreakpoint) return;
  document.body.classList.add('mobile_ham_open');
  $header?.classList.remove('hide');
  $mobileHam.setAttribute('aria-hidden', 'false');
  $mobileHamOpen?.setAttribute('aria-expanded', 'true');
}

function syncMobileHamAccordion(item, isOpen) {
  const $button = item?.querySelector(':scope > button');
  if (!item || !$button) return;
  item.classList.toggle('on', isOpen);
  $button.setAttribute('aria-expanded', String(isOpen));
}

if ($mobileHam && $mobileHamOpen) {
  $mobileHamOpen.setAttribute('aria-expanded', 'false');
  $mobileHamItems.forEach((item) => {
    const $button = item.querySelector(':scope > button');
    const $submenu = item.querySelector(':scope > .m_sub');
    if (!$button || !$submenu) return;
    syncMobileHamAccordion(item, false);
  });

  $mobileHamOpen.addEventListener('click', (event) => {
    if (window.innerWidth > $mobileHamBreakpoint) return;
    event.preventDefault();

    if (document.body.classList.contains('mobile_ham_open')) {
      closeMobileHam();
      return;
    }

    openMobileHam();
  });

  $mobileHamClose?.addEventListener('click', closeMobileHam);

  $mobileHam.addEventListener('click', (event) => {
    if (event.target === $mobileHam) {
      closeMobileHam();
    }
  });

  $mobileHamItems.forEach((item) => {
    const $button = item.querySelector(':scope > button');
    const $submenu = item.querySelector(':scope > .m_sub');
    if (!$button || !$submenu) return;

    $button.addEventListener('click', () => {
      const $nextState = !item.classList.contains('on');

      $mobileHamItems.forEach((otherItem) => {
        const $otherSubmenu = otherItem.querySelector(':scope > .m_sub');
        if (!$otherSubmenu) return;
        syncMobileHamAccordion(otherItem, false);
      });

      syncMobileHamAccordion(item, $nextState);
    });
  });

  $mobileHam.querySelectorAll('a').forEach((anchor) => {
    anchor.addEventListener('click', () => {
      closeMobileHam();
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMobileHam();
    }
  });
}

initPageTopButton();

window.addEventListener('scroll', () => {
  const $currentScrollY = window.scrollY;

  if (document.body.classList.contains('mobile_ham_open')) {
    $header.classList.remove('hide');
    $lastScrollY = $currentScrollY;
    syncPageTopButtonVisibility();
    return;
  }

  if ($currentScrollY > 100 && $currentScrollY > $lastScrollY) {
    $header.classList.add('hide');
  } else {
    $header.classList.remove('hide');
  }

  $lastScrollY = $currentScrollY;
  syncPageTopButtonVisibility();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > $mobileHamBreakpoint) {
    closeMobileHam();
  }
});

const $familySite = document.querySelector('footer .f_fam');
const $familyToggle = document.querySelector('footer .f_fam strong');
const $whiteOriginTriggers = Array.from(document.querySelectorAll('.white_origin'));

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

$whiteOriginTriggers.forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    const href = trigger.getAttribute('href');
    const isToggleOnlyLink =
      trigger.tagName === 'A' && (!href || href === '#' || href.trim() === '');

    if (isToggleOnlyLink) {
      event.preventDefault();
    }

    trigger.classList.toggle('on');
  });
});
