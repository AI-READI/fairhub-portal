<script setup lang="ts">
const route = useRoute();

const badIdPType = route.query.type;
</script>

<template>
  <main class="flex h-full w-full flex-col items-center px-12 py-12">
    <div
      class="font-dark justify-center bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-5xl font-extrabold text-transparent"
    >
      403: Forbidden
    </div>

    <div class="flex flex-col items-center">
      <p class="text-center text-2xl font-light leading-normal md:text-3xl">
        Thank you for your request.
      </p>

      <div
        v-if="badIdPType === 'adversarial'"
        class="container mx-auto justify-center"
      >
        <p class="text-center text-2xl font-light leading-normal md:text-3xl">
          You have been directed to this page because you have authenticated
          using an Identity Provider that is based in a country that has been
          designated a country of concern by the US Government. At this time, we
          are awaiting clarification from the Department of Justice on the
          recent executive order on data sharing with countries of concern (<a
            href="https://www.whitehouse.gov/briefing-room/presidential-actions/2024/02/28/executive-order-on-preventing-access-to-americans-bulk-sensitive-personal-data-and-united-states-government-related-data-by-countries-of-concern/"
            >Details Here</a
          >). Please know that we are fully committed to maximizing the impact
          of the the data from our participants and data sharing but have been
          advised to for clarification.
        </p>
      </div>

      <div v-else class="flex flex-col items-center">
        <div>
          <p class="text-center text-2xl font-light leading-normal md:text-3xl">
            The Identity Provider you selected has not been verified by the
            AI-READI Data Access committee to provide sufficient user
            identification. If you authenticated using one of the following
            accounts:
          </p>
        </div>

        <div>
          <ul
            class="list justify-center text-2xl font-light leading-normal md:text-3xl"
          >
            <li>ORCID</li>

            <li>GitHub</li>

            <li>Google</li>

            <li>Amazon AWS</li>
          </ul>
        </div>

        <p class="text-center text-2xl font-light leading-normal md:text-3xl">
          You can re-attempt using a valid account from an academic instution or
          an eduGain-affiliated Identity Provider.
        </p>
      </div>

      <p class="text-center md:text-3xl">
        If you believe you were directed here mistakenly, please contact the
        <a href="mailto:aireadi-dac@ohsu.edu">Data Access Committee</a>.
      </p>

      <br />

      <a href="/">
        <button
          class="focus:shadow-outline-blue inline rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-xl font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none active:bg-blue-600"
        >
          back to homepage
        </button>
      </a>
    </div>
  </main>
</template>

<!-- <style scoped>
.invalid-idp {
  list-style: circle;
  font-size: inherit;
}
</style> -->
