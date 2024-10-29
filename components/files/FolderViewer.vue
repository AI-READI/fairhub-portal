<script setup lang="ts">
import type { TreeOption } from "naive-ui";
import { NButton, NDivider } from "naive-ui";
import prettyBytes from "pretty-bytes";
import identifierType from "../../dev/related_identifier.json";
import { Icon } from "#components";

const drawerActive = ref(false);

const props = defineProps({
  datasetStructureDescription: {
    required: true,
    type: Object as PropType<DatasetStructureDescription>,
  },
});

const drawerDetails = ref<{
  title: string;
  description: string | undefined;
  icon: string;
  numberOfFiles: number;
  size: number | undefined;
  text: string;
}>({
  title: "",
  description: "",
  icon: "",
  numberOfFiles: 0,
  size: 0,
  text: "",
});

const relationType = ref<RelatedIdentifier[] | undefined>(undefined);

function convertMetadataFile(
  file: MetadataFile,
  previousPath: Array<string>,
): TreeOption {
  return {
    children: undefined,
    key: useId(),
    label: file.metadataFileName,
    prefix: () =>
      h(Icon, {
        name: "pepicons-pencil:file",
      }),
    suffix: () =>
      h(
        NButton,
        {
          class: "",
          onClick: () => {
            openMetadataDrawer([...previousPath, file.metadataFileName]);
          },
          size: "tiny",
        },
        { default: () => "Learn More" },
      ),
  };
}

function convertDirectory(
  directory: Directory,
  previousPath: Array<string>,
): TreeOption {
  const naiveDirs: Array<TreeOption> | undefined = directory.directoryList?.map(
    (d) => convertDirectory(d, [...previousPath, directory.directoryName]),
  );
  const naiveFiles: Array<TreeOption> | undefined =
    directory.metadataFileList?.map((f) =>
      convertMetadataFile(f, [...previousPath, directory.directoryName]),
    );
  const children = [...(naiveDirs || []), ...(naiveFiles || [])];
  return {
    children: children.length ? children : undefined,
    key: useId(), // generate unique id for each file
    label: directory.directoryName,
    prefix: () =>
      h(Icon, {
        name: "ic:baseline-folder",
      }),
    suffix: () =>
      h(
        "div",
        {
          class: "flex",
        },
        [
          directory.size
            ? h("span", { class: "text-sm" }, prettyBytes(directory.size) || "")
            : null,
          directory.size ? h(NDivider, { vertical: true }) : null,
          h(
            NButton,
            {
              class: "",
              onClick: () => {
                openMetadataDrawer([...previousPath, directory.directoryName]);
              },
              size: "tiny",
            },
            { default: () => "Learn More" },
          ),
        ],
      ),
  };
}

// const data = props.folderStructure.map((file) => convertFile(file, []));
const dataStr = props.datasetStructureDescription.directoryList.map((d) =>
  convertDirectory(d, []),
);
const datafile = props.datasetStructureDescription.metadataFileList.map((f) =>
  convertMetadataFile(f, []),
);

const folderStructure = [...dataStr, ...datafile];

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

const getRelationName = (relationType: string) => {
  const relation = identifierType.find((r) => r.value === relationType);
  return relation?.label || "";
  // return "";
};

const openMetadataDrawer = (currentPath: Array<string>) => {
  let directoryList: Array<Directory> | undefined =
    props.datasetStructureDescription.directoryList;
  let metadataFileList: Array<MetadataFile> | undefined =
    props.datasetStructureDescription.metadataFileList;
  let filetype = null;
  let foldertype = null;
  for (const d of currentPath) {
    filetype = metadataFileList?.find((file) => file.metadataFileName === d);
    if (filetype) continue;
    foldertype = directoryList?.find((dir) => dir.directoryName === d);
    if (foldertype) {
      directoryList = foldertype?.directoryList;
      metadataFileList = foldertype?.metadataFileList;
      continue;
    } else {
      filetype = null;
      foldertype = null;
      break;
    }
  }

  if (filetype) {
    drawerDetails.value = {
      title: filetype.metadataFileName,
      description: filetype.metadataFileDescription,
      icon: "iconamoon:file-fill",
      numberOfFiles: 0,
      size: 0,
      text: "This file",
    };
    relationType.value = filetype.relatedIdentifier?.map((r) => {
      return {
        ...r,
        relationType: getRelationName(r.relationType),
      };
    });
  } else if (foldertype) {
    drawerDetails.value = {
      title: foldertype.directoryName,
      description: foldertype.directoryDescription,
      icon: "ic:baseline-folder",
      numberOfFiles: foldertype.numberOfFiles || 0,
      size: foldertype.size || 0,
      text: "This directory",
    };
    relationType.value = foldertype.relatedIdentifier?.map((r) => {
      return {
        ...r,
        relationType: getRelationName(r.relationType),
      };
    });
  } else {
    drawerDetails.value = {
      title: "No metadata found for this file",
      description: "",
      icon: "iconamoon:file-fill",
      numberOfFiles: 0,
      size: 0,
      text: "This file",
    };
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
      :data="folderStructure"
      :on-update:expanded-keys="updatePrefixWithExpaned"
    />

    <n-drawer
      v-model:show="drawerActive"
      :width="502"
      :height="280"
      placement="bottom"
    >
      <n-drawer-content>
        <n-flex vertical>
          <n-flex justify="space-between">
            <div class="mb-1 text-lg font-bold">
              <Icon :name="drawerDetails.icon" size="22" color="#0284c7" />
              {{ drawerDetails.title }}
            </div>

            <div class="flex items-center">
              <p v-if="drawerDetails.numberOfFiles">
                {{ drawerDetails.numberOfFiles }} files
              </p>

              <n-divider v-if="drawerDetails.numberOfFiles" vertical />

              <p v-if="drawerDetails.size">
                {{ prettyBytes(drawerDetails.size) }}
              </p>
            </div>
          </n-flex>

          <p class="text-md my-1 w-full border-b pb-2 font-semibold">
            Description
          </p>

          <p v-if="drawerDetails.description">
            {{ drawerDetails.description }}
          </p>

          <p v-else>
            {{ "No description provided" }}
          </p>

          <div v-if="relationType" class="list mt-4">
            <p class="text-md mb-1 w-full border-b pb-2 font-semibold">
              Additional Information
            </p>

            <ul
              v-for="(type, index) in relationType"
              :key="index"
              class="mt-4 flex"
            >
              <li>
                {{ drawerDetails.text }}
                <span class="mr-2 lowercase">{{ type.relationType }}</span>

                <a
                  class="text-sky-600"
                  :href="type?.relatedIdentifierValue"
                  target="_blank"
                  >{{ type?.relatedIdentifierValue }}</a
                >
              </li>
            </ul>
          </div>
        </n-flex>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>
