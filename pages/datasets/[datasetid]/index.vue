<script setup lang="ts">
const push = usePush();
const route = useRoute();

const { datasetid } = route.params as { datasetid: string };

const { data: dataset, error } = await useFetch(`/api/datasets/${datasetid}`, {
  headers: useRequestHeaders(["cookie"]),
});

if (error.value) {
  console.error(error.value);

  push.error({
    title: "Something went wrong",
    message: "Failed to fetch dataset",
  });
}
</script>

<template>
  <main class="h-full bg-gradient-to-b from-slate-50 to-purple-50 px-4">
    <div class="mt-10 flex h-36 items-center">
      <div
        class="mx-auto flex w-full max-w-screen-xl items-center justify-between px-2"
      >
        <n-space vertical>
          <h1>{{ dataset?.title }}</h1>

          <p>{{ dataset?.description }}</p>

          <n-button size="large" type="info" secondary class="my-3">
            <template #icon>
              <Icon name="line-md:download-loop" />
            </template>
            Download this dataset
          </n-button>
        </n-space>

        <n-image
          :src="`https://api.dicebear.com/7.x/shapes/svg?seed=${dataset?.id}`"
          :alt="dataset?.title"
          class="size-32 h-32 w-32 rounded-lg"
        />
      </div>
    </div>

    <div class="mx-auto flex w-full max-w-screen-xl flex-col px-3 py-5">
      <n-tabs type="line" animated size="large">
        <n-tab-pane name="About" tab="About">
          <div class="grid grid-cols-5 gap-10">
            <n-space vertical class="col-span-4 mt-3">
              <h3>About</h3>

              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Temporibus quas ut at aliquam distinctio recusandae cupiditate
                dolorem nostrum hic enim ipsam, nemo praesentium, laborum
                debitis explicabo impedit, fugiat id alias. Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Temporibus esse, nostrum
                delectus a dolores officiis, suscipit recusandae dicta et
                assumenda deleniti saepe. Fugit veritatis maiores amet veniam
                quam quaerat quis! Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Aliquam quae culpa recusandae nulla dicta
                aliquid repellendus temporibus animi magnam sint, dignissimos
                magni nam natus modi asperiores delectus iste accusamus eius!
                Other parts of the readme file is shown here.
              </p>
            </n-space>

            <n-space vertical>
              <n-space vertical class="mt-3">
                <h3>License</h3>

                <NuxtLink
                  to="https://spdx.org/licenses/MIT.html"
                  target="_blank"
                  class="underline transition-all hover:text-slate-600"
                >
                  MIT
                </NuxtLink>
              </n-space>

              <n-space vertical class="mt-3">
                <h3>Keywords</h3>

                <n-space>
                  <n-tag type="info" size="small">Apple</n-tag>

                  <n-tag type="info" size="small">Banana</n-tag>

                  <n-tag type="info" size="small">Orange</n-tag>

                  <n-tag type="info" size="small">Pineapple</n-tag>

                  <n-tag type="info" size="small">Watermelon</n-tag>

                  <n-tag type="info" size="small">Grape</n-tag>

                  <n-tag type="info" size="small">Strawberry</n-tag>

                  <n-tag type="info" size="small">Cherry</n-tag>
                </n-space>
              </n-space>
            </n-space>
          </div>
        </n-tab-pane>

        <n-tab-pane name="Study Metadata" tab="Study Metadata">
          Study Metadata
        </n-tab-pane>

        <n-tab-pane name="Files" tab="Files"> File Viewer </n-tab-pane>
      </n-tabs>
    </div>
  </main>
</template>
