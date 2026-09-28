#!/usr/bin/env python3
"""Build PlayBeforePixels_Financial_Model.xlsx (AlphaPlay LLC d/b/a Play Before Pixels).

Every number is either sourced to a repo file or labelled Assumption / [VERIFY].
All downstream cells are live Excel formulas.
"""
import datetime
import json
import os
import sys
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter as CL
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.chart import LineChart, BarChart, Reference, Series
from openpyxl.comments import Comment

OUT = sys.argv[1] if len(sys.argv) > 1 else "/home/user/playbeforepixels/business/PlayBeforePixels_Financial_Model.xlsx"
# Sensitivity runs pass input overrides as JSON, e.g. PBP_OVERRIDES='{"pos": 0.5, "SCHOOL_inc": [1, 1, 1]}'.
OV = json.loads(os.environ.get("PBP_OVERRIDES", "{}"))

# ---------------------------------------------------------------- styles
AR = "Arial"
def fnt(color="000000", bold=False, size=10, italic=False):
    return Font(name=AR, color=color, bold=bold, size=size, italic=italic)
F_IN, F_LINK, F_CALC = fnt("0000FF"), fnt("008000"), fnt("000000")
F_NOTE = fnt("555555", italic=True, size=9)
HDR_FILL = PatternFill("solid", fgColor="1D2940")
HDR_FONT = Font(name=AR, bold=True, color="FFFFFF", size=10)
KEY_FILL = PatternFill("solid", fgColor="FFFF00")
SEC_FILL = PatternFill("solid", fgColor="E3E7EF")
TOT_FILL = PatternFill("solid", fgColor="F3F4F7")
THIN = Side(style="thin", color="B7BDC9")
TOP = Border(top=THIN)
WRAP = Alignment(wrap_text=True, vertical="top")
CUR0 = '$#,##0;($#,##0);"-"'
CUR2 = '$#,##0.00;($#,##0.00);"-"'
PCT1 = '0.0%;(0.0%);"-"'
PCT2 = '0.00%;(0.00%);"-"'
NUM0 = '#,##0;(#,##0);"-"'
NUM1 = '#,##0.0;(#,##0.0);"-"'
NUM2 = '0.00'
DATEF = 'mmm-yy'

def style_font(v, explicit=None):
    if explicit is not None:
        return explicit
    if isinstance(v, str) and v.startswith("="):
        return F_LINK if "!" in v else F_CALC
    return F_CALC

def put(ws, ref, v, fmt=None, font=None, fill=None, bold=False, wrap=False, align=None):
    c = ws[ref]
    c.value = v
    f = style_font(v, font)
    if bold:
        f = Font(name=AR, color=f.color, bold=True, size=f.size, italic=f.italic)
    c.font = f
    if fmt:
        c.number_format = fmt
    if fill:
        c.fill = fill
    if wrap:
        c.alignment = WRAP
    if align:
        c.alignment = align
    return c

def hdr(ws, row, c1, c2, labels=None, height=None):
    for i, c in enumerate(range(c1, c2 + 1)):
        cell = ws.cell(row=row, column=c)
        if labels is not None and i < len(labels):
            cell.value = labels[i]
        cell.fill = HDR_FILL
        cell.font = HDR_FONT
        cell.alignment = Alignment(wrap_text=True, vertical="center", horizontal="center" if c > 1 else "left")
    if height:
        ws.row_dimensions[row].height = height

def sec(ws, row, c1, c2, text):
    for c in range(c1, c2 + 1):
        ws.cell(row=row, column=c).fill = SEC_FILL
    cell = ws.cell(row=row, column=c1)
    cell.value = text
    cell.font = fnt(bold=True)

def title(ws, text, sub):
    put(ws, "A1", text, font=Font(name=AR, bold=True, size=14, color="1D2940"))
    put(ws, "A2", sub, font=F_NOTE)

def q(sheet):
    return f"'{sheet}'"

wb = Workbook()
SHEETS = ["Dashboard", "Assumptions", "Unit Economics", "Startup Costs", "Monthly Operating Costs",
          "36-Month Forecast", "Cash Flow", "Break-even", "Retail Readiness Costs"]
ws_ = {}
ws_["Dashboard"] = wb.active
ws_["Dashboard"].title = "Dashboard"
for n in SHEETS[1:]:
    ws_[n] = wb.create_sheet(n)
for ws in ws_.values():
    ws.sheet_view.showGridLines = False

SCN = ["Conservative", "Expected", "Strong"]
SCOL = ["C", "D", "E"]
SERIES_COLORS = ["2A78D6", "EB6834", "1BAF7A"]

# =====================================================================
# ASSUMPTIONS
# =====================================================================
wa = ws_["Assumptions"]
title(wa, "Assumptions: every input in the model",
      "Blue = editable input. Yellow fill = key scenario lever. Black = formula. Green = link to another tab. "
      "Status: Repo = figure found in a repository file (most are themselves marked UNVERIFIED there); "
      "Assumption = planning input chosen for this model; [VERIFY] = outside fact not in the repo, check before relying on it.")
wa.merge_cells("A2:H3")
wa["A2"].alignment = WRAP
wa.row_dimensions[2].height = 30
hdr(wa, 5, 1, 8, ["ID", "Input", "Value / Conservative", "Expected", "Strong", "Unit", "Source / basis", "Status"], 30)
A = {}
R = [6]

def a_sec(text):
    R[0] += 1
    sec(wa, R[0], 1, 8, text)
    R[0] += 1

def a_sub(labels):
    hdr(wa, R[0], 1, 8, labels)
    R[0] += 1

def inp(key, label, vals, fmt, unit, src, status, key_lever=False, formula=False):
    if key in OV:
        vals = OV[key]
    r = R[0]
    put(wa, f"A{r}", key, font=F_NOTE)
    put(wa, f"B{r}", label, wrap=True)
    if isinstance(vals, (list, tuple)):
        A[key] = []
        for i, v in enumerate(vals):
            cref = f"{SCOL[i]}{r}"
            put(wa, cref, v, fmt=fmt, font=None if formula else F_IN, fill=KEY_FILL if key_lever else None)
            A[key].append(f"{q('Assumptions')}!${SCOL[i]}${r}")
    else:
        put(wa, f"C{r}", vals, fmt=fmt, font=None if formula else F_IN, fill=KEY_FILL if key_lever else None)
        A[key] = f"{q('Assumptions')}!$C${r}"
    put(wa, f"F{r}", unit)
    put(wa, f"G{r}", src, wrap=True)
    put(wa, f"H{r}", status)
    R[0] += 1
    return r

a_sec("1. General settings")
inp("start", "Model start month (month 1; costs start here)", datetime.date(2026, 10, 1), DATEF, "month",
    "Plan dated Sept 28, 2026. Setup costs (trademark, copyright, attorneys) begin in October 2026.", "Repo")
inp("first_sale", "First month any listing can take money (Gate A met)", 3, "0", "month #",
    "Gate A (section 5.12): business bank account open, employment counsel's go-ahead, GL insurance bound and the publish safeguards built. "
    "As of Sept 28, 2026 none is done, so the model assumes Gate A by the end of Nov 2026 and first sales in Dec 2026 (month 3). "
    "Each month of slip moves every channel back one month.", "Assumption", True)
inp("pos", "Cost position inside every Low-High range (0 = low, 1 = high)", 0, NUM2, "0-1",
    "Base plan = lean path: low-end quotes (0). Mid-point (0.5) and high end (1) are shown as sensitivities in section 3.9. "
    "Drives the Model column on Startup Costs, Monthly Operating Costs and Retail Readiness Costs.", "Assumption", True)
inp("ramp", "Months for a new listing to reach full sales rate (review ramp)", 6, "0", "months",
    "A new faceless shop starts with zero reviews against incumbents with 2,000-11,000 (marketing/DEMAND-CHECK.md, 'One honest warning').", "Assumption")
inp("mdtax", "Maryland sales tax on direct (own-site) sales", 0.06, PCT1, "% of price",
    "commerce/storefront-setup-guide.md A3 (UNVERIFIED). Collected on top of price and remitted: pass-through, never counted as revenue.", "Repo [VERIFY]")
inp("refund", "Refund and chargeback allowance, direct digital sales", 0.02, PCT1, "% of price",
    "ops/GAPS-ROUND-2.md G2-12: first refund request under about $15 is refunded automatically.", "Assumption")
inp("refund_course", "Refund allowance, 30-Day Screen Reset (money-back guarantee)", 0.05, PCT1, "% of price",
    "DEMAND-CHECK course row: 'Add a money-back guarantee'.", "Assumption")
inp("taxres", "Tax reserve (% of cumulative profit to date, after one-time costs)", 0.25, PCT1, "%",
    "finance/TAX-AUTOPILOT.md §2: accountant picks the rate; 25-30% is common. Reserved only against cumulative profit, because a single-member LLC's "
    "losses pass through to the founder's return; the accountant sets the §195 startup-cost treatment.", "Repo range")
inp("open", "Opening cash in the business account", 0, CUR0, "$",
    "finance/BANKING.md: the Chase checking account is closed; a new no-fee account opens empty.", "Repo")
inp("owner", "Planned owner capital contribution in month 1 (the forecast adds any further top-up needed)", 0, CUR0, "$",
    "Cash Flow adds a founder top-up in any month the operating account would go below zero, so the funding need is always visible.", "Assumption", True)
inp("card", "Existing balance on the Chase business card (an LLC liability), paid in month 1", 0, CUR0, "$",
    "finance/BANKING.md: the Chase business card is still open. Balance not in the repo: founder to enter.", "Founder to enter")
inp("cap", "Household-money cap: most founder capital the business may take (placeholder)", 12000, CUR0, "$",
    "ops/GAPS-ROUND-2.md G2-10 asks the founder to write down a cap and a review date; neither is set. $12,000 is a placeholder only. "
    "Hard stop: when cumulative founder capital reaches the cap, all non-deadline spending stops and the plan is re-forecast.", "Founder to set")
inp("contin", "Operating contingency (% of monthly operating costs)", 0.10, PCT1, "%",
    "Buffer for price changes; nearly every subscription price in the repo is UNVERIFIED.", "Assumption")
inp("resmo", "Cash reserve target (months of fixed costs)", 3, "0", "months",
    "ops/ROUTINE.md weekly scorecard ('3-month reserve target'); BLIND-SPOTS #20 says 2-3 months.", "Repo")

a_sec("2. Platform fees and royalties (used by Unit Economics)")
inp("shop_pct", "Shopify Payments card rate", 0.029, PCT1, "% of price", "commerce/storefront-setup-guide.md §1; finance/money-and-tax-setup.md fees table (Basic plan, UNVERIFIED).", "Repo [VERIFY]")
inp("shop_fix", "Shopify Payments fixed fee", 0.30, CUR2, "$ per order", "Same source.", "Repo [VERIFY]")
inp("etsy_tx", "Etsy transaction fee", 0.065, PCT1, "% of price", "storefront-setup-guide §10 (UNVERIFIED).", "Repo [VERIFY]")
inp("etsy_pay", "Etsy payment processing (US)", 0.03, PCT1, "% of price", "Same source.", "Repo [VERIFY]")
inp("etsy_payfix", "Etsy payment processing fixed fee", 0.25, CUR2, "$ per order", "Same source.", "Repo [VERIFY]")
inp("etsy_list", "Etsy listing fee (renews on each sale)", 0.20, CUR2, "$ per sale", "Same source.", "Repo [VERIFY]")
inp("etsy_oa", "Etsy Offsite Ads fee when an ad drives the sale", 0.15, PCT1, "% of price", "Same source: 15%, or 12% and mandatory above $10,000 in 12 months.", "Repo [VERIFY]")
inp("etsy_oashare", "Share of Etsy sales that come through Offsite Ads", 0.10, PCT1, "% of Etsy sales", "No data yet; check the Etsy statement after 90 days.", "Assumption")
inp("kdp_roy", "KDP paperback royalty rate (list price $9.99 or more)", 0.60, PCT1, "% of list", "storefront-setup-guide §6: 60% at $9.99+ since June 10, 2025 (UNVERIFIED).", "Repo [VERIFY]")
inp("kdp_base", "KDP print cost: fixed part", 1.00, CUR2, "$ per copy", "products/*/listing.json price_notes: $1.00 + $0.07/page premium color.", "Repo [VERIFY]")
inp("kdp_color", "KDP print cost: premium color, per page", 0.07, CUR2, "$ per page", "Same source. KDP may price short color books at a flat rate; confirm in the calculator.", "Repo [VERIFY]")
inp("kdp_bw_flat", "KDP print cost: black-and-white paperback, 24-108 pages (flat)", 2.30, CUR2, "$ per copy",
    "products/guide-100-plays/listing.json: KDP's flat $2.30 for 24-108 B/W pages (82-page, 8 x 10 in book). Check whether 8 x 10 counts as large trim, which may cost more.", "Repo [VERIFY]")
inp("pic_pages", "Picture-book and talk-along paperback page count", 32, "0", "pages", "products/*/listing.json ('pages': 32).", "Repo")
inp("ing_disc", "IngramSpark wholesale discount given to retailers", 0.40, PCT1, "% of list", "Base 40% (storefront guide range 30-55%). 55% reaches library jobbers (MARKETING-PLAYBOOK) but leaves hardcovers about $0.50 a copy; tested as a sensitivity.", "Repo range", True)
inp("ing_hc_print", "IngramSpark print cost, 32-page 8.5x8.5 color hardcover", 8.50, CUR2, "$ per copy", "Not in the repo; listing.json says run IngramSpark's calculator. Hardcover is gated (weight 0) until the paperback sells.", "[VERIFY]")
inp("ing_pb_print", "IngramSpark print cost, 32-page color paperback", 3.24, CUR2, "$ per copy", "Proxy: KDP premium-color formula from listing.json.", "Assumption [VERIFY]")
inp("mor_pct", "Merchant of record (Gumroad) fee", 0.10, PCT1, "% of price", "storefront-setup-guide §13; legal/international-plan.md (UNVERIFIED). Covers card processing, US sales tax and EU/UK VAT.", "Repo [VERIFY]")
inp("mor_fix", "Merchant of record fixed fee", 0.50, CUR2, "$ per order", "Same source.", "Repo [VERIFY]")
inp("tpt_payout", "Teachers Pay Teachers payout (Basic seller)", 0.55, PCT1, "% of price", "DEMAND-CHECK rule 10; money-and-tax fees table (UNVERIFIED).", "Repo [VERIFY]")
inp("tpt_fix", "TPT per-resource transaction fee", 0.30, CUR2, "$ per sale", "Same source.", "Repo [VERIFY]")
inp("amz_ref", "Amazon Seller Central / FBA referral fee", 0.15, PCT1, "% of price", "storefront-setup-guide §19 ('about 15%', UNVERIFIED).", "Repo [VERIFY]")
inp("fba_fee", "Amazon FBA fulfilment fee per board book", 3.50, CUR2, "$ per unit", "Not in the repo.", "[VERIFY]")
inp("amz_closing", "Amazon closing fee on books (media categories)", 1.80, CUR2, "$ per unit", "Not in the repo; applies to third-party sales in media categories.", "[VERIFY]")
inp("fba_storage", "FBA monthly, long-term storage and inbound placement allowance", 0.40, CUR2, "$ per unit sold", "Not in the repo; allowance per unit sold.", "Assumption [VERIFY]")
inp("ship_sub", "Postage absorbed per own-site board-book order (free shipping over a threshold)", 2.00, CUR2, "$ per order", "Free shipping is the market norm; assume the business absorbs about $2 of each order's postage.", "Assumption [VERIFY]")
inp("faire_comm", "Faire commission (orders from retailers Faire finds)", 0.15, PCT1, "% of wholesale", "storefront-setup-guide §19; 0% on Faire Direct.", "Repo [VERIFY]")
inp("faire_proc", "Faire payment processing", 0.03, PCT1, "% of wholesale", "Same source; conflicting 1.9-3.5% vs flat ~3%.", "Repo [VERIFY]")
inp("whsl_pct", "Wholesale price as % of retail", 0.50, PCT1, "% of retail", "marketing/AMAZON-AND-RETAIL-ROADMAP.md B4; board-up-go-more/listing.json.", "Repo")
inp("bigbox_ref", "Walmart Marketplace / Target Plus referral fee", 0.15, PCT1, "% of price", "Walmart books about 15% (storefront guide §19, UNVERIFIED). Target Plus is invitation-only; its terms are not in the repo.", "[VERIFY]")
inp("retail_deduct", "Retail deductions and chargebacks allowance", 0.05, PCT1, "% of price", "Not in the repo; big-box programs deduct for compliance misses.", "[VERIFY]")
inp("tee_pod", "Adult tee: POD base cost incl. print", 12.50, CUR2, "$ per unit", "Not in the repo; shipping assumed charged to the buyer. Tee is weight 0 until trademark clearance (Wave 3).", "[VERIFY]")

a_sec("3. Physical products: board book (gated option) and retail stock")
inp("bb_price", "Board book retail price (Up! Go! More!)", 12.99, CUR2, "$", "DEMAND-CHECK §4 rule 9; board-up-go-more/listing.json.", "Repo")
inp("min_run", "Planned first offset run", 1000, NUM0, "copies", "BLIND-SPOTS #11: quotes at 500, 1,000 and 2,500 copies (5,000 added for a retail edition).", "Assumption")
r = R[0]
hdr(wa, r, 1, 8, ["ID", "Offset quote table (run size -> print cost per copy)", "Run size", "Cost per copy", "", "Unit", "Source / basis", "Status"]); R[0] += 1
q0 = R[0]
for (qty, cost, src, st) in [(500, 5.50, "Above the BLIND-SPOTS range at a short run; no quote exists.", "Assumption [VERIFY]"),
                             (1000, 4.00, "BLIND-SPOTS #11: $1.80-$4 at 1,000-3,000 copies; a 1,000-copy run sits at the high end.", "Repo [VERIFY]"),
                             (2500, 2.20, "Interpolated toward $1.80 at 3,000 copies (BLIND-SPOTS #11).", "Assumption [VERIFY]"),
                             (5000, 1.60, "Below the repo range; retail-edition planning figure only.", "Assumption [VERIFY]")]:
    rr_ = R[0]
    put(wa, f"A{rr_}", f"quote_{qty}", font=F_NOTE)
    put(wa, f"B{rr_}", f"Quote at {qty:,} copies")
    put(wa, f"C{rr_}", qty, fmt=NUM0, font=F_IN); put(wa, f"D{rr_}", cost, fmt=CUR2, font=F_IN)
    put(wa, f"F{rr_}", "$ per copy"); put(wa, f"G{rr_}", src, wrap=True); put(wa, f"H{rr_}", st)
    R[0] += 1
A["quote_qty"] = f"{q('Assumptions')}!$C${q0}:$C${q0+3}"
A["quote_cost"] = f"{q('Assumptions')}!$D${q0}:$D${q0+3}"
r = R[0]
put(wa, f"A{r}", "bb_print", font=F_NOTE); put(wa, f"B{r}", "Offset print cost per copy used in model (quote at the planned run size)")
put(wa, f"C{r}", f"=LOOKUP({A['min_run']},{A['quote_qty']},{A['quote_cost']})", fmt=CUR2, font=F_CALC)
put(wa, f"F{r}", "$ per copy"); put(wa, f"G{r}", "Largest quoted run size at or below the planned run.", wrap=True); put(wa, f"H{r}", "Formula")
A["bb_print"] = f"{q('Assumptions')}!$C${r}"; R[0] += 1
inp("freight", "Freight, duties and warehouse receiving", 0.25, PCT1, "% of print cost", "BLIND-SPOTS #11 asks quotes to cover shipping, duties and warehouse fees; no figure given.", "Assumption [VERIFY]")
r = R[0]
put(wa, f"A{r}", "landed", font=F_NOTE); put(wa, f"B{r}", "Landed cost per copy (print + freight/duties)")
put(wa, f"C{r}", f"={A['bb_print']}*(1+{A['freight']})", fmt=CUR2, font=F_CALC)
put(wa, f"F{r}", "$ per copy"); put(wa, f"G{r}", "Cost rules by channel (section 3.8): own site/FBA at or below 35% of retail; Faire/wholesale 25%; chain 20%.", wrap=True); put(wa, f"H{r}", "Formula")
A["landed"] = f"{q('Assumptions')}!$C${r}"; R[0] += 1
inp("pick", "3PL pick, pack and ship-handling per single order", 3.50, CUR2, "$ per order", "Not in the repo; postage is a separate line (ship_sub).", "[VERIFY]")
inp("whs_handle", "3PL handling per unit on wholesale cartons", 1.00, CUR2, "$ per unit", "Not in the repo.", "[VERIFY]")
inp("tpl_min", "3PL monthly minimum / storage", 150, CUR0, "$ per month", "Not in the repo; replace with written 3PL quotes (many 3PLs set higher minimums).", "[VERIFY]")
inp("seller_central", "Amazon Seller Central Professional plan", 39.99, CUR2, "$ per month", "storefront-setup-guide §19 (UNVERIFIED).", "Repo [VERIFY]")
inp("buffer", "Print buffer over pre-sale units", 0.40, PCT1, "%", "BLIND-SPOTS #16: 'Order what sold plus 30-50%'.", "Repo range")
inp("presale_len", "Pre-sale length before the print decision", 3, "0", "months", "BLIND-SPOTS #16: three-month pre-sale.", "Repo")
inp("presale_buf", "Buffer in the pre-sale funding goal", 0.15, PCT1, "%", "BLIND-SPOTS #16: goal = printing + shipping + duties + fees + delivery + about 15% buffer.", "Repo")
inp("presale_fail", "Cost of a pre-sale that misses the go line (card fees not returned on refunds)", 100, CUR0, "$",
    "Assumption. Below the go line the pre-sale is refunded in full and the talk-along paperback stays on print-on-demand (section 3.10 rule 4).", "Assumption")
inp("reorder_lead", "Reorder lead time (print + freight)", 3, "0", "months", "Not in the repo; offset printing abroad plus ocean freight commonly takes 2-4 months.", "Assumption [VERIFY]")
inp("school_setup", "School/group wave one-time setup (TPT Premium, purchasing kit, host-kit build, counsel review of terms, fraud-check SOP)", 739, CUR0, "$",
    "TPT Premium $59.95/yr and purchasing kit $0-50 (MARKETING-PLAYBOOK); host kit $0-100; counsel review of license and PO terms about $500 (assumption).", "Repo + Assumption")
inp("retail_lead", "Retail readiness spend lead time before retail launch", 3, "0", "months", "Readiness checklist must be done before pitching (AMAZON-AND-RETAIL-ROADMAP B5).", "Assumption")

a_sec("4. Payout delay by channel (months after the sale month)")
CH = [
    ("SITE", "Own site: printables and PDFs (Shopify)", "Product-months live (products x sales index x season)", 0, "c",
     "Shopify Payments pays out within days (storefront guide A6)."),
    ("ETSY", "Etsy: printables", "Product-months live (products x sales index x season)", 1, "c",
     "Etsy deposits on a schedule, but new sellers face a 14-day hold and a possible rolling reserve (section 5 risk 1); one month assumed."),
    ("KDP", "Amazon KDP: paperbacks", "Title-months live (titles x season)", 2, "c", "KDP pays about 60 days after month end (A6)."),
    ("INGRAM", "IngramSpark: paperbacks to bookstores and libraries", "Title-months live (titles x season)", 3, "c",
     "IngramSpark pays about 90 days after month end (A6, UNVERIFIED)."),
    ("MOR", "International digital via merchant of record (Gumroad)", "Product-months live (products x sales index x season)", 0, "c",
     "Gumroad pays weekly (A6, UNVERIFIED)."),
    ("COURSE", "30-Day Screen Reset written course (Wave 2)", "Subscribers reached by the offer", 0, "c",
     "Sold on Shopify; same payout timing."),
    ("BOARD", "Board book: pre-sale, then 3PL and Amazon FBA (gated option; off in base)", "Product-page sessions (site + Amazon)", 0, "c",
     "Shopify within days; Seller Central about every 14 days (A6)."),
    ("SCHOOL", "School and group licenses + TPT (overlay only if counsel clears in writing; off in base)", "Schools/orgs page + TPT views", 1, "s",
     "TPT pays monthly; school invoices are net-30 (commerce/PAYMENTS.md)."),
    ("RETAIL", "Retail and wholesale: Faire, Walmart Marketplace (off in base)", "Retailer and marketplace views", 1, "c",
     "Faire/Walmart settlement timing UNVERIFIED; one month assumed."),
]
CH_NAME = {c[0]: c[1] for c in CH}
for code, name, tl, lag, seas, src in CH:
    inp(f"lag_{code}", f"Payout delay: {name}", lag, "0", "months", src, "Repo" if code not in ("RETAIL", "ETSY") else "Assumption")

a_sec("5. Seasonality index by calendar month (the forecast divides by the 12-month average, so the index always averages 1.00)")
a_sub(["ID", "Calendar month", "Consumer index", "School / group index", "", "Unit", "Source / basis", "Status"])
cons = [1.25, 0.90, 1.00, 1.05, 0.95, 1.00, 0.95, 0.85, 0.85, 0.95, 1.30, 1.35]
schl = [1.10, 1.00, 1.00, 0.90, 0.70, 0.40, 0.60, 1.30, 1.40, 1.20, 1.00, 0.70]
mnames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
s0 = R[0]
for i in range(12):
    r = R[0]
    put(wa, f"A{r}", f"season_{i+1}", font=F_NOTE)
    put(wa, f"B{r}", mnames[i])
    put(wa, f"C{r}", cons[i], fmt=NUM2, font=F_IN)
    put(wa, f"D{r}", schl[i], fmt=NUM2, font=F_IN)
    put(wa, f"F{r}", "index")
    if i == 0:
        put(wa, f"G{r}", "Shape follows the repo calendar: January Reset launch (Wave 2), spring Screen-Free Week, summer kits listed in March, "
                        "holiday gifts Nov-Dec (BLIND-SPOTS #2, #6; DEMAND-CHECK rule 7). School index follows the school year. Levels are assumptions.", wrap=True)
    put(wa, f"H{r}", "Assumption")
    R[0] += 1
A["season_c"] = f"{q('Assumptions')}!$C${s0}:$C${s0+11}"
A["season_s"] = f"{q('Assumptions')}!$D${s0}:$D${s0+11}"

a_sec("6. Scenario drivers: traffic -> conversion -> orders -> order value (yellow = key levers)")
a_sub(["ID", "Driver", "Conservative", "Expected", "Strong", "Unit", "Source / basis", "Status"])
# Driver meaning by channel group (see DRV labels):
#   P (SITE, ETSY, MOR): base = unused; g1-g3 = monthly growth in sales per product; cvr = orders per live product per month at full ramp
#   T (KDP, INGRAM): base = titles live at launch; tadd/tcap = titles added per month and cap; cvr = units per title per month at full ramp
#   L (COURSE): subscribers reached x conversion
#   V (BOARD, SCHOOL, RETAIL): visits x conversion (optional waves, off in the base plan)
GROUP = {"SITE": "P", "ETSY": "P", "MOR": "P", "KDP": "T", "INGRAM": "T", "COURSE": "L", "BOARD": "V", "SCHOOL": "V", "RETAIL": "V"}
SC = {
    "SITE":   dict(inc=[1, 1, 1], launch=[3, 3, 3], g1=[0, .005, .01], g2=[0, .005, .01], g3=[0, 0, .005], cvr=[3, 4, 8], items=[1.15, 1.25, 1.35]),
    "ETSY":   dict(inc=[1, 1, 1], launch=[3, 3, 3], g1=[0, .005, .01], g2=[0, .005, .01], g3=[0, 0, .005], cvr=[5, 7, 13], items=[1.10, 1.20, 1.30]),
    "KDP":    dict(inc=[1, 1, 1], launch=[3, 3, 3], base=[3, 3, 3], tadd=[.25, .33, .5], tcap=[8, 10, 12], cvr=[2.5, 5, 10], items=[1, 1, 1]),
    "INGRAM": dict(inc=[1, 1, 1], launch=[5, 5, 5], base=[2, 2, 2], tadd=[.1, .15, .2], tcap=[4, 5, 6], cvr=[.5, 1, 2], items=[1, 1, 1]),
    "MOR":    dict(inc=[1, 1, 1], launch=[4, 4, 4], g1=[0, .005, .01], g2=[0, .005, .01], g3=[0, 0, .005], cvr=[.8, 1.2, 2.0], items=[1.10, 1.20, 1.30]),
    "COURSE": dict(inc=[1, 1, 1], launch=[4, 4, 4], cvr=[.010, .015, .020], items=[1, 1, 1]),
    "BOARD":  dict(inc=[0, 0, 0], launch=[17, 17, 14], base=[150, 300, 500], g1=[.04, .06, .06], g2=[.02, .04, .05], g3=[.01, .02, .03], cvr=[.015, .025, .030], items=[1.10, 1.20, 1.30]),
    "SCHOOL": dict(inc=[0, 0, 0], launch=[13, 13, 10], base=[150, 300, 400], g1=[.04, .06, .06], g2=[.04, .06, .06], g3=[.02, .03, .03], cvr=[.010, .015, .020], items=[1.00, 1.10, 1.20]),
    "RETAIL": dict(inc=[0, 0, 0], launch=[25, 25, 22], base=[300, 600, 1200], g1=[.03, .05, .08], g2=[.03, .05, .08], g3=[.03, .05, .08], cvr=[.005, .010, .015], items=[3, 4, 5]),
}
LAUNCH_SRC = {
    "SITE": "Launch-first five (ops/QUEUE.md). Listings are built Oct-Nov; money can be taken only from the first-sale month (Gate A).",
    "ETSY": "Launch-first five on Etsy + site (DEMAND-CHECK §3); first-sale month applies.",
    "KDP": "100 Screen-Free Plays, Up! Go! More! and The Day the Tablet Slept paperbacks (Wave 1); live Nov 13 at the earliest, paying from the first-sale month.",
    "INGRAM": "IngramSpark same-ISBN paperbacks in Wave 2 (section 2.7).",
    "MOR": "Region 2 English-speaking markets after US launch (ops/INTERNATIONAL.md).",
    "COURSE": "Public New Year launch, January 2027 = month 4 (BLIND-SPOTS #2 Wave 2).",
    "BOARD": "Gated option, off in every base scenario: runs only after sustained break-even and the POD-paperback proxy test (section 3.10 rule 4). Month 17 = Feb 2028 if switched on.",
    "SCHOOL": "Off in every base scenario. Overlay only if employment counsel clears school-facing work in writing (section 3.9).",
    "RETAIL": "Off in every base scenario. Needs three physical SKUs, quoted landed cost within the channel cost rule and a positive self-funding check (section 3.10 rule 5).",
}
DRV = [("inc", "Include in scenario (1 = yes, 0 = no)", "0", "flag", True),
       ("launch", "Launch month (model month #; never earlier than the first-sale month)", "0", "month #", False),
       ("base", "Traffic in launch month", NUM0, "visits", True),
       ("tadd", "Titles added per month", NUM2, "titles", False),
       ("tcap", "Most titles live", "0", "titles", False),
       ("g1", "Monthly traffic growth, year 1", PCT1, "% per month", False),
       ("g2", "Monthly traffic growth, year 2", PCT1, "% per month", False),
       ("g3", "Monthly traffic growth, year 3", PCT1, "% per month", False),
       ("cvr", "Conversion rate (visit -> order) at full ramp", PCT2, "% of visits", True),
       ("items", "Items per order", NUM2, "items", False)]
a_sec("6a. Digital catalog size (drives the own site, Etsy and the merchant of record)")
a_sub(["ID", "Driver", "Conservative", "Expected", "Strong", "Unit", "Source / basis", "Status"])
inp("prod_start", "Digital products live in the first-sale month", [5, 5, 5], "0", "products", "The launch-first five (ops/QUEUE.md; section 1.5 counts them as 5 listings).", "Repo")
inp("prod_add", "Digital products added per month", [.5, .75, 1.0], NUM2, "products", "Publish cap is 5 new Etsy listings a week (ops/ROUTINE.md), but each product needs demand evidence first; weak items fold into bundles.", "Assumption")
inp("prod_cap", "Most digital products live at once", [12, 15, 20], "0", "products", "Kill rule and bundling keep the catalog small (ops/QUEUE.md).", "Assumption")
a_sec("6b. Scenario drivers by channel (yellow = key levers)")
a_sub(["ID", "Driver", "Conservative", "Expected", "Strong", "Unit", "Source / basis", "Status"])
for code, name, tl, lag, seas, src in CH:
    r = R[0]
    for cc in range(1, 9):
        wa.cell(row=r, column=cc).fill = TOT_FILL
    put(wa, f"B{r}", f"{name}  |  driver = {tl}", bold=True)
    R[0] += 1
    d = SC[code]
    grp = GROUP[code]
    for k, lab, fmt, unit, kl in DRV:
        if k not in d:
            continue
        lab2, fmt2, unit2 = lab, fmt, unit
        srcx = ""
        status = "Assumption"
        if grp == "P":
            if k in ("g1", "g2", "g3"):
                lab2 = f"Monthly growth in sales per product, year {k[1]}"
            if k == "cvr":
                lab2, fmt2, unit2 = "Orders per live product per month at full ramp", NUM2, "orders"
                srcx = "Anchored to section 1.5: all digital channels together sell about 10 (Conservative = section 1 Low), 15 (Expected) or 30 (Strong = section 1 Base) units per product per month at full ramp."
        if grp == "T":
            if k == "base":
                lab2, fmt2, unit2 = "Titles live at launch", "0", "titles"
                srcx = "KDP: 100 Screen-Free Plays, Up! Go! More!, The Day the Tablet Slept. IngramSpark: the two paperbacks (hardcovers gated)." 
            if k == "cvr":
                lab2, fmt2, unit2 = "Units per title per month at full ramp", NUM2, "units"
                srcx = "KDP and IngramSpark report units per title, not page views, so the driver is units per title (comparable-title benchmark, assumption). Conservative sits at the kill-rule floor (2.5 a month)."
        if code == "RETAIL" and k == "items":
            lab2 = "Units per order (wholesale cartons mixed with single marketplace orders)"
        if code == "COURSE" and k == "cvr":
            lab2 = "Conversion rate (subscriber reached -> purchase)"
        if k == "launch":
            srcx = LAUNCH_SRC[code]
            status = "Repo timing" if code not in ("SCHOOL", "RETAIL", "BOARD") else "Assumption (conditional)"
        elif k == "inc" and code in ("SCHOOL", "RETAIL", "BOARD"):
            srcx = "Conditional wave, off in the base plan. Set to 1 to see it as an overlay."
        elif k == "base" and grp == "V":
            srcx = "No sales history yet. Replace with real data."
        inp(f"{code}_{k}", lab2, d[k], fmt2, unit2, srcx, status, key_lever=kl)
    if code == "SITE":
        inp("site_cvr", "Own-site conversion rate (used only to estimate sessions for list sign-ups)", [.010, .015, .020], PCT2, "% of sessions",
            "MARKETING-PLAYBOOK traffic checklist: working target 1.5-3% site conversion.", "Repo range")
    if code == "COURSE":
        inp("reach", "Share of the email list that sees and considers the offer each month", [.10, .15, .20], PCT1, "% of list",
            "Course sold by automated email (DEMAND-CHECK course row).", "Assumption")

R[0] += 1
sec(wa, R[0], 1, 8, "Email list (owned audience; drives the course)")
R[0] += 1
inp("signup", "Own-site visitors who join the list (free '3 plays for your child's age')", [.02, .03, .04], PCT1, "% of sessions", "BLIND-SPOTS #5 lead magnet.", "Assumption", True)
inp("optin", "Own-site, KDP, IngramSpark and merchant-of-record buyers who join through the bonus QR / short link", [.10, .15, .20], PCT1, "% of orders",
    "BLIND-SPOTS #5. Etsy and TpT editions carry no URL or QR code (BRAND.md), so Etsy buyers are excluded.", "Assumption")
inp("churn", "Monthly unsubscribe rate", [.020, .015, .010], PCT1, "% of list", "", "Assumption")
R[0] += 1
sec(wa, R[0], 1, 8, "Paid advertising: optional tests only. Traffic in this model is organic; ads get no revenue credit, so they are a pure cost.")
R[0] += 1
inp("ads_start", "Ads start month", [4, 4, 4], "0", "month #", "After the first-sale month and a month of organic data (MARKETING-PLAYBOOK: Amazon Ads $5-10/day on live titles).", "Assumption")
inp("ads1", "Ad test budget per month, year 1", [0, 150, 300], CUR0, "$ per month", "Amazon Ads floor of $5/day. The playbook's Pinterest and Meta tests ($300-$600 each) wait for the break-even line (section 3.10).", "Repo range")
inp("ads2", "Ad test budget per month, year 2", [100, 250, 500], CUR0, "$ per month", "One test at a time; cut ad sets that miss target CAC (MARKETING-PLAYBOOK).", "Assumption")
inp("ads3", "Ad test budget per month, year 3", [150, 350, 700], CUR0, "$ per month", "Raise only while CAC is under target (MARKETING-PLAYBOOK checklist).", "Assumption")

wa.column_dimensions["A"].width = 14
wa.column_dimensions["B"].width = 58
for c in "CDE":
    wa.column_dimensions[c].width = 14
wa.column_dimensions["F"].width = 14
wa.column_dimensions["G"].width = 70
wa.column_dimensions["H"].width = 16
wa.freeze_panes = "C6"
dv = DataValidation(type="whole", operator="between", formula1="0", formula2="1", allow_blank=False)
wa.add_data_validation(dv)
for code in ("SITE", "ETSY", "KDP", "INGRAM", "MOR", "COURSE", "BOARD", "SCHOOL", "RETAIL"):
    for ref in A[f"{code}_inc"]:
        dv.add(ref.split("!")[1].replace("$", ""))
dvp = DataValidation(type="decimal", operator="between", formula1="0", formula2="1")
wa.add_data_validation(dvp)
dvp.add(A["pos"].split("!")[1].replace("$", ""))

# =====================================================================
# UNIT ECONOMICS
# =====================================================================
wu = ws_["Unit Economics"]
title(wu, "Unit economics: net to AlphaPlay LLC per unit, by product and channel",
      "Net per unit = Price x (1 - platform % - payment % - refund %) - fixed fees - print/POD/landed cost - fulfilment. "
      "Sales tax and VAT are pass-through and never counted as revenue. Blue prices are editable; other channels link to them.")
wu.merge_cells("A2:R3"); wu["A2"].alignment = WRAP; wu.row_dimensions[2].height = 28
UH = ["Channel code", "Product", "Channel / route", "Wave", "Price to customer ($)", "Platform / marketplace fee %",
      "Platform fixed fee ($/unit)", "Payment processing %", "Payment fixed fee ($)", "Refund / deduction allowance %",
      "Print, POD or landed cost ($/unit)", "Fulfilment ($/unit)", "Net per unit ($)", "Net margin %",
      "Inventory cost paid up front ($/unit)", "Mix weight in channel", "Sales tax / VAT handling", "Source / notes"]
hdr(wu, 5, 1, 18, UH, 45)
a = A
ETSY_F = f"={a['etsy_tx']}+{a['etsy_oa']}*{a['etsy_oashare']}"
TAX_SHOP = "Shopify Tax adds MD 6% at checkout; AlphaPlay remits (pass-through, not revenue)"
TAX_ETSY = "Etsy is marketplace facilitator: collects and remits"
TAX_KDP = "Amazon is the retailer; royalty only, no sales tax for AlphaPlay"
TAX_ING = "Retailer collects; AlphaPlay receives publisher compensation"
TAX_MOR = "Merchant of record collects and remits US sales tax and EU/UK VAT"
TAX_TPT = "TPT remits as marketplace (UNVERIFIED)"
TAX_SCH = "Tax-exempt certificate kept on file; otherwise MD 6%"
TAX_AMZ = "Amazon collects and remits"
TAX_FAIRE = "Wholesale: exempt with the retailer's resale certificate"
TAX_BB = "Marketplace facilitator [VERIFY for Target Plus]"
SHOP = dict(F=0, G=0, H=a["shop_pct"], I=a["shop_fix"], J=a["refund"], tax=TAX_SHOP)
ETSY = dict(F=ETSY_F, G=a["etsy_list"], H=a["etsy_pay"], I=a["etsy_payfix"], J=a["refund"], tax=TAX_ETSY)
MOR = dict(F=a["mor_pct"], G=a["mor_fix"], H=0, I=0, J=a["refund"], tax=TAX_MOR)
KDPc = dict(F=f"=1-{a['kdp_roy']}", G=0, H=0, I=0, J=0, tax=TAX_KDP)
ING = dict(F=a["ing_disc"], G=0, H=0, I=0, J=0, tax=TAX_ING)
TPT = dict(F=f"=1-{a['tpt_payout']}", G=a["tpt_fix"], H=0, I=0, J=0, tax=TAX_TPT)
SCHD = dict(F=0, G=0, H=a["shop_pct"], I=a["shop_fix"], J=0, tax=TAX_SCH)

KDP_COLOR = f"={a['kdp_base']}+{a['kdp_color']}*{a['pic_pages']}"
KDP_BW = f"={a['kdp_bw_flat']}"
DIGI = [  # id, product, price, weight, src
    ("routine", "Visual routine cards (200+ editable; 0-5 set at launch, 5-12 set added free when G1 clears)", 6.50, 25, "Everyday price $6.50 under BRAND.md 'Honest pricing' (no anchor or permanent sale)."),
    ("bored", "\"I'm bored\" play cards (150, age-banded)", 6.50, 15, "DEMAND-CHECK §3 #2."),
    ("family", "Play-First Family Kit (2-5 pages at launch; 5-12 pages added free when G1 clears)", 11.00, 20, "DEMAND-CHECK §3 #3."),
    ("busy", "Toddler busy book printable (120-150 pages)", 11.99, 18, "Everyday price $11.99 under BRAND.md 'Honest pricing' (DEMAND-CHECK §3 #4 street level)."),
    ("playspdf", "100 Screen-Free Plays (PDF)", 9.99, 10, "DEMAND-CHECK §3 #5."),
    ("car", "Screen-Free Car Ride & Waiting Pack", 6.00, 5, "DEMAND-CHECK §3 first alternate."),
    ("flash", "First-words flash cards (printable)", 6.99, 3, "DEMAND-CHECK §2 #3."),
    ("alpha", "ALPHAPLAY Spelling Games printable (G1; trademark-use product)", 6.00, 0, "ops/QUEUE.md #1. Weight 0: its job is to protect the mark, it is G1 pending counsel, and the demand check found no sales evidence."),
]
UROWS = []  # dicts
for pid, pname, price, w, src in DIGI:
    UROWS.append(dict(code="SITE", pid=f"SITE_{pid}", prod=pname, route="Own site (Shopify)", wave="1", price=price, w=w, K=0, L=0, O=0, src=src, **SHOP))
UROWS.append(dict(code="SITE", pid="SITE_tee", prod="Adult tee (POD, 2-3 cleared designs max)", route="Own site (Shopify) + POD partner", wave="1",
                  price=27, w=0, K=a["tee_pod"], L=0, O=0, src="DEMAND-CHECK tees row: $27. Weight 0 until the designs clear trademark review (Wave 3).", **SHOP))
for pid, pname, price, w, src in DIGI:
    UROWS.append(dict(code="ETSY", pid=f"ETSY_{pid}", prod=pname, route="Etsy", wave="1", price=("ref", f"SITE_{pid}"), w=w, K=0, L=0, O=0,
                      src="Price linked to the own-site row.", **ETSY))
for pid, pname, price, w, src in DIGI[:5]:
    UROWS.append(dict(code="MOR", pid=f"MOR_{pid}", prod=pname, route="Gumroad (merchant of record), buyers outside the US", wave="1-2",
                      price=("ref", f"SITE_{pid}"), w=w, K=0, L=0, O=0, src="International plan: one MoR for international digital sales.", **MOR))
UROWS += [
    dict(code="KDP", pid="KDP_plays", prod="100 Screen-Free Plays (paperback, B/W interior)", route="Amazon KDP", wave="1", price=16.99, w=50,
         K=KDP_BW, L=0, O=0, src="guide-100-plays/listing.json: $16.99; KDP flat $2.30 B/W print; net about $7.89 [VERIFY].", **KDPc),
    dict(code="KDP", pid="KDP_tablet", prod="The Day the Tablet Slept (paperback)", route="Amazon KDP", wave="1", price=11.99, w=20,
         K=KDP_COLOR, L=0, O=0, src="picture-tablet-slept/listing.json: $11.99; about $3.95/copy royalty.", **KDPc),
    dict(code="KDP", pid="KDP_upgo", prod="Up! Go! More! (talk-along paperback)", route="Amazon KDP", wave="1", price=11.99, w=30,
         K=KDP_COLOR, L=0, O=0, src="board-up-go-more/listing.json: $11.99 paperback edition sells now with no inventory.", **KDPc),
    dict(code="INGRAM", pid="ING_plays", prod="100 Screen-Free Plays (paperback via Ingram)", route="IngramSpark (same ISBN; KDP Expanded Distribution off)", wave="2",
         price=("ref", "KDP_plays"), w=50, K=KDP_BW, L=0, O=0, src="storefront-setup-guide Part D. Print cost proxy = KDP flat B/W rate [VERIFY].", **ING),
    dict(code="INGRAM", pid="ING_upgo", prod="Up! Go! More! (paperback via Ingram)", route="IngramSpark", wave="2",
         price=("ref", "KDP_upgo"), w=50, K=a["ing_pb_print"], L=0, O=0, src="board-up-go-more/listing.json channels.", **ING),
    dict(code="INGRAM", pid="ING_tablet", prod="The Day the Tablet Slept (hardcover; gated)", route="IngramSpark", wave="gated", price=19.99, w=0,
         K=a["ing_hc_print"], L=0, O=0, src="picture-tablet-slept/listing.json: turn on only after the paperback sells (demand 'Weak'). Weight 0. "
         "Laps Not Apps is not in this channel: it is now a personalized keepsake printed per order (amazon_route 'none-with-reason').", **ING),
    dict(code="COURSE", pid="CRS_single", prod="30-Day Screen Reset (written program)", route="Own site (Shopify) + automated email", wave="2", price=27, w=70,
         K=0, L=0, O=0, src="DEMAND-CHECK course row: $27.", **dict(SHOP, J=a["refund_course"])),
    dict(code="COURSE", pid="CRS_bundle", prod="30-Day Screen Reset bundle", route="Own site (Shopify) + automated email", wave="2", price=49, w=30,
         K=0, L=0, O=0, src="DEMAND-CHECK course row: $49 bundle.", **dict(SHOP, J=a["refund_course"])),
    dict(code="BOARD", pid="BB_site", prod="Up! Go! More! board book", route="Own site; offset stock at a 3PL", wave="gated", price=("a", a["bb_price"]), w=60,
         K=a["landed"], L=f"={a['pick']}+{a['ship_sub']}", O=a["landed"], src="Offset run held and shipped by a 3PL, never the founder (BRAND.md). Pick/pack plus about $2 of postage absorbed.", **SHOP),
    dict(code="BOARD", pid="BB_fba", prod="Up! Go! More! board book", route="Amazon FBA (from the print month; the pre-sale is own-site only)", wave="gated", price=("a", a["bb_price"]), w=40,
         K=a["landed"], L=f"={a['fba_fee']}+{a['fba_storage']}", O=a["landed"], src="AMAZON-AND-RETAIL-ROADMAP A: board books via FBA; closing fee, storage and placement allowance included [VERIFY].",
         F=a["amz_ref"], G=a["amz_closing"], H=0, I=0, J=0, tax=TAX_AMZ),
    dict(code="SCHOOL", pid="SCH_tpt", prod="TPT single resource (e.g., talk brain breaks)", route="Teachers Pay Teachers", wave="4 (held)", price=5, w=40,
         K=0, L=0, O=0, src="DEMAND-CHECK teacher table: $5 singles; held for counsel.", **TPT),
    dict(code="SCHOOL", pid="SCH_tptb", prod="Classroom Talk and Play growth bundle", route="Teachers Pay Teachers", wave="4 (held)", price=22, w=20,
         K=0, L=0, O=0, src="DEMAND-CHECK §2 #11: $22-26.", **TPT),
    dict(code="SCHOOL", pid="SCH_class", prod="Single-classroom license", route="Direct invoice / Shopify draft order", wave="4 (held)", price=29, w=20,
         K=0, L=0, O=0, src="MARKETING-PLAYBOOK School Purchasing Kit: Single Classroom $29.", **SCHD),
    dict(code="SCHOOL", pid="SCH_kit", prod="Host-it-yourself parent-night kit, single site", route="Direct invoice / Shopify", wave="4 (held)", price=129, w=2,
         K=0, L=0, O=0, src="DEMAND-CHECK: $129 single site. Near-zero weight: no kit sales counts exist and a free leader program competes.", **SCHD),
    dict(code="SCHOOL", pid="SCH_kitm", prod="Host kit, multi-site", route="Direct invoice / Shopify", wave="4 (held)", price=249, w=0,
         K=0, L=0, O=0, src="DEMAND-CHECK: $249 multi-site. Weight 0 until there is evidence.", **SCHD),
    dict(code="RETAIL", pid="RT_faire", prod="Up! Go! More! board book (wholesale)", route="Faire wholesale to boutiques", wave="5 (retail)",
         price=("f", f"={a['bb_price']}*{a['whsl_pct']}"), w=60, K=a["landed"], L=a["whs_handle"], O=a["landed"],
         src="Wholesale pays about half of retail (AMAZON-AND-RETAIL-ROADMAP B4).", F=a["faire_comm"], G=0, H=a["faire_proc"], I=0, J=a["retail_deduct"], tax=TAX_FAIRE),
    dict(code="RETAIL", pid="RT_wmt", prod="Up! Go! More! board book", route="Walmart Marketplace (3PL-fulfilled)", wave="5 (retail)",
         price=("a", a["bb_price"]), w=40, K=a["landed"], L=f"={a['pick']}+{a['ship_sub']}", O=a["landed"], src="Walmart Marketplace by application (ROADMAP B3).",
         F=a["bigbox_ref"], G=0, H=0, I=0, J=a["retail_deduct"], tax=TAX_BB),
    dict(code="RETAIL", pid="RT_tgt", prod="Up! Go! More! board book", route="Target Plus (invitation-only) [VERIFY]", wave="5 (retail)",
         price=("a", a["bb_price"]), w=0, K=a["landed"], L=f"={a['pick']}+{a['ship_sub']}", O=a["landed"], src="Target Plus is invitation-only (ROADMAP B3) [VERIFY terms]. Weight 0: no forecast revenue until an invitation arrives.",
         F=a["bigbox_ref"], G=0, H=0, I=0, J=a["retail_deduct"], tax=TAX_BB),
]
UE_ROW = {}
r = 6
for d in UROWS:
    UE_ROW[d["pid"]] = r
    r += 1
UE_FIRST, UE_LAST = 6, r - 1

def fval(v):
    if isinstance(v, str) and v.startswith("'"):
        return "=" + v
    return v

for d in UROWS:
    r = UE_ROW[d["pid"]]
    put(wu, f"A{r}", d["code"])
    put(wu, f"B{r}", d["prod"])
    put(wu, f"C{r}", d["route"])
    put(wu, f"D{r}", d["wave"])
    p = d["price"]
    if isinstance(p, tuple):
        if p[0] == "ref":
            put(wu, f"E{r}", f"=E{UE_ROW[p[1]]}", fmt=CUR2)
        elif p[0] == "a":
            put(wu, f"E{r}", f"={p[1]}", fmt=CUR2)
        else:
            put(wu, f"E{r}", p[1], fmt=CUR2)
    else:
        put(wu, f"E{r}", p, fmt=CUR2, font=F_IN)
    for colk, fmt in (("F", PCT1), ("G", CUR2), ("H", PCT1), ("I", CUR2), ("J", PCT1), ("K", CUR2), ("L", CUR2), ("O", CUR2)):
        v = fval(d[colk])
        if isinstance(v, (int, float)):
            put(wu, f"{colk}{r}", v, fmt=fmt, font=F_IN if v != 0 else F_CALC)
        else:
            put(wu, f"{colk}{r}", v, fmt=fmt)
    put(wu, f"M{r}", f"=E{r}*(1-F{r}-H{r}-J{r})-G{r}-I{r}-K{r}-L{r}", fmt=CUR2)
    put(wu, f"N{r}", f"=IF(E{r}=0,0,M{r}/E{r})", fmt=PCT1)
    put(wu, f"P{r}", OV.get("w_" + d["pid"], d["w"]), fmt="0", font=F_IN)
    put(wu, f"Q{r}", d["tax"], wrap=False)
    put(wu, f"R{r}", d["src"], wrap=False)

# channel summary
rs = UE_LAST + 3
sec(wu, rs - 1, 1, 18, "Channel blend used by the forecast (weighted by mix weight)")
hdr(wu, rs, 1, 9, ["Channel code", "Channel", "", "", "Blended price ($/item)", "Blended net per item ($)", "Net margin %",
                   "Inventory cost paid up front ($/item)", "Payout delay (months)"], 32)
UE = {}
rng = lambda col: f"${col}${UE_FIRST}:${col}${UE_LAST}"
for i, (code, name, tl, lag, seas, src) in enumerate(CH):
    r = rs + 1 + i
    put(wu, f"A{r}", code, bold=True)
    put(wu, f"B{r}", name)
    put(wu, f"E{r}", f"=SUMPRODUCT(--({rng('A')}=$A{r}),{rng('E')},{rng('P')})/SUMIF({rng('A')},$A{r},{rng('P')})", fmt=CUR2)
    put(wu, f"F{r}", f"=SUMPRODUCT(--({rng('A')}=$A{r}),{rng('M')},{rng('P')})/SUMIF({rng('A')},$A{r},{rng('P')})", fmt=CUR2)
    put(wu, f"G{r}", f"=IF(E{r}=0,0,F{r}/E{r})", fmt=PCT1)
    put(wu, f"H{r}", f"=SUMPRODUCT(--({rng('A')}=$A{r}),{rng('O')},{rng('P')})/SUMIF({rng('A')},$A{r},{rng('P')})", fmt=CUR2)
    put(wu, f"I{r}", f"={A['lag_'+code]}", fmt="0")
    UE[code] = dict(price=f"{q('Unit Economics')}!$E${r}", net=f"{q('Unit Economics')}!$F${r}",
                    landed=f"{q('Unit Economics')}!$H${r}", row=r)
rn = rs + len(CH) + 2
notes = [
    "Notes",
    "KDP and IngramSpark: 'price' is the list price the reader pays; AlphaPlay receives the royalty or publisher compensation shown in Net per unit.",
    "Board book and retail rows: the landed print cost is deducted in Net per unit (true margin). Cash Flow adds it back and instead pays for whole print runs up front.",
    "Fixed per-order fees are applied per item, which slightly understates net on multi-item orders (a conservative simplification).",
    "IngramSpark: base discount 40%. The hardcover is gated at weight 0 (about $0.50 a copy at 55%); Laps Not Apps is now a per-order personalized book and is not in this channel.",
    "Board book: own-site orders absorb about $2 of postage; FBA rows include the closing fee and a storage/placement allowance. Mix weights of 0 mark gated products that earn no forecast revenue.",
    "The board-book blend applies only from the print month; pre-sale orders use the own-site row (no FBA stock exists before printing).",
]
for i, t in enumerate(notes):
    put(wu, f"A{rn+i}", t, font=fnt(bold=(i == 0)) if i == 0 else F_NOTE)
widths = [10, 44, 34, 9, 11, 11, 11, 11, 11, 11, 12, 11, 11, 10, 12, 9, 52, 80]
for i, w in enumerate(widths):
    wu.column_dimensions[CL(i + 1)].width = w
wu.freeze_panes = "C6"

# =====================================================================
# STARTUP COSTS
# =====================================================================
wsu = ws_["Startup Costs"]
title(wsu, "Startup costs: one-time items",
      "Model ($) = Low + cost position x (High - Low), using the cost position on Assumptions. Set Include to 0 to drop an item. "
      "Recurring items (insurance, domains, subscriptions) live on Monthly Operating Costs.")
wsu.merge_cells("A2:I3"); wsu["A2"].alignment = WRAP; wsu.row_dimensions[2].height = 28
hdr(wsu, 5, 1, 9, ["Item", "Category", "Low ($)", "High ($)", "Model ($)", "Month incurred (model month #)", "Include (1/0)", "Source", "Status"], 32)
SU = [
    ("Trade-name filing, 'Play Before Pixels' (SDAT)", "Legal/entity", 25, 50, 1, 1, "legal/protection/PROTECTION-PLAN.md: $25 ($50 expedited).", "Repo"),
    ("Principal office / resident agent change (SDAT)", "Legal/entity", 25, 50, 1, 1, "PROTECTION-PLAN: $25 ($50 expedited).", "Repo"),
    ("DMCA designated agent registration", "Legal/IP", 6, 6, 1, 1, "PROTECTION-PLAN: $6, renews every 3 years.", "Repo"),
    ("Etsy shop opening fee (may apply)", "Channels", 0, 15, 1, 1, "storefront-setup-guide §10.", "Repo [VERIFY]"),
    ("Bowker ISBNs, 10-pack", "Publishing", 295, 295, 1, 1, "PROTECTION-PLAN; DECISION-MEMO (UNVERIFIED).", "Repo [VERIFY]"),
    ("Trademark clearance search + attorney opinion, PLAY BEFORE PIXELS", "Legal/IP", 500, 2500, 1, 1, "legal/DECISION-MEMO.json step 2.", "Repo [VERIFY]"),
    ("USPTO application, PLAY BEFORE PIXELS, classes 16 + 41", "Legal/IP", 700, 700, 2, 1, "PROTECTION-PLAN #7: $350/class, within 90 days.", "Repo"),
    ("ALPHAPLAY Statement of Use ($150/class) or extension (up to $625)", "Legal/IP", 150, 625, 5, 1, "PROTECTION-PLAN #6: due Mar 8, 2027; target Feb 1, 2027.", "Repo"),
    ("Trademark attorney, ALPHAPLAY filing", "Legal/IP", 300, 1000, 4, 1, "marketing/BLIND-SPOTS.md #9.", "Repo"),
    ("Copyright registrations for pending works (before Nov 11, 2026)", "Legal/IP", 360, 680, 2, 1, "PROTECTION-PLAN: about 8 filings at $45-$85.", "Repo"),
    ("Attorney: IP assignment to the LLC + operating-agreement refresh", "Legal/entity", 500, 2000, 3, 1, "PROTECTION-PLAN #5 (after employment counsel answers).", "Repo [VERIFY]"),
    ("Attorney: Terms of Sale and website legal pages", "Legal", 500, 2500, 1, 1, "PROTECTION-PLAN contracts table; DECISION-MEMO $500-$2,000.", "Repo [VERIFY]"),
    ("Attorney: freelancer work-for-hire template", "Legal", 300, 1000, 5, 1, "PROTECTION-PLAN contracts table.", "Repo [VERIFY]"),
    ("Attorney: digital product license review", "Legal", 0, 300, 1, 1, "PROTECTION-PLAN contracts table.", "Repo [VERIFY]"),
    ("Attorney: successor in operating agreement + durable POA", "Legal/entity", 500, 1500, 6, 1, "BLIND-SPOTS #20.", "Repo [VERIFY]"),
    ("Accountant setup review (W-9 answer, sales tax, chart of accounts)", "Finance", 300, 1000, 1, 1, "No fee in the repo (finance/money-and-tax-setup.md lists the questions).", "Assumption [VERIFY]"),
    ("Print proofs, about 6 print products at $5-$15", "Product", 30, 90, 2, 1, "BLIND-SPOTS #11.", "Repo"),
    ("Expert accuracy review (CCC-SLP, flat fee)", "Product", 200, 500, 3, 1, "BLIND-SPOTS #10.", "Repo"),
    ("Sensitivity read", "Product", 150, 600, 3, 1, "BLIND-SPOTS #10.", "Repo"),
    ("Early review copies for review teams", "Marketing", 100, 300, 3, 1, "BLIND-SPOTS #14.", "Repo"),
    ("Holiday gift setup (gift cards, reveal card)", "Marketing", 0, 20, 2, 1, "BLIND-SPOTS #6.", "Repo"),
    # ---- gated items: Include = 0 in the base plan; switch on when the named gate is met ----
    ("GATED (break-even line): Library cataloging block", "Library credibility", 75, 150, 9, 0, "BLIND-SPOTS #18 [VERIFY]. Deferred on the lean path.", "Repo [VERIFY]"),
    ("GATED (break-even line): One paid review (Kirkus Indie or Foreword Clarion)", "Library credibility", 500, 650, 9, 0, "BLIND-SPOTS #18 [VERIFY]. Deferred.", "Repo [VERIFY]"),
    ("GATED (break-even line): Juried award entries (2-3 at $75-$100)", "Library credibility", 225, 300, 10, 0, "BLIND-SPOTS #18 [VERIFY]. Deferred.", "Repo [VERIFY]"),
    ("GATED (break-even line): Spanish 'starter' localization (AI + professional post-edit)", "International", 4700, 5800, 13, 0, "legal/international-plan.md. No Spanish revenue line exists yet, so it is out of the base plan.", "Repo (estimate)"),
    ("GATED (Spanish meets targets): French and German starter sets", "International", 9000, 11000, 19, 0, "legal/international-plan.md: about $5,000 per language.", "Repo (estimate)"),
    ("GATED (with French/German): legal review per market", "International", 1000, 3000, 19, 0, "legal/international-plan.md §8.2: $500-$1,500 per market (unverified).", "Repo [VERIFY]"),
    ("GATED (US filing looks safe): Madrid international trademark (EU, UK, CA, AU; 2 classes)", "International", 2500, 4500, 8, 0, "DECISION-MEMO: only once the US application looks safe.", "Repo [VERIFY]"),
    ("GATED (card deck for retail): USPTO class 28 filing", "Legal/IP", 350, 350, 20, 0, "Section 4.5 item 1: $350 per class.", "Repo"),
    ("GATED (board book printed + series): books 2 and 3 human illustration", "Product (retail)", 3000, 10000, 24, 0, "BLIND-SPOTS #17: $1,500-$5,000 per board book.", "Repo [VERIFY]"),
    ("GATED (with books 2-3): CPSIA testing for books 2 and 3", "Product (retail)", 600, 2000, 26, 0, "PROTECTION-PLAN: a few hundred dollars per SKU (unverified).", "Repo [VERIFY]"),
    ("GATED (with books 2-3): offset runs for books 2 and 3 (2,500 each, landed)", "Inventory (retail)", 13750, 20000, 27, 0, "Quote table: $2.20 a copy at 2,500 plus 25% freight = $2.75 landed; high end at the repo's $4.00 [VERIFY quotes].", "Assumption [VERIFY]"),
    ("GATED (POD deck sells + retail case): offset card-deck run (5,000 decks)", "Inventory (retail)", 10000, 17500, 30, 0, "Section 4.5 example: 5,000 x $2.00-$3.50 landed.", "Assumption [VERIFY]"),
    ("GATED (seasonal calendars): tradition reviewers (4 traditions)", "Product", 400, 1200, 14, 0, "Section 5.4: quote needed; $100-$300 each assumed.", "Assumption"),
]
for i, (item, cat, lo, hi, m, inc, src, st) in enumerate(SU):
    r = 6 + i
    inc = OV.get(f"su_{i}", inc)
    if "_su_all_gated" in OV and item.startswith("GATED"):
        inc = OV["_su_all_gated"]
    put(wsu, f"A{r}", item); put(wsu, f"B{r}", cat)
    put(wsu, f"C{r}", lo, fmt=CUR0, font=F_IN); put(wsu, f"D{r}", hi, fmt=CUR0, font=F_IN)
    put(wsu, f"E{r}", f"=C{r}+{A['pos']}*(D{r}-C{r})", fmt=CUR0)
    put(wsu, f"F{r}", m, fmt="0", font=F_IN); put(wsu, f"G{r}", inc, fmt="0", font=F_IN)
    put(wsu, f"H{r}", src); put(wsu, f"I{r}", st)
SU_FIRST, SU_LAST = 6, 6 + len(SU) - 1
rt = SU_LAST + 1
put(wsu, f"A{rt}", "Total (included items)", bold=True)
put(wsu, f"C{rt}", f"=SUMPRODUCT(C{SU_FIRST}:C{SU_LAST},$G${SU_FIRST}:$G${SU_LAST})", fmt=CUR0, bold=True)
put(wsu, f"D{rt}", f"=SUMPRODUCT(D{SU_FIRST}:D{SU_LAST},$G${SU_FIRST}:$G${SU_LAST})", fmt=CUR0, bold=True)
put(wsu, f"E{rt}", f"=SUMPRODUCT(E{SU_FIRST}:E{SU_LAST},$G${SU_FIRST}:$G${SU_LAST})", fmt=CUR0, bold=True)
for c in "ABCDEFGHI":
    wsu[f"{c}{rt}"].border = TOP; wsu[f"{c}{rt}"].fill = TOT_FILL
put(wsu, f"A{rt+1}", "Gated items not in the base plan (total at model cost)", font=F_NOTE)
put(wsu, f"E{rt+1}", f"=SUMPRODUCT(E{SU_FIRST}:E{SU_LAST},1-$G${SU_FIRST}:$G${SU_LAST})", fmt=CUR0)
put(wsu, f"C{rt+1}", f"=SUMPRODUCT(C{SU_FIRST}:C{SU_LAST},1-$G${SU_FIRST}:$G${SU_LAST})", fmt=CUR0)
put(wsu, f"D{rt+1}", f"=SUMPRODUCT(D{SU_FIRST}:D{SU_LAST},1-$G${SU_FIRST}:$G${SU_LAST})", fmt=CUR0)
put(wsu, f"A{rt+2}", "Timing summary", bold=True)
for j, (lab, lo_m, hi_m) in enumerate([("Months 1-3 (Oct-Dec 2026)", 1, 3), ("Months 4-12", 4, 12), ("Year 2", 13, 24), ("Year 3", 25, 36)]):
    r = rt + 3 + j
    put(wsu, f"A{r}", lab)
    put(wsu, f"E{r}", f"=SUMPRODUCT(($F${SU_FIRST}:$F${SU_LAST}>={lo_m})*($F${SU_FIRST}:$F${SU_LAST}<={hi_m})*$G${SU_FIRST}:$G${SU_LAST}*$E${SU_FIRST}:$E${SU_LAST})", fmt=CUR0)
put(wsu, f"A{rt+8}", "GATED rows are listed with their trigger and month so nothing in the plan is unpriced; they stay at Include = 0 until the named gate is met. "
                    "Not included: employment-counsel fees (a personal matter for the founder); board-book illustration, CPSIA testing, 3PL setup and the first run (Retail Readiness Costs).", font=F_NOTE)
for c, w in zip("ABCDEFGHI", [62, 18, 11, 11, 11, 14, 10, 62, 18]):
    wsu.column_dimensions[c].width = w
wsu.freeze_panes = "B6"
SU_RANGE = dict(F=f"{q('Startup Costs')}!$F${SU_FIRST}:$F${SU_LAST}", G=f"{q('Startup Costs')}!$G${SU_FIRST}:$G${SU_LAST}",
                E=f"{q('Startup Costs')}!$E${SU_FIRST}:$E${SU_LAST}")

# =====================================================================
# MONTHLY OPERATING COSTS
# =====================================================================
wo = ws_["Monthly Operating Costs"]
title(wo, "Monthly operating costs: subscriptions, Claude plan, email platform, connectors, insurance and reserve",
      "Low/High are the amount per billing period (per month for Monthly items, per year for Annual items). Model = Low + cost position x (High - Low). "
      "Annual items hit in their start month and every 12 months after. Insurance is shown billed monthly (annual premium / 12).")
wo.merge_cells("A2:M3"); wo["A2"].alignment = WRAP; wo.row_dimensions[2].height = 28
GC = 15  # grid first column (O)
hdr(wo, 5, 1, 13, ["Item", "Category", "Low ($)", "High ($)", "Model ($ per period)", "Frequency", "Start month", "End month",
                   "Year 1 total", "Year 2 total", "Year 3 total", "Source", "Status"], 32)
for m in range(1, 37):
    c = CL(GC + m - 1)
    put(wo, f"{c}3", f"=INT(({c}4-1)/12)+1", fmt="0")
    put(wo, f"{c}4", m, fmt="0")
    put(wo, f"{c}5", f"=DATE(YEAR({A['start']}),MONTH({A['start']})+{c}4-1,1)", fmt=DATEF)
    wo[f"{c}5"].fill = HDR_FILL; wo[f"{c}5"].font = HDR_FONT
    wo.column_dimensions[c].width = 9
put(wo, f"{CL(GC-1)}3", "Year", font=F_NOTE); put(wo, f"{CL(GC-1)}4", "Month #", font=F_NOTE)
put(wo, f"{CL(GC-1)}5", "Include (1/0)"); wo[f"{CL(GC-1)}5"].fill = HDR_FILL; wo[f"{CL(GC-1)}5"].font = HDR_FONT
OP = [
    ("Shopify Basic plan", "Store", 39, 39, "Monthly", 1, 36, "storefront-setup-guide §1: $39/mo ($29 billed yearly).", "Repo [VERIFY]", 1),
    ("Business email on the brand domain", "Tools", 7, 14, "Monthly", 1, 36, "BLIND-SPOTS #4: about $7-$14 a month.", "Repo", 1),
    ("Password manager", "Tools", 0, 40, "Annual", 1, 36, "BLIND-SPOTS #4: $0-$40 a year.", "Repo", 1),
    ("Email platform, year 1 (free tiers, then budget)", "Email", 0, 20, "Monthly", 1, 12, "MARKETING-PLAYBOOK: Klaviyo free 250 profiles; budget $20/mo.", "Repo [VERIFY]", 1),
    ("Email platform, years 2-3", "Email", 20, 39, "Monthly", 13, 36, "MARKETING-PLAYBOOK: about $20-39/mo later.", "Repo [VERIFY]", 1),
    ("Claude plan that runs the scheduled routines", "Automation", 100, 200, "Monthly", 1, 36, "No price in the repo; a higher-usage tier is assumed because routines run weekly (ops/ROUTINE.md).", "Assumption [VERIFY]", 1),
    ("Claude usage-credit cap (hard limit)", "Automation", 0, 25, "Monthly", 1, 36, "ops/GAPS-ROUND-2.md G2-06: fixed monthly limit such as $25.", "Repo", 1),
    ("QuickBooks Online (Simple Start to Essentials)", "Bookkeeping", 38, 85, "Monthly", 1, 36, "finance/money-and-tax-setup.md: $38 Simple Start; Essentials $75-$85 (UNVERIFIED).", "Repo [VERIFY]", 1),
    ("Link My Books settlement connector (1-3 channels)", "Connectors", 21, 47, "Monthly", 3, 36, "money-and-tax-setup: from $21/mo, about $13 per extra channel.", "Repo [VERIFY]", 1),
    ("Buyer-specific PDF stamping", "Tools", 0, 20, "Monthly", 3, 36, "PROTECTION-PLAN: about $0-$20/mo.", "Repo [VERIFY]", 1),
    ("Social scheduler", "Tools", 0, 30, "Monthly", 3, 36, "Publisher role posts through a scheduler (section 5.3); no price in the repo.", "Assumption [VERIFY]", 1),
    ("Own-site review app", "Tools", 0, 15, "Monthly", 3, 36, "Section 4.7 own-site review app; no price in the repo.", "Assumption [VERIFY]", 1),
    ("Etsy listing renewals (about 30 listings every 4 months)", "Channels", 1.5, 3, "Monthly", 3, 36, "$0.20 per listing (storefront guide §10); listing count is an assumption.", "Assumption", 1),
    ("Sales-tax filing service (optional; the accountant may file)", "Tax", 0, 25, "Monthly", 3, 36, "TAX-AUTOPILOT §1 names services; no price in the repo.", "Assumption [VERIFY]", 1),
    ("Domains, MUST tier", "Domains", 61, 61, "Annual", 1, 36, "legal/domain-portfolio.md: about $61 a year.", "Repo [VERIFY]", 1),
    ("Domains, SHOULD tier (before paid ads / first print run)", "Domains", 118, 118, "Annual", 5, 36, "legal/domain-portfolio.md: about $118 a year.", "Repo [VERIFY]", 1),
    ("USPS PO Box (public business address)", "Admin", 100, 300, "Annual", 1, 36, "legal/ENTITY.md decision; fee not in the repo (TRUST-CHECKLIST says verify at usps.com).", "Assumption [VERIFY]", 1),
    ("Commercial resident agent", "Admin", 50, 300, "Annual", 1, 36, "PROTECTION-PLAN: about $50-$300 a year.", "Repo [VERIFY]", 1),
    ("Maryland SDAT annual report", "Admin", 300, 300, "Annual", 7, 36, "PROTECTION-PLAN: $300, due Apr 15 (month 7 = Apr 2027).", "Repo", 1),
    ("GDPR Art. 27 representatives, EU and UK (international digital sales)", "Legal/privacy", 220, 1300, "Annual", 4, 36, "Section 5.8: about EUR 100-600 a year each (unverified); needed once EU/UK buyers are served.", "Repo [VERIFY]", 1),
    ("General liability with products-completed operations", "Insurance", 45.17, 125, "Monthly", 3, 36, "PROTECTION-PLAN: about $542/yr average (the low end here); range $260-$3,000+. Bound before the first sale (month 3).", "Repo [VERIFY]", 1),
    ("Professional liability / E&O (switch: off until the broker advises)", "Insurance", 62, 125, "Monthly", 3, 36, "PROTECTION-PLAN: written for coaching, which the business no longer offers. Include = 0 pending the broker.", "Repo [VERIFY]", 0),
    ("Media liability / publisher's E&O", "Insurance", 50, 150, "Monthly", 3, 36, "PROTECTION-PLAN: $50-$150/mo (secondary, unverified).", "Repo [VERIFY]", 1),
    ("Cyber", "Insurance", 35, 129, "Monthly", 3, 36, "PROTECTION-PLAN: $35-$129/mo.", "Repo [VERIFY]", 1),
    ("Umbrella / excess over GL", "Insurance", 25, 50, "Monthly", 5, 36, "PROTECTION-PLAN: 'a few hundred dollars a year' (unverified); within 90 days.", "Repo [VERIFY]", 1),
    ("Trademark watch (optional; the monthly DIY search is $0)", "Legal/IP", 0, 750, "Annual", 4, 36, "PROTECTION-PLAN: $395-$750 a year.", "Repo [VERIFY]", 1),
    ("Accountant: year-end return and review", "Finance", 500, 1500, "Annual", 7, 36, "No fee in the repo.", "Assumption [VERIFY]", 1),
    ("Copyright registrations for new releases (about 4 a year)", "Legal/IP", 260, 340, "Annual", 13, 36, "PROTECTION-PLAN: $65-$85 per filing.", "Repo", 1),
    ("Upload assistant for KDP/IngramSpark/TpT packets (switch: when uploads exceed the founder cap)", "Contractor", 0, 200, "Monthly", 7, 36, "Section 5.2; not priced in the repo.", "Assumption", 0),
]
OP_FIRST = 6
for i, (item, cat, lo, hi, fq, st, en, src, stt, inc) in enumerate(OP):
    r = OP_FIRST + i
    inc = OV.get(f"op_{i}", inc)
    put(wo, f"N{r}", inc, fmt="0", font=F_IN)
    put(wo, f"A{r}", item); put(wo, f"B{r}", cat)
    put(wo, f"C{r}", lo, fmt=CUR2, font=F_IN); put(wo, f"D{r}", hi, fmt=CUR2, font=F_IN)
    put(wo, f"E{r}", f"=C{r}+{A['pos']}*(D{r}-C{r})", fmt=CUR2)
    put(wo, f"F{r}", fq, font=F_IN); put(wo, f"G{r}", st, fmt="0", font=F_IN); put(wo, f"H{r}", en, fmt="0", font=F_IN)
    g1, gl = CL(GC), CL(GC + 35)
    for j, col in enumerate("IJK"):
        put(wo, f"{col}{r}", f"=SUMIF(${g1}$3:${gl}$3,{j+1},{g1}{r}:{gl}{r})", fmt=CUR0)
    put(wo, f"L{r}", src); put(wo, f"M{r}", stt)
    for m in range(1, 37):
        c = CL(GC + m - 1)
        put(wo, f"{c}{r}", f"=$N{r}*IF(AND({c}$4>=$G{r},{c}$4<=$H{r}),IF($F{r}=\"Monthly\",$E{r},IF(MOD({c}$4-$G{r},12)=0,$E{r},0)),0)", fmt=CUR0)
OP_LAST = OP_FIRST + len(OP) - 1
r_sub, r_con, r_tot = OP_LAST + 1, OP_LAST + 2, OP_LAST + 3
labels = {r_sub: "Subtotal", r_con: "Operating contingency", r_tot: "Total monthly operating costs"}
for rr in (r_sub, r_con, r_tot):
    put(wo, f"A{rr}", labels[rr], bold=True)
    for c in range(1, GC + 36):
        wo.cell(row=rr, column=c).fill = TOT_FILL
    for colidx in list(range(9, 12)) + list(range(GC, GC + 36)):
        c = CL(colidx)
        if rr == r_sub:
            f = f"=SUM({c}{OP_FIRST}:{c}{OP_LAST})"
        elif rr == r_con:
            f = f"={c}{r_sub}*{A['contin']}"
        else:
            f = f"={c}{r_sub}+{c}{r_con}"
        put(wo, f"{c}{rr}", f, fmt=CUR0, bold=(rr == r_tot))
wo[f"A{r_sub}"].border = TOP
put(wo, f"A{r_tot+2}", "Wave-specific fixed costs (3PL minimum, Seller Central, retail EDI and insurance uplift) are added in the forecast only when that wave is live.", font=F_NOTE)
for c, w in zip("ABCDEFGHIJKLM", [52, 12, 10, 10, 12, 10, 8, 8, 11, 11, 11, 60, 18]):
    wo.column_dimensions[c].width = w
wo.column_dimensions["N"].width = 9
wo.freeze_panes = f"{CL(GC)}6"
OPTOT = lambda m: f"{q('Monthly Operating Costs')}!{CL(GC+m-1)}${r_tot}"

# =====================================================================
# RETAIL READINESS COSTS
# =====================================================================
wr = ws_["Retail Readiness Costs"]
title(wr, "Retail readiness costs: Wave 3 board-book launch and big-box readiness (all [VERIFY])",
      "Almost nothing here has a live quote yet. Get 2-3 written quotes for each line before any commitment (BLIND-SPOTS #11). "
      "Section A hits in the board-book print month; Section B hits 'lead time' months before retail launch; Section C runs monthly while retail is live.")
wr.merge_cells("A2:K3"); wr["A2"].alignment = WRAP; wr.row_dimensions[2].height = 28
hdr(wr, 5, 1, 11, ["Item", "Section", "Low ($)", "High ($)", "Model ($ per unit of qty)", "Basis", "Qty", "Model total ($)",
                   "Timing", "Source", "Status"], 32)
RR_A0 = [
    ("Human illustrator for the board book", "A0", 1500, 5000, "per book", 1, "Month before the pre-sale", "BLIND-SPOTS #17.", "Repo"),
    ("Product-safety attorney: CPSIA status, who certifies (PROTECTION-PLAN q.9)", "A0", 300, 1500, "one-time", 1, "Month before the pre-sale", "DECISION-MEMO: $300-$1,500 plus testing (unverified).", "Repo [VERIFY]"),
    ("Attorney check of pre-sale terms (FTC mail-order rule)", "A0", 300, 700, "one-time", 1, "Month before the pre-sale", "BLIND-SPOTS #16-#17: lawyer check $300-$700.", "Repo [VERIFY]"),
    ("Pre-order app for Shopify (3 months)", "A0", 0, 60, "one-time", 1, "Month before the pre-sale", "Not in the repo.", "Assumption [VERIFY]"),
]
RR_A = [
    ("CPSIA third-party lab testing, board book for ages 0-3", "A", 300, 1000, "per SKU", 1, "Print month", "PROTECTION-PLAN #9: 'a few hundred dollars per product'; books for 3 and under are not exempt.", "Repo [VERIFY]"),
    ("Children's Product Certificate (prepared in-house)", "A", 0, 0, "per SKU", 1, "Print month", "PROTECTION-PLAN: CPC $0 to prepare.", "Repo"),
    ("Tracking labels and printer file changes", "A", 0, 200, "one-time", 1, "Print month", "Not in the repo.", "[VERIFY]"),
    ("Board-book printer hard proof and quote samples", "A", 100, 400, "one-time", 1, "Print month", "Not in the repo; BLIND-SPOTS #11 asks for 2-3 full quotes.", "[VERIFY]"),
    ("3PL onboarding / setup", "A", 0, 500, "one-time", 1, "Print month", "Not in the repo.", "[VERIFY]"),
    ("Amazon FBA inbound prep and labels", "A", 50, 200, "one-time", 1, "Print month", "Not in the repo.", "[VERIFY]"),
]
RR_B = [
    ("GS1 US company prefix for non-book SKUs (card deck, boxed sets); books use ISBN barcodes", "B", 250, 750, "one-time", 1, "Retail launch - lead", "AMAZON-AND-RETAIL-ROADMAP B5 requires GS1 barcodes; fee not in the repo.", "[VERIFY]"),
    ("CPSIA testing for more children's SKUs (card deck, 3-pack box)", "B", 300, 1000, "per SKU", 2, "Retail launch - lead", "PROTECTION-PLAN; ROADMAP B5.", "Repo [VERIFY]"),
    ("Retail-ready packaging design and dielines", "B", 500, 2000, "one-time", 1, "Retail launch - lead", "ROADMAP B5 'retail-ready packaging'; no figure in the repo.", "[VERIFY]"),
    ("Attorney review of retailer / distributor vendor agreement", "B", 500, 2500, "one-time", 1, "Retail launch - lead", "Repo attorney range $300-$2,500 per document (PROTECTION-PLAN).", "Repo [VERIFY]"),
    ("Buyer sell sheet, line list and sample kits", "B", 200, 600, "one-time", 1, "Retail launch - lead", "ROADMAP B7 (pitch only with proof); no figure in the repo.", "[VERIFY]"),
    ("Faire brand application and first-order sample stock allowance", "B", 0, 300, "one-time", 1, "Retail launch - lead", "storefront-setup-guide §19.", "[VERIFY]"),
    ("Broker quote and binder at chain limits (additional-insured endorsement)", "B", 100, 500, "one-time", 1, "Retail launch - lead", "Section 4.5 item 4; premium itself is in section C.", "[VERIFY]"),
]
RR_C = [
    ("3PL EDI connection and retailer compliance", "C", 100, 300, "per month", 1, "Monthly while retail is live", "ROADMAP B5: 'EDI capability through a 3PL'; no figure in the repo.", "[VERIFY]"),
    ("Insurance uplift to retailer limits ($1M+ occurrence, umbrella, additional insureds)", "C", 50, 250, "per month", 1, "Monthly while retail is live", "PROTECTION-PLAN retailer requirements (Amazon, Faire+); premium uplift not in the repo.", "[VERIFY]"),
    ("GS1 annual renewal (monthly equivalent)", "C", 4, 13, "per month", 1, "Monthly while retail is live", "Not in the repo.", "[VERIFY]"),
]
RR_ROWS = {}
r = 6
def rr_block(items, label):
    global r
    sec(wr, r, 1, 11, label); r += 1
    first = r
    for (item, s, lo, hi, basis, qty, timing, src, st) in items:
        put(wr, f"A{r}", item); put(wr, f"B{r}", s)
        put(wr, f"C{r}", lo, fmt=CUR0, font=F_IN); put(wr, f"D{r}", hi, fmt=CUR0, font=F_IN)
        put(wr, f"E{r}", f"=C{r}+{A['pos']}*(D{r}-C{r})", fmt=CUR0)
        put(wr, f"F{r}", basis); put(wr, f"G{r}", qty, fmt="0", font=F_IN)
        put(wr, f"H{r}", f"=E{r}*G{r}", fmt=CUR0)
        put(wr, f"I{r}", timing); put(wr, f"J{r}", src); put(wr, f"K{r}", st)
        r += 1
    last = r - 1
    put(wr, f"A{r}", f"Total, section {items[0][1]}", bold=True)
    put(wr, f"H{r}", f"=SUM(H{first}:H{last})", fmt=CUR0, bold=True)
    for c in range(1, 12):
        wr.cell(row=r, column=c).fill = TOT_FILL
    tot = r
    r += 2
    return tot
tA0 = rr_block(RR_A0, "A0. Before a board-book pre-sale (spent whether or not the pre-sale reaches the go line)")
tA = rr_block(RR_A, "A. Board-book print month (spent only if the pre-sale reaches the go line)")
tB = rr_block(RR_B, "B. Big-box and wholesale readiness (one-time, before retail launch)")
tC = rr_block(RR_C, "C. Ongoing while retail is live (per month)")
RR = dict(A0=f"{q('Retail Readiness Costs')}!$H${tA0}", A=f"{q('Retail Readiness Costs')}!$H${tA}", B=f"{q('Retail Readiness Costs')}!$H${tB}", C=f"{q('Retail Readiness Costs')}!$H${tC}")
sec(wr, r, 1, 11, "D. Inventory: first offset run (illustrative at the minimum run; the forecast sizes each scenario's run from pre-sale orders)"); r += 1
put(wr, f"A{r}", "Offset print cost per copy (from Assumptions)"); put(wr, f"E{r}", f"={A['bb_print']}", fmt=CUR2); r += 1
put(wr, f"A{r}", "Landed cost per copy incl. freight/duties"); put(wr, f"E{r}", f"={A['landed']}", fmt=CUR2); r += 1
put(wr, f"A{r}", "Minimum run (copies)"); put(wr, f"G{r}", f"={A['min_run']}", fmt=NUM0); r += 1
put(wr, f"A{r}", "Cash for a minimum first run", bold=True); put(wr, f"H{r}", f"=E{r-2}*G{r-1}", fmt=CUR0, bold=True)
RR["run_illus"] = f"{q('Retail Readiness Costs')}!$H${r}"; r += 1
put(wr, f"A{r}", "Landed cost as % of retail price (cost rules by channel: own site/FBA 35%, Faire/wholesale 25%, chain 20%)")
put(wr, f"H{r}", f"=E{r-3}/{A['bb_price']}", fmt=PCT1); r += 1
for lab_, pct_ in (("own site / FBA (35%)", 0.35), ("Faire and wholesale (25%)", 0.25), ("chain retail through a distributor or rep (20%)", 0.20)):
    put(wr, f"A{r}", f"   Most landed cost allowed: {lab_}")
    put(wr, f"H{r}", f"={A['bb_price']}*{pct_}", fmt=CUR2)
    put(wr, f"I{r}", f"=IF({A['landed']}<=H{r},\"passes\",\"fails\")")
    r += 1
r += 1
sec(wr, r, 1, 11, "E. Ongoing Wave 3 fixed costs (from Assumptions; charged monthly once the first run is printed)"); r += 1
put(wr, f"A{r}", "3PL monthly minimum / storage"); put(wr, f"H{r}", f"={A['tpl_min']}", fmt=CUR0); r += 1
put(wr, f"A{r}", "Amazon Seller Central Professional plan"); put(wr, f"H{r}", f"={A['seller_central']}", fmt=CUR2); r += 2
put(wr, f"A{r}", "Not priced here: distributor fees (about 20-30% of net receipts) or rep commissions (15-20% of wholesale), retailer co-op or placement, "
                 "and a retailer-directed ad budget. AlphaPlay LLC is never the direct vendor of record to a chain: books go through a distributor, "
                 "non-book items through a rep or vendor of record (section 4.8) [VERIFY].", font=F_NOTE)
wr.merge_cells(f"A{r}:K{r+1}"); wr[f"A{r}"].alignment = WRAP; wr.row_dimensions[r].height = 30
for c, w in zip("ABCDEFGHIJK", [70, 8, 10, 10, 12, 10, 6, 12, 22, 70, 14]):
    wr.column_dimensions[c].width = w
wr.freeze_panes = "B6"

# =====================================================================
# 36-MONTH FORECAST
# =====================================================================
wf = ws_["36-Month Forecast"]
FS = "36-Month Forecast"
title(wf, "36-month forecast: three scenarios, driven by traffic -> conversion -> orders -> order value, by channel and wave",
      "Traffic = trend (launch traffic compounded by monthly growth) x seasonality. Conversion ramps up over the review-ramp months. "
      "Net contribution = items x blended net per item from Unit Economics. Figures are planning estimates, not promises of income.")
wf.merge_cells("A2:P3"); wf["A2"].alignment = WRAP; wf.row_dimensions[2].height = 28
FC = 3
def mc(m): return CL(FC + m - 1)
YC = {1: CL(FC + 36), 2: CL(FC + 37), 3: CL(FC + 38), "T": CL(FC + 39)}
put(wf, "A4", "Model month #", bold=True); put(wf, "A5", "Month", bold=True); put(wf, "A6", "Model year", bold=True)
put(wf, "A7", "Seasonality: consumer", bold=True); put(wf, "A8", "Seasonality: school / group", bold=True)
for m in range(1, 37):
    c = mc(m)
    put(wf, f"{c}4", m, fmt="0")
    put(wf, f"{c}5", f"=DATE(YEAR({A['start']}),MONTH({A['start']})+{c}4-1,1)", fmt=DATEF)
    put(wf, f"{c}6", f"=INT(({c}4-1)/12)+1", fmt="0")
    put(wf, f"{c}7", f"=INDEX({A['season_c']},MONTH({c}5))/AVERAGE({A['season_c']})", fmt=NUM2)
    put(wf, f"{c}8", f"=INDEX({A['season_s']},MONTH({c}5))/AVERAGE({A['season_s']})", fmt=NUM2)
hdr(wf, 5, FC, FC + 39)
for m in range(1, 37):
    wf[f"{mc(m)}5"].number_format = DATEF
for k, lab in ((1, "Year 1"), (2, "Year 2"), (3, "Year 3"), ("T", "36 months")):
    wf[f"{YC[k]}5"].value = lab
    wf[f"{YC[k]}4"].value = "Oct-Sep" if k != "T" else "Total"
    wf[f"{YC[k]}4"].font = F_NOTE
put(wf, "B4", "Unit / note", font=F_NOTE)

FR = {}   # FR[s][key] -> row
BLOCK_START = 10

def year_cols(ws, row, kind, fmt):
    """kind: 'sum' | 'end' | None"""
    first, last = mc(1), mc(36)
    for k in (1, 2, 3, "T"):
        c = YC[k]
        if kind == "sum":
            if k == "T":
                f = f"=SUM({first}{row}:{last}{row})"
            else:
                f = f"=SUMIF(${first}$6:${last}$6,{k},{first}{row}:{last}{row})"
        elif kind == "end":
            mm = {1: 12, 2: 24, 3: 36, "T": 36}[k]
            f = f"={mc(mm)}{row}"
        else:
            continue
        put(ws, f"{c}{row}", f, fmt=fmt)
        ws[f"{c}{row}"].fill = TOT_FILL

def build_block(s, start):
    rows = {}
    keys = ["hdr", "print", "presale", "need", "go", "run", "blank0", "prod_hdr", "prod"]
    for code, *_ in CH:
        keys += [f"{code}_hdr", f"{code}_act", f"{code}_trend", f"{code}_traffic", f"{code}_cvr", f"{code}_orders",
                 f"{code}_units", f"{code}_aov", f"{code}_gross", f"{code}_contrib"]
        if code == "BOARD":
            keys += ["BOARD_demand"]
    keys += ["email_hdr", "sessions", "email_new", "email_churn", "email_end",
             "tot_hdr", "orders", "units", "cum_orders", "cum_units", "gross", "contrib", "margin",
             "ads", "opex", "wavefix", "netop", "t12", "startup", "waveone", "netafter", "cumnet",
             "inv_hdr", "phys", "cumphys", "copies", "inv", "cumcopies", "onhand",
             "flag_hdr", "flag_first", "flag_sust", "flag_t12"]
    for i, k in enumerate(keys):
        rows[k] = start + i
    FR[s] = rows
    S = lambda key: A[key][s]
    rr = rows
    Lm = lambda code: f"MAX({S(code+'_launch')},{A['first_sale']})"
    hdr(wf, rr["hdr"], 1, FC + 39, [f"{SCN[s].upper()} SCENARIO"])
    # ---- board-book go / no-go scalars
    put(wf, f"A{rr['print']}", "Board-book print decision month (pre-sale ends), model month # (0 = board book off)")
    put(wf, f"B{rr['print']}", f"=IF({S('BOARD_inc')}=1,{Lm('BOARD')}+{A['presale_len']},0)", fmt="0")
    put(wf, f"A{rr['presale']}", "Pre-sale copies ordered before the print decision (demand)")
    dmd = rr["BOARD_demand"]
    put(wf, f"B{rr['presale']}", f"=IF($B${rr['print']}=0,0,SUMPRODUCT(($C$4:${mc(36)}$4>={Lm('BOARD')})*($C$4:${mc(36)}$4<$B${rr['print']})*($C${dmd}:${mc(36)}${dmd})))", fmt=NUM0)
    put(wf, f"A{rr['need']}", "Go line: pre-sale copies needed to fund the planned run + print-month costs + 15% buffer (BLIND-SPOTS #16)")
    put(wf, f"B{rr['need']}", f"=IF($B${rr['print']}=0,0,ROUNDUP(({A['min_run']}*{A['landed']}+{RR['A']})*(1+{A['presale_buf']})/({A['bb_price']}*(1-{A['shop_pct']})-{A['shop_fix']}-{A['pick']}-{A['ship_sub']}),0))", fmt=NUM0)
    put(wf, f"A{rr['go']}", "Go (1) / no-go (0): print only if pre-sale copies reach the go line; otherwise refund the pre-sale")
    put(wf, f"B{rr['go']}", f"=IF(AND($B${rr['print']}>0,$B${rr['presale']}>=$B${rr['need']}),1,0)", fmt="0")
    put(wf, f"A{rr['run']}", "First offset run = max(planned run, pre-sale x (1 + buffer)), rounded up to 100; 0 if no-go")
    put(wf, f"B{rr['run']}", f"=IF($B${rr['go']}=0,0,MAX({A['min_run']},ROUNDUP($B${rr['presale']}*(1+{A['buffer']})/100,0)*100))", fmt=NUM0)
    for k in ("print", "presale", "need", "go", "run"):
        wf[f"B{rr[k]}"].fill = TOT_FILL
    GO = f"$B${rr['go']}"; PM = f"$B${rr['print']}"
    # ---- digital catalog
    sec(wf, rr["prod_hdr"], 1, FC + 39, "Digital catalog (shared by the own site, Etsy and the merchant of record)")
    put(wf, f"A{rr['prod']}", "   Digital products live"); put(wf, f"B{rr['prod']}", "products", font=F_NOTE)
    for m in range(1, 37):
        c = mc(m)
        put(wf, f"{c}{rr['prod']}", f"=IF({c}$4<{A['first_sale']},0,MIN({S('prod_cap')},{S('prod_start')}+{S('prod_add')}*({c}$4-{A['first_sale']})))", fmt=NUM1)
    for code, name, tl, lag, seas, src in CH:
        grp = GROUP[code]
        sec(wf, rr[f"{code}_hdr"], 1, FC + 39, name)
        labels = {
            "act": ("Active (1 = live)", "flag"), "trend": ("Traffic trend (before seasonality)", "visits"),
            "traffic": (tl, "visits"), "cvr": ("Conversion rate (with review ramp)", "%"),
            "orders": ("Orders", "orders"), "units": ("Items sold", "items"), "aov": ("Average order value", "$"),
            "gross": ("Gross sales (price paid by customers)", "$"), "contrib": ("Net contribution to AlphaPlay", "$"),
        }
        if grp == "P":
            labels["trend"] = ("Sales-per-product index (1.00 in the launch month)", "index")
            labels["traffic"] = (tl, "prod-mo")
            labels["cvr"] = ("Orders per product per month (with review ramp)", "orders")
        if grp == "T":
            labels["trend"] = ("Titles live", "titles")
            labels["traffic"] = (tl, "title-mo")
            labels["cvr"] = ("Units per title per month (with review ramp)", "units")
        if code == "COURSE":
            labels["trend"] = ("Subscribers reached (list last month x reach)", "people")
        if code == "BOARD":
            labels["orders"] = ("Orders recognized (x go flag; a missed pre-sale is refunded)", "orders")
        for k, (lab, unit) in labels.items():
            put(wf, f"A{rr[code+'_'+k]}", "   " + lab)
            put(wf, f"B{rr[code+'_'+k]}", unit, font=F_NOTE)
        if code == "BOARD":
            put(wf, f"A{rr['BOARD_demand']}", "   Items ordered (demand before the go / no-go test)"); put(wf, f"B{rr['BOARD_demand']}", "items", font=F_NOTE)
        seas_row = 7 if seas == "c" else 8
        L = Lm(code)
        for m in range(1, 37):
            c, p = mc(m), mc(m - 1) if m > 1 else None
            ra = rr[f"{code}_act"]
            put(wf, f"{c}{ra}", f"=IF(AND({S(code+'_inc')}=1,{c}$4>={L}),1,0)", fmt="0")
            rt_ = rr[f"{code}_trend"]
            if grp == "P":
                g = f"CHOOSE({c}$6,{S(code+'_g1')},{S(code+'_g2')},{S(code+'_g3')})"
                f = f"=IF({c}{ra}=0,0,1)" if m == 1 else f"=IF({c}{ra}=0,0,IF({c}$4={L},1,{p}{rt_}*(1+{g})))"
                tf = f"={c}{rr['prod']}*{c}{rt_}*{c}${seas_row}"
                fmt_t = NUM2
            elif grp == "T":
                f = f"=IF({c}{ra}=0,0,MIN({S(code+'_tcap')},{S(code+'_base')}+{S(code+'_tadd')}*({c}$4-{L})))"
                tf = f"={c}{rt_}*{c}${seas_row}"
                fmt_t = NUM1
            elif code == "COURSE":
                f = f"=IF({c}{ra}=0,0,{('0' if m == 1 else p + str(rr['email_end']))}*{S('reach')})"
                tf = f"={c}{rt_}*{c}${seas_row}"
                fmt_t = NUM0
            else:
                g = f"CHOOSE({c}$6,{S(code+'_g1')},{S(code+'_g2')},{S(code+'_g3')})"
                f = f"=IF({c}{ra}=0,0,{S(code+'_base')})" if m == 1 else f"=IF({c}{ra}=0,0,IF({c}$4={L},{S(code+'_base')},{p}{rt_}*(1+{g})))"
                tf = f"={c}{rt_}*{c}${seas_row}"
                fmt_t = NUM0
            put(wf, f"{c}{rt_}", f, fmt=fmt_t)
            put(wf, f"{c}{rr[code+'_traffic']}", tf, fmt=NUM1 if grp in ("P", "T") else NUM0)
            put(wf, f"{c}{rr[code+'_cvr']}", f"={S(code+'_cvr')}*MIN(1,({c}$4-{L}+1)/{A['ramp']})*{c}{ra}", fmt=NUM2 if grp in ("P", "T") else PCT2)
            if code == "BOARD":
                put(wf, f"{c}{rr['BOARD_orders']}", f"={c}{rr['BOARD_traffic']}*{c}{rr['BOARD_cvr']}*{GO}", fmt=NUM1)
                put(wf, f"{c}{rr['BOARD_demand']}", f"={c}{rr['BOARD_traffic']}*{c}{rr['BOARD_cvr']}*{S('BOARD_items')}", fmt=NUM1)
            else:
                put(wf, f"{c}{rr[code+'_orders']}", f"={c}{rr[code+'_traffic']}*{c}{rr[code+'_cvr']}", fmt=NUM1)
            put(wf, f"{c}{rr[code+'_units']}", f"={c}{rr[code+'_orders']}*{S(code+'_items')}", fmt=NUM1)
            put(wf, f"{c}{rr[code+'_aov']}", f"={UE[code]['price']}*{S(code+'_items')}*{c}{ra}", fmt=CUR2)
            put(wf, f"{c}{rr[code+'_gross']}", f"={c}{rr[code+'_units']}*{UE[code]['price']}", fmt=CUR0)
            if code == "BOARD":
                put(wf, f"{c}{rr['BOARD_contrib']}", f"={c}{rr['BOARD_units']}*IF({c}$4<{PM},{q('Unit Economics')}!$M${UE_ROW['BB_site']},{UE['BOARD']['net']})", fmt=CUR0)
            else:
                put(wf, f"{c}{rr[code+'_contrib']}", f"={c}{rr[code+'_units']}*{UE[code]['net']}", fmt=CUR0)
        for k, kind, fmt in (("traffic", "sum", NUM0), ("orders", "sum", NUM0), ("units", "sum", NUM0),
                             ("gross", "sum", CUR0), ("contrib", "sum", CUR0)):
            year_cols(wf, rr[f"{code}_{k}"], kind, fmt)
        if code == "BOARD":
            year_cols(wf, rr["BOARD_demand"], "sum", NUM0)
    # email
    sec(wf, rr["email_hdr"], 1, FC + 39, "Email list (owned audience)")
    for k, lab, unit in (("sessions", "   Implied own-site sessions (site product-months x orders per product / site conversion)", "visits"),
                         ("email_new", "   New subscribers (own-site visitors + non-Etsy buyers via bonus QR)", "people"),
                         ("email_churn", "   Unsubscribes", "people"), ("email_end", "   Subscribers at month end", "people")):
        put(wf, f"A{rr[k]}", lab); put(wf, f"B{rr[k]}", unit, font=F_NOTE)
    buyer_codes = ["SITE", "KDP", "INGRAM", "MOR", "BOARD"]   # Etsy and TpT editions carry no URL or QR code (BRAND.md)
    for m in range(1, 37):
        c, p = mc(m), (mc(m - 1) if m > 1 else None)
        put(wf, f"{c}{rr['sessions']}", f"={c}{rr['SITE_traffic']}*{S('SITE_cvr')}/{S('site_cvr')}", fmt=NUM0)
        orders_sum = "+".join(f"{c}{rr[x+'_orders']}" for x in buyer_codes)
        put(wf, f"{c}{rr['email_new']}", f"={c}{rr['sessions']}*{S('signup')}+({orders_sum})*{S('optin')}", fmt=NUM0)
        put(wf, f"{c}{rr['email_churn']}", "=0" if m == 1 else f"={p}{rr['email_end']}*{S('churn')}", fmt=NUM0)
        put(wf, f"{c}{rr['email_end']}", f"={c}{rr['email_new']}-{c}{rr['email_churn']}" + ("" if m == 1 else f"+{p}{rr['email_end']}"), fmt=NUM0)
    year_cols(wf, rr["sessions"], "sum", NUM0)
    year_cols(wf, rr["email_new"], "sum", NUM0); year_cols(wf, rr["email_churn"], "sum", NUM0); year_cols(wf, rr["email_end"], "end", NUM0)
    # totals
    sec(wf, rr["tot_hdr"], 1, FC + 39, "Totals and operating result")
    TL = {
        "orders": ("Total orders", "orders", NUM0, "sum"), "units": ("Total items sold", "items", NUM0, "sum"),
        "cum_orders": ("Cumulative orders", "orders", NUM0, "end"), "cum_units": ("Cumulative items sold", "items", NUM0, "end"),
        "gross": ("Total gross sales (customer prices, excl. sales tax/VAT)", "$", CUR0, "sum"),
        "contrib": ("Total net contribution (after platform, payment, print/POD and fulfilment costs)", "$", CUR0, "sum"),
        "margin": ("Net contribution as % of gross sales", "%", PCT1, None),
        "ads": ("Paid advertising (optional tests; no revenue credit)", "$", CUR0, "sum"), "opex": ("Operating costs (Monthly Operating Costs tab)", "$", CUR0, "sum"),
        "wavefix": ("Wave fixed costs (3PL minimum, Seller Central, retail EDI/insurance uplift)", "$", CUR0, "sum"),
        "netop": ("NET OPERATING RESULT (before one-time costs)", "$", CUR0, "sum"),
        "t12": ("   Trailing-12-month operating result (months available so far)", "$", CUR0, None),
        "startup": ("One-time startup costs (Startup Costs tab, included items)", "$", CUR0, "sum"),
        "waveone": ("One-time wave costs (board-book pre-sale/print, retail readiness, school setup)", "$", CUR0, "sum"),
        "netafter": ("Net result after one-time costs", "$", CUR0, "sum"),
        "cumnet": ("Cumulative net result", "$", CUR0, "end"),
        "phys": ("   Physical items sold from held stock (board book + retail)", "items", NUM0, "sum"),
        "cumphys": ("   Cumulative physical items", "items", NUM0, "end"),
        "copies": ("   Copies ordered from the printer (first run + reorders at the reorder point)", "copies", NUM0, "sum"),
        "inv": ("   Inventory purchases (cash; not in operating result)", "$", CUR0, "sum"),
        "cumcopies": ("   Cumulative copies ordered", "copies", NUM0, "end"),
        "onhand": ("   Copies at the 3PL (negative = pre-sale copies still owed)", "copies", NUM0, "end"),
        "flag_first": ("   Month # if monthly operating result >= 0", "month", "0", None),
        "flag_sust": ("   Month # if monthly operating result stays >= 0 through month 36", "month", "0", None),
        "flag_t12": ("   Month # if trailing-12-month result stays >= 0 through month 36 (headline)", "month", "0", None),
    }
    sec(wf, rr["inv_hdr"], 1, FC + 39, "Held inventory (board book and retail; stock sits at a 3PL or Amazon, never with the founder)")
    sec(wf, rr["flag_hdr"], 1, FC + 39, "Break-even helper rows")
    for k, (lab, unit, fmt, kind) in TL.items():
        put(wf, f"A{rr[k]}", lab, bold=k in ("netop", "gross", "contrib"))
        put(wf, f"B{rr[k]}", unit, font=F_NOTE)
    codes = [c[0] for c in CH]
    for m in range(1, 37):
        c, p = mc(m), (mc(m - 1) if m > 1 else None)
        put(wf, f"{c}{rr['orders']}", "=" + "+".join(f"{c}{rr[x+'_orders']}" for x in codes), fmt=NUM0)
        put(wf, f"{c}{rr['units']}", "=" + "+".join(f"{c}{rr[x+'_units']}" for x in codes), fmt=NUM0)
        put(wf, f"{c}{rr['cum_orders']}", f"={c}{rr['orders']}" + ("" if m == 1 else f"+{p}{rr['cum_orders']}"), fmt=NUM0)
        put(wf, f"{c}{rr['cum_units']}", f"={c}{rr['units']}" + ("" if m == 1 else f"+{p}{rr['cum_units']}"), fmt=NUM0)
        put(wf, f"{c}{rr['gross']}", "=" + "+".join(f"{c}{rr[x+'_gross']}" for x in codes), fmt=CUR0)
        put(wf, f"{c}{rr['contrib']}", "=" + "+".join(f"{c}{rr[x+'_contrib']}" for x in codes), fmt=CUR0)
        put(wf, f"{c}{rr['margin']}", f"=IF({c}{rr['gross']}=0,0,{c}{rr['contrib']}/{c}{rr['gross']})", fmt=PCT1)
        put(wf, f"{c}{rr['ads']}", f"=IF({c}$4>={S('ads_start')},CHOOSE({c}$6,{S('ads1')},{S('ads2')},{S('ads3')}),0)", fmt=CUR0)
        put(wf, f"{c}{rr['opex']}", f"={OPTOT(m)}", fmt=CUR0)
        put(wf, f"{c}{rr['wavefix']}",
            f"=IF(AND({GO}=1,{c}$4>={PM}),{A['tpl_min']}+{A['seller_central']},0)+IF({c}{rr['RETAIL_act']}=1,{RR['C']},0)", fmt=CUR0)
        put(wf, f"{c}{rr['netop']}", f"={c}{rr['contrib']}-{c}{rr['ads']}-{c}{rr['opex']}-{c}{rr['wavefix']}", fmt=CUR0)
        put(wf, f"{c}{rr['t12']}", f"=SUM({mc(max(1, m - 11))}{rr['netop']}:{c}{rr['netop']})", fmt=CUR0)
        put(wf, f"{c}{rr['startup']}", f"=SUMPRODUCT(({SU_RANGE['F']}={c}$4)*{SU_RANGE['G']}*{SU_RANGE['E']})", fmt=CUR0)
        put(wf, f"{c}{rr['waveone']}",
            f"=IF(AND({S('BOARD_inc')}=1,{c}$4=MAX(1,{Lm('BOARD')}-1)),{RR['A0']},0)"
            f"+IF(AND({GO}=1,{c}$4={PM}),{RR['A']},0)"
            f"+IF(AND({S('BOARD_inc')}=1,{GO}=0,{c}$4={PM}),{A['presale_fail']},0)"
            f"+IF(AND({S('RETAIL_inc')}=1,{c}$4=MAX(1,{Lm('RETAIL')}-{A['retail_lead']})),{RR['B']},0)"
            f"+IF(AND({S('SCHOOL_inc')}=1,{c}$4={Lm('SCHOOL')}),{A['school_setup']},0)", fmt=CUR0)
        put(wf, f"{c}{rr['netafter']}", f"={c}{rr['netop']}-{c}{rr['startup']}-{c}{rr['waveone']}", fmt=CUR0)
        put(wf, f"{c}{rr['cumnet']}", f"={c}{rr['netafter']}" + ("" if m == 1 else f"+{p}{rr['cumnet']}"), fmt=CUR0)
        put(wf, f"{c}{rr['phys']}", f"={c}{rr['BOARD_units']}+{c}{rr['RETAIL_units']}", fmt=NUM0)
        put(wf, f"{c}{rr['cumphys']}", f"={c}{rr['phys']}" + ("" if m == 1 else f"+{p}{rr['cumphys']}"), fmt=NUM0)
        run = f"$B${rr['run']}"
        prev_on = "0" if m == 1 else f"{p}{rr['onhand']}"
        put(wf, f"{c}{rr['copies']}",
            f"=IF({run}=0,0,IF({c}$4={PM},{run},IF({c}$4>{PM},IF({prev_on}-{c}{rr['phys']}<{A['reorder_lead']}*{c}{rr['phys']},{run},0),0)))", fmt=NUM0)
        put(wf, f"{c}{rr['inv']}", f"={c}{rr['copies']}*{A['landed']}", fmt=CUR0)
        put(wf, f"{c}{rr['cumcopies']}", f"={c}{rr['copies']}" + ("" if m == 1 else f"+{p}{rr['cumcopies']}"), fmt=NUM0)
        put(wf, f"{c}{rr['onhand']}", f"={c}{rr['cumcopies']}-{c}{rr['cumphys']}", fmt=NUM0)
        put(wf, f"{c}{rr['flag_first']}", f"=IF({c}{rr['netop']}>=0,{c}$4,\"\")", fmt="0")
        put(wf, f"{c}{rr['flag_sust']}", f"=IF(COUNTIF({c}{rr['netop']}:${mc(36)}{rr['netop']},\"<0\")=0,{c}$4,\"\")", fmt="0")
        put(wf, f"{c}{rr['flag_t12']}", f"=IF(COUNTIF({c}{rr['t12']}:${mc(36)}{rr['t12']},\"<0\")=0,{c}$4,\"\")", fmt="0")
    for k, (lab, unit, fmt, kind) in TL.items():
        if kind:
            year_cols(wf, rr[k], kind, fmt)
    for k in ("netop", "gross", "contrib"):
        for cc in range(1, FC + 40):
            wf.cell(row=rr[k], column=cc).font = Font(name=AR, bold=True, color=wf.cell(row=rr[k], column=cc).font.color)
            wf.cell(row=rr[k], column=cc).border = TOP
    return start + len(keys) + 1

nxt = BLOCK_START
for s in range(3):
    nxt = build_block(s, nxt)
wf.column_dimensions["A"].width = 66
wf.column_dimensions["B"].width = 11
for m in range(1, 37):
    wf.column_dimensions[mc(m)].width = 10
for k in YC.values():
    wf.column_dimensions[k].width = 12
wf.freeze_panes = "C9"

# =====================================================================
# CASH FLOW
# =====================================================================
wc = ws_["Cash Flow"]
title(wc, "Cash flow: payout delays, inventory purchases, one-time costs and the tax reserve",
      "Marketplace payouts arrive after the sale month (KDP about 60 days, IngramSpark about 90 days; see Assumptions section 4). "
      "Costs are negative. Sales tax and VAT are pass-through and excluded. Founder capital goes in whenever the operating account would fall below zero, so the cumulative founder capital row is the funding need. "
      "The tax reserve holds 25% of cumulative profit after one-time costs (none while cumulative results are negative); the accountant sets the real figure.")
wc.merge_cells("A2:P3"); wc["A2"].alignment = WRAP; wc.row_dimensions[2].height = 28
put(wc, "A4", "Model month #", bold=True); put(wc, "A5", "Month", bold=True); put(wc, "A6", "Model year", bold=True)
for m in range(1, 37):
    c = mc(m)
    put(wc, f"{c}4", f"={q(FS)}!{c}4", fmt="0")
    put(wc, f"{c}5", f"={q(FS)}!{c}5", fmt=DATEF)
    put(wc, f"{c}6", f"={q(FS)}!{c}6", fmt="0")
hdr(wc, 5, FC, FC + 39)
for m in range(1, 37):
    wc[f"{mc(m)}5"].number_format = DATEF
for k, lab in ((1, "Year 1"), (2, "Year 2"), (3, "Year 3"), ("T", "36 months")):
    wc[f"{YC[k]}5"].value = lab
CFR = {}
r = 8
for s in range(3):
    rr = {}
    keys = ["hdr"] + [f"pay_{c[0]}" for c in CH] + ["pay_tot", "card", "inv", "ads", "opex", "wavefix", "startup", "waveone",
                                                     "net", "resv", "pre", "founder", "opbal", "resbal", "total", "cumfounder",
                                                     "target", "gap", "flag_need", "flag_cap"]
    for i, k in enumerate(keys):
        rr[k] = r + i
    CFR[s] = rr
    fr = FR[s]
    hdr(wc, rr["hdr"], 1, FC + 39, [f"{SCN[s].upper()} SCENARIO"])
    lab = {"pay_tot": "Total payouts received", "card": "Existing business-card balance paid off (month 1)",
           "inv": "Inventory purchases (offset print runs, landed)", "ads": "Paid advertising", "opex": "Operating costs",
           "wavefix": "Wave fixed costs", "startup": "One-time startup costs", "waveone": "One-time wave costs",
           "net": "NET CASH FLOW before tax reserve and founder capital", "resv": "Transfer to (-) or from (+) the tax reserve account",
           "pre": "   Operating balance before founder capital", "founder": "FOUNDER CAPITAL IN (planned month-1 amount + any top-up that keeps the balance at zero or above)",
           "opbal": "OPERATING ACCOUNT BALANCE (month end)", "resbal": "Tax reserve account balance (25% of cumulative profit after one-time costs, if positive)",
           "total": "Total cash (both accounts)", "cumfounder": "CUMULATIVE FOUNDER CAPITAL (the funding need)",
           "target": "Reserve target (months x fixed costs incl. ads)", "gap": "Operating balance above / (below) reserve target",
           "flag_need": "   Helper: month # if founder capital goes in", "flag_cap": "   Helper: month # if cumulative founder capital is above the household-money cap"}
    for code, name, *_ in CH:
        lab[f"pay_{code}"] = f"   Payout: {name}"
    for k, t in lab.items():
        put(wc, f"A{rr[k]}", t, bold=k in ("net", "opbal", "pay_tot", "founder", "cumfounder"))
    for m in range(1, 37):
        c, p = mc(m), (mc(m - 1) if m > 1 else None)
        for code, *_ in CH:
            lag = A[f"lag_{code}"]
            cr = fr[f"{code}_contrib"]; ur = fr[f"{code}_units"]
            put(wc, f"{c}{rr['pay_'+code]}",
                f"=IF({c}$4-{lag}>=1,INDEX({q(FS)}!$C${cr}:${mc(36)}${cr},1,{c}$4-{lag})+INDEX({q(FS)}!$C${ur}:${mc(36)}${ur},1,{c}$4-{lag})*{UE[code]['landed']},0)",
                fmt=CUR0)
        put(wc, f"{c}{rr['pay_tot']}", f"=SUM({c}{rr['pay_SITE']}:{c}{rr['pay_RETAIL']})", fmt=CUR0)
        put(wc, f"{c}{rr['card']}", f"=-{A['card']}" if m == 1 else "=0", fmt=CUR0)
        for k in ("inv", "ads", "opex", "wavefix", "startup", "waveone"):
            put(wc, f"{c}{rr[k]}", f"=-{q(FS)}!{c}{fr[k]}", fmt=CUR0)
        put(wc, f"{c}{rr['net']}", f"=SUM({c}{rr['pay_tot']}:{c}{rr['waveone']})", fmt=CUR0)
        prev_res = "0" if m == 1 else f"{p}{rr['resbal']}"
        put(wc, f"{c}{rr['resbal']}", f"={A['taxres']}*MAX(0,{q(FS)}!{c}{fr['cumnet']})", fmt=CUR0)
        put(wc, f"{c}{rr['resv']}", f"={prev_res}-{c}{rr['resbal']}", fmt=CUR0)
        prev_op = A["open"] if m == 1 else f"{p}{rr['opbal']}"
        put(wc, f"{c}{rr['pre']}", f"={prev_op}+{c}{rr['net']}+{c}{rr['resv']}", fmt=CUR0)
        planned = f"{A['owner']}" if m == 1 else "0"
        put(wc, f"{c}{rr['founder']}", f"={planned}+MAX(0,-({c}{rr['pre']}+{planned}))", fmt=CUR0)
        put(wc, f"{c}{rr['opbal']}", f"={c}{rr['pre']}+{c}{rr['founder']}", fmt=CUR0)
        put(wc, f"{c}{rr['total']}", f"={c}{rr['opbal']}+{c}{rr['resbal']}", fmt=CUR0)
        put(wc, f"{c}{rr['cumfounder']}", f"={c}{rr['founder']}" + ("" if m == 1 else f"+{p}{rr['cumfounder']}"), fmt=CUR0)
        put(wc, f"{c}{rr['target']}", f"={A['resmo']}*({q(FS)}!{c}{fr['opex']}+{q(FS)}!{c}{fr['wavefix']}+{q(FS)}!{c}{fr['ads']})", fmt=CUR0)
        put(wc, f"{c}{rr['gap']}", f"={c}{rr['opbal']}-{c}{rr['target']}", fmt=CUR0)
        put(wc, f"{c}{rr['flag_need']}", f"=IF({c}{rr['founder']}>0.5,{c}$4,\"\")", fmt="0")
        put(wc, f"{c}{rr['flag_cap']}", f"=IF({c}{rr['cumfounder']}>{A['cap']},{c}$4,\"\")", fmt="0")
    for k in [f"pay_{c[0]}" for c in CH] + ["pay_tot", "card", "inv", "ads", "opex", "wavefix", "startup", "waveone", "net", "resv", "founder"]:
        year_cols(wc, rr[k], "sum", CUR0)
    for k in ("opbal", "resbal", "total", "cumfounder", "target", "gap"):
        year_cols(wc, rr[k], "end", CUR0)
    for k in ("net", "opbal", "founder", "cumfounder"):
        for cc in range(1, FC + 40):
            cell = wc.cell(row=rr[k], column=cc)
            cell.font = Font(name=AR, bold=True, color=cell.font.color); cell.border = TOP
    r = r + len(keys) + 1
wc.column_dimensions["A"].width = 62
wc.column_dimensions["B"].width = 4
for m in range(1, 37):
    wc.column_dimensions[mc(m)].width = 10
for k in YC.values():
    wc.column_dimensions[k].width = 12
wc.freeze_panes = "C7"

# =====================================================================
# BREAK-EVEN
# =====================================================================
wb_ = ws_["Break-even"]
title(wb_, "Break-even: when, and how many orders or units",
      "Headline measure: the month from which the trailing-12-month operating result stays at or above zero through month 36, so annual bills (October renewals, April filings) do not distort it. "
      "Operating results exclude one-time startup, wave and inventory costs. The funding need is the cumulative founder capital on Cash Flow.")
wb_.merge_cells("A2:E3"); wb_["A2"].alignment = WRAP; wb_.row_dimensions[2].height = 28
hdr(wb_, 5, 1, 5, ["Measure", "Conservative", "Expected", "Strong", "Note"], 22)
BE = {}
def dt(x):
    return f"=IF(ISNUMBER({x}),DATE(YEAR({A['start']}),MONTH({A['start']})+{x}-1,1),\"Not within 36 months\")"
rows_be = []
r = 6
def be_row(key, label, fn, fmt, note=""):
    global r
    put(wb_, f"A{r}", label)
    for s in range(3):
        put(wb_, 'BCD'[s] + str(r), fn(s), fmt=fmt)
    put(wb_, f"E{r}", note, font=F_NOTE)
    BE[key] = r
    r += 1
F36 = mc(36)
def fref(s, key, col=None):
    return f"{q(FS)}!${mc(1)}${FR[s][key]}:${F36}${FR[s][key]}"
def cfref(s, key):
    return f"{q('Cash Flow')}!${mc(1)}${CFR[s][key]}:${F36}${CFR[s][key]}"
sec(wb_, r, 1, 5, "When"); r += 1
be_row("t12_m", "Sustained break-even, trailing 12 months (month #) - HEADLINE",
       lambda s: f"=IF(COUNT({fref(s,'flag_t12')})=0,\"Not reached\",MIN({fref(s,'flag_t12')}))", "0",
       "Trailing-12-month operating result at or above zero from this month through month 36.")
be_row("t12_d", "   ...calendar month", lambda s: dt(f"{'BCD'[s]}{BE['t12_m']}"), DATEF)
be_row("first_m", "First month with a monthly operating result >= 0 (month #)",
       lambda s: f"=IF(COUNT({fref(s,'flag_first')})=0,\"Not reached\",MIN({fref(s,'flag_first')}))", "0")
be_row("first_d", "   ...calendar month", lambda s: dt(f"{'BCD'[s]}{BE['first_m']}"), DATEF)
be_row("sust_m", "Every later month >= 0 (month #; strict test, sensitive to annual bills)",
       lambda s: f"=IF(COUNT({fref(s,'flag_sust')})=0,\"Not reached\",MIN({fref(s,'flag_sust')}))", "0")
be_row("sust_d", "   ...calendar month", lambda s: dt(f"{'BCD'[s]}{BE['sust_m']}"), DATEF)
be_row("peak", "Founder capital needed through month 36 (funding need)",
       lambda s: f"={q('Cash Flow')}!{F36}{CFR[s]['cumfounder']}", CUR0, "Cumulative founder capital on Cash Flow.")
be_row("need12", "   ...of which by month 12 (Sep 2027)", lambda s: f"={q('Cash Flow')}!{mc(12)}{CFR[s]['cumfounder']}", CUR0)
be_row("need24", "   ...of which by month 24 (Sep 2028)", lambda s: f"={q('Cash Flow')}!{mc(24)}{CFR[s]['cumfounder']}", CUR0)
be_row("last_need", "Last month founder capital goes in (month #)",
       lambda s: f"=IF(COUNT({cfref(s,'flag_need')})=0,\"None\",MAX({cfref(s,'flag_need')}))", "0")
be_row("cash_m", "Self-funding from (month #): no founder capital needed after this month",
       lambda s: f"=IF(ISNUMBER({'BCD'[s]}{BE['last_need']}),IF({'BCD'[s]}{BE['last_need']}<36,{'BCD'[s]}{BE['last_need']}+1,\"Not within 36 months\"),1)", "0")
be_row("cash_d", "   ...calendar month", lambda s: dt(f"{'BCD'[s]}{BE['cash_m']}"), DATEF)
be_row("cap_m", "Month the household-money cap would be passed (hard stop and re-forecast)",
       lambda s: f"=IF(COUNT({cfref(s,'flag_cap')})=0,\"Not passed\",MIN({cfref(s,'flag_cap')}))", "0",
       "Cap is a placeholder until the founder sets it (Assumptions).")
be_row("cap_d", "   ...calendar month", lambda s: dt(f"{'BCD'[s]}{BE['cap_m']}"), DATEF)
r += 1
sec(wb_, r, 1, 5, "How many (volume at break-even)"); r += 1
def at_month(s, key, mcell):
    return f"=IF(ISNUMBER({mcell}),INDEX({fref(s,key)},1,{mcell}),\"-\")"
be_row("cum_orders_be", "Cumulative orders by the headline break-even month",
       lambda s: at_month(s, "cum_orders", f"{'BCD'[s]}{BE['t12_m']}"), NUM0)
be_row("cum_units_be", "Cumulative items sold by the headline break-even month",
       lambda s: at_month(s, "cum_units", f"{'BCD'[s]}{BE['t12_m']}"), NUM0)
be_row("orders_be", "Orders in the headline break-even month",
       lambda s: at_month(s, "orders", f"{'BCD'[s]}{BE['t12_m']}"), NUM0)
r += 1
sec(wb_, r, 1, 5, "Orders needed each month to cover fixed costs (operating costs + wave fixed costs + ads)"); r += 1
for mm in (6, 12, 24, 36):
    c = mc(mm)
    be_row(f"fixed_{mm}", f"Month {mm}: fixed costs",
           lambda s, c=c: f"={q(FS)}!{c}{FR[s]['opex']}+{q(FS)}!{c}{FR[s]['wavefix']}+{q(FS)}!{c}{FR[s]['ads']}", CUR0)
    be_row(f"cpo_{mm}", f"Month {mm}: net contribution per order",
           lambda s, c=c: f"=IF({q(FS)}!{c}{FR[s]['orders']}=0,0,{q(FS)}!{c}{FR[s]['contrib']}/{q(FS)}!{c}{FR[s]['orders']})", CUR2)
    be_row(f"need_{mm}", f"Month {mm}: orders needed to cover fixed costs",
           lambda s, mm=mm: f"=IF({'BCD'[s]}{BE[f'cpo_{mm}']}<=0,\"-\",{'BCD'[s]}{BE[f'fixed_{mm}']}/{'BCD'[s]}{BE[f'cpo_{mm}']})", NUM0)
    be_row(f"act_{mm}", f"Month {mm}: orders the scenario forecasts",
           lambda s, c=c: f"={q(FS)}!{c}{FR[s]['orders']}", NUM0)
r += 1
sec(wb_, r, 1, 5, "Single-product view: units per month of ONE product that would cover the Expected month-12 fixed costs"); r += 1
hdr(wb_, r, 1, 5, ["Product and channel", "Net per unit ($)", "Units per month needed", "Units per day", "Source row"]); r += 1
fixed12 = f"$C${BE['fixed_12']}"
for pid in ("ETSY_routine", "ETSY_bored", "ETSY_family", "ETSY_busy", "SITE_family", "KDP_plays", "CRS_single", "BB_site"):
    ur = UE_ROW[pid]
    put(wb_, f"A{r}", f"={q('Unit Economics')}!B{ur}&\" - \"&{q('Unit Economics')}!C{ur}")
    put(wb_, f"B{r}", f"={q('Unit Economics')}!M{ur}", fmt=CUR2)
    put(wb_, f"C{r}", f"=IF(B{r}<=0,\"-\",{fixed12}/B{r})", fmt=NUM0)
    put(wb_, f"D{r}", f"=IF(B{r}<=0,\"-\",C{r}/30)", fmt=NUM1)
    put(wb_, f"E{r}", f"Unit Economics row {ur}", font=F_NOTE)
    r += 1
r += 1
sec(wb_, r, 1, 5, "Retail wave self-funding check (Faire and Walmart Marketplace; Target Plus is weight 0 until invited)"); r += 1
put(wb_, f"A{r}", "Retail monthly fixed costs once live (Retail Readiness Costs, section C)")
put(wb_, f"B{r}", f"={RR['C']}", fmt=CUR0); rC = r; r += 1
put(wb_, f"A{r}", "Blended net per retail unit (Unit Economics channel blend)")
put(wb_, f"B{r}", f"={UE['RETAIL']['net']}", fmt=CUR2); rN = r; r += 1
put(wb_, f"A{r}", "Retail units per month needed to cover retail fixed costs")
put(wb_, f"B{r}", f"=IF(B{rN}<=0,\"-\",B{rC}/B{rN})", fmt=NUM0); r += 1
put(wb_, f"A{r}", "One-time readiness cost (section B)")
put(wb_, f"B{r}", f"={RR['B']}", fmt=CUR0); rB = r; r += 1
put(wb_, f"A{r}", "Extra retail units to repay the one-time readiness cost")
put(wb_, f"B{r}", f"=IF(B{rN}<=0,\"-\",B{rB}/B{rN})", fmt=NUM0); r += 1
for pid in ("RT_faire", "RT_wmt", "RT_tgt"):
    ur = UE_ROW[pid]
    put(wb_, f"A{r}", f"=\"Net per unit: \"&{q('Unit Economics')}!C{ur}")
    put(wb_, f"B{r}", f"={q('Unit Economics')}!M{ur}", fmt=CUR2); r += 1
put(wb_, f"A{r}", "Wholesale at half of a $12.99 retail price loses money at a 1,000-copy landed cost. Retail needs several physical SKUs, a larger run and a lower landed cost before it can pay its own way.", font=F_NOTE)
wb_.column_dimensions["A"].width = 70
for c in "BCD":
    wb_.column_dimensions[c].width = 18
wb_.column_dimensions["E"].width = 60
wb_.freeze_panes = "B6"

# =====================================================================
# DASHBOARD
# =====================================================================
wd = ws_["Dashboard"]
put(wd, "A1", "Play Before Pixels: financial model dashboard", font=Font(name=AR, bold=True, size=16, color="1D2940"))
put(wd, "A2", "AlphaPlay LLC (Maryland) d/b/a Play Before Pixels. Revised draft for the founder, September 28, 2026. Planning estimates only: "
              "these are not forecasts of income or promises of results. Base plan: lean-path costs, first sales Dec 2026, and the school wave, board book and retail all off. "
              "Budget on Conservative; measure progress against Expected. Change any blue cell on Assumptions and every tab updates.", font=F_NOTE)
wd.merge_cells("A2:E3"); wd["A2"].alignment = WRAP; wd.row_dimensions[2].height = 30
hdr(wd, 5, 1, 5, ["Measure", "Conservative", "Expected", "Strong", "Where it comes from"], 22)
DR = {}
r = 6
def d_row(key, label, fn, fmt, note="", bold=False):
    global r
    put(wd, f"A{r}", label, bold=bold)
    for s in range(3):
        put(wd, f"{'BCD'[s]}{r}", fn(s), fmt=fmt, bold=bold)
    put(wd, f"E{r}", note, font=F_NOTE)
    DR[key] = r
    r += 1
def fy(s, key, k):
    return f"={q(FS)}!{YC[k]}{FR[s][key]}"
sec(wd, r, 1, 5, "Sales and profit by year (model year 1 = Oct 2026 - Sep 2027)"); r += 1
for yk in (1, 2, 3):
    d_row(f"gross{yk}", f"Gross sales, year {yk}", lambda s, yk=yk: fy(s, "gross", yk), CUR0, "36-Month Forecast" if yk == 1 else "")
for yk in (1, 2, 3):
    d_row(f"contrib{yk}", f"Net contribution, year {yk}", lambda s, yk=yk: fy(s, "contrib", yk), CUR0,
          "After platform, payment, print/POD and fulfilment costs" if yk == 1 else "")
for yk in (1, 2, 3):
    d_row(f"netop{yk}", f"Net operating result, year {yk}", lambda s, yk=yk: fy(s, "netop", yk), CUR0,
          "Contribution - ads - operating costs - wave fixed costs" if yk == 1 else "", bold=True)
d_row("oneoff", "One-time costs over 36 months (startup + wave launch + retail readiness)",
      lambda s: f"={q(FS)}!{YC['T']}{FR[s]['startup']}+{q(FS)}!{YC['T']}{FR[s]['waveone']}", CUR0, "Startup Costs; Retail Readiness Costs")
d_row("inv", "Inventory purchases over 36 months (board-book print runs)", lambda s: f"={q(FS)}!{YC['T']}{FR[s]['inv']}", CUR0, "Sized from pre-sale orders")
d_row("cum36", "Cumulative net result after one-time costs, month 36", lambda s: f"={q(FS)}!{mc(36)}{FR[s]['cumnet']}", CUR0, "", bold=True)
r += 1
sec(wd, r, 1, 5, "Cash and break-even"); r += 1
d_row("be", "Break-even: trailing-12-month result >= 0 from", lambda s: f"={q('Break-even')}!{'BCD'[s]}{BE['t12_d']}", DATEF, "Headline measure (Break-even tab)", bold=True)
d_row("first", "First month with a monthly operating result >= 0", lambda s: f"={q('Break-even')}!{'BCD'[s]}{BE['first_d']}", DATEF)
d_row("peak", "Founder capital needed through month 36 (funding need)", lambda s: f"={q('Break-even')}!{'BCD'[s]}{BE['peak']}", CUR0, "Cash Flow: cumulative founder capital", bold=True)
d_row("need12", "   ...of which by Sep 2027 (month 12)", lambda s: f"={q('Break-even')}!{'BCD'[s]}{BE['need12']}", CUR0)
d_row("pay", "Self-funding from (no founder capital after this month)", lambda s: f"={q('Break-even')}!{'BCD'[s]}{BE['cash_d']}", DATEF)
d_row("capm", "Household-money cap passed in (placeholder cap)", lambda s: f"={q('Break-even')}!{'BCD'[s]}{BE['cap_d']}", DATEF, "Hard stop and re-forecast")
d_row("cash36", "Total cash at month 36 (operating + tax reserve)", lambda s: f"={q('Cash Flow')}!{mc(36)}{CFR[s]['total']}", CUR0)
d_row("gap36", "Operating balance vs 3-month reserve target, month 36", lambda s: f"={q('Cash Flow')}!{mc(36)}{CFR[s]['gap']}", CUR0, "ops/ROUTINE.md reserve target")
r += 1
sec(wd, r, 1, 5, "Volume, anchors and mix"); r += 1
d_row("anchor", "Digital units per product per month at full ramp (site + Etsy + MoR)",
      lambda s: f"={A['SITE_cvr'][s]}*{A['SITE_items'][s]}+{A['ETSY_cvr'][s]}*{A['ETSY_items'][s]}+{A['MOR_cvr'][s]}*{A['MOR_items'][s]}", NUM1,
      "Section 1.5 anchors: floor 2.5, Low 10, Base 30, breakout 75")
d_row("orders1", "Orders, year 1", lambda s: fy(s, "orders", 1), NUM0)
d_row("orders3", "Orders, year 3", lambda s: fy(s, "orders", 3), NUM0)
d_row("etsy3", "   ...of which Etsy orders, year 3", lambda s: fy(s, "ETSY_orders", 3), NUM0, "Compare: strongest routine-card shop, 2,189 lifetime sales (DEMAND-CHECK)")
d_row("orders36", "Orders in month 36", lambda s: f"={q(FS)}!{mc(36)}{FR[s]['orders']}", NUM0)
d_row("aov", "Average gross sale per order, year 3", lambda s: f"=IF({q(FS)}!{YC[3]}{FR[s]['orders']}=0,0,{q(FS)}!{YC[3]}{FR[s]['gross']}/{q(FS)}!{YC[3]}{FR[s]['orders']})", CUR2)
d_row("list36", "Email subscribers at month 36", lambda s: f"={q(FS)}!{mc(36)}{FR[s]['email_end']}", NUM0)
d_row("digshare", "Share of 36-month contribution from digital (site, Etsy, MoR, course)",
      lambda s: f"=IF({q(FS)}!{YC['T']}{FR[s]['contrib']}=0,0,({q(FS)}!{YC['T']}{FR[s]['SITE_contrib']}+{q(FS)}!{YC['T']}{FR[s]['ETSY_contrib']}+{q(FS)}!{YC['T']}{FR[s]['MOR_contrib']}+{q(FS)}!{YC['T']}{FR[s]['COURSE_contrib']})/{q(FS)}!{YC['T']}{FR[s]['contrib']})", PCT1)
d_row("bookshare", "Share from print-on-demand books (KDP, IngramSpark)",
      lambda s: f"=IF({q(FS)}!{YC['T']}{FR[s]['contrib']}=0,0,({q(FS)}!{YC['T']}{FR[s]['KDP_contrib']}+{q(FS)}!{YC['T']}{FR[s]['INGRAM_contrib']})/{q(FS)}!{YC['T']}{FR[s]['contrib']})", PCT1)
d_row("bbshare", "Share from the board book (gated option; 0 in base)",
      lambda s: f"=IF({q(FS)}!{YC['T']}{FR[s]['contrib']}=0,0,{q(FS)}!{YC['T']}{FR[s]['BOARD_contrib']}/{q(FS)}!{YC['T']}{FR[s]['contrib']})", PCT1)
d_row("schshare", "Share from the school/group wave (overlay only; 0 in base)",
      lambda s: f"=IF({q(FS)}!{YC['T']}{FR[s]['contrib']}=0,0,{q(FS)}!{YC['T']}{FR[s]['SCHOOL_contrib']}/{q(FS)}!{YC['T']}{FR[s]['contrib']})", PCT1)
d_row("rtshare", "Share from retail and wholesale (0 in base)",
      lambda s: f"=IF({q(FS)}!{YC['T']}{FR[s]['contrib']}=0,0,{q(FS)}!{YC['T']}{FR[s]['RETAIL_contrib']}/{q(FS)}!{YC['T']}{FR[s]['contrib']})", PCT1)
d_row("presale", "Board-book pre-sale copies (only if the board book is switched on)", lambda s: f"={q(FS)}!$B${FR[s]['presale']}", NUM0, "Gated option")
d_row("need", "   ...go line: copies needed to fund the planned run", lambda s: f"={q(FS)}!$B${FR[s]['need']}", NUM0, "Below this line: refund, keep the POD paperback")
d_row("go", "   ...go (1) / no-go (0)", lambda s: f"={q(FS)}!$B${FR[s]['go']}", "0")
d_row("onhand", "Board-book copies at the 3PL, month 36", lambda s: f"={q(FS)}!{mc(36)}{FR[s]['onhand']}", NUM0, "Cash tied up in stock")
r += 1
put(wd, f"A{r}", "How to use", bold=True); r += 1
for t in ["1. Edit blue cells only. Yellow cells on Assumptions are the levers that move results most (first-sale month, sales per product, include flags, IngramSpark discount, cost position).",
          "2. Base plan = lean path: cost position 0 (low-end quotes) and every GATED one-time item at Include = 0. Set the cost position to 0.5 to see mid-point costs.",
          "3. The school wave, the board book and retail are OFF in every scenario. Switch an include flag to 1 to see it as an overlay; school only if counsel clears it in writing.",
          "4. Every [VERIFY] figure must be checked on the live page or a written quote before money is committed.",
          "5. Replace the sales-per-product and units-per-title guesses with the first 90 days of real data from the Friday scorecard."]:
    put(wd, f"A{r}", t, font=F_NOTE); r += 1
for c, w in zip("ABCDE", [62, 16, 16, 16, 44]):
    wd.column_dimensions[c].width = w
wd.freeze_panes = "B6"

# Charts
def line_chart(title_, rows_fn, sheet, ytitle, anchor):
    ch = LineChart()
    ch.title = title_
    ch.y_axis.title = ytitle
    ch.y_axis.number_format = '$#,##0'
    ch.x_axis.number_format = 'mmm-yy'
    ch.height, ch.width = 8, 18
    ws = ws_[sheet]
    cats = Reference(ws, min_col=FC, max_col=FC + 35, min_row=5, max_row=5)
    for s in range(3):
        row = rows_fn(s)
        ref = Reference(ws, min_col=FC, max_col=FC + 35, min_row=row, max_row=row)
        se = Series(ref, title=SCN[s])
        se.graphicalProperties.line.solidFill = SERIES_COLORS[s]
        se.graphicalProperties.line.width = 25400
        se.smooth = False
        ch.series.append(se)
    ch.set_categories(cats)
    ch.x_axis.tickLblPos = "low"
    ch.legend.position = "b"
    wd.add_chart(ch, anchor)
line_chart("Monthly gross sales by scenario", lambda s: FR[s]["gross"], FS, "$ per month", "G5")
line_chart("Cumulative founder capital by scenario (the funding need)", lambda s: CFR[s]["cumfounder"], "Cash Flow", "$", "G22")
r += 1
put(wd, f"A{r}", "Chart data: net operating result by model year", bold=True); r += 1
cd0 = r
for yk in (1, 2, 3):
    put(wd, f"A{r}", f"Year {yk}")
    for s in range(3):
        put(wd, f"{'BCD'[s]}{r}", f"={'BCD'[s]}{DR[f'netop{yk}']}", fmt=CUR0)
    r += 1
bc = BarChart()
bc.type = "col"; bc.grouping = "clustered"
bc.title = "Net operating result by model year"
bc.y_axis.number_format = '$#,##0'
bc.height, bc.width = 8, 18
for s in range(3):
    ref = Reference(wd, min_col=2 + s, max_col=2 + s, min_row=cd0, max_row=cd0 + 2)
    se = Series(ref, title=SCN[s])
    se.graphicalProperties.solidFill = SERIES_COLORS[s]
    se.graphicalProperties.line.solidFill = SERIES_COLORS[s]
    bc.series.append(se)
bc.set_categories(Reference(wd, min_col=1, max_col=1, min_row=cd0, max_row=cd0 + 2))
bc.x_axis.tickLblPos = "low"
bc.legend.position = "b"
wd.add_chart(bc, "G39")

from openpyxl.worksheet.properties import PageSetupProperties
for n in SHEETS:
    w = ws_[n]
    w.page_setup.orientation = "landscape"
    w.sheet_properties.pageSetUpPr = PageSetupProperties(fitToPage=True)
    w.page_setup.fitToWidth = 1
    w.page_setup.fitToHeight = 0
# tab colors
for n in SHEETS:
    ws_[n].sheet_properties.tabColor = "1D2940" if n in ("Dashboard", "Assumptions") else "8A94A8"
wb.calculation.fullCalcOnLoad = True
wb.save(OUT)
print("saved", OUT)
