<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

const route = useRoute();

const { datasetid } = route.params as { datasetid: string };
const { data: dataset, error } = await useDataset(datasetid);

if (error.value) {
  console.error(error.value);

  push.error({
    title: "Something went wrong",
    message: "Failed to fetch dataset",
  });

  throw new Error("Failed to fetch dataset");
}

// TODO: Convert to a utility or extract a component?
const generateCombinedFullName = (name: string) => {
  const nameArray = name.split(",");

  if (nameArray.length > 1) {
    return `${nameArray[1]} ${nameArray[0]}`;
  } else {
    return name;
  }
};

const currentStep = ref<number>(7);
</script>

<template>
  <main class="h-screen overflow-auto bg-gradient-to-b from-white to-blue-50">
    <div
      class="mx-auto mt-10 flex w-full max-w-screen-xl items-center justify-between px-3"
    >
      <n-flex vertical>
        <h1>{{ dataset?.title }}</h1>

        <div
          v-for="(creator, index) in dataset?.metadata.datasetDescription
            .creator"
          :key="index"
          class="flex flex-row flex-wrap items-center align-middle text-black"
        >
          <!-- if on the last index create a different span -->
          <span class="mr-1 text-sm font-light">{{
            generateCombinedFullName(creator.creatorName)
          }}</span>

          <ButtonIdentifierBadge
            v-if="creator?.nameIdentifier"
            class="pt-1"
            :type="creator.nameIdentifier[0]"
          />

          <span
            v-if="
              dataset?.metadata.datasetDescription.creator &&
              index != dataset?.metadata.datasetDescription.creator.length - 1
            "
            class="text-sm"
          >
            ,
          </span>
        </div>

        <p class="hidden">{{ dataset?.description }}</p>
      </n-flex>

      <n-image
        src="https://raw.githubusercontent.com/AI-READI/AI-READI-logo/main/logo/png/option2.png"
        :alt="dataset?.title"
        class="size-32 h-32 w-32 rounded-lg"
        object-fit="contain"
      />
    </div>

    <n-divider />

    <div class="mx-auto w-full max-w-screen-xl px-3 pb-8">
      <div class="prose mt-0 min-h-[300px] max-w-none text-black">
        <h2>Access this dataset</h2>

        <DownloadStepNav :current-step="currentStep" />

        <TransitionFade>
          <div>
            <h4>Request Submitted</h4>

            <!-- TODO: delete after the open house -->
            <div
              class="rounded border border-l-8 border-blue-500 bg-blue-100 px-2 py-4 font-extrabold text-blue-500"
            >
              <Icon name="ic:baseline-info" />

              For those attending the Bridge2AI Open House in person, please
              contact your DGP coordinator for details on accessing the dataset.
            </div>

            <p>
              The following paragraphs describe how the download process will
              function after the open house.
            </p>
            <!-- stop deleting here -->

            <!-- TODO: remove wrapping blockquote after the open house -->
            <blockquote>
              <p>
                Your download is being created. Due to the size of the dataset
                and necessary processing, this may take some time. When your
                dataset is ready, you will receive an email containing a link to
                a page with instructions on how to access it.
              </p>

              <p>
                Once created, you will have 72 hours to download your dataset.
              </p>
            </blockquote>

            <p>
              <NuxtLink :to="`/datasets/${datasetid}`">
                <n-button strong secondary type="info">
                  Learn more about the dataset.
                </n-button>
              </NuxtLink>
            </p>
          </div>
        </TransitionFade>
      </div>
    </div>
  </main>
</template>
