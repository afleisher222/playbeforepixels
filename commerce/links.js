/*
 * Play Before Pixels: storefront and social links
 * ------------------------------------------------
 * The website shows a link ONLY when its value below is a non-empty string.
 * Every field starts empty (""), so nothing shows until you paste a real URL.
 *
 * How to fill a field:
 *   1. Open the PUBLIC page while logged out, e.g. your Etsy shop, not Shop Manager.
 *   2. Copy the full https:// URL and paste it between the quotes.
 *   3. Never paste an admin or dashboard link, a login page, or a placeholder.
 *   4. Leave "" for any channel you are not using.
 *
 * Field definitions, URL patterns and where to find each URL: commerce/links.schema.md
 * Setup order, fees, and payment and tax routing: commerce/storefront-setup-guide.md
 * Patterns are UNVERIFIED as of 2026-09-27 (official sites were unreachable); check the live page.
 */
window.PBP_LINKS = {
  /* ---------- Your own store (Shopify hub), bookings, course, newsletter ---------- */
  shopify: "",                        // Store home: https://playbeforepixels.com, https://shop.playbeforepixels.com, or https://{store}.myshopify.com
  shop_book_up_go_more: "",           // Up! Go! More! board book on your store: https://{store-domain}/products/{handle} (KDP can't print board books)
  shop_book_tablet_slept: "",         // The Day the Tablet Slept on your store (signed or bundle copies): https://{store-domain}/products/{handle}
  shop_book_100_plays: "",            // 100 Screen-Free Plays on your store (print or printable): https://{store-domain}/products/{handle}
  shop_book_laps_not_apps: "",        // Whose Lap Today? (was Laps Not Apps) personalized book on your store: https://{store-domain}/products/{handle}
  shop_book_more_talk_less_tap: "",   // More Talk, Less Tap library-bound edition on your store: https://{store-domain}/products/{handle} (later)
  group_orders: "",                   // Schools, libraries, groups, workshops, B2B: https://{store-domain}/collections/{handle} or /pages/{handle}
  booking: "",                        // RETIRED: stays empty forever. No coaching, consults or live services (brand/BRAND.md, binding).
  course: "",                         // Online course sales page: https://{school}.teachable.com, https://{name}.podia.com, or your course subdomain (90 days)
  newsletter_form: "",                // Hosted newsletter sign-up page from your email tool (leave empty if the form is built into the site)

  /* ---------- Amazon ---------- */
  amazon_author: "",                  // Amazon author page: https://www.amazon.com/author/{custom-name} (claim it in Author Central after your first book is live)
  amazon_storefront: "",              // Amazon Influencer storefront: https://www.amazon.com/shop/{handle} (approval needed, not guaranteed; 90 days)
  kdp_book_up_go_more: "",            // Amazon page for Up! Go! More!: https://www.amazon.com/dp/{ASIN}[?tag={storeid}-20] (fill only for a Kindle or other Amazon edition; no KDP board books)
  kdp_book_tablet_slept: "",          // Amazon page for The Day the Tablet Slept: https://www.amazon.com/dp/{ASIN}[?tag={storeid}-20]
  kdp_book_100_plays: "",             // Amazon page for 100 Screen-Free Plays: https://www.amazon.com/dp/{ASIN}[?tag={storeid}-20]
  kdp_book_laps_not_apps: "",         // Amazon page for Whose Lap Today? (listed from KDP or from IngramSpark's feed): https://www.amazon.com/dp/{ASIN}
  kdp_book_more_talk_less_tap: "",    // Amazon page for More Talk, Less Tap: https://www.amazon.com/dp/{ASIN} (fill only for a paperback or Kindle edition; KDP has no library binding)
  amazon_merch: "",                   // Merch on Demand product or brand search: https://www.amazon.com/dp/{ASIN} (invite-only; 90 days)
  amazon_brand_store: "",             // Amazon Brand Store: https://www.amazon.com/stores/{BrandName}/page/{id} (needs Seller Central and Brand Registry; later)

  /* ---------- Other bookstores and ebook stores ---------- */
  bookshop: "",                       // Bookshop.org affiliate shop: https://bookshop.org/shop/{affiliate-shop}
  bookshop_book_up_go_more: "",       // Bookshop page for Up! Go! More!: https://bookshop.org/a/{affiliate-id}/{ISBN13} (only if an Ingram edition exists)
  bookshop_book_tablet_slept: "",     // Bookshop page for The Day the Tablet Slept: https://bookshop.org/a/{affiliate-id}/{ISBN13}
  bookshop_book_100_plays: "",        // Bookshop page for 100 Screen-Free Plays: https://bookshop.org/a/{affiliate-id}/{ISBN13}
  bookshop_book_laps_not_apps: "",    // Bookshop page for Whose Lap Today? (IngramSpark hardcover): https://bookshop.org/a/{affiliate-id}/{ISBN13}
  bookshop_book_more_talk_less_tap: "", // Bookshop page for More Talk, Less Tap: https://bookshop.org/a/{affiliate-id}/{ISBN13} (only if an Ingram edition exists)
  bn_press: "",                       // Barnes & Noble product page: https://www.barnesandnoble.com/w/{slug}/{id} (later)
  kobo: "",                           // Kobo ebook page: https://www.kobo.com/us/en/ebook/{slug} (later)
  apple_books: "",                    // Apple Books page: https://books.apple.com/us/book/{slug}/id{number} (later)
  google_play_books: "",              // Google Play Books page: https://play.google.com/store/books/details?id={id} (later)
  audible: "",                        // Audible page: https://www.audible.com/pd/{slug}/{ASIN} (skip for now; only for a future parent-guide audiobook)

  /* ---------- Marketplaces and shopping channels ---------- */
  etsy: "",                           // Etsy shop: https://www.etsy.com/shop/{ShopName}
  tpt: "",                            // Teachers Pay Teachers store: https://www.teacherspayteachers.com/store/{store-name}
  tiktok_shop: "",                    // TikTok profile with the Shop tab: https://www.tiktok.com/@{handle} (fill once the Shop tab is live; 90 days)
  facebook_shop: "",                  // Facebook shop: https://www.facebook.com/{page}/shop (leave empty if it doesn't open when logged out)
  instagram_shop: "",                 // Instagram shop: fill ONLY if Instagram gives a distinct shop URL; otherwise leave empty
  google_merchant: "",                // Public face of Google Merchant Center = YouTube Store tab: https://www.youtube.com/@{handle}/store
  walmart: "",                        // Walmart item page: https://www.walmart.com/ip/{item-id} (needs an EIN and approval; later)
  faire: "",                          // Faire Direct wholesale link for retailers: https://www.faire.com/direct/{brand} (format UNVERIFIED; later)

  /* ---------- Digital downloads outside Shopify (use ONE of these, or neither) ---------- */
  gumroad: "",                        // Gumroad product or profile: https://{username}.gumroad.com/l/{product} (merchant of record; optional)
  payhip: "",                         // Payhip store: https://payhip.com/{store} or https://payhip.com/b/{code} (only if you don't use Gumroad)

  /* ---------- Social profiles ---------- */
  instagram: "",                      // https://www.instagram.com/{handle}/
  facebook: "",                       // https://www.facebook.com/{page}
  pinterest: "",                      // https://www.pinterest.com/{handle}/ (catalog product pins show here too)
  tiktok: "",                         // https://www.tiktok.com/@{handle}
  youtube: "",                        // https://www.youtube.com/@{handle}
  linkedin: "",                       // https://www.linkedin.com/company/{slug}/ or https://www.linkedin.com/in/{name}/
  threads: "",                        // https://www.threads.com/@{handle}
  x: "",                              // https://x.com/{handle}
  substack: ""                        // https://{name}.substack.com
};
