<script setup lang="ts">
import DashboardModule from "~/components/dashboard/DashboardModule.vue";
import { useDashboardStore } from "~/stores/dashboard";

const { studyId } = defineProps({
  studyId: {
    required: true,
    type: String,
  },
});

const dashboardStore = useDashboardStore();
const isLoading = computed(() => dashboardStore.loading);
await useAsyncData("publicDashboardView", () =>
  dashboardStore.fetchPublicDashboardView(studyId),
); // Need to extract dashboardId from publicDashboardConnectors array
const publicDashboardView: Ref<DashboardView> = computed(
  () => dashboardStore.publicDashboardView,
);
</script>

<template>

    <TransitionFade>

      <LottieLoader v-if="isLoading" />

      <TransitionGroup v-else name="fade" tag="div" class="p-0">
        <div
          v-for="(module, module_index) in publicDashboardView.modules.filter(
            (module: DashboardModuleView) => module.selected && module.public,
          )"
          :key="module_index"
        >
          <div
            :id="module.id"
            class="rounded-lg border border-slate-300 bg-white shadow-lg"
          >
            <div class="px-6 py-7">
              <h3>{{ module.title }}</h3>

              <p class="pt-2">{{ module.subtitle }}<br /></p>

              <DashboardModule
                :key="module.id"
                :vrenderers="module.visualizations"
              />
            </div>
          </div>

          <n-divider />

        </div>

      </TransitionGroup>

    </TransitionFade>

</template>

<style></style>
