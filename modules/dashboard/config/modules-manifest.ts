import type { DashboardModuleConnector } from "@/types/DashboardModule";

/*
This Defines the Sort Order of The Modules in the Dashboard
*/

const DashboardModulesManifest: DashboardModuleConnector[] = [
  /*
Note for Pilot

- These live module config objects are a subset of
the commented modules below them.

- As such, I've duplicated the subset. If you
want to make all modules available, uncomment,
then delete the three ones that are currently live

*/

  {
    id: "survey-completion-status",
    name: "Survey Completion Status",
    available: true,
    public: true,
    report_key: "instrument-status",
    selected: false,
  },
  {
    id: "phenotype-recruitment",
    name: "Phenotype Recruitment Counts",
    available: true,
    public: true,
    report_key: "participant-values",
    selected: false,
  },
  {
    id: "phenotype-recruitment-by-phase",
    name: "Phenotype Recruitment Counts by Phase",
    available: true,
    public: true,
    report_key: "participant-values",
    selected: false,
  },
  {
    id: "phenotype-race-by-phase",
    name: "Phenotype & Self-Reported Race by Phase",
    available: true,
    public: true,
    report_key: "participant-values",
    selected: false,
  },

/*
Unlisted Modules
*/

  // {
  //   id: "phenotype-recruitment-by-site",
  //   name: "Phenotype Recruitment Counts by Site",
  //   available: true,
  //   public: false,
  //   report_key: "participant-values",
  //   selected: false,
  // },
  // {
  //   id: "race-recruitment-by-phase",
  //   name: "Self-Reported Race Recruitment Counts by Phase",
  //   available: true,
  //   public: true,
  //   report_key: "participant-values",
  //   selected: false,
  // },
  // {
  //   id: "race-recruitment",
  //   name: "Self-Reported Race Recruitment Counts",
  //   available: false,
  //   public: true,
  //   report_key: "participant-values",
  //   selected: false,
  // },
  // {
  //   id: "race-recruitment-by-site",
  //   name: "Self-Reported Race Recruitment Counts by Site",
  //   available: true,
  //   public: false,
  //   report_key: "participant-values",
  //   selected: false,
  // },
  // {
  //   id: "sex-recruitment",
  //   name: "Self-Reported Sex Recruitment Counts",
  //   available: false,
  //   public: true,
  //   report_key: "participant-values",
  //   selected: false,
  // },
  // {
  //   id: "sex-recruitment-by-site",
  //   name: "Self-Reported Sex Recruitment Counts by Site",
  //   available: true,
  //   public: false,
  //   report_key: "participant-values",
  //   selected: false,
  // },
  // {
  //   id: "phenotype-sex-by-site",
  //   name: "Phenotype & Self-Reported Sex by Site",
  //   available: true,
  //   public: false,
  //   report_key: "participant-values",
  //   selected: false,
  // },
  // {
  //   id: "race-sex-by-site",
  //   name: "Self-Reported Race & Self-Reported Sex by Site",
  //   available: true,
  //   public: false,
  //   report_key: "participant-values",
  //   selected: false,
  // },
  // {
  //   id: "phenotype-race-by-sex",
  //   name: "Phenotype & Self-Reported Race by Self-Reported Sex",
  //   available: true,
  //   public: true,
  //   report_key: "participant-values",
  //   selected: false,
  // },
  // {
  //   id: "phenotype-sex-by-race",
  //   name: "Phenotype & Self-Reported Sex by Self-Reported Race",
  //   available: true,
  //   public: true,
  //   report_key: "participant-values",
  //   selected: false,
  // },
  // {
  //   id: "race-sex-by-phenotype",
  //   name: "Self-Reported Race & Self-Reported Sex by Phenotype",
  //   available: false,
  //   public: true,
  //   report_key: "participant-values",
  //   selected: false,
  // },
  // {
  //   id: "race-phenotype-by-sex",
  //   name: "Self-Reported Race & Phenotype by Self-Reported Sex",
  //   available: false,
  //   public: true,
  //   report_key: "participant-values",
  //   selected: false,
  // },
  // {
  //   id: "race-phenotype-by-phase",
  //   name: "Self-Reported Race & Phenotype by Phase",
  //   available: true,
  //   public: true,
  //   report_key: "participant-values",
  //   selected: false,
  // },
  // {
  //   id: "race-sex-by-phase",
  //   name: "Self-Reported Race & Self-Reported Sex by Phase",
  //   available: true,
  //   public: true,
  //   report_key: "participant-values",
  //   selected: false,
  // },
  // {
  //   id: "sex-phenotype-by-race",
  //   name: "Self-Reported Sex & Phenotype by Self-Reported Race",
  //   available: true,
  //   public: true,
  //   report_key: "participant-values",
  //   selected: false,
  // },
  // {
  //   id: "sex-race-by-phenotype",
  //   name: "Self-Reported Sex & Self-Reported Race by Phenotype",
  //   available: true,
  //   public: true,
  //   report_key: "participant-values",
  //   selected: false,
  // },
  // {
  //   id: "phenotype-site-by-sex",
  //   name: "Phenotype & Site by Self-Reported Sex",
  //   available: true,
  //   public: false,
  //   report_key: "participant-values",
  //   selected: false,
  // },
  // {
  //   id: "current-medications-by-site",
  //   name: "Current Medications By Site",
  //   available: true,
  //   public: false,
  //   report_key: "repeat-instrument",
  //   selected: false,
  // },
  // {
  //   id: "instrument-completion-status-by-site",
  //   name: "Instrument Completion Status by Site",
  //   available: false,
  //   public: false,
  //   report_key: "instrument-status",
  //   selected: false,
  // },
  // {
  //   id: "survey-completion-status-by-site",
  //   name: "Survey Completion Status by Site",
  //   available: true,
  //   public: false,
  //   report_key: "instrument-status",
  //   selected: false,
  // },
  // {
  //   id: "device-collection-status-by-site",
  //   name: "Device Collection Status By Site",
  //   available: false,
  //   public: false,
  //   report_key: "instrument-status",
  //   selected: false,
  // },
  // {
  //   id: "recruitment-operations-status-by-site",
  //   name: "Recruitment Operations Status by Site",
  //   available: true,
  //   public: false,
  //   report_key: "instrument-status",
  //   selected: false,
  // },
];

export { DashboardModulesManifest };
