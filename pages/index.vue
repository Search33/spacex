<template>
    <div class="text-[#141414] relative">

        <header>
            <nav class=" w-full h-56 fixed top-0 z-40 p-8 bg-contain bg-no-repeat"
                :style="{ backgroundImage: 'url(/images/cloud2-nav.png)', backgroundSize: '', backgroundRepeat: '' }">
            </nav>
        </header>
        <section v-if="pending">
            loading launches...

        </section>

        <section v-else v-for="(launch, index) in launches.result" :key="launch.id"
            :ref="el => (index === 2 ? (thirdSection = el) : '')"
            :class="{ 'hide-section': index < 2, 'first-section': index === 0, 'fade-in': true }"
            class="min-h-screen relative flex second-section ">
            <div class="flex w-1/3 items-center justify-center  p-8">
                <ClientOnly>
                <LazyFalcon9 v-if="launch?.vehicle.id === 1" />
                <LazyElectron v-else-if="launch?.vehicle.id === 18" />
                <LazyGSLVIII v-else-if="launch?.vehicle.id === 19" />
                <LazySoyuz2 v-else-if="launch?.vehicle.id === 20" />
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
                        <VehicleTag v-for="tag in validTags[index]" :key="tag.id" :imgSrc="tag.imgSrc" :text="tag.text" />

                        <!-- <VehicleTag v-for="tag in validTags[index]" :key="tag.id"
                            :imgSrc="tagMap.find(map => map.id === tag.id).imgSrc"
                            :text="tagMap.find(map => map.id === tag.id).text" /> -->
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

// const { data: launches } = useFetch("http://localhost:3000/launches.json");
const { data: launches, pending } = await useAsyncData('launches', () => $fetch(`https://fdo.rocketlaunch.live/json/launches/next/5`))


const { providers, tagMap } = useProviders()

const validTags = computed(() => {
    if (launches.value && launches.value.result) {
        return launches.value.result.map(launch => {
            return launch.tags?.map(tag => {
                const tagMapEntry = tagMap.find(map => map.id === tag.id);
                return {
                    id: tag.id,
                    imgSrc: tagMapEntry ? tagMapEntry.imgSrc : null,
                    text: tagMapEntry ? tagMapEntry.text : null,
                };
            }) || [];
        });
    } else {
        return [];
    }
});

</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Gothic+A1&display=swap");
@import url("https://fonts.googleapis.com/css?family=Inter&display=swap");


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

