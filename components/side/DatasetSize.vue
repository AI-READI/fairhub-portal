<script setup lang="ts">
import byteSize from "byte-size";

const props = defineProps({
  child: {
    default: 0,
    description: "Link to the mini version of the dataset",
    required: true,
    type: Number,
  },
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

const parsedSize = byteSize(props.size, { precision: 2 }).toString();
</script>

<template>
  <n-flex vertical class="rounded-xl border border-blue-200 bg-white px-1 py-4">
    <n-flex justify="center" align="center">
      <p class="text-lg font-semibold">{{ parsedSize }}</p>

      <div>
        <n-divider vertical />
      </div>

      <p class="text-lg font-semibold">
        {{ fileCount.toLocaleString() }}
        <span class="font-normal"> Files </span>
      </p>
    </n-flex>

    <NuxtLink
      v-if="child > 0"
      :to="`/datasets/${child}`"
      class="p flex justify-center text-xs text-sky-700 hover:underline"
    >
      A smaller version is available for model training...
    </NuxtLink>
  </n-flex>
</template>
