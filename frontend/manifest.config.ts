import { defineManifest } from '@crxjs/vite-plugin';

export default defineManifest({
  manifest_version: 3,
  name: 'To-Do List',
  version: '1.0.0',
  description:
    'A simple to-do list that syncs with your local NestJS + PostgreSQL backend.',
  action: {
    default_popup: 'index.html',
    default_title: 'To-Do List',
    default_icon: {
      '16': 'icons/icon16.png',
      '48': 'icons/icon48.png',
      '128': 'icons/icon128.png',
    },
  },
  icons: {
    '16': 'icons/icon16.png',
    '48': 'icons/icon48.png',
    '128': 'icons/icon128.png',
  },
  host_permissions: ['http://localhost:3000/*'],
});
