function courseCardTemplate(course) {
  const formattedPrice = course.price.toLocaleString("en-US");

  const levelColorMap = {
    beginner: "is-success",
    intermediate: "is-warning",
    advanced: "is-danger",
  };
  const levelColor = levelColorMap[course.level];

  const techTag =
    course.technologies.length !== 0
      ? course.technologies
          .map(
            (tech) =>
              `<span class="tag is-pulled-right is-rounded is-dark">${tech}</span>`
          )
          .join("")
      : "";

  const tags = `<span class="tags is-position-absolute">
  <span class="tag is-pulled-right is-rounded is-uppercase">${course.language}</span>
  ${techTag}
</span>`;

  const inCart = typeof isInCart === "function" && isInCart(course.id);
  const cartBtnClass = inCart
    ? "button is-link has-shadow is-light"
    : "button is-link has-shadow";
  const cartBtnText = inCart ? "In cart" : "Add to cart";

  return `
    <div class="column is-one-quarter-desktop is-half-tablet is-full-mobile">
      <div class="card is-height-full is-flex is-flex-direction-column is-radiusless is-shadowless">

        <div class="card-image">
          <figure class="image is-4by3 is-relative">
            <img src="${course.thumbnail}" alt="${course.title}" />
            ${tags}
            <span class="tag ${levelColor} is-medium is-pulled-right is-position-absolute course-level is-radiusless">
              ${course.level}
            </span>
          </figure>
        </div>

        <div class="card-content">
          <p class="is-size-4 has-text-link mb-1">${course.title}</p>
          <p class="has-text-weight-bold mb-3">MGA ${formattedPrice}</p>
          <p class="is-size-6 has-text-weight-semibold has-text-dark description">${course.description}</p>
        </div>

        <div class="buttons mt-auto p-3">
          <button class="card-footer-item button has-shadow is-white has-text-link">
            Learn more
          </button>
          <button
            class="card-footer-item ${cartBtnClass} js-add-to-cart"
            data-id="${course.id}"
            ${inCart ? "disabled" : ""}
          >
            ${cartBtnText}
          </button>
        </div>

      </div>
    </div>
  `;
}
