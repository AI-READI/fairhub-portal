<script setup lang="ts">
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
  description: string;
  type: string;
};

const folderMetadata = computed(() => {
  const metadata = new Map<string, FolderDescriptor>();
  props.datasetStructureDescription.directoryList
    .map((item) => ({
      name: item.directoryName,
      description: item.directoryDescription,
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
      const description =
        metadata.get(folder.label)?.description ??
        "No description found for this folder";
      return {
        id: useId(),
        description,
        label: folder.label,
        selected: false,
      };
    }),
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
          </div>
        </div>
      </n-card>
    </n-flex>
  </n-checkbox-group>
</template>
