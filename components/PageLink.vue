<template>
    <NuxtLink :to="`/rockets/${targetPage}`"
        class="block mb-auto p-3 bg-[#292929] text-sm code-font text-[#ddd] rounded-xl text-center">
        <span class="hidden sm:inline">
            <template v-if="direction === 'prev'">&lt;- Previous Page 🚀</template>
            <template v-else>Next Page 🚀 -&gt;</template>
        </span>
        <span class="sm:hidden">
            <template v-if="direction === 'prev'">&lt;</template>
            <template v-else>&gt;</template>
        </span>
    </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
    targetPage: number;
    direction: 'prev' | 'next';
}>()
</script>
