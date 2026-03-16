"use client";

import React, { useRef, useEffect } from 'react';
import { ReactLenis } from 'lenis/react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import PageContent from '../components/PageContent.jsx';
import Interior from '../components/Interior.jsx';
import ChefSection from '../components/ChefSection.jsx';
import Menu from '../components/Menu.jsx';
import HungerStrip from '../components/HungerStrip.jsx';
import Footer from '../components/Footer.jsx';
import Preloader from '../components/Preloader.jsx';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef(null);

  useGSAP(() => {
    ScrollTrigger.refresh();

    // ── Skip data-speed parallax entirely on mobile for maximum performance ──
    const isMobile = window.innerWidth <= 768;
    if (isMobile) return;

    // GLOBAL PARALLAX ENGINE — desktop only
    gsap.utils.toArray('[data-speed]').forEach(el => {
      const speed = parseFloat(el.getAttribute('data-speed'));
      const isHero = el.closest('#heroSec') !== null;

      if (isHero) {
        gsap.fromTo(el,
          { y: '0vh' },
          {
            y: `${-15 * speed}vh`,
            ease: 'none',
            scrollTrigger: {
              trigger: '#heroSec',
              start: 'top top',
              end: 'bottom top',
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      } else {
        gsap.fromTo(el,
          { y: `${15 * speed}vh` },
          {
            y: `${-15 * speed}vh`,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      }
    });
  }, { scope: containerRef });

  // Use native touch scroll on mobile; Lenis only on desktop
  const isMobileSSR = typeof window !== 'undefined' && window.innerWidth <= 768;

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true, smoothTouch: false }}>
      <div className="app-container" ref={containerRef}>
        
        {/* Preloader sits above everything */}
          <Preloader />
          {/* Foreground Content */}
        <div className="content-layer">
          <Navbar />
          <Hero />
          <PageContent />
          <Menu />
          <Interior />
          <ChefSection />
          <HungerStrip />
          <Footer />
        </div>
      </div>
    </ReactLenis>
  );
}
