document.querySelectorAll(".slider").forEach((slider) => {
  function updateFill() {
    const percent =
      ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.setProperty("--fill", `${percent}%`);
  }
  slider.addEventListener("input", updateFill);
  updateFill();
});
