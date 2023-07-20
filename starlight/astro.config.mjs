import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  site: 'https://github.com/llewellyn-sl',
  base: '/writer-onboarding',
  integrations: [
    starlight({
      title: 'Seqera Writer Internal KB',
      social: {
        github: 'https://github.com/withastro/starlight',
      },
      sidebar: [
        {
          label: 'Guides',
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'Tower MkDocs project', link: '/guides/tower-docs/mkdocs.md',
              label: 'Publish Tower docs', link: '/guides/tower-docs/publish.md',
              label: 'Style elements', link: '/guides/tower-docs/style.md' },
          ],
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
      ],
    }),
  ],

  // Process images with sharp: https://docs.astro.build/en/guides/assets/#using-sharp
  image: { service: { entrypoint: 'astro/assets/services/sharp' } },
});
