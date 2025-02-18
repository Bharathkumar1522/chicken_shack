import React from 'react';
import '../styles/styles.css';

const Menu = () => {
return (
<section className="our-menu" id='menuSec'>
    <h1 className="section-heading">Our Favourites</h1>
        <p className="desc-menu">Explore Our Authentic & Street Style Dishes From All Over India</p>
        <div className="menu-container">
            <div className="dish-container fade-in-up">
                <img src="./images/tikka.webp" className="dish-image"/>
                <div className="dish-text">
                    <h3 className="dish-name">Tikka  Slices</h3>
                    <p className="dish-description">Our Special Tikka Slices made from tender and fresh chicken breasts served along with Mint Chutney.</p>
                </div>
            </div>
            <div className="dish-container fade-in-up"  id = "pcMenu">   
                <div className="dish-text">
                    <h3 className="dish-name">Chicken 65</h3>
                    <p className="dish-description">Our desi street food style Chicken 65. Fried to perfection for perfect crisp and flavor in each piece. Served along with lime and onions.</p>
                </div>
                <img src="./images/chicken65.webp" className="dish-image"/>
            </div>
            <div className="dish-container fade-in-up"  id = "mobileMenu">   
                <img src="./images/chicken65.webp" className="dish-image"/>
                <div className="dish-text">
                    <h3 className="dish-name">Chicken 65</h3>
                    <p className="dish-description">Our desi street food style Chicken 65. Fried to perfection for perfect crisp and flavor in each piece. Served along with lime and onions.</p>
                </div>           
            </div>
            <div className="dish-container fade-in-up">
                <img src="./images/kabab.webp" className="dish-image"/>
                <div className="dish-text">
                    <h3 className="dish-name">Chicken kebab</h3>
                    <p className="dish-description">Traditional Chicken Kebab. Grilled to perfection for smoky flavor in each piece. Garnished with fresh mint and onions.</p>
                </div>
            </div>
        </div>
</section>
);
};

export default Menu;