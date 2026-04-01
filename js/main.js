// Naming rule: const/let variables use $camelCase, function names and parameters use camelCase.
/* section.best */
const $vehicles = [
    {
        name: "Sportage",
        backText: "SPORTAGE",
        backHtml: "SPOR-<br>TAGE",
        backSize: "210px",
        backSpacing: "-0.08em",
        backClassName: "is-sportage",
        image: "./img/main/best/sportage.png",
        alt: "Kia Sportage",
        specs: {
            horsepower: "190 HP",
            efficiency: "29-39 MPG",
            torque: "195 LB-FT",
            engine: "1,999 CC"
        }
    },
    {
        name: "Sorento",
        backText: "SORENTO",
        backHtml: "SOREN<br>TO",
        backSize: "220px",
        backSpacing: "-0.08em",
        backClassName: "is-sorento",
        image: "./img/main/best/sorento.png",
        alt: "Kia Sorento",
        specs: {
            horsepower: "227 HP",
            efficiency: "34–37 MPG",
            torque: "258 LB-FT",
            engine: "1,598 CC"
        }
    },
    {
        name: "Seltos",
        backText: "SELTOS",
        backHtml: "SELTOS",
        backSize: "300px",
        backSpacing: "-0.08em",
        backClassName: "is-seltos",
        image: "./img/main/best/seltos.png",
        alt: "Kia Seltos",
        specs: {
            horsepower: "190 HP",
            efficiency: "25–26 MPG",
            torque: "195 LB-FT",
            engine: "1,598 CC"
        }
    },
    {
        name: "K4",
        backText: "K4",
        backHtml: "K4",
        backSize: "380px",
        backSpacing: "-0.08em",
        backClassName: "is-k4",
        image: "./img/main/best/k4.png",
        alt: "Kia K4",
        specs: {
            horsepower: "190 HP",
            efficiency: "26–30 MPG",
            torque: "195 LB-FT",
            engine: "1,598 CC"
        }
    },
    {
        name: "Telluride",
        backText: "TELLURIDE",
        backHtml: "TELLU-<br>RIDE",
        backSize: "210px",
        backSpacing: "-0.1em",
        backClassName: "is-telluride",
        image: "./img/main/best/telluride.png",
        alt: "Kia Telluride",
        specs: {
            horsepower: "291 HP",
            efficiency: "20–22 MPG",
            torque: "262 LB-FT",
            engine: "3,778 CC"
        }
    }
];

const $showcase = document.querySelector(".best_showcase");
const $backText = document.querySelector(".best_back_text");
const $backTextGlass = $backText ? $backText.querySelector(".glass") : null;
const $cards = Array.from(document.querySelectorAll(".best_car_card"));
const $specValues = document.querySelectorAll(".best_spec_value");
const $mainVisualSection = document.querySelector(".main_visual");
const $bestSection = document.querySelector(".best");
const $ev6Section = document.querySelector(".ev6");

const MOVE_DURATION = 900;
const CARD_MOVE_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const CARD_EXIT_EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
const CARD_ENTER_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

let $currentIndex = 0;
let $isAnimating = false;
let $hasActivatedSpecCount = false;
let $currentUpperSnapIndex = 0;
let $isUpperSnapping = false;
let $upperWheelLockedUntil = 0;
let $upperSnapReleaseTimer = null;
let $upperLenisResumeTimer = null;

const BEST_SNAP_LOCK = 320;
const BEST_SNAP_DURATION = 15;
const UPPER_WHEEL_THRESHOLD = 6;
const UPPER_ALIGN_TOLERANCE = 6;
const ENABLE_SECTION_TRANSITION_SNAP = false;

if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
}

function getLoopedIndex(index) {
    return (index + $vehicles.length) % $vehicles.length;
}

function splitSpecValue(value) {
    const $trimmedValue = value.trim();
    const $lastSpaceIndex = $trimmedValue.lastIndexOf(" ");

    if ($lastSpaceIndex === -1) {
        return { number: $trimmedValue, unit: "" };
    }

    return {
        number: $trimmedValue.slice(0, $lastSpaceIndex),
        unit: $trimmedValue.slice($lastSpaceIndex + 1)
    };
}

function formatAnimatedNumber(value) {
    return Math.max(0, Math.floor(value)).toLocaleString("en-US");
}

function animateSpecNumber($element, targetText) {
    if (!$element) {
        return;
    }

    const $matches = [...targetText.matchAll(/\d[\d,]*/g)];

    if (!$matches.length || !window.gsap) {
        $element.textContent = targetText;
        return;
    }

    const $sources = $matches.map((match) => ({
        raw: match[0],
        value: parseInt(match[0].replace(/,/g, ""), 10) || 0
    }));
    const $state = { values: new Array($sources.length).fill(0) };

    gsap.killTweensOf($state.values);
    gsap.to($state.values, {
        duration: 1.2,
        ease: "power2.out",
        endArray: $sources.map((item) => item.value),
        onUpdate() {
            let $text = targetText;

            $sources.forEach((item, index) => {
                $text = $text.replace(item.raw, formatAnimatedNumber($state.values[index]));
            });

            $element.textContent = $text;
        },
        onComplete() {
            $element.textContent = targetText;
        }
    });
}

function updateSpecNumbers(index, shouldAnimate = false) {
    const $currentVehicle = $vehicles[index];

    $specValues.forEach(($item) => {
        const $specKey = $item.dataset.spec;
        const $specValue = splitSpecValue($currentVehicle.specs[$specKey]);
        const $number = $item.querySelector(".best_spec_number");
        const $unit = $item.querySelector(".best_spec_unit");

        if ($number) {
            if (shouldAnimate) {
                animateSpecNumber($number, $specValue.number);
            } else {
                $number.textContent = $specValue.number;
            }
        }

        if ($unit) {
            $unit.textContent = $specValue.unit;
        }
    });
}

function renderTextContent(index, shouldAnimateSpecs = false) {
    const $currentVehicle = $vehicles[index];

    if ($backTextGlass) {
        $backTextGlass.innerHTML = $currentVehicle.backHtml || $currentVehicle.backText;
        $backTextGlass.style.fontSize = $currentVehicle.backSize;
        $backTextGlass.style.letterSpacing = $currentVehicle.backSpacing;
        $backTextGlass.className = "glass";

        if ($currentVehicle.backClassName) {
            $backTextGlass.classList.add($currentVehicle.backClassName);
        }
    }

    updateSpecNumbers(index, shouldAnimateSpecs);
}

function setCard(card, slot, vehicleIndex) {
    const $vehicle = $vehicles[vehicleIndex];
    const $image = card.querySelector(".best_car_image");

    card.dataset.slot = slot;
    card.dataset.vehicleIndex = String(vehicleIndex);
    card.classList.remove("main", "best_car_card_left", "best_car_card_main", "best_car_card_right", "is-hidden-card", "is-floating");
    card.classList.add(`best_car_card_${slot}`);
    card.classList.toggle("main", slot === "main");

    if (slot === "main") {
        card.classList.add("best_car_card_main");
        card.setAttribute("aria-label", "Current vehicle");
    } else {
        card.setAttribute("aria-label", `Show ${slot === "left" ? "previous" : "next"} vehicle`);
    }

    if ($image) {
        $image.src = $vehicle.image;
        $image.alt = $vehicle.alt;
    }

    clearFloating(card);
}

function renderState(index) {
    setCard($cards[0], "left", getLoopedIndex(index - 1));
    setCard($cards[1], "main", index);
    setCard($cards[2], "right", getLoopedIndex(index + 1));
    renderTextContent(index);
}

function getFrameRect(card) {
    const $frame = card.querySelector(".best_car_frame");
    return ($frame || card).getBoundingClientRect();
}

function setFloating(card, rect) {
    card.classList.add("is-floating");
    card.style.left = `${rect.left}px`;
    card.style.top = `${rect.top}px`;
    card.style.width = `${rect.width}px`;
    card.style.height = `${rect.height}px`;
}

function createFloatingClone(card, rect, extraClasses = []) {
    const $clone = card.cloneNode(true);

    $clone.removeAttribute("aria-label");
    $clone.dataset.slot = "floating";
    $clone.classList.remove("best_car_card_left", "best_car_card_main", "best_car_card_right", "main", "is-hidden-card", "is-delayed-reveal");
    extraClasses.forEach((className) => $clone.classList.add(className));

    setFloating($clone, rect);
    document.body.appendChild($clone);

    return $clone;
}

function removeFloatingClone(card) {
    if (card && card.parentNode) {
        card.parentNode.removeChild(card);
    }
}

function clearFloating(card) {
    card.classList.remove("is-floating");
    card.classList.remove("is-entering-main");
    card.classList.remove("is-leaving-main");
    card.classList.remove("is-delayed-reveal");
    card.style.removeProperty("left");
    card.style.removeProperty("top");
    card.style.removeProperty("width");
    card.style.removeProperty("height");
    card.style.removeProperty("transition");
    card.style.removeProperty("transform");
    card.style.removeProperty("opacity");
}

function animateCardToRect(card, targetRect, options = {}) {
    const {
        ease = CARD_MOVE_EASE
    } = options;

    return new Promise((resolve) => {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                card.style.transition = [
                    `left ${MOVE_DURATION}ms ${ease}`,
                    `top ${MOVE_DURATION}ms ${ease}`,
                    `width ${MOVE_DURATION}ms ${ease}`,
                    `height ${MOVE_DURATION}ms ${ease}`
                ].join(", ");
                card.style.left = `${targetRect.left}px`;
                card.style.top = `${targetRect.top}px`;
                card.style.width = `${targetRect.width}px`;
                card.style.height = `${targetRect.height}px`;
            });
        });

        window.setTimeout(resolve, MOVE_DURATION);
    });
}

function animateCardFadeOut(card) {
    return new Promise((resolve) => {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                card.style.transition = [
                    `opacity ${Math.round(MOVE_DURATION * 0.68)}ms ease`,
                    `transform ${MOVE_DURATION}ms ${CARD_EXIT_EASE}`
                ].join(", ");
                card.style.opacity = "0";
                card.style.transform = "translate3d(0, -12px, 0) scale(0.94)";
            });
        });

        window.setTimeout(resolve, MOVE_DURATION);
    });
}

async function animateTransition(direction) {
    if ($isAnimating) {
        return;
    }

    const $leftCard = $cards.find((card) => card.dataset.slot === "left");
    const $mainCard = $cards.find((card) => card.dataset.slot === "main");
    const $rightCard = $cards.find((card) => card.dataset.slot === "right");

    if (!$leftCard || !$mainCard || !$rightCard) {
        return;
    }

    const $clickedCard = direction === "left" ? $leftCard : $rightCard;
    const $nextIndex = getLoopedIndex($currentIndex + (direction === "left" ? -1 : 1));
    const $nextLeftIndex = getLoopedIndex($nextIndex - 1);
    const $nextRightIndex = getLoopedIndex($nextIndex + 1);

    const $mainFrameRect = getFrameRect($mainCard);
    const $clickedRect = getFrameRect($clickedCard);
    $isAnimating = true;
    $showcase.classList.add("is-transitioning");
    $backText.classList.add("is-emphasized");

    renderTextContent($nextIndex, $hasActivatedSpecCount);

    const $clickedClone = createFloatingClone($clickedCard, $clickedRect, ["is-entering-main"]);
    const $mainClone = createFloatingClone($mainCard, $mainFrameRect, ["is-leaving-main"]);

    $clickedCard.classList.add("is-hidden-card");
    $mainCard.classList.add("is-hidden-card");

    if (direction === "left") {
        setCard($clickedCard, "left", $nextLeftIndex);
    } else {
        setCard($clickedCard, "right", $nextRightIndex);
    }
    $clickedCard.classList.remove("is-hidden-card");

    const $enterPromise = animateCardToRect($clickedClone, $mainFrameRect, {
        ease: CARD_ENTER_EASE
    });
    const $fadePromise = animateCardFadeOut($mainClone);

    await Promise.all([$enterPromise, $fadePromise]);

    $currentIndex = $nextIndex;

    setCard($cards[0], "left", $nextLeftIndex);
    setCard($cards[1], "main", $nextIndex);
    setCard($cards[2], "right", $nextRightIndex);

    removeFloatingClone($clickedClone);
    removeFloatingClone($mainClone);

    $backText.classList.remove("is-emphasized");
    $showcase.classList.remove("is-transitioning");
    $isAnimating = false;
}

function handleCardClick(event) {
    const $card = event.currentTarget;
    const $slot = $card.dataset.slot;

    if ($slot === "main") {
        return;
    }

    animateTransition($slot);
}

function getBestScrollTop() {
    if (!$bestSection) {
        return 0;
    }

    const $sectionRect = $bestSection.getBoundingClientRect();
    return Math.round(window.scrollY + $sectionRect.top);
}

function getMainVisualScrollTop() {
    if (!$mainVisualSection) {
        return 0;
    }

    const $sectionRect = $mainVisualSection.getBoundingClientRect();
    return Math.round(window.scrollY + $sectionRect.top);
}

function getEv6ScrollTop() {
    if (!$ev6Section) {
        return 0;
    }

    const $sectionRect = $ev6Section.getBoundingClientRect();
    return Math.round(window.scrollY + $sectionRect.top);
}

function getUpperSectionTops() {
    return [
        getMainVisualScrollTop(),
        getBestScrollTop(),
        getEv6ScrollTop(),
    ];
}

function getSettledUpperSectionIndex() {
    const $tops = getUpperSectionTops();
    const $currentY = window.scrollY;
    let $nearestIndex = 0;
    let $nearestDistance = Math.abs($tops[0] - $currentY);

    $tops.forEach(($top, index) => {
        const $distance = Math.abs($top - $currentY);

        if ($distance < $nearestDistance) {
            $nearestDistance = $distance;
            $nearestIndex = index;
        }
    });

    return $nearestIndex;
}

function syncCurrentUpperSnapIndex() {
    $currentUpperSnapIndex = getSettledUpperSectionIndex();
}

function clearUpperSnapRuntimeState() {
    $isUpperSnapping = false;
    $upperWheelLockedUntil = 0;

    if ($upperSnapReleaseTimer) {
        window.clearTimeout($upperSnapReleaseTimer);
        $upperSnapReleaseTimer = null;
    }

    if ($upperLenisResumeTimer) {
        window.clearTimeout($upperLenisResumeTimer);
        $upperLenisResumeTimer = null;
    }
}

function scrollUpperSectionTo(index) {
    const $tops = getUpperSectionTops();
    const $clampedIndex = Math.max(0, Math.min(index, $tops.length - 1));
    const $target = $tops[$clampedIndex];

    if (typeof $target !== "number") {
        return;
    }

    $currentUpperSnapIndex = $clampedIndex;
    $isUpperSnapping = true;

    if ($upperSnapReleaseTimer) {
        window.clearTimeout($upperSnapReleaseTimer);
        $upperSnapReleaseTimer = null;
    }
    if ($upperLenisResumeTimer) {
        window.clearTimeout($upperLenisResumeTimer);
        $upperLenisResumeTimer = null;
    }

    if (window.$mainLenis && typeof window.$mainLenis.scrollTo === "function") {
        window.$mainLenis.scrollTo(window.scrollY, {
            immediate: true,
        });
        if (typeof window.$mainLenis.start === "function") {
            window.$mainLenis.start();
        }
        window.$mainLenis.scrollTo($target, {
            duration: BEST_SNAP_DURATION,
            lock: true,
            immediate: false,
            easing: (t) => 1 - Math.pow(1 - t, 3),
            onComplete: () => {
                $currentUpperSnapIndex = $clampedIndex;
                $upperWheelLockedUntil = Date.now() + BEST_SNAP_LOCK;
                if (typeof window.$mainLenis.stop === "function" && typeof window.$mainLenis.start === "function") {
                    window.$mainLenis.stop();
                    $upperLenisResumeTimer = window.setTimeout(() => {
                        window.$mainLenis.start();
                        $upperLenisResumeTimer = null;
                    }, BEST_SNAP_LOCK);
                }
                $upperSnapReleaseTimer = window.setTimeout(() => {
                    $isUpperSnapping = false;
                }, BEST_SNAP_LOCK);
            }
        });
        return;
    }

    window.scrollTo({ top: $target, behavior: "smooth" });
    $upperSnapReleaseTimer = window.setTimeout(() => {
        $currentUpperSnapIndex = $clampedIndex;
        $upperWheelLockedUntil = Date.now() + BEST_SNAP_LOCK;
        $isUpperSnapping = false;
    }, 1200);
}

function handleUpperSectionWheel(event) {
    if (!$mainVisualSection || !$bestSection || !$ev6Section) {
        return;
    }

    const $now = Date.now();
    const $wheelDelta = Math.abs(event.deltaY);

    if ($wheelDelta < UPPER_WHEEL_THRESHOLD) {
        return;
    }

    const $tops = getUpperSectionTops();

    if ($tops.some(($top) => typeof $top !== "number")) {
        return;
    }

    const $currentY = window.scrollY;
    const $corridorPadding = Math.round(window.innerHeight * 0.4);
    const $firstTop = $tops[0];
    const $ev6Top = $tops[$tops.length - 1];
    const $ev6EntryLimit = $ev6Top + Math.round(window.innerHeight * 0.12);
    const $isDown = event.deltaY > 0;
    const $isUp = event.deltaY < 0;

    if ($currentY < $firstTop - $corridorPadding || $currentY > $ev6EntryLimit) {
        return;
    }

    if ($currentY >= $ev6Top - UPPER_ALIGN_TOLERANCE && $isDown) {
        return;
    }

    if ($isUpperSnapping || $now < $upperWheelLockedUntil) {
        event.preventDefault();
        return;
    }

    const $nearestIndex = getSettledUpperSectionIndex();
    const $nearestTop = $tops[$nearestIndex];

    if (typeof $nearestTop === "number" && Math.abs($currentY - $nearestTop) <= UPPER_ALIGN_TOLERANCE) {
        $currentUpperSnapIndex = $nearestIndex;
    }

    const $currentIndex = $currentUpperSnapIndex;
    const $currentTop = $tops[$currentIndex];

    if (typeof $currentTop !== "number") {
        return;
    }

    const $isMisaligned = Math.abs($currentY - $currentTop) > UPPER_ALIGN_TOLERANCE;

    if ($currentIndex === 2 && !$isMisaligned && $isDown) {
        return;
    }

    event.preventDefault();

    if ($isMisaligned) {
        if ($isDown && $currentY > $currentTop + UPPER_ALIGN_TOLERANCE) {
            const $targetIndex = Math.min($currentIndex + 1, $tops.length - 1);

            if ($targetIndex !== $currentIndex) {
                $currentUpperSnapIndex = $targetIndex;
                scrollUpperSectionTo($targetIndex);
                return;
            }
        }

        if ($isUp && $currentY < $currentTop - UPPER_ALIGN_TOLERANCE) {
            const $targetIndex = Math.max($currentIndex - 1, 0);

            if ($targetIndex !== $currentIndex) {
                $currentUpperSnapIndex = $targetIndex;
                scrollUpperSectionTo($targetIndex);
                return;
            }
        }
    }

    if ($isMisaligned) {
        $currentUpperSnapIndex = $currentIndex;
        scrollUpperSectionTo($currentIndex);
        return;
    }

    if ($isDown) {
        const $targetIndex = Math.min($currentIndex + 1, 2);

        if ($targetIndex !== $currentIndex) {
            scrollUpperSectionTo($targetIndex);
            return;
        }
        return;
    }

    if ($isUp) {
        const $targetIndex = Math.max($currentIndex - 1, 0);

        if ($targetIndex !== $currentIndex) {
            scrollUpperSectionTo($targetIndex);
            return;
        }
    }
}

function syncSectionSnapIndicesOnScroll() {
    const $now = Date.now();

    if (!$isUpperSnapping && $now >= $upperWheelLockedUntil) {
        syncCurrentUpperSnapIndex();
    }

    if (typeof $isMatchSnapping !== "undefined" && typeof $matchWheelLockedUntil !== "undefined") {
        if (!$isMatchSnapping && $now >= $matchWheelLockedUntil) {
            syncCurrentMatchSnapIndex();
        }
    }
}

if ($showcase && $backText && $backTextGlass && $cards.length === 3 && $specValues.length) {
    renderState($currentIndex);
    $cards.forEach((card) => {
        card.addEventListener("click", handleCardClick);
    });

    if (window.ScrollTrigger && $bestSection) {
        ScrollTrigger.create({
            trigger: $bestSection,
            start: "top 55%",
            onEnter() {
                $hasActivatedSpecCount = true;
                updateSpecNumbers($currentIndex, true);
            },
            onLeaveBack() {
                $hasActivatedSpecCount = false;
                $specValues.forEach(($item) => {
                    const $number = $item.querySelector(".best_spec_number");

                    if ($number) {
                        $number.textContent = "0";
                    }
                });
            }
        });
    }
}

if (ENABLE_SECTION_TRANSITION_SNAP) {
    window.addEventListener("wheel", handleUpperSectionWheel, { passive: false });
}
window.addEventListener("scroll", syncSectionSnapIndicesOnScroll, { passive: true });
window.addEventListener("resize", () => {
    clearUpperSnapRuntimeState();
    syncCurrentUpperSnapIndex();
}, { passive: true });

/* section.ev6 */
const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const mix = (a, b, t) => a + (b - a) * t;
const sstep = (a, b, v) => {
  const t = clamp((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

function initEv6Scene() {
  const section = document.getElementById("scrollScene");
  const scene = document.getElementById("scene");
  const bgTrack = document.getElementById("bgTrack");
  const bg1Img = document.getElementById("bg1Img");
  const bg2Img = document.getElementById("bg2Img");
  const bg2FeaturesTrack = document.getElementById("bg2FeaturesTrack");
  const bg2FeaturesSurface = document.getElementById("bg2FeaturesSurface");
  const carWrap = document.getElementById("carWrap");
  const solidCar = document.getElementById("solidCar");
  const xrayCar = document.getElementById("xrayCar");
  const dashMask = document.getElementById("dashMask");
  const luggageMask = document.getElementById("luggageMask");
  const seatingMask = document.getElementById("seatingMask");
  const carpetsMask = document.getElementById("carpetsMask");
  const detailsLayer = document.getElementById("detailsLayer");
  const dashPhotoCard = document.getElementById("dashPhotoCard");
  const luggagePhotoCard = document.getElementById("luggagePhotoCard");
  const seatingPhotoCard = document.getElementById("seatingPhotoCard");
  const carpetsPhotoCard = document.getElementById("carpetsPhotoCard");
  const photoCards = [dashPhotoCard, luggagePhotoCard, seatingPhotoCard, carpetsPhotoCard];
  const root = document.documentElement;

  const requiredNodes = [
    section,
    bgTrack,
    bg2Img,
    carWrap,
    solidCar,
    xrayCar,
    dashMask,
    luggageMask,
    seatingMask,
    carpetsMask,
    detailsLayer,
    ...photoCards,
  ];

  if (requiredNodes.some((node) => !node)) {
    console.warn("[ev6_ver2] Scene init skipped because required elements are missing.");
    return;
  }

  let rafId = null;
  document.body.style.backgroundColor = "";

  function syncFeatureBottomToVisiblePhotoCard() {
    if (!scene) return;

    const visibleCards = photoCards.filter((card) => {
      const opacity = Number.parseFloat(card.style.opacity || "0");
      return opacity > 0.01;
    });

    if (!visibleCards.length) {
      scene.style.removeProperty("--ev6-photo-card-bottom");
      return;
    }

    const sceneRect = scene.getBoundingClientRect();
    const visibleCardBottom = Math.max(
      ...visibleCards.map((card) => card.getBoundingClientRect().bottom)
    );
    const clampedBottom = Math.min(visibleCardBottom, sceneRect.bottom);
    const bottomOffset = Math.max(sceneRect.bottom - clampedBottom, 0);

    scene.style.setProperty("--ev6-photo-card-bottom", `${Math.round(bottomOffset)}px`);
  }

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
    if (bg2FeaturesTrack) {
      bg2FeaturesTrack.style.transform = `translate3d(0, ${trackY}px, 0)`;
    }

    const bg1InnerY = mix(0, -vh * 0.03, sstep(0.06, 0.46, baseP));
    const bg2InnerY = mix(vh * 0.035, 0, panelPushP);
    const bg1Scale = mix(1.02, 1.0, panelPushP);
    const bg2Scale = mix(1.04, 1.0, panelPushP);

    if (bg1Img) {
      bg1Img.style.transform = `translate3d(0, ${Math.round(bg1InnerY)}px, 0) scale(${bg1Scale * 1.002})`;
    }
    bg2Img.style.transform = `translate3d(0, ${Math.round(bg2InnerY)}px, 0) scale(${bg2Scale * 1.002})`;
    if (bg2FeaturesSurface) {
      bg2FeaturesSurface.style.transform = `translate3d(0, ${Math.round(bg2InnerY)}px, 0) scale(${bg2Scale * 1.002})`;
    }

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
    const ev6Background = bodyBlend < 0.5 ? "#000000" : "#252941";
    section.style.backgroundColor = ev6Background;
    if (scene) {
      scene.style.backgroundColor = ev6Background;
    }

    const bg2StageP = clamp((p - baseEnd) / (1 - baseEnd));
    const dashReveal = sstep(0.05, 0.15, bg2StageP);
    const dashFadeOut = sstep(0.22, 0.26, bg2StageP);
    const dashVisible = dashReveal > 0.001 ? 1 - dashFadeOut : 0;
    dashMask.style.opacity = String(dashVisible);
    dashMask.style.clipPath = `inset(${(1 - dashReveal) * 100}% 0 0 0)`;

    const luggageReveal = sstep(0.31, 0.40, bg2StageP);
    const luggageFadeOut = sstep(0.47, 0.51, bg2StageP);
    const seatReveal = sstep(0.56, 0.65, bg2StageP);
    const seatFadeOut = sstep(0.72, 0.76, bg2StageP);
    const carpetReveal = sstep(0.81, 0.90, bg2StageP);

    const luggageVisible = luggageReveal > 0.001 ? 1 - luggageFadeOut : 0;
    luggageMask.style.opacity = String(luggageVisible);
    luggageMask.style.clipPath = `inset(${(1 - luggageReveal) * 100}% 0 0 0)`;

    const seatVisible = seatReveal > 0.001 ? 1 - seatFadeOut : 0;
    seatingMask.style.opacity = String(seatVisible);
    seatingMask.style.clipPath = `inset(${(1 - seatReveal) * 100}% 0 0 0)`;

    const carpetVisible = carpetReveal > 0.001 ? carpetReveal : 0;
    carpetsMask.style.opacity = String(carpetVisible);
    carpetsMask.style.clipPath = `inset(${(1 - carpetReveal) * 100}% 0 0 0)`;

    const anyDetailsOn = bg2StageP >= 0.11;
    detailsLayer.style.opacity = anyDetailsOn ? "1" : "0";
    detailsLayer.style.transform = anyDetailsOn ? "translate3d(0, 0, 0)" : "translate3d(0, 18px, 0)";

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
    syncFeatureBottomToVisiblePhotoCard();

    const dashFocusOn = bg2StageP >= 0.11 && bg2StageP < 0.22;
    const luggageFocusOn = bg2StageP >= 0.37 && bg2StageP < 0.47;
    const seatingFocusOn = bg2StageP >= 0.62 && bg2StageP < 0.72;
    const carpetFocusOn = bg2StageP >= 0.87;

    root.style.setProperty("--dash-grow", dashFocusOn ? "1" : "0");
    root.style.setProperty("--luggage-grow", luggageFocusOn ? "1" : "0");
    root.style.setProperty("--seating-grow", seatingFocusOn ? "1" : "0");
    root.style.setProperty("--carpet-grow", carpetFocusOn ? "1" : "0");
    root.style.setProperty("--photo-scale", "1");
    root.style.setProperty("--photo-opacity", "1");
    root.style.setProperty("--photo-y", "0px");
  }

  function requestRender() {
    if (rafId) {
      return;
    }

    rafId = window.requestAnimationFrame(() => {
      render();
      rafId = null;
    });
  }

  window.addEventListener("scroll", requestRender, { passive: true });
  window.addEventListener("resize", requestRender);
  window.addEventListener("load", requestRender);
  requestRender();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initEv6Scene, { once: true });
} else {
  initEv6Scene();
}


/* section.match */
let $rafId = null;

function handleScroll() {
  if (
    typeof $container === "undefined" ||
    !$container ||
    typeof $totalDuration === "undefined" ||
    typeof updateLayers !== "function"
  ) {
    return;
  }

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

function initLenis() {
  if (typeof window.Lenis !== "function") {
    window.$mainLenis = null;
    console.warn("[main] Lenis is unavailable. Falling back to native scroll.");
    return;
  }

  const $lenis = new window.Lenis();
  window.$mainLenis = $lenis;

  if (window.ScrollTrigger && typeof ScrollTrigger.update === "function") {
    $lenis.on('scroll', ScrollTrigger.update);
  }

  if (window.gsap && gsap.ticker) {
    gsap.ticker.add((time) => $lenis.raf(time * 20000));
    gsap.ticker.lagSmoothing(0);
  }
}

initLenis();

const $intro = document.querySelector('.intro');
const $options = document.querySelectorAll('section[class*="option"]');
const $matchSection = document.querySelector('.match');
const $matchSections = [$intro, ...$options].filter(Boolean);

let $matchWheelLockedUntil = 0;
let $isMatchSnapping = false;
let $matchSnapReleaseTimer = null;
let $matchLenisResumeTimer = null;
let $currentMatchSnapIndex = 0;

const MATCH_WHEEL_DOWN_THRESHOLD = 10;
const MATCH_WHEEL_UP_THRESHOLD = 8;
const MATCH_WHEEL_DOWN_COOLDOWN = 520;
const MATCH_WHEEL_UP_COOLDOWN = 440;
const MATCH_POST_SNAP_LOCK = 500;

function setupIntroPin() {
  const $firstOption = document.querySelector('.option01');

  if (!$intro || !$firstOption || !window.ScrollTrigger || !window.gsap) {
    return;
  }

  ScrollTrigger.create({
    trigger: $intro,
    start: 'top top',
    end: '+=70vh',
    pin: true,
    pinSpacing: false,
  });

  ScrollTrigger.create({
    trigger: $firstOption,
    start: 'top 82%',
    end: 'top 18%',
    onUpdate: (self) => {
      const progress = self.progress;
      gsap.set($intro, {
        scale: 1 - progress * 0.25,
        opacity: 1 - progress,
      });
    },
  });
}

function setupOptionScroll() {
  if (!window.ScrollTrigger || !window.gsap) {
    return;
  }

  const optionsArr = gsap.utils.toArray('section[class*="option"]');

  optionsArr.forEach(($sec, index) => {
    const isLastCard = index === optionsArr.length - 1;
    ScrollTrigger.create({
      trigger: $sec,
      start: 'top top',
      end: isLastCard ? '+=120vh' : '+=70vh',
      pin: true,
      pinSpacing: true,
    });
  });

  optionsArr.forEach(($sec, index) => {
    if (index < optionsArr.length - 1) {
      ScrollTrigger.create({
        trigger: optionsArr[index + 1],
        start: 'top 82%',
        end: 'top 18%',
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set($sec, {
            scale: 1 - progress * 0.25,
            opacity: 1 - progress,
          });
        },
      });
    }
  });
}

function isMatchWheelCaptureZone() {
  if (!$matchSection) {
    return false;
  }

  const $rect = $matchSection.getBoundingClientRect();
  return $rect.top < window.innerHeight && $rect.bottom > 0;
}

function getMatchSectionSnapTop(section, index) {
  if (!section) {
    return null;
  }

  if (window.ScrollTrigger && typeof window.ScrollTrigger.getAll === 'function') {
    const $pinTrigger = window.ScrollTrigger.getAll().find(($trigger) => (
      $trigger.trigger === section && $trigger.pin
    ));

    if ($pinTrigger && typeof $pinTrigger.start === 'number') {
      return Math.round($pinTrigger.start);
    }
  }

  if (index === 0 && $matchSection) {
    return Math.round(window.scrollY + $matchSection.getBoundingClientRect().top);
  }

  return Math.round(window.scrollY + section.getBoundingClientRect().top);
}

function getMatchSectionPinRange(section, index) {
  if (!section) {
    return null;
  }

  if (window.ScrollTrigger && typeof window.ScrollTrigger.getAll === 'function') {
    const $pinTrigger = window.ScrollTrigger.getAll().find(($trigger) => (
      $trigger.trigger === section && $trigger.pin
    ));

    if ($pinTrigger) {
      const $start = typeof $pinTrigger.start === 'number' ? Math.round($pinTrigger.start) : null;
      const $end = typeof $pinTrigger.end === 'number' ? Math.round($pinTrigger.end) : null;

      if (typeof $start === 'number' || typeof $end === 'number') {
        return {
          start: typeof $start === 'number' ? $start : getMatchSectionSnapTop(section, index),
          end: typeof $end === 'number' ? $end : getMatchSectionSnapTop(section, index),
        };
      }
    }
  }

  const $top = getMatchSectionSnapTop(section, index);

  if (typeof $top !== 'number') {
    return null;
  }

  return {
    start: $top,
    end: $top,
  };
}

function getMatchSectionTops() {
  return $matchSections.map(($section, index) => getMatchSectionSnapTop($section, index));
}

function getSettledMatchSectionIndex() {
  if (!$matchSections.length) {
    return -1;
  }

  const $currentY = window.scrollY;
  const $ranges = $matchSections.map(($section, index) => getMatchSectionPinRange($section, index));

  for (let index = 0; index < $ranges.length; index += 1) {
    const $range = $ranges[index];

    if (!$range) {
      continue;
    }

    if ($currentY >= $range.start - 4 && $currentY <= $range.end + 4) {
      return index;
    }
  }

  const $tops = getMatchSectionTops();
  let $nearestIndex = 0;
  let $nearestDistance = Math.abs($tops[0] - $currentY);

  $tops.forEach(($top, index) => {
    const $distance = Math.abs($top - $currentY);

    if ($distance < $nearestDistance) {
      $nearestDistance = $distance;
      $nearestIndex = index;
    }
  });

  return $nearestIndex;
}

function syncCurrentMatchSnapIndex() {
  const $index = getSettledMatchSectionIndex();

  if ($index >= 0) {
    $currentMatchSnapIndex = $index;
  }
}

function clearMatchSnapRuntimeState() {
  $isMatchSnapping = false;
  $matchWheelLockedUntil = 0;

  if ($matchSnapReleaseTimer) {
    window.clearTimeout($matchSnapReleaseTimer);
    $matchSnapReleaseTimer = null;
  }

  if ($matchLenisResumeTimer) {
    window.clearTimeout($matchLenisResumeTimer);
    $matchLenisResumeTimer = null;
  }

  const isReviewLocked =
    document.documentElement.classList.contains('review_locked') ||
    document.body.classList.contains('review_locked');

  if (!isReviewLocked && window.$mainLenis && typeof window.$mainLenis.start === 'function') {
    window.$mainLenis.start();
  }
}

function scrollMatchTo(index, postSnapLock = MATCH_POST_SNAP_LOCK, duration = 15, easing = null) {
  const $tops = getMatchSectionTops();
  const $clampedIndex = Math.max(0, Math.min(index, $tops.length - 1));
  const $target = $tops[$clampedIndex];

  if (typeof $target !== 'number') {
    return;
  }

  $currentMatchSnapIndex = $clampedIndex;

  if (window.$mainLenis && typeof window.$mainLenis.scrollTo === 'function') {
    $isMatchSnapping = true;
    if ($matchSnapReleaseTimer) {
      window.clearTimeout($matchSnapReleaseTimer);
    }
    if ($matchLenisResumeTimer) {
      window.clearTimeout($matchLenisResumeTimer);
      $matchLenisResumeTimer = null;
    }
    window.$mainLenis.scrollTo(window.scrollY, {
      immediate: true,
    });
    if (typeof window.$mainLenis.start === 'function') {
      window.$mainLenis.start();
    }
    window.$mainLenis.scrollTo($target, {
      duration,
      lock: true,
      immediate: false,
      easing: typeof easing === 'function' ? easing : (t) => 1 - Math.pow(1 - t, 3),
      onComplete: () => {
        $matchWheelLockedUntil = Date.now() + postSnapLock;
        if (typeof window.$mainLenis.stop === 'function' && typeof window.$mainLenis.start === 'function') {
          window.$mainLenis.stop();
          $matchLenisResumeTimer = window.setTimeout(() => {
            window.$mainLenis.start();
            $matchLenisResumeTimer = null;
          }, postSnapLock);
        }
        $matchSnapReleaseTimer = window.setTimeout(() => {
          $isMatchSnapping = false;
        }, postSnapLock);
      },
    });
    return;
  }

  $isMatchSnapping = true;
  if ($matchSnapReleaseTimer) {
    window.clearTimeout($matchSnapReleaseTimer);
  }
  window.scrollTo({ top: $target, behavior: 'smooth' });
  window.setTimeout(() => {
    $matchWheelLockedUntil = Date.now() + postSnapLock;
    $matchSnapReleaseTimer = window.setTimeout(() => {
      $isMatchSnapping = false;
    }, postSnapLock);
  }, 1650);
}

function handleMatchWheel(event) {
  if (!isMatchWheelCaptureZone() || !$matchSections.length) {
    return;
  }

  const $now = Date.now();

  if ($isMatchSnapping) {
    event.preventDefault();
    return;
  }

  if ($now < $matchWheelLockedUntil) {
    event.preventDefault();
    return;
  }

  const $wheelDelta = Math.abs(event.deltaY);
  const $isDown = event.deltaY > 0;
  const $threshold = $isDown ? MATCH_WHEEL_DOWN_THRESHOLD : MATCH_WHEEL_UP_THRESHOLD;
  const $cooldown = $isDown ? MATCH_WHEEL_DOWN_COOLDOWN : MATCH_WHEEL_UP_COOLDOWN;

  if ($wheelDelta < $threshold) {
    return;
  }

  syncCurrentMatchSnapIndex();
  const $direction = $isDown ? 1 : -1;
  const $currentIndex = $currentMatchSnapIndex;
  const $lastIndex = $matchSections.length - 1;
  const $currentTop = getMatchSectionTops()[$currentIndex];
  const $currentRange = getMatchSectionPinRange($matchSections[$currentIndex], $currentIndex);
  const $isMisaligned = typeof $currentTop === 'number' && Math.abs(window.scrollY - $currentTop) > 8;

  if ($isMisaligned && $currentRange) {
    if ($direction < 0 && window.scrollY < $currentRange.start - 8) {
      if ($currentIndex > 0) {
        event.preventDefault();
        $matchWheelLockedUntil = $now + $cooldown;
        scrollMatchTo($currentIndex - 1);
      }
      return;
    }

    if ($direction > 0 && window.scrollY > $currentRange.end + 8) {
      if ($currentIndex < $lastIndex) {
        event.preventDefault();
        $matchWheelLockedUntil = $now + $cooldown;
        scrollMatchTo($currentIndex + 1);
      }
      return;
    }
  }

  if (
    typeof $currentTop === 'number' &&
    (
      !$currentRange ||
      window.scrollY < $currentRange.start - 8 ||
      window.scrollY > $currentRange.end + 8
    ) &&
    $isMisaligned
  ) {
    event.preventDefault();
    $matchWheelLockedUntil = $now + $cooldown;
    scrollMatchTo($currentIndex);
    return;
  }

  const $targetIndex = Math.max(0, Math.min($currentIndex + $direction, $lastIndex));

  if ($targetIndex === $currentIndex) {
    return;
  }

  event.preventDefault();
  $matchWheelLockedUntil = $now + $cooldown;
  scrollMatchTo($targetIndex);
}

setupIntroPin();
setupOptionScroll();
syncCurrentMatchSnapIndex();
window.addEventListener('wheel', handleMatchWheel, { passive: false });
window.addEventListener('resize', () => {
  clearMatchSnapRuntimeState();

  if (window.ScrollTrigger && typeof window.ScrollTrigger.refresh === 'function') {
    window.ScrollTrigger.refresh();
  }

  syncCurrentMatchSnapIndex();
}, { passive: true });

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
const $modal = document.querySelector('.modal');
const $reviewFirstList = $lists[0];
const $reviewModalLink = $modal ? $modal.querySelector('.white_origin') : null;

let $currentScroll = 0;
let $step = 276;
let $maxScroll = 0;
let $isWaiting = false;
let $isCaptured = false;
let $reviewScrollTop = 0;
let $captureLockedUntil = 0;
let $releasePending = false;
let $skipReviewCaptureUntilOutOfZone = false;
let $reviewWaitTimer = null;
let $reviewModalTimer = null;
let $reviewModalCloseTimer = null;

const $scrollLockTime = 950;
const $modalCloseDelay = 300;
const $captureTolerance = 80;
const $wheelNoiseThreshold = 45;
const $reviewResetMargin = 24;

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

function syncReviewLists(immediate = false) {
    if (immediate) {
        $lists.forEach(($list) => {
            $list.style.transition = 'none';
        });
    }

    $lists.forEach(($list) => {
        $list.style.transform = `translateY(${-1 * $currentScroll}px)`;
    });

    if (!immediate) {
        return;
    }

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            $lists.forEach(($list) => {
                $list.style.removeProperty('transition');
            });
        });
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

function clearReviewRuntimeTimers() {
    if ($reviewWaitTimer) {
        window.clearTimeout($reviewWaitTimer);
        $reviewWaitTimer = null;
    }

    if ($reviewModalTimer) {
        window.clearTimeout($reviewModalTimer);
        $reviewModalTimer = null;
    }

    if ($reviewModalCloseTimer) {
        window.clearTimeout($reviewModalCloseTimer);
        $reviewModalCloseTimer = null;
    }
}

function lockPageScroll() {
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

function captureReview(startAtBottom = false) {
    clearReviewRuntimeTimers();
    $reviewScrollTop = getReviewScrollTop();

    if (Math.abs(window.scrollY - $reviewScrollTop) > 1) {
        window.scrollTo({ top: $reviewScrollTop, behavior: 'auto' });
    }

    $currentScroll = startAtBottom ? $maxScroll : 0;
    $isWaiting = false;
    $isCaptured = true;
    $releasePending = startAtBottom;
    $skipReviewCaptureUntilOutOfZone = false;
    hideModal();
    lockPageScroll();
    syncReviewLists();
    checkActive();
}

function primeReviewState(startAtBottom = false) {
    if (!$reviewSection || !$reviewCon || !$reviewFirstList) {
        return;
    }

    const $targetScroll = startAtBottom ? $maxScroll : 0;
    const shouldHideModal = $modal && $modal.classList.contains('show');

    if ($currentScroll === $targetScroll && $releasePending === startAtBottom && !shouldHideModal) {
        return;
    }

    clearReviewRuntimeTimers();
    $currentScroll = $targetScroll;
    $isWaiting = false;
    $releasePending = startAtBottom;
    hideModal();
    syncReviewLists(true);
    checkActive();
}

function releaseReview(isDown) {
    clearReviewRuntimeTimers();
    const $targetScrollY = isDown
        ? Math.round($reviewScrollTop + $captureTolerance + 8)
        : Math.max(0, $reviewScrollTop - $captureTolerance - 2);

    $captureLockedUntil = Date.now() + 900;
    $isCaptured = false;
    $isWaiting = false;
    $releasePending = false;
    $skipReviewCaptureUntilOutOfZone = true;
    unlockPageScroll($targetScrollY);
}

function showModal() {
    if ($reviewModalLink) {
        $reviewModalLink.classList.remove('on');
    }

    $modal.classList.add('show');
}

function hideModal() {
    $modal.classList.remove('show');

    if ($reviewModalLink) {
        $reviewModalLink.classList.remove('on');
    }
}

function syncReviewResetStateAboveSection() {
    if (!$reviewSection || !$reviewCon || !$reviewFirstList || $isCaptured) {
        return;
    }

    const $sectionRect = $reviewSection.getBoundingClientRect();
    const isReviewFullyBelowViewport = $sectionRect.top >= window.innerHeight + $reviewResetMargin;

    if (!isReviewFullyBelowViewport) {
        return;
    }

    primeReviewState(false);
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

    if (!$isCaptured && $skipReviewCaptureUntilOutOfZone) {
        if (!isReviewInCaptureZone()) {
            $skipReviewCaptureUntilOutOfZone = false;
        } else {
            return;
        }
    }

    if (!$isCaptured && isReviewInCaptureZone()) {
        e.preventDefault();
        captureReview(!isDown);
        return;
    }

    if (!$isCaptured) return;

    e.preventDefault();

    if ($isWaiting) return;

    if ($modal.classList.contains('show')) {
        $isWaiting = true;

        $reviewModalTimer = window.setTimeout(() => {
            $reviewModalTimer = null;
            hideModal();
            $releasePending = true;

            $reviewModalCloseTimer = window.setTimeout(() => {
                $isWaiting = false;
                $reviewModalCloseTimer = null;
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
            $releasePending = false;
            $isWaiting = true;

            $reviewWaitTimer = window.setTimeout(() => {
                $isWaiting = false;
                $reviewWaitTimer = null;
            }, $scrollLockTime);

            return;
        }

        $currentScroll = Math.min($currentScroll + $step, $maxScroll);
    } else {
        $currentScroll = Math.max($currentScroll - $step, 0);
        $releasePending = false;
    }

    $isWaiting = true;
    syncReviewLists();
    checkActive();

    $reviewWaitTimer = window.setTimeout(() => {
        $isWaiting = false;
        $reviewWaitTimer = null;
    }, $scrollLockTime);
}

window.addEventListener('wheel', handleReviewWheel, { passive: false });
window.addEventListener('scroll', syncReviewResetStateAboveSection, { passive: true });
window.addEventListener('resize', () => {
    clearReviewRuntimeTimers();
    updateReviewMetrics();
    syncReviewLists();
    checkActive();
}, { passive: true });
window.addEventListener('load', () => {
    updateReviewMetrics();
    syncReviewLists();
    checkActive();
});
