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
