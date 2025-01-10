import {renderCheckoutHeader} from "./checkout/checkout-header.js";
import {renderOrderSummary} from "./checkout/order-summary.js";
import {renderPaymentSummary} from "./checkout/payment-summary.js";
import {loadProductsFetch} from "../data/products.js";
import {loadCart, loadCartFetch} from "../data/cart.js";
// import "../data/cart-class.js";
// import "../data/car.js";
// import "../data/backend-practice.js";

// async keyword makes the function return a promise
// Best practice is to use async await over promises and callbacks
async function loadPage() {
    try {
        // throw "error1";

        await Promise.all([
            loadProductsFetch(),
            loadCartFetch()
        ]);

    } catch (error) {
        console.log("Unexpected error. Please try again later.");
    }

    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
}

loadPage()

/*
Promise.all([
    loadProductsFetch(),
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })

]).then((values) => {
    console.log(values);
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
new Promise((resolve) => {
    loadProducts(() => {
        resolve("value1");
    });

}).then((value) => {
    console.log(value);
    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });

}).then(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
// Passing an anonymous function
loadProducts(() => {
    loadCart(() => {
        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
    });
});
*/