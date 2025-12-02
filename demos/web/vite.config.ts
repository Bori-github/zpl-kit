import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@zpl-kit/react-zpl': resolve(__dirname, '../../apps/react-zpl/src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
