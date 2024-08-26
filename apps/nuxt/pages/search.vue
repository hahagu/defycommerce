<script lang="ts" setup>
const route = useRoute();
const searchQuery = ref((route.query.q as string) ?? "");

const client = useMedusaClient();
const { products } = await client.products.list();

const filteredProducts = computed(() => {
  if (!searchQuery.value) {
    return products;
  }
  return products.filter((product) =>
    product.title?.toLowerCase().includes(searchQuery.value.toLowerCase()),
  );
});
</script>

<template>
  <section class="mb-4 flex">
    <AppSearchbox v-model="searchQuery"></AppSearchbox>
  </section>
  <section class="flex flex-col">
    <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
      <div v-for="product in filteredProducts" :key="product.id">
        <ShopListingCard v-if="product.id" :productId="product.id" />
      </div>
    </div>
  </section>
</template>
