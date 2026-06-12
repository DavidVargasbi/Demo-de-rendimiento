# Tablero de gestión escolar
**I.E. Haydeé Camacho Saavedra** · Cl. 2 #5-59, Togüí, Boyacá
Prototipo de demostración — BI Consulting Lab

## Cómo abrirlo
Abra `index.html` con doble clic en cualquier navegador (Chrome, Edge, Firefox).
Requiere conexión a internet únicamente para cargar la librería de gráficos (Chart.js desde CDN).

## Estructura de la carpeta
```
dashboard-haydee-camacho/
├── index.html          → estructura de la página y las dos pestañas
├── css/
│   └── estilos.css     → colores, tipografía y diseño
└── js/
    ├── datos.js        → DATOS SIMULADOS (estudiantes, notas, pagos, uniformes)
    └── app.js          → lógica, cálculos, alertas y gráficos
```

## Contenido del tablero
**Pestaña Rendimiento académico**
- Filtros por grado (6° a 11°) y detalle por estudiante.
- KPIs, promedio por grado, progreso en el año (una línea por grado), rendimiento por materia.
- Alertas de estudiantes en riesgo de perder materias (promedio < 3.0).
- Detalle individual: notas por periodo, comparación contra su grado, mejor y peor materia, y recomendaciones de mejora.

**Pestaña Finanzas y cartera**
- KPIs de recaudo, cartera vencida, familias al día y bodega de uniformes.
- Alertas de cobro prioritario (3+ meses en mora).
- Recaudo vs. pendiente por mes (con línea de tendencia) y tabla de pagos mes a mes por estudiante.
- Uniformes vendidos vs. bodega y alertas de reposición de stock.

## Cómo conectar datos reales
Todos los datos de demostración viven en `js/datos.js`. Para usar información real:

1. **Estudiantes y notas**: reemplace el arreglo `ESTUDIANTES`. Cada estudiante tiene la forma:
   ```js
   {
     id: 1,
     nombre: "Nombre Apellido",
     grado: "6°",
     notas: { "Matemáticas": [3.5, 3.2, 3.8], ... },  // una nota por periodo
     pagos: [ { mes: "Febrero", estado: "pagado" }, ... ] // "pagado" | "pendiente"
   }
   ```
2. **Uniformes**: reemplace el arreglo `UNIFORMES` (`item`, `vendidos`, `bodega`, `minimo`).
3. **Parámetros**: ajuste `GRADOS`, `MATERIAS`, `PERIODOS`, `MESES` y `VALOR_MES` según el colegio.

El resto del tablero (`app.js`) se recalcula automáticamente: KPIs, gráficos, alertas y recomendaciones.

> Nota: todos los nombres, notas y pagos incluidos son ficticios y generados para la demostración.
