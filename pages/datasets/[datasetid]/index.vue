<script setup lang="ts">
import sanitizeHtml from "sanitize-html";
import { parse } from "marked";

const push = usePush();
const route = useRoute();

const { datasetid } = route.params as { datasetid: string };
const sanitize = (html: string) => sanitizeHtml(html);

const { data: dataset, error } = await useFetch(`/api/datasets/${datasetid}`, {
  headers: useRequestHeaders(["cookie"]),
});

if (error.value) {
  console.error(error.value);

  push.error({
    title: "Something went wrong",
    message: "Failed to fetch dataset",
  });

  throw new Error("Failed to fetch dataset");
}

const markdownToHtml = ref<string>("");
const datasetSheetMarkdownToHtml = ref<string>("");

if (dataset.value) {
  if (dataset.value?.metadata.readme) {
    markdownToHtml.value = sanitize(parse(dataset.value.metadata.readme));
  }

  if (dataset.value?.metadata.dataSheet) {
    datasetSheetMarkdownToHtml.value = sanitize(
      parse(dataset.value.metadata.dataSheet)
    );
  }
}
</script>

<template>
  <main
    class="h-screen overflow-auto bg-gradient-to-b from-white to-blue-50 px-4"
  >
    <div class="mt-10 flex h-36 items-center">
      <div
        class="mx-auto flex w-full max-w-screen-xl items-center justify-between px-2"
      >
        <n-space vertical>
          <h1>{{ dataset?.title }}</h1>

          <p>{{ dataset?.description }}</p>

          <NuxtLink to="https://download.fairhub.io/1" target="__blank">
            <n-button size="large" type="info" secondary class="my-3">
              <template #icon>
                <Icon name="line-md:download-loop" />
              </template>
              Access this dataset
            </n-button>
          </NuxtLink>
        </n-space>

        <n-image
          src="https://raw.githubusercontent.com/AI-READI/AI-READI-logo/main/logo/png/option2.png"
          :alt="dataset?.title"
          class="size-32 h-32 w-32 rounded-lg"
        />
      </div>
    </div>

    <div class="mx-auto flex w-full max-w-screen-xl flex-col px-3 py-5">
      <n-tabs type="line" animated size="large" default-value="About">
        <n-tab-pane name="About" tab="About">
          <div class="grid grid-cols-7 gap-10">
            <n-space vertical class="col-span-5 mt-3">
              <!-- eslint-disable vue/no-v-html -->
              <div
                class="prose mt-0 min-h-[300px] max-w-none text-black"
                v-html="markdownToHtml"
              />
              <!-- eslint-enable vue/no-v-html -->
            </n-space>

            <n-space vertical class="col-span-2">
              <n-space
                vertical
                class="rounded-xl border border-blue-200 bg-slate-50 px-4 pb-5 pt-3"
              >
                <n-space justify="center" class="p-6" align="center">
                  <n-space vertical align="center" size="small">
                    <p class="text-xl font-medium">
                      <n-number-animation
                        :from="0"
                        :to="104540"
                        show-separator
                      />
                    </p>

                    <n-space size="small" align="center">
                      <Icon name="lets-icons:view-duotone" size="23" />

                      <span class="font-normal">Views</span>
                    </n-space>
                  </n-space>

                  <div>
                    <n-divider vertical />
                  </div>

                  <n-space vertical align="center" size="small">
                    <p class="text-xl font-medium">
                      <n-number-animation
                        :from="0"
                        :to="1033"
                        show-separator
                        class="text-lg font-medium"
                      />
                    </p>

                    <n-space size="small" align="center">
                      <Icon name="ic:round-download" size="18" />

                      <span class="font-normal">Downloads</span>
                    </n-space>
                  </n-space>
                </n-space>
              </n-space>

              <n-space
                vertical
                class="rounded-xl border border-blue-200 bg-slate-50 px-4 pb-5 pt-3"
              >
                <n-space vertical>
                  <h3>License</h3>

                  <NuxtLink
                    to="https://spdx.org/licenses/MIT.html"
                    target="_blank"
                    class="underline transition-all hover:text-slate-600"
                  >
                    Health Data License
                  </NuxtLink>
                </n-space>

                <n-space vertical class="mt-3">
                  <h3>Keywords</h3>

                  <n-space>
                    <n-tag
                      v-for="(keyword, index) in dataset?.keywords"
                      :key="index"
                      type="info"
                      size="small"
                    >
                      {{ keyword }}
                    </n-tag>
                  </n-space>
                </n-space>
              </n-space>

              <CitationViewer :id="(dataset?.id as number)" />

              <VersionSelector :id="(dataset?.id as number)" />
            </n-space>
          </div>
        </n-tab-pane>

        <n-tab-pane name="Dashboard" tab="Dashboard"> Dashboard </n-tab-pane>

        <n-tab-pane name="Datasheet" tab="Datasheet">
          <!-- eslint-disable vue/no-v-html -->
          <div
            class="prose mt-0 min-h-[300px] max-w-none text-black"
            v-html="datasetSheetMarkdownToHtml"
          />
          <!-- eslint-enable vue/no-v-html -->
        </n-tab-pane>

        <n-tab-pane name="Study Metadata" tab="Study Metadata">
          <MetadataStudyDescription
            :metadata="(dataset?.metadata.studyDescription as StudyDescription)"
            :study-title="(dataset?.studyTitle as string)"
          />

          <n-divider />

          <n-collapse>
            <n-collapse-item
              title="View the full study_description.json file"
              name="1"
              size="large"
            >
              <json-viewer :value="dataset?.metadata.studyDescription || {}" />
            </n-collapse-item>
          </n-collapse>
        </n-tab-pane>

        <n-tab-pane name="Dataset Metadata" tab="Dataset Metadata">
          <MetadataDatasetDescription
            :metadata="(dataset?.metadata.datasetDescription as DatasetDescription)"
          />

          <n-divider />

          <n-collapse>
            <n-collapse-item
              title="View the full dataset_description.json file"
              name="1"
              size="large"
            >
              <json-viewer
                :value="dataset?.metadata.datasetDescription || {}"
                copyable
                :show-array-index="false"
              />

              <n-divider />

              <VueJsonPretty
                :data="dataset?.metadata.datasetDescription || {}"
                show-line
                show-icon
                :deep="1"
                highlight-selected-node
                collapsed-on-click-brackets
                :show-double-quotes="false"
              />
            </n-collapse-item>
          </n-collapse>
        </n-tab-pane>

        <n-tab-pane name="Datatype Metadata" tab="Datatype Metadata">
          Datatype Metadata
        </n-tab-pane>

        <!-- <n-tab-pane name="Files" tab="Files">
          <FilesFolderViewer
            :folder-structure="(dataset?.files as FolderStructure[])"
          />
        </n-tab-pane> -->
      </n-tabs>
    </div>
  </main>
</template>
