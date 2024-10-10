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
  link: [
    { rel: 'icon', type: "image/png", href: '/favicon.ico' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
  ],
})


</script>
<style>

/* :root {
  --gradient-start:  #E4E3F4;
  --gradient-end: #143F61;
} */
/* :root {
  --gradient-start:  #5BC9D7;
  --gradient-end: #0a3c42;
} */


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
  background: linear-gradient(
    to bottom,
    #1e3c5a 0%,
    #294A67FF 20%,
    #436e8e 40%,
    #6C9AB3 60%,
    #b0c0cd 80%,
    #E8F0F6FF 100%
  );
  /* background: linear-gradient(to bottom, #143F61, #BED3DB); */
}

/* 2f7781 */

html {
    scroll-behavior: smooth;
    scroll-snap-type: y mandatory;
    overflow: auto;

}


</style>