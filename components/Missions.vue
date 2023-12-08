<template>
    <div class="bg-[#292929] text-[#dddddd] text-sm code-font rounded-xl p-3">
        <div v-for="(m, index) in launch?.missions" class="px-2 py-px  my-2 ">
            <p class="rounded-2xl">
                {{ launch.missions.length > 1 ? `| $: > Booting Mission (${index +
                    1}/${launch.missions.length}):` : '| $: > Booting Mission:' }}
                {{ m.name || '' }}
            </p>
            <p>
                ■■■■■■■■■■■ 100%
            </p>
            <p class="">
                {{ m.description || '' }}
            </p>
        </div>
    </div>
</template>

<script setup>

const { launch } = defineProps(['launch'])

</script>

<style lang="scss" scoped>

.code-font {
    font-family: Monaco, Consolas, "Lucida Console", monospace;
}

</style>