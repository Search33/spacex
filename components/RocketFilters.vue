

<template>
    <div class="flex">
        <div class="">
            <button @click="sortRocketsByHeight"
            :class="['px-2.5 py-3 mx-1 text-sm active:bg-[#44a6ab] code-font text-[#ddd] rounded-xl bg-[#3f898e] hover:bg-[#3b8387] hover:border-[#5db9bf] border-[1px] border-transparent']">
                Sort by Height
            </button>
        </div>
        <button @click="showAllRockets"
            :class="['px-2.5 py-1.5 mx-1 text-2xl code-font rounded-xl border-[1px] border-transparent',
                    {'bg-[#44a6ab] hover:border-[#5db9bf]': activeCountry === 'all', 'bg-[#3f898e] hover:bg-[#3b8387] hover:border-[#5db9bf]': activeCountry !== 'all'}]">
            🌎
        </button>
        <button v-for="country in existingCountries"
                :class="['px-2.5 py-1.5 mx-1 text-2xl code-font rounded-xl border-[1px] border-transparent',
                        {'bg-[#44a6ab] hover:border-[#5db9bf]': activeCountry === country, 'bg-[#3f898e] hover:bg-[#3b8387] hover:border-[#5db9bf]': activeCountry !== country}]"
                @click="filterRockets(country)"
                :key="country">
            {{ countryFlags[country] }}
        </button>
    </div>
</template>

<script setup>

import { computed, defineProps } from 'vue';

const props = defineProps({
    rockets: Array
});

const countryFlags = {
    'China': '🇨🇳',
    'USA': '🇺🇸',
    'Europe': '🇪🇺',
    'Russia': '🇷🇺',
    'India': '🇮🇳',
    'Japan': '🇯🇵',
    'Italy': '🇮🇹',
    'France': '🇫🇷',

    // ... add other countries as needed
};

// New computed property for existing countries
const existingCountries = computed(() => {
    const countriesWithRockets = new Set(props.rockets.map(rocket => rocket.country));
    return Object.keys(countryFlags).filter(country => countriesWithRockets.has(country));
});

const emit = defineEmits(['update-rockets'])

let activeCountry = ref('all');
let displayRockets = ref([...props.rockets]);
let currentSortCriteria = ref('default'); // Initialize the sorting criteria
const originalRockets = computed(() => [...props.rockets]);


function applySort(rockets) {
    if (currentSortCriteria.value === 'height') {
        return [...rockets].sort((a, b) => a.height - b.height);
    }
    return rockets;
}

function filterRockets(country = 'all') {
    activeCountry.value = country;
    currentSortCriteria.value = 'default'; // Reset sorting when changing countries

    let filteredRockets = originalRockets.value.filter(rocket =>
        country === 'all' || rocket.country === country
    );

    displayRockets.value = filteredRockets;

    emit('update-rockets', displayRockets.value);

}
function showAllRockets() {
    activeCountry.value = 'all';
    currentSortCriteria.value = 'default';
    displayRockets.value = originalRockets.value;
    emit('update-rockets', displayRockets.value);
}

function sortRocketsByHeight() {
    if (activeCountry.value !== 'all') {
        currentSortCriteria.value = 'height';
        let filteredRockets = originalRockets.value.filter(rocket => rocket.country === activeCountry.value);
        displayRockets.value = applySort(filteredRockets);
        emit('update-rockets', displayRockets.value);
    } else {
        currentSortCriteria.value = 'height';
        displayRockets.value = applySort(originalRockets.value);
        emit('update-rockets', displayRockets.value);
    }
}

</script>
  

<style>

</style>