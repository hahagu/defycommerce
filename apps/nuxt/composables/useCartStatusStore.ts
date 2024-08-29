export const useCartStatusStore = defineStore('cartStatusStore', () => {
    const open = ref(false);
    function toggle(newValue: boolean | undefined = undefined) {
        open.value = newValue ?? !open.value;
    }
    return { open, toggle };
});