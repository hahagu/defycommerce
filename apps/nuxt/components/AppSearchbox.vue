<template>
  <div class="relative mt-2 w-full rounded-md">
    <div
      class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
    >
      <Icon
        name="heroicons:magnifying-glass"
        class="h-5 w-5 text-gray-400"
        aria-hidden="true"
      />
    </div>
    <input
      type="text"
      name="search"
      id="search"
      placeholder="Search"
      class="block w-full rounded-full border-0 py-1.5 pl-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
      v-model="model"
    />
  </div>
</template>

<script lang="ts" setup>
const model = defineModel<string>();
</script>
