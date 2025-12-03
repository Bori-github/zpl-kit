import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      target: 'node20'
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      target: 'node20'
    }
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@zpl-kit/react-zpl': resolve('../../apps/react-zpl/src')
      }
    },
    plugins: [react()],
    build: {
      target: 'esnext',
      commonjsOptions: {
        transformMixedEsModules: true
      }
    },
    optimizeDeps: {
      include: ['react', 'react-dom'],
      esbuildOptions: {
        target: 'esnext'
      }
    }
  }
})
