/// <reference lib="webworker" />

// Import worker using Vite syntax
// import FetchWorker from 'shared/workers/fetchWorker?worker';

import { fetchData } from '@/shared/lib/fetch';

type FetchRequest = {
  service: string;
  retrieveData: Record<string, any>;
};

type WorkerRequestMessage = {
  requests: FetchRequest[];
};

let controller: AbortController;

self.onmessage = async function (event: MessageEvent<WorkerRequestMessage>) {
  if (typeof event.data === 'string') {
    if (event.data === 'abort' && controller) {
      controller.abort();
      self.postMessage({ status: 'aborted' });
    }
    return;
  }

  const { requests } = event.data;

  controller = new AbortController();

  try {
    const results = await Promise.all(
      requests.map((req: FetchRequest) => fetchData(req.service, req.retrieveData)),
    );

    self.postMessage({ status: 'success', data: results });
  } catch (error: unknown) {
    if (error instanceof Error) {
      self.postMessage({ status: 'error', error: error.message });
    } else {
      self.postMessage({ status: 'error', error: 'Unknown error occurred' });
    }
  } finally {
  }
};
