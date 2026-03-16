"use client";
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

const Hero = () => {
  const containerRef = useRef();
  
  useGSAP(() => {
    // 3. Cinematic scale-down of the full-screen background video (can start immediately)
    gsap.from('.hero-bg-video video', {
      scale: 1.12,
      duration: 3.5,
      ease: 'power3.out',
      force3D: true,
      delay: 0.2,
    });

    // Wait for the Preloader to finish before playing the text entrance
    const handleReady = () => {
      const tl = gsap.timeline({ defaults: { force3D: true } });

      // 1. Kicker line
      tl.to('.hero-kicker', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
      }, 0);

      // 2. Massive title lines reveal
      tl.to('.reveal-text', {
        yPercent: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.12,
        duration: 1.8,
        ease: 'power4.out',
      }, 0.15);

      // 3. Sub + CTA
      tl.to('.hero-sub', {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: 'power3.out',
      }, 0.9);
    };

    window.addEventListener('app:ready', handleReady, { once: true });

    return () => {
      window.removeEventListener('app:ready', handleReady);
    };
  }, { scope: containerRef });

  return (
    <section id="heroSec" ref={containerRef} style={{ display: 'flex', flexDirection: 'column', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      
      {/* 
        FULL-SCREEN CINEMATIC BACKGROUND VIDEO 
        Using objectFit: cover to ensure it fills all screen sizes elegantly.
      */}
      <div 
        className="hero-bg-video"
        data-speed="0.5"
        style={{
          position: 'absolute',
          top: '-15%',
          left: 0,
          width: '100%',
          height: '130%',
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden'
        }}
      >
        <video 
          src="/fc1.webm" 
          autoPlay 
          loop 
          muted 
          playsInline
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            filter: 'brightness(0.85) contrast(1.1)', // Enhance the vividness
            willChange: 'transform' 
          }} 
        />
        {/* Elegant Vignette / Gradient Overlay to ensure typography POPS */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.2) 40%, rgba(10,10,10,0.2) 60%, rgba(10,10,10,0.95) 100%)',
          zIndex: 1
        }} />
      </div>

      <div className="container" style={{ 
        zIndex: 2, 
        position: 'relative', 
        height: '100vh',
        width: '100%',
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', // Lock strictly to center
        alignItems: 'center', 
        padding: '0 5vw', // Remove all top/bottom padding to let flexbox math handle centering
        pointerEvents: 'none' 
      }}>
        
        {/* Delicate Kicker */}
        <p className="hero-kicker" style={{ 
          color: 'var(--accent)', 
          fontFamily: 'var(--font-body)', 
          letterSpacing: '0.5em', 
          fontSize: '0.85rem', 
          textTransform: 'uppercase', 
          marginBottom: '3rem',
          willChange: 'opacity, transform',
          textAlign: 'center',
          opacity: 0,       // Hidden until preloader fires
          transform: 'translateY(20px)',
        }}>
          Est. London — 2024
        </p>

        {/* Elegant, Interlaced Typography Block */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          <div style={{ display: 'flex' }}>
            <h1 className="title-massive text-accent reveal-text" style={{ 
              margin: 0, 
              lineHeight: 0.85, 
              fontSize: 'clamp(3.5rem, 12vw, 12rem)',
              textAlign: 'center',
              willChange: 'transform, opacity',
              textShadow: '0 20px 40px rgba(0,0,0,0.5)',
              opacity: 0,         // Hidden until preloader fires
              transform: 'translateY(40px)',
            }}>
              ARTISANAL
            </h1>
          </div>

          <div style={{ display: 'flex', zIndex: 3, position: 'relative', marginTop: '-0.05em', paddingBottom: '0.15em' }}>
            {/* Using a sleek outline and overlapping to create depth */}
            <h1 className="title-massive reveal-text" style={{ 
              margin: 0, 
              lineHeight: 0.85, 
              fontSize: 'clamp(3.5rem, 12vw, 12rem)',
              textAlign: 'center',
              WebkitTextStroke: 'clamp(1px, 0.2vw, 3px) #FFF',
              color: 'transparent',
              willChange: 'transform, opacity',
              textShadow: '0 20px 40px rgba(0,0,0,0.3)',
              opacity: 0,         // Hidden until preloader fires
              transform: 'translateY(40px)',
            }}>
              CRUNCH.
            </h1>
          </div>
          
        </div>
        
        {/* Grouped Bottom Footer Layout directly below title */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', // Stacked cleanly
          alignItems: 'center', 
          marginTop: '4rem', // Fixed spacing instead of 'auto' which pushed it out of frame
          pointerEvents: 'auto', // Re-enable pointer events for the button
          textAlign: 'center'
        }}>
          <p className="hero-sub text-body" style={{ 
            maxWidth: '500px', 
            margin: '0 0 2rem 0', 
            fontSize: '1.15rem',
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.9)',
            textShadow: '0 4px 10px rgba(0,0,0,0.5)',
            willChange: 'transform, opacity',
            opacity: 0,       // Hidden until preloader fires
            transform: 'translateY(20px)',
          }}>
            An obsessively crafted flavor profile, battered in spiced buttermilk and fried to golden absolute perfection.
          </p>
          
          <div className="hero-sub" style={{ willChange: 'transform, opacity', opacity: 0, transform: 'translateY(20px)' }}>
            <a href="#menuSec" className="btn-primary" style={{ 
              padding: '1.2rem 3rem', 
              letterSpacing: '0.2em', 
              textTransform: 'uppercase',
              fontSize: '0.9rem'
            }}>
              The Collection
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;