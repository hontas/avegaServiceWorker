Service Workers
---------------

- postMessage
- notification
- offline
- caching assets


## Lifecycle
### Update
1. Download updated worker in background if size differs
2. Start the new one and fire `install` event
3. Enter `waiting` state, old worker still in control
4. When all pages with old worker are closed, kill old worker
5. New worker takes control - fire `activate` event

Thats why we delete old caches in `activate`

## Network strategies
### Cache static assets
### Dynamically cache assets
### Network first
### Cache first

Not cached loadtime 525 513 527 433 498 = 499,2ms
Cached loadtime     370 410 419 338 402 = 387,8ms

### Local / remote recources
1. if (url.origin !== location.origin) return;
2. if (response.type !== 'basic') return;
