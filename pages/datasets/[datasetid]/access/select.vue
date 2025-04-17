<script setup lang="ts">
import useDownloadAgreementForm from "~/composables/useDownloadAgreementForm";

definePageMeta({
  middleware: ["auth"],
});

const route = useRoute();

const { datasetid } = route.params as { datasetid: string };
const { data: dataset, error } = await useDataset(datasetid);
const agreement = useDownloadAgreementForm(datasetid);

if (error.value) {
  console.error(error.value);

  push.error({
    title: "Something went wrong",
    message: "Failed to fetch dataset",
  });

  throw new Error("Failed to fetch dataset");
}

if (!agreement.value) {
  console.warn("Redirecting to collect license agreement");
  await navigateTo(`/datasets/${dataset.value?.id}/access/research-purpose`);
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
const selectedFolders = ref<string[]>([]);
const hasSelectedFolders = computed(() => selectedFolders.value.length > 0);

const handleSubmit = async () => {
  try {
    await $fetch(`/api/downloads/request/create`, {
      body: {
        dataset_id: dataset.value?.id,
        download_agreement_id: agreement.value?.id,
        folders_selected: selectedFolders.value,
      },
      headers: useRequestHeaders(["cookie"]),
      method: "POST",
    });
    // clear the agreement form once we have persisted the request
    agreement.value = {};
    await navigateTo(`/datasets/${dataset.value?.id}/access/submitted`);
  } catch (error) {
    console.error(error);
    push.error({
      title: "Something went wrong",
      message: "Could not save download request",
    });

    throw new Error("Could not save download request");
  }
};
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
            <h4>Select Folders</h4>

            <p>Select data types to include in your dataset.</p>

            <DownloadFolderSelector
              v-model="selectedFolders"
              :folder-structure="dataset?.files || []"
              :dataset-structure-description="
                dataset?.metadata
                  .datasetStructureDescription as DatasetStructureDescription
              "
            />

            <n-button
              size="large"
              type="info"
              secondary
              class="my-3"
              :disabled="!hasSelectedFolders"
              @click="handleSubmit"
              >Submit</n-button
            >
          </div>
        </TransitionFade>
      </div>
    </div>
  </main>
</template>
