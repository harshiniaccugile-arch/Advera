// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { SITE, SERVICES } from '@/lib/advera-data';

const NAV = [
  ['Home', '/'],
  ['Services', '/services'],
  ['Works', '/works'],
  ['About', '/about'],
  ['Careers', '/careers'],
  ['Contact', '/contact']
];

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent('Subscribe: The Advera Brief')}&body=${encodeURIComponent('Please add ' + email + ' to The Advera Brief.')}`;
    }
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="ftr" id="ftr">
      <div className="wrap">
        <p className="ftr-tag">Brands people remember. Content people believe.</p>
        <div className="ftr-news">
          <div>
            <h4>The Advera Brief</h4>
            <p>A short, occasional email on brand and UGC work we're proud of. No spam, unsubscribe any time.</p>
          </div>
          <form id="news-form" onSubmit={handleSubscribe}>
            <input 
              type="email" 
              placeholder="you@company.com" 
              aria-label="Email address" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="btn btn--sm" type="submit">Subscribe</button>
          </form>
        </div>
        <div className="ftr-grid">
          <div>
            <h4>Pages</h4>
            <ul>
              {NAV.map(n => (
                <li key={n[1]}><a href={n[1]}>{n[0]}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              {SERVICES.map(s => (
                <li key={s.id}><a href={`/services#svc-${s.id}`}>{s.name}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li><a href={`tel:${SITE.phone.replace(/[^+\d]/g, '')}`}>{SITE.phone}</a></li>
              <li>{SITE.address.join(', ')}</li>
            </ul>
          </div>
          <div>
            <h4>Follow</h4>
            <ul>
              {SITE.social.map(s => (
                <li key={s[0]}><a href={s[1]} target="_blank" rel="noopener">{s[0]}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="ftr-legal">
          <span>&copy; 2026 {SITE.name}. All rights reserved.</span>
          <div className="ftr-legal-links" style={{ display: 'inline-flex', gap: '16px' }}>
            <a href="/policies/privacy-policy">Privacy Policy</a>
            <a href="/policies/terms-and-conditions">Terms &amp; Conditions</a>
            <a href="/policies/cookies-policy">Cookies Policy</a>
          </div>
          <a href="#top" onClick={scrollToTop}>Back to top</a>
        </div>
      </div>
    </footer>
  );
}
