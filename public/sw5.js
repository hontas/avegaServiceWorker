importScripts('../assets/serviceworker-utils.js');

const OFFLINE_URL = '/offline.html';
const NOT_FOUND_URL = '/404.html';
const STATIC_CACHE = 'static-v4';
const STATIC_CACHE_URLS = staticResourceUrls.concat(
  OFFLINE_URL,
  NOT_FOUND_URL
);

self.addEventListener('install', (event) => {
  console.log(`Install`);

  event.waitUntil(
    fetch(createCacheBustedRequest(OFFLINE_URL))
      .then((response) => {
        return caches.open(STATIC_CACHE)
          .then((cache) => cache.put(OFFLINE_URL, response).then(() => cache))
          .then((cache) => cache.addAll(STATIC_CACHE_URLS))
      })
      .then(self.skipWaiting()) // replace existing worker
  );
});

self.addEventListener('activate', (event) => {
  console.log('Activate');

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => cacheNames.filter((cacheName) => cacheName !== STATIC_CACHE))
      .then((cachesToDelete) => Promise.all(
        cachesToDelete
          .map((cacheToDelete) => {
            console.log(`removing caches for ${cacheToDelete}`);
            return caches.delete(cacheToDelete);
          })
      ))
      .then(() => self.clients.claim()) // active worker on open pages
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    console.log('navigate event!');
    console.log(event.request.url);
    return event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.type === 'basic' && response.status === 404) {
            return caches.match(NOT_FOUND_URL);
          }
          return response;
        })
        .catch((error) => caches.match(OFFLINE_URL))
    );
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }

        return fetch(event.request);
      })
  );
});
