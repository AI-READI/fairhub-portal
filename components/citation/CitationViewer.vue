<script setup lang="ts">
const props = defineProps({
  id: {
    required: true,
    type: Number,
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
    class="rounded-xl border border-purple-200 bg-slate-50 px-4 pb-5 pt-3"
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
              {{ citation?.split }}

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
