// Shared art for the Toddler Busy Book.
// Reuses the line's existing art so the whole brand looks like one family:
//  - board-up-go-more/build/build.js : the talk-along board book's word scenes, cast and symbols (loaded read-only, not copied)
//  - guide-100-plays/build/icons.js  : object icons (a-*) and small UI icons (u-*)
//  - ./art.js                        : new objects this book needs (b-*)
const fs = require('fs');
const path = require('path');
const Module = require('module');

const PRODUCTS = path.resolve(__dirname, '..', '..');
function loadBoardBook() {
  const p = path.join(PRODUCTS, 'board-up-go-more', 'build', 'build.js');
  let src = fs.readFileSync(p, 'utf8');
  if (!/\nbuild\(\);\s*$/.test(src)) throw new Error('board book build.js changed shape: cannot reuse its scenes safely');
  src = src.replace(/\nbuild\(\);\s*$/, '\nmodule.exports={scenes,SYMBOLS,MS,WORDS,wordArt,kid,adult,KIDS,ADULTS,use,C,kidHand,adultHand,aimKid,aimAdult,F};');
  const m = new Module(p, module); m.filename = p; m.paths = Module._nodeModulePaths(path.dirname(p)); m._compile(src, p);
  return m.exports;
}
const BB = loadBoardBook();
const GUIDE = require(path.join(PRODUCTS, 'guide-100-plays', 'build', 'icons.js'));
const MINE = require('./art.js');
const C = MINE.C;

// Wrapper symbols so the board-book animals sit centred in the same ~100 box as every other object.
const WRAP = [
  `<symbol id="w-dog" overflow="visible"><g style="--dg:${C.sun};--ear:${C.tomato}" transform="scale(.9) translate(20,8)"><use href="#dog"/></g></symbol>`,
  `<symbol id="w-cat" overflow="visible"><g transform="scale(1.15) translate(6,12)"><use href="#cat"/></g></symbol>`,
  `<symbol id="w-duck" overflow="visible"><g transform="scale(1.35) translate(0,4)"><use href="#duck"/></g></symbol>`,
  `<symbol id="w-ball" overflow="visible"><g transform="scale(.9)"><use href="#ball"/></g></symbol>`,
  `<symbol id="w-sun" overflow="visible"><g transform="scale(.78)"><use href="#sun"/></g></symbol>`,
  `<symbol id="w-moon" overflow="visible"><g transform="scale(.95) translate(-4,0)"><use href="#moon"/></g></symbol>`,
  `<symbol id="w-shoe" overflow="visible"><g style="--up:${C.sky};--st:${C.sun}" transform="scale(.9)"><use href="#shoe"/></g></symbol>`,
  `<symbol id="w-cup" overflow="visible"><g transform="scale(1.05) translate(0,6)"><use href="#cup"/></g></symbol>`,
  `<symbol id="w-book" overflow="visible"><g transform="scale(1.3)"><use href="#book-closed"/></g></symbol>`,
  `<symbol id="w-blocks" overflow="visible"><g transform="scale(.8)"><use href="#block-1" x="-30" y="28"/><use href="#block-2" x="30" y="28"/><use href="#block-4" x="0" y="-30"/></g></symbol>`,
  `<symbol id="w-heart" overflow="visible"><g transform="scale(1.1) translate(0,4)"><use href="#heart"/></g></symbol>`,
  `<symbol id="w-star" overflow="visible"><path d="${MINE.star(48, 21)}" fill="${C.sun}" stroke="${C.sun}" stroke-width="6" stroke-linejoin="round"/></symbol>`,
  `<symbol id="w-car" overflow="visible"><g transform="scale(1.2)"><use href="#a-car"/></g></symbol>`,
];

// All art symbols live in ONE hidden svg (class "artdefs"): low-ink mode turns these into colorable outlines.
const ARTDEFS = `<svg class="artdefs" width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${BB.SYMBOLS.join('')}${GUIDE.ART.join('')}${MINE.ART.join('')}${WRAP.join('')}</defs></svg>`;
// UI icons stay solid in every edition (class "uidefs").
const UIDEFS = `<svg class="uidefs" width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${GUIDE.UI.join('')}
<symbol id="u-scissors" viewBox="0 0 24 24"><circle cx="6" cy="18" r="3" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="18" r="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 16L19 3M16 16L5 3" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></symbol>
<symbol id="u-nocut" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="3" fill="currentColor"/><path d="M7.5 12.5l3 3 6-6.5" stroke="#FFFFFF" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="u-star" viewBox="0 0 24 24"><path d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17l-6.1 3.4 1.5-6.8L2.2 9l6.9-.7z" fill="currentColor"/></symbol>
<symbol id="u-bolt" viewBox="0 0 24 24"><path d="M13 2L4 14h7l-1 8 9-12h-7z" fill="currentColor"/></symbol>
<symbol id="u-sofa" viewBox="0 0 24 24"><rect x="2" y="10" width="20" height="8" rx="3" fill="currentColor"/><rect x="5" y="5" width="14" height="7" rx="3" fill="currentColor"/><rect x="4" y="18" width="2" height="3" fill="currentColor"/><rect x="18" y="18" width="2" height="3" fill="currentColor"/></symbol>
</defs></svg>`;

const use = (id, x = 0, y = 0, s = 1, extra = '') => `<use href="#${id}" transform="translate(${x},${y}) scale(${s})" ${extra}/>`;
const ui = (id, cls = '') => `<svg class="ui ${cls}" viewBox="0 0 24 24" aria-hidden="true"><use href="#${id}"/></svg>`;

module.exports = { BB, GUIDE, MINE, C, ARTDEFS, UIDEFS, use, ui, star: MINE.star };
