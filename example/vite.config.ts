import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

// The demo site (https://brianmin.com/react-edit-text/) is built from the
// library source, so `npm run dev` gives live reload while working on src/.
export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  base: '/react-edit-text/',
  plugins: [react()],
  resolve: {
    alias: {
      'react-edit-text': fileURLToPath(
        new URL('../src/index.ts', import.meta.url)
      )
    }
  },
  build: {
    outDir: 'build',
    emptyOutDir: true
  }
});
