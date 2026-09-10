const PAYABLE_TABLES=["payables","payable_payments"];
const PAYABLES={selected:null,filter:"Open"};

function payableCents(value){
  const text=String(value??"0");
  if(!/^\d+(\.\d{1,2})?$/.test(text))throw new Error("Enter an amount with no more than two decimal places.");
  const [whole,fraction=""]=text.split(".");
  const cents=Number(whole)*100+Number(fraction.padEnd(2,"0"));
  if(!Number.isSafeInteger(cents))throw new Error("The amount is too large.");
  return cents;
}
function payableMoney(cents){return (cents/100).toLocaleString(undefined,{style:"currency",currency:"USD"});}
function payableSummary(p){
  const original=payableCents(p.original_amount);
  const paid=DATA.payable_payments.filter(x=>x.payable_id===p.id).reduce((sum,x)=>sum+payableCents(x.amount),0);
  const remaining=original-paid;
  return {original,paid,remaining,status:remaining===0?"Paid":paid>0?"Partially paid":"Open",overdue:remaining>0&&!!p.due_date&&p.due_date<crmToday()};
}
function payableTotals(){
  const rows=DATA.payables.map(p=>({p,...payableSummary(p)}));
  return {rows,total:rows.reduce((sum,r)=>sum+r.remaining,0),open:rows.filter(r=>r.remaining>0),overdue:rows.filter(r=>r.overdue)};
}
function payablesHaveErrors(){return PAYABLE_TABLES.some(t=>DATA_ERRORS[t]);}
function payablesError(){return '<div class="crm-error" role="alert"><p>Payables couldn’t be loaded completely. Refresh before making changes.</p><button class="btn sm" data-payables-refresh>Refresh payables</button></div>';}
function payableStatus(s){return `<span class="crm-status payables-status ${s==="Paid"?"complete":""}">${esc(s)}</span>`;}
function viewPayables(){
  if(payablesHaveErrors())return `<section class="payables-root"><div class="page-head"><h1>Payables</h1></div>${payablesError()}</section>`;
  const selected=DATA.payables.find(p=>p.id===PAYABLES.selected);
  if(selected)return payableDetail(selected);
  PAYABLES.selected=null;
  const totals=payableTotals();
  const rows=totals.rows.filter(r=>PAYABLES.filter==="All"||PAYABLES.filter==="Paid"&&r.remaining===0||PAYABLES.filter==="Open"&&r.remaining>0||PAYABLES.filter==="Overdue"&&r.overdue)
    .sort((a,b)=>(a.p.due_date||"9999").localeCompare(b.p.due_date||"9999")||a.p.payee.localeCompare(b.p.payee));
  let h=`<section class="payables-root"><div class="page-head"><div><h1>Payables</h1><p>Inventory funding, outstanding balances, and repayments.</p></div><div class="crm-actions"><button class="btn ghost sm" data-payables-refresh>Refresh</button><button class="btn" data-payable-new>+ Payable</button></div></div>
  <div class="stat-grid payables-stats"><div class="stat"><div class="lbl">Outstanding balance</div><div class="val accent">${payableMoney(totals.total)}</div><div class="sub">USD · remaining to repay</div></div><div class="stat"><div class="lbl">Open balances</div><div class="val">${totals.open.length}</div><div class="sub">Includes partially paid items</div></div><div class="stat"><div class="lbl">Overdue</div><div class="val ${totals.overdue.length?"red":""}">${payableMoney(totals.overdue.reduce((sum,r)=>sum+r.remaining,0))}</div><div class="sub">${totals.overdue.length} past due</div></div></div>
  <div class="payables-toolbar"><label for="payablesFilter">Show</label><select class="statussel" id="payablesFilter">${["Open","Paid","Overdue","All"].map(f=>`<option ${f===PAYABLES.filter?"selected":""}>${f}</option>`).join("")}</select><span class="muted">${rows.length} ${rows.length===1?"payable":"payables"}</span></div>`;
  if(!rows.length)return h+`<div class="panel crm-empty"><strong>${DATA.payables.length?"No matching payables":"No payables yet"}</strong><p>${DATA.payables.length?"Change the filter to see other balances.":"Add someone who covered inventory or another expense, then record repayments as you make them."}</p><button class="btn sm" data-payable-new>+ Payable</button></div></section>`;
  h+='<div class="panel payables-table-wrap"><table class="tbl payables-table"><thead><tr><th>Payee / purpose</th><th>Original</th><th>Repaid</th><th>Remaining</th><th>Due</th><th>Status</th><th></th></tr></thead><tbody>';
  rows.forEach(r=>{
    const p=r.p;
    h+=`<tr class="row"><td><button class="payables-name" data-payable-open="${p.id}">${esc(p.payee)}</button><div class="payables-purpose">${esc(p.purpose)}</div></td><td class="money" data-label="Original">${payableMoney(r.original)}</td><td class="money" data-label="Repaid">${payableMoney(r.paid)}</td><td class="money" data-label="Remaining"><strong>${payableMoney(r.remaining)}</strong></td><td data-label="Due" class="${r.overdue?"overdue":"muted"}">${p.due_date?fmtDate(p.due_date):"No fixed date"}</td><td data-label="Status">${payableStatus(r.status)}</td><td><button class="btn ghost sm" data-payable-open="${p.id}">View</button></td></tr>`;
  });
  return h+'</tbody></table></div></section>';
}
function payableDetail(p){
  const s=payableSummary(p),contact=DATA.influencers.find(c=>c.id===p.contact_id);
  const payments=DATA.payable_payments.filter(x=>x.payable_id===p.id).sort((a,b)=>b.paid_on.localeCompare(a.paid_on)||b.created_at.localeCompare(a.created_at));
  return `<section class="payables-root"><button class="btn ghost sm crm-back" data-payables-home>← Back to payables</button><div class="page-head"><div><h1>${esc(p.payee)}</h1><p>${esc(p.purpose)}</p></div><button class="btn sm" data-payable-edit="${p.id}">Edit payable</button></div><div class="payables-detail"><div><div class="panel"><div class="crm-profile"><div class="crm-section-label">Remaining balance · USD</div><div class="payables-balance ${s.remaining===0?"paid":""}">${payableMoney(s.remaining)}</div>${payableStatus(s.status)}<div class="payables-numbers"><div><span>Original amount</span><strong>${payableMoney(s.original)}</strong></div><div><span>Repaid so far</span><strong>${payableMoney(s.paid)}</strong></div></div><dl class="payables-details"><dt>Incurred</dt><dd>${fmtDate(p.incurred_on)}</dd><dt>Due</dt><dd class="${s.overdue?"overdue":""}">${p.due_date?fmtDate(p.due_date):"No fixed date"}</dd><dt>Repayment</dt><dd>${esc(p.repayment_terms)||"No terms noted"}</dd><dt>CRM contact</dt><dd>${contact?`<button class="iconbtn" data-crm-open="${contact.id}">${esc(contact.person_name)}</button>`:"Not linked"}</dd></dl>${p.notes?`<div class="crm-section-label">Notes</div><p class="crm-copy">${esc(p.notes)}</p>`:""}</div></div><div class="crm-footer-delete"><button class="iconbtn danger" data-payable-delete="${p.id}">Delete payable</button></div></div>
  <div class="panel"><div class="panel-head"><h2>Payment history <span class="count">${payments.length}</span></h2>${s.remaining>0?`<button class="btn sm" data-payment-new="${p.id}">+ Add payment</button>`:""}</div>${payments.length?payments.map(x=>`<article class="crm-entry"><div class="payables-payment"><strong>${payableMoney(payableCents(x.amount))}</strong><time>${fmtDate(x.paid_on)}</time></div>${x.notes?`<p class="crm-copy">${esc(x.notes)}</p>`:""}<div class="crm-actions"><button class="iconbtn" data-payment-edit="${x.id}">Edit</button><button class="iconbtn danger" data-payment-delete="${x.id}">Delete</button></div></article>`).join(""):'<div class="crm-empty"><strong>No payments recorded</strong><p>Add a payment after you’ve made a repayment. The balance updates automatically.</p></div>'}</div></div></section>`;
}
function payablesOverview(){
  if(payablesHaveErrors())return payablesError();
  const totals=payableTotals();
  const due=totals.open.filter(r=>r.p.due_date).sort((a,b)=>a.p.due_date.localeCompare(b.p.due_date)).slice(0,3);
  return `<div class="panel"><div class="panel-head"><h2>Outstanding Balances</h2><button class="btn ghost sm" data-payables-home>Open Payables</button></div><div class="payables-overview"><div><div class="payables-balance">${payableMoney(totals.total)}</div><p>${totals.open.length} open ${totals.open.length===1?"balance":"balances"}${totals.overdue.length?` · <span class="overdue">${totals.overdue.length} overdue</span>`:""}</p></div><div>${due.length?due.map(r=>`<button class="crm-due-row" data-payable-open="${r.p.id}"><span><strong>${esc(r.p.payee)} · ${payableMoney(r.remaining)}</strong><small>${esc(r.p.purpose)}</small></span><time class="${r.overdue?"overdue":""}">${fmtDate(r.p.due_date)}</time></button>`).join(""):`<p>${totals.open.length?"No fixed repayment dates. Check Payables for repayment terms.":"No outstanding balances."}</p>`}</div></div></div>`;
}
function mergePayableRow(table,row){const i=DATA[table].findIndex(x=>x.id===row.id);if(i<0)DATA[table].push(row);else DATA[table][i]=row;}
async function payableWrite(values,original,id){
  let q=original?sb.from("payables").update(values).eq("id",original.id).eq("updated_at",original.updated_at):sb.from("payables").insert({id,...values});
  const {data,error}=await q.select("*").maybeSingle();
  if(error)throw new Error(error.code==="23505"?"This payable may already have saved. Close the form and refresh before adding it again.":error.message);
  if(!data)throw new Error("This payable changed. Close the form and refresh before editing.");
  mergePayableRow("payables",data);PAYABLES.selected=data.id;
}
function editPayable(row){
  const id=row?.id||crypto.randomUUID();
  const contactOptions=[{value:"",label:"No linked contact"},...DATA.influencers.slice().sort((a,b)=>a.person_name.localeCompare(b.person_name)).map(c=>({value:c.id,label:c.person_name}))];
  crmDialog({title:row?"Edit payable":"New payable",submitLabel:row?"Save payable":"Add payable",values:row||{incurred_on:crmToday()},fields:[
    {key:"payee",label:"Payee / person or company",required:true,maxLength:300},
    {key:"contact_id",label:"Link CRM contact (optional)",type:"select",options:contactOptions},
    {key:"purpose",label:"Item / purpose",required:true,wide:true,placeholder:"Inventory or expense they covered"},
    {key:"original_amount",label:"Original amount (USD)",type:"number",min:.01,required:true},
    {key:"incurred_on",label:"Date incurred",type:"date",required:true},
    {key:"due_date",label:"Due date (optional)",type:"date"},
    {key:"repayment_terms",label:"Repayment timing / terms",placeholder:"For example, as inventory sells"},
    {key:"notes",label:"Notes",type:"textarea",wide:true}
  ],onSave:values=>{
    const amount=payableCents(values.original_amount);
    if(amount<=0)throw new Error("Original amount must be greater than zero.");
    if(row&&amount<payableSummary(row).paid)throw new Error("Original amount cannot be less than payments already recorded.");
    return payableWrite({...values,original_amount:(amount/100).toFixed(2)},row,id);
  }});
}
function editPayablePayment(payable,row){
  const id=row?.id||crypto.randomUUID();
  const max=payableSummary(payable).remaining+(row?payableCents(row.amount):0);
  crmDialog({title:row?"Edit payment":`Payment · ${payable.payee}`,submitLabel:row?"Save payment":"Record payment",intro:"Record a repayment you’ve already made.",values:row||{paid_on:crmToday()},fields:[
    {key:"amount",label:"Amount paid (USD)",type:"number",min:.01,max:max/100,required:true,help:`Available balance: ${payableMoney(max)}`},
    {key:"paid_on",label:"Payment date",type:"date",required:true},
    {key:"notes",label:"Notes / reference (optional)",type:"textarea",wide:true}
  ],onSave:async values=>{
    const amount=payableCents(values.amount);if(amount<=0||amount>max)throw new Error("Enter a payment within the remaining balance.");
    const {data,error}=await sb.rpc("save_payable_payment",{p_id:id,p_payable_id:payable.id,p_amount:(amount/100).toFixed(2),p_paid_on:values.paid_on,p_notes:values.notes,p_expected_updated_at:row?.updated_at||null});
    if(error)throw new Error(error.message);if(!data?.payment||!data?.payable)throw new Error("Couldn’t confirm this payment. Please try again.");
    mergePayableRow("payable_payments",data.payment);mergePayableRow("payables",data.payable);
  }});
}
function deletePayable(p){
  crmDialog({title:`Delete payable to ${p.payee}?`,submitLabel:"Delete payable",danger:true,intro:"This permanently deletes this payable and its entire payment history.",onSave:async()=>{
    const {data,error}=await sb.from("payables").delete().eq("id",p.id).eq("updated_at",p.updated_at).select("id").maybeSingle();
    if(error)throw new Error(error.message);if(!data)throw new Error("This payable changed. Close the form and refresh before deleting.");
    DATA.payables=DATA.payables.filter(x=>x.id!==p.id);DATA.payable_payments=DATA.payable_payments.filter(x=>x.payable_id!==p.id);PAYABLES.selected=null;
  }});
}
function deletePayablePayment(row){
  crmDialog({title:"Delete recorded payment?",submitLabel:"Delete payment",danger:true,intro:`Removing this ${payableMoney(payableCents(row.amount))} payment increases the remaining balance.`,onSave:async()=>{
    const {data,error}=await sb.rpc("delete_payable_payment",{p_id:row.id,p_expected_updated_at:row.updated_at});
    if(error)throw new Error(error.message);if(!data?.deleted_id||!data?.payable)throw new Error("Couldn’t confirm deletion. Refresh to check the payment history.");
    DATA.payable_payments=DATA.payable_payments.filter(x=>x.id!==data.deleted_id);mergePayableRow("payables",data.payable);
  }});
}
function goPayables(id=null){
  PAYABLES.selected=id;VIEW="payables";
  document.querySelectorAll("#nav button").forEach(b=>b.classList.toggle("active",b.dataset.view===VIEW));
  $("#sidebar").classList.remove("open");render();window.scrollTo({top:0,behavior:"instant"});
}
function bindPayables(){
  const bind=(selector,fn)=>document.querySelectorAll(selector).forEach(b=>b.onclick=()=>fn(b));
  bind("[data-payables-home]",()=>goPayables());
  bind("[data-payable-open]",b=>goPayables(b.dataset.payableOpen));
  bind("[data-payable-new]",()=>editPayable());
  bind("[data-payable-edit]",b=>editPayable(DATA.payables.find(p=>p.id===b.dataset.payableEdit)));
  bind("[data-payable-delete]",b=>deletePayable(DATA.payables.find(p=>p.id===b.dataset.payableDelete)));
  bind("[data-payment-new]",b=>editPayablePayment(DATA.payables.find(p=>p.id===b.dataset.paymentNew)));
  bind("[data-payment-edit]",b=>{const row=DATA.payable_payments.find(p=>p.id===b.dataset.paymentEdit);editPayablePayment(DATA.payables.find(p=>p.id===row.payable_id),row);});
  bind("[data-payment-delete]",b=>deletePayablePayment(DATA.payable_payments.find(p=>p.id===b.dataset.paymentDelete)));
  bind("[data-payables-refresh]",async b=>{b.disabled=true;b.textContent="Refreshing…";await loadAll();});
  const filter=$("#payablesFilter");if(filter)filter.onchange=()=>{PAYABLES.filter=filter.value;render();$("#payablesFilter").focus();};
}
