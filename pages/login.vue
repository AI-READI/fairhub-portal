<script setup lang="ts">
const { accounts, inProgress, instance } = useMsal();

const signupRedirect = () => {
  instance.loginRedirect();
};
</script>

<template>
  <main class="px-4 pt-4">
    <n-space vertical>
      <div>Interaction in progress: {{ inProgress }}</div>

      <VueJsonPretty :data="accounts" />

      <div>
        <n-button secondary type="info" @click="signupRedirect">
          Sign Up and Sign In
        </n-button>
      </div>
    </n-space>
  </main>
</template>
