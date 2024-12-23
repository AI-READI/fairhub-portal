<script setup lang="ts">
import prettyBytes from "pretty-bytes";

const props = defineProps({
  datasetStructureDescription: {
    required: true,
    type: Object as PropType<DatasetStructureDescription>,
  },
  folderStructure: {
    required: true,
    type: Array as PropType<Array<FolderStructure>>,
  },
});

const selectedFolders = defineModel<string[]>({ required: true });

type FolderDescriptor = {
  name: string;
  description: string | undefined;
  numberOfFiles: number | undefined;
  size: number | undefined;
  type: string;
};

const folderMetadata = computed(() => {
  const metadata = new Map<string, FolderDescriptor>();
  props.datasetStructureDescription.directoryList
    .map((item) => ({
      name: item.directoryName,
      description: item.directoryDescription,
      numberOfFiles: item.numberOfFiles,
      size: item.size,
      type: item.directoryType,
    }))
    .reduce((acc, item) => acc.set(item.name, item), metadata);
  return metadata;
});

const folders = computed(() =>
  props.folderStructure
    .filter((file) => file.children)
    .map((folder) => {
      const metadata = folderMetadata.value;
      const folderDescriptor = metadata.get(folder.label);
      const description =
        folderDescriptor?.description ?? "No description found for this folder";
      const size = folderDescriptor?.size;
      const numberOfFiles = folderDescriptor?.numberOfFiles;
      return {
        id: useId(),
        description,
        label: folder.label,
        numberOfFiles,
        selected: false,
        size,
      };
    }),
);

const hasFolderSizes = computed(() =>
  folders.value.every((folder) => Number.isFinite(folder.size)),
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
      <n-card v-for="folder in folders" :key="folder.id" size="small">
        <div role="none" class="flex flex-row items-center gap-2">
          <n-checkbox
            size="large"
            :value="folder.label"
            :aria-labelledby="`folder-label-${folder.id}`"
            :aria-describedby="`folder-description-${folder.id}`"
          />

          <div role="none" class="flex flex-col gap-2">
            <span :id="`folder-label-${folder.id}`" class="font-bold">
              <Icon name="ic:baseline-folder" /> {{ folder.label }}
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
