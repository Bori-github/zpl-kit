import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from '@rspress/core';
import { liveDemoPluginRspress } from '@live-demo/rspress';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: 'docs',
  globalStyles: path.join(__dirname, 'styles/index.css'),
  base: '/zpl-kit/',
  title: '@zpl-kit',
  description: '@zpl-kit Documentation',
  ssg: false, // LiveDemo + @zpl-kit/react-zpl SSG 시 'react' 모듈 resolve 실패. CSR 사용.
  head: [
    // 기본 메타
    ['meta', { name: 'keywords', content: 'ZPL, Zebra, label, react, typescript, zpl-kit' }],
    ['meta', { name: 'author', content: 'zpl-kit contributors' }],
    // OpenGraph
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: '@zpl-kit' }],
    ['meta', { property: 'og:title', content: '@zpl-kit — Composable ZPL for modern JavaScript' }],
    ['meta', { property: 'og:description', content: 'Core primitives for Node.js, declarative components for React. Build and preview ZPL labels.' }],
    ['meta', { property: 'og:url', content: 'https://boriguri.github.io/zpl-kit/' }],
    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:title', content: '@zpl-kit — Composable ZPL for modern JavaScript' }],
    ['meta', { name: 'twitter:description', content: 'Core primitives for Node.js, declarative components for React. Build and preview ZPL labels.' }],
  ],
  themeConfig: {
    socialLinks: [
      { icon: 'github', mode: 'link', content: 'https://github.com/Bori-github/zpl-kit' },
    ],
  },
  plugins: [
    liveDemoPluginRspress({
      includeModules: ['@zpl-kit/react-zpl', '@zpl-kit/zpl-core'],
    }),
  ],
  builderConfig: {
    resolve: {
      alias: {
        '@zpl-kit/react-zpl': path.resolve(
          __dirname,
          '../apps/react-zpl/src/index.ts'
        ),
        '@zpl-kit/zpl-core': path.resolve(
          __dirname,
          '../apps/zpl-core/src/index.ts'
        ),
      },
    },
  },
});
