const staticResourceUrls = [
  './',
  '/1',
  '/2',
  '/3',
  '/4',
  '/blog',
  '/assets/11-matchningsprincipen.svg',
  '/assets/all.css',
  '/assets/cellphone_2-1-540x320.jpg',
  '/assets/css',
  '/assets/jquery.form.min.js',
  '/assets/jquery.min.js',
  '/assets/konferens-kopia-540x320.jpg',
  '/assets/sunset-over-dinner-nice.jpg',
  '/assets/penna-540x320.jpg',
  '/assets/reception.jpg',
  '/assets/scripts.js',
  '/assets/fontello.woff2',
  '/assets/women_2.jpg',
  '/assets/cropped-favicon-320x320.png',
  '/assets/cropped-favicon-64x64.png',
  '/assets/artikel_sj_hana-540x320.jpg',
  '/assets/griffeltavla-lampor-krita_1280-540x320.jpg',
  '/assets/artikel_sap_thomasa-540x320.jpg'
];

/**
 * helper functions
 */

/**
 * Install
 */

async function precache(assets, cacheName) {
  console.log(`Caching ${assets.length} assets`);
  const cache = await caches.open(cacheName);
  await cache.addAll(assets);

  return self.skipWaiting(); // replace existing worker immediately
}

/**
 * Activate
 */

async function removeOldCaches(whiteList) {
  const cacheNames = await caches.keys();
  await Promise.all(cacheNames
    .filter((cacheName) => !whiteList.includes(cacheName))
    .map(removeCache)
  );

  return self.clients.claim(); // active worker on open pages
}

function removeCache(cacheToDelete) {
  console.log(`removing caches for ${cacheToDelete}`);
  return caches.delete(cacheToDelete);
}

/**
 * Fetch
 */

function isSameOrigin(request) {
  return request.parsedUrl.origin === location.origin;
}

function fromCache(request) {
  return caches.match(request);
}

async function cacheFirst(request) {
  const response = await fromCache(request);
  return response || fetch(request.clone());
}

// async function networkFirst(request, cacheName) {
//   const fetchedVersion = fetch(request.clone());
//   const cachedVersion = fromCache(request, cacheName);

//   try {
//     const response = await fetchedVersion;
//     if (response.ok) return response;
//     return await cachedVersion;
//   } catch (e) {
//     // offline
//     return await cachedVersion;
//   }
// }

async function cacheFirstUpdate(request, cacheName) {
  const cachedResponse = await fromCache(request, cacheName);
  if (!cachedResponse) {
    console.log('not in cache, fetching from network');
    return updateCache(request.clone(), cacheName);
  }

  updateCache(request.clone(), cacheName);
  return cachedResponse;
}

async function updateCache(request, cacheName) {
  const cache = await caches.open(cacheName);
  const response = await fetch(request);

  console.log('updating cache');
  await cache.put(request, response.clone());
  return response;
}

function createCacheBustedRequest(url) {
  let request = new Request(url, {cache: 'reload'});
  // See https://fetch.spec.whatwg.org/#concept-request-mode
  // This is not yet supported in Chrome as of M48, so we need to explicitly check to see
  // if the cache: 'reload' option had any effect.
  if ('cache' in request) {
    return request;
  }

  // If {cache: 'reload'} didn't have any effect, append a cache-busting URL parameter instead.
  let bustedUrl = new URL(url, self.location.href);
  bustedUrl.search += (bustedUrl.search ? '&' : '') + 'cachebust=' + Date.now();
  return new Request(bustedUrl);
}

async function staleWhileRevalidate(event, cacheName) {
  const fetchedVersion = fetch(event.request);
  const fetchedCopy = fetchedVersion.then((response) => response.clone());
  const cachedVersion = caches.match(event.request);

  event.respondWith(async function() {
    try {
      const response = await Promise.race([
        fetchedVersion.catch(() => cachedVersion), // if offline
        cachedVersion
      ]);

      if (!response) { // if nothing in cache
        return await fetchedVersion;
      }
      return response;
    } catch (err) {
      // not in cache and offline
      console.log('err', err);
      return new Response(null, { status: 404 });
    }
  }()); // note invocation

  event.waitUntil(async function() {
    try {
      const response = await fetchedCopy;
      const cache = await caches.open(cacheName);
      return cache.put(event.request, response);
    } catch (err) {
      // eat errors
      console.log('err', err);
    }
  }()); // note invocation
}
