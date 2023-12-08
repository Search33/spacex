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
    <div class="flex items-center justify-center pt-10">
        <button @click="swiper.slidePrev()"
            class="p-6 mr-4 py-4 border-[1px] border-[#131313] bg-[#389373] hover:bg-[#983445] text-white rounded-full">&lt</button>
        <button @click="swiper.slideNext()"
            class="p-6 ml-4 py-4 border-[1px] border-[#131313] bg-[#389373] hover:bg-[#983445] text-white rounded-full">&gt</button>

    </div>
    <div>
        <button @click="toggleAutoplay"> {{ isAutoplaying ? 'yes' : 'no' }}

        </button>
    </div>
    <div class="bg-gray-300">
        <div class="">
            <button @click="emitSortRockets">Sort by height
            </button>
        </div>
    </div>
</template>

<style scoped>
button:active {
    background-color: #6C232F;
}
</style>