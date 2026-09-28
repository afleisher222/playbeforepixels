# Customer-service response standards

**For:** AlphaPlay LLC, d/b/a Play Before Pixels
**Prepared:** September 27, 2026
**Binding rules:** `brand/BRAND.md` (no direct contact, no health claims, faceless) and `ops/COMPLIANCE-GATE.md`.

## 1. Channels (written only)

| Channel | Address | Who answers |
|---|---|---|
| General, orders, refunds | hello@[BUSINESS DOMAIN] and the site contact form | Daily routine (approved macros), founder for anything else |
| Schools, POs, quotes, W-9 | orders@[BUSINESS DOMAIN] and the quote form | Daily routine drafts; founder approves anything non-standard |
| Wholesale | wholesale@[BUSINESS DOMAIN] | Same |
| Fundraisers | fundraising@[BUSINESS DOMAIN] | Same |
| Privacy and deletion | privacy@[BUSINESS DOMAIN] | Same, with deletion logged |
| Marketplace messages | Inside Etsy, TpT, Amazon and TikTok | Founder or routine, per platform access. Many marketplaces have no API for messages `[VERIFY each]`. Etsy: `operations/SOPs/etsy-messages.md` |

**We never offer:** phone, video, live chat, DMs from the brand, or in-person meetings. Social media comments and DMs get one approved auto-reply pointing to `hello@`.

## 2. Reply times: internal only, never promised

**What customers are told (in every language):** most answers are in the FAQ, and every message gets a reply. No page, policy, email, macro, listing, product file or auto-reply names a number of hours or days for a reply, and no holding reply names a date or "right away" (`ops/TESTS/promise-fixes.md`, September 28, 2026). Numbers that come from a policy, such as a refund window or a bank's processing time, are fine; see §3. **Open conflict for the lead:** `ops/COMPLIANCE-GATE.md` item 21 still names a different approved wording ("an instant automatic reply; a person reviews everything else within [5] business days"), and no automatic reply exists yet. Until the gate is amended, this wording is a proposal, not the gate's approved line.

**How replies really happen:**

| Type | Who answers | When |
|---|---|---|
| A question an approved macro answers (downloads, printing, charges, order status) | The routine sends the macro unchanged except for placeholders | On the routine's next run with inbox access. There is no mailbox API yet, so today nothing is read automatically |
| Refunds and replacements inside the §4 limits | The routine | Same |
| Anything that needs the founder | Drafted into `ops/APPROVALS.md` | The weekly inbound batch (`ops/ROUTINE.md` §5b), sent after her written approval |
| Etsy messages | Drafted from the macros | Weekly, per `operations/SOPs/etsy-messages.md` |
| Privacy and deletion requests | `ops/ROUTINE.md` §5b "Privacy requests" | Closed within 30 days or any shorter legal deadline (a legal duty, not a reply promise) |
| Child-safety report, legal threat, family in crisis | §5 | Escalated at once |

**Notes:**
- Business days are Monday to Friday, US Eastern, excluding US federal holidays. They are used only for policy numbers (refund processing, print times), never for replies.
- **Marketplaces score reply speed on their own terms** (for example Etsy's response expectations and Star Seller measure, UNVERIFIED). A weekly batch will not meet them. That risk and its mitigations are in `operations/SOPs/etsy-messages.md`. It never justifies a written promise here.
- If a holding reply is ever sent, it says "We've got your message and we're looking into it" and names no date.
- Every question that arrives more than twice becomes an FAQ answer or a product-page line (§8), so fewer messages need a reply at all.

## 3. Voice

**Warm, plain, practical, no shame.**
- Use the customer's first name.
- Thank them.
- Answer the question in the first two sentences.
- End with what happens next.

**Always:**
- Say sorry once, sincerely, when something went wrong on our side. Then fix it.
- Use short paragraphs, plain words and no jargon.
- Give specific numbers ("within 10 business days") only when they match the policy, and never for how fast we reply.
- Sign off as **"The Play Before Pixels team"**. No invented staff names, no founder name.
- Reply in the customer's language when a human-reviewed macro exists (Spanish first).

**Never:**
- Make a health, developmental or outcome promise. Never say a product will "help with speech", "treat", "prevent", "fix", "reverse" or "improve" anything about a child.
- Say or suggest that screens *cause* autism or delay. Use "associated with" and the safe framing in macro 32.
- Diagnose, reassure about development ("that sounds normal"), or advise about an individual child. Refer to the pediatrician and early intervention (macro 31).
- Name, compare with or criticize any school, district, company, app, show, creator or product, even when the customer does.
- Blame the customer, the printer or the carrier. Own it and fix it.
- Argue, use sarcasm, or write in ALL CAPS.
- Ask for a positive review or a review change, or make an offer depend on a review.
- Ask for or keep children's names, photos, schools or health information. If a customer sends it, answer without repeating it.
- Share an EIN, bank details or a W-9 in the body of an email (see `SOPs/school-orders.md`).
- Offer a call, meeting, interview, podcast or live event.

## 4. What the routine may do on its own (after `macros.md` is APPROVED)

| Action | Limit |
|---|---|
| Send any approved macro unchanged, except for placeholders | Always |
| Re-send download links; reset download limits | Always |
| Refund digital orders for duplicate charges, defective files or failed delivery | Up to **$[50]** per order `[founder sets]` |
| Order a free replacement for damaged, lost or wrong POD items | Up to **$[75]** per order `[founder sets]` |
| Issue the 15% size-exchange code for POD apparel | Always |
| Send quotes at list prices from the published price table | Always |
| Send license certificates after payment or PO | Always |

**Everything else goes to `ops/APPROVALS.md`, one line each:**
- refunds outside policy;
- anything above the limits;
- custom pricing or discounts;
- media, legal or complaint escalations;
- anything touching the founder, her employment or her children;
- messages from organizations on the `CLAUDE.md` exclusion list (do not reply at all; log only);
- signatures, insurance certificates or data-privacy agreements;
- any public review reply.

## 5. Escalate immediately (create `ops/PAUSE` if public or viral)

- A child-safety report about a product (choking, injury, allergic reaction). Reply the same day with a holding message and route it to the founder. Record it for a possible CPSC report (founder and attorney decide).
- A legal threat, chargeback dispute, IP claim against us, press inquiry or regulator letter.
- A message showing a family in crisis or at risk. Reply with care. Point to emergency services (911 in the US) or the 988 Suicide & Crisis Lifeline where relevant. Don't counsel, and alert the founder.
- Anything that mentions the founder personally or her employer.
- A suspicious payment, bank-change or gift-card request (`SOPs/account-security.md` §6).

## 6. Refund and chargeback rules

- Refund to the original payment method only, never by gift card or a different account.
- Chargeback: respond within the processor's deadline with the order record, the delivery or download log, the policy acknowledged at checkout, and the email thread. The founder approves submission.
- Each refund is tagged with a reason code (duplicate / defective / not-as-described / lost / damaged / policy-exception / chargeback) so the monthly close can report refund rates by product.

## 7. Records and privacy

- Keep email threads in the mailbox. Tag each with its product and reason code.
- Log each week's counts in the weekly scorecard: messages, top 3 reasons, refunds and turnaround time. Never log customers' personal details in the repo.
- Deletion requests: delete from the email platform, help-desk tags and any spreadsheet. Keep order and tax records as the law requires. Log only "deletion completed {date}".
- Never copy customer messages into the repository.

## 8. Quality loop

- **Weekly:** read the week's top 3 question types. If a question comes up more than twice, add or fix an FAQ answer or product-page line so it isn't asked again.
- **Monthly:** review every refund reason by product. Any product with a refund rate above [5]% gets a fix queued in `ops/QUEUE.md`.
- **Quarterly:** re-read every macro against current policies and prices (`SOPs/quarterly.md`).
