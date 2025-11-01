:root{
  --bg:#f6f7f9; --card:#ffffff; --accent:#26746a; --muted:#6b7280;
  --gap:14px; --radius:10px; --maxwidth:980px;
}
*{box-sizing:border-box}
body{font-family:Inter,system-ui,Segoe UI,Arial,sans-serif;background:var(--bg);margin:0;color:#111}
.container{max-width:var(--maxwidth);margin:28px auto;padding:18px}
header h1{margin:0 0 6px;font-size:1.45rem}
.lead{margin:0 0 18px;color:var(--muted)}
.card{background:var(--card);padding:14px;border-radius:12px;margin-top:12px;box-shadow:0 6px 20px rgba(18,22,31,0.06)}
.sliders-grid{display:grid;grid-template-columns:1fr;gap:10px}
@media(min-width:880px){ .sliders-grid{grid-template-columns:repeat(2,1fr)} }

.slider-row{display:flex;align-items:center;gap:12px;background:var(--card);padding:10px;border-radius:10px;border:1px solid rgba(16,24,32,0.04)}
.slider-row label{min-width:220px;font-weight:600;font-size:0.95rem}
.slider-controls{display:flex;align-items:center;gap:8px;margin-left:auto}
input[type=range]{width:220px}
.value-badge{min-width:42px;text-align:center;background:#eef6f3;color:var(--accent);padding:6px;border-radius:8px;font-weight:700}
.small{font-size:0.85rem;color:var(--muted)}
.actions{display:flex;gap:10px;justify-content:flex-start;margin-top:12px}
.btn{padding:8px 12px;border-radius:10px;border:0;background:#e6f2ef;color:var(--accent);cursor:pointer}
.btn.primary{background:var(--accent);color:#fff}
.btn.ghost{background:transparent;border:1px solid rgba(0,0,0,0.06)}
.muted{color:var(--muted);font-size:0.9rem;margin-top:14px}
.bars{display:flex;flex-direction:column;gap:8px;margin-top:8px}
.bar-row{display:flex;align-items:center;gap:12px}
.bar-label{min-width:160px}
.bar-track{flex:1;height:12px;background:#eee;border-radius:8px;overflow:hidden;position:relative}
.bar-fill{height:100%;background:linear-gradient(90deg,var(--accent),#3aa88a);width:0%}
.json{background:#0b1220;color:#dff7ef;padding:10px;border-radius:8px;overflow:auto}
.hidden{display:none}
.sr-only{position:absolute;left:-10000px;top:auto;width:1px;height:1px;overflow:hidden}
@media (prefers-reduced-motion: reduce){
  *{transition:none !important}
}
