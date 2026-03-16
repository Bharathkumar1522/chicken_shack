"use client";
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SharedEmbers from './SharedEmbers';

gsap.registerPlugin(ScrollTrigger);

const variants = [
  {
    id: '01',
    name: 'FRIED',
    subtitle: 'Classic Crispy',
    description: 'Double-dredged in spiced buttermilk batter, fried to a perfect golden crunch.',
    tags: ['#CRISPY', '#GOLDEN', '#CLASSIC'],
    img: '/chicken-img/chicken-3.webp',
    accent: '#FF5E00',
    accentDim: 'rgba(255, 94, 0, 0.15)',
  },
  {
    id: '02',
    name: 'TANDOOR',
    subtitle: 'Spiced & Smoked',
    description: 'Marinated overnight in saffron yoghurt and smoked over charcoal for 6 hours.',
    tags: ['#SMOKY', '#CHARRED', '#DEEP'],
    img: '/chicken-img/chicken-1.webp',
    accent: '#C8380A',
    accentDim: 'rgba(200, 56, 10, 0.15)',
  },
  {
    id: '03',
    name: 'KOREAN',
    subtitle: 'Sweet Heat Glaze',
    description: 'Double-fried with gochujang glaze, finishing in caramelised sesame crunch.',
    tags: ['#GLAZED', '#SPICY', '#UMAMI'],
    img: '/chicken-img/chicken-2.webp',
    accent: '#FF2D55',
    accentDim: 'rgba(255, 45, 85, 0.15)',
  },
];

const VariantCard = ({ v, index }) => {
  const cardRef = useRef();
  const isEven = index % 2 === 0;

  useGSAP(() => {
    const img     = cardRef.current.querySelector('.vc-img');
    const textEls = cardRef.current.querySelectorAll('.vc-text-el');
    const tags    = cardRef.current.querySelectorAll('.vc-tag');

    // Pre-hide ALL animated elements instantly so nothing flashes
    gsap.set(img,     { scale: 0.75, opacity: 0, y: 50 });
    gsap.set(textEls, { x: isEven ? 60 : -60, opacity: 0 });
    gsap.set(tags,    { scale: 0.5, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 72%',
        once: true,
      },
    });

    tl.to(img, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
      })
      .to(textEls, {
        x: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
      }, '-=0.7')  // overlap with image entrance
      .to(tags, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.07,
        ease: 'back.out(2)',
      }, '-=0.3');
  }, { scope: cardRef });


  const textSide = (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 3vw' }}>
      {/* Subtitle */}
      <p className="vc-text-el" style={{ fontSize: '0.8rem', letterSpacing: '0.3em', color: v.accent, textTransform: 'uppercase', marginBottom: '1rem', fontFamily: 'var(--font-body)' }}>
        {v.subtitle}
      </p>

      {/* Big name */}
      <h2 className="vc-text-el" style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'clamp(2.5rem, 7vw, 7rem)',  // Clamped smaller to prevent overflow
        lineHeight: 0.9,
        margin: 0,
        color: '#fff',
        textTransform: 'uppercase',
      }}>
        {v.name}
      </h2>

      {/* Divider */}
      <div className="vc-text-el" style={{ width: '60px', height: '3px', background: v.accent, margin: '2rem 0', borderRadius: '2px' }} />

      {/* Description */}
      <p className="vc-text-el" style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '380px', lineHeight: 1.7 }}>
        {v.description}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '2rem' }}>
        {v.tags.map((tag) => (
          <span
            key={tag}
            className="vc-tag"
            style={{
              padding: '0.4rem 1rem',
              border: `1px solid ${v.accent}`,
              color: v.accent,
              borderRadius: '999px',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA */}
      <button
        className="vc-text-el btn-primary"
        style={{ marginTop: '3rem', alignSelf: 'flex-start', background: v.accent, borderColor: v.accent }}
      >
        Order Now
      </button>
    </div>
  );

  const imgSide = (
    <div data-speed="0.1" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '2rem' }}>
      {/* Glow behind image */}
      <div style={{
        position: 'absolute',
        width: '350px', height: '350px',
        borderRadius: '50%',
        background: v.accentDim,
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />
      <img
        src={v.img}
        alt={v.name}
        className="vc-img"
        style={{
          width: '100%',
          maxWidth: '380px',
          objectFit: 'contain',
          filter: `drop-shadow(0 30px 40px rgba(0,0,0,0.7)) drop-shadow(0 0 30px ${v.accent}44)`,
          position: 'relative',
          zIndex: 1,
          transition: 'transform 0.5s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.06) rotate(-3deg)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1) rotate(0deg)'; }}
      />
    </div>
  );

  return (
    <div
      ref={cardRef}
      className={`vc-card ${isEven ? 'vc-card--even' : 'vc-card--odd'}`}
      style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        minHeight: '90vh',
        padding: '5rem 5vw',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden',
      }}
    >
      {/* Always: text left, image right on desktop */}
      {/* On mobile: re-ordered by CSS to show image first, then text */}
      <div className="vc-text-col" style={{ gridColumn: isEven ? 1 : 2, gridRow: 1 }}>
        {textSide}
      </div>
      <div className="vc-img-col" style={{ gridColumn: isEven ? 2 : 1, gridRow: 1 }}>
        {imgSide}
      </div>
    </div>
  );
};

const PageContent = () => {
  const sectionRef = useRef();

  useGSAP(() => {
    gsap.from('.pc-header-line', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      },
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power4.out',
    });
  }, { scope: sectionRef });

  return (
    <section id="pageContent" ref={sectionRef} style={{ position: 'relative', zIndex: 1, padding: '8rem 0 0', overflow: 'hidden' }}>
      
      {/* 
        Inject the scoped 3D Embers and CSS Glow specifically for this section.
        Wrapped in a parallax layer that moves slightly, creating vast depth behind the cards.
      */}
      <div 
        data-speed="-0.1" 
        style={{ 
          position: 'absolute', top: '-5%', left: 0, width: '100%', height: '110%', zIndex: 0 
        }}
      >
        <SharedEmbers particleCount={120} includeGlow={true} showIngredients={true} />
      </div>

      {/* Section header */}
      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 5vw 4rem', overflow: 'hidden' }}>
        <p className="pc-header-line" style={{ fontSize: '0.8rem', letterSpacing: '0.4em', color: 'var(--accent)', marginBottom: '1rem', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
          Our Signature Styles
        </p>
        <h2 className="pc-header-line title-large text-accent" style={{ margin: 0 }}>CRISPY. JUICY.</h2>
        <h2 className="pc-header-line title-massive" style={{ color: 'transparent', WebkitTextStroke: '2px rgba(255,255,255,0.2)', margin: 0 }}>SMOKEY.</h2>
      </div>

      {/* Scrolling marquee divider */}
      <div style={{ position: 'relative', zIndex: 2, overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '1rem 0', marginBottom: '2rem' }}>
        <div style={{
          display: 'flex',
          gap: '4rem',
          animation: 'marquee-scroll 18s linear infinite',
          whiteSpace: 'nowrap',
          width: 'max-content',
        }}>
          {Array.from({ length: 3 }).flatMap((_, outerIndex) =>
            ['✦ CLASSIC FRIED', '✦ TANDOOR SMOKED', '✦ KOREAN GLAZED', '✦ MADE FRESH DAILY', '✦ SIGNATURE RECIPES'].map((t, i) => (
              <span key={`${outerIndex}-${i}`} style={{ fontSize: '0.75rem', letterSpacing: '0.25em', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', textTransform: 'uppercase' }}>{t}</span>
            ))
          )}
        </div>
      </div>

      {/* Variant showcase rows */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {variants.map((v, i) => (
          <VariantCard key={v.id} v={v} index={i} />
        ))}
      </div>
    </section>
  );
};

export default PageContent;
