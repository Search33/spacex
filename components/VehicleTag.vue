<template>
  <!-- <div class="pb-8 grid grid-flow-col gap-3"> -->
    <div class="relative flex rounded-2xl my-inner-shadow">
      <div class="absolute z-5 m w-full h-full overflow-hidden rounded-2xl">
        <div class="image-container" ref="imageContainer">
          <img alt="" aria-hidden
            class="py-2 w-full h-full -translate-x-1/2  transform scale-[700%] filter blur-[13px] opacity-30"
            :src="imgSrc" />

        </div>
      </div>
      <div class=" py-2 z-9 ml-4">
        <img :src="imgSrc" width="40" height="40" />
      </div>
      <div class="flex items-center px-3 z-9 flex-grow min-w-0 overflow-hidden text-ellipsis  ">
        {{ text || 'added soon' }}
      </div>
    </div>
  <!-- </div> -->
</template>

<script setup>

const { imgSrc, text } = defineProps(['imgSrc', 'text'])


</script>

<style lang="scss" scoped>

.my-inner-shadow {
    box-shadow: inset 0 0 5px rgb(0 0 0 / 0.3);
    // box-shadow: 0px 0px 10px 4px rgb(0 0 0 / 0.2);
}

.image-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.image-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

</style>