import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Важно: удаляем все ручные настройки имен!
    // Vite сам сделает правильные хэши (index-ab12cd.js)
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
});