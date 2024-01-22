<script setup lang="ts">
const push = usePush();
const { data: datasets, error } = await useFetch(`/api/datasets`);

if (error.value) {
  console.error(error);

  push.error({
    title: "Something went wrong",
    message: "Failed to fetch datasets",
  });
}
</script>

<template>
  <main
    class="h-screen overflow-auto bg-gradient-to-b from-white to-purple-50 px-4"
  >
    <div
      class="mb-4 flex items-center justify-center rounded-lg border bg-yellow-50 p-4 text-lg text-yellow-600"
      role="alert"
    >
      <svg
        class="mr-3 inline h-4 w-4 flex-shrink-0"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
        />
      </svg>

      <span class="sr-only">Info</span>

      <div><span class="font-medium">Warning!</span> Work in progress</div>
    </div>

    <section class="">
      <div
        class="mx-auto grid max-w-screen-xl px-4 lg:grid-cols-12 lg:gap-8 xl:gap-0"
      >
        <div class="mr-auto place-self-center lg:col-span-8">
          <h1
            class="mb-2 max-w-2xl bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-3xl font-extrabold leading-none tracking-tight text-transparent md:text-4xl xl:text-5xl"
          >
            Make breakthrough discoveries with AI-ready datasets
          </h1>

          <p class="mb-2 max-w-2xl text-xl font-normal text-gray-800">
            Find and reuse FAIR, AI-ready datasets shared through the FAIRhub
            data management and curation platform.
          </p>
        </div>

        <div class="hidden lg:col-span-4 lg:mt-0 lg:flex">
          <img src="/images/hero/research.webp" alt="mockup" />
        </div>
      </div>
    </section>

    <n-divider />

    <section>
      <div class="mb-16 flex h-36 items-center">
        <div
          class="mx-auto flex w-full max-w-screen-xl items-center justify-between px-2"
        >
          <n-space vertical class="mt-8 w-full">
            <h1 id="datasets">Datasets</h1>

            <p>Explore FAIR, AI-ready datasets.</p>

            <div class="flex w-full items-center space-x-5 pt-4">
              <n-input
                size="large"
                placeholder="Diabetes Salutogenesis"
                class=""
              >
                <template #prefix>
                  <Icon
                    name="lets-icons:chat-search-fill"
                    size="25"
                    class="opacity-90"
                  />
                </template>
              </n-input>

              <n-button
                type="primary"
                secondary
                size="large"
                icon-placement="right"
              >
                <template #icon>
                  <Icon name="mingcute:arrow-right-fill" size="25" />
                </template>
                Search
              </n-button>
            </div>
          </n-space>
        </div>
      </div>

      <div
        class="mx-auto flex h-full w-full max-w-screen-xl flex-col px-3 py-5"
      >
        <div class="flex flex-col space-y-3">
          <NuxtLink
            v-for="dataset in datasets"
            :key="dataset.id"
            :to="`/datasets/${dataset.id}`"
            class="h-full rounded-lg border border-purple-300 bg-white px-5 py-3 shadow-sm transition-all hover:bg-fuchsia-50 hover:shadow-md"
          >
            <div class="flex h-full w-full items-start space-x-5">
              <n-image
                :src="`https://api.dicebear.com/7.x/shapes/svg?seed=${dataset.id}`"
                :alt="dataset.title"
                class="size-32 h-32 w-32 self-center rounded-xl"
              />

              <div
                class="flex h-full w-full flex-grow flex-col items-stretch justify-between space-y-2"
              >
                <n-space vertical>
                  <div class="flex items-start justify-between">
                    <h3>{{ dataset.title }}</h3>

                    <n-tag type="info" :bordered="false">
                      Version {{ dataset.version }}
                    </n-tag>
                  </div>

                  <p>
                    {{ dataset.description }}
                  </p>
                </n-space>

                <n-space>
                  <p>
                    <span class="font-bold">Created on:</span>

                    {{ $dayjs.unix(dataset.createdAt).format("MMMM DD, YYYY") }}
                  </p>
                </n-space>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>
