<script lang="ts" setup>
const client = useMedusaClient();
const { products } = await client.products.list();
</script>

<template>
  <section class="flex h-96">
    <div class="absolute inset-x-0 h-96 overflow-hidden">
      <NuxtImg
        src="/hero.jpg"
        alt="Hero"
        class="h-full w-full object-cover object-center"
      />
    </div>
  </section>
  <section class="flex flex-col">
    <div class="w-full text-center">
      <h2 class="my-8 text-2xl font-bold">Explore Our Collection</h2>
    </div>
    <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
      <div v-for="product in products" :key="product.id">
        <ShopListingCard v-if="product.id" :productId="product.id" />
      </div>
    </div>
  </section>
</template>
