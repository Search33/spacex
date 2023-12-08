<template>
  <div>
    <NuxtPage />

  </div>
</template>


<script setup>
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';


gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

useHead({
    title: 'Rocket Launches',
    meta: [
      { name: 'msapplication-TileColor', content: '#da532c' },
      { name: 'theme-color', content: '#ffffff'}
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/public/favicon.ico'},
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/public/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/public/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/public/favicon-16x16.png' },
      { rel: 'manifest', href: '/public/site.webmanifest' },
      { rel: 'mask-icon', href: '/public/safari-pinned-tab.svg', color: '#5bbad5' }

    ]
})

</script>
<style>

:root {
  --gradient-start:  #5BC9D7;
  --gradient-end: #0a3c42;
}


/* body::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  z-index: -1;
  background: linear-gradient(to bottom, var(--gradient-start), var(--gradient-end));
} */

body::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  z-index: -1;
  background: linear-gradient(to bottom, #0a3c42, #5BC9D7);
}

/* 2f7781 */

html {
    scroll-behavior: smooth;
    scroll-snap-type: y mandatory;
    overflow: auto;

}


</style>