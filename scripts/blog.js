const data = window.data;
const postsSection = document.getElementById("blog-posts");
const POSTS_PER_PAGE = 4;
let currentPage = 1;

// -------------------------
// Templates (global scope)
// -------------------------

const PAGE_LAYOUT_TEMPLATE = `
  <div class="container">
    <div class="columns is-variable is-6">
      <div class="column is-two-thirds" id="blog-posts-list"></div>
      <aside class="column" id="blog-sidebar"></aside>
    </div>
  </div>
`;

function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function tagsTemplate(tags) {
  return tags.map((tag) => `<span class="tag blog-tag">${tag}</span>`).join("");
}

function postCardTemplate(post) {
  return `
    <article class="box blog-card mb-5">
      <div class="columns is-vcentered">
        <div class="column is-one-quarter">
          <figure class="image is-4by3">
            <img src="${post.thumbnail}" alt="${post.title}">
          </figure>
        </div>
        <div class="column">
          <h2 class="has-text-primary is-size-5 mb-2">
            ${post.title}
          </h2>
          <p class="blog-card__meta">
            ${formatDate(post.creationDate)}
          </p>
          <p class="blog-card__meta mb-3">
            ${post.description}
          </p>
          <div class="tags">
            ${tagsTemplate(post.tags)}
          </div>
        </div>
      </div>
    </article>
  `;
}

function archivesTemplate(archives) {
  return `
    <div class="box is-column mb-5">
      <p class="has-text-weight-semibold mb-2">Archives</p>
      <ul>
        ${archives
          .map(
            (archive) => `
              <li>
                <a href="#">${archive.label} (${archive.count})</a>
              </li>
            `,
          )
          .join("")}
      </ul>
    </div>
  `;
}

const NEWSLETTER_TEMPLATE = `
  <div class="box mb-5">
    <p class="has-text-weight-semibold mb-2">Newsletter</p>
    <p class="blog-card__meta mb-3">
      Get new articles straight to your inbox. No spam, ever.
    </p>
    <form>
      <div class="field has-addons">
        <div class="control is-expanded">
          <input
            class="input"
            type="email"
            name="newsletter-email"
            placeholder="your@email.com"
            required
          />
        </div>
        <div class="control">
          <button class="button is-primary" type="submit">
            Subscribe
          </button>
        </div>
      </div>
    </form>
  </div>
`;

function youtubeTemplate(videos) {
  return `
    <div class="box">
      <p class="has-text-weight-semibold mb-3">On YouTube</p>
      ${videos
        .map(
          (video) => `
            <div class="mb-4">
              <div class="video-container">
                <iframe
                  src="https://www.youtube.com/embed/${video.id}"
                  title="${video.title}"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  referrerpolicy="strict-origin-when-cross-origin"
                ></iframe>
              </div>
              <p class="blog-card__meta mt-2">${video.title}</p>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
}

function getPageCount() {
  if (!data?.posts) return 0;
  return Math.ceil(data.posts.length / POSTS_PER_PAGE);
}

function createPaginationTemplate(current, total) {
  if (total <= 1) return "";

  const pages = Array.from({ length: total }, (_v, i) => i + 1);

  return `
    <nav class="pagination is-centered" role="navigation" aria-label="pagination">
      <a class="pagination-previous" data-page="${current - 1}" ${
        current === 1 ? "disabled" : ""
      }>Previous</a>
      <a class="pagination-next" data-page="${current + 1}" ${
        current === total ? "disabled" : ""
      }>Next</a>
      <ul class="pagination-list">
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
      </ul>
    </nav>
  `;
}

function renderPosts(page) {
  if (!postsSection || !data?.posts) return;

  const totalPages = getPageCount();
  currentPage = Math.min(Math.max(page, 1), totalPages);

  postsSection.innerHTML = PAGE_LAYOUT_TEMPLATE;

  const listElement = document.getElementById("blog-posts-list");
  const sidebarElement = document.getElementById("blog-sidebar");

  if (!listElement || !sidebarElement) return;

  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const visiblePosts = data.posts.slice(start, start + POSTS_PER_PAGE);

  listElement.innerHTML =
    visiblePosts.map(postCardTemplate).join("") +
    createPaginationTemplate(currentPage, totalPages);

  sidebarElement.innerHTML =
    archivesTemplate(data.archives) + NEWSLETTER_TEMPLATE + youtubeTemplate(data.youtubeVideos);
}

postsSection?.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  const pageAttr = target.getAttribute("data-page");
  if (!pageAttr) return;

  const page = Number(pageAttr);
  if (!Number.isNaN(page)) {
    renderPosts(page);
  }
});

renderPosts(1);
