const UTIL = (function () {
  function leadingZero(number) {
    var num = String(number);
    if (num.length > 1) return num;
    return `0${num}`;
  }

  function toInteger(dirtyNumber) {
    if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
      return NaN;
    }

    var number = Number(dirtyNumber);

    if (isNaN(number)) {
      return number;
    }

    return number < 0 ? Math.ceil(number) : Math.floor(number);
  }

  return {
    leadingZero,
    toInteger,
  };
})();

const dates = (function () {
  const MILLISECONDS_IN_HOUR = 3600000;
  const MILLISECONDS_IN_DAY = 86400000;
  const MILLISECONDS_IN_WEEK = 604800000;

  // PRIVATE
  //------------------------------------
  function toDate(argument) {
    const argStr = Object.prototype.toString.call(argument);

    // Clone the date
    if (
      argument instanceof Date ||
      (typeof argument === 'object' && argStr === '[object Date]')
    ) {
      return new argument.constructor(argument.getTime());
    } else if (typeof argument === 'number' || argStr === '[object Number]') {
      return new Date(argument);
    } else {
      return new Date(NaN);
    }
  }
  function toInteger(dirtyNumber) {
    if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
      return NaN;
    }

    var number = Number(dirtyNumber);

    if (isNaN(number)) {
      return number;
    }

    return number < 0 ? Math.ceil(number) : Math.floor(number);
  }
  function cloneDate(argument) {
    const argStr = Object.prototype.toString.call(argument);

    if (
      argument instanceof Date ||
      (typeof argument === 'object' && argStr === '[object Date]')
    ) {
      return new argument.constructor(argument.getTime());
    } else if (typeof argument === 'number' || argStr === '[object Number]') {
      return new Date(argument);
    } else {
      return new Date(NaN);
    }
  }
  function getTimezoneOffsetInMilliseconds(date) {
    const utcDate = new Date(
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds(),
      ),
    );
    utcDate.setUTCFullYear(date.getFullYear());
    return date.getTime() - utcDate.getTime();
  }

  function isValid(dirtyDate) {
    var date = cloneDate(dirtyDate);
    return !isNaN(date);
  }

  function leadingZero(number) {
    var num = String(number);
    if (num.length > 1) return num;
    return `0${num}`;
  }

  // PUBLIC
  //------------------------------------
  // GET
  function getTodaysDateObj() {
    const todaysDate = new Date();
    todaysDate.setHours(0, 0, 0, 0);
    return todaysDate;
  }
  function getTodaysDateISOString() {
    const todaysDate = new Date();
    todaysDate.setHours(0, 0, 0, 0);
    const dd = todaysDate.getDate();
    const mm = todaysDate.getMonth() + 1;
    const yyyy = todaysDate.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  }
  function getDaysInMonth(dirtyDate) {
    var date = cloneDate(dirtyDate);
    var year = date.getFullYear();
    var monthIndex = date.getMonth();
    var lastDayOfMonth = new Date(0);
    lastDayOfMonth.setFullYear(year, monthIndex + 1, 0);
    lastDayOfMonth.setHours(0, 0, 0, 0);
    return lastDayOfMonth.getDate();
  }
  // ADD
  function addHours(date, amount) {
    const newDateValue = +toDate(date) + amount * MILLISECONDS_IN_HOUR; // Add hours converted to milliseconds
    return new Date(newDateValue);
  }
  function addDays(dirtyDate, dirtyAmount) {
    var date = cloneDate(dirtyDate);
    var amount = toInteger(dirtyAmount);
    date.setDate(date.getDate() + amount);
    return date;
  }
  function addWeeks(date, amount) {
    const days = amount * 7;
    return addDays(date, days);
  }
  function addMonths(dirtyDate, dirtyAmount) {
    var date = cloneDate(dirtyDate);
    var amount = toInteger(dirtyAmount);
    var desiredMonth = date.getMonth() + amount;
    var dateWithDesiredMonth = new Date(0);
    dateWithDesiredMonth.setFullYear(date.getFullYear(), desiredMonth, 1);
    dateWithDesiredMonth.setHours(0, 0, 0, 0);
    var daysInMonth = getDaysInMonth(dateWithDesiredMonth);
    // Set the last day of the new month
    // if the original date was the last day of the longer month
    date.setMonth(desiredMonth, Math.min(daysInMonth, date.getDate()));
    return date;
  }
  function addYears(dirtyDate, dirtyAmount) {
    var amount = toInteger(dirtyAmount);
    return addMonths(dirtyDate, amount * 12);
  }
  // SUB
  function subHours(date, amount) {
    return addHours(date, -amount);
  }
  function subDays(dirtyDate, dirtyAmount) {
    var amount = toInteger(dirtyAmount);
    return addDays(dirtyDate, -amount);
  }
  function subWeeks(date, amount) {
    return addWeeks(date, -amount);
  }
  function subMonths(date, amount) {
    return addMonths(date, -amount);
  }
  function subYears(dirtyDate, dirtyAmount) {
    var amount = toInteger(dirtyAmount);
    return addYears(dirtyDate, -amount);
  }
  // END/START
  function endOfWeek(dirtyDate, dirtyOptions) {
    if (arguments.length < 1) {
      throw new TypeError(`1 argument required, but only ${arguments.length} present`);
    }

    let options = dirtyOptions || {};

    const weekStartsOn =
      options.weekStartsOn === null || options.weekStartsOn === undefined ?
        0
      : UTIL.toInteger(options.weekStartsOn);

    if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
      throw new RangeError(`weekStartsOn must be between 0 and 6 inclusively`);
    }

    const date = cloneDate(dirtyDate);
    const day = date.getDay();
    const diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);

    date.setDate(date.getDate() + diff);
    date.setHours(23, 59, 59, 999);
    return date;
  }
  function startDayOfWeek(dirtyDate, dirtyOptions) {
    if (arguments.length < 1) {
      throw new TypeError(`1 argument required, but only ${arguments.length} present`);
    }

    let options = dirtyOptions || {};

    const weekStartsOn =
      options.weekStartsOn === null || options.weekStartsOn === undefined ?
        0
      : util.toInteger(options.weekStartsOn);

    if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
      throw new RangeError(`weekStartsOn must be between 0 and 6 inclusively`);
    }

    const date = cloneDate(dirtyDate);
    const day = date.getDay();
    const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
    date.setDate(date.getDate() - diff);
    date.setHours(0, 0, 0, 0);
    return date;
  }
  function startOfDay(dirtyDate) {
    const date = toDate(dirtyDate);
    date.setHours(0, 0, 0, 0);
    return date;
  }
  function endOfMonth(date) {
    const _date = toDate(date);
    const month = _date.getMonth();
    _date.setFullYear(_date.getFullYear(), month + 1, 0);
    _date.setHours(23, 59, 59, 999);
    return _date;
  }
  function startOfMonth(date) {
    const _date = toDate(date);
    _date.setDate(1);
    _date.setHours(0, 0, 0, 0);
    return _date;
  }
  function startOfWeek(dirtyDate) {
    const weekStartsOn = 0;

    const date = toDate(dirtyDate);
    const day = date.getDay();
    const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;

    date.setDate(date.getDate() - diff);
    date.setHours(0, 0, 0, 0);
    return date;
  }
  // DIFFERENCE
  function differenceInDays(dirtyDateLeft, dirtyDateRight) {
    const startOfDayLeft = startOfDay(dirtyDateLeft);
    const startOfDayRight = startOfDay(dirtyDateRight);

    const timestampLeftTime = startOfDayLeft.getTime();
    const timestampRightTime = startOfDayRight.getTime();

    const timestampLeft = timestampLeftTime - startOfDayLeft;
    const timestampRight = timestampRightTime - startOfDayRight;

    return Math.round((timestampLeftTime - timestampRightTime) / MILLISECONDS_IN_DAY);
  }
  function differenceInWeeks(dirtyDateLeft, dirtyDateRight) {
    const startOfWeekLeft = startOfWeek(dirtyDateLeft, {});
    const startOfWeekRight = startOfWeek(dirtyDateRight, {});

    const timestampLeftTime = startOfWeekLeft.getTime();
    const timestampRightTime = startOfWeekRight.getTime();

    const timestampLeft = timestampLeftTime - startOfWeekLeft;
    const timestampRight = timestampRightTime - startOfWeekRight;

    return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_WEEK);
  }
  function differenceInMonths(dirtyDateLeft, dirtyDateRight) {
    const dateLeft = toDate(dirtyDateLeft);
    const dateRight = toDate(dirtyDateRight);

    const yearDiff = dateLeft.getFullYear() - dateRight.getFullYear();
    const monthDiff = dateLeft.getMonth() - dateRight.getMonth();

    return yearDiff * 12 + monthDiff;
  }
  function differenceInYears(dirtyDateLeft, dirtyDateRight) {
    const dateLeft = toDate(dirtyDateLeft);
    const dateRight = toDate(dirtyDateRight);

    return dateLeft.getFullYear() - dateRight.getFullYear();
  }
  // COMPARE
  function isAfter(dirtyDate, dirtyDateToCompare) {
    if (arguments.length < 2) {
      throw new TypeError(
        '2 arguments required, but only ' + arguments.length + ' present',
      );
    }

    var date = cloneDate(dirtyDate);
    var dateToCompare = cloneDate(dirtyDateToCompare);
    return date.getTime() > dateToCompare.getTime();
  }
  function isBefore(dirtyDate, dirtyDateToCompare) {
    if (arguments.length < 2) {
      throw new TypeError(
        '2 arguments required, but only ' + arguments.length + ' present',
      );
    }

    var date = cloneDate(dirtyDate);
    var dateToCompare = cloneDate(dirtyDateToCompare);
    return date.getTime() < dateToCompare.getTime();
  }
  function isEqual(dirtyLeftDate, dirtyRightDate) {
    if (arguments.length < 2) {
      throw new TypeError(
        '2 arguments required, but only ' + arguments.length + ' present',
      );
    }

    var dateLeft = cloneDate(dirtyLeftDate);
    var dateRight = cloneDate(dirtyRightDate);
    return dateLeft.getTime() === dateRight.getTime();
  }
  function isDateInCurrentWeek(dirtyDate) {
    const date = cloneDate(dirtyDate);
    date.setHours(0, 0, 0, 0);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const curentWeekStart = startDayOfWeek(currentDate);
    const curentWeekEnd = endOfWeek(currentDate);

    if (isAfter(date, curentWeekStart) && isBefore(date, curentWeekEnd)) {
      return true;
    }

    return false;
  }
  function isDateInFuture(dirtyDate) {
    const date = cloneDate(dirtyDate);
    date.setHours(0, 0, 0, 0);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (isAfter(date, currentDate)) {
      return true;
    }

    return false;
  }
  // FORMAT
  function checkFormat(dateString) {
    // Regex pattern for ISO date format (YYYY-MM-DD)
    const isoFormatPattern = /^\d{4}-\d{2}-\d{2}$/;
    // Adjusted Regex pattern for Standard format (M/D/YYYY or MM/DD/YYYY)
    const standardFormatPattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/;

    if (isoFormatPattern.test(dateString)) {
      return 'iso';
    } else if (standardFormatPattern.test(dateString)) {
      return 'standard';
    } else {
      return '';
    }
  }
  function formatISO(dirtyDate, dirtyOptions) {
    if (arguments.length < 1) {
      throw new TypeError(`1 argument required, but only ${arguments.length} present`);
    }

    const originalDate = cloneDate(dirtyDate);

    if (!isValid(originalDate)) {
      throw new RangeError('Invalid time value');
    }

    const options = dirtyOptions || {};
    const format = options.format == null ? 'extended' : String(options.format);
    const representation =
      options.representation == null ? 'complete' : String(options.representation);

    if (format !== 'extended' && format !== 'basic') {
      throw new RangeError("format must be 'extended' or 'basic'");
    }

    if (
      representation !== 'date' &&
      representation !== 'time' &&
      representation !== 'complete'
    ) {
      throw new RangeError("representation must be 'date', 'time', or 'complete'");
    }

    let result = '';
    let tzOffset = '';

    const dateDelimiter = format === 'extended' ? '-' : '';
    const timeDelimiter = format === 'extended' ? ':' : '';

    // Representation is either 'date' or 'complete'
    if (representation !== 'time') {
      const day = UTIL.leadingZero(originalDate.getDate(), 2);
      const month = UTIL.leadingZero(originalDate.getMonth() + 1, 2);
      const year = UTIL.leadingZero(originalDate.getFullYear(), 4);

      // yyyyMMdd or yyyy-MM-dd.
      result = `${year}${dateDelimiter}${month}${dateDelimiter}${day}`;
    }

    // Representation is either 'time' or 'complete'
    if (representation !== 'date') {
      // Add the timezone.
      const offset = originalDate.getTimezoneOffset();

      if (offset !== 0) {
        const absoluteOffset = Math.abs(offset);
        const hourOffset = UTIL.leadingZero(Math.floor(absoluteOffset / 60), 2);
        const minuteOffset = UTIL.leadingZero(absoluteOffset % 60, 2);
        // If less than 0, the sign is +, because it is ahead of time.
        const sign = offset < 0 ? '+' : '-';

        tzOffset = `${sign}${hourOffset}:${minuteOffset}`;
      } else {
        tzOffset = 'Z';
      }

      const hour = UTIL.leadingZero(originalDate.getHours(), 2);
      const minute = UTIL.leadingZero(originalDate.getMinutes(), 2);
      const second = UTIL.leadingZero(originalDate.getSeconds(), 2);

      // If there's also date, separate it with time with 'T'
      const separator = result === '' ? '' : 'T';

      // Creates a time string consisting of hour, minute, and second, separated by delimiters, if defined.
      const time = [hour, minute, second].join(timeDelimiter);

      // HHmmss or HH:mm:ss.
      result = `${result}${separator}${time}${tzOffset}`;
    }

    return result;
  }
  function formateToISO(dirtyDate) {
    if (!dirtyDate) return;

    let splitBy;

    if (dirtyDate.indexOf('/') !== -1) {
      splitBy = '/';
    } else if (dirtyDate.indexOf('-') !== -1) {
      splitBy = '-';
    } else {
      return 'Invalid Date String';
    }

    const date = dirtyDate.split(splitBy);

    if (date[0].length === 4) {
      return dirtyDate;
    }

    const YYYY = date[2];
    const MM = leadingZero(date[0]);
    const DD = leadingZero(date[1]);

    return `${YYYY}-${MM}-${DD}`;
  }
  function formateToStandard(dirtyDate, joinBy, opts) {
    var shorten = opts ? opts.shortenYear : false;
    var date = dirtyDate.split('-');
    var MM = leadingZero(date[1]);
    var DD = leadingZero(date[2]);
    var YYYY = shorten ? date[0].substring(0, 2) : date[0];

    if (joinBy) {
      return `${MM}${joinBy}${DD}${joinBy}${YYYY}`;
    }

    return `${MM}/${DD}/${YYYY}`;
  }
  // INTERVALS
  function eachDayOfInterval(interval, options) {
    const startDate = toDate(interval.start);
    const endDate = toDate(interval.end);

    const endTime = endDate.getTime();

    // Throw an exception if start date is after end date or if any date is `Invalid Date`
    if (!(startDate.getTime() <= endTime)) {
      throw new RangeError('Invalid interval');
    }

    const dates = [];

    const currentDate = startDate;
    currentDate.setHours(0, 0, 0, 0);

    const step = options?.step ?? 1;
    if (step < 1 || isNaN(step))
      throw new RangeError('`options.step` must be a number greater than 1');

    while (currentDate.getTime() <= endTime) {
      dates.push(toDate(currentDate));
      currentDate.setDate(currentDate.getDate() + step);
      currentDate.setHours(0, 0, 0, 0);
    }

    return dates;
  }

  return {
    getTodaysDateObj,
    getTodaysDateISOString,
    getDaysInMonth,
    addHours,
    addDays,
    addWeeks,
    addMonths,
    addYears,
    subHours,
    subDays,
    subWeeks,
    subMonths,
    subYears,
    endOfWeek,
    startDayOfWeek,
    endOfMonth,
    startOfMonth,
    startOfWeek,
    isAfter,
    isBefore,
    isEqual,
    isDateInCurrentWeek,
    isDateInFuture,
    checkFormat,
    formatISO,
    formateToISO,
    formateToStandard,
    eachDayOfInterval,
    differenceInDays,
    differenceInWeeks,
    differenceInMonths,
    differenceInYears,
  };
})();

// Copy Paste Below into Calendar.js in Anywhere
function getMonthName(date) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const monthIndex = date.getMonth();
  return monthNames[monthIndex];
}

const schedulingAjax = (function () {
  async function getSchedulesForSchedulingModuleAjax(locationId, personId) {
    try {
      const result = await $.ajax({
        type: 'POST',
        url:
          $.webServer.protocol +
          '://' +
          $.webServer.address +
          ':' +
          $.webServer.port +
          '/' +
          $.webServer.serviceName +
          '/getSchedulesForSchedulingModule/',
        data: JSON.stringify({
          token: $.session.Token,
          locationId: locationId,
          personId: personId,
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
      });
      return result.getSchedulesForSchedulingModuleResults;
    } catch (error) {
      throw new Error(error.responseText);
    }
  }
  async function getScheduleApptInformationAjax(locationId) {
    try {
      const result = await $.ajax({
        type: 'POST',
        url:
          $.webServer.protocol +
          '://' +
          $.webServer.address +
          ':' +
          $.webServer.port +
          '/' +
          $.webServer.serviceName +
          '/getScheduleApptInformation/',
        data: JSON.stringify({
          token: $.session.Token,
          locationId: locationId,
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
      });
      return result.getScheduleApptInformationResults;
    } catch (error) {
      throw new Error(error.responseText);
    }
  }
  async function getLocationDropdownForSchedulingAjax(locationId) {
    try {
      const result = await $.ajax({
        type: 'POST',
        url:
          $.webServer.protocol +
          '://' +
          $.webServer.address +
          ':' +
          $.webServer.port +
          '/' +
          $.webServer.serviceName +
          '/getLocationDropdownForScheduling/',
        data: JSON.stringify({
          token: $.session.Token,
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
      });
      return result.getLocationDropdownForSchedulingResults;
    } catch (error) {
      throw new Error(error.responseText);
    }
  }

  return {
    getSchedulesForSchedulingModuleAjax,
    getScheduleApptInformationAjax,
    getLocationDropdownForSchedulingAjax,
  };
})();

const SchedulingShiftDetails = (function () {
  function renderDetailsPopup(details, type) {
    details = details[0];
    var actioncenter = document.getElementById('actioncenter');
    var shiftDetails = document.querySelector('.shiftDetails');
    var openShiftDetails = document.querySelector('.openShiftDetails');
    var pendingOpenShiftDetails = document.querySelector('.pendingOpenShiftDetails');
    var pendingCallOffDetails = document.querySelector('.pendingCallOffDetails');
    var appointmentDetails = document.querySelector('.appointmentDetails');

    if (shiftDetails) {
      var shiftId = shiftDetails.getAttribute('shiftId');
      if (shiftId !== details.shiftId) {
        actioncenter.removeChild(shiftDetails);
      } else {
        return;
      }
    }
    if (openShiftDetails) {
      var shiftId = openShiftDetails.getAttribute('shiftId');
      if (shiftId !== details.shiftId) {
        actioncenter.removeChild(openShiftDetails);
      } else {
        return;
      }
    }
    if (pendingOpenShiftDetails) {
      var shiftId = pendingOpenShiftDetails.getAttribute('shiftId');
      if (shiftId !== details.shiftId) {
        actioncenter.removeChild(pendingOpenShiftDetails);
      } else {
        return;
      }
    }
    if (pendingCallOffDetails) {
      var shiftId = pendingCallOffDetails.getAttribute('shiftId');
      if (shiftId !== details.shiftId) {
        actioncenter.removeChild(pendingCallOffDetails);
      } else {
        return;
      }
    }
    if (appointmentDetails) {
      var appointmentId = appointmentDetails.getAttribute('appointmentId');
      if (appointmentId !== details.medTrackingId) {
        actioncenter.removeChild(appointmentDetails);
      } else {
        return;
      }
    }
    detailsLocationId = details.locationId;
    switch (type) {
      case 'shift':
        renderShiftDetails(details);
        break;
      case 'openShift':
        renderOpenShiftDetails(details);
        break;
      case 'requestOff':
        renderPendingOpenShiftDetails(details);
        break;
      case 'callOff':
        renderPendingCallOffDetails(details);
        break;
      case 'appointment':
        renderAppointmentDetails(details);
        break;
      default:
        break;
    }
  }

  // Shift Details / Appointment Details
  //---------------------------------------------------
  function renderAppointmentDetails(details) {
    var actioncenter = document.getElementById('actioncenter');

    var date = details.dateScheduled.split(' ')[0];
    var time =
      details.timeScheduled !== '' ?
        convertFromMilitary(details.timeScheduled)
      : convertFromMilitary(details.dateScheduled.split(' ')[1]);
    var notes = details.notes;
    var consumer = details.consumerName;
    var provider = details.provider;
    var type = details.typeDescription;
    var reason = details.reason;

    var popup = POPUP.build({
      classNames: 'appointmentDetails',
      attributes: [{ key: 'appointmentId', value: details.medTrackingId }],
    });

    wrap = document.createElement('div');
    wrap.innerHTML = `
          <div class="detailsHeading">
            <h2>Appointment Details</h2>
            <p class="smallDetail font-mediumEmphasis">${date}</p>
          </div>
          
          <div class="detailsBody">
            <div class="time popupDetailsLine">
              <h4 class="label">Time:</h4>
              <p>${time}</p>
            </div>
            <hr>
            <div class="employee popupDetailsLine">
              <h4 class="label">Consumer:</h4>
              <p>${consumer}</p>
            </div>
            <hr>
            <div class="popupDetailsLine">
              <h4 class="label">Provider:</h4>
              <p>${provider}</p>
            </div>
            <hr>
            <div class="type popupDetailsLine">
              <h4 class="label">Type:</h4>
              <p>${type}</p>
            </div>
            <hr>
            <div class="reason popupDetailsLine">
              <h4 class="label">Reason:</h4>
              <p>${reason}</p>
            </div>
            <hr>
            <div class="shiftNotes popupDetailsLine">
              <h4 class="label">Notes:</h4>
              <p>${notes}</p>
            </div>
          </div>
      `;
    popup.appendChild(wrap);
    POPUP.show(popup);
  }
  // UPDATED FOR RESPONSIVE POPUP
  function renderShiftDetails(details) {
    var actioncenter = document.getElementById('actioncenter');

    var shiftDate = details.serviceDate.split(' ')[0];
    var startTime = details.startTime;
    var endTime = details.endTime;
    var consumers = details.consumerNames;
    var location = details.locationName;
    var shiftNotes = details.shiftNotes;
    var shiftType = details.shiftType;
    var workCode = `${details.workCode} - ${details.workCodeDescription}`;
    shiftDateForCall = shiftDate;
    shiftType =
      shiftType === 'A' ? 'Awake'
      : shiftType === 'N' ? 'Night'
      : shiftType === 'D' ? 'Day'
      : shiftType === 'S' ? 'Sleep'
      : '';
    startTime = convertFromMilitary(startTime);
    endTime = convertFromMilitary(endTime);

    var popup = POPUP.build({
      classNames: 'shiftDetails',
      attributes: [{ key: 'shiftId', value: details.shiftId }],
    });
    wrap = document.createElement('div');
    wrap.innerHTML = `
          <div class="detailsHeading">
            <h2>Shift Details</h2>
            <p class="smallDetail font-mediumEmphasis">${shiftDate}</p>
          </div>
          <div class="detailsBody">
            <div class="location popupDetailsLine">
              <h4 class="label">Location:  </h4>
              <p>${location}</p>
            </div>
            <hr>
            <div class="time popupDetailsLine">
              <h4 class="label">Time:  </h4>
              <p>${startTime} - ${endTime}</p>
            </div>
            <hr>
            <div class="employee popupDetailsLine">
              <h4 class="label">Consumers:  </h4>
              <p>${consumers}</p>
            </div>
            <hr>
            <div class="workCode popupDetailsLine">
              <h4 class="label">Work Code:  </h4>
              <p>${workCode}</p>
            </div>
            <hr>
            <div class="shiftType popupDetailsLine">
              <h4 class="label">Shift Type:  </h4>
              <p>${shiftType}</p>
            </div>
            <hr>
            <div class="shiftNotes popupDetailsLine">
              <h4 class="label">Notes:  </h4>
              <p>${shiftNotes}</p>
            </div>
          </div>
          `;
    popup.appendChild(wrap);
    //New Call off btn using button.build
    let callOffBtn = button.build({
      text: 'Call Off',
      style: 'secondary',
      type: 'contained',
      callback: function () {
        POPUP.hide(popup);
        renderRequestOffPopup(details.shiftId);
      },
    });

    let btnWrap = document.createElement('div');
    btnWrap.classList.add('popupBtnWrap');
    btnWrap.appendChild(callOffBtn);

    if (
      _scheduleView === 'mine' &&
      (_currentView === 'week' || _currentView === 'day') &&
      $.session.schedAllowCallOffRequests === 'Y' &&
      $.session.schedulingUpdate
    ) {
      popup.appendChild(btnWrap);
    }
    POPUP.show(popup);
  }

  // UPDATED FOR RESPONSIVE POPUP
  // Open Shift Details
  //---------------------------------------------------
  function renderOpenShiftDetails(details) {
    var actioncenter = document.getElementById('actioncenter');

    var shiftDate = details.serviceDate.split(' ')[0];
    var startTime = details.startTime;
    var endTime = details.endTime;
    var consumers = details.consumerNames;
    var location = details.locationName;
    var shiftNotes = details.shiftNotes;
    var shiftType = details.shiftType;
    var workCode = `${details.workCode} - ${details.workCodeDescription}`;
    shiftDateForCall = shiftDate;
    shiftType =
      shiftType === 'A' ? 'Awake'
      : shiftType === 'N' ? 'Night'
      : shiftType === 'D' ? 'Day'
      : '';
    startTime = convertFromMilitary(startTime);
    endTime = convertFromMilitary(endTime);

    var popup = POPUP.build({
      classNames: 'openShiftDetails',
      attributes: [{ key: 'shiftId', value: details.shiftId }],
    });
    wrap = document.createElement('div');
    wrap.innerHTML = `
          <div class="detailsHeading">
            <h2>Shift Details</h2>
            <p class="smallDetail font-mediumEmphasis">${shiftDate}</p>
          </div>
          <hr>
          <div class="detailsBody">
            <div class="location popupDetailsLine">
              <h4 class="label">Location:</h4>
              <p>${location}</p>
            </div>
            <hr>
            <div class="time popupDetailsLine">
              <h4 class="label">Time:</h4>
              <p>${startTime} - ${endTime}</p>
            </div>
            <hr>
            <div class="employee popupDetailsLine">
              <h4 class="label">Consumers:</h4>
              <p>${consumers}</p>
            </div>
            <hr>
            <div class="workCode popupDetailsLine">
              <h4 class="label">Work Code:</h4>
              <p>${workCode}</p>
            </div>
            <hr>
            <div class="shiftType popupDetailsLine">
              <h4 class="label">Shift Type:</h4>
              <p>${shiftType}</p>
            </div>
            <hr>
            <div class="shiftNotes popupDetailsLine">
              <h4 class="label">Notes:</h4>
              <p>${shiftNotes}</p>
            </div>
          </div>
      `;
    popup.appendChild(wrap);
    let requestShiftBtn = button.build({
      text: 'Request Shift',
      style: 'secondary',
      type: 'contained',
      callback: async function () {
        var token = $.session.Token;
        var shiftId = details.shiftId;
        var personId = $.session.PeopleId;
        var status = 'P';
        var notifiedEmployeeId = null;
        POPUP.hide(popup);

        const { getOverlapStatusforSelectedShiftResult: overlapWithExistingShift } =
          await schedulingAjax.getOverlapStatusforSelectedShiftAjax(shiftId, personId);

        if (overlapWithExistingShift == 'NoOverLap') {
          renderSendShiftRequestPopup({
            token,
            shiftId,
            personId,
            status,
            notifiedEmployeeId,
          });
        } else {
          displayOverlapPopup(overlapWithExistingShift);
          return;
        }
      },
    });

    let btnWrap = document.createElement('div');
    btnWrap.classList.add('popupBtnWrap');

    if ($.session.schedRequestOpenShifts === 'N' || $.session.isPSI) {
    } else if (!$.session.schedulingUpdate || !$.session.schedulingView) {
    } else {
      btnWrap.appendChild(requestShiftBtn);
      popup.appendChild(btnWrap);
    }

    // ($.session.schedRequestOpenShifts === 'N' || $.session.isPSI) ? null:
    // (!$.session.schedulingUpdate || !$.session.schedulingView) ? null: popup.appendChild(btnWrap)

    POPUP.show(popup);
  }

  function displayOverlapPopup(existingShiftLocationName) {
    var overlapPopup = POPUP.build({
      classNames: 'sendRequestShiftPopup',
    });
    overlapWrap = document.createElement('div');
    overlapWrap.innerHTML = `
          <div class="detailsHeading">
            <h2>Requested Shift Overlap</h2>
            <p>This open shift overlaps with an existing shift you are scheduled to work at ${existingShiftLocationName}. You cannot request this open shift.</p>
          </div>
      `;
    overlapPopup.appendChild(overlapWrap);

    let overlapCancelBtn = button.build({
      text: 'Cancel',
      style: 'secondary',
      type: 'outlined',
      icon: 'close',
      callback: function () {
        POPUP.hide(overlapPopup);
      },
    });

    //overlapPopup.appendChild(wrap2);
    overlapPopup.appendChild(overlapCancelBtn);

    POPUP.show(overlapPopup);
  }
  // UPDATED FOR RESPONSIVE POPUP
  function renderSendShiftRequestPopup(data) {
    var actioncenter = document.getElementById('actioncenter');

    var popup = POPUP.build({
      classNames: 'sendRequestShiftPopup',
    });
    wrap = document.createElement('div');
    wrap.innerHTML = `
          <div class="detailsHeading">
            <h2>Request Open Shift</h2>
          </div>
  
          <div class="detailsBody">
            <div class="dropdown-wrap">
              <span class="requestError"></span>
            </div>
          </div>
      `;
    popup.appendChild(wrap);
    var employeeDropdown = dropdown.build({
      dropdownId: 'employeeDropdown',
      label: 'Employee To Notify',
      style: 'secondary',
    });
    let cancelBtn = button.build({
      text: 'Cancel',
      style: 'secondary',
      type: 'outlined',
      icon: 'close',
      callback: function () {
        POPUP.hide(popup);
      },
    });
    let sendRequestBtn = button.build({
      id: 'sendReqBtn',
      classNames: 'disabled',
      text: 'Send Request',
      style: 'secondary',
      type: 'contained',
      icon: 'send',
      callback: function () {
        data.notifiedEmployeeId = employeeId;
        schedulingAjax.saveOpenShiftRequestSchedulingAjax(data);
        _scheduleView = 'mine';
        _currentView = 'week';
        POPUP.hide(popup);
        init();
      },
    });

    schedulingAjax.getCallOffDropdownEmployeesAjax(
      shiftDateForCall,
      detailsLocationId,
      populateEmployeesDropdown,
    );

    POPUP.show(popup);
    popup.appendChild(employeeDropdown);

    let btnWrap = document.createElement('div');
    btnWrap.classList.add('popupBtnWrap');
    btnWrap.appendChild(sendRequestBtn);
    btnWrap.appendChild(cancelBtn);
    popup.appendChild(btnWrap);

    employeeDropdown.classList.add('error');
    employeeDropdown.addEventListener('change', function () {
      var selectedOption = event.target.options[event.target.selectedIndex];
      employeeId = selectedOption.id;
      if (employeeId === '%') {
        employeeDropdown.classList.add('error');
      } else {
        employeeDropdown.classList.remove('error');
      }
      checkRequiredFields(sendRequestBtn);
    });
  }

  // Pending Open Shift Details
  // UPDATED FOR RESPONSIVE POPUP
  //---------------------------------------------------
  function renderPendingOpenShiftDetails(details) {
    var actioncenter = document.getElementById('actioncenter');

    var shiftDate = details.serviceDate.split(' ')[0];
    var startTime = details.startTime;
    var endTime = details.endTime;
    var consumers = details.consumerNames;
    var location = details.locationName;
    var shiftNotes = details.shiftNotes;
    var shiftType = details.shiftType;
    var workCode = `${details.workCode} - ${details.workCodeDescription}`;
    shiftDateForCall = shiftDate; //need this to pass back in order to get correct dropdown employees
    shiftType =
      shiftType === 'A' ? 'Awake'
      : shiftType === 'N' ? 'Night'
      : shiftType === 'D' ? 'Day'
      : '';
    startTime = convertFromMilitary(startTime);
    endTime = convertFromMilitary(endTime);

    var popup = POPUP.build({
      classNames: 'pendingOpenShiftPopup',
      attributes: [{ key: 'shiftId', value: details.shiftId }],
    });
    wrap = document.createElement('div');
    wrap.innerHTML = `
          <div class="detailsHeading">
            <h2>Shift Details</h2>
            <p class="smallDetail font-mediumEmphasis">${shiftDate}</p>
          </div>
          
          <div class="detailsBody">
            <div class="location popupDetailsLine">
              <h4 class="label">Location:</h4>
              <p>${location}</p>
            </div>
            <hr>
            <div class="time popupDetailsLine">
              <h4 class="label">Time:</h4>
              <p>${startTime} - ${endTime}</p>
            </div>
            <hr>
            <div class="employee popupDetailsLine">
              <h4 class="label">Consumers:</h4>
              <p>${consumers}</p>
            </div>
            <hr>
            <div class="workCode popupDetailsLine">
              <h4 class="label">Work Code:</h4>
              <p>${workCode}</p>
            </div>
            <hr>
            <div class="shiftType popupDetailsLine">
              <h4 class="label">Shift Type:</h4>
              <p>${shiftType}</p>
            </div>
            <hr>
            <div class="shiftNotes popupDetailsLine">
              <h4 class="label">Notes:</h4>
              <p>${shiftNotes}</p>
            </div>
          </div>
      `;

    popup.appendChild(wrap);
    let cancelRequestBtn = button.build({
      id: 'cancelRequestBtn',
      attributes: [{ shiftId: details.shiftId }],
      text: 'Cancel Request',
      style: 'secondary',
      type: 'contained',
      callback: function () {
        var shiftId = details.shiftId;
        schedulingAjax.cancelRequestOpenShiftSchedulingAjax(shiftId);
        POPUP.hide(popup);
        _scheduleView = 'mine';
        _currentView = 'week';
        init();
      },
    });

    if (details.requestedById === $.session.PeopleId) {
      let btnWrap = document.createElement('div');
      btnWrap.classList.add('popupBtnWrap');
      btnWrap.appendChild(cancelRequestBtn);
      popup.appendChild(btnWrap);
    }
    POPUP.show(popup);
  }

  // Pending Call Off Details
  // UPDATED FOR RESPONSIVE POPUP
  //---------------------------------------------------

  // UPDATED FOR RESPONSIVE POPUP
  function renderPendingCallOffDetails(details) {
    var actioncenter = document.getElementById('actioncenter');

    var shiftDate = details.serviceDate.split(' ')[0];
    var startTime = details.startTime;
    var endTime = details.endTime;
    var consumers = details.consumerNames;
    var location = details.locationName;
    var shiftNotes = details.shiftNotes;
    var shiftType = details.shiftType;
    var workCode = `${details.workCode} - ${details.workCodeDescription}`;
    shiftDateForCall = shiftDate;
    shiftType =
      shiftType === 'A' ? 'Awake'
      : shiftType === 'N' ? 'Night'
      : shiftType === 'D' ? 'Day'
      : '';
    startTime = convertFromMilitary(startTime);
    endTime = convertFromMilitary(endTime);

    var popup = POPUP.build({
      classNames: 'pendingCallOffDetails',
      attributes: [{ key: 'shiftId', value: details.shiftId }],
    });
    var wrap = document.createElement('div');
    wrap.innerHTML = `
        <div class="detailsHeading">
          <h2>Shift Details</h2>
          <p class="smallDetail font-mediumEmphasis">${shiftDate}</p>
        </div>
        <div class="detailsBody">
          <div class="location popupDetailsLine">
            <h4 class="label">Location:  </h4>
            <p>${location}</p>
          </div>
          <hr>
          <div class="time popupDetailsLine">
            <h4 class="label">Time:  </h4>
            <p>${startTime} - ${endTime}</p>
          </div>
          <hr>
          <div class="employee popupDetailsLine">
            <h4 class="label">Consumers:  </h4>
            <p>${consumers}</p>
          </div>
          <hr>
          <div class="workCode popupDetailsLine">
            <h4 class="label">Work Code:  </h4>
            <p>${workCode}</p>
          </div>
          <hr>
          <div class="shiftType popupDetailsLine">
            <h4 class="label">Shift Type:  </h4>
            <p>${shiftType}</p>
          </div>
          <hr>
          <div class="shiftNotes popupDetailsLine">
            <h4 class="label">Notes:  </h4>
            <p>${shiftNotes}</p>
          </div>
        </div>
      `;
    popup.appendChild(wrap);

    POPUP.show(popup);
  }

  // Employee Shift Call Off
  // *the button shown inside shift details
  //---------------------------------------------------

  // UPDATED FOR RESPONSIVE DROPDOWN
  function populateReasonsDropdown(results) {
    results.sort((a, b) => (a.reasonName < b.reasonName ? -1 : 1));
    results = [{ reasonId: '%', reasonName: '' }, ...results];
    var dropdownData = results.map(r => {
      var id = r.reasonId;
      var value = r.reasonName;
      var text = r.reasonName;
      return {
        id,
        value,
        text,
      };
    });
    dropdown.populate('reasonDropdown', dropdownData);
    // reasonDropdown.addEventListener('change', () => {
    //   var selectedOption = event.target.options[event.target.selectedIndex];
    //   reasonId = selectedOption.id;
    // })
  }
  // UPDATED FOR RESPONSIVE DROPDOWN
  function populateEmployeesDropdown(results) {
    results = [{ employeeId: '%', employeeName: '' }, ...results];
    var employeeData = results.map(r => {
      var id = r.employeeId;
      var value = r.employeeName;
      var text = r.employeeName;
      return {
        id,
        value,
        text,
      };
    });

    dropdown.populate('employeeDropdown', employeeData);
    // employeeDropdown.addEventListener('change', () => {
    //   var sendRequestBtn = document.getElementById('sendReqBtn')
    //   var selectedOption = event.target.options[event.target.selectedIndex];
    //   employeeId = selectedOption.id;
    //   employeeId !== '%' ? sendRequestBtn.classList.remove('disabled'): sendRequestBtn.classList.add('disabled');
    // });
  }

  //UPDATED FOR RESPONSIVE CODE
  //CALL OFF POPUP
  function renderRequestOffPopup(eventId) {
    var actioncenter = document.getElementById('actioncenter');
    var calendar = document.getElementById('calendarContent');

    var popup = POPUP.build({
      classNames: 'request-off-popup',
      attributes: [{ key: 'shiftId', value: eventId }],
    });
    var reasonDropdown = dropdown.build({
      dropdownId: 'reasonDropdown',
      label: 'Reason',
      style: 'secondary',
      readOnly: 'false',
    });

    var notesInput = input.build({
      id: 'noteInput',
      label: 'Notes',
      type: 'textarea',
      style: 'secondary',
    });

    var employeeDropdown = dropdown.build({
      dropdownId: 'employeeDropdown',
      label: 'Employee To Notify',
      style: 'secondary',
    });

    var cancelBtn = button.build({
      text: 'Cancel',
      style: 'secondary',
      type: 'outlined',
      icon: 'close',
      callback: function () {
        POPUP.hide(popup);
        reasonId = '';
        employeeId = '';
        note = '';
      },
    });

    var sendRequestBtn = button.build({
      id: 'sendReqBtn',
      text: 'Send Request',
      classNames: 'disabled',
      style: 'secondary',
      type: 'contained',
      icon: 'send',
      callback: function () {
        var note = document.getElementById('noteInput').value;
        var data = {
          token: $.session.Token,
          shiftId: eventId,
          personId: $.session.PeopleId,
          reasonId: reasonId,
          note: note,
          status: 'P',
          notifiedEmployeeId: employeeId,
        };

        schedulingAjax.saveSchedulingCallOffRequestAjax(data);
        POPUP.hide(popup);
        init();
      },
    });

    reasonDropdown.classList.add('error');
    notesInput.classList.add('error');
    employeeDropdown.classList.add('error');

    reasonDropdown.addEventListener('change', function () {
      var selectedOption = event.target.options[event.target.selectedIndex];
      reasonId = selectedOption.id;
      if (reasonId === '%') {
        reasonDropdown.classList.add('error');
      } else {
        reasonDropdown.classList.remove('error');
      }
      checkRequiredFields(sendRequestBtn);
    });

    notesInput.addEventListener('change', function () {
      if (notesInput.firstChild.value === '') {
        notesInput.classList.add('error');
      } else {
        notesInput.classList.remove('error');
      }
      checkRequiredFields(sendRequestBtn);
    });

    employeeDropdown.addEventListener('change', function () {
      var selectedOption = event.target.options[event.target.selectedIndex];
      employeeId = selectedOption.id;
      if (employeeId === '%') {
        employeeDropdown.classList.add('error');
      } else {
        employeeDropdown.classList.remove('error');
      }
      checkRequiredFields(sendRequestBtn);
    });

    let header = document.createElement('h2');
    header.classList.add('detailsHeading');
    header.innerHTML = 'Call Off Request';

    POPUP.show(popup);
    let btnWrap = document.createElement('div');
    btnWrap.classList.add('popupBtnWrap');
    btnWrap.appendChild(sendRequestBtn);
    btnWrap.appendChild(cancelBtn);

    popup.appendChild(header);
    popup.appendChild(reasonDropdown);
    popup.appendChild(notesInput);
    popup.appendChild(employeeDropdown);
    popup.appendChild(btnWrap);

    schedulingAjax.getCallOffDropdownEmployeesAjax(
      shiftDateForCall,
      detailsLocationId,
      populateEmployeesDropdown,
    );
    schedulingAjax.getCallOffDropdownReasonsAjax(populateReasonsDropdown);
  }

  function checkRequiredFields(btn) {
    var hasErrors = [].slice.call(document.querySelectorAll('.error'));
    if (hasErrors.length === 0) {
      btn.classList.remove('disabled');
    } else {
      btn.classList.add('disabled');
    }
  }

  return {
    renderDetailsPopup,
  };
})();

const Scheduling = (function () {
  const currentView = 'mine';
  const calendarGroups = {
    1: 'My Shifts',
    2: 'All Shifts',
    3: 'Open Shifts',
    4: 'Pending Request Open Shifts',
    5: 'Pending Call Off Shifts',
    6: 'Appointments Shifts',
  };

  let locationDropdownEle;

  let schedules;
  let appointments;
  let calendarEvents;
  let calendarAppointments;
  let locations;
  let selectedLocationId;

  //TODO: put this somewhere => if (currentView === 'mine' && $.session.isPSI) return;

  // Header
  function populateLocationDropdown() {
    const dropdownData = data.map(d => ({
      id: d.locationId,
      value: d.locationName,
      text: d.locationName,
    }));

    selectedLocationId = dropdownData[0].id;
  }
  function buildLocationDropdown() {
    const locationDropdown = dropdown.build({
      dropdownId: 'locationDropdown',
      label: 'Locations:',
      style: 'secondary',
    });

    locationDropdown.addEventListener('change', event => {
      selectedLocationId = event.target.options[event.target.selectedIndex].id;
    });

    return locationDropdown;
  }
  function buildViewButton() {
    $.session.hideAllScheduleButton;
    return button.build({
      id: 'scheduleViewBtn',
      text: 'My Schedule',
      style: 'secondary',
      type: 'contained',
      toggle: true,
      toggleText: 'All Schedules',
      callback: async e => {
        console.log(e);

        if (currentView === 'mine') {
          currentView === 'all';
          await getCalendarEvents(selectedLocationId, '%');
          locationDropdownEle.classList.remove('disabled');
          return;
        }

        if (currentView === 'all') {
          currentView === 'mine';
          await schedulingAjax.getCalendarEvents('%', $.session.PeopleId);
          locationDropdownEle.classList.add('disabled');
          return;
        }
      },
    });
  }

  // Calendar Events
  function getEventGroup(personID, callOffStatus, requestShiftStatus) {
    if (!personID && currentView === 'all') {
      if (!callOffStatus && (requestShiftStatus === 'D' || requestShiftStatus === '')) {
        return { group: calendarGroups[3], id: 3 };
      }

      if (requestShiftStatus === 'P') {
        return { group: calendarGroups[4], id: 4 };
      }
    }

    if (personID.toString() === $.session.PeopleId) {
      if (callOffStatus === 'P') {
        return { group: calendarGroups[5], id: 5 };
      }

      return { group: calendarGroups[1], id: 1 };
    }

    return { group: calendarGroups[2], id: 2 };
  }
  function formatServiceDate(serviceDate, dateScheduled) {
    let date = serviceDate ? serviceDate : dateScheduled;
    return date.split(' ')[0];
    // I will let calendar handle formating
    date = date.split(' ')[0].split('/');
    const serviceYear = date[2];
    const serviceMonth = UTIL.leadingZero(date[0]);
    const serviceDay = UTIL.leadingZero(date[1]);

    return `${serviceYear}-${serviceMonth}-${serviceDay}`;
  }
  function formatDescription(firstName, lastName) {
    if (!lastName || !firstName) return '';

    return `${lastName}, ${firstName}`;
  }
  function formatEventName(firstName, lastName, locationName) {
    if (currentView === 'mine' || !firstName || !lastName) {
      return locationName;
    }

    return `${lastName}, ${firstName}`;
  }
  async function getCalendarEvents(locationID = '%', peopleID = '%') {
    schedules = await schedulingAjax.getSchedulesForSchedulingModuleAjax(
      locationID,
      peopleID,
    );

    return schedules.map(sch => {
      const timeRegEx = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/;
      const isStartTimeValid = timeRegEx.test(sch.startTime);
      const isEndTimeValid = timeRegEx.test(sch.endTime);

      if (!isStartTimeValid || !isEndTimeValid || res.serviceDate === '') {
        return;
      }

      const { group, id } = getEventGroup(
        sch.personID,
        sch.callOffStatus,
        sch.requestShiftStatus,
      );

      if (!group) return;

      const serviceDate = formatServiceDate(sch.serviceDate, sch.dateScheduled);
      const startTime = `${serviceDate} ${sch.startTime}`;
      const endTime = `${serviceDate} ${sch.endTime}`;
      const description = formatDescription(sch.firstName, sch.lastName);
      const eventName = formatEventName(sch.firstName, sch.lastName, sch.locationName);
      const name =
        currentView === 'mine' || !sch.lastName ? sch.locationName : sch.lastName;

      return {
        startTime: startTime,
        endTime: endTime,
        date: serviceDate,
        group: {
          name: group,
          id: id,
        },
        eventId: sch.shiftId,
        allDay: false,
        description: description,
        name: name,
        eventName: eventName,
      };
    });
  }
  async function getCalendarAppointments() {
    appointments = await schedulingAjax.getScheduleApptInformationAjax();

    return appointments.map(appt => {
      const serviceDate = formatServiceDate(appt.serviceDate, appt.dateScheduled);
      const startTime = `${serviceDate} ${appt.timeScheduled}`;
      const endTime = ''; //TODO: endTime is 1 hour past startTime

      return {
        startTime: startTime,
        endTime: endTime,
        date: serviceDate,
        group: {
          name: calendarGroups[6],
          id: 6,
        },
        eventId: appt.medTrackingId,
        allDay: false,
        description: appt.typeDescription,
        name: appt.consumerName,
        eventName: appt.takenToApptBy,
      };
    });
  }

  function build() {
    const scheduleWrap = document.createElement('div');
  }

  async function init() {
    build();

    calendarEvents = await getCalendarEvents('%', $.session.PeopleId);
    calendarAppointments = await getCalendarAppointments();
    locations = await schedulingAjax.getLocationDropdownForSchedulingAjax();
  }

  return {
    init,
  };
})();

export const Calendar = (function () {
  const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // DOM
  const wrapperEle = document.createElement('div');
  const calendarEle = document.createElement('div');
  const calendarNavEle = document.createElement('div');
  const calendarHeaderEle = document.createElement('div');
  const viewBtnEle = {
    month: document.createElement('button'),
    week: document.createElement('button'),
    day: document.createElement('button'),
  };
  const navBtnEle = {
    next: document.createElement('button'),
    prev: document.createElement('button'),
    today: document.createElement('button'),
  };
  const navNextBtnEle = document.createElement('button');
  const navPrevBtnEle = document.createElement('button');
  const navTodayBtnEle = document.createElement('button');
  const monthDOMCache = {};
  // Dates
  let currentView = 'month';
  let currentDate = dates.getTodaysDateObj();
  const todaysDate = dates.getTodaysDateObj();

  function renderEvents(events = []) {
    // sort events by date/time
    events
      .sort((a, b) => {})
      .forEach(e => {
        const eventEle = document.createElement('div');
        eventEle.addEventListener('click', () => {});
      });
  }

  function renderMonthView() {
    const containerEle = document.createElement('div');
    containerEle.className = 'month-view';

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

    // cal header
    calendarHeaderEle.textContent = `${getMonthName(currentDate)} - ${currentDate.getFullYear()}`;

    // day header row
    const dayHeaderRowEle = document.createElement('div');
    dayHeaderRowEle.className = 'dayNameHeader';
    containerEle.appendChild(dayHeaderRowEle);
    DAY_NAMES.forEach(dayName => {
      const nameCellEle = document.createElement('div');
      nameCellEle.textContent = dayName;
      dayHeaderRowEle.appendChild(nameCellEle);
    });

    let weekWrapEle;
    daysToRender.forEach((day, index) => {
      if (index % 7 === 0) {
        weekWrapEle = document.createElement('div');
        weekWrapEle.className = 'week';
        containerEle.appendChild(weekWrapEle);
      }

      const dayCellEle = document.createElement('div');
      dayCellEle.textContent = day.getDate();
      dayCellEle.className = 'day';
      weekWrapEle.appendChild(dayCellEle);

      monthDOMCache[day] = dayCellEle;

      containerEle.appendChild(weekWrapEle);

      // TODO: check if day is in same month (get isSameMonth from datefns)
      // if (dates.isSameMonth(day, currentDate)) {
      //   dayCellEle.classList.add('TODO');
      // }

      // TODO: add events to day
    });

    calendarEle.appendChild(containerEle);
  }
  function renderWeekView() {
    const containerEle = document.createElement('div');
    containerEle.className = 'week-view';

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
      // if (dates.isSameMonth(day, currentDate)) {
      //   dayCellEle.classList.add('TODO');
      // }

      // TODO: add events to day
    });

    calendarEle.appendChild(containerEle);
  }
  function renderDayView() {
    const containerEle = document.createElement('div');
    containerEle.className = 'day-view';

    // TODO: add events to day

    calendarEle.appendChild(containerEle);
  }

  function renderCalendar() {
    calendarEle.innerHTML = '';

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

    viewBtnEle[currentView].classList.remove('active');
    viewBtnEle[newView].classList.add('active');
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
    // main
    wrapperEle.classList.add('calendarWrap');
    calendarHeaderEle.classList.add('calendarHeader');
    calendarNavEle.classList.add('calendarNav');
    calendarEle.classList.add('calendar');
    // view buttons
    viewBtnEle['month'].setAttribute('data-view', 'month');
    viewBtnEle['week'].setAttribute('data-view', 'week');
    viewBtnEle['day'].setAttribute('data-view', 'day');
    viewBtnEle['month'].textContent = 'Month';
    viewBtnEle['week'].textContent = 'Week';
    viewBtnEle['day'].textContent = 'Day';
    // nav buttons
    navBtnEle['next'].setAttribute('data-nav', 'next');
    navBtnEle['prev'].setAttribute('data-nav', 'prev');
    navBtnEle['today'].setAttribute('data-nav', 'today');
    navBtnEle['next'].textContent = 'Next &gt;';
    navBtnEle['prev'].textContent = '&lt; Prev';
    navBtnEle['today'].textContent = 'Today';

    calendarNavEle.innerHTML = `
      <div class="viewToggle">
        ${viewBtnEle['month']}${viewBtnEle['week']}${viewBtnEle['day']}
      </div>
      <div class="dateNav">
        ${navBtnEle['prev']}${navBtnEle['today']}${navBtnEle['next']}
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
    wrapperEle.appendChild(calendarHeaderEle);
    wrapperEle.appendChild(calendarEle);
  }

  function init({ onEventClick }) {
    build();

    renderCalendar();

    return wrapperEle;
  }

  return {
    init,
  };
})();
