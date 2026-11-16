// @ts-nocheck
'use client';

import React, { useEffect } from 'react';
import {
  SERVICES,
  MODEL,
  STEPS,
  emblem,
  trustHTML,
  stepsHTML,
  leadsHTML,
  rightsSectionHTML,
  faqHTML,
  ctaHTML
} from '@/lib/advera-data';

export default function ServicesView() {
  useEffect(() => {
    // Scroll to hash if present
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <>
      <section className="phero panel">
        <div className="wrap phero-in">
          <h1 className="h1">Brand, content and web. One team, one plan.</h1>
          <div className="phero-side">
            <p>
              We build the brand, then bring it to life with UGC, social content and a website that converts. Choose one service or bring them together.
            </p>
            <ul className="jump">
              {SERVICES.map(s => (
                <li key={s.id}>
                  <a href={`#svc-${s.id}`}>{s.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div dangerouslySetInnerHTML={{ __html: trustHTML() }} />

      {/* Service Details */}
      {SERVICES.map(s => (
        <section className="svc-detail sec" id={`svc-${s.id}`} key={s.id}>
          <div className="wrap sd-grid">
            <div className="sd-side">
              <span dangerouslySetInnerHTML={{ __html: emblem(s.em, 'lg') }} />
              <h2 className="h2">{s.name}</h2>
              <p className="lead">{s.short}</p>
            </div>
            <div>
              <ul className="defs">
                {s.items.map((item, idx) => (
                  <li key={idx}>
                    <h3>{item.t}</h3>
                    <p>{item.d}</p>
                  </li>
                ))}
              </ul>
              <p className="best">{s.fit}</p>
              <a className="btn" href="/contact">Start a project</a>
            </div>
          </div>
        </section>
      ))}

      {/* Three Ways to Work */}
      <section className="sec soft">
        <div className="wrap">
          <h2 className="h2 narrow">Three ways to work with us</h2>
          <div className="three">
            <div>
              <h3>One-off project</h3>
              <p>A fixed scope and timeline for a new brand, a website or a batch of creator content. You know what you get and when.</p>
            </div>
            <div>
              <h3>Monthly partnership</h3>
              <p>A dedicated team for UGC, social content and ongoing design, planned month by month and adjusted as you grow.</p>
            </div>
            <div>
              <h3>Website care plan</h3>
              <p>Hosting, updates, security, backups and small changes, so your site stays fast and safe after launch.</p>
            </div>
          </div>
          <div className="row-links">
            <a className="btn" href="/contact">Ask for a quote</a>
          </div>
        </div>
      </section>

      {/* Multidisciplinary Team */}
      <section className="sec">
        <div className="wrap">
          <h2 className="h2 narrow">One team runs every discipline, so nothing gets lost in handoffs.</h2>
          <div className="model-wrap">
            <div dangerouslySetInnerHTML={{ __html: leadsHTML() }} />
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

      {/* How Every Project Runs */}
      <section className="sec panel">
        <div className="wrap">
          <h2 className="h2 narrow">How every project runs</h2>
          <div dangerouslySetInnerHTML={{ __html: stepsHTML(STEPS) }} />
        </div>
      </section>

      {/* Protection */}
      <div dangerouslySetInnerHTML={{ __html: rightsSectionHTML('Every project, protected', 'sec soft') }} />

      {/* FAQs */}
      <div dangerouslySetInnerHTML={{ __html: faqHTML() }} />

      {/* Call to action */}
      <div dangerouslySetInnerHTML={{ __html: ctaHTML('Ready to talk about your project?') }} />
    </>
  );
}

