"""Descarga las 15 fotos originales desde Unsplash a la carpeta imagenes.
Ejecutar desde cualquier ubicación: python herramientas/descargar_fotos.py
Requiere acceso a Internet. Si no hay red, la web usa sus SVG incluidos.
"""
import json
from pathlib import Path
from urllib.request import Request, urlopen

folder = Path(__file__).resolve().parent.parent / 'imagenes'
entries = json.loads((folder / 'fuentes-originales.json').read_text(encoding='utf-8'))
for item in entries:
    dest = folder / (item['nombre'] + '.jpg')
    try:
        req = Request(item['fuente_original'], headers={'User-Agent': 'Mozilla/5.0'})
        with urlopen(req, timeout=30) as response:
            data = response.read()
        if not data.startswith(b'\xff\xd8\xff'):
            raise ValueError('El proveedor no devolvió una imagen JPEG')
        dest.write_bytes(data)
        print(f'OK: {dest.name} ({len(data)} bytes)')
    except Exception as exc:
        print(f'No se descargó {dest.name}: {exc}')
