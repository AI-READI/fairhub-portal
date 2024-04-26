<script setup lang="ts">
import MarkdownRender from "../markdown/MarkdownRender.vue";

const props = defineProps({
  healthsheet: {
    required: true,
    type: Object as PropType<HealthsheetRecords>,
  },
});

const healthsheetData = [
  {
    title: "General Information",
    data: props.healthsheet.general_information,
  },
  {
    title: "Dataset versioning",
    data: props.healthsheet.versioning,
  },
  {
    title: "Motivation",
    data: props.healthsheet.motivation,
  },
  {
    title: "Data Composition",
    data: props.healthsheet.composition,
  },
  {
    title: "Devices and Contextual Attributes in Data Collection",
    data: props.healthsheet.devices,
  },
  {
    title: "Challenge in tests and confounding factors",
    data: props.healthsheet.challenge,
  },
  {
    title: "Collection and use of demographic information",
    data: props.healthsheet.demographic_information,
  },
  {
    title: "Pre-processing / de-identification",
    data: props.healthsheet.preprocessing,
  },
  {
    title: "Labeling and subjectivity of labeling",
    data: props.healthsheet.labeling,
  },
  {
    title: "Collection Process",
    data: props.healthsheet.collection,
  },
  {
    title: "Inclusion Criteria-Accessibility in data collection",
    data: props.healthsheet.inclusion,
  },
  {
    title: "Uses",
    data: props.healthsheet.uses,
  },
  {
    title: "Dataset Distribution",
    data: props.healthsheet.distribution,
  },
  {
    title: "Maintenance",
    data: props.healthsheet.maintenance,
  },
];
</script>

<template>
  <n-flex vertical size="large">
    <n-alert title="Info" type="info">
      <p class="text-md text-black">
        The page contains the Healthsheet associated with the dataset.
        Information about Healthsheet can be found in the associated
        <a
          href="https://dl.acm.org/doi/10.1145/3531146.3533239"
          target="_blank"
          class="font-bold"
          >paper</a
        >.
      </p>
    </n-alert>

    <CardCollapsibleCard
      v-for="(rootItem, index) in healthsheetData"
      :key="index"
      :title="rootItem.title"
      :collapse="index > 0"
    >
      <div class="flex w-full flex-col space-y-10">
        <ul v-for="item in rootItem.data" :key="item.id">
          <li>
            <MarkdownRender
              :content="item.question"
              class="w-full text-base font-semibold"
            />

            <MarkdownRender
              v-if="item.response.trim()"
              :content="item.response"
            />

            <p v-else class="italic">N/A</p>
          </li>
        </ul>
      </div>
    </CardCollapsibleCard>
  </n-flex>
</template>
