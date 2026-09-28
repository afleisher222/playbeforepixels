# Etsy messages SOP

**Status:** pre-launch draft, written September 28, 2026. No Etsy shop exists yet, and `ops/PAUSE` stays in place. Web search was not available, so every Etsy rule below comes from memory and is marked **UNVERIFIED**. Each one is listed in §7 for the fresh-session check (task #18).

**Owners:** R = Claude routine · F = founder.

**Binding rules this follows:** `brand/BRAND.md` (no direct contact, zero daily tasks, "never break a marketplace rule to promote"), `ops/COMPLIANCE-GATE.md` lines 16 (no URL, short link or QR on Etsy), 21 (no reply-time promise) and 22 (reviews), `operations/customer-service/response-standards.md` and `macros.md`.

## 1. The constraint

- **The routine cannot read or answer Etsy messages.** As far as we know, Etsy's Open API v3 has no endpoint for shop conversations (UNVERIFIED). `ops/ROUTINE.md` forbids scraping and automated browser logins, so there is no workaround. Every Etsy reply is pasted into Etsy Messages by a person: the founder.
- **Etsy emails the shop's account address when a message arrives** (UNVERIFIED whether the email includes the message text). Once the business mailbox is connected to the routine by API, those notification emails are the only way the routine learns that a message is waiting.
- **So the plan is:** answer the common questions before anyone writes (§2), draft replies from the macros once a week (§3), and keep the founder's part to pasting prepared text.

## 2. Prevention: the listing answers first

Most Etsy messages about printables are the same six questions. Each is answered before the buyer has to ask:

1. **Listing "Quick answers".** Every Etsy listing description ends with 5–7 short questions and answers, built from that product's `listing.json` `faq`. Before it goes into Etsy, remove every URL, "our site", QR mention, email address and Amazon mention (gate 16). Etsy may have no per-listing FAQ field, only a shop FAQ (UNVERIFIED; `ops/TESTS/listing-qa.md` "Needs a live check"). Until that is checked, the answers go in the description text.
2. **Shop FAQ.** The same answers go in the shop's FAQ section, if Etsy still offers one (UNVERIFIED, including its entry limit).
3. **START HERE.pdf is file 1** in every Etsy listing (BRAND.md customer-voice rule 2). It covers which file to open, printing at "Actual size", Letter or A4, and phones.
4. **Saved replies.** F loads the Etsy-safe replies in §4 once as Etsy saved or quick replies (UNVERIFIED feature name), so each answer takes a few seconds.
5. **Automatic reply.** If Etsy offers an automatic reply outside vacation mode (UNVERIFIED), F turns it on once with reply E0. Never switch on vacation mode to get one, because it hides the listings (UNVERIFIED).

The questions every Etsy listing and the shop FAQ must answer:

| Topic | The answer, in short (no links) |
|---|---|
| Where is my download? | Etsy emails a download link after payment. Files are also on your Etsy Purchases page (UNVERIFIED path name). Download on a computer or in a phone's web browser; the Etsy app may not download files (UNVERIFIED). |
| Which file do I print first? | START HERE. It lists every file and how to print it. |
| Letter or A4? Things are cut off | Pick the file that matches your paper and print at "Actual size" or 100%. |
| It won't open on my phone | Open it in a free PDF reader app, or on a computer. |
| Can I share it or use it with my class? | Your own household only (Personal / Family license). Classroom and site licenses are not sold yet. |
| Refunds on digital files | Digital files can't be returned once downloaded. If a file is faulty, incomplete or not as described, we fix it or refund it. Marketplace buyers are covered by the Etsy shop's own policy (`legal/SHIPPING-RETURNS-REFUNDS.md`, intro). |
| Ages and safety | The age on the listing, "Every play follows our published safety rules" and "A grown-up is always there" (BRAND.md customer-voice rule 9). |

Never in a listing, the shop FAQ or an automatic reply: a reply time ("within 24 hours", "same day"), a promise that a person is standing by, a website, an email address, or a QR code.

## 3. The weekly routine

Etsy messages are handled in the weekly inbound batch (`ops/ROUTINE.md` §5b). Customers are told only that every message gets a reply, never when.

**R, every week:**
1. **If the business mailbox is connected** and Etsy's notification emails reach it, list each unanswered Etsy conversation by date and topic only. Match each to a reply in §4 (or to a `macros.md` macro rewritten under the §4 rules) and draft it into `ops/APPROVALS.md` under one heading, "Etsy replies to paste", one line per message: date · topic · reply code · the full reply text with `{first_name}` left as a placeholder.
2. **Until the mailbox is connected,** write one line in `ops/APPROVALS.md`: "Etsy: open Messages and answer each new message with the matching saved reply (E1–E8). For anything that doesn't fit, add one line here with the topic only (no names, usernames, order numbers or message text), and next week's run drafts a reply."
3. Draft a fresh reply for any topic F added (step 2), using the §4 rules.
4. Anything that matches `response-standards.md` §5 (a safety report, legal threat, press, anything about the founder, the `CLAUDE.md` exclusion list) is **never** answered from a saved reply. Put it at the top of `ops/APPROVALS.md` and follow §5.
5. A question that appears more than twice in a week or a month becomes a new or better "Quick answers" line in that listing (`response-standards.md` §8). Record the change in the run log.
6. Count messages, the top 3 topics and any Etsy cases for the weekly scorecard. Record counts only.

**F, once a week (target: 5 minutes or less):**
1. Open Etsy Messages on the web or in the Etsy Seller app.
2. Paste each drafted reply or choose the matching saved reply, fill in the buyer's first name inside Etsy, and send.
3. Issue any refund the reply promises through Etsy's order page (UNVERIFIED path). The routine cannot refund on Etsy without an API (UNVERIFIED).

**Privacy:** nothing from an Etsy conversation is copied into this repository: no names, usernames, order numbers, addresses, children's details or message text (`response-standards.md` §7). Drafts carry `{first_name}`, and the founder fills it in inside Etsy.

**Reviews:** follow `ops/ROUTINE.md` §5b and COMPLIANCE-GATE line 22. No public reply until the private fix is done and about 7 days have passed, at most one reply, and only with founder approval. Never ask anyone to change or remove a review, and never tie an offer to one.

## 4. Etsy-safe replies

**Rules for every Etsy reply:**
- No URL, short link, QR code or email address, and no "visit our website". Etsy may treat moving a buyer off Etsy as a policy breach (UNVERIFIED).
- No reply-time promise and no date.
- No health, developmental or outcome promise (`response-standards.md` §3).
- Start with `{first_name}` if Etsy shows it. End with "Warmly, the Play Before Pixels team".
- F approves this section once, together with `macros.md`. After that, the replies are used unchanged except for `{placeholders}`.

**E0. Automatic reply** (only if Etsy supports one outside vacation mode)
> Thank you for your message! Most answers are in the "Quick answers" at the end of each listing and in our shop FAQ. Every message gets a reply here in Etsy Messages.

**E1. Where is my download?**
> Hi {first_name}, thank you for your order! Etsy emailed your download link right after payment. You'll also find the files on your Etsy Purchases page. Downloading works best on a computer or in your phone's web browser. Please start with the file called START HERE. If anything doesn't open, reply here and we'll sort it out.

**E2. The file won't open**
> Hi {first_name}, sorry the file is giving you trouble! Two things usually fix it: open it on a computer if you can, or use a free PDF reader app instead of a browser preview. If it still won't open, reply here with the device you're using and what you see, and we'll fix it or refund it.

**E3. Printing, size or cut-off edges**
> Hi {first_name}, good question: print settings trip up almost everyone! Pick the file that matches your paper (US Letter or A4) and choose "Actual size" or "100%" in the print window, not "Fit". Card stock holds up best for cards. If a page still prints oddly, tell us which page and we'll take a look.

**E4. Can I share it or use it with a class?**
> Hi {first_name}, thank you for asking first! Your purchase is for your own household (a Personal / Family license), so please don't share the files. We don't sell classroom or site licenses yet. A friend can buy their own copy from our Etsy shop.

**E5. The file is faulty, incomplete or not as described**
> Hi {first_name}, you're right, and we're sorry about that. {We've fixed the file: download it again from your Etsy Purchases page. / We've refunded your order in full through Etsy.} Thank you for telling us.

**E6. Change-of-mind refund on a digital file**
> Hi {first_name}, thank you for being honest with us. Because digital files can't be returned once they're downloaded, our shop policy doesn't cover change-of-mind refunds. If the activities don't suit your child's age, tell us the age and we'll suggest which of our listings fits better. If anything is wrong with the file itself, we'll always fix it or refund it.

*(EU/UK buyers may have a statutory right to cancel; when in doubt, draft it for the founder. `legal/SHIPPING-RETURNS-REFUNDS.md` Part B §3.)*

**E7. A worry about a child's development**
> Hi {first_name}, thank you for writing. We can hear how much you care. We make parent-education materials, and we can't give medical, developmental or speech-language advice about an individual child. The best next step is to share your concerns with your child's pediatrician or health provider. In the US, children under 3 can also be evaluated for free through your state's early intervention program, and you can contact it yourself. You're doing a good thing by asking.

*(Same check as macro 31 before approval: confirm the early-intervention sentence on the official program page. No product, no link, no cause, no diagnosis, and never "therapy", "treat" or "improve".)*

**E8. Anything else (custom requests, questions no reply covers)**
> Hi {first_name}, thank you for your message. We've passed it on and will write back here in Etsy Messages.

*(Then R drafts a proper reply in the next weekly batch. E8 names no date.)*

## 5. Risk: Etsy's response expectations (UNVERIFIED)

A weekly batch is slower than Etsy's expectations. This is a known, accepted risk, and it never justifies a written reply-time promise.

- **Star Seller.** From memory, the badge needs about 95% of first messages answered within 24 hours, plus on-time dispatch and a high review average, measured over a few months (UNVERIFIED; `ops/RESEARCH-BACKLOG.md` RB-67). A weekly batch will miss the message criterion, so plan on **not** having the badge.
- **Visible response time.** Etsy may show buyers how quickly a shop usually replies (UNVERIFIED). A slow figure can lower conversion.
- **Cases.** A buyer with a problem (for example, "file not received") can open a case with Etsy after messaging the shop and waiting a short period, about 48 hours from memory (UNVERIFIED). With a weekly batch, a buyer can open a case before we answer. Cases and slow answers can hurt the shop's standing, and repeated problems can lead to payment reserves (UNVERIFIED).
- **First reviews.** An unanswered download problem is the most likely early 1-star review (`ops/PRE-MORTEM.md` risk 8), and the first reviews set conversion for months.

**Mitigations:**
1. **Prevention first (§2).** Quick answers in every listing, START HERE as file 1, and a shop FAQ. This is the main defense.
2. **Stage Etsy.** List the two lowest-support digital products first. Add the rest after 2 weeks with no file-access messages (`ops/PRE-MORTEM.md` risk 8, fix 5).
3. **Saved replies** so each answer takes seconds.
4. **An optional extra check (founder's choice, not a promise).** For the first 8 weeks after the shop opens, F may open Etsy Messages a second time each week (for example Thursday), using saved replies only, then drop back to weekly if volume stays low. This goes into `ops/APPROVALS.md` as a choice before the shop opens. It is never mentioned to buyers.
5. **Early warning.** Any Etsy case, or 2 or more messages about the same file in one week, means R fixes the file or the listing text in that week's run and adds one line to `ops/APPROVALS.md` (`ops/PRE-MORTEM.md` R3 and O10).

## 6. Other marketplaces

Teachers Pay Teachers and Amazon also have no message API that we know of (UNVERIFIED). The same pattern applies to them: answers in the listing, replies drafted weekly under the §4 rules, and no reply-time promise. TpT stays HELD until employment counsel clears school-facing sales.

## 7. To check in the fresh session (all UNVERIFIED)

1. Etsy Open API v3: is there any conversations or messages endpoint, and any refund endpoint?
2. Do Etsy's new-message notification emails include the message text?
3. Etsy saved or quick replies: do they exist, and are there limits?
4. Can an automatic reply run outside vacation mode? Does vacation mode hide listings?
5. Is there a per-listing FAQ field, or only a shop FAQ, and what is its entry limit?
6. Star Seller criteria (message rate and window, measurement period).
7. Is the shop's reply time shown to buyers?
8. The case-opening rules: the wait after messaging, and the effect of cases on the shop.
9. Etsy's rules on links, email addresses and taking buyers off Etsy in messages.
10. Where buyers download digital files on web and app, and what the pages are called now.
