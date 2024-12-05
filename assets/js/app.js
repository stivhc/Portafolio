// Alternar la visibilidad del menú al presionar el botón
document
  .getElementById("navbar-toggler")
  .addEventListener("click", function () {
    const navbar = document.getElementById("navbarNav");
    navbar.classList.toggle("show"); // Agrega o elimina la clase 'show'
  });

const fetchGitHubProjects = async () => {
  const username = "stivhc";
  console.log("Iniciando la función fetchGitHubProjects...");

  try {
    console.log(
      `Realizando la petición a: https://api.github.com/users/${username}/repos`
    );
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`
    );

    console.log("Respuesta obtenida:", response);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const repos = await response.json();
    console.log("Datos de los repositorios:", repos);

    const projectCards = document.getElementById("project-cards");
    console.log("Elemento project-cards:", projectCards);

    const starredRepos = repos.filter((repo) => repo.stargazers_count > 0);
    console.log("Repositorios con estrellas:", starredRepos);

    starredRepos.forEach((repo, index) => {
      console.log(`Creando tarjeta para el repositorio: ${repo.name}`);

      const card = document.createElement("div");
      card.className = "col-md-4 mb-4";
      card.setAttribute("data-aos", "fade-up");
      card.setAttribute("data-aos-delay", `${index * 100}`);

      card.innerHTML = `
        <div class="card h-100 shadow">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${repo.name}</h5>
            <p class="card-text flex-grow-1">${
              repo.description || "Sin descripción"
            }</p>
            <p class="card-text"><small class="text-muted">⭐ ${
              repo.stargazers_count
            }</small></p>
            <a href="${
              repo.html_url
            }" class="btn btn-custom mt-auto" target="_blank">Ver proyecto</a>
          </div>
        </div>
      `;

      projectCards.appendChild(card);
    });

    console.log("Repositorios cargados exitosamente.");
  } catch (error) {
    console.error("Error al cargar los proyectos:", error);
  }
};

fetchGitHubProjects();
