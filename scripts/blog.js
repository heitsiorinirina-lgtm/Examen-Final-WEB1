const data = window.data;
const postsSection = document.getElementById("blog-posts");
const POSTS_PER_PAGE = 4;
let currentPage = 1;
const newsletter = document.getElementById("newsletter");
function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function tagsTemplate(tags) {
  return tags
    .map(
      (tag) =>
        `<span class="tag is-info is-rounded has-text-white">${tag}</span>`,
    )
    .join("");
}

function postCardTemplate(post) {
  return `
    <article class="box blog-card mb-5">
      <div class="columns is-vcentered">
        <div class="column is-one-quarter">
          <figure class="image is-4by3">
            <img src="${post.thumbnail}" alt="${post.title}" class="blog-card-thumbnail">
          </figure>
        </div>
        <div class="column pb-2">
          <h2 class="has-text-primary is-size-5">
            ${post.title}
          </h2>
          <p class="blog-card-meta date has-text-weight-semibold">
            ${formatDate(post.creationDate)}
          </p>
          <p class="blog-card-meta is-size-7 pb-5 mb-3">
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
      <p class="has-text-weight-semibold is-uppercase section-label has-text-grey mb-2">Archives</p>
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

function youtubeTemplate(videos) {
  return `
    <div class="box">
      <p class="has-text-weight-semibold is-uppercase section-label has-text-grey mb-3">On YouTube</p>
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
                ></iframe>
              </div>
              <p class="blog-card-meta mt-2">${video.title}</p>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
}

function getPageCount() {
  if (!data.posts) return 0;
  const total = data.posts.length;
  if (total <= POSTS_PER_PAGE) return total > 0 ? 1 : 0;
  // Merge any remaining posts into the last full page
  return Math.floor(total / POSTS_PER_PAGE);
}

function createPaginationTemplate(current, total) {
  if (total <= 1) return "";

  const pages = Array.from({ length: total }, (_v, i) => i + 1);

  return `
    <nav class="pagination is-centered" role="navigation" aria-label="pagination">
      <ul class="pagination-list">
        <li>
          <a class="pagination-link" data-page="${current - 1}" ${
            current === 1 ? "disabled" : ""
          }>← Prev</a>
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
          <a class="pagination-link" data-page="${current + 1}" ${
            current === total ? "disabled" : ""
          }>Next →</a>
        </li>
      </ul>
    </nav>
  `;
}

function renderPosts(page) {
  if (!postsSection || !data.posts) return;

  const totalPages = getPageCount();
  if (totalPages === 0) return;
  currentPage = Math.min(Math.max(page, 1), totalPages);

  postsSection.innerHTML = document.getElementById("blog-posts").innerHTML;

  const listElement = document.getElementById("blog-posts-list");
  const sidebarElement = document.getElementById("blog-sidebar");

  if (!listElement || !sidebarElement) return;

  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const isLastPage = currentPage === totalPages;
  const visiblePosts = isLastPage
    ? data.posts.slice(start) // last page gets all remaining posts
    : data.posts.slice(start, start + POSTS_PER_PAGE);

  listElement.innerHTML =
    visiblePosts.map(postCardTemplate).join("") +
    createPaginationTemplate(currentPage, totalPages);

  sidebarElement.innerHTML =
    archivesTemplate(data.archives) +
    newsletter.innerHTML +
    youtubeTemplate(data.youtubeVideos);
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
