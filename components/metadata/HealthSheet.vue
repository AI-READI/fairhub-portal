<script setup lang="ts">
import { lexer, type TokensList } from "marked";
const _props = defineProps({
  healthsheet: {
    required: true,
    type: Object as PropType<Metadata["dataSheet"]>,
  },
});

const lexerArray = ref<TokensList | []>([]);
const healthsheet: Metadata["dataSheet"] = _props.healthsheet;

if (healthsheet) {
  lexerArray.value = lexer(healthsheet);
}

// Seperate the lexerArray into sections that will be used to create collapsible cards
const sectionTokens = lexerArray.value.filter(
  (token) => token.type === "heading"
);
const listTokens = lexerArray.value.filter((token) => token.type === "list");
const paragraphTokens = lexerArray.value.filter(
  (token) => token.type === "paragraph"
);

console.log(lexerArray);

console.log(sectionTokens);
console.log(listTokens);
console.log(paragraphTokens);

const cleanedSections = sectionTokens.map((section) => {
  return section.text;
});

const cleanedParagraphs = paragraphTokens.map((paragraph) => {
  const text = [];
  if (paragraph?.tokens.length > 0) {
    return paragraph.tokens.map((p) => {
      if (p?.type === "em") {
        return p.text;
      }
      return null; // or return a default value if needed
    });
  }
  return null; // or return a default value if needed
});

console.log(cleanedParagraphs);

console.log(cleanedSections);
</script>

<template>
  test
  <!-- <n-space
    v-for="(token, index) in lexerArray"
    :key="index"
    vertical
    size="large"
  >
    <card-collapsible-card
      id="healthsheet"
      title="Health Sheet"
      data-section-title="Health Sheet"
      class="mb-4 shadow-md"
      :collapse="false"
    ></card-collapsible-card>
  </n-space> -->
</template>
