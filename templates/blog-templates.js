function postCardTemplate(post) {
  return `
        <a href="#">
        <article class="box blog-card mb-5">
            <div class="columns">
                <div class="column is-one-quarter pr-0">
                    <figure class="image is-1by1">
                        <img src="${post.thumbnail}" alt="${post.title}" class="blog-card-thumbnail">
                    </figure>
                </div>
                <div class="column is-flex is-flex-direction-column is-justify-content-space-between">
                    <div>
                        <h2 class="has-text-primary is-size-5-mobile is-size-4-tablet is-size-4-desktop is-size-4-fullhd">
                            ${post.title}
                        </h2>
                        <p
                            class="blog-card-meta has-text-dark has-text-weight-semibold is-size-6-mobile is-size-6-tablet is-size-6-desktop">
                            ${formatDate(post.creationDate)}
                        </p>
                        <p class="blog-card-meta pb-5 mb-3 is-size-6-mobile is-size-6-tablet is-size-6-desktop is-size-6-fullhd">
                            ${post.description}
                        </p>
                    </div>
                    <div class="tags">
                        ${tagsTemplate(post.tags)}
                    </div>
                </div>
            </div>
        </article>
    </a>
  `;
}
function archivesTemplate(archives) {
  return `
    <div class="box is-shadowless is-column mb-5">
      <p class="has-text-weight-semibold is-uppercase section-label has-text-grey mb-2 is-size-6-mobile is-size-6-tablet is-size-6-desktop">Archives</p>
      <ul>
        ${archives
          .map(
            (archive) => `
              <li>
                <a href="#" data-archive="${archive.slug}" class="is-size-6-mobile is-size-6-tablet is-size-6-desktop is-size-6-fullhd">${archive.label} (${archive.count})</a>
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
    <div class="box is-shadowless">
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
              <p class="blog-card-meta mt-2 is-size-6-mobile is-size-6-tablet is-size-6-desktop is-5-size-fullhd is-5-size-widescreen">${video.title}</p>
            </div>
          `,
        )
        .join("")}
      <span><a href="https://www.youtube.com/@tokimaheryramarozaka2116/videos" target="_blank" class="has-text-primary has-text-weight-bold has-underline mt-4">VIEW ALL VIDEOS →</a></span>
    </div>
  `;
}

function tagsTemplate(tags) {
  return tags
    .map(
      (tag) =>
        `<span class="tag is-info is-rounded has-text-white">${tag}</span>`,
    )
    .join("");
}
