import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: 'docs',
  title: 'ZPL Kit',
  description: 'ZPL Kit Documentation',
  themeConfig: {
    nav: [
      {
        text: 'Guide',
        link: '/guide/introduction',
      },
    ],
    sidebar: {
      '/': [
        {
          text: 'Getting Started',
          items: [
            {
              text: 'Introduction',
              link: '/guide/introduction',
            },
            {
              text: 'Getting Started',
              link: '/guide/getting-started',
            },
          ],
        },
        {
          text: 'ZPL Commands',
          items: [
            {
              text: 'Reference',
              link: '/zpl-commands/reference',
            },
          ],
        },
      ],
    },
  },
});
