const cacheName = 'image-occlusion-v1';
const staticAssets = [
  './',
  './index.html',
  './common.html',
  
  './css/fonts/Material-Icons.woff2',

  './css/index.css',
  './css/svg.select.min.css',

  './sw.js',
  './manifest.json',

  './js/combine.js',
  './js/deck-export.js',
  './js/group.js',
  './js/index.js',
  './js/normal.js',
  './js/svg.draggable.min.js',
  './js/svg.draw.min.js',
  './js/svg.min.js',
  './js/svg.resize.min.js',
  './js/svg.select.min.js',

  './py-whl/cached_property-1.5.2-py2.py3-none-any.whl',
  './py-whl/frozendict-1.2-py3-none-any.whl',
  './py-whl/genanki-0.8.0-py3-none-any.whl',
  './py-whl/pystache-0.5.4-py3-none-any.whl',
  './py-whl/PyYAML-5.3.1-cp38-cp38-win_amd64.whl',

  './pyodide/dev/full/packages.json',

  './pyodide/dev/full/pyodide.asm.js',
  './pyodide/dev/full/pyodide.asm.wasm',
  './pyodide/dev/full/pyodide.asm.data',
  './pyodide/dev/full/pyodide.asm.data.js',

  './pyodide/dev/full/pyodide-interrupts.data',
  './pyodide/dev/full/pyodide-interrupts.js',
  
  './pyodide/dev/full/micropip.js',
  './pyodide/dev/full/micropip.data',

  './pyodide/dev/full/distlib.js',
  './pyodide/dev/full/distlib.data',

  './pyodide/dev/full/pyodide.js'
];

self.addEventListener('install', async e => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
  return self.skipWaiting();
});

self.addEventListener('activate', e => {
  self.clients.claim();
});

self.addEventListener('fetch', async e => {
  const req = e.request;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    e.respondWith(cacheFirst(req));
  } else {
    e.respondWith(networkAndCache(req));
  }
});

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  return cached || fetch(req);
}

async function networkAndCache(req) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req);
    await cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(req);
    return cached;
  }
}