<script setup lang="ts">
const swiper = useSwiper()
</script>

<template>
    <div class="flex items-center justify-center pt-10">
        <button @click="swiper.slidePrev()" class="p-6 mr-4 py-4 border-[1px] border-[#131313] bg-[#389373] hover:bg-[#983445] text-white rounded-full">&lt</button>
        <!-- <div class="p-4"></div> -->
        <button @click="swiper.slideNext()" class="p-6 ml-4 py-4 border-[1px] border-[#131313] bg-[#389373] hover:bg-[#983445] text-white rounded-full">&gt</button>

    </div>
</template>

<style scoped>

button:active {
    background-color: #6C232F;
}

</style>