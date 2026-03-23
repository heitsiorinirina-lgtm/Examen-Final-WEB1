document.querySelectorAll(".slider").forEach((slider) => {
  function updateFill() {
    const percent =
      ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.setProperty("--fill", `${percent}%`);
  }
  slider.addEventListener("input", updateFill);
  updateFill();
});

let minPrice = document.getElementById("min-price");
let maxPrice = document.getElementById("max-price");

document.getElementById("price-slider-min").addEventListener("input", () => {
  minPrice.textContent = document.getElementById("price-slider-min").value;
});

document.getElementById("price-slider-max").addEventListener("input", () => {
  maxPrice.textContent = document.getElementById("price-slider-max").value;
});
