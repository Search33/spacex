<template>
  <div>
    <NuxtPage />
  </div>
</template>


<script setup>


useHead({
  title: 'Rocket Launches',
  link: [
    { rel: 'icon', type: "image/png", href: '/favicon.ico' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
  ],
})


</script>
<style>

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
}

html {
    scroll-behavior: smooth;
    scroll-snap-type: y mandatory;
    overflow: auto;

}


</style>