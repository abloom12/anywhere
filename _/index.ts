export async function fetchData(service: string, retrieveData: {}) {
  const URL_BASE = `https://gk-unit-test.primarysolutions.net:443/./service/Anywhere.svc`;
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
  } finally {
    clearTimeout(timeoutId);
  }
}

type Node<T> = {
  state: T;
  prev: Node<T> | null;
  next: Node<T> | null;
};

export function node<T>(state: T): Node<T> {
  return {
    state,
    prev: null,
    next: null,
  };
}

export function shallowCompareObjects<T>(objA: T, objB: T): boolean {
  if (Object.is(objA, objB)) {
    return true;
  }

  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const keyA of keysA) {
    if (
      !Object.prototype.hasOwnProperty.call(objB, keyA as string) ||
      !Object.is(objA[keyA as keyof T], objB[keyA as keyof T])
    ) {
      return false;
    }
  }

  return true;
}

export function shallowCompareMaps<K, V>(
  mapA: Map<K, V>,
  mapB: Map<K, V>
): boolean {
  if (Object.is(mapA, mapB)) {
    return true;
  }

  if (mapA.size !== mapB.size) {
    return false;
  }

  for (const [key, value] of mapA) {
    if (!Object.is(value, mapB.get(key))) {
      return false;
    }
  }

  return true;
}

export function shallowCompareSets<V>(setA: Set<V>, setB: Set<V>): boolean {
  if (Object.is(setA, setB)) {
    return true;
  }

  if (setA.size !== setB.size) {
    return false;
  }

  for (const value of setA) {
    if (!setB.has(value)) {
      return false;
    }
  }

  return true;
}
