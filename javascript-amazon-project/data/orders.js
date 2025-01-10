export const orders = JSON.parse(localStorage.getItem("orders")) || [];

export function addOrder(order) {
    orders.unshift(order);
    saveToStorage();
}

export function getOrderById(id) {
    return orders.find((order) => order.id === id);
}

function saveToStorage() {
    localStorage.setItem("orders", JSON.stringify(orders));
}