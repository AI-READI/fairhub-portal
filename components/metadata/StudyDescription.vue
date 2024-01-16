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

    <n-card title="Contact and Locations" class="shadow-md">
      <n-space vertical>
        <p class="mb-1 w-full border-b font-medium">Brief Summary</p>

        <pre>
        {{ metadata.ContactsLocationsModule }}
       </pre
        >
      </n-space>
    </n-card>

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

        <p class="mb-1 w-full border-b font-medium">Gender Description</p>

        <p>
          {{ metadata.EligibilityModule.GenderDescription }}
        </p>

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

        <pre>
        {{ metadata.IdentificationModule }}
        </pre>
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
        <p class="mb-1 w-full border-b font-medium">References</p>

        <pre>
        {{ metadata.ReferencesModule }}
        </pre>
      </n-space>
    </n-card>

    <n-card title="Sponsors and Collaborators" class="shadow-md">
      <n-space vertical>
        <p class="mb-1 w-full border-b font-medium">
          Sponsors and Collaborators
        </p>

        <pre>
        {{ metadata.SponsorCollaboratorsModule }}
        </pre>
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
