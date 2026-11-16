// @ts-nocheck
'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { SITE, SERVICES, C, emblem, logoMark } from '@/lib/advera-data';

export default function Header({ isDark = false }: { isDark?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsMegaOpen(false);
    document.body.classList.remove('lock');
  }, [pathname]);

  const toggleMenu = (open: boolean) => {
    setIsMenuOpen(open);
    if (open) {
      document.body.classList.add('lock');
    } else {
      document.body.classList.remove('lock');
    }
  };

  const currentNav = pathname === '/' ? '' : pathname.replace(/^\//, '').split('/')[0];

  return (
    <>
      <header className={`hdr ${isScrolled ? 'scrolled' : ''} ${isDark ? 'on-dark' : ''}`} id="hdr">
        <div className="wrap hdr-in">
          <a className="logo" href="/" aria-label={`${SITE.name}, home`}>
            <span dangerouslySetInnerHTML={{ __html: logoMark }} />
            <span>Advera<i>Branding</i></span>
          </a>

          <nav className="nav" aria-label="Main">
            <a
              href="/"
              data-nav=""
              aria-current={currentNav === '' ? 'page' : undefined}
            >
              Home
            </a>

            <div
              className={`nav-item ${isMegaOpen ? 'open' : ''}`}
              id="nav-services"
              onMouseEnter={() => setIsMegaOpen(true)}
              onMouseLeave={() => setIsMegaOpen(false)}
            >
              <a
                href="/services"
                data-nav="services"
                aria-haspopup="true"
                aria-expanded={isMegaOpen}
                aria-current={currentNav === 'services' ? 'page' : undefined}
                onClick={(e) => {
                  if (window.matchMedia('(hover: none)').matches) {
                    e.preventDefault();
                    setIsMegaOpen(!isMegaOpen);
                  }
                }}
              >
                Services
              </a>
              <div className="mega" role="menu">
                <div className="mega-in">
                  <div className="mega-col">
                    <h4>Full-service branding</h4>
                    {SERVICES.map(s => (
                      <a key={s.id} href={`/services#svc-${s.id}`} role="menuitem">
                        <b>{s.name}</b>
                        <span>{s.short.split('.')[0]}.</span>
                      </a>
                    ))}
                  </div>

                  <div className="mega-col">
                    <h4>How we help</h4>
                    <a href="/about" role="menuitem">
                      <b>Why Advera</b>
                      <span>Strategy before style, one team throughout.</span>
                    </a>
                    <a href="/works" role="menuitem">
                      <b>Our work</b>
                      <span>Brand, UGC and web projects.</span>
                    </a>
                    <a href="/careers" role="menuitem">
                      <b>Careers</b>
                      <span>Open roles on a small, direct team.</span>
                    </a>
                    <a href="/contact" role="menuitem">
                      <b>Get a quote</b>
                      <span>Tell us about your project.</span>
                    </a>
                  </div>

                  <div className="mega-promo">
                    <span dangerouslySetInnerHTML={{ __html: emblem(['ring', C.accent, C.brand, 0]) }} />
                    <b>How we brief a creator</b>
                    <span>What goes into a UGC brief, from hook to usage rights.</span>
                    <a href="/services#svc-ugc">See the UGC process &rarr;</a>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="/works"
              data-nav="works"
              aria-current={currentNav === 'works' ? 'page' : undefined}
            >
              Works
            </a>
            <a
              href="/about"
              data-nav="about"
              aria-current={currentNav === 'about' ? 'page' : undefined}
            >
              About
            </a>
            <a
              href="/careers"
              data-nav="careers"
              aria-current={currentNav === 'careers' ? 'page' : undefined}
            >
              Careers
            </a>
            <a
              href="/contact"
              data-nav="contact"
              aria-current={currentNav === 'contact' ? 'page' : undefined}
            >
              Contact
            </a>
          </nav>

          <div className="hdr-act">
            <a className="btn btn--sm hdr-cta" href="/contact">Book a call</a>
            <button
              className="menu-btn"
              id="menu-btn"
              aria-expanded={isMenuOpen}
              aria-controls="menu"
              onClick={() => toggleMenu(true)}
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`menu panel ${isMenuOpen ? 'open' : ''}`}
        id="menu"
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen ? '' : undefined}
      >
        <div className="menu-top">
          <a className="logo" href="/" aria-label={`${SITE.name}, home`}>
            <span dangerouslySetInnerHTML={{ __html: logoMark }} />
            <span>Advera<i>Branding</i></span>
          </a>
          <button className="menu-close" id="menu-close" onClick={() => toggleMenu(false)}>Close</button>
        </div>
        <nav className="menu-nav" aria-label="Mobile">
          <a href="/" data-nav="" aria-current={currentNav === '' ? 'page' : undefined} onClick={() => toggleMenu(false)}>Home</a>
          <a href="/services" data-nav="services" aria-current={currentNav === 'services' ? 'page' : undefined} onClick={() => toggleMenu(false)}>Services</a>
          <div className="mobile-sub">
            {SERVICES.map(s => (
              <a key={s.id} href={`/services#svc-${s.id}`} onClick={() => toggleMenu(false)}>{s.name}</a>
            ))}
          </div>
          <a href="/works" data-nav="works" aria-current={currentNav === 'works' ? 'page' : undefined} onClick={() => toggleMenu(false)}>Works</a>
          <a href="/about" data-nav="about" aria-current={currentNav === 'about' ? 'page' : undefined} onClick={() => toggleMenu(false)}>About</a>
          <a href="/careers" data-nav="careers" aria-current={currentNav === 'careers' ? 'page' : undefined} onClick={() => toggleMenu(false)}>Careers</a>
          <a href="/contact" data-nav="contact" aria-current={currentNav === 'contact' ? 'page' : undefined} onClick={() => toggleMenu(false)}>Contact</a>
        </nav>
        <div className="menu-foot">
          <span>{SITE.email}</span>
          <span>{SITE.address.join(', ')}</span>
        </div>
      </div>
    </>
  );
}
