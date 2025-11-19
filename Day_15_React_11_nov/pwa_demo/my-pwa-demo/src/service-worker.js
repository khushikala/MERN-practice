// src/service-worker.js

/* eslint-disable no-restricted-globals */
import { clientsClaim } from 'workbox-core';
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

clientsClaim();

// Precache all static assets (injected at build time)
precacheAndRoute(self.__WB_MANIFEST);

// Clean old caches
cleanupOutdatedCaches();

// Cache API and static resources (network-first for dynamic)
registerRoute(
  ({ request }) =>
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'document' ||
    request.destination === 'image',
  new StaleWhileRevalidate()
);

// Handle new service worker updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
