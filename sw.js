const VERSION='v2.19';
const BUILD='1791097656';
const CACHE='delivery-pilot-'+VERSION+'-'+BUILD;
const CORE=['./','./index.html?v=2.19&b=1791097656','./manifest.json','./sw.js?v=2.19&b=1791097656'];

self.addEventListener('install',event=>{
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then(cache=>cache.addAll(CORE)).catch(()=>{})
  );
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('message',event=>{
  if(event.data && event.data.type==='SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET') return;

  // HTML/navigationは常にネット優先。最新版の反映遅延を防ぐ。
  if(req.mode==='navigate' || req.destination==='document'){
    event.respondWith(
      fetch(req,{cache:'no-store'})
        .then(res=>{
          const copy=res.clone();
          caches.open(CACHE).then(c=>c.put(req,copy));
          return res;
        })
        .catch(()=>caches.match(req).then(r=>r||caches.match('./index.html?v=2.19&b=1791097656')))
    );
    return;
  }

  // その他はネット優先＋キャッシュ。
  event.respondWith(
    fetch(req,{cache:'no-store'})
      .then(res=>{
        const copy=res.clone();
        caches.open(CACHE).then(c=>c.put(req,copy));
        return res;
      })
      .catch(()=>caches.match(req))
  );
});
