<script setup lang="ts">
const route = useRoute();

const badIdPType = route.query.type;
</script>

<template>
  <main class="flex h-full w-full flex-col items-center px-12 py-12">
    <div class="font-dark text-5xl font-bold">403: Forbidden</div>

    <p class="text-2xl font-light leading-normal md:text-3xl">
      We're sorry, but the IdP you have used is not permitted to access project
      resources.
    </p>

    <div v-if="badIdPType === 'adversarial'">
      <p class="text-2xl font-light leading-normal md:text-3xl">
        You have been directed to this page because you have authenticated using
        an Identity Provider that is based in a country that has been designated
        by the U.S. Department of Commerce as a United States Foreign Adversary.
      </p>
    </div>

    <div v-else>
      <p class="text-2xl font-light leading-normal md:text-3xl">
        The Identity Provider you have utilized has not been verified by the
        Data Access committee to provide sufficiently secure user attestation.
      </p>
    </div>

    <p class="md:text-3xl">
      If you believe you were directed here mistakenly, please contact the
      <a href="mailto:aireadi-dac@ohsu.edu">Data Access Committee</a>.
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
