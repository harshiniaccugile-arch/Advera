// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { PROJECTS, lum, esc, art, ctaHTML } from '@/lib/advera-data';

export default function WorkDetailView({ slug }: { slug: string }) {
  const i = PROJECTS.findIndex(p => p.slug === slug);
  const p = i >= 0 ? PROJECTS[i] : PROJECTS[0];
  const nx = PROJECTS[(i + 1) % PROJECTS.length];

  const dark = lum(p.pal[0]) < 0.36;
  const fg = dark ? '#F9F8F6' : '#141414';
  const ndark = lum(nx.pal[0]) < 0.36;
  const nfg = ndark ? '#F9F8F6' : '#141414';

  const ugc = p.types.includes('UGC');
  const gal = ugc
    ? [[p.style, p.seed + 1], ['phones', p.seed + 2], ['tiles', p.seed + 3], ['phones', p.seed + 4]]
    : [[p.style, p.seed + 1], ['pattern', p.seed + 2], ['mark', p.seed + 3], [p.style, p.seed + 4]];

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const galleryImages = p.gallery || [];

  return (
    <>
      <section
        className="cs-hero"
        style={{ background: p.pal[0], color: fg }}
      >
        <div className="wrap">
          <a className="cs-back ulink" href="/works">&larr; All work</a>
          <div className="cs-title">
            <h1 className="h1">{p.name}</h1>
          </div>
          <p className="lead">{p.blurb}</p>
          <dl className="cs-meta">
            <div>
              <dt>Sector</dt>
              <dd>{p.sector}</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>{p.year}</dd>
            </div>
            <div>
              <dt>Timeline</dt>
              <dd>{p.timeline}</dd>
            </div>
            <div>
              <dt>Services</dt>
              <dd>{p.services.join(', ')}</dd>
            </div>
            {p.formats && (
              <div>
                <dt>UGC formats</dt>
                <dd>{p.formats.join(', ')}</dd>
              </div>
            )}
          </dl>
        </div>
      </section>

      <div className="wrap">
        <div className="cs-row">
          <h2>The challenge</h2>
          <p>{p.challenge}</p>
        </div>
        <div className="cs-row">
          <h2>Our approach</h2>
          <p>{p.approach}</p>
        </div>
        <div className="cs-gallery">
          {p.gallery ? (
            galleryImages.map((src, k) => (
              <button
                key={k}
                type="button"
                className="zoom"
                onClick={() => setLightboxIndex(k)}
                aria-label={`Enlarge image ${k + 1} of ${galleryImages.length}`}
              >
                <div className="card-art">
                  <img src={src} alt={`${p.name} brand work, image ${k + 1}`} loading="lazy" />
                </div>
              </button>
            ))
          ) : (
            gal.map((g, idx) => (
              <div
                key={idx}
                className="card-art"
                dangerouslySetInnerHTML={{ __html: art(p, g[0], g[1]) }}
              />
            ))
          )}
        </div>
      </div>

      <section className="cs-results panel">
        <div className="wrap">
          <h2 className="h2 narrow" style={{ marginBottom: 'clamp(32px,5vw,64px)' }}>
            {p.resultsTitle || 'The results'}
          </h2>
          <div className="three" style={{ marginTop: 0 }}>
            {p.results.map((r, k) => (
              <div className="stat" key={k} style={{ border: 0, padding: 0 }}>
                <b>{r[0]}</b>
                <span>{r[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <a
        className="next"
        href={`/works/${nx.slug}`}
        style={{ background: nx.pal[0], color: nfg }}
      >
        <div className="wrap">
          <span>Next project</span>
          <b>{nx.name}</b>
        </div>
      </a>

      {/* Lightbox */}
      {lightboxIndex !== null && galleryImages.length > 0 && (
        <div className="lb open" role="dialog" aria-modal="true" aria-label="Image viewer">
          <div className="lb-top">
            <div>
              <b id="lb-title">{p.name}</b>
              <span id="lb-count">{lightboxIndex + 1} / {galleryImages.length}</span>
            </div>
            <button className="lb-btn" onClick={() => setLightboxIndex(null)} aria-label="Close viewer">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2"/></svg>
            </button>
          </div>
          <div className="lb-stage" onClick={(e) => {
            if ((e.target as Element).classList.contains('lb-stage')) setLightboxIndex(null);
          }}>
            <button
              className="lb-btn lb-prev"
              onClick={() => setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length)}
              aria-label="Previous image"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" fill="none"/></svg>
            </button>
            <img src={galleryImages[lightboxIndex]} alt={`${p.name} preview`} />
            <button
              className="lb-btn lb-next"
              onClick={() => setLightboxIndex((lightboxIndex + 1) % galleryImages.length)}
              aria-label="Next image"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none"/></svg>
            </button>
          </div>
          <div className="lb-thumbs">
            {galleryImages.map((src, k) => (
              <button
                key={k}
                className={k === lightboxIndex ? 'cur' : ''}
                onClick={() => setLightboxIndex(k)}
                aria-label={`Show image ${k + 1}`}
              >
                <img src={src} alt="" />
              </button>
            ))}
          </div>
        </div>
      )}

      <div dangerouslySetInnerHTML={{ __html: ctaHTML('Have a project like this in mind?') }} />
    </>
  );
}
