<script setup lang="ts">
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
</script>

<template>
  <p>
    Confirm the following statements by retyping each one in the provided input.
  </p>

  <n-form-item
    v-for="attestation in userAttestations"
    :key="attestation.id"
    :label="attestation.text"
  >
    <n-input
      placeholder="Enter the statement above"
      :status="attestation.validationStatus"
      @input="handleInput(attestation.text, $event)"
    />
  </n-form-item>
</template>
