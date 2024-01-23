<script setup lang="ts"></script>

<template>
  <main class="h-screen overflow-auto px-4">
    <section class="bg-white">
      <div class="relative overflow-hidden">
        <div class="mx-auto max-w-[85rem] px-4 pb-10 pt-24 sm:px-6 lg:px-8">
          <div class="mx-auto mt-5 max-w-2xl text-center">
            <h1
              class="block text-4xl font-bold text-gray-800 md:text-5xl lg:text-6xl"
            >
              <span
                class="bg-gradient-to-tl from-sky-400 to-emerald-400 bg-clip-text text-transparent"
              >
                Submit your own datasets</span
              >
            </h1>
          </div>

          <div class="mx-auto mt-5 max-w-3xl text-center">
            <p class="text-lg text-gray-600">
              Our study management platform is designed to be easy to use and to
              help you to make your data FAIR and AI ready.
            </p>
          </div>

          <div class="mt-8 flex justify-center gap-3">
            <NuxtLink to="https://staging.app.fairhub.io" target="__blank">
              <n-button size="large" type="info" secondary>
                <template #icon>
                  <Icon name="fluent:arrow-right-24-filled" />
                </template>
                Get started
              </n-button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
