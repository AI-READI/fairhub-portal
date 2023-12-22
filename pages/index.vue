<script setup lang="ts">
definePageMeta({
  layout: "public",
});
</script>

<template>
  <main>
    <div
      class="mb-4 flex items-center justify-center rounded-lg border bg-yellow-50 p-4 text-lg text-yellow-600"
      role="alert"
    >
      <svg
        class="mr-3 inline h-4 w-4 flex-shrink-0"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
        />
      </svg>

      <span class="sr-only">Info</span>

      <div><span class="font-medium">Warning!</span> Work in progress</div>
    </div>

    <section class="bg-white">
      <div
        class="mx-auto grid max-w-screen-xl px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0"
      >
        <div class="mr-auto place-self-center lg:col-span-7">
          <h1
            class="mb-4 max-w-2xl bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text py-2 text-4xl font-extrabold leading-none tracking-tight text-transparent md:text-5xl xl:text-6xl"
          >
            Your new home for AI ready data
          </h1>

          <p class="mb-6 max-w-2xl text-gray-500 md:text-lg lg:mb-8 lg:text-xl">
            Fairhub is a platform for sharing and discovering datasets and
            studies. It is designed to be a central hub for AI-ready data.
            <br />
            We are currently in beta and are looking for feedback.
          </p>

          <div class="flex w-max flex-col">
            <n-space>
              <n-input size="large" placeholder="Diabetes Salutogenesis">
                <template #prefix>
                  <Icon name="lets-icons:chat-search-fill" size="25" />
                </template>
              </n-input>

              <n-button
                type="primary"
                secondary
                size="large"
                icon-placement="right"
              >
                <template #icon>
                  <Icon name="mingcute:arrow-right-fill" size="25" />
                </template>
                Search
              </n-button>
            </n-space>

            <n-divider> or </n-divider>

            <n-space>
              <NuxtLink to="/datasets">
                <n-button type="info" size="large" secondary>
                  <template #icon>
                    <Icon name="solar:pin-list-bold-duotone" size="25" />
                  </template>
                  View all datasets
                </n-button>
              </NuxtLink>

              <n-button color="#FF4500" size="large" secondary>
                <template #icon>
                  <Icon name="fluent-mdl2:contact-list" size="25" />
                </template>
                View all studies
              </n-button>
            </n-space>
          </div>
        </div>

        <div class="hidden lg:col-span-5 lg:mt-0 lg:flex">
          <img src="/images/hero/research.webp" alt="mockup" />
        </div>
      </div>
    </section>
  </main>
</template>
