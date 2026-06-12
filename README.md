# Tablero de gestión escolar — versión de despliegue simple

**I.E. Haydeé Camacho Saavedra** · Togüí, Boyacá · Demo de BI Consulting Lab

Esta versión tiene **todo en un solo archivo** (`index.html`): diseño, datos y lógica incrustados.
No hay carpetas ni rutas relativas, así que no puede fallar por estructura.

## Desplegar en Vercel (2 formas)

### Forma rápida — sin GitHub
1. Entre a [vercel.com/new](https://vercel.com/new).
2. Arrastre **esta carpeta completa** (o el ZIP) a la zona de "Deploy".
3. Listo: Vercel publica la URL.

### Con GitHub
1. Cree un repositorio en [github.com/new](https://github.com/new).
2. Suba estos 3 archivos a la **raíz** del repositorio: `index.html`, `vercel.json`, `.gitignore`.
3. En Vercel: **Add New → Project**, seleccione el repositorio y haga clic en **Deploy**.
   - Framework Preset: **Other** · Build Command: vacío · Output Directory: vacío
   - En *Settings → Build & Development*, el **Root Directory** debe estar vacío (`./`).

## Para editar los datos
Abra `index.html` con cualquier editor de texto y busque el bloque
`DATOS SIMULADOS (DEMO)` dentro de la etiqueta `<script>`: ahí están
`ESTUDIANTES`, `UNIFORMES`, `GRADOS`, `MATERIAS`, `MESES` y `VALOR_MES`.

> ⚠️ Los datos incluidos son ficticios. Si publica datos reales de estudiantes,
> use repositorio privado y restrinja el acceso al sitio (son datos de menores).
