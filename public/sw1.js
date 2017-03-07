importScripts('../assets/serviceworker-utils.js');

const PRECACHE = 'precache-v2';
const ASSETS = staticResourceUrls;

self.addEventListener('install', function(event) {
  console.log(`Install`);
  event.waitUntil(precache(ASSETS, PRECACHE));
});

self.addEventListener('activate', (event) => {
  console.log(`Activate`);
  event.waitUntil(removeOldCaches([PRECACHE]));
});

self.addEventListener('fetch', function(event) {
  event.request.parsedUrl = new URL(event.request.url);
  // Skip cross-origin requests
  if (!isSameOrigin(event.request)) return;

  event.respondWith(cacheFirst(event.request));
});
