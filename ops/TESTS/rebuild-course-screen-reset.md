# Rebuild note: course-screen-reset (30 Days of Back-and-Forth), 2026-09-28

**Status:** `ready-pending-accounts`. It is the 0–5 (G0) edition and needs nothing from the founder. It waits only for the Gumroad account (launch Dec 15, ops/QUEUE.md) and the one-time email loading in emails/LOADING.md.

## What changed
- **Nothing needed from the founder.**
  - FOUNDER in build/content.js became NOTES, which holds finished brand-voice text ("we"): the welcome note (88 words) and the Day 30 note (62 words). The sales-page note is 'skip', and emails are signed "The Play Before Pixels team".
  - The day-0 and day-30 "FOUNDER WRITES THIS" boxes are gone. The build now throws an error if a note is ever empty.
  - The optional personal slots moved to founder-notes.md, which is marked "Nothing in this file is required".
  - make.sh --final now fails on any placeholder, and it passed.
- **No beta and no outreach.** The "founding beta / invite 15–30 families" step was removed from listing.json (human_todo, launch_notes, price_notes) and from sales-page.md. The launch is the listing, the free starter sequence and the site only. It stays written and email-only, with no calls, video or live parts.
- **Refunds.** Every mention now matches legal/SHIPPING-RETURNS-REFUNDS.md:
  - Part B §4: 14 days, and no more than 30% of the lessons completed. After that, fees are non-refundable, but buyers keep the emails and the workbook.
  - Part B §3: files that won't open or print, and double charges, are fixed or refunded.
  - The terms appear in the welcome email, the FAQ, the sales page, START HERE and the listing. The "reply to this email" wording became "email us … (replying to this email works)".
- **Emails ready to load.**
  - 35 program emails: the welcome/access email, 30 lessons, 3 check-ins and the day-31 wrap-up. There are also 7 funnel emails.
  - Each has an .html and .md version for an email platform, and a new Gumroad edition in emails/gumroad/ and funnel/gumroad/. The Gumroad edition has workflow.json with delays, fixed links instead of merge tags, and no pause or unsubscribe link, because Gumroad adds its own (UNVERIFIED).
  - emails/LOADING.md explains both routes.
  - The address merge tag is now {{business_mailing_address}}.
  - "Every morning" and "pause or change the send time" promises were taken out of the body copy, because Gumroad cannot keep them.
- **0–5 (G0) edition, per ops/QUEUE.md.** The built version had school-age material throughout.
  - The weekly "School-age kids (5–12)" boxes are now "Preschoolers (3–5)", and the other box is now "Toddlers (1–3)".
  - About 40 big-kid lines were rewritten for toddlers and preschoolers. Day 25 "Big kids and fairness" became "Fairness and turns". The homework script became a video-call script.
  - The ages in the FAQ, workbook, cover, back cover, sales page, listing images and listing.json are now 1–5.
  - The 1–12 text is kept, unpublished, in build/held-5-12/, to go into the same listing as a free update after G1.
- **Held licenses removed.** The FAQ used to invite schools, centers, libraries and PTAs to ask for a group or site license. It now says "Not yet". license_tiers is personal only, and a license_notes field was added.
- **Honesty fixes.**
  - The sales page, FAQ and mockup no longer say the paperback is on Amazon; it is "planned".
  - The gift FAQ no longer relies on the paperback.
  - The back cover's "collect the shelf" line no longer lists the held books.
  - "Next for your family" swaps The Day the Tablet Slept (held) for the Toddler Busy Book.
  - "150 I'm Bored Play Cards" became 76, which is the G0 edition in the bundle.
- **Type 3 fonts: 0.** The low-ink "z z z" SVG text was stroked. It is now filled.
- **Logo.** Every output was rebuilt with the Maker's Seal through build/make.sh: 5 downloads, the Etsy edition, the KDP interior and cover, START HERE, the starter, cover, mockup, 8 listing images, the sales page and the previews.
- **Listing.** status, status_notes, license_tiers and license_notes were added. human_todo was rewritten: nothing to write; the KDP route uses Amazon's free ISBN. Price $27, bundle $49, price_floor and nets are unchanged.

## Tests
- check_listings.py: 0 FAIL and 0 WARN.
- PyMuPDF scan of 11 PDFs:
  - 0 Type 3 fonts;
  - no FOUNDER, PLACEHOLDER, [VERIFY], TODO or lorem;
  - no URL in the Etsy edition;
  - no license offer.
- check_fonts.js: all 22 print and page sources are ok. The 42 HTML emails still FAIL by design: they use email-safe system fonts, and their {{logo_url}} tag doesn't load in the test. print-fixes.md already records this as expected.
- make.sh --final passed.
- unchanged_renders.py --restore was run.
