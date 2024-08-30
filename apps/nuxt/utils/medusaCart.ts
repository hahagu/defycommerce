import { Cart, LineItem } from "@medusajs/medusa";
import type { PricedVariant } from "@medusajs/medusa/dist/types/pricing";
import { computedAsync } from "@vueuse/core";

class MedusaCart {
    private client = useMedusaClient();
    private _cart: Omit<Cart, "refundable_amount" | "refunded_amount"> | null = null;
    private _updateCartFlag = ref(false);

    public items = computed(() => { return this.cartItem.value.items; });

    public cartItem = computedAsync(async () => {
        const cartStore = useCartStatusStore();
        const { cart_id } = storeToRefs(cartStore);

        if (!this._updateCartFlag.value && this._cart) {
            return this._cart;
        }

        this._updateCartFlag.value = false;

        if (cart_id.value) {
            const { cart } = await this.client.carts.retrieve(cart_id.value);
            return cart;
        } else {
            const { cart } = await this.client.carts.create();
            cart_id.value = cart.id;
            return cart;
        }
    });

    constructor() {
    }

    public async refresh() {
        this._updateCartFlag.value = true;
        return this.cartItem.value;
    }

    public async addItem(variant: PricedVariant, quantity: number) {
        if (!variant.id) throw new Error("Cart: Given variant does not have an id");

        const { cart } = await this.client.carts.lineItems.create(this.cartItem.value.id, {
            variant_id: variant.id,
            quantity: quantity,
        });
        this._updateCartFlag.value = true;
        return cart;
    }

    findVariantLineItem(variant: PricedVariant) {
        return this.cartItem.value.items.find((item) => item.variant_id === variant.id);
    }

    public async removeItem(lineId: string) {
        const { cart } = await this.client.carts.lineItems.delete(this.cartItem.value.id, lineId);
        this._updateCartFlag.value = true;
        return cart;
    }

    public async updateItem(lineId: string, quantity: number) {
        const { cart } = await this.client.carts.lineItems.update(this.cartItem.value.id, lineId, {
            quantity: quantity,
        });
        this._updateCartFlag.value = true;
        return cart;
    }
}

export { MedusaCart };