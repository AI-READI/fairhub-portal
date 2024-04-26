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
    title: "Motivation",
    data: props.healthsheet.motivation,
  },
  {
    title: "Composition",
    data: props.healthsheet.composition,
  },
  {
    title: "Collection",
    data: props.healthsheet.collection,
  },
  {
    title: "Preprocessing / Cleaning / Labeling",
    data: props.healthsheet.preprocessing,
  },
  {
    title: "Uses",
    data: props.healthsheet.uses,
  },
  {
    title: "Distribution",
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
