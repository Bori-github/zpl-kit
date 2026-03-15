import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from '@rspress/core';
import { liveDemoPluginRspress } from '@live-demo/rspress';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: 'docs',
  title: 'ZPL Kit',
  description: 'ZPL Kit Documentation',
  ssg: false, // LiveDemo + @zpl-kit/react-zpl SSG 시 'react' 모듈 resolve 실패. CSR 사용.
  plugins: [
    liveDemoPluginRspress({
      includeModules: ['@zpl-kit/react-zpl'],
    }),
  ],
  builderConfig: {
    resolve: {
      alias: {
        '@zpl-kit/react-zpl': path.resolve(__dirname, '../apps/react-zpl/src/index.ts'),
      },
    },
  },
});
