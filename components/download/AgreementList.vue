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

const searchQuery = ref("");

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
  {
    title: "Organization",
    key: "organization",
    minWidth: "10rem",
  },
  {
    title: "Approved",
    key: "approval_date",
    minWidth: "8rem",
  },
  {
    title: "Version",
    key: "version_title",
    minWidth: "5rem",
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

watch(searchQuery, () => {
  pagination.page = 1; // reset to first page on search
  refresh(); // manually trigger fetch
});

const {
  data: agreements,
  pending,
  refresh,
} = await useFetch(`/api/datasets/${datasetid}/agreements`, {
  query: computed(() => ({
    page: pagination.page,
    q: searchQuery.value.trim(), // assuming `q` is your backend's query param
  })),
});

pagination.pageCount = agreements.value?.totalPages ?? 0;
pagination.pageSize = agreements.value?.pageSize ?? 10;
</script>

<template>
  <n-card class="rounded-lg p-2">
    <div class="mb-4 flex justify-start">
      <n-input
        v-model:value="searchQuery"
        placeholder="Search researchers, purpose..."
        clearable
        class="w-full max-w-sm"
      />
    </div>

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
  </n-card>
</template>
