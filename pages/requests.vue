<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

// use slate-300 border to match other components
const themeOverrides = {
  borderColor: "rgb(203 213 225)",
};

const { data: requests } = await useFetch("/api/downloads/request/");
const columns = [
  {
    title: "Dataset",
    key: "dataset_title",
    minWidth: "10rem",
    render: (row) => {
      return h(
        "a",
        {
          class: "text-blue-600 hover:underline",
          href: `/datasets/${row.dataset_id}`,
        },
        row.dataset_title,
      );
    },
  },
  {
    title: "Version",
    key: "version_title",
    minWidth: "5rem",
  },
  {
    title: "Approval Status",
    key: "approval_status",
  },
  {
    title: "Request Status",
    key: "status",
    minWidth: "8rem",
  },
  {
    title: "Created",
    key: "created_at",
  },
  {
    title: "Action",
    key: "action",
    minWidth: "8rem",
    render: (row) => {
      if (!row.download_uri) {
        return h(
          "a",
          {
            class: "text-blue-600 hover:underline",
            href: `/datasets/${row.dataset_id}/access/storage?requestid=${row.id}`,
          },
          "Update storage details",
        );
      } else {
        return h("span");
      }
    },
  },
];
</script>

<template>
  <main class="h-screen overflow-auto bg-gradient-to-b from-white to-blue-50">
    <div
      class="mx-auto mt-10 flex w-full max-w-screen-xl items-center justify-between px-3"
    >
      <n-flex vertical>
        <h1>Your Requests</h1>
      </n-flex>
    </div>

    <div class="mx-auto w-full max-w-screen-xl px-3 pb-8">
      <div class="prose mt-0 min-h-[300px] max-w-none text-black">
        <p>
          View the status of your download requests. If you need to update
          storage details for a request, click the "Update storage details"
          button.
        </p>

        <div v-if="requests?.data.length">
          <n-data-table
            :data="requests?.data"
            :theme-overrides="themeOverrides"
            :row-key="(rowData) => rowData.id"
            :columns="columns"
          />

          <p>
            The "Approval Status" indicates whether the request has been
            approved or not by the Data Access Committee (DAC). It will be one
            of the following:

          <dl>
            <dt>AWAITING_APPROVAL</dt>

            <dd>The request is being reviewed by the DAC.</dd>

            <dt>APPROVED</dt>

            <dd>The request has been approved by the DAC.</dd>

            <dt>NOT_APPROVED</dt>

            <dd>
              The request was not approved by the DAC. Please contact the
              <a href="mailto:aireadi-dac@ohsu.edu">
                AI-READI Data Access Committee
              </a>
              for additional information.
            </dd>
          </dl>
          </p>

          <p>
            The "Request Status" indicates where the request is at in the
            processing pipeline. It will be one of the following:

          <dl>
            <dt>PENDING</dt>

            <dd>The request has been received and is awaiting processing.</dd>

            <dt>PROCESSING</dt>

            <dd>The request is currently being processed.</dd>

            <dt>READY</dt>

            <dd>
              The request has been successfully processed and the download is
              ready.
            </dd>
          </dl>
          </p>

        </div>

        <p v-else>No download requests found.</p>
      </div>
    </div>
  </main>
</template>
