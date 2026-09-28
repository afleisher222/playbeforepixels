# Network hosts for the cloud routines: September 28, 2026

**Verdict: the allowlist now covers every host the three routines need to reach, with no wildcards.** `ops/cloud/allowed-domains.txt` went from 70 hosts to 138: 72 added, 4 removed. The API-credential table in `ops/CLOUD-RUNBOOK.md` now lists every key named in `ops/SECRETS.md`. It had no rows for the social scheduler, the uptime monitor, Printify, Gelato or YouTube, and one header was probably wrong (Kit). Several points could not be read from the platforms' own documentation (only code.claude.com was reachable from this session), so they are marked [VERIFY] rather than guessed.

**The founder's one action:** when she creates the "Play Before Pixels" environment (runbook setup step 4), she pastes the list at the end of this file. If she has already created it, she replaces the list with this one. Everything else below is for Claude.

## How the cloud network works (read today at code.claude.com/docs/en/cloud-environments)

- **Custom** network access takes "one domain per line". "A leading `*.` matches every subdomain." Ticking **Also include default list of common package managers** keeps the Trusted defaults as well.
- **These are reachable whatever the list says:**
  - GitHub, through its own proxy;
  - connectors, which the routines must not have;
  - "the hosts you listed on the environment's API credentials";
  - the Anthropic API.
- **The Trusted defaults already include** everything the builds need, so the list does not repeat them:
  - GitHub, including `raw.githubusercontent.com`;
  - npm (`registry.npmjs.org`) and PyPI;
  - Ubuntu apt;
  - `*.googleapis.com`, which covers the YouTube Data, Search Console and Merchant APIs and Google sign-in;
  - `*.r2.cloudflarestorage.com`;
  - `fonts.googleapis.com` and `fonts.gstatic.com`;
  - `code.claude.com`, `docs.claude.com` and `claude.ai`.
- **API credentials:**
  - "The agent proxy adds the key to requests for the hosts you list." The key goes in a header you name. **Bearer** is the default type, and "for a header like `X-Api-Key` that takes the bare value, change the name and clear the prefix."
  - The proxy never attaches a credential to requests the setup script makes.
  - "Two credentials whose hosts overlap without matching exactly get no marker, and the agent proxy sends only one of them."
- **Changing the allowed hosts rebuilds the setup-script cache.** The setup script takes about 10 seconds, so this costs nothing.
- **Observed on September 28:** in the Default environment, WebFetch and curl were both refused for hosts outside the list (`content/research-hub/verification-queue.md`). So WebFetch follows the same list.

## Method

1. Extracted every `http(s)://` host and bare hostname from:
   - ops/, commerce/, operations/, marketing/, legal/, finance/, seo/, business/, CLAUDE.md and brand/BRAND.md;
   - content/ and the products' build scripts, read only;
   - the four workbooks, including the URL column of the events calendar.

   The scan found 280 distinct hosts.
2. Kept only hosts that a routine step actually reaches, using `ops/ROUTINE.md` for which routine runs what:
   - platform APIs (§5);
   - official seller, help and policy pages (the daily stay-current scan, and `ops/RESEARCH-BACKLOG.md` sources);
   - market research (§1);
   - primary research sources (§1 and the research hub's verification queue);
   - official law, tax and trademark sites (`ops/DEADLINES.md`, `ops/COMPLIANCE-GATE.md`, `ops/INTERNATIONAL.md`, `legal/LEGAL-LAUNCH-CHECKLIST.md`);
   - the site's own deploy target.
3. Checked the build scripts: no script in ops/ or brand/ fetches from the network.
   - The product builds need `pdf-lib` and `qrcode` from npm. `node_modules/` is git-ignored, so the updated setup script installs them.
   - The setup script's Playwright safety net needs `cdn.playwright.dev` and `playwright.download.prss.microsoft.com`.
   - `ops/TESTS/check_fonts.js` fails any render that requests anything outside the repository, so rendering needs no network at all.

## Changes to `ops/cloud/allowed-domains.txt`

### Removed (4)

| Host | Why |
|---|---|
| `*.myshopify.com` | A wildcard over every Shopify store in the world, and no store exists yet. The Admin API needs the exact host `<store>.myshopify.com`. It becomes reachable when its API credential is added. It also goes on the list if the run sends a 24-hour token itself (runbook table, Shopify row). A comment line in the file says so |
| `bsky.social`, `public.api.bsky.app` | Nothing in the plan calls Bluesky directly. `ops/LAUNCH-NOW.md` posts to Bluesky through the multi-network posting service. Direct Bluesky posting also needs a password in the request body, which a stored credential cannot supply |
| `code.claude.com` | Already in the Trusted defaults, which the runbook says to tick |

### Added (72), by section

| Section | Hosts added | Needed by |
|---|---|---|
| Build tools | `cdn.playwright.dev`, `playwright.download.prss.microsoft.com` | `ops/cloud/setup-script.sh` step 4 (being rewritten by another workflow now). It runs only if the cloud image ever loses Playwright or Chromium |
| Website | `developers.cloudflare.com`, `playbeforepixels.com`, `www.playbeforepixels.com`, `shop.playbeforepixels.com` | Deploy docs (Pages, Workers, Access for the approval Worker). The daily check reads the live site, and §5 reads back what was published. `shop.` is the planned Shopify subdomain (`commerce/storefront-setup-guide.md`). `api.cloudflare.com` was already listed |
| Platform APIs | `open-upload.tiktokapis.com` | TikTok file uploads go to the `upload_url` TikTok returns, reported to be on this host [VERIFY]. It needs no credential |
| Stay-current scan | `merch.amazon.com`, `www.kdpcommunity.com` (KDP's announcements board), `community.etsy.com` (Etsy's announcements), `help.teacherspayteachers.com`, `sellerblog.teacherspayteachers.com`, `changelog.shopify.com`, `app.gumroad.com` (API docs [VERIFY host]), `help.pinterest.com`, `policy.pinterest.com`, `business.pinterest.com`, `transparency.meta.com`, `help.instagram.com`, `seller-us.tiktok.com`, `support.google.com` (YouTube, Merchant Center and Search Console help), `developers.mailerlite.com`, `help.kit.com`, `help.printful.com`, `developers.printful.com`, `support.claude.com` | Each platform the scan names in `ops/ROUTINE.md`. Most are already cited in commerce/, marketing/, legal/ or ops/ |
| Research: official bodies | `iris.who.int`, `www.healthychildren.org`, `www.unesco.org`, `unesdoc.unesco.org`, `sites.ed.gov`, `ectacenter.org`, `www.nhs.uk` | These publish the allowed citations in `brand/BRAND.md`: the WHO 2019 guideline PDF, AAP, and the UNESCO GEM Report 2023. They are also the sources named for `content/research-hub/early-intervention.md`: IDEA, ECTA and the NHS |
| Research: publishers | `linkinghub.elsevier.com`, `www.sciencedirect.com`, `link.springer.com`, `journals.sagepub.com`, `onlinelibrary.wiley.com`, `www.tandfonline.com`, `www.mdpi.com`, `journals.lww.com`, `bmcpediatr.biomedcentral.com`, `bmcpublichealth.biomedcentral.com`, `www.frontiersin.org`, `journals.plos.org`, `www.degruyterbrill.com` [VERIFY], `www.thieme-connect.de` [VERIFY] | The publisher sites that the verification queue's `doi.org` links resolve to. Its 39 DOI links use the prefixes 10.1001, 10.1007, 10.3390, 10.1177, 10.4103, 10.1186, 10.1111, 10.1080, 10.1016, 10.1002, 10.3389, 10.1515, 10.1371, 10.1097 and 10.1055. Elsevier DOIs pass through `linkinghub.elsevier.com` first |
| Research: other queue pages | `psycnet.apa.org`, `www.cairn.info`, `shs.cairn.info`, `dergipark.org.tr`, `www.jnma.com.np`, `psihologia.ro`, `psychologiescientifique.org`, `healthcare-bulletin.co.uk`, `afpa.org`, `www.autismus.de`, `www.sciencemediacentre.org` | The exact "Check:" URLs in `content/research-hub/verification-queue.md`. No hub page may be published until its sources are read |
| US and Maryland law and tax | `tmep.uspto.gov`, `mgaleg.maryland.gov`, `oag.ca.gov` | TMEP for the ALPHAPLAY Statement of Use packet (`ops/DEADLINES.md`). Maryland statutes and the California privacy check are both cited in `legal/LEGAL-LAUNCH-CHECKLIST.md` |
| Worldwide plan | `www.legislation.gov.uk`, `ico.org.uk`, `www.canada.ca`, `competition-bureau.canada.ca`, `crtc.gc.ca`, `www.ato.gov.au`, `www.ird.govt.nz`, `single-market-economy.ec.europa.eu`, `www.edpb.europa.eu` | The legal steps of regions 2–4 in `ops/INTERNATIONAL.md`: UK GDPR, Canadian textile labelling, AU and NZ GST, EU product safety (GPSR) and GDPR. CASL (`crtc.gc.ca`) matters as soon as the email list takes Canadian sign-ups |
| Events calendar | `www.usps.com`, `screenfree.org`, `www.litworld.org`, `www.naeyc.org` | The high-fit calendar rows still marked Confirmed = N whose prep starts in the next 6 months: the USPS holiday cutoffs (Dec 3–5), the spring screen-free week, World Read Aloud Day and the early-childhood week. Printful's and Etsy's holiday pages were already covered |

All the hosts that were already listed stay. Each one maps to a routine step: the platform APIs, the seller pages, `trends.google.com` and `trends.pinterest.com`, the research indexes (PubMed, PMC, Europe PMC, Crossref, OpenAlex, Semantic Scholar), and the IRS, USPTO, FTC, CPSC, Maryland and EU sites. `docs.github.com` serves backlog item 6. The API hosts stay listed even though a credential would also open them. For Etsy, Pinterest, TikTok and (possibly) Shopify, the token is short-lived, so the run sends it itself and no credential covers the host.

## Reachable without being listed

| Host | Path |
|---|---|
| `github.com` and the GitHub API | The GitHub proxy (push only to the session's working branch) |
| `registry.npmjs.org`, `pypi.org`, `files.pythonhosted.org`, `archive.ubuntu.com` | Trusted defaults (product builds, setup script, `apt-get install zip`) |
| `*.googleapis.com` (`youtube.googleapis.com`, `www.googleapis.com`, `searchconsole.googleapis.com`, `merchantapi.googleapis.com`, `oauth2.googleapis.com`) | Trusted defaults |
| `*.r2.cloudflarestorage.com`, `*.amazonaws.com` | Trusted defaults. Pinterest's video-upload URLs are on S3 |
| `rupload.facebook.com` | Only when put on the Meta credential (Reels uploads [VERIFY]) |
| The scheduler, uptime monitor and token-broker hosts | Their API credentials, once added |

## Left out on purpose (least privilege)

About 190 hosts in the repository's text files, and about 75 more in the events-calendar workbook, are not on the list:
- **Competitors, blogs, news and review sites.** These are research notes in marketing/ and business/. Reading them is not a routine step, and the copycat watch searches the marketplaces themselves.
- **Secondary legal databases and law-firm pages** (FindLaw, Justia, Cornell LII, CourtListener, law-firm blogs). The eCFR, the Federal Register and the agencies' own sites are the primary sources.
- **Domain registries and registrars** (Nominet, CIRA, auDA, AFNIC, DENIC, EURid, ICANN). Buying a domain is the founder's step.
- **Vendors not chosen:**
  - Payhip, Lemon Squeezy and Paddle (the merchant of record is Gumroad);
  - Printify and Gelato (the print partner is Printful). Add `api.printify.com` or the Gelato hosts only if that choice changes;
  - QuickBooks, Link My Books, Wave, Xero and FreshBooks (the bookkeeping feeds run on their own);
  - Calendly, Acuity, Kajabi, Teachable and Podia (no live services; no course platform chosen).
- **Upload-packet platforms without an API** (Author Central, Seller Central, Brand Registry, Walmart Marketplace). The founder uploads there herself.
- **Social profile pages** (`www.instagram.com`, `x.com`, `www.threads.com`, `www.linkedin.com`, `www.youtube.com`). Read-back goes through each platform's API, not the public page. YouTube's policies are on `support.google.com`.
- **About 75 event-organizer sites** in the events calendar: conferences, book fairs, awareness days, and the Region 2 carriers (Royal Mail, Canada Post, Australia Post). If a row's official URL is not on the list, the run writes "blocked: <host>" in that row's notes and keeps the calculated date. The founder adds the host only when the date decides money, such as a shipping cutoff for a region that is live.
- **ResearchGate** (3 queue items). It is a repository, not the primary source, and it refuses automated readers. Read those items through their DOI or PubMed record, or delete the claim (the queue's own rule).
- **Region 5 and single-country government portals** (Brazil, France, Spain, the German packaging register, Australian product safety and eSafety). Add them when `ops/INTERNATIONAL.md` reaches that region.
- **`telemetry.astro.build` and `sparrow.cloudflare.com`** (build telemetry). A blocked call is harmless. Set `ASTRO_TELEMETRY_DISABLED=1` and `WRANGLER_SEND_METRICS=false` as plain environment variables to silence them.

## API credential table vs `ops/SECRETS.md`

What the check found (the runbook table has been updated; `ops/SECRETS.md` got an "open points" note under its table):

| # | Finding | Change made |
|---|---|---|
| 1 | `SOCIAL_SCHEDULER_TOKEN`, `UPTIME_API_KEY`, `PRINTIFY_API_TOKEN` and `GELATO_API_KEY` are in `ops/SECRETS.md` but had no row in the runbook table | Rows added. The hosts are marked [VERIFY], because neither service is chosen |
| 2 | Meta and TikTok are in the runbook table but have no key name in `ops/SECRETS.md`. YouTube is in neither, although `ops/LAUNCH-NOW.md` has Claude upload Shorts through the official API | Rows marked "not in ops/SECRETS.md yet [VERIFY]": a direct key, or the scheduler covers those networks |
| 3 | Kit: the runbook said `Authorization: Bearer …`. Kit's v4 API keys are reported to use `X-Kit-Api-Key`; Bearer is for OAuth tokens | Split into a MailerLite row and a Kit row, with the Kit header marked [VERIFY] |
| 4 | `CLOUDFLARE_ACCOUNT_ID` and `SHOPIFY_STORE_DOMAIN` are listed as keys, but they are identifiers | Both documents now say: add them as plain environment variables |
| 5 | Shopify: `SHOPIFY_ADMIN_TOKEN` (a custom app) conflicts with G2-05, where Dev Dashboard apps get 24-hour tokens from a client ID and secret. That exchange puts the secret in the request body, which the proxy cannot supply | Marked [VERIFY] in both documents. If it holds, the token broker supplies Shopify tokens, and the exact store host goes on the allowlist |
| 6 | Etsy: access tokens are short-lived, so only `x-api-key` can be a stored credential. The runbook said "`x-api-key` plus OAuth" | The row now says to store only `x-api-key`, with the bearer token from the broker. The `x-api-key` value format is marked [VERIFY] |
| 7 | Pinterest, TikTok and YouTube tokens expire (30 days, 24 hours and about 1 hour, all reported [VERIFY]), so a stored credential would silently stop working | Each row says "the token broker". This matches `ops/ROUTINE.md` step 0.7 and G2-05 |
| 8 | Cloudflare: wrangler reads `CLOUDFLARE_API_TOKEN` from an environment variable. A Pages direct upload then sends its own upload token to `api.cloudflare.com`, the same host the proxy adds the stored key to | [VERIFY] on the first deploy. The row names a fallback that needs no key: connect the Pages project to the GitHub repository so a push deploys |
| 9 | Meta and Gumroad: their documentation examples pass the token as an `access_token` parameter. Whether each accepts `Authorization: Bearer` is not confirmed | Marked [VERIFY] |
| 10 | Printful: an account-level token needs `X-PF-Store-Id` on store endpoints; a store-level token does not | Noted, [VERIFY] |
| 11 | The token broker and approval Worker (G2-03, G2-05) had no row, although steps 0.7 and §5 depend on it | Row added. Its host is decided when it is built |

Hosts and header names that match both documents and need no mark: Cloudflare `api.cloudflare.com` with `Authorization: Bearer`; Shopify's header name `X-Shopify-Access-Token` with no prefix; Pinterest `api.pinterest.com` with Bearer; Printful `api.printful.com` with Bearer; MailerLite `connect.mailerlite.com` with Bearer.

## Other things that affect the routines

- **Media must be public before posting.** Instagram, Facebook and Pinterest take an image or video URL, and Printful takes file URLs. So §5 must deploy the site's media first, then post. `playbeforepixels.com` does not exist until the founder buys the domain (`ops/LAUNCH-NOW.md` Wave 0, step 5).
- **The Search Console manual-action status** in `ops/HEARTBEAT.json` may not be available through Google's API [VERIFY]. If it is not, it stays "not connected", and the check is manual.
- **The weekly `git bundle` backup** (G2-04): R2's hosts are in the defaults, but R2's S3 API signs every request with the secret key, which a header credential cannot do [VERIFY]. So the backup should go through the approval Worker (write-only), not straight to R2.
- **Link checks must not report blocked hosts as broken.** The site links out to Amazon, Bookshop.org, Etsy, TpT and the social profiles, and most of those hosts are not on the list. The AUTOFIX broken-link check must count a proxy answer of `403 host_not_allowed` as "not checked", never as a broken link to fix.
- **Credential type for Google:** never put two credentials on one Google host. Only one would be sent, for example if YouTube and Search Console both used `www.googleapis.com`.

## [VERIFY] items for the research runs

These are already covered by `ops/RESEARCH-BACKLOG.md` items 2–5, 7, 8 and 11, plus two small host checks:
- `app.gumroad.com` is Gumroad's API documentation host.
- `www.degruyterbrill.com` and `www.thieme-connect.de` are where De Gruyter and Thieme DOIs resolve today.

If either host is wrong, the run writes "blocked: <host>" and continues.

## Paste-ready list (snapshot of `ops/cloud/allowed-domains.txt` on September 28, 2026; the .txt file is the source of truth)

```text
cdn.playwright.dev
playwright.download.prss.microsoft.com
api.cloudflare.com
developers.cloudflare.com
playbeforepixels.com
www.playbeforepixels.com
shop.playbeforepixels.com
openapi.etsy.com
api.pinterest.com
graph.facebook.com
open.tiktokapis.com
open-upload.tiktokapis.com
api.gumroad.com
api.printful.com
connect.mailerlite.com
api.kit.com
kdp.amazon.com
www.kdpcommunity.com
merch.amazon.com
www.amazon.com
www.ingramspark.com
www.etsy.com
help.etsy.com
community.etsy.com
developers.etsy.com
www.teacherspayteachers.com
help.teacherspayteachers.com
sellerblog.teacherspayteachers.com
www.shopify.com
help.shopify.com
shopify.dev
changelog.shopify.com
gumroad.com
app.gumroad.com
www.pinterest.com
help.pinterest.com
policy.pinterest.com
business.pinterest.com
developers.pinterest.com
www.facebook.com
transparency.meta.com
help.instagram.com
developers.facebook.com
www.tiktok.com
seller-us.tiktok.com
developers.tiktok.com
support.google.com
developers.google.com
www.mailerlite.com
developers.mailerlite.com
help.kit.com
developers.kit.com
www.printful.com
help.printful.com
developers.printful.com
www.faire.com
support.claude.com
docs.github.com
trends.pinterest.com
trends.google.com
pubmed.ncbi.nlm.nih.gov
pmc.ncbi.nlm.nih.gov
www.ncbi.nlm.nih.gov
eutils.ncbi.nlm.nih.gov
europepmc.org
www.ebi.ac.uk
api.crossref.org
doi.org
api.openalex.org
api.semanticscholar.org
www.who.int
iris.who.int
www.aap.org
publications.aap.org
www.healthychildren.org
www.unesco.org
unesdoc.unesco.org
www.cdc.gov
sites.ed.gov
ectacenter.org
www.nhs.uk
jamanetwork.com
linkinghub.elsevier.com
www.sciencedirect.com
link.springer.com
journals.sagepub.com
onlinelibrary.wiley.com
www.tandfonline.com
www.mdpi.com
journals.lww.com
bmcpediatr.biomedcentral.com
bmcpublichealth.biomedcentral.com
www.frontiersin.org
journals.plos.org
www.degruyterbrill.com
www.thieme-connect.de
psycnet.apa.org
www.cairn.info
shs.cairn.info
dergipark.org.tr
www.jnma.com.np
psihologia.ro
psychologiescientifique.org
healthcare-bulletin.co.uk
afpa.org
www.autismus.de
www.sciencemediacentre.org
www.ftc.gov
www.ecfr.gov
www.federalregister.gov
www.uspto.gov
tsdr.uspto.gov
tmsearch.uspto.gov
tmep.uspto.gov
www.copyright.gov
www.cpsc.gov
www.irs.gov
egov.maryland.gov
dat.maryland.gov
www.marylandtaxes.gov
mgaleg.maryland.gov
oag.ca.gov
www.gov.uk
www.legislation.gov.uk
ico.org.uk
www.canada.ca
competition-bureau.canada.ca
crtc.gc.ca
www.ato.gov.au
www.ird.govt.nz
eur-lex.europa.eu
taxation-customs.ec.europa.eu
single-market-economy.ec.europa.eu
www.edpb.europa.eu
www.usps.com
screenfree.org
www.litworld.org
www.naeyc.org
```
