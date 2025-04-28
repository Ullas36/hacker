fetch("data_science.json")
  .then((response) => response.json())
  .then((data) => {
    const roadmapContainer = document.getElementById("roadmap");

    data.roadmap.forEach((mod, modIndex) => {
      const moduleDiv = document.createElement("div");
      moduleDiv.className = "module";
      moduleDiv.innerText = mod.module;

      const chapterList = document.createElement("div");
      chapterList.className = "chapter-list";

      mod.chapters.forEach((chap, chapIndex) => {
        const chapterDiv = document.createElement("div");
        chapterDiv.className = "chapter";
        chapterDiv.innerText = chap.chapter_title;

        const detailsDiv = document.createElement("div");
        detailsDiv.className = "details";
        detailsDiv.innerHTML = `
            <h3>${chap.chapter_title}</h3>
            <p><strong>Duration:</strong> ${chap.duration}</p>
            <p><strong>Description:</strong> ${chap.description}</p>
            <p><strong>Goal:</strong> ${chap.goal}</p>
            <p><strong>Mini Project:</strong> ${chap.mini_project}</p>
            <p><strong>Resources:</strong></p>
            <ul>
                ${chap.resources
                  .map(
                    (link) =>
                      `<li><a href="${link}" target="_blank">${link}</a></li>`
                  )
                  .join("")}
            </ul>
        `;

        chapterDiv.addEventListener("click", () => {
          detailsDiv.style.display =
            detailsDiv.style.display === "none" ? "block" : "none";
        });

        chapterList.appendChild(chapterDiv);
        chapterList.appendChild(detailsDiv);
      });

      moduleDiv.addEventListener("click", () => {
        chapterList.style.display =
          chapterList.style.display === "none" ? "block" : "none";
      });

      roadmapContainer.appendChild(moduleDiv);
      roadmapContainer.appendChild(chapterList);
    });
  })
  .catch((error) => console.error("Error loading JSON:", error));
