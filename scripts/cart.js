// ─── State ────────────────────────────────────────────────────────────────────

let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

function saveCart() {
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
}

// ─── Cart operations ──────────────────────────────────────────────────────────

function addToCart(courseId) {
  if (!cart.includes(courseId)) {
    cart.push(courseId);
    saveCart();
    updateCartBadge();
    renderDropdownItems();
  }
}

function removeFromCart(courseId) {
  cart = cart.filter((id) => id !== courseId);
  saveCart();
  updateCartBadge();
  renderDropdownItems();
  if (typeof renderCourses === "function") renderCourses();
}

function isInCart(courseId) {
  return cart.includes(courseId);
}

function getCartCourses() {
  return cart
    .map((id) => data.courses.find((c) => c.id === id))
    .filter(Boolean);
}

// ─── Badge ────────────────────────────────────────────────────────────────────

function updateCartBadge() {
  document.querySelectorAll(".cart-badge").forEach((badge) => {
    badge.textContent = cart.length;
    badge.style.display = cart.length === 0 ? "none" : "inline-block";
  });
}

// ─── Inject Bulma dropdown into navbar ───────────────────────────────────────

function injectCartDropdown() {
  document.querySelectorAll(".fa-basket-shopping").forEach((icon) => {
    const wrapper = icon.closest("span.navbar-item, span");
    if (!wrapper) return;

    const dropdown = document.createElement("div");
    dropdown.className =
      `dropdown is-right cart-dropdown ` +
      wrapper.className;
    dropdown.innerHTML = `
      <div class="dropdown-trigger cart-basket-trigger is-clickable">
        <i class="fa-solid fa-basket-shopping is-size-4 has-text-white"></i>
        <span class="cart-badge"></span>
      </div>
      <div class="dropdown-menu cart-dropdown-menu" role="menu">
        <div class="dropdown-content p-0">
          <div class="cart-dropdown-header px-4 py-3 is-flex is-justify-content-space-between is-align-items-center">
            <span class="has-text-weight-bold">Your cart</span>
            <button class="cart-dropdown-close delete is-small" aria-label="Close"></button>
          </div>
          <div class="cart-dropdown-items px-4"></div>
          <div class="cart-dropdown-footer px-4 pb-4">
            <div class="is-flex is-justify-content-space-between is-align-items-center py-3">
              <span class="cart-total-label">TOTAL</span>
              <span class="cart-total-value has-text-weight-bold"></span>
            </div>
            <button class="button is-link is-fullwidth has-text-weight-bold cart-confirm">CONFIRM ORDER</button>
          </div>
        </div>
      </div>
    `;

    wrapper.replaceWith(dropdown);

    dropdown
      .querySelector(".cart-basket-trigger")
      .addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("is-active");
        if (dropdown.classList.contains("is-active")) renderDropdownItems();
      });

    dropdown
      .querySelector(".cart-dropdown-close")
      .addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.classList.remove("is-active");
      });
  });

  document.addEventListener("click", () => {
    document
      .querySelectorAll(".cart-dropdown.is-active")
      .forEach((d) => d.classList.remove("is-active"));
  });
}

// ─── Render items ─────────────────────────────────────────────────────────────

function renderDropdownItems() {
  document.querySelectorAll(".cart-dropdown").forEach((dropdown) => {
    const items = getCartCourses();
    const container = dropdown.querySelector(".cart-dropdown-items");
    const footer = dropdown.querySelector(".cart-dropdown-footer");
    const totalEl = dropdown.querySelector(".cart-total-value");
    if (!container) return;

    if (items.length === 0) {
      container.innerHTML = `<p class="cart-empty has-text-grey has-text-centered is-size-7">No courses in your cart yet.</p>`;
      if (footer) footer.style.display = "none";
      return;
    }

    if (footer) footer.style.display = "block";

    container.innerHTML = items
      .map(
        (course) => `
      <div class="cart-item is-flex is-justify-content-space-between is-align-items-center py-3" data-id="${course.id}">
        <span class="cart-item-title is-size-7">${course.title}</span>
        <span class="cart-item-right is-flex is-align-items-center ml-3">
          <span class="cart-item-price is-size-7 has-text-weight-semibold">${course.price.toLocaleString("en-US")} Ar</span>
          <button class="cart-item-remove delete is-small ml-2" data-id="${course.id}" aria-label="Remove"></button>
        </span>
      </div>
    `,
      )
      .join("");

    container.querySelectorAll(".cart-item-remove").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        removeFromCart(parseInt(btn.dataset.id));
      });
    });

    const total = items.reduce((sum, c) => sum + c.price, 0);
    if (totalEl) totalEl.textContent = total.toLocaleString("en-US") + " Ar";
  });
}

// ─── Init ─────────────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  injectCartDropdown();
  updateCartBadge();
  renderDropdownItems();
});
