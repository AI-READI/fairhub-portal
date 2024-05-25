<script setup lang="ts">
const { datasetid } = defineProps({
  datasetid: {
    required: true,
    type: String as PropType<string>,
  },
});

// use slate-300 border to match other components
const themeOverrides = {
  borderColor: "rgb(203 213 225)",
};

const columns = [
  {
    title: "Researcher",
    key: "name",
    minWidth: "10rem",
  },
  {
    title: "Research Purpose",
    key: "research_purpose",
  },
];

const rowKey = (rowData: object) => rowData.id;
const rowProps = (_rowData: object, _rowIndex: number) => ({
  class: "bg-white",
});

const pagination = reactive({
  onChange: (page: number) => {
    pagination.page = page;
  },
  page: 1,
  pageCount: 1,
  pageSize: 10,
  showSizePicker: false,
});

const page = computed(() => pagination.page);

const { data: agreements, pending } = await useFetch(
  `/api/datasets/${datasetid}/agreements`,
  {
    query: { page },
  },
);

pagination.pageCount = agreements.value?.totalPages ?? 0;
pagination.pageSize = agreements.value?.pageSize ?? 10;
</script>

<template>
  <n-data-table
    remote
    :columns="columns"
    :data="agreements?.data"
    :loading="pending"
    :pagination="pagination"
    :row-key="rowKey"
    :row-props="rowProps"
    :theme-overrides="themeOverrides"
  />
</template>
