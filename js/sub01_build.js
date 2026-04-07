document.addEventListener("DOMContentLoaded", () => {
  if (window.gsap && window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);
  }

  const heroSection = document.getElementById("heroSection");
  const heroBgImage = document.getElementById("heroBgImage");
  const heroTitle = document.getElementById("heroTitle");
  const heroCarImage = document.getElementById("heroCarImage");
  const heroVisual = document.getElementById("heroVisual");
  const heroModelStage = document.getElementById("heroModelStage");
  const heroTrimStage = document.getElementById("heroTrimStage");
  const heroCatalog = document.getElementById("heroCatalog");
  const heroTrimHeader = document.getElementById("heroTrimHeader");
  const heroTrimTitle = document.getElementById("heroTrimTitle");
  const heroTrimGrade = document.getElementById("heroTrimGrade");
  const heroTrimPrice = document.getElementById("heroTrimPrice");
  const heroTrimLease = document.getElementById("heroTrimLease");
  const heroTrimImage = document.getElementById("heroTrimImage");
  const heroColorStage = document.getElementById("heroColorStage");
  const heroColorTitle = document.getElementById("heroColorTitle");
  const heroColorTrim = document.getElementById("heroColorTrim");
  const heroColorPrice = document.getElementById("heroColorPrice");
  const heroColorLease = document.getElementById("heroColorLease");
  const heroColorImage = document.getElementById("heroColorImage");
  const heroSeatPreview = document.getElementById("heroSeatPreview");
  const heroSeatPreviewImage = document.getElementById("heroSeatPreviewImage");
  const heroPackageStage = document.getElementById("heroPackageStage");
  const heroPackageTitle = document.getElementById("heroPackageTitle");
  const heroPackageTrim = document.getElementById("heroPackageTrim");
  const heroPackagePrice = document.getElementById("heroPackagePrice");
  const heroPackageLease = document.getElementById("heroPackageLease");
  const heroPackageImage = document.getElementById("heroPackageImage");
  const heroPackageCards = document.getElementById("heroPackageCards");
  const heroAccessoryStage = document.getElementById("heroAccessoryStage");
  const heroAccessoryTitle = document.getElementById("heroAccessoryTitle");
  const heroAccessoryTrim = document.getElementById("heroAccessoryTrim");
  const heroAccessoryPrice = document.getElementById("heroAccessoryPrice");
  const heroAccessoryLease = document.getElementById("heroAccessoryLease");
  const heroAccessoryImage = document.getElementById("heroAccessoryImage");
  const heroPlanStage = document.getElementById("heroPlanStage");
  const heroPlanTitle = document.getElementById("heroPlanTitle");
  const heroPlanTrim = document.getElementById("heroPlanTrim");
  const heroPlanPrice = document.getElementById("heroPlanPrice");
  const heroPlanLease = document.getElementById("heroPlanLease");
  const heroPlanImage = document.getElementById("heroPlanImage");
  const heroPlanCards = document.getElementById("heroPlanCards");
  const heroSummaryStage = document.getElementById("heroSummaryStage");
  const heroSummaryTitle = document.getElementById("heroSummaryTitle");
  const heroSummaryTrim = document.getElementById("heroSummaryTrim");
  const heroSummaryPrice = document.getElementById("heroSummaryPrice");
  const heroSummaryLease = document.getElementById("heroSummaryLease");
  const heroSummaryImage = document.getElementById("heroSummaryImage");
  const heroSummarySide = heroSummaryStage?.querySelector(".hero_summary_side");
  const requestQuoteButton = document.getElementById("requestQuoteButton");
  const heroQuotePanel = document.getElementById("heroQuotePanel");
  const quoteBackButton = document.getElementById("quoteBackButton");
  const quoteCloseButton = document.getElementById("quoteCloseButton");
  const quoteSendButton = document.getElementById("quoteSendButton");
  const quoteTestFillButton = document.getElementById("quoteTestFillButton");
  const quoteZipDisplay = document.getElementById("quoteZipDisplay");
  const quoteZipEditButton = document.getElementById("quoteZipEditButton");
  const quoteZipInput = document.getElementById("quoteZipInput");
  const quoteFirstName = document.getElementById("quoteFirstName");
  const quoteLastName = document.getElementById("quoteLastName");
  const quotePhone = document.getElementById("quotePhone");
  const quoteEmail = document.getElementById("quoteEmail");
  const quoteAddress = document.getElementById("quoteAddress");
  const quoteFirstNameError = document.getElementById("quoteFirstNameError");
  const quoteLastNameError = document.getElementById("quoteLastNameError");
  const quotePhoneError = document.getElementById("quotePhoneError");
  const quoteEmailError = document.getElementById("quoteEmailError");
  const quoteAddressError = document.getElementById("quoteAddressError");
  const quoteSelectedModel = document.getElementById("quoteSelectedModel");
  const buildSendModal = document.getElementById("buildSendModal");
  const buildSendModalClose = document.getElementById("buildSendModalClose");
  const buildSendModalTitle = document.getElementById("build-send-modal-title");
  const buildSendModalEyebrow = document.getElementById("buildSendModalEyebrow");
  const buildSendModalStatusLabel = document.getElementById("buildSendModalStatusLabel");
  const buildSendModalDescription = document.getElementById("buildSendModalDescription");
  const buildSendModalSpecsLabel = document.getElementById("buildSendModalSpecsLabel");
  const buildSendModalSpecs = document.getElementById("buildSendModalSpecs");
  const buildSendModalVisual = document.getElementById("buildSendModalVisual");
  const buildSendModalImage = document.getElementById("buildSendModalImage");
  const buildSendModalPrimary = document.getElementById("buildSendModalPrimary");
  const buildSendModalSecondary = document.getElementById("buildSendModalSecondary");
  const summaryRowTrim = document.getElementById("summaryRowTrim");
  const summaryRowTrimPrice = document.getElementById("summaryRowTrimPrice");
  const summaryRowExterior = document.getElementById("summaryRowExterior");
  const summaryRowExteriorPrice = document.getElementById("summaryRowExteriorPrice");
  const summaryRowInterior = document.getElementById("summaryRowInterior");
  const summaryRowInteriorPrice = document.getElementById("summaryRowInteriorPrice");
  const summaryRowPlan = document.getElementById("summaryRowPlan");
  const summaryRowPlanPrice = document.getElementById("summaryRowPlanPrice");
  const heroSummarySelectedItems = document.getElementById("heroSummarySelectedItems");
  const summaryBuildTotal = document.getElementById("summaryBuildTotal");
  const heroExteriorName = document.getElementById("heroExteriorName");
  const heroExteriorPrice = document.getElementById("heroExteriorPrice");
  const heroInteriorName = document.getElementById("heroInteriorName");
  const heroExteriorSwatches = document.getElementById("heroExteriorSwatches");
  const heroInteriorSwatches = document.getElementById("heroInteriorSwatches");
  const heroTrimCards = document.getElementById("heroTrimCards");
  const heroTopTabs = document.getElementById("heroTopTabs");
  const heroTopTabsIndicator = document.getElementById("heroTopTabsIndicator");
  const viewModelButton = document.getElementById("viewModelButton");
  const nextColorButton = document.getElementById("nextColorButton");
  const viewTrimButton = document.getElementById("viewTrimButton");
  const nextPackagesButton = document.getElementById("nextPackagesButton");
  const viewColorButton = document.getElementById("viewColorButton");
  const nextAccessoriesButton = document.getElementById("nextAccessoriesButton");
  const viewPackagesButton = document.getElementById("viewPackagesButton");
  const nextPlanButton = document.getElementById("nextPlanButton");
  const viewAccessoriesButton = document.getElementById("viewAccessoriesButton");
  const nextSummaryButton = document.getElementById("nextSummaryButton");
  const viewPlanButton = document.getElementById("viewPlanButton");
  const sendBuildButton = document.getElementById("sendBuildButton");
  const topTabButtons = Array.from(
    document.querySelectorAll(".hero_top_tabs button")
  );
  const prevBtn = document.getElementById("prevCar");
  const nextBtn = document.getElementById("nextCar");
  const startStepButton = document.getElementById("startStepButton");
  const startButtonZone = document.querySelector(".hero_start_btn_zone");
  const heroCenter = document.querySelector(".hero_center");
  const heroCarStageSurface = document.querySelector("#heroModelStage .hero_car");
  const heroBottomSteps = document.getElementById("heroBottomSteps");
  const heroBottomStepsDefaultParent = heroBottomSteps?.parentElement ?? null;
  const progressFill = document.getElementById("heroProgressFill");
  const stepButtons = Array.from(
    document.querySelectorAll(".hero_bottom_tabs button")
  );
  const mobileStepMediaQuery = window.matchMedia?.("(max-width: 768px)");
  const categoryOrder = topTabButtons.map((button) => button.dataset.category);
  const defaultBackgroundImage =
    heroSection?.dataset.defaultBg || "./img/sub01_build/build_bg.png";
  const packageStageData = {
    EV9: [
      {
        name: "7-Passenger Package",
        price: "+$ 0",
        details: ["7-Passenger Seating"]
      },
      {
        name: "Nightfall Edition Package",
        price: "+$ 1,500",
        details: [
          "20-in. Nightfall Exclusive Alloy Wheels w/ Black Finish",
          "Boost Feature",
          "Front & Rear Skid Plates, Gloss Black",
          "Front Grille Trim, Gloss Black",
          "Lower Window Surrounds, Gloss Black",
          "Lower Body Side Garnish, Gloss Black",
          "Gloss Black Side View Mirrors",
          "Roof Rails, Low Profile Gloss Black",
          "Exclusive Seat Pattern",
          "Black Headliner"
        ]
      }
    ]
  };
  const trimStageData = {
    Sportage: {
      grade: "X-Line AWD",
      price: "$33,390 Starting MSRP*",
      lease: "$379 / 36 mo est. lease payments*",
      trims: [
        {
          name: "LX FWD",
          price: "$28,690 Starting MSRP*",
          lease: "$329 / 36 mo est. lease payments*",
          details: ["2.5L 4-cylinder Engine", "12.2-in. Instrument Display", "17-in. Alloy Wheels"]
        },
        {
          name: "EX FWD",
          price: "$30,490 Starting MSRP*",
          lease: "$349 / 36 mo est. lease payments*",
          details: ["Panoramic Sunroof", "Smart Power Liftgate", "SynTex Seat Trim"]
        },
        {
          name: "X-Line AWD",
          price: "$33,390 Starting MSRP*",
          lease: "$379 / 36 mo est. lease payments*",
          details: ["Active AWD", "19-in. Gloss Black Wheels", "X-Line Exterior Styling"]
        },
        {
          name: "X-Pro Prestige AWD",
          price: "$39,590 Starting MSRP*",
          lease: "$439 / 36 mo est. lease payments*",
          details: ["All-Terrain Tires", "Harman Kardon Premium Audio", "Ventilated Front Seats"]
        }
      ]
    },
    "Sorento Hybrid": {
      grade: "Prestige AWD",
      price: "$38,690 Starting MSRP*",
      lease: "$429 / 36 mo est. lease payments*",
      trims: [
        {
          name: "EX FWD",
          price: "$38,690 Starting MSRP*",
          lease: "$429 / 36 mo est. lease payments*",
          details: ["Turbo Hybrid Powertrain", "12.3-in. Touchscreen", "Digital Key 2"]
        },
        {
          name: "SX Prestige FWD",
          price: "$43,590 Starting MSRP*",
          lease: "$469 / 36 mo est. lease payments*",
          details: ["Bose Premium Audio", "360 Surround View Monitor", "Blind-Spot View Monitor"]
        },
        {
          name: "EX AWD",
          price: "$40,490 Starting MSRP*",
          lease: "$449 / 36 mo est. lease payments*",
          details: ["Torque-Vectoring AWD", "Heated Steering Wheel", "Smart Power Tailgate"]
        },
        {
          name: "Prestige AWD",
          price: "$46,890 Starting MSRP*",
          lease: "$499 / 36 mo est. lease payments*",
          details: ["Leather Seat Trim", "Dual Panoramic Displays", "Premium Interior Finish"]
        }
      ]
    },
    EV6: {
      grade: "GT-Line AWD",
      price: "$42,900 Starting MSRP*",
      lease: "$529 / 36 mo est. lease payments*",
      trims: [
        {
          name: "Light RWD",
          price: "$42,900 Starting MSRP*",
          lease: "$529 / 36 mo est. lease payments*",
          details: ["EPA-est. 232-mile range", "Rear-Wheel Drive", "Fast DC Charging"]
        },
        {
          name: "Wind RWD",
          price: "$48,700 Starting MSRP*",
          lease: "$569 / 36 mo est. lease payments*",
          details: ["EPA-est. 310-mile range", "Meridian Audio", "Heated Front Seats"]
        },
        {
          name: "GT-Line AWD",
          price: "$57,600 Starting MSRP*",
          lease: "$629 / 36 mo est. lease payments*",
          details: ["Dual Motor AWD", "Augmented Reality HUD", "20-in. Alloy Wheels"]
        },
        {
          name: "GT AWD",
          price: "$61,600 Starting MSRP*",
          lease: "$699 / 36 mo est. lease payments*",
          details: ["576 hp", "Electronically Controlled Suspension", "GT Interior Accents"]
        }
      ]
    },
    EV9: {
      grade: "Land AWD",
      price: "$68,900 Starting MSRP*",
      lease: "$648 / 36 mo est. lease payments*",
      trims: [
        {
          name: "Light RWD",
          price: "$54,900 Starting MSRP*",
          lease: "$548 / 36 mo est. lease payments*",
          image: "./img/sub01_build/trim_light.png",
          details: [
            "$54,900 Starting MSRP*",
            "NACS Charging Port",
            "7-Passenger Seating w/ 2nd-row Bench Seat"
          ]
        },
        {
          name: "Light Long Range RWD",
          price: "$57,900 Starting MSRP*",
          lease: "$578 / 36 mo est. lease payments*",
          image: "./img/sub01_build/trim_light.png",
          details: [
            "$57,900 Starting MSRP*",
            "7-Passenger Seating or 6-Passenger Option",
            "Homelink Rearview Mirror & Power Sunroof*",
            "Front & Rear Parking Sensors*"
          ]
        },
        {
          name: "Wind AWD",
          price: "$63,900 Starting MSRP*",
          lease: "$618 / 36 mo est. lease payments*",
          details: [
            "$63,900 Starting MSRP*",
            "379 hp & 443 lb.-ft. of torque (Dual Motor)",
            "Dual Sunroofs & Driver's Memory System",
            "Blind-Spot & 360 Surround View Monitor*",
            "Included All-Wheel Drive"
          ]
        },
        {
          name: "Land AWD",
          price: "$68,900 Starting MSRP*",
          lease: "$648 / 36 mo est. lease payments*",
          details: [
            "$68,900 Starting MSRP*",
            "Meridian Premium Audio System*",
            "Self-Leveling Rear Susp. & 5,000 lb. Towing*",
            "Available Nightfall Edition Package",
            "Included All-Wheel Drive"
          ]
        },
        {
          name: "GT-Line AWD",
          price: "$71,900 Starting MSRP*",
          lease: "$698 / 36 mo est. lease payments*",
          details: [
            "$71,900 Starting MSRP*",
            "0-60 mph in 4.5 seconds*",
            "Head-Up Display & 21-in. Alloy Wheels*",
            "Parking Collision-Avoidance Assist Systems*",
            "Included All-Wheel Drive"
          ]
        }
      ]
    },
    K4: {
      grade: "GT-Line Turbo",
      price: "$25,190 Starting MSRP*",
      lease: "$299 / 36 mo est. lease payments*",
      trims: [
        {
          name: "LXS",
          price: "$21,990 Starting MSRP*",
          lease: "$259 / 36 mo est. lease payments*",
          details: ["2.0L Engine", "12.3-in. Display", "Kia Connect"]
        },
        {
          name: "EX",
          price: "$23,990 Starting MSRP*",
          lease: "$279 / 36 mo est. lease payments*",
          details: ["Panoramic Display", "Heated Front Seats", "Wireless Charging"]
        },
        {
          name: "GT-Line",
          price: "$25,190 Starting MSRP*",
          lease: "$299 / 36 mo est. lease payments*",
          details: ["Sport Exterior Package", "18-in. Alloy Wheels", "Gloss Black Trim"]
        },
        {
          name: "GT-Line Turbo",
          price: "$28,090 Starting MSRP*",
          lease: "$339 / 36 mo est. lease payments*",
          details: ["1.6L Turbo Engine", "Multi-Link Rear Suspension", "GT-Line Interior"]
        }
      ]
    }
  };

  function hydrateEv9TrimDataFromHtml() {
    const trimCardElements = Array.from(
      document.querySelectorAll("#heroTrimCards .hero_trim_card")
    );

    if (!trimCardElements.length) {
      return;
    }

    trimStageData.EV9.trims = trimCardElements.map((card) => {
      const name = card.querySelector("strong")?.textContent?.trim() || "EV9 Trim";
      const imageElement = card.querySelector(".hero_trim_card_asset");
      const priceText =
        card.querySelector(".hero_trim_card_price")?.textContent?.trim();
      const leaseText =
        card.querySelector(".hero_trim_card_lease")?.textContent?.trim();
      const details = Array.from(card.querySelectorAll(".hero_trim_card_details li"))
        .map((item) => item.textContent?.trim())
        .filter(Boolean);

      return {
        name,
        price: priceText || details[0] || trimStageData.EV9.price,
        lease: leaseText || trimStageData.EV9.lease,
        image: imageElement?.getAttribute("src") || "./img/sub01_build/trim_light.png",
        alt: imageElement?.getAttribute("alt") || name,
        details
      };
    });
  }

  function getFallbackTitle(imagePath) {
    if (!imagePath) {
      return "Vehicle";
    }

    const fileName = imagePath.split("/").pop()?.split(".")[0] || "Vehicle";
    return fileName
      .replace(/[_-]+/g, " ")
      .replace(/\b\w/g, (character) => character.toUpperCase());
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatCarTitleMarkup(title) {
    const trimmedTitle = title?.trim() || "";
    const matchedTitle = trimmedTitle.match(/^(.*?)(?:\s*)(\d+)$/);

    if (!matchedTitle) {
      return escapeHtml(trimmedTitle);
    }

    const [, label, suffix] = matchedTitle;
    const variantClass = `hero_title_suffix_${trimmedTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "")}`;

    return `${escapeHtml(label)}<span class="hero_title_suffix ${variantClass}">${escapeHtml(
      suffix
    )}</span>`;
  }

  function getTitleKey(title) {
    return (title || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "");
  }

  function getTrimDataForTitle(title) {
    return trimStageData[title] || trimStageData.EV9;
  }

  function getNormalizedTrim(trimData, trimItem, fallbackImage, fallbackAlt) {
    if (typeof trimItem !== "string") {
      return {
        ...trimItem,
        price: trimItem.price || trimData.price,
        lease: trimItem.lease || trimData.lease,
        image: trimItem.image || fallbackImage,
        alt: trimItem.alt || fallbackAlt
      };
    }

    return {
      name: trimItem,
      price: trimData.price,
      lease: trimData.lease,
      image: fallbackImage,
      alt: fallbackAlt,
      details: [trimData.price, trimData.grade, "More details coming soon"]
    };
  }

  const catalog = heroCatalog
    ? Array.from(heroCatalog.querySelectorAll(".hero_category_panel")).reduce(
        (accumulator, panel) => {
          const categoryKey = panel.dataset.category;
          const cars = Array.from(panel.querySelectorAll("li")).map((item) => {
            const titleElement = item.querySelector("h1, h2, h3, h4, h5, h6");
            const imageElement = item.querySelector("img");
            const carImage = item.dataset.carImage || imageElement?.getAttribute("src");
            const title =
              item.dataset.title ||
              titleElement?.textContent?.trim() ||
              imageElement?.dataset.title ||
              imageElement?.getAttribute("alt") ||
              getFallbackTitle(carImage);
            const alt = imageElement?.getAttribute("alt") || item.dataset.alt || title;

            return {
              title,
              carImage,
              bgImage: item.dataset.bgImage || defaultBackgroundImage,
              alt
            };
          });

          accumulator[categoryKey] = cars;
          return accumulator;
        },
        {}
      )
    : {};

  let currentCategory =
    topTabButtons.find((button) => button.classList.contains("active"))?.dataset
      .category || "ev";
  let currentCars = catalog[currentCategory] || [];
  let currentIndex = 0;
  let isAnimating = false;
  let heroCarSwipeState = null;
  let currentStep = 0;
  let selectedTrimIndex = 0;
  let selectedExteriorIndex = 0;
  let selectedInteriorIndex = 0;
  let selectedPlanIndex = 0;
  let selectedPackages = new Set();
  let pendingColorSecondarySync = 0;
  let suppressInstantActionClickUntil = 0;
  let buildSendModalOpenedAt = 0;
  let buildSendModalArmTimer = 0;
  function parseCurrencyValue(value) {
    const numericValue = Number(String(value || "").replace(/[^0-9.-]/g, ""));
    return Number.isFinite(numericValue) ? numericValue : 0;
  }

  function formatCurrencyValue(value) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(value);
  }

  function getSelectedExteriorAdjustment() {
    const selectedExterior = getSelectedExteriorSwatch();
    return parseCurrencyValue(selectedExterior?.dataset.price || 0);
  }

  function getSelectedPackageTotal() {
    return getSelectedPackageItems().reduce((sum, item) => sum + item.price, 0);
  }

  function getSelectedAccessoryTotal() {
    return getSelectedAccessoryItems().reduce((sum, item) => sum + item.price, 0);
  }

  function getAdjustedPriceLabel(basePrice, options = {}) {
    const { includePackages = false, includeAccessories = false } = options;
    const adjustedPrice =
      parseCurrencyValue(basePrice) +
      getSelectedExteriorAdjustment() +
      (includePackages ? getSelectedPackageTotal() : 0) +
      (includeAccessories ? getSelectedAccessoryTotal() : 0);

    return `${formatCurrencyValue(adjustedPrice)} Starting MSRP*`;
  }

  function formatPriceMarkup(priceLabel) {
    const trimmedLabel = String(priceLabel || "").trim();
    const match = trimmedLabel.match(/^(\$[\d,]+)(.*)$/);

    if (!match) {
      return escapeHtml(trimmedLabel);
    }

    const [, amount, suffix] = match;
    const trimmedSuffix = suffix.trim();

    if (!trimmedSuffix) {
      return `<span class="hero_price_value">${escapeHtml(amount)}</span>`;
    }

    return `<span class="hero_price_value">${escapeHtml(amount)}</span> <span class="hero_price_suffix">${escapeHtml(
      trimmedSuffix
    )}</span>`;
  }

  function formatIncrementPriceMarkup(priceLabel) {
    const trimmedLabel = String(priceLabel || "").trim();

    if (!trimmedLabel) {
      return "";
    }

    return escapeHtml(trimmedLabel).replace(
      /^\+\s*/,
      '<i class="bx bx-plus bx-remove-padding" aria-hidden="true"></i>'
    );
  }

  function formatSummaryLinePrice(value) {
    return value > 0 ? formatCurrencyValue(value) : "$0";
  }

  function formatSummaryLabel(label, iconClass, options = {}) {
    const { actionStep = null, actionType = null, actionValue = null, actionLabel = "Edit" } =
      options;
    let iconMarkup = `<i class="${escapeHtml(iconClass)}" aria-hidden="true"></i>`;

    if (actionStep !== null) {
      iconMarkup = `<button type="button" class="hero_summary_icon_btn" data-summary-step="${escapeHtml(
        actionStep
      )}" aria-label="${escapeHtml(actionLabel)} ${escapeHtml(label)}"><i class="${escapeHtml(
        iconClass
      )}" aria-hidden="true"></i></button>`;
    } else if (actionType !== null && actionValue !== null) {
      iconMarkup = `<button type="button" class="hero_summary_icon_btn" data-summary-remove-type="${escapeHtml(
        actionType
      )}" data-summary-remove-value="${escapeHtml(
        actionValue
      )}" aria-label="${escapeHtml(actionLabel)} ${escapeHtml(label)}"><i class="${escapeHtml(
        iconClass
      )}" aria-hidden="true"></i></button>`;
    }

    return `<span class="hero_summary_row_label_content">${iconMarkup}<span>${escapeHtml(
      label
    )}</span></span>`;
  }

  function getSelectedAccessoryItems() {
    return Array.from(
      document.querySelectorAll("#heroAccessoryCards .hero_accessory_card")
    )
      .map((card, index) => ({ card, index }))
      .filter(({ card }) => card.classList.contains("is-selected"))
      .map(({ card, index }) => {
      const name = card.querySelector(".hero_accessory_card_top strong")?.textContent?.trim() || "";
      const priceText =
        card.querySelector(".hero_accessory_add_btn")?.textContent?.trim() ||
        card.querySelector(".hero_accessory_card_top span")?.textContent?.trim() ||
        "+$ 0";

      return {
        type: "accessory",
        index,
        name,
        price: parseCurrencyValue(priceText)
      };
    });
  }

  function getSelectedPackageItems() {
    const packages = getCurrentPackages(getCurrentCar()?.title || "EV9");

    return Array.from(selectedPackages)
      .map((index) => packages[index])
      .filter(Boolean)
      .map((packageItem, packagePosition) => ({
        type: "package",
        index: Array.from(selectedPackages)[packagePosition],
        name: packageItem.name,
        price: parseCurrencyValue(packageItem.price)
      }));
  }

  function getSelectedPlanItem() {
    const planCards = Array.from(document.querySelectorAll("#heroPlanCards .hero_plan_card"));
    const selectedCard =
      planCards[selectedPlanIndex] ||
      document.querySelector("#heroPlanCards .hero_plan_card.is-selected") ||
      document.querySelector("#heroPlanCards .hero_plan_card");

    if (!selectedCard) {
      return {
        name: "Lite",
        price: 0,
        displayPrice: "Complimentary for up to 5 years"
      };
    }

    const name =
      selectedCard.querySelector(".hero_plan_card_top strong")?.textContent?.trim() || "Lite";
    const priceText =
      selectedCard.querySelector(".hero_plan_card_top span")?.textContent?.trim() || "$0";

    return {
      name,
      price: parseCurrencyValue(priceText),
      displayPrice: priceText
    };
  }

  function getBuildModalSpecs() {
    const selectedExterior = getSelectedExteriorSwatch();
    const selectedInterior = getSelectedInteriorSwatch();
    const selectedPlan = getSelectedPlanItem();
    const packageItems = getSelectedPackageItems();
    const accessoryItems = getSelectedAccessoryItems();
    const items = [
      `Trim: ${heroSummaryTrim?.textContent?.trim() || "Land AWD"}`,
      `Exterior: ${selectedExterior?.dataset.name || "Panthera Metal"}`,
      `Interior: ${selectedInterior?.dataset.name || "Black & Dark Gray Quilted Stripes SynTex Seat Trim"}`,
      `Maintenance Plan: ${selectedPlan.name}`,
      `Build Total: ${summaryBuildTotal?.textContent?.trim() || "$0"}`
    ];

    packageItems.forEach((item) => {
      items.push(`Package: ${item.name}`);
    });

    accessoryItems.forEach((item) => {
      items.push(`Accessory: ${item.name}`);
    });

    return items.slice(0, 8);
  }

  function populateBuildSendModal(options = {}) {
    if (
      !buildSendModalTitle ||
      !buildSendModalEyebrow ||
      !buildSendModalDescription ||
      !buildSendModalSpecs
    ) {
      return;
    }

    const currentCar = getCurrentCar();
    const trimName = heroSummaryTrim?.textContent?.trim() || "Land AWD";
    const title =
      options.title || (currentCar?.title ? `${currentCar.title} (${trimName})` : trimName);
    const specs = Array.isArray(options.specs) ? options.specs : getBuildModalSpecs();
    const variant = options.variant || "default";
    const showImage = options.showImage !== false;

    if (buildSendModal) {
      buildSendModal.dataset.variant = variant;
    }

    buildSendModalTitle.innerHTML = formatCarTitleMarkup(title);
    buildSendModalEyebrow.textContent = options.eyebrow || "Your Final Selection Estimate";
    if (buildSendModalStatusLabel) {
      buildSendModalStatusLabel.textContent =
        options.statusLabel || (variant === "incomplete" ? "Action needed:" : "Status:");
    }
    buildSendModalDescription.textContent =
      options.description || "Your build summary has been prepared successfully.";
    if (buildSendModalSpecsLabel) {
      buildSendModalSpecsLabel.textContent =
        options.specsLabel || (variant === "incomplete" ? "Missing items :" : "Selected Specs :");
    }
    if (buildSendModalPrimary) {
      buildSendModalPrimary.textContent = options.primaryLabel || "Done";
    }
    if (buildSendModalSecondary) {
      buildSendModalSecondary.textContent = options.secondaryLabel || "Continue Editing";
    }
    buildSendModalSpecs.innerHTML = "";

    specs.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      buildSendModalSpecs.appendChild(li);
    });

    if (buildSendModalVisual) {
      buildSendModalVisual.hidden = !showImage;
    }

    if (showImage && buildSendModalImage && heroSummaryImage) {
      buildSendModalImage.src = heroSummaryImage.src;
      buildSendModalImage.alt =
        heroSummaryImage.alt || `${currentCar?.title || "Selected build"} preview`;
    }
  }

  function openBuildSendModal(options = {}) {
    if (!buildSendModal) {
      return;
    }

    populateBuildSendModal(options);
    buildSendModalOpenedAt = window.performance.now();
    buildSendModal.dataset.closable = "false";
    window.clearTimeout(buildSendModalArmTimer);
    buildSendModalArmTimer = window.setTimeout(() => {
      if (buildSendModal?.classList.contains("is-open")) {
        buildSendModal.dataset.closable = "true";
      }
    }, 300);
    buildSendModal.classList.add("is-open");
    buildSendModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }

  function closeBuildSendModal() {
    if (!buildSendModal) {
      return;
    }

    window.clearTimeout(buildSendModalArmTimer);
    buildSendModal.dataset.closable = "false";
    buildSendModal.classList.remove("is-open");
    buildSendModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  function updateSummaryPanel(basePriceText) {
    if (
      !summaryRowTrim ||
      !summaryRowTrimPrice ||
      !summaryRowExterior ||
      !summaryRowExteriorPrice ||
      !summaryRowInterior ||
      !summaryRowInteriorPrice ||
      !summaryRowPlan ||
      !summaryRowPlanPrice ||
      !heroSummarySelectedItems ||
      !summaryBuildTotal
    ) {
      return;
    }

    const selectedExterior = getSelectedExteriorSwatch();
    const selectedInterior = getSelectedInteriorSwatch();
    const packageItems = getSelectedPackageItems();
    const accessoryItems = getSelectedAccessoryItems();
    const selectedPlan = getSelectedPlanItem();
    const basePrice = parseCurrencyValue(basePriceText);
    const exteriorPrice = parseCurrencyValue(selectedExterior?.dataset.price || 0);
    const interiorPrice = 0;
    const destinationFee = 1645;
    const packageTotal = getSelectedPackageTotal();
    const accessoryTotal = getSelectedAccessoryTotal();
    const total =
      basePrice + exteriorPrice + interiorPrice + packageTotal + accessoryTotal + destinationFee;

    summaryRowTrim.innerHTML = formatSummaryLabel(
      heroSummaryTrim?.textContent || "Land AWD",
      "bx bx-edit-alt",
      { actionStep: "1" }
    );
    summaryRowTrimPrice.textContent = formatCurrencyValue(basePrice);
    summaryRowExterior.innerHTML = formatSummaryLabel(
      selectedExterior?.dataset.name || "Panthera Metal",
      "bx bx-edit-alt",
      { actionStep: "2" }
    );
    summaryRowExteriorPrice.textContent = formatSummaryLinePrice(exteriorPrice);
    summaryRowInterior.innerHTML = formatSummaryLabel(
      selectedInterior?.dataset.name || "Black & Dark Gray Quilted Stripes SynTex Seat Trim",
      "bx bx-edit-alt",
      { actionStep: "2" }
    );
    summaryRowInteriorPrice.textContent = formatSummaryLinePrice(interiorPrice);
    summaryRowPlan.innerHTML = formatSummaryLabel(selectedPlan.name, "bx bx-edit-alt", {
      actionStep: "5"
    });
    summaryRowPlanPrice.textContent = selectedPlan.displayPrice;

    heroSummarySelectedItems.innerHTML = [...packageItems, ...accessoryItems]
      .map(
        (item) => `
          <div class="hero_summary_row">
            <span class="hero_summary_row_label">${formatSummaryLabel(item.name, "bx bx-x", {
              actionType: item.type,
              actionValue: String(item.index),
              actionLabel: "Remove"
            })}</span>
            <span class="hero_summary_row_price">${formatCurrencyValue(item.price)}</span>
          </div>
        `
      )
      .join("");

    summaryBuildTotal.textContent = formatCurrencyValue(total);
  }

  function isEv9Selected() {
    return getCurrentCar()?.title === "EV9";
  }

  function hasSelectedTrim() {
    return selectedTrimIndex !== null;
  }

  function syncTrimSelectionGate() {
    if (!nextColorButton) {
      return;
    }

    const canProceed = hasSelectedTrim();
    nextColorButton.disabled = !canProceed;
    nextColorButton.setAttribute("aria-disabled", canProceed ? "false" : "true");
  }

  function getAllowedStep(stepIndex) {
    if (isEv9Selected()) {
      return stepIndex;
    }

    return Math.min(stepIndex, 0);
  }

  function syncEv9OnlyState() {
    const ev9Selected = isEv9Selected();

    stepButtons.forEach((button, index) => {
      const isLocked = !ev9Selected && index > 0;
      button.disabled = isLocked;
      button.setAttribute("aria-disabled", isLocked ? "true" : "false");
    });

    if (startStepButton) {
      const isLocked = !ev9Selected;
      startStepButton.disabled = isLocked;
      startStepButton.setAttribute(
        "aria-disabled",
        isLocked ? "true" : "false"
      );
      startStepButton.classList.toggle("is-ev9-locked", isLocked);
    }

    if (!ev9Selected && currentStep > 0) {
      updateSteps(0);
    }
  }

  function getCurrentCar() {
    return currentCars[currentIndex] || null;
  }

  function getSelectedExteriorSwatch() {
    const swatches = heroExteriorSwatches
      ? Array.from(heroExteriorSwatches.querySelectorAll(".hero_color_swatch"))
      : [];

    return swatches[selectedExteriorIndex] || swatches[0] || null;
  }

  function getSelectedInteriorSwatch() {
    const swatches = heroInteriorSwatches
      ? Array.from(heroInteriorSwatches.querySelectorAll(".hero_color_swatch"))
      : [];

    return swatches[selectedInteriorIndex] || swatches[0] || null;
  }

  function getExteriorAssetFromSwatch(swatch) {
    const assetId = swatch?.dataset.imageId;

    if (!assetId) {
      return null;
    }

    return document.getElementById(assetId);
  }

  function getInteriorAssetFromSwatch(swatch) {
    const assetId = swatch?.dataset.imageId;

    if (!assetId) {
      return null;
    }

    return document.getElementById(assetId);
  }

  function getSelectedExteriorMedia(fallbackSrc, fallbackAlt) {
    const selectedExteriorAsset = getExteriorAssetFromSwatch(getSelectedExteriorSwatch());

    return {
      src: selectedExteriorAsset?.getAttribute("src") || fallbackSrc,
      alt: selectedExteriorAsset?.getAttribute("alt") || fallbackAlt
    };
  }

  function syncExteriorPreviewTone(imageElement) {
    if (!imageElement) {
      return;
    }

    const selectedExteriorName =
      getSelectedExteriorSwatch()?.dataset.name?.trim() || "";
    const shouldDesaturate = selectedExteriorName === "Glacial White Pearl";

    imageElement.classList.toggle("is-glacial-white-pearl", shouldDesaturate);
  }

  function setVehicleStageImage(imageElement, fallbackSrc, fallbackAlt) {
    if (!imageElement) {
      return;
    }

    const selectedExteriorMedia = getSelectedExteriorMedia(fallbackSrc, fallbackAlt);
    imageElement.src = selectedExteriorMedia.src;
    imageElement.alt = selectedExteriorMedia.alt;
    syncExteriorPreviewTone(imageElement);
  }

  function syncNonColorStageVehicleImages() {
    setVehicleStageImage(heroPackageImage, heroPackageImage?.src, heroPackageImage?.alt);
    setVehicleStageImage(heroAccessoryImage, heroAccessoryImage?.src, heroAccessoryImage?.alt);
    setVehicleStageImage(heroPlanImage, heroPlanImage?.src, heroPlanImage?.alt);
    setVehicleStageImage(heroSummaryImage, heroSummaryImage?.src, heroSummaryImage?.alt);
  }

  function getCurrentTrimItems(title) {
    const trimData = getTrimDataForTitle(title);
    const currentCar = getCurrentCar();

    return trimData.trims.map((trimItem) =>
      getNormalizedTrim(
        trimData,
        trimItem,
        currentCar?.carImage || "./img/sub01_build/trim_light.png",
        currentCar?.alt || title
      )
    );
  }

  function getCurrentPackages(title) {
    return packageStageData[title] || packageStageData.EV9 || [];
  }

  function getCurrentBasePrice() {
    const currentCar = getCurrentCar();
    const title = currentCar?.title || "EV9";
    const trimData = getTrimDataForTitle(title);
    const trimItems = getCurrentTrimItems(title);
    const selectedTrim =
      selectedTrimIndex === null
        ? trimItems[0] || null
        : trimItems[selectedTrimIndex] || trimItems[0] || null;

    return selectedTrim?.price || trimData.price;
  }

  function syncQuoteSelectedModel() {
    if (!quoteSelectedModel) {
      return;
    }

    const modelName = heroSummaryTitle?.textContent?.trim() || getCurrentCar()?.title || "EV9";
    const trimName = heroSummaryTrim?.textContent?.trim() || "Land AWD";
    const exteriorName = getSelectedExteriorSwatch()?.dataset.name?.trim() || "";
    const interiorName = getSelectedInteriorSwatch()?.dataset.name?.trim() || "";
    const planName = getSelectedPlanItem()?.name?.trim() || "";
    const packageNames = getSelectedPackageItems()
      .map((item) => item.name?.trim())
      .filter(Boolean);
    const accessoryNames = getSelectedAccessoryItems()
      .map((item) => item.name?.trim())
      .filter(Boolean);

    const mainText = `${modelName} ${trimName}`.trim();
    const metaParts = [
      exteriorName,
      interiorName,
      planName ? `Plan: ${planName}` : "",
      packageNames.length ? `Pkg: ${packageNames.join(", ")}` : "",
      accessoryNames.length ? `Acc: ${accessoryNames.join(", ")}` : ""
    ].filter(Boolean);

    const metaText = metaParts.join(" / ");

    quoteSelectedModel.innerHTML = [
      `<span class="hero_quote_selected_model_main">${escapeHtml(mainText)}</span>`,
      metaText
        ? `<span class="hero_quote_selected_model_meta"> / ${escapeHtml(metaText)}</span>`
        : ""
    ].join("");
  }

  function toggleQuoteError(input, errorElement, isVisible) {
    if (!input || !errorElement) {
      return;
    }

    errorElement.hidden = !isVisible;
    input.setAttribute("aria-invalid", isVisible ? "true" : "false");
  }

  function validateQuoteField(input, errorElement) {
    const isEmpty = !input || !input.value.trim();
    toggleQuoteError(input, errorElement, isEmpty);
    return !isEmpty;
  }

  function getQuoteRequiredFields() {
    return [
      {
        input: quoteFirstName,
        errorElement: quoteFirstNameError,
        label: "First name"
      },
      {
        input: quoteLastName,
        errorElement: quoteLastNameError,
        label: "Last name"
      },
      {
        input: quotePhone,
        errorElement: quotePhoneError,
        label: "Phone"
      },
      {
        input: quoteEmail,
        errorElement: quoteEmailError,
        label: "Email"
      },
      {
        input: quoteAddress,
        errorElement: quoteAddressError,
        label: "Address"
      }
    ];
  }

  function getQuoteValidationState({ showInlineErrors = false } = {}) {
    const missingFields = [];
    const hasContactMethod = Boolean(
      heroQuotePanel?.querySelector(".hero_quote_method_btn.is-active")
    );
    const hasPaymentMethod = Boolean(
      heroQuotePanel?.querySelector(".hero_quote_payment_btn.is-active")
    );
    const hasDealer = Boolean(heroQuotePanel?.querySelector(".hero_quote_dealer_card.is-selected"));

    if (!hasContactMethod) {
      missingFields.push("Contact Method");
    }

    getQuoteRequiredFields().forEach(({ input, errorElement, label }) => {
      const isFilled = showInlineErrors
        ? validateQuoteField(input, errorElement)
        : Boolean(input?.value?.trim());

      if (!isFilled) {
        missingFields.push(label);
      }
    });

    if (!hasPaymentMethod) {
      missingFields.push("Payment Method");
    }

    if (!hasDealer) {
      missingFields.push("Select Dealer");
    }

    return {
      isValid: missingFields.length === 0,
      missingFields
    };
  }

  function validateQuoteForm() {
    return getQuoteValidationState({ showInlineErrors: true }).isValid;
  }

  function updateSendBuildButtonState() {
    if (!sendBuildButton) {
      return;
    }

    const { isValid, missingFields } = getQuoteValidationState();
    sendBuildButton.disabled = false;
    sendBuildButton.classList.remove("is-disabled");
    sendBuildButton.setAttribute("aria-disabled", "false");
    sendBuildButton.dataset.quoteReady = isValid ? "true" : "false";
    sendBuildButton.title = isValid
      ? "Send your quote request."
      : `Please complete the required quote fields before sending: ${missingFields.join(", ")}.`;
  }

  function openIncompleteQuoteModal(missingFields) {
    openBuildSendModal({
      variant: "incomplete",
      eyebrow: "Quote Form Incomplete",
      title: "Complete Required Fields",
      description:
        "Please fill in the missing required items below before sending your quote request.",
      statusLabel: "Action needed:",
      specsLabel: "Missing items :",
      specs: missingFields,
      primaryLabel: "Continue Editing",
      secondaryLabel: "Close",
      showImage: false
    });
  }

  function handleQuoteSendAttempt() {
    const validationState = getQuoteValidationState({ showInlineErrors: true });

    if (!validationState.isValid) {
      openQuotePanel();
      updateSendBuildButtonState();
      openIncompleteQuoteModal(validationState.missingFields);
      return;
    }

    closeQuotePanel();
    updateSendBuildButtonState();
    openBuildSendModal({
      eyebrow: "Quote Request Complete",
      description:
        "Your quote request has been sent successfully. A dealer will review your build and contact you soon."
    });
  }

  function commitQuoteZip() {
    if (!quoteZipDisplay || !quoteZipInput || !quoteZipEditButton) {
      return;
    }

    const nextZip = quoteZipInput.value.trim() || "12345";
    quoteZipDisplay.textContent = nextZip;
    quoteZipInput.value = nextZip;
    quoteZipInput.hidden = true;
    quoteZipDisplay.parentElement?.removeAttribute("hidden");
    quoteZipEditButton.hidden = false;
  }

  function autofillQuoteTestData() {
    if (quoteFirstName) {
      quoteFirstName.value = "Alex";
      validateQuoteField(quoteFirstName, quoteFirstNameError);
    }

    if (quoteLastName) {
      quoteLastName.value = "Kim";
      validateQuoteField(quoteLastName, quoteLastNameError);
    }

    if (quotePhone) {
      quotePhone.value = "010-1234-5678";
      validateQuoteField(quotePhone, quotePhoneError);
    }

    if (quoteEmail) {
      quoteEmail.value = "alex.kim@example.com";
      validateQuoteField(quoteEmail, quoteEmailError);
    }

    if (quoteAddress) {
      quoteAddress.value = "123 Gangnam-daero, Seoul";
      validateQuoteField(quoteAddress, quoteAddressError);
    }

    if (quoteZipInput) {
      quoteZipInput.value = "12345";
      commitQuoteZip();
    }
  }

  function setExclusiveActiveButton(buttons, targetButton) {
    const shouldActivate = !targetButton?.classList.contains("is-active");

    buttons.forEach((button) => {
      const isActive = shouldActivate && button === targetButton;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  function initializeQuoteSelections() {
    if (!heroQuotePanel) {
      return;
    }

    [
      ...heroQuotePanel.querySelectorAll(".hero_quote_method_btn"),
      ...heroQuotePanel.querySelectorAll(".hero_quote_payment_btn")
    ].forEach((button) => {
      button.classList.remove("is-active");
      button.setAttribute("aria-pressed", "false");
    });
  }

  function openQuotePanel() {
    if (!heroQuotePanel || !heroSummaryStage) {
      return;
    }

    syncQuoteSelectedModel();
    const summarySide = heroQuotePanel.closest(".hero_summary_side");
    const summaryPanel = summarySide?.querySelector(".hero_summary_panel");
    const summaryPanelHeight = summaryPanel?.getBoundingClientRect().height ?? 0;

    if (summarySide && summaryPanelHeight > 0) {
      summarySide.style.setProperty(
        "--hero-quote-panel-height",
        `${Math.ceil(summaryPanelHeight)}px`
      );
    }

    heroQuotePanel.hidden = false;
    summarySide?.classList.add("is-quote-mode");
    heroQuotePanel.querySelector(".hero_quote_panel_body")?.scrollTo({
      top: 0,
      behavior: "auto"
    });
    requestQuoteButton?.setAttribute("aria-expanded", "true");
    updateSendBuildButtonState();
  }

  function applySelectedTrim(title) {
    if (!heroTrimTitle || !heroTrimImage) {
      return;
    }

    const trimData = getTrimDataForTitle(title);
    const trimItems = getCurrentTrimItems(title);
    const selectedTrim =
      selectedTrimIndex === null
        ? trimItems[0] || null
        : trimItems[selectedTrimIndex] || trimItems[0] || null;
    const titleKey = getTitleKey(title);

    heroTrimTitle.innerHTML = formatCarTitleMarkup(title);
    heroTrimTitle.className = "hero_trim_title";

    if (titleKey) {
      heroTrimTitle.classList.add(`hero_title_${titleKey}`);
    }

    heroTrimGrade.textContent = selectedTrim?.name || trimData.grade;
    heroTrimPrice.innerHTML = formatPriceMarkup(getAdjustedPriceLabel(
      selectedTrim?.price || trimData.price
    ));
    heroTrimLease.textContent = selectedTrim?.lease || trimData.lease;
    heroTrimImage.src = selectedTrim?.image || "./img/sub01_build/trim_light.png";
    heroTrimImage.alt = selectedTrim?.alt || title;

    if (heroColorTitle && heroColorImage) {
      heroColorTitle.innerHTML = formatCarTitleMarkup(title);
      heroColorTitle.className = "hero_color_title";

      if (titleKey) {
        heroColorTitle.classList.add(`hero_title_${titleKey}`);
      }

      heroColorTrim.textContent = selectedTrim?.name || trimData.grade;
      heroColorPrice.innerHTML = formatPriceMarkup(getAdjustedPriceLabel(
        selectedTrim?.price || trimData.price
      ));
      heroColorLease.textContent = selectedTrim?.lease || trimData.lease;
      setVehicleStageImage(
        heroColorImage,
        selectedTrim?.image || "./img/sub01_build/trim_light.png",
        selectedTrim?.alt || title
      );
    }

    if (heroPackageTitle && heroPackageImage) {
      heroPackageTitle.innerHTML = formatCarTitleMarkup(title);
      heroPackageTitle.className = "hero_package_title";

      if (titleKey) {
      heroPackageTitle.classList.add(`hero_title_${titleKey}`);
      }

      heroPackageTrim.textContent = selectedTrim?.name || trimData.grade;
      heroPackagePrice.innerHTML = formatPriceMarkup(
        getAdjustedPriceLabel(selectedTrim?.price || trimData.price, {
          includePackages: true
        })
      );
      heroPackageLease.textContent = selectedTrim?.lease || trimData.lease;
      setVehicleStageImage(
        heroPackageImage,
        selectedTrim?.image || "./img/sub01_build/trim_light.png",
        selectedTrim?.alt || title
      );
    }

    if (heroAccessoryTitle && heroAccessoryImage) {
      heroAccessoryTitle.innerHTML = formatCarTitleMarkup(title);
      heroAccessoryTitle.className = "hero_accessory_title";

      if (titleKey) {
      heroAccessoryTitle.classList.add(`hero_title_${titleKey}`);
      }

      heroAccessoryTrim.textContent = selectedTrim?.name || trimData.grade;
      heroAccessoryPrice.innerHTML = formatPriceMarkup(
        getAdjustedPriceLabel(selectedTrim?.price || trimData.price, {
          includePackages: true,
          includeAccessories: true
        })
      );
      heroAccessoryLease.textContent = selectedTrim?.lease || trimData.lease;
      setVehicleStageImage(
        heroAccessoryImage,
        selectedTrim?.image || "./img/sub01_build/trim_light.png",
        selectedTrim?.alt || title
      );
    }

    if (heroPlanTitle && heroPlanImage) {
      heroPlanTitle.innerHTML = formatCarTitleMarkup(title);
      heroPlanTitle.className = "hero_plan_title";

      if (titleKey) {
      heroPlanTitle.classList.add(`hero_title_${titleKey}`);
      }

      heroPlanTrim.textContent = selectedTrim?.name || trimData.grade;
      heroPlanPrice.innerHTML = formatPriceMarkup(
        getAdjustedPriceLabel(selectedTrim?.price || trimData.price, {
          includePackages: true,
          includeAccessories: true
        })
      );
      heroPlanLease.textContent = selectedTrim?.lease || trimData.lease;
      setVehicleStageImage(
        heroPlanImage,
        selectedTrim?.image || "./img/sub01_build/trim_light.png",
        selectedTrim?.alt || title
      );
      setSelectedPlanCard(selectedPlanIndex);
    }

    if (heroSummaryTitle && heroSummaryImage) {
      heroSummaryTitle.innerHTML = formatCarTitleMarkup(title);
      heroSummaryTitle.className = "hero_summary_title";

      if (titleKey) {
      heroSummaryTitle.classList.add(`hero_title_${titleKey}`);
      }

      heroSummaryTrim.textContent = selectedTrim?.name || trimData.grade;
      heroSummaryPrice.innerHTML = formatPriceMarkup(
        getAdjustedPriceLabel(selectedTrim?.price || trimData.price, {
          includePackages: true,
          includeAccessories: true
        })
      );
      heroSummaryLease.textContent = selectedTrim?.lease || trimData.lease;
      setVehicleStageImage(
        heroSummaryImage,
        selectedTrim?.image || "./img/sub01_build/trim_light.png",
        selectedTrim?.alt || title
      );
      updateSummaryPanel(selectedTrim?.price || trimData.price);
      syncQuoteSelectedModel();
    }

  }

  function selectExteriorSwatch(index) {
    const exteriorSwatches = heroExteriorSwatches
      ? Array.from(heroExteriorSwatches.querySelectorAll(".hero_color_swatch"))
      : [];

    if (!exteriorSwatches.length) {
      return;
    }

    const nextIndex = Math.max(
      0,
      Math.min(index, exteriorSwatches.length - 1)
    );

    if (nextIndex === selectedExteriorIndex) {
      return;
    }

    selectedExteriorIndex = nextIndex;
    syncColorStageSelections({ deferSecondary: true });
  }

  function selectInteriorSwatch(index) {
    const interiorSwatches = heroInteriorSwatches
      ? Array.from(heroInteriorSwatches.querySelectorAll(".hero_color_swatch"))
      : [];

    if (!interiorSwatches.length) {
      return;
    }

    const nextIndex = Math.max(
      0,
      Math.min(index, interiorSwatches.length - 1)
    );

    if (nextIndex === selectedInteriorIndex) {
      return;
    }

    selectedInteriorIndex = nextIndex;
    syncColorStageSelections({ deferSecondary: true });
  }

  function syncColorStageSelections(options = {}) {
    const { deferSecondary = false } = options;
    const exteriorSwatches = heroExteriorSwatches
      ? Array.from(heroExteriorSwatches.querySelectorAll(".hero_color_swatch"))
      : [];
    const interiorSwatches = heroInteriorSwatches
      ? Array.from(heroInteriorSwatches.querySelectorAll(".hero_color_swatch"))
      : [];

    if (exteriorSwatches.length) {
      selectedExteriorIndex = Math.max(
        0,
        Math.min(selectedExteriorIndex, exteriorSwatches.length - 1)
      );
    }

    if (interiorSwatches.length) {
      selectedInteriorIndex = Math.max(
        0,
        Math.min(selectedInteriorIndex, interiorSwatches.length - 1)
      );
    }

    exteriorSwatches.forEach((swatch, index) => {
      swatch.classList.toggle("is-selected", index === selectedExteriorIndex);
      swatch.setAttribute(
        "aria-pressed",
        index === selectedExteriorIndex ? "true" : "false"
      );
    });

    interiorSwatches.forEach((swatch, index) => {
      swatch.classList.toggle("is-selected", index === selectedInteriorIndex);
      swatch.setAttribute(
        "aria-pressed",
        index === selectedInteriorIndex ? "true" : "false"
      );
    });

    const selectedExterior = getSelectedExteriorSwatch();
    const selectedInterior = getSelectedInteriorSwatch();

    if (heroExteriorName && selectedExterior) {
      heroExteriorName.textContent = selectedExterior.dataset.name || "";
    }

    if (heroExteriorPrice && selectedExterior) {
      heroExteriorPrice.innerHTML = formatIncrementPriceMarkup(
        selectedExterior.dataset.price || ""
      );
    }

    if (heroInteriorName && selectedInterior) {
      heroInteriorName.textContent = selectedInterior.dataset.name || "";
    }

    const selectedInteriorAsset = getInteriorAssetFromSwatch(selectedInterior);

    if (heroSeatPreviewImage && selectedInteriorAsset) {
      heroSeatPreviewImage.src =
        selectedInteriorAsset.getAttribute("src") || heroSeatPreviewImage.src;
      heroSeatPreviewImage.alt =
        selectedInteriorAsset.getAttribute("alt") || heroSeatPreviewImage.alt;
    }

    setVehicleStageImage(heroColorImage, heroColorImage?.src, heroColorImage?.alt);

    const syncSecondaryUi = () => {
      syncNonColorStageVehicleImages();
      updateSummaryPanel(getCurrentBasePrice());
      syncQuoteSelectedModel();
    };

    if (!deferSecondary) {
      syncSecondaryUi();
      return;
    }

    if (pendingColorSecondarySync) {
      cancelAnimationFrame(pendingColorSecondarySync);
    }

    pendingColorSecondarySync = requestAnimationFrame(() => {
      pendingColorSecondarySync = 0;
      syncSecondaryUi();
    });

  }

  function renderTrimCards(title) {
    if (!heroTrimCards) {
      return;
    }

    const trimItems = getCurrentTrimItems(title);
    heroTrimCards.innerHTML = trimItems
      .map(
        (trimItem, index) => `
          <article class="hero_trim_card${index === selectedTrimIndex ? " selected" : ""}${index === 0 ? " expanded" : ""}" data-trim-index="${index}">
            <div class="hero_trim_card_head">
              <strong>${escapeHtml(trimItem.name)}</strong>
              <button type="button" class="hero_trim_select_btn" aria-pressed="${index === selectedTrimIndex ? "true" : "false"}">
                ${index === selectedTrimIndex ? "Selected" : "Select"}
              </button>
            </div>
            <div class="hero_trim_card_details">
              <ul>
                ${trimItem.details
                  .map((detail) => `<li>${escapeHtml(detail)}</li>`)
                  .join("")}
              </ul>
            </div>
            <button type="button" class="hero_trim_more_btn" aria-expanded="${index === 0 ? "true" : "false"}">
              <span class="hero_more_label">More</span>
              <i class="bx bx-chevron-down hero_more_icon" aria-hidden="true"></i>
            </button>
          </article>
        `
      )
      .join("");
  }

  function renderPackageCards(title) {
    if (!heroPackageCards) {
      return;
    }

    const packages = getCurrentPackages(title);
    heroPackageCards.innerHTML = packages
      .map(
        (packageItem, index) => `
          <article class="hero_package_card${selectedPackages.has(index) ? " expanded" : ""}" data-package-index="${index}">
            <div class="hero_package_card_top">
              <div class="hero_package_card_heading">
                <strong>${escapeHtml(packageItem.name)}</strong>
              </div>
              <button type="button" class="hero_package_add_btn" aria-pressed="${selectedPackages.has(index) ? "true" : "false"}">
                ${formatIncrementPriceMarkup(packageItem.price)}
              </button>
            </div>
            <div class="hero_package_card_details">
              <ul>
                ${packageItem.details
                  .map((detail) => `<li>${escapeHtml(detail)}</li>`)
                  .join("")}
              </ul>
            </div>
            <button type="button" class="hero_package_more_btn" aria-expanded="${selectedPackages.has(index) ? "true" : "false"}">
              <span class="hero_more_label">More</span>
              <i class="bx bx-chevron-down hero_more_icon" aria-hidden="true"></i>
            </button>
          </article>
        `
      )
      .join("");
  }

  function setSelectedTrimCard(targetIndex) {
    if (!heroTrimCards) {
      return;
    }

    const trimCards = Array.from(heroTrimCards.querySelectorAll(".hero_trim_card"));
    selectedTrimIndex = selectedTrimIndex === targetIndex ? null : targetIndex;

    trimCards.forEach((card, index) => {
      const isSelected = index === selectedTrimIndex;
      card.classList.toggle("selected", isSelected);
      if (isSelected) {
        card.classList.add("expanded");
      }

      const selectButton = card.querySelector(".hero_trim_select_btn");
      if (selectButton) {
        selectButton.textContent = isSelected ? "Selected" : "Select";
        selectButton.setAttribute("aria-pressed", isSelected ? "true" : "false");
      }

      const moreButton = card.querySelector(".hero_trim_more_btn");
      if (moreButton && isSelected) {
        moreButton.setAttribute("aria-expanded", "true");
      }
    });

    const currentCar = getCurrentCar();
    if (currentCar) {
      applySelectedTrim(currentCar.title);
      syncColorStageSelections();
    }

    syncTrimSelectionGate();
    syncStartButtonPosition();
  }

  function setSelectedPlanCard(targetIndex) {
    if (!heroPlanCards) {
      return;
    }

    const planCards = Array.from(heroPlanCards.querySelectorAll(".hero_plan_card"));

    if (!planCards.length) {
      return;
    }

    selectedPlanIndex = Math.max(0, Math.min(targetIndex, planCards.length - 1));

    planCards.forEach((card, index) => {
      const isSelected = index === selectedPlanIndex;
      card.classList.toggle("is-selected", isSelected);
      card.classList.toggle("expanded", isSelected);

      const selectButton = card.querySelector(".hero_plan_add_btn");
      if (selectButton) {
        selectButton.textContent = isSelected ? "Selected" : "Select";
        selectButton.setAttribute("aria-pressed", isSelected ? "true" : "false");
      }

      const moreButton = card.querySelector(".hero_plan_more_btn");
      if (moreButton) {
        moreButton.setAttribute("aria-expanded", isSelected ? "true" : "false");
      }
    });

    updateSummaryPanel(getCurrentBasePrice());
  }

  function toggleTrimDetails(targetIndex) {
    if (!heroTrimCards) {
      return;
    }

    const trimCards = Array.from(heroTrimCards.querySelectorAll(".hero_trim_card"));
    const targetCard = trimCards[targetIndex];

    if (!targetCard) {
      return;
    }

    const willExpand = !targetCard.classList.contains("expanded");
    targetCard.classList.toggle("expanded", willExpand);

    const moreButton = targetCard.querySelector(".hero_trim_more_btn");
    if (moreButton) {
      moreButton.setAttribute("aria-expanded", willExpand ? "true" : "false");
    }
  }

  function syncArrowState() {
    const availableCategoryCount = categoryOrder.filter(
      (categoryKey) => (catalog[categoryKey] || []).length > 0
    ).length;
    const shouldShowArrows =
      currentCars.length > 1 || availableCategoryCount > 1;
    prevBtn.style.display = shouldShowArrows ? "" : "none";
    nextBtn.style.display = shouldShowArrows ? "" : "none";
  }

  function renderCar(index) {
    const currentCar = currentCars[index];

    if (!currentCar) {
      return;
    }

    heroTitle.innerHTML = formatCarTitleMarkup(currentCar.title);
    heroTitle.className = "hero_title";
    const titleKey = getTitleKey(currentCar.title);

    if (titleKey) {
      heroTitle.classList.add(`hero_title_${titleKey}`);
    }

    if (heroBgImage) {
      heroBgImage.src = currentCar.bgImage;
    }

    heroCarImage.src = currentCar.carImage;
    heroCarImage.alt = currentCar.alt;

    if (heroTrimTitle && heroTrimImage) {
      renderTrimCards(currentCar.title);
      applySelectedTrim(currentCar.title);
    }

    renderPackageCards(currentCar.title);

  }

  function resetHeroCarImageState() {
    if (!heroCarImage) {
      return;
    }

    heroCarImage.classList.remove(
      "is-sliding-out-left",
      "is-sliding-out-right",
      "is-sliding-in-left",
      "is-sliding-in-right"
    );
    heroCarImage.style.opacity = "1";
    heroCarImage.style.transform = "none";
  }

  function syncProgressPosition() {
    if (!progressFill || !stepButtons.length) {
      return;
    }

    const progressTrack = document.querySelector(".hero_progress_track");
    const bottomSteps = document.getElementById("heroBottomSteps");
    const firstButton = stepButtons[0];
    const lastButton = stepButtons[stepButtons.length - 1];
    const activeButton = stepButtons[currentStep];

    if (!progressTrack || !bottomSteps || !firstButton || !lastButton || !activeButton) {
      return;
    }

    const stepsRect = bottomSteps.getBoundingClientRect();
    const firstButtonRect = firstButton.getBoundingClientRect();
    const lastButtonRect = lastButton.getBoundingClientRect();
    const activeButtonRect = activeButton.getBoundingClientRect();
    const progressThickness = progressTrack.getBoundingClientRect().height || 8;
    const trackEdgeOffset = Math.max(progressThickness / 2, 4);
    const fillEdgeOffset = Math.max(progressThickness / 2, 4);
    const trackStart = firstButtonRect.left - stepsRect.left - trackEdgeOffset;
    const trackEnd = lastButtonRect.right - stepsRect.left + trackEdgeOffset;
    const trackWidth = Math.max(trackEnd - trackStart, 0);
    const activeEnd = activeButtonRect.right - stepsRect.left + fillEdgeOffset;
    const fillWidth = Math.max(activeEnd - trackStart, 0);

    progressTrack.style.left = `${trackStart}px`;
    progressTrack.style.width = `${trackWidth}px`;
    progressFill.style.left = `${trackStart}px`;
    progressFill.style.width = `${fillWidth}px`;
  }

  function syncResponsiveStepTabs() {
    if (!stepButtons.length) {
      return;
    }

    const isMobileSteps = mobileStepMediaQuery?.matches;

    stepButtons.forEach((button, index) => {
      const isActive = index === currentStep;
      const isPrev = index === currentStep - 1;
      const isNext = index === currentStep + 1;
      const shouldShowLabel = !isMobileSteps || isActive || isPrev || isNext;
      const desktopLabel = button.dataset.label || button.textContent.trim();
      const mobileLabel = button.dataset.mobileLabel || desktopLabel;

      button.dataset.label = desktopLabel;
      button.textContent = shouldShowLabel
        ? (isMobileSteps ? mobileLabel : desktopLabel)
        : desktopLabel;
      button.classList.toggle("is-mobile-active", !!isMobileSteps && isActive);
      button.classList.toggle("is-mobile-neighbor", !!isMobileSteps && !isActive && (isPrev || isNext));
      button.classList.toggle("is-mobile-dot", !!isMobileSteps && !shouldShowLabel);
      button.setAttribute("aria-current", isActive ? "step" : "false");
      button.setAttribute("aria-label", desktopLabel);
    });
  }

  function updateSteps(stepIndex) {
    const allowedStep = getAllowedStep(stepIndex);
    currentStep =
      currentStep === 1 && allowedStep > 1 && !hasSelectedTrim() ? 1 : allowedStep;

    stepButtons.forEach((button, index) => {
      const isActive = index === currentStep;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    syncResponsiveStepTabs();

    if (heroTrimHeader) {
      const shouldShowTrimHeader = currentStep >= 1;
      heroTrimHeader.classList.toggle("is-visible", shouldShowTrimHeader);
      heroTrimHeader.setAttribute(
        "aria-hidden",
        shouldShowTrimHeader ? "false" : "true"
      );
    }

    if (
      heroModelStage &&
      heroTrimStage &&
      heroColorStage &&
      heroPackageStage &&
      heroAccessoryStage &&
      heroPlanStage &&
      heroSummaryStage
    ) {
      const isModelStage = currentStep === 0;
      const isTrimStage = currentStep === 1;
      const isColorStage = currentStep === 2;
      const isPackageStage = currentStep === 3;
      const isAccessoryStage = currentStep === 4;
      const isPlanStage = currentStep === 5;
      const isSummaryStage = currentStep === 6;

      heroModelStage.classList.toggle("is-hidden", !isModelStage);
      heroTrimStage.classList.toggle("is-visible", isTrimStage);
      heroTrimStage.setAttribute("aria-hidden", isTrimStage ? "false" : "true");
      heroColorStage.classList.toggle("is-visible", isColorStage);
      heroColorStage.setAttribute("aria-hidden", isColorStage ? "false" : "true");
      heroPackageStage.classList.toggle("is-visible", isPackageStage);
      heroPackageStage.setAttribute(
        "aria-hidden",
        isPackageStage ? "false" : "true"
      );
      heroAccessoryStage.classList.toggle("is-visible", isAccessoryStage);
      heroAccessoryStage.setAttribute(
        "aria-hidden",
        isAccessoryStage ? "false" : "true"
      );
      heroPlanStage.classList.toggle("is-visible", isPlanStage);
      heroPlanStage.setAttribute(
        "aria-hidden",
        isPlanStage ? "false" : "true"
      );
      heroSummaryStage.classList.toggle("is-visible", isSummaryStage);
      heroSummaryStage.setAttribute(
        "aria-hidden",
        isSummaryStage ? "false" : "true"
      );
      heroVisual?.classList.toggle("is-model-stage", isModelStage);
      startStepButton?.classList.toggle("is-hidden", !isModelStage);
      heroTopTabs?.classList.toggle("is-hidden", !isModelStage);
      heroTopTabsIndicator?.classList.toggle("is-hidden", !isModelStage);
    }

    if (startStepButton) {
      startStepButton.textContent =
        currentStep === stepButtons.length - 1 ? "Send" : "Start";
    }

    syncTrimSelectionGate();
    syncStageStepsPosition();
    syncProgressPosition();
    scheduleLayoutSync();
  }

  function syncTopTabsIndicator() {
    if (!heroTopTabs || !heroTopTabsIndicator || !heroVisual) {
      return;
    }

    const activeButton = topTabButtons.find((button) => button.classList.contains("active"));

    if (!activeButton) {
      return;
    }

    const tabsRect = heroTopTabs.getBoundingClientRect();
    const visualRect = heroVisual.getBoundingClientRect();
    const buttonRect = activeButton.getBoundingClientRect();
    const indicatorWidth = heroTopTabsIndicator.getBoundingClientRect().width || 18;
    const nextX =
      buttonRect.left - tabsRect.left + (buttonRect.width / 2) - (indicatorWidth / 2);

    heroTopTabs.style.setProperty("--hero-top-tabs-indicator-x", `${nextX}px`);
    heroTopTabsIndicator.style.left = `${tabsRect.left - visualRect.left + nextX}px`;
    heroTopTabsIndicator.style.top = `${tabsRect.bottom - visualRect.top - (indicatorWidth / 2)}px`;
  }

  function syncStartButtonPosition() {
    if (!startButtonZone || !startStepButton || !heroCenter || !heroBottomSteps) {
      return;
    }

    const isModelStage = currentStep === 0;

    if (!isModelStage) {
      startButtonZone.style.removeProperty("top");
      startButtonZone.style.removeProperty("bottom");
      return;
    }

    const heroCenterRect = heroCenter.getBoundingClientRect();
    const bottomStepsRect = heroBottomSteps.getBoundingClientRect();
    const startZoneRect = startButtonZone.getBoundingClientRect();
    const gap = window.innerWidth <= 560 ? 8 : window.innerWidth <= 768 ? 16 : 52;
    const nextTop =
      bottomStepsRect.top - heroCenterRect.top - startZoneRect.height - gap;

    startButtonZone.style.bottom = "auto";
    startButtonZone.style.top = `${Math.max(0, nextTop)}px`;
  }

  function syncStageStepsPosition() {
    if (!heroBottomSteps || !heroVisual) {
      return;
    }

    const resetResponsiveStageSteps = () => {
      if (
        heroBottomStepsDefaultParent &&
        heroBottomSteps.parentElement !== heroBottomStepsDefaultParent
      ) {
        heroBottomStepsDefaultParent.appendChild(heroBottomSteps);
      }

      heroBottomSteps.classList.remove("is-inline-stage-steps");
      heroBottomSteps.style.removeProperty("top");
      heroBottomSteps.style.removeProperty("left");
      heroBottomSteps.style.removeProperty("right");
      heroBottomSteps.style.removeProperty("bottom");
      heroBottomSteps.style.removeProperty("transform");
      heroBottomSteps.style.removeProperty("width");
      heroBottomSteps.style.removeProperty("max-width");
    };

    const isModelStage = currentStep === 0;
    const shouldUseResponsiveStageLayout =
      !isModelStage && window.innerWidth <= 1500;

    if (!shouldUseResponsiveStageLayout) {
      resetResponsiveStageSteps();
      return;
    }

    const visibleStage = [
      heroTrimStage,
      heroColorStage,
      heroPackageStage,
      heroAccessoryStage,
      heroPlanStage,
      heroSummaryStage
    ].find((stage) => stage?.classList.contains("is-visible"));

    const stageActions = visibleStage?.querySelector(".hero_stage_actions");

    if (!visibleStage || !stageActions) {
      resetResponsiveStageSteps();
      return;
    }

    if (stageActions.nextElementSibling !== heroBottomSteps) {
      stageActions.insertAdjacentElement("afterend", heroBottomSteps);
    }

    heroBottomSteps.classList.add("is-inline-stage-steps");
    heroBottomSteps.style.removeProperty("top");
    heroBottomSteps.style.removeProperty("left");
    heroBottomSteps.style.removeProperty("right");
    heroBottomSteps.style.removeProperty("bottom");
    heroBottomSteps.style.removeProperty("transform");
    heroBottomSteps.style.removeProperty("width");
    heroBottomSteps.style.removeProperty("max-width");
  }

  function syncSummaryStageBackdrop() {
    if (!heroVisual || !heroSection) {
      return;
    }

    const shouldShowBackdrop = currentStep !== 0 && window.innerWidth <= 1500;

    if (!shouldShowBackdrop) {
      heroVisual.classList.remove("has-stage-backdrop");
      heroVisual.style.removeProperty("--hero-responsive-stage-backdrop-top");
      heroSection.style.removeProperty("--hero-responsive-stage-scene-height");
      if (heroSummaryStage) {
        heroSummaryStage.style.removeProperty("--hero-summary-card-backdrop-top");
      }
      return;
    }

    const visibleStage = [
      heroTrimStage,
      heroColorStage,
      heroPackageStage,
      heroAccessoryStage,
      heroPlanStage,
      heroSummaryStage
    ].find((stage) => stage?.classList.contains("is-visible"));

    const stagePanel = visibleStage?.querySelector(
      ".hero_trim_panel, .hero_color_panels, .hero_package_panel, .hero_accessory_panel, .hero_plan_panel, .hero_summary_side"
    );

    if (!visibleStage || !stagePanel) {
      heroVisual.classList.remove("has-stage-backdrop");
      heroVisual.style.removeProperty("--hero-responsive-stage-backdrop-top");
      heroSection.style.removeProperty("--hero-responsive-stage-scene-height");
      return;
    }

    const visualRect = heroVisual.getBoundingClientRect();
    const panelRect = stagePanel.getBoundingClientRect();
    const backdropTop = Math.max(0, Math.round(panelRect.top - visualRect.top));
    const headerSpaceHeight =
      document.querySelector(".hero_header_space")?.getBoundingClientRect().height || 64;
    const sceneHeight = Math.max(
      Math.round(headerSpaceHeight + backdropTop),
      Math.round(window.innerHeight)
    );

    heroVisual.classList.add("has-stage-backdrop");
    heroVisual.style.setProperty(
      "--hero-responsive-stage-backdrop-top",
      `${backdropTop}px`
    );
    heroSection.style.setProperty(
      "--hero-responsive-stage-scene-height",
      `${sceneHeight}px`
    );

    if (heroSummaryStage?.classList.contains("is-visible") && heroSummarySide) {
      const stageRect = heroSummaryStage.getBoundingClientRect();
      const sideRect = heroSummarySide.getBoundingClientRect();
      const summaryBackdropTop = Math.max(0, Math.round(sideRect.top - stageRect.top));

      heroSummaryStage.style.setProperty(
        "--hero-summary-card-backdrop-top",
        `${summaryBackdropTop}px`
      );
    } else if (heroSummaryStage) {
      heroSummaryStage.style.removeProperty("--hero-summary-card-backdrop-top");
    }
  }

  let pendingLayoutSyncFrame = 0;

  function scheduleLayoutSync() {
    if (pendingLayoutSyncFrame) {
      window.cancelAnimationFrame(pendingLayoutSyncFrame);
    }

    pendingLayoutSyncFrame = window.requestAnimationFrame(() => {
      pendingLayoutSyncFrame = 0;
      syncResponsiveStepTabs();
      syncStageStepsPosition();
      syncProgressPosition();
      syncTopTabsIndicator();
      syncStartButtonPosition();
      syncSummaryStageBackdrop();
    });
  }

  function setCategory(categoryKey) {
    const nextCars = catalog[categoryKey] || [];

    if (!nextCars.length) {
      return;
    }

    currentCategory = categoryKey;
    currentCars = nextCars;
    currentIndex = 0;
    selectedTrimIndex = 0;
    selectedExteriorIndex = 0;
    selectedInteriorIndex = 0;
    selectedPlanIndex = 0;
    selectedPackages = new Set();
    topTabButtons.forEach((button) => {
      const isActive = button.dataset.category === currentCategory;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-selected", isActive ? "true" : "false");
    });
    syncTopTabsIndicator();
    resetHeroCarImageState();
    renderCar(currentIndex);
    syncArrowState();
    syncEv9OnlyState();
    syncColorStageSelections();
    syncTrimSelectionGate();
  }

  function getAdjacentCategory(direction) {
    if (!categoryOrder.length) {
      return null;
    }

    const currentCategoryPosition = categoryOrder.indexOf(currentCategory);

    if (currentCategoryPosition === -1) {
      return null;
    }

    for (let offset = 1; offset <= categoryOrder.length; offset += 1) {
      const nextPosition =
        direction === "next"
          ? (currentCategoryPosition + offset) % categoryOrder.length
          : (currentCategoryPosition - offset + categoryOrder.length) %
            categoryOrder.length;
      const nextCategoryKey = categoryOrder[nextPosition];

      if ((catalog[nextCategoryKey] || []).length > 0) {
        return nextCategoryKey;
      }
    }

    return null;
  }

  function changeCar(direction) {
    if (isAnimating || !currentCars.length) {
      return;
    }

    isAnimating = true;

    const exitClass =
      direction === "next" ? "is-sliding-out-left" : "is-sliding-out-right";
    const enterClass =
      direction === "next" ? "is-sliding-in-right" : "is-sliding-in-left";

    heroCarImage.classList.remove(
      "is-sliding-out-left",
      "is-sliding-out-right",
      "is-sliding-in-left",
      "is-sliding-in-right"
    );
    heroCarImage.classList.add(exitClass);

    window.setTimeout(() => {
      if (direction === "next") {
        if (currentIndex < currentCars.length - 1) {
          currentIndex += 1;
        } else {
          const nextCategoryKey = getAdjacentCategory("next");

          if (nextCategoryKey && nextCategoryKey !== currentCategory) {
            currentCategory = nextCategoryKey;
            currentCars = catalog[currentCategory] || [];
            currentIndex = 0;
            selectedTrimIndex = 0;
            selectedExteriorIndex = 0;
            selectedInteriorIndex = 0;
            selectedPlanIndex = 0;
            selectedPackages = new Set();
            topTabButtons.forEach((button) => {
              const isActive = button.dataset.category === currentCategory;
              button.classList.toggle("active", isActive);
              button.setAttribute("aria-selected", isActive ? "true" : "false");
            });
            syncTopTabsIndicator();
          } else {
            currentIndex = 0;
            selectedTrimIndex = 0;
            selectedExteriorIndex = 0;
            selectedInteriorIndex = 0;
            selectedPlanIndex = 0;
            selectedPackages = new Set();
          }
        }
      } else if (currentIndex > 0) {
        currentIndex -= 1;
        selectedTrimIndex = 0;
        selectedExteriorIndex = 0;
        selectedInteriorIndex = 0;
        selectedPlanIndex = 0;
        selectedPackages = new Set();
      } else {
        const previousCategoryKey = getAdjacentCategory("prev");

        if (previousCategoryKey && previousCategoryKey !== currentCategory) {
          currentCategory = previousCategoryKey;
          currentCars = catalog[currentCategory] || [];
          currentIndex = Math.max(currentCars.length - 1, 0);
          selectedTrimIndex = 0;
          selectedExteriorIndex = 0;
          selectedInteriorIndex = 0;
          selectedPlanIndex = 0;
          selectedPackages = new Set();
          topTabButtons.forEach((button) => {
            const isActive = button.dataset.category === currentCategory;
            button.classList.toggle("active", isActive);
            button.setAttribute("aria-selected", isActive ? "true" : "false");
          });
          syncTopTabsIndicator();
        } else {
          currentIndex = Math.max(currentCars.length - 1, 0);
          selectedTrimIndex = 0;
          selectedExteriorIndex = 0;
          selectedInteriorIndex = 0;
          selectedPlanIndex = 0;
          selectedPackages = new Set();
        }
      }

      renderCar(currentIndex);
      syncArrowState();
      syncEv9OnlyState();
      syncColorStageSelections();

      heroCarImage.classList.remove(exitClass);
      heroCarImage.classList.add(enterClass);

      window.setTimeout(() => {
        heroCarImage.classList.remove(enterClass);
        isAnimating = false;
      }, 380);
    }, 220);
  }

  topTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      updateSteps(0);
      resetHeroCarImageState();
      setCategory(button.dataset.category);
    });
  });

  heroTopTabs?.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-category]");

    if (!button) {
      return;
    }

    event.preventDefault();
    updateSteps(0);
    resetHeroCarImageState();
    setCategory(button.dataset.category);
  });

  prevBtn.addEventListener("click", () => {
    changeCar("prev");
  });

  nextBtn.addEventListener("click", () => {
    changeCar("next");
  });

  if (heroCarImage) {
    heroCarImage.draggable = false;
  }

  heroCarStageSurface?.addEventListener("pointerdown", (event) => {
    if (currentStep !== 0 || event.button > 0) {
      return;
    }

    event.preventDefault();
    heroCarSwipeState = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY
    };

    heroCarStageSurface.setPointerCapture?.(event.pointerId);
  });

  heroCarStageSurface?.addEventListener("pointerup", (event) => {
    if (!heroCarSwipeState || heroCarSwipeState.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - heroCarSwipeState.startX;
    const deltaY = event.clientY - heroCarSwipeState.startY;
    const hasHorizontalSwipe =
      Math.abs(deltaX) >= 60 && Math.abs(deltaX) > Math.abs(deltaY);

    heroCarStageSurface.releasePointerCapture?.(event.pointerId);
    heroCarSwipeState = null;

    if (hasHorizontalSwipe) {
      changeCar(deltaX > 0 ? "next" : "prev");
    }
  });

  heroCarStageSurface?.addEventListener("pointercancel", (event) => {
    if (!heroCarSwipeState || heroCarSwipeState.pointerId !== event.pointerId) {
      return;
    }

    heroCarStageSurface.releasePointerCapture?.(event.pointerId);
    heroCarSwipeState = null;
  });

  heroCarStageSurface?.addEventListener("dragstart", (event) => {
    event.preventDefault();
  });

  stepButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      updateSteps(index);
    });
  });

  mobileStepMediaQuery?.addEventListener("change", () => {
    syncResponsiveStepTabs();
    syncStageStepsPosition();
    syncProgressPosition();
  });

  document.getElementById("heroSummaryBreakdown")?.addEventListener("click", (event) => {
    const trigger =
      event.target.closest(".hero_summary_icon_btn") ||
      event.target
        .closest(".hero_summary_row:not(.hero_summary_row_fee):not(.hero_summary_row_total)")
        ?.querySelector(".hero_summary_icon_btn");
    const targetStep = Number(trigger?.dataset.summaryStep);
    const removeType = trigger?.dataset.summaryRemoveType;
    const removeValue = Number(trigger?.dataset.summaryRemoveValue);

    if (!trigger) {
      return;
    }

    if (!Number.isNaN(targetStep)) {
      updateSteps(targetStep);
      return;
    }

    if (removeType === "package" && !Number.isNaN(removeValue)) {
      selectedPackages.delete(removeValue);
      renderPackageCards(getCurrentCar()?.title || "EV9");
      applySelectedTrim(getCurrentCar()?.title || "EV9");
      updateSummaryPanel(getCurrentBasePrice());
      return;
    }

    if (removeType === "accessory" && !Number.isNaN(removeValue)) {
      const accessoryCards = Array.from(
        document.querySelectorAll("#heroAccessoryCards .hero_accessory_card")
      );
      const card = accessoryCards[removeValue];

      if (!card) {
        return;
      }

      const addButton = card.querySelector(".hero_accessory_add_btn");
      const moreButton = card.querySelector(".hero_accessory_more_btn");
      card.classList.remove("is-selected", "expanded");
      addButton?.setAttribute("aria-pressed", "false");
      moreButton?.setAttribute("aria-expanded", "false");
      applySelectedTrim(getCurrentCar()?.title || "EV9");
      updateSummaryPanel(getCurrentBasePrice());
    }
  });

  requestQuoteButton?.addEventListener("click", openQuotePanel);

  function closeQuotePanel() {
    if (!heroQuotePanel) {
      return;
    }

    const summarySide = heroQuotePanel.closest(".hero_summary_side");
    heroQuotePanel.hidden = true;
    summarySide?.classList.remove("is-quote-mode");
    summarySide?.style.removeProperty("--hero-quote-panel-height");
    requestQuoteButton?.setAttribute("aria-expanded", "false");
    updateSendBuildButtonState();
  }

  quoteBackButton?.addEventListener("click", closeQuotePanel);
  quoteCloseButton?.addEventListener("click", closeQuotePanel);

  quoteZipEditButton?.addEventListener("click", () => {
    if (!quoteZipInput || !quoteZipDisplay) {
      return;
    }

    quoteZipDisplay.parentElement?.setAttribute("hidden", "true");
    quoteZipEditButton.hidden = true;
    quoteZipInput.hidden = false;
    quoteZipInput.focus();
    quoteZipInput.select();
  });

  quoteZipInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      commitQuoteZip();
    }
  });

  quoteZipInput?.addEventListener("blur", () => {
    commitQuoteZip();
  });

  [quoteFirstName, quoteLastName, quotePhone, quoteEmail, quoteAddress].forEach((input) => {
    input?.addEventListener("input", () => {
      if (input === quoteFirstName) {
        validateQuoteField(quoteFirstName, quoteFirstNameError);
      }

      if (input === quoteLastName) {
        validateQuoteField(quoteLastName, quoteLastNameError);
      }

      if (input === quotePhone) {
        validateQuoteField(quotePhone, quotePhoneError);
      }

      if (input === quoteEmail) {
        validateQuoteField(quoteEmail, quoteEmailError);
      }

      if (input === quoteAddress) {
        validateQuoteField(quoteAddress, quoteAddressError);
      }

      updateSendBuildButtonState();
    });
  });

  quoteTestFillButton?.addEventListener("click", () => {
    autofillQuoteTestData();
    updateSendBuildButtonState();
  });

  quoteSendButton?.addEventListener("click", () => {
    handleQuoteSendAttempt();
  });

  buildSendModalClose?.addEventListener("click", closeBuildSendModal);
  buildSendModalPrimary?.addEventListener("click", closeBuildSendModal);
  buildSendModalSecondary?.addEventListener("click", closeBuildSendModal);

  buildSendModal?.addEventListener("click", (event) => {
    if (
      window.performance.now() - buildSendModalOpenedAt < 400 ||
      buildSendModal.dataset.closable !== "true"
    ) {
      return;
    }

    if (event.target instanceof HTMLElement && event.target.hasAttribute("data-build-modal-close")) {
      closeBuildSendModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && buildSendModal?.classList.contains("is-open")) {
      closeBuildSendModal();
    }
  });

  heroQuotePanel?.addEventListener("click", (event) => {
    const methodButton = event.target.closest(".hero_quote_method_btn");
    const paymentButton = event.target.closest(".hero_quote_payment_btn");
    const dealerCard = event.target.closest(".hero_quote_dealer_card");

    if (methodButton) {
      const isActive = methodButton.classList.contains("is-active");
      methodButton.classList.toggle("is-active", !isActive);
      methodButton.setAttribute("aria-pressed", !isActive ? "true" : "false");
    }

    if (paymentButton) {
      const paymentButtons = Array.from(
        heroQuotePanel.querySelectorAll(".hero_quote_payment_btn")
      );
      setExclusiveActiveButton(paymentButtons, paymentButton);
    }

    if (dealerCard) {
      heroQuotePanel.querySelectorAll(".hero_quote_dealer_card").forEach((card) => {
        const isActive = card === dealerCard;
        card.classList.toggle("is-selected", isActive);
        card.setAttribute("aria-pressed", isActive ? "true" : "false");
      });
    }

    if (methodButton || paymentButton || dealerCard) {
      updateSendBuildButtonState();
    }
  });

  initializeQuoteSelections();
  updateSendBuildButtonState();

  if (startStepButton) {
    startStepButton.addEventListener("click", () => {
      const nextStep =
        currentStep < stepButtons.length - 1 ? currentStep + 1 : currentStep;
      updateSteps(nextStep);
    });
  }

  function initializeStartButtonMotion() {
    if (
      !startStepButton ||
      !startButtonZone ||
      !window.gsap ||
      !window.ScrollTrigger
    ) {
      return;
    }

    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;

    if (prefersReducedMotion) {
      window.gsap.set(startStepButton, { clearProps: "x,y,opacity" });
      return;
    }

    window.gsap.set(startStepButton, {
      y: 40,
      opacity: 0
    });

    window.gsap.to(startStepButton, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: heroSection || startButtonZone,
        start: "top 80%",
        toggleActions: "play none none reset"
      }
    });

    startButtonZone.addEventListener("mousemove", (event) => {
      if (startStepButton.disabled) {
        return;
      }

      const rect = startButtonZone.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);

      window.gsap.to(startStepButton, {
        x: x * 0.1,
        y: y * 0.1,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto"
      });
    });

    startButtonZone.addEventListener("mouseleave", () => {
      if (startStepButton.disabled) {
        return;
      }

      window.gsap.to(startStepButton, {
        x: 0,
        y: 0,
        duration: 0.45,
        ease: "power3.out",
        overwrite: "auto"
      });
    });

    const refreshScrollTrigger = () => {
      window.ScrollTrigger.refresh();
      window.setTimeout(() => {
        window.ScrollTrigger.refresh();
      }, 500);
    };

    if (document.readyState === "complete") {
      refreshScrollTrigger();
    } else {
      window.addEventListener("load", refreshScrollTrigger, { once: true });
    }
  }

  function initializeAccessoryImageMagnifier() {
    const accessoryMediaItems = Array.from(
      document.querySelectorAll(".hero_accessory_card_media")
    );

    if (!accessoryMediaItems.length) {
      return;
    }

    const supportsHover = window.matchMedia?.("(hover: hover)")?.matches;

    accessoryMediaItems.forEach((media) => {
      const image = media.querySelector("img");

      if (!image) {
        return;
      }

      if (!supportsHover) {
        media.classList.remove("is-magnifying");
        media.style.removeProperty("--magnifier-x");
        media.style.removeProperty("--magnifier-y");
        return;
      }

      media.addEventListener("mousemove", (event) => {
        const rect = media.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        media.style.setProperty("--magnifier-x", `${x}%`);
        media.style.setProperty("--magnifier-y", `${y}%`);
        media.classList.add("is-magnifying");
      });

      media.addEventListener("mouseleave", () => {
        media.classList.remove("is-magnifying");
        media.style.removeProperty("--magnifier-x");
        media.style.removeProperty("--magnifier-y");
      });
    });
  }

  function initializeBuildCursor() {
    const buildWrap = document.querySelector(".build_wrap");
    const canUseCustomCursor =
      window.matchMedia?.("(pointer: fine)")?.matches && window.innerWidth > 1500;

    if (!buildWrap || !canUseCustomCursor) {
      return;
    }

    const cursor = document.createElement("div");
    const label = document.createElement("span");

    cursor.className = "hero-build-cursor";
    cursor.appendChild(label);
    document.body.appendChild(cursor);

    const zoomSelector = [
      ".hero_accessory_card_media",
      ".hero_trim_card_asset",
      ".hero_color_vehicle",
      ".hero_color_seat_preview"
    ].join(", ");

    const summarySelectSelector = [
      ".hero_summary_breakdown .hero_summary_row:not(.hero_summary_row_fee):not(.hero_summary_row_total)",
      "#heroSummarySelectedItems .hero_summary_row"
    ].join(", ");

    const hoverOnlySelector = [
      ".hero_trim_card",
      ".hero_color_panel",
      ".hero_package_card",
      ".hero_accessory_card",
      ".hero_plan_card",
      ".hero_summary_breakdown .hero_summary_row:not(.hero_summary_row_fee):not(.hero_summary_row_total)",
      "#heroSummarySelectedItems .hero_summary_row"
    ].join(", ");

    const selectSelector = [
      ".hero_trim_card_head",
      ".hero_color_swatches",
      ".hero_color_swatches_interior",
      ".hero_package_card_top",
      ".hero_accessory_card_top",
      ".hero_plan_card_top",
      ".hero_trim_more_btn",
      ".hero_package_more_btn",
      ".hero_accessory_more_btn",
      ".hero_plan_more_btn",
      summarySelectSelector
    ].join(", ");
    const selectHitRowSelector = [
      ".hero_trim_card_head",
      ".hero_package_card_top",
      ".hero_accessory_card_top",
      ".hero_plan_card_top",
      summarySelectSelector
    ].join(", ");

    function getExpandedSelectButtonFromPoint(event) {
      const row = event.target.closest(selectHitRowSelector);
      const button = row?.querySelector(
        ".hero_trim_select_btn, .hero_package_add_btn, .hero_accessory_add_btn, .hero_plan_add_btn, .hero_summary_icon_btn"
      );

      if (!row || !button) {
        return null;
      }

      const rect = button.getBoundingClientRect();
      const paddingLeft = 18;
      const paddingRight = 18;
      const paddingTop = 10;
      const paddingBottom = 30;
      const isWithinExpandedArea =
        event.clientX >= rect.left - paddingLeft &&
        event.clientX <= rect.right + paddingRight &&
        event.clientY >= rect.top - paddingTop &&
        event.clientY <= rect.bottom + paddingBottom;

      return isWithinExpandedArea ? button : null;
    }

    function moveCursor(event) {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;

      const zoomTarget = event.target.closest(zoomSelector);
      const hoverOnlyTarget = event.target.closest(hoverOnlySelector);
      const selectTarget =
        event.target.closest(selectSelector) ||
        getExpandedSelectButtonFromPoint(event);

      if (selectTarget) {
        cursor.dataset.label = "select";
        label.textContent = "Select";
        cursor.classList.add("is-visible");
      } else if (hoverOnlyTarget) {
        cursor.dataset.label = "";
        label.textContent = "";
        cursor.classList.add("is-visible");
      } else if (zoomTarget) {
        cursor.dataset.label = "zoom";
        label.textContent = "Zoom";
        cursor.classList.add("is-visible");
      } else {
        cursor.dataset.label = "";
        label.textContent = "";
        cursor.classList.remove("is-visible");
      }
    }

    function showCursor(event) {
      moveCursor(event);
    }

    function hideCursor() {
      cursor.classList.remove("is-visible");
      cursor.classList.remove("is-active");
    }

    function activateCursor() {
      cursor.classList.add("is-active");
    }

    function deactivateCursor() {
      cursor.classList.remove("is-active");
    }

    buildWrap.addEventListener("pointerenter", showCursor);
    buildWrap.addEventListener("pointermove", moveCursor);
    buildWrap.addEventListener("pointerleave", hideCursor);
    buildWrap.addEventListener("pointerdown", activateCursor);
    buildWrap.addEventListener("pointerup", deactivateCursor);
    buildWrap.addEventListener("pointercancel", deactivateCursor);
    buildWrap.addEventListener("click", (event) => {
      if (event.target.closest(selectSelector)) {
        return;
      }

      const expandedSelectButton = getExpandedSelectButtonFromPoint(event);

      if (!expandedSelectButton) {
        return;
      }

      event.preventDefault();
      expandedSelectButton.click();
    });

    window.addEventListener("blur", hideCursor);
    window.addEventListener("scroll", hideCursor, { passive: true });
    window.addEventListener("pointerup", deactivateCursor);
  }

  function bindDirectSwatchSelection(container, onSelect) {
    if (!container) {
      return;
    }

    Array.from(container.querySelectorAll(".hero_color_swatch")).forEach(
      (swatch, index) => {
        swatch.dataset.swatchIndex = String(index);

        swatch.addEventListener("pointerdown", (event) => {
          if (
            event.button > 0 ||
            (event.pointerType === "mouse" && event.buttons > 1)
          ) {
            return;
          }

          event.preventDefault();
          onSelect(index);
        });

        swatch.addEventListener("click", (event) => {
          if (event.detail > 0) {
            return;
          }

          event.preventDefault();
          onSelect(index);
        });
      }
    );
  }

  function bindInstantActionButton(button, handler) {
    if (!button) {
      return;
    }

    button.addEventListener("pointerdown", (event) => {
      if (button.disabled || event.button > 0) {
        return;
      }

      event.preventDefault();
      suppressInstantActionClickUntil = window.performance.now() + 400;
      handler();
    });

    button.addEventListener("click", (event) => {
      if (button.disabled) {
        return;
      }

      if (window.performance.now() < suppressInstantActionClickUntil) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      handler();
    });
  }

  function initializeDefaultAccessorySelection() {
    const accessoryContainer = document.getElementById("heroAccessoryCards");

    if (!accessoryContainer) {
      return;
    }

    const accessoryCards = Array.from(
      accessoryContainer.querySelectorAll(".hero_accessory_card")
    );
    const targetCard = accessoryCards.find((card) => {
      const name =
        card.querySelector(".hero_accessory_card_top strong")?.textContent?.trim() || "";
      return name === "NACS Charge Port DC Adapter";
    });

    if (!targetCard) {
      return;
    }

    accessoryContainer.prepend(targetCard);

    accessoryCards.forEach((card) => {
      const isTarget = card === targetCard;
      const addButton = card.querySelector(".hero_accessory_add_btn");
      const moreButton = card.querySelector(".hero_accessory_more_btn");

      card.classList.toggle("is-selected", isTarget);
      card.classList.toggle("expanded", isTarget);

      if (addButton) {
        addButton.setAttribute("aria-pressed", isTarget ? "true" : "false");
      }

      if (moreButton) {
        moreButton.setAttribute("aria-expanded", isTarget ? "true" : "false");
      }
    });
  }

  function getExpandedMoreButtonFromCardEvent(event) {
    const directButton = event.target.closest(
      ".hero_trim_more_btn, .hero_package_more_btn, .hero_accessory_more_btn, .hero_plan_more_btn"
    );

    if (directButton) {
      return directButton;
    }

    const card = event.target.closest(
      ".hero_trim_card, .hero_package_card, .hero_accessory_card, .hero_plan_card"
    );
    const candidate = card?.querySelector(
      ".hero_trim_more_btn, .hero_package_more_btn, .hero_accessory_more_btn, .hero_plan_more_btn"
    );

    if (!card || !candidate) {
      return null;
    }

    const rect = candidate.getBoundingClientRect();
    const isWithinMoreRow =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top - 4 &&
      event.clientY <= rect.bottom + 8;

    return isWithinMoreRow ? candidate : null;
  }

  bindInstantActionButton(viewModelButton, () => {
    updateSteps(0);
  });

  bindInstantActionButton(nextColorButton, () => {
    if (!isEv9Selected()) {
      return;
    }

    updateSteps(Math.min(2, stepButtons.length - 1));
  });

  bindInstantActionButton(viewTrimButton, () => {
    updateSteps(1);
  });

  bindInstantActionButton(nextPackagesButton, () => {
    updateSteps(Math.min(3, stepButtons.length - 1));
  });

  bindInstantActionButton(viewColorButton, () => {
    updateSteps(2);
  });

  bindInstantActionButton(nextAccessoriesButton, () => {
    updateSteps(Math.min(4, stepButtons.length - 1));
  });

  bindInstantActionButton(viewPackagesButton, () => {
    updateSteps(3);
  });

  bindInstantActionButton(nextPlanButton, () => {
    updateSteps(Math.min(5, stepButtons.length - 1));
  });

  bindInstantActionButton(viewAccessoriesButton, () => {
    updateSteps(4);
  });

  bindInstantActionButton(nextSummaryButton, () => {
    updateSteps(Math.min(6, stepButtons.length - 1));
  });

  bindInstantActionButton(viewPlanButton, () => {
    updateSteps(5);
  });

  bindInstantActionButton(sendBuildButton, () => {
    handleQuoteSendAttempt();
  });

  setSelectedPlanCard(selectedPlanIndex);
  initializeDefaultAccessorySelection();
  initializeStartButtonMotion();
  initializeAccessoryImageMagnifier();
  initializeBuildCursor();
  syncResponsiveStepTabs();

  heroTrimCards?.addEventListener("click", (event) => {
    const selectTrigger = event.target.closest(".hero_trim_select_btn");
    const moreTrigger = getExpandedMoreButtonFromCardEvent(event);
    const selectRegion = event.target.closest(".hero_trim_card_head");
    const trigger = selectTrigger || moreTrigger;

    if (!trigger && !selectRegion) {
      return;
    }

    const card = (trigger || selectRegion).closest(".hero_trim_card");
    const trimIndex = Number(card?.dataset.trimIndex);

    if (Number.isNaN(trimIndex)) {
      return;
    }

    if (selectTrigger || selectRegion) {
      setSelectedTrimCard(trimIndex);
      return;
    }

    if (moreTrigger) {
      toggleTrimDetails(trimIndex);
    }
  });

  bindDirectSwatchSelection(heroExteriorSwatches, (selectedIndex) => {
    selectExteriorSwatch(selectedIndex);
  });

  bindDirectSwatchSelection(heroInteriorSwatches, (selectedIndex) => {
    selectInteriorSwatch(selectedIndex);
  });

  heroPackageCards?.addEventListener("click", (event) => {
    const addTrigger = event.target.closest(".hero_package_add_btn");
    const moreTrigger = getExpandedMoreButtonFromCardEvent(event);
    const selectRegion = event.target.closest(".hero_package_card_top");
    const card = event.target.closest(".hero_package_card");
    const packageIndex = Number(card?.dataset.packageIndex);

    if (Number.isNaN(packageIndex)) {
      return;
    }

    if (addTrigger || (selectRegion && !moreTrigger)) {
      if (selectedPackages.has(packageIndex)) {
        selectedPackages.delete(packageIndex);
      } else {
        selectedPackages.add(packageIndex);
      }

      renderPackageCards(getCurrentCar()?.title || "EV9");
      applySelectedTrim(getCurrentCar()?.title || "EV9");
      updateSummaryPanel(getCurrentBasePrice());
      scheduleLayoutSync();
      return;
    }

    if (moreTrigger) {
      const willExpand = !card.classList.contains("expanded");
      card.classList.toggle("expanded", willExpand);
      moreTrigger.setAttribute("aria-expanded", willExpand ? "true" : "false");
      scheduleLayoutSync();
    }
  });

  document.getElementById("heroAccessoryCards")?.addEventListener("click", (event) => {
    const addTrigger = event.target.closest(".hero_accessory_add_btn");
    const moreTrigger = getExpandedMoreButtonFromCardEvent(event);
    const selectRegion = event.target.closest(".hero_accessory_card_top");
    const card = event.target.closest(".hero_accessory_card");

    if (!card) {
      return;
    }

    if (addTrigger || (selectRegion && !moreTrigger)) {
      const willSelect = !card.classList.contains("is-selected");
      const moreButton = card.querySelector(".hero_accessory_more_btn");

      card.classList.toggle("is-selected", willSelect);
      card.classList.toggle("expanded", willSelect);
      addTrigger.setAttribute("aria-pressed", willSelect ? "true" : "false");

      if (moreButton) {
        moreButton.setAttribute("aria-expanded", willSelect ? "true" : "false");
      }

      applySelectedTrim(getCurrentCar()?.title || "EV9");
      updateSummaryPanel(getCurrentBasePrice());
      scheduleLayoutSync();

      return;
    }

    if (!moreTrigger) {
      return;
    }

    const willExpand = !card.classList.contains("expanded");
    card.classList.toggle("expanded", willExpand);
    moreTrigger.setAttribute("aria-expanded", willExpand ? "true" : "false");
    scheduleLayoutSync();
  });

  document.getElementById("heroPlanCards")?.addEventListener("click", (event) => {
    const addTrigger = event.target.closest(".hero_plan_add_btn");
    const moreTrigger = getExpandedMoreButtonFromCardEvent(event);
    const selectRegion = event.target.closest(".hero_plan_card_top");
    const card = event.target.closest(".hero_plan_card");
    const planCards = heroPlanCards
      ? Array.from(heroPlanCards.querySelectorAll(".hero_plan_card"))
      : [];
    const planIndex = planCards.indexOf(card);

    if (!card) {
      return;
    }

    if (addTrigger || (selectRegion && !moreTrigger)) {
      if (planIndex !== -1) {
        setSelectedPlanCard(planIndex);
      }
      return;
    }

    if (!moreTrigger) {
      return;
    }

    const willExpand = !card.classList.contains("expanded");
    card.classList.toggle("expanded", willExpand);
    moreTrigger.setAttribute("aria-expanded", willExpand ? "true" : "false");
    scheduleLayoutSync();
  });

  window.addEventListener("resize", () => {
    scheduleLayoutSync();
  });

  window.addEventListener("load", () => {
    scheduleLayoutSync();
  });

  if (document.fonts?.ready) {
    document.fonts.ready.then(() => {
      scheduleLayoutSync();
    });
  }

  hydrateEv9TrimDataFromHtml();
  setCategory(currentCategory);
  renderPackageCards(getCurrentCar()?.title || "EV9");
  syncColorStageSelections();
  syncEv9OnlyState();
  updateSteps(currentStep);
  scheduleLayoutSync();
});
