let calculation = localStorage.getItem("calculation") || "";

displayCalculation();

function displayCalculation() {
  document.querySelector(".js-calculation").innerHTML = calculation;
}

function updateCalculation(value) {
  calculation += value;
  displayCalculation();
  localStorage.setItem("calculation", calculation);
}
