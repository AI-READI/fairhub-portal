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
const checklist = ref<string[]>([]);

// ordered checklist keys to enforce sequential enabling
const steps = [
  "azure_container",
  "cilogon",
  "diabetes_research",
  "training",
  "describe_purpose",
  "agree_license",
  "select_data",
  "storage_details",
  "access_data",
];

// return true when a checkbox for `value` should be disabled
const isDisabledByValue = (value: string) => {
  const idx = steps.indexOf(value);
  if (idx <= 0) return false;
  return !checklist.value.includes(steps[idx - 1]);
};

// ensure that if a prior checkbox is unchecked we remove any subsequent
// checked items (keeps checklist contiguous and ordered)
watch(
  checklist,
  (newVal) => {
    const set = new Set(newVal);
    // remove any step that is set but previous is not set
    for (let i = 1; i < steps.length; i++) {
      if (set.has(steps[i]) && !set.has(steps[i - 1])) {
        set.delete(steps[i]);
      }
    }
    const ordered = steps.filter((s) => set.has(s));
    // update only if different to avoid infinite loops
    if (
      ordered.length !== newVal.length ||
      ordered.some((v, i) => v !== newVal[i])
    ) {
      checklist.value = ordered;
    }
  },
  { deep: true },
);

// allChecked: true when every step is present in the checklist
const allChecked = computed(() =>
  steps.every((s) => checklist.value.includes(s)),
);
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
          <!-- Provide indication that they will could be requesting up to XXX TB of data  -->
          <div>
            <p>To obtain access to this dataset, you must:</p>

            <n-checkbox-group v-model:value="checklist">
              <n-space vertical>
                <n-checkbox
                  value="azure_container"
                  class="text-sm"
                  :disabled="isDisabledByValue('azure_container')"
                >
                  <span>
                    Provide an
                    <NuxtLink
                      to="https://learn.microsoft.com/en-us/azure/storage/container-storage/container-storage-introduction"
                      target="_blank"
                    >
                      Azure Storage Container
                    </NuxtLink>
                    in order to receive the dataset due to the size of the
                    AI-READI dataset. Please
                    <NuxtLink
                      to="https://docs.aireadi.org/docs/2/preliminary/azure_storage/azure"
                      >review our documentation</NuxtLink
                    >
                    to set this up.
                  </span>
                </n-checkbox>

                <n-checkbox
                  value="cilogon"
                  class="text-sm"
                  :disabled="isDisabledByValue('cilogon')"
                >
                  <span>
                    Authenticate using CILogon. If you are at an academic
                    institution or research organization, you can log on using
                    your institutional credentials. If you are unsure, please
                    search for the name of your institution in the CILogon
                    dropdown menu.
                    <ul class="ml-4 list-disc">
                      <li>
                        If you are not able to access the data through CILogon
                        (e.g. you do not see your organization or institution)
                        then please contact the
                        <a href="mailto:aireadi-dac@ohsu.edu"
                          >AI-READI Data Access Committee</a
                        >.
                      </li>
                    </ul>
                  </span>
                </n-checkbox>

                <n-checkbox
                  value="diabetes_research"
                  class="text-sm"
                  :disabled="isDisabledByValue('diabetes_research')"
                >
                  Indicate whether your research is related to Type 2 Diabetes
                </n-checkbox>

                <n-checkbox
                  value="training"
                  class="text-sm"
                  :disabled="isDisabledByValue('training')"
                >
                  Answer questions about your training in research methods and
                  ethics
                </n-checkbox>

                <n-checkbox
                  value="describe_purpose"
                  class="text-sm"
                  :disabled="isDisabledByValue('describe_purpose')"
                >
                  Describe the purpose of your research. This information, along
                  with your name, will be publicly shared on the AI-READI
                  website
                </n-checkbox>

                <n-checkbox
                  value="agree_license"
                  class="text-sm"
                  :disabled="isDisabledByValue('agree_license')"
                >
                  <span>
                    Review the and accept the terms of the
                    <NuxtLink
                      to="https://docs.aireadi.org/docs/2/preliminary/license"
                      target="_blank"
                    >
                      AI-READI Dataset License
                    </NuxtLink>
                    from the FAQ.
                  </span>
                </n-checkbox>

                <n-checkbox
                  value="select_data"
                  class="text-sm"
                  :disabled="isDisabledByValue('select_data')"
                >
                  Select data types to download
                </n-checkbox>

                <n-checkbox
                  value="storage_details"
                  class="text-sm"
                  :disabled="isDisabledByValue('storage_details')"
                >
                  Provide details about your storage container
                </n-checkbox>

                <n-checkbox
                  value="access_data"
                  class="text-sm"
                  :disabled="isDisabledByValue('access_data')"
                >
                  Return to download your data after your request has been
                  processed
                </n-checkbox>
              </n-space>
            </n-checkbox-group>

            <div class="my-3">
              <NuxtLink
                v-if="allChecked"
                :to="`/datasets/${dataset?.id}/access/login`"
              >
                <n-button size="large" type="info" secondary> Begin </n-button>
              </NuxtLink>

              <n-button
                v-else
                size="large"
                type="info"
                secondary
                disabled
                class="cursor-not-allowed opacity-60"
              >
                Begin
              </n-button>
            </div>
          </div>
        </TransitionFade>
      </div>
    </div>
  </main>
</template>
