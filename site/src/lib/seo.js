// JSON-LD builders. No Review or AggregateRating until real reviews exist (DESIGN-SYSTEM 9.4).
'use strict';

function organization(ctx) {
  const S = ctx.cfg.site;
  const sameAs = Object.keys(ctx.cfg.social).filter(k => ctx.links[k]).map(k => ctx.links[k]);
  const o = {
    '@context': 'https://schema.org', '@type': 'Organization', '@id': S.url + '/#org',
    name: S.name, legalName: S.legalName, url: S.url + '/',
    logo: { '@type': 'ImageObject', url: S.url + '/assets/brand/mark-512.png', width: 512, height: 512 },
    description: 'Talk-along books, printables and a written course for families with young children. A trade name of AlphaPlay LLC.'
  };
  if (sameAs.length) o.sameAs = sameAs;
  return o;
}

function website(ctx) {
  const S = ctx.cfg.site;
  return {
    '@context': 'https://schema.org', '@type': 'WebSite', '@id': S.url + '/#site', name: S.name, url: S.url + '/',
    inLanguage: 'en', publisher: { '@id': S.url + '/#org' },
    potentialAction: { '@type': 'SearchAction', target: { '@type': 'EntryPoint', urlTemplate: S.url + '/search/?q={search_term_string}' }, 'query-input': 'required name=search_term_string' }
  };
}

function breadcrumbs(ctx, trail) {
  const S = ctx.cfg.site;
  return {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, item: S.url + t.url }))
  };
}

// Offers say OutOfStock until a real buy link exists: nothing can be bought yet, and the markup must not say otherwise.
function product(ctx, p, image) {
  const S = ctx.cfg.site;
  const isBook = p.types.includes('books');
  const offers = p.priced.map(f => ({
    '@type': 'Offer', name: f.label, price: f.price.toFixed(2), priceCurrency: 'USD',
    availability: f.buyUrl ? (f.id === 'pdf' || f.id === 'program' ? 'https://schema.org/OnlineOnly' : 'https://schema.org/InStock') : 'https://schema.org/OutOfStock',
    url: S.url + p.url, seller: { '@id': S.url + '/#org' }
  }));
  const o = {
    '@context': 'https://schema.org', '@type': isBook ? ['Product', 'Book'] : 'Product',
    '@id': S.url + p.url + '#product', name: p.name, description: p.short, image: [image],
    brand: { '@type': 'Brand', name: S.name }, sku: p.slug, audience: { '@type': 'PeopleAudience', audienceType: 'Parents and caregivers' },
    offers: offers.length === 1 ? offers[0] : offers
  };
  if (isBook) {
    o.inLanguage = 'en';
    const pb = p.formats.find(f => /paper|soft|hard/i.test(f.label) && !f.planned);
    if (pb) o.bookFormat = 'https://schema.org/Paperback';
    if (p.listing.pages) o.numberOfPages = p.listing.pages;
    if (p.listing.isbn && /^\d{13}$/.test(String(p.listing.isbn).replace(/-/g, ''))) o.isbn = p.listing.isbn;
    o.publisher = { '@id': S.url + '/#org' };
  }
  return o;
}

function faqPage(items) {
  return {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: items.map(q => ({ '@type': 'Question', name: q.q, acceptedAnswer: { '@type': 'Answer', text: q.a } }))
  };
}

function webPage(ctx, pg) {
  const S = ctx.cfg.site;
  return { '@context': 'https://schema.org', '@type': pg.type || 'WebPage', name: pg.name, url: S.url + pg.path, inLanguage: 'en', isPartOf: { '@id': S.url + '/#site' }, publisher: { '@id': S.url + '/#org' } };
}

module.exports = { organization, website, breadcrumbs, product, faqPage, webPage };
