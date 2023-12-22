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

  throw new Error("Failed to fetch dataset");
}

const demoVersions = [
  {
    id: 1,
    title: "Version v5.4.2",
    date: "2021-05-01",
    doi: "10.5281/fairhub.1234567",
    selected: true,
  },
  {
    id: 2,
    title: "Version v5.4.1",
    date: "2021-04-01",
    doi: "10.5281/fairhub.1234567",
    selected: false,
  },
  {
    id: 3,
    title: "Version v5.4.0",
    date: "2021-03-01",
    doi: "10.5281/fairhub.1234567",
    selected: false,
  },
  {
    id: 4,
    title: "Version v5.3.0",
    date: "2021-02-01",
    doi: "10.5281/fairhub.1234567",
    selected: false,
  },
  {
    id: 5,
    title: "Version v5.2.0",
    date: "2021-01-01",
    doi: "10.5281/fairhub.1234567",
    selected: false,
  },
];
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
          <div class="grid grid-cols-7 gap-10">
            <n-space vertical class="col-span-5 mt-3">
              <h3>About</h3>

              <p>
                Excepteur deserunt dolor ipsum nostrud irure sunt pariatur anim
                ad. Sunt tempor id officia nisi ullamco non occaecat. Elit
                nostrud nulla elit excepteur. Enim sint aliqua amet tempor
                occaecat anim deserunt labore exercitation occaecat ut. Aute
                ullamco aute voluptate commodo esse adipisicing in culpa tempor
                excepteur duis non duis. Veniam irure adipisicing velit laborum
                minim adipisicing velit consequat aute ea ea nostrud. Anim
                labore sunt incididunt irure anim voluptate excepteur dolore
                occaecat aute proident sit tempor sint. <br />

                Elit irure aliquip magna in. Do anim pariatur velit eu magna
                proident proident. Enim eu sunt anim enim reprehenderit tempor
                incididunt. Mollit in sunt minim velit id et enim ut ex. Amet
                magna dolore enim tempor exercitation in. Est Lorem do ipsum
                dolore non veniam mollit veniam exercitation. Est magna aliqua
                sunt laborum aute adipisicing fugiat.
                <br />

                Amet dolore proident id ea sint velit. Commodo exercitation
                deserunt incididunt eu culpa duis nisi non laboris mollit. Ipsum
                do nisi nisi nostrud dolor laborum qui consequat consectetur.
                Quis tempor in deserunt excepteur pariatur dolor sunt voluptate
                sunt. Adipisicing proident amet ea enim in aute consectetur
                tempor veniam nisi ullamco anim. Eiusmod labore laboris anim eu
                commodo nostrud elit amet.
              </p>
            </n-space>

            <n-space vertical class="col-span-2">
              <n-space
                vertical
                class="rounded-xl border border-purple-200 bg-slate-50 px-4 pb-5 pt-3"
              >
                <n-space vertical>
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

              <n-space
                vertical
                class="rounded-xl border border-purple-200 bg-slate-50 pb-5 pt-3"
              >
                <n-space vertical :size="[0, 0]">
                  <h3 class="mb-3 px-4">Versions</h3>

                  <n-space
                    v-for="version in demoVersions"
                    :key="version.id"
                    justify="space-between"
                    align="start"
                    class="p-2 transition-all hover:bg-purple-50"
                    :class="{
                      '!bg-purple-200': version.selected,
                    }"
                  >
                    <div class="flex flex-col space-y-1">
                      <NuxtLink
                        to="#"
                        target="_blank"
                        class="text-sm font-medium transition-all hover:text-slate-600 hover:underline"
                      >
                        {{ version.title }}
                      </NuxtLink>

                      <NuxtLink
                        to="#"
                        target="_blank"
                        class="text-sm transition-all hover:text-slate-600 hover:underline"
                      >
                        {{ version.doi }}
                      </NuxtLink>
                    </div>

                    <p class="text-right text-xs text-gray-500">
                      {{ version.date }}
                    </p>
                  </n-space>
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
