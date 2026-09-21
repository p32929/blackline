const C = 'blackline-v1';
const SHELL = ['./','./index.html','./manifest.webmanifest','./vendor/pdf.min.mjs','./vendor/pdf.worker.min.mjs','./vendor/pdf-lib.min.js'];
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(C).then(c => c.addAll(SHELL)).catch(()=>{})); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== C).map(x => caches.delete(x))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  // licence checks must never be answered from cache
  if (u.hostname !== location.hostname) return;
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
