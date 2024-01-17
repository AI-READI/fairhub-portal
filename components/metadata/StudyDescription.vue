<script setup lang="ts">
const props = defineProps({
  metadata: {
    required: true,
    type: Object as PropType<StudyDescription>,
  },
  studyTitle: {
    required: true,
    type: String,
  },
});

console.log(props.metadata);
</script>

<template>
  <n-space vertical size="large">
    <card-collapsible-card
      title="Study Overview"
      class="shadow-md"
      bordered
      collapse
    >
      <div class="grid grid-cols-12 gap-8">
        <n-space vertical class="col-span-9 mr-2">
          <p class="mb-1 w-full border-b font-semibold">Brief Summary</p>

          <p>
            {{ metadata.DescriptionModule.BriefSummary }}
          </p>

          <p class="mb-1 mt-4 w-full border-b font-semibold">
            Detailed Description
          </p>

          <p>
            {{ metadata.DescriptionModule.DetailedDescription }}
          </p>

          <p class="mb-1 mt-4 w-full border-b font-semibold">Official Title</p>

          <p>
            {{ studyTitle }}
          </p>

          <p class="mb-2 mt-4 w-full border-b font-semibold">Conditions</p>

          <n-space>
            <n-tag
              v-for="condition in metadata.ConditionsModule.ConditionList"
              :key="condition"
              type="info"
              :bordered="false"
            >
              {{ condition }}
            </n-tag>
          </n-space>
        </n-space>

        <n-space vertical class="col-span-3 ml-2">
          <p class="mb-1 w-full border-b font-semibold">
            Study Start ({{
              metadata.StatusModule.StartDateStruct.StartDateType
            }})
          </p>

          <p>{{ metadata.StatusModule.StartDateStruct.StartDate }}</p>
        </n-space>
      </div>
    </card-collapsible-card>

    <!-- <n-card title="Contact and Locations" class="shadow-md">
      <n-space vertical>
        <p class="mb-1 w-full border-b font-medium">Brief Summary</p>

        <pre>
        {{ metadata.ContactsLocationsModule }}
       </pre
        >
      </n-space>
    </n-card> -->

    <card-collapsible-card title="Design" class="shadow-md" bordered collapse>
      <n-space vertical>
        <p class="mb-1 w-full border-b font-semibold">Study Type</p>

        <p>
          {{ metadata.DesignModule.StudyType }}
        </p>

        <div
          v-if="metadata.DesignModule.StudyType === 'Interventional'"
          class="mt-2"
        ></div>

        <div
          v-if="metadata.DesignModule.StudyType === 'Observational'"
          class="mt-2"
        >
          <!-- <p class="mb-1 w-full border-b font-semibold">Observational Model</p> -->

          <div v-if="metadata.DesignModule.DesignInfo.DesignAllocation">
            <p class="mb-1 w-full border-b font-semibold">Design Allocation</p>

            <p>
              {{ metadata.DesignModule.DesignInfo.DesignAllocation }}
            </p>
          </div>

          <div v-if="metadata.DesignModule.DesignInfo.DesignObservationModel">
            <p class="mb-1 w-full border-b font-semibold">
              Design Obsevation Model
            </p>

            <p>
              {{ metadata.DesignModule.DesignInfo.DesignObservationModel }}
            </p>
          </div>

          <div
            v-if="metadata.DesignModule.DesignInfo.DesignObservationalModelList"
          >
            <p class="mb-2 w-full border-b font-semibold">
              Design Observation Model
            </p>

            <n-ul
              v-for="model in metadata.DesignModule.DesignInfo
                .DesignObservationalModelList"
              :key="model"
              class="list-disc text-base"
            >
              <n-li>
                {{ model }}
              </n-li>
            </n-ul>
          </div>
        </div>

        <pre>
        {{ metadata.DesignModule }}
        </pre>
      </n-space>
    </card-collapsible-card>

    <card-collapsible-card
      title="Eligibility"
      class="shadow-md"
      bordered
      collapse
    >
      <n-space vertical>
        <p class="mb-1 w-full border-b font-semibold">Eligibility Criteria</p>

        <p class="">
          {{ metadata.EligibilityModule.EligibilityCriteria }}
        </p>

        <p class="mb-1 mt-2 w-full border-b font-semibold">Gender</p>

        <p class="">
          {{ metadata.EligibilityModule.Gender }}
        </p>

        <p class="mb-1 mt-2 w-full border-b font-semibold">Gender Based</p>

        <p>
          {{ metadata.EligibilityModule.GenderBased }}
        </p>

        <div v-if="metadata.EligibilityModule.GenderDescription" class="mt-2">
          <p class="mb-3 w-full border-b font-semibold">Gender Description</p>

          <p>
            {{ metadata.EligibilityModule.GenderDescription }}
          </p>
        </div>

        <p class="mb-1 mt-2 w-full border-b font-semibold">Minimum Age</p>

        <p>
          {{ metadata.EligibilityModule.MinimumAge }}
        </p>

        <p class="mb-1 mt-2 w-full border-b font-semibold">Maximum Age</p>

        <p>
          {{ metadata.EligibilityModule.MaximumAge }}
        </p>

        <div v-if="metadata.EligibilityModule.HealthyVolunteers" class="mt-2">
          <p class="mb-2 w-full border-b font-semibold">Healthy Volunteers</p>

          <p>
            {{ metadata.EligibilityModule.HealthyVolunteers }}
          </p>
        </div>

        <div v-if="metadata.EligibilityModule.StudyPopulation" class="mt-2">
          <p class="mb-3 w-full border-b font-semibold">Study Population</p>

          <p>
            {{ metadata.EligibilityModule.StudyPopulation }}
          </p>
        </div>

        <div v-if="metadata.EligibilityModule.SamplingMethod" class="mt-2">
          <p class="mb-3 w-full border-b font-semibold">Sampling Method</p>

          <p>
            {{ metadata.EligibilityModule.SamplingMethod }}
          </p>
        </div>
      </n-space>
    </card-collapsible-card>

    <card-collapsible-card
      title="Identification Information"
      class="shadow-md"
      bordered
      collapse
    >
      <n-space vertical>
        <p class="mb-1 w-full border-b font-semibold">Organization Study ID</p>

        <p>
          {{ metadata.IdentificationModule.OrgStudyIdInfo.OrgStudyId }}
        </p>

        <p class="mb-1 mt-2 w-full border-b font-semibold">
          Organization Study Type
        </p>

        <p>
          {{ metadata.IdentificationModule.OrgStudyIdInfo.OrgStudyIdType }}
        </p>

        <div
          v-if="metadata.IdentificationModule.SecondaryIdInfoList"
          class="mb-1 mt-2 w-full"
        >
          <p class="mb-1 w-full border-b font-semibold">Secondary ID</p>

          <n-table :bordered="false" :single-line="false">
            <thead>
              <tr>
                <th>ID</th>

                <th>Type</th>

                <th>Link</th>

                <th>Domain</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="secondaryId in metadata.IdentificationModule
                  .SecondaryIdInfoList"
                :key="secondaryId"
              >
                <td>{{ secondaryId.SecondaryId }}</td>

                <td>{{ secondaryId.SecondaryIdType }}</td>

                <td>{{ secondaryId.SecondaryIdLink || "N/A" }}</td>

                <td>{{ secondaryId.SecondaryIdDomain || "N/A" }}</td>
              </tr>
            </tbody>
          </n-table>
        </div>
      </n-space>
    </card-collapsible-card>

    <card-collapsible-card
      title="IPD Sharing"
      class="shadow-md"
      bordered
      collapse
    >
      <n-space vertical>
        <p>
          {{ metadata.IPDSharingStatementModule.IPDSharing }}
        </p>

        <p v-if="metadata.IPDSharingStatementModule.IPDSharing === 'Yes'">
          {{ metadata.IPDSharingStatementModule.IPDSharingDescription }}
        </p>
      </n-space>
    </card-collapsible-card>

    <card-collapsible-card
      title="Oversight"
      class="shadow-md"
      bordered
      collapse
    >
      <n-space vertical>
        <p class="mb-1 w-full border-b font-semibold">Oversight Has DMC?</p>

        <p>
          {{ metadata.OversightModule.OversightHasDMC }}
        </p>
      </n-space>
    </card-collapsible-card>

    <card-collapsible-card
      title="References"
      class="shadow-md"
      bordered
      collapse
    >
      <n-space vertical>
        <div v-if="metadata.ReferencesModule.ReferenceList">
          <p class="mb-1 w-full border-b font-semibold">References</p>

          <n-table :bordered="false" :single-line="false">
            <thead>
              <tr>
                <th>Reference Citation</th>

                <th>Reference Type</th>

                <th>Reference ID</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="reference in metadata.ReferencesModule.ReferenceList"
                :key="reference"
              >
                <td>{{ reference.ReferenceCitation }}</td>

                <td>{{ reference.ReferenceType || "N/A" }}</td>

                <td>{{ reference.ReferenceID || "N/A" }}</td>
              </tr>
            </tbody>
          </n-table>
        </div>

        <div v-if="metadata.ReferencesModule.SeeAlsoLinkList" class="mt-2">
          <p class="mb-1 w-full border-b font-semibold">See Also</p>

          <n-table :bordered="false" :single-line="false">
            <thead>
              <tr>
                <th>URL</th>

                <th>Label</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="seeAlso in metadata.ReferencesModule.SeeAlsoLinkList"
                :key="seeAlso"
              >
                <td>
                  <n-a href="seeAlso.SeeAlsoLinkURL" target="_blank">{{
                    seeAlso.SeeAlsoLinkURL
                  }}</n-a>
                </td>

                <td>{{ seeAlso.SeeAlsoLinkLabel || "N/A" }}</td>
              </tr>
            </tbody>
          </n-table>
        </div>

        <div v-if="metadata.ReferencesModule.AvailIPDList" class="mt-2">
          <p class="mb-1 w-full border-b font-semibold">Available IPDs</p>

          <n-table :bordered="false" :single-line="false">
            <thead>
              <tr>
                <th>ID</th>

                <th>Type</th>

                <th>URL</th>

                <th>Comments</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="availIPD in metadata.ReferencesModule.AvailIPDList"
                :key="availIPD"
              >
                <td>{{ availIPD.AvailIPDId }}</td>

                <td>{{ availIPD.AvailIPDType }}</td>

                <td>
                  <n-a href="availIPD.AvailIPDURL" target="_blank">
                    {{ availIPD.AvailIPDURL }}
                  </n-a>
                </td>

                <td>{{ availIPD.AvailIPDComment || "N/A" }}</td>
              </tr>
            </tbody>
          </n-table>
        </div>
      </n-space>
    </card-collapsible-card>

    <card-collapsible-card
      title="Sponsors and Collaborators"
      class="shadow-md"
      bordered
      collapse
    >
      <n-space vertical>
        <p class="mb-1 w-full border-b font-semibold">Sponsor</p>

        <p>
          {{ metadata.SponsorCollaboratorsModule.LeadSponsor.LeadSponsorName }}
        </p>

        <div class="mt-2">
          <p class="mb-1 w-full border-b font-semibold">Collaborators</p>

          <n-space vertical>
            <n-ul
              v-for="collaborator in metadata.SponsorCollaboratorsModule
                .CollaboratorList"
              :key="collaborator"
              class="font-base list-disc"
            >
              <n-li>{{ collaborator.CollaboratorName }}</n-li>
            </n-ul>
          </n-space>
        </div>

        <p class="mb-1 mt-2 w-full border-b font-semibold">Responsible Party</p>

        <n-table :bordered="false" :single-line="false">
          <thead>
            <tr>
              <th>Title</th>

              <th>Name</th>

              <th>Affiliation</th>

              <th>Party Type</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                {{
                  metadata.SponsorCollaboratorsModule.ResponsibleParty
                    .ResponsiblePartyInvestigatorTitle || "N/A"
                }}
              </td>

              <td>
                {{
                  metadata.SponsorCollaboratorsModule.ResponsibleParty
                    .ResponsiblePartyInvestigatorFullName || "N/A"
                }}
              </td>

              <td>
                {{
                  metadata.SponsorCollaboratorsModule.ResponsibleParty
                    .ResponsiblePartyType
                }}
              </td>

              <td>
                {{
                  metadata.SponsorCollaboratorsModule.ResponsibleParty
                    .ResponsiblePartyInvestigatorAffiliation || "N/A"
                }}
              </td>
            </tr>
          </tbody>
        </n-table>
      </n-space>
    </card-collapsible-card>

    <card-collapsible-card
      id="status-information"
      title="Status Information"
      class="shadow-md"
      data-section-title="Status Information"
      bordered
      collapse
    >
      <n-space vertical>
        <p class="mb-1 w-full border-b font-semibold">Overall Status</p>

        <p class="mb-1">
          {{ metadata.StatusModule.OverallStatus }}
        </p>

        <p class="mb-1 mt-2 w-full border-b font-semibold">
          {{ metadata.StatusModule.StartDateStruct.StartDateType }} Start Date
        </p>

        <p class="mb-1">
          {{ metadata.StatusModule.StartDateStruct.StartDate }}
        </p>

        <!-- create two p tags if completiondatestruct exists -->
        <div v-if="metadata.StatusModule.CompletionDateStruct" class="mt-2">
          <p class="mb-1 w-full border-b font-semibold">
            {{ metadata.StatusModule.CompletionDateStruct.CompletionDateType }}
            Completion Date
          </p>

          <p>
            {{ metadata.StatusModule.CompletionDateStruct.CompletionDate }}
          </p>
        </div>

        <div v-if="metadata.StatusModule.WhyStopped" class="mt-2">
          <p class="mb-1 w-full border-b font-semibold">Why Stopped</p>

          <p>
            {{ metadata.StatusModule.WhyStopped }}
          </p>
        </div>
      </n-space>
    </card-collapsible-card>
  </n-space>
</template>
