function toggleButton(classSelector) {
  const element = document.querySelector(classSelector);
  if (element.classList.contains("is-toggled")) {
    element.classList.remove("is-toggled");
  } else {
    toggleOffPreviousButton();
    element.classList.add("is-toggled");
  }
}

function toggleOffPreviousButton() {
  const toggledButton = document.querySelector(".is-toggled");
  if (toggledButton) {
    toggledButton.classList.remove("is-toggled");
  }
}
