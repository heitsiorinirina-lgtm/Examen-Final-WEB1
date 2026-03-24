function statsTemplate(item) {
  return `
        <div class="column is-4 has-text-centered-touch">
            <span class="title has-text-link">${item.number}</span> <br>
            <span class="is-uppercase has-text-grey">${item.label}</span>
        </div>
    `;
}

function courseCardTemplate(course, bgClass) {
  return `
        <div class="box is-height-full p-5 shadow-on-hover is-flex is-flex-direction-column is-justify-content-space-between has-fullwidth mb-0">
            <div>
                <div class="tag is-rounded ${bgClass} mb-4">${course.tag}</div>
                <h2 class="title is-4">${course.title}</h2>
            </div>
            <div class="is-flex is-justify-content-space-between mt-5 has-text-grey is-size-7">
                <span class="level-item">${course.mode}</span>
                <span class="level-item">${course.duration}</span>
            </div>
        </div>
    `;
}

function experienceTemplate(exp) {
  return `
        <div class="exp-item px-5">
            <span class="exp-year has-text-weight-bold is-size-7 is-uppercase">${exp.year}</span>
            <h3 class="exp-role title is-4 mb-2">${exp.role}</h3>
            <span class="exp-org is-size-7 is-uppercase has-text-grey-light has-text-weight-semibold mb-4 is-block">${exp.org}</span>
            <p class="has-text-grey">${exp.desc}</p>
        </div>
    `;
}
