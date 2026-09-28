// Per-play extras for "100 Screen-Free Plays for Ages 0–5" (index = play number - 1), added in the audit of Sept 28, 2026
// to meet marketing/CUSTOMER-VOICE.md rules 11–15 (play-time icon, "Nothing to buy" badge, starting age in months,
// a "Make it easier / Make it harder" pair) plus the "Tired-grown-up plays" chapter.
// "Make it harder" is the existing "Grow it" line in grow.js. Every easier line keeps the under-3 small-parts rule.
// FOUNDER: rewrite freely; your wording is part of the human-authored text.

// Expected play time in minutes: 5, 10 or 20 (shown as "about 5 min", "about 10 min", "20+ min").
// Rule 12: no play takes longer to prep than to play, so every 10-minute setup is paired with 20+ minutes of play.
const TIME = [
  5, 5, 5, 5, 5, 5, 5, 10, 5, 5, 5, 5, 5, 5, 5, 5, 10, 5, 5, 5, // 1–20
  10, 5, 20, 10, 10, 10, 5, 5, 10, 10, 10, 20, 10, 10, 5, 5, 5, 5, 10, 5, 10, 5, 10, 5, 5, // 21–45
  20, 10, 10, 20, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 5, 10, 10, 10, 10, 10, 10, 10, 5, 5, // 46–70
  20, 20, 5, 20, 20, 10, 10, 10, 10, 10, 20, 10, 20, 5, 20, 10, 10, 10, 20, 10, 10, 10, 20, 10, 5, 20, 20, 10, 10, 10, // 71–100
];

// Plays that need something many homes don't already have (the rest carry the "Nothing to buy" badge).
const BUY = new Set([2, 23, 26, 35, 50, 51, 57, 75, 79, 86, 99]);

// "Make it easier" line for each play.
const EASY = [
  'Just smile and wait. A slow blink or a smile back is a turn.',
  'Lie back and rest your baby on your chest, facing you, for a minute or two.',
  'Name one step each time: "Clean diaper!"',
  'Keep Sock still and let your baby look at it and reach for it.',
  'Move one foot at a time, slowly, in time with your song.',
  'Shake the rattle where your baby can see it first, then move it slowly to one side.',
  'Cover your eyes with your hands instead of the towel, and keep the wait short.',
  'Trickle a little water over your baby’s hand and say "drip, drip".',
  'Put the ball in your baby’s hands and help them push it away.',
  'Leave half of each washcloth sticking out so it’s easy to grab.',
  'Put your hand over your baby’s and tap together, slowly.',
  'Just do "out": fill the bucket yourself and let your baby tip it over.',
  'Build a tower of just two cups.',
  'Hide the toy for just a second, then bring it straight back.',
  'Stand under a tree together and watch the leaves move.',
  'Sing the whole song with no stop, rocking slowly.',
  'Skip the tunnel: lie on the floor and let your baby crawl over your legs.',
  'Stop at just one thing, like the light, and name it every time you pass.',
  'Choose a book with one big picture on each page.',
  'Just sway slowly and hum.',
  'Take the lid off the box and drop the big lids straight in.',
  'Keep the basket still: your toddler climbs in and out while you say "in!" and "out!"',
  'Lay the contact paper flat on the floor, sticky side up, taped at the corners.',
  'Use just two socks: one big, one little.',
  'Dip your fingers in the water and "paint" with them instead of a brush.',
  'Blow a few bubbles low down, where they’re easy to reach and pop.',
  'Use one cup: hide the toy and lift it with a "there it is!"',
  'Stick to two animals your toddler already loves.',
  'Leave the box still and pretend to steer: "beep beep!"',
  'Make a small hill of two cushions.',
  'Skip the water: "wash" the doll with a dry cloth and name each part.',
  'Use just one big cup and one bowl. If your child doesn’t like the feel of the oats, a spoon is fine.',
  'Roll the ball down a slope you hold with your hands.',
  'Hand over one item at a time and name it.',
  'Fold a bigger tab on each strip so it’s easy to pinch.',
  'Sit on the floor with your toddler on your knees and do a gentle "up… and down".',
  'Offer one snack and wait for a reach or a look before you hand it over.',
  'Make one face at a time, starting with happy, and wait for a smile.',
  'Push the box together, your hands next to theirs.',
  'Sing one verse, the hand-washing one, every day.',
  'Pick up one big leaf and look at it together. No bag needed.',
  'Hide the toy behind your back and knock on the floor.',
  'Start with one pot and one lid.',
  'Just follow your toddler and copy what they do.',
  'Say "Ring, ring! Hello!" and hand it over. That’s the whole call.',
  'Skip the cutting: tip the box on its side and it’s a house already.',
  'Use two colors only.',
  'Just stir and taste together: "Mmm, yummy!"',
  'Wash one toy together with a damp cloth, on a towel.',
  'Make a course of two steps: over a cushion, then a jump.',
  'Tape one straight road and drive back and forth.',
  'Hold hands and freeze together.',
  'Shine the light on a teddy and make its shadow big and small.',
  'Use two very different things, like a sock and a spoon, and let your child peek.',
  'Put three things on the shelf and shop together.',
  'Hold hands and step in together, then stomp.',
  'Trace just one hand each.',
  'Give your child one big lettuce leaf to tear.',
  'Cover Teddy with the blanket and sing one song.',
  'Try two things only: a sponge that floats and a big metal spoon that sinks.',
  'Just stomp together, then stop.',
  'Use three pairs of shoes.',
  'Count to three and knock it down.',
  'Hide the toy in plain sight while your child watches.',
  'Use empty cups and pour pretend tea only.',
  'Look at one photo and name the people in it.',
  'Just hold the plate and turn it: "Turn, turn, beep!"',
  'Use one crayon and one sheet of paper.',
  'Count to three, then start again.',
  'Leave off the last word in the one rhyme your child knows best.',
  'Skip the cutting: sit in the open box and do the countdown.',
  'Drape the blanket over one chair, or over the table.',
  'Spy things close by, like your own shirt or the seat.',
  'Look for three things, all the same color.',
  'Just roll balls and "sell" them one at a time.',
  'Play without the trick: copy every move.',
  'Use one object and tell a two-line story together.',
  'Put the bread on the plate first; your child just spreads and folds.',
  'Draw three squares in a line and jump with two feet.',
  'Just walk and stop together, holding hands.',
  'Skip the menu and take orders out loud.',
  'Deliver one letter to one person in the same room.',
  'Stand in the sun and watch your shadows move as you wave.',
  'Stick to one easy word, like "cat", and take turns with rhymes, real or silly.',
  'Build one pen for one animal.',
  'Hold the spoon steady for your child and skip the patterns.',
  'Use two faces only: happy and sad.',
  'Measure something short, like a rug or a step.',
  'Dig one small patch together and just look for worms.',
  'Crumple the paper into a ball and throw that instead.',
  'Make one sock puppet say hello from behind the sofa.',
  'Sort into two boxes: paper and not paper.',
  'Use one cup and one jug.',
  'Your child gives one instruction at a time.',
  'Share just one thing: the best part.',
  'Put three things on the list.',
  'Add one hat and choose a job.',
  'Stick the notes where your child can see them from the doorway.',
  'Walk the line forwards, holding hands.',
  'Choose one play for tomorrow together.',
];

// Starting age in months, from the play's age range.
function fromMonths(age) {
  const m = age.match(/^(\d+)–(\d+)\s*(mo|yrs)/);
  if (!m) throw new Error('Unreadable age: ' + age);
  return m[3] === 'yrs' ? +m[1] * 12 : +m[1];
}

// Tired-grown-up plays: 2 minutes, no setup, run from the couch or the floor (CUSTOMER-VOICE rule 14).
const TIRED = [
  { t: 'Couch peekaboo', from: 4, need: 'a cushion', how: 'Stay sitting. Hide your face behind a cushion, wait, then pop out with a smile.', talk: '“Where did I go? … Here I am!”', safe: 'Hide your own face. Never cover your baby’s face.' },
  { t: 'Chest chat', from: 0, need: 'nothing', how: 'Lie back on the sofa or floor with your baby on your chest, facing you. Talk, hum and copy each coo.', talk: '“Ooh? … Ooh! You’re talking to me.”', safe: 'Stay awake. If you feel sleepy, lay your baby on their back in the crib.' },
  { t: 'This little piggy', from: 0, need: 'nothing', how: 'Count your child’s toes with the old rhyme. Slow down before the last line and wait for the giggle.', talk: '“…and this little piggy went… (wait) wee, wee, wee!”', safe: 'Gentle touches. Stop if your child pulls away.' },
  { t: 'Pat-a-cake', from: 6, need: 'nothing', how: 'Clap hands together to "Pat-a-cake". Help little hands at first, then pause and see if your child claps on their own.', talk: '“Pat it and roll it… (wait) …and mark it with a B!”', safe: 'Soft claps. Support a young baby who is sitting.' },
  { t: 'Which hand?', from: 12, need: 'a sock or a toy', how: 'Hide the sock behind your back, then hold out two fists. Your child picks a hand. Swap roles.', talk: '“This hand or that hand?”', safe: 'For under-3s, the toy must be too big to fit through a toilet-paper tube.' },
  { t: 'I’m a mountain', from: 12, need: 'nothing', how: 'Lie on your back on a rug. Your toddler climbs over you like a mountain, again and again, while you stay put.', talk: '“Up the mountain… and down the other side!”', safe: 'You stay lying down on a soft floor, away from furniture corners.' },
  { t: 'Sing what’s happening', from: 12, need: 'nothing', how: 'Sing about right now to any tune you know: "We are sitting on the couch, on the couch."', talk: '“Now we’re yawning on the couch, on the couch!”', safe: 'Sing where you can see your child, and keep the couch clear of cords.' },
  { t: 'Sock toss', from: 18, need: 'rolled-up socks, a laundry basket', how: 'Roll socks into balls. Stay on the couch and cheer while your child throws them into the basket and fetches them back.', talk: '“In! … Oh, missed! Try again?”', safe: 'Soft rolled socks only, too big to fit through a toilet-paper tube.' },
  { t: 'Blanket boat', from: 18, need: 'a blanket', how: 'Sit on a blanket on the floor: it’s a boat. Row with pretend oars and spot pretend fish over the side.', talk: '“Row, row… I see a fish! What do you see?”', safe: 'Sit on the floor. No blankets over heads.' },
  { t: 'Guess the sound', from: 24, need: 'nothing', how: 'Your child closes their eyes. Make one sound (a clap, a knock, a hum, a click of the tongue) and let them guess. Swap.', talk: '“Listen… what was that?”', safe: 'Quiet sounds only, close by.' },
  { t: 'Robot grown-up', from: 30, need: 'nothing', how: 'You are a robot on the couch. Your child gives the orders ("wave!", "blink!", "beep!") and you do them, very slowly.', talk: '“Beep boop. What… is… my… next… job?”', safe: 'Robot moves stay seated. No climbing on the couch arms.' },
  { t: 'Ceiling story', from: 36, need: 'nothing', how: 'Lie side by side and look up. Pick a spot on the ceiling and make up a story about it, one sentence each.', talk: '“That crack is a river. Who lives by the river?”', safe: 'Lie on a clear floor or bed, away from blind and lamp cords.' },
];

module.exports = { TIME, BUY, EASY, TIRED, fromMonths };
