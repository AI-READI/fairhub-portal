<script setup lang="ts">
const { accounts, inProgress, instance } = useMsal();

const loginRedirect = () => {
  instance.loginRedirect({ scopes: ["openid", "email", "profile"] });
};

const logout = () => {
  instance.logoutRedirect();
};
</script>

<template>
  <main class="px-4 pt-4">
    <n-space vertical>
      <div>Interaction in progress: {{ inProgress }}</div>

      <VueJsonPretty :data="accounts" />

      <div v-if="accounts.length">
        <n-descriptions
          v-for="account in accounts"
          :key="account.localAccountId"
          label-placement="top"
          :title="account.localAccountId"
        >
          <n-descriptions-item label="Username">
            {{ account.idTokenClaims.preferred_username }}
          </n-descriptions-item>

          <n-descriptions-item label="Email">
            {{ account.idTokenClaims.email }}
          </n-descriptions-item>
        </n-descriptions>

        <n-button secondary type="info" @click="logout">Log Out</n-button>
      </div>

      <div v-else>
        <n-button secondary type="info" @click="loginRedirect">
          Sign Up and Sign In
        </n-button>
      </div>
    </n-space>
  </main>
</template>
