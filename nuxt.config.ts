// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  alias: {},

  app: {
    head: {
      title: "Scholar Stack",
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
  ],

  devtools: {
    enabled: true,
  },

  imports: {
    dirs: ["stores"],
  },

  modules: [
    "@nuxtjs/supabase",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "notivue/nuxt",
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

  nitro: {},

  notivue: {
    // Options
  },

  serverMiddleware: [
    {
      handler: "~/server/api/index.ts",
      path: "/api",
    },
  ],
});
