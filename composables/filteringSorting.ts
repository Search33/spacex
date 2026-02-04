import { ref, computed } from 'vue';
import { rockets } from '~/data/rockets';

const activeCountry = ref('all');
const sortCriteria = ref<any>({ 
    'all': 'default',
    'USA': 'default',
    'India': 'default',
    'Russia': 'default',
    'Japan': 'default',
    'China': 'default',
    'Europe': 'default',
});


const isSortingActive = ref(false)

const sortedAndFilteredRockets = computed(() => {
    let filteredRockets = activeCountry.value === 'all' 
        ? [...rockets] 
        : rockets.filter(rocket => rocket.country === activeCountry.value);

    if (isSortingActive.value && sortCriteria.value[activeCountry.value] === 'height') {
        filteredRockets.sort((a, b) => a.height - b.height);
    }

    return filteredRockets
});

const filterRockets = (country: string) => {
    activeCountry.value = country;

};

const sortRocketsByHeight = () => {
    isSortingActive.value = !isSortingActive.value
    const currentCriteria = sortCriteria.value[activeCountry.value];
    sortCriteria.value[activeCountry.value] = currentCriteria === 'height' ? 'default' : 'height';
};


export function useRockets() {

    const countryFlags = {
        'China': '🇨🇳', 'USA': '🇺🇸', 'Europe': '🇪🇺',
        'Russia': '🇷🇺', 'India': '🇮🇳', 'Japan': '🇯🇵',
        'Italy': '🇮🇹', 'France': '🇫🇷',
    };

    const existingCountries = computed(() => {
        const countriesWithRockets = new Set(rockets.map(rocket => rocket.country));
        return Object.keys(countryFlags).filter(country => countriesWithRockets.has(country));
    });

    const showAllRockets = () => {
        activeCountry.value = 'all';
    };

    const modelsPerPage = 16;

    const numberOfRockets = computed(() => sortedAndFilteredRockets.value.length);
    const totalPages = computed(() => Math.ceil(numberOfRockets.value / modelsPerPage))


    return { activeCountry, countryFlags, rockets, displayRockets: sortedAndFilteredRockets, existingCountries, filterRockets, isSortingActive, showAllRockets, sortRocketsByHeight, totalPages };
}
