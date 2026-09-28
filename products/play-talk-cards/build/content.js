// Play & Talk Cards (0–5) and Family Talk-Along Cards (5–12): card content, the single source of truth.
//
// FOUNDER (human authorship, brand/BRAND.md): this is the file to rewrite in your own words.
// Change titles, plays, talk tips and prompts; reorder cards; swap in your family's favorites.
// Commit every draft to git so your changes are provable, and log them in
// legal/protection/creation-records-log.md. The AI-drafted wording below is a starting point only.
//
// Safety (BRAND.md rule 4) is built into every 0–5 card:
//  - a grown-up stays within reach for every play (printed on every card back and in the guide);
//  - for under-3s every object is bigger than a toilet-paper tube opening (~1.25 in / 3.17 cm);
//  - no balloons, no cords or strings long enough to wrap a neck, no choking foods anywhere;
//  - water play always says "grown-up within arm's reach".
// Talk tips use plain words only (no trademarked program names, rule 6). No health claims (rule 1).

// ---------- Deck A: 52 Play & Talk Cards, ages 0–5 ----------
// t = title, n = what you need, p = the play, m = talk move (label), k = talk tip, s = safety (optional; band default otherwise), i = icon id
const BANDS = [
  { key: 'b0', ages: '0–1', unit: 'yr', label: '0–12 months', long: 'Babies, 0–12 months', color: 'sky', shape: 'triangle',
    safe: 'Stay within reach. Every item bigger than a toilet-paper tube.' },
  { key: 'b1', ages: '1–2', unit: 'yrs', label: '1–2 years', long: 'Young toddlers, 1–2 years', color: 'grass', shape: 'square',
    safe: 'Stay within reach. Every item bigger than a toilet-paper tube.' },
  { key: 'b2', ages: '2–3', unit: 'yrs', label: '2–3 years', long: 'Toddlers, 2–3 years', color: 'sun', shape: 'star',
    safe: 'Stay within reach. Every item bigger than a toilet-paper tube.' },
  { key: 'b3', ages: '3–5', unit: 'yrs', label: '3–5 years', long: 'Preschoolers, 3–5 years', color: 'tomato', shape: 'circle',
    safe: 'A grown-up plays along and stays nearby.' },
];

const WATER = 'Water play: a grown-up within arm’s reach the whole time. Tip the water out after.';

const MOVES = {
  wait: { name: 'Pause and wait', how: 'Count to five in your head before you help. A look, a sound or a point is a turn.' },
  see: { name: 'Say what you see', how: 'Name what your child is looking at or doing, in short, clear words.' },
  add: { name: 'Repeat and add one', how: 'Say their word back and add one more: “ball” becomes “big ball.”' },
  choice: { name: 'Offer a choice', how: 'Hold up two options and wait. Pointing is a real answer.' },
  lead: { name: 'Follow their lead', how: 'Play what they choose, and talk about what they care about.' },
  sing: { name: 'Sing and gesture', how: 'Add a tune, a clap or a hand sign. Two ways to join in.' },
  turns: { name: 'Take turns', how: 'You go, they go. Back-and-forth is the whole point.' },
  wonder: { name: 'Wonder aloud', how: 'Say “I wonder…” instead of quizzing. Then wait and see.' },
};

const PLAYS = {
  b0: [
    { t: 'Peekaboo Cloth', i: 'cloth', n: 'A dish towel', p: 'Hide your face behind the towel, then pop out: “Peekaboo!” Later, let baby pull it off your head.', m: 'wait', k: 'Pause before “boo.” A kick, a grin or a squeal is baby’s turn.', s: 'Put the towel away after play; never leave it in the crib.' },
    { t: 'Copy Cat Faces', i: 'babyface', n: 'Just you', p: 'Hold baby face to face, close enough to see you well. Open wide, smile big, stick out your tongue. Watch baby try it too.', m: 'add', k: 'Copy baby’s sounds back: “ba” becomes “ba-ba!” Then wait for another.' },
    { t: 'Kitchen Drum', i: 'pot', n: 'A pot and a wooden spoon', p: 'Turn the pot upside down on the floor. Tap it, then hand baby the spoon. Take turns: soft, then loud.', m: 'see', k: 'Name the sounds as they happen: “Bang! Bang! Soft… LOUD!”' },
    { t: 'Where’s Duck?', i: 'hideduck', n: 'A big toy and a towel', p: 'Hide the toy under the towel with a little bit showing. Ask “Where’s duck?” and let baby find it. Cheer!', m: 'wait', k: 'Ask, then count to five in your head before you help.' },
    { t: 'Bubble Watch', i: 'bubbles', n: 'Bubbles', p: 'Blow a few bubbles slowly above baby. Let baby watch, reach and pop. Blow again when baby looks at you.', m: 'see', k: 'Use the same short words each time: “Up, up… pop!”', s: 'You hold the bottle and blow away from baby’s face. Wipe little hands.' },
    { t: 'Rock and Stop', i: 'note', n: 'A song you know', p: 'Hold baby and sway while you sing. Stop in the middle and wait. Start again when baby wiggles or looks at you.', m: 'sing', k: 'The pause is the game. Baby’s wiggle means “more!”' },
    { t: 'Roll It Back', i: 'ball', n: 'A big soft ball', p: 'For babies who can sit: sit facing each other, legs apart. Roll the ball to baby, then help roll it back.', m: 'wait', k: 'Say “Ready… roll!” and wait for baby to look at you first.' },
    { t: 'First Book Chat', i: 'bookopen', n: 'A board book', p: 'Sit baby on your lap. Point to one picture and name it. Let baby pat the pictures and help turn the pages.', m: 'lead', k: 'Talk about whatever baby looks at, even the same page again.' },
    { t: 'In and Out', i: 'basket', n: 'A basket and 4–5 big toys', p: 'Drop toys into the basket one by one: “In!” Tip them out: “Out!” Let baby dump and fill.', m: 'see', k: 'One word for each move: “in,” “out,” “all gone!”' },
    { t: 'Leaf Hello', i: 'tree', n: 'A tree or a big plant', p: 'Carry baby close to a tree or a window plant. Touch a leaf together, look up at the sky, feel the breeze.', m: 'add', k: 'Name it, then add one word: “Leaf. Green leaf. Soft leaf.”', s: 'Stay within reach. Leaves and petals stay out of mouths.' },
    { t: 'Tickle Countdown', i: 'laughhead', n: 'Just you', p: 'Wiggle your fingers in the air: “One… two… three…” then a gentle tickle. Do it again, a little slower.', m: 'wait', k: 'Stop at “two…” A squeal or a kick asks for “three!”' },
    { t: 'Stack and Crash', i: 'cups', n: 'Plastic cups or big blocks', p: 'Stack three cups into a tower. Let baby knock it over. Cheer, and build it again together.', m: 'sing', k: 'Say “up, up, up… crash!” and throw your arms wide on “crash.”' },
    { t: 'Sock Off!', i: 'sock', n: 'A clean grown-up sock', p: 'Slip a big, loose sock halfway onto baby’s foot. Let baby pull it off: “Sock off!” Try the other foot.', m: 'see', k: 'Say it as it happens: “Foot! Sock on… sock off!”', s: 'Stay within reach. Put the sock away after play; socks stay out of mouths.' },
  ],
  b1: [
    { t: 'Box Car', i: 'boxcar', n: 'A big cardboard box', p: 'Your toddler sits in the box. Push it slowly around the room. Stop at “stations” to wave hello.', m: 'wait', k: 'Say “Ready, set…” and wait for “go!” Any sound counts.', s: 'Push slowly on the floor. Pull out staples and tape first.' },
    { t: 'Stir the Soup', i: 'soup', n: 'A pot, a big spoon, big blocks', p: 'Drop blocks into the pot and stir. Blow on the “hot” soup. Serve a spoonful to a teddy.', m: 'choice', k: 'Ask “Hot soup or cold soup?” Hold up two hands and wait.' },
    { t: 'Animal Voices', i: 'animals', n: 'Big toy animals or a picture book', p: 'Hold up an animal and make its sound. Pass it to your child. Swap animals and go again.', m: 'wait', k: 'Say “The cow says…” and leave a gap for “moo.”' },
    { t: 'Pour and Splash', i: 'pour', n: 'A tub of water, 2 plastic cups', p: 'Set the tub on a towel. Pour water from cup to cup. Let your child pour, splash and fill.', m: 'see', k: 'Talk as it happens: “Full… empty! Pour, pour.”', s: WATER },
    { t: 'Block Tower', i: 'tower', n: 'Big blocks', p: 'Build a tower together, one block each. Count as you go. Let them knock it down and start again.', m: 'add', k: 'They say “block,” you say “big block!”' },
    { t: 'Hat Parade', i: 'hat', n: '3–4 hats from around the house', p: 'Try on hats in front of a mirror. Make a silly face in each one. March around the room.', m: 'choice', k: 'Ask “Sun hat or winter hat?” Let them choose yours too.', s: 'Only hats with no ties, cords or pom-poms. Stay within reach.' },
    { t: 'Pillow Mountain', i: 'cushions', n: 'Couch cushions', p: 'Pile the cushions on the floor to make a mountain. Help your child climb up, then slide down.', m: 'see', k: 'Say it as they move: “Up, up, up! Down!”', s: 'On the floor, away from furniture corners. Stay within reach.' },
    { t: 'Sock Toss', i: 'socks', n: 'Rolled-up pairs of socks, a basket', p: 'Toss the sock balls into the basket. Find a big one and a little one. Balance one on your head!', m: 'add', k: '“Sock” becomes “big sock!” or “red sock!”' },
    { t: 'Teddy’s Bedtime', i: 'teddy', n: 'A stuffed toy, a small towel', p: 'Tuck teddy in with the towel. Read teddy a book, sing teddy a song, whisper “night-night.”', m: 'lead', k: 'If they feed teddy instead, talk about the snack.' },
    { t: 'Chair Tunnel', i: 'tunnel', n: 'Two chairs and a blanket', p: 'Drape the blanket over two chairs to make a tunnel. Crawl through together, then take turns.', m: 'see', k: 'Say the word as they move: “In… through… out!”', s: 'Use sturdy chairs that won’t tip. Stay within reach.' },
    { t: 'Clap and Stomp', i: 'hands', n: 'Just you', p: 'Clap twice, stomp twice, pat your knees. Let your child copy you, then you copy their moves.', m: 'lead', k: 'Copy whatever they do. They’re the leader now.' },
    { t: 'Pull-Out Box', i: 'tissuebox', n: 'An empty tissue box, 6 washcloths', p: 'Stuff the washcloths into the box. Your child pulls them out one by one. Stuff them back in and go again.', m: 'wait', k: 'Hold one up: “More?” Wait for a look, a point or a sound.', s: 'Pull out the plastic film from the box opening first. Stay within reach.' },
    { t: 'Kick and Chase', i: 'ball', n: 'A big soft ball', p: 'Roll or kick the ball across the room. Race to it together. Catch it and sit on it!', m: 'choice', k: 'Ask “Kick it or roll it?” Show both, then wait.' },
  ],
  b2: [
    { t: 'Blanket Fort', i: 'fort', n: 'A blanket, chairs, pillows', p: 'Build a fort together. Bring in a book and a teddy. Read inside, then peek out the door.', m: 'see', k: 'Use place words: “in,” “under,” “on top,” “behind.”', s: 'Sturdy chairs only; nothing heavy on top. Stay within reach.' },
    { t: 'Tea Party', i: 'teapot', n: 'Plastic cups and plates, stuffed toys', p: 'Set a pretend table for the toys. Pour pretend tea, pass pretend cake, and clink cups: “Cheers!”', m: 'choice', k: 'Ask as Bear: “More tea? Milk or honey?” Wait for the answer.' },
    { t: 'Color Sort', i: 'sort', n: 'Big blocks in 3 colors, 3 bowls', p: 'Put one of each color in a bowl. Your child sorts the rest. Mix them all up and sort again.', m: 'add', k: '“Red” becomes “red block goes here!”' },
    { t: 'Car Ramp', i: 'ramp', n: 'A board or big book, big toy cars', p: 'Prop the board on the sofa to make a ramp. Race the cars down. Which one goes the farthest?', m: 'see', k: 'Say what happens: “Fast! Slow! Crash!”', s: 'Only cars bigger than a toilet-paper tube, with no loose wheels.' },
    { t: 'Big Paper Art', i: 'crayon', n: 'Big paper, jumbo egg-shaped crayons, tape', p: 'Tape the paper to the floor. Draw lines, dots and circles side by side. Swap crayons now and then.', m: 'see', k: 'Describe, don’t quiz: “Round and round. A big circle!”', s: 'Crayons too big to fit in a toilet-paper tube. Toss broken bits.' },
    { t: 'Freeze Dance', i: 'dancer', n: 'A song to sing or play', p: 'Dance to a song. When the music stops, freeze! Take turns being the one who stops the music.', m: 'lead', k: 'Let your child shout “stop!” and “go!” for you.' },
    { t: 'Sock Puppet Chat', i: 'puppet', n: 'A clean grown-up sock, a marker (yours)', p: 'Draw eyes on the sock and slip it on your hand. The puppet says hello, asks a question, then waits.', m: 'wait', k: 'Puppets are patient. Give extra time to answer.', s: 'Draw the face on: no buttons or stick-on eyes. You keep the marker.' },
    { t: 'Nature Basket', i: 'nature', n: 'A basket, a walk outside', p: 'Collect big leaves, sticks and pinecones. At home, sort them: bumpy, smooth, big, small.', m: 'see', k: 'Name how they feel: “Bumpy pinecone. Smooth stick.”', s: 'Only things bigger than a toilet-paper tube. No berries or mushrooms. Wash hands after.' },
    { t: 'Pretend Shop', i: 'bag', n: 'Empty food boxes, a bag', p: 'Set up a shop on the sofa. Your child fills the bag and pays you with a high five. Then swap jobs.', m: 'choice', k: 'Ask “Cereal or crackers today?” and wait.' },
    { t: 'Toy Bath', i: 'tub', n: 'A tub of water, a washable toy, a cloth', p: 'Give the toy a bath: wash its hands, feet and tummy. Dry it off and tuck it in.', m: 'see', k: 'Name body parts: “Wash the toes. Now the knees!”', s: WATER },
    { t: 'Animal Moves', i: 'frog', n: 'Space to move', p: 'Hop like a frog, stomp like an elephant, tiptoe like a cat. Take turns picking the animal.', m: 'sing', k: 'Add the sound and the move: “Hop, hop, ribbit!”' },
    { t: 'Shape Hunt', i: 'magnifier', n: 'Just you', p: 'Walk around the house looking for circles: a plate, a clock, a wheel. Then hunt for squares.', m: 'see', k: 'Point and name: “Round, like the clock!”' },
    { t: 'Little Helper', i: 'wipe', n: 'A cloth damp with plain water', p: 'Wipe the table together after a meal. Then let your child wipe a chair, then a toy.', m: 'see', k: 'Talk as you work: “Wipe, wipe. All clean!”', s: 'Plain water only: no sprays or wipes. Stay within reach.' },
  ],
  b3: [
    { t: 'Story Box', i: 'storybox', n: 'A box, 3 toys from around the house', p: 'Pull out 3 toys. Make up a story that uses all three. Take turns adding one sentence each.', m: 'lead', k: 'Let the story go anywhere. Ask, “And then what?”' },
    { t: 'Obstacle Course', i: 'cone', n: 'Pillows, a chair, a blanket', p: 'Build a course: crawl under the chair, hop over the pillows, roll across the blanket.', m: 'turns', k: 'Give two-step directions: “Crawl under, then jump!” Then swap.', s: 'Clear the space of sharp corners. A grown-up stays nearby.' },
    { t: 'I Spy Colors', i: 'binoculars', n: 'Just you', p: '“I spy something green.” Your child guesses. Then they pick something and give you the clue.', m: 'turns', k: 'If they get stuck, add a hint: “It’s round…”' },
    { t: 'Restaurant', i: 'plate', n: 'Paper, crayons, plates', p: 'Draw a menu together. Your child takes your order, “cooks” it and brings it to the table. Swap roles.', m: 'choice', k: 'Ask “Soup or pizza? Anything else?”' },
    { t: 'Box Rocket', i: 'rocket', n: 'A big box, crayons', p: 'Draw buttons and windows on the box. Climb in, count down from ten, and blast off to the moon.', m: 'lead', k: 'Ask “Where are we flying? What’s out the window?”', s: 'Pull out staples and tape first. A grown-up stays nearby.' },
    { t: 'Kitchen List', i: 'list', n: 'Paper, a crayon', p: 'Draw a list together: an apple, a cup, a spoon. Hunt for each one in the kitchen and check it off.', m: 'see', k: '“Found the spoon! What’s next on our list?”', s: 'You choose the list. Knives, the stove and cleaners stay off it.' },
    { t: 'Do What I Do', i: 'leader', n: 'Just you', p: 'Touch your nose, hop on one foot, spin around once. Your child copies. Then they’re the leader.', m: 'turns', k: 'Being the leader means practicing clear directions.' },
    { t: 'Shadow Animals', i: 'flashlight', n: 'A flashlight, a wall', p: 'Dim the lights. Shine the flashlight on a wall and make hand shadows: a bird, a dog, a crocodile.', m: 'wait', k: 'Ask “What animal is this?” Let them guess, then try a new one.', s: 'A grown-up holds the flashlight. Battery covers stay shut.' },
    { t: 'Book Bridge', i: 'bridge', n: 'Books or blocks, toy cars', p: 'Build a bridge between two stacks. Drive cars over it. Make it longer. Will it hold?', m: 'wonder', k: 'Say “I wonder if it will hold?” Then wait and see.' },
    { t: 'Sock Match', i: 'socks', n: 'A pile of clean socks', p: 'Dump the socks out. Race to find matching pairs. Roll each pair into a ball.', m: 'choice', k: 'Hold up two: “Same or different?”' },
    { t: 'Water Painting', i: 'brush', n: 'A cup of water, a paintbrush', p: 'Outside, “paint” a fence, a step or the sidewalk with water. Watch the picture dry and disappear.', m: 'wonder', k: '“Where did it go? I wonder if the sun dried it.”', s: 'Water play: a grown-up within arm’s reach, away from the street.' },
    { t: 'Feelings Faces', i: 'mirror', n: 'A wall mirror or an unbreakable one', p: 'Make faces in the mirror together: happy, sad, surprised, grumpy. Guess each other’s face.', m: 'see', k: '“Your eyebrows went up. Surprised!” Ask when they felt that way.', s: 'Use a wall mirror or an unbreakable one. A grown-up stays nearby.' },
    { t: 'Sound Walk', i: 'bird', n: 'A walk outside', p: 'Stand still and listen. Count sounds on your fingers: a bird, a car, the wind. Walk on and listen again.', m: 'turns', k: 'Whisper “What do you hear?” Take turns naming sounds.', s: 'Hold hands near the street. A grown-up stays close.' },
  ],
};

// ---------- Deck B: 52 Family Talk-Along Cards, ages 5–12 ----------
// q = prompt, k = one-line grown-up tip
const MOMENTS = [
  { key: 'dinner', name: 'Dinner', long: 'Dinner table', color: 'tomato', icon: 'plate', where: 'Keep them in a jar on the table.' },
  { key: 'car', name: 'Car', long: 'In the car', color: 'sun', icon: 'carside', where: 'Keep them in the glove box or a door pocket.' },
  { key: 'bath', name: 'Bath', long: 'Bath and wash-up', color: 'sky', icon: 'tub', where: 'Keep them by the sink in a zip bag.' },
  { key: 'bedtime', name: 'Bedtime', long: 'Bedtime', color: 'plum', icon: 'moonstars', where: 'Keep them on the nightstand or by the books.' },
];

const PROMPTS = {
  dinner: [
    { q: 'What was the best part of your day? What was the trickiest part?', k: 'Go first with yours. Kids open up when grown-ups share too.' },
    { q: 'If you could invent a brand-new food, what would be in it? What would you call it?', k: 'Play along with silly answers. Silly keeps the talk going.' },
    { q: 'Who made you smile today? What did they do?', k: 'Listen for new names and ask one more question about them.' },
    { q: 'If our family had a holiday that was just ours, what would we do on it?', k: 'Write down the best idea, and try it for real.' },
    { q: 'What’s something you’re getting better at?', k: 'Notice the effort: “You kept practicing.”' },
    { q: 'If you could have dinner with any animal, which one would you pick? What would you talk about?', k: 'Ask one follow-up question before you share your own answer.' },
    { q: 'What’s one thing you’d love to learn how to do?', k: 'Ask what the very first step might be.' },
    { q: 'If you were in charge of the house for a day, what rule would you make?', k: 'Skip the correcting. Ask, “Why that rule?”' },
    { q: 'What’s a question you’ve always wanted to ask me?', k: 'Answer honestly and briefly, then ask it back.' },
    { q: 'What made you laugh this week?', k: 'Laugh along. Retelling a funny moment is storytelling practice.' },
    { q: 'If you had a superpower just for helping people, what would it be?', k: 'Ask who they would help first.' },
    { q: 'Describe your perfect weekend, from breakfast to bedtime.', k: 'Ask for details: “What would it smell like? Sound like?”' },
    { q: 'What’s something kind that someone did for you lately?', k: 'Say thanks for sharing. It doesn’t need to become a lesson.' },
  ],
  car: [
    { q: 'Would you rather drive a bus, fly a plane or sail a boat? Why?', k: 'Side-by-side talk feels easy. Eyes on the road is fine.' },
    { q: 'Pick someone you can see outside. Make up a story about where they’re going.', k: 'Take turns adding one sentence each.' },
    { q: 'If this car could take us anywhere in one second, where would we go?', k: 'Ask what they would pack.' },
    { q: 'What song should be our family’s theme song?', k: 'Let them pick the next song and ask why they like it.' },
    { q: 'What’s something you’re looking forward to?', k: 'Share something you’re looking forward to as well.' },
    { q: 'If you designed a playground, what would it have?', k: 'Ask them to describe it so clearly you could draw it.' },
    { q: 'Pick a color. How many things that color can we spot before we get there?', k: 'Count out loud together. Younger kids can point.' },
    { q: 'What would you do if you were the grown-up and I were the kid today?', k: 'Laugh along, then ask what they’d do the same as you.' },
    { q: 'What’s the hardest part of being a kid right now?', k: 'Just listen. “That sounds hard” is enough.' },
    { q: 'If animals could talk, which one would be the funniest? What would it say?', k: 'Do the voices together.' },
    { q: 'Tell me about a dream you remember.', k: 'Ask what they think it meant. There are no wrong answers.' },
    { q: 'What’s something you know a lot about? Teach me one thing.', k: 'Be the curious student. Ask a real question.' },
    { q: 'Think of an animal. I’ll ask yes-or-no questions until I guess it.', k: 'Swap roles so they practice asking the questions.' },
  ],
  bath: [
    { q: 'If you could swim with any sea creature, which one would you choose?', k: 'Ask what it would feel like to touch it.' },
    { q: 'What would a fish say about our bathtub?', k: 'Answer back in your best fish voice.' },
    { q: 'What felt hard today? What helped?', k: 'Warm water and a calm voice make this a gentle time to ask.' },
    { q: 'If a bubble could carry a message anywhere, what would yours say?', k: 'Blow the message away together.' },
    { q: 'What’s your favorite smell in the whole world? Why?', k: 'Share yours. Smells often bring back stories.' },
    { q: 'If you were a raindrop, where would you want to land?', k: 'Ask, “And then what happens?”' },
    { q: 'Invent a new bath toy. What does it do?', k: 'Ask them to give it a name and a sound.' },
    { q: 'What makes someone a good friend?', k: 'Ask for an example from their day.' },
    { q: 'Would you rather live under the sea or up in the clouds?', k: 'Ask about the trickiest part of living there.' },
    { q: 'You just found a new planet. What’s its name, and who lives there?', k: 'Build the world together, one detail each.' },
    { q: 'What’s something you like about yourself?', k: 'Leave a pause. Then share something you like about them.' },
    { q: 'Close your eyes. How many sounds can you hear right now?', k: 'Listen quietly first, then compare lists.' },
    { q: 'If you shrank to the size of a rubber duck, what would you explore?', k: 'Follow their lead and keep asking, “Then what?”' },
  ],
  bedtime: [
    { q: 'What are three good things from today?', k: 'Keep it small. A snack, a joke or a sunny minute all count.' },
    { q: 'What’s something you’re wondering about?', k: '“I don’t know. Let’s find out tomorrow” is a great answer.' },
    { q: 'If you could choose tonight’s dream, what would it be?', k: 'Speak slowly and softly. Calm voices help everyone wind down.' },
    { q: 'Who is someone you’re thankful for? Why?', k: 'Ask if they’d like to tell that person tomorrow.' },
    { q: 'What was a brave thing you did this week?', k: 'Name the feeling: “You felt nervous, and you did it anyway.”' },
    { q: 'What’s your favorite memory of our family?', k: 'Share one of your favorite memories of them.' },
    { q: 'If your stuffed animal could talk, what would it say about your day?', k: 'Let the toy answer in its own voice.' },
    { q: 'What’s something you’d like to do together this weekend?', k: 'Pick one idea and put it on the calendar.' },
    { q: 'Was there anything that worried you today?', k: 'Listen first. Solutions can wait until morning.' },
    { q: 'Start a story: “Once upon a time, a tiny dragon…”', k: 'Take turns adding one line until someone yawns.' },
    { q: 'What would you love to be really good at when you grow up?', k: 'Ask what they love about it.' },
    { q: 'If today were weather, what would it be? Sunny, cloudy, stormy?', k: 'Accept every answer. Feelings aren’t right or wrong.' },
    { q: 'What do you want to remember about today?', k: 'End with the same goodnight words every night.' },
  ],
};

const HABITS = [
  { name: 'Go first', how: 'Answer the card yourself sometimes. Kids copy what they see.' },
  { name: 'Ask “what else?”', how: 'One gentle follow-up keeps a short answer going.' },
  { name: 'Side by side', how: 'Car rides and dish duty feel easier than face-to-face talks.' },
  { name: 'Wait longer', how: 'Count to five in your head. Big thoughts take a moment.' },
  { name: 'Listen, don’t fix', how: 'Save advice for later. “Tell me more” goes a long way.' },
  { name: 'Passing is okay', how: 'Anyone can say “pass” and pull another card.' },
];

// ---------- Grown-up extras for every 0–5 play (customer-voice rules 4, 6 and 7) ----------
// mo = starting age in months · prep = setup minutes · mess 0 none / 1 a little / 2 some · min = usual play time
// buy = true when the play may need something many homes don't have · tired = 2-minute, no-setup version
// easy / hard = "Make it easier / Make it harder"
const MESS = ['No mess', 'Low mess', 'Messy'];
const EXTRAS = {
  'Peekaboo Cloth': { mo: 4, prep: 0, mess: 0, min: 5, tired: 'Hide your face behind your hands: “Where did I go?… Here I am!”', easy: 'Hide only half your face so baby can still see you.', hard: 'Hide a big toy under the towel and let baby find it.' },
  'Copy Cat Faces': { mo: 0, prep: 0, mess: 0, min: 3, tired: 'At a diaper change, copy one sound baby makes, then wait.', easy: 'Just smile and wait for a smile back.', hard: 'Add a sound to each face: “ooh,” “ahh,” “mmm.”' },
  'Kitchen Drum': { mo: 6, prep: 1, mess: 0, min: 5, tired: 'Tap a beat on your knees. Wait for baby to pat too.', easy: 'Hold baby’s hand and tap the pot together.', hard: 'Add a plastic bowl: which one sounds louder?' },
  'Where’s Duck?': { mo: 6, prep: 1, mess: 0, min: 5, tired: 'Hide the toy behind your back, then bring it out: “There it is!”', easy: 'Leave most of the toy showing.', hard: 'Hide it all the way, under one of two towels.' },
  'Bubble Watch': { mo: 6, prep: 1, mess: 1, min: 5, buy: true, tired: 'Blow three bubbles and say “pop, pop, pop” as they burst.', easy: 'Blow one bubble at a time, slowly.', hard: 'Catch a bubble on the wand for baby to poke.' },
  'Rock and Stop': { mo: 0, prep: 0, mess: 0, min: 5, tired: 'Sway through one line of any song, then pause.', easy: 'Pause for just a second at first.', hard: 'Stop at a different spot each time and wait longer.' },
  'Roll It Back': { mo: 7, prep: 1, mess: 0, min: 5, tired: 'Roll the ball once from your lap into baby’s hands.', easy: 'Sit close together, just a short roll apart.', hard: 'Scoot back a little farther after each roll.' },
  'First Book Chat': { mo: 3, prep: 0, mess: 0, min: 5, tired: 'Name one picture on one page, then close the book.', easy: 'Stay on one page and let baby pat it.', hard: 'Ask “Where’s the dog?” and wait for a look or a point.' },
  'In and Out': { mo: 8, prep: 1, mess: 1, min: 5, tired: 'Drop one toy in: “In!” Tip it out: “Out!”', easy: 'Use one toy and a wide basket.', hard: 'Use a box with a smaller opening (big toys only).' },
  'Leaf Hello': { mo: 3, prep: 0, mess: 0, min: 5, tired: 'Stand at a window and name one thing outside.', easy: 'Just look up and feel the breeze together.', hard: 'Touch two leaves: big and small, smooth and bumpy.' },
  'Tickle Countdown': { mo: 4, prep: 0, mess: 0, min: 3, tired: 'One slow countdown, one gentle tickle, then a cuddle.', easy: 'Skip the countdown: wiggle your fingers, then tickle.', hard: 'Pause longer at “two…” and wait for baby to ask.' },
  'Stack and Crash': { mo: 6, prep: 1, mess: 1, min: 5, tired: 'Stack two cups and let baby knock them over.', easy: 'Stack just two cups.', hard: 'Help baby put a cup on top before the crash.' },
  'Sock Off!': { mo: 6, prep: 0, mess: 0, min: 3, tired: 'At a diaper change, say each step: “Sock off. Sock on.”', easy: 'Pull the sock most of the way off first.', hard: 'Slip it over baby’s hand instead: “Where did your hand go?”' },
  'Box Car': { mo: 12, prep: 3, mess: 0, min: 10, tired: 'Sit in the box together and pretend to drive: “Beep beep!”', easy: 'Push slowly in a straight line.', hard: 'Let them push a teddy in the box over to you.' },
  'Stir the Soup': { mo: 12, prep: 1, mess: 1, min: 10, tired: 'Hand over a spoon and an empty pot. Taste it: “Mmm!”', easy: 'Just drop the blocks in and take them out.', hard: 'Ask for two “ingredients”: a red block and a blue one.' },
  'Animal Voices': { mo: 12, prep: 1, mess: 0, min: 5, tired: 'Make one animal sound and wait for them to copy.', easy: 'Use one animal they know well.', hard: 'Make the sound and let them find the animal.' },
  'Pour and Splash': { mo: 12, prep: 3, mess: 2, min: 10, tired: 'At bath time, with you right there, pour water from cup to cup: “Pour!”', easy: 'Fill the cups halfway so they stay light.', hard: 'Add a colander or a funnel to pour through.' },
  'Block Tower': { mo: 14, prep: 1, mess: 1, min: 5, buy: true, tired: 'Stack two blocks and knock them down together.', easy: 'Use empty boxes: big and light.', hard: 'Count each block out loud as it goes on.' },
  'Hat Parade': { mo: 12, prep: 2, mess: 0, min: 5, tired: 'Put one hat on your head: “Hat!” Let them pull it off.', easy: 'Use one hat and the mirror.', hard: 'Let them choose a hat for each teddy.' },
  'Pillow Mountain': { mo: 12, prep: 2, mess: 1, min: 10, tired: 'Lie on the floor and let them climb over your legs.', easy: 'Two cushions only, low and flat.', hard: 'Add a crawl-under “cave” between two cushions.' },
  'Sock Toss': { mo: 15, prep: 1, mess: 1, min: 5, tired: 'Toss three sock balls into the basket together.', easy: 'Put the basket right next to them.', hard: 'Step back one big step after each throw.' },
  'Teddy’s Bedtime': { mo: 15, prep: 0, mess: 0, min: 5, tired: 'Tuck teddy in and whisper “night-night” together.', easy: 'Just cover teddy with the towel.', hard: 'Let them choose teddy’s book and teddy’s song.' },
  'Chair Tunnel': { mo: 12, prep: 3, mess: 0, min: 10, tired: 'Crawl under the table together: “In… out!”', easy: 'Make it short: one chair and the blanket.', hard: 'Add a pillow to crawl over at the end.' },
  'Clap and Stomp': { mo: 12, prep: 0, mess: 0, min: 3, tired: 'Clap twice, wait, and see if they clap back.', easy: 'Do one move at a time.', hard: 'Do two moves in a row: clap, then stomp.' },
  'Pull-Out Box': { mo: 12, prep: 2, mess: 1, min: 5, tired: 'Tuck a washcloth in your sleeve and let them pull it out.', easy: 'Leave the cloths sticking out a little.', hard: 'Ask them to stuff the cloths back in and hand you the box.' },
  'Kick and Chase': { mo: 15, prep: 0, mess: 0, min: 10, tired: 'Roll the ball to them from where you sit.', easy: 'Roll it gently, a short way.', hard: 'Kick it toward a “goal” between two cushions.' },
  'Blanket Fort': { mo: 24, prep: 5, mess: 1, min: 15, tired: 'Drape a blanket over the table and read one book under it.', easy: 'One blanket over one chair.', hard: 'Add a door flap and a secret knock.' },
  'Tea Party': { mo: 24, prep: 2, mess: 0, min: 10, tired: 'Pour pretend tea for one toy and say “Cheers!”', easy: 'One cup and one toy.', hard: 'Let them take each toy’s order.' },
  'Color Sort': { mo: 26, prep: 2, mess: 1, min: 10, buy: true, tired: 'Sort a few grown-up socks: dark ones, light ones.', easy: 'Start with just two colors.', hard: 'Add a fourth color, or sort by size too.' },
  'Car Ramp': { mo: 24, prep: 2, mess: 0, min: 10, buy: true, tired: 'Tilt a big book and let one car roll down.', easy: 'Keep the ramp low.', hard: 'Guess which car will go farther, then test it.' },
  'Big Paper Art': { mo: 24, prep: 2, mess: 1, min: 10, buy: true, tired: 'Draw one big circle together, then add two eyes.', easy: 'One color, big lines.', hard: 'Take turns: you draw a line, they add to it.' },
  'Freeze Dance': { mo: 24, prep: 0, mess: 0, min: 5, tired: 'Sing one line, stop, and freeze together.', easy: 'Freeze for just a second.', hard: 'Freeze in a shape: tall, tiny or wide.' },
  'Sock Puppet Chat': { mo: 24, prep: 2, mess: 0, min: 5, tired: 'Put your hand in a sock and say hello in a squeaky voice.', easy: 'The puppet just waves and says hello.', hard: 'Make two puppets and let them talk to each other.' },
  'Nature Basket': { mo: 24, prep: 0, mess: 1, min: 15, tired: 'On your next walk, pick up one big leaf and name its color.', easy: 'Collect only leaves.', hard: 'Sort by two things: big and bumpy, small and smooth.' },
  'Pretend Shop': { mo: 26, prep: 3, mess: 1, min: 15, tired: 'Hold out your hand: “One apple, please!” Pay with a high five.', easy: 'Just fill the bag and carry it.', hard: 'Ask for amounts: “Two boxes, please.”' },
  'Toy Bath': { mo: 24, prep: 3, mess: 2, min: 10, tired: 'Wipe a toy’s feet with a damp cloth: “Scrub, scrub!”', easy: 'Use a damp cloth instead of a tub.', hard: 'Ask “What should we wash next?” and let them choose.' },
  'Animal Moves': { mo: 24, prep: 0, mess: 0, min: 5, tired: 'Pick one animal and hop like a frog three times.', easy: 'Copy your moves, slowly.', hard: 'Guess the animal from the move alone.' },
  'Shape Hunt': { mo: 30, prep: 0, mess: 0, min: 10, tired: 'Find one circle in the room you’re sitting in.', easy: 'Hunt for circles only.', hard: 'Hunt for triangles too.' },
  'Little Helper': { mo: 24, prep: 1, mess: 1, min: 5, tired: 'Hand over the cloth for one wipe of the table: “All clean!”', easy: 'Give them one spot to wipe.', hard: 'Wipe, then set out the spoons for dinner.' },
  'Story Box': { mo: 36, prep: 2, mess: 0, min: 10, tired: 'Tell a one-minute story about any toy in the room.', easy: 'Use one toy and ask “What happened next?”', hard: 'Add a problem: “Uh-oh! Then what?”' },
  'Obstacle Course': { mo: 36, prep: 5, mess: 1, min: 15, tired: 'Two steps only: crawl under the table, then hop.', easy: 'Just one or two steps.', hard: 'Give three-step directions, then swap who gives them.' },
  'I Spy Colors': { mo: 36, prep: 0, mess: 0, min: 5, tired: 'One round of “I spy something blue.”', easy: 'Point to the area while you give the clue.', hard: 'Spy by sound: “something that starts with b.”' },
  'Restaurant': { mo: 36, prep: 5, mess: 1, min: 15, tired: 'Ask “What’s on the menu tonight?” and order from your chair.', easy: 'Skip the menu; just take your order.', hard: 'Let them “write” the order and bring the bill.' },
  'Box Rocket': { mo: 36, prep: 5, mess: 1, min: 15, tired: 'Sit on the floor, count down from five and blast off with your arms.', easy: 'Count down from five.', hard: 'Plan the trip: what do we pack for the moon?' },
  'Kitchen List': { mo: 42, prep: 2, mess: 0, min: 10, tired: 'Name three things to find in the room you’re in.', easy: 'Draw just two things.', hard: 'Add one tricky item: “something round.”' },
  'Do What I Do': { mo: 36, prep: 0, mess: 0, min: 5, tired: 'Touch your nose and wait for them to copy. Then swap.', easy: 'One move at a time.', hard: 'Two moves in a row: “Clap, then spin.”' },
  'Shadow Animals': { mo: 36, prep: 2, mess: 0, min: 10, tired: 'Make one hand shadow with the flashlight and let them name it.', easy: 'Wiggle your hand and let them chase the shadow.', hard: 'Make up a short shadow story together.' },
  'Book Bridge': { mo: 36, prep: 3, mess: 1, min: 10, tired: 'Lay one book across two stacks and drive one car over.', easy: 'Keep the stacks low.', hard: 'Make it longer. How many books before it falls?' },
  'Sock Match': { mo: 36, prep: 1, mess: 1, min: 10, tired: 'Find one matching pair in the laundry basket.', easy: 'Start with 3 pairs that look very different.', hard: 'Race: who finds the most pairs?' },
  'Water Painting': { mo: 36, prep: 2, mess: 1, min: 15, buy: true, tired: 'Dip your fingers in a cup and paint one line on a step.', easy: 'Paint with fingers instead of a brush.', hard: 'Paint a shape and guess each other’s.' },
  'Feelings Faces': { mo: 36, prep: 0, mess: 0, min: 5, tired: 'Make one face and let them guess it.', easy: 'Try only happy and sad.', hard: 'Act out what made you feel that way.' },
  'Sound Walk': { mo: 36, prep: 0, mess: 0, min: 15, tired: 'Open a window and count three sounds together.', easy: 'Count just two sounds.', hard: 'Stand still, close your eyes and guess each sound.' },
};
for (const b of Object.keys(PLAYS)) for (const pl of PLAYS[b]) {
  const x = EXTRAS[pl.t];
  if (!x) throw new Error('missing extras for ' + pl.t);
  Object.assign(pl, x);
}
const moLabel = m => m === 0 ? 'From birth' : `From ${m} mo`;

module.exports = { BANDS, MOVES, PLAYS, WATER, MOMENTS, PROMPTS, HABITS, MESS, moLabel };
