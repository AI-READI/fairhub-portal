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
    <section class="px-16 py-12">
      <div class="mx-auto mb-5 flex max-w-screen-xl flex-col items-center">
        <h2
          class="block bg-gradient-to-tl from-orange-400 to-yellow-400 bg-clip-text py-5 text-5xl font-bold text-transparent"
        >
          About
        </h2>

        <p class="pb-8 text-center text-xl font-normal">
          FAIRhub is an open source platform for sharing and accessing FAIR and
          and AI-readi datasets. Your clinical research data can be easily with
          the world through FAIRhub in a way that it is optimally reusable
          reusable by both researchers and AI applications. It is built from the
          the ground up to include convenient and efficient tools for data
          management, tracking, curation, and sharing in line with the FAIR
          (Findable, Accessible, Interoperable, Reusable) Principles.
        </p>

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
      </div>
    </section>

    <section class="py-16">
      <div
        class="mx-auto h-20 rounded-t-[50%] bg-gradient-to-b from-blue-50 via-blue-50 to-blue-50 text-center"
      ></div>

      <div class="mx-auto flex flex-col items-center bg-blue-50 px-5">
        <h2
          class="my-16 block bg-gradient-to-tl from-orange-400 to-yellow-400 bg-clip-text py-5 text-5xl font-bold text-transparent"
        >
          The layers of FAIRhub platform
        </h2>

        <h3>App.fairhub.io</h3>

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

        <h3>fairhub.io</h3>

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

        <h3>API</h3>

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
