<script setup lang="ts">
import type { TreeOption } from "naive-ui";
import { NButton } from "naive-ui";
import identifierType from "../../dev/related_identifier.json";
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
const drawerIcon = ref("");
const drawerText = ref("");
const relationType = ref<RelatedIdentifier[] | undefined>(undefined);
const drawerRelatedIdentifierValue = ref<RelatedIdentifier | undefined>(
  undefined,
);

const getRelationName = (relationType: string) => {
  const relation = identifierType.find((r) => r.value === relationType);
  return relation?.label || "";
  // return "";
};

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
    drawerTitle.value = filetype.metadataFileName;
    drawerIcon.value = "pepicons-pencil:file";
    drawerText.value = "This file";
    drawerDescription.value = filetype.metadataFileDescription;
    relationType.value = filetype.relatedIdentifier?.map((r) => {
      return {
        ...r,
        relationType: getRelationName(r.relationType),
      };
    });
    drawerRelatedIdentifierValue.value = filetype.relatedIdentifier?.find(
      (r) => r.relatedIdentifierValue,
    );
  } else if (datatype) {
    drawerTitle.value = datatype.directoryName;
    drawerIcon.value = "ic:baseline-folder";
    drawerText.value = "This directory";
    drawerDescription.value = datatype.directoryDescription;
    relationType.value = datatype.relatedIdentifier?.map((r) => {
      return {
        ...r,
        relationType: getRelationName(r.relationType),
      };
    });
    drawerRelatedIdentifierValue.value =
      datatype.relatedIdentifier?.find((r) => r.relatedIdentifierValue) ||
      undefined;
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

    <n-drawer
      v-model:show="drawerActive"
      :width="502"
      :height="280"
      placement="bottom"
    >
      <n-drawer-content>
        <n-space vertical>
          <div class="mb-1 text-lg font-bold">
            <Icon :name="drawerIcon" color="#0284c7" />
            {{ drawerTitle }}
          </div>

          <p class="text-md my-1 w-full border-b pb-2 font-semibold">
            Description
          </p>

          <p>
            {{ drawerDescription }}
          </p>

          <div
            v-if="drawerRelatedIdentifierValue && relationType"
            class="list mt-4"
          >
            <p class="text-md mb-1 w-full border-b pb-2 font-semibold">
              Relation type
            </p>

            <ul
              v-for="(type, index) in relationType"
              :key="index"
              class="mt-4 flex"
            >
              <li>
                {{ drawerText }}
                <span class="mr-2 lowercase">{{ type.relationType }}</span>

                <a
                  class="text-sky-600"
                  :href="drawerRelatedIdentifierValue?.relatedIdentifierValue"
                  target="_blank"
                  >{{ drawerRelatedIdentifierValue?.relatedIdentifierValue }}</a
                >
              </li>
            </ul>
          </div>
        </n-space>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>
