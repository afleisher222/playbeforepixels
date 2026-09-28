# Access keys the routines read (names only — never put a key, token or password in this repository or in chat)

The founder adds each key once in the cloud environment's settings (environment menu in the Claude session title bar → Edit → environment variables / API credentials). New sessions and routines pick them up. Create each key with the smallest permissions that do the job, in AlphaPlay LLC's accounts, and revoke it any time to stop automation on that platform.

| Variable | Platform | Lets Claude… |
|---|---|---|
| CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID | Cloudflare (Pages, DNS) | deploy the website |
| SHOPIFY_STORE_DOMAIN, SHOPIFY_ADMIN_TOKEN | Shopify (custom app, products/inventory/orders read+write scopes only) | add and update products, read orders for the weekly report |
| PRINTFUL_API_TOKEN (or PRINTIFY_API_TOKEN / GELATO_API_KEY — pick one) | print-on-demand merch | create merch products and mockups |
| GUMROAD_ACCESS_TOKEN (or the chosen merchant of record) | digital products worldwide | list digital products; read sales |
| PINTEREST_ACCESS_TOKEN | Pinterest | publish pins |
| SOCIAL_SCHEDULER_TOKEN | the scheduling tool connected to all social accounts | queue faceless posts on every platform |
| ETSY_API_KEY, ETSY_ACCESS_TOKEN | Etsy (requires an approved Etsy app) | list and update Etsy products |
| EMAIL_PLATFORM_API_KEY | email list (MailerLite/Kit) | add products to emails and send approved campaigns |

Platforms with no automation API (Amazon KDP, IngramSpark, Teachers Pay Teachers, and any marketplace that forbids automated listing) get ready-to-upload packets in ops/UPLOAD-PACKETS/ instead.
