const containerStudents = document.getElementById('testimonials-container');
const containerCollabs = document.getElementById('collaborators-container');
const containerCustomers = document.getElementById('customers-container');

function displayAllTestimonials() {
    if (typeof data === 'undefined' || !data.testimonials) {
        console.error("Les données 'data.testimonials' sont introuvables.");
        return;
    }
    // --- 1. SECTION STUDENTS (Index 0 à 4) ---
    const students = data.testimonials.slice(0, 5);
    if (containerStudents) {
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
    }

    // --- 2. SECTION COLLABORATORS (Index 5 à 9) ---
    // Style : Texte en haut (Italique), Auteur en bas
    const collabs = data.testimonials.slice(5, 10);
    if (containerCollabs) {
        containerCollabs.innerHTML = collabs.map(item => `
            <div class="card collab-card">
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

    // --- 3. SECTION CUSTOMERS (Index 10 à 14) ---
    const customers = data.testimonials.slice(10, 15);
    if (containerCustomers) {
        containerCustomers.innerHTML = customers.map(item => `
            <div class="card customer-card">
                <div class="stars mb-3">${'★'.repeat(item.rating)}</div>
                <p class="description">"${item.description}"</p>
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
}

document.addEventListener('DOMContentLoaded', displayAllTestimonials);