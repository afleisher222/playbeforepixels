// =============================================================== STORY
// S1 p6-7 — tap, tap, tap / nobody said a word
spread({
  label: 'S1', bg: C.tSky,
  art: floor(610, C.tSun) +
    G('translate(84 300)', windowRain(360, 230)) +
    G('translate(490 470)', shelf(270, 140)) + U('bowl', 625, 470, 0.95) +
    U('bin', 250, 730, 0.7) +
    // right page circle
    rug(1232, 716, 370, 92) +
    teacherAt('sit', 1232, 684, 1.0, 'smile') +
    kidAt('priya', 'sit', 944, 694, 0.95, 'shy') + kidAt('zara', 'sit', 1082, 680, 0.95, 'smile') +
    kidAt('leo', 'sit', 1384, 680, 0.95, 'shy', true) + kidAt('sam', 'sit', 1520, 694, 0.95, 'shy', true) +
    kidAt('milo', 'sit', 1232, 808, 0.92, 'think'),
  texts: [
    T(60, 60, 700, '<p>In Room 5, lots of things went <em>tap</em>.</p><p>Tap, tap, tap went the rain on the window.</p><p>Tap, tap went Bubbles the fish, nosing the side of his bowl.</p>'),
    hand(150, 256, 'tap!', -8), hand(360, 548, 'tap!', 6), hand(700, 290, 'tap!', -6, C.tomato),
    T(876, 60, 700, '<p>But at circle time, nobody said a word.</p><p>Not Priya. Not Leo. Not Zara, or Milo, or Sam.</p><p>Everybody was waiting for somebody else to go first.</p>'),
    bub(1300, 318, 0, '…', 'bl', 'font-size:40px;padding:4px 30px 18px'),
  ],
});

// S2 p8-9 — the bin of blocks / the rules
spread({
  label: 'S2', bg: C.tSun,
  art: floor(640, C.tTomato, -12, 840) + R(804, -12, 852, 840, C.paper) +
    teacherAt('point', 170, 740, 1.1, 'laugh') +
    G('translate(330 650) rotate(72)', U('bin')) +
    blk('q', 470, 560, 1, -24) + blk('j', 560, 640, 1, 18) + blk('i', 470, 720, 1, -8) + blk('q', 610, 520, 0.9, 40) + blk('j', 700, 700, 0.9, -14) +
    A.motion(420, 470, 40, -40, C.ink, 7) + A.motion(530, 450, 40, -70, C.ink, 7) + A.motion(650, 440, 36, -100, C.ink, 7) +
    kidAt('priya', 'sit', 640, 812, 0.9, 'wow', true) +
    // key rows
    U('blk-q', 900, 300, 1.55) + U('blk-j', 900, 460, 1.55) + U('blk-i', 900, 620, 1.55),
  texts: [
    T(60, 60, 700, '<p>So Ms. Poppy tipped out a big bin of blocks.</p>'),
    T(320, 190, 0, 'CLATTER!', 'boom', 'font-size:84px;transform:rotate(-7deg);color:' + C.tomato),
    T(876, 56, 700, '<p>“Let’s build a <b>Talk Tower</b>!” she said. “Every time someone says something out loud, a block goes on.”</p>'),
    T(1080, 306, 500, 'Ask a question', 'keyh'), T(1082, 362, 500, '<span style="background:' + C.sky + '">blue block</span>', 'keypill'),
    T(1080, 466, 500, 'Tell a joke', 'keyh'), T(1082, 522, 500, '<span style="background:' + C.sun + ';color:' + C.ink + '">yellow block</span>', 'keypill'),
    T(1080, 626, 500, 'Share an idea', 'keyh'), T(1082, 682, 500, '<span style="background:' + C.grass + '">green block</span>', 'keypill'),
  ],
});

// S3 p10-11 — Priya's question
spread({
  label: 'S3', bg: C.tPlum,
  art: floor(690, C.wash) +
    G('translate(470 540)', shelf(280, 150)) + U('bowl', 610, 540, 1.0) +
    kidAt('priya', 'sithand', 230, 790, 1.5, 'talk') +
    // right
    wallSign(1330, 290, 250) +
    teacherAt('sit', 990, 770, 1.2, 'laugh') +
    kidAt('priya', 'stand', 1200, 780, 1.2, 'laugh') +
    E(1450, 764, 96, 12, C.tPlum) + tower(1450, 760, ['q'], 1.4) + bursts(1450, 660, 44, C.ink, 5, 26),
  texts: [
    T(60, 60, 700, '<p>Priya’s hand shot up first.</p>'),
    bub(270, 236, 420, 'Why is Bubbles orange?', 'bl', 'font-size:40px;'),
    T(876, 60, 700, '<p>“That’s a question!” said Ms. Poppy.</p><p>A blue block went on the Talk Tower.</p>'),
    T(1356, 302, 200, 'Talk Tower', 'sign'),
    clack(1290, 430, -6, 84),
  ],
});

// S4 p12-13 — Leo's joke
spread({
  label: 'S4', bg: C.tSky,
  art: floor(700, C.wash) +
    kidAt('leo', 'point', 170, 790, 1.4, 'talk') +
    rug(1226, 736, 340, 76) +
    kidAt('priya', 'sit', 950, 720, 1.0, 'laugh') + kidAt('zara', 'sit', 1086, 742, 1.0, 'laugh') +
    kidAt('milo', 'sit', 1222, 720, 1.0, 'laugh') + kidAt('sam', 'sit', 1358, 742, 1.0, 'smile', true) +
    tower(1500, 750, ['q', 'j'], 1.2) + bursts(1500, 590, 42, C.ink, 5, 24),
  texts: [
    T(60, 60, 700, '<p>Then Leo had a joke.</p>'),
    bub(330, 160, 300, 'Knock, knock!', 'bl'),
    bub(456, 262, 300, 'Who’s there?', 'br', '', 'sky'),
    bub(330, 364, 300, 'Cow says.', 'bl'),
    bub(436, 466, 320, 'Cow says who?', 'br', '', 'sky'),
    bub(340, 578, 410, 'No, silly! A cow says <b>MOO!</b>', 'bl'),
    T(876, 60, 700, '<p>Room 5 laughed and laughed. Even Bubbles blew a bubble.</p><p>A yellow block went on.</p>'),
    clack(1120, 276, -5, 92), upGoes(1150, 388),
  ],
});

// S5 p14-15 — Zara's idea
spread({
  label: 'S5', bg: C.tGrass,
  art: floor(680, C.wash) +
    G('translate(60 520)', shelf(280, 160)) + U('bowl', 200, 520, 1.1) +
    kidAt('zara', 'point', 570, 790, 1.35, 'talk', true) +
    // right: gallery of paper friends, drawing table, tower
    G('translate(930 150)', A.paperFish(C.plum, -6)) + G('translate(1060 140)', A.paperFish(C.sky, 5)) + G('translate(1190 154)', A.paperFish(C.grass, -3)) +
    G('translate(1320 142)', A.paperFish(C.sun, 7)) + G('translate(1450 152)', A.paperFish(C.tomato, -5)) +
    kid('leo', 'stand', 960, 470, 1.0, 'smile') + kid('milo', 'stand', 1110, 470, 1.0, 'think') + kid('priya', 'stand', 1260, 470, 1.0, 'smile', true) +
    G('translate(880 566)', table(480, 280)) +
    R(918, 552, 84, 16, C.paper, 4) + R(1068, 552, 84, 16, C.paper, 4) + R(1218, 552, 84, 16, C.paper, 4) +
    R(1010, 548, 34, 10, C.tomato, 4, 'transform="rotate(-20 1027 553)"') + R(1160, 548, 34, 10, C.grass, 4, 'transform="rotate(15 1177 553)"') +
    tower(1510, 780, ['q', 'j', 'i'], 1.15) + bursts(1510, 552, 40, C.ink, 5, 24),
  texts: [
    T(60, 60, 700, '<p>Zara watched Bubbles swim round and round, all by himself.</p>'),
    bub(410, 236, 350, 'I have an idea! Let’s draw Bubbles some friends!', 'bl', 'font-size:30px'),
    T(876, 252, 440, '<p>“That’s an idea!” said Ms. Poppy.</p><p>A green block went on.</p>', 'story', 'font-size:30px'),
    clack(1340, 400, 6, 64),
  ],
});

// S6 p16-17 — all week long
spread({
  label: 'S6', bg: C.tSun,
  art: floor(700, C.wash) +
    kid('milo', 'carry', 190, 480, 1.05, 'talk') + G('translate(190 572) rotate(-8)', U('banana', 0, 0, 1.15)) +
    kid('leo', 'stand', 400, 480, 1.05, 'laugh') + kid('sam', 'stand', 610, 480, 1.05, 'listenL') +
    G('translate(60 600)', table(700, 260)) +
    // right: tower taller than the kids
    tower(1196, 772, ['q', 'j', 'i', 'q', 'i', 'j'], 1.12) +
    kidAt('sam', 'stand', 990, 772, 1.1, 'listen') + kidAt('priya', 'stand', 1356, 772, 1.1, 'wow', true) +
    teacherAt('stand', 1500, 772, 1.06, 'smile', true),
  texts: [
    T(60, 60, 700, '<p>All week long, Room 5 talked. At snack time. At painting time. Out in the garden.</p>'),
    bub(90, 236, 300, 'Why are bananas bendy?', 'bl', 'font-size:29px'),
    bub(420, 200, 330, 'What if worms wore tiny hats?', 'bl', 'font-size:29px'),
    T(876, 60, 700, '<p>By Wednesday, the Talk Tower was taller than everyone. Well, everyone except Ms. Poppy.</p><p>But Sam hadn’t added a block yet. Sam liked listening best.</p>', 'story', 'font-size:30px'),
  ],
});

// S7 p18-19 — all at once, CRASH
spread({
  label: 'S7', bg: C.tPlum,
  art: floor(700, C.wash) +
    kidAt('priya', 'handup', 110, 790, 1.0, 'talk') + kidAt('leo', 'point', 250, 790, 1.0, 'talk') +
    kidAt('zara', 'cheer', 400, 790, 1.0, 'talk') + kidAt('milo', 'handup', 550, 790, 1.0, 'talk', true) + kidAt('sam', 'stand', 690, 790, 0.95, 'oh', true) +
    // right: tower falling
    tower(1060, 770, ['q', 'j', 'i', 'q', 'i'], 1.1, 12) +
    blk('j', 1330, 360, 1.1, 30) + blk('q', 1480, 440, 1.0, -25) + blk('i', 1230, 300, 1.0, 60) + blk('l', 1500, 300, 0.0001, 0) + blk('q', 1420, 280, 0.9, 15) +
    A.motion(1180, 390, 44, -150, C.ink, 7) + A.motion(1370, 300, 40, -110, C.ink, 7) + A.motion(1540, 400, 36, -50, C.ink, 7),
  texts: [
    T(60, 60, 700, '<p>Then, on Thursday, everybody had something to say.</p>'),
    T(60, 150, 0, 'ALL. AT. ONCE!', 'boom', 'font-size:74px;color:' + C.plum + ';transform:rotate(-3deg)'),
    bub(40, 300, 0, 'Me! Me!', 'bl', 'transform:rotate(-6deg)'),
    bub(220, 256, 0, 'Guess what—', 'bl', 'transform:rotate(4deg)', 'sky'),
    bub(420, 320, 0, 'My turn!', 'br', 'transform:rotate(-3deg)'),
    bub(560, 250, 0, 'Listen—', 'br', 'transform:rotate(6deg)', 'sky'),
    bub(300, 400, 0, 'I know!', 'bl', 'transform:rotate(3deg)'),
    T(876, 60, 700, '<p>The words got all tangled up. Nobody could hear anybody.</p><p>The Talk Tower went wibble… wobble…</p>'),
    T(1150, 560, 0, 'CRASH!', 'boom', 'font-size:112px;transform:rotate(-8deg)'),
  ],
});

// S8 p20-21 — quiet; Sam's idea
spread({
  label: 'S8', bg: C.tSky,
  art: floor(620, C.wash) +
    blk('q', 110, 750, 1, -20) + blk('j', 330, 776, 1, 12) + blk('i', 510, 760, 1, 40) + blk('q', 700, 736, 1, -8) + blk('i', 80, 650, 0.9, 30) +
    kidAt('priya', 'sit', 150, 690, 1.0, 'uhoh') + kidAt('leo', 'sit', 320, 680, 1.0, 'uhoh', true) + kidAt('zara', 'sit', 480, 700, 1.0, 'oh') +
    kidAt('sam', 'sit', 650, 680, 1.05, 'shy', true) +
    // right
    teacherAt('sit', 990, 770, 1.15, 'talk') +
    kidAt('sam', 'stand', 1236, 780, 1.15, 'laugh') +
    E(1430, 784, 80, 10, '#D4E4F7') + tower(1430, 780, ['i'], 1.3) + bursts(1430, 690, 42, C.ink, 5, 24) +
    blk('q', 1540, 640, 0.8, 20) + blk('j', 1560, 740, 0.8, -12),
  texts: [
    T(60, 60, 700, '<p>Blocks everywhere. Room 5 went very, very quiet.</p><p>Then a small voice said something.</p>'),
    bub(380, 330, 350, 'Maybe… we could take turns?', 'br', 'font-size:29px'),
    T(876, 60, 700, '<p>Everyone turned to look at Sam.</p>'),
    bub(876, 150, 380, 'Sam, that’s a great idea!', 'bl', '', 'sky'),
    T(876, 290, 460, '<p>Sam’s very first block started a brand-new tower.</p>', 'story', 'font-size:30px'),
    clack(1320, 456, -6, 72),
  ],
});

// S9 p22-23 — the Talking Star
spread({
  label: 'S9', bg: C.tSun,
  art: floor(700, C.wash) + rug(400, 770, 330, 66) +
    teacherAt('sithold', 400, 766, 1.4, 'talk') + U('star', 400, 686, 0.95) +
    rug(1224, 744, 370, 76) +
    kidAt('priya', 'sit', 940, 706, 0.95, 'listen') + kidAt('leo', 'sit', 1076, 726, 0.95, 'listen') +
    kidAt('zara', 'sithold', 1224, 766, 1.05, 'talk') + U('star', 1224, 708, 0.72) +
    kidAt('milo', 'sit', 1372, 726, 0.95, 'listenL') + kidAt('sam', 'sit', 1508, 706, 0.95, 'listenL'),
  texts: [
    T(60, 60, 700, '<p>Ms. Poppy brought out the Talking Star.</p><p>“Whoever holds the star talks. Everybody else listens, with their eyes, their ears and their whole body.”</p>'),
    T(876, 60, 700, 'Pass the star.<br>Take a turn.<br>Pass the star.<br>Take a turn.', 'chantbig'),
    T(1250, 80, 0, 'CLACK!', 'boom', 'font-size:60px;transform:rotate(6deg)'),
    T(1330, 180, 0, 'CLACK!', 'boom', 'font-size:60px;transform:rotate(-5deg)'),
    T(1250, 280, 0, 'CLACK!', 'boom', 'font-size:60px;transform:rotate(4deg)'),
  ],
});

// S10 p24-25 — listening counts too
spread({
  label: 'S10', bg: C.tPlum,
  art: floor(700, C.wash) +
    kidAt('priya', 'sithold', 200, 790, 1.25, 'talk') + U('star', 200, 716, 0.8) +
    kidAt('milo', 'sit', 590, 790, 1.25, 'listenL') +
    // right
    teacherAt('sittalk', 1010, 776, 1.3, 'smile') +
    tower(1450, 770, ['i', 'q', 'j', 'i', 'q', 'l'], 1.05) + bursts(1450, 372, 42, C.ink, 5, 24),
  texts: [
    T(60, 60, 700, '<p>When it was Priya’s turn, she talked about her grandma’s garden. Milo listened to every word. Then he asked something more.</p>'),
    bub(60, 300, 360, 'My grandma grows <b>giant</b> pumpkins!', 'bl', 'font-size:29px'),
    bub(420, 400, 320, 'How do they get so big?', 'br', 'font-size:29px', 'plum'),
    T(876, 60, 700, '<p>“Milo, you were really listening,” said Ms. Poppy. “Listening counts too!”</p><p>So the tower got a brand-new color: a purple block, for good listening.</p>'),
    clack(1150, 396, -6, 72),
  ],
});

// S11 p26-27 — up, up, up / the end
spread({
  label: 'S11', bg: C.tSky,
  art: floor(700, C.wash) +
    U('clock', 130, 392, 0.85) + G('translate(56 492)', windowRain(170, 150)) +
    tower(626, 790, ['i', 'q', 'j', 'i', 'q', 'l', 'j', 'q'], 1.04) +
    U('stool', 490, 672, 1.25) + teacherAt('reach', 490, 672, 1.0, 'laugh') + blk('l', 594, 244, 0.9, -6) +
    // right
    kidAt('priya', 'cheer', 930, 790, 1.02, 'laugh', true) + kidAt('leo', 'stand', 1070, 790, 1.02, 'laugh', true) + kidAt('zara', 'cheer', 1210, 790, 1.02, 'talk', true) +
    kidAt('milo', 'handup', 1350, 790, 1.02, 'laugh', true) + kidAt('sam', 'cheer', 1490, 790, 1.02, 'laugh', true),
  texts: [
    T(60, 60, 380, '<p>Up, up, up went the Talk Tower. Past the window. Past the clock. Ms. Poppy had to stand on the step stool!</p>', 'story', 'font-size:30px'),
    T(876, 60, 700, '<p>“We built all that with our words!” said Priya.</p><p>“And our ears,” said Sam.</p>'),
    T(876, 214, 700, '<p>Tap, tap, tap went the rain. But nobody in Room 5 heard it. They were much too busy talking.</p>'),
    T(876, 396, 700, 'The End', 'theend'),
  ],
});

