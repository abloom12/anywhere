/**
 * Asynchronously fetches attachment details based on the given event object.
 *
 * @async
 * @param {Object} file File object
 * @returns {Promise<Object>} Returns a Promise that resolves to an object containing attachment details.
 * @returns {Object} .attachmentObj - An object containing the description and type of the attachment, as well as its ArrayBuffer.
 * @returns {string} .attachmentObj.description - The name of the attachment file.
 * @returns {string} .attachmentObj.type - The file extension of the attachment.
 * @returns {ArrayBuffer} .attachmentObj.arrayBuffer - The ArrayBuffer of the attachment file.
 * @throws {Error} Throws an error if unable to fetch attachment details.
 */
async function getAttachmentDetails(file) {
  const attachmentObj = {};
  const attachmentFile = file;
  const attachmentName = attachmentFile.name;
  const attachmentType = attachmentFile.name.split(".").pop();

  attachmentObj.description = attachmentName;
  attachmentObj.type = attachmentType;

  const response = new Response(attachmentFile);
  const arrayBuffer = await response.arrayBuffer();

  // convert arrayBuffer to a base64 encoded string
  const bytes = new Uint8Array(arrayBuffer);
  const binary = Array.from(bytes).reduce((acc, byte) => {
    return acc + String.fromCharCode(byte);
  }, "");
  const abString = window.btoa(binary);

  attachmentObj.attachment = abString;

  return attachmentObj;
}

/**
 * Test if node is reference-free
 *
 * @function
 * @param {HTMLElement}  node - HTML element
 * @returns {Boolean} - Returns whether node is reference free or not
 */
function isReferenceFree(node) {
  return (
    (document.compareDocumentPosition(node) &
      Node.DOCUMENT_POSITION_CONTAINED_BY) ===
    0
  );
}

/**
 * Checks if a given string contains HTML tags.
 *
 * @param {String} str - The string to be checked for HTML tags.
 * @returns {Boolean} - True if the string contains HTML tags, false otherwise.
 */
function stringContainsHTML(str) {
  const regExp = /<[^>]*>/g;
  return regExp.test(str);
}

/**
 * Auto-increments the numeric suffix of an identifier string. If the provided string
 * does not end in a hyphen followed by a number, it appends '-1'. If it does end
 * with a number, the number is incremented by one.
 *
 * This function is useful for automatically generating incremented ID values in
 * scenarios where unique and sequential identifiers are needed.
 *
 * @param {string} str - The input string which may or may not end with a numeric suffix.
 * @returns {string} The input string
 *
 * @example
 * autoIncrementIdString('example');
 * //* returns 'example-1'
 *
 * @example
 * autoIncrementIdString('example-4');
 * //* returns 'example-5'
 */
function autoIncrementId(str) {
  // Regular expression to match the pattern "-number" at the end of the string
  const regex = /-(\d+)$/;

  // Check if the string matches the pattern
  const match = str.match(regex);

  if (match) {
    // If it matches, increment the number and return the string
    const number = parseInt(match[1], 10) + 1;
    return str.replace(regex, `-${number}`);
  } else {
    // If it doesn't match, append "-1" to the string
    return `${str}-1`;
  }
}

/**
 * Allows you to use async await with setTimeout
 *
 * @param {number} ms The number of milliseconds to delay.
 * @param {Function} callback The callback function to execute after the delay.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 */
function asyncSetTimeout(callback, ms) {
  let timeoutId;

  const promise = new Promise((resolve) => {
    timeoutId = setTimeout(() => {
      callback();
      resolve();
      clearTimeout(timeoutId);
    }, ms);
  });

  return promise;
}

/**
 * Converts a camelCase string to a title case string with spaces.
 *
 * @param {string} camelCaseStr - The camelCase string to be converted.
 * @returns {string} The converted string in title case with spaces.
 *
 * @example
 * // returns 'Hello There World'
 * convertCamelCaseToTitle('helloThereWorld');
 */
function convertCamelCaseToTitle(camelCaseStr) {
  // Add a space before each uppercase letter and trim the result
  let spacedStr = camelCaseStr.replace(/([A-Z])/g, " $1").trim();

  // Capitalize the first letter and concatenate with the rest of the string
  return spacedStr.charAt(0).toUpperCase() + spacedStr.slice(1);
}

function connectionWatch() {
  if ($.session.watchingConnection) return;

  const statusPopup = new Dialog({ className: "connectionWatchStatusPopup" });
  const statusMessage = _DOM.createElement("p");
  statusPopup.dialog.appendChild(statusMessage);
  statusPopup.renderTo(document.body);

  window.addEventListener("offline", (event) => {
    statusMessage.innerText = "The network connection has been lost.";
    statusPopup.show();
  });

  window.addEventListener("online", (event) => {
    statusMessage.innerText = "You are now connected to the network.";
    setTimeout(() => {
      statusPopup.close();
    }, 3000);
  });

  console.clear();
  console.log("connection watch enabled");
  $.session.watchingConnection = true;
}

/**
 * Debounces a function, ensuring that it's not called until after the specified
 * amount of time has passed since the last time it was invoked.
 *
 * @function
 * @param {Function} func - The function to debounce.
 * @param {Number} wait - The number of milliseconds to delay the function
 * @returns {Function} - Returns the debounced version of the provided function
 */
function debounce(func, wait) {
  let timeout;

  return function executedFunction(...args) {
    const context = this;

    const later = function () {
      timeout = null;
      func.apply(context, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function getDeviceType() {
  const ua = navigator.userAgent;

  // Patterns to detect mobile and tablet devices
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  const isTablet = /iPad|Android/i.test(ua) && !/Mobile/i.test(ua);

  if (isMobile) {
    return isTablet ? "TABLET" : "MOBILE";
  } else {
    return "DESKTOP";
  }
}

/**
 * Provides methods to interact with the browser's localStorage.
 * It allows you to get and set values while handling JSON serialization and deserialization automatically.
 *
 * @namespace localStorageHandler
 */
const localStorageHandler = {
  /**
   * Retrieves a value from local storage
   *
   * @function
   * @memberof localStorageHandler
   * @param {String} key
   * @returns {Any|Null}
   */
  get(key) {
    try {
      // storedValue = {storage_key1:storage_value,storage_key2:value}
      const storedValue = localStorage.getItem(`anywstate_${$.session.UserId}`);
      if (storedValue) {
        try {
          const state = JSON.parse(storedValue);
          return state ? state[key] : null;
        } catch (error) {
          return storedValue;
        }
      }

      return null;
    } catch (error) {
      console.log(
        "An error occurred when getting the value from local storage",
        error
      );
    }
  },
  /**
   * Sets a value to local storage
   *
   * @function
   * @memberof localStorageHandler
   * @param {String} key
   * @param {Any} value
   */
  set(key, value) {
    try {
      if (typeof value === "object") {
        value = JSON.parse(value);
      }

      // get current ls value
      const storedValue = localStorage.getItem(`anywstate_${$.session.UserId}`);
      if (!storedValue) {
        storedValue = {};
      }
      // set new key/value pair
      storedValue[key] = value;

      // update with new value
      const updatedValue = JSON.stringify(storedValue);
      localStorage.setItem(`anywstate_${$.session.UserId}`, updatedValue);
    } catch (error) {
      console.log(
        "An error occurred when setting the value to local storage",
        error
      );
    }
  },
};

/**
 * Pads a number with a leading zero if it is less than 10.
 *
 * @param {number} number - The number to pad.
 * @return {string} - The padded number as a string.
 */
function padNumberWithZero(number) {
  return number < 10 ? "0" + number : number.toString();
}

/**
 * Sorts an Array of Objects by given property, currently property must be a string
 *
 * @function
 * @param {String}  sortProp
 * @return {Function} - sort comparator function
 */
function sortByProperty(sortProp) {
  return function (a, b) {
    const aValue = a[sortProp] || "";
    const bValue = b[sortProp] || "";

    // srings only
    return aValue.localeCompare(bValue);
  };
}

/**
 * Separate props and methods from obj
 *
 * @function
 * @param {Object}  dirtyObj - Object to split
 * @param {Array}   props - Object props to isolate
 * @return {Object} - Separated options object
 */
function splitObjectByPropNames(dirtyObj, props) {
  const [a, b] = Object.entries(dirtyObj).reduce(
    ([matching, leftover], [key, value]) =>
      props.includes(key)
        ? [Object.assign(matching, { [key]: value }), leftover]
        : [matching, Object.assign(leftover, { [key]: value })],
    [{}, {}]
  );

  return [{ ...a }, { ...b }];
}

/**
 * Validates the file type based on the provided regular expression pattern.
 *
 * @param {Event} event - The Event object, commonly from an input element of type 'file'.
 * @param {RegExp} forbiddenTypesPattern - The regular expression pattern to match forbidden file types.
 * @returns {boolean} Returns true if the file type is valid, false otherwise.
 */
const forbiddenTypesPattern = new RegExp("(audio/)|(video/)");
function validateFileType(event, forbiddenTypesPattern) {
  const fileType = event.target.files[0]?.type;

  if (!fileType) {
    console.warn("No file selected.");
    return false;
  }

  if (forbiddenTypesPattern.test(fileType)) {
    alert("This application currently does not accept the selected file type.");
    event.target.value = "";
    return false;
  }
  return true;
}
