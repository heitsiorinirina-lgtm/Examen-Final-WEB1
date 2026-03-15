const container = document.getElementById('testimonials-container');

function displayFiveTestimonials() {
    if (typeof data === 'undefined' || !data.testimonials) {
        console.error("Variable 'data.testimonials' introuvable.");
        return;
    }

    const limitedTestimonials = data.testimonials.slice(0, 5);

    container.innerHTML = limitedTestimonials.map(item => `
        <div class="card">
            <div class="card-header">
                <img src="assets/square-image.jpg" class="avatar" alt="avatar">
                <div class="author-meta">
                    <b>${item.author}</b>
                    <span>${item.role}</span>
                </div>
            </div>
            <p class="description">${item.description}</p>
            <div class="stars">
                ${'★'.repeat(item.rating)}${'☆'.repeat(5 - item.rating)}
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', displayFiveTestimonials);