<script setup lang="ts">
const props = defineProps({
  align: {
    default: "center",
    required: false,
    type: String,
  },
  gap: {
    default: "small",
    required: false,
    type: String,
  },
  justify: {
    default: "center",
    required: false,
    type: String,
  },
});

const alignClass = computed(() => {
  switch (props.align) {
    case "start":
      return "items-start";
    case "end":
      return "items-end";
    case "center":
      return "items-center";
    default:
      return "items-center";
  }
});

const justifyClass = computed(() => {
  switch (props.justify) {
    case "start":
      return "justify-start";
    case "end":
      return "justify-end";
    case "center":
      return "justify-center";
    case "space-between":
      return "justify-between";
    case "space-around":
      return "justify-around";
    case "space-evenly":
      return "justify-evenly";
    default:
      return "justify-start";
  }
});

const gapClass = computed(() => {
  switch (props.gap) {
    case "none":
      return "space-x-0";
    case "small":
      return "space-x-2";
    case "medium":
      return "space-x-4";
    case "large":
      return "space-x-8";
    default:
      return "space-x-2";
  }
});
</script>

<template>
  <div :class="`flex w-full ${alignClass} ${justifyClass} ${gapClass}`">
    <slot></slot>
  </div>
</template>
