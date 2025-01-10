import {deliveryOptions} from "./delivery-options.js";

class Cart {
    items; // public property/field
    #localStorageKey; // private property/field

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage() {
        this.items = JSON.parse(localStorage.getItem(this.#localStorageKey));

        if (!this.items) {
            this.items = [
                {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 2,
                    deliveryOptionId: "1"
                },
                {
                    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                    quantity: 1,
                    deliveryOptionId: "2"
                }
            ];
        }
    }

    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.items));
    }

    addToCart(productId, quantity) {
        let matchingItem;

        this.items.forEach((item) => {
            if (productId === item.productId) {
                matchingItem = item;
            }
        });

        if (matchingItem) {
            matchingItem.quantity += quantity;
        } else {
            this.items.push({
                productId,
                quantity,
                deliveryOptionId: "1"
            });
        }

        this.saveToStorage();
    }

    removeFromCart(productId) {
        this.items = this.items.filter((item) => item.productId !== productId);
        this.saveToStorage();
    }

    calculateCartQuantity() {
        return this.items.reduce((accum, value) => accum + value.quantity, 0);
    }

    updateQuantity(productId, newQuantity) {
        const cartItem = this.items.find((item) => item.productId === productId);
        cartItem.quantity = newQuantity;
        this.saveToStorage();
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        const cartItem = this.items.find((item) => item.productId === productId);
        const isOptionValid = deliveryOptions.some((option) => option.id === deliveryOptionId);

        if (!cartItem || !isOptionValid) return;

        cartItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
    }
}

export const cart = new Cart("cart-oop");

const businessCart = new Cart("cart-business");

console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);
