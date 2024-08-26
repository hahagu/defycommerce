<template>
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-10" @close="open = false">
      <TransitionChild
        as="template"
        enter="ease-in-out duration-500"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in-out duration-500"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-primary bg-opacity-75 transition-opacity"
        />
      </TransitionChild>
      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10"
          >
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-300"
              enter-from="-translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leave-from="translate-x-0"
              leave-to="-translate-x-full"
            >
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <div
                  class="flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl"
                >
                  <div class="px-4 sm:px-6">
                    <div class="flex items-start justify-between">
                      <DialogTitle
                        class="text-base font-semibold leading-6 text-gray-900"
                        >Menu</DialogTitle
                      >
                      <div class="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          class="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                          @click="open = false"
                        >
                          <span class="absolute -inset-2.5" />
                          <span class="sr-only">Close panel</span>
                          <Icon
                            name="heroicons:x-mark-16-solid"
                            class="h-6 w-6"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="relative mt-6 flex-1">
                    <span
                      class="flex w-full cursor-pointer items-center p-4 transition-all hover:bg-primary hover:text-white"
                    >
                      <Icon name="heroicons:home-16-solid" />
                      <span class="ml-4 font-bold">Home</span>
                    </span>
                    <span
                      class="flex w-full cursor-pointer items-center p-4 transition-all hover:bg-primary hover:text-white"
                    >
                      <Icon name="heroicons:magnifying-glass-16-solid" />
                      <span class="ml-4 font-bold">Search</span>
                    </span>
                    <span
                      class="flex w-full cursor-pointer items-center p-4 transition-all hover:bg-primary hover:text-white"
                    >
                      <Icon name="heroicons:user-16-solid" />
                      <span class="ml-4 font-bold">Profile</span>
                    </span>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
const menuStatusStore = useMenuStatusStore();
const { open } = storeToRefs(menuStatusStore);
</script>
