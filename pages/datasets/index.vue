<script setup lang="ts">
// list of datasets

const { data, pending } = await useFetch(`/api/datasets`, {
  headers: useRequestHeaders(["cookie"]),
  lazy: true,
  server: false,
});
</script>

<template>
  <main class="h-full bg-teal-50 px-4">
    <div class="flex h-36 items-center border-b border-gray-200 bg-white">
      <div
        class="mx-auto flex w-full max-w-screen-xl items-center justify-between px-2.5 lg:px-10"
      >
        <h1>Datasets</h1>
      </div>
    </div>

    <Icon
      v-if="pending"
      name="svg-spinners:gooey-balls-2"
      class="m-auto h-12 w-12"
    />

    <pre v-else>
      {{ data }}
    </pre>
  </main>
</template>
