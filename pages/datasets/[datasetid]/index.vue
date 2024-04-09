<script setup lang="ts">
import sanitizeHtml from "sanitize-html";
import { parse } from "marked";
import type { Dataset, WithContext } from "schema-dts";

const { isMobile } = useDevice();
const route = useRoute();

const { datasetid } = route.params as { datasetid: string };
const sanitize = (html: string) => sanitizeHtml(html);

const tabs = reactive([
  {
    label: "About",
    shown: true,
  },
  {
    label: "Study Dashboard",
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
    label: "Dataset Structure Preview",
    shown: false,
  },
  {
    label: "Clinical Data Quality",
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
  name: dataset.value?.title,
  "@context": "https://schema.org",
  "@id": `https://doi.org/10.34534/${dataset.value?.id}`,
  "@type": "Dataset",
  contributor: dataset.value?.metadata.datasetDescription.contributor?.map(
    (contributor) => {
      if (contributor.nameType === "Personal") {
        return {
          name: contributor.contributorName,
          "@type": "Person",
          additionalType: contributor.contributorType,
          affiliation: contributor.affiliation?.map((affiliation) => ({
            name: affiliation.affiliationName,
            "@type": "Organization",
          })),
          familyName: contributor.contributorName.split(",")[0] || "",
          givenName:
            contributor.contributorName.split(",")[1] ||
            contributor.contributorName,
        };
      } else {
        return {
          name: contributor.contributorName,
          "@type": "Organization",
        };
      }
    },
  ),
  creator: dataset.value?.metadata.datasetDescription.creator.map((creator) => {
    if (creator.nameType === "Personal") {
      return {
        "@type": "Person",
        affiliation: creator.affiliation?.map((affiliation) => ({
          name: affiliation.affiliationName,
          "@type": "Organization",
        })),
        familyName: creator.creatorName.split(",")[0] || "",
        givenName: creator.creatorName.split(",")[1] || creator.creatorName,
      };
    } else {
      return {
        name: creator.creatorName,
        "@type": "Organization",
      };
    }
  }),
  datePublished: dataset.value?.metadata.datasetDescription.publicationYear, // todo: add the datePublished
  description: dataset.value?.metadata.datasetDescription.description?.find(
    (value) => value.descriptionType === "Abstract",
  )?.descriptionValue,
  funder: dataset.value?.metadata.datasetDescription.fundingReference?.map(
    (funder) => {
      return {
        name: funder.funderName,
        "@type": "Organization",
      };
    },
  ),
  identifier: `https://doi.org/10.34534/${dataset.value?.id}`,
  keywords: dataset.value?.metadata.datasetDescription.subject
    ?.map((subject) => subject.subjectValue)
    .join(", "),
  publisher: {
    name: "FAIRhub",
    "@type": "Organization",
  },
  url: `https://fairhub.io/datasets/${dataset.value?.id}`,
};

useSchemaOrg([NuxtSchemaDataset]);

useSeoMeta({
  title: dataset.value?.title || "FAIRhub",
  description: dataset.value?.description || "FAIRhub",
  ogDescription: dataset.value?.description,
  ogImage: `https://kalai.fairdataihub.org/api/generate?app=fairhub&title=${dataset.value?.title}&org=ai-readi&description=${dataset.value?.description}`,
  ogTitle: dataset.value?.title,
  twitterCard: "summary_large_image",
});

if (dataset.value) {
  if (dataset.value?.metadata.readme) {
    markdownToHtml.value = sanitize(await parse(dataset.value.metadata.readme));
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

const generateCombinedFullName = (name: string) => {
  const nameArray = name.split(",");

  if (nameArray.length > 1) {
    return `${nameArray[1]} ${nameArray[0]}`;
  } else {
    return name;
  }
};
</script>

<template>
  <main class="h-screen overflow-auto bg-gradient-to-b from-white to-blue-50">
    <div
      class="mx-auto mt-10 flex w-full max-w-screen-xl flex-col-reverse items-center justify-between px-3 sm:flex-row"
    >
      <n-space vertical>
        <h1>{{ dataset?.title }}</h1>

        <div
          v-for="(creator, index) in dataset?.metadata.datasetDescription
            .creator"
          :key="index"
          class="flex flex-row flex-wrap items-center align-middle text-black"
        >
          <!-- if on the last index create a different span -->
          <span class="mr-1 text-sm font-light">{{
            generateCombinedFullName(creator.creatorName)
          }}</span>

          <ButtonIdentifierBadge
            v-if="creator?.nameIdentifier"
            class="pt-1"
            :type="creator.nameIdentifier[0]"
          />

          <span
            v-if="
              dataset?.metadata.datasetDescription.creator &&
              index != dataset?.metadata.datasetDescription.creator.length - 1
            "
            class="text-sm"
          >
            ,
          </span>
        </div>

        <p class="hidden">{{ dataset?.description }}</p>

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
        class="mb-3 size-32 h-32 w-32 rounded-lg sm:mb-0"
      />
    </div>

    <n-divider />

    <div class="mx-auto w-full max-w-screen-xl">
      <NavGroup
        v-if="!isMobile"
        v-slot="{ ready, size, position, duration }"
        fluid
        :duration="350"
        as="nav"
        class="relative border-b"
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
              <button
                :class="[
                  isActive
                    ? 'text-sky-600'
                    : 'text-sky-900/70 hover:text-sky-500',
                ]"
                class="inline-block p-4 font-medium transition-all"
                @click.prevent="setActive"
              >
                {{ item.label }}
              </button>
            </NavItem>
          </NavList>
        </div>
      </NavGroup>

      <n-tabs v-if="isMobile" type="line" size="large" @update:value="navigate">
        <n-tab
          v-for="(item, index) in tabs"
          :key="index"
          :name="item.label"
          @update:value="navigate"
        >
          {{ item.label }}
        </n-tab>
      </n-tabs>

      <div class="flex flex-col gap-10 px-5 py-5 lg:grid lg:grid-cols-12">
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
              <MetadataHealthSheet
                :healthsheet="
                  dataset?.metadata.healthsheet as HealthsheetRecords
                "
              />
            </div>

            <div v-if="tabs[3].shown">
              <MetadataStudyDescription
                :metadata="
                  dataset?.metadata.studyDescription as StudyDescription
                "
              />

              <n-divider />

              <CardCollapsibleCard
                title="View the full study_description.json file"
                class="mb-4 shadow-md"
              >
                <VueJsonPretty
                  :data="dataset?.metadata.studyDescription || {}"
                  show-line
                  :deep="1"
                  highlight-selected-node
                  collapsed-on-click-brackets
                  :show-double-quotes="false"
                />
              </CardCollapsibleCard>
            </div>

            <div v-if="tabs[4].shown">
              <MetadataDatasetDescription
                :metadata="
                  dataset?.metadata.datasetDescription as DatasetDescription
                "
              />

              <n-divider />

              <CardCollapsibleCard
                title="View the full dataset_description.json file"
                class="mb-4 shadow-md"
              >
                <VueJsonPretty
                  :data="dataset?.metadata.datasetDescription || {}"
                  show-line
                  :deep="1"
                  highlight-selected-node
                  collapsed-on-click-brackets
                  :show-double-quotes="false"
                />
              </CardCollapsibleCard>
            </div>

            <div v-if="tabs[5].shown">
              <n-space vertical>
                <h3>Preview</h3>

                <p>
                  To access the dataset, please click the
                  <code>Access this dataset</code> button above.
                </p>

                <n-divider />

                <FilesFolderViewer
                  :folder-structure="dataset?.files || []"
                  :dataset-structure-description="
                    dataset?.metadata
                      .datasetStructureDescription as DatasetStructureDescription
                  "
                />
              </n-space>
            </div>

            <div v-if="tabs[6].shown">Clinical Data Quality</div>
          </TransitionFade>
        </div>

        <div class="col-span-4">
          <n-space vertical class="col-span-2">
            <n-space
              vertical
              class="rounded-xl border border-blue-200 bg-white px-1 py-4"
            >
              <n-space justify="center" align="center">
                <n-space vertical align="center" size="small">
                  <NuxtLink
                    target="_blank"
                    :to="`https://umami.aireadi.org/share/w56IOiviBTVZOlHu/staging.fairhub.io?url=${encodeURIComponent(
                      '/datasets/' + dataset?.id,
                    )}`"
                    class="text-sm font-medium text-sky-500 transition-all hover:text-sky-600"
                  >
                    <n-space size="small" align="center">
                      <Icon name="lets-icons:view-duotone" size="23" />

                      <p class="text-sm font-medium">1045</p>
                    </n-space>
                  </NuxtLink>

                  <span class="text-sm font-normal">Views</span>
                </n-space>

                <div>
                  <n-divider vertical />
                </div>

                <n-space vertical align="center" size="small">
                  <n-space size="small" align="center">
                    <Icon name="ic:round-download" size="18" />

                    <p class="text-sm font-medium">2000</p>
                  </n-space>

                  <span class="text-sm font-normal">Downloads</span>
                </n-space>

                <div>
                  <n-divider vertical />
                </div>

                <n-space vertical align="center" size="small">
                  <n-space size="small" align="center">
                    <Icon name="bi:journal-text" size="16" />

                    <p class="text-sm font-medium">5</p>
                  </n-space>

                  <span class="text-sm font-normal">Cited by</span>
                </n-space>
              </n-space>
            </n-space>

            <SideDatasetSize
              :size="dataset?.data.size"
              :file-count="dataset?.data.fileCount"
            />

            <n-space
              vertical
              class="rounded-xl border border-blue-200 bg-white px-4 pb-5 pt-3"
            >
              <n-space vertical>
                <h3>License</h3>

                <NuxtLink
                  to="https://doi.org/10.5281/zenodo.10642459"
                  target="_blank"
                  class="underline transition-all hover:text-slate-600"
                >
                  Health Data License
                </NuxtLink>
              </n-space>
            </n-space>

            <n-space
              vertical
              class="rounded-xl border border-blue-200 bg-white px-4 pb-5 pt-3"
            >
              <n-space vertical>
                <h3>Keywords</h3>

                <n-space>
                  <n-tag
                    v-for="(
                      keyword, index
                    ) in dataset?.metadata.datasetDescription.subject?.map(
                      (subject) => subject.subjectValue,
                    )"
                    :key="index"
                    type="info"
                    size="small"
                  >
                    {{ keyword }}
                  </n-tag>
                </n-space>
              </n-space>
            </n-space>

            <SideCitationViewer :id="dataset?.id || ''" />

            <SideVersionSelector :id="dataset?.id || ''" />
          </n-space>
        </div>
      </div>
    </div>
  </main>
</template>
