<template>
    <div class="flex items-center justify-end text-base font-normal ">
        {{ formattedDate }}

    </div>
</template>

<script setup>

const { date } = defineProps(['date'])

const getOrdinalSuffix = (day) => {
    if (day % 10 === 1 && day !== 11) {
        return day + "st";
    }
    else if (day % 10 === 2 && day !== 12) {
        return day + "nd";
    }
    else if (day % 10 === 3 && day !== 13) {
        return day + "rd";
    }
    else {
        return day + "th";
    }
}

const formattedDate = computed(() => {
    if (date) {
        const d = new Date(date);
        const dayWithSuffix = getOrdinalSuffix(d.getDate());
        return `${dayWithSuffix} ${d.toLocaleString(undefined, { month: 'short' })}, ${d.toLocaleString(undefined, { hour: '2-digit', minute: '2-digit' })}`;
    }
});

// const formattedDate = computed(() => {
//     if (date) {
//         const d = new Date(date);
//         return d.toLocaleString(undefined, 
//         { 
//             month: 'long', 
//             day: '2-digit', 
//             hour: '2-digit', 
//             minute: '2-digit' 
//         }
//         );
//     }
// });

</script>

<style lang="scss" scoped>

</style>