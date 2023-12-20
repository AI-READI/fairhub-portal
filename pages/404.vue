<script setup lang="ts"></script>

<template>
  <main class="flex h-full w-full flex-col items-center px-12 py-12">
    <div class="font-dark text-5xl font-bold">404</div>

    <p class="text-2xl font-light leading-normal md:text-3xl">
      Sorry we couldn't find this page.
    </p>

    <p class="mb-8">
      But dont worry, you can find plenty of other things on our homepage.
    </p>

    <a href="/">
      <button
        class="focus:shadow-outline-blue inline rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none active:bg-blue-600"
      >
        back to homepage
      </button>
    </a>
  </main>
</template>
