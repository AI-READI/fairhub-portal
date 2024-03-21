<script setup lang="ts">
defineProps({
  showLogin: {
    default: true,
    type: Boolean,
  },
});

const { authenticated } = useAccount();
const { authClient } = useAuthClient();

const login = () => {
  authClient.loginRedirect({ scopes: ["openid", "email", "profile"] });
};

const logout = () => {
  authClient.logoutRedirect();
};
</script>

<template>
  <div v-bind="$attrs">
    <button v-if="authenticated" @click="logout">Log out</button>

    <template v-else>
      <button v-if="showLogin" @click="login">Log in</button>
    </template>
  </div>
</template>
