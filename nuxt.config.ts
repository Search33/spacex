// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true }
  modules: ['@nuxtjs/tailwindcss', 'nuxt-scheduler'],
  plugins: [{ src: '~/plugins/vercel.ts', mode: 'client' }],
  build: {
    transpile: ['gsap']
  }

})
