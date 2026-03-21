document.querySelectorAll(".dropdown").forEach((dropdown) => {
  const trigger = dropdown.querySelector(
    ".dropdown-trigger button span:first-child",
  );

  dropdown.addEventListener("click", (e) => {
    dropdown.classList.toggle("is-active");

    const item = e.target.closest(".dropdown-item");
    if (item) {
      trigger.textContent = item.textContent.trim();

      dropdown
        .querySelectorAll(".dropdown-item")
        .forEach((i) => i.classList.remove("is-active"));
      item.classList.add("is-active");
      dropdown.classList.add("is-dirty");
    }
  });
});

document.addEventListener("click", (e) => {
  document.querySelectorAll(".dropdown").forEach((d) => {
    if (!e.target.closest(".dropdown") || e.target.closest(".dropdown") !== d) {
      d.classList.remove("is-active");
      d.classList.remove("is-dirty");
    }
  });
});
