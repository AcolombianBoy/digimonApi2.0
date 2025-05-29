export default async function mostrarHome() { //esta funcion sirve para mostrar el home
  const app = document.getElementById("app");
  app.innerHTML = `<h2>Digimon</h2><div id="lista" style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: space-between; padding: 10px;"></div>`;

  const lista = document.getElementById("lista");

  try {
    const res = await fetch("https://digimon-api.vercel.app/api/digimon");
    const data = await res.json();

    data.forEach((digimon) => {
      const item = document.createElement("div");

      item.innerHTML = `
        <p>${digimon.name} - ${digimon.level}</p>
        <img src="${digimon.img}" style="width: 100px; height: 100px;" />
      `;

      lista.appendChild(item);
    });
  } catch (error) {
    app.innerHTML = `<p>Error al cargar los Digimon: ${error.message}</p>`;
  }
}