// @ts-nocheck
'use client';

import React, { useState, useEffect } from 'react';
import { PROJECTS, TYPES, UGC_FORMATS, art, trustHTML, statsHTML, ctaHTML } from '@/lib/advera-data';

export default function WorksView() {
  const [selectedType, setSelectedType] = useState('All');
  const [selectedFormat, setSelectedFormat] = useState('All');

  const filteredProjects = PROJECTS.filter(p => {
    const okType = selectedType === 'All' || p.types.includes(selectedType);
    const okFmt = selectedFormat === 'All' || (p.formats && p.formats.includes(selectedFormat));
    return okType && okFmt;
  });

  const counts = (t: string) => PROJECTS.filter(p => p.types.includes(t)).length;
  const ugcCount = (f: string) => f === 'All'
    ? PROJECTS.filter(p => p.types.includes('UGC')).length
    : PROJECTS.filter(p => (p.formats || []).includes(f)).length;

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
      <section className="phero">
        <div className="wrap phero-in">
          <h1 className="h1">Brands and content we are proud of</h1>
          <div className="phero-side">
            <p>Identities, creator campaigns and websites built for businesses that wanted to be remembered and believed.</p>
          </div>
        </div>
      </section>

      <div dangerouslySetInnerHTML={{ __html: trustHTML('Brands we have worked with') }} />

      <section className="sec sec--tight">
        <div className="wrap">
          {/* Main Filters */}
          <div className="filters" role="group" aria-label="Filter projects">
            <button
              className="fchip"
              data-filter="All"
              onClick={() => {
                setSelectedType('All');
                setSelectedFormat('All');
              }}
              aria-pressed={selectedType === 'All'}
            >
              All <span suppressHydrationWarning>{PROJECTS.length}</span>
            </button>
            {TYPES.map(t => (
              <button
                key={t}
                className="fchip"
                data-filter={t}
                onClick={() => {
                  setSelectedType(t);
                  setSelectedFormat('All');
                }}
                aria-pressed={selectedType === t}
              >
                {t} <span suppressHydrationWarning>{counts(t)}</span>
              </button>
            ))}
          </div>

          {/* UGC Sub-filters */}
          {selectedType === 'UGC' && (
            <div className="subfilters" id="ugc-sub" role="group" aria-label="Filter UGC projects by format">
              <p>UGC format</p>
              <button
                className="sfchip"
                data-sub="All"
                onClick={() => setSelectedFormat('All')}
                aria-pressed={selectedFormat === 'All'}
              >
                All formats <span suppressHydrationWarning>{ugcCount('All')}</span>
              </button>
              {UGC_FORMATS.map(f => (
                <button
                  key={f}
                  className="sfchip"
                  data-sub={f}
                  onClick={() => setSelectedFormat(f)}
                  aria-pressed={selectedFormat === f}
                >
                  {f} <span suppressHydrationWarning>{ugcCount(f)}</span>
                </button>
              ))}
            </div>
          )}

          <p className="muted" id="works-count" aria-live="polite">
            Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
            {selectedType !== 'All' ? ` in ${selectedType}` : ''}
            {selectedFormat !== 'All' ? `, ${selectedFormat}` : ''}
          </p>

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <div className="works-empty" id="works-empty">
              <h3 id="works-empty-h">New work coming soon</h3>
              <p>We make this format for clients, and samples are on their way to the site. Ask us and we will send examples that fit your product.</p>
              <a className="btn btn--line" href="/contact">Ask for samples</a>
            </div>
          )}

          {/* Projects Grid: 2-Column Masonry Format with alternating Rectangle and Square frames */}
          <div className="grid-work masonry-2col" id="works-grid">
            <div className="masonry-col">
              {filteredProjects.filter((_, idx) => idx % 2 === 0).map((p, colIdx) => (
                <a
                  key={p.slug}
                  className={`card ${colIdx % 2 === 0 ? 'card--rect' : 'card--square'}`}
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
            <div className="masonry-col">
              {filteredProjects.filter((_, idx) => idx % 2 === 1).map((p, colIdx) => (
                <a
                  key={p.slug}
                  className={`card ${colIdx % 2 === 0 ? 'card--square' : 'card--rect'}`}
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
        </div>
      </section>

      {/* Stats Section */}
      <section className="sec panel">
        <div className="wrap" dangerouslySetInnerHTML={{ __html: statsHTML() }} />
      </section>

      <div dangerouslySetInnerHTML={{ __html: ctaHTML('Want results like these for your brand?') }} />
    </>
  );
}
