<script setup lang="ts">
const props = defineProps({
  id: {
    required: true,
    type: Number,
  },
});

const citationFormat = ref("apa");

const citationFormats = [
  {
    label: "APA",
    value: "apa",
  },
  {
    label: "Harvard",
    value: "harvard1",
  },
  {
    label: "Vancouver",
    value: "vancouver",
  },
];

const citation = ref({
  doi: "",
  formattedText: "",
  full: "",
  split: "",
});

const citationError = ref(false);
const citationPending = ref(true);

const getCitation = async () => {
  citationError.value = false;
  citation.value = {
    doi: "",
    formattedText: "",
    full: "",
    split: "",
  };

  citationPending.value = true;

  await $fetch(`/api/citation/${props.id}?format=${citationFormat.value}`)
    .then((data) => {
      citation.value = data;
    })
    .catch((err) => {
      console.error("Error fetching citation", err);
      citationError.value = true;
    })
    .finally(() => {
      citationPending.value = false;
    });
};

// todo: add a watchEffect for the error responses

const copyToClipboard = (text: string = "") => {
  navigator.clipboard.writeText(text);
  push.success("Citation copied to clipboard");
};

const getFormattedCitation = async (format: string) => {
  citationFormat.value = format;

  await getCitation();
};

onMounted(() => {
  getCitation();
});
</script>

<template>
  <n-space
    vertical
    class="rounded-xl border border-blue-200 bg-slate-50 px-4 pb-5 pt-3"
  >
    <n-space vertical :size="[0, 0]">
      <h3 class="mb-3">Citation</h3>

      <TransitionFade>
        <div v-if="citationPending" class="flex justify-center p-2">
          <Icon name="svg-spinners:3-dots-scale" size="30" />
        </div>

        <div v-else>
          <TransitionFade>
            <n-alert v-if="citationError" type="error">
              Something went wrong with creating the citation
            </n-alert>

            <div v-else>
              <p class="pb-1 text-sm font-medium">
                When using this resource, please cite:
              </p>

              <P class="mb-4 text-sm">{{ citation?.formattedText }}</P>

              <n-space align="center" justify="space-between">
                <n-select
                  v-model:value="citationFormat"
                  size="small"
                  :options="citationFormats"
                  :consistent-menu-width="false"
                  @update:value="getFormattedCitation"
                />

                <n-button
                  quaternary
                  type="info"
                  size="large"
                  @click="copyToClipboard(citation?.formattedText)"
                >
                  <template #icon>
                    <Icon name="uil:copy" />
                  </template>
                </n-button>
              </n-space>
            </div>
          </TransitionFade>
        </div>
      </TransitionFade>

      <n-divider />

      <n-alert type="warning" :bordered="false">
        There maybe other required citations when using this dataset. Please
        check the license and the resource for more information.
      </n-alert>
    </n-space>
  </n-space>
</template>
