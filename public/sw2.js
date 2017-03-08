importScripts('../assets/serviceworker-utils.js');

/**
 * Use staleWhileRevalidate to serve race between network & cache
 * with fallback to network which then updates the cache. Simple ;)
 */

const STATIC_CACHE = 'static-v2';
const DYNAMIC_CACHE = 'dynamic';
const STATIC_CACHE_URLS = staticResourceUrls;

self.addEventListener('install', function(event) {
  event.waitUntil(precache(STATIC_CACHE_URLS, STATIC_CACHE));
});

self.addEventListener('activate', event => {
  event.waitUntil(removeOldCaches([STATIC_CACHE]));
});

self.addEventListener('fetch', function(event) {
  event.request.parsedUrl = new URL(event.request.url);
  staleWhileRevalidate(event, DYNAMIC_CACHE);
});
