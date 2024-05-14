<script setup lang="ts">
import { useClipboard } from "@vueuse/core";

definePageMeta({
  middleware: ["auth"],
});

const route = useRoute();

const { datasetid, requestid } = route.params as {
  datasetid: string;
  requestid: string;
};

const { data: req, error } = await useDownloadRequest(requestid);
const { data: dataset } = await useDataset(datasetid);
const { userDetails } = await useUserDetails();

const user = userDetails.value;
const request = req.value as any;

const userKey = user.email.replace(/[^a-zA-Z0-9]/g, "");

const notUserDownload = user.id !== request.user_details_id;
const dataReady = request.status === "READY";
const isExpired = request.status === "EXPIRED";

const data = request.download_key as string;
const byteString = atob(data);

const source = ref(byteString);
const { copied, copy, isSupported, text } = useClipboard({ source });

if (error.value) {
  console.error(error.value);

  push.error({
    title: "Something went wrong",
    message: "Failed to fetch request",
  });

  throw new Error("Failed to fetch request");
}
</script>

<template>
  <main class="h-screen overflow-auto bg-gradient-to-b from-white to-blue-50">
    <div
      class="mx-auto mt-10 flex w-full max-w-screen-xl items-center justify-between px-3"
    >
      <n-flex vertical>
        <h1>{{ dataset?.title }}</h1>

        <p class="hidden">{{ dataset?.description }}</p>
      </n-flex>

      <n-image
        src="https://raw.githubusercontent.com/AI-READI/AI-READI-logo/main/logo/png/option2.png"
        :alt="dataset?.title"
        class="size-32 h-32 w-32 rounded-lg"
      />
    </div>

    <n-divider />

    <div class="mx-auto w-full max-w-screen-xl px-3 pb-8">
      <div class="prose mt-0 min-h-[300px] max-w-none text-black">
        <h2>Download Request</h2>

        <div>
          <!-- If there is no associated record based on the guid -->
          <div v-if="notUserDownload">
            <p>
              There is no record of a dataset for your account. Please complete
              the data request process.
            </p>

            <p>
              <NuxtLink :to="`/datasets/${dataset?.id}`">
                <n-button strong secondary type="info">
                  Learn more about the dataset.
                </n-button>
              </NuxtLink>
            </p>
          </div>

          <div v-else-if="dataReady">
            <p>
              Your dataset is ready for download. Please use the following
              address and SSH key to access the data. Copy the SSH key and save
              it in a secure location. Make sure that the file permissions are
              set read-only for your account.
            </p>

            <p>
              Depending on your computer system and comfort you can either use a
              client like
              <NuxtLink
                :to="`https://filezilla-project.org/`"
                :target="`_blank`"
                >Filezilla</NuxtLink
              >
              or the command line. See below for an example using the command
              line:
            </p>

            <pre>sftp -i {{ userKey }}.key {{ request?.download_uri }}</pre>

            <h4>SSH Key</h4>

            <div v-if="isSupported">
              <n-button strong secondary type="info" @click="copy(source)">
                <!-- by default, `copied` will be reset in 1.5s -->
                <span v-if="!copied">Copy key</span>

                <span v-else>Copied!</span>
              </n-button>
            </div>

            <p v-else>Your browser does not support Clipboard API</p>

            <pre ref="key">{{ byteString }}</pre>
          </div>

          <!-- Request is not ready -->
          <div v-else-if="isExpired">
            <!-- If the request is expired -->
            <p>Your dataset request has expired. Please submit a new request</p>

            <p>
              <NuxtLink :to="`/datasets/${dataset?.id}/access/license`">
                <n-button strong secondary type="info">
                  Return to the data request
                </n-button>
              </NuxtLink>
            </p>
          </div>

          <div v-else>
            <p>
              Your dataset is not ready to download. Please watch your email and
              we will notify you when it is available.
            </p>

            <p>
              <NuxtLink :to="`/datasets/${dataset?.id}`">
                <n-button strong secondary type="info">
                  Return to the dataset.
                </n-button>
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
