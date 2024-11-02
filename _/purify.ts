function sanitizeInput(input: any): any {
  const escapeMap: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "`": "&#x60;",
  };

  const escapeChar = (char: string): string => escapeMap[char] || char;

  const escapeHTML = (str: string): string =>
    str.replace(/[&<>"'`]/g, escapeChar);

  const sanitizeURL = (url: string): string => {
    try {
      const parsedURL = new URL(url);
      const allowedSchemes = ["http:", "https:", "mailto:"];
      if (!allowedSchemes.includes(parsedURL.protocol)) {
        return "about:blank";
      }
      return parsedURL.href;
    } catch (e) {
      return "about:blank";
    }
  };

  const sanitizeJSON = (jsonStr: string): string => {
    try {
      const parsed = JSON.parse(jsonStr);
      const sanitized = sanitizeInput(parsed);
      return JSON.stringify(sanitized);
    } catch (e) {
      return escapeHTML(jsonStr); // fallback to escaping if not a valid JSON
    }
  };

  if (typeof input === "string") {
    try {
      new URL(input);
      return sanitizeURL(input);
    } catch {
      if (input.trim().startsWith("{") && input.trim().endsWith("}")) {
        return sanitizeJSON(input);
      } else {
        return escapeHTML(input);
      }
    }
  } else if (input instanceof URL) {
    // Sanitize URL
    return sanitizeURL(input.toString());
  } else if (typeof input === "object" && input !== null) {
    // Sanitize each property if it's an object
    Object.keys(input).forEach((key) => {
      input[key] = sanitizeInput(input[key]);
    });
    return input;
  } else {
    // Return input as is for other types
    return input;
  }
}

function sanitizeInput2(input: any): any {
  const escapeMap: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "`": "&#x60;",
  };

  const escapeChar = (char: string): string => escapeMap[char] || char;

  const escapeHTML = (str: string): string =>
    str.replace(/[&<>"'`]/g, escapeChar);

  const sanitizeURL = (url: string): string => {
    try {
      const parsedURL = new URL(url);
      const allowedSchemes = ["http:", "https:", "mailto:"];
      return allowedSchemes.includes(parsedURL.protocol)
        ? parsedURL.href
        : "about:blank";
    } catch {
      return "about:blank";
    }
  };

  const sanitizeJSON = (jsonStr: string): string => {
    try {
      const parsed = JSON.parse(jsonStr);
      const sanitized = sanitizeInput2(parsed);
      return JSON.stringify(sanitized);
    } catch {
      return escapeHTML(jsonStr);
    }
  };

  const isURL = (str: string): boolean => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  const isJSONString = (str: string): boolean => {
    return str.trim().startsWith("{") && str.trim().endsWith("}");
  };

  if (typeof input === "string") {
    if (isURL(input)) {
      return sanitizeURL(input);
    } else if (isJSONString(input)) {
      return sanitizeJSON(input);
    } else {
      return escapeHTML(input);
    }
  } else if (input instanceof URL) {
    return sanitizeURL(input.toString());
  } else if (Array.isArray(input)) {
    return input.map((item) => sanitizeInput2(item));
  } else if (typeof input === "object" && input !== null) {
    Object.keys(input).forEach((key) => {
      input[key] = sanitizeInput2(input[key]);
    });
    return input;
  } else {
    return input;
  }
}

export { sanitizeInput, sanitizeInput2 };
