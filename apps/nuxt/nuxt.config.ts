// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  devtools: {
    enabled: true
  },

  modules: [
    'nuxt-medusa',
    '@nuxtjs/tailwindcss',
    'nuxt-headlessui',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    '@nuxt/icon',
    '@vee-validate/nuxt',
    '@pinia/nuxt',
  ],

  veeValidate: {
    autoImports: true,
  },

  headlessui: {
    prefix: ''
  },

  medusa: {
    server: true
  },

  vite: {
    optimizeDeps: {
      include: ["axios", "cross-env", "qs", "retry-axios", "uuid", "@lambdacurry/medusa-plugin-product-reviews-client"],
    },
  },
})