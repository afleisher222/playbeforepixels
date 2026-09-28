# Links file schema: Play Before Pixels

Prepared September 27, 2026. This file defines every field in `commerce/links.js` (`window.PBP_LINKS`), the URL pattern each field expects, and where to find that URL after you sign up. Setup order, fees and payment and tax routing are in `storefront-setup-guide.md`.

## Read this first

- **Verification status.** Live sources could not be reached on 2026-09-27: the web-search budget was used up and the official sites (Shopify, Amazon, Etsy, IRS and others) were blocked by the network. Every URL pattern and menu path below is **UNVERIFIED** unless it is marked **VERIFIED**. Only the Amazon Influencer storefront pattern rests on an official page that an earlier research pass reached ([amazon.com/shop/info](https://www.amazon.com/shop/info)). To be safe, open each public page while logged out and copy the URL from the address bar or the platform's Share button.
- **How the website uses the file.** Every value starts as `""`. The site shows a link only when its value is not empty, so a channel stays hidden until you paste its URL.
- **Paste rules**
  1. Paste one full public `https://` URL per field: the page a shopper sees. Never paste a dashboard or admin link such as `admin.shopify.com`, `kdp.amazon.com/...bookshelf`, Seller Center or Commerce Manager.
  2. Test each link in a private window. If the page asks you to log in, it is the wrong link.
  3. Remove tracking junk (`?ref=...`, `&utm_...`). The one exception is your Amazon Associates tag (see `kdp_book_*`).
  4. Leave the field empty (`""`) for any channel you are not using. Do not paste a placeholder.
- **Sold as AlphaPlay LLC.** Per `legal/ENTITY.md`, every account is opened in the legal name **AlphaPlay LLC**, with **Play Before Pixels** as the shop or display name. Handles and shop names below mean the display name you choose, for example `playbeforepixels`.
- **Domain.** `playbeforepixels.com` was still unregistered on 2026-09-27 according to the DNS check in `legal/domain-portfolio.md`. If the main website stays on Cloudflare Pages at `playbeforepixels.com`, the Shopify store needs a subdomain such as `shop.playbeforepixels.com`, and every `shopify` / `shop_book_*` URL below then starts with that subdomain. The subdomain setup steps are UNVERIFIED; check Shopify's domain help when you connect it.
- **Status key** (from the storefront findings): `launch` = set up now · `90-days` · `later` · `skip` = field kept for completeness, leave it empty for now.

## 1. Your own store (Shopify hub), bookings, course, newsletter

| Field | Links to | URL pattern | Where to find it after sign-up | Status | Source |
|---|---|---|---|---|---|
| `shopify` | Store home page | `https://playbeforepixels.com` (custom domain), `https://shop.playbeforepixels.com` (subdomain), or `https://{store}.myshopify.com` | Shopify admin > Settings > Domains shows the primary domain (menu path UNVERIFIED). Before you connect a domain, use the `.myshopify.com` address. | launch | [shopify.com/pricing](https://www.shopify.com/pricing) (blocked, UNVERIFIED) |
| `shop_book_up_go_more` | *Up! Go! More!* board book on your store | `https://{your-store-domain}/products/{handle}` | Products > the book > "View" (the handle is the end of the URL). Board books can't be printed on KDP, so your own store is the main place to sell this one, from a short offset print run. | launch (when stock exists) | Shopify link format from the findings (UNVERIFIED) |
| `shop_book_tablet_slept` | *The Day the Tablet Slept* on your store (signed or bundle copies) | `https://{your-store-domain}/products/{handle}` | Same as above | launch | same |
| `shop_book_100_plays` | *100 Screen-Free Plays* on your store (print copy, or the printable guide) | `https://{your-store-domain}/products/{handle}` | Same as above | launch | same |
| `shop_book_laps_not_apps` | *Whose Lap Today?* personalized book on your store | `https://{your-store-domain}/products/{handle}` | Same as above | launch (when stock exists) | same |
| `shop_book_more_talk_less_tap` | *More Talk, Less Tap* library-bound edition on your store | `https://{your-store-domain}/products/{handle}` | Same as above. KDP doesn't offer library binding and IngramSpark probably doesn't either, so this one needs a library-binding vendor. | later | same |
| `group_orders` | Schools, libraries, child-care centers and parent groups: workshops, classroom sets, bulk and B2B orders | `https://{your-store-domain}/collections/{handle}` (a "Groups & classrooms" collection) or `https://{your-store-domain}/pages/{handle}` (an inquiry form page; the `/pages/` pattern is UNVERIFIED) | Products > Collections > the collection > "View", or Online Store > Pages > the page > "View". Invoice B2B orders as Shopify draft orders so the money lands in Shopify Payments. | launch | Shopify findings (draft orders and invoices; UNVERIFIED) |
| `booking` | **Retired: stays empty.** No coaching, consults or live services (brand/BRAND.md, binding); the Screen Reset Consult and Family Reset Coaching are retired names | — | — | never | — |
| `course` | The online course (e.g. "30-Day Screen Reset") | `https://{school}.teachable.com`, `https://{name}.podia.com`, or a course subdomain on your domain | The course platform dashboard > the course's public sales page > copy the URL. Pick ONE platform. | 90-days | [podia.com/pricing](https://www.podia.com/pricing), [teachable.com/pricing](https://teachable.com/pricing), [kajabi.com/pricing](https://kajabi.com/pricing) (blocked, UNVERIFIED) |
| `newsletter_form` | Hosted newsletter sign-up page | Your email provider's hosted form URL. The provider hasn't been chosen, so there is no pattern yet (UNVERIFIED). | The email tool's form or landing page > "Share" or "Hosted URL". If the sign-up form is built into the site (the current `#waitlist` form), leave this empty. | launch | none: no newsletter provider in the findings |

## 2. Amazon

| Field | Links to | URL pattern | Where to find it after sign-up | Status | Source |
|---|---|---|---|---|---|
| `amazon_author` | Your Amazon author page (every book, bio, follow button) | `https://www.amazon.com/author/{custom-name}` | Author Central > your profile > "Author page URL". You set the custom name there. You can claim the page only once one book is live on Amazon. | launch (after the first book is live) | [author.amazon.com](https://author.amazon.com/) (blocked, UNVERIFIED) |
| `amazon_storefront` | Amazon Influencer storefront (the "Amazon storefront"): idea lists of your books plus recommended screen-free toys | `https://www.amazon.com/shop/{handle}` | The Influencer dashboard shows your storefront URL once you're approved. Approval is not guaranteed, and it requires an active YouTube, Instagram, TikTok or Facebook account. | 90-days | **VERIFIED**: [amazon.com/shop/info](https://www.amazon.com/shop/info) |
| `kdp_book_up_go_more` | Amazon product page for *Up! Go! More!* | `https://www.amazon.com/dp/{ASIN}` or, with Associates, `https://www.amazon.com/dp/{ASIN}?tag={storeid}-20` | KDP Bookshelf shows the ASIN once the title is live. **KDP cannot print board books**, so fill this only if you publish a Kindle (fixed-layout) edition, or if the board book reaches Amazon later through Seller Central. Otherwise leave it empty. | later | [KDP formats help](https://kdp.amazon.com/en_US/help/topic/G201834180) (cited by the prior pass; not re-fetched) |
| `kdp_book_tablet_slept` | Amazon page for *The Day the Tablet Slept* (paperback and Kindle) | same as above | KDP Bookshelf > the title > ASIN. The Kindle and paperback editions have different ASINs. Link the print ASIN, since Amazon cross-links the editions (UNVERIFIED). A 32-page picture book can be a KDP paperback (24-page minimum) but not a KDP hardcover (about 75-page minimum) (UNVERIFIED). | launch | same |
| `kdp_book_100_plays` | Amazon page for *100 Screen-Free Plays* (paperback) | same as above | KDP Bookshelf > ASIN | launch | same |
| `kdp_book_laps_not_apps` | Amazon page for *Whose Lap Today?* | same as above | If the hardcover is too short for KDP, print it through IngramSpark instead. Amazon may then list it from Ingram's feed, and you copy the ASIN from the live Amazon page (UNVERIFIED). | launch | same; [ingramspark.com](https://www.ingramspark.com/) (blocked) |
| `kdp_book_more_talk_less_tap` | Amazon page for *More Talk, Less Tap* | same as above | KDP does not offer library binding. Fill this only if you publish a paperback or Kindle edition of this title. | later | KDP formats help (above) |
| `amazon_merch` | Merch on Demand products (tees, totes) | `https://www.amazon.com/dp/{ASIN}` or an Amazon brand search link | The Merch dashboard lists each live product and its ASIN. The program is invite-only, and approval takes weeks to months with no guarantee. | 90-days | [merch.amazon.com](https://merch.amazon.com) (blocked, UNVERIFIED) |
| `amazon_brand_store` | Amazon Brand Store (only with Seller Central + Brand Registry) | `https://www.amazon.com/stores/{BrandName}/page/{id}` | Seller Central > Stores, once you're enrolled in Brand Registry. Brand Registry needs a registered or pending trademark for the brand on the product. | later | [sell.amazon.com/pricing](https://sell.amazon.com/pricing) (blocked, UNVERIFIED) |

Amazon Associates tag: you can add `?tag={storeid}-20` to any `kdp_book_*` link on the website. Put the disclosure "As an Amazon Associate I earn from qualifying purchases" next to the link (see `legal/AFFILIATE-ENDORSEMENT-DISCLOSURE.md`). Don't use tagged links in email or in PDFs, and never buy through your own tag (Operating Agreement, UNVERIFIED: [affiliate-program.amazon.com/help/operating/agreement](https://affiliate-program.amazon.com/help/operating/agreement)).

## 3. Other bookstores and ebook stores

| Field | Links to | URL pattern | Where to find it after sign-up | Status | Source |
|---|---|---|---|---|---|
| `bookshop` | Your Bookshop.org affiliate shop (your books plus recommended lists) | `https://bookshop.org/shop/{affiliate-shop}` | Bookshop affiliate dashboard > your shop page. Books appear on Bookshop only through the Ingram catalog; there is no direct publisher account. | launch | [bookshop.org/info/affiliates](https://bookshop.org/info/affiliates) (blocked, UNVERIFIED) |
| `bookshop_book_up_go_more` | Bookshop page for *Up! Go! More!* | `https://bookshop.org/a/{affiliate-id}/{ISBN13}` | Built from your affiliate ID plus the book's ISBN-13. This title is likely **not** in Ingram, because board books are probably not available as print-on-demand (UNVERIFIED), so it will likely stay empty. | later | same |
| `bookshop_book_tablet_slept` | Bookshop page for *The Day the Tablet Slept* | same as above | Fill it once the IngramSpark edition appears on bookshop.org (search by ISBN). | launch | same |
| `bookshop_book_100_plays` | Bookshop page for *100 Screen-Free Plays* | same as above | same | launch | same |
| `bookshop_book_laps_not_apps` | Bookshop page for *Whose Lap Today?* | same as above | same (IngramSpark hardcover) | launch | same |
| `bookshop_book_more_talk_less_tap` | Bookshop page for *More Talk, Less Tap* | same as above | Fill it only if an Ingram edition of this title exists. | later | same |
| `bn_press` | Barnes & Noble page for your lead title | `https://www.barnesandnoble.com/w/{slug}/{id}` | Search bn.com for the ISBN and copy the product page. The page may come from the IngramSpark feed even if you never use B&N Press. | later | [press.barnesandnoble.com](https://press.barnesandnoble.com/) (blocked, UNVERIFIED) |
| `kobo` | Kobo page for your lead ebook | `https://www.kobo.com/us/en/ebook/{slug}` | Search kobo.com for the title once it's live. | later | [kobo.com/writinglife](https://www.kobo.com/writinglife) (blocked, UNVERIFIED) |
| `apple_books` | Apple Books page for your lead ebook | `https://books.apple.com/us/book/{slug}/id{number}` | Apple Books > the book > Share > Copy Link | later | [authors.apple.com](https://authors.apple.com/) (blocked, UNVERIFIED) |
| `google_play_books` | Google Play Books page for your lead ebook | `https://play.google.com/store/books/details?id={id}` | Partner Center > the book > "View on Google Play" (UNVERIFIED) | later | [play.google.com/books/publish](https://play.google.com/books/publish/) (blocked, UNVERIFIED) |
| `audible` | Audible page for an audiobook | `https://www.audible.com/pd/{slug}/{ASIN}` | Only if you release a parent-guide audiobook. Audio is a poor fit for picture and board books. | skip | [acx.com](https://www.acx.com/) (blocked, UNVERIFIED) |

## 4. Marketplaces and shopping channels

| Field | Links to | URL pattern | Where to find it after sign-up | Status | Source |
|---|---|---|---|---|---|
| `etsy` | Your Etsy shop | `https://www.etsy.com/shop/{ShopName}` | Shop Manager > click your shop name ("View shop") | launch | [etsy.com/legal/fees](https://www.etsy.com/legal/fees/) (blocked, UNVERIFIED) |
| `tpt` | Your Teachers Pay Teachers store | `https://www.teacherspayteachers.com/store/{store-name}` | TPT seller dashboard > "My Store" / view store (menu name UNVERIFIED) | launch | [TPT seller fees help](https://help.teacherspayteachers.com/hc/en-us/articles/360044219891-Seller-Fees-and-Payout-Rates) (not fetched, UNVERIFIED) |
| `tiktok_shop` | TikTok profile with the Shop tab | `https://www.tiktok.com/@{handle}` (the Shop tab is on the profile). Product links come from Seller Center and may look like `https://www.tiktok.com/view/product/{product_id}` (UNVERIFIED) | Paste the profile URL once the Shop tab shows on your profile. It's the same URL as `tiktok`, so the website should label this one "Shop on TikTok". | 90-days | [TikTok Seller University](https://seller-us.tiktok.com/university/essay?knowledge_id=3238037484275457&lang=en) (UNVERIFIED) |
| `facebook_shop` | Facebook Page shop | `https://www.facebook.com/{page}/shop` (the exact path is UNVERIFIED) | Commerce Manager > your shop > view. If the `/shop` URL doesn't open the shop when you're logged out, **leave this empty**. The Page URL goes in `facebook`. | launch | [facebook.com/business/help](https://www.facebook.com/business/help) (not reachable, UNVERIFIED) |
| `instagram_shop` | Instagram shop view | `https://www.instagram.com/{handle}` (there is no verified separate shop path) | Fill this only if Instagram gives you a distinct shop URL. Otherwise **leave it empty** so the site doesn't show two identical Instagram links. | launch | same |
| `google_merchant` | The public face of Google Merchant Center: your YouTube channel **Store** tab | `https://www.youtube.com/@{handle}/store` | Merchant Center has no public shop page. Once the Google & YouTube app syncs products and the channel is eligible for YouTube Shopping, the Store tab appears on the channel (eligibility UNVERIFIED). Until then, leave this empty. | launch | [support.google.com/merchants](https://support.google.com/merchants) (blocked, UNVERIFIED) |
| `walmart` | Your lead product on Walmart.com | `https://www.walmart.com/ip/{item-id}` | Walmart Seller Center > Items > view the item on Walmart.com. Walmart requires an EIN (use AlphaPlay LLC's), and approval is not guaranteed. | later | [marketplace.walmart.com](https://marketplace.walmart.com/) (blocked, UNVERIFIED) |
| `faire` | Faire Direct wholesale link, for retailers only | `https://www.faire.com/direct/{brand}` (format UNVERIFIED) | Faire brand portal > Faire Direct / referral link (menu name UNVERIFIED). Show it on the site only on a "Wholesale / stockists" line. | later | [Faire support](https://www.faire.com/support/articles/360040446591) (blocked, UNVERIFIED) |

## 5. Digital downloads (outside Shopify)

| Field | Links to | URL pattern | Where to find it after sign-up | Status | Source |
|---|---|---|---|---|---|
| `gumroad` | Gumroad profile or lead product: printables and the teacher pack for buyers worldwide | `https://{username}.gumroad.com/l/{product}` (or the profile, `https://{username}.gumroad.com`) | Gumroad > Products > the product > Share / copy link | launch (optional) | [gumroad.com/pricing](https://gumroad.com/pricing), [gumroad.com/help](https://gumroad.com/help) (blocked, UNVERIFIED) |
| `payhip` | Payhip store: an **alternative** to Gumroad, not an addition | `https://payhip.com/{store}` or `https://payhip.com/b/{code}` | Payhip dashboard > store / product > share link | later (only if you don't use Gumroad) | [payhip.com/pricing](https://payhip.com/pricing) (blocked, UNVERIFIED) |

## 6. Social profiles

These patterns come from general knowledge, not from the storefront findings (UNVERIFIED). Copy each one from the profile's Share button.

| Field | URL pattern | Where to find it |
|---|---|---|
| `instagram` | `https://www.instagram.com/{handle}/` | Profile > Share profile > Copy link |
| `facebook` | `https://www.facebook.com/{page}` | Facebook Page > the "..." menu > Copy link |
| `pinterest` | `https://www.pinterest.com/{handle}/` (pattern from the findings) | Profile URL. With a claimed website and a catalog, product pins show here too, so there is no separate Pinterest shop field. |
| `tiktok` | `https://www.tiktok.com/@{handle}` (pattern from the findings) | Profile > Share > Copy link |
| `youtube` | `https://www.youtube.com/@{handle}` | Channel page > Share channel > Copy link |
| `linkedin` | `https://www.linkedin.com/company/{slug}/` (business page) or `https://www.linkedin.com/in/{name}/` (personal profile) | Page or profile > "..." > Copy link |
| `threads` | `https://www.threads.com/@{handle}` (older `threads.net` links may redirect; UNVERIFIED) | Profile > Share > Copy link |
| `x` | `https://x.com/{handle}` | The profile URL |
| `substack` | `https://{name}.substack.com` (or a custom domain) | Substack dashboard > the publication's URL |

## Field list (must match `links.js` exactly)

```
shopify, shop_book_up_go_more, shop_book_tablet_slept, shop_book_100_plays, shop_book_laps_not_apps,
shop_book_more_talk_less_tap, group_orders, booking, course, newsletter_form,
amazon_author, amazon_storefront, kdp_book_up_go_more, kdp_book_tablet_slept, kdp_book_100_plays,
kdp_book_laps_not_apps, kdp_book_more_talk_less_tap, amazon_merch, amazon_brand_store,
bookshop, bookshop_book_up_go_more, bookshop_book_tablet_slept, bookshop_book_100_plays,
bookshop_book_laps_not_apps, bookshop_book_more_talk_less_tap, bn_press, kobo, apple_books,
google_play_books, audible,
etsy, tpt, tiktok_shop, facebook_shop, instagram_shop, google_merchant, walmart, faire,
gumroad, payhip,
instagram, facebook, pinterest, tiktok, youtube, linkedin, threads, x, substack
```

Channels with **no field on purpose**: Printful/Printify/Gelato (they produce the goods and have no public page), IngramSpark (it has no storefront; its books appear through the `bookshop_*`, `bn_press` and `kdp_book_*` links), Amazon Associates (it's a tag, not a page), and the channels you're skipping: Amazon Handmade, eBay, Lemon Squeezy, and Stan Store.
