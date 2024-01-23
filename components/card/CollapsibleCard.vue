<script setup lang="ts">
const props = defineProps({
  title: {
    default: "Card Title",
    type: String,
  },
  bordered: {
    default: true,
    type: Boolean,
  },
  collapse: {
    default: false,
    type: Boolean,
  },
});

const collapseContent = ref(false);

onBeforeMount(() => {
  collapseContent.value = props.collapse;
});

const toggleCollapse = () => {
  collapseContent.value = !collapseContent.value;
};
</script>

<template>
  <div class="rounded-lg border border-slate-300 bg-white shadow-lg">
    <div
      class="x flex items-center justify-between rounded-lg px-6 py-3 transition-all"
      :class="{
        'bg-white': !collapseContent,
        'bg-slate-50/50': collapseContent,
      }"
    >
      <div class="text-xl font-bold">{{ title }}</div>

      <div class="flex items-center">
        <slot name="header-extra"></slot>

        <n-button
          text
          class="rounded-full p-2 text-3xl transition-all hover:!bg-cyan-100"
          type="info"
          @click="toggleCollapse"
        >
          <Icon name="fluent:arrow-minimize-vertical-24-filled" />
        </n-button>
      </div>
    </div>

    <n-collapse-transition :show="collapseContent">
      <!-- <n-divider class="!mb-0" /> -->

      <div class="border-t-2 px-6 py-7" :bordered="bordered">
        <slot></slot>
      </div>
    </n-collapse-transition>

    <div>
      <slot name="action"></slot>
    </div>
  </div>
</template>
