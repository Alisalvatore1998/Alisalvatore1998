# Sweet Bites — proyecto universitario listo para GitHub Pages

## Estructura

- `index.html`: página principal. Debe estar en la RAÍZ del sitio publicado.
- `css/style.css`: estilos.
- `js/script.js`: funcionalidades y lista de postres.
- `imagenes/*.svg`: **15 ilustraciones originales de respaldo**, para que se muestren productos, equipo y portada sin conexión.
- `imagenes/fuentes-originales.json`: direcciones de las **15 fotografías originales de Unsplash** presentes en el código entregado.
- `herramientas/descargar_fotos.py`: descarga las fotografías originales como archivos JPG cuando se ejecuta **con conexión a Internet** y Python instalado.

## Fotografías e Internet

No fue posible descargar automáticamente los 15 archivos de Unsplash desde el entorno de preparación. **Los SVG incluidos NO son las fotos originales**: son alternativas gráficas locales. El sitio intenta cargar primero `imagenes/*.jpg` si se han descargado, después las fotografías originales en línea; si nada de eso está disponible, mantiene el SVG local, de modo que siempre se ve una imagen.

Para tener **las fotografías originales guardadas localmente**, abre una terminal en esta carpeta y ejecuta con Internet:

```bash
python herramientas/descargar_fotos.py
```

El sitio reconoce los JPG automáticamente. Comprueba que en `imagenes/` aparezcan los archivos `.jpg` junto a los `.svg`. Al subir a GitHub, añade también los JPG.

## GitHub Pages

1. En GitHub crea un repositorio público, por ejemplo `sweet-bites`.
2. Sube el **CONTENIDO INTERNO** de esta carpeta al repositorio: `index.html`, `css/`, `js/`, `imagenes/`, `herramientas/` (no solo el ZIP).
3. Ve a `Settings` > `Pages` > `Build and deployment`.
4. Selecciona `Deploy from a branch` > `main` > `/(root)` > `Save`.
5. Cuando termine la publicación, GitHub mostrará el enlace del sitio.

`index.html` debe quedar en la raíz del repositorio para que GitHub Pages lo detecte; las demás carpetas van debajo.

## Consideraciones

- Es una demostración: carrito y confirmación **no guardan pedidos en un servidor** ni cobran dinero.
- Tipografías de Google Fonts e íconos de Font Awesome usan servicios externos; si estás desconectado, se muestran tipografías de respaldo, pero algunos íconos pueden no aparecer.
- Las fotos en línea pertenecen a sus autores y conservan las direcciones originales facilitadas.
