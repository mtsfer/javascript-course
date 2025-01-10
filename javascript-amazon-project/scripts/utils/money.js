export function formatCurrency(priceCents) {
    return (Math.round(priceCents) / 100).toFixed(2);
}

// Each file can only have 1 default export
// export default formatCurrency;