// Default export (without {})
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export const deliveryOptions = [
    {
        id: "1",
        deliveryDays: 7,
        priceCents: 0
    },
    {
        id: "2",
        deliveryDays: 3,
        priceCents: 499
    },
    {
        id: "3",
        deliveryDays: 1,
        priceCents: 999
    }
];

export function getDeliveryOptionById(deliveryOptionId) {
    return deliveryOptions.find((option) => option.id === deliveryOptionId);
}

export function calculateDeliveryDate(deliveryOption) {
    const today = dayjs();

    // Get the current day of the week (Monday = 0, Sunday = 6)
    const weekday = (parseInt(today.format("d")) + 6) % 7;

    // Get distance to Monday (start of business days)
    const shiftFactor = weekday === 5 || weekday === 6 ? weekday - 7 : weekday;
    // Business days to delivery, starting at Monday (Sat and Sun are equivalent to next Monday)
    const businessDays = deliveryOption.deliveryDays + Math.max(shiftFactor, 0);

    // Calendar days to delivery, starting at Monday, and properly skipping weekends
    const calendarDays = Math.trunc(businessDays / 5) * 7 + (businessDays % 5);
    // Calculate delivery date by going to current Monday and adding calendarDays days
    const deliveryDate = today.add(calendarDays - shiftFactor, "days");

    return deliveryDate.format("dddd, MMMM D");
}
