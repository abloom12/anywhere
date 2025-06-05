export async function fetchDataWithProgress(
  service: string,
  retrieveData: Record<string, any>,
  controller?: AbortController,
): Promise<any> {
  const URL_BASE = `https://gk-unit-test.primarysolutions.net:443/./service/Anywhere.svc`;
  const URL = `${URL_BASE}/${service}/`;

  if (!controller) {
    controller = new AbortController();
  }

  const response = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: 'AUTH_TOKEN', ...retrieveData }),
    signal: controller.signal,
  });

  const reader = response?.body?.getReader();
  const contentLength = parseInt(response.headers.get('Content-Length') || '0', 10);
  if (!reader) {
    throw new Error('Unable to read response body');
  }

  let receivedLength = 0;
  let chunks = [];
  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    chunks.push(value);
    receivedLength += value.length;

    console.log(`Received ${receivedLength} of ${contentLength}`);
  }

  let chunksAll = new Uint8Array(receivedLength);
  let position = 0;
  for (let chunk of chunks) {
    chunksAll.set(chunk, position);
    position += chunk.length;
  }

  let result = new TextDecoder('utf-8').decode(chunksAll);

  return await JSON.parse(result);
}
