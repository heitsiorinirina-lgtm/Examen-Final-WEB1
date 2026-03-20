document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('testimonials-container');
    
    // On récupère seulement les 5 premiers éléments du tableau
    const topFive = data.testimonials.slice(0, 5);

    topFive.forEach(item => {
        // Création des étoiles
        let starsHtml = '';
        for (let i = 0; i < 5; i++) {
            starsHtml += `<i class="${i < item.rating ? 'fas' : 'far'} fa-star"></i> `;
        }

        // Création de la colonne Bulma
        const column = document.createElement('div');
        column.className = 'column is-4-desktop is-6-tablet';

        // Template de la carte
        column.innerHTML = `
            <div class="testimonial-card">
                <div class="card-header-custom">
                    <img src="${item.thumbnail}" alt="Avatar" class="author-img">
                    <div>
                        <p class="author-name">${item.author}</p>
                        <p class="role-text">${item.role}</p>
                    </div>
                </div>
                <div class="red-divider"></div>
                <p class="description-text">${item.description}</p>
                <div class="stars-container">
                    ${starsHtml}
                </div>
            </div>
        `;

        container.appendChild(column);
    });
});