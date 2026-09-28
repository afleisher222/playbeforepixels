// One command rebuilds everything after the founder edits WORDS.md:
//   node build/build-all.js
// Outputs: source*.html, PDFs (Letter, A4, each in color and ink-saver; slides; bonus story; START HERE), previews, cover.png, mockup.png, downloads/.
const { execFileSync } = require('child_process'); const path = require('path'); const fs = require('fs');
const ROOT = path.resolve(__dirname, '..'); const RENDER = path.resolve(ROOT, '../../brand/render.js');
const run = (cmd, args, cwd = ROOT) => execFileSync(cmd, args, { cwd, stdio: 'inherit' });
const node = (...a) => run('node', a);
const rm = p => fs.rmSync(path.join(ROOT, p), { recursive: true, force: true });
// 1. bonus story (reads the story-author and story-dedication slots from WORDS.md)
run('node', ['build/build.js'], path.join(ROOT, 'story-bonus'));
run('node', [RENDER, 'pdf', 'source.html', 'more-talk-less-tap-read-aloud.pdf'], path.join(ROOT, 'story-bonus'));
fs.rmSync(path.join(ROOT, 'story-bonus/preview'), { recursive: true, force: true });
run('node', [RENDER, 'pages', 'source.html', 'preview', '.page', '1'], path.join(ROOT, 'story-bonus'));
run('node', [RENDER, 'png', 'build/cover.html', 'story-cover.png', '816', '816', '1.9608'], path.join(ROOT, 'story-bonus'));
// 2. slides, then the kit in both sizes
node('build/slides.js'); node('build/kit.js', 'letter'); node('build/kit.js', 'a4');
node('build/kit.js', 'letter', 'ink'); node('build/kit.js', 'a4', 'ink'); node('build/start.js');
node(RENDER, 'pdf', 'source.html', 'picture-more-talk-less-tap.pdf');
node(RENDER, 'pdf', 'source-a4.html', 'picture-more-talk-less-tap-A4.pdf');
node(RENDER, 'pdf', 'source-slides.html', 'picture-more-talk-less-tap-slides.pdf');
node(RENDER, 'pdf', 'source-ink.html', 'picture-more-talk-less-tap-ink-saver.pdf');
node(RENDER, 'pdf', 'source-a4-ink.html', 'picture-more-talk-less-tap-ink-saver-A4.pdf');
node(RENDER, 'pdf', 'start-here.html', 'start-here.pdf');
rm('preview'); node(RENDER, 'pages', 'source.html', 'preview', '.page', '1');
rm('preview-a4'); node(RENDER, 'pages', 'source-a4.html', 'preview-a4', '.page', '1');
rm('preview-slides'); node(RENDER, 'pages', 'source-slides.html', 'preview-slides', '.page', '0.75');
rm('preview-ink'); node(RENDER, 'pages', 'source-ink.html', 'preview-ink', '.page', '1');
rm('preview-start'); node(RENDER, 'pages', 'start-here.html', 'preview-start', '.page', '1');
// 3. store images
node(RENDER, 'png', 'source.html', 'cover.png', '816', '1056', '1.51515');
node('build/mockup.js'); node(RENDER, 'png', 'build/mockup.html', 'mockup.png', '1600', '1200', '1');
// 4. customer-facing download set (what the buyer receives)
rm('downloads'); fs.mkdirSync(path.join(ROOT, 'downloads'));
const cp = (a, b) => fs.copyFileSync(path.join(ROOT, a), path.join(ROOT, 'downloads', b));
cp('start-here.pdf', 'START HERE.pdf');
cp('picture-more-talk-less-tap.pdf', 'Talk-Tower-Classroom-Game-Kit-US-Letter.pdf');
cp('picture-more-talk-less-tap-A4.pdf', 'Talk-Tower-Classroom-Game-Kit-A4.pdf');
cp('picture-more-talk-less-tap-ink-saver.pdf', 'Talk-Tower-Classroom-Game-Kit-US-Letter-Ink-Saver.pdf');
cp('picture-more-talk-less-tap-ink-saver-A4.pdf', 'Talk-Tower-Classroom-Game-Kit-A4-Ink-Saver.pdf');
cp('picture-more-talk-less-tap-slides.pdf', 'Talk-Tower-Slides-16x9.pdf');
cp('story-bonus/more-talk-less-tap-read-aloud.pdf', 'Talk-Tower-Story-Read-Aloud.pdf');
// Customer-voice rule 1: plain PDFs of 15 MB or less, never a zip.
for (const f of fs.readdirSync(path.join(ROOT, 'downloads'))) { const mb = fs.statSync(path.join(ROOT, 'downloads', f)).size / 1048576; if (mb > 15) throw new Error(`${f} is ${mb.toFixed(1)} MB (limit 15 MB)`); }
console.log('done');
