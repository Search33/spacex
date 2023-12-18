<template>
    <div>
        <header>
            <nav class=" w-full flex h-[24vh] fixed top-0 z-20  bg-cover bg-no-repeat"
                :style="{ backgroundImage: 'url(/images/cloud2-nav.png)', backgroundSize: '', backgroundRepeat: '' }">
                <button class="flex w-full items-top justify-start p-8">
                    <NuxtLink to="/" class="text-white z-50 mb-auto p-2 bg-[#389373] border-[1px] border-black rounded-lg">
                        &lt- Launches</NuxtLink>
                </button>

            </nav>
        </header>

        <div class="mt-[24vh] z-[50] flex w-full items-bottom justify-start pl-4 pb-4">
            <NuxtLink to="rockets" class="  mb-auto p-3 bg-[#292929] text-sm code-font text-[#ddd] rounded-xl">&lt- Previous Page 🚀</NuxtLink>
        </div>

        <div class=" grid grid-cols-4 gap-5 py-4 ">
            <div v-for="(rocket, idx) in combinedSlides" :key="idx"
                class="relative flex flex-col justify-center items-center h-[60vh] rounded-lg border-[1px]  border-black overflow-hidden"
                :style="`background-color: ${rocket.bg}; color: ${rocket.color}`">
                <ClientOnly>
                    <LazyRocketModel :fov="rocket.fov" :camY="rocket.camY" :camZ="rocket.camZ" :modelPath="rocket.modelPath"
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
    </div>
</template>

<script setup lang="ts">

const rockets = ref([
    // {
    //     modelPath: '/falcon-heavy-v2.gltf', fov: 75, camY: 4, camZ: 10, name: 'Falcon Heavy', height: 70, bg: '#D86A60', color: 'white',
    //     styles: ['linear-gradient(45deg, #FFC371, #FF5F6D)', '#F0F74D', '#52EAD1', '#B45018']
    // },

    // {   modelPath: '/PSLV.gltf', fov: 75, camY: 4, camZ: 10, name: 'PSLV', height: 44, bg: '#2C5698', color: 'white',
    //     styles: ['linear-gradient(45deg, #FD9609, #E1C438)', '#89ACE1']
    //  },
    
    // {   modelPath: '/soyuz2-v2.gltf', fov: 75, camY: 4, camZ: 10, name: 'Soyuz-2', height: 46.3, bg: 'rgb(75,167,187,100)', color: 'white',
    //     styles: ['#F7DE03', '#73D38D)']
    // },
    // {
    //     modelPath: '/atlasV.gltf', fov: 75, camY: 4, camZ: 10, name: 'Atlas V', height: 58.3, bg: 'rgb(20,34,74,100)', color: 'white',
    //     styles: ['linear-gradient(45deg, #024DB2, #5D99FE)', 'linear-gradient(45deg, #FFC47A, #9C5403)', '#F45BA0']
    // },

    // {   modelPath: '/Antares.gltf', fov: 75, camY: 4, camZ: 10, name: 'Antares', height: 42.5, bg: 'rgb(34,137,117,100)', color: 'white',
    //     styles: ['#3DD690',  '#ffffff']
    // },
    // {   modelPath: '/ceres1_2.gltf', fov: 45, camY: 4, camZ: 10, name: 'Ceres-1', height: 20, bg: 'rgb(49,117,157,100)', color: 'white',
    //     styles: ['#71CECF']
    // }, 
    // {   modelPath: '/starship.gltf', fov: 70, camY: 8, camZ: 18, name: 'Starship', height: 120, bg: '#21457E', color: 'white',
    //     styles: ['#8F84E8', 'linear-gradient(180deg, #FF718D, #A30808)', 'linear-gradient(270deg, #9971FF, #B69DF5)']
    // },
    // {   modelPath: '/long-march-2c.gltf', fov: 75, camY: 4, camZ: 10, name: 'Long March 2c', height: 42, bg: 'rgb(131,72,105,100)', color: 'white',
    //     styles: ['#4F0E1F', '#FE81C8', '#D6D77F']
    // },
    // {   modelPath: '/long-march-3b.gltf', fov: 75, camY: 4, camZ: 10, name: 'Long March 3b', height: 54.8, bg: 'rgb(71,109,198,100)', color: 'white',
    //     styles: ['#15DAB7']
    // },
    // {   modelPath: '/long-march-4c.gltf', fov: 75, camY: 4, camZ: 10, name: 'Long March 4c', height: 45.8, bg: 'rgb(114,98,150,100)', color: 'white',
    //     styles: ['#FD4898', '#F9AF4D']
    // },
    // {   modelPath: '/H-IIA.gltf', fov: 75, camY: 4, camZ: 10, name: 'H-IIA', height: 53, bg: 'rgb(38,84,92,100)', color: 'white',
    //     styles: ['linear-gradient(150deg, #74FFDF, #06B088)', '#E5B169']
    // },
    // {   modelPath: '/LVM3.gltf', fov: 75, camY: 4, camZ: 10, name: 'HLVM3', height: 53, bg: 'rgb(44,138,186,100)', color: 'white',
    //     styles: ['#76DD4D', '#CCCF9A']
    // },
    // {   modelPath: '/falcon9-v2.gltf', fov: 75, camY: 4, camZ: 10, name: 'Falcon 9', height: 70, bg: '#7BC090', color: 'white',
    //     styles: ['#01718E', '#0A9B77']
    // },
    // {   modelPath: '/electron-v2.gltf', fov: 40, camY: 4, camZ: 10, name: 'Electron', height: 18, bg: 'rgb(217,152,125,100)', color: 'white',
    //     styles: ['#EBDB1C']
    // },
    // {   modelPath: '/spaceshiptwo.gltf', fov: 20, camY: 4, camZ: 10, name: 'SpaceShipTwo', height: 5.5, bg: 'rgb(71,128,148,100)', color: 'white',
    //     styles: ['linear-gradient(90deg, #C6CE5D, #25FCDA)', 'linear-gradient(180deg, #C6CE5D, #25FCDA)']
    // },
    {   modelPath: '/long-march-2d.gltf', fov: 75, camY: 4, camZ: 10, name: 'Long March 2d', height: 41, bg: 'rgb(38,84,92,100)', color: 'white',
    styles: ['linear-gradient(190deg, #5D9DCE, #76AE27)']
    },
    {   modelPath: '/long-march-2f.gltf', fov: 75, camY: 4, camZ: 10, name: 'Long March 2f', height: 62, bg: '#214489', color: 'white',
    styles: ['linear-gradient(90deg, #FD4898, #CD25FC)', '#FD4898']
    },
    {   modelPath: '/Alpha.gltf', fov: 75, camY: 4, camZ: 10, name: 'Alpha', height: 29, bg: '#994E4C', color: 'white',
        styles: ['#E0AF96', '#A8A75F', 'linear-gradient(290deg, #52140B, #9E2512)']
    },   
    {   modelPath: '/new-shepard.gltf', fov: 40, camY: 4, camZ: 10, name: 'New Shepard', height: 18, bg: '#543452', color: 'white',
        styles: ['linear-gradient(170deg, #5EA9CF, #386C86)']
    },      
    // ... other slides  
]);  


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

function selectRandomStyle(styles: any) {
    const randomIndex = Math.floor(Math.random() * styles.length);
    return styles[randomIndex];
}


const combinedSlides = computed(() => {
    return rockets.value.map(rocket => {
        let textStyle = {};
        
        if (rocket.styles && rocket.styles.length > 0) {
            const selectedStyle = selectRandomStyle(rocket.styles);
            const isGradient = selectedStyle.includes('linear-gradient');

            textStyle = isGradient
                ? { background: selectedStyle, '-webkit-background-clip': 'text', color: 'transparent' }
                : { color: selectedStyle}
        } else {
            textStyle = { color: rocket.color}
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