<script setup lang="ts">
const supabase = useSupabaseClient();

const devMode = process.env.NODE_ENV === "development";

const user = useSupabaseUser();

const loggedIn = computed(() => user.value);

console.log("User", user.value);

const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) console.log(error);

  navigateTo("/");
};
</script>

<template>
  <div
    class="relative mx-auto flex h-screen w-full flex-col"
    :class="{ 'debug-screens': devMode }"
  >
    <header>
      <nav class="border-b border-gray-200 bg-white px-4 py-2.5 lg:px-6">
        <div
          class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between"
        >
          <NuxtLink
            to="/"
            class="flex flex-row items-center justify-start space-x-2"
          >
            <img src="/logo/logo.svg" alt="Logo" class="mr-2 w-10" />

            <span class="text-xl font-bold"> data.fairhub </span>
          </NuxtLink>

          <div class="flex items-center space-x-3 lg:order-2">
            <nuxt-link v-if="!loggedIn" to="/auth/login">
              <n-button size="large">
                <span> Log in </span>
              </n-button>
            </nuxt-link>

            <nuxt-link v-if="!loggedIn" to="/auth/register">
              <n-button color="black" size="large"> Get started </n-button>
            </nuxt-link>

            <nuxt-link v-if="loggedIn" to="/dashboard">
              <n-button color="black" size="large"> Dashboard </n-button>
            </nuxt-link>

            <n-button @click="logout"> Logout </n-button>

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
          </div>

          <div
            id="mobile-menu-2"
            class="hidden w-full items-center justify-between lg:order-1 lg:flex lg:w-auto"
          >
            <ul
              class="mt-4 flex flex-col font-medium lg:mt-0 lg:flex-row lg:space-x-8"
            >
              <li>
                <a
                  href="#"
                  class="block border-b border-gray-100 py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-50 lg:border-0 lg:p-0 lg:hover:bg-transparent lg:hover:text-primary-700"
                >
                  Company
                </a>
              </li>

              <li>
                <a
                  href="#"
                  class="block border-b border-gray-100 py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-50 lg:border-0 lg:p-0 lg:hover:bg-transparent lg:hover:text-primary-700"
                >
                  Marketplace
                </a>
              </li>

              <li>
                <a
                  href="#"
                  class="block border-b border-gray-100 py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-50 lg:border-0 lg:p-0 lg:hover:bg-transparent lg:hover:text-primary-700"
                >
                  Features
                </a>
              </li>

              <li>
                <a
                  href="#"
                  class="block border-b border-gray-100 py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-50 lg:border-0 lg:p-0 lg:hover:bg-transparent lg:hover:text-primary-700"
                >
                  Team
                </a>
              </li>

              <li>
                <a
                  href="#"
                  class="block border-b border-gray-100 py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-50 lg:border-0 lg:p-0 lg:hover:bg-transparent lg:hover:text-primary-700"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

    <slot />
  </div>
</template>
