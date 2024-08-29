import { Medusa } from '../utils/medusaClient';
import { useRuntimeConfig, useNuxtApp } from '#imports';

export const useMedusaClient = (): Medusa => {
  const nuxtApp = useNuxtApp();

  const config = useRuntimeConfig().public;

  // Create client if it is not there.
  if (!nuxtApp._medusaClient) {
    nuxtApp._medusaClient = new Medusa({
      baseUrl: config.medusaUrl,
      maxRetries: config.medusaMaxRetries,
      publishableApiKey: config.medusaPublishableApiKey,
      global: config.medusaGlobal,
    });
  }

  return nuxtApp._medusaClient as Medusa
}
