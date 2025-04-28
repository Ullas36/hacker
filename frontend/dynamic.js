const data = JSON.parse(example.json);

const modulesContainer = document.getElementById("modulesContainer");

data.roadmap.forEach((module) => {
  // Create Module Title
  const moduleTitle = document.createElement("h2");
  moduleTitle.innerText = module.module;
  modulesContainer.appendChild(moduleTitle);

  // Create a container for chapters
  const chapterContainer = document.createElement("div");
  modulesContainer.appendChild(chapterContainer);

  module.chapters.forEach((chapter, index) => {
    const chapterButton = document.createElement("button");
    chapterButton.innerText = chapter.chapter_title;
    chapterButton.style.display = "block";
    chapterButton.style.margin = "10px 0";

    chapterButton.addEventListener("click", () => {
      // Clear previous chapter details
      const existingDetails = document.getElementById("chapterDetails");
      if (existingDetails) existingDetails.remove();

      // Create New Chapter Details UI
      const chapterDetails = document.createElement("div");
      chapterDetails.id = "chapterDetails";
      chapterDetails.innerHTML = `
        <h3>${chapter.chapter_title}</h3>
        <p><strong>Duration:</strong> ${chapter.duration}</p>
        <p><strong>Description:</strong> ${chapter.description}</p>
        <p><strong>Goal:</strong> ${chapter.goal}</p>
        <p><strong>Resources:</strong></p>
        <ul>
          ${chapter.resources
            .map(
              (link) => `<li><a href="${link}" target="_blank">${link}</a></li>`
            )
            .join("")}
        </ul>
        <p><strong>Mini Project:</strong> ${chapter.mini_project}</p>
      `;

      chapterContainer.appendChild(chapterDetails);
    });

    chapterContainer.appendChild(chapterButton);
  });
});
