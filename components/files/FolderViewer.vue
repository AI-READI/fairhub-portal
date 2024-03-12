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

function convertFile(file: FolderStructure, level: number): TreeOption {
  return {
    children: file.children
      ? level < 1
        ? file.children.map((f) => convertFile(f, level + 1))
        : undefined
      : undefined,
    key: useId(), // generate unique id for each file
    label: file.label,
    prefix: () =>
      h(Icon, {
        name:
          "children" in file || file.children?.length
            ? "ic:baseline-folder"
            : "pepicons-pencil:file",
      }),
    suffix: () =>
      level === 0
        ? h(
            NButton,
            {
              class: "",
              onClick: (_value) => {
                openMetdataDrawer(file.label);
              },
              size: "tiny",
            },
            { default: () => "Learn More" },
          )
        : undefined,
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

const data = props.folderStructure.map((file) => convertFile(file, 0));

const drawerTitle = ref("");
const drawerDescription = ref("");

const openMetdataDrawer = (label: string) => {
  drawerTitle.value = label;

  // get the datatype from the dictionary
  const datatype = props.datasetStructureDescription.datasetStructure.find(
    (d) => d.directoryName === label,
  );

  console.log(datatype);

  if (datatype) {
    drawerDescription.value = datatype.directoryDescription;
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
      </n-drawer-content>
    </n-drawer>
  </div>
</template>
