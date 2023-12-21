<script setup lang="ts">
const push = usePush();
const { data: datasets, error } = await useFetch(`/api/datasets`, {
  headers: useRequestHeaders(["cookie"]),
});

if (error.value) {
  console.error(error.value);

  push.error({
    title: "Something went wrong",
    message: "Failed to fetch datasets",
  });
}
</script>

<template>
  <main class="h-full bg-gradient-to-b from-slate-50 to-purple-50 px-4">
    <div class="flex h-36 items-center">
      <div
        class="mx-auto flex w-full max-w-screen-xl items-center justify-between px-2"
      >
        <n-space vertical>
          <h1>Datasets</h1>

          <p>Explore the datasets that are available to you.</p>
        </n-space>
      </div>
    </div>

    <div class="mx-auto flex w-full max-w-screen-xl flex-col px-3 py-5">
      <div>
        <n-input type="text" placeholder="Search datasets" size="large">
          <template #prefix>
            <Icon name="mdi:magnify" />
          </template>
        </n-input>
      </div>

      <n-divider />

      <div class="flex flex-col space-y-3">
        <NuxtLink
          v-for="dataset in datasets"
          :key="dataset.id"
          :to="`/datasets/${dataset.id}`"
          class="rounded-lg border border-purple-300 bg-white px-5 py-3 shadow-sm transition-all hover:bg-fuchsia-50 hover:shadow-md"
        >
          <n-space size="large">
            <n-image
              :src="`https://api.dicebear.com/7.x/shapes/svg?seed=${dataset.id}`"
              :alt="dataset.title"
              class="size-32 h-32 w-32 rounded-lg"
            />

            <div
              class="flex h-full flex-col items-start justify-between space-y-2 pb-2"
            >
              <n-space vertical>
                <h3>{{ dataset.title }}</h3>

                <p>
                  {{ dataset.description }}
                </p>
              </n-space>

              <n-space vertical>
                <p>
                  <span class="font-bold">Created on:</span>
                  {{ $dayjs(dataset.createdAt).format("MMMM DD, YYYY") }}
                </p>
              </n-space>
            </div>
          </n-space>
        </NuxtLink>
      </div>
    </div>
  </main>
</template>
