const { BANDS } = require('./core.js');
const stub = id => ({ id, html: (ctx, pn) => `<section class="page"><div class="live"><h1>${id} ${pn}</h1></div></section>` });
module.exports = { front: [stub('cover')], coversSection: [], back: [stub('end')], divider: (b) => stub('div-' + b), startHere: () => '' };
