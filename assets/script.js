document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.hamburger');
  const panel = document.querySelector('.nav-panel');

  if (button && panel) {
    const setOpen = (open) => {
      panel.classList.toggle('open', open);
      button.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('nav-open', open);
    };

    button.addEventListener('click', () => {
      setOpen(button.getAttribute('aria-expanded') !== 'true');
    });

    panel.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setOpen(false));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        button.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 800) setOpen(false);
    });
  }

  const filterButtons = [...document.querySelectorAll('[data-publication-filter]')];
  const publicationItems = [...document.querySelectorAll('#publications .pub-list > li[data-topics]')];
  const publicationLists = [...document.querySelectorAll('#publications .pub-list')];
  const filterStatus = document.querySelector('#publication-filter-status');

  if (filterButtons.length && publicationItems.length) {
    const applyFilter = (filter) => {
      let visibleCount = 0;

      publicationItems.forEach((item) => {
        const topics = item.dataset.topics.split(' ');
        const visible = filter === 'all' || topics.includes(filter);
        item.hidden = !visible;
        if (visible) visibleCount += 1;
      });

      publicationLists.forEach((list) => {
        const hasVisibleItems = [...list.children].some((item) => !item.hidden);
        list.hidden = !hasVisibleItems;

        const year = list.previousElementSibling;
        if (year?.classList.contains('pub-year')) {
          year.hidden = !hasVisibleItems;
        }
      });

      filterButtons.forEach((filterButton) => {
        const active = filterButton.dataset.publicationFilter === filter;
        filterButton.classList.toggle('active', active);
        filterButton.setAttribute('aria-pressed', String(active));
      });

      if (filterStatus) {
        filterStatus.textContent = `${visibleCount} publications shown`;
      }
    };

    filterButtons.forEach((filterButton) => {
      filterButton.addEventListener('click', () => {
        const filter = filterButton.dataset.publicationFilter;
        const url = new URL(window.location.href);

        if (filter === 'all') url.searchParams.delete('topic');
        else url.searchParams.set('topic', filter);

        window.history.replaceState({}, '', url);
        applyFilter(filter);
      });
    });

    const requestedFilter = new URLSearchParams(window.location.search).get('topic');
    const availableFilters = filterButtons.map((filterButton) => filterButton.dataset.publicationFilter);
    applyFilter(availableFilters.includes(requestedFilter) ? requestedFilter : 'all');
  }
});
