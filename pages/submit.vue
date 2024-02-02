<script setup lang="ts">
import { NProgress, useThemeVars } from "naive-ui";

const themeVars = useThemeVars();

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
  <main class="flex h-screen w-full flex-col overflow-auto to-blue-50">
    <section class="p-16">
      <div class="relative overflow-hidden">
        <div class="mx-auto max-w-[85rem] sm:px-6 lg:px-8">
          <div class="mx-auto mt-5 max-w-2xl text-center">
            <h1
              class="block bg-gradient-to-tl from-blue-400 to-emerald-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl"
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

    <section class="bg-orange-50 p-16">
      <div class="mx-auto mb-5 flex max-w-screen-xl flex-col items-center">
        <h2 class="text-4xl font-bold">About</h2>

        <div class="mb-10 mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <img
            class="rounded-lg"
            src="../public/images/publish-dataset/research01.jpg"
          />

          <img
            class="rounded-lg"
            src="../public/images/publish-dataset/research02.jpg"
          />

          <img
            class="rounded-lg"
            src="../public/images/publish-dataset/research03.jpg"
          />
        </div>

        <p class="text-center text-xl font-medium">
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
    <!--            class="mb-2 text-3xl font-bold tracking-tight text-blue00 sm:text-4xl"-->
    <!--          >-->
    <!--            Snapshot of the FAIRhub-->
    <!--          </h2>-->
    <!--          <p class="text-xl font-medium">-->
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
      <div
        class="mx-auto mb-5 flex max-w-screen-xl flex-col items-center max-2xl:px-10"
      >
        <h2 class="pb-3 pt-3 text-4xl font-bold">Share Data</h2>

        <p class="text-center text-xl font-medium">
          FAIRhub combines intuitive user interfaces with automation tools and
          integration with existing data management tools such as REDCap to
          simplify the process of sharing AI-ready clinical research data. You
          can do that in few easy steps and start getting credit whenever your
          data is reused to fuel future discoveries!
        </p>
      </div>

      <div
        class="mx-auto flex max-w-screen-xl gap-10 px-4 py-10 max-2xl:px-10 max-lg:max-w-screen-md max-lg:flex-wrap"
      >
        <div
          v-for="(step, index) in steps"
          :key="step.heading"
          class="flex max-w-md flex-1 flex-col justify-start rounded-xl border-2 border-orange-100 bg-orange-50 px-6 py-4"
        >
          <div class="flex flex-row gap-6">
            <h3 class="pt-3 text-4xl font-bold text-blue-600">
              {{ step.number }}
            </h3>

            <Icon
              v-if="index === 0"
              name="carbon:intent-request-create"
              class="h-16 w-12 text-blue-600"
            />

            <Icon
              v-if="index === 1"
              name="et-upload"
              class="h-16 w-12 text-blue-600"
            />

            <Icon
              v-if="index === 2"
              name="arcticons:efa-publish"
              class="h-16 w-12 text-blue-600"
            />
          </div>

          <n-progress
            v-if="index === 0"
            class="mb-10 mt-4"
            type="line"
            :show-indicator="false"
            status="info"
            :percentage="35"
          />

          <n-progress
            v-if="index === 1"
            class="mb-10 mt-4"
            type="line"
            :show-indicator="false"
            status="info"
            :percentage="65"
          />

          <n-progress
            v-if="index === 2"
            class="mb-10 mt-4"
            type="line"
            :show-indicator="false"
            status="info"
            :percentage="100"
          />

          <h4 class="pr-3 text-4xl font-semibold text-amber-400">
            {{ step.heading }}
          </h4>

          <p class="py-10 pr-4">
            {{ step.description }}
          </p>
        </div>
      </div>
    </section>

    <!--    <section class="p-16">-->
    <!--      <div-->
    <!--        class="mx-auto mb-5 flex max-w-screen-xl flex-col items-center max-2xl:px-10"-->
    <!--      >-->
    <!--        <h2 class="pb-3 pt-3 text-4xl font-bold">Share Data</h2>-->
    <!--        <p class="text-center text-xl font-medium">-->
    <!--          FAIRhub combines intuitive user interfaces with automation tools and-->
    <!--          integration with existing data management tools such as REDCap to-->
    <!--          simplify the process of sharing AI-ready clinical research data. You-->
    <!--          can do that in few easy steps and start getting credit whenever your-->
    <!--          data is reused to fuel future discoveries!-->
    <!--        </p>-->
    <!--      </div>-->
    <!--      <div-->
    <!--        class="mx-auto flex max-w-screen-xl gap-10 px-4 py-10 max-2xl:px-10 max-lg:max-w-screen-md max-lg:flex-wrap"-->
    <!--      >-->
    <!--        <div-->
    <!--          v-for="step in steps"-->
    <!--          :key="step.heading"-->
    <!--          class="min-w-70 flex max-w-md flex-1 flex-col justify-start rounded-xl border-2 border-slate-200 bg-gray-50 px-6 py-4"-->
    <!--        >-->
    <!--          <div>-->
    <!--            <h3 class="pt-3 text-4xl font-bold text-blue-600">-->
    <!--              {{ step.number }}-->
    <!--            </h3>-->
    <!--            <n-divider v-if="step" />-->
    <!--          </div>-->
    <!--          <h4 class="pr-3 text-4xl font-semibold text-amber-400">-->
    <!--            {{ step.heading }}-->
    <!--          </h4>-->
    <!--          <p class="py-10 pr-4 text-base">-->
    <!--            {{ step.description }}-->
    <!--          </p>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </section>-->

    <section class="py-16">
      <div
        class="flex h-20 w-full flex-col items-stretch rounded-t-[50%] bg-gradient-to-b from-orange-50 via-orange-50 to-orange-50 text-center"
      ></div>

      <div
        class="mx-auto flex max-w-screen-xl flex-col items-center bg-orange-50"
      >
        <h2 class="mb-16 pb-3 pt-3 text-4xl font-bold">
          The layers of FAIRhub platform
        </h2>

        <div class="m-16 flex flex-row gap-32">
          <p class="min-w-md max-w-md text-xl font-medium" style="flex-grow: 2">
            FAIRhub combines intuitive user interfaces with automation tools and
            integration with existing data management tools such as REDCap to
            simplify the process of sharing AI-ready clinical research data. You
            can do that in few easy steps and start getting credit whenever your
            data is reused to fuel future discoveries!
          </p>

          <img
            class="min-w-md mr-8 max-w-md rounded-md"
            src="../public/images/schema01.jpg"
          />
        </div>

        <div class="m-16 flex flex-row-reverse gap-32">
          <p class="min-w-md max-w-md text-xl font-medium">
            Making data FAIR and AI-ready requires several steps (converting
            files to files to files to standard format, including metadata in a
            standard using controlled vocabulary, organizing data and metadata
            into an structured dataset, etc.). Therefore, doing so can be
            difficult and time consuming for data collecting researchers.
            FAIRhub is intended to streamline this process to encourage
            systematic data sharing.
          </p>

          <img
            class="min-w-md mr-8 max-w-md rounded-md"
            src="../public/images/schema01.jpg"
          />
        </div>

        <div class="m-16 flex flex-row gap-32">
          <p class="min-w-md max-w-md text-xl font-medium">
            AI-READI (Artificial Intelligence Ready and Equitable Atlas for
            Diabetes Insights) is one of the data generation projects of the
            National Institutes of Health (NIH) funded Bridge2AI Program. The
            AI-READI project seeks to create and share a flagship
            ethically-sourced dataset of type 2 diabetes.
          </p>

          <img
            class="min-w-md mr-8 max-w-md rounded-md"
            src="../public/images/schema01.jpg"
          />
        </div>
      </div>

      <div
        class="mb-8 flex h-20 w-full flex-col items-stretch rounded-b-[50%] bg-gradient-to-t from-orange-50 via-orange-50 to-orange-50 pt-16 text-center"
      ></div>
    </section>
  </main>
</template>
