# Monthly issue: "3 plays for your child's age" (template)

One email a month to everyone who confirmed. The platform shows each reader the block for their child's age band (from the optional birth month and year); readers with no birth month and year get the **all ages** block. The routine drafts each issue from the plays library (products/*/build content files) and it goes out only under an APPROVED line (ops/ROUTINE.md "Never").

## Rules for every issue
- Exactly **3 plays** per age band. Each play: a name, one line of what you need (things most homes have), 2–3 short steps, one talk line, and its own safety line. At least 2 of the 3 need nothing to buy.
- Describe plays for the age. **Never** milestones, "should", deadlines, "behind", "delay", "catch up", "boost" or "brain" (BRAND rule 18; GROWTH-ENGINE §7). No health or outcome claims. No diagnosis or condition wording anywhere.
- Safety (BRAND hard rule 4): with a grown-up; under 3 nothing that fits through a toilet-paper tube; no balloons; no cords; water within arm's reach; no whole grapes, nuts, popcorn or hard candy.
- **One product mention at most**, in the "Next for your child's age" line, chosen from the next age stage (GROWTH-ENGINE Loop 4). No product line for readers tagged `src=hub`. No prices, timers or "ending soon".
- Seasonal plays are secular (weather, light, outdoors), never tied to a faith.
- Plain, warm, faceless; signed "Play Before Pixels". Footer below, unchanged.

## Template

**Subject:** {{month}}: 3 plays for {{age_band_words | default: "ages 0–5"}}
**Preview text:** Nothing to buy, about 5 minutes each.

Hi there,

Here are this month's three plays{{if age_band}} for {{age_band_words}}{{endif}}. Pick one, play it twice, and let your child choose the next.

{{if age_band = "0-1"}}
### Birth to 1
**1. [Play name]** · You need: [thing]
[Step 1.] [Step 2.] [Step 3.]
Talk: "[talk line]"
Safety: [safety line]

**2. [Play name]** · …
**3. [Play name]** · …
{{endif}}

{{if age_band = "1-2"}} ### 1 to 2 years · (same three-play shape) {{endif}}
{{if age_band = "2-3"}} ### 2 to 3 years · (same three-play shape) {{endif}}
{{if age_band = "3-5"}} ### 3 to 5 years · (same three-play shape) {{endif}}
{{if no age_band}} ### All ages, birth to 5 · three plays, each with a line for "younger" and "older" {{endif}}

**Talk tip of the month:** [one of: pause and wait · say what you see · repeat and add one word · offer a choice · follow their lead · sing and gesture], in one sentence and one example.

{{if not src = "hub"}}**Next for your child's age:** [one product, one sentence]. [See it]({{product_link:<slug>}}){{endif}}

Play Before Pixels

---
Play Before Pixels is a trade name of AlphaPlay LLC · [BUSINESS MAILING ADDRESS]
You are getting this because you signed up for free plays at playbeforepixels.com.
[Change your child's birth month and year]({{preferences_link}}) · [Unsubscribe with one click]({{unsubscribe_link}})

---

## Filled example: November issue, 2 to 3 years block

**Subject:** November: 3 plays for 2 to 3 years
**Preview text:** Nothing to buy, about 5 minutes each.

Hi there,

Here are this month's three plays for 2 to 3 years. Pick one, play it twice, and let your child choose the next.

**1. Leaf Pile Sort** · You need: a few fallen leaves, two bowls
Collect leaves together on a walk. At home, sort them into two bowls: big and little, or red and yellow. Then toss them all in the air.
Talk: "Big leaf… (wait) little leaf!"
Safety: Look, don't taste: leaves, berries and nuts stay out of mouths. Wash hands after.

**2. Laundry Basket Train** · You need: a laundry basket, a soft toy
Your child sits the toy in the basket and pushes it across the floor. Call out stops: "Kitchen! Everybody off!"
Talk: "Choo choo… (wait) stop!"
Safety: Flat floors only, away from stairs. Children push the basket; nobody rides in it.

**3. Sock Puppet Hello** · You need: a clean sock
Put the sock on your hand. It's shy and hides under your arm, then pops out to say hello and ask your child's favorite animal.
Talk: "Hello! (wait) What do you like?"
Safety: A sock with nothing sewn or glued on: no buttons, beads or pom-poms.

**Talk tip of the month: repeat and add one word.** When your child says a word, say it back with one word added. "Leaf!" … "Red leaf!"

**Next for your child's age:** 24 Days of Play: Winter Countdown has one easy winter play a day for ages 2–5, from things you already have. [See it]({{product_link:winter-countdown}})

Play Before Pixels

_(footer as above)_
