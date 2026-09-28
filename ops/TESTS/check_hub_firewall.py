#!/usr/bin/env python3
"""
check_hub_firewall.py - research-hub firewall checks for Play Before Pixels.

Implements the machine-checkable rules HF-02 to HF-16 in marketing/AWARENESS-ENGINE.md
section 10 (the wall between the research hub and the shop). HF-01, HF-17 and HF-18 are
manual checks. BRAND.md "Autism searches" is the rule these checks enforce.

READ-ONLY for content/, products/, seo/ and any --site folder. It writes only the
files named with --report / --json.

Usage (from the repo root):
  python3 ops/TESTS/check_hub_firewall.py                 # summary; exit 1 if a FAIL sits on a publish:true page
  python3 ops/TESTS/check_hub_firewall.py --strict        # exit 1 on any FAIL, published or not (pre-publish pass)
  python3 ops/TESTS/check_hub_firewall.py --site dist/    # also check the built HTML (trackers, JSON-LD, reverse links)
  python3 ops/TESTS/check_hub_firewall.py --report ops/TESTS/hub-firewall.md --json /tmp/hub.json

Exit codes: 0 = pass; 1 = blocking FAIL; 2 = script error.
Levels: FAIL blocks publication of that page; WARN goes to a human reviewer.
"""
from __future__ import annotations

import argparse
import datetime as dt
import glob
import json
import os
import re
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
HUB = os.path.join(ROOT, "content", "research-hub")
QUEUE = os.path.join(ROOT, "content", "queue")
SEO_ARTICLES = os.path.join(ROOT, "seo", "articles")
PRODUCTS = os.path.join(ROOT, "products")

HUB_PRINTABLE = "/research/play-printable/"          # the one product-free printable page the hub may link to
# Hub URL prefixes, English plus the planned reviewed translations (marketing/AWARENESS-ENGINE.md section 8).
HUB_PREFIXES = ("/research/", "/es/investigacion/", "/fr/recherche/", "/pt/pesquisa/", "/de/forschung/",
                "/ro/cercetare/", "/tr/arastirma/")
ALLOWED_INTERNAL_EXACT = {"/editorial-policy/", "/disclaimer/", "/privacy/", "/terms/",
                          "/accessibility/", "/contact/", "/about/"}
PRINTABLE_PAGE_TYPES = {"pillar-guide", "faq", "article"}   # explainers only; never study, library, glossary, how-to, printable, policy, facts
SAFE_SENTENCE_TYPES = {"pillar-guide", "faq", "glossary"}
SAFE_SENTENCE_TOPICS = {"screens-and-autism", "term-and-concept"}
NOT_ADVICE_TYPES = {"pillar-guide", "faq", "how-to", "printable"}

SUPPRESSION_DOMAINS = ("mcpsmd.org", "mcpsmd.net", "montgomeryschoolsmd.org", "montgomerycountymd.gov",
                       "mceanea.org", "marylandeducators.org", "nea.org")
COMMERCE_DOMAINS = ("amazon.", "amzn.", "etsy.com", "teacherspayteachers.com", "gumroad.com", "myshopify.com",
                    "shop.app", "bookshop.org", "printful.com", "printify.com", "gelato.com", "payhip.com")
BANNED_DOMAINS = ("virtualautism.org", "virtualautism.com")   # marketing/virtual-autism-outreach.md checklist
SOCIAL_DOMAINS = ("instagram.com", "tiktok.com", "facebook.com", "youtube.com", "x.com", "twitter.com",
                  "pinterest.com", "threads.net")
AFFILIATE_RX = re.compile(r"[?&](tag|aff|affiliate|ref|associate)=", re.I)

TRACKER_RX = re.compile(r"connect\.facebook\.net|fbq\(|s\.pinimg\.com/ct|pintrk|googletagmanager\.com|"
                        r"google-analytics\.com|doubleclick\.net|googleadservices\.com|analytics\.tiktok\.com|"
                        r"snap\.licdn\.com|bat\.bing\.com|static\.hotjar\.com|clarity\.ms|sc-static\.net", re.I)
BANNED_SCHEMA = {"Product", "Offer", "AggregateOffer", "AggregateRating", "Review", "MedicalWebPage",
                 "MedicalCondition", "Physician", "MedicalOrganization", "MedicalClinic"}

COMMERCE_RX = re.compile(r"\$\s?\d|US\$|\bUSD\b|€\s?\d|£\s?\d|\bbuy (now|it|ours|our)\b|\badd to cart\b|"
                         r"\bshop now\b|\border now\b|\bdiscounts?\b|\bcoupons?\b|\d+\s?% off\b|\bon sale\b|"
                         r"\bpromo code\b|\bfree shipping\b", re.I)
FEAR_RX = re.compile(r"\bepidemic\b|\bfight(ing)? (against )?autism\b|\bbattle\b|\bsuffer(s|ing)? (from|with)\b|"
                     r"\bcure[sd]?\b|\brecover(y|ed|s)? from autism\b|\bbrain damage\b|\btoxic\b|\baddict\w*\b|"
                     r"\bzombie\w*\b|\brewir\w*\b|\bdigital heroin\b|\btragedy\b|\bbefore it'?s too late\b", re.I)
CAUSAL_RX = re.compile(r"\b(screens?|screen time|tv|television|tablets?|videos?|devices?)\s+(causes?|caused|leads? to|"
                       r"results? in|triggers?|produces?)\s+(\w+\s+){0,2}autis\w*|\bscreen-induced\b|"
                       r"\bcauses? autism\b", re.I)
NEGATION_RX = re.compile(r"\b(no|not|never|nothing|n't|NOT|cannot|without|whether|rather than|proof|prove[ns]?|shown?|"
                         r"claim\w*|assum\w*|hypothes\w*|title|quote\w*|argu\w*|propos\w*|belie\w*|idea)\b|\?", re.I)
EXCLUSION_RX = re.compile(r"Montgomery County|\bMCPS\b|\bMCEA\b|\bMSEA\b|\bNEA\b|Infants and Toddlers Program|"
                          r"mcpsmd|montgomerycountymd")
FOUNDER_RX = re.compile(r"\bmy (daughter|son)\b|\bvideos my child lov\w*|\bI typed\b|\blate one night\b|\bour home got\b|"
                        r"\bfounded by a parent\b", re.I)
# Autism words in other languages and scripts (autism content audit, September 28, 2026; UNVERIFIED translations).
AUTISM_NON_LATIN = (r"аутиз\w*|аутист\w*|αυτισμ\w*|αυτιστ\w*|אוטיזם|אוטיסט\w*|التوحد|اوتیسم|"
                    r"自闭症|孤独症|自閉症|자폐|ऑटिज़्म|ऑटिज्म|ऑटिस्टिक")
FRAMING_BAD_RX = re.compile(r"autis|otizm|otistik|autyzm|autyst|" + AUTISM_NON_LATIN + r"|help(s|ing)? (with|your child)|support for|therap|treat|improv|prevent|"
                            r"delay|symptom|catch up", re.I)
AUTISM_WORD_RX = re.compile(r"autis\w*|otizm|otistik|autyzm\w*|autyst\w*|autismo|autisme|autismus|virtual autism|" + AUTISM_NON_LATIN, re.I)
AUTISM_HASHTAG_RX = re.compile(r"#\w*(autis|otizm|otistik|autism|autyzm|autyst|" + AUTISM_NON_LATIN + r")\w*", re.I)

LINK_RX = re.compile(r"\]\(\s*([^)\s]+)")
URL_RX = re.compile(r"https?://[^\s)\]>\"']+")
HREF_RX = re.compile(r"""href\s*=\s*["']([^"']+)["']""", re.I)


# ----------------------------------------------------------------------------------------------
def front_matter(text: str) -> tuple[dict, str]:
    """Tiny top-level 'key: value' parser (no PyYAML dependency). Returns (fields, body)."""
    if not text.startswith("---"):
        return {}, text
    end = text.find("\n---", 3)
    if end < 0:
        return {}, text
    fm, body = text[3:end], text[end + 4:]
    fields = {}
    for line in fm.splitlines():
        m = re.match(r"^([A-Za-z_][\w-]*):\s*(.*)$", line)
        if m:
            v = m.group(2).strip()
            if len(v) >= 2 and v[0] == v[-1] and v[0] in "\"'":
                v = v[1:-1]
            fields[m.group(1)] = v
    return fields, body


def public_text(body: str) -> str:
    return re.sub(r"<!--.*?-->", "", body, flags=re.S)


def strip_quotes(s: str) -> str:
    """Remove quoted spans (a study's own words) and citation lines before scanning our own wording."""
    s = "\n".join(l for l in s.splitlines() if not re.search(r"doi:|\bet al\.|PMID|https?://", l))
    s = re.sub(r"(?<![A-Za-z])'[^'\n]{1,60}'(?![A-Za-z])", " ", s)
    return re.sub(r"\"[^\"\n]{0,160}\"|“[^”\n]{0,160}”|«[^»\n]{0,160}»", " ", s)


def sentences(s: str):
    for para in re.split(r"\n\s*\n", s):
        for sent in re.split(r"(?<=[.!?])\s+", para.replace("\n", " ")):
            if sent.strip():
                yield sent.strip()


def items_with_heading(s: str):
    """Yield (context, sentence). A list item inherits its heading or lead-in line, so an item under
    'What it does NOT show' is read together with that heading."""
    context = ""
    for line in s.splitlines():
        t = line.strip()
        if not t:
            continue
        if t.startswith("#") or (t.endswith(":") and not t.startswith(("-", "*"))):
            context = t
            continue
        is_item = t.startswith(("- ", "* ")) or re.match(r"^\d+\.\s", t)
        if not is_item:
            context = ""
        for sent in re.split(r"(?<=[.!?])\s+", t):
            if sent.strip():
                yield (context if is_item else ""), sent.strip()


def product_names() -> list[str]:
    names = set()
    for f in glob.glob(os.path.join(PRODUCTS, "*", "listing.json")):
        try:
            data = json.load(open(f, encoding="utf-8"))
        except Exception:
            continue
        for d in (data if isinstance(data, list) else [data]):
            if not isinstance(d, dict):
                continue
            slug = d.get("slug") or os.path.basename(os.path.dirname(f))
            names.add(slug)
            t = re.split(r"[:|,]| - | – ", d.get("title", "") or "")[0]
            t = re.sub(r"^\d+\s+", "", t)
            t = re.sub(r"\s+for Ages.*$", "", t).strip()
            if len(t) >= 10 or "!" in t:
                names.add(t)
    return sorted(names)


class Report:
    def __init__(self):
        self.rows = []

    def add(self, level, rule, where, msg, published):
        self.rows.append({"level": level, "rule": rule, "file": where, "message": msg, "published": published})


# ----------------------------------------------------------------------------------------------
def check_link(rep, rel, link, published, page_type):
    if link.startswith("#") or link.startswith("mailto:"):
        return
    if link.startswith("/"):
        path = link.split("#")[0].split("?")[0]
        if path.startswith("/free/"):
            rep.add("FAIL", "HF-02", rel, f"links to {path}: the hub links only to the product-free twin {HUB_PRINTABLE}", published)
        elif not (path.startswith(HUB_PREFIXES) or path in ALLOWED_INTERNAL_EXACT
                  or re.sub(r"^/(es|fr|pt|de|ro|tr)/", "/", path) in ALLOWED_INTERNAL_EXACT):
            rep.add("FAIL", "HF-02", rel, f"internal link {path} leaves the hub (allowed: hub pages, policy pages)", published)
        return
    if not link.startswith("http"):
        rep.add("WARN", "HF-02", rel, f"relative link '{link}' cannot be checked; use a root-relative /research/ path", published)
        return
    host = re.sub(r"^https?://", "", link).split("/")[0].lower()
    if any(host == d or host.endswith("." + d) for d in SUPPRESSION_DOMAINS):
        rep.add("FAIL", "HF-11", rel, f"links to excluded organization domain {host}", published)
    elif any(d in host for d in COMMERCE_DOMAINS) or AFFILIATE_RX.search(link):
        rep.add("FAIL", "HF-03", rel, f"commerce or affiliate link {link}", published)
    elif any(host.endswith(d) for d in BANNED_DOMAINS):
        rep.add("FAIL", "HF-03", rel, f"links to {host} (outreach plan: remove)", published)
    elif any(host == d or host.endswith("." + d) for d in SOCIAL_DOMAINS):
        rep.add("WARN", "HF-03", rel, f"social-media link {host}: hub pages cite sources, not feeds", published)
    elif "playbeforepixels" in host:
        path = "/" + link.split(host, 1)[1].lstrip("/")
        check_link(rep, rel, path, published, page_type)


def check_hub_page(rep, path, names):
    rel = os.path.relpath(path, ROOT)
    fm, body = front_matter(open(path, encoding="utf-8").read())
    if fm.get("page_type", "").startswith("internal") or fm.get("slug", "").startswith("internal/"):
        return
    if path.startswith(SEO_ARTICLES):          # seo/articles pages whose url sits under /research/
        fm.setdefault("page_type", "pillar-guide" if fm.get("url", "").rstrip("/") == "/research/virtual-autism" else "article")
        fm.setdefault("publish", "true" if fm.get("status", "") == "published" else "false")
    ptype = fm.get("page_type", "")
    published = fm.get("publish", "false").lower() == "true"
    text = public_text(body)
    unq = strip_quotes(text)

    # HF-07 front matter
    for key in ("title", "meta_description", "last_reviewed", "publish", "page_type"):
        if not fm.get(key):
            rep.add("FAIL", "HF-07", rel, f"front matter '{key}' missing", published)
    if len(fm.get("title", "")) > 60:
        rep.add("WARN", "HF-07", rel, f"title is {len(fm['title'])} chars (>60): set a separate seo_title at build", published)
    if len(fm.get("meta_description", "")) > 155:
        rep.add("FAIL", "HF-07", rel, f"meta_description is {len(fm['meta_description'])} chars (>155)", published)

    # HF-16 translations: reviewed by people, and tied to the English version they came from
    if fm.get("lang", "en") not in ("en", "") and "translation_review" not in fm:
        rep.add("FAIL", "HF-16", rel, "translated page without a translation_review record "
                "(translator, bilingual reviewer, sensitivity reader, source version and date)", published)
    if re.search(r"machine[- ]translat", fm.get("translation_review", ""), re.I):
        rep.add("FAIL", "HF-16", rel, "machine translation recorded as the published text", published)

    # HF-08 freshness
    try:
        age = (dt.date.today() - dt.date.fromisoformat(fm.get("last_reviewed", ""))).days
        if age > 365:
            rep.add("FAIL", "HF-08", rel, f"last_reviewed {age} days ago (>365)", published)
        elif age > 183:
            rep.add("WARN", "HF-08", rel, f"last_reviewed {age} days ago (>183): queue a review", published)
    except ValueError:
        rep.add("FAIL", "HF-08", rel, "last_reviewed is not an ISO date", published)

    # HF-09 verification before publishing
    if published:
        if "[VERIFY" in text or "UNVERIFIED" in text:
            rep.add("FAIL", "HF-09", rel, "publish:true with [VERIFY]/UNVERIFIED marks still in the page", published)
        if fm.get("what_we_read") == "secondary-only":
            rep.add("FAIL", "HF-09", rel, "publish:true but what_we_read is secondary-only", published)

    # HF-02 / HF-03 / HF-11 links
    links = LINK_RX.findall(text) + [u for u in URL_RX.findall(text)]
    for link in links:
        check_link(rep, rel, link.rstrip(".,;"), published, ptype)
    for key in ("link",):
        pass  # front-matter source links are citations; checked by the domain lists through the body only

    # HF-04 the one printable link, play framing only
    pl = [l for l in links if HUB_PRINTABLE in l or "/free/five-5-minute-plays" in l]
    if pl and ptype not in PRINTABLE_PAGE_TYPES:
        rep.add("FAIL", "HF-04", rel, f"printable link on a '{ptype}' page (allowed only on the pillar, FAQ and explainer articles)", published)
    if len(pl) > 1:
        rep.add("FAIL", "HF-04", rel, f"{len(pl)} printable links (max 1)", published)
    for sent in sentences(text):
        if HUB_PRINTABLE in sent or "/free/five-5-minute-plays" in sent:
            if FRAMING_BAD_RX.search(re.sub(r"\(.*?\)", "", sent)):
                rep.add("FAIL", "HF-04", rel, f"printable offered near help/autism wording: '{sent[:120]}'", published)

    # HF-05 commerce and product names
    for m in COMMERCE_RX.finditer(unq):
        rep.add("FAIL", "HF-05", rel, f"commerce wording '{m.group(0)}'", published)
    for n in names:
        if n in text or f"/shop/{n}" in text:
            rep.add("FAIL", "HF-05", rel, f"names or links a product: '{n}'", published)

    # HF-06 required blocks
    topic = fm.get("topic", "")
    if (ptype in SAFE_SENTENCE_TYPES or topic in SAFE_SENTENCE_TOPICS) and "not a medical diagnosis" not in text:
        rep.add("FAIL", "HF-06", rel, "safe framing sentence missing ('not a medical diagnosis')", published)
    if ptype in NOT_ADVICE_TYPES and not re.search(r"not (medical|medical or legal|legal or medical) advice", text, re.I):
        rep.add("FAIL", "HF-06", rel, "'This is not medical advice' box missing", published)
    if AUTISM_WORD_RX.search(text) and not re.search(r"pediatrician|doctor|health visitor|clinician|pediatra|médic|medic|médecin|pédiatre|"
                                                          r"kinder(ä|a)rzt|arzt|doktor|hekim", text, re.I):
        rep.add("FAIL", "HF-06", rel, "mentions autism but gives no pediatrician/doctor next step", published)
    if ptype in {"pillar-guide", "faq", "glossary", "how-to"} and "Worried?" not in text:
        rep.add("WARN", "HF-06", rel, "closing 'Worried?' line missing", published)
    if ptype == "pillar-guide":
        first = re.split(r"\n## ", text, 1)[0]
        first = re.sub(r"^#\s.*$", "", first, flags=re.M)
        words = len(re.findall(r"\w+", re.sub(r"\(.*?\)|\[.*?\]", "", first)))
        if words > 150:
            rep.add("WARN", "HF-06", rel, f"{words} words before the first section: the 30-second answer should fit in 150", published)

    # HF-10 fear words and causal phrasing
    if ptype != "policy":
        for m in FEAR_RX.finditer(unq):
            rep.add("FAIL", "HF-10", rel, f"fear/blame word '{m.group(0)}'", published)
    for ctx, sent in items_with_heading(unq):
        if CAUSAL_RX.search(sent) and not NEGATION_RX.search(sent + " " + ctx):
            rep.add("WARN", "HF-10", rel, f"causal phrasing, human check: '{sent[:140]}'", published)

    # HF-11 exclusions and founder story
    for m in EXCLUSION_RX.finditer(text):
        rep.add("FAIL", "HF-11", rel, f"excluded organization or local angle: '{m.group(0)}'", published)
    for m in FOUNDER_RX.finditer(text):
        rep.add("FAIL", "HF-11", rel, f"founder-story wording on a research page: '{m.group(0)}'", published)


def check_queue(rep):
    for path in glob.glob(os.path.join(QUEUE, "**", "*.*"), recursive=True):
        if not path.endswith((".md", ".json", ".txt", ".yaml", ".yml")):
            continue
        rel = os.path.relpath(path, ROOT)
        text = open(path, encoding="utf-8", errors="replace").read()
        urls = URL_RX.findall(text) + LINK_RX.findall(text)
        hub_post = bool(AUTISM_WORD_RX.search(text))
        if hub_post:
            for u in urls:
                if not any(pfx in u for pfx in HUB_PREFIXES):
                    rep.add("FAIL", "HF-14", rel, f"hub post links outside /research/: {u}", True)
            for m in AUTISM_HASHTAG_RX.finditer(text):
                rep.add("FAIL", "HF-14", rel, f"autism hashtag {m.group(0)}", True)
            for m in COMMERCE_RX.finditer(text):
                rep.add("FAIL", "HF-14", rel, f"commerce wording in a hub post: '{m.group(0)}'", True)
            if "not a medical diagnosis" not in text:
                rep.add("FAIL", "HF-14", rel, "hub post lacks the short safe sentence", True)
            if not re.search(r"comments\W+(off|false|disabled)", text, re.I):
                rep.add("WARN", "HF-14", rel, "hub post does not record comments: off", True)
            if re.search(r"boost\W+(true|yes)|promot(e|ed)\W+(true|yes)", text, re.I):
                rep.add("FAIL", "HF-14", rel, "hub post marked for boosting/promotion", True)
        else:
            for u in urls:
                if "/research/virtual-autism" in u:
                    rep.add("FAIL", "HF-15", rel, f"non-hub post links to the term page: {u}", True)


def check_site(rep, site):
    for path in glob.glob(os.path.join(site, "**", "*.html"), recursive=True):
        rel = os.path.relpath(path, site)
        html = open(path, encoding="utf-8", errors="replace").read()
        in_hub = ("/" + rel.replace(os.sep, "/")).startswith(HUB_PREFIXES)
        types = set(re.findall(r'"@type"\s*:\s*"(\w+)"', html))
        if in_hub:
            for m in TRACKER_RX.finditer(html):
                rep.add("FAIL", "HF-13", rel, f"tracking/ad script on a hub page: {m.group(0)}", True)
            for t in sorted(types & BANNED_SCHEMA):
                rep.add("FAIL", "HF-12", rel, f"JSON-LD type {t} not allowed on hub pages", True)
            if "reviewedBy" in html and "data-reviewer-signed" not in html:
                rep.add("FAIL", "HF-12", rel, "reviewedBy without a signed reviewer record", True)
            for href in HREF_RX.findall(html):
                check_link(rep, rel, href, True, "")
        else:
            commercial = bool(types & {"Product", "Offer", "Book"}) or rel.startswith("shop")
            if commercial and "/research/virtual-autism" in html:
                rep.add("FAIL", "HF-15", rel, "product/shop page links to the term page", True)
            if commercial and AUTISM_WORD_RX.search(re.sub(r"<[^>]+>", " ", html)):
                rep.add("FAIL", "HF-15", rel, "product/shop page mentions autism", True)


# ----------------------------------------------------------------------------------------------
def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--strict", action="store_true", help="exit 1 on any FAIL, published or not")
    ap.add_argument("--site", help="built site folder to check (HTML)")
    ap.add_argument("--report", help="write a markdown report here")
    ap.add_argument("--json", help="write machine-readable results here")
    ap.add_argument("-v", action="store_true", help="print every finding")
    a = ap.parse_args()

    rep = Report()
    names = product_names()
    pages = sorted(glob.glob(os.path.join(HUB, "*.md")) + glob.glob(os.path.join(HUB, "studies", "*.md")))
    for f in sorted(glob.glob(os.path.join(SEO_ARTICLES, "*.md"))):
        if front_matter(open(f, encoding="utf-8").read())[0].get("url", "").startswith("/research/"):
            pages.append(f)
    for p in pages:
        check_hub_page(rep, p, names)
    if os.path.isdir(QUEUE):
        check_queue(rep)
    if a.site:
        check_site(rep, a.site)

    fails = [r for r in rep.rows if r["level"] == "FAIL"]
    blocking = fails if a.strict else [r for r in fails if r["published"]]
    by_rule = {}
    for r in rep.rows:
        by_rule.setdefault((r["rule"], r["level"]), 0)
        by_rule[(r["rule"], r["level"])] += 1

    lines = [f"# Hub firewall check ({dt.date.today().isoformat()})", "",
             f"Pages checked: {len(pages)} hub sources" + (f" + site {a.site}" if a.site else ""),
             f"FAIL: {len(fails)} (blocking now: {len(blocking)}) · WARN: {len(rep.rows) - len(fails)}", "",
             "| Rule | Level | Count |", "|---|---|---|"]
    lines += [f"| {k[0]} | {k[1]} | {v} |" for k, v in sorted(by_rule.items())]
    lines += ["", "| Level | Rule | File | Finding |", "|---|---|---|---|"]
    lines += [f"| {r['level']} | {r['rule']} | {r['file']} | {r['message'].replace('|', '/')} |" for r in rep.rows]
    out = "\n".join(lines) + "\n"
    if a.report:
        open(a.report, "w", encoding="utf-8").write(out)
    if a.json:
        json.dump(rep.rows, open(a.json, "w", encoding="utf-8"), indent=1)
    print("\n".join(lines[:8 + len(by_rule)]))
    if a.v:
        print("\n".join(lines[8 + len(by_rule):]))
    return 1 if blocking else 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception as e:  # noqa: BLE001
        print(f"script error: {e}", file=sys.stderr)
        sys.exit(2)
