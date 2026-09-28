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
    { t: 'Bubble Watch', i: 'bubbles', n: 'Bubbles', p: 'Blow a few bubbles slowly above baby. Let baby watch, reach and pop. Blow again when baby looks at you.', m: 'see', k: 'Use the same short words each time: “Up, up… pop!”', s: 'A grown-up holds the bottle. Wipe bubble mix off little hands.' },
    { t: 'Rock and Stop', i: 'note', n: 'A song you know', p: 'Hold baby and sway while you sing. Stop in the middle and wait. Start again when baby wiggles or looks at you.', m: 'sing', k: 'The pause is the game. Baby’s wiggle means “more!”' },
    { t: 'Roll It Back', i: 'ball', n: 'A big soft ball', p: 'For babies who can sit: sit facing each other, legs apart. Roll the ball to baby, then help roll it back.', m: 'wait', k: 'Say “Ready… roll!” and wait for baby to look at you first.' },
    { t: 'First Book Chat', i: 'bookopen', n: 'A board book', p: 'Sit baby on your lap. Point to one picture and name it. Let baby pat the pictures and help turn the pages.', m: 'lead', k: 'Talk about whatever baby looks at, even the same page again.' },
    { t: 'In and Out', i: 'basket', n: 'A basket and 4–5 big toys', p: 'Drop toys into the basket one by one: “In!” Tip them out: “Out!” Let baby dump and fill.', m: 'see', k: 'One word for each move: “in,” “out,” “all gone!”' },
    { t: 'Leaf Hello', i: 'tree', n: 'A tree or a big plant', p: 'Carry baby close to a tree or a window plant. Touch a leaf together, look up at the sky, feel the breeze.', m: 'add', k: 'Name it, then add one word: “Leaf. Green leaf. Soft leaf.”', s: 'Stay within reach. Leaves and petals stay out of mouths.' },
    { t: 'Tickle Countdown', i: 'laughhead', n: 'Just you', p: 'Wiggle your fingers in the air: “One… two… three…” then a gentle tickle. Do it again, a little slower.', m: 'wait', k: 'Stop at “two…” A squeal or a kick asks for “three!”' },
    { t: 'Stack and Crash', i: 'cups', n: 'Plastic cups or big blocks', p: 'Stack three cups into a tower. Let baby knock it over. Cheer, and build it again together.', m: 'sing', k: 'Say “up, up, up… crash!” and throw your arms wide on “crash.”' },
    { t: 'Sock Off!', i: 'sock', n: 'A clean sock', p: 'Slip a loose sock halfway onto baby’s foot. Let baby pull it off: “Sock off!” Try the other foot.', m: 'see', k: 'Say it as it happens: “Foot! Sock on… sock off!”' },
  ],
  b1: [
    { t: 'Box Car', i: 'boxcar', n: 'A big cardboard box', p: 'Your toddler sits in the box. Push it slowly around the room. Stop at “stations” to wave hello.', m: 'wait', k: 'Say “Ready, set…” and wait for “go!” Any sound counts.', s: 'Push slowly on the floor. Pull out staples and tape first.' },
    { t: 'Stir the Soup', i: 'soup', n: 'A pot, a big spoon, big blocks', p: 'Drop blocks into the pot and stir. Blow on the “hot” soup. Serve a spoonful to a teddy.', m: 'choice', k: 'Ask “Hot soup or cold soup?” Hold up two hands and wait.' },
    { t: 'Animal Voices', i: 'animals', n: 'Toy animals or a picture book', p: 'Hold up an animal and make its sound. Pass it to your child. Swap animals and go again.', m: 'wait', k: 'Say “The cow says…” and leave a gap for “moo.”' },
    { t: 'Pour and Splash', i: 'pour', n: 'A tub of water, 2 plastic cups', p: 'Set the tub on a towel. Pour water from cup to cup. Let your child pour, splash and fill.', m: 'see', k: 'Talk as it happens: “Full… empty! Pour, pour.”', s: WATER },
    { t: 'Block Tower', i: 'tower', n: 'Big blocks', p: 'Build a tower together, one block each. Count as you go. Let them knock it down and start again.', m: 'add', k: 'They say “block,” you say “big block!”' },
    { t: 'Hat Parade', i: 'hat', n: '3–4 hats from around the house', p: 'Try on hats in front of a mirror. Make a silly face in each one. March around the room.', m: 'choice', k: 'Ask “Sun hat or winter hat?” Let them choose yours too.' },
    { t: 'Pillow Mountain', i: 'cushions', n: 'Couch cushions', p: 'Pile the cushions on the floor to make a mountain. Help your child climb up, then slide down.', m: 'see', k: 'Say it as they move: “Up, up, up! Down!”', s: 'On the floor, away from furniture corners. Stay within reach.' },
    { t: 'Sock Toss', i: 'socks', n: 'A basket of clean socks', p: 'Toss socks into the basket. Find a big one and a tiny one. Hide one on your head!', m: 'add', k: '“Sock” becomes “big sock!” or “red sock!”' },
    { t: 'Teddy’s Bedtime', i: 'teddy', n: 'A stuffed toy, a small towel', p: 'Tuck teddy in with the towel. Read teddy a book, sing teddy a song, whisper “night-night.”', m: 'lead', k: 'If they feed teddy instead, talk about the snack.' },
    { t: 'Chair Tunnel', i: 'tunnel', n: 'Two chairs and a blanket', p: 'Drape the blanket over two chairs to make a tunnel. Crawl through together, then take turns.', m: 'see', k: 'Say the word as they move: “In… through… out!”', s: 'Use sturdy chairs that won’t tip. Stay within reach.' },
    { t: 'Clap and Stomp', i: 'hands', n: 'Just you', p: 'Clap twice, stomp twice, pat your knees. Let your child copy you, then you copy their moves.', m: 'lead', k: 'Copy whatever they do. They’re the leader now.' },
    { t: 'Pull-Out Box', i: 'tissuebox', n: 'An empty tissue box, 6 washcloths', p: 'Stuff the washcloths into the box. Your child pulls them out one by one. Stuff them back in and go again.', m: 'wait', k: 'Hold one up: “More?” Wait for a look, a point or a sound.' },
    { t: 'Kick and Chase', i: 'ball', n: 'A big soft ball', p: 'Roll or kick the ball across the room. Race to it together. Catch it and sit on it!', m: 'choice', k: 'Ask “Kick it or roll it?” Show both, then wait.' },
  ],
  b2: [
    { t: 'Blanket Fort', i: 'fort', n: 'A blanket, chairs, pillows', p: 'Build a fort together. Bring in a book and a teddy. Read inside, then peek out the door.', m: 'see', k: 'Use place words: “in,” “under,” “on top,” “behind.”', s: 'Sturdy chairs only; nothing heavy on top. Stay within reach.' },
    { t: 'Tea Party', i: 'teapot', n: 'Cups, plates, stuffed toys', p: 'Set a pretend table for the toys. Pour pretend tea, pass pretend cake, and clink cups: “Cheers!”', m: 'choice', k: 'Ask as Bear: “More tea? Milk or honey?” Wait for the answer.' },
    { t: 'Color Sort', i: 'sort', n: 'Big blocks in 3 colors, 3 bowls', p: 'Put one of each color in a bowl. Your child sorts the rest. Mix them all up and sort again.', m: 'add', k: '“Red” becomes “red block goes here!”' },
    { t: 'Car Ramp', i: 'ramp', n: 'A board or big book, toy cars', p: 'Prop the board on the sofa to make a ramp. Race the cars down. Which one goes the farthest?', m: 'see', k: 'Say what happens: “Fast! Slow! Crash!”' },
    { t: 'Big Paper Art', i: 'crayon', n: 'Big paper, chunky crayons, tape', p: 'Tape the paper to the floor. Draw lines, dots and circles side by side. Swap crayons now and then.', m: 'see', k: 'Describe, don’t quiz: “Round and round. A big circle!”' },
    { t: 'Freeze Dance', i: 'dancer', n: 'A song to sing or play', p: 'Dance to a song. When the music stops, freeze! Take turns being the one who stops the music.', m: 'lead', k: 'Let your child shout “stop!” and “go!” for you.' },
    { t: 'Sock Puppet Chat', i: 'puppet', n: 'A clean sock, a marker', p: 'Draw eyes on a sock and slip it on your hand. The puppet says hello, asks a question, then waits.', m: 'wait', k: 'Puppets are patient. Give extra time to answer.', s: 'Draw the face on. No buttons or stick-on eyes.' },
    { t: 'Nature Basket', i: 'nature', n: 'A basket, a walk outside', p: 'Collect big leaves, sticks and pinecones. At home, sort them: bumpy, smooth, big, small.', m: 'see', k: 'Name how they feel: “Bumpy pinecone. Smooth stick.”', s: 'Only things bigger than a toilet-paper tube. Skip berries and mushrooms.' },
    { t: 'Pretend Shop', i: 'bag', n: 'Empty food boxes, a bag', p: 'Set up a shop on the sofa. Your child fills the bag and pays you with a leaf. Then swap jobs.', m: 'choice', k: 'Ask “Cereal or crackers today?” and wait.' },
    { t: 'Toy Bath', i: 'tub', n: 'A tub of water, a washable toy, a cloth', p: 'Give the toy a bath: wash its hands, feet and tummy. Dry it with a towel and tuck it in.', m: 'see', k: 'Name body parts: “Wash the toes. Now the knees!”', s: WATER },
    { t: 'Animal Moves', i: 'frog', n: 'Space to move', p: 'Hop like a frog, stomp like an elephant, tiptoe like a cat. Take turns picking the animal.', m: 'sing', k: 'Add the sound and the move: “Hop, hop, ribbit!”' },
    { t: 'Shape Hunt', i: 'magnifier', n: 'Just you', p: 'Walk around the house looking for circles: a plate, a clock, a wheel. Then hunt for squares.', m: 'see', k: 'Point and name: “Round, like the clock!”' },
    { t: 'Little Helper', i: 'wipe', n: 'A damp cloth', p: 'Wipe the table together after a meal. Then let your child wipe a chair, then a toy.', m: 'see', k: 'Talk as you work: “Wipe, wipe. All clean!”' },
  ],
  b3: [
    { t: 'Story Box', i: 'storybox', n: 'A box, 3 toys from around the house', p: 'Pull out 3 toys. Make up a story that uses all three. Take turns adding one sentence each.', m: 'lead', k: 'Let the story go anywhere. Ask, “And then what?”' },
    { t: 'Obstacle Course', i: 'cone', n: 'Pillows, a chair, a blanket', p: 'Build a course: crawl under the chair, hop over the pillows, roll across the blanket.', m: 'turns', k: 'Give two-step directions: “Crawl under, then jump!” Then swap.', s: 'Clear the space of sharp corners. A grown-up stays nearby.' },
    { t: 'I Spy Colors', i: 'binoculars', n: 'Just you', p: '“I spy something green.” Your child guesses. Then they pick something and give you the clue.', m: 'turns', k: 'If they get stuck, add a hint: “It’s round…”' },
    { t: 'Restaurant', i: 'plate', n: 'Paper, crayons, plates', p: 'Draw a menu together. Your child takes your order, “cooks” it and brings it to the table. Swap roles.', m: 'choice', k: 'Ask “Soup or pizza? Anything else?”' },
    { t: 'Box Rocket', i: 'rocket', n: 'A big box, crayons', p: 'Draw buttons and windows on the box. Climb in, count down from ten, and blast off to the moon.', m: 'lead', k: 'Ask “Where are we flying? What’s out the window?”', s: 'Pull out staples and tape first. A grown-up stays nearby.' },
    { t: 'Kitchen List', i: 'list', n: 'Paper, a crayon', p: 'Draw a list together: an apple, a cup, a spoon. Hunt for each one in the kitchen and check it off.', m: 'see', k: '“Found the spoon! What’s next on our list?”' },
    { t: 'Do What I Do', i: 'leader', n: 'Just you', p: 'Touch your nose, hop on one foot, spin around once. Your child copies. Then they’re the leader.', m: 'turns', k: 'Being the leader means practicing clear directions.' },
    { t: 'Shadow Animals', i: 'flashlight', n: 'A flashlight, a wall', p: 'Dim the lights. Shine the flashlight on a wall and make hand shadows: a bird, a dog, a bunny.', m: 'wait', k: 'Ask “What animal is this?” Let them guess, then try a new one.', s: 'A grown-up holds the flashlight. Battery covers stay closed.' },
    { t: 'Book Bridge', i: 'bridge', n: 'Books or blocks, toy cars', p: 'Build a bridge between two stacks. Drive cars over it. Make it longer. Will it hold?', m: 'wonder', k: 'Say “I wonder if it will hold?” Then wait and see.' },
    { t: 'Sock Match', i: 'socks', n: 'A pile of clean socks', p: 'Dump the socks out. Race to find matching pairs. Roll each pair into a ball.', m: 'choice', k: 'Hold up two: “Same or different?”' },
    { t: 'Water Painting', i: 'brush', n: 'A cup of water, a paintbrush', p: 'Outside, “paint” a fence, a step or the sidewalk with water. Watch the picture dry and disappear.', m: 'wonder', k: '“Where did it go? I wonder if the sun dried it.”', s: 'Play away from the street. A grown-up stays nearby.' },
    { t: 'Feelings Faces', i: 'mirror', n: 'A mirror', p: 'Make faces in the mirror together: happy, sad, surprised, grumpy. Guess each other’s face.', m: 'see', k: '“Your eyebrows went up. Surprised!” Ask when they felt that way.' },
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

module.exports = { BANDS, MOVES, PLAYS, WATER, MOMENTS, PROMPTS, HABITS };
