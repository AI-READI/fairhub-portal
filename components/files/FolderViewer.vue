<script setup lang="ts">
import type { TreeOption } from "naive-ui";
import { NButton } from "naive-ui";
import { Icon } from "#components";

const drawerActive = ref(false);

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

function convertFile(
  file: FolderStructure,
  currentPath: Array<string>,
): TreeOption {
  return {
    children: file.children?.length
      ? file.children.map((f) => convertFile(f, [...currentPath, file.label]))
      : undefined,
    key: useId(), // generate unique id for each file
    label: file.label,
    prefix: () =>
      h(Icon, {
        name: file.children ? "ic:baseline-folder" : "pepicons-pencil:file",
      }),
    suffix: () =>
      h(
        NButton,
        {
          class: "",
          onClick: () => {
            openMetdataDrawer([...currentPath, file.label]);
          },
          size: "tiny",
        },
        { default: () => "Learn More" },
      ),
  };
}

const updatePrefixWithExpaned = (
  _keys: Array<string | number>,
  _option: Array<TreeOption | null>,
  meta: {
    action: "expand" | "collapse" | "filter";
    node: TreeOption | null;
  },
) => {
  if (!meta.node) return;
  switch (meta.action) {
    case "expand":
      meta.node.prefix = () =>
        h(Icon, { name: "material-symbols-light:folder-open" });

      break;
    case "collapse":
      meta.node.prefix = () => h(Icon, { name: "ic:baseline-folder" });
      break;
  }
};

const data = props.folderStructure.map((file) => convertFile(file, []));

const drawerTitle = ref("");
const drawerDescription = ref("");
const drawerRelatedIdentifier = ref<RelatedIdentifier[] | undefined>(undefined);

const openMetdataDrawer = (currentPath: Array<string>) => {
  let directoryList: Array<Directory> | undefined =
    props.datasetStructureDescription.directoryList;
  let metadataFileList: Array<MetadataFileList> | undefined =
    props.datasetStructureDescription.metadataFileList;
  let filetype = null;
  let datatype = null;
  for (const d of currentPath) {
    filetype = metadataFileList?.find((file) => file.metadataFileName === d);
    if (filetype) continue;
    datatype = directoryList?.find((dir) => dir.directoryName === d);
    if (datatype) {
      directoryList = datatype?.directoryList;
      metadataFileList = datatype?.metadataFileList;
      continue;
    } else {
      filetype = null;
      datatype = null;
      break;
    }
  }

  if (filetype) {
    drawerDescription.value = filetype.metadataFileDescription;
    drawerRelatedIdentifier.value = filetype.relatedIdentifier;
  } else if (datatype) {
    drawerDescription.value = datatype.directoryDescription;
    drawerRelatedIdentifier.value = datatype.relatedIdentifier;
  } else {
    drawerDescription.value = "No metadata found for this file";
  }

  drawerActive.value = true;
};
</script>

<template>
  <div>
    <n-tree
      block-line
      show-line
      expand-on-click
      :data="data"
      :on-update:expanded-keys="updatePrefixWithExpaned"
    />

    <n-drawer v-model:show="drawerActive" :width="502" placement="bottom">
      <n-drawer-content :title="drawerTitle">
        <p>
          {{ drawerDescription }}
        </p>

        <ul v-for="(item, index) in drawerRelatedIdentifier" :key="index">
          <li>{{ item.relatedIdentifierValue }}</li>

          <li>{{ item.relationType }}</li>
        </ul>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>
