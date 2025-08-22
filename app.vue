<template>
  <NaiveConfig :theme-config="themeConfig">
    <Notivue v-slot="item">
      <NotivueSwipe :item="item">
        <Notifications :item="item" :theme="pastelTheme" />
      </NotivueSwipe>
    </Notivue>

    <NuxtLoadingIndicator color="#be185d" :height="5" />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </NaiveConfig>
</template>

<script setup lang="ts">
import { pastelTheme } from "notivue";
import type { ThemeConfig } from "@bg-dev/nuxt-naiveui";

const themeConfig: ThemeConfig = {
  dark: {}, // Theme options applied on dark mode
  light: {}, // Theme options applied on light mode
  mobile: {}, // Theme options applied on mobile only
  mobileOrTablet: {}, // Theme options applied on mobile and tablet
  shared: {
    Cascader: { optionCheckMarkColor: "#0284c7" },
    common: {
      primaryColor: "#0284c7",
      primaryColorHover: "#0ea5e9",
      primaryColorPressed: "#0369a1",
      primaryColorSuppl: "#0ea5e9",
    },
    Spin: {
      color: "#0284c7",
    },
    Tree: {
      fontSize: "17px",
    },
  }, // Common theme options
};

useHead({
  title: "FAIRhub",
  bodyAttrs: {
    class: "test",
  },
  link: [
    { href: "/favicon.ico", rel: "icon", type: "image/x-icon" },
    {
      href: "/apple-touch-icon.png",
      rel: "apple-touch-icon",
      sizes: "180x180",
    },
    {
      href: "/favicon-16x16.png",
      rel: "icon",
      sizes: "16x16",
      type: "image/png",
    },
    {
      href: "/favicon-32x32.png",
      rel: "icon",
      sizes: "32x32",
      type: "image/png",
    },
    {
      color: "#5bbad5",
      href: "/safari-pinned-tab.svg",
      rel: "mask-icon",
    },
    {
      href: "/site.webmanifest",
      rel: "manifest",
    },
  ],
  meta: [
    {
      name: "description",
      content:
        "FAIRhub is a repository for your AI ready data. It is a place to store, share and discover datasets, models and workflows.",
    },
    {
      name: "msapplication-TileColor",
      content: "#2b5797",
    },
    {
      name: "theme-color",
      content: "#ffffff",
    },
  ],
  script: [
    {
      children: JSON.stringify({
        "@context": {
          "@vocab": "https://schema.org/",
          dcterms: "http://purl.org/dc/terms/",
          pav: "http://purl.org/pav/",
          prov: "http://www.w3.org/ns/prov#",
          xsd: "http://www.w3.org/2001/XMLSchema#",
        },
        "@id": "https://doi.org/10.60775/fairhub.1.v2",
        "@type": "Dataset",

        conformsTo: [
          {
            name: "ClinicalTrials.gov Protocol Data Element Definitions.",
            "@type": "CreativeWork",
            url: "http://clinicaltrials.gov/prs",
          },
        ],

        "dcterms:isVersionOf": { "@id": "https://doi.org/10.60775/fairhub.1" },
        "pav:createdBy": {
          name: "AI-READI Consortium",
          "@type": "Organization",
        },
        "pav:version": "2.0",
        "prov:generatedAtTime": "2024-11-08",
        "prov:used": {
          name: "ClinicalTrials.gov Protocol Data Element Definitions",
          "@id": "http://clinicaltrials.gov/prs",
          "@type": "CreativeWork",
        },
        "prov:wasAttributedTo": {
          name: "AI-READI Consortium",
          "@type": "Organization",
        },

        "prov:wasDerivedFrom": {
          name: "FAIRhub Dataset v1",
          "@id": "https://doi.org/10.60775/fairhub.1",
          "@type": "Dataset",
        },
      }),
      type: "application/ld+json",
    },
  ],
});

useSeoMeta({
  title: "FAIRhub",
  description:
    "FAIRhub is a repository for your AI ready data. It is a place to store, share and discover datasets",
  ogDescription:
    "FAIRhub is a repository for your AI ready data. It is a place to store, share and discover datasets",
  ogImage:
    "https://kalai.fairdataihub.org/api/generate?app=fairhub&title=Make%20breakthrough%20discoveries%20with%20AI-ready%20datasets&org=ai-readi&description=FAIRhub%20is%20a%20repository%20for%20your%20AI%20ready%20data.%20It%20is%20a%20place%20to%20store%2C%20share%20and%20discover%20datasets",
  ogTitle: "FAIRhub",
  twitterCard: "summary_large_image",
});
</script>
