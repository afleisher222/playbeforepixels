# Play Before Pixels: Design System and Site Build Spec

Status: binding for `site/`. Written September 28, 2026 by the studio creative director after the three-concept review.
Controls: `brand/BRAND.md` and `CLAUDE.md` win over anything here. If this file ever conflicts with them, follow BRAND.md and fix this file.

---

## 0. The decision

**Winner: Direction C, Paper & Print Craft**, by total judge score.

| Concept | Art director | Conversion & UX | Accessibility & nav | Total |
|---|---|---|---|---|
| **C: Paper & Print Craft** | 7.5 | 8.4 | 8.8 | **24.7** |
| A: Picture-Book Editorial | 8.0 | 6.5 | 8.1 | 22.6 |
| B: Bold toy-shop commerce | 6.0 | 6.8 | 6.2 | 19.0 |

**Why C:**
- It is the only concept built on the current, real assets: the final P-mark lockup, the 22-word *Up! Go! More!*, *Laps Not Apps*, *100 Screen-Free Plays* and the 52 cards.
- Its product data matches `listing.json`.
- Its mega-menus follow the disclosure pattern correctly. Tab moves into an open panel, and a click after hovering doesn't slam the panel shut.
- It passed every phone check with `isMobile: true`.

A's editorial layout is the stronger art direction, so it is grafted in wherever the art director scored A higher.

**Starting point:** `site-concepts/winner/`. It is a full copy of C (CSS, JS, catalog, page sources, page builder, QA suite, assets). The navigation and accessibility fixes the judges asked for are already applied there (see §11). Rebuild the pages with `node _tools/build.js`. Test them with `node _tools/qa.js`, which currently passes **637 of 637** checks.

---

## 1. Design principles

1. **The book leads.** Real spreads, covers and pages carry every screen. Type and colour exist to frame the art, never to compete with it. Squint test: the one most important thing on the screen is still obvious with eyes half-closed.
2. **Printed matter, not UI chrome.** Borrow from print production: running heads on hairline rules, captions, crop marks, a colophon, catalogue cards and stamps. Each device is used **once per page, where it means something**. Craft that repeats on every tile turns into a gimmick.
3. **Organised by age, the way a parent thinks.** Every product, filter, menu and email sits on one age scale (0–1, 1–3, 3–5, 5–8, 8–12). Age is always shown as colour **plus** a word label, never colour alone.
4. **One job per section, one filled button per screen.** Secondary actions are text links. The home page has at most 6 sections, and a grid shows at most 8 items before "Show all N".
5. **Specific over clever.** Use real prices, trim sizes, page counts, formats and ship times. Where a human must supply something (ISBN, barcode), show a boxed label instead of inventing it.
6. **Calm is a feature.** No pop-ups on arrival, no auto-play, no countdowns, no badge overload, no "was" prices (FTC 16 CFR 233.1).
7. **Navigation never surprises.** Every link lands on a real page or a real in-page target. Back always restores the previous view. Focus always goes somewhere sensible. The phone is the primary device.
8. **The research hub is quieter than the shop.** It uses white and wash grounds, one accent, no product ads and no autism keywords anywhere else.

---

## 2. Tokens

All tokens live on `:root` in `site/src/styles/tokens.css`. Components never use raw hex.

### 2.1 Colour: light theme (default)

| Token | Hex | Use | Contrast (measured, WCAG 2.x) |
|---|---|---|---|
| `--ink` | #1D2940 | text, dark fields (footer, cutting mat) | 14.55 on paper · 13.43 on wash · ≥12.03 on every tint |
| `--ink-2` | #47526B | secondary text | 7.81 on paper · 7.21 on wash · ≥6.46 on tints |
| `--ink-3` | **#5E6883** (was #6B7590) | meta text, age sublabels, "from" labels | 5.55 on paper · 5.12 on wash · 4.72 on sky-t · ≥4.59 on every tint |
| `--paper` | #FFFFFF | page ground | — |
| `--wash` | #F3F6FB | soft section ground | — |
| `--rule` / `--rule-2` | #D8DEE9 / #E7EBF2 | hairlines (decorative only) | — |
| `--tomato` | #EE5A36 | one headline accent, the ball in the logo, button hover offset | white on it 3.41 (large text only, ≥19px/800) |
| `--tomato-ink` | #BF3A19 | tomato as text and link hover | 5.48 on paper · ≥4.53 on tints |
| `--sun` | #F5B820 | focus and hover on dark, cart count, newsletter button | ink on sun 8.15 · sun on ink 8.15 |
| `--sky` | #3D86D8 | band fill (0–1), illustration | white on it 3.75 (large only) |
| `--sky-ink` | #2366B3 | **focus ring**, links on tints | 5.80 on paper · ≥4.79 on every tint |
| `--grass` / `--grass-ink` | #2FA36B / #1E7A4D | band fill (1–3) / green text | grass-ink 5.32 on paper |
| `--plum` | #8A5CC7 | band fill (8–12) | white on it 4.73 |
| Tints `--tomato-t` `--sun-t` `--sky-t` `--grass-t` `--plum-t` | #FDE9E3 #FEF4D8 #E3EEFA #DFF3E9 #EFE6FA | page grounds, product surfaces, age chips | — |

**Age bands (one system, everywhere: site, emails, product pages, marketplace images):**

| Band | Name | Fill | Tint | Label on fill |
|---|---|---|---|---|
| 0–1 | Babies | sky | sky-t | white, ≥19px/800 |
| 1–3 | Toddlers | grass | grass-t | white, ≥19px/800 |
| 3–5 | Preschool | sun | sun-t | ink |
| 5–8 | Early school | tomato | tomato-t | white, ≥19px/800 |
| 8–12 | Big kids | plum | plum-t | white |

Small text on a band colour is always ink on the **tint**, never white on the fill. A book character placed in a band must not wear that band's colour.

### 2.2 Colour: dark theme

The dark theme applies under `@media (prefers-color-scheme: dark)` guarded by `:root:not([data-theme="light"])`, and again under `:root[data-theme="dark"]`. The concept is light-only today; the build must add this. Book art and product surfaces keep their light tints in dark mode, so they read as physical paper on a dark desk.

| Token | Dark value | Measured |
|---|---|---|
| `--ground` | #111827 | — |
| `--surface` | #1A2336 | — |
| `--surface-2` | #232E45 | — |
| `--text` | #F3F6FB | 16.38 / 14.49 / 12.52 on ground / surface / surface-2 |
| `--text-2` | #C5CCDB | 11.01 / 9.74 / 8.42 |
| `--text-3` | #9CA6BD | 7.27 / 6.43 / 5.56 |
| `--accent-tomato` | #FF8A6B | 7.69 / 6.80 / 5.88 |
| `--accent-sun` (focus) | #F5B820 | 9.93 / 8.79 / 7.60 |
| `--accent-sky` | #7FB2EE | 8.03 / 7.11 / 6.14 |
| `--accent-grass` | #5CC795 | 8.50 / 7.52 / 6.50 |
| `--accent-plum` | #B997E8 | 7.31 / 6.47 / 5.59 |
| `--rule` | #34405A | decorative only |

### 2.3 Type

Fonts are loaded only from local files (`brand/fonts/fonts.css`, copied to `/assets/fonts/` at build). Fallback stacks are always declared. Figures are `tabular-nums lining-nums` for every price, count and ruler value.

| Role | Font / weight | Size (min → max, `clamp`) | Line height | Tracking | Notes |
|---|---|---|---|---|---|
| Display (hero only) | Bricolage Grotesque 800 | 52 → 104px (`clamp(52px, 7.4vw, 104px)`) | 0.90 | −0.045em | max 4 lines at 1440; `text-wrap: balance` |
| H1 | Bricolage 800 | 40 → 84px (34px on the phone shop) | 0.94 | −0.04em | one per page |
| H2 | Bricolage 800 | 34 → 60px | 0.96 | −0.035em | |
| H3 | Bricolage 800 | 21 → 26px | 1.10 | −0.015em | |
| Card title (`.p-title`) | Bricolage 800 | 19px (16.5px ≤760px) | 1.12 | −0.015em | h2 on the shop grid, h3 inside sections |
| Research H1/H2 | Bricolage **700** | as H1/H2 | +0.02 | −0.03em | calmer weight |
| Lede | Nunito Sans 400 | 18 → 21px | 1.50 | 0 | max 36em |
| Body | Nunito Sans 400 | 17px | 1.60 | 0 | 34–40em measure on research and help |
| Small / meta | Nunito Sans 600–700 | 14px (never below 13px for meaning) | 1.50 | 0 | |
| Label / running head | Nunito Sans 800 | 11.5px | 1.20 | +0.16em, uppercase | 44px-wide rule after the label |
| The child's word | Fredoka 600 | 22 → 64px | 1.00 | −0.01em | only where the books use it: word explorer, 22-word strip, Grown-up corner band |
| Handwritten note | Caveat 700 | 22 → 28px | 1.00 | 0 | at most 2 per page; never body copy |

Micro-typography rules:
- Curly quotes and apostrophes, en dashes in ranges (0–1), and × in sizes (6 × 6 in).
- Whole prices drop ".00". This is now done in `money()`.
- A drop cap opens the long product description (from A).
- Links are underlined 1.5px with a 0.22em offset. On hover the colour changes to `--tomato-ink` and the underline goes to 2px.
- Non-USD prices are prefixed with "≈" and noted as estimates.

### 2.4 Spacing, layout, radii, shadows

- **Spacing scale (px):** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128. Section padding is `clamp(64px, 8vw, 128px)` vertical.
- **Layout:** `--maxw: 1320px`; `--gutter: clamp(16px, 4vw, 56px)` (16px at phone width). Grids are asymmetric: 7/5, 5/7, and 4.4/4.6/3 on the home page. A layout with three equal columns needs a reason.
- **Radii:** 3px for the focus outline · 6px for product surfaces and mega panels · 10px for age index-tabs (top corners only) · 999px for buttons and chips. Nothing else is rounded.
- **Shadows (used sparingly):** `--lift` and `--lift-hi` go **only under physical objects** (books, sheets, decks) and on the hover of an age tab. Never on text blocks or cards as a default.
- **Texture:** paper grain (SVG noise, multiply, 13–25%) only on product surfaces and the hero ground. It is never on text and never on the research hub.

---

## 3. Components

Each component lists its behaviour contract. The QA test in §10 checks every **bold** requirement.

**Header.**
- The utility bar (ink) has: shipping line · Help centre · **Schools can pay by purchase order** · Resend my download · Currency. It scrolls away.
- The white main bar is sticky. It holds: logo lockup (`brand/logo/lockup-horizontal.svg`) · Shop · Books · For Teachers & Groups · Research · About · Search · Cart.
- There are exactly 5 top-level items.
- `aria-current` marks the current section, shown as a 2px tomato underline.

**Mega-menu** (disclosure pattern):
- Each trigger is a `<button aria-expanded aria-controls>`, and its panel is nested in the same `<li>`, so **Tab moves from the trigger into the open panel**.
- **Click toggles the panel.** Hover intent opens it after 110ms and closes it after 220ms.
- **A click within ~450ms of a hover-open never closes the panel.** The panel stays locked after Escape or after choosing a link.
- **ArrowDown focuses the first link.** **Escape closes the panel and returns focus to its trigger.**
- Focus leaving the header closes it, and so does a click outside.
- The scrim sits under the header layer, so there is no hover flicker.
- Panels:
  - **Shop:** age index-tabs with counts · types with counts · one feature.
  - **Books:** a shelf of 4 real covers with ages and "from" prices.
  - **Teachers & Groups:** every product row shows its price (**done**), plus licences, POs and quotes.
  - **Research:** hub entry with the framing sentence and 5 start-here anchors.
- The torn edge under panels stays; it is the single torn edge on the page.

**Mobile menu** (below 1060px):
- A left drawer with `role=dialog aria-modal`.
- Order inside: **age chips first (Menu → age = two taps)** · search hand-off · accordions (Shop, Books, Teachers & Groups with prices, Research) · About · help links · currency · language.
- **Focus trap** for Tab and Shift+Tab. **Page behind is `inert`.** Body scroll is locked.
- **Escape and ✕ close it and return focus to Menu.**
- **A same-page link closes the menu and applies the filter.**
- The accordion for the current section starts open.
- Every tap target is at least 44×44.

**Search:**
- A top sheet. It opens with the button or **"/"**. It is an ARIA combobox and listbox.
- Result groups: Products · Pages and answers (help answers included) · "See every product matching '…'".
- **↑/↓ highlight a result. Enter opens the highlighted result. Enter with no highlight goes to `/shop/?q=…`**, which becomes `shop.html#q=` in the concept.
- The empty state shows suggestion chips and never a dead end.
- Header button name: **"Search"**, with `aria-keyshortcuts="/"`.

**Cart drawer:**
- A right drawer with a focus trap, Escape, scrim click and focus return.
- Lines show quantity steppers and a remove button. Subtotal is in the chosen currency, with shipping notes for digital vs printed items.
- Storage is **persisted** in localStorage, wrapped in try/catch with an in-memory fallback, and **synced across tabs** (`storage` event).
- **Polite live region announces "Added {title}, {format}, to your cart. N items in cart."**
- The header button's name **"Cart, N items"** updates live.
- **Empty cart shows the five age chips.**
- Checkout goes to `links.js shopify` when that field is filled. Otherwise it shows an honest "opens at launch" message.

**Product card:**
- Surface tint with the product mockup, then title (a link that makes the whole card clickable), then one line of copy, then price.
- The foot shows the price and **either "Add" (single format) or the age dots with ages**.
- **No stamps on grid tiles** (removed). Stamps appear only on the product page and in quick view.
- Every card in the same grid has the same foot structure.

**Product page blocks, in order:**
1. Breadcrumb.
2. Gallery: product photo, cover, real inside pages; thumbnails work with arrow keys; one Caveat note ("actual trim: 6 × 6 in").
3. Title with the italic subtitle and series line ("Book 1 of 3").
4. Age-band mini ruler.
5. **Format radio cards with the price inline** (from B). Unavailable formats show "Pre-order" or "Coming", never a fake date.
6. Quantity.
7. One filled button: "Add to cart · $12.99".
8. Ship line.
9. "Also sold at" (links.js, hidden when empty).
10. Word explorer (22 real words: page, cue and Grown-up corner tip).
11. **Grown-up corner band:** ink ground with 6 tips quoted word-for-word in Fredoka (from B).
12. Details table: trim, pages, binding, ISBN in a **dashed box labelled "ISBN / barcode · assigned at release"**.
13. FAQ accordions (BRAND "Answers already included").
14. "Next for your child's age" (next_products, max 4).

**Format selector:** a `fieldset` with a `legend`, radio inputs inside labels (the whole card is clickable), and the price in tabular figures. Changing the format updates the price, ship line and add button without moving the layout.

**Age-band scale (ruler):**
- A 0–12 axis with segments sized by years (1:2:2:3:4).
- Tick marks at months (first year) and half-years (to 5).
- Product covers stand on the ticks on the home page (from C). The saturated fills plus one book character per band are **the single strong colour moment on the home page** (from B).
- On phones the ruler becomes five labelled chips, never an unlabelled bar.
- The same scale is used for the home shelf, shop tabs, the mini ruler, the research guideline chart and the empty cart.

**Bundle card:**
- Contents are listed and shown as a fanned stack.
- The honest sum-of-parts line reads "Bought one by one: $36.98".
- No strike-through, no "Save" sticker, no "was" price.

**Collection filters:**
- Sticky age index-tabs (`aria-current`) and type chips (`aria-pressed`) with the count and a sort select.
- **State lives in the URL.** The heading, breadcrumb and `<title>` follow the state, and **Back restores it**.
- The empty state offers a reset. "Show all N" appears after 8.
- On phones the head plus filters must leave **the first price visible on the first 390×844 screen**.

**Breadcrumbs:** on every inner page, as `nav[aria-label=Breadcrumb] > ol`. The last item has `aria-current="page"`. Links are 44px tall on touch screens.

**Research article layout:**
- A "Please read first" note at the top ("a term some clinicians use; not a medical diagnosis; associations, not causes; talk with your child's doctor").
- "Last reviewed {date}".
- **Sticky contents list that highlights the current section** (from B).
- A 34–40em measure. Big display figures only for the allowed Brushe numbers (1,139 / 843 / 194).
- **Numbered citations** link to a reference list set as library catalogue cards. This is the only place the catalogue-card treatment is used.
- Only BRAND rule 5 citations, in their exact wording. Summaries add no details beyond the allowed wording.
- Share buttons. No product ads. At most one invitation to the free play printable, framed as family play.

**Email sign-up:**
- Email is required. Birth month and birth year are optional. **Never a name.**
- One filled button, an inline status message (`role=status`) and a one-line privacy note.

**Footer (ink):**
- Sign-up.
- Columns: Shop by age · Shop by type · Help · About.
- Language select (English US/UK; other languages disabled and labelled "coming 2027").
- Currency select, synced with the header.
- "Follow" and "Also sold at" lists built from `commerce/links.js`, **showing only non-empty `https://` values**. The `booking` field is **never** rendered.
- Legal row: Privacy · Terms · Accessibility · Shipping · Returns · Licenses · Disclaimer.
- Reverse lockup and the copyright line: **"© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC."**
- Colophon: "Founded by a parent and educator. Parent education, not medical advice."
- The colour-control strip is removed.

**Buttons and links:**
- Filled pill: ink, 52px tall, and on hover a 3px tomato offset shadow and a 2px lift.
- Light pill on dark grounds.
- Text links are 800 weight with an arrow that moves 3px on hover.
- Only one filled button per screen.

---

## 4. Image and illustration rules

- **Only real assets:** `products/*/cover.png`, `mockup.png`, `preview/*.png` and `build/*.png`, plus `brand/logo/*`. The build copies and resizes them to `/assets/img/` as WebP (plus a PNG fallback for OG images) and emits `width`/`height`.
- **Always the current renders.** The build reads the product folders every time; it never uses a copy in a concept folder. Covers must say "22 first words".
- Product "photography" is HTML/CSS objects built from those files:
  - a board book with a thick rounded edge
  - a paperback with a spine highlight
  - loose sheets
  - a fanned bundle
  - a tuck-box deck
  - a kit folder
  - a workbook
  - tee and tote flat-lays

  Each sits on a tint surface with a contact shadow. No stock photos, no AI photos, no people photos, no founder photo.
- The hero is **a real book spread** (from A): the type-only title page on the left, the real spread running to the right edge with a gutter shadow, the grown-up tip written under each page, and a spec-line buy strip. **No circles, blobs, floating pills or tilted products on discs.**
- Print devices, each used once where it means something:
  - crop marks around a real spread
  - one torn edge (under the mega panels)
  - a perforated rule under the header
  - the navy cutting mat for printables (cm ruler, real PDF price list)
  - a stamped site-licence certificate in the Teachers band
  - catalogue cards for citations only
- Illustrations follow BRAND.md: flat vector, brand palette, no gradients or outlines. Characters come from the book symbol library, and the cast is varied and inclusive.
- Alt text:
  - Covers and spreads get alt from `listing.json.alt_text`, or a description of the page.
  - Decorative mockups inside links get `alt=""` because the link has a text name.
  - Mockups that stand alone are `role=img` with an `aria-label`.
- Logos: only the files in `brand/logo/`. Use the reverse lockup on ink and `favicon.svg` plus the PNG fallbacks. When logo v2 lands, the build picks it up because it reads `brand/logo/` directly.

---

## 5. Motion

- **Durations:** 120–220ms for UI (menus, drawers, hover); 260ms for the cart-count bump.
- **Easing:** `cubic-bezier(.2,.7,.2,1)`.
- **Movement allowed:** 2–6px translations on hover (buttons, age tabs, arrows) and drawer slides (transform only).
- **Not allowed:** parallax, auto-playing carousels, scroll-jacking, looping animation, confetti.
- **`prefers-reduced-motion: reduce`:**
  - all transitions and animations drop to 0.01ms
  - `scroll-behavior` becomes `auto`
  - drawers appear without sliding
  - the hover lift is removed

  Smooth scroll is only enabled inside `prefers-reduced-motion: no-preference`.

---

## 6. Accessibility (WCAG 2.2 AA; the build fails if these regress)

- **Contrast:** 4.5:1 for text under 24px (under 18.66px bold), 3:1 for large text and UI boundaries. Measured values are in §2.1 and §2.2.
  - Grey meta text uses `--ink-3` #5E6883, which is ≥4.59:1 on every brand tint.
  - White on tomato, sky or grass is allowed only at ≥19px/800.
- **Focus:**
  - A visible `:focus-visible` ring everywhere: 3px `--sky-ink` (≥4.79:1 on every tint), offset 3px.
  - On ink grounds the ring is `--sun`.
  - A card's ring wraps the whole card.
  - Programmatic focus on `<main>` and headings shows no ring.
- **Skip link:** it is the first Tab stop and becomes visible when focused. **Enter moves focus to `<main tabindex=-1>` itself**, without changing the URL hash, so shop filters survive.
- **Landmarks:** `header` (banner), `nav` with labels (Main, Breadcrumb, Footer, Legal), `main`, `footer`. There is one `h1` per page and **no skipped heading levels** (shop product titles are h2; the About ledger uses h2).
- **Names:**
  - Icon-only buttons have `aria-label` at every width: "Search", "Cart, N items", "Close menu".
  - Visible labels hidden at phone width are `aria-hidden` so they never double up.
- **Target size:** at least 24×24 everywhere (2.5.8). **44×44 on touch** for header tools, menu items, chips, and footer, breadcrumb and legal links.
- **Dialogs:** `role=dialog aria-modal`, a label, a focus trap, `inert` on the page behind, Escape to close and focus return.
- **Live regions:** cart add and remove, shop result count, sign-up status, contact-form status.
- **Forms:** visible labels, `autocomplete`, errors in text next to the field (`aria-invalid`), and nothing required except email.
- **Zoom and reflow:** no loss at 400% / 320 CSS px, and no horizontal scroll at 320, 390, 768, 1024 or 1440 (**checked with `isMobile: true`**).
- `lang` on `<html>`, and `lang` on any foreign-language snippet.
- The accessibility statement page lists what was tested and how to ask for an accessible format.

---

## 7. Banned AI tells (a reviewer rejects the page if any appear)

1. Cream plus serif plus terracotta.
2. Purple or blue gradients, gradient text, glassmorphism.
3. Emoji as section markers or bullets.
4. Everything centred; three equal columns by default.
5. Identical rounded cards with soft shadows on every block; accent bars on cards.
6. Three-icon feature grids, including disguised ones such as a 2×3 grid of bold heads with coloured dots.
7. 01 / 02 / 03 numbering on things that are not a sequence.
8. "Unlock / Elevate / Empower / Journey / Seamless / Curated / Transform" copy.
9. Inter, Space Grotesk, or any system-font display.
10. Stock blobs, circles behind products, floating pills, tilted product on a disc.
11. A big empty hero with a vague headline.
12. Badge overload: NEW, SAVE, INSTANT on every tile; round stickers; struck-through "was" prices.
13. A bento mosaic hero; a giant ghosted wordmark in the footer.
14. Designer in-jokes a parent can't read (colour-control strips).
15. Invented product names or details not in `products/`; study details beyond the allowed citation wording.
16. More than one filled button per screen; more than 6 home sections.

---

## 8. Home page (six sections, final)

1. **Hero spread** (from A): the title page, the real *Up! Go! More!* spread, the tips written out under each page, and a buy strip ("Board book · 6 × 6 in · Ages 0–3 · $12.99 · Pre-order"). One filled button, "Shop by age". The second action is a text link.
2. **Shop by age:** the saturated ruler (0–12 scale, month ticks, covers standing on ticks, one book character per band). Chips on phones.
3. **The annotated "down" page** (from B), with Caveat margin notes, plus the featured book and its format radio cards. This replaces A's "six small moves" dot grid.
4. **Printables on the cutting mat** (from C): real PDFs with price tags and "Show all printables". Gift sets appear here with honest sum-of-parts wording.
5. **Teachers & Groups:** the stamped site-licence certificate, Classroom Pack $18 single / $39 site, Parent Night Kit, "Schools can pay by purchase order", and "Request a written quote".
6. **Research teaser plus colophon:** one Brushe figure framed as an association, a link to the hub, and "Founded by a parent and educator". The footer follows.

---

## 9. SITE BUILD SPEC

### 9.1 Shape

A **dependency-free static site**:
- `site/build.js` uses Node ≥20 and only the standard library.
- It reads the inputs below and writes `site/dist/`.
- There is no bundler, framework or client-side router.
- JS is progressive enhancement. **Every link works with JS off**, and filters fall back to query-string pages generated at build time.

```
site/
  build.js                 # the only build entry
  src/templates/*.js        # page-type templates (plain functions returning strings)
  src/partials/*.js         # header, mega panels, mobile menu, search, cart, footer
  src/styles/{tokens,base,components,pages}.css  → concatenated to dist/assets/site.css
  src/js/{nav,cart,search,shop,product,research}.js → dist/assets/site.js (one file, deferred)
  test/nav.spec.js          # Playwright navigation test (deploy gate)
  test/a11y.spec.js         # contrast, headings, names, target sizes
  dist/                     # output (git-ignored)
```

Start from `site-concepts/winner/`: `styles.css` becomes `src/styles/`, `nav.js` is split into `src/js/`, `catalog.js` is replaced by data read from `listing.json`, and `_tools/build.js` becomes `src/partials/`.

### 9.2 Inputs

| Source | Used for |
|---|---|
| `products/*/listing.json` | product pages, cards, catalog JSON for search, JSON-LD. **May be an object or an array** (e.g. `merch-core` holds a tee and a tote). Fields used: slug, title, subtitle, format, trim, pages, ages, price_usd, price_notes, short_description, long_description, bullets, seo_title, seo_description, alt_text, next_products, bonus_url, channels, amazon_route. |
| `products/*/{cover,mockup}.png`, `preview/*.png`, `build/*.png` | images (resized to WebP 480/960/1600) |
| `seo/articles/*.md` | `/learn/{slug}/` and `/research/{slug}/`. The front-matter `url` wins. Only `status: published` and `publish_gate: none` are built; drafts go only to `dist-preview/`. |
| `content/*.md`, `content/research-hub/**/*.md` | about, research hub, study pages, glossary, FAQ, editorial policy. A page with `publish: false` is never built into `dist/`. |
| `content/research-hub/_data/library.json` | the research reference list |
| `commerce/links.js` | evaluated in a `vm` sandbox. Only non-empty `https://` values are rendered. **`booking` is always dropped.** |
| `brand/logo/*`, `brand/fonts/*` | copied to `/assets/` |
| `site/config.json` | site URL, hub name, currencies and rates, languages, shipping lines, price overrides (for example, "board edition = pre-order") |

The build **fails** (exit 1) when:
- a listing is missing a title, price or alt_text
- a price shown differs from `listing.json` without an override
- any text contains BRAND-banned words ("therapy", "cure", "clinically proven", "was $")
- an autism keyword appears outside `/research/`
- any internal link has no target

### 9.3 Page types and URLs

URLs follow `seo/SEO-PLAN.md`: lowercase, hyphens, trailing slash, no dates, English at the root, Spanish later under `/es/`.

| Type | URL | Notes |
|---|---|---|
| Home | `/` | the six sections in §8 |
| Age hub | `/ages/`, `/ages/{babies\|toddlers\|preschool\|school-age}/` | the ruler, products for the band, guides |
| Shop | `/shop/` | all products |
| Collection | `/shop/{books\|printables\|cards\|merch\|bundles}/` | pre-rendered, plus filter state in the query `?age=1-3&type=board&sort=low` (hash routes in the concept become query strings; each combination links to a crawlable pre-rendered page, and extra combinations are `noindex`) |
| Product | `/shop/{slug}/` | one page per listing; there is no quick-view-only product |
| Search | `/search/?q=` | client-rendered results; `noindex` |
| Teachers & groups | `/schools/`, `/schools/classroom-pack/`, `/schools/site-licenses/`, `/schools/quote/`, `/groups/`, `/groups/workshop-kits/`, `/groups/research-briefs/` | counsel gate "G" from SEO-PLAN |
| Learn | `/learn/`, `/learn/{category}/`, `/learn/{slug}/` | articles |
| Research hub | `/research/`, `/research/studies/`, `/research/studies/{author-year}/`, `/research/virtual-autism/` | hub name from `config.hubName` (default "The Virtual Autism Project", always followed by "a term some clinicians use; not a medical diagnosis"; marketing recommends a neutral name, which is the founder's call) |
| Free and bonus | `/free/`, `/free/{slug}/`, `/bonus/{slug}/` (`noindex`) | email only, with an optional birth month and year |
| Trust and legal | `/about/`, `/contact/`, `/faq/`, `/help/`, `/resend-download/`, `/shipping-returns/`, `/privacy/`, `/terms/`, `/disclaimer/`, `/accessibility/`, `/disclosures/`, `/licenses/`, `/editorial-policy/` | all built before launch |
| Utility | `/thank-you/` (`noindex`), `/404.html` | the 404 has search, age chips and the main nav |

### 9.4 Per-page SEO

Every page emits:
- `<title>` (≤60 characters) and `<meta name=description>` (≤155), taken from `seo_title`/`seo_description` or front matter. The build fails on missing values or duplicates.
- `<link rel=canonical>` with the absolute URL and trailing slash. Filtered and search views canonicalise to the unfiltered collection.
- `hreflang`-ready markup: `<link rel=alternate hreflang="en" href>` and `x-default` now. When `hreflang_pair` exists and that page is built, `es` is added. The mapping lives in one table so Spanish drops in without template changes.
- Open Graph and Twitter cards: the product mockup, or `brand/logo/og-image-1200x630.png`.
- JSON-LD:
  - `Organization` (AlphaPlay LLC, dba Play Before Pixels, logo, `sameAs` built from non-empty links.js socials) and `WebSite` with `SearchAction` on the home page.
  - `BreadcrumbList` on every inner page.
  - `Product` plus `Offer` per format (price, `priceCurrency: USD`, availability `InStock`, `PreOrder` or `OnlineOnly`), with `Book` fields (`bookFormat`, `numberOfPages`, `isbn` only when it exists) on product pages.
  - `Article` with `datePublished`, `dateModified` and `citation` on learn pages.
  - `MedicalWebPage` is **not** used.
  - `FAQPage` only where the page shows those Q&As.
  - Never `Review` or `AggregateRating` until real reviews exist.
- `<html lang>`, `theme-color`, favicon SVG plus PNG, and a `manifest`.

The build also writes:
- `dist/sitemap.xml`: every indexable page with `lastmod` (from the file's git date or `last_reviewed`) and `xhtml:link` alternates when a pair exists.
- `dist/robots.txt`: `Allow: /`; `Disallow: /search/`, `/bonus/`, `/thank-you/`; plus the `Sitemap:` line. The preview build writes `Disallow: /`.

### 9.5 Links from `commerce/links.js`

- A link is rendered only if its value is a non-empty string starting with `https://`.
- The `booking` field is never rendered, even if it is filled.
- Social names map to the Follow list. Store and marketplace fields map to "Also sold at" on the matching product (`kdp_book_*`, `bookshop_book_*`, `shop_book_*`) and in the footer.
- `shopify` becomes the checkout URL. While it is empty, the cart shows "Checkout opens at launch. Nothing has been charged."
- External links get `rel="noopener"` and "(opens in a new tab)" hidden text.

### 9.6 Navigation test (deploy gate)

The deploy pipeline is:

```
node site/build.js && npx playwright test site/test
```

It must exit 0 on a fresh checkout before any deploy. The same step runs in the weekly routine. The tests run against `dist/` served over HTTP, in Chromium, at **1440×900** and at **390×844 with `isMobile: true, hasTouch: true`**. (B's 519px-wide product page slipped past a test that ran without mobile emulation.)

Required checks. `site-concepts/winner/_tools/qa.js` implements all of these today, 637 checks, and is the reference.
1. **Crawl:** every `href` on every page resolves (HTTP 200 or a valid in-page id). Every mega-menu link is clicked from inside its open panel. No 404s, no console errors, every image loads, exactly one `h1`, breadcrumbs on inner pages.
2. **No horizontal scroll:** `scrollWidth <= innerWidth` on every page at 320, 390 (mobile emulation), 768, 1024 and 1440.
3. **Skip link:** it is the first Tab stop, Enter focuses `<main>`, and the next Tab lands inside main. It keeps shop filter state.
4. **Mega-menus**, for each of the four:
   - click opens it and `aria-expanded` is true
   - hover, then a click within 450ms, keeps it open
   - Enter and Space open it; ArrowDown and Tab move into the panel
   - Escape closes it and returns focus
   - an outside click closes it
   - a same-page link closes it and applies the filter
5. **Shop:** age, type and collection filters update the URL, `h1`, breadcrumb and `<title>`. Back restores them. Sort works. The empty state and reset work. "Show all N" appears after 8. On a phone, the **first price is on the first screen**.
6. **Search:**
   - "/" opens it and the input is focused
   - results appear, and the arrow keys set `aria-activedescendant`
   - Enter opens the highlighted result; **Enter with no highlight opens the results page for the query**
   - help answers are findable ("purchase order")
   - Escape closes it and returns focus
7. **Cart:**
   - quick add and product add update the count
   - **the live region announces the add**
   - the button name is "Cart, N items"
   - focus trap, Escape and scrim click all close it
   - quantities work
   - contents persist across pages and **sync to a second tab**
   - the phone drawer fits the screen, including checkout
8. **Mobile menu** (tested on index, shop and product):
   - it opens by tap, Enter and Space
   - 40 Tabs and 25 Shift+Tabs stay inside
   - the page is inert and scroll is locked
   - Escape and ✕ close it and return focus to Menu
   - accordions open by tap
   - **Menu → age chip reaches the filtered shop in two taps from any page**
   - links navigate and close the menu
   - it hands off to search
9. **Names and targets:** at 390, the header buttons are named "Search", "Cart, N items" and "Menu". Footer, breadcrumb and legal links are ≥44px tall on touch screens. No target anywhere is under 24px.
10. **Currency:** switching it converts every `[data-usd]` price and syncs every select.
11. **links.js:** with an empty file, no social or store links render. With a fixture where one field is filled and `booking` is filled, exactly that one link renders and `booking` never does.
12. **a11y.spec:** computed contrast for every visible text node against its real background (≥4.5 or ≥3 for large text), no skipped heading levels, a visible focus ring on the first 80 Tab stops of each page template.

---

## 10. Grafts: where each graft stands

| From | Graft | Status |
|---|---|---|
| A | Skip link focuses `<main>` | **Done** in `winner/nav.js` |
| A | Mobile menu age chips at the top (two taps) | **Done** (`build.js`, `styles.css`) |
| A | Whole prices drop ".00" | **Done** (`money()`) |
| A | Focus ring that holds on every tint (now `--sky-ink`, ≥4.79:1) | **Done** |
| A | Hero book spread with tips and a buy strip; full-bleed *Tablet Slept* pp. 18–19 band with a museum caption; running heads; colophon; drop cap | Build task (replaces C's hero circles) |
| B | "Schools can pay by purchase order" in the utility bar | **Done** |
| B | Prices in the Teachers & Groups menu (desktop and phone) | **Done** |
| B | Cart live-region announcement plus cross-tab sync | **Done** |
| B | Search Enter fallback to a results page (`shop.html#q=`, with filtering, heading, breadcrumb and title) | **Done** |
| B | Saturated age ruler with characters; annotated "down" page; format radio cards; Grown-up corner in Fredoka on ink; research sticky contents list with highlighting | Build task. Format radios and the contents-list highlight already exist in C. |
| C fixes | `--ink-3` contrast (4.24 → ≥4.59 on tints); shop titles h2; About ledger h2; 44px touch targets for footer and breadcrumbs; button names at phone width; phone shop first price above the fold; stamps removed from tiles; colour-control strip removed | **Done** |
| Data | *Laps Not Apps* is personalised at $24.99 softcover / $34.99 hardcover; the board book is "Pre-order" until the Wave 3 run exists | **Done** in `winner/catalog.js` |
| Content | Trim study summaries to the BRAND rule 5 wording; home page to 6 sections; one filled button per screen; a single age-colour system across products | Build task |

---

## 11. What changed in `site-concepts/winner/` (vs C)

- `_tools/build.js`:
  - search and cart buttons get accessible names; the cart name is kept live
  - PO link in the utility bar
  - prices in the Teachers mega panel and in the mobile accordion
  - age chips at the top of the mobile menu
  - colour-control strip removed
  - shop cards render as h2
- `nav.js`:
  - skip link moves focus to `<main>`
  - cart live-region announcer
  - "Cart, N items" name
  - cross-tab `storage` sync for cart and currency
  - search Enter fallback plus a "See every product matching…" link
  - shop `#q=` filtering; "All types" clears the query
  - whole prices without ".00"
- `catalog.js`: `PBP_card(p, {h})` heading level; no stamp on tiles; *Laps Not Apps* formats and prices; board-book ship line.
- `styles.css`:
  - `--ink-3` #5E6883
  - focus ring `--sky-ink`
  - `.p-title` and `.ledger-h`
  - mobile age chips
  - 44px touch targets
  - tighter phone shop head
- `_src/info.html`: About ledger headings are now h2.
- `_tools/qa.js`: 24 new checks.
  - skip-link focus, including keeping the shop filter
  - search results page and query filters
  - cart announcement, name and cross-tab sync
  - header names at 390 on every page
  - 44px footer and breadcrumb targets
  - two-tap age from three pages
  - first price above the fold
  - "All types" clears the query

  Result: **637 passed, 0 failed.**

## 12. Open items for the founder

- **Research hub name.** The brief says "The Virtual Autism Project". `marketing/virtual-autism-outreach.md` and SEO-PLAN recommend a neutral name. It is one config value; please choose.
- **Board book availability.** It is shown as Pre-order until the Wave 3 offset run and 3PL exist. Confirm the wording, or hide the board format until then.
- **Age-band sub-ranges.** The *100 Plays* guide uses 0–1, 1–2, 2–3 and 3–5 inside the site's 0–5 range, with its own pill colours. Future printings should use the site's band colours.
- **`products/picture-more-talk-less-tap/listing.json`** currently describes the "Talk Tower Classroom Game Kit", not the picture book. Fix it before the build reads it.
- **Placeholders.** Shipping times, currency rates and bulk terms are placeholders until the store and printers are connected.
