<script setup>
import { watch, ref, computed } from "vue";
import { executeTransition, useMouseInElement, watchOnce } from "@vueuse/core";

const props = defineProps({
  max: {
    default: 900,
    type: Number,
  },
  min: {
    default: 100,
    type: Number,
  },
  threshold: {
    default: 300,
    type: Number,
  },
});

const container = ref();

const ready = ref(false);

const { elementHeight, elementWidth, elementX, elementY } =
  useMouseInElement(container);

watchOnce(elementX, () => (ready.value = true));

const weight = computed(() => {
  if (!ready.value) {
    return props.min;
  }

  if (!container.value) {
    return props.min;
  }

  if (elementY.value < 0) {
    return props.min;
  }

  if (elementY.value > elementHeight.value) {
    return props.min;
  }

  const lambda = Math.abs(elementX.value - elementWidth.value / 2);

  const value = (props.threshold - lambda) / props.threshold;

  return Math.round(
    Math.min(Math.max(value * props.max, props.min), props.max)
  );
});

const fontWeight = ref(props.min);

const transitioning = ref(false);

watch(weight, (value, oldValue) => {
  if (oldValue === props.min && value > props.min) {
    executeTransition(fontWeight, oldValue, value, {
      duration: 100,
    }).then(() => (transitioning.value = false));
  } else if (oldValue > props.min && value === props.min) {
    executeTransition(fontWeight, oldValue, value, {
      duration: 100,
    }).then(() => (transitioning.value = false));
  } else if (!transitioning.value) {
    fontWeight.value = weight.value;
  }
});
</script>

<template>
  <span ref="container">
    <slot :value="fontWeight" />
  </span>
</template>
