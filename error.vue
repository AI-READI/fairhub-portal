<script setup lang="ts"></script>

<template>
  <main class="flex h-screen w-full items-center bg-gray-100 px-12 py-12">
    <div
      class="container flex flex-col items-center justify-center px-5 text-gray-700 md:flex-row"
    >
      <div class="flex max-w-md flex-col space-y-4">
        <div class="font-dark text-5xl font-bold">404</div>

        <p class="text-2xl font-light leading-normal md:text-3xl">
          Sorry we couldn't find this page.
        </p>

        <p class="mb-8">
          But dont worry, you can find plenty of other things on our homepage.
        </p>

        <NuxtLink to="/" class="w-full">
          <button
            class="focus:shadow-outline-blue inline w-full rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none active:bg-blue-600"
          >
            back to homepage
          </button>
        </NuxtLink>
      </div>

      <div class="max-w-lg">
        <img src="/images/404/404.svg" alt="404" />
      </div>
    </div>
  </main>
</template>
