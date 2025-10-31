<script setup lang="ts">
const route = useRoute();
const { authenticated, userDetails } = useUserDetails();
const { datasetid } = route.params as { datasetid: string };

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
  console.log("Redirecting to:", `/local-redirect?redirectTo=${redirectTo}`);
  await navigateTo(
    `${window.location.origin}/local-redirect?redirectTo=${redirectTo}`,
    {
      external: true,
    },
  );
};
onMounted(() => {
  if (!authenticated.value) {
    handleLogin();
  }
});
</script>
<template>
  <main class="h-screen overflow-auto bg-gradient-to-b from-white to-blue-50">
    <div v-if="authenticated">
      <p>Logged in as {{ userDescription }}.</p>

      <NuxtLink :to="`/datasets/${datasetid}/access/diabetes-research`">
        <n-button size="large" type="info" secondary class="my-3">
          Next
        </n-button>
      </NuxtLink>
    </div>

    <div v-else>
      <p>Redirecting...</p>
      <!--   <p>
        On the next screen, you will authenticate for access using the
        credentials provided to you in your authorization email.
      </p>

      <p>
        If for some reason you no longer have the credentials or cannot access
        the portal please contact the
        <a href="mailto:aireadi-dac@ohsu.edu">Data Access Committee</a>.
      </p>

      <n-button size="large" type="info" secondary class="my-3" @click="handleLogin">
        Log in
      </n-button> -->
    </div>
  </main>
</template>
