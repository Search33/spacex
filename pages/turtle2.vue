<template>
    <div>
        <header>
            <nav class=" w-full flex h-56 top-0 z-20  bg-contain bg-no-repeat"
                :style="{ backgroundImage: 'url(/images/cloud2-nav.png)', backgroundSize: '', backgroundRepeat: '' }">
                <div class="flex w-full items-top justify-start p-8">
                    <NuxtLink to="/" class="text-white z-50 mb-auto p-2 bg-[#389373] border-[1px] border-black rounded-lg">
                        &lt- Launches</NuxtLink>
                    </div>
            </nav>
        </header>

        <div class=" z-[50] flex w-full items-bottom justify-between px-4 pb-4">
            <NuxtLink to="rockets" class="  mb-auto p-3 bg-[#292929] text-sm code-font text-[#ddd] rounded-xl">&lt- Previous Page 🚀</NuxtLink>
            <RocketFilters :rockets="rockets" @update-rockets="updateDisplayedRockets" />
            <NuxtLink to="rockets3" class="mb-auto p-3 bg-[#292929] text-sm code-font text-[#ddd] rounded-xl">Next Page 🚀 -&gt</NuxtLink>
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
            <div class="grid grid-cols-7 w-full items-center pl-4 pb-4">
                <NuxtLink to="rockets" class="col-start-1 mr-auto mb-auto p-3 bg-[#292929] text-sm code-font text-[#ddd] rounded-xl">
                    &lt- Previous Page 🚀</NuxtLink>
                <p class="col-start-6 col-span-2 ml-auto pr-3">SLS launch pad model by <span><a
                            href="https://nasa3d.arc.nasa.gov/detail/mobile-launcher-lp"
                            target="_blank" class="underline">nasa</a></span></p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const rockets = ref([
    {   modelPath: '/long-march-2d.gltf', fov: 75, camY: 4, camZ: 10, name: 'Long March 2d', height: 41, country: 'China', bg: 'rgb(38,84,92,100)', color: 'white',
    styles: ['linear-gradient(190deg, #5D9DCE, #76AE27)']
    },
    {   modelPath: '/long-march-2f.gltf', fov: 75, camY: 4, camZ: 10, name: 'Long March 2f', height: 62, country: 'China', bg: '#214489', color: 'white',
    styles: ['linear-gradient(90deg, #FD4898, #CD25FC)', '#FD4898']
    },
    {   modelPath: '/Alpha.gltf', fov: 75, camY: 4, camZ: 10, name: 'Alpha', height: 29,  country: 'USA', bg: '#994E4C', color: 'white',
        styles: ['#E0AF96', '#A8A75F', 'linear-gradient(290deg, #52140B, #9E2512)']
    },   
    {   modelPath: '/new-shepard.gltf', fov: 40, camY: 4, camZ: 10, name: 'New Shepard', height: 18, country: 'USA', bg: '#543452', color: 'white',
        styles: ['linear-gradient(170deg, #5EA9CF, #386C86)']
    },      
    {   modelPath: '/new-glenn.gltf', fov: 75, camY: 6, camZ: 14, name: 'New Glenn', height: 98, country: 'USA', bg: '#6387AB', color: 'white',
        styles: ['#46EC46', '#410C3E']
    },        
    // {   modelPath: '/vulcan.gltf', fov: 75, camY: 4, camZ: 10, name: 'Vulcan', height: 61.6, bg: '#63AB9B', color: 'white',
    //     styles: ['#093B09', '#A4142C', '#06F3FF']
    // }, 
    {   modelPath: '/vulcan-v2.gltf', fov: 75, camY: 4, camZ: 10, name: 'Vulcan', height: 61.6, country: 'USA', bg: '#63AB9B', color: 'white',
        styles: ['#4F345A', '#D1FFE1', '#E2FFC1']
    },      
    {   modelPath: '/deltaiv.gltf', fov: 75, camY: 4, camZ: 10, name: 'Delta IV', height: 70, country: 'USA', bg: '#6398AB', color: 'white',
        styles: ['#EBD13C', '#303E75']
    },        
    {   modelPath: '/ariane5.gltf', fov: 75, camY: 4, camZ: 10, name: 'Ariane 5', height: 50, country: 'Europe', bg: '#A2B4BA', color: 'white',
        styles: ['linear-gradient(270deg, #925800, #443327)', '#303E75', 'linear-gradient(170deg, #E765DC, #006674)']
    },        
    // {   modelPath: '/ariane6.gltf', fov: 75, camY: 4, camZ: 10, name: 'Ariane 6', height: 63, bg: '#A2C2A8', color: 'white',
    //     styles: [ '#CA054D', '#DB504A']
    // },    
    {   modelPath: '/ariane6.gltf', fov: 75, camY: 4, camZ: 10, name: 'Ariane 6', height: 63, country: 'Europe', bg: '#AD7A99', color: 'white',
        styles: [ '#F5F1ED ',  '#7C2B28']
    },   
    // {   modelPath: '/sls-block-1.gltf', fov: 75, camY: 6, camZ: 14, name: 'SLS Block 1', height: 98, bg: '#80B8C7', color: 'white',
    //     styles: [ '#631515', '#154563'] 
    // },  
    {   modelPath: '/sls-block-1-v2.gltf', fov: 75, camY: 6, camZ: 14, name: 'SLS Block 1', height: 98, country: 'USA', bg: '#6761A8', color: 'white',
        styles: [ '#F26430', '#CBEF43', '#009DDC'] 
    }, 
    {   modelPath: '/n1.gltf', fov: 75, camY: 6, camZ: 14, name: 'n1', height: 105, country: 'Russia', bg: '#2E5D55', color: 'white',
        styles: [ '#ffffff', ]
    },  
    {   modelPath: '/saturnv.gltf', fov: 75, camY: 6, camZ: 14, name: 'Saturn V', height: 110, country: 'USA', bg: '#837EB4', color: 'white',
        styles: [ '#75FFA8', '#D8FF75', '#75CFFF']
    },  
    // {   modelPath: '/longmarch9.gltf', fov: 75, camY: 6, camZ: 14, name: 'Long March 9', height: 114, bg: '#5B889D', color: 'white',
    //     styles: ['#6A1A1A', '#0C354B']
    // },  
    {   modelPath: '/longmarch9-v2.gltf', fov: 75, camY: 6, camZ: 14, name: 'Long March 9', height: 114, country: 'China', bg: '#934683', color: 'white',
        styles: ['#F433AB', '#EDCB96']
    },  
    // {   modelPath: '/longmarch10.gltf', fov: 75, camY: 5, camZ: 12, name: 'Long March 10', height: 90, bg: '#CAD7C0', color: 'white',
    //     styles: ['#A95AEA', '#0C354B']
    // },  

    {   modelPath: '/longmarch10-v2.gltf', fov: 75, camY: 5, camZ: 12, name: 'Long March 10', height: 90, country: 'China', bg: '#202C59', color: 'white',
        styles: ['#D95D39', '#5B8CA7']
    }, 

    // {   modelPath: '/longmarch5.gltf', fov: 75, camY: 4, camZ: 10, name: 'Long March 5', height: 56, bg: '#198CCA', color: 'white',
    //     styles: ['#DAC8E9', '#0C354B']
    // },   
    {   modelPath: '/longmarch5-v2.gltf', fov: 75, camY: 4, camZ: 10, name: 'Long March 5', height: 56, country: 'China', bg: '#CA9E74', color: 'white',
        styles: ['#FFD898', '#C92819' ]
    },   
    {   modelPath: '/longmarch11.gltf', fov: 40, camY: 4, camZ: 10, name: 'Long March 11', height: 20, country: 'China', bg: '#43A4DC', color: 'white',
        styles: ['#4932E3', '#3FEA70' ]
    },    
    // ... other slides   
]);     

const displayRockets = ref([...rockets.value]);

function updateDisplayedRockets(newRockets: any) {
    console.log('Updating displayed rockets:', newRockets);
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