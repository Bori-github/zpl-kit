import { defineConfig } from 'rolldown';

export default defineConfig({
  input: 'src/index.ts',
  output: {
    format: 'es',
    dir: 'dist',
  },
  external: ['react', 'react-dom'],
});
