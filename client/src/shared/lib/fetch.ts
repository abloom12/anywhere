import { CustomError } from '@/shared/util/custom-error';

export async function fetchData<ResponseType>(
  service: string,
  retrieveData: Record<string, any>,
  controller?: AbortController,
): Promise<ResponseType> {
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
      throw new CustomError(
        'network',
        `Error ${response.status}: ${response.statusText}`,
      );
    }

    const parsedResponse = await response.json();
    const responseKey = `${service}Result`;
    return parsedResponse[responseKey] as ResponseType;
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new CustomError('network', `Request to ${service} was aborted`);
      } else {
        throw new CustomError(
          'network',
          `There was a problem with ${service}. Error: ${error.message}`,
        );
      }
    } else {
      throw new CustomError(
        'unkown',
        `An unknown error occurred while fetching ${service}`,
      );
    }
  } finally {
    clearTimeout(timeoutId);
  }
}
