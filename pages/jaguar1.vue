<template>
    <div>
        <header>
            <nav class=" w-full flex h-56 top-0 z-20 bg-contain bg-no-repeat"
                :style="{ backgroundImage: 'url(/images/cloud2-nav.png)', backgroundSize: '', backgroundRepeat: '' }">
                <div class="flex w-full items-top justify-start p-8">
                    <NuxtLink to="/" class="text-white z-50 mb-auto p-2 bg-[#389373] border-[1px] border-black rounded-lg">
                        &lt- Launches</NuxtLink>
                </div>
            </nav>
        </header>

        <div class=" z-[50] flex w-full items-bottom justify-between pr-4 pb-4">

            <NuxtLink to="rockets2" class="w-[134px] mb-auto p-3 text-sm code-font text-[#ddd] rounded-xl">
                <!-- Next Page 🚀 -&gt -->
            </NuxtLink>
            <RocketFilters :rockets="rockets" @update-rockets="updateDisplayedRockets" />
            <NuxtLink to="rockets2" class="w-[134px] mb-auto p-3 bg-[#292929] text-sm code-font text-[#ddd] rounded-xl">
                Next Page 🚀 -&gt
            </NuxtLink>

        </div>

        <div class=" grid grid-cols-4 gap-5 py-4 ">
            <div v-for="(rocket, idx) in combinedSlides" :key="`model-${rocket.name}-${rocket.height}`"
                class="relative flex flex-col justify-center items-center h-[60vh] rounded-lg border-[1px]  border-black overflow-hidden"
                :style="`background-color: ${rocket.bg}; color: ${rocket.color}`">
                <ClientOnly>
                    <LazyRocketModel :fov="rocket.fov" :camY="rocket.camY" :camZ="rocket.camZ" :modelPath="rocket.modelPath" :key="`model-${rocket.name}-${rocket.height}`"
                        class="z-0 h-[40vh]" />
                </ClientOnly>
                <p class="absolute z-[4] flex flex-col items-center top-0 text-base font-normal pt-3">
                    <span class="pr-2 text-4xl cool-font" :style="rocket.textStyle">
                        {{ rocket.name }}
                    </span>
                    <span>{{ rocket.height }}m</span>
                    <!-- <span class="pl-2">index: 
                        {{ idx }}
                    </span> -->
                </p>
            </div>
        </div>
        <div>
            <div class="grid grid-cols-7 w-full items-center pr-4 pb-4">
                <p v-if="hasSpaceShipTwo" class="col-start-1 col-span-2 pl-3">SpaceShipTwo model by <span><a
                            href="https://sketchfab.com/3d-models/virgin-galactic-spaceshiptwo-95716fb34847496eafa5bfb39fcd9c00"
                            target="_blank" class="underline">agreene</a></span></p>
                <NuxtLink to="rockets2" class="col-start-7 ml-auto mb-auto p-3 bg-[#292929] text-sm code-font text-[#ddd] rounded-xl">Next Page
                    🚀 -&gt</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const rockets = ref([
    {
        modelPath: '/falcon-heavy-v2.gltf', fov: 75, camY: 4, camZ: 10, name: 'Falcon Heavy', height: 70, country: 'USA', bg: '#D86A60', color: 'white',
        styles: ['linear-gradient(45deg, #FFC371, #FF6F5F)', '#F0F74D', '#52EAD1', '#863227']
    },
    {
        modelPath: '/PSLV.gltf', fov: 75, camY: 4, camZ: 10, name: 'PSLV', height: 44, country: 'India', bg: '#2C5698', color: 'white',
        styles: ['linear-gradient(45deg, #FD9609, #E1C438)', '#89ACE1']
    },

    {
        modelPath: '/soyuz2-v2.gltf', fov: 75, camY: 4, camZ: 10, name: 'Soyuz-2', height: 46.3,  country: 'Russia', bg: 'rgb(75,167,187,100)', color: 'white',
        styles: ['#F7DE03', '#73D38D']
    },
    {
        modelPath: '/atlasV.gltf', fov: 75, camY: 4, camZ: 10, name: 'Atlas V', height: 58.3,  country: 'USA', bg: 'rgb(20,34,74,100)', color: 'white',
        styles: ['linear-gradient(45deg, #024DB2, #5D99FE)', 'linear-gradient(45deg, #FFC47A, #9C5403)', '#F45BA0']
    },

    {
        modelPath: '/Antares.gltf', fov: 75, camY: 4, camZ: 10, name: 'Antares', height: 42.5, country: 'USA', bg: 'rgb(34,137,117,100)', color: 'white',
        styles: ['#3DD690', '#ffffff']
    },
    {
        modelPath: '/ceres1_2.gltf', fov: 45, camY: 4, camZ: 10, name: 'Ceres-1', height: 20, country: 'China', bg: 'rgb(49,117,157,100)', color: 'white',
        styles: ['#71CECF']
    },
    // {   modelPath: '/starship.gltf', fov: 70, camY: 8, camZ: 18, name: 'Starship', height: 120, bg: 'rgb(227,217,133,100)', color: 'black',
    {
        modelPath: '/starship.gltf', fov: 70, camY: 8, camZ: 18, name: 'Starship', height: 120, country: 'USA', bg: '#21457E', color: 'white',
        styles: ['#8F84E8', 'linear-gradient(180deg, #FF718D, #A30808)', 'linear-gradient(270deg, #9971FF, #B69DF5)']
    },
    {
        modelPath: '/long-march-2c.gltf', fov: 75, camY: 4, camZ: 10, name: 'Long March 2c', height: 42, country: 'China', bg: 'rgb(131,72,105,100)', color: 'white',
        styles: ['#4F0E1F', '#FE81C8', '#D6D77F']
    },
    {
        modelPath: '/long-march-3b.gltf', fov: 75, camY: 4, camZ: 10, name: 'Long March 3b', height: 54.8, country: 'China', bg: 'rgb(71,109,198,100)', color: 'white',
        styles: ['#15DAB7']
    },
    {
        modelPath: '/long-march-4c.gltf', fov: 75, camY: 4, camZ: 10, name: 'Long March 4c', height: 45.8, country: 'China', bg: 'rgb(114,98,150,100)', color: 'white',
        styles: ['#FD4898', '#F9AF4D']
    },
    {
        modelPath: '/H-IIA.gltf', fov: 75, camY: 4, camZ: 10, name: 'H-IIA', height: 53, country: 'Japan', bg: 'rgb(38,84,92,100)', color: 'white',
        styles: ['linear-gradient(150deg, #74FFDF, #06B088)', '#E5B169']
    },
    {
        modelPath: '/LVM3.gltf', fov: 75, camY: 4, camZ: 10, name: 'HLVM3', height: 53, country: 'India', bg: 'rgb(44,138,186,100)', color: 'white',
        styles: ['#76DD4D', '#CCCF9A']
    },
    {
        modelPath: '/falcon9-v2.gltf', fov: 75, camY: 4, camZ: 10, name: 'Falcon 9', height: 70, country: 'USA', bg: '#7BC090', color: 'white',
        styles: ['#01718E', '#0A9B77']
    },
    {
        modelPath: '/electron-v2.gltf', fov: 40, camY: 4, camZ: 10, name: 'Electron', height: 18, country: 'USA', bg: 'rgb(217,152,125,100)', color: 'white',
        styles: ['#EBDB1C']
    },
    {
        modelPath: '/spaceshiptwo.gltf', fov: 20, camY: 4, camZ: 10, name: 'SpaceShipTwo', height: 5.5, country: 'USA', bg: 'rgb(71,128,148,100)', color: 'white',
        styles: ['linear-gradient(90deg, #C6CE5D, #25FCDA)', 'linear-gradient(180deg, #C6CE5D, #25FCDA)']
    },
    {
        modelPath: '/Zhuque-2.gltf', fov: 75, camY: 4, camZ: 10, name: 'Zhuque-2', height: 49.5, country: 'China', bg: 'rgb(71,128,148,100)', color: 'white',
        styles: ['linear-gradient(90deg, #8A0111, #FF6F7D)', '#37C694', '#E0AF96']
    },
    // { modelPath: '/long-march-2d.gltf', name: 'Long March 2d', height: 41, bg: 'rgb(38,84,92,100)', color: 'white' },
    // { modelPath: '/long-march-2f.gltf', name: 'Long March 2f', height: 62, bg: 'rgb(38,84,92,100)', color: 'white' },
    // ... other slides
]);

const displayRockets = ref([...rockets.value]);

const hasSpaceShipTwo = computed(() => {
    return displayRockets.value.some(rocket => rocket.name === 'SpaceShipTwo');
});

function updateDisplayedRockets(newRockets: any) {
    console.log('Updating displayed rockets:', newRockets);
    // rockets.value = newRockets;
    displayRockets.value = newRockets;
}

function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
        [array[i], array[j]] = [array[j], array[i]]; // swap elements
    }
}
onMounted(() => {
    shuffleArray(rockets.value);
    displayRockets.value = [...rockets.value]

})

function selectRandomStyle(styles: any) {
    const randomIndex = Math.floor(Math.random() * styles.length);
    return styles[randomIndex];
}


const combinedSlides = computed(() => {
    return displayRockets.value.map(rocket => {
        let textStyle = {};

        if (rocket.styles && rocket.styles.length > 0) {
            const selectedStyle = selectRandomStyle(rocket.styles);
            const isGradient = selectedStyle.includes('linear-gradient');

            textStyle = isGradient
                ? { background: selectedStyle, '-webkit-background-clip': 'text', color: 'transparent' }
                : { color: selectedStyle }
        } else {
            textStyle = { color: rocket.color }
        }

        return {
            ...rocket,
            textStyle
        }
    });
});

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Turret+Road:wght@800&display=swap');

.cool-font {
    font-family: 'Turret Road', sans-serif;
    /* opacity: 30%; */
}

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