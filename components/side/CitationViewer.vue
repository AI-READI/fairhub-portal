<script setup lang="ts">
// const props = defineProps({
//   id: {
//     required: true,
//     type: String,
//   },
// });
const { id } = defineProps<{ id: string }>();

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

// comment out the citation formatting request
// const citationError = ref(false);
const citationPending = ref(true);

// const getCitation = async (format: string = "apa") => {
//   citationError.value = false;
//   citation.value = {
//     formattedText: "",
//   };
//
//   citationPending.value = true;
//
//   await $fetch(`/api/citation/${props.id}?format=${format}`)
//     .then((data) => {
//       // Find the `/FAIRHUB.` string and replace it with a lowercase version
//       const formattedText = data.formattedText;
//       const lowercaseFormattedText = formattedText.replace(
//         /\/FAIRHUB\./g,
//         "/fairhub.",
//       );
//
//       citation.value = {
//         formattedText: lowercaseFormattedText,
//       };
//     })
//     .catch((err) => {
//       console.error("Error fetching citation", err);
//       citationError.value = true;
//     })
//     .finally(() => {
//       citationPending.value = false;
//     });
// };

// todo: add a watchEffect for the error responses

const copyToClipboard = (text: string = "") => {
  navigator.clipboard.writeText(text);
  push.success("Citation copied to clipboard");
};
// comment out the citation formatting request
// const getFormattedCitation = async (format: string) => {
//   await getCitation(format);
// };

// onMounted(() => {
//   getCitation();
// });
</script>

<template>
  <n-flex
    vertical
    class="rounded-xl border border-blue-200 bg-white px-4 pb-5 pt-3"
  >
    <n-flex vertical :size="[0, 0]">
      <h3 class="mb-3">Citation</h3>

      <p class="hidden pb-1 text-sm font-medium">
        When using this resource, please cite:
      </p>

      <p v-if="id" class="pb-1 text-sm">
        When using this resource, please follow the citation instructions
        provided at
        <NuxtLink
          :href="`https://docs.aireadi.org/docs/${id}/citation`"
          target="_blank"
          class="underline transition-all hover:text-slate-600"
        >
          https://docs.aireadi.org/docs/{{ id }}/citation
        </NuxtLink>
      </p>

      <TransitionFade>
        <div v-if="citationPending" class="hidden py-2">
          <n-skeleton text style="width: 80%" />

          <n-skeleton text />

          <n-skeleton text style="width: 60%" />
        </div>

        <!--        <div v-else class="hidden py-2">-->
        <!--          <n-alert v-if="citationError" type="error">-->
        <!--            Something went wrong with generating the citation. Please try again-->
        <!--            later.-->
        <!--          </n-alert>-->

        <!--          <p v-else class="text-sm">{{ citation?.formattedText }}</p>-->
        <!--        </div>-->
      </TransitionFade>

      <n-flex align="center" justify="space-between" class="hidden">
        <n-select
          v-model:value="citationFormat"
          size="small"
          :options="citationFormats"
          :consistent-menu-width="false"
          class="hidden w-max"
          :loading="citationPending"
          :disabled="citationPending"
        />

        <n-button
          quaternary
          type="info"
          size="large"
          class="hidden"
          @click="copyToClipboard(citation?.formattedText)"
        >
          <template #icon>
            <Icon name="uil:copy" />
          </template>
        </n-button>
      </n-flex>

      <n-divider class="hidden" />

      <n-alert type="warning" :bordered="false" class="hidden">
        There maybe other required citations when using this dataset. Please
        check the license and other resources associated with the dataset for
        more information.
      </n-alert>
    </n-flex>
  </n-flex>
</template>
