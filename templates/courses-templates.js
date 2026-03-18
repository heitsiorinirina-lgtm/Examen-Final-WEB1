function courseCardTemplate(course) {
  const formattedPrice = course.price.toLocaleString("en-US");
  const levelLabel =
    course.level.charAt(0).toUpperCase() + course.level.slice(1);

  const levelColorMap = {
    beginner: "is-success",
    intermediate: "is-warning",
    advanced: "is-danger",
  };
  const levelColor = levelColorMap[course.level] ?? "is-info";

  const shortDesc =
    course.description.length > 100
      ? course.description.slice(0, 100).trimEnd() + "…"
      : course.description;

  return `
    <div class="column is-one-third-desktop is-half-tablet is-full-mobile">
      <div class="card is-radiusless">

        <div class="card-image">
          <figure class="image is-4by3">
            <img src="${course.thumbnail}" alt="${course.title}" />
          </figure>
          <span class="tag ${levelColor} is-medium is-pulled-right">
            ${levelLabel}
          </span>
        </div>

        <div class="card-content">
          <p class="title is-5 has-text-danger mb-1">${course.title}</p>
          <p class="has-text-weight-bold mb-3">MGA ${formattedPrice}</p>
          <p class="is-size-7 has-text-grey">${shortDesc}</p>
        </div>

        <footer class="card-footer">
          <button class="card-footer-item button is-white has-text-primary">
            Learn more
          </button>
          <button class="card-footer-item button is-primary">
            Add to cart
          </button>
        </footer>

      </div>
    </div>
  `;
}
