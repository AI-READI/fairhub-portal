<script setup lang="ts">
const props = defineProps({
  id: {
    required: true,
    type: Number,
  },
  creators: {
    required: true,
    type: Array as PropType<DatasetDescription["Creator"][]>,
  },
});

const {
  data: citation,
  error,
  pending,
} = await useFetch(`/api/citation/${props.id}`, {
  lazy: true,
  server: false,
});

// todo: add a watchEffect for the error responses
</script>

<template>
  <n-space
    vertical
    class="rounded-xl border border-blue-200 bg-slate-50 px-4 pb-5 pt-3"
  >
    <n-space vertical :size="[0, 0]">
      <h3 class="mb-3">Citation</h3>

      <TransitionFade>
        <div v-if="pending" class="flex justify-center p-2">
          <Icon name="svg-spinners:3-dots-scale" size="30" />
        </div>

        <div v-else>
          <div class="">
            <p class="pb-1 text-sm font-medium">
              When using this resource, please cite:
            </p>

            <p class="text-sm">
              <span v-for="(creator, index) in creators" :key="index">
                {{ creator?.creatorName.trim()
                }}<template v-if="index !== creators.length - 1"
                  ><span class="mr-2">,</span></template
                >

                <template v-else><span class="mr-2">.</span></template>
              </span>

              <span>({{ citation?.split.split("(")[1] }}</span>

              <span>({{ citation?.split.split("(")[2] }}</span>

              <br />

              <NuxtLink
                :to="citation?.doi"
                class="underline transition-all hover:text-slate-600"
              >
                {{ citation?.doi }}</NuxtLink
              >.
            </p>
          </div>
        </div>
      </TransitionFade>
    </n-space>
  </n-space>
</template>
