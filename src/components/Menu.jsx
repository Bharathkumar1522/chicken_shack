"use client";
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const menuData = [
  {
    id: '01',
    title: 'TIKKA SLICES',
    subtitle: 'Signature',
    desc: 'Tender chicken breast, charred over fire, finished with mint chutney. Perfectly crisp outside, impossibly juicy inside.',
    img: '/images/tikka.webp',
    accent: '#FF5E00',
  },
  {
    id: '02',
    title: 'CHICKEN 65',
    subtitle: 'Street Classic',
    desc: 'Our desi street-style Chicken 65, fried to perfection for full-spectrum crunch and deep Southern flavour in every piece.',
    img: '/images/chicken65.webp',
    accent: '#C8380A',
  },
  {
    id: '03',
    title: 'CHICKEN KEBAB',
    subtitle: 'Chef Special',
    desc: 'Grilled over open flame for a smoky depth. Garnished with fresh mint and served with our signature dipping sauce.',
    img: '/images/kabab.webp',
    accent: '#FF2D55',
  },
];

const Menu = () => {
  const containerRef = useRef();

  useGSAP(() => {
    // Header entrance
    gsap.from('.menu-header', {
      scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
    });

    const cards = gsap.utils.toArray('.menu-card');
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      // Mobile: simple fade-in for each card, no complex pinning
      cards.forEach((card) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 88%' },
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
        });
      });
      return;
    }

    // Desktop: cinematic stacking animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${cards.length * 100}%`,
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
      },
    });

    cards.forEach((card, i) => {
      const img = card.querySelector('.card-img');
      const textBlock = card.querySelector('.card-text-content');
      const giantNum = card.querySelector('.giant-num');

      if (i > 0) {
        gsap.set(card, { y: window.innerHeight, scale: 0.92, opacity: 0 });
        gsap.set(img, { yPercent: 25, scale: 1.1 });
        gsap.set(textBlock, { y: 35, opacity: 0 });
        if (giantNum) gsap.set(giantNum, { y: -35, opacity: 0 });

        tl
          .to(card, { y: 0, scale: 1, opacity: 1, ease: 'power3.out', duration: 1.5 }, '+=0.05')
          .to(img, { yPercent: 0, scale: 1, ease: 'power2.out', duration: 1.5 }, '<')
          .to(textBlock, { y: 0, opacity: 1, ease: 'power2.out', duration: 1.2 }, '<+=0.15');

        if (giantNum) {
          tl.to(giantNum, { y: 0, opacity: 1, ease: 'power2.out', duration: 1.2 }, '<');
        }

        // Previous card fades back
        tl.to(cards[i - 1], {
          scale: 0.88,
          opacity: 0.15,
          y: -50,
          ease: 'power2.inOut',
          duration: 1.5,
        }, '<');
      } else {
        // First card entrance animations
        gsap.from(img, {
          scrollTrigger: { trigger: containerRef.current, start: 'top 65%' },
          yPercent: 12, opacity: 0, duration: 1, ease: 'power3.out',
        });
        gsap.from(textBlock, {
          scrollTrigger: { trigger: containerRef.current, start: 'top 65%' },
          x: -35, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.2,
        });
        if (giantNum) {
          gsap.from(giantNum, {
            scrollTrigger: { trigger: containerRef.current, start: 'top 65%' },
            y: 35, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.1,
          });
        }
      }
    });
  }, { scope: containerRef });

  return (
    <section
      id="menuSec"
      ref={containerRef}
      className="menu-section"
      style={{
        height: '100vh',
        width: '100vw',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Fixed background header */}
      <div className="menu-header" style={{ position: 'absolute', top: '5vh', left: '5vw', zIndex: 0 }}>
        <p style={{ fontSize: '0.8rem', letterSpacing: '0.4em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '0.5rem', fontFamily: 'var(--font-body)' }}>
          The Collection
        </p>
        <h2 style={{ margin: 0, lineHeight: 0.85, fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(3rem, 7vw, 7rem)', color: 'rgba(255,255,255,0.04)', letterSpacing: '-0.02em' }}>
          FAVOURITES
        </h2>
      </div>

      {/* Cards wrapper */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        maxWidth: '1600px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {menuData.map((item, index) => (
          <div
            key={item.id}
            className="menu-card glass-panel"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90vw',
              height: '72vh',
              maxWidth: '1200px',
              borderRadius: '2.5rem',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '4vw 6vw',
              border: '1px solid rgba(255,255,255,0.08)',
              background: `linear-gradient(135deg, rgba(18,18,18,0.9) 0%, rgba(8,8,8,0.97) 100%)`,
              backdropFilter: 'blur(20px)',
              boxShadow: '0 40px 80px rgba(0,0,0,0.8)',
              overflow: 'hidden',
              zIndex: index + 1,
            }}
          >
            {/* Giant decorative background number */}
            <span
              className="giant-num"
              style={{
                position: 'absolute',
                top: '-5%',
                right: '3%',
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(8rem, 18vw, 18rem)',
                color: 'transparent',
                WebkitTextStroke: `1px ${item.accent}22`,
                pointerEvents: 'none',
                lineHeight: 1,
                userSelect: 'none',
                zIndex: 0,
              }}
            >
              {item.id}
            </span>

            {/* Left — Text */}
            <div
              className="card-text-content"
              style={{ flex: '0 0 45%', zIndex: 2 }}
            >
              <div style={{
                display: 'inline-block',
                padding: '0.35rem 1.1rem',
                border: `1px solid ${item.accent}`,
                color: item.accent,
                borderRadius: '999px',
                fontSize: '0.7rem',
                letterSpacing: '0.25em',
                fontWeight: 700,
                marginBottom: '1.5rem',
                textTransform: 'uppercase',
              }}>
                {item.subtitle}
              </div>

              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.5rem, 5vw, 5.5rem)',
                lineHeight: 0.9,
                marginBottom: '1.2rem',
                color: '#FFF',
                fontWeight: 900,
              }}>
                {item.title}
              </h3>

              <p style={{
                fontSize: 'clamp(0.9rem, 1.1vw, 1.1rem)',
                color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.7,
                marginBottom: '2.5rem',
                maxWidth: '420px',
              }}>
                {item.desc}
              </p>

              <button
                className="btn-primary"
                style={{ background: item.accent, borderColor: item.accent, fontSize: '0.9rem' }}
              >
                Taste The Crunch
              </button>
            </div>

            {/* Right — Image */}
            <div style={{
              flex: '0 0 50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              zIndex: 2,
              height: '100%',
            }}>
              {/* Glow behind image */}
              <div style={{
                position: 'absolute',
                width: '50%', height: '50%',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                background: item.accent,
                opacity: 0.25,
                filter: 'blur(70px)',
                borderRadius: '50%',
                zIndex: 0,
              }} />
              <img
                src={item.img}
                alt={item.title}
                className="card-img"
                loading="lazy"
                style={{
                  width: '100%',
                  maxWidth: '500px',
                  maxHeight: '65vh',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 30px 30px rgba(0,0,0,0.7))',
                  position: 'relative',
                  zIndex: 1,
                  transition: 'transform 0.4s ease-out',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05) rotate(2deg)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1) rotate(0deg)'; }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Menu;