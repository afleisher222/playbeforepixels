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
    art: 'blocks',
    sections: [
      { n: 1, t: 'Jobs first', rows: [['getDressed', 'Get dressed'], ['brushTeeth', 'Brush teeth'], ['tidyToys', 'Tidy toys'], ['setTable', 'A helping job']] },
      { n: 2, t: 'Then play and time together', rows: [['goOutside', 'Play outside'], ['readTogether', 'Read together'], ['blocks', 'Play together']] },
    ],
    screen: ['screenSpot', 'Screens, at their spot'],
    tip: ['Say what you see', '“Shoes on! You did it all by yourself.”'],
  },
  big: {
    eyebrow: 'My play-first checklist',
    age: '512',
    sub: 'Jobs, then play and time together, then screens.',
    art: 'boardGame',
    sections: [
      { n: 1, t: 'Jobs first', rows: [['makeBedBig', 'Make my bed'], ['dressedBig', 'Get ready for the day'], ['homework', 'Homework or practice'], ['setTableBig', 'A family job'], ['tidyRoom', 'Tidy my room']] },
      { n: 2, t: 'Then play and time together', rows: [['outsideTime', 'Outside or active play'], ['readInBed', 'Read, or be read to'], ['familyGame', 'Game or talk with family'], ['build', 'Make or build something']] },
    ],
    screen: ['screenSpot', 'Screens, at their spot'],
    tip: ['Ask, then wait', '“What was the best part of your day?” Count to five before you add anything.'],
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
    screen: ['screenSpot', 'Screens, at their spot'],
    tip: ['Repeat and add one word', '“Ball.” “Big ball!” “Big red ball!”'],
  },
};
const SCREEN_NOTE = 'Our screen spot is the same every day. Jobs and play come first because that’s our rhythm, not a race.';

// ---------- tokens (for play and connection only, never screen minutes — CUSTOMER-VOICE rule 26) ----------
const TOKENS = [
  ['readTogether', 'Story together'], ['boardGame', 'Board game'], ['dance', 'Dance party'],
  ['blocks', 'Build together'], ['walk', 'Walk and talk'], ['helpCook', 'Cook together'],
  ['drawing', 'Draw together'], ['fort', 'Blanket fort'], ['park', 'Park trip'],
  ['sing', 'Sing together'], ['puppets', 'Puppet show'], ['bubbles', 'Bubbles outside'],
];
const SPOT_CARDS = [
  { art: 'blocks', t: 'Play first!', s: 'Jobs, then play and time together.' },
  { art: 'familyGame', t: 'Together time', s: 'Pick a together token.' },
  { art: 'screenSpot', t: 'Screen spot', s: 'Screens come last, after:', field: 'spot_after' },
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
  ['familyMeal', 'Meals are for being together.'],
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
  ['teddy', 'Hide a toy, give clues'], ['birds', 'Watch for birds'], ['helpCook', 'Cook dinner together'], ['music', 'Freeze dance'], ['blocks', 'Build a tall tower'],
  ['tellStory', 'Make up a story'], ['natureWalk', 'Nature walk'], ['ball', 'Roll-the-ball game'], ['sing', 'Sing 3 favorite songs'], ['boardGame', 'Game night'],
  ['stretch', 'Move like animals'], ['toyCars', 'Tape roads for cars'], ['picnic', 'Picnic on the floor'], ['dressUp', 'Dress-up parade'], ['garden', 'Garden helper'],
  ['library', 'Library visit'], ['teaParty', 'Tea party'], ['peekaboo', 'Hide and seek'], ['talkPictures', 'Look at family photos'], ['familyGame', 'Pick a favorite, again!'],
];

// ---------- 30-play grown-up guide (CUSTOMER-VOICE rules 4, 6, 7, 15): same order as DAYS30 ----------
// from = starting age in months · prep/play in minutes (estimates, never promises) · mess: none | low | some
const PLAYS30 = [
  { from: 18, needs: 'Blankets, chairs, pillows', prep: 5, mess: 'low', play: 20, easy: 'Drape one blanket over a table and crawl in.', hard: 'Add a door, a sign and a reading corner.', two: 'Throw a blanket over you both and whisper.', say: '“In or out? You choose.”', safe: 'Nothing heavy on top.' },
  { from: 12, needs: 'Music', prep: 0, mess: 'none', play: 10, easy: 'Hold them and sway together.', hard: 'Each makes up a move; everyone copies.', two: 'One song, everyone dances.', say: '“Fast or slow?”' },
  { from: 6, needs: 'Any book', prep: 0, mess: 'none', play: 10, easy: 'Point to the pictures and name them.', hard: 'They read a page to you, or guess what happens next.', two: 'One short book, or one page.', say: '“What do you see?”' },
  { from: 24, needs: 'Clean socks', prep: 1, mess: 'low', play: 10, easy: 'Find the one sock that matches mine.', hard: 'Sort by color, then by size.', two: 'Match 5 pairs.', say: '“Same or different?”' },
  { from: 24, needs: 'Nothing', prep: 0, mess: 'none', play: 10, easy: 'Find one red thing.', hard: 'New color, or 5 things that start with “b”.', two: 'Look out one window together.', say: '“Red! What else is red?”' },
  { from: 30, needs: 'Paper, crayons or pencils', prep: 1, mess: 'low', play: 15, easy: 'Scribble together on one big page.', hard: 'Draw each other from memory, then compare.', two: 'One quick face each.', say: '“Tell me about your picture.”', safe: 'Under 3: chunky crayons, grown-up close.' },
  { from: 12, needs: 'Plastic or paper cups', prep: 0, mess: 'none', play: 10, easy: 'Stack 3 cups, then knock them down.', hard: 'Build a pyramid of 10 and count as you go.', two: 'One tower, one crash.', say: '“Up, up… crash!”', safe: 'Never glass.' },
  { from: 24, needs: 'A sock or paper bag', prep: 2, mess: 'low', play: 15, easy: 'The puppet says hi, hides and pops out.', hard: 'Put on a show with a start, middle and end.', two: 'Your hand says hello in a silly voice.', say: '“What does the puppet want?”', safe: 'Under 3: no buttons or stick-on eyes.' },
  { from: 12, needs: 'Dish soap, water, a wand', prep: 3, mess: 'some', play: 15, easy: 'You blow, they pop.', hard: 'Try giant bubbles, or count before they pop.', two: 'Ten bubbles on the doorstep.', say: '“Pop! Big or small?”', safe: 'A grown-up holds the bottle. Not for drinking.' },
  { from: 30, needs: 'Pots, spoons, paper', prep: 2, mess: 'low', play: 20, easy: 'Serve one pretend cup of soup.', hard: 'Write a menu, take orders, bring the bill.', two: '“One pretend pizza, please!”', say: '“What would you like?”' },
  { from: 24, needs: 'One toy', prep: 0, mess: 'none', play: 10, easy: 'Hide it with a bit still showing.', hard: 'Give “warmer, colder” clues, or written clues.', two: 'One hide, one find.', say: '“Is it under or behind?”', safe: 'Under 3: a toy bigger than a toilet-paper tube.' },
  { from: 18, needs: 'A window or yard', prep: 0, mess: 'none', play: 10, easy: 'Point and say “bird!”', hard: 'Count them, draw one, or sort by color.', two: 'Look out the window together.', say: '“Where is it going?”' },
  { from: 24, needs: 'Tonight’s dinner', prep: 0, mess: 'some', play: 20, easy: 'Wash vegetables or tear lettuce.', hard: 'Measure, stir and read the next step.', two: 'One job: stir or pour.', say: '“What comes next?”', safe: 'Grown-ups handle knives, heat and glass.' },
  { from: 24, needs: 'Music', prep: 0, mess: 'none', play: 10, easy: 'Hold hands; stop when the music stops.', hard: 'Freeze in a shape: tall, tiny, an animal.', two: 'One song.', say: '“Dance… and freeze!”' },
  { from: 12, needs: 'Blocks, boxes or cups', prep: 0, mess: 'low', play: 15, easy: 'Stack 2 or 3, then knock down.', hard: 'Taller than your knee? Add a bridge.', two: 'Five blocks, then crash.', say: '“Up! More! Down!”', safe: 'Under 3: blocks bigger than a toilet-paper tube.' },
  { from: 36, needs: 'Nothing', prep: 0, mess: 'none', play: 10, easy: 'You tell it; they add one word: “A dog!”', hard: 'Take turns, one sentence each.', two: 'Three lines each, starting “Once…”', say: '“And then what?”' },
  { from: 12, needs: 'Shoes', prep: 2, mess: 'low', play: 20, easy: 'Stroll and name what you see.', hard: 'Collect 5 things and make a map.', two: 'Walk to the corner and back.', say: '“Look! What’s that?”', safe: 'Nothing from outside goes in mouths.' },
  { from: 9, needs: 'A soft ball', prep: 0, mess: 'none', play: 10, easy: 'Sit facing each other and roll it back and forth.', hard: 'Knock down cup “pins”, or count catches.', two: 'Ten rolls.', say: '“Ready, set… roll!”' },
  { from: 6, needs: 'Nothing', prep: 0, mess: 'none', play: 10, easy: 'One song with hand moves.', hard: 'Change the words or add a new verse.', two: 'One song.', say: 'Pause before the last word and let them fill it in.' },
  { from: 36, needs: 'Any game or a deck of cards', prep: 2, mess: 'low', play: 20, easy: 'Play “I spy” or a matching game.', hard: 'Let them teach you the rules.', two: 'Three rounds of rock, paper, scissors.', say: '“Your turn, my turn.”', safe: 'Keep small game pieces away from under-3s.' },
  { from: 18, needs: 'Some space', prep: 0, mess: 'none', play: 10, easy: 'Stomp like an elephant together.', hard: 'Act out an animal; the others guess.', two: 'Three animals across the room.', say: '“How does a frog move?”' },
  { from: 24, needs: 'Painter’s tape, toy cars', prep: 5, mess: 'low', play: 20, easy: 'One straight road on the floor.', hard: 'Add bridges, parking spots and a map.', two: 'One road on the table.', say: '“Where is the car going?”', safe: 'A grown-up holds the tape. Under 3: cars bigger than a toilet-paper tube.' },
  { from: 12, needs: 'A blanket and a snack', prep: 5, mess: 'some', play: 20, easy: 'Snack on a blanket.', hard: 'Plan the menu and pack a basket.', two: 'One snack on a towel.', say: '“What shall we bring?”', safe: 'Sit to eat. Under 4: no whole grapes, nuts, popcorn or hard candy.' },
  { from: 24, needs: 'Old clothes and hats', prep: 2, mess: 'low', play: 20, easy: 'One hat each; look in the mirror.', hard: 'Make up a character with its own voice.', two: 'One hat, one walk across the room.', say: '“Who are you today?”', safe: 'No cords, ties or long scarves around necks.' },
  { from: 24, needs: 'A plant, a cup of water', prep: 1, mess: 'some', play: 10, easy: 'Water one plant together.', hard: 'Plant a seed and measure it each week.', two: 'Water one plant.', say: '“Is it thirsty?”', safe: 'Wash hands after. Soil and stones stay out of mouths.' },
  { from: 6, needs: 'A free library card', prep: 5, mess: 'none', play: 45, easy: 'Pick one book together.', hard: 'They choose and check out their own books.', two: 'At home, “visit” your shelf and pick one.', say: '“This one or that one?”' },
  { from: 18, needs: 'Cups, a toy or two', prep: 1, mess: 'low', play: 15, easy: 'Pretend to pour: “Mmm!”', hard: 'Invite the toys, set places, serve courses.', two: 'One pretend cup each.', say: '“More tea?”', safe: 'Pretend or cool water only.' },
  { from: 18, needs: 'Nothing', prep: 0, mess: 'none', play: 15, easy: 'Peekaboo behind a door or blanket.', hard: 'They count to 20 and do the seeking.', two: 'One hide, one seek.', say: '“Where are you?”', safe: 'Agree on no-hide places: no dryers, chests or cars.' },
  { from: 12, needs: 'Printed photos or an album', prep: 1, mess: 'none', play: 10, easy: 'Find the faces: “Who’s that?”', hard: 'Tell the story behind one photo.', two: 'One photo, one story.', say: '“What were they doing?”' },
  { from: 12, needs: 'Whatever the play needs', prep: 0, mess: 'low', play: 15, easy: 'Pick the shortest favorite.', hard: 'Make it bigger than last time.', two: 'Any 2-minute version on these pages.', say: '“Which one? Why that one?”' },
];

// Optional founder's note for the grown-up guide (60–90 words, her own words; template in ../founder-notes.md).
// Leave '' and nothing prints.
const FOUNDER_NOTE = '';

module.exports = { FOUNDER_NOTE, VERSION, COPY, BONUS, CHECK, SCREEN_NOTE, TOKENS, SPOT_CARDS, HELP, CHORES, RULES, DAYS30, PLAYS30 };
