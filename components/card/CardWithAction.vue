<script setup lang="ts">
defineProps({
  title: {
    default: "Card Title",
    type: String,
  },
  bordered: {
    default: true,
    type: Boolean,
  },
  type: {
    default: "default",
    required: false,
    validator: (value: string) =>
      ["default", "warning", "success", "error"].includes(value),
  },
});
</script>

<template>
  <n-card :title="title" class="mb-6 rounded-md" :bordered="bordered">
    <slot />

    <template #header-extra>
      <slot name="header-extra"></slot>
    </template>

    <template #action>
      <slot name="action"></slot>
    </template>
  </n-card>
</template>
