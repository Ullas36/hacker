fetch("current_file.json")
  .then((response) => response.json())
  .then((meta) => {
    const roadmapFile = meta.filename;
    return fetch(roadmapFile);
  })
  .then((response) => response.json())
  .then((data) => {
    const roadmapContainer = document.getElementById("roadmap");

    data.roadmap.forEach((mod, index) => {
      const moduleDiv = document.createElement("div");
      moduleDiv.className = "module";
      moduleDiv.setAttribute("data-tooltip", mod.module);
      moduleDiv.innerText = index + 1;

      const chapterList = document.createElement("div");
      chapterList.className = "chapter-list";

      mod.chapters.forEach((chap) => {
        const chapterDiv = document.createElement("div");
        chapterDiv.className = "chapter";
        chapterDiv.innerText = chap.chapter_title;

        chapterDiv.addEventListener("click", (e) => {
          e.stopPropagation(); // Prevent collapsing when clicking chapter
          const params = new URLSearchParams({
            title: chap.chapter_title,
            duration: chap.duration,
            description: chap.description,
            goal: chap.goal,
            mini_project: chap.mini_project,
            resources: JSON.stringify(chap.resources),
          });
          window.location.href = `chapter.html?${params.toString()}`;
        });

        chapterList.appendChild(chapterDiv);
      });

      moduleDiv.addEventListener("click", () => {
        const isVisible = chapterList.style.display === "block";
        chapterList.style.display = isVisible ? "none" : "block";
      });

      roadmapContainer.appendChild(moduleDiv);
      roadmapContainer.appendChild(chapterList);
    });
  })
  .catch((error) => console.error("Error loading JSON:", error));
