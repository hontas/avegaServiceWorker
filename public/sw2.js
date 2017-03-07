importScripts('../assets/serviceworker-utils.js');

const STATIC_CACHE = 'static-v2';
const DYNAMIC_CACHE = 'dynamic';
const STATIC_CACHE_URLS = staticResourceUrls;

self.addEventListener('install', function(event) {
  console.log(`Install`);
  event.waitUntil(precache(STATIC_CACHE_URLS, STATIC_CACHE));
});

self.addEventListener('activate', event => {
  console.log(`Activate`);
  event.waitUntil(removeOldCaches([STATIC_CACHE]));
});

self.addEventListener('fetch', function(event) {
  event.request.parsedUrl = new URL(event.request.url);
  staleWhileRevalidate(event, DYNAMIC_CACHE);
});
