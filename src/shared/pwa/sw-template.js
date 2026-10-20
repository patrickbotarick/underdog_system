/* Gerado em build. Cache exclusivamente dos arquivos estáticos conhecidos. */
const CACHE_PREFIX = 'underdog-shell-';
const CACHE_NAME = CACHE_PREFIX + '__CACHE_VERSION__';
// Placeholder substituído por uma lista JSON no build.
const FILES = '__PRECACHE_FILES__';
const SAFE_NAVIGATIONS = new Set([
  '/',
  '/agendamento',
  '/consulta',
  '/produtos',
  '/acesso',
  '/previa/barbeiro',
  '/previa/barbeiro/agenda',
  '/previa/barbeiro/escala',
  '/previa/barbeiro/atendimentos',
  '/previa/barbeiro/comissoes',
  '/previa/admin',
  '/previa/admin/agendamentos',
  '/previa/admin/equipe',
  '/previa/admin/servicos',
  '/previa/admin/clientes',
  '/previa/admin/financeiro',
  '/previa/admin/estoque',
  '/previa/admin/configuracoes',
]);
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES)));
});
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (
    request.method !== 'GET' ||
    url.origin !== self.location.origin ||
    url.search ||
    request.headers.has('Authorization')
  )
    return;
  if (request.mode === 'navigate' && SAFE_NAVIGATIONS.has(url.pathname)) {
    // Nunca guardar HTML da rede: pode conter informações privadas no futuro.
    event.respondWith(
      fetch(request).catch(async () => (await caches.open(CACHE_NAME)).match('/index.html')),
    );
    return;
  }
  if (FILES.includes(url.pathname)) {
    event.respondWith(
      caches
        .open(CACHE_NAME)
        .then(async (cache) => (await cache.match(url.pathname)) || fetch(request)),
    );
  }
});
