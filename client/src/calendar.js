const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar = (function () {
  // DOM
  const wrapperEle = document.createElement('div');
  const calendarEle = document.createElement('div');
  const calendarNavEle = document.createElement('div');
  // Dates
  let currentView = 'month';
  let currentDate = dates.getTodaysDateObj();
  const todaysDate = dates.getTodaysDateObj();

  function renderMonthView() {
    const containerEle = document.createElement('div');
    containerEle.className = 'calendar-grid month-view';

    const firstDayOfMonth = dates.startOfMonth(currentDate);
    const lastDayOfMonth = dates.endOfMonth(currentDate);
    const startWeekFirstDay = dates.startOfWeek(firstDayOfMonth, {
      weekStartsOn: 0,
    });
    const endWeekLastDay = dates.endOfWeek(lastDayOfMonth, {
      weekStartsOn: 0,
    });
    const daysToRender = dates.eachDayOfInterval({
      start: startWeekFirstDay,
      end: endWeekLastDay,
    });

    // day header row
    const dayHeaderRowEle = document.createElement('div');
    containerEle.appendChild(dayHeaderRowEle);
    DAY_NAMES.forEach(dayName => {
      const nameCellEle = document.createElement('div');
      nameCellEle.textContent = dayName;
      dayHeaderRowEle.appendChild(nameCellEle);
    });

    let weekWrapEle;
    daysToRender.forEach(day => {
      if (index % 7 === 0) {
        weekWrapEle = document.createElement('div');
        containerEle.appendChild(weekWrapEle);
      }

      const dayCellEle = document.createElement('div');
      weekWrapEle.appendChild(dayCellEle);

      // TODO: add the 'day number' to the cell

      // TODO: check if day is in same month (get isSameMonth from datefns)
      if (dates.isSameMonth(day, currentDate)) {
        dayCellEle.classList.add('TODO');
      }

      // TODO: add events to day
    });

    calendarEle.appendChild(containerEle);
  }
  function renderWeekView() {
    const containerEle = document.createElement('div');
    containerEle.className = 'calendar-grid week-view';

    const firstDayOfWeek = dates.startOfWeek(currentDate);
    const lastDayOfWeek = dates.endOfWeek(currentDate);
    const daysToRender = eachDayOfInterval({
      start: firstDayOfWeek,
      end: lastDayOfWeek,
    });

    // day header row
    const dayHeaderRowEle = document.createElement('div');
    containerEle.appendChild(dayHeaderRowEle);
    DAY_NAMES.forEach(dayName => {
      const nameCellEle = document.createElement('div');
      nameCellEle.textContent = dayName;
      dayHeaderRowEle.appendChild(nameCellEle);
    });

    const weekWrapEle = document.createElement('div');
    daysToRender.forEach(day => {
      const dayCellEle = document.createElement('div');
      weekWrapEle.appendChild(dayCellEle);

      // TODO: check if day is in same month (get isSameMonth from datefns)
      if (dates.isSameMonth(day, currentDate)) {
        dayCellEle.classList.add('TODO');
      }

      // TODO: add events to day
    });

    calendarEle.appendChild(containerEle);
  }
  function renderDayView() {
    const containerEle = document.createElement('div');
    containerEle.className = 'calendar-grid day-view';

    // TODO: add events to day

    calendarEle.appendChild(containerEle);
  }

  function renderCalendar() {
    if (currentView === 'month') {
      renderMonthView();
    }
    if (currentView === 'week') {
      renderWeekView();
    }
    if (currentView === 'day') {
      renderDayView();
    }
  }

  function handleViewChange(newView) {
    if (newView === currentView) return;

    calendarEle.innerHTML = '';
    currentView = newView;

    renderCalendar();
  }
  function handleNavigation(navEvent) {
    if (navEvent === 'prev') {
      if (currentView === 'month') {
        currentDate = dates.subMonths(currentDate, 1);
      }
      if (currentView === 'week') {
        currentDate = dates.subWeeks(currentDate, 1);
      }
      if (currentView === 'day') {
        currentDate = dates.subDays(currentDate, 1);
      }
    }
    if (navEvent === 'next') {
      if (currentView === 'month') {
        currentDate = dates.addMonths(currentDate, 1);
      }
      if (currentView === 'week') {
        currentDate = dates.addWeeks(currentDate, 1);
      }
      if (currentView === 'day') {
        currentDate = dates.addDays(currentDate, 1);
      }
    }
    if (navEvent === 'today') {
      currentDate = todaysDate;
    }

    renderCalendar();
  }

  function build() {
    calendarNavEle.innerHTML = `
      <div class="viewToggle">
        <button data-view="month">Month</button>
        <button data-view="week">Week</button>
        <button data-view="day">Day</button>
      </div>
      <div class="">
        <button data-nav="prev">&lt; Prev</button>
        <button data-nav="today">Today</button>
        <button data-nav="next">Next &gt;</button>
      </div>
    `;

    calendarNavEle.addEventListener('click', e => {
      if (e.target.dataset.view) {
        handleViewChange(e.target.dataset.view);
      }

      if (e.target.dataset.nav) {
        handleNavigation(e.target.dataset.nav);
      }
    });

    wrapperEle.appendChild(calendarNavEle);
    wrapperEle.appendChild(calendarEle);
  }

  function init() {
    build();
  }

  return {
    init,
  };
})();
