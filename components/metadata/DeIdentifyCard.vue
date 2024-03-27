<script setup lang="ts">
import datasetMetadata from "@/assets/data/dataset-metadata.json";
const _props = defineProps({
  metadata: {
    required: true,
    type: Object as PropType<DatasetDescription>,
  },
});

function getDeIdentType(deIdentType: string) {
  const deIdentTypeOptions = datasetMetadata.datasetDeIdentTypeOptions;
  for (const [_key, object] of Object.entries(deIdentTypeOptions)) {
    if (object.value === deIdentType) {
      return object.description;
    }
  }
}

const formattedDeIdentType = getDeIdentType(
  _props.metadata.datasetDeIdentLevel.deIdentType,
);
</script>

<template>
  <card-collapsible-card
    id="de-identified-levels"
    title="De-Identification Levels"
    data-section-title="De-Identification Levels"
    class="mb-4 shadow-md"
  >
    <n-space vertical>
      <p class="mb-1 w-full border-b font-semibold">
        Level of de-identification from this dataset
      </p>

      <p>
        {{ formattedDeIdentType }}
      </p>

      <p class="mb-1 mt-2 w-full border-b font-semibold">
        Does this dataset remove direct identifiers?
      </p>

      <p>
        <SwitchWithLabel
          disabled
          :active="metadata.datasetDeIdentLevel.deIdentDirect"
        />
      </p>

      <p class="mb-1 mt-2 w-full border-b font-semibold">
        Does this dataset apply the HIPAA de-identification rules?
      </p>

      <p>
        <SwitchWithLabel
          disabled
          :active="metadata.datasetDeIdentLevel.deIdentHIPAA"
        />
      </p>

      <p class="mb-1 mt-2 w-full border-b font-semibold">
        Does this dataset rebase and/or replace dates by integers?
      </p>

      <p>
        <SwitchWithLabel
          disabled
          :active="metadata.datasetDeIdentLevel.deIdentDates"
        />
      </p>

      <p class="mb-1 mt-2 w-full border-b font-semibold">
        Does this dataset remove narrative text fields?
      </p>

      <p>
        <SwitchWithLabel
          disabled
          :active="metadata.datasetDeIdentLevel.deIdentNonarr"
        />
      </p>

      <p class="mb-1 mt-2 w-full border-b font-semibold">
        Does this dataset achieve K-anonymisation (k>=2)?
      </p>

      <p>
        <SwitchWithLabel
          disabled
          :active="metadata.datasetDeIdentLevel.deIdentKAnon"
        />
      </p>

      <p class="mb-1 mt-2 w-full border-b font-semibold">
        De-identification Details
      </p>

      <p>
        {{ metadata.datasetDeIdentLevel.deIdentDetails }}
      </p>
    </n-space>
  </card-collapsible-card>
</template>
