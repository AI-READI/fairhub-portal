<script setup lang="ts">
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

  <p v-if="hasFolderSizes">
    Total size of selected folders:
    {{ prettyBytes(totalBytes, { binary: true }) }}
  </p>
</template>
