<!-- RocketFilters.vue component -->
<template>
    <div class="flex">
        <div class="">
            <button @click="sortRocketsByHeight"
                    :class="['px-1 md:px-2.5 py-1 sm:py-2 md:py-3 mx-1 text-sm code-font rounded-xl border-[1px] border-transparent hover:border-[#5db9bf] text-[#ddd]'] + (isSortingActive === true ? ' bg-[#44a6ab]' : ' bg-[#3f898e]')"
                    >
                    <span class="hidden md:inline">Sort by Height</span>
                    <span class="md:hidden ">Sort</span>

            </button>
        </div>
        <button @click="showAllRockets"
                :class="baseButtonClass + (activeCountry === 'all' ? ' bg-[#44a6ab]' : ' bg-[#3f898e]')">
            🌎
        </button>
        <button v-for="country in existingCountries"
                :class="buttonClass(country)"
                @click="filterRockets(country)"
                :key="country">
            {{ countryFlags[country] }}
        </button>
    </div>
</template>

<script setup>

import { useRockets } from '~/composables/useRockets';

const { activeCountry, countryFlags, isSortingActive, existingCountries, filterRockets, showAllRockets, sortRocketsByHeight } = useRockets();

const baseButtonClass = 'px-1 md:px-2.5 py-1 md:py-1.5 mx-1 text-sm sm:text-xl md:text-2xl code-font rounded-xl border-[1px] border-transparent hover:border-[#5db9bf]';

function buttonClass(country) {
    return baseButtonClass + (activeCountry.value === country ? ' bg-[#44a6ab]' : ' bg-[#3f898e]');
}

</script>