<script setup lang="ts">
const props = defineProps({
  metadata: {
    required: true,
    type: Object as PropType<StudyDescription>,
  },
  study: {
    required: true,
    type: Object as PropType<Study>,
  },
});

console.log(props.metadata);
</script>

<template>
  <n-space vertical size="large">
    <n-card title="Study Overview" class="shadow-md">
      <div class="grid grid-cols-12 gap-8">
        <n-space vertical class="col-span-9 mr-2">
          <p class="mb-1 w-full border-b font-medium">Brief Summary</p>

          <p>
            {{ metadata.DescriptionModule.BriefSummary }}
          </p>

          <p class="mb-1 mt-4 w-full border-b font-medium">
            Detailed Description
          </p>

          <p>
            {{ metadata.DescriptionModule.DetailedDescription }}
          </p>

          <p class="mb-1 mt-4 w-full border-b font-medium">Official Title</p>

          <p>
            {{ study.title }}
          </p>

          <p class="mb-2 mt-4 w-full border-b font-medium">Conditions</p>

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
          <p class="mb-1 w-full border-b font-medium">Study Start (Actual)</p>

          <p>2023-07-19</p>
        </n-space>
      </div>
    </n-card>

    <!-- <n-card title="Contact and Locations" class="shadow-md">
      <n-space vertical>
        <p class="mb-1 w-full border-b font-medium">Brief Summary</p>

        <pre>
        {{ metadata.ContactsLocationsModule }}
       </pre
        >
      </n-space>
    </n-card> -->

    <n-card title="Design" class="shadow-md">
      <n-space vertical>
        <p class="mb-1 w-full border-b font-medium">Design Information</p>

        <pre>
        {{ metadata.DesignModule }}
        </pre>
      </n-space>
    </n-card>

    <n-card title="Eligibility" class="shadow-md">
      <n-space vertical>
        <p class="mb-1 w-full border-b font-medium">Eligibility Criteria</p>

        <p>
          {{ metadata.EligibilityModule.EligibilityCriteria }}
        </p>

        <p class="mb-1 w-full border-b font-medium">Gender</p>

        <p>
          {{ metadata.EligibilityModule.Gender }}
        </p>

        <p class="mb-1 w-full border-b font-medium">Gender Based</p>

        <p>
          {{ metadata.EligibilityModule.GenderBased }}
        </p>

        <div v-if="metadata.EligibilityModule.GenderDescription">
          <p class="mb-1 w-full border-b font-medium">Gender Description</p>

          <p>
            {{ metadata.EligibilityModule.GenderDescription }}
          </p>
        </div>

        <p class="mb-1 w-full border-b font-medium">Minimum Age</p>

        <p>
          {{ metadata.EligibilityModule.MinimumAge }}
        </p>

        <p class="mb-1 w-full border-b font-medium">Maximum Age</p>

        <p>
          {{ metadata.EligibilityModule.MaximumAge }}
        </p>

        <div v-if="metadata.EligibilityModule.HealthyVolunteers">
          <p class="mb-1 w-full border-b font-medium">Healthy Volunteers</p>

          <p>
            {{ metadata.EligibilityModule.HealthyVolunteers }}
          </p>
        </div>

        <p class="mb-1 w-full border-b font-medium">Eligibility Criteria</p>

        <p>
          {{ metadata.EligibilityModule.EligibilityCriteria }}
        </p>

        <div v-if="metadata.EligibilityModule.StudyPopulation">
          <p class="mb-1 w-full border-b font-medium">Study Population</p>

          <p>
            {{ metadata.EligibilityModule.StudyPopulation }}
          </p>
        </div>

        <div v-if="metadata.EligibilityModule.SamplingMethod">
          <p class="mb-1 w-full border-b font-medium">Sampling Method</p>

          <p>
            {{ metadata.EligibilityModule.SamplingMethod }}
          </p>
        </div>

        <!-- <pre>
        {{ metadata.EligibilityModule }}
        </pre> -->
      </n-space>
    </n-card>

    <n-card title="Identification Information" class="shadow-md">
      <n-space vertical>
        <p class="mb-1 w-full border-b font-medium">Organization Study ID</p>

        <p>
          {{ metadata.IdentificationModule.OrgStudyIdInfo.OrgStudyId }}
        </p>

        <p class="mb-1 w-full border-b font-medium">Organization Study Type</p>

        <p>
          {{ metadata.IdentificationModule.OrgStudyIdInfo.OrgStudyIdType }}
        </p>

        <div
          v-if="metadata.IdentificationModule.SecondaryIdInfoList"
          class="mb-1 w-full"
        >
          <p class="mb-1 w-full border-b font-medium">Secondary ID</p>

          <n-space vertical>
            <div
              v-for="secondaryId in metadata.IdentificationModule
                .SecondaryIdInfoList"
              :key="secondaryId"
            >
              <p v-if="secondaryId.SecondaryId">
                ID: {{ secondaryId.SecondaryId }}
              </p>

              <p v-if="secondaryId.SecondaryIdType">
                Type: {{ secondaryId.SecondaryIdType }}
              </p>

              <p v-if="secondaryId.SecondaryIdLink">
                Link: {{ secondaryId.SecondaryIdLink }}
              </p>

              <p v-if="secondaryId.SecondaryIdDomain">
                Domain: {{ secondaryId.SecondaryIdDomain }}
              </p>
            </div>
          </n-space>
        </div>

        <!-- <pre>
        {{ metadata.IdentificationModule }}
        </pre> -->
      </n-space>
    </n-card>

    <n-card title="IPD Sharing" class="shadow-md">
      <n-space vertical>
        <p>
          {{ metadata.IPDSharingStatementModule.IPDSharing }}
        </p>

        <p v-if="metadata.IPDSharingStatementModule.IPDSharing === 'Yes'">
          {{ metadata.IPDSharingStatementModule.IPDSharingDescription }}
        </p>
      </n-space>
    </n-card>

    <n-card title="Oversight" class="shadow-md">
      <n-space vertical>
        <p class="mb-1 w-full border-b font-medium">Oversight Has DMC?</p>

        <p>
          {{ metadata.OversightModule.OversightHasDMC }}
        </p>
      </n-space>
    </n-card>

    <n-card title="References" class="shadow-md">
      <n-space vertical>
        <div v-if="metadata.ReferencesModule.ReferenceList">
          <p class="mb-1 w-full border-b font-medium">References</p>

          <n-space vertical>
            <div
              v-for="reference in metadata.ReferencesModule.ReferenceList"
              :key="reference"
            >
              <p v-if="reference.ReferenceID">
                ID: {{ reference.ReferenceID }}
              </p>

              <p v-if="reference.ReferenceType">
                Reference Type: {{ reference.ReferenceType }}
              </p>

              <p>Reference Citation: {{ reference.ReferenceCitation }}</p>
            </div>
          </n-space>
        </div>

        <div v-if="metadata.ReferencesModule.SeeAlsoLinkList">
          <p class="mb-1 w-full border-b font-medium">See Also</p>

          <n-space vertical>
            <div
              v-for="seeAlso in metadata.ReferencesModule.SeeAlsoLinkList"
              :key="seeAlso"
            >
              <p v-if="seeAlso.SeeAlsoLinkLabel">
                Label: {{ seeAlso.SeeAlsoLinkLabel }}
              </p>

              <p v-if="seeAlso.SeeAlsoLinkURL">
                URL: {{ seeAlso.SeeAlsoLinkURL }}
              </p>
            </div>
          </n-space>
        </div>

        <!-- <n-space v-if=""> </n-space> -->

        <div v-if="metadata.ReferencesModule.AvailIPDList">
          <p class="mb-1 w-full border-b font-medium">Available IPDs</p>

          <n-space vertical>
            <div
              v-for="availIPD in metadata.ReferencesModule.AvailIPDList"
              :key="availIPD"
            >
              <p>ID: {{ availIPD.AvailIPDId }}</p>

              <p>Type: {{ availIPD.AvailIPDType }}</p>

              <p>URL: {{ availIPD.AvailIPDURL }}</p>

              <p v-if="availIPD.AvailIPDComment">
                Comments: {{ availIPD.AvailIPDComment }}
              </p>
            </div>
          </n-space>
        </div>

        <!-- <pre>
        {{ metadata.ReferencesModule }}
        </pre> -->
      </n-space>
    </n-card>

    <n-card title="Sponsors and Collaborators" class="shadow-md">
      <n-space vertical>
        <p class="mb-1 w-full border-b font-medium">Sponsor</p>

        <p>
          {{ metadata.SponsorCollaboratorsModule.LeadSponsor.LeadSponsorName }}
        </p>

        <div>
          <p class="mb-1 w-full border-b font-medium">Collaborators</p>

          <n-space vertical>
            <n-ul
              v-for="collaborator in metadata.SponsorCollaboratorsModule
                .CollaboratorList"
              :key="collaborator"
              class="list-disc"
            >
              <n-li class="">{{ collaborator.CollaboratorName }}</n-li>
            </n-ul>
          </n-space>
        </div>

        <p class="mb-1 w-full border-b font-medium">Responsible Party</p>

        <p>
          Party Type:
          {{
            metadata.SponsorCollaboratorsModule.ResponsibleParty
              .ResponsiblePartyType
          }}
        </p>

        <p
          v-if="
            metadata.SponsorCollaboratorsModule.ResponsibleParty
              .ResponsiblePartyInvestigatorAffiliation
          "
        >
          Affiliation:
          {{
            metadata.SponsorCollaboratorsModule.ResponsibleParty
              .ResponsiblePartyInvestigatorAffiliation
          }}
        </p>

        <p
          v-if="
            metadata.SponsorCollaboratorsModule.ResponsibleParty
              .ResponsiblePartyInvestigatorFullName
          "
        >
          Name:
          {{
            metadata.SponsorCollaboratorsModule.ResponsibleParty
              .ResponsiblePartyInvestigatorFullName
          }}
        </p>

        <p
          v-if="
            metadata.SponsorCollaboratorsModule.ResponsibleParty
              .ResponsiblePartyInvestigatorTitle
          "
        >
          Title:
          {{
            metadata.SponsorCollaboratorsModule.ResponsibleParty
              .ResponsiblePartyInvestigatorTitle
          }}
        </p>

        <!-- <pre>
        {{ metadata.SponsorCollaboratorsModule }}
        </pre> -->
      </n-space>
    </n-card>

    <n-card title="Status Information" class="shadow-md">
      <n-space vertical>
        <p class="mb-1 w-full border-b font-medium">Overall Status</p>

        <p class="mb-1">
          {{ metadata.StatusModule.OverallStatus }}
        </p>

        <p class="mb-1 w-full border-b font-medium">
          {{ metadata.StatusModule.StartDateStruct.StartDateType }} Start Date
        </p>

        <p class="mb-1">
          {{ metadata.StatusModule.StartDateStruct.StartDate }}
        </p>

        <!-- create two p tags if completiondatestruct exists -->
        <div v-if="metadata.StatusModule.CompletionDateStruct" class="mb-1">
          <p class="mb-1 w-full border-b font-medium">
            {{ metadata.StatusModule.CompletionDateStruct.CompletionDateType }}
            Completion Date
          </p>

          <p>
            {{ metadata.StatusModule.CompletionDateStruct.CompletionDate }}
          </p>
        </div>

        <div v-if="metadata.StatusModule.WhyStopped" class="mb-1">
          <p class="mb-1 w-full border-b font-medium">Why Stopped</p>

          <p>
            {{ metadata.StatusModule.WhyStopped }}
          </p>
        </div>
        <!-- <pre>
        {{ metadata.StatusModule }}
        </pre> -->
      </n-space>
    </n-card>
  </n-space>
</template>
