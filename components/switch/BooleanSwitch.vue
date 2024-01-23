<script setup lang="ts">
const _props = defineProps({
  active: {
    required: true,
    type: Boolean,
  },
});
</script>

<template>
  <n-space>
    <n-switch :value="active" disabled>
      <template #checked-icon>
        <Icon name="ic:baseline-check" color="#8acba8" />
      </template>

      <template #unchecked-icon>
        <Icon name="ph:x-bold" color="#9ca3af" />
      </template>

      <template #checked>
        <span class="text-sm font-medium">True</span>
      </template>

      <template #unchecked>
        <span class="text-sm font-medium text-black">False</span>
      </template>
    </n-switch>
  </n-space>
</template>
