<script setup lang="ts">
defineProps({
  showLogin: {
    default: true,
    type: Boolean,
  },
});

const { authenticated } = useUserDetails();
const route = useRoute();

const login = async () => {
  const redirectTo = route.fullPath;
  await navigateTo(
    `${window.location.origin}/login-redirect?redirectTo=${redirectTo}`,
    {
      external: true,
    },
  );
};

const logout = async () => {
  await navigateTo(`${window.location.origin}/logout`, {
    external: true,
  });
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
