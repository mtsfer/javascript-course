import {getProductById, loadProductsFetch} from "../data/products.js";
import {getOrderById} from "../data/orders.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

renderTrackingInfo();

async function renderTrackingInfo() {
    await loadProductsFetch();

    const url = new URL(window.location.href);

    const order = getOrderById(url.searchParams.get("orderId"));
    const product = getProductById(url.searchParams.get("productId"));

    const orderProduct = order.products.find((op) => op.productId === product.id);

    document.querySelector(".js-order-tracking").innerHTML = `
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${dayjs(orderProduct.estimatedDeliveryTime).format("dddd, MMMM D")}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${orderProduct.quantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
          <div class="progress-label js-progress-preparing">
            Preparing
          </div>
          <div class="progress-label js-progress-shipped">
            Shipped
          </div>
          <div class="progress-label js-progress-delivered">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar js-progress-bar"></div>
        </div>
    `;

    const progress = calculateProgress(order.orderTime, orderProduct);
    document.querySelector(".js-progress-bar").style.width = `${progress > 0 ? progress : 5}%`;

    if (progress >= 100) {
        document.querySelector(".js-progress-delivered").classList.add("current-status");
    } else if (progress >= 50) {
        document.querySelector(".js-progress-shipped").classList.add("current-status");
    } else if (progress >= 0) {
        document.querySelector(".js-progress-preparing").classList.add("current-status");
    }
}

function calculateProgress(orderTimeStr, orderProduct) {
    const now = dayjs();
    const orderTime = dayjs(orderTimeStr);
    const deliveryTime = dayjs(orderProduct.estimatedDeliveryTime);

    return (now.diff(orderTime, "day") / deliveryTime.diff(orderTime, "day")) * 100;
}