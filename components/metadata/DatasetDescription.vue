<script setup lang="ts">
const _props = defineProps({
  metadata: {
    required: true,
    type: Object as PropType<DatasetDescription>,
  },
});

function boolOtherSchemes() {
  // Return true if there are other identifier schemes other than ROR, ORCID, and GRID, false otherwise
  if (_props.metadata.Creator) {
    for (const creator of _props.metadata.Creator) {
      if (creator.nameIdentifier) {
        for (const identifier of creator.nameIdentifier) {
          if (
            identifier.nameIdentifierScheme !== "ROR" &&
            identifier.nameIdentifierScheme !== "ORCID" &&
            identifier.nameIdentifierScheme !== "GRID"
          ) {
            return true;
          }
        }
      }
    }
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
          class="override-table-striped"
        >
          <thead>
            <tr></tr>
          </thead>

          <tbody>
            <tr v-for="(creator, index) in metadata.Creator" :key="index">
              <div class="flex flex-col">
                <td>
                  <n-space class="w-full" vertical>
                    <div class="flex flex-row items-center">
                      <span class="mr-2 inline-block align-middle">
                        Name:
                        <b>{{ creator.creatorName }}</b>
                      </span>

                      <button-badge-button :type="creator.nameIdentifier" />
                    </div>

                    <span v-if="boolOtherSchemes()" class="mt-3">
                      Identifier(s):
                      <n-ul
                        v-for="(
                          identifier, innerIndex
                        ) in creator.nameIdentifier"
                        :key="innerIndex"
                        class="list-disc"
                      >
                        <n-li>
                          Identifier Scheme:
                          {{ identifier.nameIdentifierScheme || "N/A" }}
                          Identifier Value: {{ identifier.nameIdentifierValue }}
                        </n-li>
                      </n-ul>
                    </span>

                    <span
                      v-if="creator.nameType != 'Organizational'"
                      class="mt-3"
                    >
                      Affiliation:
                      <n-ul
                        v-for="(affiliation, innerIndex) in creator.affiliation"
                        :key="innerIndex"
                        class="list-disc"
                      >
                        <n-li>
                          <div class="flex flex-row items-center">
                            <span class="mr-2">
                              {{ affiliation.affiliationValue || "N/A" }}
                            </span>

                            <button-badge-button :type="creator.affiliation" />

                            <n-li v-if="boolOtherSchemes()">
                              {{ affiliation.affiliationIdentifier || "N/A" }}
                            </n-li>
                          </div>
                        </n-li>
                      </n-ul>
                    </span>
                  </n-space>
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
          class="override-table-striped"
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
                      <span class="mr-2 inline-block align-middle">
                        Name:
                        <b>{{ contributor.contributorName }}</b>
                      </span>

                      <button-badge-button :type="contributor.nameIdentifier" />
                    </div>

                    <span>
                      <n-tag :bordered="false" type="info">
                        {{ contributor.contributorType }}
                      </n-tag>
                    </span>
                  </div>
                </td>

                <td v-if="boolOtherSchemes()">
                  Identifier(s):
                  <n-ul
                    v-for="(
                      indentifier, innerIndex
                    ) in contributor.nameIdentifier"
                    :key="innerIndex"
                    class="list-disc"
                  >
                    <n-li>
                      {{ indentifier.nameIdentifierScheme || "N/A" }}:
                      {{ indentifier.nameIdentifierValue }}
                    </n-li>
                  </n-ul>
                </td>

                <td v-if="contributor.nameType != 'Organizational'">
                  Affiliation:
                  <n-ul
                    v-for="(affiliation, innerIndex) in contributor.affiliation"
                    :key="innerIndex"
                    class="list-disc"
                  >
                    <n-li>
                      <div class="flex flex-row items-center">
                        <span class="mr-2 align-middle">
                          {{ affiliation.affiliationValue || "N/A" }}
                        </span>

                        <button-badge-button :type="contributor.affiliation" />

                        <n-li v-if="boolOtherSchemes()">
                          {{ affiliation.affiliationIdentifier || "N/A" }}
                        </n-li>
                      </div>
                    </n-li>
                  </n-ul>
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
      id="creators"
      title="Creators"
      data-section-title="Creators"
      class="mb-4 shadow-md"
    >
      <n-space vertical>
        <n-table
          :bordered="false"
          :single-line="true"
          :single-column="true"
          striped
        >
          <thead>
            <tr></tr>
          </thead>

          <tbody>
            <tr
              v-for="(funder, index) in metadata.FundingReference"
              :key="index"
            >
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
      </n-space>
    </card-collapsible-card>

    <card-collapsible-card
      id="de-identified-levels"
      title="De-Identified Levels"
      data-section-title="De-Identified Levels"
      class="mb-4 shadow-md"
    >
      <n-space vertical>
        <p class="mb-1 w-full border-b font-semibold">Type</p>

        <p>
          {{ metadata.DatasetDeIdentLevel.deIdentType }}
        </p>

        <p class="mb-1 mt-2 w-full border-b font-semibold">
          Direct Identifiers
        </p>

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
