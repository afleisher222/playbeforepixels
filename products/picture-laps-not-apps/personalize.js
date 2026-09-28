// personalize.js — turns one customer order into the variables the book is built from.
// Used by build.js (all modes) and by the order-to-print pipeline (see ORDER-TO-PRINT.md).
// The variable map for people (and store setup) is personalization.json; keep the two in step.
'use strict';

// Character picker: 4 looks for the story's child. Only the child changes; the family cast stays the same.
const LOOKS = {
  1: { skin: '#8D5A3B', hair: '#2B1D16', hs: 'puffs', label: 'Look 1', desc: 'Brown skin, black hair in two puffs' },
  2: { skin: '#F4CFAE', hair: '#E3B04B', hs: 'crop', label: 'Look 2', desc: 'Light skin, short blond hair' },
  3: { skin: '#C08457', hair: '#5A3825', hs: 'bob', label: 'Look 3', desc: 'Tan skin, brown bob' },
  4: { skin: '#5C3A26', hair: '#2B1D16', hs: 'bun', label: 'Look 4', desc: 'Deep brown skin, black hair in a bun' },
};

// Pronoun sets. The rhymes never need a pronoun (so verbs always agree); pronouns appear on the
// dedication, pledge, grown-up note and back cover, only in forms that take no verb ending.
const PRONOUNS = {
  she: { THEY: 'she', THEM: 'her', THEIR: 'her' },
  he: { THEY: 'he', THEM: 'him', THEIR: 'his' },
  they: { THEY: 'they', THEM: 'them', THEIR: 'their' },
};

const FORMATS = ['hardcover', 'softcover'];
const LIMITS = { CHILD_NAME: 14, GIVER_NAME: 32, GIFT_MESSAGE: 180, GIFT_DATE: 32, MESSAGE_LINES: 4 };

// The friend in the park rhyme is "Ada". If the child shares a cast name, the friend becomes "Nell".
const CAST = ['ada', 'jo', 'bea', 'theo', 'nell'];
const FRIEND = (child) => (child.toLowerCase() === 'ada' ? 'Nell' : 'Ada');

// Letters the book fonts (Fredoka, Nunito Sans: Latin + Latin Extended) can print.
const LETTER = 'A-Za-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u024F';
const NAME_RE = new RegExp(`^[${LETTER}](?:[${LETTER}'’.\\- ]*[${LETTER}.])?$`);
const TEXT_RE = /^[ -~ -ÿĀ-ɏ‘’“”–—…\n]*$/;
// Words that send an order to the weekly review queue instead of the printer. Extend as needed.
// Whole words only, so real names (Killian, Dickens, Essex) are not flagged.
const REVIEW_WORDS = /\b(fuck\w*|shit\w*|bitch\w*|cunt\w*|nigg\w*|fags?|faggot\w*|rape\w*|nazi\w*|porn\w*|sex\w*|dick|kill|die|dead|hate)\b/g;

const clean = (s) => String(s == null ? '' : s).normalize('NFC').replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, ' ').replace(/[ \t]+/g, ' ').trim();
const oneLine = (s) => clean(s).replace(/\s*\n\s*/g, ' ');
// Typeset the buyer's straight quotes as curly ones (We can't → We can’t; "Maya" → “Maya”).
const smart = (s) => s.replace(/(^|[\s(\[{—–-])'/g, '$1‘').replace(/'/g, '’').replace(/(^|[\s(\[{—–-])"/g, '$1“').replace(/"/g, '”');
function nameCase(s) {
  // Keep the buyer's capitals (McKenzie, DeShawn, Anne-Marie) unless they typed all-lower or ALL-CAPS.
  if (s !== s.toLowerCase() && s !== s.toUpperCase()) return s;
  return s.toLowerCase().replace(/(^|[\s\-'’])([a-zà-ÿĀ-ɏ])/g, (m, a, b) => a + b.toUpperCase());
}

/**
 * normalize(order) -> { ok, errors[], holds[], vars{}, look, format, pronouns }
 *  errors = cannot build at all (fix the order data).
 *  holds  = could build, but a person must look first (weekly review queue) before it goes to the printer.
 */
function normalize(order = {}) {
  const errors = [], holds = [];
  const child = nameCase(oneLine(order.child_name));
  const giver = oneLine(order.giver_name);
  const pron = clean(order.pronouns || 'they').toLowerCase();
  const look = Number(order.look || 1);
  const format = clean(order.format || 'hardcover').toLowerCase();
  let msg = clean(order.gift_message).replace(/\r/g, '');
  const date = oneLine(order.gift_date);

  if (!child) errors.push('child_name is empty');
  else {
    if ([...child].length > LIMITS.CHILD_NAME) holds.push(`child_name is longer than ${LIMITS.CHILD_NAME} characters (${[...child].length}); ask for a shorter name or nickname`);
    if (!NAME_RE.test(child)) holds.push('child_name has characters the book fonts cannot print (Latin letters, spaces, hyphens, apostrophes and periods only)');
  }
  if (!PRONOUNS[pron]) errors.push(`pronouns must be one of ${Object.keys(PRONOUNS).join(', ')}`);
  if (!LOOKS[look]) errors.push(`look must be 1–${Object.keys(LOOKS).length}`);
  if (!FORMATS.includes(format)) errors.push(`format must be ${FORMATS.join(' or ')}`);
  if ([...giver].length > LIMITS.GIVER_NAME) holds.push(`giver_name is longer than ${LIMITS.GIVER_NAME} characters`);
  if (giver && !TEXT_RE.test(giver)) holds.push('giver_name has characters the book fonts cannot print');
  if ([...date].length > LIMITS.GIFT_DATE) holds.push(`gift_date is longer than ${LIMITS.GIFT_DATE} characters`);
  if (msg) {
    msg = msg.split('\n').map((l) => l.trim()).filter(Boolean).join('\n');
    if ([...msg.replace(/\n/g, ' ')].length > LIMITS.GIFT_MESSAGE) holds.push(`gift_message is longer than ${LIMITS.GIFT_MESSAGE} characters`);
    if (msg.split('\n').length > LIMITS.MESSAGE_LINES) holds.push(`gift_message has more than ${LIMITS.MESSAGE_LINES} lines`);
    if (!TEXT_RE.test(msg)) holds.push('gift_message has characters the book fonts cannot print (emoji and non-Latin scripts)');
  }
  const all = `${child} ${giver} ${msg} ${date}`.toLowerCase();
  const hit = [...new Set(all.match(REVIEW_WORDS) || [])];
  if (hit.length) holds.push(`review wording: ${hit.join(', ')}`);

  const p = PRONOUNS[pron] || PRONOUNS.they;
  const vars = {
    CHILD_NAME: smart(child), GIVER_NAME: smart(giver), GIFT_MESSAGE: smart(msg), GIFT_DATE: smart(date),
    THEY: p.THEY, THEM: p.THEM, THEIR: p.THEIR, FRIEND: FRIEND(child || 'x'),
  };
  return { ok: errors.length === 0, errors, holds, vars, look: LOOKS[look] ? look : 1, format: FORMATS.includes(format) ? format : 'hardcover', pronouns: pron };
}

// The example order used for the sample book, the previews and the listing images.
const SAMPLE_ORDER = {
  order_id: 'SAMPLE-0001', channel: 'shopify', format: 'hardcover',
  child_name: 'Maya', giver_name: 'Aunt Lily', pronouns: 'she', look: 1,
  gift_message: 'May every day bring you a lap, a story and a song.\nWe love you to the moon and back.',
  gift_date: 'Baby shower · October 2026',
};

module.exports = { LOOKS, PRONOUNS, FORMATS, LIMITS, CAST, normalize, SAMPLE_ORDER };
