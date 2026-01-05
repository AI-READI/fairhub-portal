<script setup lang="ts">
import sanitizeHtml from "sanitize-html";
// import { fetchAllDashboardConnectors } from "~/stores/dashboard";
import { parse } from "marked";
import type { Dataset, WithContext } from "schema-dts";

// Temp AI-READI Study ID From ENV
const aireadiStudyId: string = nuxtConfig().public.AIREADI_STUDY_UUID;
const config = useRuntimeConfig();

const { isMobile } = useDevice();
const route = useRoute();
const dayjs = useDayjs();

const { datasetid } = route.params as { datasetid: string };
const sanitize = (html: string) => sanitizeHtml(html);

const tabs = reactive([
  {
    label: "About",
    shown: true,
    shownInMini: true,
  },
  {
    label: "Healthsheet",
    shown: false,
    shownInMini: true,
  },
  {
    label: "Study Dashboard",
    shown: false,
    shownInMini: false,
  },
  {
    label: "Study Metadata",
    shown: false,
    shownInMini: false,
  },
  {
    label: "Dataset Metadata",
    shown: false,
    shownInMini: true,
  },
  {
    label: "Dataset Structure Preview",
    shown: false,
    shownInMini: true,
  },
  {
    label: "Dataset Quality Dashboard",
    shown: false,
    shownInMini: false,
  },
  {
    label: "Dataset Uses",
    shown: false,
    shownInMini: true,
  },
]);

const formatter = Intl.NumberFormat("en", { notation: "compact" });

const totalViewCount = ref(0);
const totalDownloadApprovals = ref(0);
const totalDownloadApprovalforAllVersions = ref(0);
const currentTab = ref("allVersions");

const isLatestVersion = ref(false);
const latestVersionId = ref("");

const isMiniDataset = computed(() => {
  return dataset.value?.data.mini || false;
});

const totalViewCountSpinner = ref(true);
const totalDownloadApprovalSpinner = ref(true);

const totalCitationsSpinner = ref(true);
const totalCitations = ref(0);

const { data: dataset, error } = await useFetch(`/api/datasets/${datasetid}`, {
  headers: useRequestHeaders(["cookie"]),
});

// Get Study ID here. For now, we reference our environment variable
const studyId = aireadiStudyId;

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
  "@id": `https://doi.org/${dataset.value?.metadata.datasetDescription.identifier.identifierValue}`,
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
        url: "https://aireadi.org",
      };
    }
  }),

  datePublished: dataset.value?.created_at
    ? dayjs.unix(dataset.value.created_at).format("YYYY-MM-DD")
    : "Unknown",
  description: dataset.value?.metadata.datasetDescription.description?.find(
    (value) => value.descriptionType === "Abstract",
  )?.descriptionValue,
  distribution: [
    {
      name: dataset.value?.title,
      "@type": "DataDownload",
      conditionsOfAccess:
        dataset.value?.metadata?.datasetDescription?.accessType,
      contentSize:
        dataset.value?.metadata?.datasetDescription?.size?.[0] || "0 KB",
      contentUrl: `https://fairhub.io/datasets/${datasetid}/access`,
      description: `${dataset.value?.description}.`,
      encodingFormat: dataset.value?.metadata?.datasetDescription?.format?.map(
        (f) => (f.toUpperCase().includes("DICOM") ? "application/dicom" : f),
      ),
      license: dataset.value?.metadata?.datasetDescription?.rights?.[0]
        ?.rightsURI
        ? dataset.value.metadata.datasetDescription.rights[0].rightsURI
        : "not provided",
    },
  ],
  funder: dataset.value?.metadata.datasetDescription.fundingReference?.map(
    (funder) => {
      return {
        name: funder.funderName,
        "@type": "Organization",
        identifier: funder.funderIdentifier?.funderIdentifierValue
          ? { "@id": funder.funderIdentifier.funderIdentifierValue }
          : undefined,
      };
    },
  ),
  isBasedOn: [
    {
      name: "AI-READI Documentation",
      "@type": "CreativeWork",
      url:
        dataset.value?.metadata?.datasetDescription?.relatedIdentifier?.[0]
          ?.relatedIdentifierValue || "",
    },
    {
      name: "AI-READI Project Website",
      "@type": "CreativeWork",
      url:
        dataset.value?.metadata?.datasetDescription?.relatedIdentifier?.[1]
          ?.relatedIdentifierValue || "",
    },
    {
      name: "Protocol Data Element Definitions",
      "@type": "CreativeWork",
      url: "http://clinicaltrials.gov/prs",
    },
  ],
  keywords: dataset.value?.metadata.datasetDescription.subject
    ?.map((subject) => subject.subjectValue)
    .join(", "),
  license: dataset.value?.metadata.datasetDescription.rights?.[0]?.rightsURI
    ? { "@id": dataset.value.metadata.datasetDescription.rights[0].rightsURI }
    : "not provided",
  publisher: {
    name: "FAIRhub",
    "@type": "Organization",
  },
  url: `https://fairhub.io/datasets/${dataset.value?.id}`,
  variableMeasured: dataset.value?.metadata.datasetDescription.subject?.flatMap(
    (s) =>
      s.subjectIdentifier?.valueURI
        ? [{ "@id": s.subjectIdentifier.valueURI, "@type": "PropertyValue" }]
        : [],
  ),
};

useSchemaOrg([NuxtSchemaDataset]);

// Datacite tracker MDC integration
useHead(() => {
  const doi =
    dataset.value?.metadata?.datasetDescription?.identifier?.identifierValue;

  if (process.env.NUXT_SITE_ENV !== "production" || !doi) {
    return {};
  }

  return {
    script: [
      {
        src: "https://cdn.jsdelivr.net/npm/@datacite/datacite-tracker",
        defer: true,
        "data-repoid": "da-rukpmw",
        "data-metric": "view",
        "data-doi": doi,
      },
    ],
  };
});


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

  if (dataset.value?.versions.length > 0) {
    latestVersionId.value = dataset.value?.versions[0].id;

    if (dataset.value?.versions[0].id === dataset.value?.id) {
      isLatestVersion.value = true;
    }
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

const getViewCount = async () => {
  totalViewCountSpinner.value = true;
  await $fetch(
    `/api/viewCount/${datasetid}${currentTab.value === "allVersions" ? "/all" : ""}`,
  )
    .then((data) => {
      totalViewCount.value = data;
      totalViewCountSpinner.value = false;
    })
    .catch((err: string) => {
      console.error("Error fetching view count", err);
    })
    .finally(() => {
      totalViewCountSpinner.value = false;
    });
};

const getDownloads = async (skipSpinner: boolean = false) => {
  await $fetch(`/api/viewDownload/${datasetid}`)
    .then((data) => {
      totalDownloadApprovals.value = data[0];
      totalDownloadApprovalforAllVersions.value = data[1];
    })
    .catch((err: string) => {
      console.error("Error fetching download status", err);
    })
    .finally(() => {
      if (!skipSpinner) {
        totalDownloadApprovalSpinner.value = false;
      }
    });
};

const getTotalCitations = async () => {
  totalCitationsSpinner.value = true;
  await $fetch(`/api/totalCitations/${datasetid}`)
    .then((data) => {
      totalCitations.value = data;
    })
    .catch((err: string) => {
      console.error("Error fetching total citations", err);
    })
    .finally(() => {
      totalCitationsSpinner.value = false;
    });
};

onMounted(() => {
  getViewCount();
  getDownloads(false);
  getTotalCitations();
});

const onTabChange = () => {
  totalDownloadApprovalSpinner.value = true;

  getViewCount();

  setTimeout(() => {
    totalDownloadApprovalSpinner.value = false;
  }, 700);
};
</script>

<template>
  <main
    class="h-screen overflow-auto bg-gradient-to-b from-white to-blue-50 pb-6"
  >
    <div
      class="mx-auto mt-10 flex w-full max-w-screen-xl flex-col-reverse items-center justify-between px-3 sm:flex-row"
    >
      <n-flex vertical>
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

        <n-alert v-if="!isLatestVersion" type="warning" class="my-3 mr-3">
          This version of the dataset is no longer accessible. Please refer to
          the
          <NuxtLink
            :to="`/datasets/${latestVersionId}`"
            class="text-blue-500 hover:underline"
            >latest version</NuxtLink
          >.
        </n-alert>

        <n-flex v-else>
          <NuxtLink :to="`/datasets/${dataset?.id}/access`">
            <n-button size="large" type="info" secondary class="my-3">
              <template #icon>
                <Icon name="line-md:download-loop" />
              </template>
              Access this dataset
            </n-button>
          </NuxtLink>

          <NuxtLink :to="`https://docs.aireadi.org`" target="_blank">
            <n-button size="large" type="info" tertiary class="my-3">
              <template #icon>
                <Icon name="line-md:document" />
              </template>
              View the dataset documentation
            </n-button>
          </NuxtLink>
        </n-flex>
      </n-flex>

      <n-image
        :src="
          dataset?.id === '4'
            ? 'https://raw.githubusercontent.com/AI-READI/AI-READI-logo/main/logo/png/mini.png'
            : 'https://raw.githubusercontent.com/AI-READI/AI-READI-logo/main/logo/png/option2.png'
        "
        :alt="dataset?.title"
        class="mb-3 size-32 h-32 w-32 rounded-lg sm:mb-0"
        object-fit="contain"
      />
    </div>

    <div class="mx-auto w-full max-w-screen-xl px-3 py-2">
      <n-alert
        v-if="isMiniDataset"
        title="This is not a full dataset"
        type="warning"
      >
        <p>
          It is only intended to help develop pipelines before downloading the
          full dataset. To access the full dataset, please
          <NuxtLink
            :to="`/datasets/${dataset?.data.parent || ''}`"
            class="text-blue-500 hover:underline"
            >click here</NuxtLink
          >.
        </p>
      </n-alert>
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

          <NavList as="ul" class="relative flex items-stretch gap-2">
            <NavItem
              v-for="(item, index) in tabs.filter((tab) =>
                isMiniDataset ? tab.shownInMini : true,
              )"
              :key="index"
              v-slot="{ setActive, isActive }"
              as="li"
              class="flex items-center"
              @click="navigate(item.label)"
            >
              <button
                :class="[
                  isActive
                    ? 'text-sky-600'
                    : 'text-sky-900/70 hover:text-sky-500',
                ]"
                class="inline-block p-2 font-medium transition-all"
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
          v-for="(item, index) in tabs.filter((tab) =>
            isMiniDataset ? tab.shownInMini : true,
          )"
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
            <div v-if="tabs.find((tab) => tab.label === 'About')?.shown">
              <n-alert title="Info" type="info">
                <p class="text-md text-black">
                  This page provides an overview of the dataset and associated
                  study.
                </p>
              </n-alert>

              <!-- eslint-disable vue/no-v-html -->
              <div
                class="prose mt-8 min-h-[300px] max-w-none text-black"
                v-html="markdownToHtml"
              />
              <!-- eslint-enable vue/no-v-html -->
            </div>

            <div v-if="tabs.find((tab) => tab.label === 'Healthsheet')?.shown">
              <MetadataHealthSheet
                :healthsheet="
                  dataset?.metadata.healthsheet as HealthsheetRecords
                "
              />
            </div>

            <div
              v-if="
                tabs.find((tab) => tab.label === 'Study Dashboard')?.shown &&
                !isMiniDataset
              "
            >
              <n-flex vertical>
                <n-alert title="Info" type="info">
                  <p class="text-md text-black">
                    This page provides a visual overview of participant
                    recruitment and survey completion for the study.
                  </p>
                </n-alert>

                <DashboardView :study-id="studyId" />
              </n-flex>
            </div>

            <div
              v-if="tabs.find((tab) => tab.label === 'Study Metadata')?.shown"
            >
              <MetadataStudyDescription
                :metadata="
                  dataset?.metadata
                    .studyDescription as unknown as StudyDescription
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

            <div
              v-if="tabs.find((tab) => tab.label === 'Dataset Metadata')?.shown"
            >
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

            <div
              v-if="
                tabs.find((tab) => tab.label === 'Dataset Structure Preview')
                  ?.shown
              "
            >
              <n-flex vertical>
                <n-alert title="Info" type="info">
                  <p>
                    This is a preview of the dataset's structure, designed to
                    provide an overview of its organization. To access the
                    actual dataset, please use the
                    <code>Access this dataset </code> button above.
                  </p>
                </n-alert>

                <n-divider />

                <FilesFolderViewer
                  :folder-structure="dataset?.files || []"
                  :dataset-structure-description="
                    dataset?.metadata
                      .datasetStructureDescription as DatasetStructureDescription
                  "
                />
              </n-flex>
            </div>

            <div
              v-if="
                tabs.find((tab) => tab.label === 'Dataset Quality Dashboard')
                  ?.shown && !isMiniDataset
              "
            >
              <n-alert title="Info" type="info">
                <p class="text-md text-black">
                  This page links to the
                  <NuxtLink to="https://ohdsi.github.io/DataQualityDashboard/"
                    >Data Quality Dashboard</NuxtLink
                  >
                  for the clinical data for AI-READI. This report provides a
                  summary of how well the data conforms to the
                  <NuxtLink to="https://www.ohdsi.org/data-standardization/"
                    >OMOP CDM</NuxtLink
                  >, in terms of structure, content and veracity of the data.
                </p>
              </n-alert>

              <n-flex>
                <NuxtLink
                  to="http://b21ai-dqd.westus2.azurecontainer.io:3838/"
                  target="_blank"
                >
                  <n-button size="large" type="info" secondary class="my-3">
                    View the Dataset Quality Report
                  </n-button>
                </NuxtLink>
              </n-flex>
            </div>

            <div v-if="tabs.find((tab) => tab.label === 'Dataset Uses')?.shown">
              <n-alert title="Info" type="info">
                <p class="text-md text-black">
                  This page provides information about the research purpose of
                  requests for the dataset.
                </p>
              </n-alert>

              <DownloadAgreementList class="mt-3" :datasetid="datasetid" />
            </div>
          </TransitionFade>
        </div>

        <div class="col-span-4">
          <n-flex vertical class="col-span-2">
            <n-flex
              vertical
              class="items-center justify-center rounded-xl border border-blue-200 bg-white px-4 py-4"
            >
              <h3 class="self-start">Usage statistics</h3>

              <div class="mt-4 flex items-center space-x-2">
                <n-flex vertical align="center" size="small">
                  <n-flex size="small" align="center">
                    <Icon name="lets-icons:view-duotone" size="23" />

                    <TransitionFade>
                      <div v-if="totalViewCountSpinner" class="min-w-[36px]">
                        <n-spin :size="12" />
                      </div>

                      <div v-else class="min-w-[36px] text-sm font-medium">
                        <div v-if="currentTab === 'currentVersion'">
                          {{ formatter.format(totalViewCount || 0) }}
                        </div>

                        <div v-else>
                          {{ formatter.format(totalViewCount || 0) }}
                        </div>
                      </div>
                    </TransitionFade>
                  </n-flex>

                  <NuxtLink
                    target="_blank"
                    :to="`${config.public.UMAMI_SHARE_URL}?url=${encodeURIComponent(
                      '/datasets/' + dataset?.id,
                    )}`"
                    class="hidden text-sm font-medium text-sky-500 transition-all hover:text-sky-700"
                  >
                    <n-flex size="small" align="center">
                      <Icon name="lets-icons:view-duotone" size="23" />

                      <TransitionFade>
                        <div v-if="totalViewCountSpinner" class="min-w-[36px]">
                          <n-spin :size="12" />
                        </div>

                        <div v-else class="min-w-[36px] text-sm font-medium">
                          <div v-if="currentTab === 'currentVersion'">
                            {{ formatter.format(totalViewCount || 0) }}
                          </div>

                          <div v-else>
                            {{ formatter.format(totalViewCount || 0) }}
                          </div>
                        </div>
                      </TransitionFade>
                    </n-flex>
                  </NuxtLink>

                  <span class="text-sm font-normal">Views</span>
                </n-flex>

                <div>
                  <n-divider vertical />
                </div>

                <n-flex vertical align="center" size="small">
                  <n-flex size="small" align="center">
                    <Icon name="bi:journal-text" size="16" />

                    <TransitionFade>
                      <div v-if="totalCitationsSpinner" class="min-w-[36px]">
                        <n-spin :size="12" />
                      </div>

                      <div v-else class="min-w-[36px] text-sm font-medium">
                        <div v-if="currentTab === 'currentVersion'">
                          {{ dataset?.data?.cited || 0 }}
                        </div>

                        <div v-else>
                          {{ totalCitations || 0 }}
                        </div>
                      </div>
                    </TransitionFade>
                  </n-flex>

                  <span class="text-sm font-normal">Cited by</span>
                </n-flex>

                <div>
                  <n-divider vertical />
                </div>

                <n-flex vertical align="center" size="small">
                  <n-flex size="small" align="center">
                    <Icon name="ri:folder-download-line" size="16" />

                    <TransitionFade>
                      <div v-if="totalDownloadApprovalSpinner">
                        <n-spin :size="12" />
                      </div>

                      <div v-else class="min-w-[12px] text-sm font-medium">
                        <div v-if="currentTab === 'currentVersion'">
                          {{ totalDownloadApprovals }}
                        </div>

                        <div v-else>
                          {{ totalDownloadApprovalforAllVersions }}
                        </div>
                      </div>
                    </TransitionFade>
                  </n-flex>

                  <span class="text-sm font-normal">
                    Access approved
                    <n-popover placement="bottom" trigger="hover">
                      <template #trigger>
                        <span class="ml-1">
                          <Icon
                            name="ic:outline-info"
                            color="#2080f0"
                            size="16"
                          />
                        </span>
                      </template>

                      <span
                        v-if="currentTab === 'currentVersion'"
                        class="text-xs"
                      >
                        Number of access granted to the current version of this
                        dataset
                      </span>

                      <span v-else class="text-xs">
                        Number of access granted to all versions of this dataset
                      </span>
                    </n-popover>
                  </span>
                </n-flex>
              </div>

              <div class="relative mt-4 w-full">
                <n-tabs
                  v-model:value="currentTab"
                  type="segment"
                  @update:value="onTabChange"
                >
                  <n-tab name="allVersions" default> All versions </n-tab>

                  <n-tab name="currentVersion">Current version </n-tab>
                </n-tabs>

                <a
                  class="flex justify-center pt-4 text-xs text-sky-700 hover:underline"
                  target="_blank"
                  href="https://github.com/AI-READI/fairhub-portal/blob/main/dev/usage-statistics.md"
                >
                  More info on how stats are collected....
                </a>
              </div>
            </n-flex>

            <SideDatasetSize
              :size="dataset?.data.size"
              :file-count="dataset?.data.fileCount"
              :child="dataset?.data.child || 0"
            />

            <n-flex
              vertical
              class="rounded-xl border border-blue-200 bg-white px-4 pb-5 pt-3"
            >
              <n-flex vertical>
                <h3>License</h3>

                <NuxtLink
                  :to="
                    dataset?.id == '1' || dataset?.id == '2'
                      ? 'https://doi.org/10.5281/zenodo.10642459'
                      : 'https://doi.org/10.5281/zenodo.17555036'
                  "
                  target="_blank"
                  class="underline transition-all hover:text-slate-600"
                >
                  Health Data License
                </NuxtLink>
              </n-flex>
            </n-flex>

            <n-flex
              vertical
              class="rounded-xl border border-blue-200 bg-white px-4 pb-5 pt-3"
            >
              <n-flex vertical>
                <h3>Keywords</h3>

                <n-flex>
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
                </n-flex>
              </n-flex>
            </n-flex>

            <SideCitationViewer :id="dataset?.id || ''" />

            <SideVersionSelector
              :id="dataset?.id || ''"
              :versions="dataset?.versions || []"
            />
          </n-flex>
        </div>
      </div>
    </div>
  </main>
</template>
