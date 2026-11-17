import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Page Not Found (404) | Advera Branding',
  description: 'The page you are looking for does not exist or has been moved.',
};

export default function NotFound() {
  const quickLinks = [
    { label: 'Featured Works', href: '/works', desc: 'Case studies & brand transformations' },
    { label: 'Capabilities', href: '/services', desc: 'Identities, UGC campaigns & websites' },
    { label: 'About Advera', href: '/about', desc: 'Our approach, creators & manifesto' },
    { label: 'Get in Touch', href: '/contact', desc: 'Let’s discuss your upcoming project' },
  ];

  return (
    <>
      <a className="skip" href="#app">Skip to content</a>
      <Header />
      <main id="app" className="not-found-main">
        <section className="not-found-section">
          <div className="wrap">
            <div className="not-found-2col">
              {/* Left Column: Advera Brand SVG Logo & Emblem Art */}
              <div className="not-found-left">
                <div className="not-found-logo-container">
                  <div className="not-found-glow-circle" />

                  {/* Advera Official Brand Emblem */}
                  <div className="not-found-logo-wrapper">
                    <svg
                      viewBox="0 0 512 512"
                      className="not-found-brand-svg"
                      aria-label="Advera Brands Logo"
                      role="img"
                    >
                      <defs>
                        <linearGradient id="nf-grad" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#FF6A3D" />
                          <stop offset="100%" stopColor="#FF3E85" />
                        </linearGradient>
                      </defs>
                      <rect width="512" height="512" rx="108" fill="var(--surface)" stroke="var(--line)" strokeWidth="8" />
                      <g transform="translate(256, 256)">
                        <g transform="translate(-160, -160) scale(13.333)">
                          <path d="M0 24A24 24 0 0 1 24 0V24Z" fill="var(--fg)" />
                          <circle cx="4.6" cy="4.6" r="3.2" fill="url(#nf-grad)" />
                        </g>
                      </g>
                    </svg>

                    {/* Stylized Floating 404 Badge */}
                    <div className="not-found-floating-badge">
                      <span className="not-found-badge-dot" />
                      <span>404</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Text Information & Navigation */}
              <div className="not-found-right">
                <div className="not-found-tag">
                  <span className="not-found-dot" />
                  <span>Error 404 • Lost in Space</span>
                </div>

                <h1 className="not-found-heading">
                  This page drifted out of the frame.
                </h1>

                <p className="not-found-sub">
                  The link you followed might be outdated, mistyped, or the page has been moved into the archives. Let’s get you back on track.
                </p>

                {/* Call to Actions */}
                <div className="not-found-actions">
                  <Link href="/" className="btn btn-primary-home">
                    <span>Return to Homepage</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </Link>
                  <Link href="/contact" className="btn btn-contact-alt">
                    <span>Talk to us</span>
                  </Link>
                </div>


              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
