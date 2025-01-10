import {cart} from "../../data/cart-class.js";

describe("test suite: addToCart", () => {
    beforeEach(() => spyOn(localStorage, "setItem"));

    it("should add a new product to an existing cart", () => {
        const productId = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";

        cart.items = [
            {
                productId: productId,
                quantity: 1,
                deliveryOptionId: "1"
            }
        ];

        cart.addToCart(productId, 1);

        expect(cart.items.length).toEqual(1);
        expect(cart.items[0].productId).toEqual(productId);
        expect(cart.items[0].quantity).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledOnceWith("cart-oop", JSON.stringify([
            {
                productId: productId,
                quantity: 2,
                deliveryOptionId: "1"
            }
        ]));
    });

    it("should add a new product to an empty cart", () => {
        const productId = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";

        cart.items = [];

        cart.addToCart(productId, 1);

        expect(cart.items.length).toEqual(1);
        expect(cart.items[0].productId).toEqual(productId);
        expect(cart.items[0].quantity).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledOnceWith("cart-oop", JSON.stringify([
            {
                productId: productId,
                quantity: 1,
                deliveryOptionId: "1"
            }
        ]))
    });
});

describe("test suite: removeFromCart", () => {
    beforeEach(() => {
        spyOn(localStorage, "setItem");

        cart.items = [
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
    });

    it('should remove a product from the cart', () => {
        const productId = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";

        cart.removeFromCart(productId);

        expect(cart.items.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledOnceWith("cart-oop", JSON.stringify([
            {
                productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 1,
                deliveryOptionId: "2"
            }
        ]));
        expect(cart.items[0].productId).toEqual("15b6fc6f-327a-4ec4-896f-486349e85a3d");
    });

    it('should do nothing when removing a product that is not in the cart', () => {
        const productId = "83d4ca15-0f35-48f5-b7a3-1ea210004f2e";

        cart.removeFromCart(productId);

        expect(cart.items.length).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledOnceWith("cart-oop", JSON.stringify([
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
        ]));
        expect(cart.items[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart.items[0].quantity).toEqual(2);
        expect(cart.items[1].productId).toEqual("15b6fc6f-327a-4ec4-896f-486349e85a3d");
        expect(cart.items[1].quantity).toEqual(1);
    });
});

describe("test suite: updateDeliveryOption", () => {
    beforeEach(() => {
        spyOn(localStorage, "setItem");

        cart.items = [
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
    });

    it('should update the delivery option of a product in the cart', () => {
        const productId = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
        const deliveryOptionId = "3";

        cart.updateDeliveryOption(productId, deliveryOptionId);

        expect(cart.items.length).toEqual(2);
        expect(cart.items[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart.items[0].quantity).toEqual(2);
        expect(cart.items[1].productId).toEqual("15b6fc6f-327a-4ec4-896f-486349e85a3d");
        expect(cart.items[1].quantity).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledOnceWith("cart-oop", JSON.stringify([
            {
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 2,
                deliveryOptionId: "3"
            },
            {
                productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 1,
                deliveryOptionId: "2"
            }
        ]));
    });

    it('should do nothing when passing the id of a product that is not in the cart', () => {
        const productId = "83d4ca15-0f35-48f5-b7a3-1ea210004f2e";
        const deliveryOptionId = "3";

        cart.updateDeliveryOption(productId, deliveryOptionId);

        expect(cart.items.length).toEqual(2);
        expect(cart.items[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart.items[0].quantity).toEqual(2);
        expect(cart.items[1].productId).toEqual("15b6fc6f-327a-4ec4-896f-486349e85a3d");
        expect(cart.items[1].quantity).toEqual(1);
        expect(localStorage.setItem).not.toHaveBeenCalled();
    });

    it('should do nothing when passing an invalid delivery option id', () => {
        const productId = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
        const deliveryOptionId = "-999999";

        cart.updateDeliveryOption(productId, deliveryOptionId);

        expect(cart.items.length).toEqual(2);
        expect(cart.items[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart.items[0].quantity).toEqual(2);
        expect(cart.items[1].productId).toEqual("15b6fc6f-327a-4ec4-896f-486349e85a3d");
        expect(cart.items[1].quantity).toEqual(1);
        expect(localStorage.setItem).not.toHaveBeenCalled();
    });
});