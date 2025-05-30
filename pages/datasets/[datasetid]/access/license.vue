<script setup lang="ts">
import useDownloadAgreementForm from "~/composables/useDownloadAgreementForm";

definePageMeta({
  middleware: ["auth"],
});

const route = useRoute();

const { datasetid } = route.params as { datasetid: string };
const { data: dataset, error } = await useDataset(datasetid);
const agreementFormState = useDownloadAgreementForm(datasetid);
console.log(agreementFormState.value);

if (error.value) {
  console.error(error.value);

  push.error({
    title: "Something went wrong",
    message: "Failed to fetch dataset",
  });

  throw new Error("Failed to fetch dataset");
}

if (agreementFormState.value.is_diabetes_research === null) {
  console.warn("Redirecting to collect whether this is non-diabetes research");
  await navigateTo(`/datasets/${dataset.value?.id}/access/diabetes-research`);
}

if (!agreementFormState.value.research_purpose?.trim()) {
  console.warn("Redirecting to collect research purpose");
  await navigateTo(`/datasets/${dataset.value?.id}/access/research-purpose`);
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

const currentStep = ref<number>(6);

const licenseAccepted = ref<boolean>(false);
const licenseText =
  ref<string>(`UNIVERSITY OF WASHINGTON (“Licensor”) DATA LICENSE AGREEMENT

BY DOWNLOADING, INSTALLING OR USING ANY OR ALL OF THE CONTENTS OF THE ACCOMPANYING DATA FILES (COLLECTIVELY, THE "DATA"), YOU ACKNOWLEDGE THAT YOU HAVE READ ALL OF THE TERMS AND CONDITIONS OF THIS DATA LICENSE AGREEMENT (“AGREEMENT”), UNDERSTAND THEM, ARE AUTHORIZED BY YOUR ENTITY TO ACCEPT THEM, AND AGREE TO BE BOUND BY THEM. WE RECOMMEND THAT YOU PRINT A COPY OF THIS AGREEMENT FOR YOUR RECORDS.

IF YOU DO NOT AGREE TO ALL OF THE TERMS OF THIS AGREEMENT, YOU MUST NOT DOWNLOAD, INSTALL OR USE THE DATA.

If you will use the Data as an individual and not on behalf of any employer, institution, agency, partnership, joint venture, corporation, company or other entity (“Entity”), then the “Licensee” referred to in this Agreement is you in your individual capacity. If you are entering into this Agreement on behalf of an Entity, then the “Licensee” referred to in this Agreement shall be that Entity, provided that you hereby represent and warrant to Licensor that you have the legal authority to bind that Entity. If the Licensee is an Entity, then the rights and obligations under this Agreement apply to all employees and agents of the Entity, and the Entity shall be liable and responsible for the actions and omissions of all such individuals, to the extent allowed by applicable law.

1. LICENSE GRANT. Subject to Licensee’s compliance with the terms and conditions of this Agreement, Licensor grants Licensee a non-exclusive and non-transferable license to download, reproduce and use the Data, and to create derivative works thereof, for research and commercial purposes. All full and partial copies of the Data made by Licensee shall be subject to the terms of this Agreement.

2. DATA SHARING; MODELS. Licensee shall not transfer, license, sublicense, sell, assign, display, share or otherwise convey any portion of the Data or any derivative work to any third party other than another licensee (“Other Licensee”) that is bound by the terms of an agreement with Licensor on terms identical to those contained in this Agreement, in which case Licensee shall be permitted to give access to the Data to such Other Licensee and its employees, agents and contractors that are bound under such agreement for the purpose of collaborating with Licensee on one or more projects involving the Data. Notwithstanding the foregoing, Licensee is permitted to make, reproduce and distribute models, algorithms and programs that are developed, trained or adapted using the Data, but which do not themselves contain the Data or any modified version of the Data (“Models”), provided that Licensee, prior to dissemination of any such Models, undertakes all reasonable efforts to minimise the likelihood that Data can be memorized, derived, reconstructed or reconstituted through the use or construction of such Models.

3. ADDITIONAL USE RESTRICTIONS. Without limiting the generality of the foregoing, Licensee shall not: (i) make clinical treatment decisions based on the Data, as it is intended solely as a research resource, or (ii) use or attempt to use the Data, alone or in concert with other information, to compromise or otherwise infringe the confidentiality of information on an individual person who is the source of any Data or any clinical data or biological sample from which Data has been generated (a “Data Subject”) and their right to privacy, to identify or contact any individual Data Subject or group of Data Subjects, to extract or extrapolate any identifying information about a Data Subject, to establish a particular Data Subject's membership in a particular group of persons, or otherwise to cause harm or injury to any Data Subject. Licensee agrees to acknowledge the source and any funder of the Data in any publications reporting use of the Data. The current citation for you to use can be found here: docs.aireadi.org.

4. SECURITY. Licensee agrees to comply with all data security and privacy standards established by the U.S. National Institutes of Health under its Genomic Data Sharing (GDS) Policy from time to time, the current version of which is located at NIH Security Best Practices for Controlled-Access Data Subject to the NIH Genomic Data Sharing (GDS) Policy (https://sharing.nih.gov/sites/default/files/flmngr/NIH_Best_Practices_for_Controlled- Access_Data_Subject_to_the_NIH_GDS_Policy.pdf).

5. TERMINATION. This Agreement will terminate automatically upon any breach of any term of this Agreement by Licensee. Upon termination, Licensee shall delete all copies of the Data in its possession and control and cease all use of the Data.

6. PROPRIETARY RIGHTS. Title to the Data, and all industrial and intellectual property rights therein, shall at all times remain solely and exclusively with Licensor and its suppliers, and Licensee shall not take any action inconsistent with such ownership. Any rights not expressly granted herein are reserved to Licensor and its suppliers.

7. DISCLAIMER OF WARRANTY. THE DATA IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTY OF ANY KIND, INCLUDING WITHOUT LIMITATION THE WARRANTIES THAT IT IS FREE FROM DEFECTS, MERCHANTABLE, FIT FOR A PARTICULAR PURPOSE OR NON-INFRINGING. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE DATA IS BORNE BY LICENSEE. SHOULD THE DATA PROVE DEFECTIVE IN ANY RESPECT, LICENSEE AND NOT LICENSOR OR ITS SUPPLIERS ASSUMES THE ENTIRE COST OF ANY SERVICE AND REPAIR. THIS DISCLAIMER OF WARRANTY CONSTITUTES AN ESSENTIAL PART OF THIS AGREEMENT. NO USE OF THE DATA IS AUTHORIZED HEREUNDER EXCEPT UNDER THIS DISCLAIMER.

8. LIMITATIONS OF LIABILITY. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL LICENSOR OR ITS SUPPLIERS BE LIABLE TO LICENSEE OR ANY PARTY CLAIMING THROUGH LICENSEE FOR ANY PUNITIVE, EXEMPLARY, MULTIPLE, INDIRECT, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OF OR INABILITY TO USE THE DATA, INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF GOODWILL, WORK STOPPAGE, COMPUTER FAILURE OR MALFUNCTION, OR ANY AND ALL OTHER COMMERCIAL DAMAGES OR LOSSES, EVEN IF ADVISED OF THE POSSIBILITY THEREOF, AND REGARDLESS OF THE LEGAL OR EQUITABLE THEORY (CONTRACT, TORT OR OTHERWISE) UPON WHICH THE CLAIM IS BASED.

IN ANY CASE, LICENSOR'S ENTIRE LIABILITY UNDER ANY PROVISION OF THIS AGREEMENT AND WITH RESPECT TO THE DATA SHALL NOT EXCEED IN THE AGGREGATE ONE U.S. DOLLAR, WITH THE EXCEPTION OF DEATH OR PERSONAL INJURY CAUSED BY THE NEGLIGENCE OF LICENSOR TO THE EXTENT APPLICABLE LAW PROHIBITS THE LIMITATION OF DAMAGES IN SUCH CASES. SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THIS EXCLUSION AND LIMITATION MAY NOT BE APPLICABLE.

9. INDEMNIFICATION. To the extent allowed by applicable law, Licensee agrees to indemnify, defend and hold harmless Licensor and its suppliers and their respective employees, officers, directors, contractors and agents from and against any and all claims, damages, losses, settlements, penalties, costs, expenses and other amounts arising directly or indirectly from Licensee’s use of the Data and any use, distribution or activity of a Model, including, without limitation, all third party claims asserting violation of privacy rights, death, personal harm or injury, economic loss, emotional distress, discrimination, defamation, breach of security, national security, or infringement of patent, copyright or other intellectual or industrial property rights.

10. COMPLIANCE. Licensee agrees to comply with all applicable laws, regulations and restrictions relating to the distribution and use of the Data and Models.

11. GENERAL. (a) This Agreement constitutes the entire agreement between the parties concerning the subject matter hereof. (b) Subject to the Licensor’s right to update and modify its security policies as provided in Paragraph 4, this Agreement may be amended only by a writing signed by both parties. (c) If any provision in this Agreement should be held illegal or unenforceable by a court having jurisdiction, such provision shall be modified to the extent necessary to render it enforceable without losing its intent, or severed from this Agreement if no such modification is possible, and other provisions of this Agreement shall remain in full force and effect. (d) The language of this Agreement is English. (e) A waiver by either party of any term or condition of this Agreement or any breach thereof, in any one instance, shall not waive such term or condition or any subsequent breach thereof. (f) This Agreement shall be binding upon and shall inure to the benefit of the parties, their successors and permitted assigns.`);

const attestationsAccepted = ref<boolean>(false);
const attestations = [
  "I will not attempt to identify any individual who has contributed data to this dataset.",
  "I will follow the cybersecurity guidelines and agree to be tracked by an embedded token.",
  "I will not distribute this dataset per the License.",
  "I will only use this dataset to conduct the research described in my research purpose.",
];

const licenseAndAttestationComplete = computed(() => {
  return licenseAccepted.value && attestationsAccepted.value;
});

const handleSubmit = async () => {
  try {
    const agreement = await $fetch(`/api/downloads/agreement/create`, {
      body: {
        attestation_accepted: attestationsAccepted.value,
        dataset_id: dataset.value?.id,
        license_accepted: licenseAccepted.value,
        ...agreementFormState.value,
      },
      headers: useRequestHeaders(["cookie"]),
      method: "POST",
    });

    agreementFormState.value = agreement;
    await navigateTo(`/datasets/${dataset.value?.id}/access/select`);
  } catch (error) {
    console.error(error);
    push.error({
      title: "Something went wrong",
      message: "Could not save license agreement",
    });

    throw new Error("Could not save license agreement");
  }
};
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
            <h4>License</h4>
            <DownloadLicenseForm
              v-model="licenseAccepted"
              :license="licenseText"
            />
            <n-divider></n-divider>
            <h4>Attestation</h4>
            <DownloadAttestationForm
              v-model="attestationsAccepted"
              :attestations="attestations"
            />
            <n-button
              size="large"
              type="info"
              secondary
              class="my-3"
              :disabled="!licenseAndAttestationComplete"
              @click="handleSubmit"
              >Agree</n-button
            >
          </div>
        </TransitionFade>
      </div>
    </div>
  </main>
</template>
