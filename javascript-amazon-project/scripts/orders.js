import {orders} from "../data/orders.js";
import {getProductById, loadProductsFetch, products} from "../data/products.js";
import {formatCurrency} from "./utils/money.js";
import {cart} from "../data/cart-class.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

renderOrders();

async function renderOrders() {
    await loadProductsFetch();

    let html = ``;

    orders.forEach((order) => {
        const formattedPlacedAt = dayjs(order.orderTime).format("MMMM D");

        html += `
            <div class="order-container">
              <div class="order-header">
                <div class="order-header-left-section">
                  <div class="order-date">
                    <div class="order-header-label">Order Placed:</div>
                    <div>${formattedPlacedAt}</div>
                  </div>
                  <div class="order-total">
                    <div class="order-header-label">Total:</div>
                    <div>$${formatCurrency(order.totalCostCents)}</div>
                  </div>
                </div>

                <div class="order-header-right-section">
                  <div class="order-header-label">Order ID:</div>
                  <div>${order.id}</div>
                </div>
              </div>

              <div class="order-details-grid">
                ${generateOrderProductsHTML(order.id, order.products)}
              </div>
            </div>
        `;
    });

    document.querySelector(".js-orders-grid").innerHTML = html;

    document.querySelectorAll(".js-buy-again-button").forEach((button) => {
        button.addEventListener("click", () => {
            cart.addToCart(button.dataset.productId, 1);

            button.innerHTML = "Added!";

            console.log("clicked");

            setTimeout(() => {
                button.innerHTML = `
                    <img class="buy-again-icon" src="images/icons/buy-again.png" alt="Buy again icon">
                    <span class="buy-again-message">Buy it again</span>
                `;
            }, 2000);
        })
    });
}

function generateOrderProductsHTML(orderId, orderProducts) {
    let html = "";

    orderProducts.forEach((orderProduct) => {
        const product = getProductById(orderProduct.productId);

        if (!product) return;

        const arrivingOnFormatted = dayjs(orderProduct.estimatedDeliveryTime).format("MMMM D");

        html += `
            <div class="product-image-container">
              <img src="${product.image}" alt="Product's image">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${product.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${arrivingOnFormatted}
              </div>
              <div class="product-quantity">
                Quantity: ${orderProduct.quantity}
              </div>
              <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${product.id}">
                <img class="buy-again-icon" src="images/icons/buy-again.png" alt="Buy again icon">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${orderId}&productId=${orderProduct.productId}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
        `;
    });

    return html;
}