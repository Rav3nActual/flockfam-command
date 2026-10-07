# FIELD INTEL 2.0 — Implementation status (2026-10-06)

**Status: FOUNDATION ONLY — NOT LIVE.** The previous ChatGPT automation remains disabled. No unattended research workers, dashboard controls, or production sender have been deployed. Do not report automated delivery as fixed.

## Existing infrastructure
- Supabase project: FlockFam-Studio (bwnwvbdzeqgxdmsrkand).
- Resend sender: brief@intel.flockfam.com; reply-to: info@flockfam.com.
- Recipients: info@flockfam.com and mjsardella0614@gmail.com.
- Published golden master template alias: flockfam-field-intel.
- Schedule: Tuesday/Friday, 07:00 America/Chicago, with staggered research preceding delivery.

## Persisted foundation (applied in Supabase)
- public.field_intel_editions: one date-keyed report, HTML, text, one move, status and unique Resend email ID.
- public.field_intel_assignments: six topic-keyed jobs per edition, statuses and JSON findings.
- public.field_intel_sources: dated, verified URLs, evidence and analysis.
- public.field_intel_events: append-only operational event history.
- public.field_intel_claim_send(date): service-role-only atomic transition from READY to SENDING. No auto-retry for an ambiguous SENDING state. RLS enabled; no public table grants.

## Planned worker responsibilities
1. Outdoor apparel & gear.
2. Performance supplements.
3. Patch market.
4. TikTok patch watch.
5. Customer pain / pricing and promotion signals.
6. Creator and athlete radar (conditional).

## End-to-end protocol
1. Controller creates an edition and six assignments, each idempotently keyed by edition date and topic.
2. Independent workers research and save only dated, opened/verified sources. Failed workers save an error, not filler.
3. Editor selects 6–9 genuinely fresh core items, deduplicates against previous editions, enforces section order and formats.
4. Renderer **fetches the published Resend template** and replaces only sample text/card blocks. Validate colors, white-card wrapping, Outlook-safe markup, meta tags and all required fields.
5. Sender first reconciles today's Resend transactional email history. If already sent, record the ID and stop. Otherwise claim via field_intel_claim_send(date). Call POST /emails **once** with edition and workflow tags and a stable idempotency key; store returned ID. Ambiguous outcome: halt and alert; never blindly retry.
6. Verify Resend acceptance and subsequent delivery; surface inbox-junk caveat separately. Alert on incomplete research, missing credentials, failed send or missed delivery deadline.

## Required before production
- Confirm the Command Center's deployed frontend and add a FIELD INTEL status panel.
- Configure a secure scheduled backend runtime, research/search provider, LLM credentials, Resend API secret, and secret storage. Do not expose secrets in client code or commit them to GitHub.
- Implement six workers, editorial verification, renderer and sender.
- Perform a no-send dry run and a separately authorized end-to-end delivery test.
- Only then enable the new schedule; avoid simultaneously re-enabling the legacy ChatGPT automation.

## Non-negotiable
One consolidated email only, Tuesdays and Fridays. No invented source dates, no stale patch filler, no silent send failure. Preserve the published template as the HTML golden master. No production send from an incomplete report.
