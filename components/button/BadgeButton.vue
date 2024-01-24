<script setup lang="ts">
const _props = defineProps({
  type: {
    required: true,
    type: Array,
  },
});

function getIconName(identifier: object) {
  // Return the appropriate icon name based on the identifier
  if (identifier.nameIdentifierScheme === "ORCID") {
    return "simple-icons:orcid";
  } else if (identifier.nameIdentifierScheme === "ROR") {
    return "academicons:ror";
  } else if (identifier.nameIdentifierScheme === "GRID") {
    return "grid-icon";
  }
}

function getIconColor(identifier: object) {
  // Function implementation
  // Return the appropriate icon color based on the identifier
  if (identifier.nameIdentifierScheme === "ORCID") {
    return "#a6ce39";
  } else if (identifier.nameIdentifierScheme === "ROR") {
    return "#53baa1";
  } else if (identifier.nameIdentifierScheme === "GRID") {
    return "red";
  }
}

function directToIdentifierPage(identifier: object) {
  const url = identifier.nameIdentifierValue.includes("http")
    ? identifier.nameIdentifierValue
    : `${identifier.schemeURI}/${identifier.nameIdentifierValue}`;

  window.open(url, "_blank");
}
</script>

<template>
  <div
    v-for="(item, index) in _props.type"
    :key="index"
    class="flex w-auto flex-row"
  >
    <n-button
      text
      class="rounded-full p-1 transition-all hover:!bg-cyan-100"
      type="info"
      @click="directToIdentifierPage(item)"
    >
      <Icon :name="getIconName(item)" :color="getIconColor(item)" :size="20" />
    </n-button>
  </div>
</template>
