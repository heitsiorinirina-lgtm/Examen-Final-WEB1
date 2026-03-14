import { testimonials } from '../data/tokimahery.data.js';

const grid = document.getElementById('testimonial-grid');

function renderTestimonials() {
    grid.innerHTML = '';

    testimonials.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        
        const stars = '★'.repeat(item.rating) + '☆'.repeat(5 - item.rating);

        card.innerHTML = `
            <div class="card-header">
                <img src="${item.thumbnail}" alt="${item.author}" class="avatar">
                <div class="author-info">
                    <span class="author-name">${item.author}</span>
                    <span class="author-role">${item.role}</span>
                </div>
            </div>
            <div class="card-body">
                ${item.description}
            </div>
            <div class="rating-stars">${stars}</div>
        `;
        
        grid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', renderTestimonials);