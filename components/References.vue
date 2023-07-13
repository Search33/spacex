<template>
    <div class="flex pt-4 justify-between  space-x-4 ">
        <div class="flex space-x-4">
            <template v-for="provider in providers" :key="provider.name">
                <template v-if="launch?.provider.name === provider.name">
                    <a :href="provider.url" target="_blank">
                        <div
                            class="relative flex items-center justify-center w-20 h-10 rounded-[10%] overflow-hidden shadow-inner">
                            <img alt="" aria-hidden
                                class="absolute z-10 w-full h-full transform scale-200 filter blur-[13px] opacity-20"
                                :src="provider.logo" />
                            <img alt="Avatar" class="w-4/5 h-4/5 z-12 filter drop-shadow-[0px 1px 4px rgba(0, 0, 0, 0.12)]"
                                :src="provider.logo" width="100" height="100" />
                        </div>
                    </a>
                    <SocialMediaIcon :url="provider.twitter" :logo="'https://cdn.svgporn.com/logos/twitter.svg'" />
                    <SocialMediaIcon :url="provider.youtube" :logo="'https://cdn.svgporn.com/logos/youtube-icon.svg'" />

                    <!-- <YoutubeIcon :url="provider.youtube" /> -->
                </template>
            </template>

        </div>
        <p class="flex items-center justify-center text-sm font-thin  ">
            Data by
            <span>
                <a href="https://www.rocketlaunch.live " target="_blank" class="underline pl-1">
                    RocketLaunch.Live</a>
            </span>
        </p>
    </div>
</template>

<script setup>

const { providers, launch } = defineProps(['providers', 'launch'])

</script>

<style lang="scss" scoped></style>