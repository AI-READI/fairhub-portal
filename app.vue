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
});

useSeoMeta({
  title: "FAIRhub",
  description:
    "FAIRhub is a repository for your AI ready data. It is a place to store, share and discover datasets, models and workflows",
  ogDescription:
    "FAIRhub is a repository for your AI ready data. It is a place to store, share and discover datasets, models and workflows",
  ogImage:
    "https://kalai.fairdataihub.org/api/generate?app=fairhub&title=Make%20breakthrough%20discoveries%20with%20AI-ready%20datasets&org=ai-readi&description=FAIRhub%20is%20a%20repository%20for%20your%20AI%20ready%20data.%20It%20is%20a%20place%20to%20store%2C%20share%20and%20discover%20datasets%2C%20models%20and%20workflows",
  ogTitle: "FAIRhub",
  twitterCard: "summary_large_image",
});
</script>
