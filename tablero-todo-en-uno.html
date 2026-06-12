<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Tablero de gestión escolar · I.E. Haydeé Camacho Saavedra</title>
<link rel="stylesheet" href="css/estilos.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"></script>
</head>
<body>

<header>
  <div class="wrap">
    <div class="head-row">
      <div class="logo">📘</div>
      <div>
        <div class="eyebrow">Tablero de gestión escolar · 2026</div>
        <h1>I.E. Haydeé Camacho Saavedra</h1>
        <div class="addr">Cl. 2 #5-59, Togüí, Boyacá · Datos de demostración — BI Consulting Lab</div>
      </div>
    </div>
    <nav>
      <button id="tab-academico" class="activa" onclick="cambiarTab('academico')">🎓 Rendimiento académico</button>
      <button id="tab-finanzas" onclick="cambiarTab('finanzas')">💰 Finanzas y cartera</button>
    </nav>
  </div>
</header>

<main>
  <!-- ============ PESTAÑA ACADÉMICA ============ -->
  <section id="vista-academico" style="display:grid;gap:16px">
    <div class="filtros" id="filtros-grado"><span class="lbl">Grado:</span></div>
    <div class="kpis" id="kpis-academico"></div>

    <div class="grid2">
      <div class="card">
        <h3>Promedio por grado</h3>
        <p class="sub">Comparativo institucional · año 2026</p>
        <div class="grafico" style="height:220px"><canvas id="ch-grados"></canvas></div>
      </div>
      <div class="card">
        <h3>Progreso en el año</h3>
        <p class="sub" id="sub-evolucion">Promedio por periodo académico</p>
        <div class="grafico" style="height:220px"><canvas id="ch-evolucion"></canvas></div>
      </div>
    </div>

    <div class="card">
      <h3>Rendimiento por materia</h3>
      <p class="sub">Ordenado de menor a mayor — las primeras barras indican dónde reforzar</p>
      <div class="grafico" style="height:280px"><canvas id="ch-materias"></canvas></div>
    </div>

    <div class="card borde-rojo">
      <div class="titulo-alerta"><span>🔔</span><h3>Alertas: riesgo de perder materias</h3></div>
      <p class="sub">Estudiantes con promedio acumulado inferior a 3.0 en una o más materias</p>
      <div class="alertas-lista" id="alertas-academicas"></div>
    </div>

    <div class="card">
      <h3 id="titulo-lista">Estudiantes</h3>
      <p class="sub">Toca un estudiante para ver su detalle completo, comparativos y recomendaciones</p>
      <div class="scroll-x"><table id="tabla-estudiantes" style="min-width:560px">
        <thead><tr><th>Estudiante</th><th>Grado</th><th>Promedio</th><th>Tendencia</th><th>Estado</th></tr></thead>
        <tbody></tbody>
      </table></div>
    </div>

    <div class="card borde-verde-top oculto" id="detalle-estudiante">
      <div style="display:flex;flex-wrap:wrap;align-items:baseline;gap:10px">
        <h3 id="det-nombre" style="font-size:18px"></h3>
        <span class="pill neutral" id="det-grado"></span>
        <span class="pill" id="det-prom"></span>
        <button class="cerrar derecha" onclick="cerrarDetalle()">Cerrar</button>
      </div>
      <div class="scroll-x" style="margin-top:14px"><table id="det-notas" style="min-width:480px">
        <thead><tr><th>Materia</th><th>P1</th><th>P2</th><th>P3</th><th>Acum.</th><th>Estado</th></tr></thead>
        <tbody></tbody>
      </table></div>
      <div class="grid2" style="margin-top:16px">
        <div>
          <h3>Progreso vs. su grado</h3>
          <p class="sub" id="det-sub-evol"></p>
          <div class="grafico" style="height:210px"><canvas id="ch-det-evolucion"></canvas></div>
        </div>
        <div>
          <h3>Comparación por materia</h3>
          <p class="sub">Acumulado del estudiante frente al grado</p>
          <div class="grafico" style="height:210px"><canvas id="ch-det-materias"></canvas></div>
        </div>
      </div>
      <div style="margin-top:16px">
        <h3 style="margin:0 0 8px;font-size:15px">Qué debe mejorar</h3>
        <div class="alertas-lista" id="det-recomendaciones"></div>
      </div>
    </div>
  </section>

  <!-- ============ PESTAÑA FINANZAS ============ -->
  <section id="vista-finanzas" style="display:none;gap:16px">
    <div class="kpis" id="kpis-finanzas"></div>

    <div class="card borde-rojo">
      <div class="titulo-alerta"><span>🔔</span><h3>Cobro prioritario: 3 o más meses sin pagar</h3></div>
      <p class="sub">Familias que requieren gestión de cartera inmediata (llamada, acuerdo de pago o citación)</p>
      <div class="alertas-lista" id="alertas-cobro"></div>
    </div>

    <div class="card">
      <h3>Recaudo vs. pendiente por mes</h3>
      <p class="sub">Valor mensual por estudiante: $65.000 (dato demo)</p>
      <div class="grafico" style="height:240px"><canvas id="ch-recaudo"></canvas></div>
    </div>

    <div class="card">
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:6px">
        <h3 style="margin:0">Estado de pagos por estudiante</h3>
        <div class="derecha" style="display:flex;gap:6px;flex-wrap:wrap" id="filtros-pago"></div>
      </div>
      <p class="sub">Verde = mes pagado · rojo = mes pendiente</p>
      <div class="scroll-x"><table id="tabla-pagos" style="min-width:640px">
        <thead><tr><th>Estudiante</th><th>Grado</th>
          <th style="text-align:center">Feb</th><th style="text-align:center">Mar</th>
          <th style="text-align:center">Abr</th><th style="text-align:center">May</th>
          <th style="text-align:center">Jun</th><th>Saldo</th><th>Estado</th></tr></thead>
        <tbody></tbody>
      </table></div>
    </div>

    <div class="grid2">
      <div class="card">
        <div class="titulo-alerta"><span>🛍️</span><h3>Uniformes: vendidos vs. bodega</h3></div>
        <p class="sub">Año 2026</p>
        <div class="grafico" style="height:260px"><canvas id="ch-uniformes"></canvas></div>
      </div>
      <div class="card borde-ambar">
        <div class="titulo-alerta"><span>📦</span><h3>Inventario y alertas de stock</h3></div>
        <p class="sub">Referencias por debajo del mínimo recomendado requieren reposición</p>
        <table id="tabla-uniformes">
          <thead><tr><th>Referencia</th><th style="text-align:right">Bodega</th>
            <th style="text-align:right">Mínimo</th><th>Estado</th></tr></thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  </section>
</main>

<script src="js/datos.js"></script>
<script src="js/app.js"></script>
</body>
</html>
