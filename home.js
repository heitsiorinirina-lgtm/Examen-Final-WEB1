const profileData = {
    aboutMe_part1: `Je suis chercheuse en doctorat, je me passionne pour l'étude des systèmes complexes à travers la modélisation et la simulation multi-agents. Cependant, l'enseignement est mon Ikigai.`,
    aboutMe_part2: `Ce n'est pas un simple accessoire à mon travail, c'est sa fondation et son énergie. La recherche affine ma réflexion, la classe lui donne un sens. Et en tant que développeuse, je transforme les idées en logiciels propres, fiables et conçus pour durer.`,
    overview: [
        { number: new Date().getFullYear() - 2017, label: 'Years experience' },
        { number: '800+', label: 'Students taught' },
        { number: '20+', label: 'Topics' }
    ]
};

function renderAboutSection() {
    const textTarget = document.getElementById('am-text-content');
    const statsTarget = document.getElementById('am-stats-content');

    if (textTarget && statsTarget) {
        textTarget.innerHTML = '';
        statsTarget.innerHTML = '';
        textTarget.innerHTML = `
            <p class="am-description-p">${profileData.aboutMe_part1}</p>
            <p class="am-description-p">${profileData.aboutMe_part2}</p>
        `;
        profileData.overview.forEach(item => {
            const div = document.createElement('div');
            div.className = 'am-stat-item';
            div.innerHTML = `
                <span class="am-stat-number">${item.number}</span>
                <span class="am-stat-label">${item.label}</span>
            `;
            statsTarget.appendChild(div);
        });
    }
}

document.addEventListener('DOMContentLoaded', renderAboutSection);

const homeCourses = [
    { tag: 'Development', title: 'Web Development Fundamentals', mode: 'Online', duration: '8 weeks', color: '#bc2026' },
    { tag: 'Translation', title: 'Technical Translation Masterclass', mode: 'Hybrid', duration: '6 weeks', color: '#222' },
    { tag: 'Research', title: 'Academic Writing & Methodology', mode: 'Offline', duration: '10 weeks', color: '#555' }
];

function renderCourses() {
    const grid = document.getElementById('lc-courses-grid');
    if (!grid) return;

    grid.innerHTML = homeCourses.map(course => `
        <div class="lc-card">
            <span class="lc-tag" style="background-color: ${course.color || '#222'}">${course.tag}</span>
            <h3 class="lc-title">${course.title}</h3>
            <div class="lc-meta">
                <span>${course.mode}</span>
                <span>${course.duration}</span>
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', renderCourses);

// Données issues de votre fichier JS (Photo 2)
const experiences = [
    { 
        year: '2026 — Present', 
        role: 'Consultant', 
        org: 'INDEPENDENT', 
        desc: 'Advising, teaching, on a much more singular level for all societies, and developing scalable solutions',
        isHighlighted: false 
    },
    { 
        year: '2021 — 2026', 
        role: 'Study Coordinator | Back-end developer', 
        org: 'HEI Madagascar (Haute École d’Informatique), Antananarivo', 
        desc: 'Responsible of studies, permanent teacher for 5 different topics, as well as some back-end development on the school management app',
        isHighlighted: false
    },
    { 
        year: '2024', 
        role: 'PhD in Computer Science', 
        org: 'UNIVERSITÉ DE FIANARANTSOA', 
        desc: 'A self-founded PhD on modeling complex systems, between the university of Fianarantsoa, and CIRAD, Montpellier, titled: Accounting for norms in agent-based modeling',
        isHighlighted: false
    },
    { 
        year: '2017 — 2020', 
        role: 'Teacher', 
        org: 'ESMIA (École Supérieure de Management et d’Informatique appliquée), Antananarivo', 
        desc: 'Taught over 14 different topics from first years to Master degree. Mentoring students from small projects to technical ones',
        isHighlighted: true // On active la ligne rouge pour cet élément comme sur la photo
    }
];

function renderExperiences() {
    const grid = document.getElementById('ex-experience-grid');
    if (!grid) return;

    grid.innerHTML = experiences.map(exp => `
        <div class="ex-item ${exp.isHighlighted ? 'highlight' : ''}">
            <span class="ex-year">${exp.year}</span>
            <span class="ex-role">${exp.role}</span>
            <span class="ex-org">${exp.org}</span>
            <p class="ex-desc">${exp.desc}</p>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', renderExperiences);