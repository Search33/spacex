// Youtube Icon.vue
<template>
    <a :href="url" target="_blank">
        <div class="relative flex items-center justify-center w-10 h-10 rounded-[10%] overflow-hidden shadow-inner">
            <img alt="" aria-hidden
                class="absolute z-10 w-full h-full transform scale-200 filter blur-[13px] opacity-20"
                :src="logo" />
            <img alt="Avatar" class="w-4/5 h-4/5 z-12 filter drop-shadow-[0px 1px 4px rgba(0, 0, 0, 0.12)]"
                :src="logo" width="100" height="100" />
        </div>
    </a>
</template>

<script setup>

const { url, logo } = defineProps(['url', 'logo'])

</script>
