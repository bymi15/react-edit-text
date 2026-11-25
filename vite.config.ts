/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    // Classic runtime keeps the output compatible with every React version in
    // the peer range (>=16.8), including those without `react/jsx-runtime`.
    react({ jsxRuntime: 'classic' }),
    dts({
      tsconfigPath: './tsconfig.build.json',
      bundleTypes: true
    })
  ],
  css: {
    modules: {
      generateScopedName: 'ret_[local]_[hash:base64:5]'
    }
  },
  build: {
    sourcemap: true,
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.mjs' : 'index.cjs'),
      cssFileName: 'index'
    },
    rolldownOptions: {
      external: ['react', 'react-dom', /^react\//]
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/test/**', 'src/**/*.test.{ts,tsx}'],
      reporter: ['text', 'json-summary', 'json'],
      reportOnFailure: true,
      thresholds: {
        lines: 90,
        branches: 90,
        functions: 90,
        statements: 90
      }
    }
  }
});
