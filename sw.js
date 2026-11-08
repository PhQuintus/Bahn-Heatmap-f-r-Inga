// Schienenspuren – Service Worker: immer die neueste Version laden, offline die zuletzt geladene zeigen
const CACHE='schienenspuren';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  if(e.request.mode!=='navigate') return;
  e.respondWith(fetch(e.request).then(r=>{ const c=r.clone(); caches.open(CACHE).then(x=>x.put('./',c)); return r; }).catch(()=>caches.match('./')));
});
