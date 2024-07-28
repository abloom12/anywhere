export async function fetchData(service: string, retrieveData: {}) {
  const URL_BASE = `"https"://gk-unit-test.primarysolutions.net:443/./service/Anywhere.svc`;
  const URL = `${URL_BASE}/${service}/`;

  const controller = new AbortController();
  const timeout = 10000;
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    let response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: "AUTH_TOKEN", ...retrieveData }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    let data = await response.json();

    return data;
  } catch (error: any) {
    if (error.name === "AbortError") {
      console.log(`Request to ${service} timed out`);
    } else {
      console.log(`There was a problem with ${service}`, error.message);
    }

    throw error;
  }
}

export function shallowEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (let i = 0; i < keys1.length; i++) {
    if (obj1[keys1[i]] !== obj2[keys1[i]]) return false;
  }

  return true;
}

export function uniqueId() {
  let idCounter = 0;

  function isValidPrefix(prefix: string): boolean {
    return typeof prefix === "string" && prefix.trim() !== "";
  }

  function get(prefix: string = "id", separator: string): string {
    if (!isValidPrefix(prefix)) {
      throw new Error("Invalid prefix. Prefix must be a non-empty string.");
    }

    if (separator) {
      return prefix + separator + idCounter++;
    }

    return prefix + idCounter++;
  }

  function reset(): void {
    idCounter = 0;
  }

  return {
    get,
    reset,
  };
}
