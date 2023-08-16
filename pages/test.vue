<template>
    <div>
        <header>
            <nav class=" w-full flex h-56 fixed top-0 z-40 p-8 bg-contain bg-no-repeat"
                :style="{ backgroundImage: 'url(/images/cloud2-nav.png)', backgroundSize: '', backgroundRepeat: '' }">
                <NuxtLink to="/">home</NuxtLink>
            </nav>
        </header>


        <swiper-container slides-per-view="3" speed="500" loop="true" css-mode="true">
            <swiper-slide>Slide 1</swiper-slide>
            <swiper-slide>Slide 2</swiper-slide>
            <swiper-slide>Slide 3</swiper-slide>
            ...
        </swiper-container>
        <!-- <div class="flex h-[95vh] justify-end items-end  relative ">

                <swiper 
                    :slidesPerView="3" 
                    :spaceBetween="30" 
                    :navigation="true"
                    :modules="modules"
                    class="mySwiper">
                    <swiper-slide>
                        <ClientOnly>
                            <LazyFalcon9 />
                        </ClientOnly>
                    </swiper-slide>
                    <swiper-slide>
                        <ClientOnly>
                            <LazyFalconHeavy />
                        </ClientOnly>
                    </swiper-slide>
                    <swiper-slide>Slide 3</swiper-slide>
                    <swiper-slide>Slide 4</swiper-slide><swiper-slide>Slide 5</swiper-slide>
                    <swiper-slide>Slide 6</swiper-slide><swiper-slide>Slide 7</swiper-slide>
                    <swiper-slide>Slide 8</swiper-slide><swiper-slide>Slide 9</swiper-slide>
                </swiper>
        </div>  -->
    </div>
</template>

<script setup lang="ts">

import { register } from 'swiper/element/bundle';

register();



// import { Swiper, SwiperSlide } from 'swiper/vue'

// import 'swiper/css'
// import 'swiper/css/navigation'


// import { Navigation } from 'swiper/modules'

// export default {
//     components: {
//       Swiper,
//       SwiperSlide,
//     },
//     setup() {
//       return {
//         modules: [Navigation],
//       };
//     },
//   };

// onMounted(() => {

//     const swiper = new Swiper('.swiper')
// })



</script>

<style scoped>
.swiper-button-next::after {
    color: brown;
}

.swiper-button-prev::after {
    color: chartreuse;
}

.swiper-slide {
    text-align: center;
    font-size: 18px;
    /* background: #fff; */

    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
}

.swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>