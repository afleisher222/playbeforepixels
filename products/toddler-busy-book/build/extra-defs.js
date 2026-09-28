// Registry for page-specific SVG symbols (socks, story stages...). Written once into each document.
const store = new Map();
const defs = { add: (id, s) => { if (!store.has(id)) store.set(id, s); }, all: () => [...store.values()].join('') };
module.exports = { defs };
