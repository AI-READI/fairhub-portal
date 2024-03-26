<script setup lang="ts">
defineProps({
  metadata: {
    required: true,
    type: Object as PropType<StudyDescription>,
  },
});
</script>

<template>
  <n-space vertical size="large">
    <CardCollapsibleCard
      id="DescriptionModule"
      data-section-title="Study Overview"
      title="Study Overview"
      class="mb-4 shadow-md"
      :collapse="false"
    >
      <div class="grid grid-cols-12 gap-8">
        <n-space vertical class="col-span-9 mr-2">
          <p class="mb-1 w-full border-b font-semibold">Brief Summary</p>

          <p>
            {{ metadata.descriptionModule.briefSummary }}
          </p>

          <p class="mb-1 mt-4 w-full border-b font-semibold">
            Detailed Description
          </p>

          <p>
            {{ metadata.descriptionModule.detailedDescription }}
          </p>

          <p class="mb-1 mt-4 w-full border-b font-semibold">Official Title</p>

          <p>
            {{ metadata.identificationModule.officialTitle }}
          </p>

          <p class="mb-2 mt-4 w-full border-b font-semibold">Conditions</p>

          <n-space>
            <n-tag
              v-for="condition in metadata.conditionsModule.conditionList"
              :key="condition.conditionName"
              type="info"
              :bordered="false"
            >
              {{ condition.conditionName }}
            </n-tag>
          </n-space>
        </n-space>

        <n-space vertical class="col-span-3 ml-2">
          <p class="mb-1 w-full border-b font-semibold">
            Study Start ({{
              metadata.statusModule.startDateStruct.startDateType
            }})
          </p>

          <p>{{ metadata.statusModule.startDateStruct.startDate }}</p>

          <div v-if="metadata.statusModule.completionDateStruct" class="mt-4">
            <p class="mb-1 w-full border-b font-semibold">
              Study Completion ({{
                metadata.statusModule.completionDateStruct.completionDateType
              }})
            </p>

            <p>
              {{ metadata.statusModule.completionDateStruct.completionDate }}
            </p>
          </div>

          <div v-if="metadata.statusModule.whyStopped" class="mt-4">
            <p class="mb-1 w-full border-b font-semibold">Why Stopped</p>

            <p>
              {{ metadata.statusModule.whyStopped }}
            </p>
          </div>

          <p class="mb-1 mt-4 w-full border-b font-semibold">Overall Status</p>

          <p>
            {{ metadata.statusModule.overallStatus }}
          </p>
        </n-space>
      </div>
    </CardCollapsibleCard>

    <!-- <n-card title="Contact and Locations" id="cContactsLocationsModule" data-section-title="Contact and Locations" class="shadow-md">
      <n-space vertical>
        <p class="mb-1 w-full border-b font-medium">Brief Summary</p>

        <pre>
        {{ metadata.ContactsLocationsModule }}
       </pre
        >
      </n-space>
    </n-card> -->

    <CardCollapsibleCard
      id="DesignModule"
      data-section-title="Design"
      title="Design"
      class="mb-4 shadow-md"
    >
      <n-space vertical>
        <p class="mb-1 w-full border-b font-semibold">Study Type</p>

        <p>
          {{ metadata.designModule.studyType }}
        </p>

        <p class="mb-1 mt-2 w-full border-b font-semibold">
          Enrollment Count ({{
            metadata.designModule.enrollmentInfo.enrollmentType
          }})
        </p>

        <div>
          <p>
            {{ metadata.designModule.enrollmentInfo.enrollmentCount }}
          </p>
        </div>

        <p class="mb-1 mt-2 w-full border-b font-semibold">Target Duration</p>

        <p>
          {{ metadata.designModule.targetDuration }}
        </p>

        <p class="mb-1 mt-2 w-full border-b font-semibold">
          Number of Cohort Groups
        </p>

        <p>
          {{ metadata.designModule.numberGroupsCohorts }}
        </p>

        <div
          v-if="metadata.designModule.studyType === 'Interventional'"
          class="mt-2"
        >
          <div v-if="metadata.designModule.phaseList">
            <p class="mb-1 w-full border-b font-semibold">Phase List</p>

            <n-ul
              v-for="(phase, index) in metadata.designModule.phaseList"
              :key="index"
              class="list-disc text-base"
            >
              <n-li>
                {{ phase }}
              </n-li>
            </n-ul>
          </div>

          <div v-if="metadata.designModule.designInfo">
            <p class="mb-1 mt-2 w-full border-b font-semibold">
              Design Allocation
            </p>

            <p>
              {{ metadata.designModule.designInfo.designAllocation }}
            </p>

            <p class="mb-1 mt-2 w-full border-b font-semibold">
              Design Intervention Module
            </p>

            <p>
              {{ metadata.designModule.designInfo.designInterventionModel }}
            </p>

            <p class="mb-1 mt-2 w-full border-b font-semibold">
              Design Primary Purpose
            </p>

            <p>
              {{ metadata.designModule.designInfo.designPrimaryPurpose }}
            </p>

            <p class="mb-1 mt-2 w-full border-b font-semibold">
              Design Masking
            </p>

            <p>
              {{
                metadata.designModule.designInfo.designMaskingInfo
                  ?.designMasking
              }}
            </p>

            <p class="mb-1 mt-2 w-full border-b font-semibold">
              Who Masked List
            </p>

            <n-ul
              v-for="(masked, index) in metadata.designModule.designInfo
                .designMaskingInfo?.designWhoMaskedList"
              :key="index"
              class="list-disc text-base"
            >
              <n-li>
                {{ masked }}
              </n-li>
            </n-ul>

            <div
              v-if="
                metadata.designModule.designInfo.designMaskingInfo
                  ?.designMaskingDescription
              "
              class="mt-2"
            >
              <p class="mb-1 w-full border-b font-semibold">
                Masking Description
              </p>

              <p>
                {{
                  metadata.designModule.designInfo.designMaskingInfo
                    .designMaskingDescription
                }}
              </p>
            </div>
          </div>
        </div>

        <div
          v-if="metadata.designModule.studyType === 'Observational'"
          class="mt-2"
        >
          <div v-if="metadata.designModule.designInfo.designAllocation">
            <p class="mb-1 w-full border-b font-semibold">Design Allocation</p>

            <p>
              {{ metadata.designModule.designInfo.designAllocation }}
            </p>
          </div>

          <div
            v-if="metadata.designModule.designInfo.designObservationModel"
            class="mt-4"
          >
            <p class="mb-1 w-full border-b font-semibold">
              Design Observation Model
            </p>

            <p>
              {{ metadata.designModule.designInfo.designObservationModel }}
            </p>
          </div>

          <div
            v-if="metadata.designModule.designInfo.designObservationalModelList"
            class="mt-3"
          >
            <p class="mb-2 w-full border-b font-semibold">
              Design Observation Model
            </p>

            <n-ul
              v-for="model in metadata.designModule.designInfo
                .designObservationalModelList"
              :key="model"
              class="list-disc text-base"
            >
              <n-li>
                {{ model }}
              </n-li>
            </n-ul>
          </div>

          <div
            v-if="metadata.designModule.designInfo.designTimePerspectiveList"
            class="mt-5"
          >
            <p class="mb-2 w-full border-b font-semibold">
              Design Time Perspective
            </p>

            <n-ul
              v-for="perspective in metadata.designModule.designInfo
                .designTimePerspectiveList"
              :key="perspective"
              class="list-disc text-base"
            >
              <n-li>
                {{ perspective }}
              </n-li>
            </n-ul>
          </div>

          <div v-if="metadata.designModule.bioSpec" class="mt-4">
            <p class="mb-1 w-full border-b font-semibold">Biospecimens</p>

            <p>
              {{ metadata.designModule.bioSpec.bioSpecRetention }}
            </p>

            <div
              v-if="metadata.designModule.bioSpec.bioSpecDescription"
              class="mt-2"
            >
              <p class="mb-1 w-full border-b font-semibold">
                Biospecimens Description
              </p>

              <p>
                {{ metadata.designModule.bioSpec.bioSpecDescription }}
              </p>
            </div>
          </div>
        </div>
      </n-space>
    </CardCollapsibleCard>

    <CardCollapsibleCard
      id="EligibilityModule"
      data-section-title="Eligibility"
      title="Eligibility"
      class="mb-4 shadow-md"
    >
      <n-space vertical>
        <p class="mb-1 mt-2 w-full border-b font-semibold">Sex</p>

        <p class="">
          {{ metadata.eligibilityModule.sex }}
        </p>

        <p class="mb-1 mt-2 w-full border-b font-semibold">Gender Based</p>

        <p>
          {{ metadata.eligibilityModule.genderBased }}
        </p>

        <div v-if="metadata.eligibilityModule.genderDescription" class="mt-2">
          <p class="mb-3 w-full border-b font-semibold">Gender Description</p>

          <p>
            {{ metadata.eligibilityModule.genderDescription }}
          </p>
        </div>

        <p class="mb-1 mt-2 w-full border-b font-semibold">Minimum Age</p>

        <p>
          {{ metadata.eligibilityModule.minimumAge }}
        </p>

        <p class="mb-1 mt-2 w-full border-b font-semibold">Maximum Age</p>

        <p>
          {{ metadata.eligibilityModule.maximumAge }}
        </p>

        <div v-if="metadata.eligibilityModule.healthyVolunteers" class="mt-2">
          <p class="mb-2 w-full border-b font-semibold">Healthy Volunteers</p>

          <p>
            {{ metadata.eligibilityModule.healthyVolunteers }}
          </p>
        </div>

        <p class="mb-1 w-full border-b font-semibold">Inclusion Criteria</p>

        <ul class="list-inside list-disc">
          <li
            v-for="(criteria, index) in metadata.eligibilityModule
              .eligibilityCriteria.eligibilityCriteriaInclusion"
            :key="index"
          >
            {{ criteria }}
          </li>
        </ul>

        <p class="mb-1 mt-2 w-full border-b font-semibold">
          Exclusion Criteria
        </p>

        <ul class="list-inside list-disc">
          <li
            v-for="(criteria, index) in metadata.eligibilityModule
              .eligibilityCriteria.eligibilityCriteriaExclusion"
            :key="index"
          >
            {{ criteria }}
          </li>
        </ul>

        <div v-if="metadata.eligibilityModule.studyPopulation" class="mt-2">
          <p class="mb-3 w-full border-b font-semibold">Study Population</p>

          <p>
            {{ metadata.eligibilityModule.studyPopulation }}
          </p>
        </div>

        <div v-if="metadata.eligibilityModule.samplingMethod" class="mt-2">
          <p class="mb-3 w-full border-b font-semibold">Sampling Method</p>

          <p>
            {{ metadata.eligibilityModule.samplingMethod }}
          </p>
        </div>
      </n-space>
    </CardCollapsibleCard>

    <CardCollapsibleCard
      id="IdentificationModule"
      title="Identification Information"
      data-section-title="Identification Information"
      class="mb-4 shadow-md"
    >
      <n-space vertical>
        <p class="mb-1 w-full border-b font-semibold">Organization Study ID</p>

        <p>
          {{ metadata.identificationModule.orgStudyIdInfo.orgStudyId }}
        </p>

        <p class="mb-1 mt-3 w-full border-b font-semibold">
          Organization Study Type
        </p>

        <p>
          {{ metadata.identificationModule.orgStudyIdInfo.orgStudyIdType }}
        </p>

        <div
          v-if="metadata.identificationModule.secondaryIdInfoList"
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
                v-for="(secondaryId, index) in metadata.identificationModule
                  .secondaryIdInfoList"
                :key="index"
              >
                <td>{{ secondaryId.secondaryId }}</td>

                <td>{{ secondaryId.secondaryIdType }}</td>

                <td>{{ secondaryId.secondaryIdLink || "N/A" }}</td>

                <td>{{ secondaryId.secondaryIdDomain || "N/A" }}</td>
              </tr>
            </tbody>
          </n-table>
        </div>
      </n-space>
    </CardCollapsibleCard>

    <CardCollapsibleCard
      id="OversightModule"
      data-section-title="Oversight"
      title="Oversight"
      class="mb-4 shadow-md"
    >
      <n-space vertical>
        <p class="mb-1 w-full border-b font-semibold">
          Has the clinical study has been reviewed and approved by at least one
          human subjects protection review board?
        </p>

        <p>
          {{ metadata.oversightModule.humanSubjectReviewStatus }}
        </p>

        <p class="mb-1 w-full border-b font-semibold">
          Is this clinical study for a drug product
        </p>

        <p>
          {{ metadata.oversightModule.isFDARegulatedDrug }}
        </p>

        <p class="mb-1 mt-2 w-full border-b font-semibold">
          Is this clinical study for a medical device?
        </p>

        <p>
          {{ metadata.oversightModule.isFDARegulatedDevice }}
        </p>

        <p class="mb-1 w-full border-b font-semibold">
          Was a data monitoring committee appointed for this study?
        </p>

        <p>
          {{ metadata.oversightModule.oversightHasDMC }}
        </p>
      </n-space>
    </CardCollapsibleCard>

    <CardCollapsibleCard
      id="SponsorCollaboratorsModule"
      data-section-title="Sponsors and Collaborators"
      title="Sponsors and Collaborators"
      class="mb-4 shadow-md"
    >
      <n-space vertical>
        <p class="mb-1 w-full border-b font-semibold">Sponsor</p>

        <p>
          {{ metadata.sponsorCollaboratorsModule.leadSponsor.leadSponsorName }}
        </p>

        <div class="mt-2">
          <p class="mb-1 w-full border-b font-semibold">Collaborators</p>

          <n-space vertical>
            <ul class="list-inside list-disc">
              <li
                v-for="(collaborator, index) in metadata
                  .sponsorCollaboratorsModule.collaboratorList"
                :key="index"
                class="py-1"
              >
                {{ collaborator.collaboratorName }}
              </li>
            </ul>
          </n-space>
        </div>

        <p class="mb-1 mt-2 w-full border-b font-semibold">Responsible Party</p>

        <n-table :bordered="false" :single-line="false">
          <thead>
            <tr>
              <th>Name</th>

              <th>Title</th>

              <th>Affiliation</th>

              <th>Type</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                {{
                  metadata.sponsorCollaboratorsModule.responsibleParty
                    .responsiblePartyInvestigatorFirstName
                    ? `${metadata.sponsorCollaboratorsModule.responsibleParty.responsiblePartyInvestigatorFirstName} ${metadata.sponsorCollaboratorsModule.responsibleParty.responsiblePartyInvestigatorLastName}`
                    : "N/A"
                }}
              </td>

              <td>
                {{
                  metadata.sponsorCollaboratorsModule.responsibleParty
                    .responsiblePartyInvestigatorTitle || "N/A"
                }}
              </td>

              <td>
                {{
                  metadata.sponsorCollaboratorsModule.responsibleParty
                    .responsiblePartyInvestigatorAffiliation
                    ?.responsiblePartyInvestigatorAffiliationName || "N/A"
                }}
              </td>

              <td>
                {{
                  metadata.sponsorCollaboratorsModule.responsibleParty
                    .responsiblePartyType
                }}
              </td>
            </tr>
          </tbody>
        </n-table>
      </n-space>
    </CardCollapsibleCard>

    <!-- <CardCollapsibleCard
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
    </CardCollapsibleCard> -->
  </n-space>
</template>
