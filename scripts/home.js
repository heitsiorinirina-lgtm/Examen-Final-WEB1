const aboutContent = document.getElementById("about-content");
const statsContainer = document.getElementById("stats-container");

aboutContent.innerHTML = `
            <p class="has-text-grey-dark">${data.aboutMe_part1}</p>
            <p class="has-text-grey-dark">${data.aboutMe_part2}</p>
        `;

data.overview.forEach((item) => {
  statsContainer.innerHTML += statsTemplate(item);
});

const coursesContainer = document.getElementById("courses-container");
coursesContainer.innerHTML = "";
coursesContainer.classList.add("is-multiline", "is-centered");

const bgMap = {
  Development: "is-link",
  Translation: "is-black",
  Research: "is-dark",
};

data.homeCourses.forEach((course) => {
  const bgClass = bgMap[course.tag] || "is-light";

  const column = document.createElement("div");
  column.className = "column is-30-percent is-flex";

  column.innerHTML = courseCardTemplate(course, bgClass);

  coursesContainer.appendChild(column);
});

const expGrid = document.getElementById("experience-grid");
expGrid.innerHTML = "";

data.experiences.forEach((exp) => {
  const expCol = document.createElement("div");
  expCol.className = "column has-border-left is-6-desktop is-12-tablet";

  expCol.innerHTML = experienceTemplate(exp);
  expGrid.appendChild(expCol);
});
