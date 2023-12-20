<script setup>
import { computed } from "vue";

const props = defineProps({
  as: {
    default: "div",
    type: String,
  },
  body: {
    required: true,
    type: String,
  },
});

const tokens = computed(() => props.body.split(""));
</script>

<template>
  <component :is="as">
    <slot :tokens="tokens" />
  </component>
</template>
