// ─── State ────────────────────────────────────────────────────────────────────

const filters = {
  languages: [], // [] means "all"
  technology: "all",
  level: "all",
  minPrice: 0,
  maxPrice: 300000,
  keyword: "",
};

// ─── Render ───────────────────────────────────────────────────────────────────

function renderCourses() {
  const results = data.courses.filter((course) => {
    // Language filter (multi-select – empty means "show all")
    if (
      filters.languages.length > 0 &&
      !filters.languages.includes(course.language)
    )
      return false;

    // Technology filter
    if (
      filters.technology !== "all" &&
      !course.technologies.includes(filters.technology)
    )
      return false;

    // Level filter
    if (filters.level !== "all" && course.level !== filters.level) return false;

    // Price range filter
    if (course.price < filters.minPrice || course.price > filters.maxPrice)
      return false;

    // Keyword filter (title + description, case-insensitive)
    if (filters.keyword.trim() !== "") {
      const kw = filters.keyword.trim().toLowerCase();
      const haystack = (course.title + " " + course.description).toLowerCase();
      if (!haystack.includes(kw)) return false;
    }

    return true;
  });

  const list = document.getElementById("courses-list");
  if (results.length === 0) {
    list.innerHTML =
      '<p class="has-text-grey has-text-centered p-6 column is-full">No courses match your filters.</p>';
  } else {
    list.innerHTML = results.map(courseCardTemplate).join("");
  }
}

// ─── Language flags ────────────────────────────────────────────────────────────

document.querySelectorAll(".image.is-clickable").forEach((flag) => {
  flag.addEventListener("click", () => {
    const lang = flag.querySelector("img").alt.toLowerCase(); // "mg", "fr", "eng" → map to data values
    const langMap = { mg: "mg", fr: "fr", eng: "en" };
    const value = langMap[lang];

    flag.classList.toggle("is-selected-flag");

    if (filters.languages.includes(value)) {
      filters.languages = filters.languages.filter((l) => l !== value);
    } else {
      filters.languages.push(value);
    }

    renderCourses();
  });
});

// ─── Dropdown helper ──────────────────────────────────────────────────────────

function bindDropdown(menuId, filterKey, labelEl) {
  const menu = document.getElementById(menuId);
  if (!menu) return;

  menu.querySelectorAll(".dropdown-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();

      // Update active state visually
      menu
        .querySelectorAll(".dropdown-item")
        .forEach((i) => i.classList.remove("is-active"));
      item.classList.add("is-active");

      // Derive the filter value from the item text (strip the icon span)
      const rawText = item.textContent.trim().toLowerCase();

      // Map display labels → data values
      const valueMap = {
        "all technologies": "all",
        javascript: "javascript",
        java: "java",
        python: "python",
        php: "php",
        "all levels": "all",
        beginner: "beginner",
        intermediate: "intermediate",
        advanced: "advanced",
      };

      filters[filterKey] = valueMap[rawText] ?? "all";

      // Update the button label
      const btn = menu
        .closest(".dropdown")
        .querySelector(".dropdown-trigger button span:first-child");
      if (btn)
        btn.textContent = item.textContent
          .trim()
          .replace(/^[\s\S]*?(\w)/, "$1");

      renderCourses();
    });
  });
}

bindDropdown("dropdown-menu", "technology");
bindDropdown("dropdown-menu-level", "level");

// ─── Price range sliders ──────────────────────────────────────────────────────

const sliderMin = document.getElementById("price-slider-min");
const sliderMax = document.getElementById("price-slider-max");
const labelMin = document.getElementById("min-price");
const labelMax = document.getElementById("max-price");

function syncSliders() {
  let min = parseInt(sliderMin.value);
  let max = parseInt(sliderMax.value);

  // Prevent crossing
  if (min > max) {
    [sliderMin.value, sliderMax.value] = [max, min];
    [min, max] = [max, min];
  }

  filters.minPrice = min;
  filters.maxPrice = max;

  labelMin.textContent = min.toLocaleString();
  labelMax.textContent = max.toLocaleString();

  renderCourses();
}

sliderMin.addEventListener("input", syncSliders);
sliderMax.addEventListener("input", syncSliders);

// ─── Keyword search ───────────────────────────────────────────────────────────

const keywordInput = document.getElementById("keyword-search");
let debounceTimer;

keywordInput.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    filters.keyword = keywordInput.value;
    renderCourses();
  }, 250);
});

// ─── Clear all ────────────────────────────────────────────────────────────────

document.querySelectorAll(".column.is-clickable").forEach((btn) => {
  if (btn.textContent.trim() === "CLEAR ALL") {
    btn.addEventListener("click", () => {
      // Reset filter state
      filters.languages = [];
      filters.technology = "all";
      filters.level = "all";
      filters.minPrice = 0;
      filters.maxPrice = 300000;
      filters.keyword = "";

      // Reset UI
      sliderMin.value = 0;
      sliderMax.value = 300000;
      labelMin.textContent = "0";
      labelMax.textContent = "300,000";
      keywordInput.value = "";

      document
        .querySelectorAll(".image.is-clickable")
        .forEach((f) => f.classList.remove("is-selected-flag"));

      document
        .querySelectorAll(".dropdown-item")
        .forEach((item) => item.classList.remove("is-active"));
      document
        .querySelectorAll(".dropdown-item:first-child")
        .forEach((item) => item.classList.add("is-active"));
      document
        .querySelectorAll(".dropdown-trigger button span:first-child")
        .forEach((btn, i) => {
          btn.textContent = i === 0 ? "All technologies" : "All levels";
        });

      renderCourses();
    });
  }
});

// ─── Initial render ───────────────────────────────────────────────────────────

renderCourses();
