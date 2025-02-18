import React, { useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import PageContent from './components/PageContent.jsx';
import Interior from './components/Interior.jsx';
import ChefSection from './components/ChefSection.jsx';
import Menu from './components/Menu.jsx';
import Footer from './components/Footer.jsx';
import './styles/styles.css';


function App() {
  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in-up');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    elements.forEach((el) => observer.observe(el));


const hamburger = document.querySelector('.hamburger');
const navItems = document.querySelector('.nav-items');


hamburger.addEventListener('click', () => {
    navItems.classList.toggle('active');
});


const navLinks = document.querySelectorAll('.nav-items a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navItems.classList.remove('active'); 
    });
});

  }, []);

  return (
    <div>
      <Navbar />
      <Hero />
      <PageContent />
      <Menu />
      <Interior />
      <ChefSection />
      <Footer />
    </div>
  );
}

export default App;
