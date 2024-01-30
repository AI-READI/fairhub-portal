<script setup lang="ts">
const _props = defineProps({
  metadata: {
    required: true,
    type: Object as PropType<DatasetDescription>,
  },
});

interface Identifier {
  affiliationIdentifier?: string;
  affiliationIdentifierScheme?: string;
  affiliationValue?: string;
  nameIdentifierScheme?: string;
  nameIdentifierValue?: string;
  schemeURI?: string;
}

function boolOtherSchemes(identifier: Identifier) {
  // Return true if there are other identifier schemes other than ROR, ORCID, and GRID, false otherwise
  if (identifier?.nameIdentifierScheme) {
    if (["ROR", "ORCID", "INSI"].includes(identifier?.nameIdentifierScheme)) {
      return false;
    }
    return true;
  }
  if (identifier?.affiliationIdentifierScheme) {
    console.log(identifier?.affiliationIdentifierScheme);
    if (
      ["ROR", "ORCID", "INSI"].includes(identifier?.affiliationIdentifierScheme)
    ) {
      console.log("returning true");
      return false;
    }
    console.log("returning false");
    return true;
  }
}
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
        <n-table
          :bordered="false"
          :single-line="true"
          :single-column="false"
          class="override-table-striped remove-border"
        >
          <thead>
            <tr></tr>
          </thead>

          <tbody>
            <tr v-for="(creator, index) in metadata.Creator" :key="index">
              <div class="flex flex-col">
                <td>
                  <div class="flex flex-row items-center">
                    <span class="mr-2 inline-block align-middle text-base">
                      <b>{{ creator.creatorName }}</b>
                    </span>

                    <button-badge-button
                      v-if="creator?.nameIdentifier"
                      :type="creator.nameIdentifier[0]"
                    />
                  </div>

                  <div
                    v-if="boolOtherSchemes(creator?.nameIdentifier[0] ?? false)"
                    class="pt-2"
                  >
                    <n-ul
                      v-for="(identifier, innerIndex) in creator.nameIdentifier"
                      :key="innerIndex"
                      class="mb-2 list-disc text-base"
                    >
                      <n-li>
                        {{ identifier.nameIdentifierScheme || "N/A" }}:
                        {{ identifier.nameIdentifierValue }}
                      </n-li>
                    </n-ul>
                  </div>

                  <div v-if="creator.nameType != 'Organizational'" class="">
                    <p class="mt-2 text-base">Affiliation:</p>

                    <n-ul
                      v-for="(affiliation, innerIndex) in creator.affiliation"
                      :key="innerIndex"
                      class="list-disc text-base"
                    >
                      <n-li>
                        <div class="flex flex-row items-center">
                          <span class="mr-2 mt-2">
                            {{ affiliation.affiliationValue || "N/A" }}
                          </span>

                          <button-badge-button :type="affiliation" />
                        </div>

                        <n-ul class="disc-hollow">
                          <n-li
                            v-if="boolOtherSchemes(affiliation)"
                            class="!mt-2 text-base"
                          >
                            {{ affiliation.affiliationIdentifierScheme }}:
                            {{ affiliation.affiliationIdentifier || "N/A" }}
                          </n-li>
                        </n-ul>
                      </n-li>
                    </n-ul>
                  </div>
                </td>
              </div>
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
        <n-table
          :bordered="false"
          :single-line="true"
          :single-column="true"
          class="override-table-striped remove-border"
        >
          <thead></thead>

          <tbody>
            <tr
              v-for="(contributor, index) in metadata.Contributor"
              :key="index"
            >
              <div class="flex flex-col">
                <td>
                  <div class="flex flex-row justify-between">
                    <div class="flex flex-row items-center">
                      <span class="mr-2 inline-block align-middle text-base">
                        <b>{{ contributor.contributorName }}</b>
                      </span>

                      <button-badge-button
                        v-if="contributor?.nameIdentifier"
                        :type="contributor?.nameIdentifier[0]"
                      />
                    </div>

                    <span>
                      <n-tag :bordered="false" type="info">
                        {{ contributor.contributorType }}
                      </n-tag>
                    </span>
                  </div>

                  <span
                    v-if="boolOtherSchemes(contributor?.nameIdentifier[0])"
                    class="mt-3"
                  >
                    <n-ul
                      v-for="(
                        indentifier, innerIndex
                      ) in contributor.nameIdentifier"
                      :key="innerIndex"
                      class="mb-2 list-disc"
                    >
                      <n-li>
                        {{ indentifier.nameIdentifierScheme || "N/A" }}:
                        {{ indentifier.nameIdentifierValue }}
                      </n-li>
                    </n-ul>
                  </span>

                  <span
                    v-if="contributor.nameType != 'Organizational'"
                    class="mt-3"
                  >
                    <p class="mt-2">Affiliation:</p>

                    <n-ul
                      v-for="(
                        affiliation, innerIndex
                      ) in contributor.affiliation"
                      :key="innerIndex"
                      class="mb-2 list-disc text-base"
                    >
                      <n-li>
                        <div class="flex flex-row items-center">
                          <span class="mr-2 align-middle">
                            {{ affiliation.affiliationValue || "N/A" }}
                          </span>

                          <button-badge-button :type="affiliation" />
                        </div>

                        <n-ul class="disc-hollow">
                          <n-li
                            v-if="boolOtherSchemes(affiliation)"
                            class="!mt-2 text-base"
                          >
                            {{ affiliation.affiliationIdentifierScheme }}:
                            {{ affiliation.affiliationIdentifier || "N/A" }}
                          </n-li>
                        </n-ul>
                      </n-li>
                    </n-ul>
                  </span>
                </td>
              </div>
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
      <n-table
        :bordered="false"
        :single-line="true"
        :single-column="true"
        class="remove-border"
        striped
      >
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
      <n-space vertical>
        <p class="mb-1 w-full border-b font-semibold">
          Indication of the level of deidentification of the dataset
        </p>

        <p>
          {{ metadata.DatasetDeIdentLevel.deIdentType }}
        </p>

        <p class="mb-1 mt-2 w-full border-b font-semibold">
          If direct Identifiers were removed from the data set
        </p>

        <p>
          <switch-boolean-switch
            :active="metadata.DatasetDeIdentLevel.deIdentDirect"
          />
        </p>

        <p class="mb-1 mt-2 w-full border-b font-semibold">
          If the US HIPAA de-identification rules have been applied
        </p>

        <p>
          <switch-boolean-switch
            :active="metadata.DatasetDeIdentLevel.deIdentHIPAA"
          />
        </p>

        <p class="mb-1 mt-2 w-full border-b font-semibold">
          If dates have been rebased and/or replaced by integers
        </p>

        <p>
          <switch-boolean-switch
            :active="metadata.DatasetDeIdentLevel.deIdentDates"
          />
        </p>

        <p class="mb-1 mt-2 w-full border-b font-semibold">
          If narrative text fields have been removed
        </p>

        <p>
          <switch-boolean-switch
            :active="metadata.DatasetDeIdentLevel.deIdentNonarr"
          />
        </p>

        <p class="mb-1 mt-2 w-full border-b font-semibold">
          If k-anonymisation (k>=2) has been achieved
        </p>

        <p>
          <switch-boolean-switch
            :active="metadata.DatasetDeIdentLevel.deIdentKAnon"
          />
        </p>
      </n-space>
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
      <n-space vertical>
        <p class="mb-1 w-full border-b font-semibold">Consent Type</p>

        <p>{{ metadata.DatasetConsent.consentType }}</p>

        <p class="mb-1 mt-2 w-full border-b font-semibold">
          If the consent allows only non-commercial use of the data
        </p>

        <p>
          <switch-boolean-switch
            :active="metadata.DatasetConsent.consentNoncommercial"
          />
        </p>

        <p class="mb-1 mt-2 w-full border-b font-semibold">
          If the consent allows only use of the data in a specific geographic
          location
        </p>

        <p>
          <switch-boolean-switch
            :active="metadata.DatasetConsent.consentGeogRestrict"
          />
        </p>

        <p class="mb-1 mt-2 w-full border-b font-semibold">
          If the consent allows only use of the data for a specific type of
          research
        </p>

        <p>
          <switch-boolean-switch
            :active="metadata.DatasetConsent.consentResearchType"
          />
        </p>

        <p class="mb-1 mt-2 w-full border-b font-semibold">
          If the consent allows only use of the data for genetic research
        </p>

        <p>
          <switch-boolean-switch
            :active="metadata.DatasetConsent.consentGeneticOnly"
          />
        </p>

        <p class="mb-1 mt-2 w-full border-b font-semibold">
          If the consent allows only use of the data for research that does not
          involve the development of methods or algorithms
        </p>

        <p>
          <switch-boolean-switch
            :active="metadata.DatasetConsent.consentNoMethods"
          />
        </p>
      </n-space>
      <!-- <pre>
        {{ metadata.DatasetConsent }}
      </pre> -->
    </card-collapsible-card>
  </n-space>
</template>
