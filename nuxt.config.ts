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
      script: [
        {
          async: true,
          "data-website-id": "446adad1-ec44-4f9d-95c6-f7c295715b0a",
          src: "https://umami.fairdataihub.org/mushroom",
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
  ],

  devtools: {
    enabled: true,
  },

  image: {},

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
    "@nuxtjs/device",
    "nuxt-headlessui",
    "dayjs-nuxt",
    "@nuxt/image",
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
    position: "bottom-right",
  },

  runtimeConfig: {
    entraClientSecret: "",
    public: {
      // Only values that are not sensitive should be set here
      // These values are accessible from both server and client side
      BASE_URL:
        process.env.NUXT_SITE_ENV === "dev"
          ? "http://localhost:6000"
          : process.env.NUXT_SITE_ENV === "staging"
            ? "https://staging.fairhub.io"
            : "https://fairhub.io",
      ENTRA_CONFIG: {
        authority:
          "https://aireadi.b2clogin.com/aireadi.onmicrosoft.com/B2C_1_userauth",
        clientId:
          process.env.NUXT_SITE_ENV === "dev"
            ? "444bfea9-2fec-44ed-a4d7-767616afa9a3"
            : "d173c9cb-36ce-4c77-92f3-025e48f0e533",
        knownAuthorities: ["aireadi.b2clogin.com"],
        redirectUri:
          process.env.NUXT_SITE_ENV === "dev"
            ? "http://localhost:3000/login"
            : "https://staging.fairhub.io/login",
      },
      FAIRHUB_API_URL:
        process.env.NUXT_SITE_ENV === "dev"
          ? "http://localhost:5000"
          : process.env.NUXT_SITE_ENV === "staging"
            ? "https://staging.api.fairhub.io"
            : "https://api.fairhub.io",
    },
    sessionPassword: "",
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
