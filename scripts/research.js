const researchArticles = document.querySelector("#research");

function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
}

function tagsTemplate(tags) {
  return tags
    .map((tag) => `<span class="tag has-text-grey is-uppercase">${tag}</span>`)
    .join("");
}

function renderPapers() {
  for (const paper of data.papers) {
    researchArticles.innerHTML += researchArticlesTemplate(paper);
  }
}
renderPapers();
