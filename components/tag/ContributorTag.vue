<script setup lang="ts">
import datasetMetadata from "@/assets/data/dataset-metadata.json";
const props = defineProps({
  contributorType: {
    required: true,
    type: String,
  },
});

// get the contributor type from the dataset-metadata.json file
function getContributorJson(contributorType: string) {
  const contributorTypeOptions = datasetMetadata.datasetContributorTypeOptions;
  for (const [_key, object] of Object.entries(contributorTypeOptions)) {
    if (object.value === contributorType) {
      return [object.label, object.description];
    }
  }
}
const contributorInfo = getContributorJson(props.contributorType);
const contributorLabel = contributorInfo[0];
const contributorDescription = contributorInfo[1];
</script>

<template>
  <n-tag :bordered="false" type="info">
    <n-tooltip placement="top" trigger="hover">
      <template #trigger>
        <span class="text-sm font-medium">{{ contributorLabel }}</span>
      </template>

      <span>{{ contributorDescription }}</span>
    </n-tooltip>
  </n-tag>
</template>
