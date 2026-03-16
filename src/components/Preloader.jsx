"use client";
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Preloader = () => {
  const overlayRef = useRef();
  const barRef = useRef();
  const logoRef = useRef();

  // useLayoutEffect runs synchronously before browser paint,
  // so the overlay is guaranteed to be on screen before anything else shows.
  useLayoutEffect(() => {
    // Lock scroll
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        // Unlock scroll
        document.body.style.overflow = '';
        // Tell Hero it's safe to start animating
        window.dispatchEvent(new CustomEvent('app:ready'));
      }
    });

    // Logo fade in
    tl.fromTo(logoRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }
    );

    // Progress bar fill
    tl.fromTo(barRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.3, ease: 'power2.inOut' },
      0.15
    );

    // Brief hold
    tl.to({}, { duration: 0.15 });

    // Curtain slides up to reveal page
    tl.to(overlayRef.current, {
      yPercent: -100,
      duration: 0.85,
      ease: 'power4.inOut',
    });

    return () => {
      document.body.style.overflow = '';
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#0c0c0c',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        // Start visible — no opacity trick needed since useLayoutEffect runs before paint
      }}
    >
      {/* Brand mark */}
      <div
        ref={logoRef}
        style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 900,
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          letterSpacing: '0.3em',
          color: '#fff',
        }}
      >
        SHACK<span style={{ color: '#FF5E00' }}>.</span>
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: 'clamp(100px, 18vw, 200px)',
          height: '2px',
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}
      >
        <div
          ref={barRef}
          style={{
            width: '100%',
            height: '100%',
            background: '#FF5E00',
            transformOrigin: 'left center',
            transform: 'scaleX(0)',
          }}
        />
      </div>

      {/* Tagline */}
      <p
        style={{
          fontSize: '0.6rem',
          letterSpacing: '0.45em',
          color: 'rgba(255,255,255,0.25)',
          textTransform: 'uppercase',
          fontFamily: 'sans-serif',
        }}
      >
        Artisanal · Tirupathi · 2024
      </p>
    </div>
  );
};

export default Preloader;
