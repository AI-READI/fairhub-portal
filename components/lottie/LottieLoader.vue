<script setup lang="ts">
import LoaderLottieAnimationData from "@/assets/lottie/loaderAnimation.json";

defineProps({
  height: {
    default: 300,
    required: false,
    type: Number,
  },

  width: {
    default: 300,
    required: false,
    type: Number,
  },
});
</script>

<template>
  <ClientOnly>
    <Vue3Lottie
      :animation-data="LoaderLottieAnimationData"
      :width="width"
      :height="height"
    />

    <template #fallback>
      <div class="loader"></div>
    </template>
  </ClientOnly>
</template>

<style scoped>
.loader {
  width: 48px;
  height: 48px;
  display: inline-block;
  border-radius: 50%;
  box-sizing: border-box;
  animation: animloader 1s ease-in infinite;
/*  @apply bg-sky-500;*/
  background-color: #334155;
}

@keyframes animloader {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
</style>
