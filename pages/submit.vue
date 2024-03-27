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
  <main class="flex h-screen w-full flex-col overflow-auto to-blue-50">
    <section class="p-16">
      <div class="relative overflow-hidden">
        <div class="mx-auto max-w-[85rem] sm:px-6 lg:px-8">
          <div class="mx-auto mt-5 max-w-2xl text-center">
            <h1
              class="block bg-gradient-to-tl from-blue-400 to-emerald-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl"
            >
              Share your own datasets
            </h1>
          </div>

          <div class="mx-auto mt-5 max-w-3xl text-center">
            <p class="text-lg text-gray-600">
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

    <section class="bg-blue-50 p-16">
      <div class="mx-auto mb-5 flex max-w-screen-xl flex-col items-center">
        <h2
          class="block bg-gradient-to-tl from-orange-400 to-yellow-400 bg-clip-text py-5 text-5xl font-bold text-transparent"
        >
          About
        </h2>

        <div class="my-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <NuxtImg
            loading="lazy"
            class="rounded-lg"
            src="https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />

          <NuxtImg
            loading="lazy"
            class="rounded-lg"
            src="https://images.unsplash.com/photo-1618053448492-2b629c2c912c?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />

          <NuxtImg
            loading="lazy"
            class="rounded-lg"
            src="https://images.unsplash.com/photo-1582719201918-f1fa99cc3c1d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>

        <p class="text-center text-xl font-normal">
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

    <section class="py-16">
      <div
        class="mx-auto mb-5 flex max-w-screen-xl flex-col items-center max-2xl:px-10"
      >
        <h2
          class="block bg-gradient-to-tl from-orange-400 to-yellow-400 bg-clip-text py-5 text-5xl font-bold text-transparent"
        >
          Share Data
        </h2>

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
          v-for="step in steps"
          :key="step.heading"
          class="flex max-w-md flex-1 flex-col justify-start rounded-xl border-2 border-orange-100 bg-orange-50/50 px-6 py-4"
        >
          <n-space align="center">
            <Icon :name="step.name" class="size-10 text-orange-500/70" />

            <h3 class="text-4xl font-medium text-orange-500/80">
              {{ step.number }}
            </h3>
          </n-space>

          <n-progress
            class="mb-6 mt-4"
            type="line"
            color="skyblue"
            :show-indicator="false"
            status="info"
            processing
            :percentage="step.percentage"
          />

          <h4 class="pr-3 text-4xl font-bold text-blue-500">
            {{ step.heading }}
          </h4>

          <p class="py-5">
            {{ step.description }}
          </p>
        </div>
      </div>
    </section>

    <section class="pt-16">
      <div
        class="mx-auto h-20 rounded-t-[50%] bg-gradient-to-b from-blue-50 via-blue-50 to-blue-50 text-center"
      ></div>

      <div class="mx-auto flex flex-col items-center bg-blue-50 px-5">
        <h2
          class="mb-16 block bg-gradient-to-tl from-orange-400 to-yellow-400 bg-clip-text py-5 text-5xl font-bold text-transparent"
        >
          The layers of FAIRhub platform
        </h2>

        <h3>Subheader1</h3>

        <div
          class="m-16 flex flex-row gap-32 max-xl:flex-wrap max-xl:justify-center"
        >
          <p class="min-w-md max-w-md text-xl font-medium" style="flex-grow: 2">
            FAIRhub combines intuitive user interfaces with automation tools and
            integration with existing data management tools such as REDCap to
            simplify the process of sharing AI-ready clinical research data. You
            can do that in few easy steps and start getting credit whenever your
            data is reused to fuel future discoveries!
          </p>

          <img
            class="min-w-md mr-8 max-w-md rounded-md"
            src="/images/schema01.jpg"
          />
        </div>

        <h3>Subheader2</h3>

        <div
          class="m-16 flex flex-row-reverse gap-32 max-xl:flex-wrap max-xl:justify-center"
        >
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
            src="/images/schema01.jpg"
          />
        </div>

        <h3>Subheader3</h3>

        <div
          class="m-16 flex flex-row gap-32 max-xl:flex-wrap max-xl:justify-center"
        >
          <p class="min-w-md max-w-md text-xl font-medium">
            AI-READI (Artificial Intelligence Ready and Equitable Atlas for
            Diabetes Insights) is one of the data generation projects of the
            National Institutes of Health (NIH) funded Bridge2AI Program. The
            AI-READI project seeks to create and share a flagship
            ethically-sourced dataset of type 2 diabetes.
          </p>

          <img
            class="min-w-md mr-8 max-w-md rounded-md"
            src="/images/schema01.jpg"
          />
        </div>
      </div>

      <!-- unhide this when we have a section to put below -->
      <div
        class="mx-auto hidden h-20 rounded-b-[50%] bg-gradient-to-t from-blue-50 via-blue-50 to-blue-50 text-center"
      ></div>
    </section>
  </main>
</template>
