import type { Ref } from "vue";
import { toRaw } from "vue";
import { defineStore } from "pinia";
import type { DashboardView, DashboardModuleView } from "@/types/dashboard";
import { compileDashboardModules } from "@/modules/dashboard/compile";
// import { nuxtConfig } from "@/composables/config";

export const useDashboardStore = defineStore("dashboard", () => {
  // const baseURL: string = nuxtConfig().public.STAGING_FAIRHUB_API_URL;
  const baseURL: string = "https://staging.api.fairhub.io";
  const loading = ref(false);
  const configs: object = import.meta.glob(
    "@/modules/dashboard/config/modules/*.json",
    {
      eager: true,
    },
  );
  const charts: object = import.meta.glob(
    "@/modules/dashboard/lib/charts/*.js",
    {
      eager: true,
    },
  );
  const publicDashboardView: Ref<DashboardView> = ref({
    id: "",
    name: "",
    modules: [],
    public: false,
    redcap_id: "",
    redcap_pid: "",
    reports: [],
  });

  const fetchPublicDashboardView = async (studyId: string) => {
    loading.value = true;

    // Get Public Dashboard
    const response = await fetch(
      `${baseURL}/study/${studyId}/dashboard/public`,
      {
        method: "GET",
      },
    );
    if (!response.ok) {
      throw new Error("DashboardView GET not found");
    }

    // Extract Dashboard & Dashboard Modules
    const dashboardViewResponse = await response.json();
    const reports = toRaw(<DashboardModuleView[]>dashboardViewResponse.reports);
    const modules = toRaw(<DashboardModuleView[]>dashboardViewResponse.modules);
    dashboardViewResponse.modules = (await compileDashboardModules(
      configs,
      charts,
      modules,
      reports,
    )) as DashboardModuleView[];
    publicDashboardView.value = <DashboardView>dashboardViewResponse;
    loading.value = false;

    return publicDashboardView.value;
  };

  return {
    fetchPublicDashboardView,
    loading,
    publicDashboardView,
  };
});
