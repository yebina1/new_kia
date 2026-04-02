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
  const bg1CopyStage = section?.querySelector(".bg1_copy_stage");
  const bg2CopyStage = section?.querySelector(".bg2_copy_stage");
  const bg1Desc = section?.querySelector(".bg1_copy_right .desc");
  const bg2Desc = section?.querySelector(".bg2_copy_left .desc");
  const root = document.documentElement;
  const photoCards = {
    dashboard: dashPhotoCard,
    luggage: luggagePhotoCard,
    seating: seatingPhotoCard,
    carpets: carpetsPhotoCard,
  };

  const requiredNodes = [
    section,
    scene,
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
    ...Object.values(photoCards),
  ];

  if (requiredNodes.some((node) => !node)) {
    console.warn("[ev6_ver2] Scene init skipped because required elements are missing.");
    return;
  }

  const materialSequence = [
    {
      key: "dashboard",
      mask: dashMask,
      photoCard: photoCards.dashboard,
      growVar: "--dash-grow",
    },
    {
      key: "luggage",
      mask: luggageMask,
      photoCard: photoCards.luggage,
      growVar: "--luggage-grow",
    },
    {
      key: "seating",
      mask: seatingMask,
      photoCard: photoCards.seating,
      growVar: "--seating-grow",
    },
    {
      key: "carpets",
      mask: carpetsMask,
      photoCard: photoCards.carpets,
      growVar: "--carpet-grow",
    },
  ];

  const sequenceLookup = Object.fromEntries(
    materialSequence.map((step) => [step.key, step])
  );

  const stageTimeline = [
    { key: "bg1_scene", start: 0.0, end: 0.18, type: "bg1" },
    { key: "bg1_to_bg2_transition", start: 0.18, end: 0.3, type: "transition" },
    { key: "bg2_basic_hold_short", start: 0.3, end: 0.34, type: "hold" },
    { key: "dashboard", start: 0.34, end: 0.44, type: "active", materialKey: "dashboard" },
    { key: "hold_1", start: 0.44, end: 0.48, type: "hold" },
    { key: "luggage", start: 0.48, end: 0.58, type: "active", materialKey: "luggage" },
    { key: "hold_2", start: 0.58, end: 0.62, type: "hold" },
    { key: "seating", start: 0.62, end: 0.72, type: "active", materialKey: "seating" },
    { key: "hold_3", start: 0.72, end: 0.76, type: "hold" },
    { key: "carpets", start: 0.76, end: 0.88, type: "active", materialKey: "carpets" },
    { key: "final_hold_optional", start: 0.88, end: 1.0, type: "hold" },
  ];

  let rafId = null;
  let bg2Locked = false;

  if (bg1Desc) {
    bg1Desc.innerHTML = "Our commitment to the Earth is woven into every fiber of the EV6.<br>Kia's innovative engineering transforms recycled plastics into premium, sustainable materials.";
  }

  if (bg2Desc) {
    bg2Desc.innerHTML = "A true machine for a sustainable future.<br>We've repurposed 111 plastic water bottles into the luxurious fabrics of the EV6 cabin, proving that high-end design and environmental responsibility can coexist perfectly.";
  }

  function getCurrentStage(progress) {
    return (
      stageTimeline.find((stage) => progress >= stage.start && progress < stage.end) ||
      stageTimeline[stageTimeline.length - 1]
    );
  }

  function syncFeatureBottomToVisiblePhotoCard() {
    const visibleCards = Object.values(photoCards).filter((card) => {
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

  function setPhotoCardVisible(card, isVisible) {
    if (!card) {
      return;
    }

    card.classList.toggle("is_hidden", !isVisible);
    card.style.opacity = isVisible ? "1" : "0";
    card.style.transform = isVisible
      ? "translate3d(0, 0, 0) scale(1)"
      : "translate3d(0, 18px, 0) scale(0.76)";
  }

  function setActivePhoto(step) {
    if (!step) {
      Object.values(photoCards).forEach((card) => setPhotoCardVisible(card, false));
      return;
    }

    Object.entries(photoCards).forEach(([key, card]) => {
      setPhotoCardVisible(card, key === step.key);
    });
  }

  function resetFeatureGrowth() {
    root.style.setProperty("--dash-grow", "0");
    root.style.setProperty("--luggage-grow", "0");
    root.style.setProperty("--seating-grow", "0");
    root.style.setProperty("--carpet-grow", "0");
  }

  function applyStageState(stage) {
    const activeStep = stage.type === "active" ? sequenceLookup[stage.materialKey] : null;

    resetFeatureGrowth();
    materialSequence.forEach((step) => {
      step.mask.style.opacity = activeStep && activeStep.key === step.key ? "1" : "0";
    });

    if (activeStep) {
      root.style.setProperty(activeStep.growVar, "1");
      setActivePhoto(activeStep);
    } else {
      setActivePhoto(null);
    }
  }

  function render() {
    const total = Math.max(section.offsetHeight - window.innerHeight, 1);
    const passed = clamp(-section.getBoundingClientRect().top, 0, total);
    const rawProgress = passed / total;
    const vh = window.innerHeight;

    if (rawProgress <= 0.005 && section.getBoundingClientRect().top >= 0) {
      bg2Locked = false;
    }

    if (rawProgress >= 0.3) {
      bg2Locked = true;
    }

    const visualProgress = bg2Locked ? Math.max(rawProgress, 0.3) : rawProgress;
    const stage = getCurrentStage(visualProgress);
    const bgTransitionProgress = sstep(0.18, 0.3, visualProgress);
    const bg1SceneProgress = sstep(0.02, 0.18, rawProgress);

    const trackY = Math.round(-vh * bgTransitionProgress);
    const bg2InnerY = Math.round(mix(vh * 0.03, 0, bgTransitionProgress));
    const bg2Scale = mix(1.04, 1, bgTransitionProgress);

    bgTrack.style.transform = `translate3d(0, ${trackY}px, 0)`;
    if (bg2FeaturesTrack) {
      bg2FeaturesTrack.style.transform = `translate3d(0, ${trackY}px, 0)`;
    }

    bg2Img.style.transform = `translate3d(0, ${bg2InnerY}px, 0) scale(${bg2Scale})`;
    if (bg2FeaturesSurface) {
      bg2FeaturesSurface.style.transform = `translate3d(0, ${bg2InnerY}px, 0) scale(${bg2Scale})`;
    }

    if (bg1CopyStage) {
      bg1CopyStage.style.opacity = String(1 - bgTransitionProgress);
      bg1CopyStage.style.transform = `translate3d(0, ${Math.round(mix(0, -20, bgTransitionProgress))}px, 0)`;
    }

    if (bg2CopyStage) {
      bg2CopyStage.style.opacity = String(bgTransitionProgress);
      bg2CopyStage.style.transform = `translate3d(0, ${Math.round(mix(28, 0, bgTransitionProgress))}px, 0)`;
    }

    const carHeight = carWrap.offsetHeight;
    const startY = carHeight * 1.16 + vh * 0.14;
    const enterY = mix(startY, -vh * 0.05, bg1SceneProgress);
    const settleY = mix(-vh * 0.05, -vh * 0.1, bgTransitionProgress);
    const carTranslateY = visualProgress < 0.18 ? enterY : settleY;
    const carScale = mix(1.08, 0.5, sstep(0.08, 0.3, visualProgress));

    carWrap.style.transform = `translate(-50%, -100%) translate3d(0, ${Math.round(carTranslateY)}px, 0) scale(${carScale})`;

    const solidOpacity = sstep(0.04, 0.12, rawProgress) * (1 - sstep(0.22, 0.32, visualProgress));
    solidCar.style.opacity = String(solidOpacity);
    solidCar.style.filter = `drop-shadow(0 ${Math.round(mix(72, 30, bgTransitionProgress))}px ${Math.round(mix(108, 56, bgTransitionProgress))}px rgba(0,0,0,0.45)) blur(${mix(14, 0, sstep(0.05, 0.16, rawProgress))}px)`;

    const xrayOpacity = sstep(0.23, 0.32, visualProgress);
    xrayCar.style.opacity = String(xrayOpacity);
    xrayCar.style.filter = `drop-shadow(0 0 ${Math.round(mix(8, 24, xrayOpacity))}px rgba(255,255,255,0.16)) blur(${mix(8, 0.6, xrayOpacity)}px) brightness(${mix(1, 1.08, xrayOpacity)})`;

    const sectionBackground = bgTransitionProgress < 1 ? "#0C1115" : "#252941";
    section.style.backgroundColor = sectionBackground;
    scene.style.backgroundColor = sectionBackground;

    detailsLayer.style.opacity = visualProgress >= 0.3 ? "1" : "0";
    detailsLayer.style.transform = visualProgress >= 0.3
      ? "translate3d(0, 0, 0)"
      : "translate3d(0, 18px, 0)";

    applyStageState(stage);
    syncFeatureBottomToVisiblePhotoCard();
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
