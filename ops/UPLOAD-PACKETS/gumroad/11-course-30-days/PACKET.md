# Gumroad packet 11: 30 Days of Back-and-Forth (the course) and its $49 bundle

**Sale opens:** Dec 15, 2026 (/30-days, never /reset) · **Launch:** Dec 26 · **Self-paced start date shown at checkout:** Jan 4, 2027 · **Price:** $27.00; bundle $49.00 · **Record:** `products/course-screen-reset/listing.json`

Needs nothing from the founder (business/DECISIONS.md, 2026-09-28): every lesson, email, workbook page and FAQ is finished. The only value to fill in is the public PO Box address, which is account setup, not writing.

## Product 1: the course
| Field | Paste |
|---|---|
| Name | 30 Days of Back-and-Forth |
| Price | $27.00 |
| URL | gumroad.com/l/`30-days` (the site's /30-days page links here) |
| Summary | A written 30-day plan by email: one short lesson, one easy play and plain words for a tricky moment each day, plus a printable workbook. Ages 1–5. |
| Thumbnail | `products/course-screen-reset/preview/listing-images/01-hero.png` |
| Cover | `products/course-screen-reset/mockup.png` |
| Discover | On (a Discover sale nets $16.47 against a $3.00 floor; UNVERIFIED fees) |
| Offer codes | None |

### Description (paste)
```
A written 30-day program for ages 1 to 5, by email with a printable workbook: 30 short lessons, 30 easy plays and 38 plain-word scripts for tricky moments.

Each day, one short email comes. It has a lesson you can read in about three minutes and one easy play. It also gives you plain words for one tricky moment, like a show that won’t end, ‘I’m bored’ or a long car ride.

Nothing is banned. Screens get a steady spot in the day, with the same time and the same ending. They are never a prize or a punishment. The rest of the day fills up with play and back-and-forth talk.

Your 89-page workbook comes in Color and Low-ink, in US Letter and A4. You can type in it with free Adobe Acrobat Reader. Inside are plans, trackers, weekly check-ins, a bank of scripts, a family plan and a Day 30 certificate.

Every play has a starting age, an easier and a harder version and a 2-minute version for tired days. 22 of the 30 plays need no prep, and the rest take about 2 minutes. Every play uses things you already have and follows our published safety rules.

It costs $27, about 90¢ a day. It is parent education, not medical advice. There are no videos, calls or coaching. 14-day money-back guarantee: a full refund if you email us within 14 days of purchase and have completed no more than 30% of the lessons.

Personal license for one household. Please don't resell or share the files.

How this was made: the text, illustrations and page layout were created with AI tools for Play Before Pixels.
```

### Files (in this order)
| # | File | Source |
|---|---|---|
| 1 | `1. START HERE.pdf` | `products/course-screen-reset/downloads/1. START HERE.pdf` |
| 2 | `2. Workbook - Color - US Letter.pdf` | `products/course-screen-reset/downloads/2. Workbook - Color - US Letter.pdf` |
| 3 | `3. Workbook - Low-ink - US Letter.pdf` | `products/course-screen-reset/downloads/3. Workbook - Low-ink - US Letter.pdf` |
| 4 | `4. Workbook - Color - A4.pdf` | `products/course-screen-reset/downloads/4. Workbook - Color - A4.pdf` |
| 5 | `5. Workbook - Low-ink - A4.pdf` | `products/course-screen-reset/downloads/5. Workbook - Low-ink - A4.pdf` |

### Drip emails (Gumroad Workflow: trigger = purchase of this product)
- All 35 emails, with delay, subject and preheader, are in **`DRIP-EMAILS-PAID.md`** (this folder), in order. Paste each into one workflow email.
- Emails with the same delay go out together. Gumroad sends by days after purchase, not a fixed hour, which is why the copy says 'each day'.
- Make an identical workflow for the bundle product (Product 2).

### Receipt text
```
Thank you for choosing 30 Days of Back-and-Forth!

Your first email (Day 0) arrives now; Day 1 arrives tomorrow. Start with START HERE in the files below.
Download on a computer, or on a phone in a web browser. Your files stay in your Gumroad Library, so you can download them again any time.
Print at 100% / Actual size. Low-ink files save ink; A4 files are for printers outside the US.

Something won't open or print? Reply to this email and we'll fix it or refund it.

Next for your child's age: Play-First Family Kit (ages 2–5) · 100 Screen-Free Plays (ages 0–5) (playbeforepixels.com/shop/).

Know a family who'd like some play ideas? Our free printable is at playbeforepixels.com/free/

Parent education, not medical advice. Every play follows our published safety rules.
Play Before Pixels is a trade name of AlphaPlay LLC.
```

### Refund text (course)
```
14-day guarantee: if the program isn't right for your family, email us within 14 days of purchase for a full refund, as long as you have completed no more than 30% of the lessons. After that, course fees are non-refundable, but you keep every lesson email and the workbook files. If a file won't open or print, or you were charged twice, we fix it or refund it. Full terms: playbeforepixels.com/shipping-returns/
```
This is legal/SHIPPING-RETURNS-REFUNDS.md Part B §4 word for word in meaning. Founder decision still PENDING in ops/APPROVALS.md: keep 14 days or change to 30. If it changes, the policy changes first, then `REFUND` in build/content.js, then rebuild, then this packet.

## Product 2: 30 Days of Back-and-Forth Bundle ($49.00)
- Contents: 30 Days of Back-and-Forth (program + workbook); Play-First Family Kit, Ages 2–5 (play-first-family-kit-ages-2-5); 100 Screen-Free Plays, printable PDF (guide-100-plays); 76 I’m Bored Play Cards (bored-play-cards-ages-1-5).
- 'Separately' line only as: "$49.00, or $54.49 bought separately", and only while every part is live on Gumroad at its everyday price ($27 + $11 + $9.99 + $6.50).
- Files: the 5 course downloads, then the store files of the Family Kit 2–5, 100 Screen-Free Plays PDF and the bored cards 1–5 (see Gumroad packets 03, 04 and 05). Zip each part (`stage.py gumroad 11` builds `Play-First-Family-Kit.zip`, `100-Screen-Free-Plays.zip`, `Bored-Play-Cards.zip`).
- Same workflow emails as Product 1. Same refund text (the guarantee covers the program; the printables follow the digital policy).

## Free starter (year-round funnel)
- A $0 Gumroad product '7 Days of Play First' with the two PDFs in `products/course-screen-reset/funnel/starter/`, and a workflow from **`DRIP-EMAILS-FREE-STARTER.md`**.
- It collects an email only. Nothing asks for a child's name. Double opt-in is the email platform's job if one is used (Option B in emails/LOADING.md).

## Checklist (15 minutes, one time, on or after Dec 15)
1. `ops/PAUSE` gone; APPROVED lines exist for the product and for each sequence (ROUTINE 'Never').
2. Replace `{{business_mailing_address}}` in a copy of the email text (do not commit the address until it is public).
3. Create Product 1, paste fields, upload files, publish as unlisted; create the workflow from DRIP-EMAILS-PAID.md.
4. Create Product 2 and copy the workflow; publish unlisted.
5. Send the whole sequence to a test inbox (a 100% test code, deleted afterwards) and click every link: /30-days, /30-days/start, /30-days/feedback, /shipping-returns/, /help.
6. Switch both products to public on Dec 15. Record URLs in ops/PUBLISHED.json.
