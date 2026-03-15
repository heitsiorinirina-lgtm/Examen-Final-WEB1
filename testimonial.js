const containerStudents = document.getElementById('testimonials-container');
const containerCollabs = document.getElementById('collaborators-container');

function displayAllTestimonials() {
    if (typeof data === 'undefined' || !data.testimonials) return;

    // 1. Affiche les 5 premiers (STUDENTS) - Style classique
    const students = data.testimonials.slice(0, 5);
    containerStudents.innerHTML = students.map(item => `
        <div class="card">
            <div class="card-header">
                <img src="assets/square-image.jpg" class="avatar" alt="avatar">
                <div class="author-meta">
                    <b>${item.author}</b>
                    <span>${item.role}</span>
                </div>
            </div>
            <p class="description">${item.description}</p>
            <div class="stars">${'★'.repeat(item.rating)}</div>
        </div>
    `).join('');

    // 2. Affiche les 5 suivants (COLLABORATORS) - Style Inversé (Photo 2)
    const collabs = data.testimonials.slice(5, 10);
    containerCollabs.innerHTML = collabs.map(item => `
        <div class="card alternate-card">
            <p class="description is-italic">"${item.description}"</p>
            <div class="card-footer-meta">
                <img src="assets/square-image.jpg" class="avatar" alt="avatar">
                <div class="author-meta">
                    <b>${item.author}</b>
                    <span class="is-uppercase">${item.role}</span>
                </div>
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', displayAllTestimonials);