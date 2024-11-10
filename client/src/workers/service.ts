// Update tsconfig.json to include webworker library
// Define a cache name
const CACHE_NAME: string = 'my-site-cache-v1';

// List of URLs to pre-cache
const URLS_TO_CACHE: string[] = ['/', '/index.html'];

// Install event - caching initial assets
self.addEventListener('install', event => {
  const swEvent = event as ExtendableEvent;
  swEvent.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Opened cache');
      return cache.addAll(URLS_TO_CACHE);
    }),
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const swEvent = event as ExtendableEvent;
  swEvent.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});

// Fetch event - serving cached content when offline
self.addEventListener('fetch', event => {
  const swEvent = event as FetchEvent;
  swEvent.respondWith(
    caches.match(swEvent.request).then(response => {
      // If a cached response is found, return it
      if (response) {
        return response;
      }
      // Otherwise, fetch the resource from the network
      return fetch(swEvent.request)
        .then(networkResponse => {
          if (
            !networkResponse ||
            networkResponse.status !== 200 ||
            networkResponse.type !== 'basic'
          ) {
            return networkResponse;
          }
          return networkResponse;
        })
        .catch(() => {
          // Optionally, return a fallback page if offline
          return caches.match('/index.html');
        });
    }) as Promise<Response>,
  );
});

// Optional: Listen for 'push' events for notifications
self.addEventListener('push', event => {
  const swEvent = event as PushEvent;
  const title = 'Push Notification';
  const options: NotificationOptions = {
    body: swEvent.data ? swEvent.data.text() : 'Default body',
    icon: '/images/icon.png',
    badge: '/images/badge.png',
  };

  swEvent.waitUntil(
    (self as ServiceWorkerGlobalScope).registration.showNotification(title, options),
  );
});

// Declare global self variable for service worker scope
declare var self: ServiceWorkerGlobalScope;

declare type ExtendableEvent = Event & {
  waitUntil(fn: Promise<any>): void;
};

declare type FetchEvent = ExtendableEvent & {
  request: Request;
  respondWith(response: Response | Promise<Response>): void;
};

declare type PushEvent = ExtendableEvent & {
  data: any;
};
