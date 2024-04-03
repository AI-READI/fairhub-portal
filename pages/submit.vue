<script setup lang="ts">
const steps = ref([
  {
    name: "carbon:intent-request-create",
    description:
      "Sign up to create an account on FAIRhub. Create a new study and provide basic information about it to get started.",
    heading: "Create study",
    number: "Step 1",
    percentage: 33,
  },
  {
    name: "lets-icons:upload-light",
    description:
      "Upload data on the go as it is being collected. Follow instructions to include metadata with the data so FAIRhub can process it automatically. Track data collection through available dashboards.",
    heading: "Upload data",
    number: "Step 2",
    percentage: 66,
  },
  {
    name: "arcticons:efa-publish",
    description:
      "Follow our simple data sharing workflow to select select data to be shared, select a data use license, review data and metadata structure, create public/protected versions, reserve a DOI, and publish your dataset.",
    heading: "Publish dataset",
    number: "Step 3",
    percentage: 100,
  },
]);
</script>

<template>
  <main
    class="flex h-screen w-full flex-col overflow-auto bg-gradient-to-tl from-blue-50 to-white"
  >
    <section class="p-16">
      <div class="relative overflow-hidden">
        <div class="mx-auto max-w-[85rem] sm:px-6 lg:px-8">
          <div class="mx-auto mt-5 max-w-2xl text-center">
            <h1
              class="block bg-gradient-to-tl from-blue-400 to-emerald-400 bg-clip-text text-5xl font-bold text-transparent md:text-5xl lg:text-6xl"
            >
              Share your own datasets
            </h1>
          </div>

          <div class="mx-auto mt-5 max-w-3xl text-center">
            <p class="text-center text-2xl font-normal text-gray-800">
              The FAIRhub study management platform (app.fairhub.io) is designed
              to help you easily manage your clinicals research data and share
              it on the FAIRhub data platform (fairhub.io) such that it is FAIR
              and AI-ready.
            </p>
          </div>

          <div class="mt-8 flex justify-center gap-3">
            <NuxtLink to="https://staging.app.fairhub.io" target="__blank">
              <n-button
                size="large"
                icon-placement="right"
                type="info"
                secondary
              >
                <template #icon>
                  <Icon name="fluent:arrow-right-24-filled" />
                </template>
                Manage and share datasets
              </n-button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div
        class="mx-auto h-20 rounded-t-[50%] bg-gradient-to-r from-blue-50 via-blue-50 to-transparent text-center"
      ></div>

      <div
        class="bg-gradient-to-r from-blue-50 via-blue-50 to-transparent pb-16"
      >
        <div
          class="mx-auto mb-5 flex max-w-screen-xl flex-col items-center max-2xl:px-10"
        >
          <h2
            class="block bg-gradient-to-tl from-orange-400 to-yellow-400 bg-clip-text pb-5 text-3xl font-bold text-transparent md:text-4xl lg:text-5xl"
          >
            How to share and reuse data
          </h2>

          <p class="text-center text-xl font-medium">
            In FAIRhub platform, you can share the data in few easy steps and
            start getting credit whenever your data is reused to fuel future
            discoveries!
          </p>
        </div>

        <div
          class="mx-auto flex max-w-screen-xl gap-10 px-4 py-8 max-2xl:px-10 max-xl:flex-wrap max-xl:justify-center max-lg:max-w-screen-md"
        >
          <div
            v-for="step in steps"
            :key="step.heading"
            class="flex max-w-md flex-1 flex-col justify-start rounded-xl border-2 border-orange-300 bg-orange-50/50 px-6 py-4 max-lg:min-w-[20rem]"
          >
            <n-space align="center">
              <Icon :name="step.name" class="size-10 text-orange-500/70" />

              <h3 class="text-3xl font-medium text-orange-500/80">
                {{ step.number }}
              </h3>
            </n-space>

            <n-progress
              class="mb-6 mt-4"
              type="line"
              color="#bae6fd"
              :show-indicator="false"
              status="info"
              processing
              :percentage="step.percentage"
            />

            <h3 class="pr-3 text-2xl font-bold text-sky-600">
              {{ step.heading }}
            </h3>

            <p class="py-5">
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
