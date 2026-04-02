(() => {
  const filterButtons = Array.from(document.querySelectorAll('.filter_nav button[data-target]'));
  const sections = Array.from(document.querySelectorAll('.vehicle_group[data-filter]'));
  const openCompareButton = document.querySelector('.open_compare');
  const compareTray = document.querySelector('.compare_tray');
  const compareList = compareTray?.querySelector('.compare_list');
  const compareHint = compareTray?.querySelector('.compare_hint');
  const vehicleCards = Array.from(document.querySelectorAll('.vehicle_card'));
  const MAX_COMPARE = 3;
  const comparedVehicles = [];

  const scrollToTarget = (target, offset = 150) => {
    if (!target) return;

    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - offset,
      behavior: 'smooth',
    });
  };

  const getVehicleName = (card) => {
    return card.querySelector('.meta h4')?.textContent.trim() ?? '';
  };

  const setActiveButton = (targetId) => {
    filterButtons.forEach((button) => {
      const isActive = button.dataset.target === targetId;
      button.classList.toggle('on', isActive);
    });
  };

  const initFilterNavigation = () => {
    if (!filterButtons.length || !sections.length) return;

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const selector = button.dataset.target;
        const target = document.querySelector(selector);

        if (!target) return;

        scrollToTarget(target);
        setActiveButton(selector);
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setActiveButton(`#${entry.target.id}`);
        });
      },
      {
        rootMargin: '-40% 0px -45% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    if (openCompareButton) {
      openCompareButton.addEventListener('click', () => {
        const evSection = document.querySelector('#ev');
        scrollToTarget(evSection);
      });
    }
  };

  const updateCompareButton = (button, vehicleName) => {
    const label = button.querySelector('span');
    const isSelected = comparedVehicles.includes(vehicleName);
    const isFull = comparedVehicles.length >= MAX_COMPARE && !isSelected;

    button.disabled = isSelected || isFull;
    button.classList.toggle('is-selected', isSelected);
    button.classList.toggle('is-full', isFull);

    if (label) {
      label.textContent = isSelected
        ? 'Added to tray'
        : isFull
          ? 'Compare tray full'
          : 'Add To Compare';
    }

    button.setAttribute(
      'aria-label',
      isSelected
        ? `${vehicleName} already added`
        : isFull
          ? `Compare tray full. Remove a vehicle before adding ${vehicleName}`
          : `Add ${vehicleName} to compare`
    );
  };

  const syncCompareButtons = () => {
    vehicleCards.forEach((card) => {
      const vehicleName = getVehicleName(card);
      const button = card.querySelector('.btn_compare');

      if (!vehicleName || !button) return;
      updateCompareButton(button, vehicleName);
    });
  };

  const renderCompareTray = () => {
    if (!compareTray || !compareList) return;

    compareList.replaceChildren();
    compareTray.classList.toggle('is-empty', comparedVehicles.length === 0);

    if (compareHint) {
      compareHint.textContent =
        comparedVehicles.length >= MAX_COMPARE
          ? 'Compare tray is full. Remove one to change your selection.'
          : `Add up to ${MAX_COMPARE} vehicles to compare.`;
    }

    const fragment = document.createDocumentFragment();

    comparedVehicles.forEach((vehicleName) => {
      const item = document.createElement('li');
      const name = document.createElement('span');
      const removeButton = document.createElement('button');

      name.textContent = vehicleName;

      removeButton.type = 'button';
      removeButton.className = 'btn_remove_compare';
      removeButton.dataset.vehicleName = vehicleName;
      removeButton.setAttribute('aria-label', `Remove ${vehicleName} from compare`);
      removeButton.textContent = '';

      item.append(name, removeButton);
      fragment.appendChild(item);
    });

    compareList.appendChild(fragment);
    syncCompareButtons();
  };

  const addVehicleToCompare = (vehicleName) => {
    if (!vehicleName || comparedVehicles.includes(vehicleName)) return;
    if (comparedVehicles.length >= MAX_COMPARE) return;

    comparedVehicles.push(vehicleName);
    renderCompareTray();
  };

  const removeVehicleFromCompare = (vehicleName) => {
    const nextVehicles = comparedVehicles.filter((name) => name !== vehicleName);

    if (nextVehicles.length === comparedVehicles.length) return;

    comparedVehicles.length = 0;
    comparedVehicles.push(...nextVehicles);
    renderCompareTray();
  };

  const initCompareTray = () => {
    if (!compareTray || !compareList || !vehicleCards.length) return;

    vehicleCards.forEach((card) => {
      const vehicleName = getVehicleName(card);

      if (!vehicleName || card.querySelector('.btn_compare')) return;

      const compareButton = document.createElement('button');
      const label = document.createElement('span');

      compareButton.type = 'button';
      compareButton.className = 'btn_compare';
      compareButton.dataset.vehicleName = vehicleName;

      label.textContent = 'Add To Compare';
      compareButton.appendChild(label);

      compareButton.addEventListener('click', () => {
        addVehicleToCompare(vehicleName);
      });

      card.appendChild(compareButton);
    });

    compareList.addEventListener('click', (event) => {
      const removeButton = event.target.closest('.btn_remove_compare');

      if (!removeButton) return;
      removeVehicleFromCompare(removeButton.dataset.vehicleName ?? '');
    });

    renderCompareTray();
  };

  initFilterNavigation();
  initCompareTray();
})();
