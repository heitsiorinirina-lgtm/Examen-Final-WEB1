const postsSection = document.getElementById("blog-posts");
const POSTS_PER_PAGE = 5;
let currentPage = 1;
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

function getPageCount() {
  const total = data.posts.length;
  if (total <= POSTS_PER_PAGE) return total > 0 ? 1 : 0;
  // Merge any remaining posts into the last full page
  return Math.ceil(total / POSTS_PER_PAGE);
}

function renderPosts(page) {
  const totalPages = getPageCount();
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const visiblePosts =
    currentPage === totalPages
      ? data.posts.slice(start)
      : data.posts.slice(start, start + POSTS_PER_PAGE);

  document.getElementById("blog-posts-list").innerHTML =
    visiblePosts.map(postCardTemplate).join("") +
    createPaginationTemplate(currentPage, totalPages);
}

const sidebarElement = document.getElementById("blog-sidebar");
archives.innerHTML = archivesTemplate(data.archives);
youtubeSection.innerHTML = youtubeTemplate(data.youtubeVideos);
sidebarElement.innerHTML =
  archives.innerHTML + newsletter.innerHTML + youtubeSection.innerHTML;

postsSection.addEventListener("click", ({ target }) => {
  if (!(target instanceof HTMLElement)) return;
  const page = Number(target.getAttribute("data-page"));
  if (!isNaN(page)) renderPosts(page);
});

renderPosts(1);
