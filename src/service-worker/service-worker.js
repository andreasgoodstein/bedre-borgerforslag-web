const CACHE_NAME = 'mitdemokrati-borgerforslag-v1';
const urlsToCache = ['/', '/manifest.json'];

self.addEventListener('install', (event) => {
  event.waitUntil(initializeCache);
});

const initializeCache = async () => {
  const cache = await caches.open(CACHE_NAME);
  return cache.addAll(urlsToCache);
};
