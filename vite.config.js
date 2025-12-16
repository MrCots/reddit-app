/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://www.reddit.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  /**
   * Vitest configuration.
   * We are using Vitest and React Testing Library for our unit tests.
   * This is the modern standard for testing React applications built with Vite,
   * offering better performance and integration than older tools like Jest and Enzyme.
   */
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setupTests.js',
    // Exclude Playwright E2E tests from the Vitest runner
    exclude: ['**/node_modules/**', '**/tests/**'],
  },
});