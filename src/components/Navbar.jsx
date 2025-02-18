import React from 'react';
import '../styles/styles.css';

const Navbar = () => {
return (
<div className="navbar-container">
    <h3 className="logo">Chicken Shack</h3>
    <div className="hamburger" onClick={() => {
    document.querySelector('.nav-items').classList.toggle('active');
    }}>
    <div></div>
    <div></div>
    <div></div>
    </div>
    <nav>
    <ul className="nav-items">
        <a href="#heroSec">HOME</a>
        <a href="#pageContent">SPECIALS</a>
        <a href="#menuSec">MENU</a>
        <a href="#chefSec">CHEF</a>
    </ul>
    </nav>
</div>
);
};

export default Navbar;
