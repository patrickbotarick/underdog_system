export async function registerWorker(onWaiting: (worker: ServiceWorker) => void): Promise<void> {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return;
  const registration = await navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' });
  if (registration.waiting) onWaiting(registration.waiting);
  registration.addEventListener('updatefound', () => {
    const installing = registration.installing;
    installing?.addEventListener('statechange', () => {
      if (installing.state === 'installed' && navigator.serviceWorker.controller)
        onWaiting(installing);
    });
  });
}
