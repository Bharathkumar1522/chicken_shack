import React from 'react';
import '../styles/styles.css';

const Footer = () => {
return (
<section className="footer-image" id='footerSec'>
    <footer className="footer">
    <div className="container">
        <div className="row">
        <div className="footer-col-logo">
            <h1 className="footer-logo">Chicken Shack</h1>
        </div>
        <div className="footer-col">
            <h4>Company</h4>
            <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Our Services</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Affiliate Program</a></li>
            </ul>
        </div>
        <div className="footer-col">
            <h4>Get Help</h4>
            <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Shipping</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">Order Status</a></li>
            <li><a href="#">Payment Options</a></li>
            </ul>
        </div>
        <div className="footer-col">
            <h4>Follow Us</h4>
            <div className="social-links">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
            </div>
        </div>
        </div>
    </div>
    </footer>
    <div className="copy-right">
    <p>© Copyright 2025 Bharath</p>
    </div>
</section>
);
};

export default Footer;
