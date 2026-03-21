document.getElementById("courses-list").innerHTML = data.courses
  .map(courseCardTemplate)
  .join("");
