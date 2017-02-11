var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/assets/11-matchningsprincipen.svg',
  '/assets/all.css',
  '/assets/all.js',
  '/assets/analytics.js',
  '/assets/cellphone_2-1-540x320.jpg',
  '/assets/common.js',
  '/assets/crowd-hires-540x320.jpg',
  '/assets/css',
  '/assets/hotjar-243593.js',
  '/assets/jquery.form.min.js',
  '/assets/jquery.min.js',
  '/assets/js',
  '/assets/konferens-kopia-540x320.jpg',
  '/assets/modules-c32705eea471a3b86fa01dc951b20d98.js',
  '/assets/penna-540x320.jpg',
  '/assets/rcj-b2c1bce0a548059f409c021a46ea2224.html',
  '/assets/reception.jpg',
  '/assets/scripts.js',
  '/assets/stats.js',
  '/assets/util.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  console.log(`${CACHE_NAME} installing`);

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  console.log(`${CACHE_NAME} ready to handle fetches!`);
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
