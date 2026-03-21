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
    return `<div class="column is-one-third">
                <div class="card is-height-full has-background-white-bis is-shadowless">
                    <div class="card-content is-flex is-flex-direction-column is-flex-grow-1 is-height-full is-justify-content-space-between pb-4">
                        <div class="media is-align-items-center mb-4">
                            <div class="media-left">
                                <figure class="image is-48x48">
                                    <img class="is-rounded" src="${testimonial.thumbnail}">
                                </figure>
                            </div>
                            <div class="media-content">
                                <p class="has-text-weight-bold">${testimonial.author}</p>
                                <p class="has-text-grey">${role}</p>
                            </div>
                        </div>
                        <p class="section-label"></p>
                        <p class="mt-4">${testimonial.description}</p>
                        <div class="mt-4">
                            ${stars.join("")}
                        </div>
                    </div>
                </div>
            </div>`;
  }
}
