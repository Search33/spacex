// filteringSorting.ts
import { count } from 'console';
import { ref, computed } from 'vue';

const rockets = [
    {
        modelPath: '/falcon-heavy-v2.gltf', fov: 75, camY: 4, camZ: 10, name: 'Falcon Heavy', height: 70, country: 'USA', bg: '#D86A60', color: 'white',
        styles: ['linear-gradient(45deg, #FFC371, #FF6F5F)', '#F0F74D', '#52EAD1', '#863227']
    },
    {
        modelPath: '/PSLV.gltf', fov: 75, camY: 4, camZ: 10, name: 'PSLV', height: 44, country: 'India', bg: '#2C5698', color: 'white',
        styles: ['linear-gradient(45deg, #FD9609, #E1C438)', '#89ACE1']
    },
    {
        modelPath: '/soyuz2-v2.gltf', fov: 75, camY: 4, camZ: 10, name: 'Soyuz-2', height: 46.3, country: 'Russia', bg: 'rgb(75,167,187,100)', color: 'white',
        styles: ['#F7DE03', '#73D38D']
    },
    {
        modelPath: '/atlasV.gltf', fov: 75, camY: 4, camZ: 10, name: 'Atlas V', height: 58.3, country: 'USA', bg: 'rgb(20,34,74,100)', color: 'white',
        styles: ['linear-gradient(45deg, #024DB2, #5D99FE)', 'linear-gradient(45deg, #FFC47A, #9C5403)', '#F45BA0']
    },
    {
        modelPath: '/Antares.gltf', fov: 75, camY: 4, camZ: 10, name: 'Antares', height: 42.5, country: 'USA', bg: 'rgb(34,137,117,100)', color: 'white',
        styles: ['#3DD690', '#ffffff']
    },
    {
        modelPath: '/ceres1_2.gltf', fov: 45, camY: 4, camZ: 10, name: 'Ceres-1', height: 20, country: 'China', bg: 'rgb(49,117,157,100)', color: 'white',
        styles: ['#71CECF']
    },
    {
        modelPath: '/starship.gltf', fov: 70, camY: 8, camZ: 18, name: 'Starship', height: 120, country: 'USA', bg: '#21457E', color: 'white',
        styles: ['#8F84E8', 'linear-gradient(180deg, #FF718D, #A30808)', 'linear-gradient(270deg, #9971FF, #B69DF5)']
    },
    {
        modelPath: '/long-march-2c.gltf', fov: 75, camY: 4, camZ: 10, name: 'Long March 2c', height: 42, country: 'China', bg: 'rgb(131,72,105,100)', color: 'white',
        styles: ['#4F0E1F', '#FE81C8', '#D6D77F']
    },
    {
        modelPath: '/long-march-3b.gltf', fov: 75, camY: 4, camZ: 10, name: 'Long March 3b', height: 54.8, country: 'China', bg: 'rgb(71,109,198,100)', color: 'white',
        styles: ['#15DAB7']
    },
    {
        modelPath: '/long-march-4c.gltf', fov: 75, camY: 4, camZ: 10, name: 'Long March 4c', height: 45.8, country: 'China', bg: 'rgb(114,98,150,100)', color: 'white',
        styles: ['#FD4898', '#F9AF4D']
    },
    {
        modelPath: '/H-IIA.gltf', fov: 75, camY: 4, camZ: 10, name: 'H-IIA', height: 53, country: 'Japan', bg: 'rgb(38,84,92,100)', color: 'white',
        styles: ['linear-gradient(150deg, #74FFDF, #06B088)', '#E5B169']
    },
    {
        modelPath: '/LVM3.gltf', fov: 75, camY: 4, camZ: 10, name: 'HLVM3', height: 53, country: 'India', bg: 'rgb(44,138,186,100)', color: 'white',
        styles: ['#76DD4D', '#CCCF9A']
    },
    {
        modelPath: '/falcon9-v2.gltf', fov: 75, camY: 4, camZ: 10, name: 'Falcon 9', height: 70, country: 'USA', bg: '#7BC090', color: 'white',
        styles: ['#01718E', '#0A9B77']
    },
    {
        modelPath: '/electron-v2.gltf', fov: 40, camY: 4, camZ: 10, name: 'Electron', height: 18, country: 'USA', bg: 'rgb(217,152,125,100)', color: 'white',
        styles: ['#EBDB1C']
    },
    {
        modelPath: '/spaceshiptwo.gltf', fov: 20, camY: 4, camZ: 10, name: 'SpaceShipTwo', height: 5.5, country: 'USA', bg: 'rgb(71,128,148,100)', color: 'white',
        styles: ['linear-gradient(90deg, #C6CE5D, #25FCDA)', 'linear-gradient(180deg, #C6CE5D, #25FCDA)']
    },
    {
        modelPath: '/Zhuque-2.gltf', fov: 75, camY: 4, camZ: 10, name: 'Zhuque-2', height: 49.5, country: 'China', bg: 'rgb(71,128,148,100)', color: 'white',
        styles: ['linear-gradient(90deg, #8A0111, #FF6F7D)', '#37C694', '#E0AF96']
    },
    {
        modelPath: '/long-march-2d.gltf', fov: 75, camY: 4, camZ: 10, name: 'Long March 2d', height: 41, country: 'China', bg: 'rgb(38,84,92,100)', color: 'white',
        styles: ['linear-gradient(190deg, #5D9DCE, #76AE27)']
    },
    {
        modelPath: '/long-march-2f.gltf', fov: 75, camY: 4, camZ: 10, name: 'Long March 2f', height: 62, country: 'China', bg: '#214489', color: 'white',
        styles: ['linear-gradient(90deg, #FD4898, #CD25FC)', '#FD4898']
    },
    {
        modelPath: '/Alpha.gltf', fov: 75, camY: 4, camZ: 10, name: 'Alpha', height: 29, country: 'USA', bg: '#994E4C', color: 'white',
        styles: ['#E0AF96', '#A8A75F', 'linear-gradient(290deg, #52140B, #9E2512)']
    },
    {
        modelPath: '/new-shepard.gltf', fov: 40, camY: 4, camZ: 10, name: 'New Shepard', height: 18, country: 'USA', bg: '#543452', color: 'white',
        styles: ['linear-gradient(170deg, #5EA9CF, #386C86)']
    },
    {
        modelPath: '/new-glenn.gltf', fov: 75, camY: 6, camZ: 14, name: 'New Glenn', height: 98, country: 'USA', bg: '#6387AB', color: 'white',
        styles: ['#46EC46', '#410C3E']
    },
    {
        modelPath: '/vulcan-v2.gltf', fov: 75, camY: 4, camZ: 10, name: 'Vulcan', height: 61.6, country: 'USA', bg: '#63AB9B', color: 'white',
        styles: ['#4F345A', '#D1FFE1', '#E2FFC1']
    },
    {
        modelPath: '/deltaiv.gltf', fov: 75, camY: 4, camZ: 10, name: 'Delta IV', height: 70, country: 'USA', bg: '#6398AB', color: 'white',
        styles: ['#EBD13C', '#303E75']
    },
    {
        modelPath: '/ariane5.gltf', fov: 75, camY: 4, camZ: 10, name: 'Ariane 5', height: 50, country: 'Europe', bg: '#A2B4BA', color: 'white',
        styles: ['linear-gradient(270deg, #925800, #443327)', '#303E75', 'linear-gradient(170deg, #E765DC, #006674)']
    },
    {
        modelPath: '/ariane6.gltf', fov: 75, camY: 4, camZ: 10, name: 'Ariane 6', height: 63, country: 'Europe', bg: '#AD7A99', color: 'white',
        styles: ['#F5F1ED ', '#7C2B28']
    },
    {
        modelPath: '/sls-block-1-v2.gltf', fov: 75, camY: 6, camZ: 14, name: 'SLS Block 1', height: 98, country: 'USA', bg: '#6761A8', color: 'white',
        styles: ['#F26430', '#CBEF43', '#009DDC']
    },
    {
        modelPath: '/n1.gltf', fov: 75, camY: 6, camZ: 14, name: 'n1', height: 105, country: 'Russia', bg: '#2E5D55', color: 'white',
        styles: ['#ffffff',]
    },
    {
        modelPath: '/saturnv.gltf', fov: 75, camY: 6, camZ: 14, name: 'Saturn V', height: 110, country: 'USA', bg: '#837EB4', color: 'white',
        styles: ['#75FFA8', '#D8FF75', '#75CFFF']
    },
    {
        modelPath: '/longmarch9-v2.gltf', fov: 75, camY: 6, camZ: 14, name: 'Long March 9', height: 114, country: 'China', bg: '#934683', color: 'white',
        styles: ['#F433AB', '#EDCB96']
    },
    {
        modelPath: '/longmarch10-v2.gltf', fov: 75, camY: 5, camZ: 12, name: 'Long March 10', height: 90, country: 'China', bg: '#202C59', color: 'white',
        styles: ['#D95D39', '#5B8CA7']
    },
    {
        modelPath: '/longmarch5-v2.gltf', fov: 75, camY: 4, camZ: 10, name: 'Long March 5', height: 56, country: 'China', bg: '#CA9E74', color: 'white',
        styles: ['#FFD898', '#C92819']
    },
    {
        modelPath: '/longmarch11.gltf', fov: 40, camY: 4, camZ: 10, name: 'Long March 11', height: 20, country: 'China', bg: '#43A4DC', color: 'white',
        styles: ['#4932E3', '#3FEA70']
    },
    {
        modelPath: '/longmarch11.gltf', fov: 40, camY: 4, camZ: 10, name: 'Long March 33', height: 20, country: 'China', bg: '#43A4DC', color: 'white',
        styles: ['#4932E3', '#3FEA70']
    },
    // ... other slides   
];

const displayRockets = ref([...rockets])
const activeCountry = ref('all');
const sortCriteria = ref<any>({ 
    'all': 'default',
    'USA': 'default',
    'India': 'default',
    'Russia': 'default',
    'Japan': 'default',
    'China': 'defual',
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

    return filteredRockets;
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

    return { activeCountry, countryFlags, displayRockets: sortedAndFilteredRockets, existingCountries, filterRockets, isSortingActive, showAllRockets, sortRocketsByHeight, totalPages };
}
