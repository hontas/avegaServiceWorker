importScripts('../assets/serviceworker-utils.js');

/**
 * Precache static assets to
 * enable off-line.
 * This will NOT cache webfonts
 */

const PRECACHE = 'precache-v2';
const ASSETS = staticResourceUrls;

self.addEventListener('install', (event) => {
  event.waitUntil(precache(ASSETS, PRECACHE));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(removeOldCaches([PRECACHE]));
});

self.addEventListener('fetch', (event) => {
  event.request.parsedUrl = new URL(event.request.url);

  // Skip cross-origin requests
  if (!isSameOrigin(event.request)) return;

  if (event.request.parsedUrl.pathname.startsWith('/assets')) {
    event.respondWith(fromCache(event.request));
    return;
  }

  event.respondWith(cacheFirst(event.request));
});
