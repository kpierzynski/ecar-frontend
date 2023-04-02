import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: '/ecar-frontend/',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.js'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@Components': path.resolve(__dirname, 'src/components'),
      '@Pages': path.resolve(__dirname, 'src/components/Pages'),
      '@Stores': path.resolve(__dirname, 'src/stores'),
      '@Assets': path.resolve(__dirname, 'src/assets'),
      '@Tools': path.resolve(__dirname, 'src/tools'),
    },
  },
});
