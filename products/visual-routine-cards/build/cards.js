// Card list for Visual Routine Cards. One row = one unique card.
// [artKey, label, starter?]  (starter = included in the 60-card Starter Set)
const { C } = require('./base.js');

const CATS = [
  // id, name, age band, color, tint, label text color on color bar
  { id: 'morning', name: 'Morning', age: '0–5', c: C.sun, t: C.tSun, on: C.ink },
  { id: 'meals', name: 'Meals & snacks', age: '0–5', c: C.tomato, t: C.tTomato, on: '#fff' },
  { id: 'play', name: 'Play', age: '0–5', c: C.sky, t: C.tSky, on: '#fff' },
  { id: 'outside', name: 'Outside', age: '0–5', c: C.grass, t: C.tGrass, on: '#fff' },
  { id: 'reading', name: 'Reading together', age: '0–5', c: C.plum, t: C.tPlum, on: '#fff' },
  { id: 'bath', name: 'Bath time', age: '0–5', c: C.sky, t: C.tSky, on: '#fff' },
  { id: 'bedtime', name: 'Bedtime', age: '0–5', c: C.ink, t: C.tPlum, on: '#fff' },
  { id: 'helping', name: 'Helping jobs', age: '0–5', c: C.grass, t: C.tGrass, on: '#fff' },
  { id: 'feelings', name: 'Feelings check-in', age: 'all ages', c: C.plum, t: C.tPlum, on: '#fff' },
  { id: 'about', name: 'Out & about', age: '0–5', c: C.tomato, t: C.tTomato, on: '#fff' },
  { id: 'words', name: 'Plan words', age: 'all ages', c: C.ink, t: C.wash, on: '#fff' },
  { id: 'screens', name: 'Play first, screens later', age: 'all ages', c: C.tomato, t: C.tSun, on: '#fff' },
  { id: 'bk-morning', name: 'Big-kid mornings', age: '5–12', c: C.sun, t: C.tSun, on: C.ink },
  { id: 'bk-after', name: 'After school', age: '5–12', c: C.sky, t: C.tSky, on: '#fff' },
  { id: 'bk-evening', name: 'Evenings', age: '5–12', c: C.plum, t: C.tPlum, on: '#fff' },
  { id: 'bk-jobs', name: 'Family jobs', age: '5–12', c: C.grass, t: C.tGrass, on: '#fff' },
];

const LIST = {
  morning: [
    ['wakeUp', 'Wake up', 1], ['openCurtains', 'Open curtains'], ['potty', 'Potty', 1], ['diaper', 'Diaper change'],
    ['washFace', 'Wash face', 1], ['brushTeeth', 'Brush teeth', 1], ['brushHair', 'Brush hair'], ['getDressed', 'Get dressed', 1],
    ['socks', 'Socks on'], ['shoesOn', 'Shoes on', 1], ['coatOn', 'Coat on', 1], ['warmHat', 'Warm hat'], ['sunHat', 'Sun hat'],
    ['packBag', 'Pack my bag', 1], ['hugGoodbye', 'Hug goodbye', 1], ['carRide', 'Car ride', 1], ['stroller', 'Stroller ride'],
    ['walkToSchool', 'Walk to school'], ['preschool', 'Preschool', 1], ['grandparents', 'Grandparents'],
  ],
  meals: [
    ['washHands', 'Wash hands', 1], ['breakfast', 'Breakfast', 1], ['lunch', 'Lunch', 1], ['dinner', 'Dinner', 1], ['snack', 'Snack', 1],
    ['drinkWater', 'Drink water', 1], ['milk', 'Milk'], ['sitAtTable', 'Sit at the table'], ['bib', 'Bib on'], ['tryABite', 'Try a bite'],
    ['allDoneEat', 'All done eating', 1], ['familyMeal', 'Family meal'],
  ],
  play: [
    ['playTime', 'Play time', 1], ['blocks', 'Blocks', 1], ['ball', 'Ball', 1], ['puzzle', 'Puzzle', 1], ['toyCars', 'Cars'], ['train', 'Trains'],
    ['teddy', 'Teddy'], ['pretendKitchen', 'Pretend cooking', 1], ['teaParty', 'Tea party'], ['dressUp', 'Dress-up'], ['drawing', 'Drawing', 1],
    ['painting', 'Painting'], ['playDough', 'Play dough'], ['music', 'Music', 1], ['sing', 'Sing a song'], ['dance', 'Dance'],
    ['bubbles', 'Bubbles'], ['stacker', 'Stacking rings'], ['shapeSorter', 'Shape sorter'], ['fort', 'Blanket fort'], ['puppets', 'Puppet show'],
    ['playFriend', 'Play with a friend'], ['peekaboo', 'Peekaboo'], ['tummyTime', 'Tummy time'], ['quietTime', 'Quiet time'],
  ],
  outside: [
    ['goOutside', 'Go outside', 1], ['park', 'Park', 1], ['slide', 'Slide', 1], ['swing', 'Swing'], ['sandbox', 'Sandbox'], ['walk', 'Walk', 1],
    ['natureWalk', 'Nature hunt'], ['trike', 'Trike ride'], ['garden', 'Garden'], ['puddles', 'Puddle jumping', 1], ['chalk', 'Chalk'],
    ['kickBall', 'Kick a ball'], ['picnic', 'Picnic'], ['sunscreen', 'Sunscreen'], ['snow', 'Snow play'], ['bugs', 'Bug spotting'],
    ['birds', 'Bird watching'], ['wagon', 'Wagon ride'], ['waterPlay', 'Water play'],
  ],
  reading: [
    ['readTogether', 'Read together', 1], ['chooseBook', 'Choose a book'], ['library', 'Library', 1], ['pointName', 'Point and name'],
    ['talkPictures', 'Talk about it'], ['tellStory', 'Tell a story'], ['readToTeddy', 'Read to teddy'], ['bedtimeStory', 'Bedtime story', 1],
    ['rhymes', 'Rhymes & songs'], ['libraryBag', 'Library bag'],
  ],
  bath: [
    ['bathTime', 'Bath time', 1], ['bathToys', 'Bath toys'], ['washHair', 'Wash hair'], ['rinse', 'Rinse'], ['towel', 'Towel dry', 1], ['lotion', 'Lotion'],
  ],
  bedtime: [
    ['pajamas', 'Pajamas', 1], ['brushTeethNight', 'Brush teeth', 1], ['lullaby', 'Lullaby', 1], ['cuddle', 'Cuddle', 1], ['nightLight', 'Night-light'],
    ['lightsOff', 'Lights off', 1], ['sleep', 'Sleep', 1], ['nap', 'Nap', 1], ['goodnight', 'Say goodnight'], ['lovey', 'Teddy & blanket'],
    ['sleepSack', 'Sleep sack'], ['windDown', 'Lights low'],
  ],
  helping: [
    ['tidyToys', 'Tidy up toys', 1], ['feedPet', 'Feed the pet', 1], ['waterPlants', 'Water the plants'], ['laundry', 'Laundry basket', 1],
    ['matchSocks', 'Match the socks'], ['wipeSpill', 'Wipe up spills'], ['setTable', 'Set the table', 1], ['helpCook', 'Help cook'],
    ['shoesAway', 'Shoes away'], ['carryBags', 'Carry the shopping'], ['recycling', 'Recycling'], ['foldTowels', 'Fold towels'],
    ['makeBed', 'Make my bed'], ['booksBack', 'Books back'], ['helpBaby', 'Help with baby'], ['sweep', 'Sweep'],
  ],
  feelings: [
    ['fHappy', 'Happy', 1], ['fSad', 'Sad', 1], ['fMad', 'Mad', 1], ['fWorried', 'Worried', 1], ['fScared', 'Scared'], ['fTired', 'Tired', 1],
    ['fExcited', 'Excited'], ['fCalm', 'Calm', 1], ['fSilly', 'Silly'], ['fProud', 'Proud'], ['fFrustrated', 'Frustrated'],
    ['fSurprised', 'Surprised'], ['fShy', 'Shy'], ['fLoved', 'Loved'], ['fBored', 'Bored'], ['fHungry', 'Hungry'],
    ['bigBreath', 'Big breath', 1], ['askHug', 'Ask for a hug', 1], ['calmCorner', 'Cozy corner'], ['squeezePillow', 'Squeeze a pillow'],
    ['askHelp', 'Ask for help'], ['talkAbout', 'Talk about it'], ['countFive', 'Count to five'], ['stretch', 'Big stretch'], ['drawIt', 'Draw it out'], ['quietEars', 'Quiet ears'],
  ],
  about: [
    ['shopping', 'Grocery store'], ['checkUp', 'Check-up'], ['dentist', 'Dentist'], ['haircut', 'Haircut'], ['friendsHouse', "Friend's house"],
    ['birthday', 'Birthday party'], ['swimLesson', 'Swim lesson'], ['bus', 'Bus ride'], ['airplane', 'Airplane'], ['waiting', 'Waiting'],
  ],
  words: [
    ['wFirst', 'First', 1], ['wThen', 'Then', 1], ['wNow', 'Now'], ['wNext', 'Next'], ['wLater', 'Later'], ['wWait', 'Wait', 1],
    ['wAllDone', 'All done', 1], ['wToday', 'Today'], ['wChange', 'Change of plan'], ['wHelp', 'Help'], ['wYes', 'Yes'], ['wNo', 'No'],
    ['wMore', 'More'], ['wStop', 'Stop'], ['wMyTurn', 'My turn'], ['wBreak', 'Break'],
  ],
  screens: [
    ['playFirst', 'Play first', 1], ['screensLater', 'Screens later', 1], ['screensOff', 'Screens rest'], ['whatNext', 'What we do next'], ['fiveMore', '5 more minutes'],
  ],
  'bk-morning': [
    ['alarm', 'Wake up on time'], ['makeBedBig', 'Make my bed'], ['dressedBig', 'Get dressed'], ['washFaceBig', 'Wash my face'],
    ['floss', 'Brush & floss'], ['hair', 'Do my hair'], ['breakfastBig', 'Eat breakfast'], ['lunchbox', 'Pack my lunch'],
    ['waterBottle', 'Fill water bottle'], ['weather', 'Check the weather'], ['jacketShoes', 'Jacket & shoes'],
    ['backpackDoor', 'Backpack by the door'], ['busStop', 'Bus stop'], ['school', 'School'],
  ],
  'bk-after': [
    ['unpackBag', 'Unpack my bag'], ['snackBig', 'Snack'], ['homework', 'Homework'], ['reading20', 'Read 20 minutes'],
    ['instrument', 'Practice music'], ['sports', 'Sports practice'], ['outsideTime', 'Outside time'], ['bike', 'Bike ride'],
    ['build', 'Build something'], ['artProject', 'Art project'], ['boardGame', 'Board game'], ['freePlay', 'Free play'],
    ['jobsList', 'Check my list'], ['familyGame', 'Family game night'], ['playFirstBig', 'Play first'], ['screensLaterBig', 'Screens later'],
  ],
  'bk-evening': [
    ['helpDinner', 'Help make dinner'], ['familyDinnerBig', 'Family dinner'], ['clearTable', 'Clear the table'], ['dishes', 'Wash dishes'],
    ['shower', 'Shower'], ['pjBig', 'Pajamas on'], ['layOut', "Lay out tomorrow's clothes"], ['packTomorrow', 'Pack for tomorrow'],
    ['talkDay', 'Talk about my day'], ['journal', 'Journal'], ['readInBed', 'Read in bed'], ['devicesSleep', 'Devices sleep outside my room'],
    ['lightsOutBig', 'Lights out'],
  ],
  'bk-jobs': [
    ['tidyRoom', 'Tidy my room'], ['washer', 'Laundry'], ['foldClothes', 'Fold clothes'], ['trash', 'Take out trash'], ['sortRecycling', 'Sort recycling'],
    ['putAwayDishes', 'Put dishes away'], ['vacuum', 'Vacuum'], ['houseplant', 'Water plants'], ['feedPetBig', 'Feed the pet'], ['walkDog', 'Walk the dog'],
    ['wipeCounter', 'Wipe counters'], ['setTableBig', 'Set the table'], ['helpSibling', 'Help a sibling'], ['rake', 'Rake leaves'], ['makeLunch', 'Make lunch'],
  ],
};

const slug = s => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const CARDS = [];
for (const cat of CATS) {
  for (const [art, label, starter] of LIST[cat.id]) {
    CARDS.push({ id: `${cat.id}-${slug(label)}`, cat: cat.id, art, label, starter: !!starter });
  }
}
const ids = new Set(); CARDS.forEach(c => { if (ids.has(c.id)) throw new Error('dup id ' + c.id); ids.add(c.id); });
const CAT = Object.fromEntries(CATS.map(c => [c.id, c]));
module.exports = { CATS, CAT, CARDS, LIST };
if (require.main === module) {
  const young = CARDS.filter(c => !c.cat.startsWith('bk-')).length, big = CARDS.length - young;
  console.log('total', CARDS.length, 'young/all-ages', young, '5-12', big, 'starter', CARDS.filter(c => c.starter).length);
  CATS.forEach(c => console.log(c.id, LIST[c.id].length));
}
