<script setup lang="ts">
const _props = defineProps({
  type: {
    required: true,
    type: Array,
  },
});

function getIconName(identifier) {
  // Return the appropriate icon name based on the identifier
  if (identifier.nameIdentifierScheme === "ORCID") {
    return "simple-icons:orcid";
  } else if (identifier.nameIdentifierScheme === "ROR") {
    return "academicons:ror";
  } else if (identifier.nameIdentifierScheme === "GRID") {
    return "grid-icon";
  }
}

function getIconColor(identifier) {
  // Return the appropriate icon color based on the identifier
  if (identifier.nameIdentifierScheme === "ORCID") {
    return "#a6ce39";
  } else if (identifier.nameIdentifierScheme === "ROR") {
    return "#53baa1";
  } else if (identifier.nameIdentifierScheme === "GRID") {
    return "red";
  }
}

const hoverColors = {
  GRID: "#0000ff",
  ORCID: "#ff0000",
  ROR: "#00ff00",
};

const isHovered = ref(false);

function handleIconHover(isHovered) {
  isHovered.value = !isHovered;
}

function getHoverColor(item) {
  if (isHovered.value) {
    return hoverColors[item.nameIdentifierScheme];
  } else {
    return getIconColor(item);
  }
}

// console.log(_props.type);
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
      @click="directToIdentifierPage"
    >
      <Icon :name="getIconName(item)" :color="getHoverColor(item)" :size="20" />
    </n-button>
  </div>
</template>
