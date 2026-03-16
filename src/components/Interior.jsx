"use client";
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Interior = () => {
  const containerRef = useRef();

  useGSAP(() => {
    gsap.from('.interior-text', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
      },
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power4.out'
    });
  }, { scope: containerRef });

  return (
    <section id="interiorSec" ref={containerRef} style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '0 5vw', zIndex: 1 }}>
      <div 
        className="parallax-bg" 
        data-speed="-0.1"
        style={{ position: 'absolute', top: '-10%', left: 0, width: '100%', height: '120%', backgroundImage: 'url("/chicken-img/interior-img.webp")', backgroundSize: 'cover', backgroundPosition: 'center', zIndex: -2 }}
      />
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', zIndex: -1 }}></div>
      
      <div className="container" style={{ textAlign: 'center' }}>
        <div style={{ overflow: 'hidden' }}>
          <h2 className="title-massive text-accent interior-text" style={{ margin: 0 }}>CLASSIC</h2>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <h2 className="title-massive interior-text" style={{ margin: 0, color: 'transparent', WebkitTextStroke: '2px var(--text-main)' }}>INTERIORS</h2>
        </div>
        
        <p className="interior-text text-body" style={{ maxWidth: '600px', margin: '2rem auto 0', fontSize: '1.5rem', color: '#fff' }}>
          The best place where you and your family can spend some quality time while eating the best Chicken dishes.
        </p>
      </div>
    </section>
  );
};

export default Interior;
