importScripts('../assets/serviceworker-utils.js');

/**
 * intercept request for a specific resource and
 * respond with another one
 */

const replacementPhotos = [
  'avega_car.jpg',
  'avegasenso1.jpg',
  'avegasenso2.jpg',
  'avegasenso3.png',
  'avegasenso4.png'
];

const STATIC_CACHE = 'static-v2';
const DYNAMIC_CACHE = 'dynamic';
const STATIC_CACHE_URLS = replacementPhotos
  .map((img) => `/assets/${img}`)
  .concat(staticResourceUrls);

self.addEventListener('install', function(event) {
  event.waitUntil(precache(STATIC_CACHE_URLS, STATIC_CACHE));
});

self.addEventListener('activate', event => {
  event.waitUntil(removeOldCaches([STATIC_CACHE]));
});

self.addEventListener('fetch', function(event) {
  const url = event.request.parsedUrl = new URL(event.request.url);

  // Skip cross-origin requests
  if (!isSameOrigin(event.request)) return;

  // replace resource
  const replaceable = 'women_2.jpg';
  const replacement = replacementPhotos[Math.floor(Math.random() * replacementPhotos.length)];
  if (url.pathname.includes(replaceable)) {
    event.respondWith(caches.match(url.pathname.replace(replaceable, replacement)));
    return;
  }

  event.respondWith(cacheFirst(event.request));
});
