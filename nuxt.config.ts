// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/content', 
    "@nuxt/image", 
    "@bootstrap-vue-next/nuxt", 
    ['unplugin-icons/nuxt', { /* options */ }]
  ],
  css: ['~/styles.scss'],
  content: {
    highlight: false,
    markdown: {
      anchorLinks: false,
    }
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width,initial-scale=1',
      title: 'Jyväskylä SummerStart',
      titleTemplate: '%s - Jyväskylä SummerStart',
      meta: [{ name: 'description', content: 'Ultimate tournament in Jyväskylä Finland organized in may each year.' }],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },
})