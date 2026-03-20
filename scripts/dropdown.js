document.querySelectorAll(".dropdown").forEach((dropdown) => {
  const trigger = dropdown.querySelector(".dropdown-trigger span");

  dropdown.addEventListener("click", (e) => {
    dropdown.classList.toggle("is-active");

    const item = e.target.closest(".dropdown-item");
    if (item) {
      // Update trigger text
      trigger.textContent = item.textContent;

      // Update active state
      dropdown
        .querySelectorAll(".dropdown-item")
        .forEach((i) => i.classList.remove("is-active"));
      item.classList.add("is-active");
    }
  });
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".dropdown")) {
    document
      .querySelectorAll(".dropdown")
      .forEach((d) => d.classList.remove("is-active"));
  }
});
