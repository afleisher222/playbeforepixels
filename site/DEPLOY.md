# Deploying the site to Cloudflare Pages

Nothing is deployed yet. `ops/PAUSE` stays in place and no Cloudflare account exists. These are the settings to use once the founder has created the account and connected this repository. Settings and menu names were written without web access and are **UNVERIFIED**; check each one against Cloudflare's current Pages documentation.

## Build settings

| Setting | Value |
|---|---|
| Framework preset | None |
| Build command | `node site/build.js` |
| Build output directory | `site/dist` |
| Root directory | the repository root (leave empty) |
| Node version | 20 or newer, set with the `NODE_VERSION` environment variable (for example `22`) |
| Production branch | `main` |
| Preview branches | `claude/live`. Any branch other than `main` builds as a preview automatically: Cloudflare sets `CF_PAGES_BRANCH` (UNVERIFIED), and the build then writes `robots.txt: Disallow: /` and marks every page `noindex`. Locally, run `node site/build.js --preview`. |

The build uses only Node's standard library. Pictures are made by `site/tools/images.py` (Pillow and PyMuPDF) and cached in `site/assets/img/`, which is committed. A Cloudflare build therefore needs no Python unless a product picture has changed and its WebP is missing. In that case, run `python3 site/tools/images.py` (or `node site/build.js`) locally and commit `site/assets/img/`.

The build stops with exit code 1 if any of these is found:
- a listing is missing a title, price or alt text;
- a shown price is not in `listing.json`;
- banned claim words (therapy, cure, "was $", and so on) appear outside a negation;
- an autism keyword appears outside `/research/`;
- ages 5–12 wording appears while that gate is closed;
- an internal placeholder, a coaching offer or an excluded organization appears;
- an internal link or image has no target;
- a title or description is missing or duplicated;
- a printed URL from `ops/TESTS/printed-urls.md` has no page or redirect.

## Environment variables (public values, never secrets)

Set these in **Settings → Environment variables** for Production and Preview. Leave any of them empty and that feature shows its honest "opens soon" state.

| Variable | What it does when set |
|---|---|
| `NODE_VERSION` | Node for the build (20 or newer). |
| `PBP_EMAIL_FORM_ACTION` | The HTTPS form endpoint from the email platform. Switches on the sign-up forms (footer, `/free/`, `/bonus/…`). Fields sent: `email`, `birth_month`, `birth_year`, `source`. Never a name. |
| `PBP_CONTACT_FORM_ACTION` | The HTTPS endpoint for the contact form. Switches on `/contact/`. Fields sent: `email`, `topic`, `message`. |
| `PBP_CONTACT_EMAIL` | The public contact address shown on `/contact/`. |
| `PBP_CF_ANALYTICS_TOKEN` | The Cloudflare Web Analytics site token (cookieless). It adds the single beacon script. No other tracking is ever added. |

API keys, store tokens and passwords never go into this project or the repository.

## Buy buttons and store links

Buy buttons, "Also sold at" links, social links and checkout come only from `commerce/links.js`. A link is shown only when its value is a non-empty `https://` URL, and `booking` is never shown. While every value is empty, each product shows "Available soon" and nothing can be bought. To open a product, fill its key (for example `buy_toddler_busy_book`, `shop_book_up_go_more` or `course`) and redeploy.

## Redirects and headers

The build writes these files:
- `site/dist/_redirects`: 301s for printed and emailed URLs, such as `/license` → `/licenses/`, `/faq` → `/help/`, `/30-days/start` → `/free/` and `/bonus/bore` → `/bonus/bored-play-cards/`.
- Small meta-refresh pages at the same paths, as a fallback for hosts that ignore `_redirects`.
- `site/dist/_headers`: security headers, plus long caching for the hashed `/assets/`.

Cloudflare Pages is expected to add the trailing slash to directory URLs such as `/help` → `/help/` (UNVERIFIED; the QA server does the same). Check after the first deploy that each URL in `ops/TESTS/printed-urls.md` answers with 200 or a 301.

## Custom domain

Add `playbeforepixels.com` and `www.playbeforepixels.com` under **Custom domains**. Redirect `www` to the apex domain, because the canonical URLs, sitemap and Open Graph tags all use `https://playbeforepixels.com`.

## Before every deploy (the deploy gate)

```
node site/build.js && node site/qa/run.js
```

Both must exit 0. The QA suite serves `site/dist` locally like Pages and checks every page at 1440, 768, 390 and 360 px (touch emulation below 1000 px). It checks overflow, console errors, images, headings, contrast, target sizes, names, every internal link and fragment, printed URLs, the redirects, hidden buy buttons, keyboard focus, the menus, search, shop filters and the product page. The last result is saved to `site/qa/last-run.json`, and the accessibility statement quotes it.

Screenshots for review: `node site/qa/shots.js all 1440,390` and `node site/qa/states.js` write to `site/shots/`.

## Before launch (not done by the build)

- Attorney review of every page under `/privacy/`, `/terms/`, `/disclaimer/`, `/shipping-returns/`, `/disclosures/`, `/accessibility/` and `/licenses/`. Each carries a DRAFT notice until then; remove it in `site/src/templates/legal.js` (`draftBanner`) once the review is recorded.
- Mailing address and contact email: shown as labelled boxes until they are filled.
- Email platform connected, with double opt-in, before `PBP_EMAIL_FORM_ACTION` is set.
- Remove `ops/PAUSE` only by the founder's decision.
