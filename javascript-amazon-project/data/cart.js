import {deliveryOptions} from "./delivery-options.js";
import {Appliance, Clothing, Product, products} from "./products.js";

export let cart;

loadFromStorage();

export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem("cart"));

    if (!cart) {
        cart = [
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

function saveToStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    const selector = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = parseInt(selector.value);

    if (matchingItem) {
        matchingItem.quantity += quantity;
    } else {
        cart.push({
            productId,
            quantity,
            deliveryOptionId: "1"
        });
    }

    saveToStorage();
}

export function removeFromCart(productId) {
    cart = cart.filter((cartItem) => cartItem.productId !== productId);
    saveToStorage();
}

export function calculateCartQuantity() {
    return cart.reduce((accum, value) => accum + value.quantity, 0);
}

export function updateQuantity(productId, newQuantity) {
    const cartItem = cart.find((cartItem) => cartItem.productId === productId);
    cartItem.quantity = newQuantity;
    saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    const cartItem = cart.find((item) => item.productId === productId);
    const isOptionValid = deliveryOptions.some((option) => option.id === deliveryOptionId);

    if (!cartItem || !isOptionValid) return;

    cartItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}

export function loadCart(fun) {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("load", () => {
        console.log(xhr.response);
        fun();
    });

    xhr.open("GET", "https://supersimplebackend.dev/cart");
    xhr.send();
}

export async function loadCartFetch() {
    const response = await fetch("https://supersimplebackend.dev/cart")
    const content = await response.text();
    console.log(content);
}