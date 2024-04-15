<script setup lang="ts">
const props = defineProps({
  title: {
    default: "Card Title",
    type: String,
  },
  collapse: {
    default: true,
    type: Boolean,
  },
});

const contentCollapsed = ref(false);

onBeforeMount(() => {
  contentCollapsed.value = props.collapse;
});

const toggleCollapse = () => {
  contentCollapsed.value = !contentCollapsed.value;
};
</script>

<template>
  <div class="rounded-lg border border-slate-300 bg-white shadow-lg">
    <div
      class="x flex items-center justify-between rounded-lg px-6 py-3 transition-all"
      :class="{
        'bg-white': contentCollapsed,
        'bg-slate-50/50': !contentCollapsed,
      }"
    >
      <h2 class="text-xl">{{ title }}</h2>

      <div class="flex items-center">
        <slot name="header-extra"></slot>

        <n-button
          text
          class="rounded-full p-2 text-3xl transition-all hover:!bg-cyan-100"
          type="info"
          @click="toggleCollapse"
        >
          <Icon
            v-if="contentCollapsed"
            name="fluent:arrow-maximize-vertical-24-filled"
          />

          <Icon v-else name="fluent:arrow-minimize-vertical-24-filled" />
        </n-button>
      </div>
    </div>

    <n-collapse-transition :show="!contentCollapsed">
      <!-- <n-divider class="!mb-0" /> -->

      <div class="border-t-2 px-6 py-7">
        <slot></slot>
      </div>
    </n-collapse-transition>

    <div>
      <slot name="action"></slot>
    </div>
  </div>
</template>
