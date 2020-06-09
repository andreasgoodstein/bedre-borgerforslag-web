const CACHE_NAME = 'mitdemokrati-borgerforslag-v1';
const urlsToCache = [
  '/',
  '/manifest.json',
];

self.addEventListener('install', (event) => {
  event.waitUntil(initializeCache);
});

const initializeCache = async () => {
  const cache = await caches.open(CACHE_NAME);
  return cache.addAll(urlsToCache);
};

self.addEventListener('fetch', (event) => {
  event.respondWith(getResourceWithUpdate(event));
});

const getResourceWithUpdate = async (event) => {
  const cacheResponse = await caches.match(event.request);

  const networkResponse = updateCacheFromNetwork(event);

  return cacheResponse || networkResponse;
};

const updateCacheFromNetwork = async ({ request, clientId }) => {
  const fetchRequest = request.clone();

  const response = await fetch(fetchRequest);

  if (!response || response.status !== 200) {
    return response;
  }

  const responseToCache = response.clone();
  const responseToMessage = response.clone();

  const cache = await caches.open(CACHE_NAME);
  cache.put(request, responseToCache);

  if (request.url.includes('api')) {
    try {
      const data = await responseToMessage.json();
      const client = await self.clients.get(clientId);

      if (!client || !data) {
        return response;
      }

      const message = request.url.includes('/forslag')
        ? { forslag: data }
        : { updates: data };

      client.postMessage(message);
    } catch (error) {
      console.error(error);
    }
  }

  return response;
};
