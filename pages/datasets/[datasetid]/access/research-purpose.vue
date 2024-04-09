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

const currentStep = ref<number>(4);
const researchPurpose = ref<string>("");
const validResearchPurpose = computed(
  () =>
    researchPurpose.value.length > 20 && researchPurpose.value.length <= 500,
);
</script>

<template>
  <main class="h-screen overflow-auto bg-gradient-to-b from-white to-blue-50">
    <div
      class="mx-auto mt-10 flex w-full max-w-screen-xl items-center justify-between px-3"
    >
      <n-space vertical>
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
      </n-space>

      <n-image
        src="https://raw.githubusercontent.com/AI-READI/AI-READI-logo/main/logo/png/option2.png"
        :alt="dataset?.title"
        class="size-32 h-32 w-32 rounded-lg"
      />
    </div>

    <n-divider />

    <div class="mx-auto w-full max-w-screen-xl px-3 pb-8">
      <div class="prose mt-0 min-h-[300px] max-w-none text-black">
        <h2>Access this dataset</h2>

        <DownloadStepNav :current-step="currentStep" />

        <TransitionFade>
          <div>
            <h4>About Your Research</h4>

            <p>
              Please note, that by requesting a dataset, your name and research
              purpose will be shared on the AI-READI website in order to promote
              transparency and trust with the use of this data.
            </p>

            <n-form-item label="Briefly describe the purpose of your research.">
              <n-input
                v-model:value="researchPurpose"
                type="textarea"
                :minlength="20"
                :maxlength="500"
                :rows="5"
                show-count
              />
            </n-form-item>

            <NuxtLink :to="`/datasets/${dataset?.id}/access/license`">
              <n-button
                size="large"
                type="info"
                secondary
                class="my-3"
                :disabled="!validResearchPurpose"
                >Next</n-button
              >
            </NuxtLink>
          </div>
        </TransitionFade>
      </div>
    </div>
  </main>
</template>
