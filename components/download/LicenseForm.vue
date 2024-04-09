<script setup lang="ts">
import type { InputInst } from "naive-ui";

defineProps<{
  license: string;
}>();

const model = defineModel<boolean>({ required: true });

const textareaRef = ref<InputInst | null>(null);

const licenseViewed = ref<boolean>(false);

const handleScroll = (e: Event) => {
  if (licenseViewed.value || !textareaRef.value?.textareaElRef) {
    return;
  }

  const target = textareaRef.value.textareaElRef;

  // consider the license fully scrolled if they have scrolled within 10 pixels of target.clientHeight
  // @see https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#determine_if_an_element_has_been_totally_scrolled
  const fullyScrolled =
    Math.abs(target.scrollHeight - target.clientHeight - target.scrollTop) <=
    10;

  if (fullyScrolled) {
    licenseViewed.value = true;
  }
};

onMounted(() => {
  if (textareaRef.value?.textareaElRef) {
    textareaRef.value.textareaElRef.addEventListener("scroll", handleScroll);
  }
});
</script>

<template>
  <div>
    <n-form-item label="Review the license below.">
      <n-input
        ref="textareaRef"
        type="textarea"
        rows="12"
        :value="license"
        @scroll="handleScroll"
        readonly
      >
      </n-input>
    </n-form-item>
    <n-checkbox
      v-model:checked="model"
      :disabled="!licenseViewed"
      class="mt-4"
      size="large"
    >
      I accept
    </n-checkbox>
  </div>
</template>
