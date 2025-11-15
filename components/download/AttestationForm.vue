<script setup lang="ts">
import type { Attestation } from "~/types/download";

const props = defineProps<{
  attestations: string[];
}>();

const model = defineModel<boolean>({ required: true });

const userAttestations = ref<Attestation[]>(
  props.attestations.map((str) => ({
    id: useId(),
    agreed: false,
    text: str,
  })),
);

const allAgreed = computed(() =>
  userAttestations.value.every((item) => item.agreed),
);

const handleInput = (expected: string, inputValue: string) => {
  const attestation = userAttestations.value.find(
    (item) => item.text === expected,
  );
  if (!attestation) {
    return;
  }

  attestation.agreed = expected === inputValue;
  if (inputValue === "") {
    attestation.validationStatus = undefined;
  } else {
    attestation.validationStatus = attestation.agreed ? "success" : "error";
  }

  model.value = allAgreed.value;
};

// allow pasting in non-production environments
const allowPaste = process.env.NUXT_SITE_ENV !== "production";

const handlePaste = (e: ClipboardEvent) => {
  if (!allowPaste) {
    e.preventDefault();
  }
};
</script>

<template>
  <p>
    Confirm the following statements by retyping each one in the provided input.
  </p>

  <p>
    Please review the
    <a
      href="https://sharing.nih.gov/sites/default/files/flmngr/NIH_Best_Practices_for_Controlled-Access_Data_Subject_to_the_NIH_GDS_Policy.pdf"
      target="_blank"
    >
      NIH cybersecurity guidelines
    </a>
    to ensure compliance with all recommended practices.
  </p>

  <p>
    In order to comply with U.S. export control laws, you must attest that you
    are not representing a U.S. designated country of concern, including, but
    not limited to, China (including Hong Kong/Macau), Russia, Iran, North
    Korea, Cuba, or Venezuela.
  </p>

  <n-form-item
    v-for="attestation in userAttestations"
    :key="attestation.id"
    :label="attestation.text"
  >
    <n-input
      placeholder="Enter the statement above"
      :status="attestation.validationStatus"
      aria-autocomplete="off"
      autocomplete="off"
      @input="handleInput(attestation.text, $event)"
      @paste.prevent
    />
  </n-form-item>
</template>
