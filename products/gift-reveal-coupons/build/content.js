// Printable Gift-Reveal Cards and Play Coupons (edition 1, September 2026). Every word the buyer sees on a
// coupon or on the coupon key lives here. Each coupon is a small play a grown-up promises a child:
// a starting age in months, what it needs, one line of how, a talk line, easier / harder, a 2-minute
// "tired grown-up" version and its own safety line (brand/BRAND.md hard rule 4; CUSTOMER-VOICE rules 6–7).
// buy: true only if a family may need to get something (CUSTOMER-VOICE rule 6: at least 70% need nothing).
'use strict';

const COUPONS = [
  { t: 'A Blanket Fort', art: 'tent', from: 18, needs: 'Blankets, chairs, a book', c: 'plum',
    how: 'We build a fort together and read a book inside it.', talk: '“Knock, knock! Who lives here?”',
    easy: 'One blanket over the table.', hard: 'Add a door, a window and a sign.', two: 'Blanket over your knees; one page of a book.',
    safe: 'Nothing heavy on top; no cords or clips holding the blankets. Keep one side open.' },
  { t: 'A Kitchen Dance Party', art: 'notes', from: 12, needs: 'Any music, or your singing', c: 'sky',
    how: 'You pick three songs and we dance until the last one ends.', talk: '“Fast… slow… FREEZE!”',
    easy: 'Hold your baby and sway.', hard: 'Take turns leading the moves.', two: 'One song, one twirl.',
    safe: 'Clear the floor first. Bare feet or grippy socks.' },
  { t: 'Pancake Helper', art: 'pancakes', from: 30, needs: 'Pancake things, a bowl, a spoon', c: 'sun', buy: true,
    how: 'You measure, pour and stir. The grown-up does the stove.', talk: '“Pour… stir, stir… (wait) more?”',
    easy: 'You stir; the grown-up pours.', hard: 'Count the spoonfuls and read the steps together.', two: 'Stir the bowl ten times together.',
    safe: 'Only the grown-up works at the stove and flips. Hot pan stays at the back. Check allergies.' },
  { t: 'A Walk Where You Lead', art: 'tree', from: 12, needs: 'Shoes and coats', c: 'grass',
    how: 'You choose which way we turn at every corner.', talk: '“Left or right? (wait) You choose!”',
    easy: 'Stroller or carrier walk; name what you see.', hard: 'Draw a map of where we went.', two: 'Once around the block, or to the window and back.',
    safe: 'Hold hands near roads. Look, don’t taste: berries, nuts and leaves stay out of mouths.' },
  { t: 'Build Anything', art: 'blocks', from: 18, needs: 'Blocks, boxes or cushions', c: 'tomato',
    how: 'We build whatever you say: a tower, a house, a zoo.', talk: '“Up, up, up… CRASH!”',
    easy: 'Stack three, knock them down.', hard: 'Build a bridge a toy can drive under.', two: 'One tower, one crash.',
    safe: 'Under 3: only blocks too big to fit through a toilet-paper tube. Keep towers below chest height.' },
  { t: 'Bubble Time', art: 'bubbles', from: 12, needs: 'Bubble mix and a wand', c: 'sky', buy: true,
    how: 'The grown-up blows bubbles and you chase, clap and pop them.', talk: '“Big bubble… (wait) POP!”',
    easy: 'Pop them with one finger.', hard: 'Blow your own and count them.', two: 'Ten bubbles, ten pops.',
    safe: 'A grown-up blows bubbles for children under 3. Wipe up spills so no one slips. Nobody drinks the mix.' },
  { t: 'A Sock Puppet Show', art: 'sockfriend', from: 24, needs: 'Clean socks, a sofa', c: 'plum',
    how: 'We make sock puppets and put on a show behind the sofa.', talk: '“Hello! (wait) What’s your name?”',
    easy: 'The grown-up’s puppet says hello and tickles.', hard: 'Your puppet tells a story with a start and an end.', two: 'One sock, one “Hello!”',
    safe: 'Socks with nothing sewn or glued on: no buttons, beads or pom-poms.' },
  { t: 'A Living-Room Picnic', art: 'basket', from: 18, needs: 'A blanket, a snack', c: 'grass',
    how: 'We spread a blanket on the floor and have a picnic with your toys.', talk: '“Teddy wants… (wait) a cracker?”',
    easy: 'One snack, one toy guest.', hard: 'Plan the menu and set a place for every guest.', two: 'Snack on a towel on the floor.',
    safe: 'Soft food cut small, eaten sitting down. No whole grapes, nuts, popcorn or hard candy for little ones.' },
  { t: 'Paint Together', art: 'brush', from: 24, needs: 'Paper, washable paint, a brush', c: 'tomato', buy: true,
    how: 'We each paint a picture, then swap and add to each other’s.', talk: '“What color next? (wait) Red?”',
    easy: 'Water painting on a fence or a chalkboard.', hard: 'Paint a picture of our day.', two: 'Three brush strokes each.',
    safe: 'Washable, non-food paint with a grown-up beside. An old shirt as a smock.' },
  { t: 'Bake Together', art: 'cookie', from: 36, needs: 'A simple recipe', c: 'sun', buy: true,
    how: 'You pour, stir and shape. The grown-up does the oven.', talk: '“Roll, roll… squash!”',
    easy: 'You press the shapes; the grown-up does the rest.', hard: 'Read the recipe pictures and count the scoops.', two: 'Squash one ball of dough together.',
    safe: 'Only the grown-up uses the oven and hot trays. No tasting raw dough. Check allergies.' },
  { t: 'A Ball Game', art: 'ball', from: 12, needs: 'A soft ball', c: 'sky',
    how: 'We roll, kick and throw a ball at the park or down the hall.', talk: '“Ready, set… (wait) roll!”',
    easy: 'Sit facing each other and roll it back and forth.', hard: 'Kick it between two shoes: a goal!', two: 'Five rolls back and forth.',
    safe: 'A soft ball too big to fit through a toilet-paper tube. Play away from roads and stairs.' },
  { t: 'A Box Car', art: 'boxcar', from: 30, needs: 'A big cardboard box, crayons', c: 'tomato',
    how: 'We turn a big box into a car, draw the wheels and go for a drive.', talk: '“Beep beep! Where are we going?”',
    easy: 'Sit in the box; the grown-up pushes gently.', hard: 'Add lights, a number plate and a map.', two: 'Sit in the box and say “Beep beep!”',
    safe: 'Take out staples and loose tape first. Push slowly on flat floors only.' },
  { t: 'A Treasure Hunt', art: 'map', from: 30, needs: 'A toy to hide, paper', c: 'plum',
    how: 'The grown-up hides a toy and draws a map. You follow it to the treasure.', talk: '“Warmer… warmer… you found it!”',
    easy: 'Hide it half showing, close by.', hard: 'Three clues, one after another.', two: 'Hide it under a cushion right beside you.',
    safe: 'Hide only in safe, easy spots: never up high, near stairs or near cleaning things.' },
  { t: 'A Dress-Up Parade', art: 'hat', from: 24, needs: 'Hats, shirts, shoes', c: 'sun',
    how: 'We dress up in grown-up clothes and march in a parade.', talk: '“Who are you today?”',
    easy: 'Just hats: on, off, on again.', hard: 'Make a costume and tell us who you are.', two: 'One hat each and one march around the room.',
    safe: 'No scarves, ties, belts or cords. Take small parts off anything a child under 3 wears.' },
  { t: 'One Extra Story', art: 'book', from: 12, needs: 'Any book', c: 'grass',
    how: 'At bedtime you get one more story. You choose the book.', talk: '“What happens next? (wait)”',
    easy: 'Look at the pictures and name what you see.', hard: 'You tell the story from the pictures.', two: 'One page, one cuddle.',
    safe: 'A board book for little ones who still mouth pages.' },
  { t: 'You Choose the Play', art: 'star', from: 24, needs: 'Whatever the play needs', c: 'tomato',
    how: 'You choose any play and the grown-up joins in, all the way.', talk: '“Show me how! (wait)”',
    easy: 'Pick between two plays.', hard: 'Plan the play and explain the rules.', two: 'Pick a 2-minute play.',
    safe: 'Grown-up checks the chosen play is safe for your child’s age before starting.' },
];

COUPONS.forEach((p, i) => {
  p.n = i + 1;
  for (const k of ['t', 'art', 'needs', 'how', 'talk', 'easy', 'hard', 'two', 'safe']) if (!p[k]) throw new Error(`Coupon ${p.n}: missing ${k}`);
  if (p.from < 12 || p.from > 60) throw new Error(`Coupon ${p.n}: starting age outside 1–5`);
  p.age = p.from >= 36 ? '3+' : p.from >= 24 ? '2+' : '1+';
});
const NOBUY = COUPONS.filter(p => !p.buy).length;
if (NOBUY / COUPONS.length < 0.7) throw new Error('Fewer than 70% of coupons need nothing to buy (CUSTOMER-VOICE rule 6)');
const BANNED = /\b(christmas|xmas|santa|advent|hanukkah|chanukah|kwanzaa|easter|church|prayer|balloons?|marshmallows?|popcorn|whole grapes|scarf|screens?|tablet|phone|tv)\b/i;
for (const p of COUPONS) {
  const m = [p.t, p.needs, p.how, p.talk, p.easy, p.hard, p.two].join(' ').match(BANNED);
  if (m) throw new Error(`Coupon ${p.n}: "${m[0]}" (secular set; BRAND rule 4; screens are never a reward, CUSTOMER-VOICE 13)`);
}

module.exports = { COUPONS, NOBUY };
