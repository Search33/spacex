<template>
    <div class="container  w-1/2 mx-auto relative text-xs  ">
        <div class="absolute  right-0  blur-[1px]  top-1/2 -translate-y-1/2 scale-[1.25] z-0 w-[72px] ">
            <img :src="countryImagePath" @error="setDefaultImage" alt="Country Flag" class=" inset-0   " />
        </div>

        <div class=" font-normal pr-8   relative overflow-hidden text-sm  text-right  flex flex-col justify-center ">
            <div class="">
                <!-- {{ launch?.country || '' }}{{ launch?.statename ? ', ' + launch.statename : '' }} {{ countryFlag }} -->
                <!-- {{ launch?.country || '' }} -->
            </div>

            <LinkHover class="z-10 text-[#1f1f1f] relative overlapping-text  bg-opacity-60  "
                :text="convertedLaunchName || ''" :location="convertedLaunchName || ''" />

            <div class="pad-text text-[#6a6a6a]">
                Pad: {{ launch?.padName || '' }}
            </div>
        </div>

    </div>
</template>

<script setup>

import LinkHover from './LinkHover.vue';

const { launch } = defineProps(['launch'])

const convertedLaunchName = computed(() => {
    return launch?.name === 'Cape Canaveral SFS' ? 'Cape Canaveral Space Force Station' :
        launch?.name === 'Vandenberg SFB' ? 'Vandenberg Space Force Base' :
            launch?.name;
});

const setDefaultImage = (event) => {
    event.target.src = '/images/backup.png';
};



const countryFlag = computed(() => {
    const flags = {
        'United States': '🇺🇸',
        'India': '🇮🇳',
        'China': '🇨🇳',
        'Spain': '🇪🇸',
        'France': '🇫🇷',
        'Italy': '🇮🇹',
        'Russia': '🇷🇺',
        'New Zealand': '🇳🇿',
        'Japan': '🇯🇵',
        // add more countries here...
    };
    return flags[launch?.country] || '';
})

const countryImagePath = computed(() => {
    if (!launch?.country) return '';

    const imageName = launch.country.replace(/\s+/g, '-').toLowerCase();
    const imagePath = `/images/${imageName}.png`;

    console.log('(location) Launch.country:', launch.country)

    // const baseURL = 'http://localhost:3000';
    const baseURL = 'https://spacex-murex.vercel.app'
    const fullURL = `${baseURL}${imagePath}`;

    console.log('(imagePath):', fullURL);

    return imagePath;
});



</script>

<style scoped>
.container .overlapping-text {
    /* mix-blend-mode: difference; */
    /* color: black; */
    text-shadow: 0 0 8px #fff;

}

.pad-text {
    text-shadow: 0 0 10px #fff;

}
</style>