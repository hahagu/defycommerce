import { MedusaCart } from "~/utils/medusaCart";

export const useCart = () => {
    const nuxt = useNuxtApp();

    if (!nuxt._medusaCart) {
        nuxt._medusaCart = new MedusaCart();
    }

    return nuxt._medusaCart as MedusaCart;
};