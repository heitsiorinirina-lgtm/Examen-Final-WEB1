function createPaginationTemplate(current, total) {
  if (total <= 1) return "";

  const pages = Array.from({ length: total }, (_v, i) => i + 1);

  return `
    <nav class="pagination is-large-desktop is-centered" role="navigation" aria-label="pagination">
      <ul class="pagination-list">
        <li>
          <button class="pagination-link" data-page="${current - 1}" ${
            current === 1 ? "disabled" : ""
          }>← Prev</button>
        </li>
        ${pages
          .map(
            (page) => `
              <li>
                <a class="pagination-link ${
                  page === current ? "is-current" : ""
                }" data-page="${page}">
                  ${page}
                </a>
              </li>
            `,
          )
          .join("")}
        <li>
          <button class="pagination-link" data-page="${current + 1}" ${
            current === total ? "disabled" : ""
          }>Next →</button>
        </li>
      </ul>
    </nav>
  `;
}
