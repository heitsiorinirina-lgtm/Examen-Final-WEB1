import { data } from "../data/tokimahery.data.js";

const postsSection = document.getElementById("blog-posts");

function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function createTagPills(tags) {
  return tags.map((tag) => `<span class="tag is-info">${tag}</span>`).join("");
}

function renderPosts(posts) {
  if (!postsSection) return;

  postsSection.innerHTML = `
    <div class="container">
      <div class="columns is-variable is-6">
        <div class="column is-two-thirds" id="blog-posts-list"></div>
        <aside class="column" id="blog-sidebar"></aside>
      </div>
    </div>
  `;

  const listElement = document.getElementById("blog-posts-list");
  const sidebarElement = document.getElementById("blog-sidebar");

  if (!listElement || !sidebarElement) return;

  listElement.innerHTML = posts
    .map(
      (post) => `
        <article class="box blog-card mb-5">
          <div class="columns is-vcentered">
            <div class="column is-one-quarter">
              <figure class="image is-4by3">
                <img src="${post.thumbnail}" alt="${post.title}">
              </figure>
            </div>
            <div class="column">
            <h2 class="has-text-primary is-size-5 is-4 mb-2">
            ${post.title}
            </h2>
            <p class="blog-card__meta">
              ${formatDate(post.creationDate)}
            </p>
              <p class="blog-card__meta mb-3">
                ${post.description}
              </p>
              <div class="tags">
                ${createTagPills(post.tags)}
              </div>
            </div>
          </div>
        </article>
      `,
    )
    .join("");

  // Sidebar: archives + newsletter + YouTube videos from data
  sidebarElement.innerHTML = `
    <div class="box is-column mb-5">
      <p class="has-text-weight-semibold mb-2">Archives</p>
      <ul>
        ${data.archives
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

    <div class="box">
      <p class="has-text-weight-semibold mb-3">On YouTube</p>
      ${data.youtubeVideos
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
              <p class="blog-card__meta mt-2">${video.title}</p>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
}

renderPosts(data.posts);
