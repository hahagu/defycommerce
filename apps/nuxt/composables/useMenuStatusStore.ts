export const useMenuStatusStore = defineStore('menuStatusStore', () => {
    const open = ref(false);
    function toggle(newValue: boolean | undefined = undefined) {
        open.value = newValue ?? !open.value;
    }
    return { open, toggle };
});