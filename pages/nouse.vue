<template>
    <div>
        <header>
            <nav class=" w-full flex h-56 fixed top-0 z-40 p-8 bg-contain bg-no-repeat"
                :style="{ backgroundImage: 'url(/images/cloud2-nav.png)', backgroundSize: '', backgroundRepeat: '' }">
                <div class="flex w-full items-top justify-start">
                    <NuxtLink to="/" class="text-white z-50 mb-auto p-2 bg-[#389373] border-[1px] border-black rounded-lg">
                        &lt- Launches</NuxtLink>
                </div>

            </nav>
        </header>

        <div class="mt-[20vh] ">
            <div>
                <Swiper @slideChange="onSlideChange" class="" :height="600"
                    :modules="[SwiperAutoplay, SwiperEffectCreative]" :slides-per-view="4" :spaceBetween="20" :pagination="{
                        clickable: true,
                    }" :loop="true" :speed="2000" :effect="'slide'" :autoplay="{
    delay: 5000,
    disableOnInteraction: true
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
                        <ClientOnly>
                            <!-- <KeepAlive> -->
                                <RocketModel :modelPath="slide.modelPath" class="z-0 h-[60vh]" :isVisible="isActiveSlide(idx)" />
                            <!-- </KeepAlive> -->
                        </ClientOnly>
                        <p class="absolute z-[4] bottom-0 text-base font-normal pb-1">
                            <span class="pr-2">{{ slide.name }}</span> {{ slide.height }}m <span class="pl-2">index: {{ idx
                            }}</span>
                        </p>
                        <div>
                            <p>

                            </p>
                        </div>
                    </SwiperSlide>
                    <SwiperControls class="z-50 " @sort-rockets="sortRocketsByHeight" />
                </Swiper>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const rockets = ref([
    { modelPath: '/falcon-heavy-v2.gltf', name: 'Falcon Heavy', height: 70, bg: 'rgb(216,106,96,100)', color: 'white' },
    { modelPath: '/PSLV.gltf', name: 'PSLV', height: 44, bg: 'rgb(44,86,152,100)', color: 'white' },
    { modelPath: '/soyuz2-v2.gltf', name: 'Soyuz-2', height: 46.3, bg: 'rgb(75,167,187,100)', color: 'white' },
    { modelPath: '/atlasV.gltf', name: 'Atlas V', height: 58.3, bg: 'rgb(20,34,74,100)', color: 'white' },
    { modelPath: '/Antares.gltf', name: 'Antares', height: 42.5, bg: 'rgb(34,137,117,100)', color: 'white' },
    { modelPath: '/ceres1_2.gltf', name: 'Ceres-1', height: 20, bg: 'rgb(49,117,157,100)', color: 'white' },
    { modelPath: '/starship.gltf', name: 'Starship', height: 120, bg: 'rgb(64,201,166,100)', color: 'black' },
    { modelPath: '/long-march-2c.gltf', name: 'Long March 2c', height: 42, bg: 'rgb(131,72,105,100)', color: 'white' },
    { modelPath: '/long-march-3b.gltf', name: 'Long March 3b', height: 54.8, bg: 'rgb(71,109,198,100)', color: 'white' },
    { modelPath: '/long-march-4c.gltf', name: 'Long March 4c', height: 45.8, bg: 'rgb(114,98,150,100)', color: 'white' },
    { modelPath: '/H-IIA.gltf', name: 'H-IIA', height: 53, bg: 'rgb(38,84,92,100)', color: 'white' },
    { modelPath: '/LVM3.gltf', name: 'LVM3 Est:', height: 53, bg: 'rgb(44,138,186,100)', color: 'white' },
    { modelPath: '/falcon9-v2.gltf', name: 'Falcon 9', height: 70, bg: 'rgb(133,214,157,100)', color: 'black' },
    { modelPath: '/electron-v2.gltf', name: 'Electron', height: 18, bg: 'rgb(217,152,125,100)', color: 'white' },
    { modelPath: '/spaceshiptwo.gltf', name: 'SpaceShipTwo', height: 5.5, bg: 'rgb(71,128,148,100)', color: 'white' },
    // {modelPath: '/Zhuque-2.gltf', name: 'Zhuque-2', height: 49.5, bg: 'rgb(71,128,148,100)', color: 'white' },
    // { modelPath: '/long-march-2d.gltf', name: 'Long March 2d', height: 41, bg: 'rgb(38,84,92,100)', color: 'white' },
    // { modelPath: '/long-march-2f.gltf', name: 'Long March 2f', height: 62, bg: 'rgb(38,84,92,100)', color: 'white' },
    // ... other slides
]);

const activeSlideIndex = ref(0);

function onSlideChange(swiper: any) {
    console.log('swiper activeIndex', swiper.activeIndex);
    console.log('swiper realIndex', swiper.realIndex);
    activeSlideIndex.value = swiper.realIndex; // or swiper.realIndex, depending on which one gives the correct index
}

const isActiveSlide = (index: number) => {
    const totalSlides = rockets.value.length;
    const current = activeSlideIndex.value;
    
    const mod = (n: number, m: number) => (n % m + m) % m;

    const slidesPerView = 4;  // Number of slides visible at once
    const preloadedRange = 1;

    // Calculate the range of active indices considering looping
    let activeIndices = [];
    for (let i = -preloadedRange; i <= slidesPerView; i++) {
        let calcIndex = mod(current + i, totalSlides);
        activeIndices.push(calcIndex);
    }

    const isActive = activeIndices.includes(index);

    if (isActive) {
        console.log(`Active Slide - Index: ${index}, Name: ${rockets.value[index].name}`);
    }

    return isActive;
};

const sortRocketsByHeight = () => {
    rockets.value.sort((a, b) => a.height - b.height);
};

function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
        [array[i], array[j]] = [array[j], array[i]]; // swap elements
    }
}
onMounted(() => {
    shuffleArray(rockets.value);
})

const combinedSlides = computed(() => rockets.value.map(rocket => ({
    ...rocket,
    // component: rocket.component,
    name: rocket.name
})));


</script>

<style scoped>
.swiper-slide {
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
}</style>