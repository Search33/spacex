<template>
    <div class="text-[#141414] relative">
        <header>
            <nav class=" w-full flex h-56 fixed top-0 z-40 p-8 bg-contain  bg-no-repeat"
                :style="{ backgroundImage: 'url(/images/cloud2-nav.png)', backgroundSize: '', backgroundRepeat: '' }">
                <div class="flex w-full items-top justify-end">
                    <!-- <NuxtLink to="rockets" class="  mb-auto p-3 bg-[#292929] text-sm code-font text-[#ddd] rounded-xl">Rockets 🚀 -&gt</NuxtLink> -->
                    <NuxtLink to="rockets/1" class="  mb-auto p-3 bg-[#292929] text-sm code-font text-[#ddd] rounded-xl">Rockets 🚀 -&gt</NuxtLink>
                </div>
            </nav>
        </header>

        <section v-for="(launch, index) in launches.result" :key="launch.id"
            :ref="el => (index === 2 ? (thirdSection = el) : '')"
            :class="{ 'hide-section': index < 2, 'first-section': index === 0, 'fade-in': true }"
            class="min-h-screen relative flex second-section ">
            <div class="flex w-1/3 items-center justify-center  p-8">
                <ClientOnly>
                    <LazyRocketModel :fov="75" :camY="4" :camZ="10" :modelPath="getModelPath(launch.vehicle.id)"/>
                    <!-- <LazyVega v-else-if="launch?.vehicle.id === 11" />
                    <LazyPSLVxl v-else-if="launch?.vehicle.id === 14" />
                    <LazyH-IIA v-else-if="launch?.vehicle.id === 17" />
                    <LazyLVM3 v-else-if="launch?.vehicle.id === 19" />
                    <LazyLongMarch5 v-else-if="launch?.vehicle.id === 39" />
                    <LazyHyperbola1 v-else-if="launch?.vehicle.id === 67" />
                    <LazyKuaizhou1A v-else-if="launch?.vehicle.id === 52" />
                    <LazyAlpha v-else-if="launch?.vehicle.id === 91" />
                    <LazyZhuque2 v-else-if="launch?.vehicle.id id === 131" />
                    <LazyMiura1 v-else-if="launch?.vehicle.id === 144" />
                    <Ariane5 v-else-if="launch?.vehicle.id === 2" />  -->
                </ClientOnly>
            </div>

            <div class="inter-font w-2/3 py-6 mb-20 justify-center items-center  overflow-auto pl-6 pt-6">
                <div class="bg-[#eeeeee]/90 p-8 rounded-tl-3xl rounded-bl-3xl my-shadow ">
                    <div >
                        <div class="flex justify-between">
                            <div class="flex items-end   ">
                                <p class=" text-3xl ">
                                    {{ launch?.provider.name === 'China' ? 'CNSA' : launch?.provider.name || 'launch provider not available' }}
                                    <!-- {{ launchProvider }} -->
                                </p>
                                <p class="pl-6 text-[#656565] mb-1 ">
                                    {{ launch?.provider.name === 'China' ? '(China National Space Association)' : launch?.provider.name === 'ISRO' ?  '(Indian Space Research Organisation)' : launch?.provider.name === 'Roscosmos' ? 'Russian Federal Space Agency' : ''}}
                                </p>

                            </div>
                            <LaunchDate :date="launch?.t0" />
                        </div>
                    </div>

                    <!-- Countdown + Location -->
                    <div class="pt-8 pb-8 text-lg font-extrabold responsive-container  flex justify-between space-x-10 ">
                        <Countdown :countdown="launch?.t0" />
                        <LocationDetails 
                            :launch="{
                                country: launch?.pad.location.country,
                                statename: launch?.pad.location.statename,
                                name: launch?.pad.location.name,
                                padName: launch?.pad.name
                            }" />
                    </div>

                    <!-- Launch Tags -->
                    <!-- <div class="pb-6 grid grid-flow-col gap-3"> -->
                    <div class="pb-6 flex flex-wrap gap-3">
                        <VehicleTag 
                            class="flex-grow"
                            imgSrc="/images/rocketIcon/3.svg" 
                            :text="launch?.vehicle.name" />
                        <VehicleTag 
                            class="flex-grow"
                            v-for="tag in validTags[index]" 
                            :key="tag.id" 
                            :imgSrc="tag.imgSrc" 
                            :text="tag.text" />
                    </div>
                    <Missions :launch="launch" />
                    <References :providers="providers" :launch="launch" />
                </div>
            </div>
        </section>
    </div>
    <section class="min-h-screen bg-[#333333]  ">
        <div class="flex items-center justify-center h-screen text-white">
            <div>
                <p>Data by <a href="https://fdo.rocketlaunch.live" target="_blank" class="underline">DataLaunch.live</a> </p>
                <p>Icons and vectors by <a href="https://www.svgrepo.com" target="_blank" class="underline">SVGRepo</a></p>
                
                <div v-for="launch in launches.result" :key="launch.id">
                    <p v-if="launch?.vehicle.id === 120">SpaceShipTwo model by <span><a href="https://sketchfab.com/3d-models/virgin-galactic-spaceshiptwo-95716fb34847496eafa5bfb39fcd9c00" target="_blank" class="underline">agreene</a></span></p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>

import { useValidTags } from '~/composables/useValidTags'

useHead({
    title: 'Rocket Launches'
})


const { data: launches } = useFetch('https://fdo.rocketlaunch.live/json/launches/next/5')

// const { data: launches } = await useFetch('http://localhost:3000/launches.json')
// const { data: launches } = useFetch('https://spacex-murex.vercel.app/launches.json')

const { providers } = useProviders()
const { validTags } = useValidTags(launches)

const launchProvider = computed(() => {
    return launches?.provider.name === 'China' ? 'China National Space Administration (CNSA)' : 
           launches?.provider.name || ''
})

const filteredTags = computed(() => {
    return validTags.map(tags => tags.filter(tag => tag.text !== 'No Live Video Expected'))
})

const getModelPath = (vehicleId) => {
  const modelPaths = {
    1: '/falcon9-v2.gltf',
    3: '/atlasV.gltf',
    5: '/Antares.gltf',
    7: '/falcon-heavy-v2.gltf',
    14: '/PSLV.gltf',
    17: '/H-IIA.gltf',
    18: '/electron-v2.gltf',
    19: '/LVM3.gltf',
    20: '/soyuz2-v2.gltf',
    21: '/PSLV.gltf', // Assuming same model for different variants
    28: '/long-march-3b.gltf',
    35: '/long-march-2d.gltf',
    38: '/long-march-2c.gltf',
    41: '/long-march-4c.gltf',
    42: '/longmarch11.gltf',
    43: '/vulcan-v2.gltf',
    // 52: '/.gltf',
    56: '/new-shepard.gltf',
    58: '/Alpha.gltf',
    72: '/LongMarch7.gltf',
    76: '/long-march-2f.gltf',
    // 67: '/hyperbola1.gltf',
    113: '/ceres1_2.gltf',
    115: '/starship.gltf',
    120: '/spaceshiptwo.gltf',
    // 144: '/miura1.gltf',
    146: '/Kinetica1.gltf',
    149: '/gravity1.gltf',
    // Add more mappings as needed
  };
  return modelPaths[vehicleId] || null; // Fallback model
};

</script>


<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Inter&display=swap");

.my-shadow {
    box-shadow: 0px 0px 20px 4px rgba(24, 31, 39, 0.4);
}
.code-font {
    font-family: Monaco, Consolas, "Lucida Console", monospace;
}
.inter-font {
    font-family: 'Inter';
}

section {
    scroll-snap-align: start;
    scroll-margin-top: 80px;
    height: calc(100vh - 80px);
}

.first-section {
    margin-top: 80px;
    overflow-y: auto;

}

.second-section {
    display: flex;
    align-items: center;
    justify-content: center;
}

.responsive-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* Media Query for medium screens (e.g., tablets) */
@media screen and (max-width: 1024px) {
    .responsive-container {
        /* Adjustments for medium screens */
        flex-direction: column;
        justify-content: space-between;
    }
    .responsive-container > *:not(:last-child) {
        margin-bottom: 10px;
    }
}

</style>

