<script setup lang="ts">
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
const [username, host] = request?.download_uri?.split("@");

const notUserDownload = user.id !== request.user_details_id;
const dataReady = request.status === "READY";
const isExpired = request.status === "EXPIRED";

const privateKeyUrl = `/api/downloads/key/${requestid}`;
const privateKeyFilename = `${userKey}.txt`;

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
              Your dataset is ready for download. Due to the number and size of
              the files included in typical datasets, we recommend using a
              graphical client like
              <NuxtLink to="https://filezilla-project.org/" target="_blank"
                >FileZilla</NuxtLink
              >. FileZilla is a free and open-source, cross-platform FTP
              application. It is a very mature SFTP application and is
              specifically supported for SFTP applications by Microsoft Azure
              Storage.
            </p>

            <p>
              Detailed instructions on FileZilla, installation and use are
              available from the
              <a href="https://wiki.filezilla-project.org/Documentation"
                >official project wiki</a
              >. Below is a brief summary of steps you'll need to accomplish
              your download:
            </p>

            <ol>
              <li>
                Download your SSH key using the link below, and save it in a
                secure location. Make sure that the file permissions are set
                read-only for your account.

                <ul>
                  <li>
                    <NuxtLink
                      :to="privateKeyUrl"
                      :download="privateKeyFilename"
                      external
                    >
                      Download SSH key
                      <Icon name="mdi:file-download-outline" class="ml-1"
                    /></NuxtLink>
                  </li>
                </ul>
              </li>

              <li>
                Download the version of the FileZilla Client compatible with
                your operating system from the
                <a href="https://filezilla-project.org/download.php"
                  >official download page</a
                >.
              </li>

              <li>
                Install the FileZilla client according to the
                <a href="https://wiki.filezilla-project.org/Client_Installation"
                  >installation instructions</a
                >
                for your operating system.
              </li>

              <li>
                Follow the
                <a href="https://wiki.filezilla-project.org/Using"
                  >usage instructions</a
                >

                to download your requested data set. You should use the
                following properties to set up the connection in the
                <a href="https://wiki.filezilla-project.org/Site_Manager"
                  >FileZilla Site Manager</a
                >:

                <ul>
                  <li>
                    <em>Protocol:</em> Select "SFTP - SSH File Transfer
                    Protocol"
                  </li>

                  <li><em>Host:</em> {{ host }}</li>

                  <li><em>Logon type:</em> Select "Key file"</li>

                  <li><em>User:</em> {{ username }}</li>

                  <li>
                    <em>Key file:</em> The location where you saved the SSH key
                    file (see above)
                  </li>
                </ul>
              </li>
            </ol>
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
