// Carga la lista de obras y arma la galería principal.
fetch("data/obras.json")
  .then((res) => {
    if (!res.ok) throw new Error("No se pudo cargar data/obras.json");
    return res.json();
  })
  .then((data) => {
    const artista = data.artista || {};
    const obras = data.obras || [];

    // Encabezado
    if (artista.nombre) {
      document.getElementById("artista-nombre").textContent = artista.nombre;
      document.title = "Obras de " + artista.nombre;
    }
    const sub = document.getElementById("artista-sub");
    if (sub) sub.textContent = "Colección de obras";

    // Galería
    const cont = document.getElementById("galeria");
    cont.innerHTML = "";

    if (obras.length === 0) {
      cont.innerHTML = '<p class="cargando">Aún no hay obras para mostrar.</p>';
    }

    obras.forEach((obra) => {
      const a = document.createElement("a");
      a.className = "card";
      a.href = "obra.html?id=" + encodeURIComponent(obra.id);

      const img = document.createElement("img");
      img.className = "card-img";
      img.src = obra.imagen || "";
      img.alt = obra.titulo || "Obra";
      img.loading = "lazy";

      const body = document.createElement("div");
      body.className = "card-body";

      const title = document.createElement("h2");
      title.className = "card-title";
      title.textContent = obra.titulo || "Sin título";

      const meta = document.createElement("p");
      meta.className = "card-meta";
      meta.textContent = [obra.tecnica, obra.anio].filter(Boolean).join(" · ");

      body.appendChild(title);
      body.appendChild(meta);
      a.appendChild(img);
      a.appendChild(body);
      cont.appendChild(a);
    });

    // Footer de contacto
    renderContacto(artista);
  })
  .catch((err) => {
    document.getElementById("galeria").innerHTML =
      '<p class="cargando">Error al cargar las obras. Revisa el archivo data/obras.json.</p>';
    console.error(err);
  });

function renderContacto(artista) {
  const footer = document.getElementById("contacto-footer");
  if (!footer) return;
  const partes = [];
  if (artista.nombre) partes.push(artista.nombre);
  if (artista.email) partes.push(artista.email);
  if (artista.instagram) partes.push(artista.instagram);
  footer.textContent = partes.join(" · ");
}
