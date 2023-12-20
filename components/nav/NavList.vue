<script setup>
import { provide, onMounted, ref } from "vue";

defineProps({
  as: {
    default: "div",
    type: String,
  },
});

const container = ref();

const children = ref([]);

onMounted(() => {
  children.value = Array.from(container.value.children);
});

provide("peers", children);
</script>

<template>
  <component :is="as" ref="container">
    <slot />
  </component>
</template>
