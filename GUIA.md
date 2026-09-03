# Guía: publicar tu galería y generar los QR

Todo esto es gratis. Sigue los pasos en orden.

---

## Qué hay en esta carpeta

```
art/
├── index.html          → galería principal (todas las obras)
├── obra.html           → página de detalle de una obra
├── css/styles.css      → diseño (se ve bien en celular)
├── js/                 → código que muestra las obras
├── data/obras.json     → ★ AQUÍ editas tus 30 obras ★
├── images/             → ★ AQUÍ pones las fotos de tus obras ★
├── qr/                 → aquí se guardan los QR generados
├── generar_qr.py       → script que crea los QR
└── GUIA.md             → este archivo
```

Los dos lugares donde tú trabajas son **`data/obras.json`** y **`images/`**.

---

## Paso 1: Agregar tus obras

1. Abre `data/obras.json`.
2. Verás 3 obras de ejemplo. Copia ese bloque hasta llegar a 30 obras.
3. Para cada obra completa los campos:
   - `id`: un identificador único y sin espacios, ej. `"obra-01"`, `"obra-02"` ... `"obra-30"`.
     (Este id es el que usa el QR, así que no lo cambies después de imprimir.)
   - `titulo`, `anio`, `tecnica`, `dimensiones`, `descripcion`, `precio`
   - `disponibilidad`: escribe `"disponible"` o `"vendida"`
   - `imagen`: la ruta de la foto, ej. `"images/obra-01.jpg"`
4. Arriba de todo, en `"artista"`, pon tu nombre, correo, teléfono e Instagram.

> Consejo: cuida las comas. Cada obra va entre llaves `{ }` y se separan con coma,
> menos la última. Si algo falla, pega el contenido en https://jsonlint.com para revisarlo.

---

## Paso 2: Agregar las fotos

1. Copia las fotos de tus obras dentro de la carpeta `images/`.
2. Nómbralas igual que en el JSON, por ejemplo `obra-01.jpg`, `obra-02.jpg`, etc.
3. Recomendación: fotos de ancho ~1200 px y peso menor a ~500 KB para que carguen rápido.

---

## Paso 3: Subir todo a GitHub y activar GitHub Pages

1. Sube esta carpeta completa a tu repositorio de GitHub (puedes arrastrar los archivos
   en la web de GitHub, o usar `git`).
2. En GitHub, entra a tu repositorio → **Settings** → **Pages**.
3. En "Build and deployment", en **Source** elige **Deploy from a branch**.
4. En **Branch** elige `main` y la carpeta `/ (root)`. Guarda.
5. Espera 1–2 minutos. GitHub te mostrará la URL de tu sitio, algo como:

   ```
   https://TU-USUARIO.github.io/TU-REPO/
   ```

   Anota esa URL, la necesitas para el siguiente paso.

---

## Paso 4: Generar los códigos QR

1. Instala la librería (solo la primera vez). En la Terminal:

   ```
   pip3 install "qrcode[pil]"
   ```

2. Genera los QR pasando la URL de tu sitio (la del Paso 3):

   ```
   python3 generar_qr.py https://TU-USUARIO.github.io/TU-REPO
   ```

3. Se crearán 30 imágenes en la carpeta `qr/` (una por obra: `obra-01.png`, etc.).
   Cada QR lleva directo a la página de detalle de esa obra.

---

## Paso 5: Imprimir y colocar

- Imprime cada QR y colócalo junto a su obra.
- Escanéalos con tu celular antes de la exposición para confirmar que abren bien.

---

## Mantenimiento

- ¿Vendiste una obra? Cambia su `"disponibilidad"` a `"vendida"` en `data/obras.json`
  y vuelve a subir el archivo. No necesitas reimprimir el QR: la página se actualiza sola.
- ¿Cambio de precio? Igual, solo edita el JSON.

Los QR NO caducan porque apuntan a tu propio sitio. Mientras el repositorio exista, funcionan.
