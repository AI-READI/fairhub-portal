<script setup lang="ts">
import type { TreeOption } from "naive-ui";
import { Icon } from "#components";

defineProps({
  dataset: {
    required: true,
    type: Object,
  },
});

function convertFile(file: Files): TreeOption {
  return {
    children: file.children ? file.children.map(convertFile) : undefined,
    key: file.label,
    label: file.label,
    prefix: () =>
      h(Icon, {
        name: file.children?.length
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
  <n-tab-pane name="Files" tab="Files">
    <n-tree
      block-line
      expand-on-click
      :data="dataset?.files.map(convertFile)"
      :on-update:expanded-keys="updatePrefixWithExpaned"
    />
  </n-tab-pane>
</template>
