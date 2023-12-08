<template>
    <div>
        <header>
            <nav class=" w-full flex h-56 fixed top-0 z-40 p-8 bg-contain bg-no-repeat"
                :style="{ backgroundImage: 'url(/images/cloud2-nav.png)', backgroundSize: '', backgroundRepeat: '' }">
                <div class="flex w-full items-top justify-start">
                    <NuxtLink to="/" class="text-white z-50 mb-auto p-2 bg-[#389373] border-[1px] border-black rounded-lg">&lt- Launches</NuxtLink>
                </div>

            </nav>
        </header>

        <!-- <div class="mt-[20vh] ">
            <div>
                <Swiper class="" :height="600" :modules="[SwiperAutoplay, SwiperEffectCreative]" :slides-per-view="4"
                    :spaceBetween="20" :pagination="{
                        clickable: true,
                    }" :loop="true" :speed="2000" :effect="'slide'" :autoplay="{
    delay: 5000,
    disableOnInteraction: false
}" :creative-effect="{
    prev: {
        shadow: false,
        translate: ['-20%', 0, -1]
    },
    next: {
        translate: ['100%', 0, 0]
    }
}">

                    <SwiperSlide v-for="(slide, idx) in combinedSlides" :key="idx"
                        class="relative rounded-lg border-[1px]  border-black overflow-hidden"
                        :style="`background-color: ${slide.bg}; color: ${slide.color}`">
                        <ClientOnly >
                            <component :is="slide.component" class="z-0 max-h-[450px]" />
                        </ClientOnly>
                        <p class="absolute bottom-0 text-base font-normal pb-1">
                            {{ slide.name }} {{ slide.height }}m
                        </p>
                        <div>
                            <p>

                            </p>
                        </div>
                    </SwiperSlide>
                    <SwiperControls class="z-50 " @sort-rockets="sortRocketsByHeight" />
                </Swiper>
                
            </div>
        </div> -->
    </div>
</template>

<script setup lang="ts">

// function lazyLoadComponent(name: String) {
//     return defineAsyncComponent(() => import(`~/components/${name}.vue`));
// }

// const LazyAntares = lazyLoadComponent('Antares');
// const LazyAtlasV = lazyLoadComponent('AtlasV');
// const LazyCeres1 = lazyLoadComponent('Ceres1');
// const LazyElectron = lazyLoadComponent('Electron');
// const LazyFalcon9 = lazyLoadComponent('Falcon9');
// const LazyFalconHeavy = lazyLoadComponent('FalconHeavy');
// const LazyGSLVIII = lazyLoadComponent('GSLVIII');
// const LazyHIIA = lazyLoadComponent('H-IIA');
// const LazyLongMarch2c = lazyLoadComponent('LongMarch2c');
// const LazyLongMarch3b = lazyLoadComponent('LongMarch3b');
// const LazyLongMarch4c = lazyLoadComponent('LongMarch4c');
// const LazyPSLV = lazyLoadComponent('PSLV');
// const LazySoyuz2 = lazyLoadComponent('Soyuz2');
// const LazySpaceShipTwo = lazyLoadComponent('SpaceShipTwo');
// const LazyStarship = lazyLoadComponent('Starship');

// const rockets = ref([
//     { component: LazyFalconHeavy, name: 'Falcon Heavy', height: 70, bg: 'rgb(216,106,96,100)', color: 'white' },
//     { component: LazyPSLV, name: 'PSLV', height: 44, bg: 'rgb(44,86,152,100)', color: 'white' },
//     { component: LazySoyuz2, name: 'Soyuz-2', height: 46.3, bg: 'rgb(75,167,187,100)', color: 'white' },
//     { component: LazyAtlasV, name: 'Atlas V', height: 58.3, bg: 'rgb(20,34,74,100)', color: 'white' },
//     { component: LazyAntares, name: 'Antares', height: 42.5, bg: 'rgb(34,137,117,100)', color: 'white' },
//     { component: LazyCeres1, name: 'Ceres-1', height: 20, bg: 'rgb(49,117,157,100)', color: 'white' },
//     { component: LazyStarship, name: 'Starship', height: 120, bg: 'rgb(64,201,166,100)', color: 'black' },
//     { component: LazyLongMarch2c, name: 'Long March 2c', height: 42, bg: 'rgb(131,72,105,100)', color: 'white' },
//     { component: LazyLongMarch3b, name: 'Long March 3b', height: 54.8, bg: 'rgb(71,109,198,100)', color: 'white' },
//     { component: LazyLongMarch4c, name: 'Long March 4c', height: 45.8, bg: 'rgb(114,98,150,100)', color: 'white' },
//     { component: LazyHIIA, name: 'H-IIA', height: 53, bg: 'rgb(38,84,92,100)', color: 'white' },
//     { component: LazyGSLVIII, name: 'LVM3', height: 43.4, bg: 'rgb(44,138,186,100)', color: 'white' },
//     { component: LazyFalcon9, name: 'Falcon 9', height: 70, bg: 'rgb(133,214,157,100)', color: 'black' },
//     { component: LazyElectron, name: 'Electron', height: 18, bg: 'rgb(217,152,125,100)', color: 'white' },
//     { component: LazySpaceShipTwo, name: 'SpaceShipTwo', height: 5.5, bg: 'rgb(71,128,148,100)', color: 'white' },
//     // ... other slides
// ]);


// const sortRocketsByHeight = () => {

//     rockets.value.sort((a, b) => a.height - b.height);
//     combinedSlides.value = rockets.value.map(rocket => ({ ...rocket }));

// };


// function shuffleArray(array: any[]) {
//   for (let i = array.length - 1; i > 0; i--) {
//       let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
//       [array[i], array[j]] = [array[j], array[i]]; // swap elements
//   }
// }
// shuffleArray(rockets.value);

// const combinedSlides = ref(rockets.value.map(rocket => ({
//     ...rocket,
//     component: rocket.component,
//     name: rocket.name
// })));


</script>

<style scoped>
/* .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1px;
    height: 60vh;
    font-size: 4rem;
    font-weight: bold;
    font-family: 'Roboto', sans-serif;
}

.swiper-wrapper {
    min-width: 100vh;
    width: 100vh;
}

.swiper-cards {
    width: 240px;
    height: 240px;
}

.swiper-cards .swiper-slide {
    border-radius: 6px;
    border: 1px solid black;
} */
</style>