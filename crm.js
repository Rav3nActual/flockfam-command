/* Shared relationship CRM. The original influencers table remains the contact source. */
const CRM_CATEGORIES = {Creator:"Creators",Athlete:"Athletes",Collaborator:"Collaborators",Supplier:"Suppliers"};
const CRM_STAGES = ["Not started","Pitched","Contacted","In conversation","Active","Waiting","Paused","Closed"];
const CRM_TABLES = ["influencers","crm_activities","crm_commitments"];
const CRM = {category:"Creator",query:"",filter:"all",selected:null};

function crmToday(){
  const d=new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}
function crmDate(d){return d?fmtDate(d):"No date set";}
function crmDue(d){return !!d&&d<=crmToday();}
function crmOpenCommitment(c){return c.status!=="Complete"&&c.status!=="Cancelled";}
function crmStatus(s){
  s=s||"Not started";
  return `<span class="crm-status ${esc(s.toLowerCase().replace(/[^a-z]+/g,"-"))}">${esc(s)}</span>`;
}
function crmURL(value){
  try{const u=new URL(value);return ["https:","http:"].includes(u.protocol)?u.href:"";}catch{return "";}
}
function crmLink(value,label){
  const href=crmURL(value);
  return href?`<a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(label)} ↗</a>`:"";
}
function crmHasErrors(){return CRM_TABLES.some(t=>DATA_ERRORS[t]);}
function crmErrorPanel(){
  return `<div class="crm-error" role="alert"><p>Relationships couldn’t be loaded completely. Refresh to try again.</p><button class="btn sm" data-crm-refresh>Refresh relationships</button></div>`;
}
async function crmLoadTable(table){
  const rows=[];
  for(let offset=0;;offset+=1000){
    const {data,error}=await sb.from(table).select("*").order("id").range(offset,offset+999);
    if(error)return {data:null,error};
    rows.push(...(data||[]));
    if(!data||data.length<1000)return {data:rows,error:null};
  }
}
function crmFilteredContacts(){
  const q=CRM.query.trim().toLocaleLowerCase();
  return DATA.influencers.filter(c=>{
    if(CRM.category!=="All"&&c.category!==CRM.category)return false;
    if(q&&![c.person_name,c.organization,c.email,c.notes,...(c.platform||[])].filter(Boolean).join(" ").toLocaleLowerCase().includes(q))return false;
    if(CRM.filter==="due"&&!crmDue(c.follow_up_date))return false;
    if(CRM.filter==="active"&&c.status!=="Active")return false;
    if(CRM.filter==="commitments"&&!DATA.crm_commitments.some(x=>x.contact_id===c.id&&crmOpenCommitment(x)))return false;
    return true;
  }).sort((a,b)=>a.person_name.localeCompare(b.person_name));
}
function crmContactCards(){
  const contacts=crmFilteredContacts();
  const category=CRM_CATEGORIES[CRM.category]||"contacts";
  let h=`<p class="crm-count" role="status">${contacts.length} ${contacts.length===1?"contact":"contacts"}</p>`;
  if(!contacts.length)return h+`<div class="panel crm-empty"><strong>${CRM.query||CRM.filter!=="all"?"No matching contacts":`No ${category.toLowerCase()} yet`}</strong><p>${CRM.query||CRM.filter!=="all"?"Try another search or clear the filters.":"Add a relationship and keep the next step in view."}</p>${CRM.query||CRM.filter!=="all"?'<button class="btn ghost sm" data-crm-reset>Clear filters</button>':'<button class="btn sm" data-crm-new>+ Contact</button>'}</div>`;
  h+='<div class="crm-cards">';
  contacts.forEach(c=>{
    const initials=c.person_name.split(/\s+/).slice(0,2).map(x=>x[0]).join("").toUpperCase();
    const commitments=DATA.crm_commitments.filter(x=>x.contact_id===c.id&&crmOpenCommitment(x)).length;
    h+=`<button class="crm-contact-card" data-crm-open="${esc(c.id)}" aria-label="Open ${esc(c.person_name)}">
      <span class="crm-card-top"><span class="crm-avatar" aria-hidden="true">${esc(initials)}</span><span><span class="crm-card-name">${esc(c.person_name)}</span><span class="crm-card-sub">${esc(c.organization||c.category)}</span></span></span>
      <span class="crm-tags">${crmStatus(c.status)}${(c.platform||[]).map(p=>`<span class="tag">${esc(p)}</span>`).join("")}</span>
      <span class="crm-card-next"><span class="${c.follow_up_date&&c.follow_up_date<crmToday()?"overdue":""}">${c.follow_up_date?`Follow up · ${crmDate(c.follow_up_date)}`:"No follow-up scheduled"}</span>${c.next_action?`<strong>${esc(c.next_action)}</strong>`:""}${commitments?`<span>${commitments} open commitment${commitments===1?"":"s"}</span>`:""}</span>
    </button>`;
  });
  return h+"</div>";
}
function viewCRM(){
  if(crmHasErrors())return `<section class="crm-root"><div class="page-head"><h1>CRM</h1></div>${crmErrorPanel()}</section>`;
  const selected=DATA.influencers.find(c=>c.id===CRM.selected);
  if(selected)return crmContactDetail(selected);
  CRM.selected=null;
  const contacts=DATA.influencers, due=contacts.filter(c=>crmDue(c.follow_up_date)).length;
  const open=DATA.crm_commitments.filter(crmOpenCommitment).length;
  let h=`<section class="crm-root"><div class="page-head"><div><h1>CRM</h1><p>Your people, partnerships, and next steps.</p></div><div class="crm-actions"><button class="btn ghost sm" data-crm-refresh>Refresh</button><button class="btn" data-crm-new>+ Contact</button></div></div>
    <div class="stat-grid crm-stats">
      <div class="stat"><div class="lbl">Relationships</div><div class="val">${contacts.length}</div><div class="sub">Across all categories</div></div>
      <div class="stat"><div class="lbl">Active partners</div><div class="val green">${contacts.filter(c=>c.status==="Active").length}</div><div class="sub">Working together</div></div>
      <div class="stat"><div class="lbl">Follow-ups due</div><div class="val ${due?"amber":""}">${due}</div><div class="sub">Today and overdue</div></div>
      <div class="stat"><div class="lbl">Open commitments</div><div class="val accent">${open}</div><div class="sub">Promises to deliver</div></div>
    </div><div class="crm-tabs" aria-label="Contact categories">`;
  Object.entries({All:"All",...CRM_CATEGORIES}).forEach(([key,label])=>{
    const count=contacts.filter(c=>key==="All"||c.category===key).length;
    h+=`<button class="crm-tab" data-crm-category="${key}" aria-pressed="${CRM.category===key}">${label}<span>${count}</span></button>`;
  });
  h+=`</div><div class="crm-toolbar"><div class="field"><label for="crmSearch">Search contacts</label><input id="crmSearch" type="search" placeholder="Name, company, platform, or notes" value="${esc(CRM.query)}"></div><div class="field"><label for="crmFilter">Show</label><select id="crmFilter">${[["all","All relationships"],["due","Due follow-ups"],["active","Active partners"],["commitments","Open commitments"]].map(([v,l])=>`<option value="${v}" ${CRM.filter===v?"selected":""}>${l}</option>`).join("")}</select></div></div><div id="crmResults">${crmContactCards()}</div></section>`;
  return h;
}
function crmContactDetail(c){
  const activities=DATA.crm_activities.filter(a=>a.contact_id===c.id).sort((a,b)=>b.occurred_on.localeCompare(a.occurred_on)||b.created_at.localeCompare(a.created_at));
  const commitments=DATA.crm_commitments.filter(x=>x.contact_id===c.id).sort((a,b)=>Number(crmOpenCommitment(b))-Number(crmOpenCommitment(a))||(a.due_date||"9999").localeCompare(b.due_date||"9999")||a.created_at.localeCompare(b.created_at));
  const links=[crmLink(c.page_link,"Social profile"),crmLink(c.notion_url,"Original notes")].filter(Boolean).join(" · ");
  let h=`<section class="crm-root"><button class="btn ghost sm crm-back" data-crm-back>← Back to contacts</button><div class="page-head"><div><h1>Contact</h1><p>Keep every conversation and promise together.</p></div><button class="btn sm" data-crm-edit-contact="${esc(c.id)}">Edit contact</button></div>
    <div class="crm-detail-grid"><div><div class="panel"><div class="crm-profile"><h2>${esc(c.person_name)}</h2><div class="crm-tags"><span class="tag">${esc(c.category)}</span>${crmStatus(c.status)}${(c.platform||[]).map(p=>`<span class="tag">${esc(p)}</span>`).join("")}</div>
    <dl class="crm-contact-info"><dt>Company / team</dt><dd>${esc(c.organization)||"—"}</dd><dt>Email</dt><dd>${esc(c.email)||"—"}</dd><dt>Phone</dt><dd>${esc(c.phone)||"—"}</dd><dt>Contacted</dt><dd>${c.date_contacted?crmDate(c.date_contacted):"Not recorded"}</dd>${links?`<dt>Links</dt><dd>${links}</dd>`:""}</dl>
    <div class="crm-section-label">Relationship notes</div><p class="crm-copy">${esc(c.notes)||"No notes yet. Add context when you edit this contact."}</p></div>
    <div class="crm-next"><div class="crm-section-label">Next step</div><p class="crm-copy">${esc(c.next_action)||"Choose the next action for this relationship."}</p><time class="crm-next-date ${c.follow_up_date&&c.follow_up_date<crmToday()?"overdue":""}">${c.follow_up_date?`Follow up · ${crmDate(c.follow_up_date)}`:"No follow-up scheduled"}</time><div class="crm-actions"><button class="btn ghost sm" data-crm-followup="${esc(c.id)}">${c.next_action||c.follow_up_date?"Edit next step":"Set next step"}</button>${c.next_action||c.follow_up_date?`<button class="iconbtn" data-crm-clear-followup="${esc(c.id)}">Clear follow-up</button>`:""}</div></div></div>
    <div class="crm-footer-delete"><button class="iconbtn danger" data-crm-delete="influencers|${esc(c.id)}">Delete contact</button></div></div>
    <div><div class="panel"><div class="panel-head"><h2>Conversation history <span class="count">${activities.length}</span></h2><button class="btn sm" data-crm-log="${esc(c.id)}">+ Log activity</button></div>`;
  if(!activities.length)h+='<div class="crm-empty"><strong>No conversations logged yet</strong><p>Record an email, DM, call, meeting, or note after it happens.</p></div>';
  activities.forEach(a=>{
    h+=`<article class="crm-entry"><div class="crm-entry-top"><span class="tag">${esc(a.kind)}</span><time>${crmDate(a.occurred_on)}</time></div><p class="crm-copy">${esc(a.body)}</p><div class="crm-actions"><button class="iconbtn" data-crm-edit-activity="${esc(a.id)}">Edit</button><button class="iconbtn danger" data-crm-delete="crm_activities|${esc(a.id)}">Delete</button></div></article>`;
  });
  h+=`</div><div class="panel"><div class="panel-head"><h2>Commitments <span class="count">${commitments.filter(crmOpenCommitment).length} open</span></h2><button class="btn sm" data-crm-commit="${esc(c.id)}">+ Commitment</button></div>`;
  if(!commitments.length)h+='<div class="crm-empty"><strong>No commitments yet</strong><p>Track what FlockFam or this contact has promised, with a due date and status.</p></div>';
  commitments.forEach(x=>{
    h+=`<article class="crm-entry"><div class="crm-entry-top">${crmStatus(x.status)}<span>${esc(x.responsible_party==="Contact"?c.person_name:"FlockFam")} to deliver</span></div><h3>${esc(x.title)}</h3><div class="crm-entry-top"><time class="${crmOpenCommitment(x)&&x.due_date&&x.due_date<crmToday()?"overdue":""}">${x.due_date?`Due ${crmDate(x.due_date)}`:"No due date"}</time>${x.value_usd!=null?`<span>${Number(x.value_usd).toLocaleString(undefined,{style:"currency",currency:"USD"})}</span>`:""}</div>${x.notes?`<p class="crm-copy">${esc(x.notes)}</p>`:""}<div class="crm-actions">${crmOpenCommitment(x)?`<button class="btn ghost sm" data-crm-complete="${esc(x.id)}">Mark complete</button>`:""}<button class="iconbtn" data-crm-edit-commitment="${esc(x.id)}">Edit</button><button class="iconbtn danger" data-crm-delete="crm_commitments|${esc(x.id)}">Delete</button></div></article>`;
  });
  return h+"</div></div></div></section>";
}
function crmOverview(){
  if(crmHasErrors())return crmErrorPanel();
  const contacts=DATA.influencers;
  const items=contacts.filter(c=>c.follow_up_date).map(c=>({contact:c,date:c.follow_up_date,title:c.next_action||"Follow up",type:"Follow-up"}));
  DATA.crm_commitments.filter(x=>crmOpenCommitment(x)&&x.due_date).forEach(x=>{
    const c=contacts.find(c=>c.id===x.contact_id);
    if(c)items.push({contact:c,date:x.due_date,title:x.title,type:"Commitment"});
  });
  items.sort((a,b)=>a.date.localeCompare(b.date)||a.contact.person_name.localeCompare(b.contact.person_name));
  const due=items.filter(x=>crmDue(x.date)).length;
  let h=`<div class="panel"><div class="panel-head"><h2>Relationship follow-ups <span class="count">${due} due</span></h2><button class="btn ghost sm" data-crm-home>Open CRM</button></div>`;
  if(!items.length)h+='<div class="crm-empty">Set a next step or commitment in CRM to see it here.</div>';
  items.slice(0,6).forEach(x=>{
    h+=`<button class="crm-due-row" data-crm-open="${esc(x.contact.id)}"><span><strong>${esc(x.contact.person_name)}</strong><small>${esc(x.type)} · ${esc(x.title)}</small></span><time class="${x.date<crmToday()?"overdue":""}">${crmDate(x.date)}</time></button>`;
  });
  if(items.length>6)h+=`<div class="crm-entry muted">${items.length-6} more scheduled in CRM</div>`;
  return h+"</div>";
}

async function crmWrite(table,values,original){
  if(!CRM_TABLES.includes(table))throw new Error("Unknown relationship record.");
  let query=original?sb.from(table).update(values).eq("id",original.id):sb.from(table).insert(values);
  if(original?.updated_at)query=query.eq("updated_at",original.updated_at);
  const {data,error}=await query.select("*").maybeSingle();
  if(error)throw new Error(error.message||"Couldn’t save. Please try again.");
  if(!data)throw new Error("This record changed or is no longer available. Close this form and refresh before trying again.");
  const i=DATA[table].findIndex(x=>x.id===data.id);
  if(i<0)DATA[table].push(data);else DATA[table][i]=data;
  return data;
}
async function crmRemove(table,row){
  let query=sb.from(table).delete().eq("id",row.id);
  if(row.updated_at)query=query.eq("updated_at",row.updated_at);
  const {data,error}=await query.select("id").maybeSingle();
  if(error)throw new Error(error.message||"Couldn’t delete. Please try again.");
  if(!data)throw new Error("This record changed or is no longer available. Close this form and refresh before trying again.");
  DATA[table]=DATA[table].filter(x=>x.id!==row.id);
  if(table==="influencers"){
    DATA.crm_activities=DATA.crm_activities.filter(x=>x.contact_id!==row.id);
    DATA.crm_commitments=DATA.crm_commitments.filter(x=>x.contact_id!==row.id);
    CRM.selected=null;
  }
}

function crmDialog({title,fields=[],values={},submitLabel="Save",intro="",onSave,danger=false}){
  const previousFocus=document.activeElement;
  const oldOverflow=document.body.style.overflow;
  let saving=false;
  let body=intro?`<p class="crm-form-footnote">${esc(intro)}</p>`:"";
  body+='<div class="crm-form-grid">';
  fields.forEach(f=>{
    let value=values[f.key]??f.default??"";
    if(Array.isArray(value))value=value.join(", ");
    const attrs=`id="crmField-${f.key}" name="${f.key}" ${f.required?"required":""} ${f.maxLength?`maxlength="${f.maxLength}"`:""}`;
    body+=`<div class="field ${f.wide?"crm-field-wide":""}"><label for="crmField-${f.key}">${esc(f.label)}${f.required?" *":""}</label>`;
    if(f.type==="select")body+=`<select ${attrs}>${f.options.map(o=>{const v=typeof o==="object"?o.value:o,l=typeof o==="object"?o.label:o;return `<option value="${esc(v)}" ${v===value?"selected":""}>${esc(l)}</option>`;}).join("")}</select>`;
    else if(f.type==="textarea")body+=`<textarea ${attrs} rows="4">${esc(value)}</textarea>`;
    else body+=`<input ${attrs} type="${f.type||"text"}" value="${esc(value)}" ${f.type==="number"?`min="${f.min??0}" max="${f.max??9999999999.99}" step="0.01"`:""} ${f.placeholder?`placeholder="${esc(f.placeholder)}"`:""}>`;
    if(f.help)body+=`<p class="crm-form-help">${esc(f.help)}</p>`;
    body+="</div>";
  });
  body+="</div>";
  const m=el("div");m.id="modal";
  m.innerHTML=`<div class="modal-card crm-modal" role="dialog" aria-modal="true" aria-labelledby="crmDialogTitle"><form><div class="modal-head"><h3 id="crmDialogTitle">${esc(title)}</h3><button class="iconbtn" type="button" data-crm-close aria-label="Close dialog">✕</button></div><div class="modal-body">${body}<p class="crm-form-error" role="alert" hidden></p></div><div class="modal-foot"><button class="btn ghost" type="button" data-crm-close>Cancel</button><button class="btn ${danger?"crm-danger":""}" type="submit">${esc(submitLabel)}</button></div></form></div>`;
  $("#modalMount").replaceChildren(m);
  document.body.style.overflow="hidden";
  $("#app").inert=true;
  const close=()=>{
    if(saving)return;
    document.removeEventListener("keydown",keyHandler);
    m.remove();document.body.style.overflow=oldOverflow;$("#app").inert=false;
    if(previousFocus?.isConnected)previousFocus.focus();
    else $("#content button")?.focus();
  };
  const keyHandler=e=>{
    if(e.key==="Escape"){e.preventDefault();close();}
    if(e.key==="Tab"){
      const list=[...m.querySelectorAll('button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),a[href]')];
      if(!list.length){e.preventDefault();return;}
      const first=list[0],last=list[list.length-1];
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
    }
  };
  document.addEventListener("keydown",keyHandler);
  m.onclick=e=>{if(e.target===m)close();};
  m.querySelectorAll("[data-crm-close]").forEach(b=>b.onclick=close);
  const form=m.querySelector("form"),submit=form.querySelector('[type="submit"]'),errorBox=m.querySelector(".crm-form-error");
  form.onsubmit=async e=>{
    e.preventDefault();if(saving||!form.reportValidity())return;
    const out={};
    for(const f of fields){
      const input=form.elements.namedItem(f.key),raw=input.value.trim();
      if(f.required&&!raw){input.focus();errorBox.hidden=false;errorBox.textContent=`Enter ${f.label.toLowerCase()}.`;return;}
      if(f.type==="url"&&raw&&!crmURL(raw)){input.focus();errorBox.hidden=false;errorBox.textContent="Use an http:// or https:// link.";return;}
      out[f.key]=f.array?raw.split(",").map(x=>x.trim()).filter(Boolean):f.type==="number"?(raw?Number(raw):null):(raw||null);
    }
    errorBox.hidden=true;saving=true;
    form.querySelectorAll("button,input,select,textarea").forEach(x=>x.disabled=true);submit.textContent="Saving…";
    try{await onSave(out);saving=false;render();close();toast(danger?"Deleted":"Saved");}
    catch(error){saving=false;errorBox.textContent=error.message||"Couldn’t save. Please try again.";errorBox.hidden=false;form.querySelectorAll("button,input,select,textarea").forEach(x=>x.disabled=false);submit.textContent=submitLabel;}
  };
  (form.querySelector("input,select,textarea")||form.querySelector("[data-crm-close]")).focus();
}

function crmEditContact(row){
  const values=row||{category:CRM.category==="All"?"Creator":CRM.category,status:"Not started"};
  const stages=[...new Set([...CRM_STAGES,values.status].filter(Boolean))];
  crmDialog({title:row?"Edit contact":"New contact",values:{...values,status:values.status||"Not started"},submitLabel:row?"Save contact":"Add contact",fields:[
    {key:"person_name",label:"Name",required:true,maxLength:300},
    {key:"category",label:"Category",type:"select",options:Object.keys(CRM_CATEGORIES)},
    {key:"organization",label:"Company / team"},
    {key:"status",label:"Relationship status",type:"select",options:stages},
    {key:"email",label:"Email",type:"email"},
    {key:"phone",label:"Phone",type:"tel"},
    {key:"platform",label:"Platforms",array:true,placeholder:"YouTube, Instagram"},
    {key:"date_contacted",label:"Date contacted",type:"date"},
    {key:"page_link",label:"Social profile / website",type:"url",wide:true},
    {key:"notes",label:"Relationship notes",type:"textarea",wide:true},
    {key:"next_action",label:"Next action",wide:true,placeholder:"What should happen next?"},
    {key:"follow_up_date",label:"Follow-up date",type:"date"}
  ],onSave:async values=>{
    const saved=await crmWrite("influencers",values,row);
    CRM.selected=saved.id;CRM.category=saved.category;
  }});
}
function crmEditFollowup(row){
  crmDialog({title:`Next step · ${row.person_name}`,values:row,fields:[
    {key:"next_action",label:"Next action",type:"textarea",wide:true},
    {key:"follow_up_date",label:"Follow-up date",type:"date",help:"Appears on Overview and in your due follow-ups."}
  ],onSave:values=>crmWrite("influencers",values,row)});
}
function crmEditActivity(contactId,row){
  crmDialog({title:row?"Edit activity":"Log activity",values:row||{kind:"Note",occurred_on:crmToday()},submitLabel:row?"Save activity":"Log activity",intro:"Record a conversation or note here after it happens.",fields:[
    {key:"kind",label:"Activity type",type:"select",options:["Note","Email","DM","Call","Meeting","Other"]},
    {key:"occurred_on",label:"Date",type:"date",required:true},
    {key:"body",label:"Summary / notes",type:"textarea",required:true,wide:true}
  ],onSave:values=>crmWrite("crm_activities",{...values,...(!row?{contact_id:contactId}:{})},row)});
}
function crmEditCommitment(contactId,row){
  crmDialog({title:row?"Edit commitment":"New commitment",values:row||{responsible_party:"FlockFam",status:"Planned"},submitLabel:row?"Save commitment":"Add commitment",fields:[
    {key:"title",label:"Commitment",required:true,wide:true,placeholder:"Product, sponsorship, content, or another deliverable"},
    {key:"responsible_party",label:"Who delivers?",type:"select",options:["FlockFam","Contact"]},
    {key:"status",label:"Status",type:"select",options:["Planned","In progress","Complete","Cancelled"]},
    {key:"due_date",label:"Due date",type:"date"},
    {key:"value_usd",label:"Value (USD, optional)",type:"number"},
    {key:"notes",label:"Details",type:"textarea",wide:true}
  ],onSave:values=>crmWrite("crm_commitments",{...values,...(!row?{contact_id:contactId}:{})},row)});
}
function crmConfirmDelete(table,id){
  if(!CRM_TABLES.includes(table))return;
  const row=DATA[table].find(x=>x.id===id);if(!row)return;
  const contact=table==="influencers";
  crmDialog({title:contact?`Delete ${row.person_name}?`:"Delete this record?",danger:true,submitLabel:"Delete",intro:contact?"This deletes the contact and all of their conversation history and commitments. This cannot be undone.":"This permanently deletes the selected record.",onSave:()=>crmRemove(table,row)});
}
async function crmInlineAction(button,action){
  if(button.disabled)return;button.disabled=true;
  try{await action();render();toast("Saved");}
  catch(error){
    button.disabled=false;
    let box=button.parentElement.querySelector(".crm-form-error");
    if(!box){box=el("p","crm-form-error");box.setAttribute("role","alert");button.parentElement.appendChild(box);}
    box.textContent=error.message||"Couldn’t save. Please try again.";
  }
}
function crmGo(id=null){
  CRM.selected=id;VIEW="crm";
  document.querySelectorAll("#nav button").forEach(b=>b.classList.toggle("active",b.dataset.view==="crm"));
  $("#sidebar").classList.remove("open");render();window.scrollTo({top:0,behavior:"instant"});
}
function bindCRM(){
  const bind=(selector,fn)=>document.querySelectorAll(selector).forEach(b=>b.onclick=()=>fn(b));
  bind("[data-crm-open]",b=>crmGo(b.dataset.crmOpen));
  bind("[data-crm-home]",()=>{CRM.category="All";CRM.filter="all";CRM.query="";crmGo();});
  bind("[data-crm-back]",()=>crmGo());
  bind("[data-crm-new]",()=>crmEditContact());
  bind("[data-crm-refresh]",async b=>{b.disabled=true;b.textContent="Refreshing…";await loadAll();});
  bind("[data-crm-category]",b=>{CRM.category=b.dataset.crmCategory;render();});
  bind("[data-crm-reset]",()=>{CRM.query="";CRM.filter="all";render();});
  bind("[data-crm-edit-contact]",b=>crmEditContact(DATA.influencers.find(c=>c.id===b.dataset.crmEditContact)));
  bind("[data-crm-followup]",b=>crmEditFollowup(DATA.influencers.find(c=>c.id===b.dataset.crmFollowup)));
  bind("[data-crm-clear-followup]",b=>{
    const row=DATA.influencers.find(c=>c.id===b.dataset.crmClearFollowup);
    crmInlineAction(b,()=>crmWrite("influencers",{next_action:null,follow_up_date:null},row));
  });
  bind("[data-crm-log]",b=>crmEditActivity(b.dataset.crmLog));
  bind("[data-crm-edit-activity]",b=>{const row=DATA.crm_activities.find(x=>x.id===b.dataset.crmEditActivity);crmEditActivity(row.contact_id,row);});
  bind("[data-crm-commit]",b=>crmEditCommitment(b.dataset.crmCommit));
  bind("[data-crm-edit-commitment]",b=>{const row=DATA.crm_commitments.find(x=>x.id===b.dataset.crmEditCommitment);crmEditCommitment(row.contact_id,row);});
  bind("[data-crm-complete]",b=>{const row=DATA.crm_commitments.find(x=>x.id===b.dataset.crmComplete);crmInlineAction(b,()=>crmWrite("crm_commitments",{status:"Complete"},row));});
  bind("[data-crm-delete]",b=>crmConfirmDelete(...b.dataset.crmDelete.split("|")));
  const search=$("#crmSearch");
  if(search)search.oninput=()=>{CRM.query=search.value;$("#crmResults").innerHTML=crmContactCards();bindCRM();};
  const filter=$("#crmFilter");
  if(filter)filter.onchange=()=>{CRM.filter=filter.value;render();$("#crmFilter").focus();};
  bind("[data-manage-dates]",()=>{VIEW="dates";render();});
  bind("[data-dates-back]",()=>{VIEW="overview";render();});
}
function viewDates(){
  const dates=DATA.significant_dates.slice().sort((a,b)=>(a.event_date||"9999").localeCompare(b.event_date||"9999"));
  return `<button class="btn ghost sm crm-back" data-dates-back>← Overview</button><div class="page-head"><div><h1>Significant Dates</h1><p>Business milestones, anniversaries, and annual dates.</p></div><button class="btn" data-add="significant_dates">+ Date</button></div><div class="panel crm-dates-list">${dates.length?`<table class="tbl"><thead><tr><th>Name</th><th>Date</th><th>Tags</th><th></th></tr></thead><tbody>${dates.map(d=>`<tr class="row"><td class="title-cell">${esc(d.name)}</td><td>${d.event_date?fmtDate(d.event_date):"—"}</td><td>${(d.tags||[]).map(t=>`<span class="tag">${esc(t)}</span>`).join("")}</td><td><div class="rowacts">${editDel("significant_dates",d.id)}</div></td></tr>`).join("")}</tbody></table>`:'<div class="crm-empty">No dates yet. Add your first.</div>'}</div>`;
}
