// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  devtools: {
    enabled: true
  },

  runtimeConfig: {
    public: {
      medusaUrl: process.env.MEDUSA_URL || 'http://localhost:9000',
    }
  },

  modules: [
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
  }
})