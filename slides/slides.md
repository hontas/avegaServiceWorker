class: center, we-can-do-it

![service-workers](We_Can_Do_It_before.jpg)

---

class: center, we-can-do-it

![service-workers](We_Can_Do_It_full.jpg)

---

class: center, middle

# Service Workers

[github.com/hontas/avegaServiceWorker](https://github.com/hontas/avegaServiceWorker)

---

# Agenda

- [What are Service Workers?](#what-are-sw)
- [Browser support](#browser-support)
- [Basic usage](#basic-usage)
- [SW Lifecycle](#sw-lifecycle)
- [SW Strategies](#sw-strategies)
- [Examples](#examples)
- [To the stars and beyond](#to-the-stars)
- [Links](#links)

---
name: what-are-sw

# What are Service Workers?

> A script that runs in the background, separate from a web page. Can intercept and handle network requests and programmatically manage a cache.

- Support offline experiences
- Can't access the DOM directly
- Cannot rely on global state
- Have access to the IndexedDB API
- Requires HTTPS

???
offline: by caching assets and using them for response

Global state: terminated when not in use, restarted when  needed

HTTPS: unless localhost

---
name: what-are-sw-image

# What are Service Workers?

.center[![service-worker-diagram](http://nolanlawson.github.io/pwas-2016-05/img/service-worker-jaffa.png)]

???
page -> serviceWorker -> network

avbryta svara med annat

modifiera svaret innan det går tillbaka

---
name: browser-support

# Browser support
[caniuse.com/#feat=serviceworkers](http://caniuse.com/#feat=serviceworkers) |


![caniuse](caniuse-sw.png)

You can follow the progress of all the browsers at [Jake Archibald's is Serviceworker ready site](https://jakearchibald.github.io/isserviceworkerready/)

---
name: basic-usage

# Basic usage

```js
if ('serviceWorker' in navigator) { // progressive enhancement
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('sw.js')
      .then(function(registration) { /* registration success */ })
      .catch(function(err) { /* registration failure */ });
  });
}
```

![important.png](https://mdn.mozillademos.org/files/12630/important-notes.png)

---
name: sw-lifecycle

# SW Lifecycle
> [sw-lifecycle-image#1](https://mdn.mozillademos.org/files/12636/sw-lifecycle.png)
> [sw-lifecycle-image#2](https://developers.google.com/web/fundamentals/getting-started/primers/imgs/sw-lifecycle.png)

```js
self.addEventListener('install', function(event) {
  /* precache */
});

self.addEventListener('activate', function(event) {
  /* remove old caches */
});

self.addEventListener('fetch', function(event) {
  /* handle requests */
});
```


???

install: Ideal for: CSS, images, fonts, JS, templates… basically anything you'd consider static to that "version" of your site.

activate: Ideal for: Clean-up & migration.
---
name: sw-strategies

# SW Strategies

 - Cache first
 - Network first
 - Race

---
name: examples

# Examples

[http://localhost:3000](http://localhost:3000)

![stale-while-revalidate](stale-while-revalidate.png)

???
Startsidan: nada

1: precache

2: dynamisk cache

3: cacha allt - stale while revalidate

4: trixar med responsen

5: custom 404 och offline-sida

6: save for later

---
name: to-the-stars

# To the stars and beyond

- [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [Push Notifications](https://developers.google.com/web/fundamentals/getting-started/codelabs/push-notifications/)
- [Background Sync](https://developers.google.com/web/updates/2015/12/background-sync)

---
name: links

# Links 1/2

[is serviceworker ready?](https://jakearchibald.github.io/isserviceworkerready/)

### Talks
  - [Instant-loading Offline-first](https://www.youtube.com/watch?v=qDJAz3IIq18 "Progressive Web App Summit 2016")
  - [Supercharged: Live Coding Session](https://youtu.be/X8EQSy-ajo4?list=PLNYkxOF6rcIBz9ACEQRmO9Lw8PW7vn0lr "Chrome Dev Summit 2016")

### Articles
  - [Service Workers: an Introduction (google)](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers)
  - [Service Worker API (mdn)](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
  - [Using Service Workers (mdn)](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)
  - [The Service Worker Lifecycle (google)](https://developers.google.com/web/fundamentals/instant-and-offline/service-worker/lifecycle)

---
name: links-2

# Links 2/2

### Examples
  - [The offline cookbook](https://jakearchibald.com/2014/offline-cookbook/)
  - [Service worker demos](https://github.com/jakearchibald/isserviceworkerready/tree/master/src/demos)
  - [Service Worker Recipes (chrome)](https://github.com/GoogleChrome/samples/tree/gh-pages/service-worker)
  - [The Service Worker Cookbook (mozilla)](https://serviceworke.rs/)

### Tools
  - [chrome://inspect/#service-workers](chrome://inspect/#service-workers) & [chrome://serviceworker-internals](chrome://serviceworker-internals)
  - [sw-precache](https://github.com/GoogleChrome/sw-precache) & [sw-toolbox](https://github.com/GoogleChrome/sw-toolbox)


