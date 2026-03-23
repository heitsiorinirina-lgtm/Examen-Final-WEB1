/**
 * Logique d'injection dynamique pour le portfolio
 * S'assure que les classes correspondent au fichier SCSS compilé
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. SECTION ABOUT : TEXTE ET STATISTIQUES ---
  const aboutContent = document.getElementById("about-content");
  const statsContainer = document.getElementById("stats-container");

  if (aboutContent && data.aboutMe_part1 && data.aboutMe_part2) {
    aboutContent.innerHTML = `
            <p>${data.aboutMe_part1}</p>
            <p>${data.aboutMe_part2}</p>
        `;
  }

  if (statsContainer && data.overview) {
    data.overview.forEach((item) => {
      const statCol = document.createElement("div");
      statCol.className = "column is-4";
      statCol.innerHTML = `
                <div class="stat-item">
                    <span class="stat-number-red">${item.number}</span>
                    <span class="stat-label">${item.label}</span>
                </div>
            `;
      statsContainer.appendChild(statCol);
    });
  }

  // --- 2. SECTION COURSES : CARTES ARRONDIES ---
  const coursesContainer = document.getElementById("courses-container");

  if (coursesContainer && data.homeCourses) {
    // Liste des classes de couleurs pour alterner les badges comme sur l'image
    const bgClasses = ["bg-dev", "bg-trans", "bg-res"];

    data.homeCourses.forEach((course, index) => {
      const courseCol = document.createElement("div");
      courseCol.className = "column is-4";

      // On utilise l'index pour alterner les couleurs de badges (0, 1, 2)
      const currentBg = bgClasses[index % bgClasses.length];

      courseCol.innerHTML = `
                <div class="course-card">
                    <div>
                        <div class="tag-category ${currentBg}">${course.tag}</div>
                        <h3 class="title is-4" style="font-family: 'Playfair Display', serif; font-weight: 700;">
                            ${course.title}
                        </h3>
                    </div>
                    <div class="level is-mobile mt-5 has-text-grey is-size-7">
                        <div class="level-left">
                            <span class="level-item">${course.mode}</span>
                        </div>
                        <div class="level-right">
                            <span class="level-item">${course.duration}</span>
                        </div>
                    </div>
                </div>
            `;
      coursesContainer.appendChild(courseCol);
    });
  }

  // --- 3. SECTION EXPERIENCE : GRILLE AVEC BORDURE CENTRALE ---
  const expGrid = document.getElementById("experience-grid");

  if (expGrid && data.experiences) {
    data.experiences.forEach((exp) => {
      const expCol = document.createElement("div");
      expCol.className = "column is-6"; // Deux colonnes par ligne sur desktop

      expCol.innerHTML = `
                <div class="exp-item">
                    <span class="exp-year">${exp.year}</span>
                    <h3 class="exp-role">${exp.role}</h3>
                    <span class="exp-org">${exp.org}</span>
                    <p class="has-text-grey">${exp.desc}</p>
                </div>
            `;
      expGrid.appendChild(expCol);
    });
  }
});
