import {cart} from "../../data/cart-class.js";
import {getProductById} from "../../data/products.js";
import {getDeliveryOptionById} from "../../data/delivery-options.js";
import {formatCurrency} from "../utils/money.js";
import {addOrder} from "../../data/orders.js";

export function renderPaymentSummary() {
    let productPriceCents = 0;
    let shippingPriceCents = 0;

    cart.items.forEach((item) => {
        const product = getProductById(item.productId);
        productPriceCents += product.priceCents * item.quantity;

        const deliveryOption = getDeliveryOptionById(item.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;
    });

    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = totalBeforeTaxCents + taxCents;

    document.querySelector(".js-payment-summary").innerHTML = `
      <div class="payment-summary-title">
        Order Summary
      </div>

      <div class="payment-summary-row">
        <div>Items (${cart.calculateCartQuantity()}):</div>
        <div class="payment-summary-money">
          $${formatCurrency(productPriceCents)}
        </div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money js-order-shipping">
          $${formatCurrency(shippingPriceCents)}
        </div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">
          $${formatCurrency(totalBeforeTaxCents)}
        </div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">
          $${formatCurrency(taxCents)}
        </div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money js-order-total">
          $${formatCurrency(totalCents)}
        </div>
      </div>

      <button class="place-order-button button-primary js-place-order">
        Place your order
      </button>
    `;

    document.querySelector(".js-place-order")
        .addEventListener("click", async () => {
            try {
                const response = await fetch("https://supersimplebackend.dev/orders", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        cart: cart.items
                    })
                });

                const order = await response.json();
                addOrder(order);
            } catch (error) {
                console.log("Unexpected error. Try again later.");
            }

            window.location.href = "orders.html";
    });
}