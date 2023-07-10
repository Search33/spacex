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