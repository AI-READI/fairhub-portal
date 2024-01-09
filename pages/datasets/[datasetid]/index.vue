<script setup lang="ts">
import sanitizeHtml from "sanitize-html";
import { parse } from "marked";

const push = usePush();
const route = useRoute();

const { datasetid } = route.params as { datasetid: string };

const url = ref<string>("sftp://user@1.1.1.1//home/user/a.txt");
const src =
  ref<string>(`# Flagship Dataset of Type 2 Diabetes from the AI-READI Project
                ## Identifier https://doi.org/10.5281/fairhub.7641684 ## Current
                version number v.1.0.0 ## Publication date YYYY-MM-DD ## License
                *In this section, mention the name of the data reuse license
                (refer to the LICENSE.txt file in your dataset for additional
                details)* ## Dataset access/restrictions *In this section,
                explain how the dataset can be accessed and any
                conditions/restrictions for accessing it.* ## Overview of the
                study *In this section, provide a high-level description of the
                study associated with the dataset. Include for instance
                identifiers of the study, a brief overview of the study
                protocol, external links (website, manuscripts, protocols, etc.)
                to find out more about the study, etc.* ## Description of the
                dataset *In this section, provide a detailed description of the
                dataset. Include the number of study participants (refer to the
                participants.tsv file in your dataset for additional
                information), the data types collected, data deidentification
                approaches if any, the overall number of files and total size of
                the dataset, etc.* ## Data standards followed *In this section,
                indicate the standards followed to structure the dataset, format
                the data files, etc. Make sure to include identifiers of the
                standards when available and/or link to the associated
                documentation.* ## Resources *In this section, mention any
                specific resources (software, documentation, manuscripts, etc.)
                that are required/useful for using the data. Make sure to
                include identifiers and/or links to the resources.* ## How to
                cite *In this section, provide instructions on how to cite the
                dataset if reused. Using the American Psychological Association
                (APA) style is suggested.* ## Contact *In this section, provide
                contact information of someone who can be reached out with
                questions regarding the dataset. You can also refer to the
                study_description.json and dataset_description.json metadata
                files for information about contact person/entity, authors, and
                contributors of the dataset.* ## Acknowledgement *In this
                section, provide acknowledgement to the funding source and other
                with identifiers and/or links as applicable.*`);

const sanitize = (html: string) => sanitizeHtml(html);

const markdownToHtml = computed(() => {
  return sanitize(parse(src.value));
});

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

const demoVersions = [
  {
    id: 1,
    title: "Version v5.4.2",
    date: "2021-05-01",
    doi: "10.5281/fairhub.1234567",
    selected: true,
  },
  {
    id: 2,
    title: "Version v5.4.1",
    date: "2021-04-01",
    doi: "10.5281/fairhub.1234567",
    selected: false,
  },
  {
    id: 3,
    title: "Version v5.4.0",
    date: "2021-03-01",
    doi: "10.5281/fairhub.1234567",
    selected: false,
  },
  {
    id: 4,
    title: "Version v5.3.0",
    date: "2021-02-01",
    doi: "10.5281/fairhub.1234567",
    selected: false,
  },
  {
    id: 5,
    title: "Version v5.2.0",
    date: "2021-01-01",
    doi: "10.5281/fairhub.1234567",
    selected: false,
  },
];
</script>

<template>
  <main class="h-full bg-gradient-to-b from-slate-50 to-purple-50 px-4">
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
      <n-tabs type="line" animated size="large">
        <n-tab-pane name="About" tab="About">
          <div class="grid grid-cols-7 gap-10">
            <n-space vertical class="col-span-5 mt-3">
              <h3>About</h3>

              <!-- eslint-disable vue/no-v-html -->
              <div
                class="prose mt-10 min-h-[300px] max-w-none"
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
                    MIT
                  </NuxtLink>
                </n-space>

                <n-space vertical class="mt-3">
                  <h3>Keywords</h3>

                  <n-space>
                    <n-tag type="info" size="small">Apple</n-tag>

                    <n-tag type="info" size="small">Banana</n-tag>

                    <n-tag type="info" size="small">Orange</n-tag>

                    <n-tag type="info" size="small">Pineapple</n-tag>

                    <n-tag type="info" size="small">Watermelon</n-tag>

                    <n-tag type="info" size="small">Grape</n-tag>

                    <n-tag type="info" size="small">Strawberry</n-tag>

                    <n-tag type="info" size="small">Cherry</n-tag>
                  </n-space>
                </n-space>
              </n-space>

              <n-space
                vertical
                class="rounded-xl border border-purple-200 bg-slate-50 pb-5 pt-3"
              >
                <n-space vertical :size="[0, 0]">
                  <h3 class="mb-3 px-4">Versions</h3>

                  <n-space
                    v-for="version in demoVersions"
                    :key="version.id"
                    justify="space-between"
                    align="start"
                    class="p-2 transition-all hover:bg-purple-50"
                    :class="{
                      '!bg-purple-200': version.selected,
                    }"
                  >
                    <div class="flex flex-col space-y-1">
                      <NuxtLink
                        to="#"
                        target="_blank"
                        class="text-sm font-medium transition-all hover:text-slate-600 hover:underline"
                      >
                        {{ version.title }}
                      </NuxtLink>

                      <NuxtLink
                        to="#"
                        target="_blank"
                        class="text-sm transition-all hover:text-slate-600 hover:underline"
                      >
                        {{ version.doi }}
                      </NuxtLink>
                    </div>

                    <p class="text-right text-xs text-gray-500">
                      {{ version.date }}
                    </p>
                  </n-space>
                </n-space>
              </n-space>
            </n-space>
          </div>
        </n-tab-pane>

        <n-tab-pane name="Datasheet" tab="Datasheet"> Datasheet </n-tab-pane>

        <n-tab-pane name="Study Metadata" tab="Study Metadata">
          Study Metadata
        </n-tab-pane>

        <n-tab-pane name="Dataset Metadata" tab="Dataset Metadata">
          Dataset Metadata
        </n-tab-pane>

        <n-tab-pane name="Datatype Metadata" tab="Datatype Metadata">
          Datatype Metadata
        </n-tab-pane>

        <n-tab-pane name="Files" tab="Files"> File Viewer </n-tab-pane>

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
