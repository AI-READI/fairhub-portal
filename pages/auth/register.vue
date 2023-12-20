<script setup lang="ts">
import type { FormInst } from "naive-ui";

import isEmail from "validator/es/lib/isEmail";

definePageMeta({
  layout: "no-header",
});

const push = usePush();

const user = useSupabaseUser();
const supabase = useSupabaseClient();

const loading = ref(false);

const registerFormRef = ref<FormInst | null>(null);

const registerForm = reactive({
  emailAddress: "",
  password: "",
});

const registerFormRules = {
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
  return (
    registerForm.emailAddress === "" || !isEmail(registerForm.emailAddress)
  );
});

const signIn = (e: MouseEvent) => {
  e.preventDefault();

  registerFormRef.value?.validate(async (errors) => {
    if (!errors) {
      if (!isEmail(registerForm.emailAddress)) {
        push.error({
          title: "Error",
          message: "Please enter a valid email address",
        });

        return;
      }

      /**
       * TODO: Validate password strength
       */

      // register user
      loading.value = true;

      try {
        const { error } = await supabase.auth.signUp({
          email: registerForm.emailAddress,
          password: registerForm.password,
        });

        if (error) {
          push.error({
            title: "Error",
            message: error.message,
          });

          throw error;
        }
      } catch (error) {
        loading.value = false;

        console.error(error);
        return;
      }

      loading.value = false;

      // reset form
      registerForm.emailAddress = "";
      registerForm.password = "";

      console.log("success");

      // redirect to projects page
      return navigateTo("/projects");
    } else {
      console.log(errors);
    }
  });
};

watchEffect(() => {
  if (user.value) {
    return navigateTo("/projects");
  }
});
</script>

<template>
  <main class="flex flex-row flex-wrap items-start justify-center">
    <div class="flex w-1/2 flex-col items-center pt-[5%]">
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
            Create your account!
          </h1>

          <p></p>
        </div>

        <n-form
          ref="registerFormRef"
          :model="registerForm"
          :rules="registerFormRules"
          size="large"
          :show-require-mark="false"
        >
          <n-form-item path="emailAddress" label="Email Address">
            <n-input
              v-model:value="registerForm.emailAddress"
              placeholder="hello@fairhub.io"
              clearable
              @keydown.enter.prevent
            />
          </n-form-item>

          <n-form-item path="password" label="Password">
            <n-input
              v-model:value="registerForm.password"
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
              Sign Up
            </n-button>
          </n-form-item>
        </n-form>

        <div class="flex justify-center text-sm">
          Already have an account?
          <nuxt-link
            class="ml-1 w-fit text-blue-600 transition-all hover:text-blue-400"
            to="/auth/login"
          >
            Sign In
          </nuxt-link>
        </div>

        <n-divider class="text-slate-400"> or </n-divider>

        <div class="flex flex-col space-y-4">
          <n-button strong size="large" class="w-full">
            <template #icon>
              <Icon name="devicon:google" />
            </template>

            Sign up with Google
          </n-button>

          <n-button strong color="black" size="large" class="w-full">
            <template #icon>
              <Icon name="ph:github-logo-fill" />
            </template>

            Sign up with GitHub
          </n-button>

          <n-button strong size="large" class="w-full">
            <template #icon>
              <Icon name="ic:baseline-apple" />
            </template>

            Sign up with Apple ID
          </n-button>
        </div>

        <p class="mx-auto w-9/12 text-center text-sm">
          By signing up, you agree to our
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
