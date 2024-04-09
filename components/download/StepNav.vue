<script setup lang="ts">
import type { StepsProps } from "naive-ui";

const steps = [
  "Overview",
  "Log In",
  "Training",
  "Research Purpose",
  "License",
  "Select Data",
  "Submitted",
];

const props = defineProps({
  currentStep: {
    default: 1,
    type: Number as PropType<number>,
    validator: (step: number) => step >= 1 && step <= 7,
  },
});

const currentStatus = ref<StepsProps["status"]>("process");
</script>

<template>
  <div>
    <n-steps
      :current="props.currentStep"
      :status="currentStatus"
      size="small"
      class="hidden md:flex"
    >
      <n-step v-for="stepTitle in steps" :key="stepTitle" :title="stepTitle" />
    </n-steps>

    <h3 class="-mt-2 md:hidden">
      {{ steps[props.currentStep - 1] }}
      <span class="text-sm font-light">
        (Step {{ props.currentStep }} of {{ steps.length }})
      </span>
    </h3>
  </div>
</template>
