export async function fetchData(
  service: string,
  retrieveData: Record<string, any>,
  controller?: AbortController,
): Promise<any> {
  const URL_BASE = `https://gk-unit-test.primarysolutions.net:443/./service/Anywhere.svc`;
  const URL = `${URL_BASE}/${service}/`;

  if (!controller) {
    controller = new AbortController();
  }

  const timeout = 10000;
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: 'AUTH_TOKEN', ...retrieveData }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.log(`Request to ${service} timed out`);
      } else {
        console.log(`There was a problem with ${service}`, error.message);
      }
    } else {
      console.log(`An unknown error occurred while fetching ${service}`);
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
