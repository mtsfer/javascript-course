import {renderOrderSummary} from "../../scripts/checkout/order-summary.js";
import {cart} from "../../data/cart-class.js";
import {loadProductsFetch} from "../../data/products.js";

describe("test suite: renderOrderSummary", () => {
    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

    /*
    // Jasmine hook
    beforeAll((done) => {
        // Wait loadProducts() call to finish
        loadProductsFetch().then(() => {
            done(); // Provided by Jasmine, let us control when to go to the next step
        });
    });
    */

    beforeAll(async () => await loadProductsFetch());

    beforeEach(() => {
        document.querySelector(".js-test-container").innerHTML = `
            <div class="js-checkout-header"></div>
            <div class="js-order-summary"></div>
            <div class="js-payment-summary"></divc>
        `;

        spyOn(localStorage, "setItem");

        cart.items = [
            {
                productId: productId1,
                quantity: 2,
                deliveryOptionId: "1"
            },
            {
                productId: productId2,
                quantity: 1,
                deliveryOptionId: "2"
            }
        ];

        renderOrderSummary();
    });

    afterEach(() => document.querySelector(".js-test-container").innerHTML = "");

    it("should display the cart", () => {
        expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(2);
        expect(document.querySelector(`.js-product-quantity-${productId1}`).textContent)
            .toContain("Quantity: 2");
        expect(document.querySelector(`.js-product-quantity-${productId2}`).textContent)
            .toContain("Quantity: 1");
        expect(document.querySelector(`.js-product-name-${productId1}`).innerText)
            .toEqual("Black and Gray Athletic Cotton Socks - 6 Pairs");
        expect(document.querySelector(`.js-product-name-${productId2}`).innerText)
            .toEqual("Intermediate Size Basketball");
        expect(document.querySelector(`.js-product-price-${productId1}`).innerText).toEqual("$10.90");
        expect(document.querySelector(`.js-product-price-${productId2}`).innerText).toEqual("$20.95");
    });

    it('should remove a product', () => {
        document.querySelector(`.js-delete-link-${productId1}`).click();

        expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(1);
        expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toBeNull();
        expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toBeNull();
        expect(document.querySelector(`.js-product-name-${productId2}`).innerText)
            .toEqual("Intermediate Size Basketball");
        expect(document.querySelector(`.js-product-price-${productId2}`).innerText)
            .toEqual("$20.95");
        expect(cart.items.length).toEqual(1);
        expect(cart.items[0].productId).toEqual(productId2);
    });

    it('should update the delivery option', () => {
        const optionId = "3";

        document.querySelector(`.js-delivery-option-${productId1}-${optionId}`).click();

        expect(document.querySelector(`.js-delivery-option-input-${productId1}-${optionId}`).checked)
            .toBeTrue();
        expect(cart.items.length).toEqual(2);
        expect(cart.items[0].productId).toEqual(productId1);
        expect(cart.items[0].deliveryOptionId).toEqual(optionId);
        expect(document.querySelector(".js-order-shipping").innerText)
            .toEqual("$14.98");
        expect(document.querySelector(".js-order-total").innerText)
            .toEqual("$63.50");
    });
});