// Help center answers: one source for /help/, the contact form's "answers as you type", site
// search and FAQPage JSON-LD. Written from operations/customer-service/FAQ.md and the policy
// drafts, without fill-in brackets, reply-time promises, coaching or held school sales.
'use strict';

module.exports = function helpData(ctx) {
  const course = ctx.bySlug['course-screen-reset'];
  const R = (ctx.course && ctx.course.REFUND) || null;
  return [
    { id: 'about', h: 'About us', qs: [
      { q: 'Who is Play Before Pixels?', a: 'A small studio that makes talk-along books, printables and a written program for families with young children. Play Before Pixels is a trade name of AlphaPlay LLC. We were founded by a parent and educator.' },
      { q: 'Are you doctors, therapists or speech-language pathologists?', a: 'No. Our materials are parent education and everyday play. They are not medical, therapy or speech-language services and are not a substitute for professional advice. If you are worried about your child’s development, please talk with your child’s doctor. In the US, you can also contact your state’s free early intervention program for children under 3.' },
      { q: 'Why can’t I call you?', a: 'We are an email-first business, so every answer reaches you in writing and is easy to find later. Most questions are answered on this page. For everything else, use the contact page. Every message gets a written reply.' },
      { q: 'Is anything live, like classes or calls?', a: 'No. We make things you can hold and read: books, cards, printable pages and a written program by email. There are no calls, videos, coaching or live sessions.' }
    ] },
    { id: 'downloads', h: 'Orders and downloads', qs: [
      { q: 'How do I get my printable after I buy it?', a: 'Right after checkout you see a download button, and we email you a link. If the email doesn’t arrive, check your Promotions or Spam folder. Save the files somewhere safe once they download.' },
      { q: 'My download link has expired. Can I get it again?', a: 'Yes. Send us your order number from the contact page and we will send a fresh link.' },
      { q: 'Can I download on a phone or tablet?', a: 'Yes. The files are plain PDFs. On a phone, save them to your Files app or cloud drive, then print from there or send them to a computer.' },
      { q: 'Is anything on sale yet?', a: 'Not yet. The shop opens soon. Every product page shows “Available soon” until checkout is switched on, and nothing can be bought or charged before then.' }
    ] },
    { id: 'printing', h: 'Printing at home', qs: [
      { q: 'What size paper do I need?', a: 'Every printable comes in US Letter and A4. Print at “Actual size” or “100%”, not “Fit to page”.' },
      { q: 'Color or low-ink?', a: 'Each printable has a color file and a low-ink file with a white background and line art that children can color in. Use low-ink for pages you print often.' },
      { q: 'What paper works best?', a: 'Plain paper is fine for most pages. Card stock is sturdier for cards and pieces little hands will use a lot. You can laminate pieces if you like; our guides include laminating tips.' },
      { q: 'Can I get a printable printed at a shop?', a: 'Yes, for your own household’s use. Take the PDF to a print shop and ask for actual size.' }
    ] },
    { id: 'shipping', h: 'Printed books and shipping', qs: [
      { q: 'How are books made and shipped?', a: 'Each book is printed when you order it and shipped by the printer, with tracking by email. The printing and delivery time is shown at checkout before you pay.' },
      { q: 'Why did my order arrive in more than one package?', a: 'Different items are printed at different partner locations, so they sometimes travel separately.' },
      { q: 'Do you ship outside the US?', a: 'Printables work worldwide. For printed books, the countries we ship to, and whether import duties are included, are shown at checkout before you pay.' },
      { q: 'Something arrived damaged or wrong. What do I do?', a: 'Send us a photo from the contact page and we will replace it or refund it. The full rules are on our shipping and returns page.' }
    ] },
    { id: 'refunds', h: 'Returns and refunds', qs: [
      { q: 'Can I get a refund on a printable?', a: 'Digital files can’t be returned once they are downloaded, so change-of-mind refunds aren’t available. We always fix or refund a file that is broken, incomplete, not as described, or charged twice.' },
      { q: 'Can I return a book?', a: 'Our shipping and returns page sets out when a printed item can be returned or replaced. A book that arrives damaged, misprinted or wrong is always replaced or refunded.' },
      ...(course && R ? [{ q: `What is the guarantee on ${course.name}?`, a: `If it isn’t right for your family, ${R.terms}. The full terms are on our shipping and returns page.` }] : []),
      { q: 'I bought on a marketplace.', a: 'That marketplace’s return policy applies, so please contact them first. We are happy to help if we can.' }
    ] },
    { id: 'licenses', h: 'Licenses', qs: [
      { q: 'Can I share a printable with a friend?', a: 'Please share the link to our shop rather than the file. Each household needs its own copy.' },
      { q: 'Which license do I get?', a: 'Every purchase today comes with a Personal / Family license: unlimited copies for your own household. Classroom, child-care, library and site licenses are not available yet.' },
      { q: 'Can a school, library or child-care center buy?', a: 'Not yet. Licenses for classrooms, sites and organizations are not on sale today. When they open, the licenses page will say so.' }
    ] },
    ...(course ? [{ id: 'program', h: 'The written program', qs: [
      { q: `How does ${course.name} work?`, a: 'Day 1 and the workbook arrive by email right after checkout. After that, one short lesson and one easy play come each morning for 30 days. You read at your own pace.' },
      { q: 'Are there videos or calls?', a: 'No. It is a written program. There are no videos, calls, coaching or live sessions, and we don’t give personal advice about individual children.' },
      { q: 'Do we have to give up screens?', a: 'No. The program adds play and talk and gives screens a steady spot in the day. Screens are never used as a reward or a punishment.' }
    ] }] : []),
    { id: 'privacy', h: 'Privacy and email', qs: [
      { q: 'What do you do with my information?', a: 'We collect only what we need to deliver an order and, if you choose, to send our email. We don’t sell your information and we don’t use ad-tracking pixels. Details are in our privacy policy.' },
      { q: 'Do you collect information about children?', a: 'No. The site is for grown-ups. Our sign-up asks only for an email and, if you like, your child’s birth month and year. Please don’t send us children’s names, photos, schools or health information.' },
      { q: 'How do I unsubscribe or delete my data?', a: 'Every email has an unsubscribe link. To delete your data, ask from the contact page.' }
    ] },
    { id: 'accessibility', h: 'Accessibility', qs: [
      { q: 'Can I get a file in another format?', a: 'Yes. Ask from the contact page and we will send a large-print or screen-reader-friendly version where we can, or help you another way. Our accessibility statement lists what we have tested.' }
    ] }
  ];
};
