<script setup lang="ts">
import hljs from "highlight.js/lib/core";
import powershell from "highlight.js/lib/languages/powershell";

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

const notUserDownload = user?.id !== request.user_details_id;
const dataReady = request.status === "READY";
const isExpired = request.status === "EXPIRED";

const requestSasUri = request.download_uri.replace(
  /\?.*/,
  "?...[SAS Token Omitted]...",
);
const azcopyCommand = `azcopy copy "${requestSasUri}" "C:\\local\\path" --recursive=true`;

hljs.registerLanguage("powershell", powershell);

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
              Your dataset has been copied to your Azure Blob Storage container.
              Due to the number and size of of the files included, we recommend
              using one of the following clients:
            </p>

            <n-tabs type="line" animated>
              <n-tab-pane name="azcopy" tab="AzCopy">
                <p>
                  <NuxtLink
                    to="https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azcopy-v10"
                    target="_blank"
                  >
                    AzCopy
                    <Icon name="fluent:link-square-24-filled" color="#0284c7" />
                  </NuxtLink>
                  is a Microsoft-developed command line program designed to
                  interact with Azure Cloud Storage. For this method you will
                  need to download a dataset-specific Shared Access Signature
                  (SAS) URI.
                </p>

                <p>
                  You will need to generate a SAS URI for your download with the
                  "Read" and "List" permissions similar to the format below. See
                  our
                  <NuxtLink
                    to="https://docs.aireadi.org/docs/3/preliminary/azure_storage/azure-token"
                    target="_blank"
                    >Azure Blob Storage documentation</NuxtLink
                  >
                  for more information.
                  <n-code :code="requestSasUri" />
                </p>

                <p>
                  Detailed instructions on AzCopy, its installation, and its use
                  are available from the
                  <NuxtLink
                    to="https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azcopy-v10?tabs=dnf"
                    target="_blank"
                  >
                    Official Microsoft Documentation
                  </NuxtLink>
                  Below is a brief summary of steps you'll need to accomplish
                  your download:
                </p>

                <ol>
                  <li>
                    Visit the Azcopy documentation page and
                    <NuxtLink
                      to="https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azcopy-v10#download-azcopy"
                      target="_blank"
                    >
                      download
                    </NuxtLink>
                    the compressed azcopy executable for your respective
                    operating system. These executables are available as
                    compressed zip files for Windows/Mac users and Tarball files
                    for Linux users.
                  </li>

                  <li>
                    Extract the contents of the compressed executable in a known
                    location on your local machine's drive. - Windows and Mac
                    users can use built-in zip file applications or use
                    3rd-party applications like 7zip for this - For linux users,
                    please see documentation for your specific distro for
                    instructions on decompressing the provided tarball -
                    Possible locations for this are: in your home directory; in
                    your machine's C:/ or binary directory - For ease of use,
                    consider adding the fully-qualified path to the AzCopy
                    directory to your system PATH. If you choose not to do this
                    you will need to execute any AzCopy commands from the
                    directory where AzCopy is installed.
                  </li>

                  <li>
                    Open a terminal or powershell instance and execute the
                    following:
                    <n-code :code="azcopyCommand" language="powershell" />

                    Where the https URL is the SAS URI you obtained from the
                    portal and "C:\local\path" is the local path on your target
                    machine.
                  </li>

                  <li>
                    Please allow time for the download to complete. Depending on
                    the amount of data you selected, this could take several
                    hours.
                  </li>
                </ol>
              </n-tab-pane>

              <n-tab-pane name="rclone" tab="Rclone">
                <p>
                  <NuxtLink to="https://rclone.org/" target="_blank">
                    Rclone
                    <Icon name="fluent:link-square-24-filled" color="#0284c7" />
                  </NuxtLink>
                  is a command-line program written in Go designed to manage
                  cloud storage. It is compatible with over 70 cloud storage
                  solutions, including AWS S3, Azure Storage, Google Cloud
                  Storage and more. For this method you will need to download a
                  dataset-specific Shared Access Signature (SAS) URI.
                </p>

                <p>
                  You will need to generate a SAS URI for your download with the
                  "Read" and "List" permissions similar to the format below. See
                  our
                  <NuxtLink
                    to="https://docs.aireadi.org/docs/3/preliminary/azure_storage/azure-token"
                    target="_blank"
                    >Azure Blob Storage documentation</NuxtLink
                  >
                  for more information.
                  <n-code :code="requestSasUri" />
                </p>

                <ol>
                  <li>
                    Rclone is available for
                    <NuxtLink
                      to="https://rclone.org/downloads/"
                      target="_blank"
                    >
                      Download
                    </NuxtLink>
                    as a single executable. Download the executable specific to
                    operating system and follow the [installation instructions]
                    to install rclone.
                  </li>

                  <li>
                    Next you'll need to configure your connection to the Fairhub
                    Portal Azure Blob Storage. Open your terminal or command
                    line program of choice and run:
                    <n-code code="rclone config" language="powershell" />
                    then follow the
                    <NuxtLink
                      to="https://rclone.org/azureblob/#configuration"
                      target="_blank"
                    >
                      download instructions
                    </NuxtLink>
                    . For authentication you will be using the
                    <NuxtLink
                      to="https://rclone.org/azureblob/#sas-url"
                      target="_blank"
                    >
                      Shared Access Signature URL
                    </NuxtLink>
                    that you just obtained above; be sure to leave the `account`
                    and `key` configuration options blank and fill in the
                    `sas_url` Remember the name you give to the Azure Blob
                    Storage configuration, as you will need it in subsequent
                    steps.
                  </li>

                  <li>
                    Once Azure Blob Storage configuration is complete, you can
                    either use it for download to your local user system or you
                    can configure an additional connection to any other cloud
                    storage provider. For example, to configure a connection to
                    AWS S3 or a cloud storage provider that is compatible with
                    AWS S3 Backend, follow
                    <NuxtLink to="https://rclone.org/s3/" target="_blank">
                      configuration instructions
                    </NuxtLink>
                    .
                  </li>

                  <li>
                    Once your configuration is complete, you can download your
                    requested materials by issuing the following command:
                    <n-code
                      code="rclone copy example-azure-config-name:blob-container-name path/to/local/directory"
                      language="powershell"
                    />
                    Or, for transfer to other cloud storage providers:
                    <n-code
                      code="rclone copy example-azure-config-name:blob-container-name example-destination-provider-config-name:path/to/directory"
                      language="powershell"
                    />
                  </li>

                  <li>
                    Please allow time for the download to complete. Depending on
                    the amount of data you selected, this could take several
                    hours.
                  </li>
                </ol>
              </n-tab-pane>
            </n-tabs>
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

<style scoped>
.n-card {
  max-width: 700px;
  text-align: center;
  align-self: center;
}
.n-button {
  font-size: 24px;
}
</style>
