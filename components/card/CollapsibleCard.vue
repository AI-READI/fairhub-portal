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

const slots = useSlots();

const collapseContent = ref(false);

onBeforeMount(() => {
  collapseContent.value = props.collapse;
});

const toggleCollapse = () => {
  collapseContent.value = !collapseContent.value;
};
</script>

<template>
  <div class="border border-slate-100 bg-white px-6 pb-1 pt-6 shadow-md">
    <div class="mb-6 flex justify-between">
      <div class="text-xl font-semibold leading-9">{{ title }}</div>

      <div class="flex items-center">
        <slot name="header-extra"></slot>

        <n-button
          text
          class="pl-5 text-3xl"
          type="info"
          @click="toggleCollapse"
        >
          <Icon name="fluent:arrow-minimize-vertical-24-filled" />
        </n-button>
      </div>
    </div>

    <n-collapse-transition :show="collapseContent">
      <!-- <n-divider class="!mb-0" /> -->

      <div class="border-t-2 py-7" :bordered="bordered">
        <slot></slot>
      </div>
    </n-collapse-transition>

    <div>
      <slot name="action"></slot>
    </div>
  </div>
</template>
