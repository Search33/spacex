<template>
    <div class="text-base text-right font-normal flex flex-col justify-center">
        <div class="">
            {{ launch?.country === 'United States' ? 'US' : launch?.country
            }}{{ launch?.statename ? ', ' + launch.statename : '' }}
        </div>
        <LinkHover :text="launch?.name || ''" :location="launch?.name || ''" />
        <div>
            Pad: {{ launch?.padName || '' }}
        </div>
    </div>
</template>

<script setup>

import LinkHover from './LinkHover.vue';

const { launch } = defineProps(['launch'])

</script>

<style lang="scss" scoped></style>