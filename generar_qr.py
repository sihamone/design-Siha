#!/usr/bin/env python3
"""
Genera un codigo QR por cada obra listada en data/obras.json.

Cada QR apunta a la pagina de detalle de la obra en tu sitio publicado,
por ejemplo:  https://TU-USUARIO.github.io/TU-REPO/obra.html?id=obra-01

USO:
    python3 generar_qr.py https://TU-USUARIO.github.io/TU-REPO

Los QR se guardan en la carpeta  qr/  como archivos PNG.

REQUISITO (solo una vez):
    pip3 install "qrcode[pil]"
"""

import json
import os
import sys

try:
    import qrcode
except ImportError:
    print("Falta la libreria 'qrcode'. Instalala con:")
    print('    pip3 install "qrcode[pil]"')
    sys.exit(1)


def main():
    if len(sys.argv) < 2:
        print("Debes indicar la URL base de tu sitio. Ejemplo:")
        print("    python3 generar_qr.py https://tu-usuario.github.io/tu-repo")
        sys.exit(1)

    base_url = sys.argv[1].rstrip("/")

    here = os.path.dirname(os.path.abspath(__file__))
    datos_path = os.path.join(here, "data", "obras.json")
    salida_dir = os.path.join(here, "qr")
    os.makedirs(salida_dir, exist_ok=True)

    with open(datos_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    obras = data.get("obras", [])
    if not obras:
        print("No hay obras en data/obras.json.")
        return

    for obra in obras:
        obra_id = obra.get("id")
        if not obra_id:
            continue
        url = f"{base_url}/obra.html?id={obra_id}"

        qr = qrcode.QRCode(
            error_correction=qrcode.constants.ERROR_CORRECT_M,
            box_size=10,
            border=4,
        )
        qr.add_data(url)
        qr.make(fit=True)
        img = qr.make_image(fill_color="black", back_color="white")

        destino = os.path.join(salida_dir, f"{obra_id}.png")
        img.save(destino)
        print(f"QR generado: qr/{obra_id}.png  ->  {url}")

    print(f"\nListo. {len(obras)} codigos QR en la carpeta 'qr/'.")


if __name__ == "__main__":
    main()
