<!-- /components/Countdown.vue -->
<template>
    <div class="flex space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-10  ">
        <div v-if="countdownTime.message" class=" text-base sm:text-xl md:text-2xl flex flex-col justify-center h-4 md:h-10">
            {{ countdownTime.message }}
        </div>
        <template v-else>
            <div class="flex flex-col items-center" v-if="countdownTime.days > 0">
                <div class="countdown-value">{{ countdownTime.days }}</div>
                <div class="countdown-label">DAYS</div>
                </div>
            <div class="flex flex-col items-center" v-if="countdownTime.hours > 0 || countdownTime.days > 0">
                <div class="countdown-value">{{ countdownTime.hours }}</div>
                <div class="countdown-label">HOURS</div>
            </div>
            <div class="flex flex-col items-center">
                <div class="countdown-value">{{ countdownTime.minutes }}</div>
                <div class="countdown-label ">MINUTES</div>
            </div>
            <div class="flex flex-col items-center">
                <div class="countdown-value">{{ countdownTime.seconds }}</div>
                <div class="countdown-label ">SECONDS</div>
            </div>
        </template>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const { countdown } = defineProps(['countdown']);

const countdownTime = ref({})

const calculateCountdown = () => {
    if (!countdown) {
        countdownTime.value = { message: "Launch time TBD" };
        return;
    }

    const launchDate = new Date(countdown);
    const now = new Date();
    const diff = launchDate - now;

    if (diff <= 0) {
        countdownTime.value = { message: `Liftoff!🚀 🛸 🔭 or scrubbed🗓️` };
        return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    countdownTime.value = { days, hours, minutes, seconds };

    if (diff > 0) {
        requestAnimationFrame(calculateCountdown)
    }
};

onMounted(calculateCountdown)

</script>

<style lang="scss" scoped>

.countdown-value {
  @apply text-2xl sm:text-4xl md:text-5xl lg:text-6xl;
}

.countdown-label {
  @apply text-xs sm:text-sm md:text-base font-extralight;
}

@media screen and (max-width: 374px) {
  .countdown-value {
    font-size: 1.5rem;
  }
  .countdown-label {
    font-size: 0.65rem;
  }
}

@media screen and (min-width: 375px) and (max-width: 413px) {
  .countdown-value {
    font-size: 1.75rem;
  }
  .countdown-label {
    font-size: 0.75rem;
  }
}
</style>