import React from 'react';
import '../styles/styles.css';

const ChefSection = () => {
return (
<section className="chef-section" id='chefSec'>
    <h1 className="section-heading">MEET OUR CHEF</h1>
    <div className="chef-container">
    <div className="chef-text-container">
        <h1 className="chef-name">Clark Kent,</h1>
        <p className="chef-desc">
        Do you feel hungry for good chicken, while living in or visiting the beautiful city of Tirupathi?
        I invite you to my restaurant, filled with authentic dishes and drinks, just as well as the festive, Southern atmosphere and interior!
        </p>
        <h4 className="final-msg">Be my guest today!</h4>
    </div>
    <img src="../../public/chicken-img/chef.png" className="chef-img" alt="Chef" />
    </div>
</section>
);
};

export default ChefSection;
