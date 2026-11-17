// @ts-nocheck
'use client';

import React, { useState, useEffect } from 'react';
import { SITE, rightsSectionHTML } from '@/lib/advera-data';
import { submitForm } from '@/lib/submit-form';

export default function ContactView() {
  const needs = ['Brand identity', 'UGC content', 'Social media', 'Paid ads', 'Website', 'Something else'];
  const [clock, setClock] = useState('--:--');
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

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
                <input id="f-name" name="name" type="text" autoComplete="name" required placeholder="Jane Doe" />
              </div>
              <div className="field">
                <label htmlFor="f-email">Email address</label>
                <input id="f-email" name="email" type="email" autoComplete="email" required placeholder="jane@company.com" />
              </div>
            </div>

            <div className="field">
              <label htmlFor="f-co">Company or brand name <span className="muted">(optional)</span></label>
              <input id="f-co" name="company" type="text" autoComplete="organization" placeholder="Acme Studio" />
            </div>

            <fieldset className="field">
              <legend>What can we help you build?</legend>
              <div className="checks">
                {needs.map(n => (
                  <label className="check" key={n}>
                    <input type="checkbox" name="need" value={n} />
                    <span>{n}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="field">
              <label htmlFor="f-budget">Rough budget or timeline <span className="muted">(optional)</span></label>
              <input id="f-budget" name="budget" type="text" placeholder="e.g. ₹3-5L / launch in June" />
            </div>

            <div className="field">
              <label htmlFor="f-msg">Tell us about your project</label>
              <textarea id="f-msg" name="message" rows={5} required placeholder="Where is your brand today, and where do you want it to be?"></textarea>
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
