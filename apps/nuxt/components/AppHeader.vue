<template>
  <div class="w-full bg-primary">
    <div
      class="mx-auto grid h-full grid-cols-3 items-center justify-between py-2 text-white md:min-h-48 md:w-6/12"
    >
      <div class="grid md:grid-cols-2 md:justify-items-end">
        <span
          class="mx-4 flex cursor-pointer items-center text-nowrap rounded-md p-4"
          @click="menuOpen = true"
        >
          <Icon name="heroicons:bars-3-16-solid" />
          <span class="ml-2 hidden font-bold md:inline-block">Menu</span>
        </span>

        <NuxtLink
          class="hidden cursor-pointer items-center text-nowrap p-4 md:flex"
          to="/search"
        >
          <Icon name="heroicons:magnifying-glass-16-solid" />
          <span class="ml-2 font-bold">Search</span>
        </NuxtLink>
      </div>

      <div class="flex flex-1 justify-center">
        <div class="flex items-center justify-center md:px-12">
          <nuxt-link to="/" class="h-24 w-24 overflow-hidden">
            <NuxtImg
              src="/logo.svg"
              alt="Logo"
              class="object-fit h-full w-full"
            />
          </nuxt-link>
        </div>
      </div>

      <div class="grid justify-items-end md:grid-cols-2 md:justify-items-start">
        <span
          class="hidden cursor-pointer items-center text-nowrap p-4 md:flex"
        >
          <Icon name="heroicons:user-16-solid" class="text-white" />
          <span class="ml-2 hidden font-bold md:inline-block">Profile</span>
        </span>

        <span
          class="mx-4 cursor-pointer items-center text-nowrap p-4"
          @click="cartOpen = true"
        >
          <Icon name="heroicons:shopping-bag-16-solid" class="text-white" />
          <span class="ml-2 hidden font-bold md:inline-block">Cart</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const menuStatusStore = useMenuStatusStore();
const { open: menuOpen } = storeToRefs(menuStatusStore);

const cartStatusStore = useCartStatusStore();
const { open: cartOpen } = storeToRefs(cartStatusStore);
</script>
