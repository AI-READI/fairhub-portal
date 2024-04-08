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
  <div>
    <Vue3Lottie
      :animation-data="LoaderLottieAnimationData"
      :width="width"
      :height="height"
    />
  </div>
</template>
