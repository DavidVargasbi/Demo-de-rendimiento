/* ============================================================
   Tablero de gestión escolar · I.E. Haydeé Camacho Saavedra
   Hoja de estilos — BI Consulting Lab
   ============================================================ */
:root{
  --fondo:#F4F6F2; --superficie:#FFFFFF; --tinta:#15261B; --tinta-suave:#5B6B60;
  --verde:#1E6E45; --verde-oscuro:#0D3B25; --verde-claro:#E3F0E8;
  --ambar:#B97417; --ambar-claro:#FBF1DF;
  --rojo:#B3362B; --rojo-claro:#FBE9E6;
  --azul:#2F6B8E; --borde:#E2E7E0;
}
*{box-sizing:border-box}
body{
  margin:0; background:var(--fondo); color:var(--tinta);
  font-family:'Segoe UI','Helvetica Neue',Arial,system-ui,sans-serif;
  -webkit-font-smoothing:antialiased;
}
header{background:var(--verde-oscuro); color:#fff; padding:26px 22px 0}
.wrap{max-width:1180px; margin:0 auto}
.head-row{display:flex; flex-wrap:wrap; align-items:center; gap:14px}
.logo{width:46px;height:46px;border-radius:12px;background:rgba(255,255,255,.12);
  display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:22px}
.eyebrow{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#9CC7AE;font-weight:700}
h1{margin:2px 0 0;font-size:clamp(18px,3.5vw,26px);font-weight:800;letter-spacing:-.01em}
.addr{font-size:12.5px;color:#BBD9C7;margin-top:2px}
nav{display:flex;gap:4px;margin-top:20px}
nav button{
  display:flex;align-items:center;gap:8px;background:transparent;color:#BBD9C7;
  border:none;border-radius:12px 12px 0 0;padding:12px 18px;font-size:13.5px;
  font-weight:700;cursor:pointer;font-family:inherit;
}
nav button.activa{background:var(--fondo);color:var(--verde-oscuro)}
nav button:focus-visible{outline:2px solid #fff;outline-offset:-2px}
main{max-width:1180px;margin:0 auto;padding:20px 22px 48px;display:grid;gap:16px}
.card{background:var(--superficie);border:1px solid var(--borde);border-radius:14px;
  padding:18px 20px;box-shadow:0 1px 2px rgba(21,38,27,.04)}
.card h3{margin:0 0 4px;font-size:15px;font-weight:700;letter-spacing:-.01em}
.card .sub{margin:0 0 14px;font-size:12.5px;color:var(--tinta-suave)}
.borde-rojo{border-left:4px solid var(--rojo)}
.borde-ambar{border-left:4px solid var(--ambar)}
.borde-verde-top{border-top:4px solid var(--verde)}
.kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:14px}
.kpi{display:flex;gap:14px;align-items:flex-start}
.kpi .icono{border-radius:10px;padding:9px;font-size:18px;line-height:1;flex-shrink:0}
.kpi .etiqueta{font-size:11.5px;font-weight:600;color:var(--tinta-suave);text-transform:uppercase;letter-spacing:.05em}
.kpi .valor{font-size:24px;font-weight:800;letter-spacing:-.02em;line-height:1.2}
.kpi .detalle{font-size:12px;color:var(--tinta-suave);margin-top:2px}
.grid2{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:14px}
.filtros{display:flex;gap:10px;flex-wrap:wrap;align-items:center}
.filtros .lbl{font-size:13px;font-weight:600;color:var(--tinta-suave)}
.chip{border:1px solid var(--borde);background:var(--superficie);color:var(--tinta);
  border-radius:999px;padding:6px 14px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit}
.chip.activa{border-color:var(--verde);background:var(--verde);color:#fff}
.chip-sm{padding:5px 12px;font-size:12px}
.pill{border-radius:999px;padding:3px 10px;font-size:11.5px;font-weight:600;white-space:nowrap;display:inline-block}
.pill.ok{background:var(--verde-claro);color:var(--verde-oscuro)}
.pill.warn{background:var(--ambar-claro);color:#7A4D0E}
.pill.bad{background:var(--rojo-claro);color:#7A241C}
.pill.neutral{background:#EEF1ED;color:var(--tinta-suave)}
table{width:100%;border-collapse:collapse;font-size:13px}
thead tr{border-bottom:2px solid var(--borde);text-align:left;color:var(--tinta-suave);
  font-size:11.5px;text-transform:uppercase;letter-spacing:.04em}
th,td{padding:8px 6px}
tbody tr{border-bottom:1px solid var(--borde)}
tbody tr.clic{cursor:pointer}
tbody tr.clic:hover{background:#F0F4EF}
tbody tr.sel{background:var(--verde-claro)}
.scroll-x{overflow-x:auto}
.alerta{display:flex;flex-wrap:wrap;gap:8px;align-items:center;background:var(--rojo-claro);
  border:1px solid #F0CFCA;border-radius:10px;padding:10px 14px;width:100%;
  text-align:left;font-family:inherit;font-size:13.5px;cursor:default;color:var(--tinta)}
button.alerta{cursor:pointer}
button.alerta:hover{filter:brightness(.98)}
.alertas-lista{display:grid;gap:8px}
.titulo-alerta{display:flex;align-items:center;gap:8px;margin-bottom:4px}
.titulo-alerta h3{margin:0}
.rec{display:flex;gap:10px;align-items:flex-start;font-size:13px;line-height:1.5;
  border-radius:10px;padding:10px 14px}
.rec.critico{background:var(--rojo-claro)}
.rec.atencion{background:var(--ambar-claro)}
.rec.ok{background:var(--verde-claro)}
.cuadro-pago{display:inline-block;width:14px;height:14px;border-radius:4px}
.derecha{margin-left:auto}
.tend{display:inline-flex;align-items:center;gap:4px;font-weight:600;font-size:12.5px}
.grafico{position:relative;width:100%}
canvas{max-width:100%}
.cerrar{border:1px solid var(--borde);background:#fff;border-radius:8px;padding:5px 12px;
  font-size:12.5px;cursor:pointer;font-family:inherit;color:var(--tinta-suave)}
.oculto{display:none}
@media (max-width:560px){
  th,td{padding:7px 4px}
  main{padding:16px 12px 40px}
  header{padding:20px 14px 0}
}
