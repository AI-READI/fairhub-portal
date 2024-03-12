<script setup lang="ts">
defineProps({
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
    if (
      ["ROR", "ORCID", "INSI"].includes(identifier?.affiliationIdentifierScheme)
    ) {
      return false;
    }
    return true;
  }
}
</script>

<template>
  <n-space vertical size="large">
    <CardCollapsibleCard
      id="creators"
      title="Creators"
      data-section-title="Creators"
      class="mb-4 shadow-md"
      :collapse="false"
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
            <tr v-for="(creator, index) in metadata.creator" :key="index">
              <div class="flex flex-col">
                <td>
                  <div class="flex flex-row items-center">
                    <span class="mr-2 inline-block align-middle text-base">
                      <b>{{ creator.creatorName }}</b>
                    </span>

                    <ButtonIdentifierBadge
                      v-if="creator?.nameIdentifier"
                      :type="creator.nameIdentifier[0]"
                    />
                  </div>

                  <div
                    v-if="
                      creator?.nameIdentifier &&
                      boolOtherSchemes(creator?.nameIdentifier[0] ?? false)
                    "
                    class="ml-4 pt-2"
                  >
                    <p class="text-[.91rem]">Identifier:</p>

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

                  <div v-if="creator.nameType != 'Organizational'" class="ml-4">
                    <p class="mt-2 text-[.91rem]">Affiliation:</p>

                    <n-ul
                      v-for="(affiliation, innerIndex) in creator.affiliation"
                      :key="innerIndex"
                      class="list-disc text-base"
                    >
                      <n-li>
                        <div class="flex flex-row items-center">
                          <span class="mr-2">
                            {{ affiliation.affiliationName || "N/A" }}
                          </span>

                          <ButtonIdentifierBadge :type="affiliation" />
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
    </CardCollapsibleCard>

    <CardCollapsibleCard
      id="contributors"
      title="Contributors"
      data-section-title="Contributors"
      class="mb-4 shadow-md"
    >
      <n-space vertical>
        <n-table
          v-if="metadata.contributor && metadata.contributor.length > 0"
          :bordered="false"
          :single-line="true"
          :single-column="true"
          class="override-table-striped remove-border"
        >
          <thead></thead>

          <tbody>
            <tr
              v-for="(contributor, index) in metadata.contributor"
              :key="index"
            >
              <td>
                <div class="flex flex-row justify-between">
                  <div class="flex flex-row items-center">
                    <span class="mr-2 inline-block align-middle text-base">
                      <b>{{ contributor.contributorName }}</b>
                    </span>

                    <ButtonIdentifierBadge
                      v-if="contributor?.nameIdentifier"
                      :type="contributor?.nameIdentifier[0]"
                    />
                  </div>

                  <span>
                    <tag-contributor-tag
                      :contributor-type="contributor.contributorType"
                    />
                  </span>
                </div>

                <div
                  v-if="
                    contributor?.nameIdentifier &&
                    boolOtherSchemes(contributor?.nameIdentifier[0])
                  "
                  class="ml-4 mt-3"
                >
                  <span>
                    <p class="text-[.91rem]">Identifier:</p>

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
                </div>

                <div
                  v-if="contributor.nameType != 'Organizational'"
                  class="ml-4"
                >
                  <span>
                    <p class="mt-2 text-[.91rem]">Affiliation:</p>

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
                            {{ affiliation.affiliationName || "N/A" }}
                          </span>

                          <ButtonIdentifierBadge :type="affiliation" />
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
                </div>
              </td>
            </tr>
          </tbody>
        </n-table>

        <n-alert
          v-else
          type="info"
          title="No additional contributors listed."
        />
      </n-space>
    </CardCollapsibleCard>

    <CardCollapsibleCard
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
            <th><strong>Funder Name</strong></th>

            <th><strong>Funder Identifier</strong></th>

            <th><strong>Award Number</strong></th>

            <th><strong>Award Title</strong></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(funder, index) in metadata.fundingReference" :key="index">
            <td>{{ funder.funderName }}</td>

            <td>
              {{ funder.funderIdentifier?.funderIdentifierValue || "N/A" }}
            </td>

            <td>{{ funder.awardNumber?.awardNumberValue || "N/A" }}</td>

            <td>{{ funder.awardTitle || "N/A" }}</td>
          </tr>
        </tbody>
      </n-table>
    </CardCollapsibleCard>

    <MetadataDeIdentifyCard :metadata="metadata" />

    <MetadataConsentCard :metadata="metadata" />
  </n-space>
</template>
