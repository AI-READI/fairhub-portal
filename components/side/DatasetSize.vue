<script setup lang="ts">
import byteSize from "byte-size";

const props = defineProps({
  fileCount: {
    default: 0,
    required: true,
    type: Number,
  },
  size: {
    default: 0,
    required: true,
    type: Number,
  },
});

const parsedSize = byteSize(props.size).toString();
</script>

<template>
  <n-space
    vertical
    class="rounded-xl border border-blue-200 bg-white px-1 py-4"
  >
    <n-space justify="center" align="center">
      <p class="text-lg font-semibold">{{ parsedSize }}</p>

      <div>
        <n-divider vertical />
      </div>

      <p class="text-lg font-semibold">
        {{ fileCount.toLocaleString() }}
        <span class="font-normal"> Files </span>
      </p>
    </n-space>
  </n-space>
</template>
