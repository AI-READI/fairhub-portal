<script setup lang="ts">
const props = defineProps({
  id: {
    required: true,
    type: String,
  },
});

const { data: versions, pending } = await useFetch(
  `/api/versions/${props.id}`,
  {
    lazy: true,
    server: false,
  },
);

// todo: add a watchEffect for the error responses
</script>

<template>
  <n-space
    vertical
    class="rounded-xl border border-blue-200 bg-white pb-5 pt-3"
  >
    <n-space vertical :size="[0, 0]">
      <h3 class="mb-3 px-4">Versions</h3>

      <TransitionFade>
        <div v-if="pending" class="flex justify-center p-2">
          <Icon name="svg-spinners:3-dots-scale" size="30" />
        </div>

        <div v-else>
          <n-space
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
          </n-space>
        </div>
      </TransitionFade>
    </n-space>
  </n-space>
</template>
