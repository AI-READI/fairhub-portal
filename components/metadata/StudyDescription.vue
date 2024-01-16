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

        <pre>
        {{ metadata.EligibilityModule }}
        </pre>
      </n-space>
    </n-card>

    <n-card title="Identification" class="shadow-md">
      <n-space vertical>
        <p class="mb-1 w-full border-b font-medium">
          Identification Information
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

    <n-card title="Status" class="shadow-md">
      <n-space vertical>
        <p class="mb-1 w-full border-b font-medium">Status Information</p>

        <pre>
        {{ metadata.StatusModule }}
        </pre>
      </n-space>
    </n-card>
  </n-space>
</template>
