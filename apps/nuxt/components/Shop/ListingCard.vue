<script lang="ts" setup>
const props = defineProps<{
  productId: string;
}>();

const client = useMedusaClient();
const { product } = await client.products.retrieve(props.productId);

const currentPrice = computed(() => {
  const price = product?.variants?.[0]?.prices?.[0];

  if (price) {
    return `${price.amount / 100} ${price?.currency_code.toUpperCase()}`;
  }

  return 0;
});
</script>

<template>
  <NuxtLink class="flex flex-col" :to="'/product/' + product.id">
    <div class="overflow-hidden rounded-lg">
      <NuxtImg
        class="aspect-square object-cover"
        :src="product.thumbnail ?? '/placeholder.jpg'"
        :alt="product.title"
      />
    </div>
    <div class="py-6">
      <h5 class="mb-3 text-lg font-bold">{{ product.title }}</h5>
      <pre class="mb-4 text-gray-500">{{ currentPrice }}</pre>
    </div>
  </NuxtLink>
</template>
