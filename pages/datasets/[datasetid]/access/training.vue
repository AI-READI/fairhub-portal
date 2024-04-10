<script setup lang="ts">
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

const currentStep = ref<number>(2);

const researchMethodsSelection = ref<boolean | null>(null);
const humanResearchEthicsSelection = ref<boolean | null>(null);
const aiMlEthicsSelection = ref<boolean | null>(null);

const allAnswered = computed(
  () =>
    researchMethodsSelection.value !== null &&
    humanResearchEthicsSelection.value !== null &&
    aiMlEthicsSelection.value !== null,
);

const allAccepted = computed(
  () =>
    researchMethodsSelection.value &&
    humanResearchEthicsSelection.value &&
    aiMlEthicsSelection.value,
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
            <h4>About Your Training</h4>

            <p>
              Please answer the following questions about training you have
              received in research methods and the ethical conduct of research
              involving human participants.
            </p>

            <p>I have received formal training in:</p>

            <div
              class="flex flex-col flex-wrap md:flex-row md:items-center md:gap-6"
            >
              <n-form-item label="Research Methods">
                <n-radio-group
                  v-model:value="researchMethodsSelection"
                  name="research-methods"
                >
                  <n-space>
                    <n-radio :value="true">Yes</n-radio>

                    <n-radio :value="false">No</n-radio>
                  </n-space>
                </n-radio-group>
              </n-form-item>

              <n-form-item label="Human Research Ethics">
                <n-radio-group
                  v-model:value="humanResearchEthicsSelection"
                  name="human-research-ethics"
                >
                  <n-space>
                    <n-radio :value="true">Yes</n-radio>

                    <n-radio :value="false">No</n-radio>
                  </n-space>
                </n-radio-group>
              </n-form-item>

              <n-form-item label="AI/ML Ethical Practices">
                <n-radio-group
                  v-model:value="aiMlEthicsSelection"
                  name="ai-ml-ethical-practices"
                >
                  <n-space>
                    <n-radio :value="true">Yes</n-radio>

                    <n-radio :value="false">No</n-radio>
                  </n-space>
                </n-radio-group>
              </n-form-item>
            </div>

            <div v-if="allAnswered && allAccepted">
              <NuxtLink :to="`/datasets/${dataset?.id}/access/login`">
                <n-button size="large" type="info" secondary>Next</n-button>
              </NuxtLink>
            </div>

            <div v-if="allAnswered && !allAccepted" class="-mt-4">
              <n-divider />

              <p>
                You indicated that you have not received training in one or more
                of the topics above. Please review the training resources
                included in the page below.
              </p>

              <NuxtLink
                to="https://docs.aireadi.org/docs/1/preliminary/training"
                external
                target="_blank"
              >
                <n-button size="large" type="info" secondary
                  >AI-READI Documentation: Training
                  <Icon name="mdi:open-in-new" class="ml-1" />
                </n-button>
              </NuxtLink>
            </div>
          </div>
        </TransitionFade>
      </div>
    </div>
  </main>
</template>
