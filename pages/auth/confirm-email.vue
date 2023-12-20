<script setup lang="ts">
definePageMeta({
  layout: "no-header",
});

const user = useSupabaseUser();

watchEffect(() => {
  if (user.value) {
    if (user.value.email_confirmed_at) {
      return navigateTo("/dashboard");
    }
  }
});
</script>

<template>
  <main class="flex h-full w-full items-center justify-center">
    <section
      class="container flex h-full w-full max-w-screen-lg flex-row items-center justify-start"
    >
      <div class="mx-12">
        <ClientOnly>
          <Vue3Lottie
            animation-link="https://assets7.lottiefiles.com/packages/lf20_e1y24wm2.json"
            :height="300"
            :width="300"
          />
        </ClientOnly>
      </div>

      <div class="mx-12 flex w-full flex-1 flex-grow-[2] flex-col">
        <h1>Verification link sent!</h1>

        <p class="mb-4 mt-4 text-lg">
          We've sent a verification link to your email address. Please click the
          link in the email to verify your account.
        </p>

        <p class="text-base text-slate-500">
          If you don't see the email, please check your spam folder. If you
          still don't see the email, please contact us at
          <a href="mailto:help@scholarstack.io"> help@scholarstackmvp.io </a>
        </p>
      </div>
    </section>
  </main>
</template>
