const CACHE_NAME = 'animal-feeding-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/style.css', // もしあれば、プロジェクトのCSSファイル名に置き換えてください
  '/main.js',   // もしあれば、プロジェクトのJavaScriptファイル名に置き換えてください
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
