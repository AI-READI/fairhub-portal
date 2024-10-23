<script setup lang="ts">
defineProps({
  id: {
    required: true,
    type: String,
  },
  versions: {
    required: true,
    type: Array as PropType<VersionArray>,
  },
});
</script>

<template>
  <n-flex vertical class="rounded-xl border border-sky-200 bg-white pb-5 pt-3">
    <n-flex vertical :size="[0, 0]">
      <h3 class="mb-3 px-4">Versions</h3>

      <n-flex
        v-for="version in versions"
        :key="version.id"
        justify="space-between"
        align="start"
        class="px-4 py-2 transition-all hover:bg-blue-50"
        :class="{
          '!bg-sky-100': version.id === id,
        }"
      >
        <div class="flex flex-col space-y-1">
          <NuxtLink
            :to="`/datasets/${version.id}`"
            class="text-sm font-medium transition-all hover:text-slate-600 hover:underline"
          >
            Version {{ version.title }}
          </NuxtLink>

          <NuxtLink
            :to="`https://doi.org/${version.doi}`"
            target="_blank"
            class="text-sm transition-all hover:text-slate-600 hover:underline"
          >
            {{ version.doi }}
          </NuxtLink>
        </div>

        <p class="text-right text-xs text-gray-500">
          {{ $dayjs.unix(version.createdAt).format("MMM D, YYYY") }}
        </p>
      </n-flex>
    </n-flex>
  </n-flex>
</template>
