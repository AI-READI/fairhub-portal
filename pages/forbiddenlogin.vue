<script setup lang="ts">
const route = useRoute();

const badIdPType = route.query.type;
</script>

<template>
  <main class="flex h-full w-full flex-col items-center px-12 py-12">
    <div class="font-dark text-5xl font-bold">403</div>

    <div class="items-left justify-left container mx-auto flex flex-col px-12">
      <p class="text-center text-2xl font-light leading-normal md:text-3xl">
        Thank you for your request.
      </p>

      <div
        v-if="badIdPType === 'adversarial'"
        class="justify-left container mx-auto px-12"
      >
        <p class="text-left font-light leading-normal">
          You have been directed to this page because you have authenticated
          using an Identity Provider that is based in a country that has been
          designated a country of concern by the US Government. At this time, we
          are awaiting clarification from the Department of Justice on the
          recent
          <a
            href="https://www.whitehouse.gov/briefing-room/presidential-actions/2024/02/28/executive-order-on-preventing-access-to-americans-bulk-sensitive-personal-data-and-united-states-government-related-data-by-countries-of-concern/"
            >executive order on data sharing with countries of concern</a
          >. Please know that we are fully committed to maximizing the impact of
          the the data from our participants and data sharing but have been
          advised to for clarification.
        </p>
      </div>

      <div v-else class="justify-left container mx-auto px-12">
        <p class="justify-left text-left font-light leading-normal">
          The Identity Provider you selected has not been verified by the
          AI-READI Data Access committee to provide sufficient user
          identification. You can re-attempt using a valid account from an
          academic instution or an eduGain-affiliated Identity Provider.
        </p>

        <p class="text-left font-light leading-normal">
          The following Identity providers are <strong>NOT</strong> supported::
        </p>

        <ul
          class="list justify-left list-inside text-left font-light leading-normal"
        >
          <li>ORCID</li>

          <li>GitHub</li>

          <li>Google</li>

          <li>Amazon AWS</li>
        </ul>
      </div>

      <p class="mb-8 px-12 text-left">
        If you believe you were directed here mistakenly, please contact the
        <a href="mailto:aireadi-dac@ohsu.edu" class="underline"
          >Data Access Committee</a
        >.
      </p>
    </div>

    <a href="/">
      <button
        class="focus:shadow-outline-blue inline rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none active:bg-blue-600"
      >
        back to homepage
      </button>
    </a>
  </main>
</template>
