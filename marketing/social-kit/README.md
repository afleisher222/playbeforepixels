# Social profile kit

Built September 28, 2026 from the adopted logo ("The Maker's Seal", `brand/logo/` only) and the products' own cover art. **No account exists yet and nothing is posted** (`ops/PAUSE`). Claiming handles is the founder's one-time setup (`marketing/SOCIAL-HANDLES.md`); every profile uses the logo, never a founder photo. Pixel sizes are the platforms' recommendations as best known and are UNVERIFIED (web search was unavailable): check each upload screen, and if a platform asks for a different size, rebuild with `bash marketing/social-kit/build/make.sh` after changing `build/build.js`.

Bios for every platform: **`BIOS.md`**.

| Platform | Profile picture | Banner / cover |
|---|---|---|
| Instagram | `avatar-1080.png` | none (Instagram has no banner) |
| Facebook Page | `avatar-1080.png` | `facebook-cover-1640x624.png` (words in the centre; phones crop the sides) |
| TikTok | `avatar-1080.png` | none |
| YouTube | `avatar-1080.png` (or `avatar-seal-1080.png`) | `youtube-banner-2560x1440.png` (logo and words inside the centre 1546 x 423 safe area) |
| Pinterest | `avatar-1080.png` | `pinterest-cover-1920x1080.png` |
| X | `avatar-1080.png` | `x-header-1500x500.png` (lower left kept clear for the profile picture) |
| LinkedIn (company page) | `linkedin-logo-400.png` | `linkedin-cover-1128x191.png` |
| Etsy shop | `etsy-shop-icon-500.png` (the full seal) | `etsy-banner-3360x840.png` or `etsy-mini-banner-1200x160.png`; optional `etsy-receipt-banner-760x100.png` |

Notes:
- `avatar-1080.png` is the kit's own avatar tile (`brand/logo/src/tile-avatar.svg`: the upright top on ink), the same drawing as `brand/logo/social-avatar-1080.png`. Profile pictures show small, and the logo rules put the small device below 80 px; the account name sits beside it.
- `avatar-seal-1080.png` and `etsy-shop-icon-500.png` use the full seal (`brand/logo/mark.svg`), allowed only where it shows at 80 px or larger.
- **Etsy pieces carry no web address** (marketplace outside-link rule, COMPLIANCE-GATE 16). All other banners show playbeforepixels.com, except the LinkedIn strip, which is too short for it.
- Nothing is stretched, recoloured or redrawn; the lockup files are used as supplied.
- Rebuild: `bash marketing/social-kit/build/make.sh` (writes `src/kit.html`, renders each piece at its own size, runs `ops/TESTS/check_fonts.js`).
