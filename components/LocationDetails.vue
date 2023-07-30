<template>
    <div class="text-base text-right font-normal flex flex-col justify-center">
        <div class="">
            {{ launch?.country || '' }}{{ launch?.statename ? ', ' + launch.statename : '' }} {{ countryFlag }}
        </div>
        <!-- <LinkHover :text="launch?.name || ''" :location="launch?.name || ''" /> -->
        <LinkHover :text="convertedLaunchName || ''" :location="convertedLaunchName || ''" />
        <div>
            Pad: {{ launch?.padName || '' }}
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


const countryFlag = computed(() => {
    const flags = {
        'United States': '🇺🇸',
        'India': '🇮🇳',
        'China': '🇨🇳',
        'Spain': '🇪🇸',
        'France': '🇫🇷',
        'Italy': '🇮🇹',
        'Russia': '🇷🇺',
        'New Zealand': '🇳🇿'
        // add more countries here...
    };
    return flags[launch?.country] || '';
})


</script>

<style lang="scss" scoped></style>