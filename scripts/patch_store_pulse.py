from pathlib import Path

p = Path('index.html')
s = p.read_text()

old_data = 'let DATA = {tasks:[],launch_milestones:[],products:[],drops:[],influencers:[],significant_dates:[],documents:[],drop_schedule:[],ideas:[],reaper_stages:[],reaper_items:[]};'
new_data = 'let DATA = {tasks:[],launch_milestones:[],products:[],drops:[],influencers:[],significant_dates:[],documents:[],drop_schedule:[],ideas:[],reaper_stages:[],reaper_items:[],store_metrics:[]};'
if old_data in s:
    s = s.replace(old_data, new_data, 1)

css_anchor = '.stat .val.accent{color:var(--accent)} .stat .val.green{color:var(--green)} .stat .val.amber{color:var(--amber)} .stat .val.red{color:var(--red)}\n'
css_add = '''.stat .val.accent{color:var(--accent)} .stat .val.green{color:var(--green)} .stat .val.amber{color:var(--amber)} .stat .val.red{color:var(--red)}
.store-pulse .panel-body{padding:16px 18px 18px}
.store-pulse .stat-grid{margin-bottom:0}
.store-pulse .pulse-stat{background:var(--bg2);min-width:0}
.store-pulse .pulse-stat .val{font-size:26px}
.store-pulse .pulse-stat .sub{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pulse-meta{display:flex;align-items:center;gap:14px;flex-wrap:wrap;padding-top:12px;margin-top:14px;border-top:1px solid var(--border);font-size:12.5px;color:var(--muted2)}
.pulse-meta strong{color:var(--text);font-weight:700}
.pulse-ready{display:flex;align-items:center;gap:7px}
.pulse-dot{width:7px;height:7px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 3px var(--accent-soft)}
'''
if '.store-pulse .panel-body' not in s:
    if css_anchor not in s:
        raise SystemExit('CSS anchor not found')
    s = s.replace(css_anchor, css_add, 1)

helper_anchor = 'function statusPill(s){const k=(s||"Not Started").toLowerCase().replace(/[^a-z]/g,"");return `<span class="pill st-${k}">${esc(s||"Not Started")}</span>`;}\n'
helper_add = helper_anchor + '''function fmtMetric(v){return v==null||v===""?"—":Number(v).toLocaleString();}
function fmtMoney(v){return v==null||v===""?"—":Number(v).toLocaleString(undefined,{style:"currency",currency:"USD",maximumFractionDigits:0});}
function fmtPct(v){return v==null||v===""?"—":`${Number(v).toFixed(1)}%`;}
'''
if 'function fmtMetric(v)' not in s:
    if helper_anchor not in s:
        raise SystemExit('helper anchor not found')
    s = s.replace(helper_anchor, helper_add, 1)

metrics_anchor = '  const upDates=DATA.significant_dates.map(d=>({...d,occ:nextOccurrence(d.event_date)})).filter(d=>d.occ)\n      .sort((a,b)=>a.occ-b.occ).slice(0,5);\n\n'
metrics_add = metrics_anchor + '''  const metric=[...(DATA.store_metrics||[])].sort((a,b)=>new Date(b.captured_at||0)-new Date(a.captured_at||0))[0]||null;
  const pulseUpdated=metric&&metric.captured_at?new Date(metric.captured_at).toLocaleString(undefined,{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):"Awaiting live data";

'''
if 'const metric=[...(DATA.store_metrics||[])]' not in s:
    if metrics_anchor not in s:
        raise SystemExit('metrics anchor not found')
    s = s.replace(metrics_anchor, metrics_add, 1)

grid_anchor = '  h+=`<div class="grid2">`;\n'
pulse_block = '''  h+=`<div class="panel store-pulse"><div class="panel-head"><h2>Store Pulse</h2><span class="count">${pulseUpdated}</span></div><div class="panel-body">
    <div class="stat-grid">
      <div class="stat pulse-stat"><div class="lbl">Visitors Today</div><div class="val accent">${fmtMetric(metric?.visitors_today)}</div><div class="sub">GA4 · today</div></div>
      <div class="stat pulse-stat"><div class="lbl">Visitors 7 Days</div><div class="val">${fmtMetric(metric?.visitors_7d)}</div><div class="sub">GA4 · rolling 7d</div></div>
      <div class="stat pulse-stat"><div class="lbl">Visitors 30 Days</div><div class="val">${fmtMetric(metric?.visitors_30d)}</div><div class="sub">GA4 · rolling 30d</div></div>
      <div class="stat pulse-stat"><div class="lbl">Sales Today</div><div class="val green">${fmtMoney(metric?.sales_today)}</div><div class="sub">Shopify · today</div></div>
      <div class="stat pulse-stat"><div class="lbl">Sales 7 Days</div><div class="val green">${fmtMoney(metric?.sales_7d)}</div><div class="sub">Shopify · rolling 7d</div></div>
      <div class="stat pulse-stat"><div class="lbl">Sales MTD</div><div class="val green">${fmtMoney(metric?.sales_mtd)}</div><div class="sub">Shopify · month to date</div></div>
    </div>
    <div class="pulse-meta">
      <span><strong>${fmtMetric(metric?.orders_today)}</strong> orders today</span>
      <span><strong>${fmtPct(metric?.conversion_rate)}</strong> conversion</span>
      <span class="pulse-ready"><i class="pulse-dot"></i>${metric?`Source: ${esc(metric.source||"sync")}`:"GA4 + Shopify feed ready to connect"}</span>
    </div>
  </div></div>`;

  h+=`<div class="grid2">`;
'''
if '<h2>Store Pulse</h2>' not in s:
    overview_pos = s.find('function viewOverview(){')
    if overview_pos < 0:
        raise SystemExit('viewOverview not found')
    grid_pos = s.find(grid_anchor, overview_pos)
    if grid_pos < 0:
        raise SystemExit('overview grid anchor not found')
    s = s[:grid_pos] + pulse_block + s[grid_pos+len(grid_anchor):]

p.write_text(s)
print('Store Pulse patch applied')
