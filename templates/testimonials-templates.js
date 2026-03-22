function studentsTestimonialsTemplate(testimonial) {
  const rating = testimonial.rating;
  const role = testimonial.role;

  let stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(`<i class="fa-solid fa-star has-text-primary"></i>`);
  }
  stars.splice(
    rating,
    5 - rating,
    ...Array(5 - rating).fill(
      '<i class="fa-solid fa-star has-text-grey-lighter"></i>',
    ),
  );

  if (role == "student") {
    return `<article class="column is-one-third">
                <div class="card is-height-full has-background-white-bis shadow-on-hover is-shadowless">
                    <div class="card-content is-flex is-flex-direction-column is-flex-grow-1 is-height-full pb-4">
                        <div class="card-content">
                            <div class="media is-align-items-center mb-4">
                                <div class="media-left">
                                        <img class="is-rounded" src="${testimonial.thumbnail}">                                        <img class="is-rounded" src="${testimonial.thumbnail}">                                    </img>
                                </div>
                                <div class="media-content">
                                    <p class="has-text-weight-bold">${testimonial.author}</p>
                                    <p class="has-text-grey">${role}</p>
                                </div>
                            </div>
                            <p class="section-label"></p>
                            <div class="is-flex is-justify-content-space-between is-flex-direction-column is-flex-grow-1">
                            <p class="mt-4 has-text-grey">${testimonial.description}</p>
                            <div class="mt-4">
                                ${stars.join("")}
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>`;
  }
  return "";
  return "";
}

function collaboratorsTestimonialsTemplate(testimonial) {
  if (testimonial.role == "collaborator") {
    return `<article class="column is-half">
                            <div
                                class="card is-height-full is-flex is-flex-direction-column is-shadowless shadow-on-hover">
                                <div
                                    class="card-content is-flex is-flex-direction-column is-justify-content-space-between is-height-full">
                                    <div class="content title is-5 is-italic">
                                        "${testimonial.description}"
                                    </div>
                                    <div>
                                        <hr>
                                        <div class="media is-align-items-center">
                                            <div class="media-left">
                                                <figure class="image is-48x48">
                                                    <img class="is-rounded" src=${testimonial.thumbnail}>
                                                </figure>
                                            </div>
                                            <div class="media-content">
                                                <p class="has-text-weight-bold">${testimonial.author}</p>
                                                <p class="has-text-grey is-uppercase is-size-7">${testimonial.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>`;
  }
}

function customersTestimonialsTemplate(testimonial) {
  const rating = testimonial.rating;
  const role = testimonial.role;

  let stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(`<i class="fa-solid fa-star has-text-primary"></i>`);
  }
  stars.splice(
    rating,
    5 - rating,
    ...Array(5 - rating).fill(
      '<i class="fa-solid fa-star has-text-grey-lighter"></i>',
    ),
  );

  if (role == "customer") {
    return `<article class="column is-one-third">
                <div class="card is-height-full has-background-white-bis shadow-on-hover is-shadowless ">
                    <div class="card-content is-flex is-flex-direction-column is-flex-grow-1 is-height-full pt-4">
                    <div class="mb-4">
                    ${stars.join("")}
                    </div>
                    <div class="is-flex is-justify-content-space-between is-flex-direction-column is-flex-grow-1">
                    <p class="mb-4 has-text-grey">${testimonial.description}</p>
                    </div>
                    <div class="media is-align-items-center mb-4">
                            <div class="media-left">
                                <figure class="image is-48x48">
                                    <img class="is-rounded" src=${testimonial.thumbnail}>
                                </figure>
                            </div>
                            <div class="media-content">
                                <p class="has-text-weight-bold">${testimonial.author}</p>
                                <p class="has-text-grey is-uppercase">${role}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </article>`;
  }
}
