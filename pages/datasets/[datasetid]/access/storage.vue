<script lang="ts" setup>
import type { BlobStorageCredentials } from '~/types/download';

// TODO: get request id from query params

// TODO: enable authentication 
// definePageMeta({
//   middleware: ["auth"],
// });

const route = useRoute();

const { datasetid } = route.params as { datasetid: string };
const { data: dataset, error } = await useDataset(datasetid);

function stringToKeyValuePairs(str: string, separator = ',', keyValueSeparator = ':') {
  const pairs = str.split(separator);
  const result: { [key: string]: string } = {};

  for (const pair of pairs) {
    const [key, value] = pair.split(keyValueSeparator);
    result[key.trim()] = value.trim();
  }

  return result;
}

if (error.value) {
  console.error(error.value);

  push.error({
    title: "Something went wrong",
    message: "Failed to fetch dataset",
  });

  throw new Error("Failed to fetch dataset");
}

const currentStep = ref<number>(8);
const storage = ref<BlobStorageCredentials>({
  accountName: "",
  containerName: "",
  expirationDate: new Date(),
  sasToken: ""
});

const testStorageAccount = async () => {

  const accountName = storage.value.accountName.trim();
  const containerName = storage.value.containerName.trim();
  const sasToken = storage.value.sasToken.trim();

  if (!accountName || !containerName || !sasToken) {
    push.error({
      title: "Error",
      message: "Please provide all the required fields",
    });
    return false;
  }

  const tokenObj = stringToKeyValuePairs(sasToken, '&', '=');
  const startDate = new Date(tokenObj.st);
  const expirationDate = new Date(tokenObj.se);
  const currentDate = new Date();
  const twoWeeksFromNow = new Date(currentDate.getDate() + 14);
    
  if (expirationDate < currentDate) {
    push.error({
      title: "Error",
      message: "SAS Token is expired: expiration date is in the past",
    });
    return false;
  }
  
  if (expirationDate < twoWeeksFromNow) {
    push.error({
      title: "Error",
      message: "SAS Token is not valid: \n expiration date is less than 14 days from now",
    });
    return false;
  }
  
  if (startDate > expirationDate) {
    push.error({
      title: "Error",
      message: "SAS Token is not valid: start date is after expiration date",
    });
    return false;
  }
  
  if (sasToken.length < 100) {
    push.error({
      title: "Error",
      message: "SAS Token is not valid: too short",
    });
    return false;
  }
  
  if (sasToken.length > 200) {
    push.error({
      title: "Error",
      message: "SAS Token is not valid: too long",
    });
    return false;
  }

  if (sasToken.includes(" ")) {
    push.error({
      title: "Error",
      message: "SAS Token is not valid: contains spaces",
    });
    return false;
  }

  try {
    const response = await $fetch("/api/downloads/aztest", {
      body: {
        accountName,
        containerName,
        expirationDate: expirationDate.toISOString(),
        sasToken,
      },
      method: "POST",
    })
    if (response.valueOf()) {
      push.success({
          title: "Success",
          message: "Storage account is valid",
        });
    } else {
      push.error({
        title: "Error",
        message: "Storage account is not valid",
      });
    }



  } catch (error) {
    console.error(error);
    push.error({
      title: "Error",
      message: "Failed to test storage account",
    });
  }
  return true;
};
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
        <h2>Access this dataset</h2>

        <DownloadStepNav :current-step="currentStep" />

        <TransitionFade>
          <div>
            <h4>Azure Storage Account</h4>

            <p>
              Due to the size of the AI-READI dataset and the time it can take
              to download, we require researchers set up an Azure account, or
              use their institution's Azure subscription, to create an Azure
              Storage Account and provide a container and SAS Token to receive
              the AI-READI dataset. Please provide the details below and your
              dataset will be uploaded to the provided container once the
              request is processed.
            </p>

            <n-form-item
              label="Azure Storage Account Name"
              path="storageAccountName"
            >
              <n-input
                v-model:value="storage.accountName"
                :placeholder="`Enter your Azure Storage Account Name`"
                :clearable="true"
                :type="`text`"
              ></n-input>
            </n-form-item>

            <n-form-item label="Container Name" path="containerName">
              <n-input
                v-model:value="storage.containerName"
                :placeholder="`Enter your Azure Storage Account Container Name`"
                :clearable="true"
                :type="`text`"
              ></n-input>
            </n-form-item>

            <n-form-item label="SAS Token" path="sasToken">
              <n-input
                v-model:value="storage.sasToken"
                :placeholder="`Enter your Azure Storage Account SAS Token`"
                :clearable="true"
                :type="`text`"
              ></n-input>
            </n-form-item>

            <n-button strong secondary type="info" @click="testStorageAccount()"> Test upload </n-button>

            <p>
              Unfortunately something went wrong. Please ensure that you provide
              the following items: 
              <ol>
                <li>Name of the storage account. This will be the
                plain text name of the account, not the endpoint URL. </li>

                <li>Name of the container. </li>
                
                <li>Shared Access Token Blob SAS token NOT the Blob SAS
                URL. This is not the URL but "the query string that includes all
                of the information required to authenticate the SAS." It needs to
                specify the “Write” permission. It will be in the following format:
                <code>sp=w&st=2025-04-22T16:35:55Z&se=2025-04-23T00:35:55Z&spr=https&sv=2024-11-04&sr=c&sig=bH...REDACTED...D</code></li>
              </ol>
            </p>
          </div>
        </TransitionFade>
      </div>
    </div>
  </main>
</template>
