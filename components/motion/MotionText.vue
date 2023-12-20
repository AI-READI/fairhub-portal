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
  mode: {
    default: "symbol",
    type: String,
    validator: (prop) => ["symbol", "word"].includes(prop),
  },
});

const tokens = computed(() => {
  if (props.mode === "symbol") {
    return props.body.trim().split("");
  }

  return props.body.trim().match(/\S+|\s+/g) || [];
});
</script>

<template>
  <component :is="as">
    <slot :tokens="tokens" :progress="progress" />
  </component>
</template>
