<script setup lang="ts">
const props = defineProps({
  metadata: {
    required: true,
    type: Object as PropType<DatasetDescription>,
  },
});

console.log(props.metadata);
</script>

<template>
  <n-space vertical size="large"> </n-space>
</template>
