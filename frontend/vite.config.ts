import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.config';

const isExtension = process.env.BUILD_TARGET === 'extension';

export default defineConfig({
  plugins: [
    react(),
    ...(isExtension ? [crx({ manifest })] : []),
  ],
  ...(isExtension
    ? {
        build: {
          rollupOptions: {
            input: { popup: 'index.html' },
          },
        },
      }
    : {}),
});
