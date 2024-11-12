// DOMPurify??

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

  const escapeHTML_NEW = (str: string): string => {
    return str.replace(/[&<>"'/]/g, (char) => {
      return `&#${char.charCodeAt(0)};`;
    });
  };

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
      const sanitized = sanitizeInput(parsed);
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
  const isJSONString_NEW = (str: string): boolean => {
    try {
      JSON.parse(str);
      return true;
    } catch {
      return false;
    }
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
    return input.map((item) => sanitizeInput(item));
  } else if (typeof input === "object" && input !== null) {
    Object.keys(input).forEach((key) => {
      input[key] = sanitizeInput(input[key]);
    });
    return input;
  } else {
    return input;
  }
}

export { sanitizeInput };
