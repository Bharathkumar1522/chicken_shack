"use client";
import React, { useRef, useState, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { Menu as MenuIcon, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home',     href: '#heroSec' },
  { label: 'Menu',     href: '#menuSec' },
  { label: 'Chef',     href: '#chefSec' },
  { label: 'Interior', href: '#interiorSec' },
];

const Navbar = () => {
  const navRef    = useRef();
  const drawerRef = useRef();
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* ── Scroll shadow ── */
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Entrance animation ── */
  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      delay: 0.5,
    });
  });

  /* ── Drawer open/close ── */
  const openDrawer = useCallback(() => {
    setOpen(true);
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      if (!drawerRef.current) return;
      gsap.fromTo(drawerRef.current,
        { x: '100%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.5, ease: 'power3.out' }
      );
      gsap.from(drawerRef.current.querySelectorAll('.drawer-link'),
        { x: 40, opacity: 0, stagger: 0.08, duration: 0.5, delay: 0.15, ease: 'power3.out' }
      );
    });
  }, []);

  const closeDrawer = useCallback(() => {
    if (!drawerRef.current) return;
    gsap.to(drawerRef.current, {
      x: '100%',
      opacity: 0,
      duration: 0.4,
      ease: 'power3.in',
      onComplete: () => {
        setOpen(false);
        document.body.style.overflow = '';
      },
    });
  }, []);

  const handleLinkClick = useCallback(() => {
    closeDrawer();
  }, [closeDrawer]);

  return (
    <>
      {/* ─── Pill Navbar ─── */}
      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          top: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'auto',
          maxWidth: 'calc(100vw - 32px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0.7rem 1.6rem',
          borderRadius: '50px',
          zIndex: 1000,
          gap: '2.5rem',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: scrolled ? '0 20px 50px rgba(0,0,0,0.7)' : '0 8px 30px rgba(0,0,0,0.4)',
          backdropFilter: 'blur(24px)',
          background: scrolled ? 'rgba(10,10,10,0.85)' : 'rgba(20,20,20,0.4)',
          transition: 'background 0.4s ease, box-shadow 0.4s ease',
          whiteSpace: 'nowrap',
        }}
      >
        {/* Logo */}
        <a
          href="#heroSec"
          style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 900, letterSpacing: '4px', color: 'var(--accent)', textDecoration: 'none' }}
        >
          SHACK.
        </a>

        {/* Desktop links – hidden on mobile via CSS class */}
        <ul className="nav-desktop-links" style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}>
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                style={{
                  color: 'rgba(255,255,255,0.75)',
                  textDecoration: 'none',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.75)'}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          onClick={open ? closeDrawer : openDrawer}
          aria-label="Toggle Navigation"
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.85)',
            cursor: 'pointer',
            display: 'flex',
            padding: '4px',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.85)'}
        >
          {open ? <X size={18} strokeWidth={2.5} /> : <MenuIcon size={18} strokeWidth={2.5} />}
        </button>
      </nav>

      {/* ─── Mobile / Full-screen Drawer ─── */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            onClick={closeDrawer}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(6px)',
              zIndex: 998,
            }}
          />

          {/* Drawer panel */}
          <div
            ref={drawerRef}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: 'min(360px, 100vw)',
              height: '100vh',
              background: '#080808',
              borderLeft: '1px solid rgba(255,255,255,0.07)',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              padding: '6rem 3rem 3rem',
              transform: 'translateX(100%)',
            }}
          >
            {/* Close btn inside drawer */}
            <button
              onClick={closeDrawer}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              <X size={16} />
            </button>

            {/* Logo in drawer */}
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 900, letterSpacing: '4px', color: 'var(--accent)', marginBottom: '3rem' }}>
              SHACK.
            </div>

            {/* Drawer nav links */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="drawer-link"
                  onClick={handleLinkClick}
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 900,
                    fontSize: 'clamp(2rem, 8vw, 2.8rem)',
                    color: 'rgba(255,255,255,0.85)',
                    textDecoration: 'none',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    padding: '0.4rem 0',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    transition: 'color 0.25s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.85)'}
                >
                  {label}
                </a>
              ))}
            </nav>

            {/* Footer inside drawer */}
            <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '2rem' }}>
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Spice Lane, Tirupathi
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--accent)', marginTop: '0.4rem' }}>
                +91 98765 43210
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
