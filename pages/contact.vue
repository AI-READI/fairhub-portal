<script setup lang="ts">
import type { FormInst } from "naive-ui";

const formRef = ref<FormInst | null>(null);

const formValue = reactive({
  name: "",
  email: "",
  message: "",
  subject: "",
});

const rules = {
  name: [{ message: "Please input name", required: true, trigger: "blur" }],
  email: [{ message: "Please input email", required: true, trigger: "blur" }],
  message: [
    { message: "Please input message", required: true, trigger: "blur" },
  ],
  subject: [
    { message: "Please input subject", required: true, trigger: "blur" },
  ],
};

const handleSubmit = () => {
  formRef.value?.validate().then((valid) => {
    if (valid) {
      push.success("Your message has been sent successfully");

      // Clear the form
      formValue.name = "";
      formValue.email = "";
      formValue.message = "";
      formValue.subject = "";
    } else {
      push.error("Something went wrong. Please try again later.");
      return false;
    }
  });
};
</script>

<template>
  <main class="h-screen overflow-auto bg-gradient-to-b from-white to-blue-50">
    <div class="mx-auto max-w-screen-md px-4 py-8 lg:py-16">
      <h2 class="mb-4 text-center text-4xl font-extrabold text-gray-900">
        Contact Us
      </h2>

      <p class="text-center text-gray-500 sm:text-xl">
        Got a technical issue? Want to send feedback about a beta feature? We
        are here to help.
      </p>

      <div class="pt-8">
        <n-alert
          type="warning"
          :bordered="false"
          title="We are currently not accepting any new messages."
        >
          Please check back later.
        </n-alert>
      </div>

      <div class="py-8">
        <n-divider />
      </div>

      <n-form
        ref="formRef"
        :label-width="150"
        :model="formValue"
        :rules="rules"
        size="large"
        disabled
      >
        <n-form-item label="Your Name" path="name">
          <n-input v-model:value="formValue.name" placeholder="Erwin Smith" />
        </n-form-item>

        <n-form-item label="Your Email" path="email">
          <n-input
            v-model:value="formValue.email"
            placeholder="me@fairhub.io"
          />
        </n-form-item>

        <n-form-item label="Subject" path="subject">
          <n-input
            v-model:value="formValue.subject"
            placeholder="Let us know how we can help you"
          />
        </n-form-item>

        <n-form-item label="Your Message" path="message">
          <n-input
            v-model:value="formValue.message"
            placeholder="Leave a comment..."
            type="textarea"
          />
        </n-form-item>

        <n-form-item>
          <div class="flex w-full justify-center">
            <n-button type="info" disabled @click="handleSubmit">
              <template #icon>
                <Icon name="fa:send" />
              </template>
              Send message
            </n-button>
          </div>
        </n-form-item>
      </n-form>
    </div>
  </main>
</template>
