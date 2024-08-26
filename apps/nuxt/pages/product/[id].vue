<script lang="ts" setup>
const route = useRoute();
const productId = ref(route.params.id as string);

const client = useMedusaClient();
const { product } = await client.products.retrieve(productId.value);

const breadcrumbs = computed(() => {
  return [
    {
      id: 1,
      name: "Home",
      href: "/",
    },
    {
      id: 2,
      name: "Products",
      href: "/",
    },
  ];
});

const productPrice = computed(() => {
  const price = product?.variants?.[0]?.prices?.[0];

  if (price) {
    return `${price.amount / 100} ${price?.currency_code.toUpperCase()}`;
  }

  return 0;
});
</script>

<template>
  <div class="bg-white">
    <div class="pb-16 pt-6 sm:pb-24">
      <nav
        aria-label="Breadcrumb"
        class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <ol role="list" class="flex items-center space-x-4">
          <li v-for="breadcrumb in breadcrumbs" :key="breadcrumb.id">
            <div class="flex items-center">
              <a
                :href="breadcrumb.href"
                class="mr-4 text-sm font-medium text-gray-900"
                >{{ breadcrumb.name }}</a
              >
              <svg
                viewBox="0 0 6 20"
                aria-hidden="true"
                class="h-5 w-auto text-gray-300"
              >
                <path
                  d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </li>
          <li class="text-sm">
            <NuxtLink
              :to="'/product/' + product.id"
              aria-current="page"
              class="font-medium text-gray-500 hover:text-gray-600"
            >
              {{ product.title }}
            </NuxtLink>
          </li>
        </ol>
      </nav>
      <div class="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div class="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
          <div class="lg:col-span-5 lg:col-start-8">
            <div class="flex justify-between">
              <h1 class="text-xl font-medium text-gray-900">
                {{ product.title }}
              </h1>
              <p class="text-xl font-medium text-gray-900">
                {{ productPrice }}
              </p>
            </div>
            <!-- Reviews -->
            <div class="mt-4">
              <h2 class="sr-only">Reviews</h2>
              <div class="flex items-center">
                <p class="text-sm text-gray-700">
                  {{ product.rating }}
                  <span class="sr-only"> out of 5 stars</span>
                </p>
                <div class="ml-1 flex items-center">
                  <Icon
                    name="heroicons:star-16-solid"
                    v-for="rating in [0, 1, 2, 3, 4]"
                    :key="rating"
                    :class="[
                      product.rating > rating
                        ? 'text-yellow-400'
                        : 'text-gray-200',
                      'h-5 w-5 flex-shrink-0',
                    ]"
                    aria-hidden="true"
                  />
                </div>
                <div aria-hidden="true" class="ml-4 text-sm text-gray-300">
                  ·
                </div>
                <div class="ml-4 flex">
                  <a
                    href="#"
                    class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >See all {{ product.reviewCount }} reviews</a
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- Image gallery -->
          <div
            class="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0"
          >
            <h2 class="sr-only">Images</h2>

            <div
              class="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8"
            >
              <img
                v-if="product.thumbnail"
                :src="product.thumbnail"
                :alt="'Product image'"
                class="rounded-lg lg:col-span-2 lg:row-span-2"
              />
              <img
                v-for="image in product.images"
                :key="image.id"
                :src="image.url"
                :alt="'Product image'"
                class="hidden rounded-lg lg:block"
              />
            </div>
          </div>

          <div class="mt-8 lg:col-span-5">
            <form>
              <div class="mt-8" v-for="option in product.options">
                <div class="flex items-center justify-between">
                  <h2 class="text-sm font-medium text-gray-900">
                    {{ option.title }}
                  </h2>
                  <a
                    v-if="option.metadata?.description"
                    href="#"
                    class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {{ option.metadata.description }}
                  </a>
                </div>

                <fieldset aria-label="Choose a size" class="mt-2">
                  <RadioGroup class="grid grid-cols-3 gap-3 sm:grid-cols-6">
                    <RadioGroupOption
                      as="template"
                      v-for="optionValue in option.values"
                      :key="optionValue.id"
                      :value="optionValue.value"
                      :disabled="optionValue.variant?.inventory_quantity > 0"
                      v-slot="{ active, checked }"
                    >
                      <div
                        :class="[
                          optionValue.variant?.inventory_quantity > 0
                            ? 'cursor-pointer focus:outline-none'
                            : 'cursor-not-allowed opacity-25',
                          active ? 'ring-2 ring-indigo-500 ring-offset-2' : '',
                          checked
                            ? 'border-transparent bg-indigo-600 text-white hover:bg-indigo-700'
                            : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50',
                          'flex items-center justify-center rounded-md border px-3 py-3 text-sm font-medium uppercase sm:flex-1',
                        ]"
                      >
                        {{ optionValue.value }}
                      </div>
                    </RadioGroupOption>
                  </RadioGroup>
                </fieldset>
              </div>

              <button
                type="submit"
                class="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to cart
              </button>
            </form>

            <!-- Product details -->
            <div class="mt-10">
              <h2 class="text-sm font-medium text-gray-900">Description</h2>

              <div
                class="prose prose-sm mt-4 text-gray-500"
                v-html="product.description"
              />
            </div>

            <div class="mt-8 border-t border-gray-200 pt-8">
              <h2 class="text-sm font-medium text-gray-900">
                Fabric &amp; Care
              </h2>

              <div class="prose prose-sm mt-4 text-gray-500">
                <ul role="list">
                  <li v-for="item in product.metadata?.fabric_care" :key="item">
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>

            <!-- Policies -->
            <!-- <section aria-labelledby="policies-heading" class="mt-10">
              <h2 id="policies-heading" class="sr-only">Our Policies</h2>

              <dl
                class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
              >
                <div
                  v-for="policy in policies"
                  :key="policy.name"
                  class="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center"
                >
                  <dt>
                    <component
                      :is="policy.icon"
                      class="mx-auto h-6 w-6 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <span class="mt-4 text-sm font-medium text-gray-900">{{
                      policy.name
                    }}</span>
                  </dt>
                  <dd class="mt-1 text-sm text-gray-500">
                    {{ policy.description }}
                  </dd>
                </div>
              </dl>
            </section> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
