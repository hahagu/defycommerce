<script setup lang="ts">
import type { PricedProduct, PricedVariant } from '@medusajs/medusa/dist/types/pricing';
const cartStatusStore = useCartStatusStore();
const { open } = storeToRefs(cartStatusStore);

const cart = useCart();
const cartItems = cart.items;

const client = useMedusaClient();

interface ItemData {
  image: string;
  price: string;
  product: PricedProduct;
}

const itemData = ref<Record<string, ItemData>>({});

const currencyString = ref('');

const getVariantPrice = (variant: PricedVariant) => {
  const price = variant.prices[0];

  if (price) {
    currencyString.value = price.currency_code.toUpperCase();
    return `${price.amount / 100} ${price?.currency_code.toUpperCase()}`;
  }

  return 'Price Unavailable';
};

const updateData = async () => {
  for (const item of cartItems.value) {
    const productId = item.variant.product_id;
    if (!productId) {
      continue;
    }

    const { variant } = await client.products.variants.retrieve(item.variant_id!);
    const price = getVariantPrice(variant);

    const { product } = await client.products.retrieve(productId);

    itemData.value[item.id] = {
      image: product.thumbnail ?? '/placeholder.jpg',
      price,
      product
    };
  }
};

const removeItem = async (itemId: string) => {
  await cart.removeItem(itemId);
  await updateData();
};

onMounted(async () => {
  await updateData();

  watch(cartItems, async () => {
    await updateData();
  });
});
</script>
<template>
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-10" @close="open = false">
      <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-primary bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <TransitionChild as="template" enter="transform transition ease-in-out duration-500" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500" leave-from="translate-x-0" leave-to="translate-x-full">
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div class="flex items-start justify-between">
                      <DialogTitle class="text-lg font-medium text-neutral-900">Shopping cart</DialogTitle>
                      <div class="ml-3 flex h-7 items-center">
                        <button type="button" class="relative -m-2 p-2 text-neutral-400 hover:text-neutral-500" @click="open = false">
                          <span class="absolute -inset-0.5" />
                          <span class="sr-only">Close panel</span>
                          <Icon
                            name="heroicons:x-mark-16-solid"
                            class="h-6 w-6"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </div>

                    <div class="mt-8">
                      <div class="flow-root">
                        <ul role="list" class="-my-6 divide-y divide-neutral-200">
                          <li v-for="item in cartItems" :key="item.id" class="flex py-6">
                            <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-neutral-200">
                              <img :src="itemData[item.id]?.image" class="h-full w-full object-cover object-center" />
                            </div>

                            <div class="ml-4 flex flex-1 flex-col">
                              <div>
                                <div class="flex justify-between text-base font-medium text-neutral-900">
                                  <div>
                                    <a :href="'/products/' + item.product_id">{{ item.title }}</a>
                                    <p>{{ item.description }}</p>
                                  </div>
                                  <p class="ml-4">{{ itemData[item.id]?.price }}</p>
                                </div>
                              </div>
                              <div class="flex flex-1 items-end justify-between text-sm">
                                <p class="text-neutral-500">Qty {{ item.quantity }}</p>

                                <div class="flex">
                                  <button type="button" class="font-medium text-primary hover:text-primary-hover" @click="removeItem(item.id)">Remove</button>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="border-t border-neutral-200 px-4 py-6 sm:px-6">
                    <div class="flex justify-between text-base font-medium text-neutral-900">
                      <p>Subtotal</p>
                      <p>{{ cart.cartItem.value.subtotal ? cart.cartItem.value.subtotal / 100 : 'Unavailable' }} {{ currencyString }}</p>
                    </div>
                    <p class="mt-0.5 text-sm text-neutral-500">Shipping and taxes calculated at checkout.</p>
                    <div class="mt-6">
                      <a href="#" class="flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-hover">Checkout</a>
                    </div>
                    <div class="mt-6 flex justify-center text-center text-sm text-neutral-500">
                      <p>
                        or{{ ' ' }}
                        <button type="button" class="font-medium text-primary hover:text-primary-hover" @click="open = false">
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
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
