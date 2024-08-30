export const useMenuStatusStore = defineStore('menuStatusStore', () => {
    const open = ref(false);
    return { open };
}, {
    persist: true
});