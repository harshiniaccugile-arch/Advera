// @ts-nocheck
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SITE, rightsSectionHTML } from '@/lib/advera-data';
import { submitForm } from '@/lib/submit-form';

export default function ContactView() {
  const needs = ['Brand identity', 'UGC content', 'Social media', 'Paid ads', 'Website', 'Something else'];
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [clock, setClock] = useState('--:--');
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const toggleNeed = (n: string) => {
    setSelectedNeeds(prev =>
      prev.includes(n) ? prev.filter(item => item !== n) : [...prev, n]
    );
  };

  const removeNeed = (n: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedNeeds(prev => prev.filter(item => item !== n));
  };

  useEffect(() => {
    try {
      const clockFmt = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: SITE.timeZone
      });
      const update = () => setClock(clockFmt.format(new Date()));
      update();
      const interval = setInterval(update, 15000);
      return () => clearInterval(interval);
    } catch (_) { }
  }, []);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.select();
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (_) {
      window.location.href = `mailto:${SITE.email}`;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setSending(true);
    setStatusMsg(null);
    const result = await submitForm('/api/contact', form);
    setSending(false);

    if (result.ok) {
      form.reset();
      setSelectedNeeds([]);
      setStatusMsg({
        type: 'ok',
        text: 'Thank you! Your enquiry has been sent. We will get back to you soon.'
      });
    } else {
      setStatusMsg({
        type: 'err',
        text: result.error || `Something went wrong. Please email us at ${SITE.email}.`
      });
    }
  };

  return (
    <>
      <section className="phero panel">
        <div className="wrap contact-grid">
          <div>
            <h1 className="h1" style={{ fontSize: 'clamp(2.6rem,6.4vw,6rem)' }}>
              Let us talk about your project.
            </h1>
            <dl className="c-list">
              <div>
                <dt>Email</dt>
                <dd>
                  <button
                    className="copy"
                    type="button"
                    onClick={copyEmail}
                    style={{ marginTop: '6px' }}
                    aria-label={`Copy email address ${SITE.email}`}
                  >
                    <span>{SITE.email}</span>
                    <em aria-live="polite">{copied ? 'Copied' : 'Copy'}</em>
                  </button>
                </dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href={`tel:${SITE.phone.replace(/[^+\d]/g, '')}`}>{SITE.phone}</a>
                </dd>
              </div>
              <div>
                <dt>Studio</dt>
                <dd>{SITE.address.join(', ')}</dd>
              </div>
              <div>
                <dt>Hours</dt>
                <dd>
                  {SITE.hours}
                  <br />
                  <span className="muted" style={{ fontWeight: 400 }}>
                    Studio time now <span>{clock}</span> {SITE.tzLabel}
                  </span>
                </dd>
              </div>
              <div>
                <dt>Follow</dt>
                <dd>
                  {SITE.social.map((s, idx) => (
                    <span key={s[0]}>
                      {idx > 0 && ', '}
                      <a href={s[1]} target="_blank" rel="noopener">{s[0]}</a>
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>

          <form id="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="two">
              <div className="field">
                <label htmlFor="f-name">Your name</label>
                <input id="f-name" name="name" type="text" autoComplete="name" required placeholder="Jane Doe" onFocus={handleFocus} />
              </div>
              <div className="field">
                <label htmlFor="f-email">Email address</label>
                <input id="f-email" name="email" type="email" autoComplete="email" required placeholder="jane@company.com" onFocus={handleFocus} />
              </div>
            </div>

            <div className="field">
              <label htmlFor="f-co">Company or brand name <span className="muted">(optional)</span></label>
              <input id="f-co" name="company" type="text" autoComplete="organization" placeholder="Acme Studio" onFocus={handleFocus} />
            </div>

            <div className="field">
              <label id="needs-label">What can we help you build? <span className="muted">(select all that apply)</span></label>
              
              {/* Hidden inputs so FormData receives each selected need */}
              {selectedNeeds.map(n => (
                <input key={n} type="hidden" name="need" value={n} />
              ))}

              <div className={`multiselect-dropdown ${dropdownOpen ? 'is-open' : ''}`} ref={dropdownRef}>
                <button
                  type="button"
                  className="multiselect-trigger"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-haspopup="listbox"
                  aria-expanded={dropdownOpen}
                  aria-labelledby="needs-label"
                >
                  <div className="multiselect-value-wrap">
                    {selectedNeeds.length === 0 ? (
                      <span className="multiselect-placeholder">Choose services (e.g. Brand identity, Website...)</span>
                    ) : (
                      selectedNeeds.map(n => (
                        <span key={n} className="multiselect-badge">
                          {n}
                          <span
                            role="button"
                            tabIndex={0}
                            className="multiselect-badge-remove"
                            onClick={(e) => removeNeed(n, e)}
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); removeNeed(n, e as any); } }}
                            aria-label={`Remove ${n}`}
                          >
                            ×
                          </span>
                        </span>
                      ))
                    )}
                  </div>
                  <svg className="multiselect-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="multiselect-menu" role="listbox" aria-multiselectable="true">
                    {needs.map(n => {
                      const isSelected = selectedNeeds.includes(n);
                      return (
                        <div
                          key={n}
                          role="option"
                          aria-selected={isSelected}
                          className={`multiselect-option ${isSelected ? 'is-selected' : ''}`}
                          onClick={() => toggleNeed(n)}
                        >
                          <div className="multiselect-checkbox-box">
                            {isSelected && (
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            )}
                          </div>
                          <span>{n}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="field">
              <label htmlFor="f-budget">Rough budget or timeline <span className="muted">(optional)</span></label>
              <input id="f-budget" name="budget" type="text" placeholder="e.g. ₹3-5L / launch in June" onFocus={handleFocus} />
            </div>

            <div className="field">
              <label htmlFor="f-msg">Tell us about your project</label>
              <textarea id="f-msg" name="message" rows={5} required placeholder="Where is your brand today, and where do you want it to be?" onFocus={handleFocus}></textarea>
            </div>

            <button className="btn" type="submit" disabled={sending} style={{ width: '100%', marginTop: '8px' }}>
              {sending ? 'Sending...' : 'Send enquiry'}
            </button>
            {statusMsg && (
              <p className={`form-status ${statusMsg.type}`} role="status" aria-live="polite">
                {statusMsg.text}
              </p>
            )}
            <p className="privacy">We respect your privacy. No spam, ever, and we will never share your details.</p>
          </form>
        </div>
      </section>

      {/* Guarantees */}
      <div dangerouslySetInnerHTML={{ __html: rightsSectionHTML('Every enquiry, guaranteed', 'sec soft') }} />
    </>
  );
}
