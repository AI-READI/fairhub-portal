// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  alias: {},

  app: {
    head: {
      title: "Fairhub Portal",
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
      ],
    },
    layoutTransition: { name: "layout", mode: "out-in" },
    pageTransition: { name: "page", mode: "out-in" },
  },

  css: [
    "@/assets/css/tailwind.css",
    "notivue/notifications.css",
    "notivue/animations.css",
    "vue-json-pretty/lib/styles.css",
    "vue-json-viewer/style.css",
  ],

  devtools: {
    enabled: true,
  },

  imports: {
    dirs: ["stores"],
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "notivue/nuxt",
    "@nuxtjs/sitemap",
    "nuxt-simple-robots",
    "nuxt-schema-org",
    "nuxt-link-checker",
    "nuxt-headlessui",
    "dayjs-nuxt",
    "nuxt-lodash",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Inter: true,
        },
      },
    ],
    "@nuxt/devtools",
    "@bg-dev/nuxt-naiveui",
    "nuxt-icon", // icons are found here: https://icones.js.org/
  ],

  naiveui: {
    colorModePreference: "light",
    iconSize: 18,
    themeConfig: {},
  },

  nitro: {
    azure: {
      config: {
        platform: {
          apiRuntime: "node:18",
        },
      },
    },
    preset: "azure",
  },

  notivue: {
    // Options
  },

  schemaOrg: {
    identity: {
      name: "Fairhub",
      logo: "https://staging.fairhub.io/logo.png",
      type: "Organization",
      url: "https://staging.fairhub.io",
    },
  },

  site: {
    name: "Fairhub Portal",
    indexable: false,
    url: "https://staging.fairhub.io",
  },

  sitemap: {
    sources: ["/api/__sitemap__/urls"],
  },
});
