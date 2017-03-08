importScripts('../assets/serviceworker-utils.js');

/**
 * nothing strange here, look at blog.pug
 * in views for client side caching code
 */

const STATIC_CACHE = 'static-v3';
const STATIC_CACHE_URLS = staticResourceUrls;

self.addEventListener('install', (event) => {
  event.waitUntil(precache(STATIC_CACHE_URLS, STATIC_CACHE));
});

self.addEventListener('activate', event => {
  event.waitUntil(removeOldCaches([STATIC_CACHE]));
});

self.addEventListener('fetch', (event) => {
  event.respondWith(cacheFirst(event.request));
});
