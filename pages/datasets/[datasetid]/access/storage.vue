<script lang="ts" setup>
import type { FormInst, FormItemRule, FormRules } from "naive-ui";
import type { BlobStorageCredentials } from "~/types/download";

definePageMeta({
  middleware: ["auth"],
});

const route = useRoute();
const formRef = ref<FormInst | null>(null);
const isValidToken = ref<boolean | undefined>(true);

const currentStep = ref<number>(8);
const storage = ref<BlobStorageCredentials>({
  accountName: "",
  containerName: "",
  expirationDate: new Date(),
  sasToken:
    "",
});

const { requestid } = route.query as { requestid: string };
const { datasetid } = route.params as { datasetid: string };
const { data: dataset, error } = await useDataset(datasetid);
const { data: downloadRequest, error: reqError } =
  await useDownloadRequest(requestid);

if (error.value) {
  console.error(error.value);

  push.error({
    title: "Something went wrong",
    message: "Failed to fetch dataset",
  });

  throw new Error("Failed to fetch dataset");
}

if (reqError.value) {
  console.error(reqError.value);

  push.error({
    title: "Something went wrong",
    message: "Failed to fetch request",
  });

  throw new Error("Failed to fetch request");
}

const rules: FormRules = {
  accountName: [
    {
      message: "Account name is required.",
      required: true,
      trigger: ["input", "blur"],
    },
  ],
  containerName: [
    {
      message: "Container name is required.",
      required: true,
      trigger: ["input", "blur"],
    },
  ],
  sasToken: [
    {
      message: "SAS Token is required.",
      required: true,
      trigger: "input",
    },
    {
      message: "SAS Token format is not valid. It must be a valid Azure SAS Token, with the only the permission write and an expiration of at least 2 weeks from today.",
      trigger: ["input", "blur"],
      validator: validSasToken,
    },
  ],
};

/**
 * Splits a string into a map of key-value pairs
 *
 * @param str string to be split
 * @param separator separator for each keyValue pair
 * @param keyValueSeparator separator for each key value
 */
function stringToKeyValuePairs(
  str: string,
  separator = ",",
  keyValueSeparator = ":",
) {
  const pairs = str.split(separator);
  const result: { [key: string]: string } = {};

  for (const pair of pairs) {
    const [key, value] = pair.split(keyValueSeparator);
    result[key.trim()] = value.trim();
  }

  return result;
}

function updateDownloadRequest(
  accountName: string,
  containerName: string,
  sasToken: string,
): boolean {
  const containerCreds = `https://${accountName}.blob.core.windows.net/${containerName}?${sasToken}`;

  try {
    $fetch(`/api/downloads/request/update`, {
      body: {
        downloadUri: containerCreds,
        request: downloadRequest.value?.id,
      },
      headers: useRequestHeaders(["cookie"]),
      method: "POST",
    });
  } catch (error) {
    console.error("Error updating download request:", error);
    push.error({
      title: "Error",
      message: "Failed to update download request",
    });
    return false;
  }

  return true;
}

async function testUpload(
  accountName: string,
  containerName: string,
  sasToken: string,
  expirationDt: string,
) {
  try {
    const response = await $fetch("/api/downloads/aztest", {
      body: {
        accountName,
        containerName,
        expirationDate: expirationDt,
        sasToken,
      },
      method: "POST",
    });
    if (response.valueOf()) {
      push.success({
        title: "Success",
        message: "Storage account is valid",
      });
      return true;
    } else {
      push.error({
        title: "Error",
        message: "Storage account is not valid",
      });
      return false;
    }
  } catch (error) {
    console.error(error);
    push.error({
      title: "Error",
      message: "Failed to test storage account",
    });
    return false;
  }
}

const testStorageAccount = async (e: MouseEvent) => {
  const accountName = storage.value.accountName.trim();
  const containerName = storage.value.containerName.trim();
  const sasToken = storage.value.sasToken.trim();
  const expirationDate = new Date();

  e.preventDefault();

  await formRef.value?.validate((errors) => {
    if (errors) {
      console.log(errors);
      isValidToken.value = false;
    }
  });

  if (!isValidToken.value) {
    return;
  }

  try {
    isValidToken.value = true;
    const uploadSuccess = await testUpload(
      accountName,
      containerName,
      sasToken,
      expirationDate.toISOString(),
    );

    if (!uploadSuccess) {
      isValidToken.value = false;
      return;
    }

    await updateDownloadRequest(accountName, containerName, sasToken);
    await navigateTo(`/datasets/${dataset.value?.id}/access/submitted`);

  } catch(error) {
    console.error(error);
    throw new Error("Error testing upload or updating record");
  }

};

function validSasToken(rule: FormItemRule, token: string): boolean {
  const tokenObj = stringToKeyValuePairs(token, "&", "=");
  const permission = tokenObj.sp.includes("w");
  const startDate = new Date(tokenObj.st);
  const expirationDate = new Date(tokenObj.se);
  const currentDate = new Date();
  const twoWeeksFromNow = new Date(currentDate);
  twoWeeksFromNow.setDate(currentDate.getDate() + 14)

  return (
    token.length > 100 &&
    token.length < 200 &&
    permission &&
    !token.includes(" ") &&
    expirationDate > currentDate &&
    expirationDate >= twoWeeksFromNow &&
    startDate < expirationDate
  );
}

const validToken = computed(
  () => !isValidToken.value
);

const handleTryAgain = () => {
  isValidToken.value = true;
};

const handleSaveAndReturn = async () => {
  await navigateTo(
    `/datasets/${dataset.value?.id}/access/request/`,
  );
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

            <n-form ref="formRef" :model="storage" :rules="rules">
              <n-form-item
                label="Azure Storage Account Name"
                path="accountName"
              >
                <n-input
                  id="accountName"
                  v-model:value="storage.accountName"
                  required
                  :placeholder="`Enter your Azure Storage Account Name`"
                  :clearable="true"
                  :type="`text`"
                  @keydown.enter.prevent
                ></n-input>
              </n-form-item>

              <n-form-item label="Container Name" path="containerName">
                <n-input
                  id="containerName"
                  v-model:value="storage.containerName"
                  required
                  :placeholder="`Enter your Azure Storage Account Container Name`"
                  :clearable="true"
                  :type="`text`"
                  @keydown.enter.prevent
                ></n-input>
              </n-form-item>

              <n-form-item label="SAS Token" path="sasToken">
                <n-input
                  id="sasToken"
                  v-model:value="storage.sasToken"
                  required
                  :placeholder="`Enter your Azure Storage Account SAS Token`"
                  :clearable="true"
                  :type="`text`"
                  @keydown.enter.prevent
                ></n-input>
              </n-form-item>

              <n-form-item>
                <n-button
                  strong
                  primary
                  type="info"
                  @click="testStorageAccount"
                >
                  Test upload
                </n-button>
              </n-form-item>
            </n-form>

             <n-modal
                v-model:show="validToken"
                style="width: 800px"
                :mask-closable="true"
                preset="dialog"
                positive-text="Try again"
                negative-text="Save and return later"
                @positive-click="handleTryAgain"
                @negative-click="handleSaveAndReturn"
              >
              <n-card
                style="width: 100%"
                title="Azure Storage Container Error"
                :bordered="false"
                size="huge"
                role="dialog"
                aria-modal="true"
              >
                <p>
                  Unfortunately something went wrong. Please ensure that you provide
                  the following items: 
                  <ol>
                    <li>Name of the storage account. This will be the
                    plain text name of the account, not the endpoint URL. </li>

                    <li>Name of the container. </li>
                    
                    <li>Shared Access Token Blob SAS token NOT the Blob SAS
                    URL. This is not the URL but <i>"the query string that includes all
                    of the information required to authenticate the SAS."</i> It needs to
                    specify the “Write” permission. It will be in the following format:
                    <code>sp=w&st=2025-04-22T16:35:55Z&se=2025-04-23T00:35:55Z&spr=https&sv=2024-11-04&sr=c&sig=bH...REDACTED...D</code></li>
                  </ol>
                </p>

              </n-card>
            </n-modal>
          </div>
        </TransitionFade>
      </div>
    </div>
  </main>
</template>
