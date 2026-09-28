// Play-First Family Kit — all words in one place.
// HUMAN AUTHORSHIP (BRAND.md): the founder rewrites these lines in her own words, picks and reorders
// the rows, tokens and rules, then rebuilds with ./make-all.sh. Commit every draft so her changes are provable.

const VERSION = 'Version 1.0 · September 2026';
const COPY = '© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC.';
const BONUS = 'playbeforepixels.com/bonus/play-first-family-kit';

// ---------- checklists ----------
const CHECK = {
  little: {
    eyebrow: 'My picture checklist',
    age: '25',
    sub: 'Point to each picture. Say it together. Tick it when it’s done.',
    art: 'playFirst',
    sections: [
      { n: 1, t: 'Jobs first', rows: [['getDressed', 'Get dressed'], ['brushTeeth', 'Brush teeth'], ['tidyToys', 'Tidy toys'], ['setTable', 'A helping job']] },
      { n: 2, t: 'Then play and time together', rows: [['goOutside', 'Play outside'], ['readTogether', 'Read together'], ['blocks', 'Play together']] },
    ],
    screen: ['screensLater', 'Screens, at their spot'],
    tip: ['Say what you see.', '“Shoes on! You did it all by yourself.”'],
  },
  big: {
    eyebrow: 'My play-first checklist',
    age: '512',
    sub: 'Jobs, then play and people, then screens at their usual spot.',
    art: 'playFirstBig',
    sections: [
      { n: 1, t: 'Jobs first', rows: [['makeBedBig', 'Make my bed'], ['dressedBig', 'Get ready for the day'], ['homework', 'Homework or practice'], ['setTableBig', 'A family job'], ['tidyRoom', 'Tidy my room']] },
      { n: 2, t: 'Then play and time together', rows: [['outsideTime', 'Outside or active play'], ['readInBed', 'Read, or be read to'], ['familyGame', 'Game or talk with family'], ['build', 'Make or build something']] },
    ],
    screen: ['screensLaterBig', 'Screens, at their spot'],
    tip: ['Ask, then wait.', '“What was the best part of your day?” Count to five before you add anything.'],
  },
  blank: {
    eyebrow: 'Make-it-yours checklist',
    age: 'all',
    sub: 'Type or write your own jobs and play. Draw a picture in each circle.',
    art: 'playTime',
    sections: [
      { n: 1, t: 'Jobs first', rows: 5 },
      { n: 2, t: 'Then play and time together', rows: 4 },
    ],
    screen: ['screensLater', 'Screens, at their spot'],
    tip: ['Repeat and add one word.', '“Ball.” “Big ball!” “Big red ball!”'],
  },
};
const SCREEN_NOTE = 'Our screen spot is the same every day. Jobs and play come first because that’s our rhythm, not a race.';

// ---------- tokens (earn play and connection only — CUSTOMER-VOICE rule 26) ----------
const TOKENS = [
  ['readTogether', 'Story together'], ['boardGame', 'Board game'], ['dance', 'Dance party'],
  ['blocks', 'Build together'], ['walk', 'Walk and talk'], ['helpCook', 'Cook together'],
  ['drawing', 'Draw together'], ['fort', 'Blanket fort'], ['park', 'Park trip'],
  ['sing', 'Sing together'], ['puppets', 'Puppet show'], ['bubbles', 'Bubbles outside'],
];
const SPOT_CARDS = [
  { art: 'playFirst', t: 'Play first!', s: 'Jobs, then play and time together.' },
  { art: 'familyGame', t: 'Together time', s: 'Pick a together token.' },
  { art: 'screensLater', t: 'Screen spot', s: 'Screens come last, after:', field: 'spot_after' },
  { art: 'alarm', t: '5 more minutes', s: 'Find a good place to stop.' },
  { art: 'devicesSleep', t: 'Screens go to sleep', s: 'Say goodnight and put it away.' },
  { art: 'kickBall', t: 'What we do next', s: 'Next we will:', field: 'next_do' },
];

// ---------- helping jobs 2–5 ----------
const HELP = [
  ['feedPet', 'Feed the pet'], ['waterPlants', 'Water plants'], ['matchSocks', 'Match socks'],
  ['wipeSpill', 'Wipe a spill'], ['setTable', 'Set the table'], ['shoesAway', 'Shoes away'],
  ['carryBags', 'Carry a light bag'], ['recycling', 'Recycling'], ['foldTowels', 'Fold towels'],
  ['booksBack', 'Books back'], ['tidyToys', 'Tidy toys'], ['helpCook', 'Stir and wash'],
];
// ---------- chores 5–12 ----------
const CHORES = [
  ['makeBedBig', 'Make my bed'], ['foldClothes', 'Put clothes away'], ['setTableBig', 'Set the table'],
  ['clearTable', 'Clear the table'], ['putAwayDishes', 'Dishes in or out'], ['feedPetBig', 'Feed the pet'],
  ['sortRecycling', 'Trash and recycling'], ['tidyRoom', 'Tidy my room'], ['packTomorrow', 'Pack my bag'],
  ['helpDinner', 'Help with dinner'], ['wipeCounter', 'Wipe the counter'], ['helpSibling', 'Help a brother or sister'],
];

// ---------- family rules poster ----------
const RULES = [
  ['playFirst', 'We play first.'],
  ['screensLater', 'Screens have a spot in our day.'],
  ['familyMeal', 'Meals are for talking.'],
  ['devicesSleep', 'Screens sleep outside bedrooms at night.'],
  ['alarm', 'We give a 5-minute heads-up.'],
  ['familyGame', 'Grown-ups play too.'],
  ['goOutside', 'We go outside every day we can.'],
  ['playFriend', 'Anyone can say, “Come play with me!”'],
];

// ---------- 30-day tracker (all nothing-to-buy, all ages with a grown-up) ----------
const DAYS30 = [
  ['fort', 'Blanket fort'], ['dance', 'Kitchen dance party'], ['readTogether', 'Read a book together'], ['matchSocks', 'Sock-match race'], ['walk', 'Spot 5 red things'],
  ['drawing', 'Draw each other'], ['stacker', 'Cup tower'], ['puppets', 'Puppet show'], ['bubbles', 'Bubbles outside'], ['pretendKitchen', 'Play restaurant'],
  ['teddy', 'Hide a toy, give clues'], ['chalk', 'Chalk drawings'], ['helpCook', 'Cook dinner together'], ['music', 'Freeze dance'], ['blocks', 'Build a tall tower'],
  ['tellStory', 'Make up a story'], ['natureWalk', 'Nature walk'], ['ball', 'Roll-the-ball game'], ['sing', 'Sing 3 favorite songs'], ['boardGame', 'Game night'],
  ['painting', 'Paint together'], ['toyCars', 'Tape roads for cars'], ['picnic', 'Picnic on the floor'], ['dressUp', 'Dress-up parade'], ['garden', 'Garden helper'],
  ['library', 'Library visit'], ['teaParty', 'Tea party'], ['playTime', 'Pillow path game'], ['talkPictures', 'Look at family photos'], ['familyGame', 'Pick a favorite, again!'],
];

module.exports = { VERSION, COPY, BONUS, CHECK, SCREEN_NOTE, TOKENS, SPOT_CARDS, HELP, CHORES, RULES, DAYS30 };
