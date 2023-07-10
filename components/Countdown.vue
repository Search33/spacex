<template>
    <div class="flex space-x-10">
        <div v-if="countdownTime.message" class="text-2xl flex flex-col justify-center">
            {{ countdownTime.message }}..
        </div>
        <template v-else>
            <div class="flex flex-col items-center" v-if="countdownTime.days > 0">
                <div class="text-6xl">{{ countdownTime.days }}</div>
                <div class="font-extralight">DAYS</div>
            </div>
            <div class="flex flex-col items-center" v-if="countdownTime.hours > 0 || countdownTime.days > 0">
                <div class="text-6xl">{{ countdownTime.hours }}</div>
                <div class="font-extralight">HOURS</div>
            </div>
            <div class="flex flex-col items-center">
                <div class="text-6xl">{{ countdownTime.minutes }}</div>
                <div class="font-extralight ">MINUTES</div>
            </div>
            <div class="flex flex-col items-center">
                <div class="text-6xl">{{ countdownTime.seconds }}</div>
                <div class="font-extralight ">SECONDS</div>
            </div>
        </template>
    </div>
</template>

<script setup>

import { ref, onMounted } from 'vue';

// Create launchTime as a prop
const { countdown } = defineProps(['countdown']);

const countdownTime = ref({})

const calculateCountdown = () => {
    console.log(`countdown: ${countdown}`)
    if (!countdown) {
        countdownTime.value = { message: "Launch time TBD" };
        return;
    }

    const launchDate = new Date(countdown);
    const now = new Date();
    const diff = launchDate - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    console.log(`Days: ${days}, Hours: ${hours}, Minutes: ${minutes}, Seconds: ${seconds}`); // Log the countdown components

    countdownTime.value = { days, hours, minutes, seconds };

    // Set a timeout to call this function again in 1 second
    // if (countdown) {
    //     setTimeout(calculateCountdown, 1000);
    // }
    if (diff > 0) {
        requestAnimationFrame(calculateCountdown)
    }
};

onMounted(calculateCountdown)

</script>

<style lang="scss" scoped></style>