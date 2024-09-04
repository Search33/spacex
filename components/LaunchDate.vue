<template>
    <div class=" z-20 flex -mb-3 flex-col items-center justify-end text-base font-normal ">
        <span class="text-[#656565] text-xs mr-auto ">
            {{ dayNumber }}<sup class="ordinal">{{ ordinalSuffix }}</sup> {{ monthYear }}</span>
        <span class="text-lg sm:text-xl font-medium mr-auto">{{ time }}</span>
    </div>
</template>

<script setup>

const { date } = defineProps(['date'])

const getOrdinalSuffix = (day) => {
    if (day % 10 === 1 && day !== 11) return "st";
    else if (day % 10 === 2 && day !== 12) return "nd";
    else if (day % 10 === 3 && day !== 13) return "rd";
    else return "th";
}

const dayNumber = computed(() => {
    if (!date) return '';
    const d = new Date(date);
    return d.getDate();
});

const ordinalSuffix = computed(() => {
    if (!date) return '';
    const d = new Date(date);
    return getOrdinalSuffix(d.getDate());
});

const monthYear = computed(() => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleString(undefined, { month: 'long' });

});

const time = computed(() => {
    if (!date) return '';
    const d = new Date(date);
    let timeString = d.toLocaleString(undefined, { hour: '2-digit', minute: '2-digit', hour12: true });
    return timeString.replace(/^0|(\s)(?=[AaPp][Mm])/, '').replace(/(\s)(?=[AaPp][Mm])/, '').toLowerCase();

});

</script>

<style scoped>


</style>