/* ============================================================
   Tablero de gestión escolar — lógica y gráficos
   I.E. Haydeé Camacho Saavedra · BI Consulting Lab
   ============================================================ */

/* ============ Utilidades ============ */
const prom = a => a.reduce((x,y)=>x+y,0)/a.length;
const r1 = n => Math.round(n*10)/10;
const cop = n => "$"+n.toLocaleString("es-CO");
const promEst = e => r1(prom(MATERIAS.map(m=>prom(e.notas[m]))));
const enRiesgo = e => MATERIAS.filter(m=>prom(e.notas[m])<3.0);
const enAlerta = e => MATERIAS.filter(m=>{const p=prom(e.notas[m]);return p>=3.0&&p<3.4;});
const tendEst = e => {
  const pp = PERIODOS.map((_,p)=>prom(MATERIAS.map(m=>e.notas[m][p])));
  return pp[pp.length-1]-pp[0];
};
const mesesDeuda = e => e.pagos.filter(p=>p.estado==="pendiente").length;
const colorNota = n => n<3.0 ? "#B3362B" : n<3.5 ? "#B97417" : n<4.0 ? "#15261B" : "#1E6E45";

function recomendaciones(e){
  const recs = [];
  enRiesgo(e).forEach(m=>{
    const ult = e.notas[m][PERIODOS.length-1];
    recs.push({tipo:"critico",icono:"⚠️",texto:`${m}: promedio ${r1(prom(e.notas[m])).toFixed(1)} (última nota ${ult.toFixed(1)}). Requiere plan de refuerzo, acompañamiento docente y citación a acudientes.`});
  });
  enAlerta(e).forEach(m=>{
    recs.push({tipo:"atencion",icono:"⏰",texto:`${m}: promedio ${r1(prom(e.notas[m])).toFixed(1)}, justo sobre el mínimo. Reforzar entrega de actividades y asistencia a tutorías.`});
  });
  const t = tendEst(e);
  if(t<-0.2) recs.push({tipo:"atencion",icono:"📉",texto:`Tendencia general a la baja (${t.toFixed(1)} entre P1 y P3). Conviene una reunión de seguimiento con dirección de grupo.`});
  if(recs.length===0) recs.push({tipo:"ok",icono:"✅",texto:"Rendimiento estable y sin materias en riesgo. Mantener hábitos de estudio; puede apoyar monitorías a compañeros."});
  return recs;
}

/* ============ Estado ============ */
let gradoActual = "Todos";
let estudianteSel = null;
let filtroPago = "Todos";
const charts = {};

function crearChart(id, config){
  if(charts[id]) charts[id].destroy();
  charts[id] = new Chart(document.getElementById(id), config);
}

Chart.defaults.font.family = "'Segoe UI','Helvetica Neue',Arial,sans-serif";
Chart.defaults.color = "#5B6B60";
Chart.defaults.borderColor = "#E2E7E0";

/* Línea punteada del mínimo aprobatorio (3.0) */
const lineaMinima = {
  id:"lineaMinima",
  afterDraw(chart, args, opts){
    if(!opts || !opts.valor) return;
    const {ctx, chartArea, scales} = chart;
    const eje = opts.eje==="x" ? scales.x : scales.y;
    if(!eje) return;
    const pos = eje.getPixelForValue(opts.valor);
    ctx.save();
    ctx.strokeStyle = "#B3362B"; ctx.setLineDash([5,4]); ctx.lineWidth = 1.5;
    ctx.beginPath();
    if(opts.eje==="x"){ ctx.moveTo(pos, chartArea.top); ctx.lineTo(pos, chartArea.bottom); }
    else { ctx.moveTo(chartArea.left, pos); ctx.lineTo(chartArea.right, pos); }
    ctx.stroke(); ctx.restore();
  }
};
Chart.register(lineaMinima);

/* ============================================================
   PESTAÑA ACADÉMICA
   ============================================================ */
function listaFiltrada(){
  return ESTUDIANTES.filter(e=>gradoActual==="Todos"||e.grado===gradoActual);
}

function renderFiltrosGrado(){
  const cont = document.getElementById("filtros-grado");
  cont.querySelectorAll("button").forEach(b=>b.remove());
  ["Todos",...GRADOS].forEach(g=>{
    const b = document.createElement("button");
    b.className = "chip"+(gradoActual===g?" activa":"");
    b.textContent = g;
    b.onclick = ()=>{ gradoActual = g; estudianteSel = null; renderAcademico(); };
    cont.appendChild(b);
  });
}

function kpiHTML(icono, fondoIcono, label, valor, detalle){
  return `<div class="card kpi">
    <div class="icono" style="background:${fondoIcono}">${icono}</div>
    <div><div class="etiqueta">${label}</div><div class="valor">${valor}</div>
    <div class="detalle">${detalle}</div></div></div>`;
}

function renderKpisAcademico(){
  const lista = listaFiltrada();
  const pg = r1(prom(lista.map(promEst)));
  const riesgo = lista.filter(e=>enRiesgo(e).length>0).length;
  const aprob = Math.round(lista.filter(e=>enRiesgo(e).length===0).length/lista.length*100);
  const ambito = gradoActual==="Todos" ? "Todos los grados · P1–P3" : `Grado ${gradoActual} · P1–P3`;
  document.getElementById("kpis-academico").innerHTML =
    kpiHTML("🎓","var(--verde-claro)","Promedio general",pg.toFixed(1),ambito) +
    kpiHTML("👥","var(--verde-claro)","Estudiantes",lista.length,"Matriculados activos") +
    kpiHTML("⚠️","var(--rojo-claro)","En riesgo de perder",riesgo,"Con al menos una materia &lt; 3.0") +
    kpiHTML("✅","var(--verde-claro)","Sin materias perdidas",aprob+"%","Del grupo filtrado");
}

function renderChartsAcademico(){
  const lista = listaFiltrada();

  // Promedio por grado
  const dataGrados = GRADOS.map(g=>r1(prom(ESTUDIANTES.filter(e=>e.grado===g).map(promEst))));
  crearChart("ch-grados",{
    type:"bar",
    data:{labels:GRADOS,datasets:[{data:dataGrados,
      backgroundColor:GRADOS.map(g=>gradoActual!=="Todos"&&g===gradoActual?"#0D3B25":"#1E6E45"),
      borderRadius:6}]},
    options:{responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},lineaMinima:{valor:3,eje:"y"}},
      scales:{y:{min:0,max:5}}}
  });

  // Progreso en el año: si se ve "Todos", una línea por grado para comparar
  document.getElementById("sub-evolucion").textContent =
    gradoActual!=="Todos"
      ? `Promedio por periodo académico · grado ${gradoActual}`
      : "Promedio por periodo académico · una línea por grado";
  const paleta = ["#1E6E45","#2F6B8E","#B97417","#7B5EA7","#B3362B","#3E8E7E"];
  let datasetsEvol;
  if(gradoActual==="Todos"){
    datasetsEvol = GRADOS.map((g,gi)=>({
      label:g,
      data:PERIODOS.map((_,i)=>r1(prom(
        ESTUDIANTES.filter(e=>e.grado===g).map(e=>prom(MATERIAS.map(m=>e.notas[m][i])))))),
      borderColor:paleta[gi], backgroundColor:paleta[gi],
      borderWidth:2.5, pointRadius:3.5, tension:0.35,
    }));
  } else {
    datasetsEvol = [{
      label:`Grado ${gradoActual}`,
      data:PERIODOS.map((_,i)=>r1(prom(lista.map(e=>prom(MATERIAS.map(m=>e.notas[m][i])))))),
      borderColor:"#1E6E45", backgroundColor:"#1E6E45",
      borderWidth:3, pointRadius:5, tension:0.35,
    }];
  }
  crearChart("ch-evolucion",{
    type:"line",
    data:{labels:PERIODOS,datasets:datasetsEvol},
    options:{responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:gradoActual==="Todos",position:"bottom",
        labels:{boxWidth:12,font:{size:10.5}}},lineaMinima:{valor:3,eje:"y"}},
      scales:{y:{min:2,max:5}}}
  });

  // Por materia (horizontal, ordenado)
  const dataMat = MATERIAS.map(m=>({m,p:r1(prom(lista.map(e=>prom(e.notas[m]))))})).sort((a,b)=>a.p-b.p);
  crearChart("ch-materias",{
    type:"bar",
    data:{labels:dataMat.map(d=>d.m),datasets:[{data:dataMat.map(d=>d.p),
      backgroundColor:dataMat.map(d=>d.p<3?"#B3362B":d.p<3.5?"#B97417":"#1E6E45"),borderRadius:6}]},
    options:{indexAxis:"y",responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},lineaMinima:{valor:3,eje:"x"}},
      scales:{x:{min:0,max:5}}}
  });
}

function renderAlertasAcademicas(){
  const cont = document.getElementById("alertas-academicas");
  const alertas = ESTUDIANTES.map(e=>({e,riesgo:enRiesgo(e),t:tendEst(e)}))
    .filter(a=>a.riesgo.length>0).sort((a,b)=>b.riesgo.length-a.riesgo.length);
  cont.innerHTML = alertas.length===0 ? '<p style="margin:0;font-size:13px;color:var(--tinta-suave)">Sin alertas activas.</p>' :
    alertas.map(({e,riesgo,t})=>`
      <button class="alerta" onclick="abrirDetalle(${e.id})">
        <strong>${e.nombre}</strong>
        <span class="pill neutral">${e.grado}</span>
        ${riesgo.map(m=>`<span class="pill bad">${m} · ${r1(prom(e.notas[m])).toFixed(1)}</span>`).join("")}
        ${t<-0.15?'<span class="tend" style="color:var(--rojo)">📉 en descenso</span>':""}
        <span class="derecha" style="font-size:11.5px;color:var(--tinta-suave)">Ver detalle →</span>
      </button>`).join("");
}

function renderTablaEstudiantes(){
  document.getElementById("titulo-lista").textContent =
    "Estudiantes " + (gradoActual!=="Todos"?`de ${gradoActual}`:"(todos los grados)");
  const tbody = document.querySelector("#tabla-estudiantes tbody");
  tbody.innerHTML = listaFiltrada().map(e=>{
    const p = promEst(e), t = tendEst(e), r = enRiesgo(e).length;
    const estado = r>0 ? `<span class="pill bad">${r} materia${r>1?"s":""} en riesgo</span>` :
      enAlerta(e).length>0 ? '<span class="pill warn">En observación</span>' :
      '<span class="pill ok">Al día</span>';
    return `<tr class="clic ${estudianteSel===e.id?"sel":""}" onclick="abrirDetalle(${e.id})">
      <td style="font-weight:600">${e.nombre}</td><td>${e.grado}</td>
      <td style="font-weight:700;color:${colorNota(p)}">${p.toFixed(1)}</td>
      <td><span class="tend" style="color:${t>=0?"var(--verde)":"var(--rojo)"}">${t>=0?"▲":"▼"} ${(t>=0?"+":"")+t.toFixed(1)}</span></td>
      <td>${estado}</td></tr>`;
  }).join("");
}

function abrirDetalle(id){
  const e = ESTUDIANTES.find(x=>x.id===id);
  gradoActual = e.grado;
  estudianteSel = id;
  renderAcademico();
  const det = document.getElementById("detalle-estudiante");
  det.classList.remove("oculto");
  det.scrollIntoView({behavior:"smooth",block:"start"});
}
function cerrarDetalle(){
  estudianteSel = null;
  document.getElementById("detalle-estudiante").classList.add("oculto");
  renderTablaEstudiantes();
}

function renderDetalle(){
  const det = document.getElementById("detalle-estudiante");
  if(!estudianteSel){ det.classList.add("oculto"); return; }
  const e = ESTUDIANTES.find(x=>x.id===estudianteSel);
  det.classList.remove("oculto");
  const p = promEst(e);
  document.getElementById("det-nombre").textContent = e.nombre;
  document.getElementById("det-grado").textContent = "Grado "+e.grado;
  const pillProm = document.getElementById("det-prom");
  pillProm.textContent = "Promedio "+p.toFixed(1);
  pillProm.className = "pill "+(p<3?"bad":p<3.5?"warn":"ok");

  // Tabla de notas por materia y periodo
  document.querySelector("#det-notas tbody").innerHTML = MATERIAS.map(m=>{
    const acum = r1(prom(e.notas[m]));
    const estado = acum<3 ? '<span class="pill bad">Riesgo de perder</span>' :
      acum<3.4 ? '<span class="pill warn">Atención</span>' : '<span class="pill ok">Aprobando</span>';
    return `<tr><td style="font-weight:600">${m}</td>
      ${e.notas[m].map(n=>`<td style="font-weight:600;color:${colorNota(n)}">${n.toFixed(1)}</td>`).join("")}
      <td style="font-weight:800;color:${colorNota(acum)}">${acum.toFixed(1)}</td><td>${estado}</td></tr>`;
  }).join("");

  // Progreso vs. su grado, más las 2 materias extremas del estudiante
  document.getElementById("det-sub-evol").textContent =
    `Promedio general, su mejor y su peor materia, frente al grado ${e.grado}`;
  const propio = PERIODOS.map((_,i)=>r1(prom(MATERIAS.map(m=>e.notas[m][i]))));
  const delGrupo = PERIODOS.map((_,i)=>r1(prom(
    ESTUDIANTES.filter(x=>x.grado===e.grado).map(x=>prom(MATERIAS.map(m=>x.notas[m][i]))))));
  const ordenadas = [...MATERIAS].sort((a,b)=>prom(e.notas[a])-prom(e.notas[b]));
  const peor = ordenadas[0], mejor = ordenadas[ordenadas.length-1];
  crearChart("ch-det-evolucion",{
    type:"line",
    data:{labels:PERIODOS,datasets:[
      {label:"Estudiante (general)",data:propio,borderColor:"#1E6E45",backgroundColor:"#1E6E45",borderWidth:3,pointRadius:4,tension:.35},
      {label:"Promedio del grado",data:delGrupo,borderColor:"#2F6B8E",borderDash:[6,4],borderWidth:2,pointRadius:0,tension:.35},
      {label:`Mejor: ${mejor}`,data:e.notas[mejor],borderColor:"#3E8E7E",borderWidth:1.5,pointRadius:2.5,tension:.35},
      {label:`Peor: ${peor}`,data:e.notas[peor],borderColor:"#B3362B",borderWidth:1.5,pointRadius:2.5,tension:.35},
    ]},
    options:{responsive:true,maintainAspectRatio:false,
      plugins:{legend:{position:"bottom",labels:{boxWidth:12,font:{size:10}}},lineaMinima:{valor:3,eje:"y"}},
      scales:{y:{min:1,max:5}}}
  });

  // Comparación por materia
  crearChart("ch-det-materias",{
    type:"bar",
    data:{labels:MATERIAS,datasets:[
      {label:"Estudiante",data:MATERIAS.map(m=>r1(prom(e.notas[m]))),backgroundColor:"#1E6E45",borderRadius:4},
      {label:"Grado",data:MATERIAS.map(m=>r1(prom(ESTUDIANTES.filter(x=>x.grado===e.grado).map(x=>prom(x.notas[m]))))),backgroundColor:"#C4D6CB",borderRadius:4},
    ]},
    options:{responsive:true,maintainAspectRatio:false,
      plugins:{legend:{labels:{boxWidth:14,font:{size:11}}},lineaMinima:{valor:3,eje:"y"}},
      scales:{y:{min:0,max:5},x:{ticks:{font:{size:9},maxRotation:45,minRotation:35}}}}
  });

  // Recomendaciones
  document.getElementById("det-recomendaciones").innerHTML = recomendaciones(e).map(r=>
    `<div class="rec ${r.tipo}"><span>${r.icono}</span><span>${r.texto}</span></div>`).join("");
}

function renderAcademico(){
  renderFiltrosGrado();
  renderKpisAcademico();
  renderChartsAcademico();
  renderAlertasAcademicas();
  renderTablaEstudiantes();
  renderDetalle();
}

/* ============================================================
   PESTAÑA FINANZAS Y CARTERA
   ============================================================ */
function conEstadoPago(){
  return ESTUDIANTES.map(e=>{
    const deuda = mesesDeuda(e);
    return {...e, deuda,
      estado: deuda===0?"Al día":deuda<=2?"Atrasado":"Mora crítica",
      valor: deuda*VALOR_MES};
  });
}

function renderKpisFinanzas(){
  const lista = conEstadoPago();
  const alDia = lista.filter(e=>e.deuda===0).length;
  const conDeuda = lista.length - alDia;
  const recaudado = lista.reduce((a,e)=>a+e.pagos.filter(p=>p.estado==="pagado").length*VALOR_MES,0);
  const vencida = lista.reduce((a,e)=>a+e.valor,0);
  const stockBajo = UNIFORMES.filter(u=>u.bodega<u.minimo).length;
  document.getElementById("kpis-finanzas").innerHTML =
    kpiHTML("💵","var(--verde-claro)","Recaudado en el año",cop(recaudado),"Febrero – junio 2026") +
    kpiHTML("⚠️","var(--rojo-claro)","Cartera vencida",cop(vencida),`${conDeuda} familias con saldo pendiente`) +
    kpiHTML("✅","var(--verde-claro)","Familias al día",Math.round(alDia/lista.length*100)+"%",`${alDia} de ${lista.length} estudiantes`) +
    kpiHTML("📦","var(--ambar-claro)","Uniformes en bodega",UNIFORMES.reduce((a,u)=>a+u.bodega,0),`${stockBajo} referencias con stock bajo`);
}

function renderAlertasCobro(){
  const criticos = conEstadoPago().filter(e=>e.deuda>2).sort((a,b)=>b.deuda-a.deuda);
  document.getElementById("alertas-cobro").innerHTML = criticos.length===0 ?
    '<p style="margin:0;font-size:13px;color:var(--tinta-suave)">Sin casos críticos.</p>' :
    criticos.map(e=>`<div class="alerta">
      <strong>${e.nombre}</strong><span class="pill neutral">${e.grado}</span>
      <span class="pill bad">${e.deuda} meses en mora</span>
      <span class="derecha" style="font-weight:800;color:var(--rojo);font-size:14px">${cop(e.valor)}</span>
    </div>`).join("");
}

function renderChartRecaudo(){
  const lista = conEstadoPago();
  const rec = MESES.map((_,i)=>lista.filter(e=>e.pagos[i].estado==="pagado").length*VALOR_MES);
  const pen = MESES.map((_,i)=>lista.filter(e=>e.pagos[i].estado==="pendiente").length*VALOR_MES);
  crearChart("ch-recaudo",{
    type:"bar",
    data:{labels:MESES.map(m=>m.slice(0,3)),datasets:[
      {label:"Recaudado",data:rec,backgroundColor:"#1E6E45"},
      {label:"Pendiente",data:pen,backgroundColor:"#B3362B",borderRadius:{topLeft:6,topRight:6}},
      {label:"Tendencia de recaudo",data:rec,type:"line",borderColor:"#0D3B25",
        borderWidth:2,borderDash:[4,3],pointRadius:3,tension:.35,yAxisID:"y"},
    ]},
    options:{responsive:true,maintainAspectRatio:false,
      plugins:{legend:{labels:{boxWidth:14,font:{size:11}}},
        tooltip:{callbacks:{label:c=>c.dataset.label+": "+cop(c.raw)}}},
      scales:{x:{stacked:true},y:{stacked:true,ticks:{callback:v=>"$"+(v/1e6).toFixed(1)+"M"}}}}
  });
}

function renderFiltrosPago(){
  const cont = document.getElementById("filtros-pago");
  cont.innerHTML = "";
  ["Todos","Al día","Atrasados","Mora crítica"].forEach(f=>{
    const b = document.createElement("button");
    b.className = "chip chip-sm"+(filtroPago===f?" activa":"");
    b.textContent = f;
    b.onclick = ()=>{ filtroPago = f; renderFiltrosPago(); renderTablaPagos(); };
    cont.appendChild(b);
  });
}

function renderTablaPagos(){
  const lista = conEstadoPago().filter(e=>
    filtroPago==="Todos" ? true :
    filtroPago==="Al día" ? e.estado==="Al día" :
    filtroPago==="Atrasados" ? e.estado==="Atrasado" : e.estado==="Mora crítica"
  ).sort((a,b)=>b.deuda-a.deuda);
  document.querySelector("#tabla-pagos tbody").innerHTML = lista.map(e=>{
    const estado = e.estado==="Al día" ? '<span class="pill ok">Al día</span>' :
      e.estado==="Atrasado" ? `<span class="pill warn">Atrasado (${e.deuda}m)</span>` :
      `<span class="pill bad">Mora crítica (${e.deuda}m)</span>`;
    return `<tr><td style="font-weight:600">${e.nombre}</td><td>${e.grado}</td>
      ${e.pagos.map(p=>`<td style="text-align:center"><span class="cuadro-pago" title="${p.mes}: ${p.estado}"
        style="background:${p.estado==="pagado"?"#1E6E45":"#B3362B"};opacity:${p.estado==="pagado"?".85":"1"}"></span></td>`).join("")}
      <td style="font-weight:700;color:${e.valor>0?"var(--rojo)":"var(--verde)"}">${e.valor>0?cop(e.valor):"—"}</td>
      <td>${estado}</td></tr>`;
  }).join("");
}

function renderUniformes(){
  crearChart("ch-uniformes",{
    type:"bar",
    data:{labels:UNIFORMES.map(u=>u.item),datasets:[
      {label:"Vendidos",data:UNIFORMES.map(u=>u.vendidos),backgroundColor:"#2F6B8E",borderRadius:4},
      {label:"En bodega",data:UNIFORMES.map(u=>u.bodega),backgroundColor:"#1E6E45",borderRadius:4},
    ]},
    options:{responsive:true,maintainAspectRatio:false,
      plugins:{legend:{position:"top",labels:{boxWidth:14,font:{size:11}}}},
      scales:{x:{ticks:{font:{size:9},maxRotation:40,minRotation:30}}}}
  });
  document.querySelector("#tabla-uniformes tbody").innerHTML = UNIFORMES.map(u=>{
    const estado = u.bodega<u.minimo ? '<span class="pill bad">Reponer ya</span>' :
      u.bodega<u.minimo*1.5 ? '<span class="pill warn">Stock justo</span>' :
      '<span class="pill ok">Suficiente</span>';
    return `<tr><td style="font-weight:600">${u.item}</td>
      <td style="text-align:right;font-weight:700;color:${u.bodega<u.minimo?"var(--rojo)":"var(--tinta)"}">${u.bodega}</td>
      <td style="text-align:right;color:var(--tinta-suave)">${u.minimo}</td><td>${estado}</td></tr>`;
  }).join("");
}

function renderFinanzas(){
  renderKpisFinanzas();
  renderAlertasCobro();
  renderChartRecaudo();
  renderFiltrosPago();
  renderTablaPagos();
  renderUniformes();
}

/* ============ Pestañas ============ */
function cambiarTab(tab){
  document.getElementById("tab-academico").classList.toggle("activa",tab==="academico");
  document.getElementById("tab-finanzas").classList.toggle("activa",tab==="finanzas");
  document.getElementById("vista-academico").style.display = tab==="academico"?"grid":"none";
  document.getElementById("vista-finanzas").style.display = tab==="finanzas"?"grid":"none";
  if(tab==="academico") renderAcademico(); else renderFinanzas();
}

/* Arranque */
renderAcademico();
