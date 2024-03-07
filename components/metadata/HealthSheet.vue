<script setup lang="ts">
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
  <n-space vertical size="large">
    <CardCollapsibleCard
      v-for="(rootItem, index) in healthsheetData"
      :key="index"
      :title="rootItem.title"
      :collapse="index > 0"
    >
      <n-space vertical size="large">
        <div v-for="item in rootItem.data" :key="item.id">
          <h3 class="mb-1 w-full border-b text-base font-semibold">
            {{ item.question }}
          </h3>

          <p v-if="item.response.trim()">{{ item.response }}</p>

          <p v-else class="italic">N/A</p>
        </div>
      </n-space>
    </CardCollapsibleCard>
  </n-space>
</template>
