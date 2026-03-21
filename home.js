document.addEventListener('DOMContentLoaded', () => {
    // 1. Injection des textes de description
    const contentDiv = document.getElementById('about-content');
    
    const p1 = document.createElement('p');
    p1.textContent = data.aboutMe_part1;
    
    const p2 = document.createElement('p');
    p2.textContent = data.aboutMe_part2;
    
    contentDiv.appendChild(p1);
    contentDiv.appendChild(p2);

    // 2. Injection des statistiques (le tableau 'overview' dans ton code)
    const statsDiv = document.getElementById('stats-container');
    
    data.overview.forEach(item => {
        const column = document.createElement('div');
        column.className = 'column is-4';
        
        column.innerHTML = `
            <div class="stat-item">
                <span class="stat-number">${item.number}</span>
                <span class="stat-label">${item.label}</span>
            </div>
        `;
        statsDiv.appendChild(column);
    });
});


const coursesData = [
    {
        category: "Development",
        class: "bg-development",
        title: "Web Development Fundamentals",
        mode: "Online",
        duration: "8 weeks"
    },
    {
        category: "Translation",
        class: "bg-translation",
        title: "Technical Translation Masterclass",
        mode: "Hybrid",
        duration: "6 weeks"
    },
    {
        category: "Research",
        class: "bg-research",
        title: "Academic Writing & Methodology",
        mode: "Offline",
        duration: "10 weeks"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('courses-container');
    
    coursesData.forEach(course => {
        const column = document.createElement('div');
        column.className = 'column is-4';
        
        column.innerHTML = `
            <div class="course-card">
                <div>
                    <div class="tag-category ${course.class}">${course.category}</div>
                    <h3 class="course-title">${course.title}</h3>
                </div>
                <div class="course-footer">
                    <span>${course.mode}</span>
                    <span>${course.duration}</span>
                </div>
            </div>
        `;
        container.appendChild(column);
    });
});


const experienceData = [
    {
        year: "2026 — PRESENT",
        role: "Consultant",
        org: "INDEPENDENT",
        desc: "Advising, teaching, on a much more singular level for all societies, and developing scalable solutions."
    },
    {
        year: "2021 — 2026",
        role: "Study Coordinator | Back-end developer",
        org: "HEI MADAGASCAR (HAUTE ÉCOLE D'INFORMATIQUE), ANTANANARIVO",
        desc: "Responsible of studies, permanent teacher for 5 different topics, as well as some back-end development on the school management app."
    },
    {
        year: "2024",
        role: "PhD in Computer Science",
        org: "UNIVERSITÉ DE FIANARANTSOA",
        desc: "A self-founded PhD on modeling complex systems, between the university of Fianarantsoa, and CIRAD, Montpellier, titled: Accounting for norms in agent-based modeling."
    },
    {
        year: "2017 — 2020",
        role: "Teacher",
        org: "ESMIA (ÉCOLE SUPÉRIEURE DE MANAGEMENT ET D'INFORMATIQUE APPLIQUÉE), ANTANANARIVO",
        desc: "Taught over 14 different topics from first years to Master degree. Mentoring students from small projects to technical ones."
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('experience-grid');
    
    experienceData.forEach(exp => {
        const column = document.createElement('div');
        column.className = 'column is-6'; // Deux colonnes par ligne
        
        column.innerHTML = `
            <div class="exp-item">
                <span class="exp-year">${exp.year}</span>
                <h3 class="exp-role">${exp.role}</h3>
                <span class="exp-org">${exp.org}</span>
                <p class="exp-desc">${exp.desc}</p>
            </div>
        `;
        grid.appendChild(column);
    });
});


// On suppose que 'data' contient ces infos
const dataFooter = {
    footerTitle: "Ready to collaborate?",
    footerSubtitle: "Whether you're looking for a course, a consultation, or a translation — let's talk."
};

document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('.cta-title');
    const desc = document.getElementById('footer-description');

    if(title) title.textContent = dataFooter.footerTitle;
    if(desc) desc.textContent = dataFooter.footerSubtitle;
});