import React from 'react';
import '../styles/styles.css';

const Hero = () => {
  return (
    <section className="hero-section" id='heroSec'>
      <video autoPlay muted loop playsInline id="myVideo" preload="auto">
        <source src="/fc1.webm" type="video/mp4" />
      </video>
      <div className="main-content">
        <h1>Welcome Foodie</h1>
      </div>
    </section>
  );
};

export default Hero;