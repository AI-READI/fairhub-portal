<script setup lang="ts">
import type { FormInst } from "naive-ui";

import isEmail from "validator/es/lib/isEmail";

definePageMeta({
  layout: "no-header",
});

const push = usePush();
const route = useRoute();

const user = useSupabaseUser();
const supabase = useSupabaseClient();

const loading = ref(false);

const loginFormRef = ref<FormInst | null>(null);

const loginForm = reactive({
  emailAddress: "",
  password: "",
});

const loginFormRules = {
  emailAddress: {
    message: "Please input your email address",
    required: true,
    trigger: ["input"],
  },
  password: {
    message: "Please fill in your password",
    required: true,
    trigger: ["input"],
  },
};

const invalidEmailAddress = computed(() => {
  return loginForm.emailAddress === "" || !isEmail(loginForm.emailAddress);
});

const signIn = (e: MouseEvent) => {
  e.preventDefault();

  loginFormRef.value?.validate(async (errors) => {
    if (!errors) {
      if (!isEmail(loginForm.emailAddress)) {
        push.error({
          title: "Error",
          message: "Please enter a valid email address",
        });

        return;
      }

      loading.value = true;

      setTimeout(() => {
        if (route.path === "/auth/login") {
          push.warning({
            title: "Slow Connection",
            message: "Please wait while we sign you in.",
          });

          // refresh the page
          window.location.reload();
        }
      }, 5000);

      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: loginForm.emailAddress,
        password: loginForm.password,
      });

      loading.value = false;

      if (loginError) {
        push.error({
          title: "Login Error",
          message: loginError.message,
        });

        return;
      }

      /**
       * TODO: This is ugly and needs to be changed.
       */
      // create the user profile if it doesn't exist
      await $fetch("/api/user", {
        headers: useRequestHeaders(["cookie"]),
        method: "POST",
      }).catch((error) => {
        console.error(error);

        push.error({
          title: "Profile Error",
          message: "Could not initialize profile.",
        });

        throw error;
      });

      console.log("success");

      // redirect to projects page
      window.location.href = "/dashboard";
    } else {
      console.log(errors);
    }
  });
};

watchEffect(() => {
  if (user.value) {
    return navigateTo("/dashboard");
  }
});
</script>

<template>
  <main class="flex flex-row flex-wrap items-start justify-center">
    <div class="flex w-1/2 flex-col items-center">
      <div
        class="mt-4 w-full max-w-lg space-y-6 rounded-lg bg-white px-4 py-6 sm:px-8 sm:py-8"
      >
        <div class="w-full pb-4">
          <div class="w-max">
            <NuxtLink to="/">
              <img src="/logo/logo.svg" alt="logo" class="mb-[60px] h-[80px]" />
            </NuxtLink>
          </div>

          <h1 class="mb-3 text-left text-2xl font-bold sm:text-4xl">
            Welcome back!
          </h1>

          <p>Sign in to your account to continue using our services.</p>
        </div>

        <n-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginFormRules"
          size="large"
          :show-require-mark="false"
        >
          <n-form-item path="emailAddress" label="Email Address">
            <n-input
              v-model:value="loginForm.emailAddress"
              placeholder="hello@fairhub.io"
              clearable
              @keydown.enter.prevent
            />
          </n-form-item>

          <n-form-item path="password" label="Password">
            <n-input
              v-model:value="loginForm.password"
              placeholder=""
              type="password"
              show-password-on="mousedown"
              @keydown.enter.prevent
            />
          </n-form-item>

          <n-form-item>
            <n-button
              strong
              secondary
              type="primary"
              size="large"
              :loading="loading"
              :disabled="invalidEmailAddress"
              class="w-full"
              @click="signIn"
            >
              <template #icon>
                <Icon name="ph:sign-in-bold" />
              </template>
              Sign In
            </n-button>
          </n-form-item>
        </n-form>

        <div class="flex justify-center text-sm">
          Don't have an account?
          <nuxt-link
            class="ml-1 w-fit text-blue-600 transition-all hover:text-blue-400"
            to="/auth/register"
          >
            Sign Up
          </nuxt-link>
        </div>

        <n-divider class="text-slate-400"> or </n-divider>

        <div class="flex flex-col space-y-4">
          <n-button strong size="large" class="w-full">
            <template #icon>
              <Icon name="devicon:google" />
            </template>

            Sign In with Google
          </n-button>

          <n-button strong color="black" size="large" class="w-full">
            <template #icon>
              <Icon name="ph:github-logo-fill" />
            </template>

            Sign In with GitHub
          </n-button>

          <n-button strong size="large" class="w-full">
            <template #icon>
              <Icon name="ic:baseline-apple" />
            </template>

            Sign In with Apple ID
          </n-button>
        </div>

        <p class="mx-auto w-9/12 text-center text-sm">
          By signing in, you agree to our
          <nuxt-link
            class="text-blue-600 transition-all hover:text-blue-400"
            to="/terms"
          >
            Terms of Service
          </nuxt-link>
          and
          <nuxt-link
            class="text-blue-600 transition-all hover:text-blue-400"
            to="/privacy"
          >
            Privacy Policy</nuxt-link
          >.
        </p>
      </div>
    </div>

    <div class="h-full min-h-screen w-1/2 bg-slate-900"></div>
  </main>
</template>
