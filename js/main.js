/* section.ev6 */
const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
    const mix = (a, b, t) => a + (b - a) * t;
    const sstep = (a, b, v) => {
      const t = clamp((v - a) / (b - a));
      return t * t * (3 - 2 * t);
    };

    const section = document.getElementById('scrollScene');
    const bgTrack = document.getElementById('bgTrack');
    const stickyScene = document.getElementById('scene');
    const bg1Img = document.getElementById('bg1Img');
    const bg2Img = document.getElementById('bg2Img');
    const carWrap = document.getElementById('carWrap');
    const solidCar = document.getElementById('solidCar');
    const xrayCar = document.getElementById('xrayCar');
    const dashMask = document.getElementById('dashMask');
    const luggageMask = document.getElementById('luggageMask');
    const seatingMask = document.getElementById('seatingMask');
    const carpetsMask = document.getElementById('carpetsMask');
    const detailsLayer = document.getElementById('detailsLayer');
    const dashPhotoCard = document.getElementById('dashPhotoCard');
    const luggagePhotoCard = document.getElementById('luggagePhotoCard');
    const seatingPhotoCard = document.getElementById('seatingPhotoCard');
    const carpetsPhotoCard = document.getElementById('carpetsPhotoCard');
    const root = document.documentElement;

    function render() {
      const total = Math.max(section.offsetHeight - window.innerHeight, 1);
      const passed = clamp(-section.getBoundingClientRect().top, 0, total);
      const p = passed / total;
      const vh = window.innerHeight;

      const baseEnd = 0.49;
      const baseP = clamp(p / baseEnd);

      const enterP = sstep(0.03, 0.24, baseP);
      const cruiseP = sstep(0.24, 0.46, baseP);
      const panelPushP = sstep(0.46, 0.68, baseP);
      const morphP = sstep(0.72, 0.84, baseP);

      const trackY = Math.round(mix(0, -vh, panelPushP));
      bgTrack.style.transform = `translate3d(0, ${trackY}px, 0)`;

      const bg1InnerY = mix(0, -vh * 0.03, sstep(0.06, 0.46, baseP));
      const bg2InnerY = mix(vh * 0.035, 0, panelPushP);
      const bg1Scale = mix(1.02, 1.0, panelPushP);
      const bg2Scale = mix(1.04, 1.0, panelPushP);

      if (bg1Img) bg1Img.style.transform = `translate3d(0, ${Math.round(bg1InnerY)}px, 0) scale(${bg1Scale * 1.002})`; 
      bg2Img.style.transform = `translate3d(0, ${Math.round(bg2InnerY)}px, 0) scale(${bg2Scale * 1.002})`;

      const carHeight = carWrap.offsetHeight;
      const startY = carHeight * 1.18 + vh * 0.18;
      const enterY = mix(startY, -vh * 0.04, enterP);
      const cruiseY = mix(0, -vh * 0.04, cruiseP);
      const settleY = mix(0, -vh * 0.08, panelPushP);
      const y = enterY + cruiseY + settleY;

      const approachScale = mix(1.12, 1.0, enterP);
      const shrinkScale = mix(1.0, 0.5, panelPushP);
      const holdScale = approachScale * shrinkScale;
      carWrap.style.transform = `translate(-50%, -100%) translate3d(0, ${y}px, 0) scale(${holdScale})`;

      const solidVisibleP = sstep(0.05, 0.14, baseP);
      const solidOpacity = solidVisibleP * (1 - morphP);
      const solidBlur = mix(18, 0, solidVisibleP);
      const solidShadowY = mix(84, 32, panelPushP);
      const solidShadowBlur = mix(120, 56, panelPushP);
      solidCar.style.opacity = String(solidOpacity);
      solidCar.style.filter = `drop-shadow(0 ${solidShadowY}px ${solidShadowBlur}px rgba(0,0,0,0.45)) blur(${solidBlur}px)`;

      const xrayOpacity = morphP;
      const xrayBlur = mix(8, 0.6, morphP);
      const xrayGlow = mix(8, 26, morphP);
      const xrayBrightness = mix(1.0, 1.08, morphP);
      xrayCar.style.opacity = String(xrayOpacity);
      xrayCar.style.filter = `drop-shadow(0 0 ${xrayGlow}px rgba(255,255,255,0.16)) blur(${xrayBlur}px) brightness(${xrayBrightness})`;

      const bodyBlend = sstep(0.56, 0.74, baseP);
      const sceneBg = bodyBlend < 0.5 ? '#000000' : '#252941';
      section.style.backgroundColor = sceneBg;
      if (stickyScene) stickyScene.style.backgroundColor = sceneBg;

      const bg2StageP = clamp((p - baseEnd) / (1 - baseEnd));

      const dashReveal = sstep(0.05, 0.15, bg2StageP);
      const dashFadeOut = sstep(0.22, 0.26, bg2StageP);
      const dashVisible = dashReveal > 0.001 ? (1 - dashFadeOut) : 0;
      dashMask.style.opacity = String(dashVisible);
      dashMask.style.clipPath = `inset(${(1 - dashReveal) * 100}% 0 0 0)`;

      const luggageReveal = sstep(0.31, 0.40, bg2StageP);
      const luggageFadeOut = sstep(0.47, 0.51, bg2StageP);
      const seatReveal = sstep(0.56, 0.65, bg2StageP);
      const seatFadeOut = sstep(0.72, 0.76, bg2StageP);
      const carpetReveal = sstep(0.81, 0.90, bg2StageP);

      const luggageVisible = luggageReveal > 0.001 ? (1 - luggageFadeOut) : 0;
      luggageMask.style.opacity = String(luggageVisible);
      luggageMask.style.clipPath = `inset(${(1 - luggageReveal) * 100}% 0 0 0)`;

      const seatVisible = seatReveal > 0.001 ? (1 - seatFadeOut) : 0;
      seatingMask.style.opacity = String(seatVisible);
      seatingMask.style.clipPath = `inset(${(1 - seatReveal) * 100}% 0 0 0)`;

      const carpetVisible = carpetReveal > 0.001 ? carpetReveal : 0;
      carpetsMask.style.opacity = String(carpetVisible);
      carpetsMask.style.clipPath = `inset(${(1 - carpetReveal) * 100}% 0 0 0)`;

      const anyDetailsOn = bg2StageP >= 0.11;
      detailsLayer.style.opacity = anyDetailsOn ? '1' : '0';
      detailsLayer.style.transform = anyDetailsOn ? 'translate3d(0, 0, 0)' : 'translate3d(0, 18px, 0)';

      const dashPhotoOpacity = sstep(0.11, 0.16, bg2StageP) * (1 - sstep(0.22, 0.26, bg2StageP));
      const nextPhotoOpacity = sstep(0.37, 0.42, bg2StageP) * (1 - sstep(0.47, 0.51, bg2StageP));
      const seatPhotoOpacity = sstep(0.62, 0.67, bg2StageP) * (1 - sstep(0.72, 0.76, bg2StageP));
      const carpetPhotoOpacity = sstep(0.87, 0.92, bg2StageP);

      dashPhotoCard.style.opacity = String(dashPhotoOpacity);
      dashPhotoCard.style.transform = `translate3d(0, ${dashPhotoOpacity > 0 ? 0 : 18}px, 0) scale(${dashPhotoOpacity > 0 ? 1 : 0.76})`;
      luggagePhotoCard.style.opacity = String(nextPhotoOpacity);
      luggagePhotoCard.style.transform = `translate3d(0, ${nextPhotoOpacity > 0 ? 0 : 18}px, 0) scale(${nextPhotoOpacity > 0 ? 1 : 0.76})`;
      seatingPhotoCard.style.opacity = String(seatPhotoOpacity);
      seatingPhotoCard.style.transform = `translate3d(0, ${seatPhotoOpacity > 0 ? 0 : 18}px, 0) scale(${seatPhotoOpacity > 0 ? 1 : 0.76})`;
      carpetsPhotoCard.style.opacity = String(carpetPhotoOpacity);
      carpetsPhotoCard.style.transform = `translate3d(0, ${carpetPhotoOpacity > 0 ? 0 : 18}px, 0) scale(${carpetPhotoOpacity > 0 ? 1 : 0.76})`;

      const dashFocusOn = bg2StageP >= 0.11 && bg2StageP < 0.22;
      const luggageFocusOn = bg2StageP >= 0.37 && bg2StageP < 0.47;
      const seatingFocusOn = bg2StageP >= 0.62 && bg2StageP < 0.72;
      const carpetFocusOn = bg2StageP >= 0.87;

      root.style.setProperty('--dash-grow', dashFocusOn ? '1' : '0');
      root.style.setProperty('--luggage-grow', luggageFocusOn ? '1' : '0');
      root.style.setProperty('--seating-grow', seatingFocusOn ? '1' : '0');
      root.style.setProperty('--carpet-grow', carpetFocusOn ? '1' : '0');
      root.style.setProperty('--photo-scale', '1');
      root.style.setProperty('--photo-opacity', '1');
      root.style.setProperty('--photo-y', '0px');
    }

    let rafId = null;
    const requestRender = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        render();
        rafId = null;
      });
    };

    window.addEventListener('scroll', requestRender, { passive: true });
    window.addEventListener('resize', requestRender);
    window.addEventListener('load', requestRender);
    requestRender();

/* section.match */
function handleScroll() {
  const $containerTop = $container.offsetTop;
  const $containerHeight = $container.offsetHeight;
  const $scrollable = $containerHeight - window.innerHeight;
  const $scrolled = window.scrollY - $containerTop;
  const $p = Math.max(0, Math.min(1, $scrolled / $scrollable));
  $progress = $p * $totalDuration;

  if ($rafId) cancelAnimationFrame($rafId);
  $rafId = requestAnimationFrame(() => {
    updateLayers();
    $rafId = null;
  });
}

window.addEventListener("scroll", handleScroll, { passive: true });
window.addEventListener("resize", handleScroll, { passive: true });
handleScroll();

const $intro = document.querySelector('.intro');
const $options = document.querySelectorAll('section[class*="option"]');

function initLenis() {
  const $lenis = new Lenis();
  window.$mainLenis = $lenis;
  $lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => $lenis.raf(time * 20000));
  gsap.ticker.lagSmoothing(0);
}
function setupIntroScroll() {
  if ($intro) {
    ScrollTrigger.create({
      trigger: $intro,
      start: 'top top',
      end: '+=100%',
    });
  }
}

function setupOptionScroll() {
  const optionsArr = gsap.utils.toArray('section[class*="option"]');

  optionsArr.forEach(($sec, index) => {
    const isLastCard = index === optionsArr.length - 1;
    const nextSection = optionsArr[index + 1];
    ScrollTrigger.create({
      trigger: $sec,
      start: 'top top',
      end: isLastCard ? '+=100vh' : 'top top',
      endTrigger: isLastCard ? null : nextSection,
      pin: true,
      pinSpacing: isLastCard,
    });
  });

  optionsArr.forEach(($sec, index) => {
    if (index < optionsArr.length - 1) {
      ScrollTrigger.create({
        trigger: optionsArr[index + 1],
        start: 'top bottom',
        end: 'top top',
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set($sec, {
            scale: 1 - progress * 0.25,      // 100% -> 75%
            opacity: 1 - progress,           // 1 -> 0
          });
        },
      });
    }
  });
}

initLenis();
setupIntroScroll();
setupOptionScroll();

function setupMatchCursor() {
  const $cards = document.querySelectorAll('.match section[class*="option"] .bottom>ul.cars>li');
  const canUseCustomCursor = window.matchMedia('(pointer: fine)').matches;

  if (!$cards.length || !canUseCustomCursor) return;

  const $cursor = document.createElement('div');
  const $label = document.createElement('span');

  $cursor.className = 'match-cursor';
  $label.textContent = 'Explore';
  $cursor.appendChild($label);
  document.body.appendChild($cursor);

  function moveCursor(event) {
    $cursor.style.left = `${event.clientX}px`;
    $cursor.style.top = `${event.clientY}px`;
  }

  function showCursor(event) {
    moveCursor(event);
    $cursor.classList.add('is-visible');
  }

  function hideCursor() {
    $cursor.classList.remove('is-visible');
    $cursor.classList.remove('is-active');
  }

  function activateCursor() {
    $cursor.classList.add('is-active');
  }

  function deactivateCursor() {
    $cursor.classList.remove('is-active');
  }

  $cards.forEach(($card) => {
    $card.addEventListener('pointerenter', showCursor);
    $card.addEventListener('pointermove', moveCursor);
    $card.addEventListener('pointerleave', hideCursor);
    $card.addEventListener('pointerdown', activateCursor);
    $card.addEventListener('pointerup', deactivateCursor);
    $card.addEventListener('pointercancel', deactivateCursor);
  });

  window.addEventListener('blur', hideCursor);
  window.addEventListener('scroll', hideCursor, { passive: true });
  window.addEventListener('pointerup', deactivateCursor);
}

setupMatchCursor();

function setupRailWidth() {
    const $stage = document.querySelector(".belt_stage");
    const $railItems = document.querySelectorAll(".rail_item");
    if (!$stage || !$railItems.length) return;

    const $stageWidth = $stage.getBoundingClientRect().width;
    document.documentElement.style.setProperty("--belt-stage-width", `${$stageWidth}px`);
    $railItems.forEach(($item) => {
        $item.style.width = `${$stageWidth}px`;
    });
}

let $beltLoopState = [];

function stopBeltLoops() {
    $beltLoopState.forEach(($state) => {
        cancelAnimationFrame($state.rafId);
    });
    $beltLoopState = [];
}

function setupLoopTrack(trackSelector) {
    const $track = document.querySelector(trackSelector);
    if (!$track) return;

    const $beltSpeed = Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--belt-speed")
    ) || 180;
    const $computedStyle = getComputedStyle($track);
    const $gapValue = $computedStyle.gap || $computedStyle.columnGap || "0";
    const $gap = Number.isFinite(Number.parseFloat($gapValue)) ? Number.parseFloat($gapValue) : 0;
    const $state = {
        offset: 0,
        lastTime: 0,
        rafId: 0,
        speed: $beltSpeed,
        track: $track,
        gap: $gap,
    };

    function step(time) {
        if (!$state.lastTime) {
            $state.lastTime = time;
        }

        const $deltaTime = (time - $state.lastTime) / 1000;
        $state.lastTime = time;
        $state.offset -= $state.speed * $deltaTime;

        let $firstItem = $state.track.firstElementChild;
        while ($firstItem) {
            const $firstWidth = $firstItem.getBoundingClientRect().width + $state.gap;
            if (!$firstWidth) break;
            if ($state.offset > -$firstWidth) break;

            $state.offset += $firstWidth;
            $state.track.appendChild($firstItem);
            $firstItem = $state.track.firstElementChild;
        }

        $state.track.style.transform = `translate3d(${$state.offset}px, 0, 0)`;
        $state.rafId = requestAnimationFrame(step);
    }

    $state.rafId = requestAnimationFrame(step);
    $beltLoopState.push($state);
}

function setupPartnerBelt() {
    stopBeltLoops();
    setupRailWidth();
    setupLoopTrack(".rail_track");
    setupLoopTrack(".car_track");
}

window.addEventListener("load", setupPartnerBelt);
window.addEventListener("DOMContentLoaded", setupPartnerBelt);
window.addEventListener("resize", setupPartnerBelt);


/* section.review */
const $reviewSection = document.querySelector('.review');
const $reviewCon = document.querySelector('.review_con');
const $lists = document.querySelectorAll('.review_con ul');
const $items = document.querySelectorAll('.review_con li');
const $modal = document.querySelector('.modal');
const $reviewFirstList = $lists[0];

let $currentScroll = 0;
let $step = 276;
let $maxScroll = 0;
let $isWaiting = false;
let $modalShown = false;
let $isCaptured = false;
let $lockedScrollY = 0;
let $reviewScrollTop = 0;
let $captureLockedUntil = 0;
let $releasePending = false;

const $scrollLockTime = 700;
const $modalCloseDelay = 300;
const $captureTolerance = 80;
const $wheelNoiseThreshold = 45;

function updateReviewMetrics() {
    if (!$reviewFirstList) return;

    const $listItems = [...$reviewFirstList.children];
    if ($listItems.length < 2) {
        $step = 0;
        $maxScroll = 0;
        return;
    }

    $step = Math.round($listItems[1].offsetTop - $listItems[0].offsetTop);
    $maxScroll = Math.max(0, ($listItems.length - 1) * $step);
}

function syncReviewLists() {
    $lists.forEach(($list) => {
        $list.style.transform = `translateY(${-1 * $currentScroll}px)`;
    });
}

function checkActive() {
    const $activeIndex = $step > 0 ? Math.round($currentScroll / $step) : 0;

    $lists.forEach(($list) => {
        const $listItems = [...$list.children];
        const $safeIndex = Math.min($activeIndex, $listItems.length - 1);

        $listItems.forEach(($item, $index) => {
            $item.classList.toggle('on', $index === $safeIndex);
        });
    });
}

function getReviewScrollTop() {
    const $sectionRect = $reviewSection.getBoundingClientRect();
    return Math.round(window.scrollY + $sectionRect.top);
}

function isReviewInCaptureZone() {
    const $sectionRect = $reviewSection.getBoundingClientRect();

    return $sectionRect.top <= $captureTolerance && $sectionRect.bottom > window.innerHeight / 2;
}

function stopLenis() {
    if (window.$mainLenis && typeof window.$mainLenis.stop === 'function') {
        window.$mainLenis.stop();
    }
}

function startLenis() {
    if (window.$mainLenis && typeof window.$mainLenis.start === 'function') {
        window.$mainLenis.start();
    }
}

function lockPageScroll($scrollTop) {
    $lockedScrollY = $scrollTop;
    stopLenis();
    document.documentElement.classList.add('review_locked');
    document.body.classList.add('review_locked');
}

function unlockPageScroll($nextScrollY) {
    document.documentElement.classList.remove('review_locked');
    document.body.classList.remove('review_locked');
    window.scrollTo({ top: $nextScrollY, behavior: 'auto' });
    requestAnimationFrame(() => {
        startLenis();
    });
}

function captureReview() {
    $reviewScrollTop = getReviewScrollTop();

    if (Math.abs(window.scrollY - $reviewScrollTop) > 1) {
        window.scrollTo({ top: $reviewScrollTop, behavior: 'auto' });
    }

    $isCaptured = true;
    $releasePending = false;
    lockPageScroll($reviewScrollTop);
    syncReviewLists();
    checkActive();
}

function releaseReview(isDown) {
    const $targetScrollY = isDown
        ? $reviewScrollTop + $captureTolerance + 2
        : Math.max(0, $reviewScrollTop - $captureTolerance - 2);

    $captureLockedUntil = Date.now() + 900;
    $isCaptured = false;
    $isWaiting = false;
    $releasePending = false;
    unlockPageScroll($targetScrollY);
}

function showModal() {
    $modal.classList.add('show');
}

function hideModal() {
    $modal.classList.remove('show');
}

function handleReviewWheel(e) {
    if (!$reviewSection || !$reviewCon || !$reviewFirstList) return;

    const $wheelDelta = Math.abs(e.deltaY);
    const isDown = e.deltaY > 0;

    if ($wheelDelta < $wheelNoiseThreshold) {
        if ($isCaptured) {
            e.preventDefault();
        }
        return;
    }

    if (!$isCaptured && Date.now() < $captureLockedUntil) return;

    if (!$isCaptured && isReviewInCaptureZone()) {
        e.preventDefault();
        captureReview();
        return;
    }

    if (!$isCaptured) return;

    e.preventDefault();

    if ($isWaiting) return;

    if ($modal.classList.contains('show')) {
        $isWaiting = true;

        setTimeout(() => {
            hideModal();
            $modalShown = false;
            $releasePending = true;

            setTimeout(() => {
                $isWaiting = false;
            }, $modalCloseDelay);
        }, $modalCloseDelay);

        return;
    }

    if (isDown && $currentScroll >= $maxScroll && $releasePending) {
        releaseReview(true);
        return;
    }

    if (!isDown && $currentScroll <= 0) {
        releaseReview(false);
        return;
    }

    if (isDown) {
        if ($currentScroll >= $maxScroll) {
            showModal();
            $modalShown = true;
            $releasePending = false;
            $isWaiting = true;

            setTimeout(() => {
                $isWaiting = false;
            }, $scrollLockTime);

            return;
        }

        $currentScroll = Math.min($currentScroll + $step, $maxScroll);
    } else {
        $currentScroll = Math.max($currentScroll - $step, 0);
        $releasePending = false;

        if ($currentScroll < $maxScroll) {
            $modalShown = false;
        }
    }

    $isWaiting = true;
    syncReviewLists();
    checkActive();

    setTimeout(() => {
        $isWaiting = false;
    }, $scrollLockTime);
}

window.addEventListener('wheel', handleReviewWheel, { passive: false });
window.addEventListener('resize', () => {
    updateReviewMetrics();
    syncReviewLists();
    checkActive();
}, { passive: true });
window.addEventListener('load', () => {
    updateReviewMetrics();
    syncReviewLists();
    checkActive();
});
