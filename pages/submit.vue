<script setup lang="ts">
const steps = ref([
  {
    description:
      "Sign up to create an account on FAIRhub. Create a new study and provide basic information about it to get started.",
    heading: "Create study",
    number: "Step 1",
  },
  {
    description:
      "Upload data on the go as it is being collected. Follow instructions to include metadata with the data so FAIRhub can process it automatically. Track data collection through available dashboards.",
    heading: "Upload data",
    number: "Step 2",
  },
  {
    description:
      "Follow our simple data sharing workflow to select select data to be shared, select a data use license, review data and metadata structure, create public/protected versions, reserve a DOI, and publish your dataset.",
    heading: "Publish dataset",
    number: "Step 3",
  },
]);

const statistics = ref([
  {
    details: "Participants anticipated in the study",
    heading: "Upload data",
    number: "200",
  },
  {
    details: "Data types to be collected (vitals, electrocardiogram, etc.)",
    heading: "Upload data",
    number: "25+",
  },
  {
    details: "Research institutions involved",
    heading: "Upload data",
    number: "14",
  },
  {
    details: "Project Team members",
    heading: "Upload data",
    number: "56",
  },
]);
</script>

<template>
  <main class="flex h-screen w-full flex-col overflow-auto to-blue-50 px-4">
    <section class="py-16">
      <div class="relative overflow-hidden">
        <div class="mx-auto max-w-[85rem] sm:px-6 lg:px-8">
          <div class="mx-auto mt-5 max-w-2xl text-center">
            <h1
              class="block bg-gradient-to-tl from-sky-400 to-emerald-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl"
            >
              Submit your own datasets
            </h1>
          </div>

          <div class="mx-auto mt-5 max-w-3xl text-center">
            <p class="text-lg text-gray-600">
              Our study management platform is designed to be easy to use and to
              help you to make your data FAIR and AI ready.
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
                Submit a Dataset
              </n-button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-slate-50 py-16">
      <div class="mx-auto mb-5 flex max-w-screen-xl flex-col items-center">
        <h2 class="text-4xl font-bold">About</h2>

        <div class="mb-10 mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <img class="rounded-lg" src="../assets/lottie/01.jpg" />

          <img class="rounded-lg" src="../assets/lottie/02.jpg" />

          <img class="rounded-lg" src="../assets/lottie/4.jpg" />
        </div>

        <p class="text-center text-xl font-medium text-slate-500">
          FAIRhub is an open source platform for sharing and accessing FAIR and
          and AI-readi datasets. Your clinical research data can be easily with
          the world through FAIRhub in a way that it is optimally reusable
          reusable by both researchers and AI applications. It is built from the
          the ground up to include convenient and efficient tools for data
          management, tracking, curation, and sharing in line with the FAIR
          (Findable, Accessible, Interoperable, Reusable) Principles.
        </p>
      </div>
    </section>

    <!--    <section class="pb-4 pt-4">-->
    <!--      <div class="px-8">-->
    <!--        <div-->
    <!--          class="m-2 mx-auto max-w-screen-xl rounded-lg bg-slate-100 pb-4 pl-16 pr-16 pt-8 text-center"-->
    <!--        >-->
    <!--          <h2-->
    <!--            class="mb-2 text-3xl font-bold tracking-tight text-sky-600 sm:text-4xl"-->
    <!--          >-->
    <!--            Snapshot of the FAIRhub-->
    <!--          </h2>-->
    <!--          <p class="text-xl font-medium text-slate-600">-->
    <!--            Some key numbers from the project-->
    <!--          </p>-->
    <!--          <div class="flex justify-center">-->
    <!--            <div-->
    <!--              v-for="(statistic, index) in statistics"-->
    <!--              :key="index"-->
    <!--              class="flex flex-row items-center justify-start space-y-3 text-center"-->
    <!--            >-->
    <!--              <div>-->
    <!--                <dt class="mt-3 text-5xl font-bold text-amber-400">-->
    <!--                  {{ statistic.number }}-->
    <!--                </dt>-->
    <!--                <dd class="text-lg font-medium text-gray-900">-->
    <!--                  {{ statistic.details }}-->
    <!--                </dd>-->
    <!--              </div>-->
    <!--              <div v-if="index !== statistics.length - 1" class="h-40 border-l">-->
    <!--                <n-divider vertical />-->
    <!--              </div>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </section>-->

    <section class="py-16">
      <div class="mx-auto mb-5 flex max-w-screen-xl flex-col items-center">
        <h2 class="pb-3 pt-3 text-4xl font-bold">Share Data</h2>

        <p class="text-center text-xl font-medium text-slate-500">
          FAIRhub combines intuitive user interfaces with automation tools and
          integration with existing data management tools such as REDCap to
          simplify the process of sharing AI-ready clinical research data. You
          can do that in few easy steps and start getting credit whenever your
          data is reused to fuel future discoveries!
        </p>
      </div>

      <div class="mx-auto grid max-w-screen-xl grid-cols-3 gap-10 py-10">
        <div
          v-for="step in steps"
          :key="step.heading"
          class="flex flex-col justify-start rounded-xl border-2 border-slate-200 bg-gray-50 px-6 py-4"
        >
          <div>
            <h3 class="pb-4 pt-3 text-4xl font-bold text-sky-600">
              {{ step.number }}
            </h3>

            <n-divider v-if="step" />
          </div>

          <h4 class="pr-3 text-4xl font-semibold text-amber-400">
            {{ step.heading }}
          </h4>

          <p class="py-10 pr-4 text-base text-slate-500">
            {{ step.description }}
          </p>
        </div>
      </div>
    </section>
  </main>
</template>
