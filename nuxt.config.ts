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
   },
   tailwindcss: {
    config: {
      content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
      ],
      theme: {
        extend: {
          screens: {
            'iphone-se': '375px',
            'iphone-xr': '414px',
            'iphone-12': '390px',
            'iphone-12-pro-max': '428px',
          }
        }
      }
    }
  }

})
