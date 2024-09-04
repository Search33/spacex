<template>
    <div>
        <header>
            <nav class=" w-full flex h-20 sm:h-36 md:h-56 top-0 z-20 bg-contain bg-no-repeat"
                :style="{ backgroundImage: 'url(/images/cloud2-nav.png)', backgroundSize: '', backgroundRepeat: '' }">
                <div class="flex w-full items-top justify-start p-4 sm:p-6 md:p-8">
                    <NuxtLink to="/"
                        class="text-white z-50 mb-auto p-2 bg-[#389373] border-[1px] border-black rounded-lg">
                        &lt- Launches</NuxtLink>
                </div>
            </nav>
        </header>

        <div class=" z-[50] flex w-full items-bottom justify-between px-1 sm:px-2 md:px-4 pb-1 sm:pb-2 md:pb-4">

            <!-- Dynamic Navigation
            <div v-if="page <= 1" class="w-[164px] invisible"></div> -->

            <div class="w-[120px] sm:w-[164px]">
                <div v-if="page <= 1" class="invisible"></div>
                <NuxtLink v-else :to="`/rockets/${page - 1}`"
                    class="block mb-auto p-3 bg-[#292929] text-sm code-font text-[#ddd] rounded-xl text-center">
                    <span class="hidden sm:inline">&lt;- Previous Page 🚀</span>
                    <span class="sm:hidden">&lt;</span>
                </NuxtLink>
            </div>

            <RocketFilters />

            <div class="w-[120px] sm:w-[164px]">
                <NuxtLink v-if="page < totalPages" :to="`/rockets/${page + 1}`"
                    class="block mb-auto p-3 bg-[#292929] text-sm code-font text-[#ddd] rounded-xl text-center">
                    <span class="hidden sm:inline">Next Page 🚀 -&gt</span>
                    <span class="sm:hidden">&gt;</span>
                </NuxtLink>
                <div v-else class="invisible"></div>
            </div>
        </div>

        <div :key="`grid-${activeCountry}-${isSortingActive}`"
            class=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5 py-4 ">
            <div v-for="(rocket, idx) in paginatedRockets" :key="`model-${rocket.name}-${rocket.height}`"
                class="relative flex flex-col justify-center items-center h-[60vh] rounded-lg border-[1px]  border-black overflow-hidden"
                :style="`background-color: ${rocket.bg}; color: ${rocket.color}`">
                <ClientOnly>
                    <LazyRocketModel :fov="rocket.fov" :camY="rocket.camY" :camZ="rocket.camZ"
                        :modelPath="rocket.modelPath" :key="`model-${rocket.name}-${rocket.height}`"
                        class="z-0 h-[40vh] p-3" />
                </ClientOnly>
                <p class="absolute z-[4] flex flex-col items-center top-0 text-base font-normal pt-3 text-center">
                    <span class="pr-2 text-xl sm:text-3xl md:text-4xl cool-font" :style="rocket.textStyle">
                        {{ rocket.name }}
                    </span>
                    <span>{{ rocket.height }}m</span>
                </p>
                <div>

                </div>
            </div>
        </div>

        <div class="z-[50] flex w-full items-center justify-between px-4 pb-6 pt-1">
            <!-- Left Navigation Link or Placeholder -->
            <NuxtLink v-if="page > 1" :to="`/rockets/${page - 1}`"
                class="w-[164px] mb-auto p-3 bg-[#292929] text-sm code-font text-[#ddd] rounded-xl">
                &lt- Previous Page 🚀
            </NuxtLink>
            <div v-else-if="page === 1 && !hasSpaceShipTwo" class="w-[164px] "></div> <!-- Invisible Placeholder -->
            <p v-if="page === 1 && hasSpaceShipTwo" class="w-[164px] pl-3">SpaceShipTwo model by <span><a
                        href="https://sketchfab.com/3d-models/virgin-galactic-spaceshiptwo-95716fb34847496eafa5bfb39fcd9c00"
                        target="_blank" class="underline">agreene</a></span></p>

            <!-- Page Indicator -->
            <p
                class="px-2.5 py-2 mr-6 text-md code-font font-semibold rounded-xl border-[1px] border-transparent hover:border-[#5db9bf] text-[#23585c]">
                Page: {{ page }}
            </p>

            <div class="w-[120px] sm:w-[164px]">
                <NuxtLink v-if="page < totalPages" :to="`/rockets/${page + 1}`"
                    class="block mb-auto p-3 bg-[#292929] text-sm code-font text-[#ddd] rounded-xl text-center">
                    <span class="hidden sm:inline">Next Page 🚀 -&gt</span>
                    <span class="sm:hidden">&gt;</span>
                </NuxtLink>
                <div v-else class="invisible"></div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">

const { displayRockets, isSortingActive, activeCountry, totalPages } = useRockets();

function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

// Function to chunk an array
function chunkArray(array: any[], chunkSize: any) {
    let result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
    }
    return result;
}

// function selectRandomStyle(styles: any) {
//     const randomIndex = Math.floor(Math.random() * styles.length);
//     return styles[randomIndex];
// }


const hasSpaceShipTwo = computed(() => {
    return paginatedRockets.value.some(rocket => rocket.name === 'SpaceShipTwo');
});


const { id } = useRoute().params;

const page = ref(parseInt(Array.isArray(id) ? id[0] : id) || 1);
console.log('Initial page:', page.value);

const modelsPerPage = 16;

function selectRandomStyle(styles: string[]): string {
    if (!styles || styles.length === 0) return '';
    return styles[Math.floor(Math.random() * styles.length)];
}

const paginatedRockets = computed(() => {
    const start = (page.value - 1) * modelsPerPage;
    const end = start + modelsPerPage;

    let currentRockets = displayRockets.value.slice(start, end);

    if (isSortingActive.value) {
        currentRockets.sort((a, b) => a.height - b.height);
    } else {
        shuffleArray(currentRockets);
    }
    return currentRockets.map(rocket => {
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
    });;

});




const router = useRouter();

watch(activeCountry, (newCountry) => {
    const filteredRocketCount = displayRockets.value.filter(rocket => rocket.country === newCountry).length;
    if (filteredRocketCount <= modelsPerPage && page.value !== 1) {
        page.value = 1;
        router.push('/rockets/1');
    }
});

</script>



<style>
@import url('https://fonts.googleapis.com/css2?family=Turret+Road:wght@800&display=swap');

.cool-font {
    font-family: 'Turret Road', sans-serif;
    /* opacity: 30%; */
}
</style>