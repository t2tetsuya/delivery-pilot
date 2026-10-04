const CACHE = 'delivery-pilot-v2-10';
const CORE = ['./', './index.html', './manifest.json'];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(CORE)).catch(() => {})
  );
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // HTML/navigation is network-first so GitHub Pages updates show immediately.
  if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req, {cache:'no-store'});
        const cache = await caches.open(CACHE);
        cache.put('./index.html', fresh.clone()).catch(()=>{});
        return fresh;
      } catch (e) {
        return (await caches.match('./index.html')) || (await caches.match('./'));
      }
    })());
    return;
  }

  // Other local assets: network first, cache fallback.
  event.respondWith((async () => {
    try {
      const fresh = await fetch(req, {cache:'no-store'});
      if (new URL(req.url).origin === self.location.origin) {
        const cache = await caches.open(CACHE);
        cache.put(req, fresh.clone()).catch(()=>{});
      }
      return fresh;
    } catch (e) {
      return (await caches.match(req)) || Response.error();
    }
  })());
});
