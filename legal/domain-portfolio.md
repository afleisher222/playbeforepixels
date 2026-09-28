> **DRAFT — not legal advice. Adversarial review pass 2026-09-28: corrections are marked "[Review]". Every price and registry rule remains UNVERIFIED until confirmed at checkout or on the registry's own site.**

# Domain portfolio: Play Before Pixels

Prepared September 27, 2026. Registrant for every domain: **AlphaPlay LLC** (the brand is a trade name of AlphaPlay LLC; see `legal/ENTITY.md`). Use the business mailbox address in ENTITY.md, not a home address, as the registrant contact.

## Read this first

1. **Availability is not confirmed.** Direct access to RDAP/WHOIS registries and to Cloudflare's price and TLD pages was blocked in this research environment. The "Signal" column below comes from a **live DNS delegation check** (an NS query sent to public resolver 8.8.8.8 on 2026-09-27; script kept in the session scratchpad):
   - **NXDOMAIN** = the name has no DNS delegation. It is *probably* unregistered, but a name can still be registered without DNS, on hold, reserved, or premium-priced. **Confirm every name at Cloudflare checkout.**
   - **REGISTERED** = the name has live nameservers, so someone owns it. Treat it as unavailable.
2. **Prices are estimates (UNVERIFIED).** Cloudflare sells at cost, meaning the registry and ICANN list price with no markup, and renews at the registry list price ([Cloudflare Registrar docs](https://developers.cloudflare.com/registrar/about/), [source file](https://raw.githubusercontent.com/cloudflare/cloudflare-docs/production/src/content/docs/registrar/about.mdx); [renewals](https://developers.cloudflare.com/registrar/account-options/renew-domains/)). There are no first-year promos, so **first-year cost is about the same as renewal**. The dollar figures below are estimates from general knowledge, rounded up for budgeting. [Review] They are **not guaranteed ceilings**: the $10.50 .com figure reflects the Verisign wholesale price as of late 2024, and registries (including Verisign under its .com agreement) can raise wholesale prices, which Cloudflare passes through. Budget about $1 more per .com row, and premium-priced names cost more. The live price list could not be fetched. Check the real price on the [Cloudflare TLD policies page](https://www.cloudflare.com/tld-policies/) or in the dashboard before buying. Registrations are **non-refundable**, including typos ([Cloudflare FAQ](https://developers.cloudflare.com/registrar/faq/)).
3. **Domains do not protect the business idea.** A domain stops only one other person from owning that exact address. It does not stop anyone from selling "play before pixels" books, merch or courses under a slightly different name. Real protection comes from a **trademark** (USPTO filing by AlphaPlay LLC, handled in the trademark lane with an attorney) and from **getting to market first and doing it well**.
4. **Cloudflare Registrar requires Cloudflare DNS** as the authoritative nameserver ([requirements](https://raw.githubusercontent.com/cloudflare/cloudflare-docs/production/src/content/partials/registrar/requirements.mdx)). That suits the planned Cloudflare Pages setup. Every defensive domain can 301-redirect to the main site for free: the Free plan includes 15 Bulk Redirect rules, 5 lists and 10,000 URL redirects across lists (re-checked 2026-09-28). [Review] Bulk Redirects only work on a **proxied** hostname, so each defensive domain must be added as its own (free) Cloudflare zone with a proxied placeholder DNS record, for example an orange-clouded `A` record at `192.0.2.1` for the apex and `www` ([Cloudflare Rules availability](https://developers.cloudflare.com/rules/url-forwarding/#availability), [source file](https://raw.githubusercontent.com/cloudflare/cloudflare-docs/production/src/content/docs/rules/url-forwarding/index.mdx)).

## How international shoppers find the site (the point of this portfolio)

- **Run one global store at `playbeforepixels.com`.** Country domains should only redirect to it, with paths such as `/uk/` or `/en-gb/` if localized pages come later. One domain builds search authority faster than ten thin ones. Add `hreflang` tags when regional pages exist, and list the site in Google Search Console and Bing Webmaster Tools.
- **Most international book buyers will find you through marketplaces first**: Amazon's regional stores, IngramSpark's global retail feed, and Bookshop.org, which also runs a UK shop. Put `playbeforepixels.com` inside the product itself (back cover, copyright page, back matter, merch hang tags, packing inserts) and on your own social profiles. [Review] **Do not paste the URL into marketplace listing descriptions without checking each platform's current rules first.** Marketplaces such as Etsy and Amazon restrict listing content that sends buyers off-platform to buy; the exact current wording could not be fetched here (kdp.amazon.com and etsy.com were blocked), so this is UNVERIFIED and must be checked in each seller policy before listing.
- **Buy country domains mainly to stop squatters and to catch people who type `.co.uk` out of habit.** They do not help search ranking much on their own.

## Portfolio table

Legend. **CF?** means Cloudflare Registrar supports the TLD. "Yes (docs)" means the Cloudflare docs name the TLD. "Likely" and "No?" are UNVERIFIED and need checking on the [TLD policies page](https://www.cloudflare.com/tld-policies/). **Est. $/yr** is a budgeting ceiling (UNVERIFIED), with renewal about equal to first year.

### MUST tier (buy at launch)

| # | Domain | Purpose | Signal (DNS 2026-09-27) | CF? | Est. $/yr | Notes / source |
|---|---|---|---|---|---|---|
| 1 | playbeforepixels.com | Main store and site | NXDOMAIN | Yes | 10.50 | Buy first. The whole brand depends on this one. Cloudflare at-cost pricing: [about](https://developers.cloudflare.com/registrar/about/) |
| 2 | playbeforepixels.org | PTAs, libraries, advocacy kits, free research hub (redirect to /research) | NXDOMAIN | Likely | 10.50 | Blocks a look-alike "nonprofit" site aimed at audience C |
| 3 | playbeforepixels.co | The most common .com typo | NXDOMAIN | Yes (docs) | 26.00 | .co is a Colombia ccTLD that is open worldwide. [Review] Cloudflare's docs name .co and cap its term at 5 years ([FAQ](https://developers.cloudflare.com/registrar/faq/), [troubleshooting](https://raw.githubusercontent.com/cloudflare/cloudflare-docs/production/src/content/docs/registrar/troubleshooting.mdx)). The price is the least certain in this list (UNVERIFIED) |
| 4 | playbeforepixels.co.uk | UK is the biggest English-speaking export market | NXDOMAIN | Yes (docs) | 7.00 | Cloudflare supports `.uk` and `.co.uk` ([.UK docs](https://raw.githubusercontent.com/cloudflare/cloudflare-docs/production/src/content/docs/registrar/top-level-domains/uk-domains.mdx)). No UK residency needed (UNVERIFIED, confirm at [Nominet](https://www.nominet.uk/)) |
| 5 | playbeforepixels.uk | Pair with .co.uk (separate registrations) | NXDOMAIN | Yes (docs) | 7.00 | Same source as row 4 |
| | **MUST total** | | | | **≈ $61 first year / ≈ $61 per year renewal** | |

### SHOULD tier (buy within 90 days or before the first paid ad or print run)

| # | Domain | Purpose | Signal | CF? | Est. $/yr | Notes / source |
|---|---|---|---|---|---|---|
| 6 | playbeforepixels.net | Common fallback TLD | NXDOMAIN | Likely | 12.00 | |
| 7 | playbeforepixel.com | Typo: singular "pixel" | NXDOMAIN | Yes | 10.50 | Redirect to .com |
| 8 | play-before-pixels.com | Hyphen variant | NXDOMAIN | Yes | 10.50 | Redirect |
| 9 | playb4pixels.com | Texting-style variant, likely on merch | NXDOMAIN | Yes | 10.50 | Redirect |
| 10 | moretalklesstap.com | Slogan: "More talk, less tap" | NXDOMAIN | Yes | 10.50 | Could be printed on board-book back covers. No live registration found on 2026-09-27 |
| 11 | lapsnotapps.com | Slogan: "Laps not apps" | NXDOMAIN | Yes | 10.50 | No live registration found on 2026-09-27 |
| 12 | playbeforepixels.nz | NZ market, direct .nz | NXDOMAIN | Yes (docs) | 18.00 | Cloudflare docs name .nz ([FAQ](https://developers.cloudflare.com/registrar/faq/), [troubleshooting](https://raw.githubusercontent.com/cloudflare/cloudflare-docs/production/src/content/docs/registrar/troubleshooting.mdx)). Registrant email verification applies. Open to non-residents (UNVERIFIED) |
| 13 | playbeforepixels.shop | Store alias for ads and QR codes | NXDOMAIN | Likely | 35.00 | Optional. Skip if the budget is tight |
| 14 | playbeforepixels.ca | Canada | NXDOMAIN | Yes (docs) | 12.00 | **Eligibility-gated.** Cloudflare docs name .ca ([transfer docs](https://raw.githubusercontent.com/cloudflare/cloudflare-docs/production/src/content/docs/registrar/get-started/transfer-domain-to-cloudflare.mdx)). CIRA's Canadian Presence Requirements generally bar a US LLC. The exception is the owner of a **registered Canadian trademark** for the exact name (UNVERIFIED, confirm at [CIRA](https://www.cira.ca/)). Do not use a "trustee" workaround without checking CIRA rules. **Not counted in the total** until AlphaPlay LLC is eligible |
| | **SHOULD total** (rows 6–13) | | | | **≈ $118 first year / ≈ $118 per year renewal** (≈ $130 if .ca becomes eligible) | |

### NICE tier (optional; buy only if cash allows or a product needs it)

| # | Domain | Purpose | Signal | CF? | Est. $/yr | Notes |
|---|---|---|---|---|---|---|
| 15 | playbeforepixels.family | Parent audience | NXDOMAIN | Likely | 25.00 | |
| 16 | playbeforepixels.education | Educator audience | NXDOMAIN | Likely | 28.00 | Say only "classroom resource", never anything implying accreditation |
| 17 | playbeforepixels.academy | Course: "30-Day Screen Reset" | NXDOMAIN | Likely | 32.00 | Better to run the course at playbeforepixels.com/reset |
| 18 | playbeforepixels.school | Educators | NXDOMAIN | Likely | 32.00 | Could be mistaken for a real school. Redirect only |
| 19 | playbeforepixels.store | Store alias | NXDOMAIN | Likely | 55.00 | Renewals are high. Low value if .shop is owned |
| 20 | playbeforepixels.kids | Parent audience | NXDOMAIN | **No?** (UNVERIFIED) | 30.00 | The .kids registry has child-safety content policies (UNVERIFIED). May need a registrar other than Cloudflare |
| 21 | screenfreeandproud.com | Slogan: "Screen-free and proud of it" | NXDOMAIN | Yes | 10.50 | |
| 22 | askmewhatibuilttoday.com | Slogan and merch | NXDOMAIN | Yes | 10.50 | |
| 23 | 30dayscreenreset.com | Course name | NXDOMAIN | Yes | 10.50 | Also NXDOMAIN: thirtydayscreenreset.com. Buy only one |
| 24 | playbeforescreens.com | Close meaning-variant | NXDOMAIN | Yes | 10.50 | Defensive |
| | **NICE total** (rows 15–24) | | | | **≈ $244 first year / ≈ $244 per year renewal** | |

**.books does not exist.** A root-zone DNS check shows no `.books` TLD is delegated, so there is nothing to buy. The related `.book` TLD exists (live check 2026-09-27), but Cloudflare support for it is doubtful (UNVERIFIED), and it is not worth buying.

### Grand totals (UNVERIFIED estimates; confirm at checkout)

| Tier | Domains | First year | Each renewal year |
|---|---|---|---|
| MUST | 5 | ≈ $61 | ≈ $61 |
| MUST + SHOULD | 13 (14 with .ca) | ≈ $179 (≈ $191) | ≈ $179 (≈ $191) |
| MUST + SHOULD + NICE | 23 | ≈ $423 | ≈ $423 |
| DEFER tier (below, non-Cloudflare) | up to 6 | ≈ $150–$400 including local-presence/trustee fees | similar |

Recommendation: **buy MUST now** (about $61), add SHOULD before the first print run or paid ads, and buy from NICE or DEFER only for a real reason, such as a UK or EU distributor or a slogan printed on a product.

## Country-code domains for international markets

| ccTLD | Signal | Cloudflare? | Residency / presence rule (UNVERIFIED; the registry sites were blocked here) | Recommendation |
|---|---|---|---|---|
| .co.uk / .uk | NXDOMAIN | **Yes (docs)** ([.UK docs](https://raw.githubusercontent.com/cloudflare/cloudflare-docs/production/src/content/docs/registrar/top-level-domains/uk-domains.mdx)) | No UK presence required ([Nominet](https://www.nominet.uk/)) | MUST |
| .ca | NXDOMAIN | **Yes (docs)** | Canadian Presence Requirements. A US LLC qualifies only through a registered Canadian trademark matching the domain ([CIRA](https://www.cira.ca/)) | SHOULD, but only after a Canadian trademark registers |
| .nz | NXDOMAIN (also .co.nz) | **Yes (docs)** | Open to anyone ([InternetNZ/DNC](https://www.dnc.org.nz/)) | SHOULD |
| .com.au / .au | NXDOMAIN | No? (UNVERIFIED) | Australian presence: an ABN/ACN, **or** an Australian trademark application or registration that exactly matches the domain ([auDA](https://www.auda.org.au/)) | DEFER until an Australian trademark is filed (the Madrid Protocol can extend the US filing) |
| .de | NXDOMAIN | No? (UNVERIFIED) | Open worldwide, but a holder outside Germany must name an authorised recipient in Germany ([DENIC](https://www.denic.de/)). Registrars sell this as a trustee service | DEFER |
| .fr | NXDOMAIN | No? (UNVERIFIED) | EU/EEA/Swiss residents or companies only ([AFNIC](https://www.afnic.fr/)). A US LLC needs a trustee | DEFER |
| .es | NXDOMAIN | No? (UNVERIFIED) | Open to non-residents with ID ([dominios.es](https://www.dominios.es/)) | DEFER |
| .ie | NXDOMAIN | No? (UNVERIFIED) | Must show a connection to the island of Ireland. Evidence of selling to Irish customers can qualify ([.IE](https://www.weare.ie/)) | DEFER |
| .eu | NXDOMAIN | No? (UNVERIFIED) | EU/EEA citizens, residents or established organisations only ([EURid](https://eurid.eu/)). A US LLC needs a trustee or an EU entity | DEFER |

The Cloudflare docs do not name .de, .fr, .es, .ie, .eu or .au in the pages that could be read ([Cloudflare TLD docs](https://raw.githubusercontent.com/cloudflare/cloudflare-docs/production/src/content/docs/registrar/top-level-domains/index.mdx) point to the TLD policies page for the full list). If Cloudflare does not offer them, they would be registered at another registrar and pointed at Cloudflare DNS. Trustee and "local presence" services add cost and put a third party's name on the registration, so buy them only when sales in that market justify it.

## Slogan and alternative-name domains already registered by others (do not buy; do not contact owners without advice)

| Domain | Signal | Nameservers seen | Meaning |
|---|---|---|---|
| screenscanwait.com | REGISTERED | registrar-servers.com (Namecheap DNS) | Taken. Content could not be viewed from here (UNVERIFIED whether in use) |
| childhoodcantwait.com | REGISTERED | domaincontrol.com (GoDaddy DNS) | Taken |
| pencilsbeforepixels.com | REGISTERED | hostpapa.com (hosting) | **Taken and apparently hosted.** Someone may already use "Pencils before pixels". **Flag to the trademark lane** before printing that slogan on merch |
| paperfirst.com | REGISTERED | afternic.com | Afternic nameservers usually mean the name is listed for sale. Not worth it for a secondary slogan |
| virtualautism.com | REGISTERED | namebrightdns.com | Taken, likely parked (UNVERIFIED) |
| virtualautism.org | REGISTERED | wixdns.net (Wix site) | **Someone runs a Wix site on this name.** Risk of confusion; see the next section |

### Status of the alternative names' .com

| Name | .com signal | Notes |
|---|---|---|
| Kitefield | REGISTERED (namebrightdns.com, likely parked) | Probably only available at an aftermarket price (UNVERIFIED) |
| Tinkerlark | **NXDOMAIN** (probably unregistered) | Best backup if a rename is needed |
| Puddlefort | **NXDOMAIN** | Backup |
| Chatterkite | **NXDOMAIN** | Backup |
| Paperlark | REGISTERED (namebrightdns.com) | Taken |
| Wonderlap | REGISTERED (namebrightdns.com) | Taken |
| Hopstone | REGISTERED (namebrightdns.com) | Taken |
| Rootling | REGISTERED (Cloudflare DNS, likely in use) | Taken |

Tip: if a rename is still a real possibility, spend about $10.50 to hold the best backup's .com (for example `tinkerlark.com`) until the name decision is final. Do not buy all of them.

## Education-hub domains ("The Virtual Autism Project"): assessment

- **Signal:** `virtualautismproject.com`, `.org`, `thevirtualautismproject.com` and `.org` are all NXDOMAIN, so they are probably available. `virtualautism.com` and `virtualautism.org` are already registered by others, and the .org has a live Wix site.
- **Recommendation: do not buy these, and do not use "autism" in any domain or hub name.** Rename the hub to something non-medical, such as "Play Before Pixels Research Library", and host it at `playbeforepixels.com/research`. Reasons:
  1. **Health-claim risk.** A domain naming a developmental condition, owned by a company that sells screen-reduction products, implies that screens cause autism or that the products prevent or improve it. The brand's rules forbid any health or medical claim. Keeping "autism" out of every domain and product page is the only safe approach. "Virtual autism" is not a recognized diagnosis. That is a general knowledge point (UNVERIFIED here), and it is exactly why a clinical-sounding URL is risky for a non-clinician.
  2. **Credential risk.** The founder is not a speech-language pathologist or clinician. A "project" domain about a condition invites readers to assume clinical authority.
  3. **Confusion with an existing site.** `virtualautism.org` already hosts a live site.
  4. **Holding the domain unused** blocks squatting but still ties the brand to the term if it ever comes to light. If the founder insists on keeping the name, have **counsel review it first**. Hold only `virtualautismproject.org` at about $10.50 with no redirect to the store, and never link it to anything for sale.

## Operational checklist

1. **Register all domains in one Cloudflare account owned by AlphaPlay LLC.** Use a role email, not a personal inbox, and turn on 2FA with two admins.
2. **Keep auto-renew ON** for MUST and SHOULD ([renewals](https://developers.cloudflare.com/registrar/account-options/renew-domains/)), and set a calendar check 60 days before each expiry. Use a company card with an expiry date later than the domains'.
3. **Turn on DNSSEC** (one click at Cloudflare) and keep WHOIS redaction on ([about](https://developers.cloudflare.com/registrar/about/)).
4. **Point every non-primary domain at `playbeforepixels.com`** with one Bulk Redirect list (301, keeps path and query). [Review] Add each domain as a zone and give it a proxied placeholder record first, or the redirect will not fire.
5. **Put only `playbeforepixels.com` in print and on merch tags.** Use it in ISBN metadata, author bios and marketplace listings **only where that platform's rules allow outside links** (UNVERIFIED per platform). Secondary domains are shields, not addresses.
6. **Do not buy a domain that contains another company's, school's or EdTech product's name**, even as a joke or a comparison.
7. **Before printing any slogan on merch**, run a trademark clearance through the trademark lane, especially "Pencils before pixels", "Childhood can't wait. Screens can." and "Paper first", where similar domains are already registered.

## Sources and method

- Cloudflare Registrar documentation, read from the public docs repository (the rendered site was blocked here):
  - [about.mdx](https://raw.githubusercontent.com/cloudflare/cloudflare-docs/production/src/content/docs/registrar/about.mdx) (at-cost pricing, WHOIS redaction, DNSSEC)
  - [faq.mdx](https://developers.cloudflare.com/registrar/faq/) (non-refundable; .uk and .nz transfer rules)
  - [top-level-domains/index.mdx](https://raw.githubusercontent.com/cloudflare/cloudflare-docs/production/src/content/docs/registrar/top-level-domains/index.mdx) (400+ TLDs; full list on the TLD policies page)
  - [uk-domains.mdx](https://raw.githubusercontent.com/cloudflare/cloudflare-docs/production/src/content/docs/registrar/top-level-domains/uk-domains.mdx)
  - [troubleshooting.mdx](https://raw.githubusercontent.com/cloudflare/cloudflare-docs/production/src/content/docs/registrar/troubleshooting.mdx) and [transfer-domain-to-cloudflare.mdx](https://raw.githubusercontent.com/cloudflare/cloudflare-docs/production/src/content/docs/registrar/get-started/transfer-domain-to-cloudflare.mdx) (.ca, .nz and .mx verification)
  - [requirements partial](https://raw.githubusercontent.com/cloudflare/cloudflare-docs/production/src/content/partials/registrar/requirements.mdx) (Cloudflare DNS is required)
  - [url-forwarding/index.mdx](https://raw.githubusercontent.com/cloudflare/cloudflare-docs/production/src/content/docs/rules/url-forwarding/index.mdx) (Bulk Redirects on the Free plan)
- **Not reachable from this environment, so still to confirm:** the [Cloudflare TLD policies and price list](https://www.cloudflare.com/tld-policies/), every registry's residency page (Nominet, CIRA, auDA, DENIC, AFNIC, dominios.es, .IE, DNC/InternetNZ, EURid), and the live content of the registered sites above. Every price and every residency rule in this file is **UNVERIFIED** until checked.
- **Registration signals:** raw DNS NS queries to 8.8.8.8 on 2026-09-27, re-run on 2026-09-28 for the MUST and SHOULD names, the taken slogan domains, `virtualautism.org`, `virtualautismproject.org`, `tinkerlark.com` and the `.books`/`.book`/`.kids` TLDs, with identical results. This is not RDAP or WHOIS, and **availability must be confirmed by the founder at Cloudflare checkout.**
