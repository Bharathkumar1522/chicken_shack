"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/* ─────────────────────────────────────────────
   Pure HTML/JS Floating Ingredients
───────────────────────────────────────────── */
function HTMLIngredients() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Animate the ingredients looping up and down softly
    const items = containerRef.current.querySelectorAll('.floating-ingredient');
    
    items.forEach((item, i) => {
      // Randomize float speed and rotation
      const floatSpeed = 3 + Math.random() * 2;
      const rotSpeed = 10 + Math.random() * 20;
      
      gsap.to(item, {
        y: '-=40',
        duration: floatSpeed,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
      
      gsap.to(item, {
        rotation: Math.random() > 0.5 ? rotSpeed : -rotSpeed,
        duration: floatSpeed * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
      {/* Chilli - top left */}
      <img src="/images/chilli-1.webp" data-speed="0.08" className="floating-ingredient" style={{ position: 'absolute', left: '10%', top: '15%', width: '130px', filter: 'drop-shadow(0 20px 20px rgba(0,0,0,0.5))', opacity: 0.9, transform: 'rotate(15deg)' }} alt="" />
      
      {/* Lemon - top right */}
      <img src="/images/lemon-2.webp" data-speed="0.15" className="floating-ingredient" style={{ position: 'absolute', right: '12%', top: '20%', width: '160px', filter: 'drop-shadow(0 20px 20px rgba(0,0,0,0.5))', opacity: 0.85, transform: 'rotate(-20deg)' }} alt="" />
      
      {/* Parsley beside lemon - top right cluster */}
      <img src="/images/parsley.webp" data-speed="0.12" className="floating-ingredient" style={{ position: 'absolute', right: '20%', top: '10%', width: '80px', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.5))', opacity: 0.9, transform: 'rotate(10deg)' }} alt="" />
      
      {/* Parsley beside lemon - right middle */}
      <img src="/images/parsley.webp" data-speed="0.18" className="floating-ingredient" style={{ position: 'absolute', right: '8%', top: '42%', width: '65px', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.5))', opacity: 0.8, transform: 'rotate(-15deg) scaleX(-1)' }} alt="" />
      
      {/* Chilli - bottom left */}
      <img src="/images/chilli-1.webp" data-speed="0.1" className="floating-ingredient" style={{ position: 'absolute', left: '20%', bottom: '25%', width: '110px', filter: 'drop-shadow(0 20px 20px rgba(0,0,0,0.5))', opacity: 0.7, transform: 'rotate(45deg)' }} alt="" />
      
      {/* Parsley next to bottom chilli */}
      <img src="/images/parsley.webp" data-speed="0.07" className="floating-ingredient" style={{ position: 'absolute', left: '28%', bottom: '30%', width: '70px', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.4))', opacity: 0.75, transform: 'rotate(-25deg)' }} alt="" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   2D Canvas Embers (EXTREMELY Fast)
───────────────────────────────────────────── */
function CanvasEmbers({ particleCount = 80 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    
    // Set size robustly
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2.5 + 1.5,
            speedY: Math.random() * 0.5 + 0.1,
            speedX: Math.random() * 0.4 - 0.2,
            opacity: Math.random() * 0.5 + 0.2
        });
    }

    let animationId;
    const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.y -= p.speedY; // move up
            p.x += Math.sin(p.y * 0.01) * p.speedX; // gentle sway
            
            // wrap around to the bottom
            if (p.y < -10) {
                p.y = canvas.height + 10;
                p.x = Math.random() * canvas.width;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 94, 0, ${p.opacity})`;
            ctx.fill();
        });

        animationId = requestAnimationFrame(render);
    };
    render();

    return () => {
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(animationId);
    };
  }, [particleCount]);

  return (
    <canvas 
        ref={canvasRef} 
        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }} 
    />
  );
}

export default function SharedEmbers({ particleCount = 80, includeGlow = true, showIngredients = false }) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  // On mobile: skip glow orbs (expensive CSS animation) and reduce particles by 70%
  const mobileParticleCount = Math.round(particleCount * 0.3);
  const effectiveCount = isMobile ? mobileParticleCount : particleCount;

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>

      {/* CSS Glows — skipped on mobile (expensive CSS keyframe animations) */}
      {includeGlow && !isMobile && (
        <>
          <div className="bg-glow bg-glow--left" style={{ opacity: 0.6 }} />
          <div className="bg-glow bg-glow--right" style={{ opacity: 0.6 }} />
        </>
      )}

      {/* 2D Canvas Embers */}
      <CanvasEmbers particleCount={effectiveCount} />

      {/* Floating ingredients — desktop only */}
      {showIngredients && !isMobile && <HTMLIngredients />}

      {/* Edge fading masks */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '5%', background: 'linear-gradient(to bottom, transparent, #0c0c0c)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '5%', background: 'linear-gradient(to top, transparent, #0c0c0c)', pointerEvents: 'none' }} />
    </div>
  );
}

