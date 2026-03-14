const data = window.data;
const postsSection = document.getElementById("blog-posts");
const POSTS_PER_PAGE = 5;
let currentPage = 1;
let currentArchiveFilter = null;
const newsletter = document.getElementById("newsletter");
const archives = document.getElementById("archives");
const youtubeSection = document.getElementById("videos");
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
      <div class="columns">
        <div class="column is-one-quarter pr-0">
          <figure class="image is-1by1">
            <img src="${post.thumbnail}" alt="${post.title}" class="blog-card-thumbnail">
          </figure>
        </div>
        <div class="column is-flex is-flex-direction-column is-justify-content-space-between">
          <div>
            <h2 class="has-text-primary is-size-5-mobile is-size-4-tablet is-size-4-desktop">
              ${post.title}
            </h2>
            <p class="blog-card-meta date has-text-weight-semibold is-size-6-mobile is-size-6-tablet is-size-6-desktop">
              ${formatDate(post.creationDate)}
            </p>
            <p class="blog-card-meta pb-5 mb-3 is-size-6-mobile is-size-6-tablet is-size-6-desktop">
              ${post.description}
            </p>
          </div>
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
      <p class="has-text-weight-semibold is-uppercase section-label has-text-grey mb-2 is-size-6-mobile is-size-6-tablet is-size-6-desktop">Archives</p>
      <ul>
        ${archives
          .map(
            (archive) => `
              <li>
                <a href="#" data-archive="${archive.slug}" class="is-size-6-mobile is-size-6-tablet is-size-6-desktop">${archive.label} (${archive.count})</a>
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
      <p class="has-text-weight-semibold is-uppercase section-label has-text-grey mb-3 is-size-6-mobile is-size-6-tablet is-size-6-desktop">On YouTube</p>
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
              <p class="blog-card-meta mt-2 is-size-6-mobile is-size-6-tablet is-size-6-desktop">${video.title}</p>
            </div>
          `,
        )
        .join("")}
      <span><a href="#" class="has-text-primary has-text-weight-bold has-underline mt-4">VIEW ALL VIDEOS →</a></span>
    </div>
  `;
}

function getPageCount() {
  const total = data.posts.length;
  if (total <= POSTS_PER_PAGE) return total > 0 ? 1 : 0;
  // Merge any remaining posts into the last full page
  return Math.ceil(total / POSTS_PER_PAGE);
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
  const totalPages = getPageCount();
  let currentPage = Math.min(Math.max(page, 1), totalPages);

  const listElement = document.getElementById("blog-posts-list");
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const isLastPage = currentPage === totalPages;
  const visiblePosts = isLastPage
    ? data.posts.slice(start) // last page gets all remaining posts
    : data.posts.slice(start, start + POSTS_PER_PAGE);

  listElement.innerHTML =
    visiblePosts.map(postCardTemplate).join("") +
    createPaginationTemplate(currentPage, totalPages);
}

const sidebarElement = document.getElementById("blog-sidebar");
archives.innerHTML = archivesTemplate(data.archives);
youtubeSection.innerHTML = youtubeTemplate(data.youtubeVideos);
sidebarElement.innerHTML =
  archives.innerHTML + newsletter.innerHTML + youtubeSection.innerHTML;

postsSection?.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  const pageAttr = target.getAttribute("data-page");
  if (pageAttr) {
    const page = Number(pageAttr);
    if (!Number.isNaN(page)) {
      renderPosts(page);
    }
    return;
  }
});

renderPosts(1);

document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0,
  );

  // Add a click event on each of them
  $navbarBurgers.forEach((el) => {
    el.addEventListener("click", () => {
      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle("is-active");
      $target.classList.toggle("is-active");
    });
  });
});
