// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@bootstrap-vue-next/nuxt',
    ['unplugin-icons/nuxt', { /* options */ }],
  ],
  css: ['~/styles.scss'],
  content: {
    build: {
      markdown: {
        highlight: false,
        toc: {
          depth: 3,
          searchDepth: 3,
        },
      },
    },
    renderer: {
      anchorLinks: false,
    },
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width,initial-scale=1',
      title: 'Jyväskylä SummerStart',
      titleTemplate: '%s - Jyväskylä SummerStart',
      meta: [{ name: 'description', content: 'Ultimate tournament in Jyväskylä Finland organized in may each year.' }],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href: 'https://static.nrk.no/nrk-sans/latest/nrk-sans.min.css' },
      ],
    },
    keepalive: true,
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          charset: false,
          silenceDeprecations: ['mixed-decls', 'color-functions', 'global-builtin', 'import'],
        },
      },
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },
  compatibilityDate: '2025-06-05',
  ssr: false,
})
