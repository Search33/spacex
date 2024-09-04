<template>
    <div class="bg-[#292929] text-[#dddddd] text-xs sm:text-sm code-font rounded-xl p-1 sm:p-2 md:p-3 red-inner-shadow">
        <div v-for="(m, index) in launch?.missions" 
            class="  m-2 "
            :class="{'pb-2 border-b-[1px] border-[#434343]': index < launch.missions.length - 1 && launch.missions.length > 1}">
            <p class="rounded-2xl">
                <span class="text-[#8d8d8d] ">
                    {{ launch.missions.length > 1 ? `| $: > Booting Mission (${index +
                        1}/${launch.missions.length}):` : '| $: > Booting Mission:' }}
                </span>
                    {{ m.name || '' }}
            </p>
            <p class="text-[#8d8d8d]">
                ■■■■■■■■■■■ <span class="text-[#8d8d8d]">100%</span>
            </p>
            <p  class=" pt-0.5">
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

.red-inner-shadow {
    box-shadow: inset 0 0 10px #191919;
}


</style>