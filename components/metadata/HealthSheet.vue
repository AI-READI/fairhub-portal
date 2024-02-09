<script setup lang="ts">
import type { TokensList, Token } from "marked";
import sanitizeHtml from "sanitize-html";
import { lexer, parse } from "marked";
const _props = defineProps({
  healthsheet: {
    required: true,
    type: Object as PropType<Metadata["dataSheet"]>,
  },
});

const lexerArray = ref<TokensList | []>([]);
const healthsheet: Metadata["dataSheet"] = _props.healthsheet;
const sanitize = (html: string) => sanitizeHtml(html);

if (healthsheet) {
  lexerArray.value = lexer(healthsheet);
}

// Seperate the lexerArray into sections that will be used to create collapsible cards
const sectionTokens = lexerArray.value.filter(
  (token) => token.type === "heading"
);
const listTokens: any = lexerArray.value.filter(
  (token) => token.type === "list"
);

const cleanedSections = sectionTokens.map((section: Token) => {
  return section?.type === "heading" ? section.text : "";
});

const cleanedLists: string[] = [];
for (let i = 0; i < listTokens.length; i++) {
  if (listTokens[i]?.type === "list" && listTokens[i].items.length > 0) {
    for (let j = 0; j < listTokens[i].items.length; j++) {
      if (listTokens[i].items[j]?.tokens.length > 0) {
        // eslint-disable-next-line array-callback-return
        listTokens[i].items[j].tokens.map((l: Token) => {
          if (l?.type === "text") {
            cleanedLists.push(l.text);
          }
        });
      }
    }
  }
}

const motivationList = cleanedLists.slice(0, 8);
const compositionList = cleanedLists.slice(8, 42);
const collectionList = cleanedLists.slice(42, 68);
const cleaningList = cleanedLists.slice(68, 76);
const usesList = cleanedLists.slice(76, 88);
const distributionList = cleanedLists.slice(88, 102);
const maintenanceList = cleanedLists.slice(102);

function parseItem(item: string) {
  return sanitize(parse(item));
}
</script>

<template>
  <n-space
    v-for="(token, index) in cleanedSections"
    :key="index"
    vertical
    size="large"
  >
    <card-collapsible-card
      :id="token.lowercase"
      :title="token"
      :data-section-title="token"
      class="mb-4 shadow-md"
      :collapse="index !== 0"
    >
      <n-space v-if="token === 'Motivation'" vertical>
        <div v-for="(item, innerIndex) in motivationList" :key="innerIndex">
          <b v-if="innerIndex % 2 === 0">
            {{ String.fromCharCode(97 + innerIndex / 2) }}:
          </b>

          <b v-if="innerIndex % 2 === 0">
            {{
              item.substring(item.indexOf("**") + 2, item.lastIndexOf("**"))
            }}</b
          >
          <!-- eslint-disable vue/no-v-html -->
          <p v-else class="mb-3 ml-4" v-html="parseItem(item)"></p>
          <!-- eslint-enable vue/no-v-html -->
        </div>
      </n-space>

      <n-space v-if="token === 'Composition'" vertical>
        <div v-for="(item, innerIndex) in compositionList" :key="innerIndex">
          <b v-if="innerIndex % 2 === 0">
            {{ String.fromCharCode(97 + innerIndex / 2) }}:
          </b>

          <b v-if="innerIndex % 2 === 0">
            {{
              item.substring(item.indexOf("**") + 2, item.lastIndexOf("**"))
            }}</b
          >
          <!-- eslint-disable vue/no-v-html -->
          <p v-else class="mb-3 ml-4" v-html="parseItem(item)"></p>
          <!-- eslint-enable vue/no-v-html -->
        </div>
      </n-space>

      <n-space v-if="token === 'Collection'" vertical>
        <div v-for="(item, innerIndex) in collectionList" :key="innerIndex">
          <b v-if="innerIndex % 2 === 0">
            {{ String.fromCharCode(97 + innerIndex / 2) }}:
          </b>

          <b v-if="innerIndex % 2 === 0">
            {{
              item.substring(item.indexOf("**") + 2, item.lastIndexOf("**"))
            }}</b
          >
          <!-- eslint-disable vue/no-v-html -->
          <p v-else class="mb-3 ml-4" v-html="parseItem(item)"></p>
          <!-- eslint-enable vue/no-v-html -->
        </div>
      </n-space>

      <n-space v-if="token === 'Preprocessing / Cleaning / Labeling'" vertical>
        <div v-for="(item, innerIndex) in cleaningList" :key="innerIndex">
          <b v-if="innerIndex % 2 === 0">
            {{ String.fromCharCode(97 + innerIndex / 2) }}:
          </b>

          <b v-if="innerIndex % 2 === 0">
            {{
              item.substring(item.indexOf("**") + 2, item.lastIndexOf("**"))
            }}</b
          >
          <!-- eslint-disable vue/no-v-html -->
          <p v-else class="mb-3 ml-4" v-html="parseItem(item)"></p>
          <!-- eslint-enable vue/no-v-html -->
        </div>
      </n-space>

      <n-space v-if="token === 'Uses'" vertical>
        <div v-for="(item, innerIndex) in usesList" :key="innerIndex">
          <b v-if="innerIndex % 2 === 0">
            {{ String.fromCharCode(97 + innerIndex / 2) }}:
          </b>

          <b v-if="innerIndex % 2 === 0">
            {{
              item.substring(item.indexOf("**") + 2, item.lastIndexOf("**"))
            }}</b
          >
          <!-- eslint-disable vue/no-v-html -->
          <p v-else class="mb-3 ml-4" v-html="parseItem(item)"></p>
          <!-- eslint-enable vue/no-v-html -->
        </div>
      </n-space>

      <n-space v-if="token === 'Distribution'" vertical>
        <div v-for="(item, innerIndex) in distributionList" :key="innerIndex">
          <b v-if="innerIndex % 2 === 0">
            {{ String.fromCharCode(97 + innerIndex / 2) }}:
          </b>

          <b v-if="innerIndex % 2 === 0">
            {{
              item.substring(item.indexOf("**") + 2, item.lastIndexOf("**"))
            }}</b
          >
          <!-- eslint-disable vue/no-v-html -->
          <p v-else class="mb-3 ml-4" v-html="parseItem(item)"></p>
          <!-- eslint-enable vue/no-v-html -->
        </div>
      </n-space>

      <n-space v-if="token === 'Maintenance'" vertical>
        <div v-for="(item, innerIndex) in maintenanceList" :key="innerIndex">
          <b v-if="innerIndex % 2 === 0">
            {{ String.fromCharCode(97 + innerIndex / 2) }}:
          </b>

          <b v-if="innerIndex % 2 === 0">
            {{
              item.substring(item.indexOf("**") + 2, item.lastIndexOf("**"))
            }}</b
          >
          <!-- eslint-disable vue/no-v-html -->
          <p v-else class="mb-3 ml-4" v-html="parseItem(item)"></p>
          <!-- eslint-enable vue/no-v-html -->
        </div>
      </n-space>
    </card-collapsible-card>
  </n-space>
</template>

<style scoped>
*:deep() a {
  color: inherit;
  text-decoration: underline;
  font-weight: 500;
}
</style>
