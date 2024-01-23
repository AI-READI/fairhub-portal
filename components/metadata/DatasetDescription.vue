<script setup lang="ts">
const _props = defineProps({
  metadata: {
    required: true,
    type: Object as PropType<DatasetDescription>,
  },
});
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

              <th>Identifier Scheme</th>

              <th>Identifier Value</th>

              <th>Affiliation Name</th>

              <th>Affiliation Identifier</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(creator, index) in metadata.Creator" :key="index">
              <td>{{ creator.creatorName }}</td>

              <td>{{ creator.nameType }}</td>

              <td
                v-for="(indentifier, innerIndex) in creator.nameIdentifier"
                :key="innerIndex"
              >
                {{ indentifier.nameIdentifierScheme || "N/A" }}
              </td>

              <td
                v-for="(indentifier, innerIndex) in creator.nameIdentifier"
                :key="innerIndex"
              >
                {{ indentifier.nameIdentifierValue || "N/A" }}
              </td>

              <td
                v-for="(affiliation, innerIndex) in creator.affiliation"
                :key="innerIndex"
              >
                {{ affiliation.affiliationValue || "N/A" }}
              </td>

              <td
                v-for="(identifier, innerIndex) in creator.affiliation"
                :key="innerIndex"
              >
                {{ identifier.affiliationIdentifier || "N/A" }}
              </td>
            </tr>
          </tbody>
        </n-table>
      </n-space>
      <!-- <pre>
        {{ metadata.Creator }}
      </pre> -->
    </card-collapsible-card>

    <card-collapsible-card
      id="contributors"
      title="Contributors"
      data-section-title="Contributors"
      class="mb-4 shadow-md"
    >
      <n-space vertical>
        <n-table :bordered="false" :single-line="false">
          <thead>
            <tr>
              <th>Name</th>

              <th>Name Type</th>

              <th>Contributor Type</th>

              <th>Identifier Scheme</th>

              <th>Identifier Value</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(contributor, index) in metadata.Contributor"
              :key="index"
            >
              <td>{{ contributor.contributorName }}</td>

              <td>{{ contributor.nameType }}</td>

              <td>{{ contributor.contributorType }}</td>

              <td
                v-for="(indentifier, innerIndex) in contributor.nameIdentifier"
                :key="innerIndex"
              >
                {{ indentifier.nameIdentifierScheme || "N/A" }}
              </td>

              <td
                v-for="(indentifier, innerIndex) in contributor.nameIdentifier"
                :key="innerIndex"
              >
                {{ indentifier.nameIdentifierValue || "N/A" }}
              </td>
            </tr>
          </tbody>
        </n-table>
      </n-space>
      <!-- <pre>
      {{ metadata.Contributor }}
    </pre
      > -->
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
          <tr v-for="(funder, index) in metadata.FundingReference" :key="index">
            <td>{{ funder.funderName }}</td>

            <td>
              {{ funder.funderIdentifier?.funderIdentifierValue || "N/A" }}
            </td>

            <td>{{ funder.awardNumber?.awardNumberValue || "N/A" }}</td>

            <td>{{ funder.awardTitle || "N/A" }}</td>

            <td>{{ funder.awardNumber?.awardURI || "N/A" }}</td>
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
        <switch-boolean-switch
          :active="metadata.DatasetDeIdentLevel.deIdentDirect"
        />
      </p>

      <p class="mb-1 mt-2 w-full border-b font-semibold">HIPAA Identifier</p>

      <p>
        <switch-boolean-switch
          :active="metadata.DatasetDeIdentLevel.deIdentHIPAA"
        />
      </p>

      <p class="mb-1 mt-2 w-full border-b font-semibold">Dates</p>

      <p>
        <switch-boolean-switch
          :active="metadata.DatasetDeIdentLevel.deIdentDates"
        />
      </p>

      <p class="mb-1 mt-2 w-full border-b font-semibold">Non Arr</p>

      <p>
        <switch-boolean-switch
          :active="metadata.DatasetDeIdentLevel.deIdentNonarr"
        />
      </p>

      <p class="mb-1 mt-2 w-full border-b font-semibold">Kanon</p>

      <p>
        <switch-boolean-switch
          :active="metadata.DatasetDeIdentLevel.deIdentKAnon"
        />
      </p>
      <!-- <pre>
        {{ metadata.DatasetDeIdentLevel }}
      </pre> -->
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
        <switch-boolean-switch
          :active="metadata.DatasetConsent.consentNoncommercial"
        />
      </p>

      <p class="mb-1 mt-2 w-full border-b font-semibold">
        Geographic Restriction
      </p>

      <p>
        <switch-boolean-switch
          :active="metadata.DatasetConsent.consentGeogRestrict"
        />
      </p>

      <p class="mb-1 mt-2 w-full border-b font-semibold">Research Type</p>

      <p>
        <switch-boolean-switch
          :active="metadata.DatasetConsent.consentResearchType"
        />
      </p>

      <p class="mb-1 mt-2 w-full border-b font-semibold">Genetic Only</p>

      <p>
        <switch-boolean-switch
          :active="metadata.DatasetConsent.consentGeneticOnly"
        />
      </p>

      <p class="mb-1 mt-2 w-full border-b font-semibold">No Methods</p>

      <p>
        {{ console.log(metadata.DatasetConsent.consentNoMethods) }}
        <switch-boolean-switch
          :active="metadata.DatasetConsent.consentNoMethods"
        />
      </p>
      <!-- <pre>
        {{ metadata.DatasetConsent }}
      </pre> -->
    </card-collapsible-card>
  </n-space>
</template>
