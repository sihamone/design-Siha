// Lee el id de la URL (?id=obra-01) y muestra el detalle de esa obra.
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch("data/obras.json")
  .then((res) => {
    if (!res.ok) throw new Error("No se pudo cargar data/obras.json");
    return res.json();
  })
  .then((data) => {
    const artista = data.artista || {};
    const obras = data.obras || [];
    const obra = obras.find((o) => o.id === id);

    const cont = document.getElementById("detalle");

    if (!obra) {
      cont.innerHTML =
        '<p class="cargando">No se encontró la obra solicitada. <a href="index.html">Volver a la galería</a>.</p>';
      return;
    }

    document.title = (obra.titulo || "Obra") + " — " + (artista.nombre || "Galería");

    const disp = (obra.disponibilidad || "").toLowerCase();
    const badgeClass = disp === "vendida" ? "vendida" : "disponible";
    const badgeText = disp === "vendida" ? "Vendida" : "Disponible";

    cont.innerHTML = `
      <div>
        <img class="detalle-img" src="${escapeAttr(obra.imagen || "")}" alt="${escapeAttr(obra.titulo || "Obra")}" />
      </div>
      <div class="detalle-info">
        <h2>${escapeHtml(obra.titulo || "Sin título")}</h2>
        <p class="anio">${escapeHtml(String(obra.anio || ""))}</p>
        <dl>
          ${obra.tecnica ? `<dt>Técnica</dt><dd>${escapeHtml(obra.tecnica)}</dd>` : ""}
          ${obra.dimensiones ? `<dt>Dimensiones</dt><dd>${escapeHtml(obra.dimensiones)}</dd>` : ""}
        </dl>
        ${obra.descripcion ? `<p class="descripcion">${escapeHtml(obra.descripcion)}</p>` : ""}
        <p><span class="badge ${badgeClass}">${badgeText}</span></p>
        ${obra.precio ? `<p class="precio">${escapeHtml(obra.precio)}</p>` : ""}
        ${renderContactoBox(artista)}
      </div>
    `;

    const footer = document.getElementById("contacto-footer");
    if (footer && artista.nombre) footer.textContent = artista.nombre;
  })
  .catch((err) => {
    document.getElementById("detalle").innerHTML =
      '<p class="cargando">Error al cargar la obra. Revisa el archivo data/obras.json.</p>';
    console.error(err);
  });

function renderContactoBox(artista) {
  const lineas = [];
  if (artista.email)
    lineas.push(`<p>Correo: <a href="mailto:${escapeAttr(artista.email)}">${escapeHtml(artista.email)}</a></p>`);
  if (artista.telefono) lineas.push(`<p>Teléfono: ${escapeHtml(artista.telefono)}</p>`);
  if (artista.instagram) lineas.push(`<p>Instagram: ${escapeHtml(artista.instagram)}</p>`);
  if (lineas.length === 0) return "";
  return `<div class="contacto-box"><h3>¿Te interesa esta obra?</h3>${lineas.join("")}</div>`;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, ">");
}

function escapeAttr(str) {
  return escapeHtml(str).replace(/"/g, """);
}
