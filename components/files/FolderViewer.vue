<script setup lang="ts">
import type { TreeOption } from "naive-ui";
import { Icon } from "#components";

defineProps({
  folderStructure: {
    required: true,
    type: Array as PropType<Array<FolderStructure>>,
  },
});

function convertFile(file: FolderStructure): TreeOption {
  return {
    children: file.children ? file.children.map(convertFile) : undefined,
    key: useId(), // generate unique id for each file
    label: file.label,
    prefix: () =>
      h(Icon, {
        name:
          "children" in file || file.children?.length
            ? "ic:baseline-folder"
            : "pepicons-pencil:file",
      }),
  };
}

const updatePrefixWithExpaned = (
  _keys: Array<string | number>,
  _option: Array<TreeOption | null>,
  meta: {
    action: "expand" | "collapse" | "filter";
    node: TreeOption | null;
  }
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
</script>

<template>
  <n-tree
    block-line
    expand-on-click
    :data="folderStructure.map(convertFile)"
    :on-update:expanded-keys="updatePrefixWithExpaned"
  />
</template>
