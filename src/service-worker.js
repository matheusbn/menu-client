const CACHE_NAME = 'static-cache-v1';
const DATA_CACHE_NAME = 'data-cache-v1';

const FILES_TO_CACHE = [
  '/',
  '/app.bundle.js',
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
      .catch(e => console.error("on install:", e))
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
          .catch(e => console.error("on fetch:", e))
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
        .catch(e => console.error("on activate:", e))
    })
  )
})


function shouldCache(e) {
  if (
    /https:\/\/fonts\.googleapis\.com/.test(e.request.url)
  ) return true

  return false
}
