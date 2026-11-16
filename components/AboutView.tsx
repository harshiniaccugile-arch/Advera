// @ts-nocheck
'use client';

import React, { useEffect } from 'react';
import { C, emblem, trustHTML, leadsHTML, statsHTML, gapSectionHTML } from '@/lib/advera-data';

export default function AboutView() {
  const perks = [
    ['Strategy before style', 'We decide what the brand needs to say before we decide how it looks.', ['quarter', C.accent, C.brand, 0]],
    ['Real people, real content', 'We would rather show your customers than stage them. Creators make the content, and we keep it on brand.', ['ring', C.brand, C.accent, 0]],
    ['Plain talk', 'No jargon and no surprises. You always know what we are doing and why.', ['leaf', C.ink, C.mist, 0]],
    ['Built to last', 'Clean code, flexible systems and clear guidelines that keep working after launch.', ['half', C.paper, C.ink, 0]]
  ];

  const disc = [
    ['Strategy', 'Research, positioning and planning that give every decision a reason.', ['diamond', C.accent, C.ink, 0]],
    ['Design', 'Identity, layout and creative that make your brand feel unmistakably yours.', ['circle', C.paper, C.brand, 0]],
    ['Content', 'UGC, short video and social content made with real creators and edited to perform.', ['ring', C.ink, C.mist, 0]],
    ['Development', 'Websites, stores and apps built to be fast, secure and simple to manage.', ['triangle', C.ink, C.accent, 0]]
  ];

  useEffect(() => {
    // Animate stats counters
    const els = document.querySelectorAll('[data-count]');
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const to = +(el.dataset.count || 0);
          const suf = el.dataset.suffix || '';
          const t0 = performance.now();
          const d = 1400;
          const step = (now: number) => {
            const k = Math.min(1, (now - t0) / d);
            el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))) + suf;
            if (k < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.6 });

    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <section className="phero brandbg">
        <div className="wrap">
          <h1 className="h1" style={{ maxWidth: '12em' }}>
            A small studio for brands that want to be remembered and believed.
          </h1>
        </div>
      </section>

      <div dangerouslySetInnerHTML={{ __html: trustHTML() }} />

      <section className="sec">
        <div className="wrap split">
          <h2 className="h2">Why Advera exists</h2>
          <div className="story">
            <p>
              Too many businesses hire one agency for the logo, another for the website and a third for content, then wonder why nothing feels connected. Advera Branding was started to fix that.
            </p>
            <p>
              We are a compact team of strategists, designers, developers and creator managers. We build the brand, then make it feel real with UGC and social content from real people, so what customers see matches what you promise.
            </p>
            <p>
              Between us we have more than twenty years of experience building for the web. That experience shows in how we plan, how we build and how we look after a project once it is live.
            </p>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="sec soft">
        <div className="wrap">
          <h2 className="h2 narrow">How we work</h2>
          <div className="quad">
            {perks.map((x, idx) => (
              <div key={idx}>
                <span dangerouslySetInnerHTML={{ __html: emblem(x[2]) }} />
                <div>
                  <h3>{x[0]}</h3>
                  <p>{x[1]}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 'clamp(36px,5vw,56px)' }} dangerouslySetInnerHTML={{ __html: leadsHTML() }} />
        </div>
      </section>

      {/* Four disciplines */}
      <section className="sec">
        <div className="wrap">
          <h2 className="h2 narrow">Four disciplines, one team</h2>
          <div className="quad">
            {disc.map((x, idx) => (
              <div key={idx}>
                <span dangerouslySetInnerHTML={{ __html: emblem(x[2]) }} />
                <div>
                  <h3>{x[0]}</h3>
                  <p>{x[1]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="sec panel">
        <div className="wrap" dangerouslySetInnerHTML={{ __html: statsHTML() }} />
      </section>

      <div dangerouslySetInnerHTML={{ __html: gapSectionHTML('sec soft') }} />

      <section className="cta soft">
        <div className="wrap">
          <h2>Want to build brands with us?</h2>
          <div className="row-links">
            <a className="btn" href="/careers">See open roles</a>
            <a className="btn btn--line" href="/contact">Talk to us</a>
          </div>
        </div>
      </section>
    </>
  );
}

