<script setup lang="ts">
import { ref } from "vue";
import prettyBytes from "pretty-bytes";

const props = defineProps({
  datasetStructureDescription: {
    required: true,
    type: Object as PropType<DatasetStructureDescription>,
  },
});

const selectedFolders = defineModel<string[]>({ required: true });

type FolderDescriptor = {
  id: string;
  name: string;
  description: string | undefined;
  numberOfFiles: number | undefined;
  selected: boolean;
  size: number | undefined;
  type: string;
};

const folderMetadata = computed(() => {
  const metadata = new Map<string, FolderDescriptor>();
  props.datasetStructureDescription.directoryList
    .map((item) => ({
      id: useId(),
      name: item.directoryName,
      description: item.directoryDescription,
      numberOfFiles: item.numberOfFiles,
      selected: false,
      size: item.size,
      type: item.directoryType,
    }))
    .reduce((acc, item) => acc.set(item.name, item), metadata);
  return metadata;
});

const hasFolderSizes = computed(() =>
  Array.from(folderMetadata.value.values()).every((folder) =>
    Number.isFinite(folder.size ?? NaN),
  ),
);

const totalBytes = computed(() =>
  selectedFolders.value
    .map((label) => folderMetadata.value.get(label))
    .reduce((prev, curr) => (curr?.size ? prev + curr?.size : prev + 0), 0),
);

const totalDataSetSize = computed(() =>
  folderMetadata.value
    .values()
    .reduce((prev, curr) => (curr?.size ? prev + curr?.size : prev + 0), 0),
);

const percentSelected = computed(() => {
  if (
    isNaN(totalBytes.value) ||
    isNaN(totalDataSetSize.value) ||
    totalDataSetSize.value <= 0
  )
    return 0;
  return Math.floor((totalBytes.value / totalDataSetSize.value) * 100);
});

const BYTES_IN_GB = 1024 ** 3;
const storageRates = ref([]);
const storageOpts = [
  {
    label: "Hot",
    value: [0.087, 0.0184, 0], // [egress, storage, early closure penalty]
  },
  {
    label: "Cool",
    value: [0, 0, 0],
  },
];

const calculatedEgressCost = computed(() => {
  if (isNaN(totalBytes.value)) return 0;
  const gb = Math.ceil(totalBytes.value / BYTES_IN_GB);
  const chargeableGb = Math.max(gb - 100, 0);
  return (chargeableGb * 0.087).toFixed(2);
  // return (chargeableGb * storageRates[0]).toFixed(2);
});

const calculatedStorageCost = computed(() => {
  if (isNaN(totalBytes.value)) return 0;
  const chargeableGb = Math.ceil(totalBytes.value / BYTES_IN_GB);
  return (chargeableGb * 0.0184).toFixed(2);
});
</script>

<template>
  <n-checkbox-group v-model:value="selectedFolders">
    <n-flex :vertical="true">
      <n-card
        v-for="folder in folderMetadata.values()"
        :key="folder.id"
        size="small"
      >
        <div role="none" class="flex flex-row items-center gap-2">
          <n-checkbox
            size="large"
            :value="folder.name"
            :aria-labelledby="`folder-label-${folder.id}`"
            :aria-describedby="`folder-description-${folder.id}`"
          />

          <div role="none" class="flex flex-col gap-2">
            <span :id="`folder-label-${folder.id}`" class="font-bold">
              <Icon name="ic:baseline-folder" /> {{ folder.name }}
            </span>

            <span :id="`folder-description-${folder.id}`">
              {{ folder.description }}
            </span>

            <span v-if="folder.size" class="text-xs font-thin"
              >{{ folder.numberOfFiles }} files,
              {{ prettyBytes(folder.size, { binary: true }) }}</span
            >
          </div>
        </div>
      </n-card>
    </n-flex>
  </n-checkbox-group>

  <n-flex v-if="hasFolderSizes" align="center" style="gap: 24px; padding: 16px">
    <!--div style="display: flex; flex-direction: column; gap: 8px;">
        Selectors for different Storage opts here:
      </div-->

    <div style="display: flex; flex-direction: column; gap: 8px">
      <div>
        Total size of selected folders:
        <strong>{{ prettyBytes(totalBytes, { binary: true }) }}</strong>
      </div>

      <div>
        Estimated Monthly Storage Cost:
        <strong>${{ calculatedStorageCost }}</strong>
      </div>

      <div>
        Estimated Data Egress Cost: <strong>${{ calculatedEgressCost }}</strong>
      </div>
    </div>

    <n-progress
      type="circle"
      :percentage="percentSelected"
      :stroke-width="8"
      size="300"
    />
  </n-flex>
</template>
