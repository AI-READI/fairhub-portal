<script setup>
import { computed, ref, watch } from "vue";
import {
  useElementBounding,
  useElementVisibility,
  useWindowSize,
} from "@vueuse/core";

const props = defineProps({
  as: {
    default: "div",
    type: String,
  },
  offset: {
    default: 0,
    type: Number,
  },
  once: {
    default: false,
    type: Boolean,
  },
  trigger: {
    default: "visible",
    type: String,
    validator: (prop) => ["middle", "top", "visible"].includes(prop),
  },
});

const container = ref();

const isActive = ref(false);

const { height, y } = useElementBounding(container);
const { height: windowHeight } = useWindowSize();
const isVisible = useElementVisibility(container);

const progress = computed(() => (-y.value / height.value) * 2);

const scrollRate = computed(() => {
  return (
    (y.value + height.value / 2 - windowHeight.value / 2) /
    (windowHeight.value / 2)
  );
});

const isIntersecting = computed(() => {
  if (props.trigger === "top") {
    return isVisible.value && y.value <= 0;
  } else if (props.trigger === "middle") {
    return (
      y.value > windowHeight.value / 2 - height.value &&
      y.value <= windowHeight.value / 2
    );
  }

  return isVisible.value && y.value <= windowHeight.value - props.offset;
});

watch(isIntersecting, () => {
  if (props.once && isIntersecting.value) {
    isActive.value = true;
  } else if (!props.once) {
    isActive.value = isIntersecting.value;
  }
});
</script>

<template>
  <component :is="as" ref="container">
    <slot
      :is-active="isActive"
      :scroll="y"
      :scroll-rate="scrollRate"
      :progress="progress"
    />
  </component>
</template>
