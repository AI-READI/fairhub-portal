<script setup lang="ts">
const props = defineProps({
  metadata: {
    required: true,
    type: Object as PropType<DatasetDescription>,
  },
});

console.log(props.metadata);
</script>

<template>
  <n-space vertical size="large">
    <card-collapsible-card
      id="creators"
      title="Creators"
      data-section-title="Creators"
      class="mb-4 shadow-md"
    >
      <n-space vertical>
        <n-table :bordered="false" :single-line="false">
          <thead>
            <tr>
              <th>Name</th>

              <th>Name Type</th>

              <th>Identifier</th>

              <th>Affiliation Name</th>

              <th>Affiliation Identifier</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="creator in metadata.Creator" :key="creator.id">
              <td>{{ creator.creatorName }}</td>

              <td>{{ creator.nameType }}</td>

              <td>{{ creator.nameIdentifier }}</td>

              <td>{{ creator.affiliation }}</td>

              <td>{{ creator.affiliation }}</td>
            </tr>
          </tbody>
        </n-table>
      </n-space>

      <pre>
        {{ metadata.Creator }}
      </pre>
    </card-collapsible-card>

    <card-collapsible-card
      id="contributors"
      title="Contributors"
      data-section-title="Contributors"
      class="mb-4 shadow-md"
    >
      <pre>
      {{ metadata.Contributor }}
    </pre
      >
    </card-collapsible-card>

    <card-collapsible-card
      id="funders"
      title="Funders"
      data-section-title="Funders"
      class="mb-4 shadow-md"
    >
      <n-table :bordered="false" :single-line="false">
        <thead>
          <tr>
            <th>Funder Name</th>

            <th>Funder Identifier</th>

            <th>Award Number</th>

            <th>Award Title</th>

            <th>Award URI</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="funder in metadata.FundingReference" :key="funder.id">
            <td>{{ funder.funderName }}</td>

            <td>{{ funder.funderIdentifier.funderIdentifierValue }}</td>

            <td>{{ funder.awardNumber.awardNumberValue }}</td>

            <td>{{ funder.awardTitle || "N/A" }}</td>

            <td>{{ funder.awardNumber.awardURI || "N/A" }}</td>
          </tr>
        </tbody>
      </n-table>

      <!-- <pre>
      {{ metadata.FundingReference }}
      </pre -->
    </card-collapsible-card>

    <card-collapsible-card
      id="de-identified-levels"
      title="De-Identified Levels"
      data-section-title="De-Identified Levels"
      class="mb-4 shadow-md"
    >
      <p class="mb-1 w-full border-b font-semibold">Type</p>

      <p>
        {{ metadata.DatasetDeIdentLevel.deIdentType }}
      </p>

      <p class="mb-1 mt-2 w-full border-b font-semibold">Direct Identifiers</p>

      <p>
        {{ metadata.DatasetDeIdentLevel.deIdentDirect }}
      </p>

      <p class="mb-1 mt-2 w-full border-b font-semibold">HIPAA Identifier</p>

      <p>
        {{ metadata.DatasetDeIdentLevel.deIdentHIPAA }}
      </p>

      <p class="mb-1 mt-2 w-full border-b font-semibold">Dates</p>

      <p>
        {{ metadata.DatasetDeIdentLevel.deIdentDates }}
      </p>

      <p class="mb-1 mt-2 w-full border-b font-semibold">Non Arr</p>

      <p>
        {{ metadata.DatasetDeIdentLevel.deIdentNonArr }}
      </p>

      <div v-if="metadata.DatasetDeIdentLevel.deIdentKanon" class="mt-2">
        <p class="mb-1 w-full border-b font-semibold">Kanon</p>

        <p>
          {{ metadata.DatasetDeIdentLevel.deIdentKanon }}
        </p>
      </div>

      <pre>
        {{ metadata.DatasetDeIdentLevel }}
      </pre>
    </card-collapsible-card>

    <card-collapsible-card
      id="consent"
      title="Consent"
      data-section-title="Consent"
      class="mb-4 shadow-md"
    >
      <p class="mb-1 w-full border-b font-semibold">Consent Type</p>

      <p>{{ metadata.DatasetConsent.consentType }}</p>

      <p class="mb-1 mt-2 w-full border-b font-semibold">Non Commercial</p>

      <p>
        {{ metadata.DatasetConsent.consentNoncommercial }}
      </p>

      <p class="mb-1 mt-2 w-full border-b font-semibold">
        Geographic Restriction
      </p>

      <p>
        {{ metadata.DatasetConsent.consentGeogRestrict }}
      </p>

      <p class="mb-1 mt-2 w-full border-b font-semibold">Research Type</p>

      <p>
        {{ metadata.DatasetConsent.consentResearchType }}
      </p>

      <p class="mb-1 mt-2 w-full border-b font-semibold">Genetic Only</p>

      <p>
        {{ metadata.DatasetConsent.consentGeneticOnly }}
      </p>

      <p class="mb-1 mt-2 w-full border-b font-semibold">No Methods</p>

      <p>
        {{ metadata.DatasetConsent.consentNoMethods }}
      </p>

      <pre>
        {{ metadata.DatasetConsent }}
      </pre>
    </card-collapsible-card>
  </n-space>
</template>
