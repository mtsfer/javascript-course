// Named export
import {cart} from "../../data/cart-class.js";
import {getProductById} from "../../data/products.js";
import {formatCurrency} from "../utils/money.js";
import {calculateDeliveryDate, deliveryOptions, getDeliveryOptionById} from "../../data/delivery-options.js";
import {renderPaymentSummary} from "./payment-summary.js";
import {renderCheckoutHeader} from "./checkout-header.js";

export function renderOrderSummary() {
    renderCheckoutHeader();

    let cartSummaryHTML = "";
    cart.items.forEach((item) => {
        const product = getProductById(item.productId);

        const deliveryOption = getDeliveryOptionById(item.deliveryOptionId);
        const deliveryDate = calculateDeliveryDate(deliveryOption);

        cartSummaryHTML += `
          <div class="cart-item-container js-cart-item-container js-cart-item-container-${product.id}">
            <div class="delivery-date">
              Delivery date: ${deliveryDate}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                   src="${product.image}" alt="Product image">

              <div class="cart-item-details">
                <div class="product-name js-product-name-${product.id}">
                  ${product.name}
                </div>
                <div class="product-price js-product-price-${product.id}">
                  ${product.getPrice()}
                </div>
                <div class="product-quantity js-product-quantity-${product.id}">
                      <span>
                        Quantity: <span class="quantity-label js-quantity-label-${product.id}">${item.quantity}</span>
                      </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id="${product.id}">
                        Update
                      </span>
                  <input class="quantity-input js-quantity-input js-quantity-input-${product.id}" data-product-id="${product.id}" type="text">
                  <span class="save-quantity-link link-primary js-save-link" data-product-id="${product.id}">Save</span>
                  <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${product.id}" data-product-id="${product.id}">
                        Delete
                      </span>
                </div>
              </div>
              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(product, item)}
              </div>
            </div>
          </div>
        `;
    });

    function deliveryOptionsHTML(product, cartItem) {
        let html = "";
        deliveryOptions.forEach((option) => {
            const deliveryDate = calculateDeliveryDate(option);

            const priceString = option.priceCents === 0
                ? "FREE"
                : `$${formatCurrency(option.priceCents)} -`;

            const isChecked = option.id === cartItem.deliveryOptionId;

            html += `
                <div class="delivery-option js-delivery-option js-delivery-option-${product.id}-${option.id}"
                  data-product-id="${product.id}" data-delivery-option-id="${option.id}">
                  <input class="delivery-option-input js-delivery-option-input-${product.id}-${option.id}"
                         name="delivery-option-${product.id}"
                         type="radio"
                         ${isChecked ? "checked" : ""}>
                  <div>
                    <div class="delivery-option-date">
                      ${deliveryDate}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} Shipping
                    </div>
                  </div>
                </div>
            `;
        });
        return html;
    }

    document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

    document.querySelectorAll(".js-delete-link").forEach((link) => {
        link.addEventListener("click", () => {
            const productId = link.dataset.productId;
            cart.removeFromCart(productId);

            renderCheckoutHeader();
            renderOrderSummary();
            renderPaymentSummary();
        });
    });

    document.querySelectorAll(".js-update-link").forEach((link) => {
        link.addEventListener("click", () => {
            const productId = link.dataset.productId;

            const cartItemContainer = document.querySelector(`.js-cart-item-container-${productId}`);
            cartItemContainer.classList.add("is-editing-quantity");
        });
    });

    document.querySelectorAll(".js-save-link").forEach((link) => {
        link.addEventListener("click", () => {
            const productId = link.dataset.productId;
            handleProductQuantityUpdate(productId);
            renderPaymentSummary();
        });
    });

    document.querySelectorAll(".js-quantity-input").forEach((input) => {
        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                const productId = input.dataset.productId;
                handleProductQuantityUpdate(productId);
                renderPaymentSummary();
            }
        });
    });

    function handleProductQuantityUpdate(productId) {
        const cartItemContainer = document.querySelector(`.js-cart-item-container-${productId}`);

        if (cartItemContainer.classList.contains("is-editing-quantity")) {
            cartItemContainer.classList.remove("is-editing-quantity");
        }

        const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
        const quantity = parseInt(quantityInput.value);

        if (isNaN(quantity) || quantity < 0 || quantity >= 1000) {
            return window.alert("Quantity must be a number between 0 and 999.");
        }

        cart.updateQuantity(productId, quantity);

        document.querySelector(`.js-quantity-label-${productId}`).textContent = quantity.toString();

        renderCheckoutHeader();
    }

    document.querySelectorAll(".js-delivery-option").forEach((element) => {
        element.addEventListener("click", () => {
            const {productId, deliveryOptionId} = element.dataset;
            cart.updateDeliveryOption(productId, deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        });
    });
}
