# Tablero de gestión escolar — I.E. Haydeé Camacho Saavedra (v2)

Cl. 2 #5-59, Togüí, Boyacá · Prototipo de demostración — **BI Consulting Lab**

Versión 2 del tablero: misma identidad verde institucional, ahora con la
arquitectura completa de menú lateral y 4 secciones:

1. **Resumen general** — KPIs de las tres áreas y feed consolidado de alertas
   (académicas, de cartera y de stock) ordenado por urgencia, con atajos.
2. **Académico** — mapa de calor grado × materia, progreso del año (una línea
   por grado), rendimiento por materia, alertas de riesgo y ficha por estudiante
   con notas por periodo, comparativos y plan de mejora.
3. **Finanzas y cartera** — recaudo mensual con línea de trayectoria, pagos mes
   a mes por familia y cobro prioritario (3+ meses en mora).
4. **Uniformes e inventario** — ventas vs. bodega, distribución en dona y
   alertas de reposición.

Todo está en **un solo archivo** (`index.html`): sin carpetas ni rutas que se
puedan romper. Solo requiere internet para cargar Chart.js.

## Desplegar en Vercel

**Forma rápida — sin GitHub:** entre a [vercel.com/new](https://vercel.com/new)
y arrastre esta carpeta a la zona de deploy.

**Con GitHub:**
1. Cree un repositorio en [github.com/new](https://github.com/new).
2. Suba `index.html`, `vercel.json` y `.gitignore` a la **raíz** del repositorio.
3. En Vercel: **Add New → Project**, seleccione el repositorio y **Deploy**
   (Framework: Other · Build Command y Output Directory vacíos · Root Directory vacío).

> Si ya tiene este proyecto desplegado de la versión anterior, basta con
> reemplazar el `index.html` del repositorio por este: Vercel republica solo.

## Editar los datos

Abra `index.html` y busque el bloque `DATOS SIMULADOS (DEMO)` dentro del
`<script>`: ahí están `ESTUDIANTES`, `UNIFORMES`, `GRADOS`, `MATERIAS`,
`MESES` y `VALOR_MES`.

> ⚠️ Todos los nombres, notas y pagos son **ficticios**. Si publica datos
> reales de estudiantes, use repositorio privado y restrinja el acceso al
> sitio: son datos personales de menores de edad.
