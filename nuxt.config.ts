// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true }
  modules: ['@nuxtjs/tailwindcss', 'nuxt-scheduler', 'nuxt-swiper'],
  build: {
    transpile: ['gsap']
  },
  app: {
    head: {
           link: [{ rel: 'icon', type: 'image/png', href: "/favicon.ico" }]
        }
   }

})
