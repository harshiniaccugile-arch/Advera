// @ts-nocheck
'use client';

import React, { useState, useEffect } from 'react';
import { SITE, ROLES, C, emblem, trustHTML, stepsHTML, statsHTML } from '@/lib/advera-data';
import CareerApplySlider from '@/components/CareerApplySlider';

export default function CareersView() {
  const [openRoleIndex, setOpenRoleIndex] = useState<number | null>(null);
  const [selectedRoleForApply, setSelectedRoleForApply] = useState<{ title: string; onHold?: boolean } | null>(null);

  const perks = [
    ['Work where you work best', 'Remote-friendly by default, with flexible hours built around delivering great work.', ['circle', C.accent, C.brand, 0]],
    ['Time to learn', 'Room to explore new tools and skills, and to share what you learn with the team.', ['leaf', C.ink, C.mist, 0]],
    ['Real ownership', 'A small team means your ideas get heard and your work is seen by clients.', ['quarter', C.brand, C.accent, 0]],
    ['A fair, clear process', 'You always know where you stand, what is expected and how to grow.', ['half', C.paper, C.ink, 0]]
  ];

  const hire = [
    ['Apply', 'Send your portfolio or résumé and a few lines about yourself.'],
    ['Intro chat', 'A short call to talk about your work and what you are looking for.'],
    ['Practical task', 'A small paid or time-boxed exercise that reflects the real job.'],
    ['Meet the team', 'A relaxed conversation, then a clear decision within a few days.']
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

  const toggleRole = (i: number) => {
    setOpenRoleIndex(openRoleIndex === i ? null : i);
  };

  return (
    <>
      <section className="phero">
        <div className="wrap phero-in">
          <h1 className="h1">
            Build brands and content people believe in, with people who care how it is done.
          </h1>
          <div className="phero-side">
            <p>
              We are a growing team and always glad to meet talented people. Small team, direct feedback and real ownership.
            </p>
            <div>
              <a
                className="btn"
                href="#roles"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('roles')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                See {ROLES.length} open roles
              </a>
            </div>
          </div>
        </div>
      </section>

      <div dangerouslySetInnerHTML={{ __html: trustHTML('Work you would be part of') }} />

      <section className="sec soft">
        <div className="wrap">
          <h2 className="h2 narrow">What it is like to work here</h2>
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
        </div>
      </section>

      <section className="sec" id="roles">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">Open roles</h2>
          </div>
          <ul className="roles acc" data-single>
            {ROLES.map((r, i) => (
              <li key={i} className={`role acc-item ${openRoleIndex === i ? 'open' : ''}`}>
                <button
                  data-acc
                  aria-expanded={openRoleIndex === i}
                  aria-controls={`rp-${i}`}
                  id={`rh-${i}`}
                  onClick={() => toggleRole(i)}
                >
                  <span className="role-t">{r.t}</span>
                  <span className="role-m">{r.m}</span>
                  <span className="plus" aria-hidden="true"></span>
                </button>
                <div className="acc-p" id={`rp-${i}`} role="region" aria-labelledby={`rh-${i}`}>
                  <div>
                    <div className="role-body">
                      <p style={{ gridColumn: '1/-1', maxWidth: '56ch', color: 'var(--muted)' }}>
                        {r.d}
                      </p>
                      <div>
                        <h3>What you will do</h3>
                        <ul>
                          {r.do.map((item, idx) => <li key={idx}>{item}</li>)}
                        </ul>
                      </div>
                      <div>
                        <h3>What we look for</h3>
                        <ul>
                          {r.need.map((item, idx) => <li key={idx}>{item}</li>)}
                        </ul>
                      </div>
                      <div className="apply">
                        <button
                          type="button"
                          className="btn"
                          onClick={() => setSelectedRoleForApply({ title: r.t, onHold: false })}
                        >
                          Apply for this role
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec panel">
        <div className="wrap">
          <h2 className="h2 narrow">How we hire</h2>
          <div dangerouslySetInnerHTML={{ __html: stepsHTML(hire) }} />
        </div>
      </section>

      <section className="sec">
        <div className="wrap" dangerouslySetInnerHTML={{ __html: statsHTML() }} />
      </section>

      <section className="cta soft">
        <div className="wrap">
          <h2>Do not see your role? Tell us what you do best.</h2>
          <div className="row-links">
            <button
              type="button"
              className="btn"
              onClick={() => setSelectedRoleForApply({ title: 'Open Application (General)', onHold: false })}
            >
              Send an open application
            </button>
          </div>
        </div>
      </section>

      {/* Slider Application Drawer */}
      <CareerApplySlider
        isOpen={Boolean(selectedRoleForApply)}
        roleTitle={selectedRoleForApply?.title || ''}
        isHold={Boolean(selectedRoleForApply?.onHold)}
        onClose={() => setSelectedRoleForApply(null)}
      />
    </>
  );
}

