// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  alias: {},
  app: {
    head: {
      title: "FAIRhub Data Portal",
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
      ],
      script: [
        {
          async: true,
          "data-website-id":
            process.env.NUXT_SITE_ENV === "production"
              ? "aba76571-843e-4b92-91df-da0af2b7aced"
              : "446adad1-ec44-4f9d-95c6-f7c295715b0a",
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
      AIREADI_STUDY_UUID: "0ef3f72c-1bf0-4ea1-b9d1-e727c02b0f6c",
      BASE_URL:
        process.env.NUXT_SITE_ENV === "dev"
          ? "http://localhost:3000"
          : process.env.NUXT_SITE_ENV === "staging"
            ? "https://staging.fairhub.io"
            : "https://fairhub.io",
      ENTRA_CONFIG: {
        authority:
          process.env.NUXT_SITE_ENV === "production"
            ? "https://aireadi.b2clogin.com/aireadi.onmicrosoft.com/B2C_1A_TRUSTFRAMEWORKBASE_CILOGON_IDP_RESTRICTED"
            : "https://aireadi.b2clogin.com/aireadi.onmicrosoft.com/B2C_1A_TrustFrameworkBase_STAGING",
        clientId:
          process.env.NUXT_SITE_ENV === "production"
            ? "d173c9cb-36ce-4c77-92f3-025e48f0e533"
            : "444bfea9-2fec-44ed-a4d7-767616afa9a3",
        forbiddenUri:
          process.env.NUXT_SITE_ENV === "dev"
            ? "http://localhost:3000/forbiddenlogin"
            : process.env.NUXT_SITE_ENV === "staging"
              ? "https://staging.fairhub.io/forbiddenlogin"
              : "https://fairhub.io/forbiddenlogin",
        knownAuthorities: ["aireadi.b2clogin.com", "https://cilogon.org"],
        logoutUri:
          process.env.NUXT_SITE_ENV === "dev"
            ? "http://localhost:3000/"
            : process.env.NUXT_SITE_ENV === "staging"
              ? "https://staging.fairhub.io/"
              : "https://fairhub.io/",
        redirectUri:
          process.env.NUXT_SITE_ENV === "dev"
            ? "http://localhost:3000/login"
            : process.env.NUXT_SITE_ENV === "staging"
              ? "https://staging.fairhub.io/login"
              : "https://fairhub.io/login",
      },
      FAIRHUB_API_URL:
        process.env.NUXT_SITE_ENV === "dev"
          ? "http://127.0.0.1:5000"
          : process.env.NUXT_SITE_ENV === "staging"
            ? "https://staging.api.fairhub.io"
            : "https://api.fairhub.io",
      // STUDY_RELEASE_TIMESTAMP:
      //   process.env.NUXT_SITE_ENV === "dev" ||
      //   process.env.NUXT_SITE_ENV === "staging"
      //     ? "1730950200" // Wed Nov 06 2024 19:30:00 GMT-0800 (Pacific Standard Time)
      //     : "1731060000", // Fri Nov 07 2024 02:00:00 GMT-0800 (Pacific Standard Time)
      UMAMI_SHARE_URL:
        process.env.NUXT_SITE_ENV === "dev" ||
        process.env.NUXT_SITE_ENV === "staging"
          ? "https://umami.aireadi.org/share/w56IOiviBTVZOlHu/staging.fairhub.io"
          : "https://umami.aireadi.org/share/o6trNZ4JS9gBri45/fairhub.io",
    },
    sessionPassword: "abcdefghijklmnopqrstuvwxyz0123456789",
  },

  schemaOrg: {
    identity: {
      name: "Fairhub",
      logo: "https://fairhub.io/logo.png",
      type: "Organization",
      url: "https://fairhub.io",
    },
  },

  site: {
    name: "FAIRhub Data Portal",
    indexable: true,
    url: "https://fairhub.io",
  },

  sitemap: {
    sources: ["/api/__sitemap__/urls"],
  },
});
