// First Phone Agreement Kit (ages 9–12): every word in one place.
// HUMAN AUTHORSHIP (brand/BRAND.md): the founder rewrites these lines in her own words, chooses which
// promises, zones and afternoon ideas stay, reorders them, and picks the colours. Then rebuild with
//   bash products/first-phone-plan/build/make-all.sh
// and commit every draft, so her creative changes are on record. Never describe this draft as human-written.
//
// House rules for this file (BRAND.md + marketing/CUSTOMER-VOICE.md):
// - Warm agreement, never a contract of punishments. The phone is never a prize and never a punishment.
// - Fun and independence framing. No mental-health, sleep, brain, grades or safety-outcome claims.
// - Never name an app, a device brand, a website or a company. "Phone" means any phone.
// - No fear words (rewiring, damage, addiction, toxic, zombie, predator, dangerous). Never scary.
// - No age deadlines: there is no right age; every family decides.

const VERSION = 'Version 1.0 · September 2026';
const COPY = '© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC.';
const BONUS = 'playbeforepixels.com/bonus/first-phone-plan';
const TITLE = 'First Phone Agreement Kit';

// ---------- the big idea (printed on the agreement and the guide) ----------
const BIG_IDEA = 'A first phone is a step toward independence. In our home it is a tool for staying in touch and trying new things. It is never a prize, and never a punishment. When something goes wrong, we talk it through and figure it out together.';

// ---------- readiness checklist: 16 things, 4 groups (no score, no right age) ----------
const READY = [
  { t: 'Looking after things', art: 'keysBag', rows: [
    'I keep track of my things (bag, keys, water bottle) most days.',
    'I put things back where they go, like chargers and school stuff.',
    'I tell a grown-up when I lose or break something.',
    'I look after things I borrow and give them back.',
  ] },
  { t: 'Time and plans', art: 'alarm', rows: [
    'I wake up with an alarm clock.',
    'I can stop a game when time is up, with one reminder.',
    'I finish homework or practice before free time on most days.',
    'I can plan an afternoon and stick to it.',
  ] },
  { t: 'People', art: 'friendsFirst', rows: [
    'I can ask a shop worker or librarian for help, face to face.',
    'I can say “no thanks” to a friend and still be friends.',
    'I stay kind, even when I’m annoyed.',
    'I tell a grown-up when something feels off.',
  ] },
  { t: 'Out and about', art: 'homeAddress', rows: [
    'I know my address and two grown-ups’ numbers by heart.',
    'I know what to do if I lose my grown-up in a busy place.',
    'I can make a plan with a friend and keep it.',
    'I know how and when to call the emergency number.',
  ] },
];

// ---------- 10 practice missions before the first phone ----------
const MISSIONS = [
  ['alarm', 'Alarm-clock week', 'Wake up with an alarm clock for 7 days. No grown-up wake-up calls.'],
  ['numbersCard', 'Numbers by heart', 'Learn two grown-ups’ phone numbers. Say them at dinner, and keep a copy on a card in your bag.'],
  ['planner', 'Paper planner', 'Keep a paper planner for 2 weeks: homework, practice, plans.'],
  ['mapCompass', 'Lead the way', 'Walk a route you know with a grown-up. You lead; they follow.'],
  ['friendsFirst', 'Make a plan', 'Plan a meetup with a friend: when, where, and how you get home. A grown-up says OK.'],
  ['askHelp', 'Ask in person', 'Order at a counter or ask a librarian a question yourself, with your grown-up close by.'],
  ['writeLetter', 'Snail mail', 'Write a letter to a relative, address it and mail it.'],
  ['lookAfter', 'Look after it', 'Borrow something special for a week and give it back in great shape.'],
  ['alarm', 'Timer stop', 'Stop a game when the timer rings, on 5 different days.'],
  ['alwaysCall', 'Call and chat', 'Call a relative on a family phone and chat for a few minutes.'],
];

// ---------- the agreement: kid promises (choose what fits) ----------
const KID_PROMISES = [
  { t: 'Where my phone lives', art: 'phoneBed', rows: [
    'My phone sleeps at its charging spot, outside my bedroom, at night.',
    'I park my phone at meals and family time.',
    'I keep my phone in its case and look after it.',
  ] },
  { t: 'Kind and honest', art: 'kindWords', rows: [
    'I only send words I would say to someone’s face.',
    'I ask before I take or share a photo of someone.',
    'If a group chat turns unkind, I don’t join in, and I tell a grown-up.',
  ] },
  { t: 'Private stays private', art: 'lockInfo', rows: [
    'My passwords stay between me and my grown-ups.',
    'I don’t share my address, school or where I am with people I haven’t met in person.',
    'I only chat with people I know in real life.',
  ] },
  { t: 'Ask first', art: 'askDownload', rows: [
    'I ask before I download anything new, even free things.',
    'I ask before I buy anything.',
    'I ask before I join a new group or sign up for anything.',
  ] },
  { t: 'If something feels off', art: 'tellGrownup', rows: [
    'If I see something weird, unkind or too grown-up, I tell a grown-up.',
    'If anyone asks me to keep a secret from my grown-ups, I tell a grown-up.',
    'I can call home any time, from anywhere.',
  ] },
  { t: 'Eyes up, life first', art: 'eyesUp', rows: [
    'I put my phone away when I’m walking, crossing streets or talking with someone.',
    'Friends in the room come first.',
    'I keep making time for play, outside time and the things I love.',
  ] },
];
// ---------- the agreement: grown-up promises ----------
const GROWN_PROMISES = [
  'If you tell me something went wrong, I’ll thank you first. You won’t be in trouble for telling.',
  'I’ll answer your questions calmly, even the tricky ones.',
  'I’ll follow our phone-free zones and times too.',
  'I’ll ask before I share photos of you.',
  'I’ll tell you before I change a rule, and why.',
  'We’ll look at the phone together sometimes, openly.',
  'I’ll notice what you do well, and say it out loud.',
  'I’ll keep making time to play and talk with you.',
];
const WHEN_WRONG = [
  ['Pause.', 'Park the phone for now. Take a breath. Nobody is in trouble for telling.'],
  ['Talk it through.', 'What happened? What did you notice? What could we try next time?'],
  ['Re-read and adjust.', 'Read this agreement together. Change a line if it isn’t working.'],
];

// ---------- phone-free zones (tick the ones you choose) ----------
const ZONES = [
  ['tableZone', 'At the table', 'Meals are for talking.'],
  ['bedroomNight', 'Bedrooms at night', 'Phones sleep at the charging spot.'],
  ['carTalk', 'Short car rides', 'Car time is talk time.'],
  ['homeworkZone', 'Homework time', 'One thing at a time.'],
  ['eyesUp', 'Walking and crossing', 'Eyes up, phone away.'],
  ['friendsOver', 'When friends visit', 'The people in the room come first.'],
  ['gameNight', 'Family game night', 'Everyone plays, grown-ups too.'],
];

// ---------- phone-free times (a day at a glance) ----------
const TIMES = [
  ['fsun', 'Morning', 'Before school', 'phone-free until', 'wake'],
  ['school', 'School hours', 'Phone stays in my bag or at home, per school rules', '', 'school'],
  ['outsideTime', 'After school', 'Phone-free afternoon (see the 30-day challenge)', 'from … to …', 'aft'],
  ['familyDinnerBig', 'Dinner', 'Phones park away from the table', 'from … to …', 'din'],
  ['phoneBed', 'Phone’s bedtime', 'Phone goes to sleep at the charging spot', 'at', 'bed'],
];

// ---------- door and zone signs (8, cut apart) ----------
const SIGNS = [
  ['phoneBed', 'Phones sleep here', 'Good night, phones. See you in the morning.', 'sun'],
  ['tableZone', 'Phone-free table', 'Tonight’s question is more fun anyway.', 'tomato'],
  ['phonePark', 'Phone parking', 'Park it here and come play.', 'sky'],
  ['bedroomNight', 'Phone-free bedroom at night', 'Phones sleep at the charging spot.', 'plum'],
  ['outsideTime', 'Phone-free afternoon in progress', 'Back at dinner. Ask me what I did!', 'grass'],
  ['homeworkZone', 'Homework zone', 'One thing at a time.', 'sky'],
  ['carTalk', 'Car talk', 'Would you rather… ? Your turn!', 'sun'],
  [null, '', 'Write your own sign', 'tomato'],
];

// ---------- 30 phone-free afternoons (at least 70% need nothing to buy) ----------
// [art, name, how, 2-minute (easier) version, needs (''=nothing to buy), safety, make it harder, prep min, mess]
// Every idea carries a safety line (BRAND.md rule 4) and the four CUSTOMER-VOICE icons: materials, prep, mess, play time (20+ min).
const HOME = 'A grown-up is home and nearby.';
const AFTERNOONS = [
  ['build', 'Cardboard build', 'Turn boxes into a marble run, a robot or a city.', 'Stack 10 things into the tallest tower you can.', '', 'Grown-up handles craft knives. Marbles away from under-3s.', 'Add a moving part: a door, a lever or a ramp.', 2, 'Some'],
  ['paperPlane', 'Paper plane contest', 'Fold 3 designs. Which flies farthest?', 'Fold one plane and throw it once.', '', 'Aim away from faces.', 'Add a hoop target and score points.', 0, 'Low'],
  ['walkDog', 'Neighborhood walk', 'Walk a loop you know and spot 10 new things.', 'Walk to the corner and back.', '', 'A grown-up knows your route and return time.', 'Draw a map of your loop when you get home.', 0, 'None'],
  ['helpDinner', 'Cook a snack', 'Make a snack for the family from what’s in the kitchen.', 'Wash fruit and set out a snack plate.', '', 'Knives and the stove only with a grown-up right there. Toddlers: no nuts, popcorn or whole grapes.', 'Follow a written recipe from start to finish.', 2, 'Some'],
  ['cardTricks', 'Card magic show', 'Learn one card trick and perform it at dinner.', 'Build a card house of 4 cards.', 'A deck of cards', HOME, 'Learn a second trick for a two-act show.', 0, 'None'],
  ['bike', 'Bike or scooter loop', 'Ride a safe loop and time yourself.', 'Pump up the tires and check the brakes.', 'A bike or scooter', 'Helmet on. A grown-up says where.', 'Plan a longer loop and ride it with a grown-up.', 2, 'None'],
  ['writeLetter', 'Snail mail', 'Write a letter or postcard to someone far away.', 'Write 3 lines on a sticky note for someone at home.', 'A stamp', 'A grown-up checks the address before it’s mailed.', 'Start a pen-pal swap: one letter a week.', 0, 'None'],
  ['boardGame', 'Invent a board game', 'Draw a board, write rules, test it with the family.', 'Play one round of a game you already have.', '', 'Small game pieces away from under-3s.', 'Add cards, a timer or a secret rule.', 0, 'Low'],
  ['natureWalk', 'Nature detective', 'Collect 5 leaves or stones and name them.', 'Look out a window and count birds.', '', 'Look, don’t taste. No berries or mushrooms.', 'Make a labeled nature poster.', 0, 'Low'],
  ['instrument', 'Learn a song', 'Practice one new song until you can play or sing it through.', 'Hum a song and let someone guess it.', '', HOME, 'Perform it for the family, or write a new verse.', 0, 'None'],
  ['fort', 'Fort afternoon', 'Build a blanket fort and read inside it.', 'Drape one blanket over two chairs.', '', 'Draped, never tied. No cords near necks.', 'Add a door flap, a sign and a reading lamp.', 2, 'Low'],
  ['drawing', 'Comic strip', 'Draw a 6-panel comic about your family.', 'Draw one funny face.', '', HOME, 'Make a 4-page comic book with a cover.', 0, 'Low'],
  ['sports', 'Backyard games', 'Set up an obstacle course or a target game.', 'Toss a ball 20 times without dropping it.', '', 'Clear space; a grown-up nearby.', 'Time each run and beat your best.', 2, 'Low'],
  ['chooseBook', 'Library trip', 'Choose 3 books, one you’d never usually pick.', 'Swap books with someone at home.', '', 'Go with a grown-up or as you agreed.', 'Tell the family the best part at dinner.', 0, 'None'],
  ['garden', 'Plant something', 'Plant seeds or repot a plant.', 'Water every plant in the house.', 'Seeds or a small plant', 'Gloves on; wash hands after.', 'Keep a growth chart for 2 weeks.', 2, 'Some'],
  ['puzzle', 'Puzzle race', 'Race a grown-up to finish a puzzle.', 'Do 20 pieces together.', '', 'Keep small pieces away from under-3s.', 'Try a bigger puzzle against a timer.', 0, 'None'],
  ['dance', 'Dance-off', 'Make up a routine and teach it to the family.', 'One song, everyone dances.', '', 'Clear the floor first.', 'Add a second song and a costume change.', 0, 'None'],
  ['journal', 'Write a story', 'Write a story with a twist ending.', 'Write the first line of a story.', '', HOME, 'Illustrate it and read it aloud at dinner.', 0, 'None'],
  ['mapCompass', 'Map your street', 'Draw a map of your street or a treasure map.', 'Draw your room from above.', '', 'Treasure hunts stay at home or in the yard.', 'Hide a treasure; let someone follow your map.', 0, 'Low'],
  ['picnic', 'Picnic', 'Pack a picnic and eat outside or on the floor.', 'Eat your snack on a blanket.', '', 'Knives only with a grown-up right there. Toddlers: no nuts, popcorn or whole grapes.', 'Plan the menu, pack it and clean up yourself.', 2, 'Some'],
  ['birds', 'Bird count', 'Count birds for 20 minutes. Which kind wins?', 'Count birds for 2 minutes.', '', 'A grown-up knows where you are.', 'Make a tally chart and compare two days.', 0, 'None'],
  ['artProject', 'Art studio', 'Paint, collage or sculpt something to give away.', 'Draw with your other hand.', '', 'Beads and small bits away from under-3s.', 'Make a set of 3 and hang a family gallery.', 2, 'Some'],
  ['helpSibling', 'Teach someone', 'Teach a sibling, cousin or grown-up something you’re good at.', 'Show one quick trick.', '', HOME, 'Make a 5-step how-to poster.', 0, 'None'],
  ['rake', 'Outdoor helper', 'Rake, sweep or tidy an outdoor space.', 'Pick up 10 things outside.', '', 'Gloves on; a grown-up nearby.', 'Finish a whole job, start to end.', 0, 'Some'],
  ['cloudWatch', 'Sky watch', 'Lie outside and find shapes in the clouds.', 'Look out a window and name 3 cloud shapes.', '', 'Never look at the sun.', 'Draw the shapes and name the cloud types.', 0, 'None'],
  ['playFriend', 'Friend afternoon', 'Invite a friend over for a phone-free play date.', 'Plan the next play date together.', '', 'Grown-ups agree on the plan.', 'Plan the games, the snack and the clean-up.', 2, 'Low'],
  ['talkDay', 'Interview a grown-up', 'Ask a grown-up 10 questions about when they were your age.', 'Ask one question at dinner.', '', HOME, 'Turn the answers into a mini family book.', 0, 'None'],
  ['puppets', 'Put on a show', 'Write and perform a play, puppet show or talent show.', 'Tell a joke to 3 people.', '', 'Costumes: no cords or strings around necks.', 'Make tickets and a program.', 2, 'Low'],
  ['familyGame', 'Game afternoon', 'Play a board or card game marathon.', 'One quick game of cards.', '', 'Small game pieces away from under-3s.', 'Run a family tournament with a score sheet.', 0, 'None'],
  ['freeChoice', 'Your choice!', 'Plan the whole afternoon yourself.', 'Pick one idea from this list.', '', 'A grown-up says OK to the plan first.', 'Plan a whole Saturday with a grown-up.', 0, 'Low'],
];

// ---------- monthly check-in questions ----------
const CHECKIN = [
  'What’s going well?',
  'What’s been tricky?',
  'Anything you saw or heard that you want to talk about?',
  'One line to change in our agreement?',
  'One new step you’d like to try next?',
];

// ---------- quick answers ----------
const FAQ = [
  ['What age is this for?', 'It’s written for ages 9–12. There’s no right age for a first phone; every family decides. The readiness checklist helps you see what to practice next.'],
  ['Our child doesn’t have a phone yet. Is it still useful?', 'Yes. Start with the readiness checklist, the 10 practice missions and the 30-day challenge. The agreement will be ready when you are.'],
  ['Is this a contract with punishments?', 'No. It’s a warm agreement you write together. The phone is never used as a prize or a punishment. When something goes wrong, you pause, talk and adjust.'],
  ['What can I edit?', 'Every blank line and tick box is fillable: names, dates, times, promises, zones, plan answers and the tracker. Printed wording, colors and pictures can’t be changed.'],
  ['Does it work with any phone, tablet or console?', 'Yes. Nothing here depends on a type of device, an app or a company. The zones, times and fridge-door plan work for any screen in the house.'],
  ['How long does it take?', 'About 30 minutes to fill in the agreement and plan together, then 5 minutes a month to check in.'],
  ['What if a promise keeps getting broken?', 'Talk about what makes it hard, then change the setup, not the child: move the charging spot, try a practice mission, or rewrite the line together. The agreement is meant to change as they grow.'],
  ['What if my child tells me something worrying?', 'Thank them for telling and stay calm. Don’t reply or delete anything yet; save a copy so you can look at it together, then talk it through. If someone may be at risk right now, call your local emergency number.'],
  ['Can a second home use it?', 'Yes. Print a second fridge-door plan for the other home. The license covers your own family’s homes.'],
  ['Is this medical or professional advice?', 'No. It’s parent education and family planning. For questions about your child’s health or development, talk with your child’s doctor.'],
];

module.exports = { VERSION, COPY, BONUS, TITLE, BIG_IDEA, READY, MISSIONS, KID_PROMISES, GROWN_PROMISES, WHEN_WRONG, ZONES, TIMES, SIGNS, AFTERNOONS, CHECKIN, FAQ };
