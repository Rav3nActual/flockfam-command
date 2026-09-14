/* FlockFam Growth Pilot — fixed operating playbook for the first $10K growth test. */
const PILOT_STAGES=[
  {
    no:"00",title:"Know the numbers",timing:"Before money is released",budget:"$0",budgetLabel:"planning gate",
    plain:"Before buying products or ads, build one simple profit ladder. Start with what the customer paid, make every discount and cost visible, and calculate what one order actually leaves behind. That tells us what FlockFam can afford to pay for a new customer.",
    actions:[
      "<strong>Choose the test assortment.</strong> Lock the exact two evergreen tees, one hat, and three to four patches that will represent FlockFam during the pilot.",
      "<strong>Calculate landed cost for every item.</strong> Include the product, printing or embroidery, inbound freight, packaging, and any duty—not just the blank garment.",
      "<strong>Track gross-to-net.</strong> Gross sales are the full ticket prices. Net sales are what remains after discounts, refunds, returns, and allowances. Keep that leakage visible instead of celebrating a top-line number FlockFam did not keep.",
      "<strong>Calculate CM1.</strong> Net sales minus landed product cost—COGS plus inbound freight—equals Contribution Margin 1. Track both dollars and percentage every week to see whether the products themselves have healthy economics.",
      "<strong>Calculate CM2 / order contribution.</strong> From CM1, subtract outbound shipping absorbed by FlockFam, fulfillment or pick/pack, and payment fees. This is the practical amount left before acquisition spend and general overhead.",
      "<strong>Set the break-even CAC.</strong> Use CM2 per first order as the pilot's starting ceiling for what FlockFam can pay to acquire one new customer without losing money before overhead.",
      "<strong>Create the weekly scoreboard.</strong> Record the same numbers every Monday so decisions come from evidence instead of how a post feels."
    ],
    deliverables:["One-page product and price list","Gross-to-net, CM1, and CM2 definitions fixed","Landed cost and margin for every test SKU","Break-even CAC target","Blank weekly scoreboard ready to use"],
    gate:"Do not place the inventory order until every test product has a known landed cost, retail price, CM1, CM2/order contribution, and break-even CAC.",
    warning:"If these numbers are guesses, every later advertising result will also be a guess."
  },
  {
    no:"01",title:"Make the store ready to sell",timing:"Weeks 1–3",budget:"$3,500",budgetLabel:"maximum release",
    plain:"Give a new visitor a small but legitimate FlockFam collection to buy, then make sure the site clearly explains the products and completes a purchase cleanly on a phone.",
    actions:[
      "<strong>Order a shallow core assortment.</strong> Spend up to $2,500 on two evergreen tees, one hat, and three to four patches. Buy enough sizes to be credible, but keep the first run intentionally lean.",
      "<strong>Run every proposed SKU through the FlockFam Product Gate.</strong> It must (1) fit the brand, (2) be meaningfully better or more desirable than the current option, (3) meet the required CM1 margin, and (4) be priced appropriately for the channel and customer. If one answer is no, revise it or do not fund it.",
      "<strong>Separate retail from creator stock.</strong> The $2,500 here is for customers. Products mailed to creators come from the Stage 02 creator budget so we do not quietly empty the store.",
      "<strong>Build complete product pages.</strong> Each page needs clear photos, fit and sizing, material, price, shipping information, the reason the product matters, and a visible add-to-cart button.",
      "<strong>Create one simple offer.</strong> Test an apparel-plus-patch bundle or another natural combination that raises order value without turning the brand into a discount store.",
      "<strong>Capture people who are not ready to buy.</strong> Add email signup, abandoned-cart email, order confirmation, and a basic post-purchase follow-up.",
      "<strong>Turn real availability into proof.</strong> Enable back-in-stock capture for unavailable core sizes and keep a simple proof log for waitlist totals, true restocks, sell-through, reviews, and customer posts. Never manufacture scarcity or call leftover inventory a restock.",
      "<strong>Test the entire purchase path.</strong> On a phone, open a product, choose a size, add it to cart, apply the offer, pay, receive confirmation, and verify the order appears correctly.",
      "<strong>Verify tracking.</strong> Confirm Shopify records the visit, add-to-cart, checkout, purchase, order value, and traffic source before creator links or ads begin."
    ],
    costs:[["Core retail inventory","$2,500"],["Shopify / conversion work","$1,000"],["Stage total","$3,500"]],
    deliverables:["2 core tees, 1 hat, 3–4 patches available","Complete mobile product pages","One tested bundle or offer","Email and back-in-stock capture","Blank proof log","Successful test order and verified tracking"],
    gate:"Move forward only when a stranger can find a stocked product in a normal size, understand it, and complete a tracked mobile purchase without help."
  },
  {
    no:"02",title:"Create the content engine",timing:"Weeks 2–6",budget:"$3,250",budgetLabel:"maximum release",
    plain:"UGC means creator-made photos or videos that feel native to TikTok and Reels. Seeding means mailing product to aligned people so they can experience it. A product-only seed does not guarantee a post; paid UGC has agreed deliverables.",
    actions:[
      "<strong>Write guardrails—not a script.</strong> Give the creator the FlockFam story, product facts, audience, prohibited claims, deliverable format, deadline, essential product visibility, and usage terms. Suggested hooks are optional. The creator chooses how they naturally use the product and what they actually say.",
      "<strong>Build a list of 50 possible creators.</strong> Focus on hikers, runners, hunters, campers, anglers, overlanders, and outdoors parents with roughly 2K–50K followers. Brand fit matters more than follower count.",
      "<strong>Screen for trust, not celebrity.</strong> Favor creators who already live the subject, are selective about partnerships, think beyond a quick paycheck, and have not bounced among competing brands. Reject a large audience that would make the relationship feel rented or fake.",
      "<strong>Build representative coverage.</strong> Tag prospects by activity, age/life stage, geography, audience, and content style. The list should reflect the actual FlockFam customer base instead of 50 versions of whoever one algorithm happened to show us.",
      "<strong>Run creator outreach like a sales pipeline.</strong> Use these statuses: Prospect → Qualified → Contacted → Replied → Agreed → Product Sent → Delivered → Posted → Rights Verified → Paid/Closed. Each week add 10 qualified prospects, send 10 personalized first messages, complete every due follow-up, and update every open record.",
      "<strong>Price the relationship actually being purchased.</strong> A posted reach deal uses expected qualified views and a CPM ceiling. UGC-only is priced by deliverables and cost per usable asset. Usage rights are priced separately. Affiliate commission pays for tracked sales. Do not use follower count as the invoice.",
      "<strong>Contact about 30.</strong> Offer the right relationship: product-only seeding, paid UGC, a posted creator deal, affiliate commission, or a combination. Never imply that free product guarantees a post unless that is agreed in writing.",
      "<strong>Seed 15–20 product-only creators.</strong> Include a personal note, the product, a simple brief, a unique link or discount code, and a clear contact for questions.",
      "<strong>Hire about six paid UGC creators.</strong> At roughly $200 each, require at least two usable vertical videos, raw clips when possible, a deadline, one reasonable revision, and written permission for FlockFam to reuse the content in ads.",
      "<strong>Use the founder advantage.</strong> Capture honest behind-the-scenes material during normal work: choosing inventory, inspecting samples, packing creator kits, explaining a miss, or testing a product outdoors. Document the work; do not manufacture drama.",
      "<strong>Fill visual gaps.</strong> Use the separate $750 production allowance only for missing product-page photos, a local lifestyle shoot, editing, props, or travel that creator content does not cover.",
      "<strong>If a field day replaces a normal shoot, plan it backward from output.</strong> Decide the product feedback needed, shot list, releases, creator/customer mix, vertical clips, stills, testimonials, and B-roll before choosing the location. It must fit inside the existing $750 allowance—not become a new event budget.",
      "<strong>Organize every asset.</strong> File by creator, product, hook, date, organic-post link, usage rights, and performance so winning concepts can be found and reused."
    ],
    costs:[["Product + packaging for 15–20 seeds","$650"],["6 paid creators × about $200","$1,200"],["Shipping, reships, and handling","$350"],["Rights, revisions, posted-reach tests, or bonuses","$300"],["Photo/video production gaps","$750"],["Stage total","$3,250"]],
    deliverables:["50-person prospect list with coverage tags","Working creator pipeline with every status current","About 30 outreach messages plus documented follow-ups","15–20 product-only seeds","6 paid creator agreements","Deal math and rights recorded for every paid relationship","At least 12 guaranteed usable videos","Target of 20–30 total usable clips plus photos"],
    gate:"Do not buy ads until at least 12 good vertical videos are delivered, reuse rights are documented, creator costs are classified correctly, and the library covers at least three hooks plus more than one customer/activity perspective.",
    warning:"A free shirt is not payment for unlimited ad rights. Get the deliverables and reuse permission in writing before shipping."
  },
  {
    no:"03",title:"Find organic winners",timing:"Weeks 5–8",budget:"$0",budgetLabel:"uses Stage 02 assets",
    plain:"Post the creator content without ad spend first. The goal is to learn which opening line, person, product, and story make people stop, watch, click, and shop.",
    actions:[
      "<strong>Post three to five vertical videos each week.</strong> Adapt them for TikTok and Instagram Reels. Do not dump the whole library at once; give each concept room to produce a useful signal.",
      "<strong>Test organic TikTok and commerce content as different jobs.</strong> Organic posts earn attention, trust, conversation, and creator discovery. TikTok Shop/commerce posts demonstrate the product, answer objections, and drive action. Log them separately instead of assuming one format wins both systems.",
      "<strong>Change one major variable at a time.</strong> Test the hook, creator, product angle, or edit. If everything changes at once, we will not know what caused the result.",
      "<strong>Track response after 24 hours and seven days.</strong> Record reach, three-second hold, average watch time, shares, saves, profile visits, site clicks, add-to-carts, and purchases.",
      "<strong>Publish one founder-forward proof story each week.</strong> Show a real decision, process, lesson, customer reaction, restock, or milestone. The proof must be documented and the tone should be honest—not a fake victory lap.",
      "<strong>Reply and learn.</strong> Questions and objections in comments become the next videos, product-page answers, or offer improvements.",
      "<strong>Name the winners.</strong> Compare every video with FlockFam's own recent baseline. A winner should rank near the top for attention and show shopping intent—not merely collect views."
    ],
    deliverables:["2–3 weeks of consistent organic testing","Organic and commerce posts labeled separately","Results logged by creative and hook","At least two founder-forward proof posts","Three strongest creative concepts identified","Customer questions added to product pages or new content"],
    gate:"Release ad money only when at least three pieces rank in the top group of FlockFam posts and generate a meaningful downstream action such as profile visits, site clicks, add-to-carts, or sales.",
    warning:"If nothing wins organically, make new hooks and edits. Paid ads make a weak message spend money faster; they do not repair it."
  },
  {
    no:"04",title:"Run the paid acquisition test",timing:"Weeks 7–12",budget:"$2,000",budgetLabel:"media spend only",
    plain:"Paid acquisition means paying a platform to show proven content to people who do not already know FlockFam. TikTok is the leading hypothesis because the pilot is creator-led, but it earns the budget only if FlockFam's own organic evidence supports it.",
    actions:[
      "<strong>Choose one primary platform from FlockFam's evidence.</strong> TikTok/Spark is the first hypothesis when the winning post is native TikTok creator content; Meta becomes primary when Reels/Instagram signal is stronger. Do not copy another brand's channel mix or scatter $2,000 across three platforms.",
      "<strong>Send each ad to the matching product.</strong> A performance-tee video should land on that product or its focused collection—not the generic homepage.",
      "<strong>Primary-channel pool — up to $1,600.</strong> Round A uses $400 to test four proven creatives. Round B uses $500 on the best two or three combinations. Round C releases the final $700 only to combinations closest to or below break-even CAC. If TikTok is primary, this creates an 80% TikTok test—not a permanent 80% rule.",
      "<strong>Retargeting / confirmation pool — up to $400.</strong> Use this for a different proof point to warm visitors or a small cross-platform confirmation test. Do not use it merely to keep a weak campaign alive.",
      "<strong>Measure the halo without inventing credit.</strong> Watch direct traffic, branded search, organic social, and unattributed Shopify sales alongside platform ROAS and MER. Record a lift as assisted/halo revenue unless tracking can actually prove the source.",
      "<strong>Read the failure correctly.</strong> Low clicks usually point to creative. Good clicks but few add-to-carts point to the product page or offer. Add-to-carts without purchases point to price, shipping, trust, or checkout friction.",
      "<strong>Stop by rule, not emotion.</strong> Pause a test after it spends about 1.5 times the break-even CAC without a purchase, unless the sample is too small to read."
    ],
    costs:[["Primary platform — Round A","$400"],["Primary platform — Round B","$500"],["Primary platform — Round C","$700"],["Retargeting / confirmation pool","$400"],["Stage total","$2,000"]],
    deliverables:["One primary ad platform tested","4 initial creatives reduced to 1–2 winners","Shopify and platform revenue reconciled","Direct and possible halo movement logged separately","CAC and conversion rate by creative/product","Clear stop, fix, or scale decision"],
    gate:"A scalable signal is at least one creative-and-product combination producing multiple first-time purchases at or below the break-even CAC. If that does not happen, stop and diagnose before spending the reserve."
  },
  {
    no:"05",title:"Back the winner—or keep the cash",timing:"Weeks 10–16",budget:"$1,250",budgetLabel:"held reserve",
    plain:"This money has no job until the pilot produces evidence. It is there to prevent a winning product from selling out, create more of a winning content angle, or extend an ad that is acquiring customers economically.",
    actions:[
      "<strong>Check inventory first.</strong> If the winning product or key sizes have less than roughly four weeks of stock at the new sales pace, reorder before increasing traffic.",
      "<strong>Use restock language only when it is true.</strong> If a real demand-driven restock happens, notify the waitlist and document it as proof. Limited drops may sell out; repeated core stockouts are an operating problem, not a marketing strategy.",
      "<strong>Refresh the winning idea.</strong> Spend $250–$500 on new versions of the best hook with another creator, location, or opening shot so the ad does not burn out.",
      "<strong>Add media only when the math holds.</strong> Increase spend gradually while CAC remains at or below the pilot threshold and fulfillment can keep up.",
      "<strong>Keep unneeded money unspent.</strong> If no product/content combination works, preserve the reserve and write down what the test ruled out.",
      "<strong>Apply the shiny-object rule.</strong> The reserve cannot fund a new sub-brand, app feature, Amazon launch, retail push, unrelated product, or impressive-looking campaign. It must support one of the four pilot priorities and a result already visible in the data.",
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
  ["Gross-to-net","The difference between full ticket-price sales and net sales FlockFam actually keeps after discounts, returns, refunds, and allowances. This reveals margin leakage hidden by a big gross-sales number."],
  ["CM1","Contribution Margin 1: net sales minus landed product cost, meaning COGS plus inbound freight. Track CM1 dollars and percentage weekly to judge product economics."],
  ["CM2 / contribution profit","For this pilot: CM1 minus outbound shipping absorbed by FlockFam, fulfillment or pick/pack, and payment fees. It is the practical amount available for acquisition spend and overhead."],
  ["Break-even CAC","The most FlockFam can spend to acquire a first order before that first order becomes unprofitable. For this pilot, use contribution profit per order as the starting ceiling."],
  ["ROAS","Return on ad spend: revenue directly attributed to ads divided by ad spend. $1,000 attributed revenue from $500 in ads is 2.0× ROAS. It does not account for product costs."],
  ["MER","Marketing efficiency ratio: total business revenue divided by total marketing spend. It gives a broader view than platform-reported ROAS."],
  ["Retargeting","Advertising to people who already visited, viewed a product, or added to cart but did not purchase."],
  ["Affiliate","A creator earns an agreed commission when a tracked link or code produces a sale. This reduces up-front risk but does not guarantee content or volume."],
  ["CPM","Cost per thousand views. For a posted creator deal, it helps compare the price of expected reach with other media. It is not the right way to price UGC that the creator is not posting."],
  ["Qualified views","Expected views from people who plausibly match FlockFam's market. Start with the median views on the creator's last 10 comparable posts, then discount for audience geography and fit when reliable data is available."],
  ["Cost per usable asset","The paid UGC fee divided by the number of approved videos or photos FlockFam can actually use. A $200 deal that produces two approved videos costs $100 per usable asset."],
  ["Creator pipeline","The tracked path from finding a creator through qualification, contact, agreement, delivery, posting, rights verification, and final payment or closure."],
  ["Validity proof","A truthful, documented signal that demand or trust exists: a genuine restock, verified review, customer post, waitlist, repeat purchase, or measured sell-through. Never fabricate or exaggerate it."],
  ["Organic vs commerce content","Organic social content is optimized for attention, trust, and community. Commerce content is optimized for product understanding, objection handling, and purchase action. One asset may do both, but the jobs and scorecards stay distinct."]
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
    <div class="panel"><div class="pilot-purpose"><strong>This is proof money, not scale money.</strong><p>The goal is not to make FlockFam huge in four months. It is to make the store buyable, create enough real outdoor content to find a message that connects, test that message with paid traffic, and leave with numbers strong enough to justify—or reject—a larger second investment.</p></div><div class="pilot-budget">${[["Store ready","$3,500","inventory + Shopify"],["Content ready","$3,250","creators + production"],["Organic proof","$0","find the winners"],["Paid test","$2,000","media spend"],["Winner reserve","$1,250","reorder or scale"]].map((x,i)=>`<div class="pilot-budget-step"><div class="pilot-kicker">Release ${i+1}</div><strong>${x[1]}</strong><span>${x[0]} · ${x[2]}</span></div>`).join("")}</div><div class="pilot-role-note"><strong>Four-priority rule:</strong> Every dollar, meeting, content shoot, and task must support one of four pilot priorities: <strong>Buyable Core, Content Engine, Acquisition Proof, or Retention & Community.</strong> If it does not, it waits until after the pilot.<br><br><strong>Who handles it:</strong> FlockFam owns product choice, creator approval, fulfillment, brand direction, and the weekly numbers. Creators make the content. A Shopify freelancer can be paid from the $1,000 store allowance if technical help is needed. The $2,000 paid-test budget is ad spend—not an agency fee. No full-service agency or monthly retainer is included in this pilot.</div></div>
    <div class="pilot-stages">${PILOT_STAGES.map(pilotStageCard).join("")}</div>
    <div class="panel"><div class="panel-head"><h2>Weekly Scoreboard <span class="count">same numbers every Monday</span></h2></div><div class="pilot-score-wrap"><table class="pilot-score"><thead><tr><th>Metric</th><th>What it answers</th><th>Formula / source</th><th>Why it matters</th></tr></thead><tbody>
      <tr><td>Gross sales</td><td>What was sold at ticket price?</td><td>Shopify sales before discounts and returns</td><td>Starting point—not money kept.</td></tr><tr><td>Net sales</td><td>What did FlockFam keep after leakage?</td><td>Gross sales − discounts − returns/refunds</td><td>Makes gross-to-net visible.</td></tr><tr><td>CM1</td><td>Are product economics healthy?</td><td>Net sales − COGS − inbound freight</td><td>Weekly product-margin pulse.</td></tr><tr><td>CM2</td><td>What remains before acquisition and overhead?</td><td>CM1 − outbound shipping − fulfillment − payment fees</td><td>Sets the practical CAC ceiling.</td></tr><tr><td>Sessions</td><td>How many visits reached the store?</td><td>Shopify analytics</td><td>Shows traffic volume.</td></tr><tr><td>Orders</td><td>How many purchases happened?</td><td>Shopify orders</td><td>The outcome that matters.</td></tr><tr><td>Conversion rate</td><td>Did the store turn visits into orders?</td><td>Orders ÷ sessions</td><td>Separates a traffic problem from a store problem.</td></tr><tr><td>AOV</td><td>How much is an average order?</td><td>Net sales ÷ orders</td><td>Bundles and patches can lift this.</td></tr><tr><td>New customers</td><td>Are strangers buying?</td><td>Shopify customer type</td><td>The central pilot question.</td></tr><tr><td>Marketing spend</td><td>What did acquisition cost this week?</td><td>Creator fees + media used for acquisition</td><td>Keeps true cost visible.</td></tr><tr><td>CAC</td><td>What did each new customer cost?</td><td>Acquisition spend ÷ new customers</td><td>Compare with break-even CAC.</td></tr><tr><td>MER</td><td>Did total revenue move with total marketing?</td><td>Total net sales ÷ total marketing spend</td><td>Helps reveal broader impact beyond platform attribution.</td></tr><tr><td>Email signups</td><td>Did we retain interested non-buyers?</td><td>Email platform</td><td>Creates an audience FlockFam owns.</td></tr><tr><td>Content output</td><td>Is the creator engine producing?</td><td>Usable assets received and posted</td><td>Prevents paying for vague “exposure.”</td></tr>
    </tbody></table></div><div class="pilot-example"><strong>Worked example:</strong> A $55 ticket-price order uses a $5 discount, so net sales are $50. Landed product cost is $16, making CM1 $34. FlockFam absorbs $5 shipping, $3 fulfillment, and $2 payment fees, making CM2/order contribution $24. The starting break-even CAC is therefore about $24. A $17 CAC leaves roughly $7 before general overhead; a $30 CAC loses roughly $6 on the first order.</div></div>
    <div class="panel"><div class="panel-head"><h2>Creator Deal Math <span class="count">price the job—not the follower count</span></h2></div><div class="pilot-score-wrap"><table class="pilot-score"><thead><tr><th>Relationship</th><th>What FlockFam is buying</th><th>How to price it</th><th>What must be written down</th></tr></thead><tbody>
      <tr><td>Product seed</td><td>A product experience; no guaranteed post</td><td>Landed product + packaging + shipping</td><td>No promised deliverable unless separately agreed</td></tr><tr><td>UGC-only</td><td>Specific photos/videos for FlockFam to use</td><td>Production fee ÷ approved assets; add usage rights</td><td>Deliverables, deadline, revision, raw files, rights</td></tr><tr><td>Posted creator deal</td><td>Expected qualified reach plus content</td><td>(Qualified views ÷ 1,000) × CPM ceiling; add production/rights only when separately required</td><td>Post, platform, timing, audience data, usage, reporting</td></tr><tr><td>Affiliate</td><td>Tracked sales performance</td><td>Agreed percentage or dollars per completed sale</td><td>Attribution window, returns, payout timing, code/link</td></tr>
    </tbody></table></div><div class="pilot-example"><strong>Posted-deal example:</strong> A creator's last 10 comparable posts have a median of 8,000 views. If reliable data suggests 75% are qualified for FlockFam, expected qualified views are 6,000. At a hypothetical $10 CPM ceiling, the reach portion is $60. Production and ad-usage rights are separate line items. <strong>UGC-only example:</strong> a $200 agreement delivering two approved videos costs $100 per usable asset; follower count adds no value if no post is included.</div></div>
    <div class="panel"><div class="panel-head"><h2>Creator Pipeline <span class="count">weekly operating rhythm</span></h2></div><div class="pilot-purpose"><strong>Statuses:</strong><p>Prospect → Qualified → Contacted → Replied → Agreed → Product Sent → Delivered → Posted → Rights Verified → Paid/Closed.</p></div><div class="pilot-role-note"><strong>Weekly minimum:</strong> add 10 qualified prospects, send 10 personalized first messages, complete every follow-up due that week, and update every open creator record. For this pilot, FlockFam can own scouting and relationship management; a 15–25 person influencer department belongs to a much later stage.</div></div>
    <div class="panel"><div class="panel-head"><h2>Plain-English Glossary <span class="count">tap any term</span></h2></div><div class="pilot-glossary">${PILOT_TERMS.map(t=>`<details class="pilot-term"><summary>${t[0]}</summary><p>${t[1]}</p></details>`).join("")}</div></div>
  </section>`;
}

function bindGrowthPilot(){
  const root=document.querySelector(".growth-pilot");if(!root)return;
  const stages=()=>[...root.querySelectorAll(".pilot-stage")];
  const open=root.querySelector("[data-pilot-expand]");if(open)open.onclick=()=>stages().forEach(x=>x.open=true);
  const close=root.querySelector("[data-pilot-collapse]");if(close)close.onclick=()=>stages().forEach(x=>x.open=false);
}
