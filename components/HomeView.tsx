// @ts-nocheck
'use client';

import React, { useState, useEffect } from 'react';
import {
  SITE,
  SERVICES,
  PROJECTS,
  LEADS,
  MODEL,
  PICKS,
  RIGHTS,
  UGC_STEPS,
  UGC_CLIPS,
  QUOTES,
  emblem,
  art,
  card,
  stepsHTML,
  faqHTML,
  ctaHTML,
  svcRow,
  clipHTML,
  pcaseInner,
  trustHTML,
  gapSectionHTML,
  rightsSectionHTML,
  wallHTML,
  bigMark
} from '@/lib/advera-data';

export default function HomeView() {
  const [activePick, setActivePick] = useState(PICKS[0].slug);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isQuoteSwapping, setIsQuoteSwapping] = useState(false);

  const feat = ['brew-bloom', 'maison-eclat', 'glumi', 'chunks'].map(sl =>
    PROJECTS.find(p => p.slug === sl)
  );

  const selectedProject = PROJECTS.find(x => x.slug === activePick);

  const changeQuote = (newIdx: number) => {
    setIsQuoteSwapping(true);
    setTimeout(() => {
      setQuoteIndex((newIdx + QUOTES.length) % QUOTES.length);
      setIsQuoteSwapping(false);
    }, 190);
  };

  useEffect(() => {
    // Accordion handling
    const handleClick = (e: MouseEvent) => {
      const btn = (e.target as Element)?.closest('[data-acc]');
      if (!btn) return;
      const item = btn.closest('.acc-item');
      if (!item) return;
      const list = item.parentElement;
      const isOpen = item.classList.contains('open');

      if (!isOpen && list?.hasAttribute('data-single')) {
        list.querySelectorAll('.acc-item.open').forEach(i => {
          i.classList.remove('open');
          i.querySelector('[data-acc]')?.setAttribute('aria-expanded', 'false');
        });
      }
      item.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const currentQuote = QUOTES[quoteIndex];

  return (
    <>
      {/* Hero Section */}
      <section className="hero" aria-labelledby="hero-h">
        <div className="wrap hero-top">
          <p className="eyebrow">Branding &middot; UGC Content &middot; Web Design</p>
          <h1 id="hero-h" className="hero-title">
            <span className="ln"><span>Brands people remember.</span></span>
            <span className="ln"><span>Content people believe.</span></span>
          </h1>
          <div className="hero-side">
            <p className="hero-sub">
              A brand and content studio. We design identities and websites, then bring them to life with UGC and social content made by real creators.
            </p>
            <div className="row-links">
              <a className="btn" href="/works">See our work</a>
              <a className="btn btn--line" href="/contact">Start a project</a>
            </div>
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: wallHTML() }} />
      </section>

      {/* Trust Ticker */}
      <div dangerouslySetInnerHTML={{ __html: trustHTML() }} />

      {/* Intro Grid */}
      <section className="intro">
        <div className="wrap intro-grid">
          <div className="intro-mark" dangerouslySetInnerHTML={{ __html: bigMark }} />
          <div>
            <p className="intro-q">
              Every brand starts with an idea. We turn it into something people recognize, talk about and buy from.
            </p>
            <div className="intro-p">
              <p>
                Most brands split the work between one agency for the logo, another for the website and a third for content, and it shows. We do all three together, so your brand looks right and sounds real everywhere it appears.
              </p>
              <p>
                From the logo to the landing page to the creator video in your feed, one team keeps every piece consistent.
              </p>
            </div>
            <div className="row-links">
              <a className="btn btn--line" href="/services">Our services</a>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Projects */}
      <section className="sec sec--tight">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">Recent projects</h2>
            <a className="btn btn--line" href="/works">All projects</a>
          </div>
          <div className="feat">
            {feat.map(p => (
              <a
                key={p.slug}
                className={`card ${p.style === 'browser' || p.style === 'mark' ? 'wide' : ''}`}
                href={`/works/${p.slug}`}
              >
                <div className="card-art" dangerouslySetInnerHTML={{ __html: art(p, p.style, p.seed) }} />
                <div className="card-body">
                  <h3>{p.name}</h3>
                  <p>{p.blurb}</p>
                  <ul className="tags">
                    {p.types.map(t => <li key={t}>{t}</li>)}
                  </ul>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Gap / Why Us Section */}
      <div dangerouslySetInnerHTML={{ __html: gapSectionHTML() }} />

      {/* Services Accordion List */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">Brand first, then content, then growth</h2>
            <a className="btn btn--line" href="/services">All services</a>
          </div>
          <ul className="svc-list acc" data-single>
            {SERVICES.map((s, idx) => (
              <li key={s.id} className={`svc acc-item ${idx === 0 ? 'open' : ''}`}>
                <button
                  className="svc-h"
                  data-acc
                  aria-expanded={idx === 0}
                  aria-controls={`sp-${s.id}`}
                  id={`sh-${s.id}`}
                >
                  <span dangerouslySetInnerHTML={{ __html: emblem(s.em) }} />
                  <span>{s.name}</span>
                  <span className="plus" aria-hidden="true"></span>
                </button>
                <div className="acc-p" id={`sp-${s.id}`} role="region" aria-labelledby={`sh-${s.id}`}>
                  <div>
                    <div className="svc-body">
                      <p>{s.short}</p>
                      <div>
                        <ul className="tags">
                          {s.tags.map(t => <li key={t}>{t}</li>)}
                        </ul>
                        <a className="ulink" href={`/services#svc-${s.id}`}>See what is included</a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Multidisciplinary Team Section */}
      <section className="sec soft">
        <div className="wrap">
          <h2 className="h2 narrow">One team runs every discipline, so nothing gets lost in handoffs.</h2>
          <div className="model-wrap">
            <div>
              <div className="lead-grid">
                {LEADS.map(l => (
                  <div key={l[0]} className="lead-card">
                    <span className="lead-init">{l[0]}</span>
                    <b>{l[1]}</b>
                    <span>{l[2]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="model-list">
              {MODEL.map((m, i) => (
                <div key={m[0]} className="model-row">
                  <b className="n">0{i + 1}</b>
                  <div>
                    <h3>{m[0]}</h3>
                    <p>{m[1]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Goal Case Study Picker */}
      <section className="sec">
        <div className="wrap">
          <h2 className="h2 narrow">Pick a goal. See the work.</h2>
          <div className="picker-tabs" role="tablist">
            {PICKS.map(p => (
              <button
                key={p.slug}
                className="ptab"
                onClick={() => setActivePick(p.slug)}
                aria-pressed={activePick === p.slug}
              >
                {p.label}
              </button>
            ))}
          </div>
          {selectedProject && (
            <div id="pick-case" className="pcase">
              <div className="pcase-art" dangerouslySetInnerHTML={{ __html: art(selectedProject, selectedProject.style, selectedProject.seed + 9) }} />
              <div>
                <h3>{selectedProject.name}</h3>
                <p className="d">{selectedProject.blurb}</p>
                <div className="pstats">
                  {selectedProject.results.slice(0, 3).map((r, k) => (
                    <div key={k}>
                      <b>{r[0]}</b>
                      <span>{r[1]}</span>
                    </div>
                  ))}
                </div>
                <div className="row-links">
                  <a className="btn btn--line" href={`/works/${selectedProject.slug}`}>View full case study</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* UGC Content Spotlight */}
      <section className="sec panel ugc" aria-labelledby="ugc-h">
        <div className="wrap">
          <div className="ugc-head">
            <h2 className="h2" id="ugc-h">UGC that looks real, because it is.</h2>
            <div>
              <p>
                People trust people. We recruit creators who fit your audience, brief them and deliver honest, ad-ready videos, so your brand shows up the way customers actually talk about it.
              </p>
              <div className="row-links">
                <a className="btn" href="/services#svc-ugc">How our UGC works</a>
              </div>
            </div>
          </div>
          <ul className="clips">
            {UGC_CLIPS.map((c, i) => (
              <li key={i} className="clip" dangerouslySetInnerHTML={{ __html: clipHTML(c) }} />
            ))}
          </ul>
          <div dangerouslySetInnerHTML={{ __html: stepsHTML(UGC_STEPS) }} />
        </div>
      </section>

      {/* Project Protection */}
      <div dangerouslySetInnerHTML={{ __html: rightsSectionHTML('Every project, protected', 'sec panel') }} />

      {/* Testimonials Quote Carousel */}
      <section className="sec soft">
        <div className="wrap">
          <h2 className="h2 narrow">Kind words from brands we have grown with</h2>
          <figure className={`quote ${isQuoteSwapping ? 'swap' : ''}`} id="quote">
            <blockquote id="q-text" aria-live="polite">{currentQuote.q}</blockquote>
            <figcaption>
              <span id="q-av" dangerouslySetInnerHTML={{ __html: emblem(currentQuote.em) }} />
              <span>
                <b id="q-name">{currentQuote.n}</b>
                <br />
                <span id="q-role">{currentQuote.r}</span>
              </span>
            </figcaption>
          </figure>
          <div className="q-ctl">
            <button className="q-btn" onClick={() => changeQuote(quoteIndex - 1)} aria-label="Previous testimonial">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button className="q-btn" onClick={() => changeQuote(quoteIndex + 1)} aria-label="Next testimonial">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <div className="dots">
              {QUOTES.map((_, i) => (
                <button
                  key={i}
                  className="dot"
                  onClick={() => changeQuote(i)}
                  aria-label={`Show testimonial ${i + 1}`}
                  aria-current={i === quoteIndex}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About CTA callout */}
      <section className="sec">
        <div className="wrap">
          <p className="intro-q">
            Advera is a small team of strategists, designers and creators, dedicated to bringing out the full potential of your brand.
          </p>
          <div className="row-links">
            <a className="btn btn--line" href="/about">Meet the team</a>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <div dangerouslySetInnerHTML={{ __html: faqHTML() }} />

      {/* Call to action */}
      <div dangerouslySetInnerHTML={{ __html: ctaHTML() }} />
    </>
  );
}

