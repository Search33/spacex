<template>
    <div class="text-[#141414] relative ">
        <!-- <header>
            :style="{ backgroundImage: 'url(/images/cloud2-nav.png)', backgroundSize: '', backgroundRepeat: '' }">
            <nav class=" w-full flex h-20 sm:h-32 md:h-56 fixed top-0 z-40 p-4 sm:p-6 md:p-8 bg-contain  bg-no-repeat"
                :style="{ backgroundImage: 'url(/images/detailedClouds.png)', backgroundSize: '', backgroundRepeat: '' }">
                <div class="flex w-full items-top justify-end">
                    <NuxtLink to="rockets/1"
                        class="mb-auto p-3 bg-[#292929] text-sm code-font text-[#ddd] rounded-xl">Rockets 🚀 -&gt
                    </NuxtLink>
                </div>
            </nav>
        </header> -->

        <header>
            <nav class=" w-full flex h-[350px] fixed top-0 z-40 p-4 sm:p-6 md:p-8 responsive-bg">
                <div class="flex w-full items-top justify-end">
                    <NuxtLink to="rockets/1"
                        class="mb-auto p-3 bg-[#292929] text-sm code-font text-[#ddd] rounded-xl">Rockets 🚀 -&gt
                    </NuxtLink>
                </div>
            </nav>
        </header>

        <section v-for="(launch, index) in launches.result" :key="launch.id"
            :ref="el => (index === 2 ? (thirdSection = el) : '')"
            :class="{ 'hide-section': index < 2, 'first-section': index === 0, 'fade-in': true }"
            class="min-h-screen relative flex second-section pl-3">
            <div class="w-1/3 md:block hidden items-center justify-center  ">
                <ClientOnly>
                    <LazyRocketModel :fov="getModelSettings(launch.vehicle.id).fov"
                        :camY="getModelSettings(launch.vehicle.id).camY"
                        :camZ="getModelSettings(launch.vehicle.id).camZ"
                        :modelPath="getModelSettings(launch.vehicle.id).modelPath" />
                </ClientOnly>
            </div>

            <div
                class="inter-font w-full sm:w-[95%] lg:w-3/4 ml-auto py-3 sm:py-4 md:py-6 mb-20 justify-center items-center  overflow-auto pl-2 sm:pl-4 md:pl-6 ">
                <div class="bg-[#eeeeee]/90 

                            px-4 sm:px-6 md:px-8 
                            pt-4 sm:pt-6 md:pt-8 
                            pb-4 sm:pb-6 md:pb-6 
                            rounded-tl-xl sm:rounded-tl-2xl md:rounded-tl-3xl 
                            rounded-bl-xl sm:rounded-bl-2xl md:rounded-bl-3xl md:my-shadow ">

                    <div class="flex justify-between">
                        <div class="flex items-end   ">
                            <p class="text-2xl sm:text-3xl ">
                                {{ launch?.provider.name === 'China' ?
                                    'CNSA'
                                    : launch?.provider.name
                                    || 'launch provider not available' }}
                            </p>
                            <p class="pl-6 text-[#656565] mb-1 lg:block hidden ">
                                {{ launch?.provider.name === 'China' ?
                                    '(China National Space Association)' :
                                    launch?.provider.name === 'ISRO' ?
                                        '(Indian Space Research Organisation)' :
                                        launch?.provider.name === 'Roscosmos' ?
                                            'Russian Federal Space Agency' :
                                            '' }}
                            </p>
                        </div>
                        <div class="">
                            <LaunchDate :date="launch?.t0" />
                        </div>
                    </div>

                    <!-- Countdown + Location -->
                    <div class="py-3 sm:py-4 md:py-6 text-lg font-extrabold flex justify-between items-center  ">
                        <Countdown :countdown="launch?.t0" class="flex-shrink-0 " />

                        <LocationDetails class="lg:block hidden ml-auto " :launch="{
                            country: launch?.pad.location.country,
                            statename: launch?.pad.location.statename,
                            name: launch?.pad.location.name,
                            padName: launch?.pad.name
                        }" />
                    </div>

                    <!-- Launch Tags -->
                    <div class="pb-2 md:pb-4 flex flex-wrap gap-1 sm:gap-2 md:gap-3">
                        <VehicleTag class="flex-grow" imgSrc="/images/rocketIcon/3.svg" :text="launch?.vehicle.name" />
                        <VehicleTag class="flex-grow" v-for="tag in validTags[index]" :key="tag.id" :imgSrc="tag.imgSrc"
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
                <p>Data by <a href="https://fdo.rocketlaunch.live" target="_blank" class="underline">DataLaunch.live</a>
                </p>
                <p>Icons and vectors by <a href="https://www.svgrepo.com" target="_blank" class="underline">SVGRepo</a>
                </p>

                <div v-for="launch in launches.result" :key="launch.id">
                    <p v-if="launch?.vehicle.id === 120">SpaceShipTwo model by <span><a
                                href="https://sketchfab.com/3d-models/virgin-galactic-spaceshiptwo-95716fb34847496eafa5bfb39fcd9c00"
                                target="_blank" class="underline">agreene</a></span></p>
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

   const { data: launches } = await useFetch('http://localhost:3000/launches.json')
// const { data: launches } = useFetch('https://fdo.rocketlaunch.live/json/launches/next/5')

const { providers } = useProviders()
const { validTags } = useValidTags(launches)

const launchProvider = computed(() => {
    return launches?.provider.name === 'China' ? 'China National Space Administration (CNSA)' :
        launches?.provider.name || ''
})

const filteredTags = computed(() => {
    return validTags.map(tags => tags.filter(tag => tag.text !== 'No Live Video Expected'))
})

const { rockets } = useRockets();

console.log('duplicate kazakhstan.png image but different name: https://spacex-murex.vercel.app/images/kaz')

const getModelSettings = (vehicleId) => {
    // console.log('vehicleId: ', vehicleId)
    const rocket = rockets.find(r => r.id === vehicleId);
    return rocket ? {
        modelPath: rocket.modelPath,
        fov: rocket.fov,
        camY: rocket.camY,
        camZ: rocket.camZ
    } : { modelPath: null, fov: 75, camY: 4, camZ: 10 };
}

</script>


<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Inter&display=swap");


.responsive-bg {
    background-image: url(/images/detailedClouds.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    transition: background-size 0.3s ease, background-position 0.3s ease;
  }

  @media (min-width: 768px) {
    .responsive-bg {
      background-size: 100% auto;
      background-position: center center;
    }
  }

  @media (min-width: 1024px) {
    .responsive-bg {
      background-size: 103% auto;
      background-position: center center;
    }
  }

  @media (min-width: 1280px) {
    .responsive-bg {
      background-size: 105% auto;
      background-position: center center;
    }
  }


@media (min-width: 768px) {
    .md\:my-shadow {
        box-shadow: 0px 0px 20px 4px rgba(24, 31, 39, 0.4);
    }
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
    overflow-y: auto;
}

.first-section {
    margin-top: 80px;
    // overflow-y: auto;

}

.second-section {
    display: flex;
    align-items: center;
    justify-content: center;
}

.responsive-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
}

@media (min-width: 640px ) {
    .responsive-container {
        flex-direction: row;
        align-items: center;
    }
}

// /* Media Query for medium screens (e.g., tablets) */
// @media screen and (max-width: 1024px) {
//     .responsive-container {
//         /* Adjustments for medium screens */
//         flex-direction: column;
//         justify-content: space-between;
//     }

//     .responsive-container>*:not(:last-child) {
//         margin-bottom: 10px;
//     }
// }

/* Adjust for fixed header on smaller screens */
@media (max-width: 639px) {
  section {
    scroll-margin-top: 5rem; /* Adjust this value based on your mobile header height */
  }
  .first-section {
    margin-top: 5rem; /* Adjust this value based on your mobile header height */
  }
}
</style>
