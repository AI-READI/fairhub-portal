<script setup lang="ts">
import sanitizeHtml from "sanitize-html";
import { parse } from "marked";
import type { Dataset, WithContext } from "schema-dts";

const route = useRoute();

const { datasetid } = route.params as { datasetid: string };
const sanitize = (html: string) => sanitizeHtml(html);

const tabs = reactive([
  {
    label: "About",
    shown: true,
  },
  {
    label: "Dashboard",
    shown: false,
  },
  {
    label: "Healthsheet",
    shown: false,
  },
  {
    label: "Study Metadata",
    shown: false,
  },
  {
    label: "Dataset Metadata",
    shown: false,
  },
  {
    label: "Datatype Metadata",
    shown: false,
  },
  {
    label: "Dataset Preview",
    shown: false,
  },
]);

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

const NuxtSchemaDataset: WithContext<Dataset> = {
  name: dataset.value?.metadata.datasetDescription.Title.filter(
    (value) => !value.titleType
  ).map((value) => value.titleValue),
  "@context": "https://schema.org",
  "@type": "Dataset",
  contentLocation:
    dataset.value?.metadata.studyDescription.ContactsLocationsModule.LocationList.map(
      (location) => {
        return {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressCountry: location.LocationCountry,
            addressLocality: location.LocationCity,
            addressRegion: location.LocationState,
            postalCode: location.LocationZip,
          },
        };
      }
    ),
  contributor: dataset.value?.metadata.datasetDescription.Contributor?.map(
    (contributor) => {
      return {
        "@type": "Person",
        additionalType: contributor.nameType,
        affiliation: contributor.affiliation?.map((affiliation) => ({
          "@type": "Organization",
          identifier: affiliation.affiliationIdentifier,
        })),
        givenName: contributor.contributorName,
      };
    }
  ),
  creator: dataset.value?.metadata.datasetDescription.Creator.map(
    (creator) => ({
      "@type": "Person",
      additionalType: creator.nameType,
      affiliation: creator.affiliation?.map((affiliation) => ({
        "@type": "Organization",
        identifier: affiliation.affiliationIdentifier,
      })),
      givenName: creator.creatorName,
    })
  ),
  description: dataset.value?.metadata.datasetDescription.Description?.filter(
    (value) => value.descriptionType === "Abstract"
  ).map((value) => value.descriptionValue),

  funder: dataset.value?.metadata.datasetDescription.ManagingOrganisation.name,
  identifier:
    dataset.value?.metadata.datasetDescription.Identifier.identifierType,
  keywords: dataset.value?.keywords.join(","),
  url: `https://fairhub.io/datasets/${dataset.value?.id}`,
};

useSchemaOrg([NuxtSchemaDataset]);

useSeoMeta({
  title: dataset.value?.title || "Fairhub",
  description: dataset.value?.description || "Fairhub",
  ogDescription: dataset.value?.description,
  ogImage: `https://kalai.fairdataihub.org/api/generate?app=fairhub&title=${dataset.value?.title}&org=ai-readi&description=${dataset.value?.description}`,
  ogTitle: dataset.value?.title,
  twitterCard: "summary_large_image",
});

if (dataset.value) {
  if (dataset.value?.metadata.readme) {
    markdownToHtml.value = sanitize(parse(dataset.value.metadata.readme));
  }
}

const navigate = (target: string) => {
  // the callback is fired once the animation is completed
  // to allow smooth transition

  // set all tabs to false
  for (const item of tabs) {
    item.shown = false;

    if (item.label === target) {
      item.shown = true;
    }
  }
};
</script>

<template>
  <main class="h-screen overflow-auto bg-gradient-to-b from-white to-blue-50">
    <div
      class="mx-auto mt-10 flex w-full max-w-screen-xl items-center justify-between px-3"
    >
      <n-space vertical>
        <h1>{{ dataset?.title }}</h1>

        <p>
          <n-space horizontal class="items-center align-middle">
            <div
              v-for="(creator, index) in dataset?.metadata.datasetDescription
                .Creator"
              :key="index"
              class="flex flex-row flex-wrap items-center align-middle text-black"
            >
              <!-- if on the last index create a different span -->
              <span class="mr-1 text-sm font-light">{{
                creator.creatorName
              }}</span>

              <button-badge-button
                v-if="creator?.nameIdentifier"
                class="pt-1"
                :type="creator.nameIdentifier[0]"
              />

              <span
                v-if="
                  dataset?.metadata.datasetDescription.Creator &&
                  index !=
                    dataset?.metadata.datasetDescription.Creator.length - 1
                "
                class="text-sm"
              >
                ,
              </span>
            </div>
          </n-space>
        </p>

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

    <n-divider />

    <div class="mx-auto w-full max-w-screen-xl">
      <NavGroup
        v-slot="{ ready, size, position, duration }"
        fluid
        :duration="350"
        as="nav"
        class="relative border-b px-4"
      >
        <div class="relative py-1">
          <div
            v-if="ready"
            :style="{
              '--size': size,
              '--position': position,
              '--duration': duration,
            }"
            class="absolute bottom-0 left-0 h-1 w-[--size] translate-x-[--position] bg-orange-400 transition-[width,transform] duration-[--duration]"
          />

          <NavList as="ul" class="relative flex items-stretch gap-3">
            <NavItem
              v-for="(item, index) in tabs"
              :key="index"
              v-slot="{ setActive, isActive }"
              as="li"
              @click="navigate(item.label)"
            >
              <NuxtLink
                href="#"
                :class="[
                  isActive
                    ? 'text-sky-600'
                    : 'text-sky-900/70 hover:text-sky-500',
                ]"
                class="inline-block p-4 font-medium transition-all"
                @click.prevent="setActive"
              >
                {{ item.label }}
              </NuxtLink>
            </NavItem>
          </NavList>
        </div>
      </NavGroup>

      <div class="px-5 py-5 lg:grid lg:grid-cols-12 lg:gap-10">
        <div class="col-span-8">
          <TransitionFade>
            <div v-if="tabs[0].shown">
              <!-- eslint-disable vue/no-v-html -->
              <div
                class="prose mt-0 min-h-[300px] max-w-none text-black"
                v-html="markdownToHtml"
              />
              <!-- eslint-enable vue/no-v-html -->
            </div>

            <div v-if="tabs[1].shown">Dashboard</div>

            <div v-if="tabs[2].shown">
              <metadata-health-sheet
                :healthsheet="dataset?.metadata.dataSheet || ''"
              />
            </div>

            <div v-if="tabs[3].shown">
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
                  <json-viewer
                    :value="dataset?.metadata.studyDescription || {}"
                  />
                </n-collapse-item>
              </n-collapse>
            </div>

            <div v-if="tabs[4].shown">
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
            </div>

            <div v-if="tabs[5].shown">Datatype Metadata</div>

            <div v-if="tabs[6].shown">
              <FilesFolderViewer :folder-structure="dataset?.files || []" />
            </div>
          </TransitionFade>
        </div>

        <div class="col-span-4">
          <n-space vertical class="col-span-2">
            <n-space
              vertical
              class="rounded-xl border border-blue-200 bg-slate-50 px-4 pb-5 pt-3"
            >
              <n-space justify="center" class="px-6 py-3" align="center">
                <n-space vertical align="center" size="small">
                  <p class="text-xl font-medium">
                    <n-number-animation :from="0" :to="104540" show-separator />
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
                    <n-number-animation :from="0" :to="1033" show-separator />
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
            </n-space>

            <n-space
              vertical
              class="rounded-xl border border-blue-200 bg-slate-50 px-4 pb-5 pt-3"
            >
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

            <CitationViewer
              :id="(dataset?.id as number)"
              :creators="(dataset?.metadata.datasetDescription.Creator as DatasetDescription['Creator'])"
            />

            <VersionSelector :id="(dataset?.id as number)" />
          </n-space>
        </div>
      </div>
    </div>
  </main>
</template>
