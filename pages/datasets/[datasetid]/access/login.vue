<script setup lang="ts">
const route = useRoute();
const { authenticated, userDetails } = useUserDetails();

const { datasetid } = route.params as { datasetid: string };
const { data: dataset, error } = await useDataset(datasetid);

if (error.value) {
  console.error(error.value);

  push.error({
    title: "Something went wrong",
    message: "Failed to fetch dataset",
  });

  throw new Error("Failed to fetch dataset");
}

// TODO: Convert to a utility or extract a component?
const generateCombinedFullName = (name: string) => {
  const nameArray = name.split(",");

  if (nameArray.length > 1) {
    return `${nameArray[1]} ${nameArray[0]}`;
  } else {
    return name;
  }
};

const currentStep = ref<number>(2);

const userDescription = computed(() => {
  if (authenticated.value) {
    return userDetails.value.family_name && userDetails.value.given_name
      ? `${userDetails.value.given_name} ${userDetails.value.family_name} (${userDetails.value.email})`
      : userDetails.value.email;
  }

  return "";
});

const handleLogin = async () => {
  const redirectTo = route.fullPath;
  await navigateTo(
    `${window.location.origin}/login-redirect?redirectTo=${redirectTo}`,
    {
      external: true,
    },
  );
};
</script>

<template>
  <main class="h-screen overflow-auto bg-gradient-to-b from-white to-blue-50">
    <div
      class="mx-auto mt-10 flex w-full max-w-screen-xl items-center justify-between px-3"
    >
      <n-flex vertical>
        <h1>{{ dataset?.title }}</h1>

        <div
          v-for="(creator, index) in dataset?.metadata.datasetDescription
            .creator"
          :key="index"
          class="flex flex-row flex-wrap items-center align-middle text-black"
        >
          <!-- if on the last index create a different span -->
          <span class="mr-1 text-sm font-light">{{
            generateCombinedFullName(creator.creatorName)
          }}</span>

          <ButtonIdentifierBadge
            v-if="creator?.nameIdentifier"
            class="pt-1"
            :type="creator.nameIdentifier[0]"
          />

          <span
            v-if="
              dataset?.metadata.datasetDescription.creator &&
              index != dataset?.metadata.datasetDescription.creator.length - 1
            "
            class="text-sm"
          >
            ,
          </span>
        </div>

        <p class="hidden">{{ dataset?.description }}</p>
      </n-flex>

      <n-image
        src="https://raw.githubusercontent.com/AI-READI/AI-READI-logo/main/logo/png/option2.png"
        :alt="dataset?.title"
        class="size-32 h-32 w-32 rounded-lg"
        object-fit="contain"
      />
    </div>

    <n-divider />

    <div class="mx-auto w-full max-w-screen-xl px-3 pb-8">
      <div class="prose mt-0 min-h-[300px] max-w-none text-black">
        <h2>Access this dataset</h2>

        <DownloadStepNav :current-step="currentStep" />

        <TransitionFade>
          <div>
            <h4>Log In</h4>

            <div v-if="authenticated">
              <p>Logged in as {{ userDescription }}.</p>

              <NuxtLink
                :to="`/datasets/${dataset?.id}/access/diabetes-research`"
              >
                <n-button size="large" type="info" secondary class="my-3"
                  >Next</n-button
                >
              </NuxtLink>
            </div>

            <div v-else>
              <n-alert title="Please note:" type="info">
                <p>
                  On the next screen, you will authenticate for access via
                  CILogon, a federated Identity Provider. You may use your
                  institutional account by selecting your home institution from
                  the drop-down list.
                </p>

                <p>
                  Please note that there are certain Identity Providers from
                  CILogon which are <strong>ineligible</strong>
                  for use with this request because they allow self-attestation
                  or are from countries designed as countries of concern by the
                  US Government. You will
                  <strong>NOT</strong>
                  be able to use the following Identity Providers.
                </p>

                <ul>
                  <li>ORCid</li>

                  <li>GitHub</li>

                  <li>Google</li>

                  <li>Microsoft</li>

                  <li>Yahoo</li>
                </ul>

                <p>
                  If you do not see your institution in the list of
                  participating Identity Providers please contact the
                  <a href="mailto:aireadi-dac@ohsu.edu">Data Access Committee</a
                  >.
                </p>
              </n-alert>

              <n-button
                size="large"
                type="info"
                secondary
                class="my-3"
                @click="handleLogin"
              >
                Log in
              </n-button>
            </div>
          </div>
        </TransitionFade>
      </div>
    </div>
  </main>
</template>
