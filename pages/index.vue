<template>
    <div class="text-[#141414] relative">
        <!-- <section v-for="(launch, index) in rLaunches?.value" 
            :key="launch.id" 
            class="min-h-screen relative flex bg-green-300 ">
            helo
        </section> -->
        <header>
            <nav class=" w-full h-56 fixed top-0 z-40 p-8 bg-contain bg-no-repeat"
                :style="{ backgroundImage: 'url(/images/cloud2-nav.png)', backgroundSize: '', backgroundRepeat: '' }">
                <!-- <ul><li><NuxtLink to="/test">test</NuxtLink></li></ul> -->
            </nav>

        </header>


        <!-- <div class="night-section ">
            <section v-for="i in 2" :key="i" class="night-background min-h-screen relative flex ">

            </section>

        </div> -->


        <section v-for="(launch, index) in launches.result" :key="launch.id"
            :ref="el => (index === 2 ? (thirdSection = el) : '')"
            :class="{ 'hide-section': index < 2, 'first-section': index === 0, 'fade-in': true }"
            class="min-h-screen relative flex second-section ">
            <div class="flex w-1/3 items-center justify-center  p-8">
                <ClientOnly>
                <Falcon9 v-if="launch?.vehicle.id === 1" />
                <Soyuz2 v-else-if="launch?.vehicle.id === 20" />
                <!-- <Ariane5 v-else-if="launch?.vehicle.id === 2" /> -->
                </ClientOnly>
            </div>
            <div class="inter-font  w-2/3 justify-center items-center mt-20  overflow-auto pl-6 pt-6">
                <div class="bg-[#eeeeee]/90 p-8 rounded-tl-3xl rounded-bl-3xl my-shadow ">
                    <div class=" text-3xl ">
                        {{ launch?.provider.name || 'launch provider not available' }}
                    </div>

                    <!-- Countdown + Location -->
                    <div class="py-8 text-lg font-extrabold flex justify-between space-x-10 ">
                        <Countdown :countdown="launch?.t0" />
                        <LocationDetails :launch="{
                            country: launch?.pad.location.country,
                            statename: launch?.pad.location.statename,
                            name: launch?.pad.location.name,
                            padName: launch?.pad.name
                        }" />
                    </div>

                    <!-- Launch Tags -->
                    <div class="pb-8 grid grid-flow-col gap-3">
                        <VehicleTag imgSrc="/images/rocketIcon/3.svg" :text="launch?.vehicle.name" />
                        <VehicleTag v-for="tag in validTags[index]" :key="tag.id"
                            :imgSrc="tagMap.find(map => map.id === tag.id).imgSrc"
                            :text="tagMap.find(map => map.id === tag.id).text" />
                    </div>

                    <Missions :launch="launch" />
                    <References :providers="providers" :launch="launch" />
                </div>
            </div>
        </section>
    </div>
    <section class="min-h-screen bg-[#333333]  ">
    </section>
</template>

<script setup>


// const { data: launches, pending, refresh } = await useAsyncData(
//     'launches', 
//     async() => {
//         const response = await $fetch(`https://fdo.rocketlaunch.live/json/launches/next/5`)
//         return response
// })
// const { data: launch } = await useFetch('http://localhost:3000/launches.json')


const { data: launches } = useFetch("http://localhost:3001/launches.json");
// const { data: launches } = useFetch('/api/data')
// const rLaunches = computed(() => {
//     if (Array.isArray(launches.result)) {
//         return [...launches.result].reverse();
//     } else {
//         return [];
//     }
// });
console.log('launches:', launches)
// console.log('rLaunches:', rLaunches)
// console.log('rLaunches.value:', rLaunches.value)
// const countdown = ref([]);
const tagMap = [
    { id: 8, imgSrc: "/images/rocketIcon/33.svg", text: "Classified Payload 🤫" },
    { id: 9, imgSrc: "/images/rocketIcon/8.svg", text: "Crewed" },
    { id: 45, imgSrc: "/images/rocketIcon/32.svg", text: "Meteorology" },
    { id: 92, imgSrc: "/images/rocketIcon/10.svg", text: "Starlink Satellites" },
    { id: 9, imgSrc: "/images/rocketIcon/8.svg", text: "Crewed" },
    { id: 68, imgSrc: "/images/rocketIcon/earth.svg", text: "Suborbital" },
];

const providers = ref([
    {
        name: "SpaceX",
        url: "https://www.spacex.com",
        logo: "/logos/SpaceX_logo_black.svg",
        twitter: "https://twitter.com/SpaceX",
        youtube: "https://www.youtube.com/spacex"
    },
    {
        name: "Arianespace",
        url: "https://www.arianespace.com",
        logo: "/logos/arianespace-vector-logo.svg",
        twitter: "https://twitter.com/Arianespace",
        youtube: "https://www.youtube.com/@arianespace/featured"
    },
    {
        name: "United Launch Alliance (ULA)",
        url: "https://www.ulalaunch.com",
        logo: "/logos/ula.svg",
        twitter: "https://twitter.com/ulalaunch",
        youtube: "https://www.youtube.com/@unitedlaunchalliance/featured"
    },
    {
        name: "Roscosmos",
        url: "https://en.roscosmos.ru",
        logo: "/logos/roscosmos.svg.png",
        twitter: "https://twitter.com/roscosmos",
        youtube: "https://www.youtube.com/@tvroscosmos"
    },
    {
        name: "Virgin Galactic",
        url: "https://www.virgingalactic.com",
        logo: "/logos/virgingalactic.png",
        twitter: "https://twitter.com/virgingalactic",
        youtube: "https://www.youtube.com/@VirginGalactic/streams"
    },
    {
        name: "Rocket Lab",
        url: "https://www.rocketlabusa.com",
        logo: "/logos/rocketlab.svg.png",
        twitter: "https://twitter.com/RocketLab",
        youtube: "https://www.youtube.com/@RocketLabNZ"
    },
    {
        name: "PLD Space",
        url: "https://pldspace.com/es/",
        logo: "/logos/pldspace.png",
        twitter: "https://twitter.com/PLD_Space",
        youtube: "https://www.youtube.com/@PLDSPACE"
    },
    {
        name: "Firefly",
        url: "https://fireflyspace.com",
        logo: "/logos/firefly.png",
        twitter: "https://twitter.com/Firefly_Space",
        youtube: "https://www.youtube.com/@FireflySpace"
    },
    {
        name: "ISRO",
        url: "https://www.isro.gov.in",
        logo: "/logos/ISRO.svg.png",
        twitter: "https://twitter.com/isro",
        youtube: "https://www.youtube.com/@isroofficial5866"
    },
    {
        name: "Blue Origin",
        url: "https://www.blueorigin.com",
        logo: "/logos/BlueOrigin.png",
        twitter: "https://twitter.com/blueorigin",
        youtube: "https://www.youtube.com/@blueorigin"
    },
    {
        name: "JAXA",
        url: "https://global.jaxa.jp",
        logo: "/logos/JAXA.png",
        twitter: "https://twitter.com/JAXA_en",
        youtube: "https://www.youtube.com/@JAXA-HQ"
    },
    {
        name: "Aevum",
        url: "https://www.aevumspace.com/space",
        logo: "/logos/aevum.png",
        twitter: "https://twitter.com/aevumspace",
        youtube: "https://www.youtube.com/@aevum1377"
    }
]);
// Computed property to get valid tags
const validTags = computed(() => {
    if (launches.value && launches.value.result) {
        return launches.value.result.map(launch => {
            return launch.tags?.filter(tag => tagMap.find(map => map.id === tag.id)) || [];
        });
    }
    else {
        return [];
    }
});
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Gothic+A1&display=swap");
@import url("https://fonts.googleapis.com/css?family=Inter&display=swap");

// .wrapper::before {
//     content: "";
//     position: fixed;
//     top: 0;
//     left: 0;
//     height: 100vh;
//     width: 100%;
//     z-index: -1;
//     background: linear-gradient(to bottom, #0a3c42, #5BC9D7);
// }

// .night-section {
//     // content: "";
//     position: relative;
//     top: 0;
//     left: 0;
//     height: 100vh;
//     width: 100%;
//     // z-index: -1;
//     background: linear-gradient(to bottom, #041618, #0a3c42);
// }

.my-shadow {
    box-shadow: 0px 0px 20px 4px rgba(24, 31, 39, 0.4);
}

.my-inner-shadow {
    box-shadow: inset 0 0 5px rgb(0 0 0 / 0.3);
    // box-shadow: 0px 0px 10px 4px rgb(0 0 0 / 0.2);
}

.code-font {
    font-family: Monaco, Consolas, "Lucida Console", monospace;
}

.provider-name {
    font-family: 'Gothic A1', sans-serif;
}

.jakarta-font {
    font-family: 'Plus Jakarta Sans', sans-serif;
}


.inter-font {
    font-family: 'Inter';
}


section {
    scroll-snap-align: start;
    scroll-margin-top: 80px;
    height: calc(100dvh - 80px);
    /* font-family: 'Source Sans 3'; */
    font-family: "Plus Jakarta Sans", sans-serif;

}

.first-section {
    margin-top: 80px;
}
</style>

