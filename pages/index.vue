<template>
    <div class="text-[#141414] relative">
        <header>
            <nav class=" w-full flex h-56 fixed top-0 z-40 p-8 bg-contain bg-no-repeat"
                :style="{ backgroundImage: 'url(/images/cloud2-nav.png)', backgroundSize: '', backgroundRepeat: '' }">
                <NuxtLink to="test" class="ml-auto">Rockets</NuxtLink>
            </nav>
        </header>

        <section v-for="(launch, index) in launches.result" :key="launch.id"
            :ref="el => (index === 2 ? (thirdSection = el) : '')"
            :class="{ 'hide-section': index < 2, 'first-section': index === 0, 'fade-in': true }"
            class="min-h-screen relative flex second-section ">
            <div class="flex w-1/3 items-center justify-center  p-8">
                <ClientOnly>
                    <!-- <LazyRocketModel v-if="launch?.vehicle.id === 1" url="~/falcon9.gltf" />
                    <LazyRocketModel v-else-if="launch?.vehicle.id === 18" url="~/electron.gltf" />
                    <LazyRocketModel v-else-if="launch?.vehicle.id === 19" url="~/GSLV III.gltf" />
                    <LazyRocketModel v-else-if="launch?.vehicle.id === 20" url="~/soyuz2.gltf" /> -->

                    <LazyFalcon9 v-if="launch?.vehicle.id === 1" />
                    <LazyAtlasV v-if="launch?.vehicle.id === 3" />
                    <LazyAntares v-else-if="launch?.vehicle.id === 5" />
                    <LazyFalconHeavy v-else-if="launch?.vehicle.id === 7" />
                    <LazyH-IIA v-else-if="launch?.vehicle.id === 17" />
                    <LazyElectron v-else-if="launch?.vehicle.id === 18" />
                    <LazyGSLVIII v-else-if="launch?.vehicle.id === 19" />
                    <LazySoyuz2 v-else-if="launch?.vehicle.id === 20" />
                    <LazyPSLV v-else-if="launch?.vehicle.id === 21" />
                    <LazyLongMarch3b v-else-if="launch?.vehicle.id === 28" />
                    <LazyLongMarch2c v-else-if="launch?.vehicle.id === 38" />
                    <LazyLongMarch4c v-else-if="launch?.vehicle.id === 41" />
                    <!-- <LazyKuaizhou1A v-else-if="launch?.vehicle.id === 52" /> -->

                    <LazyCeres1 v-else-if="launch?.vehicle.id === 113" />
                    <LazySpaceShipTwo v-else-if="launch?.vehicle.id === 120" />
                    
                    <!-- <Ariane5 v-else-if="launch?.vehicle.id === 2" /> -->
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
                    <div class="pt-8 pb-8 text-lg font-extrabold flex justify-between space-x-10 ">
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

</script>


<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Inter&display=swap");

.my-shadow {
    box-shadow: 0px 0px 20px 4px rgba(24, 31, 39, 0.4);
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
</style>

