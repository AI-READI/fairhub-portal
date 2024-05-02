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

const currentStep = ref<number>(1);
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
      />
    </div>

    <n-divider />

    <div class="mx-auto w-full max-w-screen-xl px-3 pb-8">
      <div class="prose mt-0 min-h-[300px] max-w-none text-black">
        <h2>Access this dataset</h2>

        <DownloadStepNav :current-step="currentStep" />

        <TransitionFade>
          <div>
            <n-alert title="For Type 2 Diabetes Research Only" type="info">
              <p>
                Please, do not request to download the data if your research is
                not related to type 2 diabetes. If you have questions, please
                contact the
                <a href="mailto:aireadi-dac@aireadi.org"
                  >AI-READI Data Access Committee</a
                >.
              </p>
            </n-alert>

            <p>To obtain access to this dataset, you must:</p>

            <ol>
              <li>
                Answer some questions about your training in research methods
                and ethics
              </li>

              <li>Log in using our authentication provider</li>

              <li>
                Describe the purpose of your research <br />
                This information, along with your name, will be publicly shared
                on the AI-READI website
              </li>

              <li>Agree to the terms of the dataset license</li>

              <li>Select data types to download</li>

              <li>
                Return to download your data after your request has been
                processed
              </li>
            </ol>

            <NuxtLink :to="`/datasets/${dataset?.id}/access/training`">
              <n-button size="large" type="info" secondary class="my-3">
                Begin
              </n-button>
            </NuxtLink>
          </div>
        </TransitionFade>
      </div>
    </div>
  </main>
</template>
