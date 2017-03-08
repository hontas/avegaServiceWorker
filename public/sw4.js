importScripts('../assets/serviceworker-utils.js');

/**
 * Provide our own 404 and offline page
 */

const OFFLINE_URL = '/offline.html';
const NOT_FOUND_URL = '/404.html';
const STATIC_CACHE = 'static-v4';
const STATIC_CACHE_URLS = staticResourceUrls.concat(
  OFFLINE_URL,
  NOT_FOUND_URL
);

self.addEventListener('install', (event) => {
  event.waitUntil(precache(STATIC_CACHE_URLS, STATIC_CACHE));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(removeOldCaches([STATIC_CACHE]));
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    console.log(`navigate to: ${event.request.url}`);
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.type === 'basic' && response.status === 404) {
            return caches.match(NOT_FOUND_URL);
          }
          return response;
        })
        .catch((error) => caches.match(OFFLINE_URL))
    );
  } else {
    event.respondWith(cacheFirst(event.request));
  }
});
