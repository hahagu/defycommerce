export const useCartStatusStore = defineStore('cartStatusStore', () => {
    const open = ref(false);
    const cart_id = ref<string | null>(null);

    return { open, cart_id };
}, {
    persist: true
});