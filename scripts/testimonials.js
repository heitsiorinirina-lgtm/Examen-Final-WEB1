const studentsTestimonials = document.getElementById("students");
studentsTestimonials.innerHTML = data.testimonials
  .map((testimonials) => studentsTestimonialsTemplate(testimonials))
  .join("");
