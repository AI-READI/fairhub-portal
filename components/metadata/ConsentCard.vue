<script setup lang="ts">
import datasetMetadata from "@/assets/data/dataset-metadata.json";
const _props = defineProps({
  metadata: {
    required: true,
    type: Object as PropType<DatasetDescription>,
  },
});

function getConsentType(consentType: string) {
  const consentTypeOptions = datasetMetadata.datasetConsentTypeOptions;
  for (const [_key, object] of Object.entries(consentTypeOptions)) {
    if (object.value === consentType) {
      return object.description;
    }
  }
}

const formattedConsentType = getConsentType(
  _props.metadata.DatasetConsent.consentType
);
</script>

<template>
  <card-collapsible-card
    id="consent"
    title="Consent"
    data-section-title="Consent"
    class="mb-4 shadow-md"
  >
    <n-space vertical>
      <p class="mb-1 w-full border-b font-semibold">Consent Type</p>

      <p>{{ formattedConsentType }}</p>

      <p class="mb-1 mt-2 w-full border-b font-semibold">
        Does this dataset allow only the non-commercial use of the data?
      </p>

      <p>
        <switch-boolean-switch
          :active="metadata.DatasetConsent.consentNoncommercial"
        />
      </p>

      <p class="mb-1 mt-2 w-full border-b font-semibold">
        Does this dataset allow only the use of the data in a specific
        geographic location?
      </p>

      <p>
        <switch-boolean-switch
          :active="metadata.DatasetConsent.consentGeogRestrict"
        />
      </p>

      <p class="mb-1 mt-2 w-full border-b font-semibold">
        Does this dataset allow only the use of the data for a specific type of
        research?
      </p>

      <p>
        <switch-boolean-switch
          :active="metadata.DatasetConsent.consentResearchType"
        />
      </p>

      <p class="mb-1 mt-2 w-full border-b font-semibold">
        Does this dataset allow only the use of the data for genetic research?
      </p>

      <p>
        <switch-boolean-switch
          :active="metadata.DatasetConsent.consentGeneticOnly"
        />
      </p>

      <p class="mb-1 mt-2 w-full border-b font-semibold">
        Does this dataset allow only the use of the data for research that does
        not involve the development of methods or algorithms?
      </p>

      <p>
        <switch-boolean-switch
          :active="metadata.DatasetConsent.consentNoMethods"
        />
      </p>
    </n-space>
  </card-collapsible-card>
</template>
