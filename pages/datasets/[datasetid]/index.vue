<script setup lang="ts">
import sanitizeHtml from "sanitize-html";
import { parse } from "marked";
// import JsonViewer from "vue-json-viewer/ssr";

const push = usePush();
const route = useRoute();

const { datasetid } = route.params as { datasetid: string };
const sanitize = (html: string) => sanitizeHtml(html);
// const { readme } = route.params as { readme: string };

const url = ref<string>("sftp://user@1.1.1.1//home/user/a.txt");

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
  console.log(dataset.value.metadata);
  // console.log("dataset.value.readme", dataset.value.metadata.readme);
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
    class="h-screen overflow-auto bg-gradient-to-b from-slate-50 to-purple-50 px-4"
  >
    <div class="mt-10 flex h-36 items-center">
      <div
        class="mx-auto flex w-full max-w-screen-xl items-center justify-between px-2"
      >
        <n-space vertical>
          <h1>{{ dataset?.title }}</h1>

          <p>{{ dataset?.description }}</p>

          <n-button size="large" type="info" secondary class="my-3">
            <template #icon>
              <Icon name="line-md:download-loop" />
            </template>
            Download this dataset
          </n-button>
        </n-space>

        <n-image
          :src="`https://api.dicebear.com/7.x/shapes/svg?seed=${dataset?.id}`"
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
                class="rounded-xl border border-purple-200 bg-slate-50 px-4 pb-5 pt-3"
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
                    <n-tag type="info" size="small">Diabetes</n-tag>

                    <n-tag type="info" size="small"
                      >Artificial Intelligence</n-tag
                    >

                    <n-tag type="info" size="small">Machine Learning</n-tag>

                    <n-tag type="info" size="small">Bridge2AI</n-tag>

                    <n-tag type="info" size="small">Eye Imaging</n-tag>
                  </n-space>
                </n-space>
              </n-space>

              <n-space
                vertical
                class="rounded-xl border border-purple-200 bg-slate-50 px-4 pb-5 pt-3"
              >
                <n-space vertical size="large">
                  <h3>Citation</h3>

                  <p class="text-sm">
                    <span class="font-medium">
                      When using this resource, please cite:
                    </span>

                    <br />
                    Fushiguro, M., Geto, S., & Nanami, K. (2024). Flagship
                    Dataset of Type 2 Diabetes from the AI-READI Project (v2).
                    Fairhub.
                    <NuxtLink
                      to="#"
                      class="underline transition-all hover:text-slate-600"
                    >
                      https://doi.org/10.fairhub/13942 </NuxtLink
                    >.
                  </p>

                  <p class="text-sm">
                    <span class="font-medium">
                      Additionally, please cite the original publication:
                    </span>

                    <br />

                    <NuxtLink
                      to="#"
                      class="underline transition-all hover:text-slate-600"
                    >
                      Johnson, A. E. W., Pollard, T. J., Shen, L., Lehman, L.
                      H., Feng, M., Ghassemi, M., Moody, B., Szolovits, P.,
                      Celi, L. A., & Mark, R. G. (2016). MIMIC-III, a freely
                      accessible critical care database. Scientific Data, 3,
                      160035.
                    </NuxtLink>
                    .
                  </p>
                </n-space>
              </n-space>

              <VersionSelector :id="(dataset?.id as number)" />
            </n-space>
          </div>
        </n-tab-pane>

        <n-tab-pane name="Datasheet" tab="Datasheet">
          <!-- eslint-disable vue/no-v-html -->
          <div
            class="prose mt-0 min-h-[300px] max-w-none text-black"
            v-html="datasetSheetMarkdownToHtml"
          />
          <!-- eslint-enable vue/no-v-html -->
        </n-tab-pane>

        <!-- <n-tab-pane name="Study Metadata" tab="Study Metadata">
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
        </n-tab-pane> -->

        <!-- <n-tab-pane name="Dataset Metadata" tab="Dataset Metadata">
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
        </n-tab-pane> -->

        <n-tab-pane name="Datatype Metadata" tab="Datatype Metadata">
          Datatype Metadata
        </n-tab-pane>

        <!-- <n-tab-pane name="Files" tab="Files"> File Viewer </n-tab-pane> -->

        <n-tab-pane name="Dashboard" tab="Dashboard"> Dashboard </n-tab-pane>

        <n-tab-pane name="Access Data" tab="Access Data">
          Please complete the requirements below to access the dataset

          <n-divider />

          <n-collapse>
            <n-collapse-item title="Step 1: Login to the portal" name="1">
              <n-space vertical>
                <p>
                  Please login to the portal using your login.gov account to
                  access the dataset.
                </p>

                <n-button type="info" secondary class="my-3">
                  <template #icon>
                    <Icon name="line-md:login" />
                  </template>
                  Login through login.gov
                </n-button>
              </n-space>
            </n-collapse-item>

            <n-collapse-item title="Step 2: Sign attestation" name="2">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
                quod laboriosam vero, possimus molestiae delectus! Autem sunt
                voluptatibus delectus quisquam ut inventore, reprehenderit
                perferendis amet. Veritatis, voluptatibus. Neque, iste
                temporibus?
              </p>

              <n-space>
                <n-input placeholder="Enter your name" class="mt-3" />

                <n-button type="info" secondary class="my-3">
                  <template #icon>
                    <Icon name="mdi:abjad-arabic" />
                  </template>
                  Sign
                </n-button>
              </n-space>
            </n-collapse-item>

            <n-collapse-item title="Step3: Select data types" name="3">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Exercitationem dicta laudantium eum consequatur perferendis
                omnis, id, possimus quisquam asperiores dolorum at?
                Necessitatibus facilis fuga maiores. Non, quod temporibus!
                Animi, esse!
              </p>
            </n-collapse-item>

            <n-collapse-item title="Step 4: Get access link" name="4">
              <n-input-group>
                <n-input v-model:value="url" />

                <n-button type="info" secondary>
                  <template #icon>
                    <Icon name="mdi:content-copy" />
                  </template>
                  Copy to clipboard
                </n-button>
              </n-input-group>
            </n-collapse-item>
          </n-collapse>
        </n-tab-pane>
      </n-tabs>
    </div>
  </main>
</template>
