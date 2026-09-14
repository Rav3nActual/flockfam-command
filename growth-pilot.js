/* FlockFam Growth Pilot — fixed operating playbook for the first $10K growth test. */
const PILOT_STAGES=[
  {
    no:"00",title:"Know the numbers",timing:"Before money is released",budget:"$0",budgetLabel:"planning gate",
    plain:"Before buying products or ads, figure out how much money one order actually leaves behind. That number tells us the most we can afford to pay for a new customer without losing money on the first order.",
    actions:[
      "<strong>Choose the test assortment.</strong> Lock the exact two evergreen tees, one hat, and three to four patches that will represent FlockFam during the pilot.",
      "<strong>Calculate landed cost for every item.</strong> Include the product, printing or embroidery, inbound freight, packaging, and any duty—not just the blank garment.",
      "<strong>Calculate contribution profit per order.</strong> Start with the selling price, then subtract product cost, payment fees, the shipping amount FlockFam absorbs, and pick/pack cost.",
      "<strong>Set the break-even CAC.</strong> This is the contribution profit available before marketing. It becomes the ceiling for what we can pay to acquire one first-time customer.",
      "<strong>Create the weekly scoreboard.</strong> Record the same numbers every Monday so decisions come from evidence instead of how a post feels."
    ],
    deliverables:["One-page product and price list","Landed cost and margin for every test SKU","Break-even CAC target","Blank weekly scoreboard ready to use"],
    gate:"Do not place the inventory order until every test product has a known landed cost, retail price, contribution profit, and break-even CAC.",
    warning:"If these numbers are guesses, every later advertising result will also be a guess."
  },
  {
    no:"01",title:"Make the store ready to sell",timing:"Weeks 1–3",budget:"$3,500",budgetLabel:"maximum release",
    plain:"Give a new visitor a small but legitimate FlockFam collection to buy, then make sure the site clearly explains the products and completes a purchase cleanly on a phone.",
    actions:[
      "<strong>Order a shallow core assortment.</strong> Spend up to $2,500 on two evergreen tees, one hat, and three to four patches. Buy enough sizes to be credible, but keep the first run intentionally lean.",
      "<strong>Separate retail from creator stock.</strong> The $2,500 here is for customers. Products mailed to creators come from the Stage 02 creator budget so we do not quietly empty the store.",
      "<strong>Build complete product pages.</strong> Each page needs clear photos, fit and sizing, material, price, shipping information, the reason the product matters, and a visible add-to-cart button.",
      "<strong>Create one simple offer.</strong> Test an apparel-plus-patch bundle or another natural combination that raises order value without turning the brand into a discount store.",
      "<strong>Capture people who are not ready to buy.</strong> Add email signup, abandoned-cart email, order confirmation, and a basic post-purchase follow-up.",
      "<strong>Test the entire purchase path.</strong> On a phone, open a product, choose a size, add it to cart, apply the offer, pay, receive confirmation, and verify the order appears correctly.",
      "<strong>Verify tracking.</strong> Confirm Shopify records the visit, add-to-cart, checkout, purchase, order value, and traffic source before creator links or ads begin."
    ],
    costs:[["Core retail inventory","$2,500"],["Shopify / conversion work","$1,000"],["Stage total","$3,500"]],
    deliverables:["2 core tees, 1 hat, 3–4 patches available","Complete mobile product pages","One tested bundle or offer","Email capture and basic flows","Successful test order and verified tracking"],
    gate:"Move forward only when a stranger can find a stocked product in a normal size, understand it, and complete a tracked mobile purchase without help."
  },
  {
    no:"02",title:"Create the content engine",timing:"Weeks 2–6",budget:"$3,250",budgetLabel:"maximum release",
    plain:"UGC means creator-made photos or videos that feel native to TikTok and Reels. Seeding means mailing product to aligned people so they can experience it. A product-only seed does not guarantee a post; paid UGC has agreed deliverables.",
    actions:[
      "<strong>Write a one-page creator brief.</strong> Explain FlockFam, the audience, the specific product, allowed claims, required shots, video format, deadline, and three suggested opening hooks. Give direction without scripting away the creator's natural voice.",
      "<strong>Build a list of 50 possible creators.</strong> Focus on hikers, runners, hunters, campers, anglers, overlanders, and outdoors parents with roughly 2K–50K followers. Brand fit matters more than follower count.",
      "<strong>Contact about 30.</strong> Offer the right relationship: product-only seeding, paid UGC, affiliate commission, or a combination. Never imply that free product guarantees a post unless that is agreed in writing.",
      "<strong>Seed 15–20 product-only creators.</strong> Include a personal note, the product, a simple brief, a unique link or discount code, and a clear contact for questions.",
      "<strong>Hire about six paid UGC creators.</strong> At roughly $200 each, require at least two usable vertical videos, raw clips when possible, a deadline, one reasonable revision, and written permission for FlockFam to reuse the content in ads.",
      "<strong>Fill visual gaps.</strong> Use the separate $750 production allowance only for missing product-page photos, a local lifestyle shoot, editing, props, or travel that creator content does not cover.",
      "<strong>Organize every asset.</strong> File by creator, product, hook, date, organic-post link, usage rights, and performance so winning concepts can be found and reused."
    ],
    costs:[["Product + packaging for 15–20 seeds","$650"],["6 paid creators × about $200","$1,200"],["Shipping, reships, and handling","$350"],["Usage, revisions, or performance bonuses","$300"],["Photo/video production gaps","$750"],["Stage total","$3,250"]],
    deliverables:["50-person prospect list","About 30 outreach messages","15–20 product-only seeds","6 paid creator agreements","At least 12 guaranteed usable videos","Target of 20–30 total usable clips plus photos"],
    gate:"Do not buy ads until at least 12 good vertical videos are delivered, reuse rights are documented, and the library covers at least three different hooks or story angles.",
    warning:"A free shirt is not payment for unlimited ad rights. Get the deliverables and reuse permission in writing before shipping."
  },
  {
    no:"03",title:"Find organic winners",timing:"Weeks 5–8",budget:"$0",budgetLabel:"uses Stage 02 assets",
    plain:"Post the creator content without ad spend first. The goal is to learn which opening line, person, product, and story make people stop, watch, click, and shop.",
    actions:[
      "<strong>Post three to five vertical videos each week.</strong> Adapt them for TikTok and Instagram Reels. Do not dump the whole library at once; give each concept room to produce a useful signal.",
      "<strong>Change one major variable at a time.</strong> Test the hook, creator, product angle, or edit. If everything changes at once, we will not know what caused the result.",
      "<strong>Track response after 24 hours and seven days.</strong> Record reach, three-second hold, average watch time, shares, saves, profile visits, site clicks, add-to-carts, and purchases.",
      "<strong>Reply and learn.</strong> Questions and objections in comments become the next videos, product-page answers, or offer improvements.",
      "<strong>Name the winners.</strong> Compare every video with FlockFam's own recent baseline. A winner should rank near the top for attention and show shopping intent—not merely collect views."
    ],
    deliverables:["2–3 weeks of consistent organic testing","Results logged by creative and hook","Three strongest creative concepts identified","Customer questions added to product pages or new content"],
    gate:"Release ad money only when at least three pieces rank in the top group of FlockFam posts and generate a meaningful downstream action such as profile visits, site clicks, add-to-carts, or sales.",
    warning:"If nothing wins organically, make new hooks and edits. Paid ads make a weak message spend money faster; they do not repair it."
  },
  {
    no:"04",title:"Run the paid acquisition test",timing:"Weeks 7–12",budget:"$2,000",budgetLabel:"media spend only",
    plain:"Paid acquisition means paying a platform to show proven content to people who do not already know FlockFam. We are testing whether that attention turns into first-time customers at an acceptable cost.",
    actions:[
      "<strong>Choose one primary platform first.</strong> Use TikTok Spark Ads when the winning post is native TikTok creator content, or Meta when Reels/Instagram data is stronger. Do not scatter $2,000 across TikTok, Meta, and Google at the same time.",
      "<strong>Send each ad to the matching product.</strong> A performance-tee video should land on that product or its focused collection—not the generic homepage.",
      "<strong>Round A — $400.</strong> Test four proven creatives at about $20 per day for five days. Confirm purchases and revenue match Shopify before making decisions.",
      "<strong>Round B — $600.</strong> Pause obvious losers. Put the next $600 behind the best two or three creative-and-product combinations.",
      "<strong>Round C — $750.</strong> Put the largest block behind the one or two combinations closest to or below break-even CAC.",
      "<strong>Retargeting — up to $250.</strong> Show a useful reminder or different proof point to visitors who viewed products or added to cart but did not buy.",
      "<strong>Read the failure correctly.</strong> Low clicks usually point to creative. Good clicks but few add-to-carts point to the product page or offer. Add-to-carts without purchases point to price, shipping, trust, or checkout friction.",
      "<strong>Stop by rule, not emotion.</strong> Pause a test after it spends about 1.5 times the break-even CAC without a purchase, unless the sample is too small to read."
    ],
    costs:[["Round A: four-creative test","$400"],["Round B: best 2–3 combinations","$600"],["Round C: best 1–2 combinations","$750"],["Retargeting allowance","$250"],["Stage total","$2,000"]],
    deliverables:["One primary ad platform tested","4 initial creatives reduced to 1–2 winners","Shopify and platform revenue reconciled","CAC and conversion rate by creative/product","Clear stop, fix, or scale decision"],
    gate:"A scalable signal is at least one creative-and-product combination producing multiple first-time purchases at or below the break-even CAC. If that does not happen, stop and diagnose before spending the reserve."
  },
  {
    no:"05",title:"Back the winner—or keep the cash",timing:"Weeks 10–16",budget:"$1,250",budgetLabel:"held reserve",
    plain:"This money has no job until the pilot produces evidence. It is there to prevent a winning product from selling out, create more of a winning content angle, or extend an ad that is acquiring customers economically.",
    actions:[
      "<strong>Check inventory first.</strong> If the winning product or key sizes have less than roughly four weeks of stock at the new sales pace, reorder before increasing traffic.",
      "<strong>Refresh the winning idea.</strong> Spend $250–$500 on new versions of the best hook with another creator, location, or opening shot so the ad does not burn out.",
      "<strong>Add media only when the math holds.</strong> Increase spend gradually while CAC remains at or below the pilot threshold and fulfillment can keep up.",
      "<strong>Keep unneeded money unspent.</strong> If no product/content combination works, preserve the reserve and write down what the test ruled out.",
      "<strong>Prepare the pilot report.</strong> Show exactly where the $10,000 went, what sold, what did not, the winning creative, CAC, conversion, average order value, repeat buyers, and the next funding request tied to evidence."
    ],
    costs:[["Winner reorder, new winning creative, or proven media","Up to $1,250"],["Required spend","$0"],["Maximum stage total","$1,250"]],
    deliverables:["Reserve decision documented","Winning SKU protected from stockout","Fresh version of winning content if needed","90–120 day pilot report","Specific next-capital recommendation"],
    gate:"The pilot is complete when we can clearly say: scale, revise and retest, or stop. The win is a reliable decision—not forcing the entire $10,000 out the door."
  }
];

const PILOT_TERMS=[
  ["Core assortment","The small group of evergreen FlockFam products that should normally stay available. Limited drops create urgency; core products make the store buyable every day."],
  ["UGC","User-generated content: photos or videos made by customers or creators in a natural social style. In this plan, some UGC is organic and some is commissioned and paid."],
  ["Creator seeding","Sending product to carefully chosen creators so they can try it. Product-only seeding is not a guaranteed post unless a post was explicitly agreed."],
  ["Paid UGC","Content FlockFam commissions for a fee with agreed deliverables. The creator may make the asset for FlockFam without posting it to their own audience."],
  ["Usage rights","Written permission describing where and how long FlockFam may reuse a creator's photo or video, especially in paid advertising."],
  ["Hook","The first idea, line, or visual that earns attention—usually the first one to three seconds of a short video."],
  ["Creative","The actual ad asset people see: the video, image, headline, caption, or combination of them."],
  ["PDP","Product detail page: the page for one product, including its photos, copy, price, sizes, shipping information, reviews, and add-to-cart button."],
  ["CRO","Conversion-rate optimization: improving the store so a larger share of visitors complete a purchase. It includes clarity, trust, speed, offer, product pages, and checkout—not merely making the site prettier."],
  ["Conversion rate","Orders divided by website sessions. Example: 20 orders from 1,000 sessions equals a 2% conversion rate."],
  ["AOV","Average order value: total revenue divided by number of orders. $1,100 from 20 orders equals a $55 AOV."],
  ["CAC","Customer acquisition cost: acquisition spend divided by new customers. $500 in ads that produces 20 new customers equals a $25 CAC."],
  ["Contribution profit","What remains from an order after product cost, payment fees, shipping absorbed by FlockFam, and fulfillment. It is the money available to cover marketing and business overhead."],
  ["Break-even CAC","The most FlockFam can spend to acquire a first order before that first order becomes unprofitable. For this pilot, use contribution profit per order as the starting ceiling."],
  ["ROAS","Return on ad spend: revenue directly attributed to ads divided by ad spend. $1,000 attributed revenue from $500 in ads is 2.0× ROAS. It does not account for product costs."],
  ["MER","Marketing efficiency ratio: total business revenue divided by total marketing spend. It gives a broader view than platform-reported ROAS."],
  ["Retargeting","Advertising to people who already visited, viewed a product, or added to cart but did not purchase."],
  ["Affiliate","A creator earns an agreed commission when a tracked link or code produces a sale. This reduces up-front risk but does not guarantee content or volume."]
];

function pilotStageCard(s,index){
  const costs=s.costs?`<div class="pilot-mini-card"><h3>Budget plan</h3>${s.costs.map(c=>`<div class="pilot-cost-row"><span>${c[0]}</span><strong>${c[1]}</strong></div>`).join("")}</div>`:"";
  return `<details class="pilot-stage" ${index===0?"open":""}>
    <summary><span class="pilot-stage-no">${s.no}</span><span class="pilot-stage-title"><strong>${s.title}</strong><span>${s.timing}</span></span><span class="pilot-stage-meta"><strong>${s.budget}</strong><span>${s.budgetLabel}</span></span><span class="pilot-chevron">+</span></summary>
    <div class="pilot-stage-body"><div class="pilot-plain"><div class="pilot-label">Plain-English version</div><p>${s.plain}</p></div>
      <div class="pilot-columns"><div><div class="pilot-section-title">Exactly what to do</div><ol class="pilot-actions">${s.actions.map(a=>`<li>${a}</li>`).join("")}</ol></div>
      <aside>${costs}<div class="pilot-mini-card"><h3>Definition of done</h3><ul>${s.deliverables.map(d=>`<li>${d}</li>`).join("")}</ul></div></aside></div>
      <div class="pilot-gate"><strong>Decision gate</strong><p>${s.gate}</p></div>${s.warning?`<div class="pilot-warning"><strong>Watch-out:</strong> ${s.warning}</div>`:""}
    </div></details>`;
}

function viewGrowthPilot(){
  return `<section class="growth-pilot"><div class="page-head"><div><h1>$10K Growth Pilot</h1><p>A 90–120 day test to prove FlockFam can turn new people into profitable customers.</p></div><div class="pilot-head-actions"><button class="btn ghost sm" data-pilot-collapse>Close all</button><button class="btn sm" data-pilot-expand>Open all</button></div></div>
    <div class="stat-grid"><div class="stat"><div class="lbl">Total Capital</div><div class="val accent">$10K</div><div class="sub">Maximum—not a spending quota</div></div><div class="stat"><div class="lbl">Pilot Length</div><div class="val">90–120</div><div class="sub">Days to a scale / revise / stop decision</div></div><div class="stat"><div class="lbl">Creator Target</div><div class="val">21–26</div><div class="sub">15–20 seeded + about 6 paid</div></div><div class="stat"><div class="lbl">Primary Question</div><div class="val" style="font-size:20px;line-height:1.2;margin-top:9px">Can we acquire?</div><div class="sub">New customers at workable economics</div></div></div>
    <div class="panel"><div class="pilot-purpose"><strong>This is proof money, not scale money.</strong><p>The goal is not to make FlockFam huge in four months. It is to make the store buyable, create enough real outdoor content to find a message that connects, test that message with paid traffic, and leave with numbers strong enough to justify—or reject—a larger second investment.</p></div><div class="pilot-budget">${[["Store ready","$3,500","inventory + Shopify"],["Content ready","$3,250","creators + production"],["Organic proof","$0","find the winners"],["Paid test","$2,000","media spend"],["Winner reserve","$1,250","reorder or scale"]].map((x,i)=>`<div class="pilot-budget-step"><div class="pilot-kicker">Release ${i+1}</div><strong>${x[1]}</strong><span>${x[0]} · ${x[2]}</span></div>`).join("")}</div><div class="pilot-role-note"><strong>Who handles it:</strong> FlockFam owns product choice, creator approval, fulfillment, brand direction, and the weekly numbers. Creators make the content. A Shopify freelancer can be paid from the $1,000 store allowance if technical help is needed. The $2,000 paid-test budget is ad spend—not an agency fee. No full-service agency or monthly retainer is included in this pilot.</div></div>
    <div class="pilot-stages">${PILOT_STAGES.map(pilotStageCard).join("")}</div>
    <div class="panel"><div class="panel-head"><h2>Weekly Scoreboard <span class="count">same numbers every Monday</span></h2></div><div class="pilot-score-wrap"><table class="pilot-score"><thead><tr><th>Metric</th><th>What it answers</th><th>Formula / source</th><th>Why it matters</th></tr></thead><tbody>
      <tr><td>Sessions</td><td>How many visits reached the store?</td><td>Shopify analytics</td><td>Shows traffic volume.</td></tr><tr><td>Orders</td><td>How many purchases happened?</td><td>Shopify orders</td><td>The outcome that matters.</td></tr><tr><td>Conversion rate</td><td>Did the store turn visits into orders?</td><td>Orders ÷ sessions</td><td>Separates a traffic problem from a store problem.</td></tr><tr><td>AOV</td><td>How much is an average order?</td><td>Revenue ÷ orders</td><td>Bundles and patches can lift this.</td></tr><tr><td>New customers</td><td>Are strangers buying?</td><td>Shopify customer type</td><td>The central pilot question.</td></tr><tr><td>Marketing spend</td><td>What did acquisition cost this week?</td><td>Creator fees + media used for acquisition</td><td>Keeps true cost visible.</td></tr><tr><td>CAC</td><td>What did each new customer cost?</td><td>Acquisition spend ÷ new customers</td><td>Compare with break-even CAC.</td></tr><tr><td>Email signups</td><td>Did we retain interested non-buyers?</td><td>Email platform</td><td>Creates an audience FlockFam owns.</td></tr><tr><td>Content output</td><td>Is the creator engine producing?</td><td>Usable assets received and posted</td><td>Prevents paying for vague “exposure.”</td></tr>
    </tbody></table></div><div class="pilot-example"><strong>Worked example:</strong> If AOV is $55 and product, payment, shipping, and fulfillment costs total $25, the contribution profit is $30. A starting break-even CAC is therefore about $30. If paid media acquires a new customer for $20, the first order leaves about $10 before overhead. Repeat purchases would improve that customer's value further.</div></div>
    <div class="panel"><div class="panel-head"><h2>Plain-English Glossary <span class="count">tap any term</span></h2></div><div class="pilot-glossary">${PILOT_TERMS.map(t=>`<details class="pilot-term"><summary>${t[0]}</summary><p>${t[1]}</p></details>`).join("")}</div></div>
  </section>`;
}

function bindGrowthPilot(){
  const root=document.querySelector(".growth-pilot");if(!root)return;
  const stages=()=>[...root.querySelectorAll(".pilot-stage")];
  const open=root.querySelector("[data-pilot-expand]");if(open)open.onclick=()=>stages().forEach(x=>x.open=true);
  const close=root.querySelector("[data-pilot-collapse]");if(close)close.onclick=()=>stages().forEach(x=>x.open=false);
}
