function toggleButton(classSelector) {
  const element = document.querySelector(classSelector);
  if (element.classList.contains("is-toggled")) {
    element.classList.remove("is-toggled");
  } else {
    element.classList.add("is-toggled");
  }
}
