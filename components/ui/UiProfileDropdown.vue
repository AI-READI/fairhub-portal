<script setup lang="ts">
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const loggedIn = computed(() => user.value);

const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) console.log(error);

  navigateTo("/");
};
</script>

<template>
  <HeadlessMenu
    v-if="loggedIn"
    as="div"
    class="relative inline-block text-left"
  >
    <div>
      <HeadlessMenuButton
        class="bg-opacity-20 hover:bg-opacity-30 focus-visible:ring-opacity-75 inline-flex w-full justify-center rounded-md text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <n-avatar
          :size="35"
          :src="`https://api.dicebear.com/6.x/thumbs/svg?seed=${user?.id}`"
          class="hover:cursor-pointer hover:opacity-80"
          round
        />
      </HeadlessMenuButton>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <HeadlessMenuItems
        class="ring-opacity-5 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 focus:outline-none"
      >
        <div class="px-1 py-1">
          <HeadlessMenuItem v-slot="{ active }">
            <button
              :class="[
                active ? 'bg-violet-500 text-white' : 'text-gray-900',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
              ]"
            >
              <Icon name="uil:edit" class="mr-2 h-5 w-5" aria-hidden="true" />

              Edit
            </button>
          </HeadlessMenuItem>

          <HeadlessMenuItem v-slot="{ active }">
            <button
              :class="[
                active ? 'bg-violet-500 text-white' : 'text-gray-900',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
              ]"
            >
              <Icon name="uil:copy" class="mr-2 h-5 w-5" aria-hidden="true" />
              Duplicate
            </button>
          </HeadlessMenuItem>
        </div>

        <div class="px-1 py-1">
          <HeadlessMenuItem v-slot="{ active }">
            <button
              :class="[
                active ? 'bg-violet-500 text-white' : 'text-gray-900',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
              ]"
            >
              <Icon
                name="uil:archive"
                class="mr-2 h-5 w-5"
                aria-hidden="true"
              />
              Archive
            </button>
          </HeadlessMenuItem>

          <HeadlessMenuItem v-slot="{ active }">
            <button
              :class="[
                active ? 'bg-violet-500 text-white' : 'text-gray-900',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
              ]"
            >
              <Icon
                name="uil:folder-plus"
                class="mr-2 h-5 w-5"
                aria-hidden="true"
              />

              Move
            </button>
          </HeadlessMenuItem>
        </div>

        <div class="px-1 py-1">
          <HeadlessMenuItem v-slot="{ active }">
            <button
              :class="[
                active ? 'bg-violet-500 text-white' : 'text-gray-900',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
              ]"
              @click="logout"
            >
              <Icon
                name="line-md:chevron-right-circle"
                class="mr-2 h-5 w-5"
                aria-hidden="true"
              />

              Logout
            </button>
          </HeadlessMenuItem>
        </div>
      </HeadlessMenuItems>
    </transition>
  </HeadlessMenu>
</template>
