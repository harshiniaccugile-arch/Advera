// @ts-nocheck
const SITE = {
  name: 'Advera Branding',
  email: 'hello@adverabranding.com',
  careersEmail: 'careers@adverabranding.com',
  phone: '+91 99437 98451',
  address: ['76-77', 'Nava India Rd', 'KR Puram Avarampalayam', 'Peelamedu', 'Coimbatore', 'Tamil Nadu 641006', 'India'],
  hours: 'Monday to Saturday, 10:00 to 19:00 IST',
  timeZone: 'Asia/Kolkata',
  tzLabel: 'IST',
  formEndpoint: '',   // optional: a Formspree / Web3Forms / own URL. Empty = opens the visitor's email app.
  social: [['Instagram', 'https://www.instagram.com/'], ['LinkedIn', 'https://www.linkedin.com/'], ['Behance', 'https://www.behance.net/'], ['X', 'https://x.com/']]
};

/* ---------- helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const reduce = typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
const C = { brand: '#FF6A3D', accent: '#FFC857', ink: '#241A2E', paper: '#FFF3E4', mist: '#FF3E85' };
const btn = (href, label, cls = '') => `<a class="btn ${cls}" href="${href}">${label}</a>`;

/* ---------- shape system (used by canvas, SVG art and emblems) ---------- */
const SHAPES = {
  circle: 'M50 0A50 50 0 1 1 50 100A50 50 0 1 1 50 0Z',
  half: 'M0 100A50 50 0 0 1 100 100Z',
  quarter: 'M0 100A100 100 0 0 1 100 0V100Z',
  diamond: 'M50 0L100 50L50 100L0 50Z',
  triangle: 'M0 100L100 100L100 0Z',
  ring: 'M50 0A50 50 0 1 1 50 100A50 50 0 1 1 50 0ZM50 26A24 24 0 1 0 50 74A24 24 0 1 0 50 26Z',
  leaf: 'M0 100A100 100 0 0 1 100 0A100 100 0 0 1 0 100Z'
};
const SHAPE_NAMES = Object.keys(SHAPES);
const P = (shape, x, y, s, fill, rot = 0) => `<path d="${SHAPES[shape]}" fill="${fill}" transform="translate(${x} ${y}) scale(${s / 100}) rotate(${rot} 50 50)"/>`;
const cellSVG = (x, y, s, bg, shape, fg, rot = 0) => `<rect x="${x}" y="${y}" width="${s + .6}" height="${s + .6}" fill="${bg}"/>${P(shape, x, y, s, fg, rot)}`;
const emblem = (spec, size = '') => `<span class="emblem${size ? ' emblem--' + size : ''}"><svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">${cellSVG(0, 0, 100, spec[2], spec[0], spec[1], spec[3] || 0)}</svg></span>`;
function rng(seed) { let a = seed >>> 0; return () => { a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296 } }
function lum(h) { const n = parseInt(h.slice(1), 16); const c = [n >> 16 & 255, n >> 8 & 255, n & 255].map(v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4) }); return .2126 * c[0] + .7152 * c[1] + .0722 * c[2] }
const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05) };
const svgWrap = (inner, w, h) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">${inner}</svg>`;

/* ---------- project cover art (generated, no images needed) ---------- */
function artTiles(p, seed, cols = 4, rows = 3, S = 200, names) {
  const r = rng(seed), pal = p.pal; names = names || SHAPE_NAMES; let bgs = '', fgs = '';
  for (let y = 0; y < rows; y++)for (let x = 0; x < cols; x++) {
    let b, f, t = 0;
    do { b = pal[Math.floor(r() * pal.length)]; f = pal[Math.floor(r() * pal.length)]; t++ } while ((b === f || ratio(b, f) < 1.6) && t < 10);
    if (b === f) f = pal[(pal.indexOf(b) + 1) % pal.length];
    bgs += `<rect x="${x * S}" y="${y * S}" width="${S + .6}" height="${S + .6}" fill="${b}"/>`;
    fgs += P(names[Math.floor(r() * names.length)], x * S, y * S, S, f, Math.floor(r() * 4) * 90);
  }
  return svgWrap(bgs + fgs, cols * S, rows * S);
}
function artPattern(p, seed) { return artTiles(p, seed, 8, 6, 100, ['circle', 'leaf', 'ring', 'half']) }
function artBrowser(p, seed) {
  const [bg, ac, sf, tx] = p.pal, r = rng(seed), shp = ['circle', 'quarter', 'leaf', 'half', 'ring'];
  const a = shp[Math.floor(r() * shp.length)], b = shp[Math.floor(r() * shp.length)];
  let o = `<rect width="800" height="600" fill="${bg}"/>`;
  o += `<rect x="78" y="74" width="680" height="496" fill="${tx}" opacity=".22"/>`;
  o += `<rect x="60" y="52" width="680" height="496" fill="${sf}"/>`;
  o += `<rect x="60" y="52" width="680" height="36" fill="${tx}" opacity=".08"/>`;
  [82, 100, 118].forEach(x => { o += `<circle cx="${x}" cy="70" r="5" fill="${tx}" opacity=".3"/>` });
  o += `<rect x="90" y="112" width="74" height="14" fill="${tx}"/>`;
  [420, 490, 560].forEach(x => { o += `<rect x="${x}" y="115" width="52" height="8" fill="${tx}" opacity=".4"/>` });
  o += `<rect x="640" y="106" width="70" height="26" fill="${ac}"/>`;
  o += `<rect x="90" y="190" width="320" height="34" fill="${tx}"/><rect x="90" y="238" width="250" height="34" fill="${tx}"/>`;
  o += `<rect x="90" y="298" width="290" height="9" fill="${tx}" opacity=".35"/><rect x="90" y="316" width="240" height="9" fill="${tx}" opacity=".35"/>`;
  o += `<rect x="90" y="350" width="118" height="38" fill="${ac}"/>`;
  o += P(a, 470, 168, 220, ac, Math.floor(r() * 4) * 90) + P(b, 540, 238, 110, tx, Math.floor(r() * 4) * 90);
  [90, 300, 510].forEach((x, i) => { o += `<rect x="${x}" y="430" width="200" height="94" fill="${tx}" opacity=".07"/>` + P(shp[(i + seed) % shp.length], x + 14, 444, 38, ac, 90 * i) });
  return svgWrap(o, 800, 600);
}
function artMark(p, seed) {
  const bg = p.pal[0], r = rng(seed), shp = ['circle', 'half', 'quarter', 'leaf', 'ring', 'diamond'];
  const rk = p.pal.slice(1).sort((x, y) => ratio(y, bg) - ratio(x, bg));
  const c3 = rk[0], c1 = ratio(p.pal[1], bg) >= 1.6 ? p.pal[1] : rk[0], c2 = ratio(p.pal[2], bg) >= 1.6 ? p.pal[2] : rk[1] || rk[0];
  const a = shp[Math.floor(r() * shp.length)], b = shp[(shp.indexOf(a) + 1 + Math.floor(r() * (shp.length - 1))) % shp.length];
  const ff = 'Instrument Sans, Arial, sans-serif';
  let o = `<rect width="800" height="600" fill="${bg}"/>`;
  o += P(a, 400, 50, 340, c1, Math.floor(r() * 4) * 90) + P(b, 300, 220, 220, c2, Math.floor(r() * 4) * 90);
  o += `<text x="52" y="540" fill="${c3}" font-family="${ff}" font-size="${p.name.length > 9 ? 84 : 104}" font-weight="600" letter-spacing="-3">${esc(p.name)}</text>`;
  return svgWrap(o, 800, 600);
}
function artArcs(p, seed) {
  const [bg, c1, c2, c3] = p.pal, r = rng(seed), cx = 300 + Math.floor(r() * 200);
  const cols = [c1, c2, c3, c1, c2, bg], rad = [560, 460, 360, 260, 170, 90];
  let o = `<rect width="800" height="600" fill="${bg}"/>`;
  rad.forEach((R, i) => { o += `<circle cx="${cx}" cy="640" r="${R}" fill="${cols[i]}"/>` });
  o += P('leaf', 40, 40, 90, c3, 90) + P('quarter', 680, 40, 80, c2, 180);
  return svgWrap(o, 800, 600);
}
/* ---------- UGC "vertical clip" art ---------- */
const SANS = 'Instrument Sans, Arial, sans-serif';
function tone(bg, cands) {
  const rk = cands.filter(c => c !== bg).sort((a, b) => ratio(b, bg) - ratio(a, bg));
  return { hi: rk[0], mid: rk.find(c => c !== rk[0] && ratio(c, bg) >= 1.5) || rk[1] || rk[0] };
}
function phoneG(bg, hi, mid, cap, seed) {
  const r = rng(seed), shp = ['circle', 'leaf', 'ring', 'quarter', 'diamond'];
  const a = shp[Math.floor(r() * shp.length)];
  let o = `<rect width="270" height="480" rx="30" fill="${bg}"/>`;
  [0, 1, 2].forEach(i => { o += `<rect x="${18 + i * 76}" y="18" width="68" height="3.5" rx="1.75" fill="${hi}" opacity="${i === 0 ? .95 : .35}"/>` });
  o += P(a, 100, 60, 150, hi, Math.floor(r() * 4) * 90);
  o += `<circle cx="70" cy="258" r="24" fill="${mid}"/>` + P('half', 32, 248, 76, mid, 0);
  [300, 342, 384].forEach(y => { o += `<circle cx="242" cy="${y}" r="11" fill="${hi}" opacity=".9"/>` });
  const w = Math.round(cap.length * 7.3 + 30);
  o += `<rect x="18" y="404" width="${w}" height="32" rx="16" fill="${hi}"/><text x="33" y="425" font-family="${SANS}" font-size="13.5" font-weight="600" fill="${bg}">${esc(cap)}</text>`;
  o += `<text x="20" y="462" font-family="${SANS}" font-size="11.5" fill="${hi}" opacity=".75">@creator</text>`;
  return o;
}
const phoneSVG = (bg, hi, mid, cap, seed) => svgWrap(phoneG(bg, hi, mid, cap, seed), 270, 480);
function artPhones(p, seed) {
  const bg = p.pal[0], all = p.pal.concat(['#141414', '#F9F8F6']);
  const rk = all.filter(c => c !== bg).sort((a, b) => ratio(b, bg) - ratio(a, bg));
  const screens = [rk[0], rk[1] || rk[0], rk[2] || rk[0]];
  const caps = ['Honest review', 'Unboxing', 'Day 30 update'];
  const pos = [[172, 150, -5], [311, 64, 0], [450, 166, 5]];
  let o = `<rect width="800" height="600" fill="${bg}"/>`;
  [0, 2, 1].forEach(i => {
    const t = tone(screens[i], all);
    o += `<g transform="translate(${pos[i][0]} ${pos[i][1]}) rotate(${pos[i][2]} 89 158) scale(.66)">${phoneG(screens[i], t.hi, t.mid, caps[i], seed + i)}</g>`;
  });
  return svgWrap(o, 800, 600);
}
const ART = { tiles: artTiles, pattern: artPattern, browser: artBrowser, mark: artMark, arcs: artArcs, phones: artPhones };
const art = (p, style, seed) => {
  if (p && p.img) {
    return `<img src="${esc(p.img)}" alt="${esc(p.name)} brand work" loading="lazy">`;
  }
  return ART[style] ? ART[style](p, seed) : artTiles(p, seed);
};

/* =====================================================================
   CONTENT
   ===================================================================== */
const NAV = [['Home', '#/', ''], ['Services', '#/services', 'services'], ['Works', '#/works', 'works'], ['About', '#/about', 'about'], ['Careers', '#/careers', 'careers'], ['Contact', '#/contact', 'contact']];
const TYPES = ['Branding', 'UGC', 'Social', 'Website'];

const SERVICES = [
  {
    id: 'brand', name: 'Brand Identity and Strategy', em: ['quarter', C.accent, C.brand, 0],
    short: 'We shape how your business looks, sounds and feels, from positioning to a complete visual system.',
    tags: ['Positioning', 'Naming', 'Logo and identity', 'Brand guidelines'],
    items: [
      { t: 'Brand strategy', d: 'Research, audience insight and positioning that make your business easy to choose.' },
      { t: 'Naming and messaging', d: 'Names, taglines and a tone of voice that sound like you and stay consistent everywhere.' },
      { t: 'Logo and visual identity', d: 'Logos, color, type and imagery built as a flexible system, not a one-off file.' },
      { t: 'Brand guidelines', d: 'A clear rulebook and asset library so anyone on your team, or any creator, can use the brand well.' }],
    fit: 'Best for new businesses, rebrands and companies that have outgrown their first logo.'
  },
  {
    id: 'ugc', name: 'UGC Content and Creator Campaigns', em: ['ring', C.brand, C.accent, 0],
    short: 'Real creators, real videos. We find them, brief them and deliver ad-ready content that people trust.',
    tags: ['Creator sourcing', 'Scripts and briefs', 'UGC video ads', 'Usage rights'],
    items: [
      { t: 'Creator sourcing and matching', d: 'We find and vet creators who fit your audience, from micro-creators to loyal customers.' },
      { t: 'Briefs and scripts', d: 'Clear briefs, hooks and talking points that keep every video honest and on message.' },
      { t: 'Production and editing', d: 'Reviews, unboxings, tutorials and testimonials, edited into ad-ready cuts for Reels, Shorts and feeds.' },
      { t: 'Rights and delivery', d: 'Usage rights agreed in writing up front, and files organized for organic posts and paid ads.' }],
    fit: 'Best for product brands that need a steady supply of authentic content for ads and social.'
  },
  {
    id: 'social', name: 'Social Media and Content', em: ['leaf', C.ink, C.mist, 0],
    short: 'Strategy, short video and community management that turn your brand and your UGC into a feed people follow.',
    tags: ['Content strategy', 'Short video', 'Community', 'Repurposing UGC'],
    items: [
      { t: 'Content strategy', d: 'A plan built around your customers, your goals and the platforms where they spend time.' },
      { t: 'Short-form video', d: 'Reels and Shorts written and edited for each platform, not recycled across all of them.' },
      { t: 'Community management', d: 'Replies, comments and conversations handled in your voice, on time.' },
      { t: 'Repurposing creator content', d: 'Creator clips reworked into organic posts, stories and highlights so nothing goes to waste.' }],
    fit: 'Best for brands that want a consistent presence without building an in-house team.'
  },
  {
    id: 'growth', name: 'Paid Social and Performance', em: ['diamond', C.accent, C.ink, 0],
    short: 'Meta and Google campaigns that put your best creative in front of the right people and prove what works.',
    tags: ['Meta ads', 'Google and YouTube', 'Creative testing', 'Reporting'],
    items: [
      { t: 'Campaign setup and management', d: 'Meta, Google and YouTube campaigns built around clear targets and reviewed every week.' },
      { t: 'Creative testing', d: 'We test hooks, formats and creators against each other and scale the winners.' },
      { t: 'Search and SEO', d: 'Technical, on-page and content SEO that brings steady, qualified traffic over time.' },
      { t: 'Analytics and reporting', d: 'Tracking and dashboards so every rupee spent can be traced to a result.' }],
    fit: 'Best for brands with a solid offer that want to scale what already works.'
  },
  {
    id: 'web', name: 'Website and E-commerce Development', em: ['triangle', C.ink, C.accent, 0],
    short: 'Fast, easy-to-edit websites and stores designed to look sharp and turn visitors into customers.',
    tags: ['Custom design', 'WordPress', 'WooCommerce', 'UGC galleries'],
    items: [
      { t: 'Custom website design', d: 'Layouts designed around your message and your customers, never a recycled template.' },
      { t: 'WordPress and WooCommerce', d: 'Flexible builds and stores your team can edit without calling a developer for every change.' },
      { t: 'Landing pages', d: 'Focused pages for campaigns, launches and ads, built to convert and easy to test.' },
      { t: 'UGC galleries and reviews', d: 'Customer photos, creator videos and reviews on product pages, where they help people decide.' }],
    fit: 'Best for businesses launching a new site or store, replacing an old one or fixing one that does not perform.'
  }
];

const PROJECTS = [
  {
    slug: 'brew-bloom', name: 'Brew & Bloom', year: '2026', types: ['Branding'], style: 'tiles', seed: 21, pal: ['#DCE5D3', '#3E5A3A', '#241A2E', '#FFF3E4'],
    img: '/brew_and_bloom/brew-bloom-4.jpg',
    gallery: [
      '/brew_and_bloom/brew-bloom-1.jpg',
      '/brew_and_bloom/brew-bloom-2.jpg',
      '/brew_and_bloom/brew-bloom-3.jpg',
      '/brew_and_bloom/brew-bloom-4.jpg',
      '/brew_and_bloom/brew-bloom-5.jpg',
      '/brew_and_bloom/brew-bloom-6.jpg',
      '/brew_and_bloom/brew-bloom-7.jpg',
      '/brew_and_bloom/brew-bloom-8.jpg'
    ],
    blurb: 'A warm, hand-drawn identity and packaging system for a café that pairs specialty coffee with fresh flowers.', sector: 'Café and florist', timeline: 'Identity and packaging',
    services: ['Logo and wordmark', 'Illustration', 'Packaging', 'Merchandise and signage'],
    challenge: 'Brew & Bloom brings two things people love into one space: good coffee and fresh flowers. The brand needed to feel calm, natural and friendly, and work on everything from a cup sleeve to a shopping bag.',
    approach: 'We built a leaf emblem and a soft serif wordmark, set in cream on a deep forest green, with the line "Coffee, flowers, good vibes". Hand-drawn florals and a barista illustration carry the identity across cups, cold-drink sleeves, carriers, shopping bags, coffee bags, aprons, team tees and menu boards.',
    resultsTitle: 'What we delivered',
    results: [['Identity', 'Leaf emblem, wordmark and tagline'], ['Packaging', 'Hot and cold cups, carriers, bags and coffee bags'], ['In store', 'Aprons, team tees, napkins and menu boards']]
  },
  {
    slug: 'maison-eclat', name: 'Maison Éclat', year: '2026', types: ['Branding', 'UGC'], style: 'tiles', seed: 9, pal: ['#17161A', '#E5E3E8', '#9C98A6', '#FFF3E4'],
    img: '/maison_eclat/Maison %C3%89clat/Eternal%20Elegance%20on%20a%20Grey%20Gradient.png',
    gallery: [
      '/maison_eclat/Maison %C3%89clat/Eternal%20Elegance%20on%20a%20Grey%20Gradient.png',
      '/maison_eclat/Maison %C3%89clat/Maison%20%C3%89clat%20(1).png',
      '/maison_eclat/Maison %C3%89clat/Maison%20%C3%89clat%20(2).png',
      '/maison_eclat/Maison %C3%89clat/Maison%20%C3%89clat%20(3).png',
      '/maison_eclat/Maison %C3%89clat/Maison%20%C3%89clat%20Diamond%20Bow%20Editorial.png',
      '/maison_eclat/Maison %C3%89clat/Maison%20%C3%89clat%20Diamond%20Bow%20Set.png',
      '/maison_eclat/Maison %C3%89clat/Split-Panel%20Monochrome%20Diamond%20Bangle.png',
      '/maison_eclat/Maison %C3%89clat/Timeless%20%C3%89clat%20Jewelry%20Packaging.png'
    ],
    blurb: 'Haute joaillerie and diamond bow atelier celebrating timeless elegance through monochrome editorial campaigns.', sector: 'Haute Joaillerie & Diamonds', timeline: '12 weeks, then ongoing',
    services: ['Fine Jewelry Identity & Editorial Art Direction', 'Velvet Packaging & Box Unboxing', 'Influencer Styling UGC & Lookbooks', 'Digital Salon Experience'],
    challenge: 'Maison Éclat required an ethereal, ultra-luxury aesthetic that translated the tactile brilliance of diamond bow rings and bangles into digital prestige.',
    approach: 'We created a monochromatic grey-gradient visual system, sculptural velvet packaging, and paired high-fashion creators with editorial macro videography for unboxing and red-carpet styling reels.',
    resultsTitle: 'What we achieved',
    results: [['3.8x', 'Return on ad spend in international luxury markets'], ['95+', 'Creator styling reels produced'], ['+62%', 'Increase in private appointment bookings']]
  },
  {
    slug: 'glumi', name: 'Glumi Beauty Gummies', year: '2026', types: ['UGC', 'Social', 'Branding'], style: 'tiles', seed: 4, pal: ['#FF6B8B', '#FFA8BA', '#FFF0F3', '#241A2E'],
    img: '/glumi/glumi/Glumi%20Glow_%20Happy%20Product%20Portrait.png',
    gallery: [
      '/glumi/glumi/Glumi%20Glow_%20Happy%20Product%20Portrait.png',
      '/glumi/glumi/GLUMI%20Gummies%20Product%20Studio%20Shot.png',
      '/glumi/glumi/GLUMI%20Gummies%20Spa%20Product%20Display.png',
      '/glumi/glumi/GLUMI%20Minimalist%20Gift%20Bag%20Trio.png',
      '/glumi/glumi/GLUMI%20Pink%20Glow%20Gummies%20Product%20Shot.png',
      '/glumi/glumi/Glumi%20Pink%20Gummy%20Supplement%20Set.png',
      '/glumi/glumi/TATTOO%20(13).png',
      '/glumi/glumi/TATTOO%20(14).png',
      '/glumi/glumi/TATTOO%20(15).png'
    ],
    blurb: 'Vibrant skin-glow gummy supplements with playful pastel branding and high-energy creator unboxings.', sector: 'Wellness & Nutricosmetics', timeline: '8 weeks, then monthly UGC',
    services: ['Packaging & Bottle Branding', 'UGC Creator Seeding', 'TikTok & Reels Hook Testing', 'Paid Social Growth'],
    challenge: 'The nutricosmetics space is saturated with sterile vitamin brands. Glumi needed fun, glowing, lifestyle-native creative that converted on TikTok and Instagram.',
    approach: 'We designed joyful bubblegum-pink packaging and gift bags, paired with everyday beauty creators demonstrating their morning routines, taste reviews, and 30-day glow transformations.',
    resultsTitle: 'What we delivered',
    results: [['4.6x', 'Higher video engagement than traditional ads'], ['44%', 'Lower cost per acquisition across paid social'], ['150+', 'Creator videos produced in the first quarter']]
  },
  {
    slug: 'nilave', name: 'Nilavé', year: '2026', types: ['Branding', 'Social', 'UGC'], style: 'tiles', seed: 14, pal: ['#0A1628', '#1E5799', '#7FB3D8', '#F0F7FF'],
    img: '/nilave/nilave/Nilav%C3%A9%20Moroccan%20Blue%20Nila%20Collection.png',
    gallery: [
      '/nilave/nilave/Nilav%C3%A9%20Moroccan%20Blue%20Nila%20Collection.png',
      '/nilave/nilave/NILAV%C3%89%20Skincare%20Beach%20Tote.png',
      '/nilave/nilave/image%20(28).png',
      '/nilave/nilave/dreamina-2026-11-12-4210-generate%2016_9%20ratio%20image%20o%20a%20hand%20placi....jpeg',
      '/nilave/nilave/TATTOO%20(18).png',
      '/nilave/nilave/TATTOO%20(22).png',
      '/nilave/nilave/TATTOO%20(63).png',
      '/nilave/nilave/transform-this-image.jpg'
    ],
    blurb: 'A luxury Moroccan-inspired skincare brand rooted in blue nila botanicals and slow-beauty rituals for the modern woman.', sector: 'Luxury Skincare & Wellness', timeline: '10 weeks, then ongoing',
    services: ['Brand Identity & Packaging System', 'Editorial UGC & Ritual Reels', 'Social Media Strategy', 'Influencer Gifting Campaigns'],
    challenge: 'Nilavé needed to carve out a premium, culturally-rooted identity in a saturated skincare market, translating Moroccan blue nila heritage into a visual language that felt both luxurious and deeply personal.',
    approach: 'We built an indigo-and-ocean visual system, crafted botanical packaging and beach lifestyle UGC campaigns, and partnered with slow-beauty creators for ritual unboxing reels and product storytelling.',
    resultsTitle: 'What we achieved',
    results: [['+220%', 'Increase in social reach in first quarter'], ['4.2x', 'ROAS on creator-led gifting campaigns'], ['90+', 'Ritual and lifestyle reels produced']]
  },
  {
    slug: 'teddy-creamery', name: 'Teddy Creamery', year: '2026', types: ['Branding', 'UGC'], style: 'tiles', seed: 33, pal: ['#3D2314', '#E8A87C', '#F9D5A7', '#FFF3E4'],
    img: '/teddy%20creamery/Chocolate%20Teddy%20Gelato%20Tag%20(1).png',
    gallery: [
      '/teddy%20creamery/Chocolate%20Teddy%20Gelato%20Tag%20(1).png',
      '/teddy%20creamery/Teddy%20Creamery%20Branding%20Close-Up%20(1).png',
      '/teddy%20creamery/Teddy%20Creamery%20Chocolate%20Trio%20(1).png',
      '/teddy%20creamery/Teddy%20Creamary%20Triptych%20Ice%20Cream%20Poster%20(1).png',
      '/teddy%20creamery/Teddy%20Creamery%20Ice%20Cream%20Spread%20(1).png',
      '/teddy%20creamery/Vanilla%20Scoop%20and%20Frosted%20Teddy%20Creamery%20Pint%20(1).png',
      '/teddy%20creamery/TATTOO%20(65)%20(1).png',
      '/teddy%20creamery/TATTOO%20(66)%20(1).png'
    ],
    blurb: 'An artisanal gelato and ice cream brand blending nostalgic teddy bear warmth with decadent chocolate artistry.', sector: 'Artisanal Creamery & Gelato', timeline: '8 weeks, then ongoing UGC',
    services: ['Brand Identity & Character Design', 'Packaging & Pint Tins', 'Menu & Triptych Poster Design', 'Creator UGC & Taste-Test Ads'],
    challenge: 'Teddy Creamery needed a playful, comforting brand identity and crave-worthy social content to stand out against mass-market ice cream brands and drive online orders and parlour footfall.',
    approach: 'We crafted a vintage teddy bear mascot emblem and paired it with rich chocolate and vanilla tones across frosted pints, gelato tags, and illustrative merchandise. We then activated food and lifestyle creators for unboxing, scoop reviews, and taste-test campaigns.',
    resultsTitle: 'What we delivered',
    results: [['+185%', 'Growth in retail gelato pint sales'], ['85+', 'Creator taste-test reels and unboxings'], ['3.4x', 'ROAS on creator-led video campaigns']]
  },
  {
    slug: 'aurelle', name: 'Aurelle Fine Jewelry', year: '2026', types: ['Branding', 'Website', 'UGC'], style: 'tiles', seed: 8, pal: ['#1B2E24', '#D4AF37', '#F4E8C1', '#141317'],
    img: '/auelle/Elegant%20Geometric%20Diamond%20Jewelry%20Portrait%20(1).png',
    gallery: [
      '/auelle/Elegant%20Geometric%20Diamond%20Jewelry%20Portrait%20(1).png',
      '/auelle/Emerald%20Diamond%20Choker%20on%20Velvet%20Bust%20(1)%20(1).png',
      '/auelle/1acd9ca7-0362-459c-be44-604f7011ffdc.png',
      '/auelle/3b168c02-13be-4d2a-ac95-6ed647ccebe0.png',
      '/auelle/bfd43874-26ee-45c4-8a7f-d8cdc6b7bd4e.png',
      '/auelle/TATTOO%20(28)%20(1).png',
      '/auelle/TATTOO%20(31)%20(1).png',
      '/auelle/TATTOO%20(34)%20(1).png'
    ],
    blurb: 'An exquisite fine jewelry atelier blending royal emeralds, geometric diamonds, and bespoke couture storytelling.', sector: 'Luxury & Fine Jewelry', timeline: '10 weeks, then ongoing',
    services: ['Luxury Brand Identity & Editorial Lookbook', 'Bespoke E-commerce Boutique', 'Jewelry Try-On UGC Campaigns', 'Packaging & Unboxing Experience'],
    challenge: 'Aurelle crafted heirloom-grade emerald and diamond pieces, but their online store felt disconnected from the regal, intimate craftsmanship of their private salon.',
    approach: 'We crafted a prestigious deep emerald and gold identity, a minimalist luxury boutique with high-detail product zooms, and commissioned styling creators to showcase choker styling and tactile unboxings.',
    resultsTitle: 'What we achieved',
    results: [['+74%', 'Average order value increase'], ['4.8x', 'Return on ad spend across luxury audiences'], ['240+', 'High-net-worth collector enquiries']]
  },
  {
    slug: 'chunks', name: 'Chunks Craft Chocolate', year: '2025', types: ['Branding', 'Website', 'UGC'], style: 'tiles', seed: 5, pal: ['#2A1810', '#E05368', '#F3B290', '#141317'],
    img: '/chunks/Glossy%20Chunkz%20Double%20Dark%20Chocolate%20Pouch.png',
    gallery: [
      '/chunks/Glossy%20Chunkz%20Double%20Dark%20Chocolate%20Pouch.png',
      '/chunks/Chunkz%20Chocolate%20Strawberry%20Flat%20Lay.png',
      '/chunks/Chunkz%20Double%20Dark%20Strawberry%20Pouch.png',
      '/chunks/Double%20Dark%20Chocolate%20%26%20Nut%20Packaging.png',
      '/chunks/Opening%20a%20Chunkz%20Chocolate%20Pouch.png',
      '/chunks/Unwrapping%20a%20Chunkz%20Dark%20Chocolate%20Bar.png',
      '/chunks/TATTOO%20(11)%20(1).png',
      '/chunks/TATTOO%20(12)%20(1).png'
    ],
    blurb: 'Bold double-dark chocolate pouches packed with freeze-dried strawberries, almonds, and unapologetic crunch.', sector: 'Confectionery & Snack Brand', timeline: '8 weeks, then monthly UGC',
    services: ['Packaging & Pouch System Design', 'Direct-to-Consumer Shopify Store', 'Creator Taste-Test & Crunch UGC', 'Paid Social Scaling'],
    challenge: 'Chunks had an irresistible snack with rich cacao and whole fruits, but generic retail shelving prevented impulse purchases online.',
    approach: 'We designed bold, tactile pouch packaging featuring strawberry and double-dark illustrations, built a high-speed DTC store, and deployed snappy crunch-test creator videos on TikTok and Reels.',
    resultsTitle: 'What we delivered',
    results: [['+210%', 'Direct-to-consumer store sales'], ['140+', 'Creator taste-test & ASMR crunch videos'], ['39%', 'Lower customer acquisition cost']]
  },
  {
    slug: 'pawlish', name: 'Pawlish', year: '2026', types: ['Branding', 'Social', 'UGC'], style: 'tiles', seed: 2, pal: ['#FFF0F5', '#FF85A1', '#B5EAEA', '#1A1A2E'],
    img: '/pawlish/pawlish/Cozy%20Pawlish%20Cat%20Care%20Still%20Life.png',
    gallery: [
      '/pawlish/pawlish/Cozy%20Pawlish%20Cat%20Care%20Still%20Life.png',
      '/pawlish/pawlish/Golden%20Retriever%20with%20Pawlish%20Grooming%20Essentials.png',
      '/pawlish/pawlish/Pawlish%20Garden%20Gift%20Basket%20with%20Playful%20Pomeranians.png',
      '/pawlish/pawlish/Pawlish%20Perfume%20and%20Curious%20Ragdoll.png',
      '/pawlish/pawlish/Pawlish%20Perfume%20Mist%20for%20Pomeranian.png',
      '/pawlish/pawlish/Pawlish%20Pet%20Care%20Gift%20Basket.png',
      '/pawlish/pawlish/Pawlish%20Shih%20Tzu%20in%20Pink%20Bag.png',
      '/pawlish/pawlish/b4f5769c-c981-45ad-94d5-6ccb50aaef72.png',
      '/pawlish/pawlish/TATTOO%20(61).png'
    ],
    blurb: 'A premium pet grooming and lifestyle brand built for pet parents who treat their animals like family.', sector: 'Pet Care & Grooming', timeline: '9 weeks, then monthly UGC',
    services: ['Brand Identity & Packaging', 'Pet Lifestyle UGC Campaigns', 'Social Media Content Strategy', 'Influencer & Creator Gifting'],
    challenge: 'Pawlish needed to stand apart from generic pet-care brands by channelling the joy, softness, and devotion of real pet parenthood into a commercially viable premium identity.',
    approach: 'We built a playful pastel identity with plush product photography, gifted pet lifestyle creators for authentic unboxings, and built a social-first content strategy around real moments between pets and their people.',
    resultsTitle: 'What we delivered',
    results: [['+310%', 'Organic reach growth across Instagram and TikTok'], ['120+', 'Pet lifestyle UGC reels produced'], ['4.1x', 'Return on creator-led paid social']]
  },
  {
    slug: 'the-oven-club', name: 'The Oven Club', year: '2026', types: ['Branding', 'Social', 'UGC'], style: 'tiles', seed: 19, pal: ['#1A0C08', '#D63031', '#FAD390', '#FFF3E4'],
    img: '/the_oven_club/The%20Oven%20Club/Red%20Oven%20Club%20Pizza%20Boxes.png',
    gallery: [
      '/the_oven_club/The%20Oven%20Club/Red%20Oven%20Club%20Pizza%20Boxes.png',
      '/the_oven_club/The%20Oven%20Club/Hands%20Passing%20a%20Vibrant%20Pizza%20Box.png',
      '/the_oven_club/The%20Oven%20Club/Branded%20Pizzeria%20Feast%20with%20Pizza%20and%20Fries%20(1).png',
      '/the_oven_club/The%20Oven%20Club/Dynamic%20Oven%20Club%20Fried%20Chicken%20Feast.png',
      '/the_oven_club/The%20Oven%20Club/The%20Oven%20Club%20Feast%20Tray.png',
      '/the_oven_club/The%20Oven%20Club/Branded%20Pizza%20Prep%20in%20the%20Kitchen.png',
      '/the_oven_club/The%20Oven%20Club/image%20(33).png',
      '/the_oven_club/The%20Oven%20Club/TATTOO%20(26).png'
    ],
    blurb: 'A bold, high-energy pizzeria and street feast concept engineered for communal dining and craveable social virality.', sector: 'Artisan Pizzeria & Hospitality', timeline: '8 weeks, then ongoing UGC',
    services: ['Fast-Casual Brand Identity', 'Custom Pizza Box & Packaging Suite', 'Viral Food UGC & ASMR Reels', 'Social Media Strategy'],
    challenge: 'The Oven Club wanted to break away from traditional trattorias with an electric, youth-driven identity that turned every takeaway order into an Instagram unboxing moment.',
    approach: 'We developed radiant cherry-red pizza boxes, vibrant typographic menus, and orchestrated high-energy creator feasts highlighting cheese pulls, kitchen prep ASMR, and communal share platters.',
    resultsTitle: 'What we achieved',
    results: [['+195%', 'Growth in direct takeaway deliveries'], ['80+', 'Viral food creator videos produced'], ['3.7x', 'ROAS on localized hyper-targeted social ads']]
  },
  {
    slug: 'the-syrup-company', name: 'The Syrup Company', year: '2026', types: ['Branding', 'Website', 'UGC'], style: 'tiles', seed: 27, pal: ['#231015', '#8C1D40', '#E5A96A', '#FFF8F0'],
    img: '/the_syrup_company/the%20syrup%20company/The%20Syrup%20Company%20Gourmet%20Flavor%20Collection.png',
    gallery: [
      '/the_syrup_company/the%20syrup%20company/The%20Syrup%20Company%20Gourmet%20Flavor%20Collection.png',
      '/the_syrup_company/the%20syrup%20company/Almond%20Apricot%20Syrup%20Still%20Life.png',
      '/the_syrup_company/the%20syrup%20company/Coconut%20Macadamia%20Mango%20Syrup%20Splash.png',
      '/the_syrup_company/the%20syrup%20company/Maple%20Pecan%20Pear%20Syrup%20Showcase.png',
      '/the_syrup_company/the%20syrup%20company/Pistachio%20Rose%20Cherry%20Syrup%20Bottle.png',
      '/the_syrup_company/the%20syrup%20company/Toasted%20Hazelnut%20%26%20Fig%20Syrup%20Bottle.png',
      '/the_syrup_company/the%20syrup%20company/Tropical%20Syrup%20Pancake%20Still%20Life%20-%20Copy.png',
      '/the_syrup_company/the%20syrup%20company/Burgundy%20Syrup%20Gift%20Bag%20with%20Bottles%20-%20Copy.png',
      '/the_syrup_company/the%20syrup%20company/Artisan%20Syrups%20Storefront%20Display%20-%20Copy.png'
    ],
    blurb: 'Artisanal gourmet botanical and fruit syrups crafted for mixologists, barista counters, and Sunday pancake stacks.', sector: 'Gourmet Food & Beverage', timeline: '10 weeks, then ongoing',
    services: ['Apothecary Bottle & Label Identity', 'Direct-to-Consumer E-Commerce Store', 'Recipe & Cocktail UGC Creation', 'Seeding & Influencer Gifting'],
    challenge: 'Standing out on specialty pantry shelves required blending heirloom apothecary charm with modern mixology credibility and mouth-watering recipe inspirations.',
    approach: 'We designed deep burgundy glass packaging with botanical crests, built a recipe-centric DTC boutique, and teamed up with cocktail creators and home bakers for indulgent pour and drizzle video demos.',
    resultsTitle: 'What we delivered',
    results: [['+240%', 'Direct online store revenue increase'], ['110+', 'Cocktail & brunch creator reels'], ['4.5x', 'ROAS across lifestyle beverage campaigns']]
  },
  {
    slug: 'velvet-and-bean', name: 'Velvet & Bean', year: '2026', types: ['Branding', 'Website', 'UGC'], style: 'tiles', seed: 31, pal: ['#1C161D', '#6A4C6D', '#B5D8D6', '#FFF3E4'],
    img: '/velvet_and_bean/velvet%20%26%20bean/Velvet%20%26%20Bean%20Chocolate%20Collection.png',
    gallery: [
      '/velvet_and_bean/velvet%20%26%20bean/Velvet%20%26%20Bean%20Chocolate%20Collection.png',
      '/velvet_and_bean/velvet%20%26%20bean/Velvet%20%26%20Bean%20Chocolate%20Collection%20(2).png',
      '/velvet_and_bean/velvet%20%26%20bean/Pastel%20Blue%20Velvet%20%26%20Dean%20Shopping%20Bags.png',
      '/velvet_and_bean/velvet%20%26%20bean/image%20(36).png',
      '/velvet_and_bean/velvet%20%26%20bean/image%20(45).png',
      '/velvet_and_bean/velvet%20%26%20bean/TATTOO%20(37).png',
      '/velvet_and_bean/velvet%20%26%20bean/TATTOO%20(43).png',
      '/velvet_and_bean/velvet%20%26%20bean/TATTOO%20(49).png'
    ],
    blurb: 'Artisan confectionery and single-origin cacao bars housed in soft pastel packaging and timeless couture aesthetics.', sector: 'Artisan Chocolaterie & Pâtisserie', timeline: '9 weeks, then monthly UGC',
    services: ['Luxury Confectionery Identity', 'Custom Foil Box & Bag Packaging', 'Sensory Unboxing & Review UGC', 'Shopify E-Commerce Store'],
    challenge: 'Velvet & Bean sought to elevate the everyday chocolate bar into an intimate sensory luxury item that competes with high-end gift ateliers.',
    approach: 'We designed a serene dusty-rose and pastel aqua packaging suite with gold foil accents, launched an editorial gifting boutique, and deployed creator unboxings celebrating the ritual of fine chocolate appreciation.',
    resultsTitle: 'What we achieved',
    results: [['+165%', 'Average cart value for holiday gifting sets'], ['75+', 'Sensory creator review reels'], ['3.9x', 'Return on ad spend across luxury lifestyle segments']]
  }
];

const UGC_FORMATS = ['Reviews and testimonials', 'Unboxing', 'How-to and demos', 'Get ready with me', 'Problem and solution', 'Before and after', 'Faceless and voiceover', 'AI UGC'];
const FORMAT_MAP = {
  'maison-eclat': ['Unboxing', 'Get ready with me', 'Reviews and testimonials'],
  'glumi': ['Reviews and testimonials', 'Get ready with me', 'Before and after', 'How-to and demos'],
  'nilave': ['Unboxing', 'Get ready with me', 'Reviews and testimonials'],
  'teddy-creamery': ['Unboxing', 'Get ready with me', 'Reviews and testimonials'],
  'aurelle': ['Unboxing', 'Reviews and testimonials', 'Get ready with me'],
  'chunks': ['Unboxing', 'Reviews and testimonials', 'How-to and demos', 'Problem and solution'],
  'pawlish': ['Unboxing', 'Reviews and testimonials', 'Get ready with me'],
  'the-oven-club': ['Unboxing', 'Reviews and testimonials', 'Problem and solution'],
  'the-syrup-company': ['How-to and demos', 'Reviews and testimonials', 'Unboxing'],
  'velvet-and-bean': ['Unboxing', 'Reviews and testimonials', 'Get ready with me']
};
PROJECTS.forEach(p => { if (FORMAT_MAP[p.slug]) p.formats = FORMAT_MAP[p.slug] });

const STEPS = [
  ['Discover', 'We learn your business, customers and competitors, then agree on the positioning and goals we will measure.'],
  ['Design and build', 'Identity, pages and campaigns are designed, built and tested with you every week.'],
  ['Launch and grow', 'We go live, track what happens and keep improving with data instead of guesses.']
];


const CLIENT_NAMES = PROJECTS.map(p => p.name).concat(['Glumi', 'Aurelle', 'Trellis Labs', 'Cobalt Cafe']);

const GAP = [
  { t: 'Branding studios', d: 'Hand you a logo and a style guide, then leave you to figure out the website and the content.', tag: 'Solve identity.' },
  { t: 'Freelance platforms', d: 'Cheap, fast execution with no one steering strategy or keeping the brand consistent.', tag: 'Solve tasks.' },
  { t: 'Marketing agencies', d: 'Run campaigns on a brand they did not build, so the creative rarely feels native.', tag: 'Solve reach.' },
  { t: 'Advera', d: 'One team that builds the brand, the website and the content, so every piece reinforces the next.', tag: 'Builds the system.', win: true }
];

const LEADS = [
  ['AL', 'Account Lead', 'Owns your outcome and timeline'],
  ['BR', 'Brand Lead', 'Owns identity and guidelines'],
  ['CR', 'Creator Lead', 'Owns sourcing and briefs'],
  ['GR', 'Growth Lead', 'Owns paid, SEO and reporting']
];

const MODEL = [
  ['Discover', 'Business, audience, competitors and goals, so the plan is built on evidence, not guesses.'],
  ['Brand and identity', 'Positioning, naming, logo and a visual system flexible enough for every channel and every creator.'],
  ['Content and UGC', 'Creators sourced, briefed and filmed, edited into ad-ready cuts for organic and paid.'],
  ['Web and growth', 'A fast, on-brand website, plus the paid, SEO and email that bring people to it.'],
  ['Measure and improve', 'Results tracked against the goals we set, with monthly reporting and clear next steps.']
];

const PICKS = [
  { label: 'Build a brand', slug: 'brew-bloom' },
  { label: 'Launch high-converting UGC', slug: 'glumi' },
  { label: 'Launch an e-commerce brand', slug: 'chunks' }
];

const RIGHTS = [
  ['Clear briefs and guidelines', 'Every creator and every designer works from the same brief, so nothing goes off-brand.'],
  ['Usage rights in writing', 'Where content can run, for how long, and whether paid ads are included, agreed before production.'],
  ['Draft reviews before anything ships', 'You approve identity work and creator content before it goes live, every time.'],
  ['One brand voice everywhere', 'The same look, tone and message across your site, your feed and your ads.']
];

const UGC_STEPS = [
  ['Brief', 'We learn your product, audience and goals, then write briefs, hooks and talking points.'],
  ['Match', 'We shortlist and vet creators who genuinely fit your audience, and you approve the lineup.'],
  ['Produce', 'Creators film, we review drafts, and our editors cut ad-ready versions for every format.'],
  ['Test and scale', 'We test hooks and formats in paid and organic, then order more of what works.']
];

const UGC_CLIPS = [
  { t: 'Unboxing', d: 'First impressions, packaging and the moment it arrives.', hook: 'Wait, look inside', img: '/ugc/ugc-chunks.jpg', pal: ['#FFD9C2', '#241A2E', '#FF6A3D'], seed: 11 },
  { t: 'Honest review', d: 'A real person explains what they like and what they would change.', hook: 'I did not expect this', img: '/ugc/ugc-glumi.jpg', pal: ['#FFF3E4', '#241A2E', '#FF3E85'], seed: 12 },
  { t: 'Get ready with me', d: 'Your product inside a daily routine, filmed the way people really use it.', hook: 'My morning routine', img: '/ugc/ugc-nilave.jpg', pal: ['#FFC857', '#241A2E', '#FFF3E4'], seed: 13 },
  { t: 'Problem and solution', d: 'A relatable problem, then how your product fixes it.', hook: 'Why I switched', img: '/ugc/ugc-pawlish.jpg', pal: ['#BFE3C9', '#241A2E', '#1F6F4D'], seed: 14 },
  { t: 'Editorial lookbook', d: 'High-fashion creator styling and luxury unboxing aesthetic.', hook: 'Timeless luxury', img: '/ugc/ugc-maison-eclat.jpg', pal: ['#CFE0FF', '#241A2E', '#FF3E85'], seed: 15 }
];
const WALL_PALS = [['#FFD9C2', '#241A2E', '#FF6A3D'], ['#FFF3E4', '#241A2E', '#FF3E85'], ['#BFE3C9', '#241A2E', '#1F6F4D'], ['#F2C9A0', '#241A2E', '#B94A20'], ['#CFE0FF', '#241A2E', '#5B6FD8'], ['#FFC857', '#241A2E', '#FFF3E4']];
const HOOKS = ['Wait, look inside', 'I did not expect this', 'My morning routine', 'Why I switched', '30 days in', 'Honest review', 'Before and after', 'Worth the hype?'];

const QUOTES = [
  { q: 'Advera gave us a brand we are proud of and a website that finally brings in enquiries every week.', n: 'Priya Raman', r: 'Founder, Aurelle Jewelry', em: ['circle', C.accent, C.brand, 0] },
  { q: 'The creator videos looked like our customers made them, because they did. Our cost per purchase dropped within two months.', n: 'Daniel Cross', r: 'Head of Growth, Glumi', em: ['half', C.brand, C.accent, 90] },
  { q: 'One team handled our identity, our packaging and a steady stream of creator content. Everything finally looks and sounds like us.', n: 'Meera Shah', r: 'Founder, Maison Éclat', em: ['leaf', C.paper, C.ink, 0] }
];

const FAQ = [
  ['What does Advera Branding do?', 'We build brand identities and websites, and we produce UGC and social content with real creators. We also run paid social and search campaigns. You can hire us for one service or bring several together.'],
  ['What is UGC, and why use it?', 'UGC is user-generated content: reviews, unboxings, tutorials and testimonials made by real people instead of a studio. It feels honest, so people tend to trust it more, and it gives you many versions of a video to test in ads.'],
  ['How do you find creators?', 'We source and vet creators from our network and open calls, matched to your audience. We brief them, review drafts and manage revisions and delivery. You approve everything before it goes live.'],
  ['Who owns the content and the usage rights?', 'Usage rights are agreed in writing before production: where the content can run, for how long and whether paid ads are included. You receive files organized for organic and paid use.'],
  ['How long does a typical project take?', 'A brand identity usually takes 4 to 6 weeks and a business website 4 to 8 weeks. A first batch of UGC typically takes 3 to 4 weeks from brief to delivery. Marketing work runs month to month. You get a clear timeline before we start.'],
  ['Do you provide support after launch?', 'Yes. Every project includes a handover and training. Optional care plans cover hosting, updates, security and small changes, and monthly partnerships keep content and campaigns moving.']
];

const ROLES = [
  {
    t: 'Brand and Graphic Designer', m: 'Full-time, remote-friendly', d: 'Shape identities, campaigns and social creative for clients across industries, working closely with strategy and content.',
    do: ['Design logos, identity systems and brand guidelines', 'Create social, ad and presentation assets', 'Present ideas clearly and take feedback well'],
    need: ['A portfolio showing brand and layout work', 'Strong command of Figma and Adobe tools', 'Good typography and attention to detail']
  },
  {
    t: 'Creator Partnerships Manager', m: 'Full-time, remote-friendly', d: 'Find, brief and look after the creators behind our UGC campaigns, from first message to final delivery.',
    do: ['Source and vet creators for each campaign', 'Write briefs and guide creators through drafts', 'Agree usage rights and keep delivery on schedule'],
    need: ['Experience working with creators or influencers', 'Clear, friendly communication', 'A good eye for authentic content']
  },
  {
    t: 'UGC Video Editor', m: 'Freelance or full-time', d: 'Turn raw creator footage into short, scroll-stopping videos for Reels, Shorts and paid ads.',
    do: ['Cut ad-ready versions with hooks, captions and sound', 'Create multiple variations for testing', 'Deliver on tight, predictable timelines'],
    need: ['A reel of recent short-form work', 'Skill in Premiere Pro, CapCut or After Effects', 'A good sense of pacing and sound']
  },
  {
    t: 'Copywriter and Scriptwriter', m: 'Full-time or freelance', d: 'Write hooks, scripts, captions and website copy that sound like real people and stay true to each brand.',
    do: ['Write creator briefs, hooks and scripts', 'Write website, ad and social copy', 'Research audiences and competitors'],
    need: ['Excellent written English', 'A portfolio of published or produced writing', 'Curiosity about how people actually talk']
  },
  {
    t: 'Performance Marketing Executive', m: 'Full-time, remote-friendly', d: 'Plan, launch and optimize paid campaigns, using creative testing to scale what works.',
    do: ['Run Meta, Google and YouTube campaigns', 'Test hooks and creators and report on results', 'Support SEO and email programs'],
    need: ['1 to 3 years of hands-on campaign experience', 'Comfort with analytics and tracking tools', 'Clear, honest reporting']
  },
  {
    t: 'WordPress and WooCommerce Developer', m: 'Full-time, remote-friendly', d: 'Build fast, well-structured websites and stores from approved designs, and keep them running smoothly after launch.',
    do: ['Develop custom themes and WooCommerce features', 'Optimize speed, security and SEO structure', 'Review code and mentor junior developers'],
    need: ['Solid PHP, JavaScript and WordPress experience', 'Experience with WooCommerce and integrations', 'Clean, documented, maintainable code']
  }
];

/* =====================================================================
   COMPONENTS
   ===================================================================== */
const logoMark = '<svg class="logo-mark" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><defs><linearGradient id="lgrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FF6A3D"/><stop offset="1" stop-color="#FF3E85"/></linearGradient></defs><path d="M0 24A24 24 0 0 1 24 0V24Z" fill="currentColor"/><circle cx="4.6" cy="4.6" r="3.2" fill="url(#lgrad)"/></svg>';
const bigMark = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M0 24A24 24 0 0 1 24 0V24Z" fill="currentColor"/><circle cx="4.6" cy="4.6" r="3.2" fill="url(#lgrad)"/></svg>';
const card = p => `<a class="card${(p.style === 'browser' || p.style === 'mark') ? ' wide' : ''}" href="#/works/${p.slug}" data-types="${p.types.join(',')}" data-formats="${(p.formats || []).join('|')}"><div class="card-art">${art(p, p.style, p.seed)}</div><div class="card-body"><h3>${esc(p.name)}</h3><p>${p.blurb}</p><ul class="tags">${p.types.map(t => `<li>${t}</li>`).join('')}</ul></div></a>`;
const stepsHTML = list => `<ol class="steps" style="--n:${list.length}">${list.map((s, i) => `<li class="step"><span class="step-n">${i + 1}</span><h3>${s[0]}</h3><p>${s[1]}</p></li>`).join('')}</ol>`;
const faqHTML = () => `<section class="sec"><div class="wrap faq"><div><h2 class="h2">Questions? We are here to help</h2><p class="lead" style="margin-top:20px">Cannot find your answer? <a class="ulink" href="#/contact">Ask us directly</a>.</p></div><ul class="faq-list acc" data-single>${FAQ.map((f, i) => `<li class="q acc-item"><button data-acc aria-expanded="false" aria-controls="fa-${i}" id="fq-${i}"><span>${f[0]}</span><span class="plus" aria-hidden="true"></span></button><div class="acc-p" id="fa-${i}" role="region" aria-labelledby="fq-${i}"><div><p>${f[1]}</p></div></div></li>`).join('')}</ul></div></section>`;
const ctaHTML = (h = 'Got a brand to build or a story to tell?') => `<section class="cta soft"><div class="wrap"><h2>${h}</h2><div class="row-links">${btn('#/contact', 'Book a call')}<button class="copy" type="button" data-copy="${SITE.email}" aria-label="Copy email address ${SITE.email}"><span>${SITE.email}</span><em aria-live="polite">Copy</em></button></div></div></section>`;
const statsHTML = () => `<div class="stats">${[[60, '+', 'Projects delivered'], [20, '+', 'Years of combined team experience'], [12, '', 'Industries served'], [96, '%', 'Clients who come back']].map(s => `<div class="stat"><b data-count="${s[0]}" data-suffix="${s[1]}">${s[0]}${s[1]}</b><span>${s[2]}</span></div>`).join('')}</div>`;
const svcRow = (s, i) => `<li class="svc acc-item${i === 0 ? ' open' : ''}"><button class="svc-h" data-acc aria-expanded="${i === 0}" aria-controls="sp-${s.id}" id="sh-${s.id}">${emblem(s.em)}<span>${s.name}</span><span class="plus" aria-hidden="true"></span></button><div class="acc-p" id="sp-${s.id}" role="region" aria-labelledby="sh-${s.id}"><div><div class="svc-body"><p>${s.short}</p><div><ul class="tags">${s.tags.map(t => `<li>${t}</li>`).join('')}</ul><a class="ulink" href="#/services/${s.id}">See what is included</a></div></div></div></div></li>`;
const clipHTML = c => `<li class="clip"><div class="clip-art">${c.img ? `<img src="${esc(c.img)}" alt="${esc(c.t)} UGC video" loading="lazy">` : phoneSVG(c.pal[0], c.pal[1], c.pal[2], c.hook, c.seed)}</div><h3>${c.t}</h3><p>${c.d}</p></li>`;
const pcaseInner = p => `<div class="pcase-art">${art(p, p.style, p.seed + 9)}</div><div><h3>${esc(p.name)}</h3><p class="d">${p.blurb}</p><div class="pstats">${p.results.slice(0, 3).map(r => `<div><b>${r[0]}</b><span>${r[1]}</span></div>`).join('')}</div><div class="row-links">${btn('#/works/' + p.slug, 'View full case study', 'btn--line')}</div></div>`;
const trustHTML = (label = 'Recently launched', dark = false) => `<section class="trust${dark ? ' panel' : ''}" aria-label="${label}"><div class="wrap trust-in"><p>${label}</p><div class="trust-mq" aria-hidden="true"><div class="trust-track">${CLIENT_NAMES.concat(CLIENT_NAMES).map(n => `<span>${esc(n)}</span>`).join('')}</div></div></div></section>`;
const gapSectionHTML = (cls = 'sec sec--tight') => `<section class="${cls}"><div class="wrap">
    <h2 class="h2 narrow">Everyone sells you a piece of your brand. Advera builds the whole thing.</h2>
    <div class="gap-grid">${GAP.map(g => `<div class="gap-cell${g.win ? ' win' : ''}"><span class="tag">${g.tag}</span><h3>${g.t}</h3><p>${g.d}</p></div>`).join('')}</div>
  </div></section>`;
const leadsHTML = (heading = 'Your project team') => `<div><h3 style="font:500 1.05rem/1.2 var(--f-body);color:var(--muted);margin-bottom:16px">${heading}</h3><div class="lead-grid">${LEADS.map(l => `<div class="lead-card"><span class="lead-init">${l[0]}</span><b>${l[1]}</b><span>${l[2]}</span></div>`).join('')}</div></div>`;
const rightsSectionHTML = (heading = 'Every project, protected', cls = 'sec panel') => `<section class="${cls}"><div class="wrap"><h2 class="h2 narrow">${heading}</h2><div class="rights-grid">${RIGHTS.map(r => `<div class="rights-card"><i aria-hidden="true"></i><b>${r[0]}</b><p>${r[1]}</p></div>`).join('')}</div></div></section>`;

/* Hero wall: columns of project art and brand image tiles drifting past */
function wallHTML() {
  const shape = [['a', 's', 'a', 's', 'a'], ['s', 'a', 's', 'a', 's'], ['a', 's', 'a', 's', 'a'], ['s', 'a', 's', 'a', 's'], ['a', 's', 'a', 's', 'a']];
  const dur = [92, 72, 104, 80, 66];
  const cols = shape.map((col, ci) => {
    const tiles = col.map((k, ti) => {
      const n = ci * 5 + ti;
      const pr = PROJECTS[n % PROJECTS.length];
      const imgPath = pr.gallery && pr.gallery[ti % pr.gallery.length] ? pr.gallery[ti % pr.gallery.length] : pr.img;
      const content = `<img src="${esc(imgPath)}" alt="${esc(pr.name)} brand visual" loading="lazy">`;
      return `<div class="t ${k === 'a' ? 't-a' : 't-s'}">${content}</div>`;
    }).join('');
    return `<div class="wcol" style="--d:${dur[ci]}s">${tiles}${tiles}</div>`;
  }).join('');
  return `<div class="wall" aria-hidden="true">${cols}</div>`;
}



export {
  UGC_FORMATS,
  FORMAT_MAP,
  SITE,
  SHAPES,
  SHAPE_NAMES,
  C,
  SERVICES,
  PROJECTS,
  TYPES,
  LEADS,
  MODEL,
  PICKS,
  RIGHTS,
  UGC_STEPS,
  UGC_CLIPS,
  WALL_PALS,
  HOOKS,
  QUOTES,
  FAQ,
  ROLES,
  CLIENT_NAMES,
  GAP,
  STEPS,
  btn,
  emblem,
  art,
  card,
  stepsHTML,
  faqHTML,
  ctaHTML,
  statsHTML,
  svcRow,
  clipHTML,
  pcaseInner,
  trustHTML,
  gapSectionHTML,
  leadsHTML,
  rightsSectionHTML,
  wallHTML,
  logoMark,
  bigMark,
  lum,
  ratio,
  esc,
  ART
};
