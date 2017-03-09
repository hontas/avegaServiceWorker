importScripts('../assets/serviceworker-utils.js');

/**
 * Cache for later (client):
 *   Nothing strange in here, look at blog.pug
 *   in /views for client side caching code
 *
 * Push message and notification
 *   1. open http://localhost:3000/blog and accept notifications
 *   2. close the tab
 *   3. open devTools -> Application and select Service Workers from the left side menu
 *   4. Find the service worker controlling /blog/ and press the push link
 *   5. This should simulate that triggers a notification that when clicked takes you to a blog entry
 */

const STATIC_CACHE = 'static-v4';
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

self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'Nytt blogginlägg';
  const options = {
    body: '"SAP BW på HANA hos SJ" - Klicka för att läsa',
    icon: 'assets/cropped-favicon-320x320.png',
    badge: 'assets/cropped-favicon-320x320.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('http://localhost:3000/blog/sap-bw-pa-hana-hos-sj/')
  );
});
