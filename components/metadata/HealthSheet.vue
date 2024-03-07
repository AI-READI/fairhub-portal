<script setup lang="ts">
defineProps({
  healthsheet: {
    required: true,
    type: Object as PropType<HealthsheetRecords>,
  },
});
</script>

<template>
  <n-space vertical size="large">
    <CardCollapsibleCard title="Motivation" :collapse="false">
      <n-space vertical size="large">
        <div v-for="item in healthsheet.motivation" :key="item.id">
          <h3 class="mb-1 w-full border-b text-base font-semibold">
            {{ item.question }}
          </h3>

          <p v-if="item.response.trim()">{{ item.response }}</p>

          <p v-else class="italic">N/A</p>
        </div>
      </n-space>
    </CardCollapsibleCard>

    <CardCollapsibleCard title="Composition">
      <n-space vertical size="large">
        <div v-for="item in healthsheet.composition" :key="item.id">
          <h3 class="mb-1 w-full border-b text-base font-semibold">
            {{ item.question }}
          </h3>

          <p v-if="item.response.trim()">{{ item.response }}</p>

          <p v-else class="italic">N/A</p>
        </div>
      </n-space>
    </CardCollapsibleCard>

    <CardCollapsibleCard title="Collection">
      <n-space vertical size="large">
        <div v-for="item in healthsheet.collection" :key="item.id">
          <h3 class="mb-1 w-full border-b text-base font-semibold">
            {{ item.question }}
          </h3>

          <p v-if="item.response.trim()">{{ item.response }}</p>

          <p v-else class="italic">N/A</p>
        </div>
      </n-space>
    </CardCollapsibleCard>

    <CardCollapsibleCard title="Preprocessing / Cleaning / Labeling">
      <n-space vertical size="large">
        <div v-for="item in healthsheet.preprocessing" :key="item.id">
          <h3 class="mb-1 w-full border-b text-base font-semibold">
            {{ item.question }}
          </h3>

          <p v-if="item.response.trim()">{{ item.response }}</p>

          <p v-else class="italic">N/A</p>
        </div>
      </n-space>
    </CardCollapsibleCard>

    <CardCollapsibleCard title="Uses">
      <n-space vertical size="large">
        <div v-for="item in healthsheet.uses" :key="item.id">
          <h3 class="mb-1 w-full border-b text-base font-semibold">
            {{ item.question }}
          </h3>

          <p v-if="item.response.trim()">{{ item.response }}</p>

          <p v-else class="italic">N/A</p>
        </div>
      </n-space>
    </CardCollapsibleCard>

    <CardCollapsibleCard title="Distribution">
      <n-space vertical size="large">
        <div v-for="item in healthsheet.distribution" :key="item.id">
          <h3 class="mb-1 w-full border-b text-base font-semibold">
            {{ item.question }}
          </h3>

          <p v-if="item.response.trim()">{{ item.response }}</p>

          <p v-else class="italic">N/A</p>
        </div>
      </n-space>
    </CardCollapsibleCard>

    <CardCollapsibleCard title="Maintenance">
      <n-space vertical size="large">
        <div v-for="item in healthsheet.maintenance" :key="item.id">
          <h3 class="mb-1 w-full border-b text-base font-semibold">
            {{ item.question }}
          </h3>

          <p v-if="item.response.trim()">{{ item.response }}</p>

          <p v-else class="italic">N/A</p>
        </div>
      </n-space>
    </CardCollapsibleCard>
  </n-space>
</template>
