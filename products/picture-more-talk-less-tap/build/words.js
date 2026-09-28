// Reads ../WORDS.md (founder-editable text). Sections start with "## name"; one line = one item;
// <!-- comments --> never print. Simple escaping so founder text can't break the HTML.
const fs = require('fs'); const path = require('path');
const src = fs.readFileSync(path.resolve(__dirname, '../WORDS.md'), 'utf8').replace(/<!--[\s\S]*?-->/g, '');
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const sections = {};
let cur = null;
for (const raw of src.split('\n')) {
  const m = raw.match(/^##\s+(\S+)/);
  if (m) { cur = m[1]; sections[cur] = []; continue; }
  if (cur && raw.trim()) sections[cur].push(esc(raw.trim()));
}
const list = (name, n) => { const a = sections[name] || []; if (n && a.length < n) throw new Error(`WORDS.md section "${name}" needs ${n} lines, has ${a.length}`); return n ? a.slice(0, n) : a; };
const one = name => (sections[name] || []).join('<br>');
module.exports = { list, one, sections };
