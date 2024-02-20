<script setup lang="ts">
import { nanoid } from "nanoid";

const id = nanoid();

defineProps({
  offsetX: {
    default: 0,
    type: Number,
  },
  offsetY: {
    default: 0,
    type: Number,
  },
  radius: {
    default: 1,
    type: Number,
  },
  size: {
    default: 16,
    type: Number,
  },
});
</script>

<template>
  <svg>
    <defs>
      <pattern
        :id="`dot-pattern-${id}`"
        :width="size"
        :height="size"
        patternUnits="userSpaceOnUse"
        patternContentUnits="userSpaceOnUse"
        :x="offsetX"
        :y="offsetY"
      >
        <circle :cx="size / 2" :cy="size / 2" :r="radius"></circle>
      </pattern>
    </defs>

    <rect
      width="100%"
      height="100%"
      stroke-width="0"
      :fill="`url(#dot-pattern-${id})`"
    ></rect>
  </svg>
</template>
