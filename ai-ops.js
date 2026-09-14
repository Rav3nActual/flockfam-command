/* FlockFam AI Operations — bounded automation with human approval where it matters. */
const AI_OPS_STAGES=[
  {
    no:"00",title:"Build the operating foundation",timing:"Do this first",budget:"$0",budgetLabel:"uses current tools",
    plain:"Before asking an agent to do work, give it the same basics you would give a new employee: the correct FlockFam information, a clear job, rules, access only to what it needs, and an exact definition of finished.",
    actions:[
      "<strong>Name one source of truth.</strong> Keep approved brand rules, products, offers, pilot numbers, decisions, and operating playbooks in controlled files. The master file points to them; it should not become an endless dumping ground.",
      "<strong>Write the job before choosing the tool.</strong> State the goal, why it matters, required inputs, allowed actions, forbidden actions, deliverable, deadline, definition of done, and approval point.",
      "<strong>Give minimum access.</strong> A reporting agent may read metrics but does not need permission to change prices. A content agent may draft posts but does not need permission to spend ad money.",
      "<strong>Create reusable SOPs only for recurring work.</strong> If the same process is explained repeatedly, document it with steps, examples, quality checks, and failure rules. One-off requests do not need a permanent playbook.",
      "<strong>Keep a decision log.</strong> Record important approvals, changes, assumptions, and the evidence behind them so a later session does not silently invent a different strategy.",
      "<strong>Separate observations from doctrine.</strong> New information enters a proposed-learnings queue. It becomes official FlockFam knowledge only after evidence review and human approval."
    ],
    deliverables:["Short system map","Controlled source-of-truth files","Agent Task Contract template","Approval and permission rules","Decision log","Proposed-learnings queue"],
    gate:"No recurring agent is activated until its task contract, allowed tools, forbidden actions, definition of done, and human approval point are written down.",
    warning:"More context is not always better. Loading every FlockFam detail into every task makes mistakes harder to spot."
  },
  {
    no:"01",title:"Start with read-and-draft assistants",timing:"First safe automation layer",budget:"$0",budgetLabel:"no pilot allocation change",
    plain:"The first useful agents should save research, organization, and reporting time without touching customers, publishing content, changing the store, or spending money.",
    actions:[
      "<strong>Weekly Pilot Reporter.</strong> Read Shopify, creator, content, and ad results; calculate the fixed scoreboard; flag missing data; and draft a one-page weekly report.",
      "<strong>Creator Pipeline Assistant.</strong> Find possible creators, apply the approved qualification criteria, tag activity and audience fit, identify conflicts, and draft personalized outreach for review.",
      "<strong>Asset Librarian.</strong> File UGC by creator, product, hook, date, format, performance, and rights; flag missing releases or unclear paid-usage permission.",
      "<strong>Inventory Watcher.</strong> Read stock and sales pace, estimate weeks of cover, and flag a possible four-week reorder threshold. It never places a purchase order.",
      "<strong>Store QA Assistant.</strong> Check product pages, links, mobile presentation, offer consistency, and tracking evidence; return an issue list without changing the live store.",
      "<strong>Field Intel Researcher.</strong> Collect and score outside ideas on the approved Tuesday/Friday cadence, while keeping sourced observations separate from FlockFam decisions."
    ],
    deliverables:["Drafts clearly labeled for review","Sources linked","Calculations reproducible","Missing information flagged","No external action taken","Short handoff stating what needs human judgment"],
    gate:"Advance a workflow only after its draft output is consistently accurate, useful, and faster to review than doing the work from scratch.",
    warning:"An AI-generated report is not proof that Shopify, an ad platform, a creator, or a customer actually did anything. Verify external facts."
  },
  {
    no:"02",title:"Add approval-gated workflows",timing:"After Stage 01 is reliable",budget:"$0",budgetLabel:"capacity—not a new expense",
    plain:"At this stage the agent can prepare a complete action, but you remain the final checkpoint. Think: ready for one-click approval, not acting behind your back.",
    actions:[
      "<strong>Creator outreach queue.</strong> Prepare approved prospects, draft messages, proposed relationship type, deal math, and follow-up dates. You approve the person, offer, and message before anything is sent.",
      "<strong>FLOCK DISPATCH queue.</strong> Turn approved topics and assets into platform-ready drafts, captions, links, and schedules. You approve the final post before publishing or scheduling.",
      "<strong>Weekly decision packet.</strong> Convert pilot data into continue, revise, pause, or stop recommendations, showing the numbers and assumptions behind each recommendation.",
      "<strong>Inventory alert packet.</strong> When stock crosses the approved threshold, prepare the sales pace, cash need, supplier readiness, and reorder recommendation for approval.",
      "<strong>Knowledge promotion request.</strong> Package a proposed learning with its source, evidence, affected rule, possible conflict, and exact wording change before it can enter canonical FlockFam files."
    ],
    deliverables:["Complete action package","Named approver","Visible assumptions","Preview of the exact external action","Audit trail of approval or rejection","Nothing executes on silence"],
    gate:"A human must be able to understand exactly what will happen, to whom, with what content, permissions, and cost before approving it.",
    warning:"Approval is meaningful only when the preview is complete. A vague ‘approve campaign’ button is not a real control."
  },
  {
    no:"03",title:"Allow narrow, limited execution",timing:"Only after repeated proof",budget:"Controlled",budgetLabel:"preapproved limits only",
    plain:"A proven workflow may execute routine steps inside a small, written box. The agent stops when it reaches a new person, new claim, new cost, unusual result, or anything outside that box.",
    actions:[
      "<strong>Define the lane.</strong> Specify approved recipients, templates, channels, time window, frequency, maximum volume, and exact stop conditions.",
      "<strong>Use approved inputs only.</strong> The agent may schedule an already approved post or send an already approved follow-up template; it may not invent a new public claim or creator offer.",
      "<strong>Log every action.</strong> Save the time, input, output, destination, result, and any error so the action can be audited.",
      "<strong>Escalate exceptions.</strong> Complaints, pricing questions, contract language, uncertain rights, abnormal metrics, tool errors, and ambiguous requests return to a human.",
      "<strong>Review and revoke.</strong> Check the workflow on a fixed cadence. Pause access immediately when quality slips, conditions change, or the permission is no longer needed."
    ],
    deliverables:["Written execution boundary","Volume and frequency cap","Automatic stop conditions","Complete action log","Exception queue","Regular human review"],
    gate:"Limited execution is allowed only when the same workflow has passed multiple human-reviewed cycles and a mistake would be easy to detect and reverse.",
    warning:"Successful drafting does not automatically earn permission to publish, message, edit, or spend. Each authority is granted separately."
  },
  {
    no:"04",title:"Keep high-risk decisions human",timing:"Permanent rule",budget:"Human only",budgetLabel:"never fully autonomous",
    plain:"Some work may be assisted by AI but should never be handed over completely because it can spend cash, bind the company, damage customer trust, erase information, or quietly change what FlockFam stands for.",
    actions:[
      "<strong>Money.</strong> Humans approve ad-budget changes, purchases, payments, refunds, discounts, and any movement of funds.",
      "<strong>Commitments.</strong> Humans approve creator fees, contracts, usage rights, exclusivity, supplier terms, and partnership promises.",
      "<strong>Store changes.</strong> Humans approve price, inventory, product, checkout, shipping, and promotion changes before they reach the live Shopify store.",
      "<strong>Public risk.</strong> Humans handle complaints, controversy, crisis responses, sensitive hunting content, legal claims, safety claims, and statements that could damage trust.",
      "<strong>FlockFam canon.</strong> Humans approve changes to brand strategy, customer definition, product doctrine, source-of-truth files, and permanent memory.",
      "<strong>Destructive work.</strong> Humans approve deletion, overwrite, account changes, access changes, and anything difficult to reverse."
    ],
    deliverables:["Human decision recorded","Supporting facts attached","Cost and downside visible","Final preview reviewed","Rollback or recovery path known"],
    gate:"If an action spends money, creates a legal or public commitment, changes live commerce, alters official FlockFam knowledge, or is difficult to reverse, a human approves it.",
    warning:"The goal is leverage with control—not replacing judgment or pretending software is accountable for the result."
  }
];

const AI_TASK_CONTRACT=[
  ["Goal","What finished business outcome is the agent responsible for?"],
  ["Why it matters","Which FlockFam priority or operating need does this support?"],
  ["Inputs","Which files, records, dates, products, people, and sources may it use?"],
  ["Allowed actions","Exactly what may it read, calculate, draft, organize, or execute?"],
  ["Forbidden actions","What may it never send, publish, edit, delete, promise, or spend?"],
  ["Deliverable","What exact file, report, queue, draft, or update must be returned?"],
  ["Definition of done","What objective checks prove the work is complete and correct?"],
  ["Approval gate","Who reviews it, and what must they see before approving?"],
  ["Failure rule","When must the agent stop, ask, retry, or roll back?"],
  ["Audit trail","Where are sources, calculations, approvals, and actions recorded?"]
];

function viewAIOps(){
  return `<section class="growth-pilot ai-ops"><div class="page-head"><div><h1>AI Operations</h1><p>A controlled system for using agents to increase FlockFam's capacity without handing them the keys.</p></div><div class="pilot-head-actions"><button class="btn ghost sm" data-pilot-collapse>Close all</button><button class="btn sm" data-pilot-expand>Open all</button></div></div>
    <div class="stat-grid"><div class="stat"><div class="lbl">Pilot Budget Impact</div><div class="val accent">$0</div><div class="sub">No new $10K allocation</div></div><div class="stat"><div class="lbl">First Mode</div><div class="val" style="font-size:20px;line-height:1.2;margin-top:9px">Read + draft</div><div class="sub">No external action</div></div><div class="stat"><div class="lbl">Core Control</div><div class="val" style="font-size:20px;line-height:1.2;margin-top:9px">Human gate</div><div class="sub">Before risk or commitment</div></div><div class="stat"><div class="lbl">Success Means</div><div class="val" style="font-size:20px;line-height:1.2;margin-top:9px">Work removed</div><div class="sub">Accurately and audibly</div></div></div>
    <div class="panel"><div class="pilot-purpose"><strong>The useful idea is an operating system—not an AI stunt.</strong><p>Chat answers a question. An agent owns a defined, multi-step result and repeats observe → think → act until the written definition of done is satisfied. For FlockFam, start with reporting, creator research, asset organization, inventory alerts, store QA, Field Intel, and draft queues. The $10K Growth Pilot strategy and budget stay unchanged.</p></div><div class="pilot-role-note"><strong>FlockFam rule:</strong> Automation earns authority one layer at a time: read → draft → prepare for approval → execute inside a narrow preapproved lane. Access to a tool is access to real authority, so permissions stay minimal and every important action remains reviewable.</div></div>
    <div class="pilot-stages">${AI_OPS_STAGES.map(pilotStageCard).join("")}</div>
    <div class="panel"><div class="panel-head"><h2>Agent Task Contract <span class="count">fill this in before activating one</span></h2></div><div class="pilot-score-wrap"><table class="pilot-score"><thead><tr><th>Field</th><th>Plain-English question</th></tr></thead><tbody>${AI_TASK_CONTRACT.map(x=>`<tr><td>${x[0]}</td><td>${x[1]}</td></tr>`).join("")}</tbody></table></div></div>
    <div class="panel"><div class="panel-head"><h2>Best First Agents <span class="count">useful to the current business</span></h2></div><div class="pilot-score-wrap"><table class="pilot-score"><thead><tr><th>Agent</th><th>Produces</th><th>May not do</th><th>Human gate</th></tr></thead><tbody>
      <tr><td>Weekly Pilot Reporter</td><td>Scoreboard, exceptions, and decision draft</td><td>Change spend or rewrite results</td><td>Owner verifies source numbers</td></tr>
      <tr><td>Creator Pipeline Assistant</td><td>Qualified prospects, tags, drafts, follow-ups</td><td>Send, promise terms, or approve creators</td><td>Owner approves person, offer, and message</td></tr>
      <tr><td>Asset Librarian</td><td>Searchable files and rights-status flags</td><td>Assume rights or publish assets</td><td>Owner verifies uncertain usage rights</td></tr>
      <tr><td>Inventory Watcher</td><td>Weeks-of-cover alert and reorder packet</td><td>Place orders or move money</td><td>Owner approves supplier and purchase</td></tr>
      <tr><td>Store QA Assistant</td><td>Mobile, link, offer, and tracking issue list</td><td>Edit the live store</td><td>Owner approves every storefront change</td></tr>
      <tr><td>Field Intel Researcher</td><td>Tuesday/Friday sourced intelligence brief</td><td>Convert outside claims into FF doctrine</td><td>Owner promotes accepted learnings</td></tr>
    </tbody></table></div></div>
    <div class="panel"><div class="panel-head"><h2>Knowledge Promotion Gate <span class="count">agents propose; FlockFam decides</span></h2></div><div class="pilot-budget">${[["1","Observe","Capture a fact or result"],["2","Propose","State the possible learning"],["3","Evidence","Attach source and confidence"],["4","Approve","Human accepts, revises, or rejects"],["5","Promote","Update the canonical file + log"]].map(x=>`<div class="pilot-budget-step"><div class="pilot-kicker">Step ${x[0]}</div><strong>${x[1]}</strong><span>${x[2]}</span></div>`).join("")}</div><div class="pilot-role-note"><strong>Never silent:</strong> No agent may automatically rewrite the brand strategy, customer definition, growth doctrine, or permanent memory because it found a new article or observed one unusual week.</div></div>
    <div class="panel"><div class="panel-head"><h2>Master-File Architecture <span class="count">implemented September 14, 2026</span></h2></div><div class="pilot-purpose"><strong>The master prompt is now a short FlockFam OS entry point.</strong><p>Stable context, active playbooks, external-source notes, decisions, and proposed learnings live in separate controlled modules. Load only the modules needed for the current goal. One canonical file controls each subject, and the complete pre-consolidation master remains preserved as a historical archive.</p></div><div class="pilot-example"><strong>Current structure:</strong> Context (brand, customer, products, operations) · Playbooks (Growth Pilot, creator engine, Field Intel, FLOCK DISPATCH) · Sources (OR-001 onward) · Decisions · Approved and proposed learnings · Archive. Future changes follow the decision log and Knowledge Promotion Gate.</div></div>
  </section>`;
}
