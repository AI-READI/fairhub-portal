<script setup lang="ts">
// const layers = ref([
//   {
//     colSpan: 5,
//     header: "FAIRhub Data platform",
//     img: "/images/schema01.jpg",
//     text: "FAIRhub is an open source platform for sharing and accessing FAIR and AI-ready datasets. Your clinical research data can be easily shared with the world through FAIRhub in a way that it is optimally reusable by both researchers and AI applications.",
//   },
//   {
//     colSpan: 2,
//     header: "FAIRhub study management platform",
//     img: "/images/schema01.jpg",
//     text: "Conveniently find and access FAIR, AI-ready clinical research datasets.",
//   },
//   {
//     colSpan: 4,
//     header: "FAIRhub Platform Pipeline",
//     img: "/images/schema01.jpg",
//     text: "The pipeline repository serves as a centralized location housing scripts designed for managing data flow and executing logical operations within a system. These scripts typically include interactions with a database to retrieve, manipulate, or store data, facilitating efficient data processing workflows. By encapsulating database interactions and logical procedures within the pipeline scripts, the repository promotes modularity, maintainability, and and scalability of the overall system architecture.",
//   },
//   {
//     colSpan: 4,
//     header: "FAIRhub API",
//     img: "/images/schema01.jpg",
//     text: "The pipeline repository serves as a centralized location housing scripts designed for managing data flow and executing logical operations within a system. These scripts typically include interactions with a database to retrieve, manipulate, or store data, facilitating efficient data processing workflows. By encapsulating database interactions and logical procedures within the pipeline scripts, the repository promotes modularity, maintainability, and and scalability of the overall system architecture.",
//   },
// ]);
</script>

<template>
  <main
    class="flex h-screen w-full flex-col overflow-auto bg-gradient-to-tl from-blue-50"
  >
    <section class="px-16 py-12">
      <div class="mx-auto mb-5 flex max-w-screen-xl flex-col items-center">
        <h1
          class="block bg-gradient-to-tl from-orange-400 to-yellow-400 bg-clip-text pb-4 pt-5 text-5xl font-bold text-transparent md:text-5xl lg:text-6xl"
        >
          About
        </h1>

        <p class="pb-4 text-center text-2xl font-normal text-gray-800">
          FAIRhub is an open source platform for sharing and accessing FAIR and
          and AI-ready datasets. Your clinical research data can be easily with
          the world through FAIRhub in a way that it is optimally reusable
          reusable by both researchers and AI applications.
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

    <section>
      <div
        class="content z-10 mx-auto flex flex-col items-center bg-cover px-5 py-24"
      >
        <h2
          class="block bg-gradient-to-tl from-orange-400 to-yellow-400 bg-clip-text pb-12 text-4xl font-bold text-transparent md:text-4xl lg:text-5xl"
        >
          The layers of FAIRhub platform
        </h2>

        <div class="max-w-[80rem] rounded-3xl px-4">
          <div
            class="flex flex-row items-center gap-2 max-xl:flex-wrap max-xl:justify-center max-md:w-[20rem]"
          >
            <div
              class="flex min-h-[16.7rem] grow flex-col gap-8 rounded-2xl border-4 border-sky-100 bg-white p-6 max-md:min-w-[20rem]"
            >
              <div class="flex flex-row items-center gap-4">
                <Icon
                  name="carbon:ibm-openshift-container-platform-on-vpc-for-regulated-industries"
                  color="#0284c7"
                  size="2rem"
                />

                <h3 class="text-sky-700">Study Management Platform</h3>
              </div>

              <p class="text-xl font-medium">
                FAIRhub combines intuitive user interfaces with automation tools
                and integration with existing data management tools such as
                REDCap to simplify the process of sharing AI-ready clinical
                research data.
              </p>
            </div>

            <div
              class="flex min-h-[16.7rem] flex-col gap-8 rounded-2xl border-4 border-sky-100 bg-white p-6 max-md:min-w-[20rem]"
            >
              <div class="flex flex-row items-center gap-4">
                <Icon
                  name="icon-park-twotone:data-switching"
                  color="#0284c7"
                  size="2rem"
                />

                <h3 class="text-sky-700">Platform Pipeline</h3>
              </div>

              <p class="min-w-md text-xl font-medium">
                The pipeline repository serves as a centralized location housing
                scripts designed for managing data flow and executing logical
                operations within a system. These scripts include interactions
                with a database to retrieve facilitating efficient data
                processing workflows.
              </p>
            </div>
          </div>

          <div
            class="flex gap-2 py-2 max-xl:flex-wrap max-xl:justify-center max-md:w-[20rem]"
          >
            <div
              class="flex min-h-[16.7rem] grow flex-col gap-8 rounded-2xl border-4 border-sky-100 bg-white p-6 max-md:min-w-[20rem]"
            >
              <div class="flex flex-row items-center gap-4">
                <Icon
                  name="material-symbols:dataset-linked-outline-sharp"
                  color="#0284c7"
                  size="2.5rem"
                />

                <h3 class="text-sky-700">API</h3>
              </div>

              <p class="min-w-md text-xl font-medium">
                API serve as the communication channels through which clients
                interact with a web server or service. Each endpoint represents
                a specific functionality or resource provided by the server.
              </p>
            </div>

            <div
              class="flex min-h-[16.7rem] flex-col gap-8 rounded-2xl border-4 border-sky-100 bg-white p-6 max-md:min-w-[20rem]"
            >
              <div class="flex flex-row items-center gap-4">
                <Icon name="gis:map-share" color="#0284c7" size="2rem" />

                <h3 class="text-sky-700">Data Platform</h3>
              </div>

              <p class="text-xl font-medium">
                Our platform provide easy access to well structure, AI-ready
                datasets. A simplified mechanism is available to access
                protected versions of datasets.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- unhide this when we have a section to put below -->
      <div
        class="mx-auto hidden h-20 rounded-b-[50%] bg-gradient-to-t from-blue-50 via-blue-50 to-blue-50 text-center"
      ></div>
    </section>
  </main>
</template>