<script setup lang="ts">
const devMode = process.env.NODE_ENV === "development";

const navCollapsed = ref(false);

const links = [
  {
    title: "Find Datasets",

    href: "/",
  },
  {
    title: "Share datasets",

    href: "/submit",
  },
  {
    title: "Documentation",

    href: "https://docs.fairhub.io",
  },
  {
    title: "Contact",

    href: "/contact",
  },
];
</script>

<template>
  <div
    class="relative mx-auto flex h-screen w-full flex-col"
    :class="{ 'debug-screens': devMode }"
  >
    <header>
      <nav class="border-b border-gray-200 bg-white px-4 py-2.5 lg:px-6">
        <div class="mx-auto flex w-full max-w-screen-xl justify-between">
          <div class="flex justify-start">
            <NuxtLink
              to="/"
              class="flex flex-row items-center justify-start space-x-2"
            >
              <span
                class="bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-2xl font-extrabold text-transparent"
              >
                FAIRhub
              </span>
            </NuxtLink>
          </div>

          <button
            data-collapse-toggle="navbar-default"
            type="button"
            class="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 lg:hidden dark:text-gray-400"
            aria-controls="navbar-default"
            aria-expanded="false"
            @click="navCollapsed = !navCollapsed"
          >
            <span class="sr-only">Open main menu</span>

            <svg
              class="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <div class="hidden w-full items-center justify-end lg:flex lg:w-auto">
            <ul
              class="mt-4 flex flex-col font-medium lg:mt-0 lg:flex-row lg:space-x-8"
            >
              <NuxtLink
                v-for="link in links"
                :key="link.href"
                :to="link.href"
                class="flex items-center justify-center border-b border-gray-100 px-3 py-2 text-gray-700 transition-all hover:bg-gray-50 hover:text-cyan-500 lg:border-0 lg:p-0 lg:hover:bg-transparent"
                exact-active-class="text-sky-500"
                :target="link.href.startsWith('http') ? '_blank' : '_self'"
              >
                <p>{{ link.title }}</p>

                <Icon
                  v-if="link.href.startsWith('http')"
                  name="mdi:open-in-new"
                  class="ml-1"
                />
              </NuxtLink>

              <ButtonAuthenticationTrigger
                class="flex items-center justify-center border-b border-gray-100 px-3 py-2 text-gray-700 transition-all hover:bg-gray-50 hover:text-cyan-500 lg:border-0 lg:p-0 lg:hover:bg-transparent"
                :show-login="false"
              />
            </ul>
          </div>

          <n-drawer
            v-model:show="navCollapsed"
            :height="250"
            placement="top"
            class="block lg:hidden"
          >
            <n-drawer-content
              closable
              :body-content-style="{
                padding: '0px',
              }"
            >
              <template #header>
                <NuxtLink
                  to="/"
                  class="flex flex-row items-center justify-start space-x-2"
                >
                  <span
                    class="bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-2xl font-extrabold text-transparent"
                  >
                    fairhub
                  </span>
                </NuxtLink>
              </template>

              <n-space vertical :size="[0, 0]">
                <NuxtLink
                  v-for="link in links"
                  :key="link.href"
                  :to="link.href"
                  class="flex items-center justify-center border-t border-gray-100 px-3 py-2 text-lg text-gray-700 transition-all hover:bg-gray-50 hover:text-cyan-500"
                  exact-active-class="text-sky-500"
                  :target="link.href.startsWith('http') ? '_blank' : '_self'"
                >
                  <p class="text-lg">{{ link.title }}</p>

                  <Icon
                    v-if="link.href.startsWith('http')"
                    name="mdi:open-in-new"
                    class="ml-1"
                  />
                </NuxtLink>
              </n-space>
            </n-drawer-content>
          </n-drawer>

          <!-- <div class="flex items-center justify-end space-x-3">
            <n-input-group>
              <n-input
                v-model:value="searchQuery"
                placeholder="Search all datasets"
                size="large"
                @keyup.enter="navigateToSearch"
              >
                <template #prefix>
                  <Icon name="mdi:magnify" />
                </template>
              </n-input>

              <n-button
                type="info"
                secondary
                size="large"
                :disabled="!searchQuery"
              >
                <template #icon>
                  <Icon name="mdi:database-search" />
                </template>
                Search
              </n-button>
            </n-input-group>

            <nuxt-link v-if="!loggedIn" to="/auth/register">
              <n-button color="black" size="large"> Get started </n-button>
            </nuxt-link>

            <UiProfileDropdown />

            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              class="ml-1 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 lg:hidden"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>

              <svg
                class="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>

              <svg
                class="hidden h-6 w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div> -->
        </div>
      </nav>
    </header>

    <slot />
  </div>
</template>
