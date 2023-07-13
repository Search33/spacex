// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true }
  modules: ['@nuxtjs/tailwindcss', 'nuxt-scheduler'],
  build: {
    transpile: ['gsap']
  },
  plugins: [{ src: '~/plugins/vercel.ts', mode: 'client' }],

})
