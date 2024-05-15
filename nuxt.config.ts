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
  }
})