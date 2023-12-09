<script setup lang="ts">
const swiper = useSwiper()

const isAutoplaying = ref(true)

const emit = defineEmits(['sortRockets'])

const emitSortRockets = () => {
    emit('sortRockets');
    if (swiper.value) {
        swiper.value.slideTo(0);
    }
    // swiper.slideTo(0);
};

const toggleAutoplay = () => {
    if (swiper.value) {
        if (isAutoplaying.value) {
            swiper.value.autoplay.stop();
        } else {
            swiper.value.autoplay.start();
        }
    }
    isAutoplaying.value = !isAutoplaying.value;
}
</script>

<template>
    <div class=" items-center grid grid-cols-11 pt-10 ">

        <button @click="emitSortRockets" class="pointer-events-auto  col-start-2 col-span-2 flex items-center justify-center hover:bg-[#90c5b5] py-2 bg-[#a4dfcd] border-[1px] border-black  rounded-lg">
            Sort by height
            
        </button>


        <div class="flex flex-grow col-start-5 col-span-3 items-center justify-center ">
            <button @click="swiper.slidePrev()"
                class="p-6 mr-4 py-4 border-[1px] border-[#131313] bg-[#389373] hover:bg-[#983445] text-white rounded-full">&lt</button>
            <button @click="toggleAutoplay"
                class="p-6 py-4 border-[1px] border-[#131313] bg-[#414d49] hover:bg-[#983445] text-white rounded-full"> {{
                    isAutoplaying ? '||' : '| >' }}</button>
            <button @click="swiper.slideNext()"
                class="p-6 ml-4 py-4 border-[1px] border-[#131313] bg-[#389373] hover:bg-[#983445] text-white rounded-full">&gt</button>
        </div>

        <!-- <div class="w-[180px] invisible"></div> -->


    </div>
</template>

<style scoped>button:active {
    background-color: #6C232F;
}</style>