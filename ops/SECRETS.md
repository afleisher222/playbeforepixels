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
| UPTIME_API_KEY | free uptime monitor (read-only) | read site-up/down history in the daily check |
| EMAIL_PLATFORM_API_KEY | email list (MailerLite/Kit) | add products to emails and send approved campaigns |

Platforms with no automation API (Amazon KDP, IngramSpark, Teachers Pay Teachers, and any marketplace that forbids automated listing) get ready-to-upload packets in ops/UPLOAD-PACKETS/ instead.

**Hosts and header names** for each key are in ops/CLOUD-RUNBOOK.md ("API credentials"). Open points from the check on September 28, 2026 (ops/TESTS/network-hosts.md):
- CLOUDFLARE_ACCOUNT_ID and SHOPIFY_STORE_DOMAIN are identifiers, not secrets: they go in as plain environment variables.
- SHOPIFY_ADMIN_TOKEN may be out of date: new Shopify apps are reported to use a client ID and secret that give 24-hour tokens (ops/GAPS-ROUND-2.md G2-05) [VERIFY, ops/RESEARCH-BACKLOG.md item 2].
- ETSY_ACCESS_TOKEN, PINTEREST_ACCESS_TOKEN and any TikTok or YouTube token expire, so they come from the token broker (G2-05), not from a stored credential [VERIFY lifetimes].
- Not listed above yet [VERIFY which are needed]: direct Meta, TikTok and YouTube keys (unless SOCIAL_SCHEDULER_TOKEN covers those networks), the token broker's own key, and SUPPORT_MAILBOX_* and MOR_API_KEY from operations/AUTOMATION-MAP.md.
