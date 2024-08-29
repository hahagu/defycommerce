import { Medusa } from '@/utils/medusaClient';
import type { H3Event } from 'h3'
import { useRuntimeConfig } from '#imports'

const serverMedusaClient = (event: H3Event): Medusa => {

    const config = useRuntimeConfig().public;
    const privateConfig = useRuntimeConfig().private;

    if (!event.context._medusaClient) {
        const medusaClient = new Medusa({
            apiKey: privateConfig.medusaApiKey,
            baseUrl: config.medusaUrl,
            maxRetries: config.medusaMaxRetries,
            publishableApiKey: config.medusaPublishableApiKey,
            global: config.medusaGlobal,
        });

        event.context._medusaClient = medusaClient
    }

    return event.context._medusaClient as Medusa
}

export { serverMedusaClient };