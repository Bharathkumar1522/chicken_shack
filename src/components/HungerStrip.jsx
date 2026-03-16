"use client";
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DISHES = [
  { src: '/chicken-img/chicken-1.webp', label: 'Crispy Original', tag: '#1 Bestseller', note: 'Golden battered perfection' },
  { src: '/chicken-img/chicken-2.webp', label: 'Smokey BBQ', tag: 'Chef Pick', note: 'Slow-smoked, bold glaze' },
  { src: '/chicken-img/chicken-3.webp', label: 'Spiced Tikka', tag: 'South Special', note: 'Marinated 24 hrs' },
  { src: '/images/kabab.webp',           label: 'Seekh Kabab',  tag: 'New Drop', note: 'Fire-grilled street style' },
  { src: '/images/tikka.webp',           label: 'Chicken 65',   tag: 'Must Try', note: 'Classic Southern crunch' },
];

const HungerStrip = () => {
  const containerRef = useRef();

  useGSAP(() => {
    // Title reveal
    gsap.from('.hs-title-word', {
      scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
      yPercent: 110,
      opacity: 0,
      stagger: 0.1,
      duration: 1.2,
      ease: 'power4.out',
    });

    // Cards stagger
    gsap.from('.hs-card', {
      scrollTrigger: { trigger: '.hs-grid', start: 'top 80%' },
      y: 60,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: 'power3.out',
    });

    // Parallax on each card image
    gsap.utils.toArray('.hs-card-img').forEach((img) => {
      gsap.fromTo(img,
        { y: '8%' },
        {
          y: '-8%',
          ease: 'none',
          scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden',
        background: '#080808',
        padding: '10rem 5vw',
      }}
    >
      {/* Background accent glow */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)',
        width: '60vw', height: '40vh',
        background: 'radial-gradient(ellipse, rgba(255,60,0,0.08), transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Title */}
      <div className="container" style={{ position: 'relative', zIndex: 2, marginBottom: '5rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.72rem', letterSpacing: '0.5em', color: 'var(--accent)', textTransform: 'uppercase', fontFamily: 'var(--font-body)', marginBottom: '1.5rem' }}>
          Everything on the Menu
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', overflow: 'hidden', gap: '0 0.25em' }}>
          {['WHAT\'S', 'MAKING', 'YOU', 'HUNGRY?'].map((w, i) => (
            <div key={i} style={{ overflow: 'hidden' }}>
              <span
                className="hs-title-word"
                style={{
                  display: 'block',
                  fontSize: 'clamp(2.5rem, 7vw, 6.5rem)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 900,
                  lineHeight: 0.9,
                  letterSpacing: '-0.02em',
                  color: i === 3 ? 'var(--accent)' : '#fff',
                  paddingRight: '0.2em',
                }}
              >
                {w}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Cards grid */}
      <div
        className="hs-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1.5rem',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {DISHES.map(({ src, label, tag, note }, i) => (
          <div
            key={i}
            className="hs-card"
            style={{
              position: 'relative',
              borderRadius: '1.2rem',
              overflow: 'hidden',
              background: '#111',
              border: '1px solid rgba(255,255,255,0.06)',
              cursor: 'pointer',
              // Slight scale-up on hover handled inline
            }}
            onMouseEnter={e => {
              e.currentTarget.querySelector('.hs-card-overlay').style.opacity = '1';
              e.currentTarget.querySelector('.hs-card-img').style.transform = 'scale(1.08)';
            }}
            onMouseLeave={e => {
              e.currentTarget.querySelector('.hs-card-overlay').style.opacity = '0';
              e.currentTarget.querySelector('.hs-card-img').style.transform = 'scale(1)';
            }}
          >
            {/* Tag badge */}
            <div style={{
              position: 'absolute', top: '1rem', left: '1rem', zIndex: 3,
              background: 'var(--accent)', color: '#000',
              fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.1em',
              textTransform: 'uppercase', padding: '0.3rem 0.8rem', borderRadius: '50px',
            }}>
              {tag}
            </div>

            {/* Image */}
            <div style={{ height: '260px', overflow: 'hidden' }}>
              <img
                src={src}
                alt={label}
                className="hs-card-img"
                style={{
                  width: '100%', height: '120%',
                  objectFit: 'cover', objectPosition: 'center',
                  transition: 'transform 0.6s cubic-bezier(0.33,1,0.68,1)',
                }}
              />
            </div>

            {/* Info */}
            <div style={{ padding: '1.2rem 1.5rem 1.5rem' }}>
              <h4 style={{
                fontFamily: 'var(--font-heading)', fontWeight: 800,
                fontSize: '1.15rem', color: '#fff', margin: '0 0 0.3rem',
              }}>
                {label}
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', margin: 0 }}>{note}</p>
            </div>

            {/* Hover overlay */}
            <div
              className="hs-card-overlay"
              style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(255,55,0,0.5), transparent)',
                opacity: 0, transition: 'opacity 0.4s ease',
                pointerEvents: 'none', zIndex: 2,
              }}
            />
          </div>
        ))}
      </div>

      {/* Full-bleed atmosphere image */}
      <div style={{
        marginTop: '6rem',
        borderRadius: '1.5rem',
        overflow: 'hidden',
        position: 'relative',
        height: '55vh',
        zIndex: 2,
      }}>
        <img
          src="/chicken-img/footerimage.jpg"
          alt="Shack atmosphere"
          style={{ width: '100%', height: '130%', objectFit: 'cover', objectPosition: 'center 30%' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.75) 30%, transparent)',
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '5%',
          transform: 'translateY(-50%)',
        }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.4em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '1rem' }}>Dine In, Tirupathi</p>
          <h3 style={{
            fontFamily: 'var(--font-heading)', fontWeight: 900,
            fontSize: 'clamp(2rem, 5vw, 4rem)', color: '#fff',
            lineHeight: 1.05, margin: 0,
          }}>
            The Finest <br/>Atmosphere <br/>in the City.
          </h3>
          <a href="#interiorSec" style={{
            display: 'inline-block', marginTop: '2rem',
            padding: '0.9rem 2.5rem', borderRadius: '50px',
            background: 'var(--accent)', color: '#000',
            fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.15em',
            textTransform: 'uppercase', textDecoration: 'none',
          }}>
            See Inside
          </a>
        </div>
      </div>
    </section>
  );
};

export default HungerStrip;
