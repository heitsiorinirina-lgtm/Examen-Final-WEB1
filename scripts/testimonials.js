const studentsTestimonials = document.getElementById("students");
const customersTestimonials = document.getElementById("customers");
const collaboratorsTestimonials = document.getElementById("collaborators");

studentsTestimonials.innerHTML += data.testimonials
  .map((testimonials) => studentsTestimonialsTemplate(testimonials))
  .join("");

customersTestimonials.innerHTML += data.testimonials
  .map((testimonials) => customersTestimonialsTemplate(testimonials))
  .join("");

collaboratorsTestimonials.innerHTML += data.testimonials
  .map((testimonials) => collaboratorsTestimonialsTemplate(testimonials))
  .join("");
