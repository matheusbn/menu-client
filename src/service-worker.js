const CACHE_NAME = 'static-cache-v4';
const DATA_CACHE_NAME = 'data-cache-v4';

const FILES_TO_CACHE = [
  '/',
  '/bundle.js',
  '/manifest.json',
  '/index.html',
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png',
]

self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install')
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[Service Worker] Caching all files')
      return cache.addAll(FILES_TO_CACHE)
    })
  )
})

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(result => {
      if(result) {
        return result
      }

      return fetch(e.request).then(response => {
        return caches.open(DATA_CACHE_NAME).then(cache => {
          if (shouldCache(e)) {
            console.log('[Service Worker] Fetching and caching:', e.request)
            cache.put(e.request, response.clone())
          }
          return response
        })
      })
    })
  )
})

self.addEventListener('activate', (e) => {
  console.log('[Service Worker] Activate')
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if(key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
          return caches.delete(key)
        }
      }))
    })
  )
})


function shouldCache(e) {
  if (
    /https:\/\/fonts\.googleapis\.com/.test(e.request.url)
  ) return true

  return false
}
