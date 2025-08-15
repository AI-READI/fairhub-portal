<script setup lang="ts">
import useDownloadAgreementForm from "~/composables/useDownloadAgreementForm";

definePageMeta({
  middleware: ["auth"],
});

const route = useRoute();

const { datasetid } = route.params as { datasetid: string };
const { data: dataset, error } = await useDataset(datasetid);

if (error.value) {
  console.error(error.value);

  push.error({
    title: "Something went wrong",
    message: "Failed to fetch dataset",
  });

  throw new Error("Failed to fetch dataset");
}

// TODO: Convert to a utility or extract a component?
const generateCombinedFullName = (name: string) => {
  const nameArray = name.split(",");

  if (nameArray.length > 1) {
    return `${nameArray[1]} ${nameArray[0]}`;
  } else {
    return name;
  }
};

const currentStep = ref<number>(5);
const defaultMaxLength = 255;
const minResearchPurposeLength = 100;
const maxResearchPurposeLength = 500;
const minOverviewLength = 200;
const maxOverviewLength = 5000;
const agreementFormState = useDownloadAgreementForm(datasetid);
const validResearchPurpose = computed(
  () =>
    agreementFormState.value.research_purpose?.length >=
      minResearchPurposeLength &&
    agreementFormState.value.research_purpose?.length <=
      maxResearchPurposeLength,
);
const nonDiabetesResearch = computed(
  () => !agreementFormState.value.is_diabetes_research,
);
const validateResearchPurpose = {
  required: true,
  trigger: ["input", "blur"],
  validator() {
    if (!agreementFormState.value.research_purpose?.trim()) {
      return new Error("May not be blank.");
    }

    if (!validResearchPurpose.value) {
      return new Error(
        `Must be between ${minResearchPurposeLength} and ${maxResearchPurposeLength} characters.`,
      );
    }
  },
};
const defaultValidationMessage = `Required. May be at most ${defaultMaxLength} characters.`;
const nonDiabetesRules = {
  ai_use: {
    max: maxOverviewLength,
    message: `Required. Must be between ${minOverviewLength} and ${maxOverviewLength} characters.`,
    min: minOverviewLength,
    required: true,
    trigger: ["input", "blur"],
  },
  collaborator_data_access: {
    message: "This field is required.",
    required: true,
    trigger: ["change", "blur"],
    type: "boolean",
  },
  data_handling_plan: {
    max: maxOverviewLength,
    message: `Required. Must be between ${minOverviewLength} and ${maxOverviewLength} characters.`,
    min: minOverviewLength,
    required: true,
    trigger: ["input", "blur"],
  },
  research_project_title: {
    max: defaultMaxLength,
    message: defaultValidationMessage,
    required: true,
    trigger: ["input", "blur"],
  },
  signing_official_address: {
    max: defaultMaxLength,
    message: defaultValidationMessage,
    required: true,
    trigger: ["input", "blur"],
  },
  signing_official_email: {
    message: "Required. Must be a valid email address.",
    required: true,
    trigger: ["input", "blur"],
    type: "email",
  },
  signing_official_first_name: {
    max: defaultMaxLength,
    message: defaultValidationMessage,
    required: true,
    trigger: ["input", "blur"],
  },
  signing_official_institution: {
    max: defaultMaxLength,
    message: defaultValidationMessage,
    required: true,
    trigger: ["input", "blur"],
  },
  signing_official_last_name: {
    max: defaultMaxLength,
    message: defaultValidationMessage,
    required: true,
    trigger: ["input", "blur"],
  },
  signing_official_phone_number: {
    max: defaultMaxLength,
    message: defaultValidationMessage,
    required: true,
    trigger: ["input", "blur"],
  },
  signing_official_title: {
    max: defaultMaxLength,
    message: defaultValidationMessage,
    required: true,
    trigger: ["input", "blur"],
  },
  study_background: {
    max: maxOverviewLength,
    message: `Required. Must be between ${minOverviewLength} and ${maxOverviewLength} characters.`,
    min: minOverviewLength,
    required: true,
    trigger: ["input", "blur"],
  },
  study_design: {
    max: maxOverviewLength,
    message: `Required. Must be between ${minOverviewLength} and ${maxOverviewLength} characters.`,
    min: minOverviewLength,
    required: true,
    trigger: ["input", "blur"],
  },
  study_overview: {
    max: maxOverviewLength,
    message: `Required. Must be between ${minOverviewLength} and ${maxOverviewLength} characters.`,
    min: minOverviewLength,
    required: true,
    trigger: ["input", "blur"],
  },
};
const validDacFormState = computed(() => {
  if (!nonDiabetesResearch.value) {
    return true;
  }

  const allValid = Object.keys(nonDiabetesRules)
    .map((key) => {
      const value = agreementFormState.value[key];
      if (value === undefined || value === null) {
        return false;
      }

      const min = nonDiabetesRules[key].min;
      const max = nonDiabetesRules[key].max;

      if (min || max) {
        const tooLong = max ? value.trim().length > max : false;
        const tooShort = min ? value.trim().length < min : false;
        if (tooLong || tooShort) {
          return false;
        }
      }

      return true;
    })
    .every((validity) => validity);

  return allValid;
});
const validForm = computed(
  () => validResearchPurpose.value && validDacFormState.value,
);
</script>

<template>
  <main class="h-screen overflow-auto bg-gradient-to-b from-white to-blue-50">
    <div
      class="mx-auto mt-10 flex w-full max-w-screen-xl items-center justify-between px-3"
    >
      <n-flex vertical>
        <h1>{{ dataset?.title }}</h1>

        <div
          v-for="(creator, index) in dataset?.metadata.datasetDescription
            .creator"
          :key="index"
          class="flex flex-row flex-wrap items-center align-middle text-black"
        >
          <!-- if on the last index create a different span -->
          <span class="mr-1 text-sm font-light">{{
            generateCombinedFullName(creator.creatorName)
          }}</span>

          <ButtonIdentifierBadge
            v-if="creator?.nameIdentifier"
            class="pt-1"
            :type="creator.nameIdentifier[0]"
          />

          <span
            v-if="
              dataset?.metadata.datasetDescription.creator &&
              index != dataset?.metadata.datasetDescription.creator.length - 1
            "
            class="text-sm"
          >
            ,
          </span>
        </div>

        <p class="hidden">{{ dataset?.description }}</p>
      </n-flex>

      <n-image
        src="https://raw.githubusercontent.com/AI-READI/AI-READI-logo/main/logo/png/option2.png"
        :alt="dataset?.title"
        class="size-32 h-32 w-32 rounded-lg"
        object-fit="contain"
      />
    </div>

    <n-divider />

    <div class="mx-auto w-full max-w-screen-xl px-3 pb-8">
      <div class="prose mt-0 min-h-[300px] max-w-none text-black">
        <h2>Access this dataset</h2>

        <DownloadStepNav :current-step="currentStep" />

        <TransitionFade>
          <div>
            <h4>About Your Research</h4>

            <p>
              Please note, that by requesting a dataset, your name and research
              purpose will be shared on the AI-READI website in order to promote
              transparency and trust with the use of this data.
            </p>

            <n-form-item
              label="Briefly describe the purpose of your research."
              :rule="validateResearchPurpose"
            >
              <n-input
                v-model:value="agreementFormState.research_purpose"
                type="textarea"
                :minlength="minResearchPurposeLength"
                :maxlength="maxResearchPurposeLength"
                :rows="5"
                show-count
                placeholder="Why is this study being done? Describe how the research aligns with the research purpose in the original consent provided to AI-READI study participants. **"
              />
            </n-form-item>

            <div v-if="nonDiabetesResearch">
              <n-divider></n-divider>

              <h5>Non-Diabetes Research</h5>

              <p>
                For non-diabetes research you must provide the additional
                following details, which requires both DAC approval and a Data
                Use Agreement.
              </p>

              <n-form :model="agreementFormState" :rules="nonDiabetesRules">
                <n-form-item
                  label="Research Project Title"
                  path="research_project_title"
                >
                  <n-input
                    v-model:value="agreementFormState.research_project_title"
                    type="text"
                  />
                </n-form-item>

                <p>
                  Provide an overview of your study below. This should include
                  Study objectives; Study design; Description of how the
                  AI-READI dataset is consistent with the objectives of the
                  proposed research project; Brief Analysis plan with methods.
                </p>

                <n-form-item label="Study Overview" path="study_overview">
                  <n-input
                    v-model:value="agreementFormState.study_overview"
                    type="textarea"
                    :maxlength="maxOverviewLength"
                    :rows="10"
                    show-count
                    placeholder="Clearly outline the specific aims or hypotheses of your study."
                  />
                </n-form-item>

                <n-form-item
                  label="Background and Rationale"
                  path="study_background"
                >
                  <n-input
                    v-model:value="agreementFormState.study_background"
                    type="textarea"
                    :maxlength="maxOverviewLength"
                    :rows="5"
                    show-count
                    placeholder="Describe the scientific premise of your research, including: 
The importance of the research question
The potential impact of the study (Please include potential societal or scientific benefits)
How the requested data will help you achieve your objectives
"
                  />
                </n-form-item>

                <n-form-item label="Study Design" path="study_design">
                  <n-input
                    v-model:value="agreementFormState.study_design"
                    type="textarea"
                    :maxlength="maxOverviewLength"
                    :rows="5"
                    show-count
                    placeholder="Provide details on the methodology, including:
Type of analysis (e.g., statistical, AI/ML- based)
Expected outcomes
Timeline for completion"
                  />
                </n-form-item>

                <n-form-item
                  label="Data Handling: For data security and storage"
                  path="data_handling_plan"
                >
                  <n-input
                    v-model:value="agreementFormState.data_handling_plan"
                    type="textarea"
                    :maxlength="maxOverviewLength"
                    :rows="5"
                    show-count
                    placeholder="Describe where and how the data will be stored (e.g., secure servers, encrypted drives)
Specify who will have access to the data and how access will be controlled
Include retention period and plans for data disposal after project completion (This will be covered in the DUA)
"
                  />
                </n-form-item>

                <n-form-item label="AI" path="ai_use">
                  <n-input
                    v-model:value="agreementFormState.ai_use"
                    type="textarea"
                    :maxlength="maxOverviewLength"
                    :rows="5"
                    show-count
                    placeholder="Does the project plan to use AI/ML? If so, please describe model being used
Please provide the roles and qualifications of team members who will be conducting the analysis 
How are you ensuring fairness and avoiding bias in the outputs of the model?
Is the model being run locally? If not, please describe
Is there a vendor involved?
How is potential data memorization being addressed by the model?
"
                  />
                </n-form-item>

                <p>
                  For the Data Use Agreement, you must provide the requestor’s
                  Institutional Signing Official Information. The Institutional
                  Signing Official is a senior official at an institution who is
                  authorized to enter the institution into a legally binding
                  contract and sign the Data Use Agreement with the requestor
                  who has submitted a Data Access Request to the AI-READI DAC.
                </p>

                <n-form-item
                  label="Signing Official First Name"
                  path="signing_official_first_name"
                >
                  <n-input
                    v-model:value="
                      agreementFormState.signing_official_first_name
                    "
                    type="text"
                  />
                </n-form-item>

                <n-form-item
                  label="Signing Official Last Name"
                  path="signing_official_last_name"
                >
                  <n-input
                    v-model:value="
                      agreementFormState.signing_official_last_name
                    "
                    type="text"
                  />
                </n-form-item>

                <n-form-item
                  label="Signing Official Email Address"
                  path="signing_official_email"
                >
                  <n-input
                    v-model:value="agreementFormState.signing_official_email"
                    type="text"
                  />
                </n-form-item>

                <n-form-item
                  label="Signing Official Phone Number"
                  path="signing_official_phone_number"
                >
                  <n-input
                    v-model:value="
                      agreementFormState.signing_official_phone_number
                    "
                    type="text"
                  />
                </n-form-item>

                <n-form-item
                  label="Signing Official Address"
                  path="signing_official_address"
                >
                  <n-input
                    v-model:value="agreementFormState.signing_official_address"
                    type="textarea"
                    :rows="4"
                  />
                </n-form-item>

                <n-form-item
                  label="Signing Official Position/Title"
                  path="signing_official_title"
                >
                  <n-input
                    v-model:value="agreementFormState.signing_official_title"
                    type="text"
                  />
                </n-form-item>

                <n-form-item
                  label="Signing Official Institution"
                  path="signing_official_institution"
                >
                  <n-input
                    v-model:value="
                      agreementFormState.signing_official_institution
                    "
                    type="text"
                  />
                </n-form-item>

                <p>
                  Will Collaborators/Data Users outside of your institution have
                  access to the data? If yes, they will be required to submit a
                  separate DAR for review and approval and approved user and
                  their institution will be required to sign a separate DUA.
                </p>

                <n-form-item
                  label="Will collaborators have access to the data?"
                  path="collaborator_data_access"
                >
                  <n-radio-group
                    v-model:value="agreementFormState.collaborator_data_access"
                  >
                    <n-space>
                      <n-radio :value="true" label="Yes" />

                      <n-radio :value="false" label="No" />
                    </n-space>
                  </n-radio-group>
                </n-form-item>
              </n-form>
            </div>

            <NuxtLink :to="`/datasets/${dataset?.id}/access/license`">
              <n-button
                size="large"
                type="info"
                secondary
                class="my-3"
                :disabled="!validForm"
                >Next</n-button
              >
            </NuxtLink>
          </div>
        </TransitionFade>
      </div>
    </div>
  </main>
</template>
