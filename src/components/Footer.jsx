"use client";
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SocialLink = ({ href, label, children }) => {
  const ref = useRef();
  return (
    <a
      ref={ref}
      href={href}
      aria-label={label}
      style={{
        width: '42px', height: '42px', borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.85rem',
        transition: 'all 0.35s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'var(--accent)';
        e.currentTarget.style.borderColor = 'var(--accent)';
        e.currentTarget.style.color = '#000';
        e.currentTarget.style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
        e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {children}
    </a>
  );
};

const NavLink = ({ href, children }) => (
  <a
    href={href}
    style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none', fontSize: '0.85rem', lineHeight: 2, transition: 'color 0.3s ease' }}
    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
  >
    {children}
  </a>
);

const Footer = () => {
  const containerRef = useRef();

  useGSAP(() => {
    // Big title reveal
    gsap.from('.footer-headline span', {
      scrollTrigger: { trigger: containerRef.current, start: 'top 85%' },
      yPercent: 110,
      stagger: 0.1,
      duration: 1.4,
      ease: 'power4.out',
    });

    // Grid cols fade
    gsap.from('.footer-col', {
      scrollTrigger: { trigger: '.footer-grid', start: 'top 85%' },
      y: 30,
      opacity: 0,
      stagger: 0.12,
      duration: 1,
      ease: 'power3.out',
    });

    // Divider draw
    gsap.from('.footer-divider', {
      scrollTrigger: { trigger: '.footer-divider', start: 'top 90%' },
      scaleX: 0,
      transformOrigin: 'left',
      duration: 1.4,
      ease: 'expo.out',
    });
  }, { scope: containerRef });

  return (
    <footer
      id="footerSec"
      ref={containerRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#050505',
        zIndex: 1,
      }}
    >
      {/* ── Big CTA statement ── */}
      <div style={{
        padding: '10rem 5vw 6rem',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        position: 'relative',
      }}>
        {/* Orange ambient glow */}
        <div style={{
          position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          width: '60%', height: '300px',
          background: 'radial-gradient(ellipse at bottom, rgba(255,60,0,0.12), transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.5em', color: 'var(--accent)', textTransform: 'uppercase', fontFamily: 'var(--font-body)', marginBottom: '2rem' }}>
            Your next craving awaits
          </p>

          <div className="footer-headline" style={{ overflow: 'hidden', marginBottom: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0 0.2em' }}>
              {['STAY', 'HUNGRY.'].map((word, i) => (
                <div key={i} style={{ overflow: 'hidden' }}>
                  <span style={{
                    display: 'block',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 900,
                    fontSize: 'clamp(4rem, 13vw, 13rem)',
                    lineHeight: 0.88,
                    letterSpacing: '-0.03em',
                    color: i === 0 ? 'var(--accent)' : '#fff',
                  }}>
                    {word}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <a
            href="#menuSec"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.8rem',
              padding: '1.1rem 3rem', borderRadius: '50px',
              background: 'var(--accent)', color: '#000',
              fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.2em',
              textTransform: 'uppercase', textDecoration: 'none',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(255,80,0,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            Order Now →
          </a>
        </div>
      </div>

      {/* ── Grid ── */}
      <div
        className="footer-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '3rem',
          padding: '6rem 5vw',
        }}
      >
        {/* Brand column */}
        <div className="footer-col" style={{ gridColumn: 'span 1' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 900, letterSpacing: '3px', color: 'var(--accent)', marginBottom: '1rem' }}>SHACK.</div>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.4)', maxWidth: '220px' }}>
            Artisanal fried chicken rooted in Southern fire and London craft — Tirupathi's boldest dining experience.
          </p>
          <div style={{ display: 'flex', gap: '0.8rem', marginTop: '2rem' }}>
            <SocialLink href="#" label="Facebook">f</SocialLink>
            <SocialLink href="#" label="Twitter">𝕏</SocialLink>
            <SocialLink href="#" label="Instagram">ig</SocialLink>
            <SocialLink href="#" label="TikTok">tt</SocialLink>
          </div>
        </div>

        {/* Explore */}
        <div className="footer-col">
          <h5 style={{ color: '#fff', fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Explore</h5>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {['Home', 'Our Menu', 'Meet the Chef', 'Our Story', 'Interior'].map(l => (
              <NavLink key={l} href="#">{l}</NavLink>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h5 style={{ color: '#fff', fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Visit Us</h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', margin: 0 }}>12 Spice Lane, Tirupathi</p>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', margin: 0 }}>Andhra Pradesh 517501</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--accent)', marginTop: '0.8rem', margin: '0.8rem 0 0' }}>+91 98765 43210</p>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', margin: 0 }}>hello@shackchicken.in</p>
          </div>
        </div>

        {/* Hours */}
        <div className="footer-col">
          <h5 style={{ color: '#fff', fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Hours</h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {[['Mon – Thu', '11am – 10pm'], ['Fri – Sat', '11am – 12am'], ['Sunday', '12pm – 9pm']].map(([day, time]) => (
              <div key={day} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)' }}>{day}</span>
                <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)' }}>{time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ padding: '0 5vw 3rem', position: 'relative' }}>
        <div className="footer-divider" style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '2rem' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)', margin: 0 }}>
            © 2026 SHACK. All rights reserved.
          </p>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.2)', margin: 0 }}>
            Engineered by Bharath · Built with Next.js + GSAP
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
