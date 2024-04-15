<script setup lang="ts">
const props = defineProps({
  id: {
    required: true,
    type: String,
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
  {
    label: "MLA",
    value: "mla",
  },
  {
    label: "Chicago",
    value: "chicago",
  },
  {
    label: "IEEE",
    value: "ieee",
  },
];

const citation = ref({
  formattedText: "",
});

const citationError = ref(false);
const citationPending = ref(true);

const getCitation = async (format: string = "apa") => {
  citationError.value = false;
  citation.value = {
    formattedText: "",
  };

  citationPending.value = true;

  await $fetch(`/api/citation/${props.id}?format=${format}`)
    .then((data) => {
      // Find the `/FAIRHUB.` string and replace it with a lowercase version
      const formattedText = data.formattedText;
      const lowercaseFormattedText = formattedText.replace(
        /\/FAIRHUB\./g,
        "/fairhub.",
      );

      citation.value = {
        formattedText: lowercaseFormattedText,
      };
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
  await getCitation(format);
};

onMounted(() => {
  getCitation();
});
</script>

<template>
  <n-space
    vertical
    class="rounded-xl border border-blue-200 bg-white px-4 pb-5 pt-3"
  >
    <n-space vertical :size="[0, 0]">
      <h3 class="mb-3">Citation</h3>

      <p class="pb-1 text-sm font-medium">
        When using this resource, please cite:
      </p>

      <TransitionFade>
        <div v-if="citationPending" class="py-2">
          <n-skeleton text style="width: 80%" />

          <n-skeleton text />

          <n-skeleton text style="width: 60%" />
        </div>

        <div v-else class="py-2">
          <n-alert v-if="citationError" type="error">
            Something went wrong with creating the citation
          </n-alert>

          <p v-else class="text-sm">{{ citation?.formattedText }}</p>
        </div>
      </TransitionFade>

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

      <n-divider />

      <n-alert type="warning" :bordered="false">
        There maybe other required citations when using this dataset. Please
        check the license and the resource for more information.
      </n-alert>
    </n-space>
  </n-space>
</template>
