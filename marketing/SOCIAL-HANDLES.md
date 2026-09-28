# Social handles and shop names: what to claim, and what not to

_Written September 28, 2026. The founder asked: "did you reserve all the handles on social media platforms related to virtual autism?"_

## Short answer

**No handles have been reserved yet, and none can be reserved by Claude.** Every platform ties a new account to the owner's identity: an email or phone code, a CAPTCHA and, for shops, the LLC's tax ID and bank account. Platform terms also forbid accounts created by bots. So claiming handles is part of the founder's one-sitting setup in `ops/LAUNCH-NOW.md` (Wave 0, step 6). Claiming all of them takes about 45 minutes. After that, Claude runs the accounts.

Availability could not be checked from the cloud container, because the network proxy blocks every social platform. Check each one while signing up.

## "Virtual autism" handles: the recommendation is not to claim them for the business

This is the same decision already recorded for the domains (`legal/domain-portfolio.md`, addendum of Sept 28, 2026). There are three reasons.

1. **Health-claim risk.** A shop's account named after a condition implies that its products prevent or treat that condition. The brand's first hard rule forbids that (`brand/BRAND.md`), and so does FTC law on health claims. If the business account and a "virtual autism" account are linked, a complaint about one can take down both.
2. **Impersonation risk.** "Virtual autism" is already the name of an existing documentary and organization at virtualautism.org. A lookalike handle can be reported as impersonation. X's rules also ban username squatting, meaning handles held unused (other platforms: UNVERIFIED).
3. **A handle creates no rights in the phrase.** It stops only one exact spelling on one platform.

**How the brand still becomes the place people find when they search "virtual autism":** use the Research Notes hub at `playbeforepixels.com/research`. Its pages are sourced, balanced and have no product cards, and search engines rank them on the phrase itself (see the autism-search rule in `brand/BRAND.md`). Social posts about the research come from the brand account and link to the hub, never to a product.

If the founder still wants a separate, non-commercial education account, counsel should review it first (`legal/DECISION-MEMO.json`). It must never sell or link to anything for sale.

## The handles to claim (same name everywhere)

**First choice: `playbeforepixels`.** If it is taken, fall back in this order, and use the same fallback on every platform where possible:
1. `playbeforepixelsco`
2. `play.before.pixels` (only where dots are allowed)
3. `playbeforepixels_`
4. `hello.playbeforepixels`

| Platform | Account type | Handle / name | Notes |
|---|---|---|---|
| Instagram | Professional → Business | @playbeforepixels | Must be a Business account and linked to the Facebook Page, or Meta's posting API cannot post to it |
| Facebook | Page (not a personal profile) | Play Before Pixels | Created from a login the LLC controls; add a second admin for recovery |
| Threads | Comes with Instagram | @playbeforepixels | |
| TikTok | Business account | @playbeforepixels | TikTok Shop comes later (physical products only) |
| YouTube | Brand Account channel | @playbeforepixels | Shorts only; faceless |
| Pinterest | Business account | playbeforepixels | The strongest traffic channel for this category (`marketing/MARKETING-PLAYBOOK.md` §1) |
| X | Standard | @playbeforepixels | Post at least monthly, because unused handles can be reclaimed |
| LinkedIn | Company page | Play Before Pixels | Needed for employer and organization licenses later |
| Bluesky | Standard | playbeforepixels.bsky.social → later `@playbeforepixels.com` | The domain handle comes free once the domain is owned |
| Reddit | Brand account | u/playbeforepixels | Never posts in communities without an APPROVED line (`ops/APPROVALS.md`) |
| Etsy | Shop name | PlayBeforePixels | |
| Teachers Pay Teachers | Store name | Play Before Pixels | Held until employment counsel clears classroom products |
| Gumroad | Username | playbeforepixels | Worldwide digital sales; Gumroad handles VAT |
| Amazon | KDP publisher and Author Central | Publisher: AlphaPlay LLC; imprint: Play Before Pixels | |

Regional platforms (for example LINE in Japan and Xiaohongshu in China) are added only when `ops/INTERNATIONAL.md` opens that region.

## Setup rules (these protect Arielle)

- **Owned by the business, not by her personally.** Sign up with a business email (for example `hello@playbeforepixels.com` once the domain exists), never a personal email. Never convert a personal profile into the business account.
- **Two-factor login with an authenticator app** on every account, and store the recovery codes in a password manager.
- **Faceless.** The profile picture is the logo's social avatar (`brand/logo/social-avatar-1080.png`, rebuilt with the new logo). No photos of her or her children.
- **Bio:** "Screen-free play for real families. Books, printables and play cards." plus the site link. It makes no health claims.
- **Keys go in the environment settings, never in chat** (names only in `ops/SECRETS.md`). Once a key is in place, Claude posts the week's approved, faceless posts on every platform through the official APIs.
