"use client";
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ChefSection = () => {
  const containerRef = useRef();

  useGSAP(() => {
    // Cinematic title reveal — each word clips up from its container
    gsap.from('.chef-title-line', {
      scrollTrigger: { trigger: containerRef.current, start: 'top 75%' },
      yPercent: 110,
      opacity: 0,
      stagger: 0.12,
      duration: 1.4,
      ease: 'power4.out',
    });

    // Fade in the left column details
    gsap.from('.chef-detail-item', {
      scrollTrigger: { trigger: '.chef-bio-col', start: 'top 80%' },
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: 'power3.out',
    });

    // Chef image dramatic entrance from the right
    gsap.from('.chef-image-wrap', {
      scrollTrigger: { trigger: containerRef.current, start: 'top 70%' },
      x: 80,
      opacity: 0,
      duration: 1.6,
      ease: 'power4.out',
    });

    // Accent large number counter (decorative)
    gsap.from('.chef-accent-num', {
      scrollTrigger: { trigger: '.chef-accent-num', start: 'top 85%' },
      opacity: 0,
      x: -30,
      duration: 1,
      ease: 'power3.out',
    });

    // Horizontal rule draw
    gsap.from('.chef-rule', {
      scrollTrigger: { trigger: containerRef.current, start: 'top 60%' },
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 1.2,
      ease: 'expo.out',
    });

    // Stat items count up
    gsap.utils.toArray('.chef-stat-num').forEach(el => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const proxy = { val: 0 };
      gsap.to(proxy, {
        scrollTrigger: { trigger: el, start: 'top 85%' },
        val: target,
        duration: 2.2,
        ease: 'power2.out',
        onUpdate() { el.textContent = Math.round(proxy.val) + suffix; }
      });
    });
  }, { scope: containerRef });

  return (
    <section
      id="chefSec"
      ref={containerRef}
      style={{
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden',
        background: '#0a0a0a',
        padding: '10rem 0 0',
      }}
    >
      {/* ── Faint large background text watermark ── */}
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '-2%',
        fontFamily: 'var(--font-heading)',
        fontSize: 'clamp(8rem, 20vw, 20rem)',
        fontWeight: 900,
        color: 'rgba(255,255,255,0.02)',
        lineHeight: 1,
        letterSpacing: '-0.05em',
        pointerEvents: 'none',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        zIndex: 0,
      }}>
        CHEF
      </div>

      {/* ── Giant editorial title ── */}
      <div className="container" style={{ padding: '0 5vw', position: 'relative', zIndex: 2 }}>
        <div style={{ overflow: 'hidden', marginBottom: '0.2em' }}>
          <h2
            className="chef-title-line"
            style={{
              fontSize: 'clamp(3rem, 9vw, 9rem)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 900,
              color: 'var(--accent)',
              margin: 0,
              lineHeight: 0.88,
              letterSpacing: '-0.02em',
            }}
          >
            MEET THE
          </h2>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <h2
            className="chef-title-line"
            style={{
              fontSize: 'clamp(3rem, 9vw, 9rem)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 900,
              color: 'transparent',
              WebkitTextStroke: 'clamp(1px, 0.15vw, 3px) rgba(255,255,255,0.9)',
              margin: 0,
              lineHeight: 0.88,
              letterSpacing: '-0.02em',
            }}
          >
            MASTER.
          </h2>
        </div>

        {/* ── Animated rule ── */}
        <div
          className="chef-rule"
          style={{
            height: '1px',
            background: 'linear-gradient(to right, var(--accent), transparent)',
            margin: '3rem 0',
            width: '60%',
          }}
        />
      </div>

      {/* ── Main split layout ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'end',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Left col — bio details */}
        <div
          className="chef-bio-col"
          style={{
            padding: '0 5vw 8rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '3rem',
          }}
        >
          {/* Label */}
          <div className="chef-detail-item">
            <p style={{
              fontSize: '0.72rem',
              letterSpacing: '0.4em',
              color: 'var(--accent)',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-body)',
              marginBottom: '0.5rem',
            }}>
              Executive Chef, SHACK.
            </p>
            <h3 style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              color: '#fff',
              margin: 0,
              letterSpacing: '-0.01em',
            }}>
              Clark Kent
            </h3>
          </div>

          {/* Quote block */}
          <div
            className="chef-detail-item"
            style={{
              borderLeft: '3px solid var(--accent)',
              paddingLeft: '1.8rem',
            }}
          >
            <p className="text-body" style={{
              fontSize: '1.1rem',
              lineHeight: 1.8,
              color: 'rgba(255,255,255,0.7)',
              fontStyle: 'italic',
              margin: 0,
            }}>
              "Every piece of chicken that leaves my kitchen carries 18 years of obsession, fire, and the flavors of Southern India — nothing less."
            </p>
          </div>

          {/* Bio text */}
          <p className="chef-detail-item text-body" style={{
            fontSize: '1rem',
            lineHeight: 1.9,
            color: 'rgba(255,255,255,0.55)',
            maxWidth: '480px',
            margin: 0,
          }}>
            Trained across London's finest kitchens and rooted in Tirupathi's bold spice heritage, Clark invites you into a dining experience built on fire, craft, and an obsessive love for crispy perfection.
          </p>

          {/* Stats row */}
          <div className="chef-detail-item" style={{ display: 'flex', gap: '3rem', marginTop: '1rem' }}>
            {[
              { target: 18, suffix: '+', label: 'Years of Craft' },
              { target: 40, suffix: '+', label: 'Signature Recipes' },
              { target: 12, suffix: 'K+', label: 'Happy Guests' },
            ].map(({ target, suffix, label }) => (
              <div key={label}>
                <div
                  className="chef-stat-num"
                  data-target={target}
                  data-suffix={suffix}
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 900,
                    color: 'var(--accent)',
                    lineHeight: 1,
                  }}
                >
                  0{suffix}
                </div>
                <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginTop: '0.4rem' }}>
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="chef-detail-item">
            <a
              href="#menuSec"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1rem',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '0.8rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                fontWeight: 700,
                paddingBottom: '0.5rem',
                borderBottom: '1px solid rgba(255,255,255,0.3)',
                transition: 'border-color 0.3s ease, color 0.3s ease',
              }}
            >
              Explore the Menu
              <span style={{ fontSize: '1.2rem', transition: 'transform 0.3s ease' }}>→</span>
            </a>
          </div>
        </div>

        {/* Right col — full-bleed chef image */}
        <div
          className="chef-image-wrap"
          data-speed="-0.1"
          style={{
            position: 'relative',
            alignSelf: 'end',
            overflow: 'visible',
          }}
        >
          {/* Accent decorative number */}
          <div
            className="chef-accent-num"
            style={{
              position: 'absolute',
              top: '10%',
              left: '-5%',
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(6rem, 14vw, 12rem)',
              fontWeight: 900,
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,100,0,0.15)',
              lineHeight: 1,
              zIndex: 0,
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          >
            01
          </div>

          {/* Orange glow behind chef */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '70%',
            height: '50%',
            background: 'radial-gradient(ellipse at bottom, rgba(255,80,0,0.25), transparent 70%)',
            zIndex: 1,
            pointerEvents: 'none',
          }} />

          <img
            src="/chicken-img/chef.png"
            alt="Chef Clark Kent"
            style={{
              width: '100%',
              maxHeight: '90vh',
              objectFit: 'contain',
              objectPosition: 'bottom',
              display: 'block',
              position: 'relative',
              zIndex: 2,
              filter: 'drop-shadow(-40px 0 60px rgba(255,60,0,0.2))',
              transform: 'scaleX(-1)',
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default ChefSection;
