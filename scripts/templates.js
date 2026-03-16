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
            <p class="blog-card-meta has-text-dark has-text-weight-semibold is-size-6-mobile is-size-6-tablet is-size-6-desktop">
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
      <span><a href="https://www.youtube.com/@tokimaheryramarozaka2116/videos" target="_blank" class="has-text-primary has-text-weight-bold has-underline mt-4">VIEW ALL VIDEOS →</a></span>
    </div>
  `;
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

function researchArticlesTemplate(paper) {
  return `
    <div class="column is-9-desktop is-9-widescreen is-9-fullhd">
      <article class="box paper-box">
        <span class="is-flex is-justify-content-space-between is-align-items-start">
          <div class="tags">
            ${tagsTemplate(paper.tags)}
          </div>
          <p class="has-text-grey">${formatDate(paper.publishedDate)}</p>
        </span>
        <div class="content">
          <h2 class="title is-size-2-desktop is-size-1-widescreen is-size-1-fullhd is-size-5-touch">
            ${paper.title}
          </h2>
          <nav class="breadcrumb has-bullet-separator" aria-label="breadcrumbs">
            <ul class="ml-0 is-size-6-fullhd is-size-7-desktop is-size-7-touch">
            <li><a href="#" class="has-text-grey">${paper.authors.join(", ")}</a></li>
            <li><a href="#" class="has-text-grey">${paper.journal}</a></li>
            </ul>
          </nav>
          <p class="has-text-grey is-size-5-desktop is-size-6-touch is-size-5-widescreen is-size-5-fullhd">
            ${paper.abstract}
          </p>
        </div>
        <hr>
        <a href="${paper.pdfUrl}"
          class="is-uppercase is-link mt-3 is-size-5-fullhd is-size-5-desktop is-size-7-touch"
          target="_blank"><span>
            <i
              class=" has-underline fa-solid fa-file-pdf is-size-5-desktop is-size-7-touch is-size-5-fullhd"></i>
          </span><span class="has-underline">Read
            PDF</span>
        </a>
      </article>
    </div>
  `;
}
