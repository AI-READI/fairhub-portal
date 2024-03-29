<script setup lang="ts">
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
  <main class="h-screen overflow-auto bg-gradient-to-br from-white to-blue-50">
    <section class="relative">
      <!-- <img
        src="/images/background/ooorganize-orange-grid.svg"
        class="absolute left-0 top-0 h-full w-full object-cover"
        style="
          mask-image: linear-gradient(to bottom, white 1%, transparent 70%);
        "
      /> -->

      <div
        class="relative mx-auto flex max-w-screen-xl flex-col px-4 lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-0"
      >
        <PatternDotGrid
          :size="60"
          :radius="3"
          :offset-x="0"
          :offset-y="20"
          class="dot-grid-1 absolute inset-0 h-full w-full fill-orange-500/30 [mask-image:radial-gradient(black,transparent_85%)]"
        >
        </PatternDotGrid>

        <div class="relative place-self-center lg:col-span-8 lg:mr-auto">
          <h1
            class="mb-3 max-w-2xl bg-gradient-to-tl from-sky-400 via-teal-300 to-yellow-400 bg-clip-text py-1 text-center text-3xl font-extrabold leading-none tracking-tight text-transparent md:text-4xl lg:text-left xl:text-6xl"
          >
            Make breakthrough discoveries with AI-ready datasets
          </h1>

          <p
            class="mb-2 max-w-2xl text-center text-2xl font-normal text-gray-800 lg:text-left"
          >
            Conveniently find and access FAIR, AI-ready clinical research
            datasets.
          </p>

          <n-divider class="hidden" />

          <div class="hidden max-w-2xl font-normal text-gray-800">
            Manage and share your own clinical research data with FAIRhub.
            <div class="mt-1 flex gap-3 duration-0">
              <NuxtLink
                to="https://staging.fairhub.io/submit"
                class="timing text-blue-500 transition-all hover:text-amber-500"
                icon-placement="right"
              >
                Share a dataset
                <Icon name="fluent:arrow-right-24-filled" />
              </NuxtLink>
            </div>
          </div>
        </div>

        <div class="relative flex justify-center lg:col-span-4 lg:mt-0 lg:flex">
          <img src="/images/hero/research.png" alt="mockup" />
        </div>
      </div>
    </section>

    <n-divider />

    <section>
      <div class="mb-4 flex h-36 items-center">
        <div
          class="mx-auto flex w-full max-w-screen-xl items-center justify-between px-2"
        >
          <n-space vertical class="mt-8 w-full">
            <h1 id="datasets">Explore Datasets</h1>

            <p>View FAIR, AI-ready datasets.</p>

            <!--            <div-->
            <!--              class="flex w-full flex-col items-center space-y-2 pt-4 sm:flex-row sm:space-x-5 sm:space-y-0"-->
            <!--            >-->
            <!--              <n-input-->
            <!--                size="large"-->
            <!--                placeholder="Diabetes Salutogenesis"-->
            <!--                class=""-->
            <!--              >-->
            <!--                <template #prefix>-->
            <!--                  <Icon-->
            <!--                    name="lets-icons:chat-search-fill"-->
            <!--                    size="25"-->
            <!--                    class="opacity-90"-->
            <!--                  />-->
            <!--                </template>-->
            <!--              </n-input>-->

            <!--              <n-button-->
            <!--                type="primary"-->
            <!--                secondary-->
            <!--                size="large"-->
            <!--                icon-placement="right"-->
            <!--                class="w-3/5 sm:w-auto"-->
            <!--              >-->
            <!--                <template #icon>-->
            <!--                  <Icon name="mingcute:arrow-right-fill" size="25" />-->
            <!--                </template>-->
            <!--                Search-->
            <!--              </n-button>-->
            <!--            </div>-->
          </n-space>
        </div>
      </div>

      <div
        class="mx-auto flex h-full w-full max-w-screen-xl flex-col px-3 pb-5"
      >
        <div class="flex flex-col space-y-6">
          <NuxtLink
            v-for="dataset in datasets"
            :key="dataset.id"
            :to="`/datasets/${dataset.id}`"
            class="h-full rounded-lg border border-sky-300 bg-white px-5 py-3 shadow-sm transition-all hover:border-sky-600 hover:bg-sky-50/70 hover:shadow-lg"
          >
            <div
              class="flex h-full w-full flex-col items-start space-y-5 sm:flex-row sm:space-x-5 sm:space-y-0"
            >
              <n-image
                src="https://raw.githubusercontent.com/AI-READI/AI-READI-logo/main/logo/png/option2.png"
                :alt="dataset.title"
                class="h-auto w-32 self-center rounded-xl"
              />

              <div
                class="flex h-full w-full flex-grow flex-col items-stretch justify-between space-y-2"
              >
                <n-space vertical>
                  <div
                    class="flex flex-wrap items-start justify-between md:flex-nowrap"
                  >
                    <h3>{{ dataset.title }}</h3>

                    <n-tag type="info" :bordered="false">
                      Version {{ dataset.version_title }}
                    </n-tag>
                  </div>

                  <p>
                    {{ dataset.description }}
                  </p>
                </n-space>

                <n-space>
                  <p>
                    <span class="font-bold">Created on:</span>

                    {{
                      $dayjs.unix(dataset.created_at).format("MMMM DD, YYYY")
                    }}
                  </p>
                </n-space>

                <n-space>
                  <n-tag
                    v-for="(subject, index) in dataset.metadata
                      .datasetDescription.subject"
                    :key="index"
                    :bordered="false"
                  >
                    {{ subject.subjectValue }}
                  </n-tag>
                </n-space>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <n-divider />

    <section class="p-16">
      <div class="relative overflow-hidden">
        <div class="relative mx-auto max-w-[85rem] sm:px-6 lg:px-8">
          <PatternDotGrid
            :size="50"
            :radius="4"
            :offset-x="0"
            :offset-y="0"
            class="dot-grid-2 absolute inset-0 h-full w-full fill-sky-500/20 [mask-image:radial-gradient(black,transparent_85%)]"
          >
          </PatternDotGrid>

          <div class="relative mx-auto mt-5 max-w-2xl text-center">
            <h1
              class="block bg-gradient-to-tl from-orange-400 to-yellow-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl"
            >
              Share your own datasets
            </h1>
          </div>

          <div class="relative mx-auto mt-5 max-w-3xl text-center">
            <p class="text-lg text-gray-600">
              Are you collecting clinical research data? Make it AI-ready and
              share it here easily using our study management platform.
            </p>
          </div>

          <div class="mt-8 flex justify-center gap-3">
            <NuxtLink to="/submit">
              <n-button
                size="large"
                icon-placement="right"
                type="warning"
                tertiary
              >
                <template #icon>
                  <Icon name="fluent:arrow-right-24-filled" />
                </template>
                Learn more
              </n-button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
