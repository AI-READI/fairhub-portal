<script setup lang="ts">
import sanitizeHtml from "sanitize-html";
import { parse } from "marked";

const sanitize = (html: string) => sanitizeHtml(html);

const eligibilityMarkdown = ref<string>("");

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

onBeforeMount(() => {
  eligibilityMarkdown.value = parse(
    props.metadata.EligibilityModule.EligibilityCriteria
  );
});
</script>

<template>
  <n-space vertical size="large">
    <card-collapsible-card
      id="DescriptionModule"
      data-section-title="Study Overview"
      title="Study Overview"
      class="mb-4 shadow-md"
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

          <div v-if="metadata.StatusModule.CompletionDateStruct" class="mt-4">
            <p class="mb-1 w-full border-b font-semibold">
              Study Completion ({{
                metadata.StatusModule.CompletionDateStruct.CompletionDateType
              }})
            </p>

            <p>
              {{ metadata.StatusModule.CompletionDateStruct.CompletionDate }}
            </p>
          </div>

          <div v-if="metadata.StatusModule.WhyStopped" class="mt-4">
            <p class="mb-1 w-full border-b font-semibold">Why Stopped</p>

            <p>
              {{ metadata.StatusModule.WhyStopped }}
            </p>
          </div>

          <p class="mb-1 mt-4 w-full border-b font-semibold">Overall Status</p>

          <p>
            {{ metadata.StatusModule.OverallStatus }}
          </p>
        </n-space>
      </div>
    </card-collapsible-card>

    <!-- <n-card title="Contact and Locations" id="cContactsLocationsModule" data-section-title="Contact and Locations" class="shadow-md">
      <n-space vertical>
        <p class="mb-1 w-full border-b font-medium">Brief Summary</p>

        <pre>
        {{ metadata.ContactsLocationsModule }}
       </pre
        >
      </n-space>
    </n-card> -->

    <card-collapsible-card
      id="DesignModule"
      data-section-title="Design"
      title="Design"
      class="mb-4 shadow-md"
    >
      <n-space vertical>
        <p class="mb-1 w-full border-b font-semibold">Study Type</p>

        <p>
          {{ metadata.DesignModule.StudyType }}
        </p>

        <p class="mb-1 mt-2 w-full border-b font-semibold">
          Enrollment Count ({{
            metadata.DesignModule.EnrollmentInfo.EnrollmentType
          }})
        </p>

        <div>
          <p>
            {{ metadata.DesignModule.EnrollmentInfo.EnrollmentCount }}
          </p>
        </div>

        <p class="mb-1 mt-2 w-full border-b font-semibold">Target Duration</p>

        <p>
          {{ metadata.DesignModule.TargetDuration }}
        </p>

        <p class="mb-1 mt-2 w-full border-b font-semibold">
          Number of Cohort Groups
        </p>

        <p>
          {{ metadata.DesignModule.NumberGroupsCohorts }}
        </p>

        <div
          v-if="metadata.DesignModule.StudyType === 'Interventional'"
          class="mt-2"
        >
          <div v-if="metadata.DesignModule.PhaseList">
            <p class="mb-1 w-full border-b font-semibold">Phase List</p>

            <n-ul
              v-for="(phase, index) in metadata.DesignModule.PhaseList"
              :key="index"
              class="list-disc text-base"
            >
              <n-li>
                {{ phase }}
              </n-li>
            </n-ul>
          </div>

          <div v-if="metadata.DesignModule.DesignInfo">
            <p class="mb-1 mt-2 w-full border-b font-semibold">
              Design Allocation
            </p>

            <p>
              {{ metadata.DesignModule.DesignInfo.DesignAllocation }}
            </p>

            <p class="mb-1 mt-2 w-full border-b font-semibold">
              Design Intervention Module
            </p>

            <p>
              {{ metadata.DesignModule.DesignInfo.DesignInterventionModel }}
            </p>

            <p class="mb-1 mt-2 w-full border-b font-semibold">
              Design Primary Purpose
            </p>

            <p>
              {{ metadata.DesignModule.DesignInfo.DesignPrimaryPurpose }}
            </p>

            <p class="mb-1 mt-2 w-full border-b font-semibold">
              Design Masking
            </p>

            <p>
              {{
                metadata.DesignModule.DesignInfo.DesignMaskingInfo
                  ?.DesignMasking
              }}
            </p>

            <p class="mb-1 mt-2 w-full border-b font-semibold">
              Who Masked List
            </p>

            <n-ul
              v-for="(masked, index) in metadata.DesignModule.DesignInfo
                .DesignMaskingInfo?.DesignWhoMaskedList"
              :key="index"
              class="list-disc text-base"
            >
              <n-li>
                {{ masked }}
              </n-li>
            </n-ul>

            <div
              v-if="
                metadata.DesignModule.DesignInfo.DesignMaskingInfo
                  ?.DesignMaskingDescription
              "
              class="mt-2"
            >
              <p class="mb-1 w-full border-b font-semibold">
                Masking Description
              </p>

              <p>
                {{
                  metadata.DesignModule.DesignInfo.DesignMaskingInfo
                    .DesignMaskingDescription
                }}
              </p>
            </div>
          </div>
        </div>

        <div
          v-if="metadata.DesignModule.StudyType === 'Observational'"
          class="mt-2"
        >
          <div v-if="metadata.DesignModule.DesignInfo.DesignAllocation">
            <p class="mb-1 w-full border-b font-semibold">Design Allocation</p>

            <p>
              {{ metadata.DesignModule.DesignInfo.DesignAllocation }}
            </p>
          </div>

          <div
            v-if="metadata.DesignModule.DesignInfo.DesignObservationModel"
            class="mt-4"
          >
            <p class="mb-1 w-full border-b font-semibold">
              Design Observation Model
            </p>

            <p>
              {{ metadata.DesignModule.DesignInfo.DesignObservationModel }}
            </p>
          </div>

          <div
            v-if="metadata.DesignModule.DesignInfo.DesignObservationalModelList"
            class="mt-3"
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

          <div
            v-if="metadata.DesignModule.DesignInfo.DesignTimePerspectiveList"
            class="mt-5"
          >
            <p class="mb-2 w-full border-b font-semibold">
              Design Time Perspective
            </p>

            <n-ul
              v-for="perspective in metadata.DesignModule.DesignInfo
                .DesignTimePerspectiveList"
              :key="perspective"
              class="list-disc text-base"
            >
              <n-li>
                {{ perspective }}
              </n-li>
            </n-ul>
          </div>

          <div v-if="metadata.DesignModule.BioSpec" class="mt-4">
            <p class="mb-1 w-full border-b font-semibold">Biospecimens</p>

            <p>
              {{ metadata.DesignModule.BioSpec.BioSpecRetention }}
            </p>

            <div
              v-if="metadata.DesignModule.BioSpec.BioSpecDescription"
              class="mt-2"
            >
              <p class="mb-1 w-full border-b font-semibold">
                Biospecimen Description
              </p>

              <p>
                {{ metadata.DesignModule.BioSpec.BioSpecDescription }}
              </p>
            </div>

            <div
              v-if="metadata.DesignModule.BioSpec.BioSpecDescription"
              class="mt-2"
            >
              <p class="mb-1 w-full border-b font-semibold">
                Biospecimens Description
              </p>

              <p>
                {{ metadata.DesignModule.BioSpec.BioSpecDescription }}
              </p>
            </div>
          </div>
        </div>
      </n-space>
    </card-collapsible-card>

    <card-collapsible-card
      id="EligibilityModule"
      data-section-title="Eligibility"
      title="Eligibility"
      class="mb-4 shadow-md"
    >
      <n-space vertical>
        <p class="mb-1 w-full border-b font-semibold">Eligibility Criteria</p>
        <!-- eslint-disable vue/no-v-html -->
        <div
          class="prose mt-2 max-w-none text-black"
          v-html="eligibilityMarkdown"
        ></div>
        <!-- eslint-enable vue/no-v-html -->

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
      id="IdentificationModule"
      title="Identification Information"
      data-section-title="Identification Information"
      class="mb-4 shadow-md"
    >
      <n-space vertical>
        <p class="mb-1 w-full border-b font-semibold">Organization Study ID</p>

        <p>
          {{ metadata.IdentificationModule.OrgStudyIdInfo.OrgStudyId }}
        </p>

        <p class="mb-1 mt-3 w-full border-b font-semibold">
          Organization Study Type
        </p>

        <p>
          {{ metadata.IdentificationModule.OrgStudyIdInfo.OrgStudyIdType }}
        </p>

        <div
          v-if="metadata.IdentificationModule.SecondaryIdInfoList"
          class="mb-1 mt-4 w-full"
        >
          <p class="mb-4 w-full border-b font-semibold">Secondary ID</p>

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
                v-for="(secondaryId, index) in metadata.IdentificationModule
                  .SecondaryIdInfoList"
                :key="index"
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
      id="IPDSharingStatementModule"
      title="IPD Sharing"
      data-section-title="IPD Sharing"
      class="mb-4 shadow-md"
    >
      <n-space vertical>
        <p>
          {{ metadata.IPDSharingStatementModule.IPDSharing }}
        </p>

        <div
          v-if="metadata.IPDSharingStatementModule.IPDSharing === 'Yes'"
          class="mt-2"
        >
          <p class="mb-1 w-full border-b font-semibold">
            IPD Sharing Description
          </p>

          <p>
            {{ metadata.IPDSharingStatementModule.IPDSharingDescription }}
          </p>

          <p class="mb-1 mt-2 w-full border-b font-semibold">
            IPD Sharing Info Types
          </p>

          <n-ul
            v-for="(type, index) in metadata.IPDSharingStatementModule
              .IPDSharingInfoTypeList"
            :key="index"
            class="list-disc text-base"
          >
            <n-li>
              {{ type }}
            </n-li>
          </n-ul>

          <p class="mb-1 mt-2 w-full border-b font-semibold">
            IPD Sharing Time Frame
          </p>

          <p>
            {{ metadata.IPDSharingStatementModule.IPDSharingTimeFrame }}
          </p>

          <p class="mb-1 mt-2 w-full border-b font-semibold">
            IPD Sharing Access Criteria
          </p>

          <p>
            {{ metadata.IPDSharingStatementModule.IPDSharingAccessCriteria }}
          </p>

          <p class="mb-1 mt-2 w-full border-b font-semibold">IPD Sharing URL</p>

          <p>
            {{ metadata.IPDSharingStatementModule.IPDSharingURL }}
          </p>
        </div>
      </n-space>
    </card-collapsible-card>

    <card-collapsible-card
      id="OversightModule"
      data-section-title="Oversight"
      title="Oversight"
      class="mb-4 shadow-md"
    >
      <n-space vertical>
        <p class="mb-1 w-full border-b font-semibold">Oversight Has DMC?</p>

        <p>
          {{ metadata.OversightModule.OversightHasDMC }}
        </p>
      </n-space>
    </card-collapsible-card>

    <card-collapsible-card
      id="ReferencesModule"
      data-section-title="References"
      title="References"
      class="mb-4 shadow-md"
    >
      <n-space vertical>
        <div v-if="metadata.ReferencesModule.ReferenceList">
          <p class="mb-4 w-full border-b font-semibold">References</p>

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
                v-for="(reference, index) in metadata.ReferencesModule
                  .ReferenceList"
                :key="index"
              >
                <td>{{ reference.ReferenceCitation }}</td>

                <td>{{ reference.ReferenceType || "N/A" }}</td>

                <td>{{ reference.ReferenceID || "N/A" }}</td>
              </tr>
            </tbody>
          </n-table>
        </div>

        <div v-if="metadata.ReferencesModule.SeeAlsoLinkList" class="mt-4">
          <p class="mb-4 w-full border-b font-semibold">See Also</p>

          <n-table :bordered="false" :single-line="false">
            <thead>
              <tr>
                <th>URL</th>

                <th>Label</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(seeAlso, index) in metadata.ReferencesModule
                  .SeeAlsoLinkList"
                :key="index"
              >
                <td>
                  <n-a
                    class="color-blue-600"
                    :href="seeAlso.SeeAlsoLinkURL"
                    target="_blank"
                    >{{ seeAlso.SeeAlsoLinkURL }}
                  </n-a>
                </td>

                <td>{{ seeAlso.SeeAlsoLinkLabel || "N/A" }}</td>
              </tr>
            </tbody>
          </n-table>
        </div>

        <div v-if="metadata.ReferencesModule.AvailIPDList" class="mt-4">
          <p class="mb-4 w-full border-b font-semibold">Available IPDs</p>

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
                v-for="(availIPD, index) in metadata.ReferencesModule
                  .AvailIPDList"
                :key="index"
              >
                <td>{{ availIPD.AvailIPDId }}</td>

                <td>{{ availIPD.AvailIPDType }}</td>

                <td>
                  <n-a :href="availIPD.AvailIPDURL" target="_blank">
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
      id="SponsorCollaboratorsModule"
      data-section-title="Sponsors and Collaborators"
      title="Sponsors and Collaborators"
      class="mb-4 shadow-md"
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
              v-for="(collaborator, index) in metadata
                .SponsorCollaboratorsModule.CollaboratorList"
              :key="index"
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

    <!-- <card-collapsible-card
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
    </card-collapsible-card> -->
  </n-space>
</template>
