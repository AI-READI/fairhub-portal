<script setup lang="ts">
import { NIcon } from "naive-ui";
import {
  Folder,
  FileTrayFullOutline,
  FolderOpenOutline,
} from "@vicons/ionicons5";
import type { TreeOption } from "naive-ui";
import type { Files } from "~/types/dataset";

const props = defineProps({
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
      h(NIcon, null, {
        default: () =>
          file.children?.length ? h(Folder) : h(FileTrayFullOutline),
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
        h(NIcon, null, {
          default: () => h(FolderOpenOutline),
        });
      break;
    case "collapse":
      meta.node.prefix = () =>
        h(NIcon, null, {
          default: () => h(Folder),
        });
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
