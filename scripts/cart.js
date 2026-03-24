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
    renderCourses();
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

// ─── Inject cart into navbar ──────────────────────────────────────────────────

function injectCartDropdown() {
  // Create one fixed menu appended to body — no Bulma dropdown magic needed
  const menu = document.createElement("div");
  menu.className = "cart-dropdown-menu dropdown-content p-0";
  menu.style.cssText =
    "position:fixed;display:none;width:300px;z-index:9999;box-shadow:0 8px 24px rgba(0,0,0,0.15);border-radius:6px;";
  menu.innerHTML = `
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
        `;
  document.body.appendChild(menu);

  // Replace each basket icon wrapper with a simple trigger
  document.querySelectorAll(".fa-basket-shopping").forEach((icon) => {
    const wrapper = icon.closest("span.navbar-item, span");
    if (!wrapper) return;

    const trigger = document.createElement("div");
    trigger.className =
      "cart-basket-trigger cart-dropdown is-clickable " + wrapper.className;
    trigger.innerHTML = `
    <i class="fa-solid fa-basket-shopping is-size-4 has-text-white"></i>
    <span class="cart-badge"></span>
    `;
    wrapper.replaceWith(trigger);

    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      if (menu.style.display === "none") {
        const rect = trigger.getBoundingClientRect();
        menu.style.top = rect.bottom + 8 + "px";
        menu.style.right = window.innerWidth - rect.right + "px";
        menu.style.display = "block";
        renderDropdownItems();
      } else {
        menu.style.display = "none";
      }
    });
  });

  menu.querySelector(".cart-dropdown-close").addEventListener("click", (e) => {
    e.stopPropagation();
    menu.style.display = "none";
  });

  // Prevent clicks inside the menu from bubbling up to the document close handler
  menu.addEventListener("click", (e) => e.stopPropagation());

  document.addEventListener("click", () => {
    menu.style.display = "none";
  });
}

function attachConfirmButtonListener() {
  const confirmBtn = document.querySelector(".cart-confirm");
  if (!confirmBtn) return;

  confirmBtn.addEventListener("click", () => {
    // Clear the cart
    cart = [];
    saveCart();
    updateCartBadge();
    renderDropdownItems();

    // Close the dropdown
    const menu = document.querySelector(".cart-dropdown-menu");
    if (menu) menu.style.display = "none";

    // Show the nice toast notification
    showOrderConfirmationToast();

    // Optional: refresh courses list so "In cart" buttons go back to "Add to cart"
    if (typeof renderCourses === "function") renderCourses();
  });
}
// ─── Render items ─────────────────────────────────────────────────────────────

function renderDropdownItems() {
  const menu = document.querySelector(".cart-dropdown-menu");
  if (!menu) return;

  const items = getCartCourses();
  const container = menu.querySelector(".cart-dropdown-items");
  const footer = menu.querySelector(".cart-dropdown-footer");
  const totalEl = menu.querySelector(".cart-total-value");
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
        <button class="cart-item-remove is-small ml-2" data-id="${course.id}" aria-label="Remove">
  <i class="fa-solid fa-trash-can has-text-grey-light"></i>
</button>
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
}

// ─── Init ─────────────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  injectCartDropdown();
  updateCartBadge();
  renderDropdownItems();
  attachConfirmButtonListener();
});

// ─── Notification Toast ───────────────────────────────────────────────────────

function showOrderConfirmationToast() {
  // Remove existing toast if any
  document.querySelectorAll(".order-toast").forEach((t) => t.remove());

  const toast = document.createElement("div");
  toast.className = "order-toast";
  toast.innerHTML = `
    <div class="notification is-success is-light p-4 is-position-fixed">
      
      <div class="is-flex is-align-items-center">
        <span class="image is-64x64 mr-3">
          <img src="assets/party-popper_1f389.png" alt="success">
        </span>
        
        <div class="has-text-white is-flex-grow-1">
          <p class="has-text-weight-semibold mb-1">Thank you so much for buying our course!</p>
          <p class="is-size-7">We'll be in touch shortly with all the details. Welcome aboard!</p>
        </div>

        <button class="delete has-text-white" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
      </div>
    </div>
  `;

  document.body.appendChild(toast);

  // Close functionality
  const closeBtn = toast.querySelector(".delete");
  closeBtn.addEventListener("click", () => {
    toast.style.transition = "opacity 0.4s ease, transform 0.4s ease";
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) translateY(15px)";
    setTimeout(() => toast.remove(), 400);
  });

  // Auto-hide after 5 seconds
  setTimeout(() => {
    if (toast.isConnected) {
      toast.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      toast.style.opacity = "0";
      toast.style.transform = "translateX(-50%) translateY(15px)";
      setTimeout(() => toast.remove(), 400);
    }
  }, 5000);
}
