import {formatCurrency} from "../../scripts/utils/money.js";

// Arrange, Act, Assert
// Given, When, Then
// test case: situation being tested
// should always test edge cases: values that are tricky
// test suite = group of related tests

console.log("test suite: formatCurrency");
console.log("convert cents into dollars");

if (formatCurrency(2095) === "20.95") {
    console.log("passed");
} else {
    console.log("failed");
}

console.log("works with 0");

if (formatCurrency(0) === "0.00") {
    console.log("passed");
} else {
    console.log("failed");
}

console.log("rounds up to the nearest cent");

if (formatCurrency(2000.5) === "20.01") {
    console.log("passed");
} else {
    console.log("failed");
}

console.log("rounds down when < .5");

if (formatCurrency(2000.4) === "20.00") {
    console.log("passed");
} else {
    console.log("failed");
}

console.log("works with negative");

if (formatCurrency(-1000.5) === "-10.00") {
    console.log("passed");
} else {
    console.log("failed");
}