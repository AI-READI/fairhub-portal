<script setup lang="ts">
// whether the user has agreed with all statements
const model = defineModel<boolean | null>({ default: null });

const researchMethodsSelection = ref<boolean | null>(null);
const humanResearchEthicsSelection = ref<boolean | null>(null);
const aiMlEthicsSelection = ref<boolean | null>(null);

const allAnswered = computed(
  () =>
    researchMethodsSelection.value !== null &&
    humanResearchEthicsSelection.value !== null &&
    aiMlEthicsSelection.value !== null,
);

const allAccepted = computed(
  () =>
    researchMethodsSelection.value &&
    humanResearchEthicsSelection.value &&
    aiMlEthicsSelection.value,
);

const handleChange = () => {
  if (allAnswered.value) {
    model.value = allAccepted.value;
  }
};
</script>

<template>
  <p>I have received formal training in:</p>

  <n-form-item label="Research Methods">
    <n-radio-group
      v-model:value="researchMethodsSelection"
      name="research-methods"
    >
      <n-space>
        <n-radio :value="true" @change="handleChange">Yes</n-radio>

        <n-radio :value="false" @change="handleChange">No</n-radio>
      </n-space>
    </n-radio-group>
  </n-form-item>

  <n-form-item label="Human Research Ethics">
    <n-radio-group
      v-model:value="humanResearchEthicsSelection"
      name="human-research-ethics"
    >
      <n-space>
        <n-radio :value="true" @change="handleChange">Yes</n-radio>

        <n-radio :value="false" @change="handleChange">No</n-radio>
      </n-space>
    </n-radio-group>
  </n-form-item>

  <n-form-item label="AI/ML Ethical Practices">
    <n-radio-group
      v-model:value="aiMlEthicsSelection"
      name="ai-ml-ethical-practices"
    >
      <n-space>
        <n-radio :value="true" @change="handleChange">Yes</n-radio>

        <n-radio :value="false" @change="handleChange">No</n-radio>
      </n-space>
    </n-radio-group>
  </n-form-item>
</template>
