# Promise fixes: customer-facing promises now match how the business runs

**Run:** 2026-09-28, 05:40–06:05 UTC (container clock). **Lane:** promises must match reality. Inputs were `ops/TESTS/print-preflight.md`, `ops/TESTS/listing-qa.md`, `ops/PRE-MORTEM.md` (risks 8, 39 and 41) and `business/STRESS-TEST.md`.

**What this lane did not do:**
- Nothing was published, sent or uploaded, and `ops/PAUSE` stays.
- Nothing was committed. The harness auto-saved part of this lane's in-progress work in `ad30680` ("Auto-save in-progress workflow output"), and the lead commits the rest.
- `brand/logo/` was not touched.
- Only one product was rebuilt: `course-screen-reset`, with its own `make.sh`. There was no catalogue-wide rebuild.
- `products/course-screen-reset/build/workbook.js` was not edited (outside this lane).

Web search was not available. Platform rules below come from memory and are marked **UNVERIFIED**.

## Result

| # | Promise | Status |
|---|---|---|
| 1 | Course refund: "30 days, no questions asked" vs the policy's 14 days | **Done.** Every customer-facing mention now uses the policy's terms. The founder decision is PENDING in `ops/APPROVALS.md`. |
| 2 | Reply-time promises ("2 business days", "2 días hábiles", "[5] business days") | **Done in this lane's files.** Out-of-lane files that still promise a time are listed below. |
| 3 | "Give $5, get $5 … you each get $5 off" referral line | **Done in all 42 course and funnel emails** (84 files plus 2 `sequence.json`). **Still printed in the workbook and KDP interior** through `workbook.js` line 402, which needs the lead (below). |
| 4 | Etsy messages have no API path | **Done:** `operations/SOPs/etsy-messages.md`. |
| 5 | `/license` vs `/licenses` printed on products | **Done:** `/licenses` is canonical, `/license` 301-redirects to it, and every printed URL and QR target is in `ops/TESTS/printed-urls.md`. |

## 1. Course refund: one source, one set of terms

**Source of truth:** `legal/SHIPPING-RETURNS-REFUNDS.md` Part B §4. It gives a full refund if the buyer emails within 14 days of purchase and has completed no more than 30% of the lessons. The build now holds these numbers once, in `REFUND` in `products/course-screen-reset/build/content.js`. Every email, the sales page, START HERE, the free starter CTA, both listing images and the workbook FAQ read them from there. To change the terms, change the policy first, then `REFUND`, then run `make.sh`.

**The wording used everywhere now:**
- **Long:** "If the program isn't right for your family, email us within 14 days of purchase for a full refund, as long as you've completed no more than 30% of the lessons." Where there is room, it adds: "The full terms are in our refund policy."
- **Short** (badges and small print): "14-day money-back guarantee", with a "terms" link wherever the medium allows. The full condition appears on the same listing image set (image 08) and the same page (the sales page guarantee section).
- **Removed:** "30 days", "No questions asked", "you don't need to have finished anything", and "use the refund form" (there is no refund form).

The completion condition is stated wherever the guarantee is described in full. A guarantee advertised without its material conditions would be a new mismatch (16 CFR 239, UNVERIFIED current text).

**Files changed (sources):**
- `products/course-screen-reset/build/content.js`: `REFUND`, `SHARE_URL` and the FAQ "What is the guarantee?" answer.
- `products/course-screen-reset/build/emails.js`: welcome guarantee, funnel day-7 preheader and paragraph, and the offer small print.
- `products/course-screen-reset/build/extras.js`: START HERE, the free starter CTA, listing images 01 and 08, and the sales page small print, guarantee section and footer link.
- `products/course-screen-reset/sales-page.md` (§1 small print, §6 guarantee, founder note).
- `products/course-screen-reset/listing.json`: bullet 5, `long_description`, `seo_description`, `price_notes`, the image-08 note and the GUARANTEE `human_todo`. Another lane edited the pricing and AI fields of the same file at 05:50. Both sets of edits are intact.
- `operations/customer-service/FAQ.md`: the course question is renamed from the retired "30-Day Screen Reset". The terms already matched.
- `operations/customer-service/macros.md`: macro 18 is renamed the same way.
- `legal/SHIPPING-RETURNS-REFUNDS.md` §4: the heading uses the current course name, and the bracket note records that the section is the single source and that the founder decision is pending. The terms themselves are unchanged.

**Rebuilt outputs:** 42 emails (`.html` and `.md`) and 2 `sequence.json`; the 4 workbook PDFs and `course-screen-reset.pdf` (p87 FAQ); the Etsy workbook edition; `downloads/1. START HERE.pdf`; both free-starter PDFs (p3); `preview/listing-images/01-hero.png` and `08-guarantee-and-bundle.png`; `sales-page.html` and `preview/sales-page.png`; `preview/p87.png`; `funnel/starter/preview/p03.png`.

**Founder decision added** to `ops/APPROVALS.md` (PENDING): "Keep 14 days, or change the policy to 30 days for the course?"

**Also for the founder and counsel (not a new APPROVALS line):**
- `ops/PRE-MORTEM.md` risk 41 notes that the "no more than 30% of the lessons" condition does not fit a daily drip, which delivers 14 lessons in 14 days, and that the business cannot check completion. If the terms are revisited, consider a plain 14-day window with no completion condition, or delivering only lessons 1–7 inside the window (PRE-MORTEM fix 5).
- The EU/UK withdrawal note in §3 of the policy still needs counsel.

## 2. Reply times: no time is promised anywhere this lane owns

**The approved line:** "Most answers are in our FAQ. Every message gets a reply." There is no number of hours or days, in any language. No holding reply names a date.

**Changed:**
- `operations/customer-service/FAQ.md`, lines 13 and 30. Both said "within 2 business days". The "Before publishing" notes now forbid reply times and point license links to `/licenses`.
- `operations/customer-service/macros.md`:
  - macro 5 (accessible file "within [5] business days") now says "as soon as it's ready";
  - macro 23 (vendor form "within [5] business days") now says "we'll send it back to you by email";
  - macro 28 (fundraiser kit "within [__] business days") now says "once your sign-up is processed";
  - macro 37 (Spanish, "en un plazo de 2 días hábiles") now reads "La mayoría de las respuestas están en nuestra página de preguntas frecuentes, y respondemos a cada mensaje, en español." This still needs human review and back-translation before use (`ops/ROUTINE.md` §3b).
- `operations/customer-service/response-standards.md` §2: the old table of first-reply targets, whose notes said "The FAQ and contact page promise 2 business days", is replaced by "Reply times: internal only, never promised". It covers:
  - how replies really happen: approved macros on the routine's next run with inbox access (none yet), the weekly batch for anything that needs the founder, and Etsy weekly;
  - the Etsy risk;
  - a rule that numbers are allowed only for policy terms.
- `legal/SHIPPING-RETURNS-REFUNDS.md` §7 ("We reply within [2] business days") now points to the help-center FAQ and says every message gets a reply.
- `legal/ACCESSIBILITY-STATEMENT.md` ("We will reply within [2] business days") now says every message gets a reply.
- `content/research-hub/faq.md` Q27 ("an instant automatic reply, and a person reviews everything else within [5] business days") now says "Every message gets a reply." No automatic reply exists yet, so that promise came out as well. `check_hub_firewall.py` still gives 0 FAIL; its 2 WARNs are older and unrelated.

**Kept on purpose:** "business days" wording that comes from a policy rather than from reply speed: print and ship times, the 10-day refund after a return arrives, and a bank's 5–10 days.

**Conflicts for the lead:**
- **`ops/COMPLIANCE-GATE.md` line 21** still names as its "approved wording" "an instant automatic reply; a person reviews everything else within [5] business days." That is a time promise, and the automatic reply does not exist. Suggested replacement: "Use the approved wording: 'Most answers are in our FAQ. Every message gets a reply.' Never a number of hours or days." `ops/GAPS-ROUND-2.md` G2-19 carries the same `[5]` wording. This lane cannot edit either file.
- **"Every message gets a reply" has deliberate exceptions:** spam and scams (macro 38) and organizations on the `CLAUDE.md` exclusion list ("do not reply at all; log only", `response-standards.md` §4). Neither is a customer question, but if the founder wants the line to be literally true, it could read "every question gets a reply".

**Still promising a reply time, outside this lane (not changed):**
- `operations/TRUST-CHECKLIST.md` #10: the contact page is to show "We reply within 2 business days".
- `operations/school-vendor-packet.md` line 25: "we answer every inquiry in writing within 2 business days".
- `seo/SEO-PLAN.md`: row 49 `/contact/` meta description ("within 2 business days") and line 531 corrections ("within 5 business days").
- `content/research-hub/editorial-policy.md` line 90 ("within [5] business days"). The reviewer bundle built from it and from the hub FAQ, `content/research-hub/review/hub-review-bundle.html` and `.pdf` (blocks FAQ-036 and POL-045), is now stale. `content/research-hub/verification-queue.md` line 231 still checks for "[5] business days".
- Site concepts:
  - `site-concepts/winner/info.html` and `_src/info.html` ("usually within two business days");
  - `site-concepts/C-paper-craft/info.html` and `_src/info.html` (the same);
  - `site-concepts/A-picture-book-editorial/info.html` ("within five business days").
- `legal/protection/coaching-agreement.md` line 19 (a coaching template; coaching is banned anyway).

## 3. Referral line: no program exists, so no reward is promised

**The replacement,** in the "share with a friend" slot of every course and funnel email: "**Share the free printable:** know a family who might like it? Our free 7 Days of Play First starter is at playbeforepixels.com/30-days/start." It is a plain public link with no reward, no forwarding mechanics and nothing to disclose (`business/GROWTH-ENGINE.md` §4 "Referral" and "Invite friends only through a public sign-up link"). The day-31 email says "you're welcome to share the free starter with a friend. The link is below." It no longer says "You'll each get $5 off". The `{{referral_link}}` merge tag is removed from `emails.js` and from both `sequence.json` files.

**Verified:** 0 of the 88 email and funnel files contain "referral", "$5 off", "give $5" or `{{referral_link}}`, and all 42 `.html` and 42 `.md` emails carry the new link. `listing.json` `compliance_notes` now describes the reward-free link.

**Still printed (lead action, outside this lane):** `products/course-screen-reset/build/workbook.js` line 402 prints "Share with a friend: when a friend buys with your link, you each get $5 off. Your link is in every email." on:
- p89 of the 4 workbook PDFs and `course-screen-reset.pdf`;
- p90 of the KDP interior.

Since this run, "Your link is in every email" is also untrue. Suggested fix: replace the line with
```
<p class="small">Know a family who might like this? Share the free starter: ${SITE}/30-days/start</p>
```
or delete it. Then run `sh products/course-screen-reset/build/make.sh`. This has to happen before any course file is sold or the paperback is uploaded (`ops/QUEUE.md`: "No course email is scheduled until the … referral line is removed").

**The binding brand file still requires the program:** `brand/BRAND.md` says "a give-$5/get-$5 referral program runs through the store platform" ("Every product leads to the next") and "Every email: one 'share with a friend' referral link (give $5 / get $5)" ("Everything promotes the brand"). Both contradict `business/GROWTH-ENGINE.md` §4 ("Not until Shopify"). The founder or lead should amend BRAND.md to "a reward-free share link until a referral program exists". Without that, the next build may follow BRAND.md and put the promise back.

## 4. Etsy messages: `operations/SOPs/etsy-messages.md`

- **The constraint** (UNVERIFIED): Etsy's Open API v3 has no conversations endpoint, and ROUTINE forbids scraping, so the routine can neither read nor send Etsy messages.
- **Prevention comes first:**
  - "Quick answers" at the end of every Etsy listing description, built from `listing.json` `faq` with all URLs removed. Etsy may have no per-listing FAQ field (UNVERIFIED).
  - The same answers in the shop FAQ.
  - START HERE as file 1.
  - Etsy saved replies.
  - An automatic reply only if Etsy supports one outside vacation mode.
- **Weekly:**
  - The routine drafts replies from the macros into `ops/APPROVALS.md` under "Etsy replies to paste", with the topic and date only and no buyer details in the repository.
  - Until the mailbox is connected, it adds one line asking the founder to answer each message with saved replies E1–E8.
  - The founder pastes the replies (target: 5 minutes a week).
- **Etsy-safe replies E0–E8** follow these rules: no URL, email address or QR code, no reply time, and no health claim.
- **Risk:**
  - Etsy's response expectations (UNVERIFIED): Star Seller asks for about 95% of first messages answered within 24 hours. A weekly batch will miss it.
  - The shop's reply time may be shown to buyers.
  - A buyer can open a case after about 48 hours.
  - Early 1-star reviews.
- **Mitigations:**
  - prevention;
  - staging Etsy with the two lowest-support products;
  - saved replies;
  - an optional second weekly check by the founder for the first 8 weeks (her choice, never promised);
  - an early-warning trigger (any case, or 2 or more messages about the same file in a week).
- §7 lists the 10 Etsy facts to check in the fresh session (task #18).

`operations/SOPs/weekly.md` (not this lane) still says the routine triages "every inbox and marketplace message center it can reach" daily. It should link to the new SOP for Etsy.

## 5. `/licenses` is canonical: `ops/TESTS/printed-urls.md`

- **Scan:** 139 product PDFs and 5,791 pages. Text was extracted from every page, and every drawing- or image-heavy page was rendered and QR-decoded. The scan found 20 distinct printed paths, plus 7 more used only in emails and web copy.
- **Licenses:** `/license` is printed in 22 files (play-talk-cards, the talk-along deck, picture-more-talk-less-tap) and `/licenses` in 6 (toddler-busy-book). `/licenses` is canonical (SEO plan row 57, the winner site's `#licenses`), and `/license` gets a 301.
- **Etsy editions:** 0 URLs and 0 QR codes in all 45 `etsy-upload/` files.
- **New findings in that file:**
  - A mid-word URL wrap on `bored-play-cards/START-HERE.pdf`, which prints `/bonus/bore` then `d-play-cards` on the next line.
  - The course's printed bonus URL contains the retired word "reset".
  - `/help` and `/30-days` are printed but missing from `seo/SEO-PLAN.md`.
  - Printed promises of classroom and site licenses that are HELD.

## Verification

- **Course rebuild:** `sh products/course-screen-reset/build/make.sh` finished with exit 0 in 1 min 11 s. `python3 ops/TESTS/unchanged_renders.py products/course-screen-reset --restore` put the 2 pixel-identical KDP PDFs back to HEAD. Page counts are unchanged: workbook 89 pages, KDP 92, cover wrap 16.4572 in.
- **Visual check** of START HERE p1, workbook p87, starter p3, listing images 01 and 08, and the sales-page hero and guarantee: nothing clipped or overlapping. The workbook FAQ page keeps the same layout as HEAD.
- **Old wording:** 0 hits for "30 days of purchase", "No questions asked", "30-day money", "refund form" or "full refund, no questions" in any course source or output (text or PDF). The PDF text check finds the new 14-day terms on START HERE p1, workbook p87 (all 4 editions and the Etsy edition) and starter p3.
- `python3 ops/TESTS/check_listings.py --only course-screen-reset`: 0 FAIL, 0 WARN.
- `python3 ops/TESTS/check_hub_firewall.py`: 0 FAIL. The 2 WARNs are older, on other pages.
- `make.sh --final` was not run. The welcome and day-30 emails still hold their FOUNDER WRITES THIS boxes by design, so `--final` refuses, and no course email can go out.

## Found in passing (not changed; outside this lane or scope)

1. **Coaching wording in policies** (COMPLIANCE-GATE 21, second bullet; GAPS G2-19):
   - `legal/SHIPPING-RETURNS-REFUNDS.md` §5 "Coaching and workshops";
   - `legal/COACHING-WORKSHOP-TERMS.md` (whole file);
   - `legal/PRIVACY-POLICY.md` (coaching information, scheduling, notes);
   - `legal/TERMS-OF-USE.md` §1 and §3;
   - `legal/MEDICAL-EDUCATIONAL-DISCLAIMER.md` ("coaching with us").

   This needs one pass before the attorney review, turning coaching and workshops into host-it-yourself kit licenses.
2. **The course FAQ promises a group or site license** "through the written quote form at playbeforepixels.com". Those licenses are HELD. In the parked course Etsy edition, the same answer also prints the domain (gate 16), and the refund answer there should point to Etsy's policy. The FAQ answer text lives in `content.js` and the Etsy variant logic in `workbook.js`, so this is a founder and lead call.
3. **Winner site concept `info.html` "Returns, refunds and reprints"** says printed items can't be returned for change of mind. The policy allows 30-day returns of books and decks in new condition. It also says digital refunds come "within 30 days", which is not in the policy. This is for the site lane.
4. **`ops/TESTS/unchanged_renders.py` skips modified files whose paths contain spaces,** because git quotes them (for example `downloads/2. Workbook - Color - US Letter.pdf`). Such files are never listed or restored. Here they were real changes anyway.
