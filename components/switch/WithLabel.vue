<script setup lang="ts">
defineProps({
  active: {
    required: true,
    type: Boolean,
  },
  disabled: {
    default: false,
    type: Boolean,
  },
});
</script>

<template>
  <n-space>
    <Icon
      size="25"
      :name="
        active ? 'icon-park-solid:check-one' : 'fluent-emoji-flat:no-entry'
      "
      :class="{
        'text-green-500': active,
        'text-red-500': !active,
      }"
    />

    <n-switch
      :round="true"
      size="large"
      :value="active"
      :disabled="disabled"
      class="hidden"
    >
      <template #checked-icon>
        <Icon name="ic:baseline-check" color="#8acba8" />
      </template>

      <template #unchecked-icon>
        <Icon name="ph:x-bold" color="#9ca3af" />
      </template>

      <template #checked>
        <span class="text-sm font-medium">Yes</span>
      </template>

      <template #unchecked>
        <span class="text-sm font-medium text-black">No</span>
      </template>
    </n-switch>
  </n-space>
</template>
