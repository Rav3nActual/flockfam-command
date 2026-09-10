const STORE_TIMEZONE="America/Chicago";
let pulseRefreshing=false;
function storeDate(date){return new Intl.DateTimeFormat("en-CA",{timeZone:STORE_TIMEZONE,year:"numeric",month:"2-digit",day:"2-digit"}).format(date);}
function storePulseState(now=new Date()){
  const metric=[...(DATA.store_metrics||[])].sort((a,b)=>new Date(b.captured_at)-new Date(a.captured_at))[0]||null;
  const captured=metric?.captured_at?new Date(metric.captured_at):null;
  const valid=captured&&!Number.isNaN(captured.getTime());
  const fresh=!!valid&&now-captured<=90*60*1000&&now>=captured&&storeDate(now)===storeDate(captured)&&!DATA_ERRORS.store_metrics;
  return {metric,fresh,captured:valid?captured:null};
}
function viewStorePulse(){
  const {metric,fresh,captured}=storePulseState();
  const visible=fresh?metric:null;
  const source=metric?.source==="shopify"?"Shopify":metric?.source==="ga4"?"GA4":metric?.source||"Store analytics";
  const stamp=captured?captured.toLocaleString(undefined,{timeZone:STORE_TIMEZONE,month:"short",day:"numeric",hour:"numeric",minute:"2-digit",timeZoneName:"short"}):"No snapshot yet";
  const status=DATA_ERRORS.store_metrics?"Couldn’t load the latest snapshot":fresh?`Updated ${stamp}`:captured?`Update overdue · last synced ${stamp}`:"Awaiting first update";
  return `<div class="panel store-pulse"><div class="panel-head"><h2>Store Pulse</h2><div class="crm-actions"><span class="pulse-freshness ${fresh?"":"pulse-stale"}" role="status">${esc(status)}</span><button class="btn ghost sm" data-pulse-refresh>Refresh</button></div></div><div class="panel-body"><div class="stat-grid">
  <div class="stat pulse-stat"><div class="lbl">Visitors Today</div><div class="val accent">${fmtMetric(visible?.visitors_today)}</div><div class="sub">${esc(source)} · today</div></div>
  <div class="stat pulse-stat"><div class="lbl">Visitors 7 Days</div><div class="val">${fmtMetric(visible?.visitors_7d)}</div><div class="sub">${esc(source)} · past 7 days</div></div>
  <div class="stat pulse-stat"><div class="lbl">Visitors 30 Days</div><div class="val">${fmtMetric(visible?.visitors_30d)}</div><div class="sub">${esc(source)} · past 30 days</div></div>
  <div class="stat pulse-stat"><div class="lbl">Sales Today</div><div class="val green">${fmtMoney(visible?.sales_today)}</div><div class="sub">Shopify · today</div></div>
  <div class="stat pulse-stat"><div class="lbl">Sales 7 Days</div><div class="val green">${fmtMoney(visible?.sales_7d)}</div><div class="sub">Shopify · past 7 days</div></div>
  <div class="stat pulse-stat"><div class="lbl">Sales MTD</div><div class="val green">${fmtMoney(visible?.sales_mtd)}</div><div class="sub">Shopify · month to date</div></div></div>
  <div class="pulse-meta"><span><strong>${fmtMetric(visible?.orders_today)}</strong> orders today</span><span><strong>${fmtPct(visible?.conversion_rate)}</strong> conversion</span><span>${esc(source)} storefront · hourly updates · Central time</span></div>
  <div class="pulse-explanation">${fresh?"Visitors are reported by your storefront analytics. Refresh checks the latest saved update.":"Current figures are unavailable until a fresh store update arrives. Older figures are hidden to avoid showing them as today’s activity."}</div></div></div>`;
}
async function loadStorePulse(){return sb.from("store_metrics").select("*").order("captured_at",{ascending:false}).limit(1);}
async function refreshStorePulse(){
  if(pulseRefreshing)return;pulseRefreshing=true;
  const button=$("[data-pulse-refresh]");if(button){button.disabled=true;button.textContent="Refreshing…";}
  try{
    const {data,error}=await loadStorePulse();
    if(error)DATA_ERRORS.store_metrics=error;else{delete DATA_ERRORS.store_metrics;DATA.store_metrics=data||[];}
  }catch(error){DATA_ERRORS.store_metrics=error;}
  finally{pulseRefreshing=false;if(VIEW==="overview"&&!$("#modal"))render();}
}
function bindStorePulse(){document.querySelectorAll("[data-pulse-refresh]").forEach(b=>b.onclick=refreshStorePulse);}
setInterval(()=>{if(!document.hidden&&!$("#app").classList.contains("hidden")&&VIEW==="overview"&&!$("#modal"))refreshStorePulse();},5*60*1000);
