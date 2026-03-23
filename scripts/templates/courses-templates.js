function courseCardTemplate(course) {
  const formattedPrice = course.price.toLocaleString("en-US");

  const levelColorMap = {
    beginner: "is-success",
    intermediate: "is-warning",
    advanced: "is-danger",
  };
  const levelColor = levelColorMap[course.level];

  const techTag =
    course.technologies.length != 0
      ? `<span class="tag is-pulled-right is-rounded is-dark">${course.technologies}</span>`
      : "";

  const tags = `<span class="tags is-position-absolute">
  <span class="tag is-pulled-right is-rounded is-uppercase">${course.language}</span>
  ${techTag}
</span>`;
  return `
    <div class="column is-one-quarter-desktop is-half-tablet is-full-mobile">
      <div class="card is-radiusless is-shadowless">

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
          <p class="is-size-7 has-text-grey description">${course.description}</p>
        </div>

        <div class="buttons p-3">
          <button class="card-footer-item button has-shadow is-white has-text-link">
            Learn more
          </button>
          <button class="card-footer-item button is-link has-shadow">
            Add to cart
          </button>
        </div>

      </div>
    </div>
  `;
}
